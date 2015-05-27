var app = require('app');
var ipc = require('ipc');
var gmail = require('./bin/gmailNotification.js');


app.on('ready', function () {
    var exec = require('child_process').exec;
    exec('netstat -a -n -o | find "12346"', function (error, stdout, stderr) {
        if (stdout.indexOf('LISTENING') !== -1) {
            var processID = parseInt(stdout.substr(stdout.indexOf('LISTENING') + 'LISTENING'.length));
            exec("Taskkill /PID " + processID + " /F", function (error, stdout, stderr) {
                console.log('taskKilled');
                exec("'cd ' + __dirname + ' & http-server -p 12346 -c-1'", function (error, stdout, stderr) {
                });
                start();
            });
        }
        else {
            exec("'cd ' + __dirname + ' & http-server -p 12346 -c-1'", function (error, stdout, stderr) {
            });
            start();
        }
    });
});

function start() {
    gmail.init();
    ipc.on('email-count', gmail.emailCount);
    ipc.on('messageinfo_tomain', gmail.showMsgPopUp);
}

