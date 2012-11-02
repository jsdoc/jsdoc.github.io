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
    
    templateStr  = '\n';
    templateStr += '
