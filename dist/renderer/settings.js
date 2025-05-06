"use strict";
console.log(time_seconds);
const close_settings_btn = document.getElementById('close_settings');
close_settings_btn.addEventListener('click', close_settings);
const loop_button = document.getElementById('loop');
loop_button.addEventListener('click', set_loop);
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
function close_settings() {
    window.location.href = "../html/index.html";
}
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
