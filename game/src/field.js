'use strict';

export const Item = Object.freeze({
    carrot : 'carrot',
    bug : 'bug',
});

export class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.CARROT_SIZE = 80;
        this.CARROT_SRC = 'img/carrot.png';
        this.BUG_SRC = 'img/bug.png';
        this.field.addEventListener('click', (event) =>{
            this.onClick && this.onClick(event.target);
        });
    }
    init() {
        this.field.innerHTML = '';
        this._addItem(Item.carrot, this.carrotCount, this.CARROT_SRC);
        this._addItem(Item.bug, this.bugCount, this.BUG_SRC);
    }
    setClickListener(onClick){
        this.onClick = onClick;
    }
    randomNumber (min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }
    _addItem(className, count, imgPath){
        const minX = 0;
        const minY = 0;
        const maxX = this.fieldRect.width - this.CARROT_SIZE;
        const maxY = this.fieldRect.height - this.CARROT_SIZE;
        for(let i = 0 ; i < count ; i++){
            const item = document.createElement('img');
            item.setAttribute('class', `${className}`);
            item.setAttribute('src', `${imgPath}`);
            item.style.position = 'absolute';
            const x = this.randomNumber(minX, maxX);
            const y = this.randomNumber(minY, maxY);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
}