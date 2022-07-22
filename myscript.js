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
    myLibrary.push(newBook);
    showBooks();
}

// Test
// addBookToLibrary("The Hobbit", "Talkien", 332);
// addBookToLibrary("The Alchemist", "Cohelo", 232);
// addBookToLibrary("Don Quijote", "Cervantes", 789);
// console.log(myLibrary);


// ==========================================FUNCTIONS
// Show books on page 
function showBooks(){
    myLibrary.forEach(function(book){
        const newTableRow = document.createElement('tr')
        for (eachProp in book) {
            if (book.hasOwnProperty(eachProp)) {
                const newTableData = document.createElement('td');
                newTableData.textContent = book[eachProp];
                newTableRow.appendChild(newTableData);
            }
        }
        theBodyOfTable[0].appendChild(newTableRow);
    }); 
}


// Show the form when add book button is clicked
function showForm(){    
    theFormContainer.classList.toggle('form-container-visible');
}

// Hide the form if close button is clicked
function hideForm(){
    theFormContainer.classList.remove('form-container-visible')
}

// The collectData function get every value of the form
// and call the addBookToLibrary passing them 
function collectData(e) {
    const theTitle = document.getElementById('book_title').value;
    const theAuthor = document.getElementById('book_author').value;
    const thePages = document.getElementById('book_pages').value;
    e.preventDefault();
    hideForm();
    addBookToLibrary(theTitle, theAuthor, thePages);
}


// ==========================================REFERENCES
// Get node reference of table body  
const theBodyOfTable = document.getElementsByTagName('tbody')

// Get form node reference
const theFormContainer = document.querySelector('.form-container');

// Show book form btn and event handler
const showFormBtn = document.querySelector('.add-book');
showFormBtn.onclick = showForm;

// Hide book form btn and event handler
const hideFormBtn = document.querySelector('.close-form');
hideFormBtn.onclick = hideForm;

// Get reference of form
const theForm = document.getElementsByTagName('form');
theForm[0].onsubmit = collectData; 
