
const { app, BrowserWindow } = require('electron'); // electron
const isDev = require('electron-is-dev'); // To check if electron is in development mode
const path = require('path');
const url = require('url');

let mainWindow;

// Initializing the Electron Window
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1050,
        height: 700,
        minWidth: 980,
        minHeight: 700,
        frame: false,
        webPreferences: {
            // The preload file where we will perform our app communication
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: isDev
                ? path.join(app.getAppPath(), './public/preload.js') // Loading it from the public folder for dev
                : path.join(app.getAppPath(), './build/preload.js'), // Loading it from the build folder for production
            worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
        },
    });

    // Loading a webpage inside the electron window we just created
    /*mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000' // Loading localhost if dev mode
            : `file://${path.join(__dirname, '../build/index.html')}` // Loading build file if in production
    );*/

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : // Loading localhost if dev mode
        url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
      }));

    // Setting Window Icon - Asset file needs to be in the public/images folder.
    // !!!!!!!!mainWindow.setIcon(path.join(__dirname, 'images/appicon.ico'));

};

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
    'userData',
    isDev
        ? path.join(app.getAppPath(), 'userdata/') // In development it creates the userdata folder where package.json is
        : path.join(process.resourcesPath, 'userdata/') // In production it creates userdata folder in the resources folder
);

// When the app is ready to load
app.whenReady().then(async () => {
    await createWindow(); // Create the mainWindow
});

// Exiting the app
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Activating the app
app.on('activate', () => {
    if (mainWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Logging any exceptions
process.on('uncaughtException', (error) => {
    console.log(`Exception: ${error}`);
    if (process.platform !== 'darwin') {
        app.quit();
    }
});