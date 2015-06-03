/**
 * Created by Debarshi on 5/28/2015.
 */

var TrayIcon = (function () {
    function TrayIcon(icon, appInstance) {
        var Tray = require('tray');
        var path = require('path');
        this._instance = new Tray(path.join(__dirname,  '../../../serve/'+ icon));
        this._instance.on('clicked', this.showMail.bind(this));
        this._appInstance = appInstance;
        this._mailWindowInstance = null;
        this._gmailUrl = 'https://www.gmail.com';

        this.setToolTip('Fetching Info');

        this.setContextMenu([
            {
                label: 'Exit',
                click: (function () {
                    var $this = this;
                    var exec = require('child_process').exec;
                    exec('netstat -a -n -o | find "12346"', function (error, stdout, stderr) {
                        if (stdout.indexOf('LISTENING') !== -1) {
                            var processID = parseInt(stdout.substr(stdout.indexOf('LISTENING') + 'LISTENING'.length));
                            exec("Taskkill /PID " + processID + " /F", function (error, stdout, stderr) {
                                console.log('taskKilled:' + processID);
                                $this._appInstance.quit();
                            });
                        }
                        else {
                            $this._appInstance.quit();
                        }
                    });

                }).bind(this)
            }
        ]);
    }

    TrayIcon.prototype.setContextMenu = function (array) {
        var Menu = require('menu');
        var contextMenu = Menu.buildFromTemplate(array);
        this._instance.setContextMenu(contextMenu);
    };
    TrayIcon.prototype.getToolTip = function () {
        return this._toolTip;
    };
    TrayIcon.prototype.setToolTip = function (toolTip) {
        this._toolTip = toolTip;
        this._instance.setToolTip(toolTip);
    };
    TrayIcon.prototype.getInstance = function () {
        return this._instance;
    };
    TrayIcon.prototype.showDisplayBallon = function (icon, title, content) {
        if (this._instance) {
            var path = require('path');
            console.log(path.join(__dirname,  '../../../serve/'+ icon))
            this._instance.displayBalloon({
                icon: path.join(__dirname,  '../../../serve/'+ icon),
                title: title,
                content: content
            })
        }
    };
    TrayIcon.prototype.showMail = function () {
        if (this._mailWindowInstance) {
            if(!this._mailWindowInstance.isVisible()){
                this._mailWindowInstance.destroy();
            }
            else{
                return;
            }
        }
        var BrowserWindow = require('browser-window');
        this._mailWindowInstance = new BrowserWindow({
            //width: 800,
            //height: 600,
            "skip-taskbar": false,
            fullscreen: true,
            show: true
        });
        this._mailWindowInstance.maximize();
        this._mailWindowInstance.webContents.loadUrl(this._gmailUrl);
    };

    module.exports = TrayIcon;
}());