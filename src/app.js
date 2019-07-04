const isbn = document.getElementById("isbn");
const bookList = document.getElementById("bookList");
const main = document.getElementsByTagName("main")[0];
let books = [];

// 本の検索
document.getElementById("search").addEventListener("click", () => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.value}`).then(response => {
    if(response.ok) {
      response.json().then(book => {
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

// 検索結果の表示
const showBook = book => {
  // id="result"要素をmain要素に追加
  if (document.getElementById("result")) {
    document.getElementById("result").textContent = null;
  }
  const result = getElement("div");
  result.setAttribute("id", "result");
  main.appendChild(result);
  // 検索結果がない場合の処理
  if (book.totalItems === 0) {
    const p = document.createElement("p");
    appendText(p, "本が見つかりませんでした。");
    result.appendChild(p);
  }
  // 検索結果がある場合の処理
  else {
    const bookDetail = book.items[0].volumeInfo;
    const linkedAuthors = createAuthors(bookDetail.authors);
    const tagList = ["h2", "div", "div", "button"];
    const description = bookDetail.description !== undefined ? bookDetail.description : "";
    const texts = [`${bookDetail.title}`, `${linkedAuthors}`, `${description}`, "追加"];
    let element = null;
    for (let [index, tag] of tagList.entries()) {
      element = document.createElement(tag);
      appendText(element, texts[index]);
      if (tag === "button") {
        element.setAttribute("type", "button");
        element.setAttribute("id", "addBook");
      }
      result.appendChild(element);
    }
    document.getElementById("addBook").addEventListener("click", () => {
      addBook(book.items[0].volumeInfo)
    });
  }
};

// 本の追加
const addBook = book => {
  console.log(book);
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
};

// 追加した本の表示
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

// 本の削除
const deleteBook = element => {
  let index = element.target.id.replace("delete", "");
  books.splice(index, 1);
  showBookList();
};

// 著者を一列表記で返す
const createAuthors = authors => {
  let linkedAuthors = "";
  for (let author of authors) {
    linkedAuthors += author + " ";
  }
  return linkedAuthors;
};

// 要素にテキストを追加する
const appendText = (element, text) => {
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
};
