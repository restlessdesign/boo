/*global
    require, Buffer
*/

var spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    phantom = spawn('phantomjs', ['ghost.js']),
    buffer, output, growl;

phantom.stdout.on('data', function(data) {
    buffer = new Buffer(data);
    output = buffer.toString('utf8');

    if (true || output.indexOf('pass') !== -1) {
        console.log('passed');

        try {
            growl = exec('growlnotify -m "Update detected!"', function(error, stdout, stderr) {
                // console.log('stdout: ' + stdout);
                // console.log('stderr: ' + stderr);

                // if (error !== null) {
                    // console.log('exec error: ' + error);
                // }
            });
        }
        catch(x) {
            console.log(x);
        }
    }
    else if (output.indexOf('fail') !== -1) {
        console.log('failed');
    }
    else {
        console.log(output);
    }
});