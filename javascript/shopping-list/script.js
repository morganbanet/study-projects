const itemInput = document.querySelector('#item-input');
const filterInput = document.querySelector('#item-filter');
const itemList = document.querySelector('#item-list');
const addItemBtn = document.querySelector('#add-item');
const clearAllBtn = document.querySelector('#clear-all');
const deleteItemBtn = document.querySelectorAll('#delete');
const displayEmpty = document.querySelector('#display-empty');
const displayExists = document.querySelector('#exists-window');
const displayError = document.querySelector('#error-window');
const modalScreen = document.querySelector('#modal-screen');

let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.forEach((item) => addItemToDom(item));
}

function onAddItemSubmit() {
  const newItem = itemInput.value;

  if (itemInput.value === '') {
    modalScreen.classList.remove('hidden');
    displayError.classList.remove('hidden');
    return;
  }

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.firstChild.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      modalScreen.classList.remove('hidden');
      displayExists.classList.remove('hidden');
      return;
    }
  }

  addItemToDom(newItem);
  addItemToStorage(newItem);

  checkUI();
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((keep) => keep !== item);

  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function onClickItem(e) {
  console.log('hello');

  if (e.target.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else if (e.target.classList.contains('check-item')) {
    checkItem(e.target);
  } else if (e.target.id === 'item') {
    setItemToEdit(e.target);
  }
}

function checkItem(item) {
  if (!item.classList.contains('checked')) {
    item.classList.add('checked');
    item.parentElement.parentElement.classList.add('check');
  } else {
    item.classList.remove('checked');
    item.parentElement.parentElement.classList.remove('check');
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  addItemBtn.textContent = 'Edit Item';

  itemInput.value = item.textContent;
}

function removeItem(item) {
  item.remove();
  removeItemFromStorage(item.textContent);

  checkUI();
}

function clearItems(e) {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem('items');

  checkUI();
}

function filterItems() {
  const text = filterInput.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  console.log(items);
  console.log(text);
}

function closeMessage(e) {
  if (e.target.id === 'confirm') {
    modalScreen.classList.add('hidden');
    displayExists.classList.add('hidden');
    displayError.classList.add('hidden');
  }
}

function onKeyDown(e) {
  if (e.code === 'Enter') {
    onAddItemSubmit();
  }
}

function addItemToDom(item) {
  const li = document.createElement('li');
  li.id = 'item';

  const p = document.createElement('p');
  p.textContent = item;
  p.id = 'item-text';

  const btnContainer = document.createElement('div');
  btnContainer.id = 'button-container';

  const btnCheck = document.createElement('button');
  btnCheck.id = 'check';
  btnCheck.className = 'item-button button check-item';

  const btnDelete = document.createElement('button');
  btnDelete.id = 'delete';
  btnDelete.className = 'item-button button remove-item';

  const btnCheckIcon = document.createElement('i');
  btnCheckIcon.id = 'list-icon';
  btnCheckIcon.className = 'fa-solid fa-check';

  const btnDeleteIcon = document.createElement('i');
  btnDeleteIcon.id = 'list-icon';
  btnDeleteIcon.className = 'fa-solid fa-trash-can';

  li.appendChild(p);

  btnCheck.appendChild(btnCheckIcon);
  btnDelete.appendChild(btnDeleteIcon);

  btnContainer.appendChild(btnCheck);
  btnContainer.appendChild(btnDelete);

  li.appendChild(btnContainer);

  itemList.appendChild(li);
}

function checkUI() {
  itemInput.value = '';

  if (itemList.children.length > 0) {
    displayEmpty.classList.add('hidden');
  } else {
    displayEmpty.classList.remove('hidden');
  }
}

// Initalize app
(function init() {
  addItemBtn.addEventListener('click', onAddItemSubmit);
  itemInput.addEventListener('keydown', onKeyDown);
  itemList.addEventListener('click', onClickItem);
  clearAllBtn.addEventListener('click', clearItems);
  filterInput.addEventListener('input', filterItems);
  displayExists.addEventListener('click', closeMessage);
  displayError.addEventListener('click', closeMessage);

  displayItems();
  checkUI();
})();
