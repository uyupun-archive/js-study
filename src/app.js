const isbn = document.getElementById("isbn");
const result = document.getElementById("result");
const bookList = document.getElementById("bookList");
let books = [];

document.getElementById("search").addEventListener("click", () => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.value}`).then(response => {
    if(response.ok) {
      response.json().then(book => {
        showBook(book);
        addBook(book.items[0].volumeInfo);
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

const addBook = (book) => {
  document.getElementById("addBook").addEventListener("click", () => {
    for (let item of books) {
      if (book.title === item.title) return;
    }
    let linkedAuthors = "";
    for (let author of book.authors) {
      linkedAuthors += author + " ";
    }
    const bookList = {
      "title": book.title,
      "author": linkedAuthors
    };
    books.push(bookList);
    showBookList();
  });
};

const showBookList = () => {
  bookList.innerHTML = "";
  if (books.length === 0) return;
  for (let [index, book] of books.entries()) {
    bookList.innerHTML += `<hr>` +
      `<ul>` +
      `<li>${book.title}</li>` +
      `<li>${book.author}</li>` +
      `<li><button type="button" id="delete${index}">削除</button></li>` +
      `</ul>`;
  }
  bookList.innerHTML += `<hr>`;
  for (let [index, book] of books.entries()) {
    document.getElementById(`delete${index}`).addEventListener("click", deleteBook);
  }
};

const deleteBook = (element) => {
  let index = element.target.id.replace("delete", "");
  books.splice(index, 1);
  showBookList();
};
