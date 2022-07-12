let myLibrary = [];
let bookList = document.getElementById('book-list');

function Book(title, author, numberOfPages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

function addBookToLibrary(title, author, numberOfPages, read) {
  let addNewBook = new Book(title, author, numberOfPages, read);
  myLibrary.push(addNewBook);
  console.log('Book added.');
}

// Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
function displayBooks() {
  myLibrary.forEach(function (book, i, arr) {

    // Insert new row and its columns
    const row = bookList.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const readCell = row.insertCell(3);
    const actionCell = row.insertCell(4);

    // Insert new data for each cell
    titleCell.innerHTML = book.title;
    authorCell.innerHTML = book.author;
    pagesCell.innerHTML = book.numberOfPages;
    readCell.innerHTML = book.read;
    actionCell.innerHTML = "<button class='remove-item'>Remove Item</button>";
  })
}

// remove all child element of bookList and reentering it again
function tableContent() {
  bookList.innerHTML = "";
  const newTr = document.createElement('tr');

  const newThTitle = document.createElement('th');
  newThTitle.innerText = 'Title';

  const newThAuthor = document.createElement('th');
  newThAuthor.innerText = 'Author';

  const newThPages = document.createElement('th');
  newThPages.innerText = 'Number of Pages';

  const newThStatus = document.createElement('th');
  newThStatus.innerText = 'Status';

  const newThAction = document.createElement('th');
  newThAction.innerText = 'Action';

  newTr.appendChild(newThTitle);
  newTr.appendChild(newThAuthor);
  newTr.appendChild(newThPages);
  newTr.appendChild(newThStatus);
  newTr.appendChild(newThAction);

  bookList.appendChild(newTr);
}

// Add initial items and display it.
// addBookToLibrary('Attack on Titan', 'Hajime Ishayama', 19, 'Currently Reading');
// addBookToLibrary('Attack on Tita101', 'Hajime Ishayama', 19, 'Currently Reading');
// addBookToLibrary('Attack on Titan', 'Hajime Ishayama', 19, 'Currently Reading');
// tableContent();
// displayBooks();

// display add item form by clicking a button
const btnDisplayForm = document.getElementById("btn-display-form");
btnDisplayForm.addEventListener("click", function() {
  const inputBookForm = document.getElementById("input-book-form");
  inputBookForm.style.display = "block";
})

// user input item
const form = document.getElementById("input-book-form");
form.addEventListener("submit", function (e) {

  e.preventDefault();

  const inputTitle = document.getElementById("input-title");
  const inputAuthor = document.getElementById("input-author");
  const inputPages = document.getElementById("input-pages");
  const radios = document.querySelectorAll('.radio');

  let checkValue;

  // select all query
  // loop through it.
  // find which one is selected/checked
  // return its value
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      checkValue = radios[i].value;
    }
  }

  addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, checkValue);
  // tableContent();
  displayBooks();
})

// remove selected item
// 1. loop through every button
// 2. add event listener to every button
// 3. if one of them are clicked, get index information
// 4. find the item with the specified index.
// 5. remove that item and its button (the entire row)
// 6. remove table content and redisplay it.

const removeItemButtons = document.querySelectorAll('.remove-item');

console.log(removeItemButtons.length);
removeItemButtons.forEach(function (button, i, arr) {
  button.addEventListener('click', function (e) {
    // button.remove();
    // e.preventDefault();
    // myLibrary.splice(i,1);
    // tableContent();
    // displayBooks();
    console.log("button index that is clicked: "+ i);
  });
})