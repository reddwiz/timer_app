"use strict";
let time_seconds = 0;
let saved_time = 0;
let loop = false;
const audio = new Audio("../../src/assets/sounds/timer_end_sound.mp4");
function play_sound() {
    audio.play();
}
