const addBtn = document.getElementById('add-book-btn');
const cancelBtn = document.getElementById('cancel-btn');
const dialog = document.getElementById('book-modal');
const form = document.getElementById('book-form');
const displaySection = document.getElementById('display-section');

const library = [];

function Book(title, author, genre, status, rating) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
    this.rating = rating;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleStatus = function() {
    const options = ['read', 'in-progress', 'not-read'];
    let currInd = options.indexOf(this.status);
    let nextInd = (currInd + 1) % options.length;
    this.status = options[nextInd];
};

function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newBook = new Book(
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
    const book = library.find(book => book.id === id);
    if (book) {
        book.toggleStatus();
        renderLibrary();
    }
}

function deleteBook(id) {
    const bookInd = library.findIndex(book => book.id === id);

    if (bookInd !== -1) {
        library.splice(bookInd, 1);
        renderLibrary();
    }
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
        statusBtn.dataset.action = 'toggle';
        statusBtn.dataset.id = book.id;

        deleteBtn.className = 'btn btn-delete';
        deleteBtn.dataset.action = 'delete';
        deleteBtn.dataset.id = book.id;

        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        genreCell.textContent = book.genre;
        ratingCell.textContent = `${book.rating} Stars`;
        deleteBtn.textContent = 'Delete'; 


        statusBtn.ariaLabel =  'Toggle read status';
        deleteBtn.ariaLabel =  `Delete the book titled, ${book.title}, authored by, ${book.author}`;

        if (book.status === 'read') {
            statusBtn.classList.add('status-read');
            statusBtn.textContent = 'Read';
        } else if (book.status === 'in-progress') {
            statusBtn.classList.add('status-in-progress');
            statusBtn.textContent = 'In Progress';
        } else {
            statusBtn.classList.add('status-unread');
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
    const target = e.target;
    const action = target.dataset.action;
    const bookId = target.dataset.id;

    if (!action || !bookId) return;

    if (action === 'toggle') updateBookStatus(bookId);
    if (action === 'delete') deleteBook(bookId);
});