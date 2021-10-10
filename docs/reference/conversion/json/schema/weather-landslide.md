---
title: Schema weather-landslide v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* 土砂災害警戒情報 (VXWW50)

## 共通ヘッダ

共通ヘッダは[こちら](../#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1. | target |  | **Object**<br/> 電文が対象とする地域を記載する [#. target](#1-target)  |
| 2. | cities |  | **Array<Object\>**<br/> 土砂災害警戒情報を発表している市町村等を記載する [#2. city](#2-city)  |
| 3. | offices |  | **Array<Object\>**<br/> 共同発表した官署について記載する [3. office](#3-office) |

### 1. target

電文が対象とする府県予想区等を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._1. | code | | **String<Integer\>**<br/> 府県予想区等コード |
| 2._2. | name | | **String**<br/> 府県予想区等名 |

### 2. city

市区町村等の単位で電文が対象とする地域内の市町村等の土砂災害警戒情報の内容を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 5._1. | code | | **String<Integer\>**<br/> 市区町村等コード |
| 5._2. | name | | **String**<br/> 市区町村等名 |
| 5._3. | kinds | | **Array<Object\>**<br/>土砂災害警戒情報の種別、要素は常に1つ |
| 2._3._1. | code |  | **String<Integer\>**<br/> 土砂災害警戒情報の情報種別コード、`3`、`1`、`0`のいずれかで固定 |
| 2._3._2. | name |  | **String**<br/> 土砂災害警戒情報の情報種別名、`警戒`、`解除`、`なし`のいずれかで固定 |
| 2._3._3. | status |  | **String**<br/> 土砂災害警戒情報の情報状態、`発表`、`継続`、`解除`、`なし`のいずれかで固定 |


#### 土砂災害警戒情報種別とコードと状態の関係

| | 情報種別コード | 情報種別名 | 情報状態 |
| -: | :-: | :-: | :-: |
| 新たに警戒対象地域となった対象市町村 | 3 | 警戒 | 発表 |
| 継続して警戒対象地域となっている対象市町村 | 3 | 警戒 | 継続 |
| 警戒解除地域となった対象市町村 | 1 | 解除 | 解除 | 
| 今回も前回も警戒対象地域でない対象市町村 | 0 | なし | なし |

### 3. office

共同発表した官署について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 3._1. | type |  | **String**<br/> 官署種別<br/> 取りうる値は、`都道府県`、`気象庁`  |
| 3._2. | name |  | **String**<br/> 官署名 |
| 3._3. | contact |  | **String**<br/> 官署の連絡先 |

## この電文で取り扱うコード類

コードは、気象庁防災情報XMLフォーマット コード表 AreaInformationCity-AreaForecastLocalM+ に記載があります。

## サンプル

* [VXWW50 - 福岡県土砂災害警戒情報　第５号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jpfk_20130831110517.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130902153710.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130902175034.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第３号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904081232.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第４号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904092212.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第５号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904094920.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第６号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904110108.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第７号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904132017.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第８号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904143821.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第９号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904155917.json)
* [VXWW50 - 岡山県土砂災害警戒情報　第１０号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jphc_20130904162241.json)
* [VXWW50 - 渡島・檜山地方土砂災害警戒情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jpsf_20130823151514.json)
* [VXWW50 - 渡島・檜山地方土砂災害警戒情報　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jpsf_20130823173823.json)
* [VXWW50 - 渡島・檜山地方土砂災害警戒情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-warning/vxww50_jpsf_20130823221552.json)
