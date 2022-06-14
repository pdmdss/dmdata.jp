---
title: GD Earthquake Event
---

## リクエスト

`GET https://api.dmdata.jp/v2/gd/earthquake/:eventId`

地震情報のリスト。

### URLパラメータ
|パラメータ名|デフォルト|説明|
|:--|:-:|:-|
|:eventId||**string** <br/> 地震情報のEventIDを指定|

### APIに必要な権限
* gd.earthquake

### APIの情報

このAPIでは、震度速報、震源に関する情報、震源・震度に関する情報、遠地地震に関する情報、顕著な地震の震源要素更新のお知らせの電文を統合して提供しています。

テスト電文はこのAPIでは扱いません。

また、対象となるEventIDの地震情報の電文一覧では、JSON化データの情報を返答します。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```json
{
  "responseId": "3750ccf70651e928",
  "responseTime": "2021-04-01T00:00:00.000Z",
  "status": "ok",
  "event": {
    "id": 1584,
    "eventId": "20210808085414",
    "originTime": "2021-08-08T08:54:00+09:00",
    "arrivalTime": "2021-08-08T08:54:00+09:00",
    "hypocenter": {
      "code": "787",
      "name": "鹿児島湾",
      "coordinate": {
        "latitude": {
          "text": "31.3˚N",
          "value": "31.3000"
        },
        "longitude": {
          "text": "130.6˚E",
          "value": "130.6000"
        },
        "height": {
          "type": "高さ",
          "unit": "m",
          "value": "0"
        },
        "geodeticSystem": "日本測地系"
      },
      "depth": {
        "type": "深さ",
        "unit": "km",
        "value": "0",
        "condition": "ごく浅い"
      }
    },
    "magnitude": {
      "type": "マグニチュード",
      "unit": "Mj",
      "value": "2.6"
    },
    "maxInt": "2",
    "telegrams": [
      {
        "serial": 0,
        "id": "...",
        "classification": "telegram.earthquake",
        "head": {
          "type": "VXSE53",
          "author": "RJTD",
          "time": "2021-08-07T23:58:00.000Z",
          "designation": null,
          "test": false
        },
        "receivedTime": "2021-08-07T23:58:10.311Z",
        "xmlReport": {
          "head": {
            "title": "震源・震度情報",
            "serial": "1",
            "eventId": "20210808085414",
            "headline": "　８日０８時５４分ころ、地震がありました。",
            "infoKind": "地震情報",
            "infoType": "発表",
            "reportDateTime": "2021-08-08T08:58:00+09:00",
            "targetDateTime": "2021-08-08T08:58:00+09:00",
            "infoKindVersion": "1.0_1"
          },
          "control": {
            "title": "震源・震度に関する情報",
            "status": "通常",
            "dateTime": "2021-08-07T23:58:08Z",
            "editorialOffice": "気象庁本庁",
            "publishingOffice": "気象庁"
          }
        },
        "schema": {
          "type": "earthquake-information",
          "version": "1.0.0"
        },
        "format": "json",
        "url": "https://data.api.dmdata.jp/v1/..."
      }
    ]
  }
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID|
|responseTime|いつも|**ISO8601Time** <br/> API処理時刻|
|status|いつも|**String** <br/> 成功時は `ok`、失敗時（エラー）は `error`|
|event|いつも|**Object** <br/> 地震情報の要素と電文情報|
|event.id|いつも|**Integer** <br/> ID|
|event.eventId|いつも|**String** <br/> 地震情報のEventID|
|event.originTime|震度速報のみの場合は出現しない|**ISO8601Time** <br/> 地震発生時刻|
|event.arrivalTime|いつも|**ISO8601Time** <br/> 地震検知時刻|
|event.hypocenter|震度速報のみの場合は出現しない|**Object** <br/> 震源要素 [Earthquake component / Hypocenter](/docs/reference/conversion/json/component.md#3-hypocenter)を参照|
|event.magnitude|震度速報のみの場合は出現しない|**Object** <br/> マグニチュード要素 [Earthquake component / Magnitude](/docs/reference/conversion/json/component.md#4-magnitude)を参照|
|event.maxInt|いつも|**String\|Null** <br/> 最大震度、観測した震度がない場合は**Null**とする|
|event.telegrams|いつも|**Array<Object\>** <br/> 地震情報の電文リスト|
|event.telegrams[\].serial|いつも|**Integer** <br/> 電文受信通番|
|event.telegrams[\].id|いつも|**String** <br/> 配信データを区別するユニーク384bitハッシュ|
|event.telegrams[\].classification|いつも|**String** <br/> 配信区分により変化。取りうる値は telegram.earthquake|
|event.telegrams[\].head|いつも|**Object** <br/> ヘッダ情報|
|event.telegrams[\].head.type|いつも|**String** <br/> データ種類コード|
|event.telegrams[\].head.author|いつも|**String** <br/> 発表英字官署名|
|event.telegrams[\].head.time|いつも|**ISO8601Time** <br/> 基点時刻|
|event.telegrams[\].head.designation|いつも|**String\|Null** <br/> 指示コード|
|event.telegrams[\].head.test|いつも|**Boolean** <br/> 訓練、試験等のテスト等電文かどうかを示す <br/> このAPIでは常に**false**|
|event.telegrams[\].receivedTime|いつも|**ISO8601Time** <br/> 受信時刻|
|event.telegrams[\].xmlReport|いつも|**Object** <br/> XML電文Control,Head情報|
|event.telegrams[\].schema|いつも|**Object** <br/> 加工データのスキーマ情報|
|event.telegrams[\].schema.type|いつも|**String** <br/> スキーマ名|
|event.telegrams[\].schema.version|いつも|**String** <br/> スキーマのバージョン|
|event.telegrams[\].format|いつも|**String\|Null** <br/> bodyフィールドの表現形式を示す。`xml`、`a/n`、`binary` は気象庁が定めたフォーマット、`json` は本サービスが独自に定めたフォーマット|
|event.telegrams[\].url|いつも|**String** <br/> [電文本文URL](/docs/reference/api/v1/telegram.data.md)|

## status: error
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
