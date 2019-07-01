// TODO: JSとはなにか, ECMAScript, Node.js, AltJS

# JavaScriptとは

# JavaScriptの歴史
LiveScript, JScript, ブラウザ互換, ActionScript(Flush), ECMAScript(標準化)

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

// TODO: RequireJS, AMD, ServerJS

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

# ライブラリ
prototype.js(滅びた), jQuery(滅びた), moment.js, lodash

# フレームワーク
Backbone(滅びた), Angular, Vue, Nuxt, React
