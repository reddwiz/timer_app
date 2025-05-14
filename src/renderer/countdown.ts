let active: boolean = false;
let interval_id: NodeJS.Timeout;
let progress_interval_id: NodeJS.Timeout;
const play_button: HTMLButtonElement = document.getElementById('play') as HTMLButtonElement;
const play_img: HTMLImageElement = document.getElementById('play_img') as HTMLImageElement;
play_button.addEventListener('click', play);
const file_name: string = window.location.pathname.split('/').pop() as string;
saved_time = time_seconds;

const time_display: HTMLDivElement = document.getElementById('time') as HTMLDivElement;
set_html_time();

const countdown = (): void => {
    if (time_seconds < 1) {
        countdown_over();
        return;
    }

    time_seconds--;
    set_html_time();
    if (file_name === 'index.html')
        progress_updater();
};

const countdown_over = (): void => {
    end_timer();
    play_sound();
};

function play(): void {
    if (!active) {
        start_timer();
    } else {
        pause_timer();
    }
}

function start_timer(): void {
    // ensures that new plays will contain the proper time
    if (time_seconds === 0) time_seconds = saved_time;
    start_countdown();
    set_active(true);
    set_text_pause();
}

function pause_timer(): void {
    clear_interval();
    set_active(false);
    set_text_play();
}

function end_timer(): void {
    if (!loop) {
        clear_interval();
        set_active(false);
        set_text_play();
    } else {
        time_seconds = saved_time;
    }
}

function set_active(boolean: boolean): void {
    active = boolean;
    if (file_name === 'index.html')
        hide_settings(boolean);
}

function start_countdown(): void {
    interval_id = setInterval(countdown, 1000);
}

function clear_interval(): void {
    clearInterval(interval_id);
}

// sets the html time to the time, but formatted as per convert_time()
function set_html_time(): void {
    time_display.textContent = convert_time(time_seconds);
}

// converts the seconds to a formatted string
function convert_time(remaining_time: number): string {
    remaining_time = time_seconds;

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

function set_text_play(): void {
    play_img.src = '../../src/assets/images/play.svg';
}

function set_text_pause(): void {
    play_img.src = '../../src/assets/images/pause.svg';
}
