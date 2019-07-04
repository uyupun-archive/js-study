const isbn = document.getElementById("isbn");
const main = document.getElementsByTagName("main")[0];
let books = [];

// 本の検索
const searchBook = () => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.value}`).then(response => {
    if(response.ok) {
      response.json().then(book => {
        showBook(book.items[0].volumeInfo);
      });
    } else {
      console.error("サーバーエラー")
    }
  }).catch(error => {
    console.error("ネットワークエラー")
  });
};

// 検索結果の表示
const showBook = book => {
  let result = document.getElementById("result");

  if (book.totalItems === 0) {
    result.appendChild(document.createElement("p")).appendChild(document.createTextNode("本が見つかりませんでした。"));
  } else {
    const title = book.title;
    const authors = book.authors.join(", ");
    const description = "description" in book ? book.description : "";

    result.appendChild(document.createElement("h2")).appendChild(document.createTextNode(title));
    result.appendChild(document.createElement("div")).appendChild(document.createTextNode(`著者: ${authors}`));
    result.appendChild(document.createElement("div")).appendChild(document.createTextNode(description));

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", "add-book");
    result.appendChild(button).appendChild(document.createTextNode("追加"));

    document.getElementById("add-book").addEventListener("click", () => addBook(book));
  }
};

// 本の追加
const addBook = book => {
  books.push({ title: book.title, authors: book.authors.join(", ") });
  showBookshelf();
};

// 本棚の表示
const showBookshelf = () => {
  const bookshelf = document.getElementById("bookshelf");
  bookshelf.textContent = null;
  for (let [i, book] of books.entries()) {
    const li = document.createElement("li");

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", `delete-book-${i}`);

    const tmp = bookshelf.appendChild(li);
    tmp.appendChild(document.createTextNode(`${book.title}: ${book.authors}`));
    tmp.appendChild(button).appendChild(document.createTextNode("削除"));

    document.getElementById(`delete-book-${i}`).addEventListener("click", () => deleteBook(i));
  }
};

// 本の削除
const deleteBook = i => {
  books.splice(i + 1, 1);
  showBookshelf();
};

document.getElementById("search").addEventListener("click", searchBook);
