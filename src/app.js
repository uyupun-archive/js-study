const books = [];

// 書籍の検索
const searchBook = () => {
  const isbn = document.getElementById("isbn");
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.value}`).then(response => {
    if(response.ok) {
      response.json().then(book => {
        showSearchResult(book.items[0].volumeInfo);
      });
    } else {
      console.error("Server Error!")
    }
  }).catch(error => {
    console.error("Network Error!")
  });
};

// 検索結果の表示
const showSearchResult = book => {
  let result = document.getElementById("result");
  result.textContent = null;

  if (book.totalItems === 0) {
    result.appendChild(document.createElement("p")).appendChild(document.createTextNode("本が見つかりませんでした。"));
  } else {
    const title = book.title;
    const authors = book.authors.join(", ");
    const description = "description" in book ? book.description : "";

    result.appendChild(document.createElement("h2")).appendChild(document.createTextNode(title));
    result.appendChild(document.createElement("div")).appendChild(document.createTextNode(`著者: ${authors}`));
    result.appendChild(document.createElement("div")).appendChild(document.createTextNode(description));

    const button = makeButton("add-book", "追加");
    result.appendChild(button);

    document.getElementById("add-book").addEventListener("click", () => addBook(book));
  }
};

// 本棚の表示
const showBookshelf = () => {
  const bookshelf = document.getElementById("bookshelf");
  bookshelf.textContent = null;
  for (let [i, book] of books.entries()) {
    const li = document.createElement("li");
    const button = makeButton(`delete-book-${i}`, "削除");

    const tmp = bookshelf.appendChild(li);
    tmp.appendChild(document.createTextNode(`${book.title}: ${book.authors}`));
    tmp.appendChild(button);

    document.getElementById(`delete-book-${i}`).addEventListener("click", () => deleteBook(i));
  }
};

// 本の追加
const addBook = book => {
  books.push({ title: book.title, authors: book.authors.join(", ") });
  showBookshelf();
};

// 本の削除
const deleteBook = i => {
  books.splice(i + 1, 1);
  showBookshelf();
};

// ボタンの作成
const makeButton = (id, text) => {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", id);
  button.appendChild(document.createTextNode(text));
  return button;
};

document.getElementById("search").addEventListener("click", searchBook);
