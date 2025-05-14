"use strict";
const progress = document.getElementById('progress');
function progress_updater() {
    progress.style.width = `${calculate_progress()}%`;
}
function calculate_progress() {
    return 100 * (time_seconds / saved_time);
}
function open_settings() {
    window.location.href = "../html/settings.html";
}
function hide_settings(hide) {
    if (hide) {
        settings_button.classList.add('hidden');
    }
    else {
        settings_button.classList.remove('hidden');
    }
}
function open_miniplayer() {
    window.backend.openMiniplayer();
}
const settings_button = document.getElementById('settings');
const miniplayer_btn = document.getElementById('miniplayer');
settings_button.addEventListener('click', open_settings);
miniplayer_btn.addEventListener('click', open_miniplayer);
