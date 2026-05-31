const addBtn = document.getElementById('add-btn');
const dialog = document.getElementById('book-modal');

function handleClick() {
    dialog.showModal();
}


addBtn.addEventListener('click', handleClick);