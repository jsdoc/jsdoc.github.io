/*jslint indent: 4, maxerr: 50, white: true, node: true, stupid: true */

var cmd, syncy, asyncy;


cmd = require('atropa-cmd');
syncy = new cmd.commandRegister.Synchronous('Syncy');
asyncy = new cmd.commandRegister.Asynchronous('Asyncy');
showOffCommandRegister(syncy);
showOffCommandRegister(asyncy);

function showOffCommandRegister(register) {
    register.on('command queue begin process', function(e) {
        console.log('command queue begin process');
        console.dir(e);
        console.log();
    });
    register.on('command executing', function(e) {
        console.log('command executing');
        console.dir(e);
        console.log();
    });
    register.on('command complete', function(e) {
        console.log('command complete');
        console.dir(e);
        console.log();
    });
    register.on('waiting for commands to complete', function(e) {
        console.log('waiting for commands to complete');
        console.dir(e);
        console.log();
    });
    register.on('command queue processed', function(e) {
        console.log('command queue processed');
        console.dir(e);
        console.log();
    });
    
    function logStdout(err, stdout, stderr) {
        console.log(stdout);
    }

    register.addCommand('dir', 'C:\\Users\\kastor\\Desktop', logStdout);
    register.addCommand('tree /A', 'C:\\Users\\kastor\\Desktop', logStdout);
    register.process();
}