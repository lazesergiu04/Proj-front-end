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
      const ISBN = availableISBN(currentBook);
      const description = limitedDescription(currentBook);
      const title = currentBook.volumeInfo.title;
      const author = availableTitle(currentBook);
      const url =  availablePicture(currentBook);
      const book = bookFormat(bookId, title, author, url, description, ISBN);
      bookElements.push(book);


    }
    searchResult.innerHTML += bookElements;
  }
};
function availableISBN(currentBook) {
  let ISBNs;
  if (currentBook.volumeInfo.industryIdenfiers){
    ISBNs = currentBook.volumeInfo.industryIdenfiers[0].identifier
  }else { ISBNs = "ISBN not available"}
  return ISBNs;

}

function availableTitle(currentBook) {
  let authors ;
  if (currentBook.volumeInfo.authors){
    authors = currentBook.volumeInfo.authors[0]
  } else { authors = "Anonymous author"}
return authors;
}


 function limitedDescription(currentBook) {
  let desc;
  if( currentBook.volumeInfo.description){
    desc = currentBook.volumeInfo.description.slice(0,200) +"..."
  }
  else { desc="Missing Information"}
  return desc;
}




function availablePicture(currentBook) {
 let imageLinks;
  if (currentBook.volumeInfo.imageLinks )
  {imageLinks = currentBook.volumeInfo.imageLinks.thumbnail

  }else {imageLinks = "css/unavailable-resized.png"}
  return imageLinks;

}


function bookmarkBook(bookId) {
  const currentBook = booksResult.filter(book => book.id === bookId);
  sessionStorage.setItem(bookId,JSON.stringify( currentBook));
  alert(`${currentBook[0].volumeInfo.title} Bookmarked!`);

  sessionStorage.getItem(bookId);

  const savedDescription = currentBook[0].volumeInfo.description;
  const savedTitle= currentBook[0].volumeInfo.title;
  const savedAuthor = currentBook[0].volumeInfo.authors;
  const savedUrl = currentBook[0].volumeInfo.imageLinks.thumbnail;
  const savedBook = savedBookFormat(bookId,savedTitle,savedAuthor,savedUrl, savedDescription);

bookshelf.innerHTML +=savedBook;


}
function savedBookFormat(bookId, savedTitle, savedAuthor, savedUrl, savedDescription){
  let savedBookForm=  '<div id="savedResult" >' +'<button type="button" id="trash" class="fa fa-trash" onclick="trashBook(\'' + bookId+ '\')"></button>'+"<br>"+
      savedTitle +'<br>'+ savedAuthor + '<br>' +
      '<img src='+savedUrl+'/>' + '<p>' +savedDescription+ '...'+'</p>' + '<br>'

      +'</div>';
  return savedBookForm;
}



function trashBook(bookId) {
  sessionStorage.removeItem(bookId);
  document.getElementById("savedResult").remove();

}



function bookFormat(bookId, title, author, url, description,ISBN) {
  let bookForm =
    '<div id="bookResult">' +
    '<button type="button"  id= "bookmark"class="fa fa-bookmark" onclick="bookmarkBook(\'' + bookId + '\')"></button>' +
    "<h4 id='resultTitle'>" + title + '</h4>' +
    "<h5 id='resultAuthor'>" + author + '</h5>' +
    '<img src=' +url + ' />' +
      '<p>'+description+'</p>'+ '<br>'+'<h5>'+'ISBN:' +ISBN+'</h5>'+
    '</div>';
  return bookForm;
}
