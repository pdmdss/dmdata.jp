---
title: JmaFile List v2
---

## リクエスト

`GET https://api.dmdata.jp/v2/jmafile`

リクエストに応じたファイル形式データのリストを新しい順で返します。

### クエリパラメータ

| パラメータ名      | 必須  | デフォルト | 説明                                                                                                                                                                             |
|:------------|:---:|:-----:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| type        | いいえ |       | **String** <br/> [データ識別名](/docs/jmafile/index.mdx#配信データのリスト)を指定。1つのみの場合は前方一致で検索する<br/>カンマで区切り、複数のデータ識別名を指定できる。その場合は完全一致の必要があり最大5つまで                                            |
| datetime    | いいえ |       | **String** <br/> 日時による絞り込みを行う。<br/> 形式は、`2021-05-01T00:00:00~2021-06-01T00:00:00` のようにし、`~`で日付の範囲を区切る <br/> 左辺を開始日時とし、右辺を終了日時（その時刻を含まない）<br/> 検索の対象は受信時刻となり、左辺または右辺どちらかがなくてもよい |
| cursorToken | いいえ |       | **String** <br/> 次のリソースを取得する。レスポンス内のnextTokenまたはnextPoolingの値を指定する<br/>詳しくは[こちら](/docs/reference/api/v2/index.md#カーソルトークン)                                                     |
| limit       | いいえ |  20   | **Integer** <br/> 返す電文数を指定する。最大は100                                                                                                                                            |

### APIに必要な権限

* jmafile.list

### その他

レスポンスの`nextPooling`をクエリパラメータ`cursorToken`に指定すると、前回レスポンスしたデータより新しい情報のみをレスポンスします。

表示されるデータは、受信から1ヵ月以内のみとなります。

---

## レスポンス

APIは常にJSONを返答します。

### status: ok

成功時に次のような内容を返答します。

```json
{
  "responseId": "69c559f6d7a8396a",
  "responseTime": "2024-05-26T08:44:05.218Z",
  "status": "ok",
  "items": [
    {
      "serial": "10",
      "id": "abcABC0123-_...",
      "classification": "jmafile.rdr-nc5min",
      "headers": [
        {
          "time": "2024-05-25T08:35:00Z",
          "flags": {
            "product": "Z",
            "oflag": "C"
          },
          "author": "RJTD",
          "format": "grib2",
          "length": 43683,
          "values": [
            "RDR",
            "GPV",
            "Ggis1km",
            "Phhlv",
            "Aper5min",
            "ANAL"
          ],
          "filename": "Z__C_RJTD_20240525083500_RDR_GPV_Ggis1km_Phhlv_Aper5min_ANAL_grib2.bin.gz"
        }
      ],
      "receivedTime": "2024-05-25T08:35:22.451Z",
      "format": "grib2",
      "compression": "gzip",
      "url": "https://jmafiledata.api.dmdata.jp/v1/abcABC0123-_..."
    }
  ],
  "nextToken": "bmV4dCAgICAgICAgNTc0MzI",
  "nextPooling": "cG9sbGluZyAgICAgNzM0MzE",
  "nextPoolingInterval": 1600
}
```

| フィールド                                     |  出現   | 説明                                                                                                                                                                                              |
|:------------------------------------------|:-----:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| responseId                                |  いつも  | **String** <br/> API処理ID                                                                                                                                                                        |
| responseTime                              |  いつも  | **String** <br/> API処理時刻（ISO8601拡張形式）                                                                                                                                                           |
| status                                    |  いつも  | **String** <br/> 成功時は `ok`、失敗時（エラー）は `error`                                                                                                                                                    |
| items                                     |  いつも  | **Array&lt;Object&gt;** <br/> ファイル形式データリスト                                                                                                                                                      |
| items[].serial                            |  いつも  | **String&lt;Integer&gt;** <br/> ファイル形式データ受信通番                                                                                                                                                   |
| items[].id                                |  いつも  | **String** <br/> データを区別するSHA512のハッシュBASE64URLエンコードID                                                                                                                                            |
| items[].classification                    |  いつも  | **String** <br/> 配信区分（API名）                                                                                                                                                                     |
| items[].headers                           |  いつも  | **Object** <br/> ヘッダ情報 <br/> format が `concat` の場合、親ファイルのほか子データのヘッダも入る（要素が2個以上）                                                                                                                 |
| items[].headers[].time                    |  いつも  | **ISO8601Time** <br/> データの内容の代表的な時刻                                                                                                                                                             |
| items[].headers[].flags                   |  いつも  | **Object** <br/> 発表英字官署名                                                                                                                                                                        |
| items[].headers[].flags.product           |  いつも  | **String** <br/> 作成プロダクトモード、`Z` のみが入る<br/> `Z`: ローカル情報識別子                                                                                                                                       |
| items[].headers[].flags.productidentifier | 場合による | **String** <br/> データ属性を表すが、現在のところ使用していない                                                                                                                                                        |
| items[].headers[].flags.oflag             |  いつも  | **String** <br/> 発信元識別で、`headers[].author`のコード種別を示す、取りうる値は`C`、`J`<br/> `C`: WMO 英字発信官署名 `J`: 気象庁作成の英字発信官署名                                                                                      |
| items[].headers[].author                  |  いつも  | **String** <br/> 英字発信官署名                                                                                                                                                                        |
| items[].headers[].format                  |  いつも  | **String** <br/> データのフォーマット <br/>取りうる値は、`grib2`、`bufr3`、`bufr4`、`xml`、`bpf`、`shx`、`pdf`、`png`、`jpeg`、`gif`、`concat`                                                                             |
| items[].headers[].length                  |  いつも  | **Integer** <br/> データのサイズ                                                                                                                                                                       |
| items[].headers[].values                  |  いつも  | **Array&lt;String&gt;** <br/> 受信データの属性値（[データ識別名](/docs/jmafile/index.mdx#配信データのリスト)を`_`で分割した配列）                                                                                                 |
| items[].headers[].filename                |  いつも  | **String** <br/> 受信ファイル名                                                                                                                                                                        |
| items[].receivedTime                      |  いつも  | **ISO8601Time** <br/> 受信時刻                                                                                                                                                                      |
| items[].format                            |  いつも  | **String** <br/> データのフォーマット（`headers[0].format` とおなじ） <br/>取りうる値は、`grib2`、`bufr3`、`bufr4`、`xml`、`bpf`、`shx`、`pdf`、`png`、`jpeg`、`gif`、`concat` <br/> `concat` については、`.tar` 形式のファイルを、データ本体を連結したもの |
| items[].compression                       |  いつも  | **String\|Null** <br/> データの圧縮形式 <br/> 取りうる値は、`gzip`、`zip`、**Null**                                                                                                                              | 
| items[].url                               |  いつも  | **String** <br/> [データURL](/docs/reference/api/v1/jmafile.data.md)                                                                                                                               |
| nextToken                                 | 場合による | **String** <br/> 次のリソースがある場合に出現。詳しくは[こちら](/docs/reference/api/v2/index.md#カーソルトークン)                                                                                                             |
| nextPooling                               |  いつも  | **String** <br/> PuLL時に使用する。詳しくは[こちら](/docs/reference/api/v2/index.md#カーソルトークン)                                                                                                                 |
| nextPoolingInterval                       |  いつも  | **Integer** <br/> PuLL時、次にリクエストするまでの待機すべき最小時間（ミリ秒）                                                                                                                                              |

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
