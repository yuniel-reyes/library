// Array where book objects will be stored
const myLibrary = [];

// Function constructor
// Function that instantiate every book object
function Book(title, author, pages, read = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
}

// Create prototype object for Book
const bookPrototype = {
    checkRead() {
        if (this.read){
            return "was read."
        }
        return "not read yet."
    },
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.checkRead()}` // 
    }
}

// Prototype the Book constructor
Book.prototype = Object.create(bookPrototype);

// Take user's input create new book and add to library
function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook.title);
}

// Test
addBookToLibrary("The Hobbit", "Talkien", 332);
addBookToLibrary("The Alchemist", "Cohelo", 232);
console.log(myLibrary);

// Show books on page 
const theBodyOfTable = document.get

function showBooks(){
    myLibrary.forEach(book => ) 
}
window.onload = showBooks;


