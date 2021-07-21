---
title: Telegram Data v1
---

## リクエスト

### `GET https://data.api.dmdata.jp/v1/{telegramKey}`
電文を区別するユニーク384bitハッシュを指定して電文本文を取得します。

### パスパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|telegramKey|はい||**String** <br/> 電文を区別するユニーク384bitハッシュ。|

### クエリパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|key|はい||**String** <br/> APIアクセスキー。|

### APIアクセスキーに必要な権限
* telegram.data
* telegram.get.earthquake (取得情報によっては必要)
* telegram.get.volcano (取得情報によっては必要)
* telegram.get.weather (取得情報によっては必要)
* telegram.get.scheduled (取得情報によっては必要)

### その他
電文は2020年11月19日12時から保存されています。

---

## レスポンス
APIはリクエストされた電文によってXMLまたはプレーンテキスト、その他バイナリを返します。
エラーの場合、プレーンテキストを返します。
