"use strict";
const close_miniplayer_btn = document.getElementById('close_miniplayer');
close_miniplayer_btn.addEventListener('click', close_miniplayer);
function close_miniplayer() {
    window.backend.closeMiniplayer();
}
