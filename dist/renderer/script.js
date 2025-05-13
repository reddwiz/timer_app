"use strict";
saved_time = time_seconds;
const time_display = document.getElementById('time');
set_html_time();
let active = false;
let interval_id;
let progress_interval_id;
const countdown = () => {
    if (time_seconds < 1) {
        countdown_over();
        return;
    }
    time_seconds--;
    set_html_time();
    progress_updater();
    console.log(`time left: ${time_seconds} seconds`);
    console.log(`saved time: ${saved_time}`);
};
const countdown_over = () => {
    console.log('countdown is over');
    end_timer();
    play_sound();
};
const progress = document.getElementById('progress');
function progress_updater() {
    progress.style.width = `${calculate_progress()}%`;
    console.log('updating width to ' + calculate_progress());
}
function play() {
    if (!active) {
        start_timer();
    }
    else {
        pause_timer();
    }
}
function start_timer() {
    console.log('timer started');
    if (time_seconds === 0)
        time_seconds = saved_time;
    start_countdown();
    set_active(true);
    set_text_pause();
}
function pause_timer() {
    console.log('timer paused');
    clear_interval();
    set_active(false);
    set_text_play();
}
function end_timer() {
    if (!loop) {
        console.log('timer over');
        clear_interval();
        set_active(false);
        set_text_play();
    }
    else {
        console.log('looping');
        time_seconds = saved_time;
    }
}
function set_active(boolean) {
    active = boolean;
    hide_settings(boolean);
}
function start_countdown() {
    interval_id = setInterval(countdown, 1000);
}
function clear_interval() {
    clearInterval(interval_id);
}
function set_html_time() {
    time_display.textContent = convert_time(time_seconds);
}
function convert_time(remaining_time) {
    remaining_time = time_seconds;
    let hour_text;
    let minute_text;
    let second_text;
    hour_text = Math.floor(remaining_time / 3600);
    if (hour_text < 10)
        hour_text = 0 + `${hour_text}`;
    remaining_time = remaining_time % 3600;
    minute_text = Math.floor(remaining_time / 60);
    if (minute_text < 10)
        minute_text = 0 + `${minute_text}`;
    remaining_time = remaining_time % 60;
    second_text = remaining_time;
    if (second_text < 10)
        second_text = 0 + `${second_text}`;
    return `${hour_text}:${minute_text}:${second_text}`;
}
function calculate_progress() {
    return 100 * (time_seconds / saved_time);
}
function set_text_play() {
    play_button.textContent = "play";
}
function set_text_pause() {
    play_button.textContent = "pause";
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
const body = document.getElementById('body');
function dark_mode() {
    body.classList.toggle('dark');
}
const play_button = document.getElementById('play');
const settings_button = document.getElementById('settings');
const miniplayer_btn = document.getElementById('miniplayer');
play_button.addEventListener('click', play);
settings_button.addEventListener('click', open_settings);
miniplayer_btn.addEventListener('click', dark_mode);
