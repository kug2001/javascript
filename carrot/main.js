const startBtn = document.querySelector('.start__btn');
const stopBtn = document.querySelector('.stop__btn');
const timerBox = document.querySelector('.timer__box');
const stage = document.querySelector('.stage__container');
const countBox = document.querySelector('.count__box');
const resultBox = document.querySelector('.result__box');
const restartBtn= document.querySelector('.restart__btn');
const resultText= document.querySelector('.result__text');
const btnBox = document.querySelector('.buttons__container');


const backgrundBgm = new Audio("../sound/bg.mp3");
const alertBgm = new Audio('/sound/alert.wav');
const bugBgm = new Audio('/sound/bug_pull.mp3');
const carrotBgm = new Audio('/sound/carrot_pull.mp3');
const winBgm = new Audio('/sound/game_win.mp3');
// backgrundBgm.play();
// document.addEventListener('canplaythrough', (event) => {
//     // backgrundBgm.play();
//     // alertBgm.play();
//     // bugBgm.play();
//     // carrotBgm.play();
//     // winBgm.play();
// });

// start value  
const screenyMax = 500; 
const screenyMin = 0; 
const screenxMax = window.screen.width-100;
const screenxMin = 0; 
let timerId = 0; //setinterval Id
let mainCount = 10;
timerBox.textContent = `00:10`;


function timerCounter(){
    let time = 9;
    const timeID = setInterval(() => {
        timerBox.textContent = `00:0${time}`;
        if(time <= 0){
            alertBgm.play();
            backgrundBgm.pause();
            backgrundBgm.currentTime = 0;
            stopBtn.classList.add('active');
            startBtn.classList.remove('active');
            resultBox.classList.remove('active');
            resultText.textContent = "Time Out";
            clearInterval(timeID);
            restartBtn.focus();
        }
        else{
            time--;   
        }
    }, 1000);
    return timeID;
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
function removeImg(){
    const bugs = document.querySelectorAll('.bug');
    const carrots = document.querySelectorAll('.carrot');
    bugs.forEach(entry =>{
        entry.remove();
    });
    carrots.forEach(entry =>{
        entry.remove();
    });
};
function removeImgBug(){
    const bugs = document.querySelectorAll('.bug');
    bugs.forEach(entry =>{
        entry.remove();
    });
};
function removeImgCarrot(){
    const carrots = document.querySelectorAll('.carrot');
    carrots.forEach(entry =>{
        entry.remove();
    });
};
startBtn.addEventListener('click', (event) =>{
    mainCount = 10;
    countBox.textContent = mainCount;
    startBtn.classList.add('active');
    stopBtn.classList.remove('active');
    creatImg("bug", "/img/bug.png");
    creatImg("carrot", "/img/carrot.png");
    timerId = timerCounter();
    console.log(timerId);
    backgrundBgm.play();
});
stopBtn.addEventListener('click', ()=>{
    stopBtn.classList.add('active');
    startBtn.classList.remove('active');
    clearInterval(timerId);
    removeImg();
    timerBox.textContent = `00:10`;
    countBox.textContent = `10`;
    backgrundBgm.pause();
    backgrundBgm.currentTime = 0;
    startBtn.focus();
});
restartBtn.addEventListener('click', () =>{
    stopBtn.classList.add('active');
    startBtn.classList.remove('active');
    resultBox.classList.add('active');
    clearInterval(timerId);
    removeImg();
    timerBox.textContent = `00:10`;
    countBox.textContent = `10`;
    startBtn.focus();
});
stage.addEventListener('click', (event) => {
    const name = event.target.className;
    const id = event.target.dataset.id
    const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
    console.log(`${name}.${id}, ${toBeDeleted}`);
    
    if(name === 'bug' && id){
        bugBgm.play();
        backgrundBgm.pause();
        backgrundBgm.currentTime = 0;
        resultBox.classList.remove('active');
        resultText.textContent = "You Lost";
        clearInterval(timerId);
    }
    else if(name === 'carrot' && id){
        if(toBeDeleted === null){
            return;
        }
        else{
            carrotBgm.duration = 0.5;
            carrotBgm.play();
            toBeDeleted.remove();
            mainCount--;
            if(mainCount === 0){
                winBgm.play()
                backgrundBgm.pause();
                backgrundBgm.currentTime = 0;
                resultBox.classList.remove('active');
                resultText.textContent = "You Win";
                clearInterval(timerId);
            }
            
        }
        countBox.textContent = mainCount;
    } 
});