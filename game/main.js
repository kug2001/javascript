'use strict';

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const PopUp = document.querySelector('.pop-up');
const PopUpText = document.querySelector('.pop-up__message');
const PopUpRefresh = document.querySelector('.pop-up__refresh');

const CARROT_SIZE = 80;
const CARROT_SRC = 'img/carrot.png';
const BUG_SRC = 'img/bug.png';
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 10;

let started = false;
let score = 0;
let timer = undefined;
field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else{
        startGame();
    }
    started = !started;
});
PopUpRefresh.addEventListener('click', () => {
    initReset();
});
function initReset(){
    field.innerHTML = '';
    PopUp.classList.add('pop-up--hide');
    showStartBtn();
    hideTimerAndScore();
    started = false;
    score = 0;
    timer = undefined;
}

function onFieldClick(event){
    
    if(!started){
        return;
    }
    const target = event.target;
    console.log(target);
    if(target.matches('.carrot')){
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT){
            FinishGame(true);
            stopGameTimer();
            hideGameButton();
        }
    } 
    else if(target.matches('.bug')){
        FinishGame(false);
        stopGameTimer();
        hideGameButton();
    }
}

function FinishGame(boolean){
    const result = boolean;
    if(result){
        showPopUpWithText('You Win!!!');

    }
    else{
        showPopUpWithText('You Lose!!!');
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
    timer = setInterval(() =>{
        if(remainingTimeSec <= 0){
            clearInterval(timer);
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
    showPopUpWithText('REPLAY?');
}

function showPopUpWithText(text){
    PopUp.classList.remove('pop-up--hide');
    PopUpText.innerText = `${text}`;
}

function showStartBtn(){
    gameBtn.style.visibility = 'visible';
    const icon = gameBtn.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, CARROT_SRC);
    addItem('bug', BUG_COUNT, BUG_SRC);
}

function addItem(className, count, imgPath){
    const minX = 0;
    const minY = 0;
    const maxX = fieldRect.width - CARROT_SIZE;
    const maxY = fieldRect.height - CARROT_SIZE;
    for(let i = 0 ; i < count ; i++){
        const item = document.createElement('img');
        item.setAttribute('class', `${className}`);
        item.setAttribute('src', `${imgPath}`);
        item.style.position = 'absolute';
        const x = randomNumber(minX, maxX);
        const y = randomNumber(minY, maxY);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}
function randomNumber (min, max){
    return Math.floor(Math.random() * (max - min) + min);
}