---
title: JmaFile Data v1
---

## リクエスト

`GET https://jmafiledata.api.dmdata.jp/v1/:id`

気象庁ファイル形式データを取得します。

### URLパラメータ

| パラメータ名 | 必須 | デフォルト | 説明                                                                            |
|:-------|:--:|:-----:|:------------------------------------------------------------------------------|
| id     | はい |       | **String** <br/> [JmaFile List v2](../v2/jmafile.list.md) items[].id に記載されたID |

### クエリパラメータ

| パラメータ名  | 必須  | デフォルト | 説明                                        |
|:--------|:---:|:-----:|:------------------------------------------|
| headers | いいえ | false | **Boolean** <br/> レスポンスに、ヘッダー情報のJSONを含めるか |

### APIに必要な権限

* jmafile.data

### その他

表示されるデータは、受信から1ヵ月以内のみとなります。

---

### レスポンス

APIはリクエストされたデータの受信バイナリ（format: concat のデータを除く）を返します。
また、レスポンスヘッダにデータの属性を含めています。

例1：

```http request
HTTP/1.1 200 OK

Date: Mon, 27 May 2024 12:19:05 GMT
Dmdata-Classification: jmafile.srf-sw
Dmdata-Filename: Z__C_RJTD_20240525083000_SRF_GPV_Ggis1km_Psw_Fper10min_FH01-06_grib2.bin
Dmdata-Format: grib2


DATA_BODY
```

例2：

```http request
HTTP/1.1 200 OK

Date: Mon, 27 May 2024 12:19:05 GMT
Dmdata-Classification: jmafile.srf-rrp
Dmdata-Compression: gzip
Dmdata-Filename: Z__C_RJTD_20240525092000_MET_INF_Pslmcs_Fper10min_FH0000-0030_shape.tar.gz
Dmdata-Format: concat
Dmdata-Headers-Length: 1111


HEADERS_JSON\n
DATA_BODY
```

| ヘッダーフィールド名            |          出現          | 　 説明                                                                                                                                           |
|:----------------------|:--------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------|
| Dmdata-Classification |         いつも          | **String** <br/> データの配信区分（API名）                                                                                                                |
| Dmdata-Compression    |        場合による         | **String** <br/> レスポンスのデータボディ(DATA_BODY)の圧縮エンコード種別で、`gzip`、`zip`がある                                                                            |
| Dmdata-Filename       |         いつも          | **String** <br/> DMADATA.JP が受信したデータのファイル名                                                                                                     |
| Dmdata-Format         |         いつも          | **String** <br/> データのフォーマット <br/>取りうる値は、`grib2`、`bufr3`、`bufr4`、`xml`、`bpf`、`shx`、`pdf`、`png`、`jpeg`、`gif`、`concat` <br/> `concat` については、下記を参照 |
| Dmdata-Headers-Length | クリパラメータheaders=true時 | **Integer** <br/> データのヘッダー情報のJSON <br/> HEADERS_JSON の文字列と改行文字のバイト数を示す <br/> `Dmdata-Compression` が設定されていてもヘッダー情報JSONについては、非圧縮となります            |

---

#### format: concat

TAR ファイル（拡張子が .tar または .tar.gz）について、DMDATA.JP が受信した後、TAR形式のデータを解析しなく済むよう以下の通りデータボディを編集しています（以下の数値・データは、1つの受信データを使用して例示しています。）

:::caution
`Dmdata-Compression: gzip` 等で、圧縮されているデータが返答されている場合は、DATA_BODY を解凍してから利用してください。
:::

:::info
展開後のファイル数は、線状降水帯シェープファイルで3個、地域気象観測報の修正報で最大99個、流域雨量指数で13個、洪水警報の危険度分布（流路）で3個となります。
:::

ヘッダー情報の各配列の要素、1個目は受信ファイルの情報、2個目以降は展開後の個々のファイルの情報となります。`length`のバイト数を抜き出し各ファイルのデータとして処理ができます。

各ファイルを分ける文字列等はありません。

![jmafile-format-concat.svg](/img/reference/jmafile-format-concat.svg)

**HEADERS_JSON を見やすいよう展開**
```json
 [
      {
            "time": "2024-05-25T09:20:00Z",
            "flags": {
                  "oflag": "C",
                  "product": "Z"
            },
            "author": "RJTD",
            "format": "concat",
            "length": 126,
            "values": [
                  "MET",
                  "INF",
                  "Pslmcs",
                  "Fper10min",
                  "FH0000-0030"
            ],
            "filename": "Z__C_RJTD_20240525092000_MET_INF_Pslmcs_Fper10min_FH0000-0030_shape.tar.gz"
      },
      {
            "time": "2024-05-25T09:20:00Z",
            "flags": {
                  "oflag": "C",
                  "product": "Z"
            },
            "author": "RJTD",
            "format": "dbf",
            "length": 226,
            "values": [
                  "MET",
                  "INF",
                  "Pslmcs",
                  "Fper10min",
                  "FH0000-0030"
            ],
            "filename": "Z__C_RJTD_20240525092000_MET_INF_Pslmcs_Fper10min_FH0000-0030_shape.dbf"
      },
      {
            "time": "2024-05-25T09:20:00Z",
            "flags": {
                  "oflag": "C",
                  "product": "Z"
            },
            "author": "RJTD",
            "format": "shp",
            "length": 100,
            "values": [
                  "MET",
                  "INF",
                  "Pslmcs",
                  "Fper10min",
                  "FH0000-0030"
            ],
            "filename": "Z__C_RJTD_20240525092000_MET_INF_Pslmcs_Fper10min_FH0000-0030_shape.shp"
      },
      {
            "time": "2024-05-25T09:20:00Z",
            "flags": {
                  "oflag": "C",
                  "product": "Z"
            },
            "author": "RJTD",
            "format": "shx",
            "length": 100,
            "values": [
                  "MET",
                  "INF",
                  "Pslmcs",
                  "Fper10min",
                  "FH0000-0030"
            ],
            "filename": "Z__C_RJTD_20240525092000_MET_INF_Pslmcs_Fper10min_FH0000-0030_shape.shx"
      }
]
```

---

#### エラー

エラーの場合、プレーンテキストを返します。

**HTTPステータスコードのエラーとの対応**
* 401 - 認証関係のエラー
* 403 - 参照できる期間外
* 404 - データが見つからない
