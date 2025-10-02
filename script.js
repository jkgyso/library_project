const bookContainer = document.querySelector('.book-container');
const formDialog = document.querySelector('#form-dialog');
const openDialogForm = document.querySelector('#open-dialog');
const closeDialogForm = document.querySelector('#close-dialog');
const addBookForm = document.querySelector('#bookForm');



const myLibrary = []

// Book constructor
function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title; 
    this.pages = pages;
    this.readStatus = readStatus
    this.id = crypto.randomUUID()
}


// Add Books to Library
function addBookToLibrary(author, title, pages, readStatus) {
    const newBook = new Book(author, title, pages, readStatus);
    myLibrary.push(newBook);
}

addBookToLibrary('John Smith', 'Javascript', 345, 'read');
addBookToLibrary('Jane Doe', 'CSS', 123, 'not read');
addBookToLibrary('Mikasa Ackerman', 'React', 567, 'read');

console.log(myLibrary)
console.log(myLibrary[0].readStatus)

// Display books 
const displayBooks = () => {

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');

        bookContainer.appendChild(card);

        const title = document.createElement('p');
        title.classList.add('book-title')
        title.textContent = book.title;
        
        const author = document.createElement('p');
        author.classList.add('book-author');
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.classList.add('book-pages');
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement('p');
        status.classList.add('book-status')
        const spanStatus = document.createElement('span');

        book.readStatus === 'read' ? spanStatus.classList.add('read') : spanStatus.classList.add('not-read')
        status.textContent = `Status: `;
        spanStatus.textContent = `${book.readStatus}`;
        status.appendChild(spanStatus);

        

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-button');
        removeBtn.textContent = `Remove`;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(removeBtn)
    })
}

// Add a New Book functionality
const addNewBook = event => {
    event.preventDefault();
    const title = document.querySelector('input[id=title]').value; 
    const author = document.querySelector('input[id=author]').value;
    const pages = document.querySelector('input[id=pages]').value;
    const status = document.querySelector('#status-select').value;

    const statusUpper = status.replace(status[0], status[0].toUpperCase());
   
    addBookToLibrary(author, title, pages, statusUpper);
    renderNewBook();


    formDialog.close();
    console.log(myLibrary)

}

// Render new Book
const renderNewBook = () => {
    const lastBookSaved = myLibrary[myLibrary.length - 1];

     const card = document.createElement('div');
    card.classList.add('card');

    bookContainer.appendChild(card);

    const title = document.createElement('p');
    title.classList.add('book-title')
    title.textContent = lastBookSaved.title;
    
    const author = document.createElement('p');
    author.classList.add('book-author');
    author.textContent = `Author: ${lastBookSaved.author}`;

    const pages = document.createElement('p');
    pages.classList.add('book-pages');
    pages.textContent = `Pages: ${lastBookSaved.pages}`;

    const status = document.createElement('p');
    status.classList.add('book-status')
    const spanStatus = document.createElement('span');

    lastBookSaved.readStatus === 'read' ? spanStatus.classList.add('read') : spanStatus.classList.add('not-read')
    status.textContent = `Status: `;
    spanStatus.textContent = `${lastBookSaved.readStatus}`;
    status.appendChild(spanStatus);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-button');
    removeBtn.textContent = `Remove`;

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    card.appendChild(removeBtn)
}

// Remove Book 
const removeBook = event => {
    const book = event.target;
    const card = document.querySelector('.card');
    if (book.classList.contains('remove-button')) {
        card.remove();
    }
}

// Toggle Read status 
const toggleStatus = event => {
    console.log(event.target);
    const status = event.target; 

    if (status.classList.contains('read')) {
        status.classList.add('not-read');
        status.classList.remove('read');
        status.textContent = 'not read';
    } else if (status.classList.contains('not-read')) {
        status.classList.add('read');
        status.classList.remove('not-read');
        status.textContent = 'read';
    }
}

// Display existing books 
window.addEventListener('DOMContentLoaded', displayBooks);
// Open Modal
openDialogForm.addEventListener('click', () => {
    formDialog.showModal();
});
// Close Modal 
closeDialogForm.addEventListener('click', () => {
    formDialog.close();
})
// Add Book Form 
addBookForm.addEventListener('submit', addNewBook)
// Remove Book 
bookContainer.addEventListener('click', removeBook)
// Toggle Status Button 
bookContainer.addEventListener('click', toggleStatus)