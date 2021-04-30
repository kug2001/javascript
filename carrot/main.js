const startBtn = document.querySelector('.start__btn');
const stopBtn = document.querySelector('.stop__btn');
const timerBox = document.querySelector('.timer__box');
const stage = document.querySelector('.stage__container');
const countBox = document.querySelector('.count__box');
const screenyMax = 500; 
const screenyMin = 0; 
const screenxMax = window.screen.width-100;
const screenxMin = 0; 
let mainCount = 10;

function stopBtnEvent (timeId){
    stopBtn.addEventListener('click', ()=>{
        clearInterval(timeId);
        bugs.forEach(entry =>{
            entry.remove();
        });
        carrots.forEach(entry =>{
            entry.remove();
        });
        stopBtn.classList.add('active');
        startBtn.classList.remove('active');
        timerBox.textContent = `00:10`;
    });
};
function carrotBtnEvent(timeId){
    stage.addEventListener('click', (event) => {
        const name = event.target.className;
        const id = event.target.dataset.id
        
        console.log(event.target);
        if(name === 'bug'){
            console.log("bug");
        }
        else if(name === 'carrot'){
            console.log("carrot");
            const toBeDeleted = document.querySelector(`.carrot[data-id="${id}"]`);
            toBeDeleted.remove();
            mainCount--;
            countBox.textContent = mainCount
            console.log(mainCount);
            if(mainCount === 0){
                clearInterval(timeId);
            }
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
        if(time <= 0){
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
    // console.log(randomNumber);
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


startBtn.addEventListener('click', (event) =>{
    startBtn.classList.add('active');
    stopBtn.classList.remove('active');
    creatImg("bug", "/img/bug.png");
    creatImg("carrot", "/img/carrot.png");
    countDownTimer();
});

