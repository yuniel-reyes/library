// Library Module: all happens inside it
// and nothing goes outside
const Library = (() => {
  // EVERY NODE REFERENCE
  // Get node reference of table body
  const theBodyOfTable = document.getElementsByTagName('tbody')
  // Get form node reference
  const theFormContainer = document.querySelector('.form-container')
  // Show book form btn and event handler
  const showFormBtn = document.querySelector('.add-book')
  // Hide book form btn and event handler
  const hideFormBtn = document.querySelector('.close-form')
  // Get reference of form
  const theForm = document.getElementsByTagName('form')[0]

  // Array where book objects will be stored
  // This is a module too
  const TheLibrary = (() => {
    const myLibrary = []

    return {
      myLibrary,
    }
  })()

  // This is another module
  const BookEnter = (() => {
    // The Book class to create an instance of each added book
    class Book {
      constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
      }

      changeStatus() {
        if (this.read == 'read') {
          this.read = 'no read'
        } else {
          this.read = 'read'
        }
        return this
      }
    }

    // Take user's input create new book and add to library
    const addBookToLibrary = (title, author, pages, read) => {
      const newBook = new Book(title, author, pages, read)
      TheLibrary.myLibrary.push(newBook)
      showBooks()
    }

    // Show books on page
    // Show the form when add book button is clicked
    const showForm = () => {
      theFormContainer.classList.toggle('form-container-visible')
    }
    showFormBtn.onclick = showForm

    // The collectData function get every value of the form
    // and call the addBookToLibrary passing them
    const collectData = (e) => {
      const theTitle = document.getElementById('book_title').value
      const theAuthor = document.getElementById('book_author').value
      const thePages = document.getElementById('book_pages').value
      let ifRead = document.getElementById('read-status').checked
      if (ifRead == true) {
        ifRead = 'read'
      } else {
        ifRead = 'no read'
      }
      theForm.reset()
      e.preventDefault()
      hideForm()
      addBookToLibrary(theTitle, theAuthor, thePages, ifRead)
    }
    theForm.onsubmit = collectData

    // Hide the form if close button is clicked
    const hideForm = () => {
      theFormContainer.classList.remove('form-container-visible')
    }
    hideFormBtn.onclick = hideForm

    // Show books
    const showBooks = () => {
      // Take only the last added book
      const lastAddedBook = TheLibrary.myLibrary.slice(-1)

      // For each last added book to be shown:
      lastAddedBook.forEach((book) => {
        // Create table row
        const newTableRow = document.createElement('tr')

        // Create fields for every book data
        for (eachProp in book) {
          // Check every own property and add field to table with it
          if (book.hasOwnProperty(eachProp)) {
            if (eachProp === 'read') {
              // Create button for 'read' status
              const statusBtn = document.createElement('button')
              // Add event handler to each book | status button
              statusBtn.addEventListener('click', changeStatus)
              // Set attribute for read status
              statusBtn.setAttribute('class', 'status-button')
              // Add status as text content of the button
              statusBtn.textContent = book.read
              // Create field for status button
              const newTableData = document.createElement('td')
              // Append status button to field
              newTableData.appendChild(statusBtn)
              // Append field to table
              newTableRow.appendChild(newTableData)
              checkStatus(statusBtn, book)
            } else {
              const newTableData = document.createElement('td')
              newTableData.textContent = book[eachProp]
              newTableRow.appendChild(newTableData)
            }
          }
        }
        addRemoveButton(newTableRow)
        addIndex()
      })
    }

    const addRemoveButton = (newTableRow) => {
      // Create remove button | add class attribute | add text content
      const removeBtn = document.createElement('button')
      removeBtn.setAttribute('class', 'remove-btn')
      removeBtn.textContent = 'Remove'
      // Add remove button to table row
      const newTableData = document.createElement('td')
      newTableData.appendChild(removeBtn)
      newTableRow.appendChild(newTableData)
      // Add row to table with all new book fields
      theBodyOfTable[0].appendChild(newTableRow)

      // Add event listener to remove button
      removeBtn.addEventListener('click', removeBook)
    }

    // This function associates the DOM element with the book
    // object in the array
    const addIndex = () => {
      // Get reference of each added remove button
      const eachRemoveBtn = document.querySelectorAll('.remove-btn')
      eachRemoveBtn.forEach(function (book, index) {
        if (book.classList.contains('data-book-index')) {
          book.classList.remove('data-book-index')
          book.setAttribute('data-book-index', index)
        } else {
          book.setAttribute('data-book-index', index)
        }
      })
    }

    // This function updates the DOM-Array association
    // every time a book is remove
    const updateIndex = () => {
      const eachRemoveBtn = document.querySelectorAll('.remove-btn')
      eachRemoveBtn.forEach(function (book, index) {
        book.classList.remove('data-book-index')
        book.setAttribute('data-book-index', index)
      })
    }

    const checkStatus = (statusBtn, thisObj) => {
      if (thisObj.read == 'read') {
        statusBtn.classList.toggle('read')
      }
    }

    const changeStatus = (e) => {
      const thisObject =
        e.target.parentNode.nextSibling.children[0].getAttribute(
          'data-book-index'
        )
      e.target.textContent =
        TheLibrary.myLibrary[thisObject].changeStatus().read
      e.target.classList.toggle('read')
    }

    // remove book from page and array
    const removeBook = (e) => {
      // Remove from page
      let thisIndex = e.target.dataset.bookIndex
      let thisParent = e.target.parentNode
      thisParent = thisParent.parentNode
      thisParent.remove()

      // Remove from array
      TheLibrary.myLibrary.splice(thisIndex, 1)
      updateIndex()
    }
  })()
})()
