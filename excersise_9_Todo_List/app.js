// Get references to DOM elements
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const itemList = document.getElementById('itemList');
const markAllButton = document.getElementById('markAllButton');
const unmarkAllButton = document.getElementById('unmarkAllButton');
const clearListButton = document.getElementById('clearListButton');
const bulkActions = document.getElementById('bulkActions');

// Add new item to the list
addButton.addEventListener('click', function () {
    const itemText = itemInput.value.trim();
    if (itemText !== '') {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = itemText;

        // Add click event to mark item as purchased
        li.addEventListener('click', function () {
            li.classList.toggle('purchased');
            updateBulkActionsVisibility();
        });

        // Add double click event to remove item
        li.addEventListener('dblclick', function () {
            li.remove();
            updateBulkActionsVisibility();
        });

        // Add item to the list
        itemList.appendChild(li);
        itemInput.value = ''; // Clear input field
        updateBulkActionsVisibility();
    }
});

// Mark all items as purchased
markAllButton.addEventListener('click', function () {
    const items = document.querySelectorAll('#itemList li');
    items.forEach(item => item.classList.add('purchased'));
});

// Unmark all items
unmarkAllButton.addEventListener('click', function () {
    const items = document.querySelectorAll('#itemList li');
    items.forEach(item => item.classList.remove('purchased'));
});

// Clear the entire list
clearListButton.addEventListener('click', function () {
    itemList.innerHTML = '';
    updateBulkActionsVisibility();
});

// Update visibility of bulk action buttons based on list status
function updateBulkActionsVisibility() {
    const items = document.querySelectorAll('#itemList li');
    if (items.length > 0) {
        bulkActions.classList.remove('d-none');
    } else {
        bulkActions.classList.add('d-none');
    }
}
