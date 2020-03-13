const addButton = document.getElementById('btn-add');
const cancelButton = document.getElementById('btn-cancel');
const searchForm = document.getElementById('searchForm');
const newBook = document.getElementById('newBook');
const searchButton = document.getElementById('btn-search');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const searchResult = document.getElementById('searchResult');
const bookshelf = document.getElementById('content');

let booksResult = [];
let bookElements = [];

addButton.addEventListener('click', () => {
  addButton.style.display = 'none';
  searchForm.style.display = 'block';
  newBook.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
  searchResult.style.display = 'none';
  addButton.style.display = 'inline-block';
  searchForm.style.display = 'none';
  newBook.style.display = 'inline-block';
  location.reload();
});

let apiRequest = new XMLHttpRequest();
searchForm.addEventListener('submit', $event => {
  $event.preventDefault();
  const authorInput = bookAuthor.value;
  const titleInput = bookTitle.value;
  apiRequest.open(
    'GET',
    'https://www.googleapis.com/books/v1/volumes?q=' + titleInput + authorInput
  );
  apiRequest.send();
});

apiRequest.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    const result = JSON.parse(this.responseText);
    for (let x = 0; x < result.items.length; x++) {
      let res = result.items[x];
      booksResult.push(res);
    }
    console.log(booksResult);
    for (let i = 0; i < booksResult.length; i++) {
      const currentBook = booksResult[i];
      const bookId = currentBook.id;
      const title = currentBook.volumeInfo.title;
      const author = currentBook.volumeInfo.authors;
      const url = availablePicture(currentBook);
      const book = bookFormat(bookId, title, author, url);
      bookElements.push(book);
    }
    searchResult.innerHTML += bookElements;
  }
};
function availablePicture(currentBook) {
  if (currentBook.contains(currentBook.volumeInfo.imageLink) ) {
    "css/unavailable-resized.png"} else { currentBook["volumeInfo"]["imageLinks"]["thumbnail"]}

}


function bookmarkBook(bookId) {
  const currentBook = booksResult.filter(book => book.id === bookId);
  sessionStorage.setItem(bookId,JSON.stringify( currentBook));
  alert(`${currentBook[0].volumeInfo.title} Bookmarked!`);

  sessionStorage.getItem(bookId);
  const savedTitle= currentBook[0].volumeInfo.title;
  const savedAuthor = currentBook[0].volumeInfo.authors;
  const savedUrl = currentBook[0].volumeInfo.imageLinks.thumbnail;
  const savedBook = savedBookFormat(bookId,savedTitle,savedAuthor,savedUrl);

bookshelf.innerHTML +=savedBook;


}
function savedBookFormat(bookId, savedTitle, savedAuthor, savedUrl){
  let savedBookForm=  '<div id="savedResult" >' +'<button type="button" id="trash" class="fa fa-trash" onclick="trashBook(\'' + bookId+ '\')"></button>'+
      savedTitle +'<br>'+ savedAuthor + '<br>' +
      '<img src='+savedUrl+'/>'

      +'</div>';
  return savedBookForm;
}

function trashBook(bookId) {
  sessionStorage.removeItem(bookId);
  document.getElementById("savedResult").remove();

}



function bookFormat(bookId, title, author, url) {
  let bookForm =
    '<div>' +
    '<button type="button"  id= "bookmark"class="fa fa-bookmark" onclick="bookmarkBook(\'' + bookId + '\')"></button>' +
    "<h4 id='resultTitle'>" + title + '</h4>' +
    "<h5 id='resultAuthor'>" + author + '</h5>' +
    '<img src=' +url + ' />' +
    '</div>';
  return bookForm;
}
