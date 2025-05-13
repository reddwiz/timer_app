/* 
 *
 *  settings script
 *
 */

const loop_button: HTMLButtonElement = document.getElementById('set_loop') as HTMLButtonElement;
loop_button.addEventListener('click', set_loop);

if (loop) {
    loop_button.textContent = "loop: on";
}

const close_settings_btn: HTMLButtonElement = document.getElementById('close_settings') as HTMLButtonElement;
close_settings_btn.addEventListener('click', close_settings);

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

// set the time
function set_time(time_param: number): void {
    time_seconds = time_param;
    saved_time = time_param;
    console.log(`time was set to: ${time_param}`);
    console.log(`saved_time was set to ${saved_time}`);
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
}

// opens main html
function close_settings(): void {
    initialize_timer();
    setLocalStorageValues();
    window.location.href = "../html/index.html";
}

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

// sets the loop
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
