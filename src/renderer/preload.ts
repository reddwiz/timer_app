import { contextBridge, ipcRenderer, webFrame } from "electron";

webFrame.setZoomFactor(1.0);

contextBridge.exposeInMainWorld('backend', {
    closeApp: () => ipcRenderer.send('closeApp'),
    minimizeApp: () => ipcRenderer.send('minimizeApp'),
    minimizeToSystemTray: () => ipcRenderer.send('minimizeToSystemTray'),
    openMiniplayer: () => ipcRenderer.send('openMiniplayer')
});
