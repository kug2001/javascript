const startBtn = document.querySelector('.start__btn');
const stopBtn = document.querySelector('.stop__btn');
const timerBox = document.querySelector('.timer__box');
const stage = document.querySelector('.stage__container');
const countBox = document.querySelector('.count__box');
const restartBox = document.querySelector('.restart__box');
const restartBtn = document.querySelector('.restart__btn');
const resultBox = document.querySelector('.result__box');

const screenyMax = 470; 
const screenyMin = 0; 
const screenxMax = window.screen.width-100;
const screenxMin = 0; 
let mainCount = 10;

function stopBtnEvent (timeId){
    stopBtn.addEventListener('click', ()=>{
        removeimg();
        stopBtn.classList.add('active');
        startBtn.classList.remove('active');
        timerBox.textContent = `00:10`;
        return clearInterval(timeId);
    });
};
function carrotBtnEvent(timeId){
    stage.addEventListener('click', (event) => {
        const name = event.target.className;
        const id = event.target.dataset.id;
        const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
        if(name === 'bug'){
            resultBox.textContent = "You Lost.";
            restartBox.classList.remove('active');
            clearInterval(timeId);
        }
        else if(name === 'carrot' && id){
            console.log(id); 
            console.log(toBeDeleted); 
            if(toBeDeleted){
                toBeDeleted.remove();
                mainCount--;
                countBox.textContent = mainCount;
                
            }
        }
        else if(mainCount === 0){
            countBox.textContent = 0;
            resultBox.textContent = "You Win";
            restartBox.classList.remove('active');
            stopBtn.classList.add('active');
            startBtn.classList.remove('active');
            return clearInterval(timeId);
        }
        else{
            return;
        }
    });
};

function countDownTimer(){
    let time = 9;
    const bugs = document.querySelectorAll('.bug');
    const carrots = document.querySelectorAll('.carrot');
    timerBox.textContent = `00:10`;
    const timeId = setInterval(() => {
        timerBox.textContent = `00:0${time}`;
        if(time === 0){
            resultBox.textContent = "시간이 초과되었습니다.";
            restartBox.classList.remove('active');
            clearInterval(timeId);
        }
        else{
            time--;   
        }
        stopBtnEvent(timeId);
        carrotBtnEvent(timeId);
    }, 1000);
};

function getRandomInt(max, min) {
    const minpx = Math.ceil(min);
    const maxpx = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (maxpx - minpx) + minpx);
    return randomNumber;
};

function creatImg (className, scrName){
    for(i=0 ; i<10 ; i++){
        let x, y;
        const elm = document.createElement('img');
        elm.setAttribute("class", `${className}`);
        elm.setAttribute("src", `${scrName}`);
        elm.setAttribute("data-id", `${i}`);
        stage.appendChild(elm);
        x = getRandomInt(screenxMax, screenxMin);
        y = getRandomInt(screenyMax, screenyMin);
        elm.style.left = `${x}px`;
        elm.style.top = `${y}px`;
    }
};

function removeimg(){
    const bug = document.querySelectorAll('.bug');
    const carrot = document.querySelectorAll('.carrot');
    bug.forEach(entry =>{
        entry.remove();
    });
    carrot.forEach(entry =>{
        entry.remove();
    });
};

startBtn.addEventListener('click', (event) =>{
    startBtn.classList.add('active');
    stopBtn.classList.remove('active');
    creatImg("bug", "/img/bug.png");
    creatImg("carrot", "/img/carrot.png");
    countDownTimer();
});

restartBtn.addEventListener('click', (event) => {   
    stopBtn.classList.add('active');
    startBtn.classList.remove('active');
    restartBox.classList.add('active');
    timerBox.textContent = `00:00`;
    countBox.textContent = 10;
    mainCount = 10;
    removeimg();
});

