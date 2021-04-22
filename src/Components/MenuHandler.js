
const $ = require('jquery');
const { remote } = require('electron');
var win = remote.getCurrentWindow();
const { getCurrentWindow, globalShortcut } = require('electron').remote;


$(window).on("load", function () {
    console.log("loaded");

    $("#minimize").click(function () {
        console.log("minimize");
        win.minimize();
    });

    $("#maximize").click(function () {
        console.log("maximize");
        if (win.isMaximized()) {
            win.unmaximize();
        } else {
            win.maximize();
        }
    });

    $("#close").click(function () {
        console.log("close");
        win.close();
    });

});

var reload = ()=>{
    getCurrentWindow().reload()
  }
  
  globalShortcut.register('F5', reload);
  globalShortcut.register('CommandOrControl+R', reload);
  // here is the fix bug #3778, if you know alternative ways, please write them
  window.addEventListener('beforeunload', ()=>{
    globalShortcut.unregister('F5', reload);
    globalShortcut.unregister('CommandOrControl+R', reload);
  })