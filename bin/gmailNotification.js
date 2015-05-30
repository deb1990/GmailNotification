/**
 * Created by Debarshi on 5/24/2015.
 */
var BrowserWindow = require('browser-window');
var ipc = require('ipc');

var TrayIcon = require('./class/TrayIcon.js');

var gmailNotification = {
    trayIcon: null,
    url: 'http://localhost:12346',
    appInstance: null,
    browserInstance: null,
    init: function (appInstance) {
        this.appInstance = appInstance;
        this.trayIcon = new TrayIcon('icon.png', this.appInstance);

        this.browserInstance = new BrowserWindow({
            width: 800,
            height: 600,
            "skip-taskbar": true,
            show: false
        });
        this.browserInstance.webContents.loadUrl(this.url);
        this.loaded = false;
        this.browserInstance.webContents.on('dom-ready', function(){
            if(!this.loaded) {
                this.loaded = true;
                this.browserInstance.webContents.reloadIgnoringCache();
            }
        }.bind(this));

        this.browserInstance.openDevTools();
    },
    lastEmailId: null,
    emailCount: function (event, arg) {
        var txt,
            messages = arg.messages,
            count = arg.count;

        if (arg.firstMsg) {
            if(messages[0]) {
                this.lastEmailId = messages[0].id;
            }
            this.showUnreadMsgCount(count);
            this.trayIcon.setToolTip(count + ' new emails');
        }
        else {
            if (count > 0) {
                this.trayIcon.setToolTip(count + ' new emails');
                if(!this.lastEmailId){
                    var idArr = [];
                    for (var i = 0; i < messages.length; i++) {
                        idArr.push(messages[i].id);
                    }
                    this.browserInstance.webContents.send('messageinfo_torend', idArr);
                    txt = i + ' new message';
                    this.trayIcon.showDisplayBallon('icon.png', 'Gmail', txt);
                    this.lastEmailId = messages[0].id;
                }
                else {
                    for (var i = 0; i < messages.length; i++) {
                        if (messages[i].id === this.lastEmailId) {
                            if (i > 0) {
                                var idArr = [];
                                for (var j = 0; j < i; j++) {
                                    idArr.push(messages[j].id)
                                }
                                this.browserInstance.webContents.send('messageinfo_torend', idArr);
                                txt = i + ' new message';
                                this.trayIcon.showDisplayBallon('icon.png', 'Gmail', txt);
                                this.lastEmailId = messages[0].id;
                            }
                            return;
                        }
                    }
                }
            }
            else{
                this.trayIcon.setToolTip(count + ' new emails');
                this.lastEmailId = null;
            }
        }

    },
    showUnreadMsgCount: function (count) {
        if (count === 100) {
            txt = 'You have 100+ unread messages'
        }
        else if (count === 0) {
            txt = 'You have no unread messages';
        }
        else {
            txt = 'You have ' + count + ' unread messages';
        }
        this.trayIcon.showDisplayBallon('icon.png', 'Gmail', txt);
    },
    showMsgPopUp: function (event, msgs) {
        var data = msgs;

        var txt = "",
            sub,
            from;
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].data.length; j++) {
                if (data[i].data[j].name === "From") {
                    from = data[i].data[j].value + '\n';
                }
                if (data[i].data[j].name === "Subject") {
                    sub = 'Subject: ' + data[i].data[j].value + '\n';
                }
            }
            txt += from + sub + data[i].snippet + '\n';
        }
        this.trayIcon.showDisplayBallon('icon.png', 'New email', txt);
    }
};
module.exports = gmailNotification;
