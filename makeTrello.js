import { storedApiKey, storedTokenSecret } from './keys.js';


const apiKey = storedApiKey;
const tokenSecret = storedTokenSecret;

const getListsFromBoard = `https://api.trello.com/1/boards/5dce45086b307e7119c6b620/lists?cards=all&key=${apiKey}&token=${tokenSecret}`;

let listCards;
const containerDiv = document.getElementById('main-div');

function refreshDom() {
  // delete previous data
  while (containerDiv.firstChild) {
    containerDiv.removeChild(containerDiv.firstChild);
  }

  listCards.forEach((list) => {
    const listDiv = document.createElement('div');
    const ptag = document.createElement('p');
    const listname = document.createTextNode(list.name);

    ptag.appendChild(listname);
    ptag.setAttribute('class', 'list-name-text');
    listDiv.appendChild(ptag);
    listDiv.setAttribute('class', 'list-div');
    listDiv.setAttribute('list-id', list.id);

    list.cards.forEach((entry) => {
      const nameDiv = document.createElement('div');
      const delBtn = document.createElement('button');
      const delBtnDiv = document.createElement('div');
      const checkDiv = document.createElement('div');
      const titleDiv = document.createElement('div');
      delBtn.appendChild(document.createTextNode('X'));
      delBtnDiv.appendChild(delBtn);
      delBtnDiv.setAttribute('class', 'del-card');
      nameDiv.appendChild(document.createTextNode(entry.name));
      checkDiv.appendChild(document.createTextNode(`${entry.badges.checkItemsChecked}/${entry.badges.checkItems}`));
      titleDiv.appendChild(nameDiv);
      titleDiv.appendChild(delBtnDiv);
      titleDiv.setAttribute('class', 'title-div');
      const cardDiv = document.createElement('div');
      cardDiv.setAttribute('class', 'card-div');
      cardDiv.setAttribute('card-id', entry.id);
      cardDiv.appendChild(titleDiv);
      cardDiv.appendChild(checkDiv);
      listDiv.appendChild(cardDiv);
    });

    // edit add new card field
    const FieldDiv = document.createElement('div');
    const textField = document.createElement('input');
    const saveBtn = document.createElement('input');
    saveBtn.setAttribute('type', 'submit');
    textField.setAttribute('type', 'text');
    textField.setAttribute('placeholder', 'New Card name');
    FieldDiv.appendChild(textField);
    FieldDiv.appendChild(saveBtn);
    FieldDiv.setAttribute('class', 'add-card');
    FieldDiv.classList.add('card-div');

    // append to main div
    listDiv.appendChild(FieldDiv);
    containerDiv.appendChild(listDiv);
    containerDiv.setAttribute('class', 'container-div');
  });

  // add a new list div
  const addListBtnDiv = document.createElement('div');
  const buttonDiv = document.createElement('div');
  const addListBtn = document.createElement('button');
  const btnText = document.createTextNode('+ Add new List');
  const ptagText = document.createTextNode('Option');
  const ptagBtn = document.createElement('p');
  ptagBtn.appendChild(ptagText);
  ptagBtn.setAttribute('class', 'list-name-text');
  addListBtn.appendChild(btnText);
  addListBtnDiv.appendChild(addListBtn);
  buttonDiv.appendChild(ptagBtn);

  buttonDiv.appendChild(addListBtnDiv);
  buttonDiv.setAttribute('class', 'list-div');
  addListBtnDiv.setAttribute('class', 'card-div');
  containerDiv.appendChild(buttonDiv);
}

async function getListsAndCards() {
  const response = await fetch(getListsFromBoard);
  if (response.ok) {
    listCards = await response.json();

    refreshDom();
  } else {
    throw new Error('Request Failed!');
  }
}

async function addNewCard(event) {
  if (event.toElement.type === 'submit' && event.target.innerHTML === '') {
    const input = event.target.previousElementSibling.value;
    if (input.length > 0) {
      const listId = event.target.parentElement.parentElement.getAttribute('list-id');
      const Url = `https://api.trello.com/1/cards?idList=${listId}&name=${input}&key=${apiKey}&token=${tokenSecret}`;
      const resp = await fetch(Url, { method: 'POST' });
      if (resp.ok) {
        getListsAndCards();
      }
    }
  }
}

async function deleteCard(event) {
  if (event.target.innerText === 'X') {
    const cardId = event.target.parentElement.parentElement.parentElement.getAttribute('card-id');
    const deleteCardUrl = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${tokenSecret}`;
    const resp = await fetch(deleteCardUrl, { method: 'DELETE' });
    if (resp.ok) {
      getListsAndCards();
    }
  }
}


async function addNewListField(event) {
  if (event.toElement.type === 'submit' && event.target.innerHTML === '+ Add new List') {
    console.log(event.target.parentElement);
    const listDiv = event.target.parentElement.parentElement;
    listDiv.removeChild(event.target.parentElement);
    // append the input field
    const FieldDiv = document.createElement('div');
    const textField = document.createElement('input');
    const saveBtn = document.createElement('input');
    saveBtn.setAttribute('type', 'submit');
    textField.setAttribute('type', 'text');
    textField.setAttribute('placeholder', 'New List name');
    FieldDiv.appendChild(textField);
    FieldDiv.appendChild(saveBtn);
    FieldDiv.setAttribute('class', 'add-card');
    FieldDiv.classList.add('card-div');
    listDiv.appendChild(FieldDiv);
  }
}

getListsAndCards();


containerDiv.addEventListener('click', addNewCard);
containerDiv.addEventListener('click', deleteCard);
containerDiv.addEventListener('click', addNewListField);
