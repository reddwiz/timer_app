"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.webFrame.setZoomFactor(1.0);
electron_1.contextBridge.exposeInMainWorld('backend', {
    closeApp: () => electron_1.ipcRenderer.send('closeApp'),
    minimizeApp: () => electron_1.ipcRenderer.send('minimizeApp'),
    minimizeToSystemTray: () => electron_1.ipcRenderer.send('minimizeToSystemTray'),
    openMiniplayer: () => electron_1.ipcRenderer.send('openMiniplayer'),
    closeMiniplayer: () => electron_1.ipcRenderer.send('closeMiniplayer')
});
