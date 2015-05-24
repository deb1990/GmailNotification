var app = require('app');
var ipc = require('ipc');

var gmail = require('./bin/gmailNotification.js');

app.on('ready', function () {
    gmail.init();
    ipc.on('email-count', gmail.emailCount);
});



//var express = require('express'),
//    expr = express(),
//    port = 8080;
//
//expr.use(express.static(__dirname + '/'));
//expr.listen(port);
//console.log(__dirname + '/index.html');


//var exec = require('child_process').exec;
//exec('cd '+__dirname+ ' & http-server', function (error, stdout, stderr) {
//    // output is in stdout
//    console.log(error, stdout, stderr)
//});
