import { storedApiKey, storedTokenSecret } from './keys.js';


const apiKey = storedApiKey;
const tokenSecret = storedTokenSecret;

const getListsFromBoard = `https://api.trello.com/1/boards/5dce45086b307e7119c6b620/lists?cards=all&key=${apiKey}&token=${tokenSecret}`;

let listCards;


function refreshDom() {
  const mainDiv = document.getElementById('main-div');
  listCards.forEach((list) => {
    const listDiv = document.createElement('div');
    const ptag = document.createElement('p');
    const listname = document.createTextNode(list['name']);

    ptag.appendChild(listname);
    ptag.setAttribute('class', 'list-name-text');
    listDiv.appendChild(ptag);
    listDiv.setAttribute('class', 'list-div');

    list['cards'].forEach((entry) => {
      const nameDiv = document.createElement('div');
      const checkDiv = document.createElement('div');
      nameDiv.appendChild(document.createTextNode(entry.name));
      checkDiv.appendChild(document.createTextNode(`${entry.badges.checkItemsChecked}/${entry.badges.checkItems}`));
      const cardDiv = document.createElement('div');
      cardDiv.setAttribute('class', 'card-div');
      cardDiv.appendChild(nameDiv);
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
    listDiv.appendChild(FieldDiv);
    mainDiv.appendChild(listDiv);
    mainDiv.setAttribute('class', 'container-div');
  });
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


getListsAndCards();
