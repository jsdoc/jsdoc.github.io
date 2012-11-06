/*jslint indent: 4, maxerr: 50, white: true, node: true, stupid: true */

/**
 * @file Utilities for executing commandlines.
 * @author <a href="matthewkastor@gmail.com">Matthew Kastor</a>
 * @version 0.1.0
 * @requires fs
 * @requires events
 * @requires util
 * @requires child_process
 * @exports asynchronousCommand
 * @exports commandRegister
 */

'use strict';

var fs, util, events, exec, commandRegister, asynchronousCommand;

fs     = require('fs');
events = require('events');
util   = require('util');
exec   = require('child_process').exec;

/**
 * Contains command register classes.
 * @namespace
 */
commandRegister = {};

/**
 * Executes an asynchronous command. For all intents and purposes this
 *  should be the same as running it on the command line. When the command
 *  is finished running the callback will be executed and any data sent to
 *  stdout, stderr, or any errors in attempting to run the command will be
 *  passed to it.
 * @function
 * @param {String} commandString The command you want to run.
 * @param {String} workingDirectory The path you want to start from.
 * @param {Function} callback Optional. A function to execute upon
 *  completion. The callback will be passed the error, stdout, and stderr
 *  arguments.
 * @requires child_process
 */
asynchronousCommand = function asynchronousCommand(commandString, workingDirectory, callback) {
    var child;
    
    callback = callback || function () {};
    
    child = exec(commandString,
        {
            cwd : workingDirectory
        },
        callback
    );
};

/**
 * Base command register class.
 * @emits {Object} 'command queue begin process' Emitted when the register begins processing the queue.
 * @emits {Object} 'command executing' Emitted as each command is started.
 * @emits {Object} 'command complete' Emitted as each command completes.
 * @emits {Object} 'waiting for commands to complete' Emitted when all commands on the queue have been started. Only applies to async registers.
 * @emits {Object} 'command queue processed' Emitted after all commands have returned.
 * @requires events
 * @requires util
 */
commandRegister.Base = function(name, sync) {
    var that, queue, counter;
    
    events.EventEmitter.call(this);
    
    that = this;
    queue = [];
    counter = queue.length;
    sync = (sync) ? true : false;
    
    
    /**
     * The name assigned to this commands register
     */
    this.name = name;
    
    function decriment(startDirectory, command) {
        counter -= 1;
        that.emit('command complete', {'register' : that.name, 'command' : command, 'startDirectory' : startDirectory});
        if(counter === 0) {
            that.emit('command queue processed', that.name);
        }
    }
    
    function process() {
        var command;
        
        if(queue.length === 0 && sync === false) {
            that.emit('waiting for commands to complete', that.name);
        }
        if(queue.length !== 0) {
            command = queue.shift();
            
            if(sync === true) {
                command(function() {
                    process();
                });
            } else {
                command();
                process();
            }
        }
    }
    
    /**
     * Pushes commands on to the command queue.
     * @param {String} command The command to execute
     * @param {String} startDirectory The working directory for the command to use when executing.
     * @param {Function} consoleDataHandler A callback function which will receive three parameters
     *  error, stdout, and stderr. 
     */
    this.addCommand = function addCommand(command, startDirectory, consoleDataHandler) {
        queue.push(function(callback) {
            callback = callback || function() {};
            consoleDataHandler = consoleDataHandler || function() {};
            that.emit('command executing', {'register' : that.name, 'command' : command, 'startDirectory' : startDirectory});
            asynchronousCommand(command, startDirectory, function(err, stdout, stderr) {
                consoleDataHandler(err, stdout, stderr);
                decriment(startDirectory, command);
                callback();
            });
        });
    };
    
    /**
     * Shifts commands off the command queue and executes them one by one. All commands
     *  will be given a callback as their only argument. If the command being
     *  processed from the queue decides not to execute this callback, no more
     *  commands will be shifted off the queue.
     * @function
     */
     this.process = function() {
        counter = queue.length;
        that.emit('command queue begin process', that.name);
        process();
    };
};
util.inherits(commandRegister.Base, events.EventEmitter);

/**
 * Represents a register for a set of commands which will be executed in order, one at a time.
 * @class
 * @param {String} name A name to identify this register.
 */
commandRegister.Synchronous = function Synchronous(name) {
    commandRegister.Base.call(this, name, true);
};
util.inherits(commandRegister.Synchronous, events.EventEmitter);

/**
 * Represents a register for a set of commands which will be executed simultaneously.
 * @class
 * @param {String} name A name to identify this register.
 */
commandRegister.Asynchronous = function Asynchronous(name) {
    commandRegister.Base.call(this, name, false);
};
util.inherits(commandRegister.Asynchronous, events.EventEmitter);


exports.asynchronousCommand = asynchronousCommand;
exports.commandRegister     = commandRegister;