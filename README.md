# Initio

## Basic Commands with concurrently
1. `yarn install` install the dependencys.
2. `yarn run dev` starts Frontend and Express Server.
3. `yarn run electron` starts the electron app.

###  Or run all components seperatly 
1. `yarn start` starts the react app on port 3000.
2. `cd ./src/Backend` followed by `node Server.js` starts the Backend Express Server on port 5000.
3. `yarn run electron` starts the electron app.


# Create React App & Electron Application

## Basic Recipe
1. run `create-react-app` to generate a basic React application
2. run `npm install --save-dev electron`
3. add `main.js` from [electron-quick-start](https://github.com/electron/electron-quick-start) (we’ll rename it to `electron-starter.js`, for clarity)
4. modify call to `mainWindow.loadURL` (in `electron-starter.js`) to use `localhost:3000` (webpack-dev-server)
5. add a main entry to `package.json` for `electron-starter.js`
6. add a run target to start Electron to `package.json`
7. `npm start` followed by `npm run electron`


## Steps 1 and 2 are pretty straightforward. Here’s the code for steps 3 and 4:

```
const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadURL('http://localhost:3000');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

```

## And for steps 5 and 6:

```
{
  "name": "electron-with-create-react-app",
  "version": "0.1.0",
  "private": true,
  "devDependencies": {
    "electron": "^1.4.14",
    "react-scripts": "0.8.5"
  },
  "dependencies": {
    "react": "^15.4.2",
    "react-dom": "^15.4.2"
  },
  "main": "src/electron-starter.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "electron": "electron ."
  }
}

```

## When you run the npm commands in step 7 both apps are running.

more infos at:

https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/
