
const apiKey = '6c06accb896612f1d725f69c4d447b41';
const tokenSecret = '8d759400d3be866114d191e053beda422a09bca00058fdc263cf580d1f5b4398';
console.log('api', apiKey);

const getCardsUrl = `https://api.trello.com/1/boards/5dce45086b307e7119c6b620/cards?key=${apiKey}&token=${tokenSecret}`;

let listOfCards;

async function getRequest() {
  const response = await fetch(getCardsUrl);
  if (response.ok) {
    console.log('Sucess');
    listOfCards = await response.json();
    console.log(listOfCards);
  } else {
    throw new Error('Request Failed!');
  }
}

getRequest();
