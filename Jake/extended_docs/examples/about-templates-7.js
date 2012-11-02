/**
 * @file A simple template to get an idea of where to start.
 * @author <a href="mailto:matthewkastor@gmail.com">Matthew Kastor</a>
 */
 
/**
 * Recursively copies a directory and files to user specified depth.
 * @param {String} sourceDirectory The directory to copy.
 * @param {String} outputDirectory The output directory.
 * @param {Number} recursionDepth How many folders deep the copy will go.
 */
function copyDirectory(sourceDirectory, outputDirectory, recursionDepth) {
    var fs   = require('fs');
    var path = require('path');
    recursionDepth = recursionDepth || 3;
    var staticFiles = fs.ls(sourceDirectory, recursionDepth);
    staticFiles.forEach(function(fileName) {
        var toDir = fs.toDir(fileName.replace(sourceDirectory, outputDirectory));
        fs.mkPath(toDir);
        if(!fs.existsSync(path.join(toDir, '/' + fileName))) {
            fs.copyFileSync(fileName, toDir);
        }
    });
}

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
    var fs                     = require('fs');
    var path                   = require('path');
    var helper                 = require('jsdoc/util/templateHelper');
    var template               = require('jsdoc/template');
    
    var outputFileName         = data().first().meta.filename;
    var sourceCode             = JSON.stringify(data().first(), null, '    ');
    var outputDirectory        = path.resolve(opts.destination);
    var staticFilesDirectory   = path.resolve(env.dirname + '/templates/simpleTemplate/static');
    var outputFile             = path.join(outputDirectory, outputFileName + '.html');
    
    var templatePath           = path.resolve(env.dirname + '/templates/simpleTemplate');
    var temmplateFilesDirectory= path.join(templatePath, '/tmpl');
    var templateName           = 'layout.tmpl';
    var templateData           = {};
    
    templateData.title         = 'Source of : ' + outputFileName;
    templateData.sourceCode    = helper.htmlsafe(sourceCode);
    
    var view                   = new template.Template(temmplateFilesDirectory);
    var outputContent          = view.render(templateName, templateData);
    
    fs.mkPath(outputDirectory);
    fs.writeFileSync(outputFile, outputContent);
    copyDirectory(staticFilesDirectory, outputDirectory, 3);
};
