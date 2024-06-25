// script.js
let timer;
let startTime;
let elapsedTime = 0;
let paused = true;
let laps = [];

const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startPause() {
    if (paused) {
        paused = false;
        startPauseButton.textContent = 'Pause';
        startPauseButton.classList.remove('bg-blue-500', 'hover:bg-blue-700');
        startPauseButton.classList.add('bg-yellow-500', 'hover:bg-yellow-700');
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
    } else {
        paused = true;
        startPauseButton.textContent = 'Start';
        startPauseButton.classList.remove('bg-yellow-500', 'hover:bg-yellow-700');
        startPauseButton.classList.add('bg-blue-500', 'hover:bg-blue-700');
        clearInterval(timer);
    }
}

function reset() {
    paused = true;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    startPauseButton.textContent = 'Start';
    startPauseButton.classList.remove('bg-yellow-500', 'hover:bg-yellow-700');
    startPauseButton.classList.add('bg-blue-500', 'hover:bg-blue-700');
    laps = [];
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (!paused) {
        laps.push(elapsedTime);
        renderLaps();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

function renderLaps() {
    lapsContainer.innerHTML = laps.map((lapTime, index) => {
        return `<div class="py-2 border-b border-gray-200 text-gray-800">Lap ${index + 1}: ${formatTime(lapTime)}</div>`;
    }).join('');
}
