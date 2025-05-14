/* 
 *
 *  main script
 *
 */

const progress: HTMLDivElement = document.getElementById('progress') as HTMLDivElement;
// updates the progress bar
function progress_updater(): void {
    progress.style.width = `${calculate_progress()}%`;
}

// calculates the progress in reverse percentage (goes down from 100%)
function calculate_progress(): number {
    return 100 * (time_seconds / saved_time);
}

// opens the settings html
function open_settings(): void {
    window.location.href = "../html/settings.html";
}

// hides the settings button when active
function hide_settings(hide: boolean): void {
    if (hide) {
        settings_button.classList.add('hidden');
    } else {
        settings_button.classList.remove('hidden');
    }
}

// TODO:
function open_miniplayer(): void {
    window.backend.openMiniplayer();
}

// vars and event listeners
const settings_button: HTMLButtonElement = document.getElementById('settings') as HTMLButtonElement;
const miniplayer_btn: HTMLButtonElement = document.getElementById('miniplayer') as HTMLButtonElement;
settings_button.addEventListener('click', open_settings);
miniplayer_btn.addEventListener('click', open_miniplayer);
