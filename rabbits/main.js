const rabbitImg = document.querySelector('.rabbit');
const findButton = document.querySelector('.findBtn');

console.log(rabbitImg);

findButton.addEventListener('click', () => {
    rabbitImg.scrollIntoView({behavior: "smooth", block: "center"});
});