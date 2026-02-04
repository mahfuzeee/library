
let booksLibrary = []; //Main Array

//Adding some books
addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);
addBookToLibrary("Control Systems", "S.P. Xavier", 358, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 458, true);
addBookToLibrary("1984", "George Orwell", 347, false);

//DOM interface variables
const cardContainer = document.getElementById("book-container");
const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const dialogCancelBtn = document.getElementById("cancel-button");
const submitBtn = document.getElementById("submit-button");
const addBookForm = document.getElementById("add-book-form");



//Function for creating and displaying card data.
function updateCard() {
    cardContainer.replaceChildren();
    const htmlContent = booksLibrary.map(book => 
        `<div data-book-id=${book.id} class="card">
            ${book.info()}
            <div class="card-actions">
                <button data-action="toggle-status">Change Read Status</button>
                <button data-action="delete">Delete</button>
          </div>
        </div>`
    ).join('');
    cardContainer.innerHTML = htmlContent;
    
}


//Defining Book Object Constructor.
function Book(id, title, author, pages, read) {
    if(!new.target) {
    throw Error("You nust use 'new' operator to call constructor.");
    }
    this.id = id;
    this.title = title;
    this. author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let readText = '';
        if(this.read) {
        readText = "read complete";
        } else {
        readText = "not read yet";
        }
        return `<h2>${this.title} </h2> 
                <p>By <em>${this.author}</em> </p> 
                <p>${this.pages} Pages</p> 
                <p>Read Status: ${readText}</p>`;
    }
}

Book.prototype.toggleStatus = function() {
    this.read = !this.read;
}

//Adding book to library array

function addBookToLibrary(title, author, pages, readStus) {
    let bookId = crypto.randomUUID();
    let book = new Book(bookId, title, author, pages, readStus);
    booksLibrary.push(book);
    //console.log(bookId);
}

//Event handling section

function toggleReadStatus(id) {
    const bookIndex = booksLibrary.findIndex(book => book.id === id);
    if(bookIndex !== -1) {
        booksLibrary[bookIndex].toggleStatus();
    }
}

function deleteBook(id) {
    const bookIndex = booksLibrary.findIndex(book => book.id === id);
    if(bookIndex !== -1) {
        booksLibrary.splice(bookIndex, 1);
    }
}

addBookBtn.addEventListener('click', () => {
    modal.showModal();
});

dialogCancelBtn.addEventListener('click', () => {
    addBookForm.reset();
    modal.close();
    
});


//Handling Add book to library.
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const page = document.getElementById("pages").value;
    const readStatus = document.getElementById("read-status").checked;
    if(title && author && page) {
        addBookToLibrary(title, author, page, readStatus);
        modal.close();
        addBookForm.reset();
        updateCard();
    }
    
});

//Handling book card buttons
cardContainer.addEventListener('click', (e) => {
    if (!e.target.matches('button[data-action]')) return;

    const card = e.target.closest('.card');
    const bookId = card.dataset.bookId;
    const action = e.target.dataset.action;
    
    if(!card) return;
    console.log(action);
    
    if(action === 'toggle-status') {
        toggleReadStatus(bookId);
    } else if(action === 'delete') {
        deleteBook(bookId);
    }
    updateCard();
});


//Initial Loading
updateCard();