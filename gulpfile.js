'use strict';

// for Metalsmith
require('harmonize')();

var beautify = require('metalsmith-beautify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var headings = require('metalsmith-headings');
var markdown = require('metalsmith-markdown');
var marked = require('marked');
var Metalsmith = require('metalsmith');
var minimist = require('minimist');
var path = require('path');
var plugins = require('./lib/plugins');
var util = require('util');

// file extensions to clean up from the destination path
var CLEANUP_EXTENSIONS = ['html'];
// location for output files
var OUTPUT_PATH = '.';
// location of content files
var SOURCE_PATH = 'content/en';
// heading levels to include in the per-page TOC
var TOC_HEADINGS = ['h2, h3'];
// location of Swig views
var VIEW_PATH = path.join(__dirname, 'views');

var knownCliOptions = {
    string: 'port',
    default: {
        port: '7878'
    }
};
var cliOptions = minimist(process.argv.slice(2), knownCliOptions);
var swigOptions = {
    basepath: VIEW_PATH,
    locals: require('./lib/locals')
};
var swigViews = {
    index: 'index.swig',
    page: 'page.swig',
    redirect: 'redirect.swig'
};

// for debugging, because `console` isn't available during a Metalsmith run
global.log = function log() {
    console.warn.apply(null, arguments);
};

function markedFactory() {
    var renderer = new marked.Renderer();

    renderer.code = function(code, language) {
        language = language ? (' lang-' + language) : '';

        return util.format('<pre class="prettyprint%s"><code>%s\n</code></pre>', language, code);
    };

    renderer.paragraph = function(text) {
        // Swig tags aren't paragraphs
        if (text.match(/^\s*\{\%[^%]+\%\}\s*$/)) {
            return text;
        }

        return '<p>' + text + '</p>\n';
    };

    return renderer;
}

gulp.task('html', function(cb) {
    return new Metalsmith(__dirname)
        // basic options
        .clean(false)
        .source(SOURCE_PATH)
        .destination(OUTPUT_PATH)

        // plugins
        .use(plugins.removeFiles({
            target: OUTPUT_PATH,
            extensions: CLEANUP_EXTENSIONS
        }))
        .use(plugins.metadata({
            destination: OUTPUT_PATH,
            tocData: require('./data/toc.json')
        }))
        .use(markdown({
            gfm: true,
            renderer: markedFactory(),
            smartypants: false,
            tables: true
        }))
        .use(plugins.configureSwig(swigViews, swigOptions))
        .use(headings({
            // use a single jQuery selector so we get all the headings in order
            selectors: [TOC_HEADINGS.join(', ')]
        }))
        .use(plugins.buildHeadingTree(TOC_HEADINGS))
        .use(plugins.addTemplateName())
        .use(plugins.addJsdocTagMetadata())
        .use(plugins.adjustMetadata())
        .use(plugins.swig(swigOptions))
        .use(plugins.buildRedirects(require('./data/redirects.json')))
        .use(plugins.copyStaticFile({
            source: path.join(__dirname, 'bower_components/html5shiv/dist/html5shiv.min.js'),
            destination: path.join(__dirname, 'scripts/html5shiv.min.js')
        }))
        .use(plugins.copyStaticFile({
            source: path.join(__dirname,
                'bower_components/html5shiv/dist/html5shiv-printshiv.min.js'),
            destination: path.join(__dirname, 'scripts/html5shiv-printshiv.min.js')
        }))
        /*eslint camelcase: 0 */
        .use(beautify({
            css: false,
            html: {
                indent_char: ' ',
                indent_size: 2,
                // js-beautify ignores the value 0 because it's falsy
                max_preserve_newlines: 0.1
            },
            js: false
        }))

        // go!
        .build(cb);
});

gulp.task('server', function() {
    connect.server({
        port: cliOptions.port,
        root: path.resolve(__dirname, OUTPUT_PATH)
    });
});

gulp.task('preview', ['html', 'server']);

gulp.task('default', ['html']);
