let time_seconds: number = 0;
let saved_time: number = 0;
let loop: boolean = false;
const audio: HTMLAudioElement = new Audio("../../src/assets/sounds/timer_end_sound.mp4");

function play_sound(): void {
    audio.play();
}
