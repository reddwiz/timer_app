/* 
 *  this is the render script for backend functionality
*/

// backend buttons
const close_app_btn: HTMLButtonElement = document.getElementById('close_app_btn') as HTMLButtonElement;
const minimize_app_btn: HTMLButtonElement = document.getElementById('minimize_app_btn') as HTMLButtonElement;
const minimize_to_system_btn: HTMLButtonElement = document.getElementById('minimize_to_system_btn') as HTMLButtonElement;
close_app_btn.addEventListener('click', () => {
    window.backend.closeApp();
});
minimize_app_btn.addEventListener('click', () => {
    window.backend.minimizeApp();
});
minimize_to_system_btn.addEventListener('click', () => {
    window.backend.minimizeToSystemTray();
});
