console.log(window.screen);
console.log(document.clientWidth);
console.log(window.screen.height);
const html = document.querySelector('html');
console.log(html.clientWidth);
const logValue = document.querySelector('.log'); 
function log(){
    logValue.innerHTML = 
        `${'window.screen'} : ${window.screen.width}, ${window.screen.height}<br>
        ${'window.outer'} : ${window.outerWidth}, ${window.outerHeight}<br>
        ${'window.inner'} : ${window.innerWidth}, ${window.innerHeight}<br>
        ${'document.clientWidth'} : ${html.clientWidth}, ${html.clientHeight}`;
};
window.addEventListener('resize', () => {
    log();
});
log();