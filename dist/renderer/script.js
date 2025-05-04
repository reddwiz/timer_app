"use strict";
let time_seconds = 0;
let saved_time = 0;
let interval_id;
let progress_interval_id;
let active = false;
let loop = false;
const audio = new Audio("C:\\Users\\andre\\Downloads\\Tuturu sound effect.mp4");
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
function set_loop() {
    loop = !loop;
    change_loop_text();
}
function change_loop_text() {
    if (loop) {
        loop_button.textContent = "loop: on";
    }
    else {
        loop_button.textContent = "loop: off";
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
const time_display = document.getElementById('time');
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
const hour_field = document.getElementById('hour_field');
const minute_field = document.getElementById('minute_field');
const second_field = document.getElementById('second_field');
function initialize_timer() {
    const hours = Number(hour_field.textContent);
    const minutes = Number(minute_field.textContent);
    const seconds = Number(second_field.textContent);
    console.log('setting timer');
    set_time(hours * 3600 + minutes * 60 + seconds);
    set_html_time();
    progress_updater();
}
function calculate_progress() {
    return 100 * (time_seconds / saved_time);
}
function set_time(time_param) {
    time_seconds = time_param;
    saved_time = time_param;
    console.log(`time was set to: ${time_param}`);
    console.log(`saved_time was set to ${saved_time}`);
}
function set_text_play() {
    play_button.textContent = "play";
}
function set_text_pause() {
    play_button.textContent = "pause";
}
const settings_div = document.getElementById('settings_div');
function open_settings() {
    settings_div.classList.remove('hidden');
}
function close_settings() {
    settings_div.classList.add('hidden');
    initialize_timer();
}
function hide_settings(hide) {
    if (hide) {
        settings_button.classList.add('hidden');
    }
    else {
        settings_button.classList.remove('hidden');
    }
}
const increase_hour_btn = document.getElementById('increase_hour');
const decrease_hour_btn = document.getElementById('decrease_hour');
const increase_minute_btn = document.getElementById('increase_minute');
const decrease_minute_btn = document.getElementById('decrease_minute');
const increase_second_btn = document.getElementById('increase_second');
const decrease_second_btn = document.getElementById('decrease_second');
increase_hour_btn.addEventListener('click', increase_hour_template);
decrease_hour_btn.addEventListener('click', decrease_hour_template);
increase_minute_btn.addEventListener('click', increase_minute_template);
decrease_minute_btn.addEventListener('click', decrease_minute_template);
increase_second_btn.addEventListener('click', increase_second_template);
decrease_second_btn.addEventListener('click', decrease_second_template);
function increase_hour_template() {
    const hour_time = Number(hour_field.textContent);
    if (hour_time < 99) {
        if (hour_time < 9) {
            hour_field.textContent = `0${hour_time + 1}`;
        }
        else {
            hour_field.textContent = `${hour_time + 1}`;
        }
    }
    else {
        hour_field.textContent = "00";
    }
}
function decrease_hour_template() {
    const hour_time = Number(hour_field.textContent);
    if (hour_time != 0) {
        if (hour_time < 11) {
            hour_field.textContent = `0${hour_time - 1}`;
        }
        else {
            hour_field.textContent = `${hour_time - 1}`;
        }
    }
    else {
        hour_field.textContent = "99";
    }
}
function increase_minute_template() {
    const minute_time = Number(minute_field.textContent);
    if (minute_time < 59) {
        if (minute_time < 9) {
            minute_field.textContent = `0${minute_time + 1}`;
        }
        else {
            minute_field.textContent = `${minute_time + 1}`;
        }
    }
    else {
        minute_field.textContent = "00";
    }
}
function decrease_minute_template() {
    const minute_time = Number(minute_field.textContent);
    if (minute_time != 0) {
        if (minute_time < 11) {
            minute_field.textContent = `0${minute_time - 1}`;
        }
        else {
            minute_field.textContent = `${minute_time - 1}`;
        }
    }
    else {
        minute_field.textContent = "59";
    }
}
function increase_second_template() {
    const second_time = Number(second_field.textContent);
    if (second_time < 59) {
        if (second_time < 9) {
            second_field.textContent = `0${second_time + 1}`;
        }
        else {
            second_field.textContent = `${second_time + 1}`;
        }
    }
    else {
        second_field.textContent = "00";
    }
}
function decrease_second_template() {
    const second_time = Number(second_field.textContent);
    if (second_time != 0) {
        if (second_time < 11) {
            second_field.textContent = `0${second_time - 1}`;
        }
        else {
            second_field.textContent = `${second_time - 1}`;
        }
    }
    else {
        second_field.textContent = "59";
    }
}
function play_sound() {
    audio.play();
}
const play_button = document.getElementById('play');
const loop_button = document.getElementById('loop');
const settings_button = document.getElementById('settings');
const close_settings_btn = document.getElementById('close_settings');
play_button.addEventListener('click', play);
loop_button.addEventListener('click', set_loop);
settings_button.addEventListener('click', open_settings);
close_settings_btn.addEventListener('click', close_settings);
