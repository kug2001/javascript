'use strict';

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const backgroundSound = new Audio('./sound/bg.mp3');
const alertSound = new Audio('./sound/alert.wav');
const gameWinSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
    playSound(carrotSound);
}
export function playBug() {
    playSound(bugSound);
}
export function playBg() {
    playSound(backgroundSound);
}
export function stopBg() {
    pauseSound(backgroundSound);
}
export function playAlert() {
    playSound(alertSound);
}
export function playWin() {
    playSound(gameWinSound);
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}
function pauseSound(sound){
    sound.pause();
}