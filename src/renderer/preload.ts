import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('backend', {
    closeApp: () => ipcRenderer.send('closeApp'),
    minimizeApp: () => ipcRenderer.send('minimizeApp'),
    minimizeToSystemTray: () => ipcRenderer.send('minimizeToSystemTray'),
    openMiniplayer: () => ipcRenderer.send('openMiniplayer')
});
