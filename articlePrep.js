/*jslint indent: 4, maxerr: 50, white: true, node: true, sloppy: true, stupid: true */

/**
 * @file Build tool for JSDoc 3 documentation
 * @author <a href="matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 20121027
 * @requires events
 * @requires child_process
 * @requires fs
 * @requires path
 */

var events, exec, fs, path, emitter;

events = require('events');
exec = require('child_process').exec;
fs = require('fs');
path = require('path');
emitter = new events.EventEmitter();

/**
 * Executes an asynchronous command.
 *  For all intents and purposes this
 *  should be the same as running it
 *  on the command line. When the
 *  command is finished running the
 *  callback will be executed and
 *  any data sent to stdout, stderr,
 *  or any errors in attempting to run
 *  the command will be logged to the
 *  console.
 * @function
 * @param {String} commandString The
 *  command you want to run.
 * @param {String} workingDirectory
 *  The path you want to start from.
 * @param {Function} callback Optional.
 *  A function to execute upon completion.
 *  Defaults to <code>function(){}</code>
 */
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
 * @function
 * @param {path} somewhere The path to verify.
 * @param {String} message The message to include with
 *  the error if thrown.
 * @returns {Boolean} Returns true on success.
 * @emits {Error} Emits an error if path is not a directory.
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
 * @function
 * @param {path} aFile The path to verify.
 * @param {String} message The message to include with
 *  the error if thrown.
 * @returns {Boolean} Returns true on success.
 * @emits {Error} Emits an error if path is not a file.
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
 * Verifies that the locations of jsdoc
 *  and the documentation project are
 *  known.
 * @function
 * @returns {Object} Returns an object
 *  containing the resolved paths to
 *  both projects, or an error will
 *  be emitted by one of the
 *  verifircation methods.
 */
function verifyJsdocPathsAndFiles() {
    var out, errorMessages;
    
    out = {
        jsdocLocation     : process.argv[2] || path.resolve(process.cwd(), '../jsdoc'),
        jsdocDocsLocation : process.argv[3] || path.resolve(process.cwd(), '../jsdoc3.github.com')
    };
    
    errorMessages = {
        'usage' : 'Usage: node cp <jsdoc Location> <jsdoc3.github.com Location>'
    };
    
    dirMustExist(out.jsdocLocation, errorMessages.usage);
    dirMustExist(out.jsdocDocsLocation, errorMessages.usage);
    fileMustExist(path.resolve(out.jsdocLocation, 'jsdoc.js'), errorMessages.usage);
    fileMustExist(path.resolve(out.jsdocDocsLocation, 'jakefile.js'), errorMessages.usage);
    return out;
}

/**
 * Calls jsdoc --describeTags htmlFiles
 *  -d <jsdoc3.github.com> to update the
 *  tags definition files. Then calls
 *  jake to rebuild the docs.
 * @function
 */
function main() {
    var jakeApiDirectories, asynchronousCommands, jsdocPaths;
    
    emitter.on('error',
        function(err) {
            console.log(err);
            process.exit(1);
        }
    );
    
    jsdocPaths = verifyJsdocPathsAndFiles();
    
    jakeApiDirectories = {
        'describeTagsOutputDir' : path.resolve(jsdocPaths.jsdocDocsLocation, 'Jake/API/describeTags'),
        'jsdocRootOutputDir'    : path.resolve(jsdocPaths.jsdocDocsLocation, 'Jake/API/jsdoc')
    };
    
    asynchronousCommands = {
        'describeTagsCommand' : 'jsdoc --describeTags htmlFiles -d ' + jakeApiDirectories.describeTagsOutputDir,
        'jake'                : 'jake' 
    };
    
    /**
     * Runs jsdoc using the source and destination
     *  supplied.
     * @function
     * @param {String} source The path to the source
     *  directory or file.
     * @param {String} destination The path to the
     *  destination directory.
     * @param {Function} callback Optional.
     *  A function to execute upon completion.
     *  Defaults to <code>function(){}</code>
     */
    function runJsdocOn(recurse, source, destination, callback) {
        if(recurse === true) { recurse = ' -r'; } else { recurse = ''; }
        source        = path.resolve(source);
        source        = path.relative(jsdocPaths.jsdocLocation, source);
        destination   = path.resolve(destination);
        var configFileLoc = path.resolve(jsdocPaths.jsdocDocsLocation, 'Jake/confFiles/conf.json');
        asynchronousCommand(
            'jsdoc' + recurse + ' -p ' + source + ' -d ' + destination + ' -c ' + configFileLoc,
            jsdocPaths.jsdocLocation,
            callback
        );
    }
    
    /**
     * Calls jsdoc --describeTags htmlFiles
     *  -d <jsdoc3.github.com> to update the
     *  tags definition files.
     * @function
     * @param {Function} callback Optional.
     *  A function to execute upon completion.
     *  Defaults to <code>function(){}</code>
     */
    function rebuildDescribeTags(callback) {
        asynchronousCommand(
            asynchronousCommands.describeTagsCommand,
            jsdocPaths.jsdocLocation,
            callback
        );
    }
    
    /**
     * Runs jake in the documentation project
     * @function
     * @param {Function} callback Optional.
     *  A function to execute upon completion.
     *  Defaults to <code>function(){}</code>
     */
    function runJake(callback) {
        asynchronousCommand(
            asynchronousCommands.jake,
            jsdocPaths.jsdocDocsLocation,
            callback
        );
    }
    
    /**
     * Runs main in the right order.
     *  Runs JSDoc on itself, recursively through
     *  several subfolders and non recursively
     *  at the root of the project. It then
     *  fetches the describeTags htmlFiles.
     *  Last, jake is called and the articles
     *  are rebuilt.
     * @function
     */
    function mainAction() {
        var places, recurse, callback;
        places = [
            'rhino_modules',
            'templates',
            'plugins',
            'node_modules',
            'jsdoc.js'
        ];
        
        recurse = true;
        callback = function(){};
        
        places.forEach(function(place, idx) {
            
            if(idx === (places.length - 1)) {
                recurse = false;
                callback = function () {
                    rebuildDescribeTags(runJake);
                };
            }
            
            runJsdocOn(
                recurse,
                jsdocPaths.jsdocLocation + '/' + place,
                jakeApiDirectories.jsdocRootOutputDir + '/' + place,
                callback
            );
        });
    }
    mainAction();
}

main();