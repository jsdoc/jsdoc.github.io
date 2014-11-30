// Metalsmith plugins for generating usejsdoc.org.
'use strict';

var _ = require('underscore');
var fs = require('fs-extra');
var path = require('path');
var swigModule = require('swig');
var swigExtras = require('swig-extras');
var tags = require('./tags');

var swigViews = {};

// Add the Swig template name to each file object.
exports.addTemplateName = function addTemplateName(indexPage) {
    indexPage = indexPage || 'index.html';

    return function(files, metalsmith, cb) {
        var file;

        Object.keys(files).forEach(function(filename) {
            file = files[filename];
            if (filename === indexPage) {
                file.template = 'index';
            } else {
                file.template = 'page';
            }
        });

        cb();
    };
};

// Adjust the per-file metadata in preparation for generating output files.
exports.adjustMetadata = function adjustMetadata() {
    return function(files, metalsmith, cb) {
        Object.keys(files).forEach(function(filename) {
            var file = files[filename];

            // if there's a JSDoc tag name but no title, use the tag as the title
            if (!file.title && file.tag) {
                file.title = '@' + file.tag;
            }

            // unescape the YAML data
            ['title', 'description'].forEach(function(key) {
                file[key] = file[key]
                    .replace(/\\([@\[\]])/g, '$1');
            });
        });

        cb();
    };
};

// Generate HTML redirect files.
exports.buildRedirects = function buildRedirects(redirects) {
    return function(files, metalsmith, cb) {
        var metadata = metalsmith.metadata();
        var rendered;

        Object.keys(redirects).forEach(function(redirectArray) {
            if (!Array.isArray(redirectArray)) {
                redirectArray = [redirectArray];
            }

            redirectArray.forEach(function(redirect) {
                var context = {
                    target: redirects[redirect]
                };

                rendered = swigViews.redirect(context);
                fs.writeFileSync(path.resolve(metadata.destination, redirect), rendered, 'utf8');
            });
        });

        cb();
    };
};

// Configure the global Swig instance.
exports.configureSwig = function configureSwig(views, options) {
    return function(files, metalsmith, cb) {
        swigModule.setDefaults(_.defaults({}, options, {
            loader: swigModule.loaders.fs(options.basepath)
        }));

        Object.keys(tags).forEach(function(tagName) {
            var tag = tags[tagName];
            swigModule.setTag(tagName, tag.parse, tag.compile, tag.ends, tag.blockLevel);
        });

        swigExtras.useTag(swigModule, 'switch');
        swigExtras.useTag(swigModule, 'case');

        Object.keys(views).forEach(function(view) {
            swigViews[view] = swigModule.compileFile(views[view]);
        });

        cb();
    };
};

// Copy a static file to an output directory.
exports.copyStaticFile = function copyStaticFile(options) {
    return function(files, metalsmith, cb) {
        fs.copy(options.source, options.destination, function(err) {
            cb(err);
        });
    };
};

// Add global metadata.
exports.metadata = function metadata(data) {
    return function(files, metalsmith, cb) {
        var mdata = metalsmith.metadata();

        Object.keys(data).forEach(function(key) {
            mdata[key] = data[key];
        });

        cb();
    };
};

// Render content with the Swig template engine.
exports.swig = function swig(options) {
    return function(files, metalsmith, cb) {
        var context;
        var counter = 0;
        var file;
        var rendered;

        Object.keys(files).forEach(function(filename) {
            file = files[filename];
            context = _.defaults({}, file, options.context, {
                files: files,
                metadata: metalsmith.metadata()
            });
            context.contents = String(context.contents);

            // Process Swig tags in the content file. Force a unique filename to prevent
            // incorrect caching.
            context.contents = swigModule.render(context.contents, {
                filename: path.join(options.basepath, ('dummy_' + counter++ + '.swig'))
            });

            // Render the entire page
            rendered = swigViews[file.template](context);

            // Replace the file's contents with the rendered output
            file.contents = new Buffer(rendered);
        });

        cb();
    };
};

// Less destructive alternative to Metalsmith.clean().
exports.removeFiles = function removeFiles(options) {
    // path.extname() returns the extension with a leading '.', so match that format
    options.extensions = options.extensions.map(function(extension) {
        if (extension.indexOf('.') !== 0) {
            extension = '.' + extension;
        }

        return extension;
    });

    return function(files, metalsmith, cb) {
        fs.readdir(options.target, function(err, files) {
            if (err) {
                cb(err);
            } else {
                files.forEach(function(file) {
                    if (options.extensions.indexOf(path.extname(file)) !== -1) {
                        fs.unlinkSync(path.join(options.target, file));
                    }
                });

                cb();
            }
        });
    };
};

// Convert array of heading objects into a tree. The `tagNames` parameter must be a one-item array
// with comma-separated heading tag names (for example, ['h2, h3'].
exports.buildHeadingTree = function buildHeadingTree(tagNames) {
    return function(files, metalsmith, cb) {
        Object.keys(files).forEach(function(filename) {
            var file = files[filename];
            var fileHeadings;
            var headings = [];
            var levelStacks = {};
            var topLevel;

            function addToStack(level, heading) {
                levelStacks[level] = levelStacks[level] || [];
                levelStacks[level].push(heading);
            }

            // HACK: In the layout.swig view, we conditionally insert <h2> tags based on the file's
            // metadata. But we have to build the heading tree before we process the Swig template!
            // To work around this, insert the same headings that the template will insert.
            fileHeadings = (function() {
                var newHeadings = [];

                if (file.synonyms) {
                    newHeadings.push({
                        id: 'synonyms',
                        tag: 'h2',
                        text: 'Synonyms'
                    });
                }

                newHeadings = newHeadings.concat(file.headings);

                if (file.related) {
                    newHeadings.push({
                        id: 'related-links',
                        tag: 'h2',
                        text: 'Related Links'
                    });
                }

                return newHeadings.length ? newHeadings : null;
            })();

            if (!fileHeadings) {
                return;
            }

            fileHeadings.forEach(function(heading) {
                var stack;
                var tagName = heading.tag;
                var level = tagName.replace(/^h/, '');

                heading.children = [];

                if (!topLevel) {
                    topLevel = level;
                }

                if (level === topLevel) {
                    headings.push(heading);
                } else {
                    stack = levelStacks[level - 1];
                    if (stack) {
                        stack[stack.length - 1].children.push(heading);
                    } else {
                        console.warn('The file %s contains an incorrectly nested <%s>, "%s"',
                            filename, tagName, heading.text.replace(/(?:[\n\t]|\s{2,})/g, ''));
                    }
                }

                addToStack(level, heading);
            });

            file.headings = headings;
        });

        cb();
    };
};

// Extract metadata from the docs for each JSDoc tag.
exports.addJsdocTagMetadata = function addJsdocTagMetadata() {
    return function(files, metalsmith, cb) {
        var metadata = metalsmith.metadata();

        metadata.tags = {};

        function addTagMetadata(tag, filename, isSynonym) {
            metadata.tags[tag] = {
                filename: filename,
                isSynonym: !!isSynonym
            };
        }

        Object.keys(files).forEach(function(filename) {
            var file = files[filename];

            if (file.tag) {
                addTagMetadata(file.tag, filename);
            }

            if (file.synonyms) {
                metadata.tags[file.tag].synonyms = file.synonyms.slice(0).map(function(synonym) {
                    return '@' + synonym;
                });

                file.synonyms.forEach(function(synonym) {
                    addTagMetadata(synonym, filename, true);
                });
            }
        });

        cb();
    };
};
