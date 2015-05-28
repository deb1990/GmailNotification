/**
 * Created by Debarshi on 5/28/2015.
 */

var TrayIcon = (function(){
    function TrayIcon(icon, appInstance){
        var Tray = require('tray');

        this._instance = new Tray(icon);
        this._appInstance = appInstance;

        this.setToolTip('Fetching Info');

        this.setContextMenu([
            {
                label: 'Exit',
                click: (function() {
                    this._appInstance.quit();
                }).bind(this)
            }
        ]);
    }
    TrayIcon.prototype.setContextMenu = function(array){
        var Menu = require('menu');
        var contextMenu = Menu.buildFromTemplate(array);
        this._instance.setContextMenu(contextMenu);
    };
    TrayIcon.prototype.getToolTip = function(){
        return this._toolTip;
    };
    TrayIcon.prototype.setToolTip = function(toolTip){
        this._toolTip = toolTip;
        this._instance.setToolTip(toolTip);
    };
    TrayIcon.prototype.getInstance = function(){
        return this._instance;
    };
    TrayIcon.prototype.showDisplayBallon = function(icon, title, content){
        if(this._instance) {
            this._instance.displayBalloon({
                icon: icon,
                title: title,
                content: content
            })
        }
    };

    module.exports = TrayIcon;
}());