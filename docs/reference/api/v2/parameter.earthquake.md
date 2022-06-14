---
title: Parameter Earthquake station v2
---

## リクエスト

震度観測地点における、名前・コード・位置情報などを取得します。

`GET https://api.dmdata.jp/v2/parameter/earthquake/station`

### APIに必要な権限
* parameter.earthquake

アカウントに地震・津波関連の契約者のみ使用可能です。

### その他
データはパラメータ変更前とパラメータ変更後のデータ両方を含みます。

データの利用の際は、[こちら](/docs/parameter.md)も参照ください。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID|
|responseTime|いつも|**ISO8601Time** <br/> API処理時刻|
|status|いつも|**String** <br/> 成功時は `ok`、失敗時（エラー）は `error`|
|changeTime|いつも|**ISO8601Time** <br/> 気象庁によるパラメータ変更時刻|
|version|いつも|**String** <br/> データのバージョン|
|items|いつも|**Array<Object\>** <br/> 観測点データ|
|items[].region|いつも|**Object** <br/> 一次細分化地域|
|items[].region.code|いつも|**String** <br/> 一次細分化地域コード|
|items[].region.name|いつも|**String** <br/> 一次細分化地域名|
|items[].region.kana|いつも|**String** <br/> 一次細分化地域名（カナ）|
|items[].city|いつも|**Object** <br/> 市区町村|
|items[].city.code|いつも|**String** <br/> 市区町村コード|
|items[].city.name|いつも|**String** <br/> 市区町村名|
|items[].city.kana|いつも|**String** <br/> 市区町村名（カナ）|
|items[].noCode|いつも|**String** <br/> 観測点コード|
|items[].code|いつも|**String** <br/> 観測点コード（XML）|
|items[].name|いつも|**String** <br/> 観測点名|
|items[].kana|いつも|**String** <br/> 観測点名（カナ）|
|items[].status|いつも|**String** <br/> データの運用状態。 <br/>現: 運用中 <br/>変更: 名称、住所、位置情報の修正 <br/>新規: パラメータ変更時刻より運用開始 <br/>廃止: パラメータ変更時刻をもって運用終了|
|items[].owner|いつも|**String** <br/> 所属する機関|
|items[].latitude|いつも|**String<Float\>** <br/> 所在する緯度|
|items[].longitude|いつも|**String<Float\>** <br/> 所在する経度|

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
