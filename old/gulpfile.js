const beautify = require('metalsmith-beautify');
const connect = require('gulp-connect');
const gulp = require('gulp');
const headings = require('metalsmith-headings');
const markdown = require('metalsmith-markdown');
const marked = require('marked');
const Metalsmith = require('metalsmith');
const minimist = require('minimist');
const path = require('path');
const plugins = require('./lib/plugins');

// file extensions to clean up from the destination path
const CLEANUP_EXTENSIONS = ['html'];
// location for output files
const OUTPUT_PATH = '.';
// location of content files
const SOURCE_PATH = 'content/en';
// heading levels to include in the per-page TOC
const TOC_HEADINGS = ['h2, h3'];
// location of Swig views
const VIEW_PATH = path.join(__dirname, 'views');

const knownCliOptions = {
    string: 'port',
    default: {
        port: '7878'
    }
};
const cliOptions = minimist(process.argv.slice(2), knownCliOptions);
const swigOptions = {
    basepath: VIEW_PATH,
    locals: require('./lib/locals')
};
const swigViews = {
    index: 'index.swig',
    page: 'page.swig',
    redirect: 'redirect.swig'
};

// for debugging, because `console` isn't available during a Metalsmith run
global.log = (...args) => {
    console.warn.apply(null, args);
};

function markedFactory() {
    const renderer = new marked.Renderer();

    renderer.code = (code, language) => {
        language = language ? (' lang-' + language) : '';

        return `<pre class="prettyprint${language}"><code>${code}\n</code></pre>`;
    };

    renderer.paragraph = text => {
        // Swig tags aren't paragraphs
        if (text.match(/^\s*\{%[^%]+%\}\s*$/)) {
            return text;
        }

        return `<p>${text}</p>\n`;
    };

    return renderer;
}

exports.html = cb => new Metalsmith(__dirname)
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
    .use(plugins.buildHeadingTree())
    .use(plugins.addTemplateName())
    .use(plugins.addJsdocTagMetadata())
    .use(plugins.adjustMetadata())
    .use(plugins.swig(swigOptions))
    .use(plugins.buildRedirects(require('./data/redirects.json')))
    .use(plugins.copyStaticFile({
        source: path.join(require.resolve('code-prettify'), '..', '..', 'loader', 'prettify.js'),
        destination: path.join(__dirname, 'scripts', 'prettify.js')
    }))
    /* eslint-disable camelcase */
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

exports.server = () => {
    connect.server({
        port: cliOptions.port,
        root: path.resolve(__dirname, OUTPUT_PATH)
    });
};

exports.preview = gulp.series(exports.html, exports.server);

exports.default = exports.html;
