---
title: Archive List v2
---

## リクエスト

`GET https://api.dmdata.jp/v2/archive`

リクエストに応じたアーカイブファイルリストを新しい順で返します。

### クエリパラメータ

| パラメータ名         | 必須  | デフォルト | 説明                                                                                                                                                    |
|:---------------|:---:|:-----:|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| classification | いいえ |       | **String** <br/> 配信区分(API名)を指定<br/>カンマで区切り、複数の配信区分を指定できる                                                                                              |
| datetime       | いいえ |       | **String** <br/> 日時による絞り込みを行う。<br/> 形式は、`2021-05-01~2021-06-01` のようにし、`~`で日付の範囲を区切る <br/> 左辺を開始日とし、右辺を終了日<br/> 検索の対象はアーカイブ作成対象日となり、左辺または右辺どちらかがなくてもよい |
| cursorToken    | いいえ |       | **String** <br/> 次のリソースを取得する。レスポンス内のnextTokenの値を指定する<br/>詳しくは[こちら](/docs/reference/api/v2/index.md#カーソルトークン)                                          |
| limit          | いいえ |  20   | **Integer** <br/> 返す電文数を指定する。最大は100                                                                                                                   |

### APIに必要な権限
* archive.list

### その他

緊急地震速報関連、電文形式データを1日毎（前日分を00時30分頃までに処理を目途）に集計し、配信区分ごと（JSON化データもまとめて1つのファイル） `.tar.gz` でアーカイブ化したファイルを配布しています。
1日の間に1つもデータが配信されてない配信区分は、アーカイブファイルの生成がされません。

不定期のメンテナンスやシステム不具合等により、アーカイブ処理が遅延する場合があります。

契約中の配信区分のみ利用できます。

---

## レスポンス
APIは常にJSONを返答します。

### status: ok
成功時に次のような内容を返答します。

```json
{
  "responseId": "8359288359fc5bb9",
  "responseTime": "2024-04-01T00:00:00.000Z",
  "status": "ok",
  "items": [
    {
      "serial": "0",
      "id": "123456789abcdef...",
      "classification": "telegram.weather",
      "date": "2023-04-01",
      "dataCount": 596,
      "fileSize": 1525510,
      "url": "https://data.api.dmdata.jp/v1/archive/123456789abcdef..."
    }
  ],
  "nextToken": "bmV4dCAgICAgICAgNTc0MzI"
}
```

| フィールド                  |  出現   | 説明                                                                                  |
|:-----------------------|:-----:|:------------------------------------------------------------------------------------|
| responseId             |  いつも  | **String** <br/> API処理ID                                                            |
| responseTime           |  いつも  | **String** <br/> API処理時刻（ISO8601拡張形式）                                               |
| status                 |  いつも  | **String** <br/> 成功時は `ok`、失敗時（エラー）は `error`                                        |
| items                  |  いつも  | **Array&lt;Object&gt;** <br/> アーカイブファイルリスト                                          |
| items[].serial         |  いつも  | **Integer\|String&lt;Integer&gt;** <br/> アーカイブファイル生成通番                              |
| items[].id             |  いつも  | **String** <br/> アーカイブファイルを区別するユニークID                                               |
| items[].classification |  いつも  | **String** <br/> アーカイブ対象の配信区分                                                       |
| items[].date           |  いつも  | **String** <br/> アーカイブ対象の日付                                                         |
| items[].dataCount      |  いつも  | **String** <br/> アーカイブ対象となった電文数                                                     |
| items[].fileSize       |  いつも  | **String** <br/> アーカイブ圧縮後のファイルサイズ                                                   |
| items[].url            |  いつも  | **String** <br/> [アーカイブファイルダウンロードURL](/docs/reference/api/v1/archive.data.md)       |
| nextToken              | 場合による | **String** <br/> 次のリソースがある場合に出現。詳しくは[こちら](/docs/reference/api/v2/index.md#カーソルトークン) |

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

標準エラー以外に以下のエラーを出力します。

| ステータスコード | エラーメッセージ                                                         | 説明                            |
|:--------:|:-----------------------------------------------------------------|:------------------------------|
|   400    | You have entered a string that is not defined in \`formatMode\`. | formatModeにrawかjson以外が指定されている |
