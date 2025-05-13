loop = window.localStorage.getItem("loop") === "true";
time_seconds = parseInt(window.localStorage.getItem("time") || "0");

function setLocalStorageValues(): void {
    window.localStorage.setItem("time", `${time_seconds}`);
    window.localStorage.setItem("loop", `${loop}`);
}
