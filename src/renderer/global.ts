/*
 *
 *  global vars
 *
 */

let time_seconds: number = 0; // default is 0 seconds
let saved_time: number = 0; // storing their time as a var to loop with
let loop: boolean = false; // dont loop by default
const audio: any = new Audio("C:\\Users\\andre\\Downloads\\Tuturu sound effect.mp4");

// plays some predetermined sound
function play_sound(): void {
    audio.play();
}
