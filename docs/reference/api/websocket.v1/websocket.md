---
title: WebSocket v1
---

## リクエスト

**&#x1f6ab;このAPIは非推奨です。**

### `WebSocket wss://{可変}.api.dmdata.jp/v1/websocket`
WebSocketを通じて気象庁の発表する電文をリアルタイムに配信します。

### WebSocketプロトコル
`WebSocketProtocol jma.telegram`

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|key|はい||**String** <br/> Socket Start により取得したWebSocket接続するためのキーを指定する。|
|test|いいえ|false|**Boolean** <br/> 訓練、試験等のテストを受け取るか指定する。 <br/> **注意：XML電文以外のテスト配信は常に`false`判定になります。本文中を参照するようにしてください。**|

### その他
XML電文については圧縮して送信します。WebSocket自体は非圧縮で通信します。

WebSocket接続中に契約を終了すると、その区分の情報はそれ以降配信されなくなり、契約を再開しても新しくWebSocketを開始しない限り配信されません。

WebSocketには同時接続上限があり、それを超えての接続はできません（接続上限を拡張する契約を解除した場合、古い接続から切断されます）。

---

## レスポンス
WebSocketは初期エラー時以外はJSONを返答します。

### type: start
WebSocketは接続が成功時に次のような内容を送信します。

```
{
    "type": "start",
    "classification": [
        "telegram.weather"
    ],
    "time": "2020-01-01T00:00:00.000Z"
}
```

### type: ping
WebSocketは接続を維持するためにpingを送信します。

```
{
    "type": "ping",
    "pingId": "012345"
}
```

このデータを受け取った場合、ユーザーは次のように pong をJSONで返答しなければなりません。

```
{
    "type": "pong",
    "pingId": "012345"
}
```
※成形はしなくてよい。

返答しない場合、120秒以内に接続が終了します。

### type: data
気象庁が発表した情報を配信する場合は次のように送信します。

