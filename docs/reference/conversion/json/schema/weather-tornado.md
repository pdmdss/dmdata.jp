---
title: Schema weather-tornado v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [竜巻注意情報（目撃情報付き） (VPHW51)](/docs/telegrams/we02521.md)

## 共通ヘッダ

共通ヘッダは[こちら](/docs/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

| 階層  | フィールド     | 出現条件  | 説明                                                                              | 
|-----|-----------|-------|---------------------------------------------------------------------------------| 
| 1.? | witnesses | 情報による | **Array&lt;Object&gt;**<br/> 竜巻などの目撃情報を地域別で記載する [#1. witness](#1-witness)       |
| 2.  | targets   |       | **Array&lt;Object&gt;**<br/> 竜巻注意情報を発表している地域を記載する [#2. target](#2-target)       |
| 3.  | regions   |       | **Array&lt;Object&gt;**<br/> 竜巻注意情報を発表している一次細分化地域を記載する [#3. region](#3-region)  |
| 4.  | areas     |       | **Array&lt;Object&gt;**<br/> 竜巻注意情報を発表している市町村等をまとめた地域等を記載する [#4. area](#4-area) |
| 5.  | cities    |       | **Array&lt;Object&gt;**<br/> 竜巻注意情報を発表している市町村等を記載する [#5. city](#5-city)         |

### 1. witness

竜巻などの目撃情報を地域別で記載します。

| 階層    | フィールド | 出現条件 | 説明                                                               |
|-------|-------|------|------------------------------------------------------------------|
| 1._1. | code  |      | **String&lt;Integer&gt;**<br/> 発表細分、一次細分区域等、市町村等をまとめた地域等、市町村等コード |
| 1._2. | name  |      | **String**<br/> 発表細分、一次細分区域等、市町村等をまとめた地域等、市町村等名                  |

### 2. target

竜巻注意情報を発表している府県予想区等を記載します。

| 階層       | フィールド  | 出現条件 | 説明                                                            |
|----------|--------|------|---------------------------------------------------------------|
| 2._1.    | code   |      | **String&lt;Integer&gt;**<br/> 府県予想区等コード                      |
| 2._2.    | name   |      | **String**<br/> 府県予想区等名                                       |
| 2._3.    | kinds  |      | **Array&lt;Object&gt;**<br/> 竜巻注意情報の情報種別を記載する、要素は常に1つで固定      |
| 2._3._1. | code   |      | **String&lt;Integer&gt;**<br/> 竜巻注意情報の情報種別コード、`1`、`0`のいずれかで固定 |
| 2._3._2. | name   |      | **String**<br/> 竜巻注意情報の情報種別名、`竜巻注意情報`、`なし`のいずれかで固定            |
| 2._3._3. | status |      | **String**<br/> 竜巻注意情報の情報状態、`発表`、`なし`のいずれかで固定                 |

### 3. region

[#2. target](#2-target) の内容、"府県予想区等"を"一次細分化地域"と読み替えて以下同じとします。

### 4. area

[#2. target](#2-target) の内容、"府県予想区等"を"市町村等をまとめた地域等"と読み替えて以下同じとします。

### 5. city

[#2. target](#2-target) の内容、"府県予想区等"を"市町村等"と読み替えて以下同じとします。


## 取り扱い上の注意

発表された情報は約1時間有効であり、続報の発表をもって継続となります。 失効時刻は、共通ヘッダを必ず参照してください。

## この電文で取り扱うコード類

コードは、気象庁防災情報XMLフォーマット コード表 AreaInformationCity-AreaForecastLocalM+ に記載があります。

## サンプル

* [VPHW51 - 長崎県竜巻注意情報](https://sample.dmdata.jp/conversion/json/schema/weather-tornado/vphw51_jpfe_20140212132600.json)
* [VPHW51 - 京都府竜巻注意情報](https://sample.dmdata.jp/conversion/json/schema/weather-tornado/vphw51_jpoa_20140212132200.json)
* [VPHW51 - 埼玉県竜巻注意情報](https://sample.dmdata.jp/conversion/json/schema/weather-tornado/vphw51_jptc_20150717092100.json)
* [VPHW51 - 埼玉県竜巻注意情報](https://sample.dmdata.jp/conversion/json/schema/weather-tornado/vphw51_jptc_20150717092101.json)
* [VPHW51 - 東京都竜巻注意情報](https://sample.dmdata.jp/conversion/json/schema/weather-tornado/vphw51_rjtd_20140212131900.json)
* [VPHW51 - 東京都竜巻注意情報](https://sample.dmdata.jp/conversion/json/schema/weather-tornado/vphw51_rjtd_20140212133600.json)
