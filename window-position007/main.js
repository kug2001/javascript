const iconImg = document.querySelector('.icon');
const gpsText = document.querySelector('.gps');
const columeLine = document.querySelector('.colume-line');
const rowLine = document.querySelector('.row-line');

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    iconImg.style.left = `${x}px`;
    iconImg.style.top = `${y}px`;
    gpsText.innerHTML = `X : ${x}px, Y : ${y}px`;
    rowLine.style.left = `${x}px`;
    columeLine.style.top = `${y}px`;
});