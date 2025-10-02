const bookContainer = document.querySelector('.book-container');



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
        status.classList.add('book-status');
        status.textContent = `Status: ${book.readStatus}`;

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
    })
}

window.addEventListener('DOMContentLoaded', displayBooks)