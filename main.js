

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

class BookManager {
    constructor() {
        this.BookArray = [];
    }

    addBookToArray(book) {
        this.BookArray.push(book);
    }

    deleteBookFromArray(id) {
        this.BookArray = this.BookArray.filter(book => book.id !== id);
        this.displayBookArray();
    }

    displayBookArray() {
        bookList.innerHTML = "";
        this.BookArray.forEach(element => {
            this.displayBooks(element);
        });
    }

    displayBooks(element) {
        const html = `${element.edit ? 
            `<div class="form">
                <input type="text" class="input-title inpt" placeholder="Title" value="${element.name}" />
                <input type="text" class="input-author inpt" placeholder="Author" value="${element.author}" />
                <input type="number" class="input-pages inpt" placeholder="Pages" value="${element.pages}" />
                <button class="button-ok">OK</button>
            </div>` : 
            `<li id="${element.id}">
                <div class="edit">
                    <div class="editBook">Edit</div>
                </div>
                <div class="theNameofBook">${element.name}</div>
                <div class="theAuthorofBook">- ${element.author}</div>
                <div class="thePagesofBook">${element.pages}</div>
                <div class="btn">
                    <button class="button-checkRead">${element.readOrNot()}</button>
                    <button class="buttonDelete">Delete book</button>
                </div>
            </li>`}`;
        
        bookList.insertAdjacentHTML('afterbegin', html);

        if (element.edit) {
            const form = document.querySelector('.form');
            const okButton = form.querySelector('.button-ok');

            okButton.addEventListener('click', (ev) => {
                const newName = form.querySelector('.input-title').value;
                const newAuthor = form.querySelector('.input-author').value;
                const newPages = form.querySelector('.input-pages').value;

                element.updateBook(newName, newAuthor, newPages, element.status);
                element.changeEditStatus();
                this.displayBookArray();
            });
        } else {
            const itemElement = document.getElementById(element.id);

            const deleteBookButton = itemElement.querySelector('.buttonDelete');
            deleteBookButton.addEventListener('click', (ev) => {
                const id = ev.target.closest('li').id;
                this.deleteBookFromArray(id);
            });

            const statusButton = itemElement.querySelector('.button-checkRead');
            statusButton.addEventListener('click', (ev) => {
                const id = ev.target.closest('li').id;
                const foundElement = this.BookArray.find(book => book.id === id);
                foundElement.statusChanged();
                this.displayBookArray();
            });

            const editBookButton = itemElement.querySelector('.edit');
            editBookButton.addEventListener('click', (ev) => {
                const id = ev.target.closest('li').id;
                const foundElement = this.BookArray.find(book => book.id === id);
                foundElement.changeEditStatus();
                this.displayBookArray();
            });
        }
    }
}

const bookManager = new BookManager();

submit.addEventListener('click', function(ev) {
    ev.preventDefault();

    const book = new Book(bookName.value, authorName.value, numberOfPages.value, checkBox.checked);
    overlay.classList.add('display');
    bookManager.addBookToArray(book);
    bookManager.displayBookArray();
});
































