'use strict';

import {Field, Item} from './field.js';
import * as Sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel'
});

// Builder Pattern
export class GameBuilder{
    gameDuration(duration){
        this.gameDuration = duration;
        return this;
    }
    carrotCount(count){
        this.carrotCount = count;
        return this;
    } 
    bugCount(count){
        this.bugCount = count;
        return this;
    }
    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
};

class Game {
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');

        this.gameBtn.addEventListener('click', () => {
            if(this.started){
                this.stop(Reason.cancel);
            } else{
                this.start();
            }
            this.started = !(this.started);
        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener((item) => {
            console.log(item);
            this.onItemClick(item);
        });

        this.score = 0;
        this.timer = undefined;
        this.started = false;
    }
    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    onItemClick = target => { 
        if(!(this.started)){
            return;
        }
        const item = target.className;
        console.log(item);

        if(item === Item.carrot){
            target.remove();
            this.score++;
            this.updateScoreBoard();
            Sound.playCarrot();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            }
        } 
        else if(item === Item.bug){
            this.stop(Reason.lose);
        }
    }

    start(){
        this.init();
        this.showStopBtn();
        this.showTimerAndScore();
        this.startTimer();
    }

    stop(reason){
        this.stopTimer();
        this.hideButton();
        switch(reason){
            case Reason.win :
                this.onGameStop(Reason.win);
                break;
            case Reason.lose :
                this.onGameStop(Reason.lose);
                break;
            case Reason.cancel : 
                this.onGameStop(Reason.cancel);
            default :
                throw new Error('not valid reason');
        }
    }

    startTimer(){
        let remainingTimeSec = this.gameDuration;
        Sound.playBg();
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() =>{
            if(remainingTimeSec <= 0){
                this.stopTimer();
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
            }
            else{
                this.updateTimerText(--remainingTimeSec);
            }
        }, 1000);
    }
    stopTimer(){
        Sound.stopBg();
        clearInterval(this.timer);
    }

    updateScoreBoard(){
        this.gameScore.innerText = this.carrotCount - this.score;
    }

    updateTimerText(time){
        let minute = Math.floor(time / 60);
        let seconds = time % 60;
        if(minute < 10 && seconds < 10){
            this.gameTimer.innerText = `0${minute}:0${seconds}`;
        } else if(minute < 10 && seconds > 9){
            this.gameTimer.innerText = `0${minute}:${seconds}`;
        } else if(minute > 9 && seconds < 10){
            this.gameTimer.innerText = `${minute}:0${seconds}`;
        }
        else if(minute > 9 && seconds > 9) {
            this.gameTimer.innerText = `${minute}:${seconds}`;
        }
    }

    

    initReset(){
        this.gameField.field.innerHTML = '';
        this.showStartBtn();
        this.hideTimerAndScore();
        this.score = 0;
        this.timer = undefined;
    }

    showStopBtn(){
        const icon = this.gameBtn.querySelector('.fa-play');
        if(icon){
            icon.classList.add('fa-stop');
            icon.classList.remove('fa-play');
        }
        else{
            this.gameBtn.style.visibility = 'visible';
        }
    }

    hideButton(){
        this.gameBtn.style.visibility = 'hidden';
    }


    init() {
        this.gameScore.innerText = this.carrotCount;
        this.gameField.init();
        this.score = 0;
        this.timer = undefined;
    }

    showTimerAndScore(){
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }
    hideTimerAndScore(){
        this.gameTimer.style.visibility = 'hidden';
        this.gameScore.style.visibility = 'hidden';
    }

    showStartBtn(){
        this.gameBtn.style.visibility = 'visible';
        const icon = this.gameBtn.querySelector('.fa-stop');
        icon.classList.add('fa-play');
        icon.classList.remove('fa-stop');
    } 
}