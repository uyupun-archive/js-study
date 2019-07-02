const isbn = document.getElementById("isbn");
const result = document.getElementById("result");
const bookList = document.getElementById("bookList");
let books = [];

document.getElementById("search").addEventListener("click", () => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.value}`).then(response => {
    if(response.ok) {
      response.json().then(book => {
        console.log(book);
        showBook(book);
      })
    }
    else {
      console.error("サーバーエラー")
    }
  }).catch(error => {
    console.error("ネットワークエラー")
  });
});

const showBook = (book) => {
  if (book.totalItems === 0) {
    result.innerText = "本が見つかりませんでした。";
  }
  else {
    const bookDetail = book.items[0].volumeInfo;
    let authors = book.items[0].volumeInfo.authors;
    let linkedAuthors = "";
    for (let author of authors) {
      linkedAuthors += author + " ";
    }
    result.innerHTML = `<h2 id="title">${bookDetail.title}</h2>` +
      `<p id="author">${linkedAuthors}</p>` +
      `<p id="description">${(bookDetail.description !== undefined ? bookDetail.description : "")}</p>` +
      `<button type="button" id="addBook">追加</button>`
  }
};
