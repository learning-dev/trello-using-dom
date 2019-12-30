import { storedApiKey, storedTokenSecret } from './keys.js';


const apiKey = storedApiKey;
const tokenSecret = storedTokenSecret;

const getCardsUrl = `https://api.trello.com/1/boards/5dce45086b307e7119c6b620/cards?key=${apiKey}&token=${tokenSecret}`;

let listOfCards;

function refreshDom() {
  const mainDiv = document.getElementById('main-div');
  listOfCards.forEach((entry) => {
    console.log('name', entry['name']);
    console.log('checkitem', entry['badges']['checkItems']);
    console.log('checkedItems', entry['badges']['checkItemsChecked']);
    const nameDiv = document.createElement('div');
    const checkDiv = document.createElement('div');
    nameDiv.appendChild(document.createTextNode(entry['name']));
    checkDiv.appendChild(document.createTextNode(`${entry['badges']['checkItemsChecked']  }/${  entry['badges']['checkItems']}`));
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', 'cardDiv');
    cardDiv.appendChild(nameDiv);
    cardDiv.appendChild(checkDiv);
    mainDiv.appendChild(cardDiv);

  });
}

async function getRequest() {
  const response = await fetch(getCardsUrl);
  if (response.ok) {
    console.log('Sucess');
    listOfCards = await response.json();
    refreshDom();
    console.log(listOfCards);
  } else {
    throw new Error('Request Failed!');
  }
}

getRequest();



