# library

## Implementing a library using prototypes as code organization pattern 

1. All book objects are going to be stored in a simple array
- create array to store books
- add a function to the script that:
- takes users's input --`collectData()`:
>  The `collectData()` function get every value of the form
   and call the `addBookToLibrary()` function passing them
   It prevents the page from refreshing, it hides and resets
   the form (calling both functions respectively).
   The `addBookToLibrary()` function instantiates a new Book object
   and push that new object to the array. Then it calls the `showBooks()`
   function
- create new book object. There is the function constructor `Book` 
  and it's prototype `bookPrototype`
  - the function constructor returns an object considering 3 
    necessary parameters and 1 optional
  - the prototype has two methods --one to check the status of
    each book object. The other to change that status. By design,
    when creating a new book object, every book will be "not read"
    the changeStatus() function returns the object with the new status
    so you can call the checkStatus() function and update the button

2. Show books on the page --`showBooks()`
- it makes an array with the last added book object 
- then it iterates through the array `(a)` creating a new table row
- then `(b)` it goes over each own property of the book object
- `(c)` creating a table field for each one   
- then `(d)` it creates a status-button, `(e)` considers 
the read-status of the book calling the corresponding method 
in the prototype and add an event listener to that button (see 8)
- then `(f)` calls the `addRemoveButton()` function (see 4)
- then `(g)` calls `addIndex()` function (see 7)
`addIndex()`
- `addIndex()` `(i)` get reference of every remove button,
and `(j)` updates the DOM-Object in array relation    
**Bottleneck**: `showBooks()` function shows every book in the 
array. So every time you call it, all book in array will be added
to page plus the one where already there.
**Solution**: create a new array considering only the last added item     
3. Add new button that brings up a form allowing users to 
input the details for the new books: author, title, 
number of pages, whether it`s been read and anything else
you might want.
- Add a button to hide form box
4. Add a button on each book`s display to remove the book from
the library
- `addRemoveButton()` `(j)` takes the table row where the button
will be inserted, add a class attribute and an event listener to
the button
**Bottleneck**
- Add listener to dynamically created element
- (live / non live) NodeList vs HTMLCollections?
**Solution**: add listener when button to remove each book
is being created
7. Remove book when `removeBook()` is clicked  
- Create a function that associates each book DOM element 
with the book object in the array: `addIndex()` 
- Remove object from Array
- Stop showing the book on page        
8. Change read status when status button is clicked --`changeStatus()`
- Add event listener to each status button
- `changeStatus()` function should:
- get object being working on
- change status of object's read property
- update the status-button class to status-button-read  