```
{
    "type": "data",
    "classification": "telegram.weather",
    "key": "123456789abcdef...",
    "body": "0123456789abscefghijk...",
    "data": {
    	"type": "VPWW54",
    	"author": "JPTD",
    	"time": "2020-01-01T00:00:00.000Z",
    	"test": false,
    	"xml": true,
    	"compression": "gzip",
    	"createTime": "2020-02-27T00:00:00.000Z",
    	"sendNumber": 0
    },
    "xmlData": {
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
    }
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|type|いつも|**String** <br/> データを示す "data" で固定。|
|classification|いつも|**String** <br/> 配信区分により変化。取りうる値は "telegram.earthquake", "telegram.volcano", "telegram.weather", "telegram.scheduled"。|
|key|いつも|**String** <br/> 配信データを区別するユニーク384bitハッシュ。|
|body|いつも|**String** <br/> 電文本文。バイナリまたはプレーンテキストがBase64エンコードされた文字列。|
|data|いつも|**Object** <br/> 電文ヘッダ情報。|
|data.type|いつも|**String** <br/> データ種類コード。|
|data.author|いつも|**String** <br/> 発表英字官署名。|
|data.time|いつも|**String** <br/> 基点時刻（ISO8601拡張形式）。|
|data.test|いつも|**Boolean** <br/> 訓練、試験等のテスト等電文かどうかを示す。 <br/> **注意：XML電文以外のテスト配信は常に`false`になります。本文中を参照するようにしてください。**|
|data.xml|いつも|**Boolean** <br/> XML電文かどうかを示す。|
|data.compression|いつも|**String\|Null** <br/> bodyフィールドのBase64でコードされた状態で圧縮状態を示す。圧縮時は"gzip"または"zip"、非圧縮時はnullを格納する。|
|data.createTime|いつも|**String** <br/> 気象業務支援センター電文生成時刻（ISO8601拡張形式）。|
|data.sendNumber|いつも|**Int** <br/> 気象業務支援センター付与通過番号。|
|url|いつも|**String** <br/> 電文本文があるURL。別途参照。|
|xmlData|data.xml=true時および、クエリパラメータxml=trueの時|**Object** <br/> XML電文Control,Head情報。|
|xmlData.control|いつも|**Object** <br/> XML電文Control情報。|
|xmlData.control.title|いつも|**String** <br/> 情報名称。|
|xmlData.control.dateTime|いつも|**String** <br/> 発表時刻（ISO8601拡張形式、世界協定時）。|
|xmlData.control.status|いつも|**String** <br/> 運用種別を示し、"通常"以外は利用してはならない。取りうる値は "通常", "試験", "訓練"。|
|xmlData.control.editorialOffice|いつも|**String** <br/> 編集官署名。|
|xmlData.control.publishingOffice|いつも|**String** <br/> 発表官署名。|
|xmlData.head|いつも|**Object** <br/> XML電文Head情報。|
|xmlData.head.title|いつも|**String** <br/> 情報表題。|
|xmlData.head.reportDateTime|いつも|**String** <br/> 公式な発表時刻（ISO8601拡張形式）。|
|xmlData.head.targetDateTime|いつも|**String** <br/> 基点時刻（ISO8601拡張形式）。|
|xmlData.head.targetDateTimeDubious|電文による|**String** <br/> 基点時刻のあいまいさ（頃、など）。|
|xmlData.head.targetDuration|電文による|**String** <br/> 予報期間（ISO8601継続時間形式）。|
|xmlData.head.validDateTime|電文による|**String** <br/> 本情報の失効時刻（ISO8601拡張形式）。|
|xmlData.head.eventId|いつも|**String\|Null** <br/> 電文識別情報。|
|xmlData.head.serial|いつも|**String\|Null** <br/> 電文情報番号。|
|xmlData.head.infoType|いつも|**String** <br/> 電文発表形態を示し、取りうる値は "発表", "訂正", "遅延", "取消"。|
|xmlData.head.infoKind|いつも|**String** <br/> XML電文スキーマの運用種別情報。|
|xmlData.head.infoKindVersion|いつも|**String** <br/> XML電文スキーマの運用種別情報のバージョン。|
|xmlData.head.headline|いつも|**String\|Null** <br/> 見出し文。|

#### 電文の検証
電文の検証は `body` の Base64 をデコードしたのち、SHA384でハッシュ化したものを `key` と比較検証し、一致すれば正常です。````

### type: error
APIは各種エラーを次の通り返答します。

```
{
    "type": "error",
    "error": "Server error.",
    "code": "server.end",
    "action": "close"
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|type|いつも|**String** <br/> エラーを示す "error" で固定。|
|error|いつも|**String** <br/> エラーメッセージ。|
|code|いつも|**String** <br/> エラーコード、別記参照。|
|action|いつも|**String\|Null** <br/> サーバーが動作する内容。取りうる値は null, "close" で "close" 時はWebSocketをその時点で終了します。|


|エラーコード|説明|
|:-:|:--|
|server.end|サーバー内部エラーでサーバーアプリケーションの再起動を実施する場合。|
|ping|ユーザーが Pong を送信したとき、 pingId が一致しなかった場合。|
|socket.end|ユーザーが明示的にWebSocketを終了するよう操作があった場合。|
|contract.end|ユーザーが接続中の契約区分を解約したときに、ほかに接続中の区分がない場合。|

### 初期化エラー
初期化エラーについてはJSONではなく、テキストに送信ののちWebSocketを終了します。

#### リクエストパラメータが正しくないとき
```
Missing URL query parameter "key".
```

#### 存在しない接続キーまたは有効期限切れの接続キーで接続しようとしたとき
```
URL query parameter "key" not find.
```

#### 接続しようとしているアカウントで定めた同時接続数に達しているとき
```
The maximum number of simultaneous connections is full.
```
