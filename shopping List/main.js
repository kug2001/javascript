'use strict';

const formBox = document.querySelector('#form');
const inputText = document.querySelector('.input-text');
const listBox = document.querySelector('.item-list');
const addBtn = document.querySelector('.add-btn');
const ollist = document.querySelector('.content');
const submit = document.querySelector('.submit');
const textBox = document.querySelector('.text-box');
let icons = document.querySelector('.fa-trash-alt');
let ListAll = document.querySelectorAll('.box');
let contentText;



function creatList(text){
    const newLitag = document.createElement("li");
    const newDivListTag = document.createElement("div");
    const newDivIconTag = document.createElement("div");
    const newContent = document.createTextNode(text);
    const newIcon = document.createElement("i");

    ollist.appendChild(newLitag);
    newLitag.appendChild(newDivListTag);
    newLitag.appendChild(newDivIconTag);
    newDivIconTag.appendChild(newIcon);
    newDivListTag.appendChild(newContent);

    newLitag.classList.add('box');
    newDivListTag.classList.add('item');
    newDivIconTag.classList.add('icon');
    newIcon.classList.add('fas');
    newIcon.classList.add('fa-trash-alt');

};
function enterbtn(){
    const string = "Enter";
    return string;
};


textBox.addEventListener('keydown', (eventText) => {
    const keyTarget = eventText.key;
    const textValue = eventText.target.value;
    console.log(enterbtn());
    if(keyTarget==="Enter"){
        if(textValue === ""){
            return;
        }
        else{
            inputText.value = null;
            creatList(textValue);  
            contentText = textValue;
        }
    }
});

textBox.addEventListener('click', (eventText) => {
    const keyTarget = eventText.key;
    const textValue = eventText.target.value;
    const target = document.querySelectorAll('eventText.target.path');
    console.log(target);
    // if(keyTarget==="Enter"){
    //     if(textValue === ""){
    //         return;
    //     }
    //     else{
    //         inputText.value = null;
    //         creatList(textValue);  
    //         contentText = textValue;
    //     }
    // }
});


console.log(submit);

ollist.addEventListener('click', (event) => {

    const target = event.target.className;
    const node = event.target.parentNode;
    
    // console.log(node.parentNode);

    if(target === 'fas fa-trash-alt'){
        node.parentNode.remove();
    }
    else{
        return;
    }
});


