/**
 * Created by Debarshi on 5/24/2015.
 */
var Tray = require('tray');
var BrowserWindow = require('browser-window');
var ipc = require('ipc');
var Menu = require('menu');
var gmailNotification = {
    appIcon: {
        icon: 'icon.png',
        toolTip: 'Fetching Info',
        instance: null,
        displayBallon: function (icon, title, content) {
            this.instance.displayBalloon({
                icon: icon,
                title: title,
                content: content
            })
        }
    },
    url: 'http://localhost:12346',
    browserInstance: null,
    init: function () {
        this.appIcon.instance = new Tray(this.appIcon.icon);

        var contextMenu = Menu.buildFromTemplate([
            {label: 'Exit'}
        ]);
        this.appIcon.instance.setContextMenu(contextMenu);

        this.appIcon.instance.setToolTip(this.appIcon.toolTip);
        this.browserInstance = new BrowserWindow({
            width: 800,
            height: 600,
            "skip-taskbar": true,
            show: false
        });
        this.browserInstance.loadUrl(this.url);
        this.browserInstance.openDevTools();
    },
    lastEmailId: null,
    emailCount: function (event, arg) {
        var txt,
            messages = arg.messages,
            count = arg.count;

        if (arg.firstMsg) {
            gmailNotification.lastEmailId = messages[0].id;
            gmailNotification.showUnreadMsgCount(count);
            gmailNotification.appIcon.instance.setToolTip(count + ' new emails');
        }
        else {
            if (count > 0) {
                gmailNotification.appIcon.instance.setToolTip(count + ' new emails');
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i].id === gmailNotification.lastEmailId) {
                        if (i > 0) {
                            var idArr = [];
                            for (var j = 0; j < i; j++) {
                                idArr.push(messages[j].id)
                            }
                            console.log(j);
                            gmailNotification.browserInstance.webContents.send('messageinfo_torend', idArr);
                            txt = i + ' new message';
                            gmailNotification.appIcon.displayBallon('icon.png', 'Gmail', txt);
                        }
                        return;
                    }
                }
                gmailNotification.lastEmailId = messages[0].id;
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
        this.appIcon.displayBallon('icon.png', 'Gmail', txt);
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
        gmailNotification.appIcon.displayBallon('icon.png', 'New email', txt);
    }
};
module.exports = gmailNotification;
