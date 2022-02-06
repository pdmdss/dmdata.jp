---
title: GD Eew Event
---

## リクエスト

`GET https://api.dmdata.jp/v2/gd/eew/:eventId`

緊急地震速報のすべての報のリスト。

### URLパラメータ
|パラメータ名|デフォルト|説明|
|:--|:-:|:-|
|:eventId||**string** <br/> 緊急地震速報のEventIDを指定|

### APIに必要な権限
* gd.eew

### APIの情報

このAPIでは、リアルタイム処理に用いるのではなく事後参照としてお使いください。

テスト電文はこのAPIでは扱いません。

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
  "items": [
    {
      "id": 3,
      "eventId": "20160801170904",
      "serial": 2,
      "dateTime": "2016-08-01T17:09:19+09:00",
      "isLastInfo": true,
      "isCanceled": true,
      "text": "先ほどの、緊急地震速報（予報）を取り消します。"
    },
    {
      "id": 2,
      "eventId": "20160801170904",
      "serial": 2,
      "dateTime": "2016-08-01T17:09:14+09:00",
      "isLastInfo": false,
      "isCanceled": false,
      "isWarning": false,
      "earthquake": {
        "arrivalTime": "2016-08-01T17:09:04+09:00",
        "originTime": "2016-08-01T17:09:04+09:00",
        "hypocenter": {
          "code": "477",
          "name": "東京湾",
          "coordinate": {
            "latitude": {
              "value": "35.4000",
              "text": "35.4°N"
            },
            "longitude": {
              "value": "139.9000",
              "text": "139.9°E"
            },
            "height": {
              "type": "高さ",
              "unit": "m",
              "value": "-10000"
            },
            "geodeticSystem": "日本測地系"
          },
          "depth": {
            "type": "深さ",
            "unit": "km",
            "value": "10"
          },
          "reduce": {
            "code": "9768",
            "name": "東京湾"
          },
          "landOrSea": "海域",
          "accuracy": {
            "epicenters": [
              "1",
              "1"
            ],
            "depth": "1",
            "magnitudeCalculation": "5",
            "numberOfMagnitudeCalculation": "1"
          }
        },
        "magnitude": {
          "type": "マグニチュード",
          "unit": "Mj",
          "value": "9.2"
        }
      }
    },
    {
      "id": 1,
      "eventId": "20160801170904",
      "serial": 1,
      "dateTime": "2016-08-01T17:09:06+09:00",
      "isLastInfo": false,
      "isCanceled": false,
      "isWarning": false,
      "earthquake": {
        "arrivalTime": "2016-08-01T17:09:04+09:00",
        "hypocenter": {
          "code": "014",
          "name": "関東甲信地方",
          "coordinate": {
            "latitude": {
              "value": "35.3000",
              "text": "35.3°N"
            },
            "longitude": {
              "value": "139.9000",
              "text": "139.9°E"
            },
            "height": {
              "type": "高さ",
              "unit": "m",
              "value": "-10000"
            },
            "geodeticSystem": "日本測地系"
          },
          "depth": {
            "type": "深さ",
            "unit": "km",
            "value": "10"
          },
          "reduce": {
            "code": "9120",
            "name": "千葉県"
          },
          "accuracy": {
            "epicenters": [
              "1",
              "1"
            ],
            "depth": "1",
            "magnitudeCalculation": "8",
            "numberOfMagnitudeCalculation": "1"
          }
        },
        "magnitude": {
          "type": "マグニチュード",
          "unit": "Mj",
          "value": null,
          "condition": "Ｍ不明"
        }
      },
      "intensity": {
        "forecastMaxInt": {
          "from": "5-",
          "to": "over"
        }
      },
      "text": "１日１７時０９分０４秒頃千葉県富津市付近　　　　　最大震度５弱程度以上と推定"
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
|items[\].id|いつも|**Integer** <br/> 受信ID|
|items[\].eventId|いつも|**String** <br/> 緊急地震速報のEventID|
|items[\].serial|いつも|**Integer** <br/> EventIDに対するこの情報の情報番号|
|items[\].dateTime|いつも|**ISO6801Time** <br/> この情報を発表した時刻|
|items[\].isLastInfo|いつも|**Boolean** <br/> この情報で最終であるかどうかを示し、最終報の場合は **true** とする|
|items[\].isCanceled|いつも|**Boolean** <br/> この情報で緊急地震速報を取り消されたかどうかを示し、取消された場合は **true** とする|
|items[\].isWarning|取消時には出現しない|**Boolean** <br/> この情報発表時、緊急地震速報の警報を発表されたかどうかを示し、警報発表済みの場合は **true** とする|
|items[\].earthquake|取消時は出現しない|**Object** <br/> 予測震源要素 [Earthquake component](/reference/conversion/json/schema/eew-information.md#7-earthquake)を参照|
|items[\].intensity|取消時・震度未計算時は出現しない|**Object** <br/> 予測震度要素 [Intensity component](/reference/conversion/json/schema/eew-information.md#8-intensity)を参照|
|items[\].text|場合による|**String** <br/> フリーテキストで表現したい場合に出現し、これを記述する|

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
