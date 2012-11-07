/**
 * Turn the data about your docs into file output.
 * @param {TAFFY} data A TaffyDB collection representing
 *                       all the symbols documented in your code.
 * @param {object} opts An object with options information.
 * @param {Tutorial} tutorialResolverRoot An object with information about included tutorials
 * @see http://www.taffydb.com/
 * @see http://www.taffydb.com/workingwithdata
 * @see http://underscorejs.org/#template
 * @see http://nodejs.org/api/fs.html
 * @see http://nodejs.org/api/path.html
 */
exports.publish = function(data, opts, tutorialResolverRoot) {
    
    var outputFile   = '/tmp.html';
    var fs           = require('fs');
    var path         = require('path');
    var outputDir    = path.resolve(opts.destination);
    var outputContent= JSON.stringify(data().first(), null, '    ');
    
    
    var helper          = require('jsdoc/util/templateHelper');
    var templateStr     = '';
    var templateData    = {};
    // only handles templates as strings.
    var renderTemplate  = require('underscore').template;
    var templateSettings= {};
    
    templateStr  = '<!DOCTYPE html>\n';
    templateStr += '<html>\n';
    templateStr += '<head>\n';
    templateStr += '<meta charset="utf-8">\n';
    templateStr += '<title>\n';
    templateStr += '    <?js= title ?>\n';
    templateStr += '    </title>\n';
    templateStr += '<style type="text/css">\n';
    templateStr += 'pre, code\n';
    templateStr += '{\n';
    templateStr += '  white-space: pre-wrap;\n';
    templateStr += '}\n';
    templateStr += '</style>\n';
    templateStr += '<script src="scripts/prettify/prettify.js"\n';
    templateStr += '      type="text/javascript">\n';
    templateStr += '</script>\n';
    templateStr += '<!--[if lt IE 9]>\n';
    templateStr += '<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>\n';
    templateStr += '  <![endif]-->\n';
    templateStr += '<link type="text/css"\n';
    templateStr += '      title="desert"\n';
    templateStr += '      rel="stylesheet"\n';
    templateStr += '      href="styles/desert.css">\n';
    templateStr += '<link type="text/css"\n';
    templateStr += '      title="sunburst"\n';
    templateStr += '      rel="alternate stylesheet"\n';
    templateStr += '      href="styles/sunburst.css">\n';
    templateStr += '<link type="text/css"\n';
    templateStr += '      title="prettify"\n';
    templateStr += '      rel="alternate stylesheet"\n';
    templateStr += '      href="styles/prettify.css">\n';
    templateStr += '</head>\n';
    templateStr += '<body>\n';
    templateStr += '<pre class="prettyprint lang-js linenums">\n';
    templateStr += '    <?js= sourceCode ?>\n';
    templateStr += '</pre>\n';
    templateStr += '<script type="text/javascript">\n';
    templateStr += '    prettyPrint();\n';
    templateStr += '</script>\n';
    templateStr += '</body>\n';
    templateStr += '</html>\n';
    
    templateData.outputContent = helper.htmlsafe(outputContent);
    // override default settings, this is done in
    // jsdoc/rhino_modules/jsdoc/template as well.
    // It is used to define the template "tags".
    // Have a look at some of the default template
    // files to get an idea of what you can do.
    templateSettings.evaluate = /<\?js([\s\S]+?)\?>/g;
    templateSettings.interpolate= /<\?js=([\s\S]+?)\?>/g;
    templateSettings.escape = /<\?js~([\s\S]+?)\?>/g;
    outputContent = renderTemplate(templateStr, templateData, templateSettings);
    // replacing all backslashes with forward slashes in the path // this avoids a few issues on Windows. outputDir = outputDir.replace(/\\/g, '/');
    // removing any trailing slash outputDir = outputDir.replace(/\/+$/, '');
    outputFile = outputDir + outputFile;
    fs.mkPath(outputDir);
    fs.writeFileSync(outputFile, outputContent);
};