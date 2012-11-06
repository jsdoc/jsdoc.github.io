/*jslint indent: 4, maxerr: 50, white: true, node: true, stupid: true, evil: true */
/*global Mustache */

// templates.example, templates.includes

/**
 * @file This file contains the base MustacheComb class.
 * @author <a href="matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20121030
 * @requires events
 * @requires util
 * @requires fs
 * @requires path
 * @requires mustache
 * @requires textTransformers
 * @exports MustacheComb
 */

'use strict';
var events, util, fs, path;

events = require('events');
util   = require('util');
fs               = require('fs');
path             = require('path');

/**
 * The Base MustacheComb class. The templates
 *  and tag handlers shown in their registries will be loaded so, if
 *  you want to use this class directly then you'll need to reference
 *  your own tag handler and template registries.
 * @class
 * @param {Array} views An array of view objects. Defaults to an empty array.
 * @param {String} outdir The directory where you want files to eventually
 *  end up. Defaults to the current working directory.
 * @requires events
 * @requires util
 * @requires fs
 * @requires path
 * @requires mustache
 * @requires textTransformers
 */
function MustacheComb(views) {
    events.EventEmitter.call(this);
    
    var my;
    
    my               = this;
    my.textTransformers = require('atropa-text-transformers');
    my.Mustache      = require('mustache');
    my.views         = views || [];
    
    /**
     * Contains functions for handling mustache tags.
     * @type {Object}
     */
    my.mustacheTagHandlers = {};
    
    /**
     * Mustache Templates
     * @type {Object}
     */
    my.templates = {
        "example"  : "<pre>{{{codeBody}}}</pre>",
        "includes" : "{{>includes}}"
    };
    
    /**
     * Adds a template file to the templates object.
     * @param {String} templateName The template name will become the property of
     *  this.templates which refers to the template loaded.
     * @param {String} pathToTemplate The path to the template file.
     * @param {String} encoding The encoding of the template file. Valid values are the same as
     *  valid values for fs.readFileSync. Defaults to utf8.
     */
    my.addTemplateByFile = function(templateName, pathToTemplate, encoding) {
        encoding = encoding || 'utf8';
        my.templates[templateName] = String(fs.readFileSync(path.resolve(pathToTemplate), encoding));
    };
    
    /**
     * Adds a template string to the templates object.
     * @param {String} templateName The template name will become the property of
     *  this.templates which refers to the template loaded.
     * @param {String} template The template.
     */
    my.addTemplateByString = function(templateName, template) {
        my.templates[templateName] = template;
    };
    
    /**
     * Adds a handler function for mustache tags. You will be responsible
     *  for generating whatever you want the tag to be replaced with. In
     *  general, the text can be run through mustache to parse any tags in
     *  it or tags can be used as markers for where you're going to
     *  programatically generate content and insert it.
     * @function
     * @param {String} handles The name of the tag to handle {{#whatever}}{{/whatever}}
     * @param {String} func The name of a function which has been added
     *  to the MustacheComb prototype.
     * @see MustacheComb
     */
    my.addTagHandlerFunction = function(handles, func) {
        my.mustacheTagHandlers[handles] = function() {
            return function(text, whatever) {
                return my[func](text, whatever);
            };
        };
    };
    
    my.addTagHandlerFunction('example', 'formatExample');
    my.addTagHandlerFunction('include', 'mustacheIncluder');
    my.addTagHandlerFunction('includeExample', 'includeExample');
}
util.inherits(MustacheComb, events.EventEmitter);

/**
 * Tag handler for the example tag. Formats the text for html
 *  and prettification.
 * @function`
 * @param {String} text A string of text to process.
 */
MustacheComb.prototype.formatExample = function formatExample(text) {
    var my, parts, offset, code, html;
    
    my = this;
    
    // normalizing line endings
    text  = my.textTransformers.convertEOL(text, '\n');
    // creating an array of lines.
    parts = text.split('\n');
    // converting any tabs in white space preceeding the line, into four spaces.
    parts = parts.map(function (text) {
        return my.textTransformers.normalizeWhiteSpace(text);
    });
    // Since indentation in the article is directly transferred to the displayed 
    // example, we may need to remove some white space. (thinks of shift+tab).
    offset = my.textTransformers.getOffset(parts[0]);
    parts  = parts.map(function(text) {
        return my.textTransformers.offsetWhiteSpace(text, offset);
    });
    // creating a string from an array of lines.
    code = parts.join('\n');
    // filtering out characters that screw up the html.
    code = code.replace(/[<]/g, '&lt;');
    // Formatting the data into html.
    html = my.Mustache.to_html(
        my.templates.example, {
        codeBody  : code
    });
    return html;
};

/**
 * Base Function for including files. Fetches file contents.
 * @param {String} relPath The path to the file to include.
 * @returns Returns the contents of the file.
 */
MustacheComb.prototype.includeFile = function includeFile(relPath) {
    var out,
        relPath;
        
    relPath = relPath.trim();
    
    try {
        out = String(fs.readFileSync(relPath));
    } catch (e) {
        console.log('  MustacheComb.includeFile : ');
        console.log(String(e));
        out = '<p>Documentation not found at <a href="' + relPath + '"><code>' + relPath + '</code></a></p>';
    }
    return out;
};

/**
 * Function for including example files.
 * @param {String} text The path to the file to include.
 * @returns Returns the contents of the file formatted for HTML.
 */
MustacheComb.prototype.includeExample = function includeExample(relPath) {
    var out;
    out = this.includeFile(relPath);
    out = this.formatExample(out);
    return out;
};

/**
 * Function for including files. Files may contain mustache tags.
 * @param {String} text The path to the file to include.
 * @returns Returns the contents of the file.
 */
MustacheComb.prototype.mustacheIncluder = function mustacheIncluder(relPath) {
    var out,
        relPath;
    // the text of the include tag is a path, possibly surrounded with whitespace.
    out = this.includeFile(relPath);
    // Run the output through Mustache to parse any mustache tags it may contain.
    out = this.Mustache.to_html(this.templates.includes, this.mustacheTagHandlers, {includes : out});
    return out;
};

/**
 * Renders views from this.views objects array.
 * @function
 */
MustacheComb.prototype.renderViews = function renderViews(callback) {
    var my = this;
    this.views.forEach(function (view) {
        var rendered;
        my.emit('view render attempt ', {"view" : view});
        callback.call(my, view);
        my.emit('view rendered ', {"view" : view});
    });
};

exports.MustacheComb = MustacheComb;