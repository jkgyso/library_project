const bookContainer = document.querySelector('.book-container');
const formDialog = document.querySelector('#form-dialog');
const openDialogFormBtn = document.querySelector('#open-dialog');
const closeDialogFormBtn = document.querySelector('#close-dialog');
const addBookForm = document.querySelector('#bookForm');
const clearBtn = document.querySelector('#clear-btn');



const myLibrary = []

// Book constructor
function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title; 
    this.pages = pages;
    this.readStatus = readStatus
    this.id = crypto.randomUUID()
}

// Prototype to toggle read status 
Book.prototype.toggleReadStatus = function () {
    this.readStatus = this.readStatus === 'read' ? 'not read' : 'read';
}


// Add Books to Library
function addBookToLibrary(author, title, pages, readStatus) {
    const newBook = new Book(author, title, pages, readStatus);
    myLibrary.push(newBook);
}

addBookToLibrary('Harper Lee', 'To Kill a Mockingbird', 281, 'read');
addBookToLibrary('F. Scott Fitzgerald', 'The Great Gatsby', 180, 'not read');
addBookToLibrary('George Orwell', '1984', 328, 'read');
addBookToLibrary('J.R.R Tolkien', 'The Hobbit', 310, 'read');


// Create book card 
const createBookCard = book => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = book.id;

    const title = document.createElement('p');
    title.classList.add('book-title');
    title.textContent = book.title;

    const author = document.createElement('p');
    author.classList.add('book-author');
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement('p');
    pages.classList.add('book-pages');
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement('p');
    status.classList.add('book-status');
    status.textContent = `Status: `

    
    const spanStatus = document.createElement('span');
    book.readStatus === 'read' ? spanStatus.classList.add('read') : spanStatus.classList.add('not-read')
    spanStatus.textContent = `${book.readStatus.charAt(0).toUpperCase()}${book.readStatus.slice(1)}`;
    status.appendChild(spanStatus);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-button');
    removeBtn.textContent = 'Remove';

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(removeBtn);

    return card;
}


// Display books 
const displayBooks = () => {

    bookContainer.innerHTML = '';
    myLibrary.forEach(book => {
        const card = createBookCard(book);
        bookContainer.appendChild(card);
    })
}

// Add a New Book functionality
const addNewBook = event => {
    event.preventDefault();
    const title = document.querySelector('input[id=title]').value; 
    const author = document.querySelector('input[id=author]').value;
    const pages = document.querySelector('input[id=pages]').value;
    const status = document.querySelector('#status-select').value;
   
    addBookToLibrary(author, title, pages, status);
    displayBooks();
    clearInputFields()
    formDialog.close();

}

// Clear input fields
const clearInputFields = () => {
    addBookForm.reset();
}

// Close Modal 
const closeModal = () => {
    formDialog.close();
}

// Remove Book 
const removeBook = event => {
    if (event.target.classList.contains('remove-button')) {
        const card = event.target.closest('.card');
        const bookId = card.dataset.id; 

        const bookIndex = myLibrary.findIndex(book => book.id === bookId);

        if (bookIndex !== -1) {
            myLibrary.splice(bookIndex, 1);
        }

        displayBooks();
   }
}

// Toggle Read status 
const toggleStatus = event => {
    if (event.target.classList.contains('read') || event.target.classList.contains('not-read')) {
        const card = event.target.closest('.card');
        const bookId = card.dataset.id; 

        const book = myLibrary.find(book => book.id === bookId);

        if (book) {
            book.toggleReadStatus();
            displayBooks();
        }
    }
}

// Display existing books 
window.addEventListener('DOMContentLoaded', displayBooks);
// Open Modal
openDialogFormBtn.addEventListener('click', () => {
    formDialog.showModal();
});
// Close Modal 
closeDialogFormBtn.addEventListener('click', closeModal)
// Close Modal on backdrop click 
formDialog.addEventListener('click', (event) => {
    if (event.target.id === "form-dialog") {
        formDialog.close();
    }
})
// Add Book Form 
addBookForm.addEventListener('submit', addNewBook)
// Clear input Fields 
clearBtn.addEventListener('click', clearInputFields);
// Remove Book 
bookContainer.addEventListener('click', removeBook)
// Toggle Status Button 
bookContainer.addEventListener('click', toggleStatus)