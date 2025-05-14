const close_miniplayer_btn: HTMLButtonElement = document.getElementById('close_miniplayer') as HTMLButtonElement;
close_miniplayer_btn.addEventListener('click', close_miniplayer);

function close_miniplayer(): void {
    window.backend.closeMiniplayer();
}
