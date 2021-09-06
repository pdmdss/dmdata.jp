---
title: Socket Start v2
---

## リクエスト

`POST https://api.dmdata.jp/v2/socket`

[**WebSocket v2**](/reference/api/v2/websocket) に接続する場合、このAPIを利用してアクセスするURLを取得します。

### リクエストボディ(JSON)
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|classifications|はい||**Array<String\>** <br/> WebSocketで取得する配信区分を指定。<br/> 地震・津波関連区分:　telegram.earthquake<br/> 火山関連区分: telegram.volcano<br/> 気象警報・注意報関連区分: telegram.weather<br/> 定時関連区分: telegram.scheduled|
|types|いいえ||**Array<String\>** <br/> 取得したい[データ種類コード](/telegrams/#配信データのリスト)を指定。最大30個まで指定可能|
|test|いいえ|no|**String** <br/> テスト電文を受け取るか指定。受け取る場合は including にする。<br/>**注意：XML電文以外のテスト配信は no 時も配信されます。本文中を参照するようにしてください。**|
|appName|いいえ||**String** <br/> アプリケーション名を指定。最大24バイトまで|
|formatMode|いいえ|raw|**String** <br/> データフォーマットの指定。生電文: raw、JSON化データ: json|

例：
```json
{
  "classifications": [
    "telegram.earthquake",
    "telegram.weather"
  ],
  "types": [
    "VXSE51",
    "VXSE52",
    "VXSE53",
    "VPWW54"
  ],
  "test": "no",
  "appName": "Application Test"
}
```

### APIに必要な権限
* socket.start
* eew.get.forecast (配信区分によっては必要)
* eew.get.warning (配信区分によっては必要)
* telegram.get.earthquake (配信区分によっては必要)
* telegram.get.volcano (配信区分によっては必要)
* telegram.get.weather (配信区分によっては必要)
* telegram.get.scheduled (配信区分によっては必要)

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```json
{
    "responseId": "83c36173ceaf9e44",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "ok",
    "ticket": "Tit....",
    "websocket": {
        "id": 0,
        "url": "wss://ws003.api.dmdata.jp/v2/websocket?ticket=Tit....",
        "protocol": [
            "dmdata.v2"
        ],
        "expiration": 300
    },
    "classifications": [
        "telegram.weather",
        "telegram.earthquake"
    ],
    "test": "no",
    "types": [
        "VXSE51",
        "VXSE52",
        "VXSE53",
        "VPWW54"
    ],
    "formats": [
        "xml",
        "a/n",
        "binary"
    ],
    "appName": "Application Test"
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID|
|responseTime|いつも|**ISO8601Time** <br/> API処理時刻|
|status|いつも|**String** <br/> 成功時は "ok"、失敗時（エラー）は "error"|
|ticket|いつも|**String** <br/> WebSocketに接続するためのticket|
|websocket|いつも|**Object** <br/> WebSocketへの接続情報|
|websocket.id|いつも|**Integer** <br/> WebSocketID|
|websocket.url|いつも|**String** <br/> WebSocketの接続先URLでticket付き|
|websocket.protocol|いつも|**Array<String\>** <br/> WebSocketのProtocolで配列の要素は dmdata.v2 一つで固定|
|websocket.expiration|いつも|**Integer** <br/> キーの有効時間で単位は秒。値は 300 で固定|
|classifications|いつも|**Array<String\>** <br/> WebSocketで受け取る配信区分|
|test|いつも|**String** <br/> including の時のみ、XML電文のテストをWebsocketで受け取る|
|types|いつも|**Array<String\>\|Null** <br/> WebSocketで受け取るデータ種類コードリスト。Null時は受け取る配信区分の全部を受け取る|
|formats|いつも|**Array<String\>** <br/> WebSocketで受け取る情報フォーマット|
|appName|いつも|**String\|Null** <br/> リクエストで指定したアプリ名|

### status: error
APIは各種エラーを次の通り返答します。

```json
{
    "responseId": "66d23c0cede77d82",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "error",
    "error": {
        "message": "The body of the request is not json.",
        "code": 400
    }
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|error|いつも|**Object** <br/> エラー情報。|
|error.message|いつも|**String** <br/> エラーメッセージ、標準エラーおよび別表参照|
|error.code|いつも|**Integer** <br/> HTTPステータスコード|

標準エラー以外に以下のエラーを出力します。

|ステータスコード|エラーメッセージ|説明|
|:--:|:-|:--|
|400|The body of the request is not json.|リクエストボディにJSON形式のデータがない|
|400|At least one element of \`classifications\` is required.|配信区分が指定されていない|
|400|The \`types\` is not a string or has more than 30 elements.|データ種類コードに不正な文字列があるか、30個以上指定されている|
|400|The \`appName\` is up to 24 bytes.|appNameに文字列でないか、24バイト以上の文字列が入力されている|
|400|You have entered a string that is not defined in \`formatMode\`.|formatModeにrawかjson以外が指定されている|
|402|No contract.|有効な契約がない|
|409|The maximum number of simultaneous connections is full.|アカウントの有効な接続数に達して新たにWebSocketに接続できない|
