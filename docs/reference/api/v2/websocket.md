---
title: WebSocket v2
---

## リクエスト

`WebSocket wss://{可変}.api.dmdata.jp/v2/websocket`

WebSocketを通じて気象庁の発表する電文をリアルタイムに配信します。

### WebSocketプロトコル
`WebSocketProtocol dmdata.v2`

### クエリパラメータ
| パラメータ名 | 必須 | デフォルト | 説明                                                                                                             |
|:-------|:--:|:-----:|:---------------------------------------------------------------------------------------------------------------|
| ticket | はい |       | **String** <br/> [**Socket Start v2**](/docs/reference/api/v2/socket.start.md)により取得したWebSocket接続するためのチケットを指定する |

### エンドポイント情報

複数のサーバーを含エンドポイントは死活監視しており、正常なサーバーにランダムに振り分けします。
（※60秒の DNS TTL が存在するため、即座の切り替えを保証するものではありません。）

地理・冗長化を目的として、Socket Start の URL情報 を使用せず下記の エンドポイントを使用することができます。 

* **ws.api.dmdata.jp - Tokyo and Osaka** <br/> 東京・大阪のレイテンシ分配エンドポイント
  * **ws-tokyo.api.dmdata.jp - Tokyo Region** <br/> 東京エンドポイント
    * ws001.api.dmdata.jp - AWS apne1-az4
    * ws002.api.dmdata.jp - AWS apne1-az1
  * **ws-osaka.api.dmdata.jp - Osaka Region** <br/> 大阪エンドポイント
    * ws003.api.dmdata.jp - AWS apne3-az3
    * ws004.api.dmdata.jp - AWS apne3-az1

### 定期メンテナンス

WebSocketサーバーは、1ヶ月ごとに接続切断を伴うメンテナンス（サーバー再起動）を行っています。（1つずつ作業を行い、2つ以上のサーバーが同時に再起動することはありません。）

そのため、サーバーから切断された場合の処理は実装する必要があります。

サーバーのメンテナンスについての事前予告は1週間程度前をめどにお知らせします。

### その他
XML電文については圧縮（特殊気象報、生物季節観測報告気象報については非圧縮）して送信します。WebSocketは実装により圧縮/非圧縮で通信します。

WebSocket接続中に契約を終了すると、その区分の情報はそれ以降配信されなくなり、契約を再開しても新しくWebSocketを開始しない限り配信されません。

WebSocketには同時接続上限があり、それを超えての接続はできません（接続上限を拡張する契約を解除した場合、ランダムに有効接続数まで切断されます）。

ticketは使い捨てですので一度使用した場合、エラーでもそのticketはもう一度使用できません。
また、5分経過すると使えなくなります。


正常にClose処理がなされないWebSocket切断が発生するとサーバー側で切断が検知できなくなり、PingTimeoutが発生し切断処理が実行されるまで、接続数を消費します。

そのため、同時接続数に余裕がなくすぐに再接続を行いたい場合は、[**Socket Close v2**](/docs/reference/api/v2/socket.close.md)を実行するよう実装する必要があります。

