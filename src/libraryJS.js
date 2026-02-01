let booksLibrary = []; //Main Array

//Adding some books
addBookToLibrary("The Hobbit", "J.R.R. Tolkein", 295, false);
addBookToLibrary("Control Systems", "S.P. Xavier", 358, true);

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
    booksLibrary.forEach((book) => {
        const cardDiv = document.createElement("div");
        cardDiv.id = book.id;
        cardDiv.classList.add("card");
        cardContainer.appendChild(cardDiv);
        cardDiv.innerHTML = book.info();
    });
    
}

//Function for add Book form popup
function addBook() {
    
}


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
        return `Title: ${this.title} <br> Author: ${this.author} <br>Pages: ${this.pages}<br> Read Status: ${readText}.`;
    }
}

//const theHobbit = new Book("The Hobbit", "J.R.R. Tolkein", 295, false);

//const controlSystem = new Book("Control Systems", "S.P. Xavier", 358, true);

function addBookToLibrary(title, author, pages, readStus) {
    let bookId = crypto.randomUUID();
    let book = new Book(bookId, title, author, pages, readStus);
    booksLibrary.push(book);
    //console.log(bookId);
}

addBookBtn.addEventListener('click', () => {
    modal.showModal();
});

dialogCancelBtn.addEventListener('click', () => {
    modal.close();
});

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



//console.log(booksLibrary);
updateCard();