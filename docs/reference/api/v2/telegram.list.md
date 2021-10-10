---
title: Telegram List v2
---

## リクエスト

`GET https://api.dmdata.jp/v2/telegram`

リクエストに応じた電文リストを新しい順で返します。

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|type|いいえ||**String** <br/> [データ種類コード](/telegrams/#配信データのリスト)を指定。1つのみの場合は前方一致で検索する<br/>カンマで区切り、複数のデータ種類コード指定できる。その場合は完全一致の必要があり最大5つまで|
|xmlReport|いいえ|false|**Boolean** <br/> XML電文に出現する、/Report/Control及び/Report/Head情報を表示するか指定する|
|test|いいえ|no|**String** <br/> 訓練、試験等のテスト等電文を表示するか指定する<br/>including: テスト等電文を含む、only: テスト等電文のみ<br/> **注意：XML電文以外のテスト配信は常に`false`判定になります。本文中を参照するようにしてください**|
|cursorToken|いいえ||**String** <br/> 次のリソースを取得する。レスポンス内のnextTokenまたはnextPoolingの値を指定する<br/>詳しくは[こちら](/reference/api/v2/#カーソルトークン)|
|formatMode|いいえ|raw|**String** <br/> データフォーマットの指定。<br/>生電文: raw、JSON化データ: json|
|limit|いいえ|20|**Integer** <br/> 返す電文数を指定する。最大は100|

### APIに必要な権限
* telegram.list

### その他
APIアクセスキーの権限にかかわらず、契約している区分の電文がすべて表示されます。

レスポンスの`nextPooling`をクエリパラメータ`cursorToken`に指定すると、前回レスポンスしたデータより新しい情報のみをレスポンスします。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```json
{
    "responseId": "8359288359fc5bb9",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "ok",
    "items": [
        {
             "serial": 0,
             "classification": "telegram.weather",
             "id": "123456789abcdef...",
             "head": {
                "type": "VPWW54",
                "author": "JPTD",
                "time": "2020-01-01T00:00:00.000Z",
                "test": false
             },
             "receivedTime": "2020-01-01T00:00:02.000Z",
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
            "url": "https://data.api.dmdata.jp/v1/123456789abcdef..."
        }
    ],
    "nextToken": "bmV4dCAgICAgICAgNTc0MzI",
    "nextPooling": "cG9sbGluZyAgICAgNzM0MzE",
    "nextPoolingInterval": 1600
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID|
|responseTime|いつも|**String** <br/> API処理時刻（ISO8601拡張形式）|
|status|いつも|**String** <br/> 成功時は `ok`、失敗時（エラー）は `error`|
|items|いつも|**Array<Object\>** <br/> 電文情報リスト|
|items[].serial|いつも|**Integer** <br/> 電文受信通番|
|items[].id|いつも|**String** <br/> 配信データを区別するユニーク384bitハッシュ|
|items[].classification|いつも|**String** <br/> 配信区分により変化。取りうる値は telegram.earthquake, telegram.volcano, telegram.weather, telegram.scheduled|
|items[].head|いつも|**Object** <br/> ヘッダ情報|
|items[].head.type|いつも|**String** <br/> データ種類コード|
|items[].head.author|いつも|**String** <br/> 発表英字官署名|
|items[].head.target|内容による※1|**String** <br/> 対象観測地点コード|
|items[].head.time|いつも|**ISO8601Time** <br/> 基点時刻|
|items[].head.designation|いつも|**String\|Null** <br/> 指示コード|
|items[].head.test|いつも|**Boolean** <br/> 訓練、試験等のテスト等電文かどうかを示す <br/> 注意：XML電文以外のテスト配信は常に **false** になります。本文中を参照するようにしてください。|
|items[].receivedTime|いつも|**ISO8601Time** <br/> 受信時刻|
|items[].xmlReport|format=xml、<br/>クリパラメータxmlReport=true時|**Object** <br/> XML電文Control,Head情報|
|items[].schema|format=json|**Object** <br/> 加工データのスキーマ情報|
|items[].schema.type|いつも|**String** <br/> スキーマ名|
|items[].schema.version|いつも|**String** <br/> スキーマのバージョン|
|items[].format|いつも|**String\|Null** <br/> bodyフィールドの表現形式を示す。`xml`、`a/n`、`binary` は気象庁が定めたフォーマット、 `json` は本サービスが独自に定めたフォーマット|
|items[].url|いつも|**String** <br/> [電文本文URL](/reference/api/v1/telegram.data)|
|nextToken|場合による|**String** <br/> 次のリソースがある場合に出現。詳しくは[こちら](/reference/api/v2/#カーソルトークン)|
|nextPooling|いつも|**String** <br/> PuLL時に使用する。詳しくは[こちら](/reference/api/v2/#カーソルトークン)|
|nextPoolingInterval|いつも|**Integer** <br/> PuLL時、次にリクエストするまでの待機すべき最小時間（ミリ秒）|

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
|400|You have entered a string that is not defined in \`formatMode\`.|formatModeにrawかjson以外が指定されている|
