/* 
 *
 *  main script
 *
 */

loop = window.localStorage.getItem("loop") === "true";
time_seconds = parseInt(window.localStorage.getItem("time") || "0");
saved_time = time_seconds;

const time_display: HTMLDivElement = document.getElementById('time') as HTMLDivElement;
set_html_time();

let active: boolean = false;
let interval_id: NodeJS.Timeout;
let progress_interval_id: NodeJS.Timeout;

// countdown logic
const countdown = (): void => {
    // timer ends then executes
    if (time_seconds < 1) {
        countdown_over();
        return;
    }

    // regular interval logic
    time_seconds--;
    set_html_time();
    progress_updater();
    console.log(`time left: ${time_seconds} seconds`);
    console.log(`saved time: ${saved_time}`);
};

// when countdown finishes, executes this logic
const countdown_over = (): void => {
    console.log('countdown is over');
    end_timer();
    play_sound();
};

const progress: HTMLDivElement = document.getElementById('progress') as HTMLDivElement;
// updates the progress bar
function progress_updater(): void {
    progress.style.width = `${calculate_progress()}%`;
    console.log('updating width to ' + calculate_progress());
}

// decide start or stop logic
function play(): void {
    // play the timer
    if (!active) {
        start_timer();
    } else {
        pause_timer();
    }
}

// start timer logic
function start_timer(): void {
    console.log('timer started');
    // ensures that new plays will contain the proper time
    if (time_seconds === 0) time_seconds = saved_time;
    start_countdown();
    set_active(true);
    set_text_pause();
}

// pauses the countdown
function pause_timer(): void {
    console.log('timer paused');
    clear_interval();
    set_active(false);
    set_text_play();
}

// ends the timer if loop is not true
function end_timer(): void {
    if (!loop) {
        console.log('timer over');
        clear_interval();
        set_active(false);
        set_text_play();
    } else {
        console.log('looping');
        time_seconds = saved_time;
    }
}

// sets timer activity
// (basically tells us if the timer is ticking down)
function set_active(boolean: boolean): void {
    active = boolean;
    hide_settings(boolean); // hides settings button
}

// starts the countdown and sets the interval id
// we need the interval id so we can stop the interval later
function start_countdown(): void {
    interval_id = setInterval(countdown, 1000);
}

// stops the recurring countdown function
function clear_interval(): void {
    clearInterval(interval_id);
}

// sets the html time to the time, but formatted as per convert_time()
function set_html_time(): void {
    time_display.textContent = convert_time(time_seconds);
}

// converts the seconds to a formatted string
function convert_time(remaining_time: number): string {
    // saving an instance of time locally
    remaining_time = time_seconds;

    // create 3 local variables to display each denomination
    let hour_text;
    let minute_text;
    let second_text;

    // convert each denomination to 00:00:00 format
    hour_text = Math.floor(remaining_time / 3600);
    if (hour_text < 10) hour_text = 0 + `${hour_text}`;
    remaining_time = remaining_time % 3600;
    minute_text = Math.floor(remaining_time / 60);
    if (minute_text < 10) minute_text = 0 + `${minute_text}`;
    remaining_time = remaining_time % 60;
    second_text = remaining_time;
    if (second_text < 10) second_text = 0 + `${second_text}`;

    return `${hour_text}:${minute_text}:${second_text}`;
}

// calculates the progress in reverse percentage (goes down from 100%)
function calculate_progress(): number {
    return 100 * (time_seconds / saved_time);
}


function set_text_play(): void {
    // sets the pause btn to play
    play_button.textContent = "play";
}

function set_text_pause(): void {
    // sets the play btn to pause
    play_button.textContent = "pause";
}

// opens the settings html
// TODO:
function open_settings(): void {
    // settings_div.classList.remove('hidden');
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
const body: HTMLDivElement = document.getElementById('body') as HTMLDivElement;
// enables dark mode on button press
function dark_mode(): void {
    body.classList.toggle('dark');
}

// misc vars and event listeners
const play_button: HTMLButtonElement = document.getElementById('play') as HTMLButtonElement;
const settings_button: HTMLButtonElement = document.getElementById('settings') as HTMLButtonElement;
const miniplayer_btn: HTMLButtonElement = document.getElementById('miniplayer') as HTMLButtonElement;
play_button.addEventListener('click', play);
settings_button.addEventListener('click', open_settings);
// dark mode for now as a prototype
miniplayer_btn.addEventListener('click', dark_mode);

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
