let myLibrary = [];
const bookList = document.getElementById('book-list');
let tableContainer = document.querySelector('.table-and-btn-display-container')

// retrieve data from local storage after page load and push it back to myLibrary
if (localStorage.getItem('books')!== null) {
  myLibrary = JSON.parse(localStorage.getItem('books'));
  displayBooks(myLibrary);
}

// the constructor...
function Book(title, author, numberOfPages, read) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.read = read;
}

function addBookToLibrary(title, author, numberOfPages, read) {
  let newBook = new Book(title, author, numberOfPages, read);
  myLibrary.push(newBook);
  localStorage.setItem('books', JSON.stringify(myLibrary));
  location.reload();
}

function recreateTableHeader() {
  const newTr = document.createElement('tr');

  const newThNo = document.createElement('th');
  newThNo.innerText = 'No';

  const newThTitle = document.createElement('th');
  newThTitle.innerText = 'Title';

  const newThAuthor = document.createElement('th');
  newThAuthor.innerText = 'Author';

  const newThPages = document.createElement('th');
  newThPages.innerText = 'Pages';

  const newThStatus = document.createElement('th');
  newThStatus.innerText = 'Read Status';

  const newThAction = document.createElement('th');
  newThAction.innerText = 'Action';

  newTr.appendChild(newThNo);
  newTr.appendChild(newThTitle);
  newTr.appendChild(newThAuthor);
  newTr.appendChild(newThPages);
  newTr.appendChild(newThStatus);
  newTr.appendChild(newThAction);

  bookList.appendChild(newTr);
}

// Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.
function displayBooks(array) {
  array.forEach(function (book, i, arr) {
      // Insert new row and its columns
      const row = bookList.insertRow();
      const numberCell = row.insertCell(0);
      const titleCell = row.insertCell(1);
      const authorCell = row.insertCell(2);
      const pagesCell = row.insertCell(3);
      const readCell = row.insertCell(4);
      const actionCell = row.insertCell(5);

      // status icon
      switch (book.read) {
        case "Not Started":
          icon = `<a href="#" class="status-link"><img class="status-logo" src="img/power-on.png" alt=""></a>`;
          break;
        case "Reading":
          icon = `<a href="#" class="status-link"><img class="status-logo" src="img/open-book.png" alt=""></a>`;
          break;
        default:
          icon = `<a href="#" class="status-link"><img class="status-logo" src="img/check.png" alt=""></a>`;
          break;
      }

      // create container element for status cells
      // const statusDiv = document.createElement('div')
      // statusDiv.setAttribute('class', 'status-container');
      // statusDiv.appendChild(icon + book.read);
  
      // Insert new data for each cell
      numberCell.innerHTML = i+1;
      titleCell.innerHTML = book.title;
      authorCell.innerHTML = book.author;
      pagesCell.innerHTML = book.numberOfPages;
      readCell.innerHTML = icon + `<span class="aligned">${book.read}</span>`;
      actionCell.innerHTML = `<a href="#" class="link-remove-item"><img src="img/remove.png" class="remove-item"></a>`;
  })
}

function openNav() {
  // document.getElementById("mySidenav").style.width = "250px";
  tableContainer.style.left = "120px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  tableContainer.style.left = "0";
}

// SEARCH FILTER
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
  
  const filteredValue = myLibrary.filter((book, i) => book.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);

  bookList.innerHTML = "";
  recreateTableHeader();
  displayBooks(filteredValue);
})

// SORT ITEMS
const btnSort = document.querySelector('.sort');
btnSort.addEventListener('click', function() {
  myLibrary.sort((a,b) => {
    const nameA = a.title.toUpperCase();
    const nameB = b.title.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  localStorage.setItem('books', JSON.stringify(myLibrary));
  location.reload();
})

// display add item form by clicking a button
const btnDisplayForm = document.getElementById("btn-display-form");

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
});

const btnLogoStatus = document.querySelectorAll('.status-link');
btnLogoStatus.forEach(function (button, i, arr) {
  button.addEventListener('click', function (e) {
    const target = e.target;
    console.log(target);

    // update its element here...
    // access this parent element
    // change its innerHTML with following validation:
    // if e.target is element of not started logo, then change into the element of Reading logo and descriptiton. if it is Reading, change into completed. if its completed, then change into not started.
    // note that things that is need to be updated : myLibrary array and its value in the local storage.
    // reload it.
    switch (target.getAttribute('src')) {
      case "img/power-on.png":
        target.setAttribute('src', 'img/open-book.png');
        myLibrary[i].read = "Reading";
        break;
      case "img/open-book.png":
        target.setAttribute('src', 'img/check.png');
        myLibrary[i].read = "Completed";
        break;
      case "img/check.png":
        target.setAttribute('src', 'img/power-on.png');
        myLibrary[i].read = "Not Started";
        break;
    }

    localStorage.setItem('books', JSON.stringify(myLibrary));
    location.reload();
  })
})

const removeItemButtons = document.querySelectorAll('.remove-item');
removeItemButtons.forEach(function (button, i, arr) {
  button.addEventListener('click', function (e) {
    // index button : ?
    // remove item myLibrary[i]
    // set updated myLibrary to local storage
    // reload page
    console.log("button index that is clicked: "+ i);
    myLibrary.splice(i, 1);
    localStorage.setItem('books', JSON.stringify(myLibrary));
    location.reload();
  });
})

// user input. what happen?
// 1. create new obj (done it before.)
// 2. push new obj to myLibrary array (done it before)
// 3. set new item with a key that contain myLibrary arry (inget ubah format dulu)
// 4. reload page

// what happen after load page?
// 1. condition: myLibrary is empty. so,
// 2. retrieve data from local storage
// 3. convert back to JSON, and push the value to myLibrary
// 4. display all the information in the doc.

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btnDisplayForm.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Retrieve book info
// get the item of myLibrary with the status of reading: Completed, Reading, Not Started
function getTotalBook(read) {
  const retrievedItems = myLibrary.filter(book => book.read === read);
  return retrievedItems.length;
}

const bookInfo = document.querySelector(".book-info");
bookInfo.innerHTML = `<li class="info-list" id="info-list-total-books">
Total books: ${myLibrary.length}
</li>
<li class="info-list">
  <img src="img/check.png" class="status-logo-info">
  <span class="info-value">${getTotalBook("Completed")} </span>
</li>
<li class="info-list">
  <img src="img/open-book.png" class="status-logo-info">
  <span class="info-value">${getTotalBook("Reading")} </span>
</li>
<li class="info-list">
  <img src="img/power-on.png" class="status-logo-info">
  <span class="info-value">${getTotalBook("Not Started")} </span
</li>`;