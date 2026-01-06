---
title: Parameter Realtime station v2
---

## リクエスト

リアルタイム震度観測点における、名前・コード・位置情報などを取得します。

`GET https://api.dmdata.jp/v2/parameter/realtime/station`

### APIに必要な権限
* parameter.realtime

アカウントに緊急地震（リアルタイム震度）の契約者のみ使用可能です。

### 注意
ソフトウエアの起動時、または数日おきになどのみリクエストをお願いします。

### その他
データはパラメータ変更前とパラメータ変更後のデータ両方を含みます。

データの利用の際は、[こちら](/docs/parameter.md)も参照ください。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
| フィールド               | 出現  | 説明                                                                                         |
|:--------------------|:---:|:-------------------------------------------------------------------------------------------|
| responseId          | いつも | **String** <br/> API処理ID                                                                   |
| responseTime        | いつも | **ISO8601Time** <br/> API処理時刻                                                              |
| status              | いつも | **String** <br/> 成功時は `ok`、失敗時（エラー）は `error`                                               |
| changeTime          | いつも | **ISO8601Time** <br/> 気象庁によるパラメータ変更時刻                                                      |
| version             | いつも | **String** <br/> データのバージョン                                                                 |
| items               | いつも | **Array&lt;Object&gt;** <br/> 観測点データ                                                       |
| items[].region      | いつも | **Object** <br/> 一次細分化地域                                                                   |
| items[].region.code | いつも | **String** <br/> 一次細分化地域コード                                                                |
| items[].region.name | いつも | **String** <br/> 一次細分化地域名                                                                  |
| items[].code        | いつも | **String** <br/> 観測点コード（XML）                                                               |
| items[].name        | いつも | **String** <br/> 観測点名                                                                      |
| items[].status      | いつも | **String** <br/> データの運用状態。 <br/>現: 運用中 <br/>新規: パラメータ変更時刻より運用開始 <br/>廃止: パラメータ変更時刻をもって運用終了 |
| items[].owner       | いつも | **String** <br/> 所属する機関                                                                    |
| items[].latitude    | いつも | **String&lt;Float&gt;** <br/> 所在する緯度                                                       |
| items[].longitude   | いつも | **String&lt;Float&gt;** <br/> 所在する経度                                                       |

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

| フィールド         | 出現  | 説明                                      |
|:--------------|:---:|:----------------------------------------|
| error         | いつも | **Object** <br/> エラー情報。                 |
| error.message | いつも | **String** <br/> エラーメッセージ、標準エラーおよび別表参照。 |
| error.code    | いつも | **Integer** <br/> HTTPステータスコード。         |

標準エラーを出力します。
