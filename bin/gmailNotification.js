/**
 * Created by Debarshi on 5/24/2015.
 */
var Tray = require('tray');
var BrowserWindow = require('browser-window');
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
            { label: 'Exit' }
        ]);
        this.appIcon.instance.setContextMenu(contextMenu);

        this.appIcon.instance.setToolTip(this.appIcon.toolTip);
        this.browserInstance = new BrowserWindow({
            width: 800,
            height: 600,
            //"skip-taskbar": true,
            //show: false
        });
        this.browserInstance.loadUrl(this.url);
        this.browserInstance.openDevTools();
    },
    emailCount: function (event, arg) {
        var msg;
        if (arg === 100) {
            msg = 'You have 100+ unread messages'
        }
        else {
            msg = 'You have ' + arg + ' unread messages';
        }
        gmailNotification.appIcon.displayBallon('icon.png', 'Gmail', msg);
    }
};
module.exports = gmailNotification;
