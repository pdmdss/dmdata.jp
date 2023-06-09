---
title: Telegram Data v1
---

## リクエスト

`GET https://data.api.dmdata.jp/v1/:id`

電文本文を取得します。

### URLパラメータ
|パラメータ名|必須|デフォルト|説明|
|:--|:-:|:-:|:--|
|id|はい||**String** <br/> 電文を区別するユニーク384bitハッシュ。|

### APIに必要な権限
* telegram.data
* eew.get.forecast (取得情報によっては必要)
* eew.get.warning (取得情報によっては必要)
* eew.get.intensity (取得情報によっては必要)
* telegram.get.earthquake (取得情報によっては必要)
* telegram.get.volcano (取得情報によっては必要)
* telegram.get.weather (取得情報によっては必要)
* telegram.get.scheduled (取得情報によっては必要)

### 注意
WebSocketで受け取った通知をもとにこのAPIを参照することはお控えください。WebSocketデータを参照くださいますようお願いします。

### その他
電文は2020年11月19日12時からすべて保存されています。

---

## レスポンス
APIはリクエストされた電文によってXMLまたはJSON、プレーンテキスト、その他バイナリを返します。

エラーの場合、プレーンテキストを返します。
