import { app, BrowserWindow, Tray, Menu, nativeImage, ipcMain } from 'electron';
import path from 'node:path';
const isSquirrelStartup: boolean = require('electron-squirrel-startup');

// handle creating/removing shortcuts on Windows when installing/uninstalling.
if (isSquirrelStartup) {
    app.quit();
}

const createWindow = (): BrowserWindow => {
    // create the browser window.
    const mainWindow: BrowserWindow | null = new BrowserWindow({
        width: 300,
        height: 300,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, '../../dist/renderer/preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../../src/html/index.html'));

    return mainWindow;
};

let tray: Tray;
let mainWindow: BrowserWindow;
let miniplayerWindow: BrowserWindow;

app.whenReady().then(() => {
    mainWindow = createWindow();

    type path = string;
    const imagePath: path = path.join(__dirname, "../../src/assets/images/timer_app_logo.png");
    const icon = nativeImage.createFromPath(imagePath);
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Minimize', type: 'normal', click: function() {
                mainWindow.hide();
            }
        },
        { label: 'Quit', type: 'normal', role: 'quit' }
    ]);

    tray.setContextMenu(contextMenu);
    tray.setToolTip('Desktop Timer');
    tray.setTitle('Timer App');
    tray.on('click', function() {
        mainWindow.show();
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('openMiniplayer', () => {
    hideMainWindow();
    createMiniplayerWindow();
});

ipcMain.on('closeMiniplayer', () => {
    destroyMiniplayerWindow();
    showMainWindow();
});

function createMiniplayerWindow(): BrowserWindow {
    miniplayerWindow = new BrowserWindow({
        width: 188,
        height: 54,
        autoHideMenuBar: true,
        alwaysOnTop: true,
        frame: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, '../renderer/preload.js'),
        },
    });

    miniplayerWindow.loadFile(path.join(__dirname, '../../src/html/miniplayer.html'));

    return miniplayerWindow;
}

function destroyMiniplayerWindow() {
    miniplayerWindow.close();
}

function hideMainWindow() {
    mainWindow.hide();
}

function showMainWindow() {
    mainWindow.show();
}

ipcMain.on('closeApp', () => {
    app.quit();
})

ipcMain.on('minimizeToSystemTray', () => {
    mainWindow.hide();
});

ipcMain.on('minimizeApp', () => {
    mainWindow.minimize();
});
