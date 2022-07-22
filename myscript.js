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
            return "read"
        }
        return "not read"
    },
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
    const lastAddedItem = myLibrary.slice(-1);
    lastAddedItem.forEach(function(book, index){
        const newTableRow = document.createElement('tr')
        // Create remove button for each book
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('data-book-index', index);
        removeBtn.setAttribute('class', 'remove-btn');
        removeBtn.textContent = "Remove";

        // Create fields for every book data
        for (eachProp in book) {
            // Check every own property and add field to table with it
            if (book.hasOwnProperty(eachProp)) { 
                const newTableData = document.createElement('td');
                newTableData.textContent = book[eachProp];
                newTableRow.appendChild(newTableData);
            } else { 
                // check read status of book and add a field with it
                const statusBtn = document.createElement('button');
                statusBtn.setAttribute('class', 'status-button');  
                statusBtn.textContent = book.checkRead();
                const newTableData = document.createElement('td');
                newTableData.appendChild(statusBtn);
                newTableRow.appendChild(newTableData);
            }

        }
        // Add remove button
        const newTableData = document.createElement('td');
        newTableData.appendChild(removeBtn);
        newTableRow.appendChild(newTableData);
        // Add row to table with all new book fields
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
    theForm.reset();
    e.preventDefault();
    hideForm();
    addBookToLibrary(theTitle, theAuthor, thePages);
}

// 
function removeBook(e) {
    console.log(e);
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
const theForm = document.getElementsByTagName('form')[0];
theForm.onsubmit = collectData; 

// Get remove button node reference
const removeBtn = document.getElementsByClassName('remove-btn');
removeBtn.onclick = removeBook;