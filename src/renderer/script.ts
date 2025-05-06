/* 
 *
 *    Main App Script File
 *
 *
 * */

let time_seconds: number = 0; // default is 0 seconds
let saved_time: number = 0; // storing their time as a var to loop with
let interval_id: NodeJS.Timeout;
let progress_interval_id: NodeJS.Timeout;
let active: boolean = false;
let loop: boolean = false; // dont loop by default
// im pretty sure loading the audio earlier helps with delay
const audio: any = new Audio("C:\\Users\\andre\\Downloads\\Tuturu sound effect.mp4");

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

// changes the loop to reverse
function set_loop(): void {
    loop = !loop;
    change_loop_text();
}

// changes loop text to on or off
function change_loop_text(): void {
    if (loop) {
        loop_button.textContent = "loop: on";
    } else {
        loop_button.textContent = "loop: off";
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

function clear_interval(): void {
    clearInterval(interval_id);
}

// sets the html time to the time, but formatted as per convert_time()
const time_display: HTMLDivElement = document.getElementById('time') as HTMLDivElement;
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

const hour_field: HTMLDivElement = document.getElementById('hour_field') as HTMLDivElement;
const minute_field: HTMLDivElement = document.getElementById('minute_field') as HTMLDivElement;
const second_field: HTMLDivElement = document.getElementById('second_field') as HTMLDivElement;
// set the time based on fields
function initialize_timer(): void {
    const hours: number = Number(hour_field.textContent);
    const minutes: number = Number(minute_field.textContent);
    const seconds: number = Number(second_field.textContent);
    console.log('setting timer');
    set_time(hours * 3600 + minutes * 60 + seconds);
    set_html_time();
    progress_updater();
}

// calculates the progress in reverse percentage (goes down from 100%)
function calculate_progress(): number {
    return 100 * (time_seconds / saved_time);
}

// set the time
function set_time(time_param: number): void {
    time_seconds = time_param;
    saved_time = time_param;
    console.log(`time was set to: ${time_param}`);
    console.log(`saved_time was set to ${saved_time}`);
}

function set_text_play(): void {
    // sets the pause btn to play
    play_button.textContent = "play";
}

function set_text_pause(): void {
    // sets the play btn to pause
    play_button.textContent = "pause";
}

const settings_div: HTMLDivElement = document.getElementById('settings_div') as HTMLDivElement;
// opens the settings html
// TODO:
function open_settings(): void {
    // settings_div.classList.remove('hidden');
    window.location.href = "../html/settings.html";
}

// closes the settings div
function close_settings(): void {
    // settings_div.classList.add('hidden');
    // initialize_timer();
    window.location.href = "../html/index.html";
}

// hides the settings button when active
function hide_settings(hide: boolean): void {
    // show is a boolean value
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

// variables and event listeners for the setting timer buttons
const increase_hour_btn: HTMLButtonElement = document.getElementById('increase_hour') as HTMLButtonElement;
const decrease_hour_btn: HTMLButtonElement = document.getElementById('decrease_hour') as HTMLButtonElement;
const increase_minute_btn: HTMLButtonElement = document.getElementById('increase_minute') as HTMLButtonElement;
const decrease_minute_btn: HTMLButtonElement = document.getElementById('decrease_minute') as HTMLButtonElement;
const increase_second_btn: HTMLButtonElement = document.getElementById('increase_second') as HTMLButtonElement;
const decrease_second_btn: HTMLButtonElement = document.getElementById('decrease_second') as HTMLButtonElement;
increase_hour_btn.addEventListener('click', increase_hour_template);
decrease_hour_btn.addEventListener('click', decrease_hour_template);
increase_minute_btn.addEventListener('click', increase_minute_template);
decrease_minute_btn.addEventListener('click', decrease_minute_template);
increase_second_btn.addEventListener('click', increase_second_template);
decrease_second_btn.addEventListener('click', decrease_second_template);

// increases the number of hours on the setting template
function increase_hour_template(): void {
    const hour_time: number = Number(hour_field.textContent);
    if (hour_time < 99) {
        if (hour_time < 9) {
            hour_field.textContent = `0${hour_time + 1}`;
        } else {
            hour_field.textContent = `${hour_time + 1}`;
        }
    } else {
        hour_field.textContent = "00";
    }
}

// decreases the number of hours on the setting template
function decrease_hour_template(): void {
    // decrease the hour setting
    const hour_time: number = Number(hour_field.textContent);
    if (hour_time != 0) {
        // set the time
        if (hour_time < 11) {
            hour_field.textContent = `0${hour_time - 1}`;
        } else {
            hour_field.textContent = `${hour_time - 1}`;
        }
    } else {
        hour_field.textContent = "99";
    }
}

// increases the number of minute on the settings template
function increase_minute_template(): void {
    const minute_time: number = Number(minute_field.textContent);
    if (minute_time < 59) {
        if (minute_time < 9) {
            minute_field.textContent = `0${minute_time + 1}`;
        } else {
            minute_field.textContent = `${minute_time + 1}`;
        }
    } else {
        minute_field.textContent = "00";
    }
}

// decreases the number of minutes on the settings template
function decrease_minute_template(): void {
    const minute_time: number = Number(minute_field.textContent);
    if (minute_time != 0) {
        if (minute_time < 11) {
            minute_field.textContent = `0${minute_time - 1}`;
        } else {
            minute_field.textContent = `${minute_time - 1}`;
        }
    } else {
        minute_field.textContent = "59";
    }
}

// increases the number of seconds on the settings template
function increase_second_template(): void {
    const second_time: number = Number(second_field.textContent);
    if (second_time < 59) {
        if (second_time < 9) {
            second_field.textContent = `0${second_time + 1}`;
        } else {
            second_field.textContent = `${second_time + 1}`;
        }
    } else {
        second_field.textContent = "00";
    }
}

// decreases the number of seconds on the settings template
function decrease_second_template(): void {
    const second_time: number = Number(second_field.textContent);
    if (second_time != 0) {
        if (second_time < 11) {
            second_field.textContent = `0${second_time - 1}`;
        } else {
            second_field.textContent = `${second_time - 1}`;
        }
    } else {
        second_field.textContent = "59";
    }
}

// plays some predetermined sound
function play_sound(): void {
    audio.play();
}

// misc vars and event listeners
const play_button: HTMLButtonElement = document.getElementById('play') as HTMLButtonElement;
const loop_button: HTMLButtonElement = document.getElementById('loop') as HTMLButtonElement;
const settings_button: HTMLButtonElement = document.getElementById('settings') as HTMLButtonElement;
const close_settings_btn: HTMLButtonElement = document.getElementById('close_settings') as HTMLButtonElement;
const miniplayer_btn: HTMLButtonElement = document.getElementById('miniplayer') as HTMLButtonElement;
play_button.addEventListener('click', play);
loop_button.addEventListener('click', set_loop);
settings_button.addEventListener('click', open_settings);
close_settings_btn.addEventListener('click', close_settings);
miniplayer_btn.addEventListener('click', dark_mode);
