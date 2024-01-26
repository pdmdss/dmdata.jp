---
title: Contract List v2
---

## リクエスト

`GET https://api.dmdata.jp/v2/contract`

契約中、未契約の情報リスト。

### APIに必要な権限
* contract.list

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```json
{
    "responseId": "2c343ee3f1007df5",
    "responseTime": "2021-04-01T00:00:00.000Z",
    "status": "ok",
    "items": [
        {
            "id": 92,
            "planId": 1,
            "planName": "地震・津波関連",
            "classification": "telegram.earthquake",
            "price": {
                "day": 15,
                "month": 350
            },
            "start": "2021-01-01T01:01:00.000Z",
            "isValid": true,
            "connectionCounts": 1
        }
    ]
}
```

| フィールド                     | 出現  | 説明                                           |
|:--------------------------|:---:|:---------------------------------------------|
| responseId                | いつも | **String** <br/> API処理ID                     |
| responseTime              | いつも | **ISO8601Time** <br/> API処理時刻                |
| status                    | いつも | **String** <br/> 成功時は `ok`、失敗時（エラー）は `error` |
| items                     | いつも | **Array&lt;Object&gt;** <br/> アイテムリスト        |
| items[\].id               | いつも | **Integer\|Null** <br/> 契約ID                 |
| items[\].planId           | いつも | **Integer** <br/> プランID                      |
| items[\].planName         | いつも | **String** <br/> プラン名                        |
| items[\].classifications  | いつも | **String** <br/> 受け取れる配信区分                   |
| items[\].price            | いつも | **Object** <br/> 価格                          |
| items[\].price.day        | いつも | **Integer** <br/> 1日当たりの価格（円）                |
| items[\].price.month      | いつも | **Integer** <br/> 月当たり最大の価格（円）               |
| items[\].start            | いつも | **ISO8601Time\|Null** <br/> 契約開始日時           |
| items[\].isValid          | いつも | **Boolean** <br/> 有効かどうか示す。**true** なら有効     |
| items[\].connectionCounts | いつも | **Integer** <br/> この契約でWebSocketに接続できる数が増える量 |

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
