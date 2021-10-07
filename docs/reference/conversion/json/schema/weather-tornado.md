---
title: Schema weather-tornado v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* 竜巻注意情報（目撃情報あり） (VPHW51)

## 共通ヘッダ

共通ヘッダは[こちら](../#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1.? | witnesses | 情報による | **Array<Object\>**<br/> 竜巻などの目撃情報を地域別で記載する [#1. witness](#1-witness) |
| 2. | targets |  | **Array<Object\>**<br/> 竜巻注意情報を発表している地域を記載する [#2. target](#2-target)  |
| 3. | regions |  | **Array<Object\>**<br/> 竜巻注意情報を発表している一次細分化地域を記載する [#3. region](#3-region)  |
| 4. | areas |  | **Array<Object\>**<br/> 竜巻注意情報を発表している市町村等をまとめた地域等を記載する [#4. area](#4-area)  |
| 5. | cities |  | **Array<Object\>**<br/> 竜巻注意情報を発表している市町村等を記載する [#5. city](#5-city)  |

### 1. witness

竜巻などの目撃情報を地域別で記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1. | code | | **String<Integer\>**<br/> 発表細分、一次細分区域等、市町村等をまとめた地域等、市町村等コード |
| 1._2. | name | | **String**<br/> 発表細分、一次細分区域等、市町村等をまとめた地域等、市町村等名 |

### 2. target

竜巻注意情報を発表している府県予想区等を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._1. | code | | **String<Integer\>**<br/> 府県予想区等コード |
| 2._2. | name | | **String**<br/> 府県予想区等名 |
| 2._3. | kinds |  | **Array<Object\>**<br/> 竜巻注意情報の情報種別を記載する、要素は常に1つで固定 |
| 2._3._1. | code |  | **String<Integer\>**<br/> 竜巻注意情報の情報種別コード、`1`、`0`のいずれかで固定 |
| 2._3._2. | name |  | **String**<br/> 竜巻注意情報の情報種別名、`竜巻注意情報`、`なし`のいずれかで固定 |
| 2._3._3. | status |  | **String**<br/> 竜巻注意情報の情報状態、`発表`、`なし`のいずれかで固定 |

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

### 気象警報・注意報

* [VPWW54 - 山口県気象警報・注意報 高潮警報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jpfa_20150622180000.json)
* [VPWW54 - 島根県気象警報・注意報 大雨特別警報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jphb_20160212154400.json)
* [VPWW54 - 富山県気象警報・注意報 大雪特別警報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jpna_20130207210706.json)
* [VPWW54 - 富山県気象警報・注意報 各種警報を大雨特別警報に切り替える可能性](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jpna_20150709021800.json)
* [VPWW54 - 神奈川県気象警報・注意報 波浪警報を大雨特別警報に切り替える可能性](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jptf_20160715160844.json)
* [VPWW54 - 東京都気象警報・注意報 大雨、暴風、波浪、高潮特別警報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jptk_20160212142209.json)
* [VPWW54 - 東京都気象警報・注意報 大雨、暴風、波浪、高潮特別警報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jptk_20161213204723.json)
* [VPWW54 - 東京都気象警報・注意報 大雨特別警報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpww54_jptk_20170126172047.json)

### 記録的短時間大雨情報

* [VPOA50 - 京都府記録的短時間大雨情報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpoa50_jpoa_20111215171634.json)
* [VPOA50 - 大阪府記録的短時間大雨情報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpoa50_jpos_20100602115400.json)
* [VPOA50 - 石狩・空知・後志地方記録的短時間大雨情報](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vpoa50_jpsp_20190328195331.json)
