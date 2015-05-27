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
            //show: false
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
        }
        else {
            if (count > 0) {
                for (var i = 0; i < messages.length; i++) {
                    if (messages[i].id === gmailNotification.lastEmailId) {
                        if (i > 0) {
                            var idArr = [];
                            for (var j = 0; j <= i; i++) {
                                idArr.push(messages[j].id)
                            }
                            ipc.send('messageinfo_torend', idArr);
                            txt = i + ' new message';
                            gmailNotification.appIcon.displayBallon('icon.png', 'Gmail', txt);
                            gmailNotification.lastEmailId = messages[0].id;
                        }
                        return;
                    }
                }
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
    }
};
module.exports = gmailNotification;
