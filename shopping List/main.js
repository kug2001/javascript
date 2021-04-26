const formBox = document.querySelector('#form');
const inputText = document.querySelector('.input-text');
const formTest = document.querySelector('.form-test');
const listBox = document.querySelector('.item-list');
const addBtn = document.querySelector('.add-btn');

function creatTag(){
    return;
};

console.log(formTest);

inputText.addEventListener('keydown', (event) => {
    const keyTarget = event.key;
    let keyValue = event.target.value;
    if(keyTarget===null){
        return;
    }
    if(keyTarget==="Enter"){
        console.log(keyValue);
        creatTag();
        inputText.value = "";
    }
});

addBtn.addEventListener('click', (event) => {
    const keyTarget = event;
    console.log(keyTarget)
    // if(keyTarget===null){
    //     return;
    // }
    // if(keyTarget==="Enter"){
    //     console.log(keyValue);
    //     creatTag();
    //     inputText.value = "";
    // }
});