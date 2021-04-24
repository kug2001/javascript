const iconImg = document.querySelector('.icon');
const gpsText = document.querySelector('.gps');
const columeLine = document.querySelector('.colume-line');
const rowLine = document.querySelector('.row-line');


// iconImg.style.left = "50%";
// iconImg.style.top = "50%";
// rowLine.style.left = "50%";
// columeLine.style.top = "50%";
function getCssproperty (selecter, property){
    const compStyles = window.getComputedStyle(selecter);
    const value = compStyles.getPropertyValue(property);
    return value;
};
const icomX = getCssproperty(iconImg, 'left');
const icomY = getCssproperty(iconImg, 'top');
console.log(`${icomX}, ${icomY}`);

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    // iconImg.style.left = '0';
    // iconImg.style.top = '0';
    // rowLine.style.left = '0';
    // columeLine.style.top = '0';

    iconImg.style.transform = `translate(${x-8}px, ${y-8}px)`;
    gpsText.innerHTML = `X : ${x}px, Y : ${y}px`;
    rowLine.style.transform = `translateX(${x}px)`;
    columeLine.style.transform = `translateY(${y}px)`;


    // else{
    //     iconImg.style.left = '0';
    //     iconImg.style.top = '0';
    // }




});