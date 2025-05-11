// type declaration file to declare globals

declare global {
    interface Window {
        backend: {
            minimizeToSystemTray: () => void;
            minimizeApp: () => void;
            closeApp: () => void;
            openMiniplayer: () => void;
        }
    }
}

export { };
