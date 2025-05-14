"use strict";
let active = false;
let interval_id;
let progress_interval_id;
const play_button = document.getElementById('play');
const play_img = document.getElementById('play_img');
play_button.addEventListener('click', play);
const file_name = window.location.pathname.split('/').pop();
saved_time = time_seconds;
const time_display = document.getElementById('time');
set_html_time();
const countdown = () => {
    if (time_seconds < 1) {
        countdown_over();
        return;
    }
    time_seconds--;
    set_html_time();
    if (file_name === 'index.html')
        progress_updater();
};
const countdown_over = () => {
    end_timer();
    play_sound();
};
function play() {
    if (!active) {
        start_timer();
    }
    else {
        pause_timer();
    }
}
function start_timer() {
    if (time_seconds === 0)
        time_seconds = saved_time;
    start_countdown();
    set_active(true);
    set_text_pause();
}
function pause_timer() {
    clear_interval();
    set_active(false);
    set_text_play();
}
function end_timer() {
    if (!loop) {
        clear_interval();
        set_active(false);
        set_text_play();
    }
    else {
        time_seconds = saved_time;
    }
}
function set_active(boolean) {
    active = boolean;
    if (file_name === 'index.html')
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
function set_text_play() {
    play_img.src = '../../src/assets/images/play.svg';
}
function set_text_pause() {
    play_img.src = '../../src/assets/images/pause.svg';
}
