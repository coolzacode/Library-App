const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancel-btn');
const dialog = document.getElementById('book-modal');
const form = document.getElementById('book-form');
const displaySection = document.getElementById('display-section');

const library = [];

function MakeBook(title, author, genre, status, rating) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
    this.rating = rating;
    this.id = crypto.randomUUID();
}

MakeBook.prototype.toggleStatus = function() {
    const options = ['read', 'in-progress', 'not-read'];
    let currInd = options.indexOf(this.status);

    let nextInd = (currInd + 1) % options.length;

    this.status = options[nextInd];
};

function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newBook = new MakeBook(
        formData.get('title'),
        formData.get('author'),
        formData.get('genre'),
        formData.get('status'),
        formData.get('rating')
    );

    library.push(newBook);
    e.target.reset();
    dialog.close();

    renderLibrary();
}

function updateBookStatus(id) {
    const book = library.filter(book => book.id === id);
    book[0].toggleStatus();

    renderLibrary();
}

function deleteBook(id) {
    let bookInd = -1;
    for (let i = 0; i < library.length; i++) {
        if (library[i].id === id) {
            bookInd = i;
            break;
        }
    }
    library.splice(bookInd, 1);

    renderLibrary();
}

function renderLibrary() {
    displaySection.replaceChildren();

    const fragment = document.createDocumentFragment();

    library.forEach(book => {
        const tableRow = document.createElement('tr');

        const titleCell = document.createElement('td');
        const authorCell = document.createElement('td');
        const genreCell = document.createElement('td');
        const statusCell = document.createElement('td');
        const ratingCell = document.createElement('td');
        const deleteCell = document.createElement('td');

        const statusBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        statusBtn.className = 'btn';
        statusBtn.id = 'status-btn';
        deleteBtn.className = 'btn btn-delete';
        deleteBtn.id = 'delete-btn';

        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        genreCell.textContent = book.genre;
        ratingCell.textContent = book.rating;
        deleteBtn.textContent = 'Delete'; 

        statusBtn.dataset.id = book.id;
        deleteBtn.dataset.id = book.id;

        statusBtn.ariaLabel =  'Toggle read status';
        deleteBtn.ariaLabel =  `Delete the book titled, ${book.title}, authored by, ${book.author}`;

        if (book.status === 'read') {
            statusBtn.className = 'btn status-read';
            statusBtn.textContent = 'Read';
        } 
        if (book.status === 'in-progress') {
            statusBtn.className = 'btn status-in-progress';
            statusBtn.textContent = 'In Progress';
        }
        if (book.status === 'not-read') {
            statusBtn.className = 'btn status-unread';
            statusBtn.textContent = 'Not Read';
        }

        statusCell.appendChild(statusBtn);
        deleteCell.appendChild(deleteBtn);

        tableRow.append(titleCell, authorCell, genreCell, statusCell, ratingCell, deleteCell);
        fragment.appendChild(tableRow);
    })
    displaySection.appendChild(fragment);
}



addBtn.addEventListener('click', () => dialog.showModal());
cancelBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

form.addEventListener('submit', handleFormSubmit);

displaySection.addEventListener('click', (e) => {
    const statusBtnClicked = e.target.closest('#status-btn');
    const deleteBtnClicked = e.target.closest('#delete-btn');

    if (statusBtnClicked) updateBookStatus(statusBtnClicked.dataset.id);
    if (deleteBtnClicked) deleteBook(deleteBtnClicked.dataset.id);
})