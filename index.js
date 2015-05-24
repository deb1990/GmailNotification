var app = require('app');
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');


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
var appIcon = null;
ipc.on('asynchronous-message', function(event, arg) {
    console.log(arg);  // prints "ping"
    //appIcon = new Tray('/path/to/my/icon');
    appIcon.displayBalloon({
        icon: 'icon.png',
        title : 'Gmail',
        content: arg.toString() + ' new Messages'
    });
    appIcon.setToolTip('Fetching Info');
});






app.on('ready', function () {
    appIcon = new Tray('icon.png');
    appIcon.setToolTip('Fetching Info');


    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        //"skip-taskbar": true,
        //show: false
    });

    // and load the index.html of the app.
    mainWindow.openDevTools();
    mainWindow.loadUrl('http://localhost:8080');
    //mainWindow.reloadIgnoringCache();


});
