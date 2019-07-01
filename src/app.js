const isbn = document.getElementById("isbn");

document.getElementById("search").addEventListener("click", () => {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn.value}`).then(response => {
    if(response.ok) {
      response.json().then(book => {
        console.log(book);
      })
    }
    else {
      console.error("サーバーエラー")
    }
  }).catch(error => {
    console.error("ネットワークエラー")
  });
});
