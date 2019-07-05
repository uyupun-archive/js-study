# 書籍管理アプリの作成
さて, ４章は実践編ということで簡単な書籍管理アプリを作ってみよう.

書籍管理アプリでは,
- 書籍をISBNで検索する機能
- 書籍を本棚に追加する機能
- 書籍を本棚から削除する機能

の主に3つを実装する.

※ISBNとは書籍を一意に識別するためのコードである.  
10桁と13桁のコードが存在する.  
ISBNは基本的に書籍の裏面に書かれている.

# ファイルとディレクトリの作成
まずは必要なファイルとディレクトリを作成する.
構成は以下の通りである.

```
bookshelf
├ app.js
└ index.html
```

# 下準備
まず, index.htmlから記述する.  

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>書籍管理アプリ</title>
  </head>
  <body>
    <main>
      <input type="text" id="isbn" placeholder="isbn">
      <button type="button" id="search">検索</button>
      <div id="result"></div>
      <ul id="bookshelf"></ul>
    </main>
    <script src="./app.js"></script>
  </body>
</html>
```

ISBNを入力するテキストボックス, 書籍を検索するボタン, 検索結果を表示するdiv要素, 書籍を追加するul要素を記述する.  
また, app.jsを読み込むためにscript要素を記述する.

次にapp.jsが読み込めているかどうかを確認する.  
以下のコードをapp.jsに記述する.

```js
console.log("hello, world!");
```

デベロッパーツールのConsoleを開く.  
ブラウザがChromeの場合, WindowsはF12キーを押すことでデベロッパーツールが開く.  
Macはoptionキー, commandキー, iキーを同時に押すことでデベロッパーツールが開く.

以下の画像の様に, Console内に`hello, world!`と表示されていれば, app.jsが読み込めている.

<img src="../img/04_js_practice/001.png" width="300">

# Web APIを叩く
WebAPIとは、簡潔に言うと、ネットワーク(HTTP)越しに利用できる関数である.  
URLが関数名を指し、引数を渡すことで結果を取得したり更新したりすることができる.  
WebAPIの呼び出し方(HTTPメソッド)には複数の種類がある.

|メソッド名|説明|
|:--|:--|
|GET|リソースの取得.|
|POST|子リソースの作成, リソースへのデータ追加, その他処理.|

その他にも, PUTやPATCH, DELETEなどがある.

今回作成する書籍管理アプリでは, Googleが提供している[Google Books APIs](https://developers.google.com/books/)を使用する.
使用するためには, HTTP通信をする必要がある.  
Webブラウザ上でHTTP通信するために, Fetch APIを使用する.

Fetch APIはHTTP通信を行いリソースを取得するためのAPIである.  
Fetch APIを使用することで, ページ全体を再読み込みすることなく指定したURLからデータを取得することができる.  
Fetch APIはHTTP通信を扱うXMLHttpRequestと似たAPIだが, より強力で柔軟な操作が可能である.  

実際にFetch APIを使用し, 書籍(レスポンス)を取得する.  

```js
const isbn = "479737702X";
fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).then(response => {
  if(response.ok) {
    response.json().then(book => {
      console.log(book)
    });
  } else {
    console.log("サーバーエラーです。");
  }
}).catch(error => {
    console.log("ネットワークエラーです。");
});
```

`fetch`メソッドを使用し, HTTPリクエストを送信する.  
送信したリクエストにレスポンスが返却されると, `then`コールバックが呼び出される.  
リクエストが成功したかどうかは, `ok`プロパティを使用する.  
`ok`プロパティは, HTTPステータスコードが200番台であれば`true`を返し、400や500番台であれば`false`を返す.  
`json`メソッドは, HTTPレスポンスをJSONとしてパースする.  
HTTP通信にはエラーがつきものである.  
`catch`メソッドを使用し, エラーをハンドリングする.

# 進化させよう

今回は簡単な書籍管理アプリを作ってきたが、このアプリには足りていない機能が多くある.  
例えば,
- 同じ書籍を何度も追加できる(バリデーション)
- ISBNのフォーマットに合っていなくても検索できる(バリデーション)
- リロードすると消えてしまう(localStorageを使ったりサーバサイドを書く)

余裕のある方は是非試してみてほしい.
