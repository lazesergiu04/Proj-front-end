
const addButton = document.getElementById("btn-add");
const  cancelButton= document.getElementById("btn-cancel");
const searchForm = document.getElementById("searchForm");
const  newBook = document.getElementById("newBook");
const searchButton=  document.getElementById("btn-search");
const bookTitle= document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const searchResult = document.getElementById("searchResult");
const bookmark = document.getElementById("bookmark");
const  bookshelf =document.getElementById("content");
const resultTitle =document.getElementById("resultTitle");
const resultAuthor = document.getElementById("resultAuthor");
const resultImg = document.getElementById("resultImg");
const resultBook = document.getElementById("resultBook");


console.log(bookmark.innerText);

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
        const myObj = JSON.parse(this.responseText);
        for ( let i=0; i< myObj.items.length; i++) {
            let title= myObj.items[i]["volumeInfo"]["title"];
            let author =myObj.items[i]["volumeInfo"]["authors"][0];
            let url = myObj.items[i]["volumeInfo"]["imageLinks"]["thumbnail"];
      searchResult.innerHTML += "<div id='resultBook'>" +
            "<h4 id='resultTitle'>"+title+"</h4>"+
           "<h5 id='resultAuthor'>"+ author+"</h5>"+
           "<img src="+url+">" +"<button type='button' class='fa fa-bookmark' id='bookmark' style=\"display:none\"></button>"
            +"</div>";
        }




    }
};



searchForm.addEventListener('submit', ($event) => {
    $event.preventDefault();
    const authorInput = bookAuthor.value;
    const  titleInput= bookTitle.value;
    apiRequest.open('GET', "https://www.googleapis.com/books/v1/volumes?q=" +titleInput + authorInput );
    apiRequest.send();
});



function saveBook() {




}












































