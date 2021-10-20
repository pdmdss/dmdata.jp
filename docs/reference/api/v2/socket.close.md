---
title: Socket Close v2
---

## リクエスト

`DELETE https://api.dmdata.jp/v2/socket/:id`

[**WebSocket v2**](/reference/api/v2/websocket.md) に接続中のWebSocketを終了します。

### URLパラメータ
|パラメータ名|デフォルト|説明|
|:--|:-:|:-|
|:id||**Integer** <br/> WebSocket IDを指定|

### APIに必要な権限
* socket.close

---

## レスポンス

### status: ok
成功時には何も返しません。

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

標準エラー以外に以下のエラーを出力します。

|ステータスコード|エラーメッセージ|説明|
|:--:|:-|:--|
|404|Socket ID not found.|指定された WebSocket ID がない|
