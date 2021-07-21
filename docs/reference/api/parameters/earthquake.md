---
title: Parameters Earthquake station v1
---

## リクエスト

**&#x1f6ab;このAPIは非推奨です。**

### `GET https://api.dmdata.jp/parameters/v1/earthquake/station.json`
震度観測地点における、名前・コード・位置情報などを取得できます。

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|key|はい||**String** <br/> APIアクセスキー。|

### APIアクセスキーに必要な権限
* parameter.earthquake

アカウントに地震・津波関連の契約者のみ使用可能です。

### その他
データはパラメータ変更前とパラメータ変更後のデータ両方を含みます。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
|フィールド|出現|説明|
|:--|:-:|:--|
|responseId|いつも|**String** <br/> API処理ID。|
|responseTime|いつも|**String** <br/> API処理時刻（ISO8601拡張形式）。|
|status|いつも|**String** <br/> 成功時は "ok"、失敗時（エラー）は "error"。|
|changeTime|いつも|**String** <br/> 気象庁によるパラメータ変更時刻（ISO8601拡張形式）。|
|version|いつも|**String** <br/> データのバージョン。|
|items|いつも|**Array[ Object ]** <br/> 観測点データ。|
|items[].region|いつも|**Object** <br/> 一次細分化地域。|
|items[].region.code|いつも|**String** <br/> 一次細分化地域コード。|
|items[].region.name|いつも|**String** <br/> 一次細分化地域名。|
|items[].region.kana|いつも|**String** <br/> 一次細分化地域名（カナ）。|
|items[].city|いつも|**Object** <br/> 市区町村。|
|items[].city.code|いつも|**String** <br/> 市区町村コード。|
|items[].city.name|いつも|**String** <br/> 市区町村名。|
|items[].city.kana|いつも|**String** <br/> 市区町村名（カナ）。|
|items[].noCode|いつも|**String** <br/> 観測点コード。|
|items[].code|いつも|**String** <br/> 観測点コード（XML）。|
|items[].name|いつも|**String** <br/> 観測点名。|
|items[].kana|いつも|**String** <br/> 観測点名（カナ）。|
|items[].status|いつも|**String** <br/> データの運用状態。 <br/>現: 運用中 <br/>変更: 名称、住所、位置情報の修正 <br/>新規: パラメータ変更時刻より運用開始 <br/>廃止: パラメータ変更時刻をもって運用終了|
|items[].owner|いつも|**String** <br/> 所属する機関。|
|items[].latitude|いつも|**Float ** <br/> 所在する緯度。|
|items[].longitude|いつも|**Float ** <br/> 所在する経度。|

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
|error.code|いつも|**String** <br/> HTTPステータスコード。|


|エラーメッセージ|HTTPステータスコード|説明|
|:--|:-:|:--|
|You have no authority.|403|アカウントごとに付与する権限がない場合。|
|Not data.|404|データが存在しない場合。|

