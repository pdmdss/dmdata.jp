---
title: GD Earthquake List
---

## リクエスト

`GET https://api.dmdata.jp/v2/gd/earthquake`

地震情報のリスト。

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|hypocenter|いいえ||**String** <br/> 検索する震央地名コードの3桁の数字|
|maxInt|いいえ||**String** <br/> 検索する最大震度の下限|
|date|いいえ||**String** <br/> 検索する地震波検知時刻の日付、時刻は無効|
|limit|いいえ|20|**Integer** <br/> 返す情報数を指定する。最大は100|

### APIに必要な権限
* gd.earthquake

### APIの情報

このAPIでは、震度速報、震源に関する情報、震源・震度に関する情報、遠地地震に関する情報、顕著な地震の震源要素更新のお知らせの電文を統合して提供しています。

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
      "maxInt": "2"
    }
  ],
  "nextToken": "bmV4dCAgICAgICAgMTU2NA",
  "nextPooling": "cG9sbGluZyAgICAgMTkzNQ",
  "nextPoolingInterval": 2000
}
```

|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID|
|responseTime|いつも|**ISO8601Time** <br/> API処理時刻|
|status|いつも|**String** <br/> 成功時は "ok"、失敗時（エラー）は "error"|
|items|いつも|**Array<Object\>** <br/> アイテムリスト|
|items[\].id|いつも|**Integer** <br/> ID|
|items[\].eventId|いつも|**String** <br/> 地震情報のEventID|
|items[\].originTime|震度速報のみの場合は出現しない|**ISO8601Time** <br/> 地震発生時刻|
|items[\].arrivalTime|いつも|**ISO8601Time** <br/> 地震検知時刻|
|items[\].hypocenter|震度速報のみの場合は出現しない|**Object** <br/> 震源要素 [Earthquake component / Hypocenter](https://dmdata.jp/doc/reference/conversion/json/component#3-hypocenter)を参照|
|items[\].magnitude|震度速報のみの場合は出現しない|**Object** <br/> マグニチュード要素 [Earthquake component / Magnitude](https://dmdata.jp/doc/reference/conversion/json/component#4-magnitude)を参照|
|items[\].maxInt|いつも|**String\|Null** <br/> 最大震度、観測した震度がない場合は**Null**とする|
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

標準エラーを出力します。
