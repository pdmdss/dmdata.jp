---
title: Socket Start v1
---

## リクエスト

**&#x1f6ab;このAPIは非推奨です。**

### `GET https://api.dmdata.jp/socket/v1/start`
WebSocket に接続する場合、このAPIを利用してアクセスするURLを取得します。

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|key|はい||**String** <br/> APIアクセスキー。|
|get|はい||**String** <br/> WebSocketで取得する配信区分を指定。コンマで区切る。<br/> 地震・津波関連区分:　telegram.earthquake<br/> 火山関連区分: telegram.volcano<br/> 気象警報・注意報関連区分: telegram.weather<br/> 定時関連区分: telegram.scheduled|
|memo|いいえ||**String** <br/> WebSocketの接続を識別できる情報を格納できる情報を最大24byte指定できる。一意な値でなくてもよい。|

### APIアクセスキーに必要な権限
* socket.start
* telegram.get.earthquake (配信区分によっては必要)
* telegram.get.volcano (配信区分によっては必要)
* telegram.get.weather (配信区分によっては必要)
* telegram.get.scheduled (配信区分によっては必要)


### その他
WebSocket同時接続数が上限に達していてもこのAPIはエラーを返しません。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```
{
    "responseId": "124fa7a9-2162-453c-aaf3-7534528e9fda",
    "responseTime": "2020-01-01T09:00:00.000+09:00",
    "status": "ok",
    "key": "0123456789abcdef...",
    "url": "wss://ws001.api.dmdata.jp/telegram/v1/websocket?key=0123456789abcdef...",
    "protocol": [
        "jma.telegram",
    ],
    "classification": [
        "telegram.weather"
    ],
    "expiration": 300
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID。|
|responseTime|いつも|**String** <br/> API処理時刻（ISO8601拡張形式）。|
|status|いつも|**String** <br/> 成功時は "ok"、失敗時（エラー）は "error"。|
|key|いつも|**String** <br/> WebSocketに接続するためのキー。|
|url|いつも|**String** <br/> WebSocketの接続先URLでキー付き。|
|protocol|いつも|**Array[ String ]** <br/> WebSocketProtocolで配列の要素は "jma.telegram" 一つで固定。|
|classifications|いつも|***Array[ String ]** <br/> WebSocketで取得する配信区分。|
|expiration|いつも|**Int** <br/> キーの有効時間で単位は秒。値は 300 で固定。|

### status: error
APIは各種エラーを次の通り返答します。

```
{
    "responseId": "aa5f6aa2-c308-442f-be8c-9c59cbfa3414",
    "responseTime": "2020-01-01T09:00:00.000+09:00",
    "status": "error",
    "error": {
        "message": "Parameter is incorrect.",
        "code": 400
    }
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|error|いつも|**Array[ Object ]** <br/> エラー情報。|
|error.message|いつも|**String** <br/> エラーメッセージ、標準エラーおよび別表参照。|
|error.code|いつも|**Int** <br/> HTTPステータスコード。|


|エラーメッセージ|HTTPステータスコード|説明|
|:--|:-:|:--|
|Invalid resource request. [ ... ]|404|存在しない配信区分を指定された場合。|
|No contract.|412|有効な契約がない場合。|
