---
slug: /reference/api/v2/
title: API v2
---

## APIの呼び出し

WebSocketAPI以外の全てのAPIは、承認情報（APIキー又は、[OAuth2](/docs/reference/oauth2/v1)のアクセストークン）を指定する必要があります。
決済情報の取得や、アカウント情報、契約情報の更新等にはOAuth2のアクセストークンが必要です。

APIキーは[コントロールパネル](https://manager.dmdata.jp/control/credentials)から、発行ができます。

各種APIにはそれぞれ権限（スコープ）が必要となります。
APIキー、及びOAuth2にそれぞれ紐づけられた権限が不足している場合、APIはエラーを返します。

APIキーの権限等の変更は最大5分間反映されません。

### APIキーの指定の仕方

#### リクエストヘッダー
リクエストヘッダーにAuthorizationを使用します。

`Authorization: Basic BasicBase64`

BasicBase64には、UserにAPIキーを、Passwordは無しとして使用します。

BasicはUserとPasswordをコロンで結合しBase64でエンコードしたもです。

#### クエリパラメータ
または、URLにクエリパラメータとして渡します。**※非推奨**

`https://api.dmdata.jp/v2/telegram?key=APIキー`

### アクセストークンの指定の仕方
リクエストヘッダーにAuthorizationを使用します。

`Authorization: Bearer アクセストークン`

---

## URLパラメータ

APIはリソースを明確に指定する方法として、URLにIDなどを指定してリソースを取得・更新・削除するものがあります。

### 例
リソースID: 2500 <br/>
リファレンス上のURL: `https://api.dmdata.jp/v2/apikey/:id` <br/>

とした場合、下記のようにURLを作成します。

`https://api.dmdata.jp/v2/apikey/2500`


---

## カーソルトークン
このAPIでは、1回のレスポンスで返しきれない情報があり、その場合レスポンス内に`nextToken`を含めます。この`nextToken`を同じエンドポイントにクエリパラメータ`cursorToken`に指定すると、続きの情報がレスポンスされます。

また、Telegram List v2 や、JmaFile List v2 ではPuLLで取得する際の通信量、処理量削減のため、レスポンス内の`nextPooling`を、次回のクエリパラメータ`cursorToken`に指定してください。

これらの`nextToken`、`nextPooling`には次のリソース参照情報が含まれていますが、API検索クエリパラメータなどの情報は含まれないため、他のAPI検索クエリパラメータを指定していた場合、`cursorToken`を使用する際にも前回と同様にAPI検索クエリパラメータを指定してください。


### 例
電文リストの続きを取得したい場合
※承認情報は省略

**1回目 リクエスト** <br/>
`https://api.dmdata.jp/v2/telegram?type=VXSE53`

**レスポンス**
```json
{
    "responseId": "66d23c0cede77d82",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "ok",
    "items": [{},{},{}],
    "nextToken": "AAAAAA0000", 
    "nextPooling": "....."
}
```

**2回目 リクエスト** <br/>
`https://api.dmdata.jp/v2/telegram?type=VXSE53&cursorToken=AAAAAA0000`

とする。

---

## 標準エラー
APIは標準的なエラーを次の通り返答します。

```json
{
    "responseId": "66d23c0cede77d82",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "error",
    "error": {
        "message": "Authentication required.",
        "code": 401
    }
}
```

| フィールド         | 出現  | 説明                             |
|:--------------|:---:|:-------------------------------|
| error         | いつも | **Object** <br/> エラー情報。        |
| error.message | いつも | **String** <br/> エラーメッセージ      |
| error.code    | いつも | **Integer** <br/> HTTPステータスコード |


| ステータスコード | エラーメッセージ                                          | 説明                              |
|:--------:|:--------------------------------------------------|:--------------------------------|
|   400    | The query parameters are required.                | 必須なクエリパラメータのフィールドがない            |
|   400    | The post parameters are required.                 | 必須なポストパラメータ(from post)のフィールドがない |
|   400    | Unexpected data  of search query \`cursorToken\`. | 無効なcursorTokenが指定された            |
|   401    | Authorization required.                           | 承認情報が指定されていない、または無効な認証情報        |
|   403    | Insufficient scope for ... .                      | 承認情報に紐づけされたスコープ外、権限がない          |
|   403    | Requests are not allowed.                         | 許可されていない場所(IP,Domain)でのAPI呼び出し  |

---

## 型表現
このリファレンス上で登場する型表現は以下の通りとします。

* **String** - 文字列 
* **Integer** - 整数 
* **Float** - 浮動小数点数
* **Boolean** - 真偽値
* **Array&lt;型&gt;** - 配列 &lt;&gt;内は配列に配置される方を表現する
* **Object** - 連想配列
* **Null** - Null
* **ISO8601Time** - String型で時刻を表現するISO8601拡張形式とする。タイムゾーンは世界協定時か日本標準時を使用
* **String&lt;型&gt;** - String型だが、内容は&lt;&gt;内に指定された型を使用

なおAPIのレスポンス内に登場する、現在 **Integer** となっている `id` または `serial` について将来 **Integer** から **String&lt;Integer&gt;** に変更となる可能性があります。

### クエリパラメータ、URLパラメータ

クエリパラメータ、URLパラメータはすべてString型ですが、値の表現としてどの型が有効か示すため、String型以外の方もこのリファレンス上では使用します。

## レートリミット

このAPIではレートリミットが設定されており、制限を超えるリクエストがされた場合、APIはHTTPステータスコード `429` を返答します。

制限は、以下の通りです。

| リソース          | リクエスト上限 | バースト |
|---------------|---------|------|
| Telegram Data | 20req/s | 20   |
| WebSocket     | 10req/s | 10   |
| そのほか　         | 10req/s | 20   |

この制限はIPごとに適用されます。

また、定常的に 2req/s 以上のアクセスは、お控えください。

## リソース

### Contract

* [**Contract List**](/docs/reference/api/v2/contract.list.md)

### Socket

* [**Socket List**](/docs/reference/api/v2/socket.list.md)
* [**Socket Start**](/docs/reference/api/v2/socket.start.md)
* [**Socket Close**](/docs/reference/api/v2/socket.close.md)

### Telegram

* [**Telegram List**](/docs/reference/api/v2/telegram.list.md)
* [**Telegram Data**](/docs/reference/api/v1/telegram.data.md)

### JmaFile

* [**JmaFile List**](/docs/reference/api/v2/jmafile.list.md)
* [**JmaFile Data**](/docs/reference/api/v1/jmafile.data.md)

### WebSocket

* [**WebSocket**](/docs/reference/api/v2/websocket.md)

### Parameter

* [**Parameter Earthquake**](/docs/reference/api/v2/parameter.earthquake.md)
* [**Parameter Realtime**](/docs/reference/api/v2/parameter.realtime.md)
* [**Parameter Tsunami**](/docs/reference/api/v2/parameter.tsunami.md)

### GD Earthquake

* [**GD Earthquake List**](/docs/reference/api/v2/gd.earthquake.list.md)
* [**GD Earthquake Event**](/docs/reference/api/v2/gd.earthquake.event.md)
