import { storedApiKey, storedTokenSecret } from './keys.js';


const apiKey = storedApiKey;
const tokenSecret = storedTokenSecret;
const boardId = '5dce45086b307e7119c6b620';
const getListsFromBoard = `https://api.trello.com/1/boards/${boardId}/lists?cards=all&key=${apiKey}&token=${tokenSecret}`;

let listCards;
let listOfChecklist;
let cardDetails;
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


function refreshCardDOM() {
  const previousChecklist = document.getElementById("card-modal");
  if (previousChecklist !== null) {
    const parent = previousChecklist.parentElement;
    parent.removeChild(previousChecklist);
  }


  const cardDetailsContainer = document.createElement('div');
  const cardTitleDiv = document.createElement('div');
  const descriptionDiv = document.createElement('div');
  const wholecheckList = document.createElement('div');
  wholecheckList.setAttribute('class', 'container-checklists');

  const ptagCardTitle = document.createElement('p');
  const ptagDesc = document.createElement('p');
  ptagCardTitle.appendChild(document.createTextNode(cardDetails['name']));
  cardTitleDiv.appendChild(ptagCardTitle);
  cardTitleDiv.setAttribute('class', 'card-title-div');
  cardTitleDiv.setAttribute('card-id', cardDetails['id']);
  ptagDesc.appendChild(document.createTextNode(cardDetails['desc']));
  descriptionDiv.appendChild(ptagDesc);
  descriptionDiv.setAttribute('class', 'desc-container');

  listOfChecklist.forEach((checkList) => {
    const chklistDiv = document.createElement('div');
    const chklistTitleDiv = document.createElement('div');
    const ptagTitle = document.createElement('p');
    ptagTitle.appendChild(document.createTextNode(checkList['name']));
    chklistTitleDiv.appendChild(ptagTitle);
    chklistTitleDiv.setAttribute('class', 'checklist-title');
    chklistDiv.appendChild(chklistTitleDiv);
    const chklistItemsDiv = document.createElement('div');
    const chklistItems = document.createElement('form');
    chklistItems.setAttribute('id', 'checklist-item-box');
    chklistItems.setAttribute('class', 'checklist-item-sub-container');

    checkList['checkItems'].forEach((listItem) => {
      const item = document.createElement('input');
      const itemContainer = document.createElement('div');
      const label = document.createElement('label');
      item.setAttribute('type', 'checkbox');
      if (listItem['state'] === 'complete') {
        item.setAttribute('checked', true);
        const strikethrough = document.createElement('s');
        const text = document.createTextNode(listItem['name']);
        strikethrough.appendChild(text);
        label.appendChild(strikethrough);
      } else {
        label.appendChild(document.createTextNode(listItem['name']));
      }
      itemContainer.appendChild(item);
      itemContainer.appendChild(label);
      itemContainer.setAttribute('class', 'checklist-item');
      itemContainer.setAttribute('checkitem-id', listItem['id']);
      itemContainer.setAttribute('card-id', cardDetails['id']);
      chklistItems.appendChild(itemContainer);
    });
    const btnDelChecklist = document.createElement('button');
    const addCheckListItemBtn = document.createElement('button');
    const btnTextChecklist = document.createTextNode('Add Checklist Item');
    const delChecklistText = document.createTextNode('Delete Checklist');
    const btnDiv = document.createElement('div');

    btnDelChecklist.appendChild(delChecklistText);
    addCheckListItemBtn.appendChild(btnTextChecklist);
    btnDiv.appendChild(addCheckListItemBtn);
    btnDiv.appendChild(btnDelChecklist);
    btnDiv.setAttribute('class', 'btn-container');
    btnDelChecklist.setAttribute('class', 'btn-del-add');
    addCheckListItemBtn.setAttribute('class', 'btn-del-add');

    chklistItemsDiv.setAttribute('class', 'checklist-items');
    chklistItemsDiv.appendChild(chklistItems);
    chklistDiv.appendChild(chklistItemsDiv);
    chklistDiv.appendChild(btnDiv);

    chklistDiv.setAttribute('class', 'checklist');
    chklistDiv.setAttribute('checklist-id', checkList['id']);
    chklistDiv.setAttribute('card-id', cardDetails['id']);
    wholecheckList.appendChild(chklistDiv);
  });
  const addChecklistBtn = document.createElement('button');
  const btnText = document.createTextNode('Add Checklist');
  const btnChklistDiv = document.createElement('div');
  addChecklistBtn.appendChild(btnText);
  addChecklistBtn.setAttribute('class', 'add-checklist-btn');
  btnChklistDiv.setAttribute('class', 'div-add-checklist-btn');
  btnChklistDiv.appendChild(addChecklistBtn);
  const closeBtn = document.createElement('span');
  closeBtn.setAttribute('class', 'close');
  closeBtn.innerHTML = '&times;';
  cardDetailsContainer.appendChild(closeBtn);
  cardDetailsContainer.appendChild(cardTitleDiv);
  cardDetailsContainer.appendChild(descriptionDiv);
  cardDetailsContainer.appendChild(btnChklistDiv);
  cardDetailsContainer.appendChild(wholecheckList);
  cardDetailsContainer.setAttribute('class', 'card-details-container');

  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal');
  modal.setAttribute('id', 'card-modal');
  modal.appendChild(cardDetailsContainer);
  document.body.appendChild(modal);

  const mymodal = document.getElementById('card-modal');
  const chklistItems = document.getElementById('checklist-item-box');
  mymodal.style.display = 'block';
  closeBtn.addEventListener('click', close);
  mymodal.addEventListener('click', deleteChecklist);
  mymodal.addEventListener('click', addNewCheckItemField);
  mymodal.addEventListener('click', addNewCheckItem);
  mymodal.addEventListener('click', addNewCheckListField);
  mymodal.addEventListener('click', addNewCheckList);
  chklistItems.addEventListener('click', strikeItem );

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


async function strikeItem(event) {
  event.preventDefault();


  const cardId = event.target.parentElement.getAttribute('card-id');
  const checkItemId = event.target.parentElement.getAttribute('checkitem-id');
  let state;

  if (event.target.checked === false) {
    state = 'incomplete';
  } else if (event.target.checked === true) {
    state = 'complete';
  }
  const UpdateCheckItemUrl = `https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=${state}&key=${apiKey}&token=${tokenSecret}`;

  const resp = await fetch(UpdateCheckItemUrl, { method: 'PUT' });
  if (resp.ok) {
    fetchCardDetails(cardId);
  }
}

function addNewListField(event) {
  if (event.toElement.type === 'submit' && event.target.innerHTML === '+ Add new List') {
    const listDiv = event.target.parentElement.parentElement;
    listDiv.removeChild(event.target.parentElement);

    // append the input field
    const FieldDiv = document.createElement('div');
    const textField = document.createElement('input');
    const saveBtn = document.createElement('input');
    saveBtn.setAttribute('type', 'submit');
    saveBtn.value = 'Add';
    textField.setAttribute('type', 'text');
    textField.setAttribute('placeholder', 'New List name');
    FieldDiv.appendChild(textField);
    FieldDiv.appendChild(saveBtn);
    FieldDiv.setAttribute('class', 'add-card');
    FieldDiv.classList.add('card-div');
    listDiv.appendChild(FieldDiv);
  }
}

function addNewCheckItemField(event) {
  if (event.toElement.type === 'submit' && event.target.innerHTML === 'Add Checklist Item') {
    const checklistDiv = event.target.parentElement.parentElement;
    checklistDiv.removeChild(event.target.parentElement);

    // append the input field
    const FieldDiv = document.createElement('div');
    const textField = document.createElement('input');
    const saveBtn = document.createElement('input');
    saveBtn.setAttribute('type', 'submit');
    saveBtn.value = 'Add Item';
    textField.setAttribute('type', 'text');
    textField.setAttribute('placeholder', 'CheckItem');
    FieldDiv.appendChild(textField);
    FieldDiv.appendChild(saveBtn);
    FieldDiv.setAttribute('class', 'add-checklist-item');
    checklistDiv.appendChild(FieldDiv);
  }
}

function addNewCheckListField(event) {
  if (event.toElement.type === 'submit' && event.target.innerHTML === 'Add Checklist') {
    const checklistDiv = event.target.parentElement.parentElement;
    checklistDiv.removeChild(event.target.parentElement);

    // append the input field
    const FieldDiv = document.createElement('div');
    const textField = document.createElement('input');
    const saveBtn = document.createElement('input');
    saveBtn.setAttribute('type', 'submit');
    saveBtn.value = 'Add CheckList';
    textField.setAttribute('type', 'text');
    textField.setAttribute('placeholder', 'CheckList Name');
    FieldDiv.appendChild(textField);
    FieldDiv.appendChild(saveBtn);
    FieldDiv.setAttribute('class', 'add-checklist-item');
    checklistDiv.appendChild(FieldDiv);
  }
}

async function addNewCheckItem(event) {
  if (event.toElement.type === 'submit' && event.target.value === 'Add Item') {
    const input = event.target.previousElementSibling.value;
    const checklistId = event.target.parentElement.parentElement.getAttribute('checklist-id');
    const cardId = event.target.parentElement.parentElement.getAttribute('card-id');
    if (input.length > 0) {
      const url = `https://api.trello.com/1/checklists/${checklistId}/checkItems?name=${input}&pos=bottom&checked=false&key=${apiKey}&token=${tokenSecret}`;
      const resp = await fetch(url, { method: 'POST' });
      if (resp.ok) {
        fetchCardDetails(cardId);
      }
    }
  }
}


async function addNewCheckList(event) {
  if (event.toElement.type === 'submit' && event.target.value === 'Add CheckList') {
    const input = event.target.previousElementSibling.value;
    const cardId = event.target.parentElement.previousElementSibling.firstChild.getAttribute('card-id');

    if (input.length > 0) {
      const url = `https://api.trello.com/1/checklists?idCard=${cardId}&name=${input}&key=${apiKey}&token=${tokenSecret}`;
      const resp = await fetch(url, { method: 'POST' });
      if (resp.ok) {
        fetchCardDetails(cardId);
      }
    }
  }
}


async function addNewList(event) {
  if (event.toElement.type === 'submit' && event.target.value === 'Add') {
    const input = event.target.previousElementSibling.value;
    if (input.length > 0) {
      const url = `https://api.trello.com/1/lists?name=${input}&idBoard=${boardId}&key=${apiKey}&token=${tokenSecret}`;
      const resp = await fetch(url, { method: 'POST' });
      if (resp.ok) {
        getListsAndCards();
        refreshDom();
      }
    }
  }
}


async function fetchCardDetails(cardId) {
  const cardUrl = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${tokenSecret}`;
  const checkListUrl = `https://api.trello.com/1/cards/${cardId}/checklists?checkItems=all&checkItem_fields=all&filter=all&fields=all&key=${apiKey}&token=${tokenSecret}`;

  const cardResponse = await fetch(cardUrl);
  const chkListResp = await fetch(checkListUrl);
  if (cardResponse.ok) {
    cardDetails = await cardResponse.json();
  } else {
    throw new Error('Request Failed!');
  }

  if (chkListResp.ok) {
    listOfChecklist = await chkListResp.json();
  } else {
    throw new Error('Checklist Request Failed!');
  }

  if (cardDetails !== undefined && chkListResp !== undefined) {
    refreshCardDOM();
  }
}


async function showCard(event) {
  const cardId = event.target.parentElement.getAttribute('card-id');
  fetchCardDetails(cardId);
}




async function deleteChecklist(event) {
  if (event.target.innerText === 'Delete Checklist') {
    const checklistId = event.target.parentElement.parentElement.getAttribute('checklist-id');
    const cardId = event.target.parentElement.parentElement.getAttribute('card-id');
    const deleteChecklistUrl = `https://api.trello.com/1/checklists/${checklistId}?key=${apiKey}&token=${tokenSecret}`;

    const resp = await fetch(deleteChecklistUrl, { method: 'DELETE' });
    if (resp.ok) {
      fetchCardDetails(cardId);
    }
  }
}

function close() {
  const checklist = document.getElementById("card-modal");
  checklist.style.display = "none";

  // remove the card div
  const parent = checklist.parentElement;
  parent.removeChild(checklist);
}

window.onclick = function (event) {
  const checklist = document.getElementById("card-modal");
  if (event.target == checklist) {
    checklist.style.display = 'none';

    // remove the card div
    const parent = checklist.parentElement;
    parent.removeChild(checklist);
  }
}


getListsAndCards();


containerDiv.addEventListener('click', addNewCard);
containerDiv.addEventListener('click', deleteCard);
containerDiv.addEventListener('click', addNewListField);
containerDiv.addEventListener('click', addNewList);
containerDiv.addEventListener('click', showCard);

