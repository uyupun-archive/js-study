const isbn = document.getElementById("isbn");
const result = document.getElementById("result");

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
  if (book.totalItems === 0)
    result.innerText = "本が見つかりませんでした。";
  else
    result.innerHTML = `<h2 id="title">${book.items[0].volumeInfo.title}</h2>\n` +
      `<p id="author">${book.items[0].volumeInfo.authors[0]}</p>\n` +
      `<p id="description">${book.items[0].volumeInfo.description}</p>\n` +
      `<button type="button" id="addBook">追加</button>`
};
