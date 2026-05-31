const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancel-btn');
const dialog = document.getElementById('book-modal');
const form = document.getElementById('book-form');

const library = [];




addBtn.addEventListener('click', () => dialog.showModal());
cancelBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
})