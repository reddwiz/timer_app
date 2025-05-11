"use strict";
const close_app_btn = document.getElementById('close_app_btn');
const minimize_app_btn = document.getElementById('minimize_app_btn');
const minimize_to_system_btn = document.getElementById('minimize_to_system_btn');
close_app_btn.addEventListener('click', () => {
    window.backend.closeApp();
});
minimize_app_btn.addEventListener('click', () => {
    window.backend.minimizeApp();
});
minimize_to_system_btn.addEventListener('click', () => {
    window.backend.minimizeToSystemTray();
});
