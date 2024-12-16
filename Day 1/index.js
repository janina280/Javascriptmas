// References to DOM elements
const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');
const listArr = [];

// Function to normalize input: trims spaces and removes extra spaces between words
function normalizeText(text) {
    return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

// Function to check for duplicates and add an item if it's unique
function checkDuplicate() {
    const itemText = itemInput.value;
    const normalizedItem = normalizeText(itemText);

    // Check if the normalized version already exists in the list
    const isDuplicate = listArr.some((entry) => normalizeText(entry) === normalizedItem);

    if (itemText.trim() === '') {
        alert('Please enter a valid item!');
        return;
    }

    if (isDuplicate) {
        alert('This item is already on the list!');
    } else {
        listArr.push(itemText); // Add original text (preserve Grandpa's capitalization)
        renderList();
    }

    itemInput.value = ''; // Clear the input field
}

// Function to render the list with delete and edit buttons
function renderList() {
    shoppingList.innerHTML = '';

    listArr.forEach((gift, index) => {
        const listItem = document.createElement('li');

        // Add gift text
        const giftText = document.createElement('span');
        giftText.textContent = gift;

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteItem(index);
        });

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editItem(index);
        });

        listItem.appendChild(giftText);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        shoppingList.appendChild(listItem);
    });
}

// Function to delete an item from the list
function deleteItem(index) {
    listArr.splice(index, 1); // Remove the item at the specified index
    renderList();
}

// Function to edit an item in the list
function editItem(index) {
    const newValue = prompt('Edit your item:', listArr[index]);
    if (newValue !== null && newValue.trim() !== '') {
        const normalizedNewValue = normalizeText(newValue);
        const isDuplicate = listArr.some((entry, i) => i !== index && normalizeText(entry) === normalizedNewValue);

        if (isDuplicate) {
            alert('This edited item already exists on the list!');
        } else {
            listArr[index] = newValue; // Update with new value
            renderList();
        }
    } else {
        alert('Invalid input!');
    }
}

// Add event listener to button
addItemButton.addEventListener('click', checkDuplicate);

// Allow adding items by pressing Enter key
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate();
    }
});
