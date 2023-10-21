/* eslint-disable arrow-body-style */
// Metalsmith plugins for generating the site.

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');
const swigModule = require('swig');
const swigExtras = require('swig-extras');
const tags = require('./tags');

var swigViews = {};

function nameToBlockTag(name) {
    return '@' + name;
}

function nameToInlineTag(name) {
    return '{@' + name + '}';
}

// Add the Swig template name to each file object.
exports.addTemplateName = indexPage => {
    indexPage = indexPage || 'index.html';

    return (files, metalsmith, cb) => {
        Object.keys(files).forEach(function(filename) {
            const file = files[filename];

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
exports.adjustMetadata = () => {
    return (files, metalsmith, cb) => {
        Object.keys(files).forEach(filename => {
            const file = files[filename];

            // if there's a JSDoc tag name but no title, use the tag as the title
            if (!file.title) {
                if (file.tag) {
                    file.title = nameToBlockTag(file.tag);
                } else if (file.inlineTag) {
                    file.title = nameToInlineTag(file.inlineTag);
                }
            }

            // unescape the YAML data
            ['title', 'description'].forEach(key => {
                if (!file[key]) {
                    global.log('The file "%s" is missing its "%s" metadata', filename, key);
                } else {
                    file[key] = file[key]
                        .replace(/\\([@[\]])/g, '$1');
                }
            });
        });

        cb();
    };
};

// Generate HTML redirect files.
exports.buildRedirects = redirects => {
    return (files, metalsmith, cb) => {
        const metadata = metalsmith.metadata();
        let rendered;

        Object.keys(redirects).forEach(redirectArray => {
            if (!Array.isArray(redirectArray)) {
                redirectArray = [redirectArray];
            }

            redirectArray.forEach(redirect => {
                const context = {
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
exports.configureSwig = (views, options) => {
    return (files, metalsmith, cb) => {
        swigModule.setDefaults(_.defaults({}, options, {
            loader: swigModule.loaders.fs(options.basepath)
        }));

        Object.keys(tags).forEach(tagName => {
            const tag = tags[tagName];

            swigModule.setTag(tagName, tag.parse, tag.compile, tag.ends, tag.blockLevel);
        });

        swigExtras.useTag(swigModule, 'switch');
        swigExtras.useTag(swigModule, 'case');

        Object.keys(views).forEach(view => {
            swigViews[view] = swigModule.compileFile(views[view]);
        });

        cb();
    };
};

// Copy a static file to an output directory.
exports.copyStaticFile = options => {
    return (files, metalsmith, cb) => {
        fs.copy(options.source, options.destination, err => cb(err));
    };
};

// Add global metadata.
exports.metadata = data => {
    return (files, metalsmith, cb) => {
        const mdata = metalsmith.metadata();

        Object.keys(data).forEach(key => {
            mdata[key] = data[key];
        });

        cb();
    };
};

// Render content with the Swig template engine.
exports.swig = options => {
    return (files, metalsmith, cb) => {
        let context;
        let counter = 0;
        let file;
        let rendered;

        Object.keys(files).forEach(filename => {
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
            file.contents = Buffer.from(rendered);
        });

        cb();
    };
};

// Less destructive alternative to Metalsmith.clean().
exports.removeFiles = options => {
    // path.extname() returns the extension with a leading '.', so match that format
    options.extensions = options.extensions.map(extension => {
        if (extension.indexOf('.') !== 0) {
            extension = '.' + extension;
        }

        return extension;
    });

    return (files, metalsmith, cb) => {
        fs.readdir(options.target, (err, targetFiles) => {
            if (err) {
                cb(err);
            } else {
                targetFiles.forEach(file => {
                    if (options.extensions.indexOf(path.extname(file)) !== -1) {
                        fs.unlinkSync(path.join(options.target, file));
                    }
                });

                cb();
            }
        });
    };
};

// Convert array of heading objects into a tree.
exports.buildHeadingTree = () => {
    return (files, metalsmith, cb) => {
        Object.keys(files).forEach(filename => {
            const file = files[filename];
            let fileHeadings;
            const headings = [];
            const levelStacks = {};
            let topLevel;

            function addToStack(level, heading) {
                levelStacks[level] = levelStacks[level] || [];
                levelStacks[level].push(heading);
            }

            // HACK: In the layout.swig view, we conditionally insert <h2> tags based on the file's
            // metadata. But we have to build the heading tree before we process the Swig template!
            // To work around this, insert the same headings that the template will insert.
            fileHeadings = (function() {
                let newHeadings = [];

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

            fileHeadings.forEach(heading => {
                let stack;
                const tagName = heading.tag;
                const level = tagName.replace(/^h/, '');

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
                        console.warn(`The file ${filename} contains an incorrectly nested ` +
                            `<${tagName}>, "${heading.text.replace(/(?:[\n\t]|\s{2,})/g, '')}"`);
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
exports.addJsdocTagMetadata = () => {
    return (files, metalsmith, cb) => {
        let key;
        const metadata = metalsmith.metadata();
        let synonyms;

        metadata.tags = {};
        metadata.inlineTags = {};

        function addTagMetadata(tag, filename, isSynonym) {
            metadata[key][tag] = {
                filename: filename,
                isSynonym: Boolean(isSynonym)
            };
        }

        Object.keys(files).forEach(filename => {
            const file = files[filename];

            if (file.tag) {
                key = 'tags';
                addTagMetadata(file.tag, filename);
            } else if (file.inlineTag) {
                key = 'inlineTags';
                addTagMetadata(file.inlineTag, filename);
            }

            if (file.synonyms) {
                // Create fake files for each of the synonyms
                file.synonyms.forEach(synonym => {
                    addTagMetadata(synonym, filename, true);
                });

                // Mangle the synonym names based on the tag type
                synonyms = file.synonyms.map(synonym => {
                    if (key === 'inlineTags') {
                        return nameToInlineTag(synonym);
                    }

                    return nameToBlockTag(synonym);
                });
                metadata[key][file.tag || file.inlineTag].synonyms = file.synonyms = synonyms;
            }
        });

        cb();
    };
};
