# JavaScriptとは
JavaScriptはWebブラウザをはじめとした環境で動作する言語で, サーバサイドとのデータのやり取りや画面への描画, アニメーションなどに使われている.

JavaScriptは,

- プロトタイプベースのオブジェクト指向言語
- インタプリタ型言語
- 動的型付け言語

といった特徴を持つ.

// TODO: それぞれの特徴の解説

# JavaScriptの歴史
NCSA Mosaic
Netscape Navigator 2.0 -> LiveScript
IE 3 -> JScript
Flash -> ActionScript
ECMAScript

# 仕様策定のプロセス

# Node.js
それまでJavaScriptはwebブラウザ上で動作するプログラミング言語であったが, 2009年のNode.jsの誕生によって状況は大きく変化した.  
Node.jsはサーバサイドをはじめとした環境で動作するJavaScriptで, CommonJSという仕様の実装である.  
サーバサイドのJavaScriptとしてはじまったNode.jsだが, 現在はNode.js製のクライアント用のライブラリが多く作られている.  
これらのライブラリはnpm(Node Package Manager)と呼ばれるパッケージ管理システム上で公開され(誰でも公開できる), CUI上からnpmコマンドを使ってインストールすることができる.

また, Node.jsは
- V8エンジンで動作する
- ノンブロッキングI/O 非同期I/O?
などの特徴を持ち, サーバサイドを記述するためのフレームワークとしてExpressも用意されている.

// TODO: RequireJS, AMD, ServerJS, V8

# altJS
**altJS**とは, alternative JavaScriptの略称で, JavaScriptの代替言語の総称である.  
altJSで書かれたプログラムはコンパイル(トランスパイル)することで最終的にJavaScriptのコードに変換される.  
WebブラウザはaltJSをネイティブに解釈できないため, JavaScriptに変換する必要がある.  
トランスパイラには**Babel**が使われることが多い.  
altJSには以下のような種類がある(抜粋).

// TODO: altJS -コンパイル(トランスパイル)-> JavaScript みたいな図を入れる

|言語名|特徴|
|:--|:--|
|**CoffeeScript**|Rubyライクな記法で記述でき, 簡潔さが特徴的.<br>Ruby on Railsでも公式サポートされた.<br>JavaScriptに無かった先進的な機能も盛り込まれていたが, ES6の登場によりJavaScriptとそこまで差異が無くなったため滅びてしまった.|
|**Dart**|Googleが開発し, 推進していたが結局はあまり流行せず廃れてしまった.<br>しかし近年, Flutterで採用されたこともあり, プラットフォームは違えど人気を盛り返している.|
|**JSX**|DeNAが開発した言語.<br>Reactなどで採用されている.|
|**TypeScript**|Microsoftが開発した言語で, 静的型付けが特徴的である.<br>業界的に推進されており, 今のところaltJSの中で一番ホットである.<br>|
|**Elm**|純粋関数型言語で強い静的型付けが特徴的な言語である.<br>コンパイルに成功すれば一切実行時エラーが出ないという強みがあり, 現在人気が急上昇している.|

その他にも**Haxe**や**PureScript**など様々なaltJSが存在する.

# Ajax
2000年代後半, GoogleがJavaScriptのAjax技術を使ったGoogle Mapsを発表し, これにより再びJavaScriptが見直され始める.
Ajaxは画面を遷移することなくデータをやり取りし, 描画する技術群のことを指し, UI/UX的に見てかなり良いものとされている.
また, Ajaxは XMLHttpRequest (ほんまか？Fetch APIは？) を中核とした技術群で, これはマイクロソフト社がActiveX (なにこれ) を実装し始めたのがはじまりだった.
当初は, Ajaxでやりとりするデータ構造にXMLが用いられることが多かったが, 現在ではJSONを使ってやり取りされることが多くなっている.
これらの技術については, 第n章 非同期通信 にて詳しく解説する.

// JSONについて

# ライブラリ
初期のJavaScriptはフォームの内容の加工やアニメーションを付けたりするような小規模なものにしか使われなかったが, Ajaxの登場によりJavaScriptの需要は高まり, だんだんと大規模化していった.  
2005年にprototype.js, 2010年にjQueryが登場し, 両者ともに人気を博した.  
jQueryの使用頻度も年々減ってはいるが, 未だに使われることがある.
また, jQueryはセレクタによる要素の絞り込みができる機能を備えており, それが便利だということでJavaScriptにも`querySelector`, `querySelectorAll`として実装されるなど, JavaScript自体にも影響を与えている.  
また, ユーティリティライブラリのlodashや日付ライブラリのmoment.jsなど, JavaScriptの標準関数の弱点を補うようなライブラリも多数公開されている.

# Webフレームワーク
JavaScriptが見直され, ライブラリが興隆したが, ライブラリだけでは大規模化・複雑化に耐えうるような堅牢なシステムの構築が困難になった.  
そこでWebサービスの雛形ごと提供するWebフレームワークが登場した.
Backbone.jsやAngularJSからはじまり, 現在ではVue.js, React, Angularといった３つのWebフレームワークがよく使われている.
