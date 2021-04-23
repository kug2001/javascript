const to = document.querySelector('.scroll_to');
const by = document.querySelector('.scroll_by');
const into = document.querySelector('.scroll_into');
const specialBox = document.querySelector('.special');

to.addEventListener('click', () => {
    window.scrollTo(0, 100);
});
by.addEventListener('click', () => {
    window.scrollBy(0, 100);

});
into.addEventListener('click', () => {
    specialBox.scrollIntoView();
});
