---
title: Telegram List v1
---

## リクエスト

**&#x1f6ab;このAPIは非推奨です。**

### `GET https://api.dmdata.jp/telegram/v1/list`
リクエストに応じた電文リストを新しい順で返します。

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|key|はい||**String** <br/> APIアクセスキー。|
|type|いいえ||**String** <br/> 電文ヘッダを指定。前方一致で検索する。|
|xml|いいえ|false|**Boolean** <br/> XML電文に出現する、/Report/Control及び/Report/Head情報を表示するか指定する。|
|test|いいえ|false|**Boolean\|String** <br/> 訓練、試験等のテスト等電文を表示するか指定する。<br/>true: テスト等電文を含む。 <br/>only: テスト等電文のみ。 <br/> **注意：XML電文以外のテスト配信は常に`false`判定になります。本文中を参照するようにしてください。**|
|newCatch|いいえ|0|**Int** <br/> レスポンス内に存在するnewCatchの値をそのまま指定することにより、それ以降の新しい電文のみを受け取る。|
|nextToken|いいえ||**String** <br/> レスポンス内に存在するnextTokenの値をそのまま指定することにより、それ以前の古い電文を受け取る。|
|limit|いいえ|100|**Int** <br/> 返す電文数を指定する。1～100までの整数を受け取る。|

### APIアクセスキーに必要な権限
* telegram.list

### その他
APIアクセスキーの権限にかかわらず、契約している区分の電文がすべて表示されます。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```
{
    "responseId": "71604ee6-8210-414a-ac87-078562ed6142",
    "responseTime": "2020-01-01T09:00:00.000+09:00",
    "status": "ok",
    "items": [
        {
            "key": "123456789abcdef...",
            "classification": "telegram.weather",
            "data": {
                "type": "VPWW54",
                "author": "JPTD",
                "time": "2020-01-01T00:00:00.000Z",
                "test": false,
                "xml": true,
                "createTime": "2020-02-27T00:00:00.000Z",
                "sendNumber": 0
            },
            "url": "https://data.api.dmdata.jp/v1/123456789abcdef...",
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
    ],
    "newCatch": 254689
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID。|
|responseTime|いつも|**String** <br/> API処理時刻（ISO8601拡張形式）。|
|status|いつも|**String** <br/> 成功時は "ok"、失敗時（エラー）は "error"。|
|items|いつも|**Array[ Object ]** <br/> 電文情報リスト。|
|items[].classification|いつも|**String** <br/> 配信区分により変化。取りうる値は "telegram.earthquake", "telegram.volcano", "telegram.weather", "telegram.scheduled"。|
|items[].key|いつも|**String** <br/> 配信データを区別するユニーク384bitハッシュ。|
|items[].data|いつも|**Object** <br/> 電文ヘッダ情報。|
|items[].data.type|いつも|**String** <br/> データ種類コード。|
|items[].data.author|いつも|**String** <br/> 発表英字官署名。|
|items[].data.time|いつも|**String** <br/> 基点時刻（ISO8601拡張形式）。|
|items[].data.test|いつも|**Boolean** <br/> 訓練、試験等のテスト等電文かどうかを示す。 <br/> **注意：XML電文以外のテスト配信は常に`false`になります。本文中を参照するようにしてください。**|
|items[].data.xml|いつも|**Boolean** <br/> XML電文かどうかを示す。|
|items[].data.createTime|いつも|**String** <br/> 気象業務支援センター電文生成時刻（ISO8601拡張形式）。|
|items[].data.sendNumber|いつも|**Int** <br/> 気象業務支援センター付与通過番号。|
|items[].url|いつも|**String** <br/> 電文本文があるURL。別途参照。|
|items[].xmlData|items[].data.xml=true時および、クエリパラメータxml=trueの時|**Object** <br/> XML電文Control,Head情報。|
|items[].xmlData.control|いつも|**Object** <br/> XML電文Control情報。|
|items[].xmlData.control.title|いつも|**String** <br/> 情報名称。|
|items[].xmlData.control.dateTime|いつも|**String** <br/> 発表時刻（ISO8601拡張形式、世界協定時）。|
|items[].xmlData.control.status|いつも|**String** <br/> 運用種別を示し、"通常"以外は利用してはならない。取りうる値は "通常", "試験", "訓練"。|
|items[].xmlData.control.editorialOffice|いつも|**String** <br/> 編集官署名。|
|items[].xmlData.control.publishingOffice|いつも|**String** <br/> 発表官署名。|
|items[].xmlData.head|いつも|**Object** <br/> XML電文Head情報。|
|items[].xmlData.head.title|いつも|**String** <br/> 情報表題。|
|items[].xmlData.head.reportDateTime|いつも|**String** <br/> 公式な発表時刻（ISO8601拡張形式）。|
|items[].xmlData.head.targetDateTime|いつも|**String** <br/> 基点時刻（ISO8601拡張形式）。|
|items[].xmlData.head.targetDateTimeDubious|電文による|**String** <br/> 基点時刻のあいまいさ（頃、など）。|
|items[].xmlData.head.targetDuration|電文による|**String** <br/> 予報期間（ISO8601継続時間形式）。|
|items[].xmlData.head.validDateTime|電文による|**String** <br/> 本情報の失効時刻（ISO8601拡張形式）。|
|items[].xmlData.head.eventId|いつも|**String\|Null** <br/> 電文識別情報。|
|items[].xmlData.head.serial|いつも|**String\|Null** <br/> 電文情報番号。|
|items[].xmlData.head.infoType|いつも|**String** <br/> 電文発表形態を示し、取りうる値は "発表", "訂正", "遅延", "取消"。|
|items[].xmlData.head.infoKind|いつも|**String** <br/> XML電文スキーマの運用種別情報。|
|items[].xmlData.head.infoKindVersion|いつも|**String** <br/> XML電文スキーマの運用種別情報のバージョン。|
|items[].xmlData.head.headline|いつも|**String\|Null** <br/> 見出し文。|
|newCatch|いつも|**Int** <br/> クエリパラメーターにこの値を入れると取得した情報より新しい情報を表示。|

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
|error.message|いつも|**String** <br/> エラーメッセージ、標準エラー参照。|
|error.code|いつも|**Int** <br/> HTTPステータスコード。|
