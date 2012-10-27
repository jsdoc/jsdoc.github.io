/*jslint indent: 4, maxerr: 50, white: true, node: true, sloppy: true, stupid: true */

/**
 * @file Build tool for JSDoc 3 documentation
 * @author <a href="matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20121027
 */

var events, exec, fs, path, emitter;

events = require('events');
exec = require('child_process').exec;
fs = require('fs');
path = require('path');
emitter = new events.EventEmitter();

function asynchronousCommand(commandString, workingDirectory, callback) {
    var child;
    
    callback = callback || function () {};
    
    child = exec(commandString,
        {
            cwd : workingDirectory
        },
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            callback();
        }
    );
}

/**
 * If the supplied path is not a directory emit an error.
 * @param {path} somewhere The path to verify.
 * @param {String} message The message to include with
 *  the error if thrown.
 * @returns {Boolean} Returns true on success.
 * @emits {Error} Throws error if path is not a directory.
 */
function dirMustExist(aDirectory, message) {
    if(fs.existsSync(aDirectory)) {
        if(fs.statSync(aDirectory).isDirectory()) {
            return true;
        }
    }
    console.log(message);
    emitter.emit('error', aDirectory + ' is not a directory');
}

/**
 * If the supplied path is not a file emit an error.
 * @param {path} aFile The path to verify.
 * @param {String} message The message to include with
 *  the error if thrown.
 * @returns {Boolean} Returns true on success.
 * @emits {Error} Throws error if path is not a file.
 */
function fileMustExist(aFile, message) {
    if(fs.existsSync(aFile)) {
        if(fs.statSync(aFile).isFile()) {
            return true;
        }
    }
    console.log(message);
    emitter.emit('error', aFile + ' is not a file');
}

/**
 * Calls jsdoc --describeTags htmlFiles
 *  -d <jsdoc3.github.com> to update the
 *  tags definition files. Then calls
 *  jake to rebuild the docs.
 * @function
 */
function main() {
    var errorMessages, jsdocLocation, jsdocDocsLocation, describeTagsCommand, describeDocsOutputDir;
    
    errorMessages = {
        'usage' : 'Usage: node cp <jsdoc Location> <jsdoc3.github.com Location>'
    };
    
    emitter.on('error',
        function(err) {
            console.log(err);
            process.exit(1);
        }
    );
    
    jsdocLocation         = process.argv[2] || path.resolve(process.cwd(), '../jsdoc');
    jsdocDocsLocation     = process.argv[3] || path.resolve(process.cwd(), '../jsdoc3.github.com');
    
    dirMustExist(jsdocLocation, errorMessages.usage);
    dirMustExist(jsdocDocsLocation, errorMessages.usage);
    fileMustExist(path.resolve(jsdocLocation, 'jsdoc.js'), errorMessages.usage);
    fileMustExist(path.resolve(jsdocDocsLocation, 'jakefile.js'), errorMessages.usage);
    
    describeDocsOutputDir = path.resolve(jsdocDocsLocation, 'Jake/API/describeTags');
    describeTagsCommand   = 'jsdoc --describeTags htmlFiles -d ' + describeDocsOutputDir;
    
    asynchronousCommand(describeTagsCommand, jsdocLocation, function() {
        console.log('do it');
        asynchronousCommand('jake', jsdocDocsLocation);
    });
}

main();