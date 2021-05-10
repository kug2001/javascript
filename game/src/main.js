'use strict';
import PopUp from './popup.js';
import {GameBuilder, Reason } from './game.js';
import * as Sound from './sound.js';

const game = new GameBuilder()
.gameDuration(80)
.carrotCount(5)
.bugCount(5)
.build();

game.setGameStopListener((reason)=> {
  let message = '';
  switch(reason){
    case Reason.cancel :
      message = 'Replay?';
      Sound.playAlert();
      break;
    case Reason.win :
      Sound.playWin();
      message = 'You Win!!!';
      break;
    case Reason.lose :
      message = 'You Lose!!!';
      Sound.playBug();
      break;
    default :
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
})

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    game.start();
})