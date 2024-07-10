import './style.css'



const overlay = document.getElementById('overlay');
const newBookButton = document.querySelector('.new-book-button');
const closeFormButton = document.getElementById('closeFormButton');
const submit = document.querySelector('.submit-button');

const bookName = document.getElementById('title');
const authorName = document.getElementById('author');
const numberOfPages = document.getElementById('pages');
const bookList = document.getElementById('book-list');
const checkBox = document.querySelector('#read');

overlay.classList.add('display');

function resetParameters() {
    bookName.value = "";
    authorName.value = "";
    numberOfPages.value = "";
    checkBox.checked = false;
}

newBookButton.addEventListener('click', function() {
    overlay.classList.remove('display');
    resetParameters();
});

closeFormButton.addEventListener('click', function() {
    overlay.classList.add('display');
});

class Book {
    constructor(name, author, pages, status) {
        this.id = self.crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.edit = false;
    }

    readOrNot() {
        return this.status ? 'Read 📘' : 'Unread ❌';
    }

    statusChanged() {
        this.status = !this.status;
    }

    changeEditStatus() {
        this.edit = !this.edit;
    }

    updateBook(name, author, pages, status) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}
