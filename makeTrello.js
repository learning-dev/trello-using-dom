import { storedApiKey, storedTokenSecret } from './keys.js';


const apiKey = storedApiKey;
const tokenSecret = storedTokenSecret;

const getCardsUrl = `https://api.trello.com/1/boards/5dce45086b307e7119c6b620/cards?key=${apiKey}&token=${tokenSecret}`;

let listOfCards;

function refreshDom() {

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



