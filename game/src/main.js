'use strict';
import PopUp from './popup.js';
import Field from './field.js';
import * as Sound from './sound.js';

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');


const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    initReset();
})

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener((item) => {
    onItemClick(item);
});

function onItemClick(target){ 
  if(!started){
      return;
  }
  const item = target.className;
  console.log(item);
  if(item === 'carrot'){
      target.remove();
      score++;
      updateScoreBoard();
      Sound.playCarrot();
      if(score === CARROT_COUNT){
          Sound.stopBg();
          FinishGame(true);
          stopGameTimer();
      }
  } 
  else if(item === 'bug'){
      Sound.playBug();
      Sound.stopBg();
      FinishGame(false);
      stopGameTimer();
  }
}

gameBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else{
        startGame();
    }
    started = !started;
});

function initReset(){
    gameField.field.innerHTML = '';
    showStartBtn();
    hideTimerAndScore();
    score = 0;
    timer = undefined;
}

function FinishGame(win){
    hideGameButton();
    const result = win;
    started = false;
    Sound.stopBg();
    if(result){
      gameFinishBanner.showWithText('You Win!!!');
      Sound.playWin();
    }
    else{
      gameFinishBanner.showWithText('You Lose!!!');
      Sound.playBug();
    }
}
function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}

function showStopBtn(){
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}
function hideGameButton(){
    gameBtn.style.visibility = 'hidden';
}
function startGame(){
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
}

function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    Sound.playBg();
    timer = setInterval(() =>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            FinishGame(CARROT_COUNT === score);
            Sound.playBug();
            Sound.stopBg();
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}
function stopGameTimer(){
    clearInterval(timer);
}

function updateTimerText(time){
    let minute = Math.floor(time / 60);
    let seconds = time % 60;
    if(minute < 10 && seconds < 10){
        gameTimer.innerText = `0${minute}:0${seconds}`;
    } else if(minute < 10 && seconds > 9){
        gameTimer.innerText = `0${minute}:${seconds}`;
    } else if(minute > 9 && seconds < 10){
        gameTimer.innerText = `${minute}:0${seconds}`;
    }
    else if(minute > 9 && seconds > 9) {
        gameTimer.innerText = `${minute}:${seconds}`;
    }
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}
function hideTimerAndScore(){
    gameTimer.style.visibility = 'hidden';
    gameScore.style.visibility = 'hidden';
}

function stopGame(){
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY?');
}

function showStartBtn(){
    gameBtn.style.visibility = 'visible';
    const icon = gameBtn.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
} 

function initGame() {
    gameScore.innerText = CARROT_COUNT;
    gameField.init();
}