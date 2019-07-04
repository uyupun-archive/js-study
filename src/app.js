const isbn = document.getElementById("isbn");
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
  let result = document.getElementById("result");
  if (!result) {
    result = document.createElement("div");
    result.setAttribute("id", "result");
    main.appendChild(result);
  }
  result.textContent = null;
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
  // id="bookList"要素がない場合はmain要素に追加
  let bookList = document.getElementById("bookList");
  if (!bookList) {
    bookList = document.createElement("div");
    bookList.setAttribute("id", "bookList");
    main.appendChild(bookList);
  }
  bookList.textContent = null;
  if (books.length === 0) return;
  const hr = document.createElement("hr");
  for (let [index, book] of books.entries()) {
    let hr = document.createElement("hr");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    bookList.appendChild(hr);
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("id", `delete${index}`);
    appendChildToParent("li", book.title, ul);
    appendChildToParent("li", book.author, ul);
    appendText(deleteBtn, "削除");
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    bookList.appendChild(ul);
    document.getElementById(`delete${index}`).addEventListener("click", () => {
      deleteBook(index);
    });
  }
  bookList.appendChild(hr);
};

// 本の削除
const deleteBook = index => {
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

// 新しく作成した要素にテキストを追加し、それを親要素に追加する
const appendChildToParent = (tag, text, parent) => {
  const child = document.createElement(tag);
  appendText(child, text);
  parent.appendChild(child);
};
