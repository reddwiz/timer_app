"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
const isSquirrelStartup = require('electron-squirrel-startup');
if (isSquirrelStartup) {
    electron_1.app.quit();
}
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        width: 300,
        height: 300,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            preload: node_path_1.default.join(__dirname, '../../dist/renderer/preload.js'),
        },
    });
    mainWindow.loadFile(node_path_1.default.join(__dirname, '../../src/html/index.html'));
    return mainWindow;
};
let tray;
let mainWindow;
electron_1.app.whenReady().then(() => {
    mainWindow = createWindow();
    const imagePath = node_path_1.default.join(__dirname, "../../src/assets/images/timer_app_logo.png");
    const icon = electron_1.nativeImage.createFromPath(imagePath);
    tray = new electron_1.Tray(icon);
    const contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Minimize', type: 'normal', click: function () {
                mainWindow.hide();
            }
        },
        { label: 'Quit', type: 'normal', role: 'quit' }
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Desktop Timer');
    tray.setTitle('Timer App');
    tray.on('click', function () {
        mainWindow.show();
    });
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
function openMiniplayer() {
    createMiniplayerWindow();
    hideMainWindow();
}
function createMiniplayerWindow() {
    const miniplayer = new electron_1.BrowserWindow({
        width: 300,
        height: 300,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            preload: node_path_1.default.join(__dirname, '../renderer/preload.js'),
        },
    });
    miniplayer.loadFile(node_path_1.default.join(__dirname, '../html/miniplayer.html'));
    return miniplayer;
}
function hideMainWindow() {
    mainWindow.hide();
}
