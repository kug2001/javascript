const items = document.querySelector('.content');
const input = document.querySelector('.input__text');
const addBtn = document.querySelector('.footer__btn');

function onAdd() {
    //1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    console.log(text);
     //2. 새로운 아이템을 만듬(텍스트 + 삭제버튼)
    if(text === ''){
        input.focus();
        return;
    }
    const item = createItem(text);
    //3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);
    item.scrollIntoView({block: 'center'});
    //4.인풋을 초기화 한다.
    input.value = '';
    input.focus();
}
function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item__name');
    itemName.innerText = text;

    const itemDelete = document.createElement('button');
    itemDelete.setAttribute('class', 'item__delete');
    itemDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
    itemDelete.addEventListener('click', () =>{
        items.removeChild(itemRow);
    });

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item__divider');

    item.appendChild(itemName);
    item.appendChild(itemDelete);
    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;
}
addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keydown', (envet) => {
    const keyEnter = envet.key;
    console.log(keyEnter);
    if(keyEnter === 'Enter'){
        onAdd();
    }
    else{
        return;
    }
});