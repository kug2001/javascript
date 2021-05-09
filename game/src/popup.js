'use strict';

export default class PopUp {
    constructor() {
        this.PopUp = document.querySelector('.pop-up');
        this.PopUpText = document.querySelector('.pop-up__message');
        this.PopUpRefresh = document.querySelector('.pop-up__refresh');
        this.PopUpRefresh.addEventListener('click', () =>{
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }
    hide(){
        this.PopUp.classList.add('pop-up--hide'); 
    }
    showWithText(text){
        this.PopUp.classList.remove('pop-up--hide');
        this.PopUpText.innerText = `${text}`;
    }
}