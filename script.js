
const addButton = document.getElementById("btn-add");
const  cancelButton= document.getElementById("btn-cancel");
const searchForm = document.getElementById("searchForm");
const  newBook = document.getElementById("newBook");
const searchButton=  document.getElementById("btn-search");
const bookTitle= document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const searchResult = document.getElementById("searchResult");
const  bookshelf =document.getElementById("content");
const icon = document.createElement("div");

const bookmark = document.getElementById("bookmark");
let booksResult =[];
let test =[];





addButton.addEventListener('click',  () =>{
    addButton.style.display ="none";
   searchForm.style.display ="inline-block";
   newBook.style.display= "none";


})

cancelButton.addEventListener("click", ()=>{

    searchResult.style.display = "none";
    addButton.style.display = "inline-block";
    searchForm.style.display ="none";
    newBook.style.display ="inline-block";
    location.reload();


})

let apiRequest = new XMLHttpRequest();

apiRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        const result = JSON.parse(this.responseText);
        for (let x= 0; x < result.items.length; x++){
            booksResult.push(result.items[x])
        }
        console.log(booksResult);

        console.log(bookElements())

    }
}
    function bookElements() {
        for (let i = 0; i < booksResult.length; i++) {
            let title = booksResult[i]["volumeInfo"]["title"];
            let author = booksResult[i]["volumeInfo"]["authors"];
            let url = booksResult[i]["volumeInfo"]["imageLinks"]["thumbnail"];
            let book ={title,author,url}

        }


        }

    function bookFormat(title,author, url){
        let bookForm= "<div id='resultBook'>" +
         "<h4 id='resultTitle'>"+title+"</h4>"+
         "<h5 id='resultAuthor'>"+ author+"</h5>"+
         "<img src="+url+">" +
         "</div>"
     return bookForm;
 }


 searchForm.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const authorInput = bookAuthor.value;
    const  titleInput= bookTitle.value;
    apiRequest.open('GET', "https://www.googleapis.com/books/v1/volumes?q=" +titleInput + authorInput );
    apiRequest.send();
})




























































