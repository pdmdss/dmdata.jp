---
title: Socket List v2
---

## リクエスト

`GET https://api.dmdata.jp/v2/socket`

[**Socket Start v2**](/docs/reference/api/v2/socket.start.md) で発行したWebSocketに関するリストを取得する。

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|id|いいえ||**Integer** <br/> WebSocket IDを指定、指定された場合他のクエリパラメータは無視される|
|status|いいえ||**String** <br/> WebSocketの状態。デフォルトではすべて表示。<br/>接続待機・期限切れ: waiting、接続中: open、接続終了: closed|
|cursorToken|いいえ||**String** <br/> 次のリソースを取得する。レスポンス内のnextTokenの値を指定する<br/>詳しくは[こちら](/docs/reference/api/v2#カーソルトークン)|
|limit|いいえ|20|**Integer** <br/> アイテムの数。最大100まで|

### APIに必要な権限
* socket.list

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```json
{
    "responseId": "2c343ee3f1007df5",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "ok",
    "items": [
        {
            "id": 0,
            "ticket": null,
            "types": [
                "VPWW54",
                "VXSE51",
                "VXSE52",
                "VXSE53"
            ],
            "test": "no",
            "classifications": [
                "telegram.weather",
                "telegram.earthquake"
            ],
            "ipAddress": "192.168.0.0",
            "status": "open",
            "server": "websocket-03",
            "start": "2021-04-01T00:00:00.000Z",
            "end": null,
            "ping": "2021-04-01T00:00:00.000Z",
            "appName": null
        }
    ]
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID|
|responseTime|いつも|**ISO8601Time** <br/> API処理時刻|
|status|いつも|**String** <br/> 成功時は `ok`、失敗時（エラー）は `error`|
|items|いつも|**Array<Object\>** <br/> アイテムリスト|
|items[\].id|いつも|**Integer** <br/> WebSocket ID|
|items[\].ticket|いつも|**String** <br/> WebSocketに接続するためのticket|
|items[\].classifications|いつも|**Array<String\>** <br/> WebSocketで受け取る配信区分|
|items[\].test|いつも|**String** <br/> including の時のみ、XML電文のテストをWebsocketで受け取る|
|items[\].types|いつも|**Array<String\>\|Null** <br/> WebSocketで受け取るデータ種類コードリスト。Null時は受け取る配信区分の全部を受け取る|
|items[\].formats|いつも|**Array<String\>** <br/> WebSocketで受け取る情報フォーマット|
|items[\].appName|いつも|**String\|Null** <br/> アプリ名|
|items[\].start|いつも|**ISO8601Time** <br/> 作成時間、または接続開始時間|
|items[\].end|いつも|**ISO8601Time\|Null** <br/> 接続終了時間|
|items[\].ping|いつも|**ISO8601Time\|Null** <br/> Ping-Pongチェック時間|
|items[\].ipAddress|いつも|**String\|Null** <br/> 接続IPアドレス|
|items[\].server|いつも|**String\|Null** <br/> 接続先のWebSocketサーバー名|
|items[\].status|いつも|**String** <br/> 接続待機・期限切れ: waiting、接続中: open、接続終了: closed。|
|nextToken|状況|**String** <br/> 次のリソースがある場合に出現。詳しくは[こちら](/docs/reference/api/v2#カーソルトークン)|

### status: error
APIは各種エラーを次の通り返答します。

```json
{
    "responseId": "66d23c0cede77d82",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "error",
    "error": {
        "message": "...",
        "code": 400
    }
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|error|いつも|**Object** <br/> エラー情報。|
|error.message|いつも|**String** <br/> エラーメッセージ、標準エラーおよび別表参照。|
|error.code|いつも|**Integer** <br/> HTTPステータスコード。|

標準エラーを出力します。
