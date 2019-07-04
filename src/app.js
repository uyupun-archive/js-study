const books = [];

// 書籍の検索
const searchBook = () => {
  const isbn = document.getElementById("isbn");
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.value}`).then(response => {
    if(response.ok) {
      response.json().then(book => {
        if ("items" in book)  showSuccessResult(book.items[0].volumeInfo);
        else                  showErrorResult("該当する書籍が見つかりませんでした。");
      });
    } else {
      showErrorResult("サーバーエラーです。");
    }
  }).catch(error => {
    showErrorResult("ネットワークエラーです。");
  });
};

// 検索結果の表示
const showSuccessResult = book => {
  let result = document.getElementById("result");
  result.textContent = null;

  const title = book.title;
  const authors = book.authors.join(", ");
  const description = "description" in book ? book.description : "";
  const button = makeButton("add-book", "追加");

  result.appendChild(document.createElement("h2")).appendChild(document.createTextNode(title));
  result.appendChild(document.createElement("div")).appendChild(document.createTextNode(`著者: ${authors}`));
  result.appendChild(document.createElement("div")).appendChild(document.createTextNode(description));
  result.appendChild(button);

  document.getElementById("add-book").addEventListener("click", () => addBook(book));
};

// エラーメッセージの表示
const showErrorResult = text => {
  let result = document.getElementById("result");
  result.textContent = null;
  result.appendChild(document.createElement("p")).appendChild(document.createTextNode(text));
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

// 書籍の追加
const addBook = book => {
  books.push({ title: book.title, authors: book.authors.join(", ") });
  showBookshelf();
};

// 書籍の削除
const deleteBook = i => {
  books.splice(i, 1);
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
