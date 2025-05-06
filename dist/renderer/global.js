"use strict";
let time_seconds = 0;
let saved_time = 0;
let interval_id;
let progress_interval_id;
let active = false;
let loop = false;
const audio = new Audio("C:\\Users\\andre\\Downloads\\Tuturu sound effect.mp4");
function play_sound() {
    audio.play();
}
