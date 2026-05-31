const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancel-btn');
const dialog = document.getElementById('book-modal');
const form = document.getElementById('book-form');

const library = [];

function MakeBook(title, author, genre, status, rating) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.status = status;
    this.rating = rating;
    this.id = crypto.randomUUID();
}

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
}



addBtn.addEventListener('click', () => dialog.showModal());
cancelBtn.addEventListener('click', () => {
    form.reset();
    dialog.close();
});

form.addEventListener('submit', handleFormSubmit);