:::warning
WebSocket API を利用する場合は、必ず[**Ping-Pong**](#type-ping)処理を行ってください。
さもないと数分で切断されます。
:::

---

## レスポンス
WebSocketは常にJSONを返答します。

### type: start
WebSocketは接続が成功時に Socket Start v2 で作成した内容を送信します。
　
```json
{
    "type": "start",
    "socketId": 1,
    "classifications": [
        "telegram.weather"
    ],
    "types": ["VPWW54"],
    "test": "including",
    "formats": ["xml", "a/n", "binary"],
    "appName": null,
    "time": "2020-01-01T00:00:00.000Z"
}
```

### type: ping
WebSocketは接続を維持するためにpingを送信します

```json
{
    "type": "ping",
    "pingId": "012345"
}
```

このデータを受け取った場合、ユーザーは次のように pong をJSONで返答しなければなりません。


```json
{
    "type": "pong",
    "pingId": "012345"
}
```
※成形はしなくてよい。

サーバーが送信した直近の `pingId` を使用してください。
返答しない場合、120秒以内に接続が終了します。

### type: pong
WebSocketは接続を維持するためにユーザーが送信したpingに対してpongを送信します。

※ユーザーが送信する`pingId`は64byteまでの文字列、または送信しなくてもよい。

#### 例: 1
ユーザー>>>
```json
{
    "type": "ping"
}
```

WebSocket>>>
```json
{
    "type": "pong"
}
```

#### 例: 2
ユーザー>>>
```json
{
    "type": "ping",
    "pingId": "aaaaa"
}
```

WebSocket>>>
```json
{
    "type": "pong",
    "pingId": "aaaaa"
}
```

### type: data
気象庁が発表した情報を配信する場合は次のように送信します。
バージョンは予告なく変更する場合があります。

```json
{
    "type": "data",
    "version": "2.0",
    "classification": "telegram.weather",
    "id": "123456789abcdef...",
    "passing": [
        {
            "name": "ftp-01",
            "time": "2020-01-01T00:00:00.100Z"
        },
        {
            "name": "ires-01",
            "time": "2020-01-01T00:00:00.105Z"
        },
        {
            "name": "websocket-01",
            "time": "2020-01-01T00:00:00.120Z"
        }
    ],
    "head": {
    	"type": "VPWW54",
    	"author": "JPTD",
    	"time": "2020-01-01T00:00:00.000Z",
    	"test": false,
    	"xml": true
    },
    "xmlReport": {
    	"control": {
    		"title": "気象警報・注意報（Ｈ２７）",
    		"dateTime": "2020-02-27T00:00:00Z",
    		"status": "通常",
    		"editorialOffice": "気象庁本庁",
    		"publishingOffice": "気象庁予報部"
    	},
    	"head": {
    		"title": "東京都気象警報・注意報",
    		"reportDateTime": "2020-02-27T09:00:00+09:00",
    		"targetDateTime": "2020-02-27T09:00:00+09:00",
    		"eventId": null,
    		"serial": null,
    		"infoType": "発表",
    		"infoKind": "気象警報・注意報",
    		"infoKindVersion": "1.2_1",
    		"headline": "注意報を解除します。"
    	}
    },
    "format": "xml",
    "compression": "gzip",
    "encoding": "base64",
    "body": "H4sIAAAAAAAAA..."
}
```

| フィールド            |                出現                 | 説明                                                                                                      |
|:-----------------|:---------------------------------:|:--------------------------------------------------------------------------------------------------------|
| type             |                いつも                | **String** <br/> データを示す `data` で固定                                                                      |
| version          |                いつも                | **String** <br/> バージョンを示す、作成処理の変更で予告なく変更となる場合がある                                                        |
| id               |                いつも                | **String** <br/> 配信データを区別するユニーク384bitハッシュ                                                               |
| classification   |                いつも                | **String** <br/> 配信区分により変化。                                                                             |
| passing          |                いつも                | **Array&lt;Object&gt;** <br/> 通過情報                                                                      |
| passing\[].name  |                いつも                | **String** <br/> 通過場所の名前                                                                                |
| passing\[].time  |                いつも                | **ISO8601Time** <br/> 通過した時間                                                                            |
| head             |                いつも                | **Object** <br/> ヘッダ情報                                                                                  |
| head.type        |                いつも                | **String** <br/> データ種類コード                                                                               |
| head.author      |                いつも                | **String** <br/> 発表英字官署名                                                                                |
| head.target      |              内容による※1              | **String** <br/> 対象観測地点コード                                                                              |
| head.time        |                いつも                | **String** <br/> 基点時刻（ISO8601拡張形式）                                                                      |
| head.designation |                いつも                | **String\|Null** <br/> 指定コード<br/>WMO全球通信システム(GTS)で定義されている符号で、遅延報・訂正報に付加する。通常は **Null** とする ※4           |
| head.test        |                いつも                | **Boolean** <br/> 訓練、試験等のテスト等電文かどうかを示す。 <br/> 注意：XML電文以外のテスト配信は常に **false** になります。本文中を参照するようにしてください。    |
| head.xml         |              内容による※2              | **Boolean** <br/> XML電文かどうかを示す                                                                          |
| xmlReport        | format=xml または <br/> format=json時 | **Object** <br/> XML電文Control,Head情報                                                                    |
| format           |                いつも                | **String\|Null** <br/> bodyフィールドの表現形式を示す。`xml`、`a/n`、`binary` は気象庁が定めたフォーマット、`json` は本サービスが独自に定めたフォーマット |
| compression      |                いつも                | **String\|Null** <br/> bodyフィールドの圧縮形式を示す。`gzip`または`zip`、非圧縮時はnullを格納する                                  |
| encoding         |                いつも                | **String\|Null** <br/> bodyフィールドのエンコーディング形式を示す。`base64`または、`utf-8`を格納する                                 |
| body             |                いつも                | **String** <br/> 本文                                                                                     |

※1 将来の予約拡張。 <br/>
※2 形式は format を参照すること。 <br/>
※3 compression が、gzip, zip時には常に `base64` とする。

※4 指定コードは、3桁の英大文字を使い、下の通りとする

| 内容  | 指定コード                  |
|:---:|:-----------------------|
| 遅延報 | RRA, RRB, RRC, ... RRX |
| 訂正報 | CCA, CCB, CCC, ... CCX |
| 修正報 | AAA, AAB, AAC, ... AAX |

RRY, RRZ, CCY, CCZ, AAY, AAZ は、システム障害時等でのみ使用。

### type: error
APIは各種エラーを次の通り返答します。

```json
{
    "type": "error",
    "error": "Server error.",
    "code": 4503,
    "close": true
}
```

| フィールド | 出現  | 説明                                            |
|:------|:---:|:----------------------------------------------|
| type  | いつも | **String** <br/> エラーを示す `error` で固定           |
| error | いつも | **String** <br/> エラーメッセージ                     |
| code  | いつも | **Integer** <br/> エラーコード、別記参照                 |
| close | いつも | **Boolean** <br/> true 時はWebSocketをその時点で終了します |


| エラーコード | 説明                                    |
|:------:|:--------------------------------------|
|  4400  | WebSocket開始時、必要なパラメータが指定されていない場合      |
|  4404  | WebSocket開始時、有効なticketが指定されていない場合     |
|  4409  | WebSocket開始時、接続できる接続数に達している場合         |
|  4503  | サーバー内部エラーでサーバーアプリケーションの再起動を実施する場合     |
|  4640  | ユーザーが Pong を送信したとき、 pingId が一致しなかった場合 ||
|  4641  | ユーザーが不正なデータを送信した場合（JSON以外など）          |
|  4808  | ユーザーが明示的にWebSocketを終了するよう操作があった場合     |
|  4807  | ユーザーが接続中の契約区分を解約したときに、ほかに接続中の区分がない場合  |
|  4891  | Pingチェックタイムアウト                        |
