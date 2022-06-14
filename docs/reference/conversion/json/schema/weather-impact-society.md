---
title: Schema weather-impact-society v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [全般気象情報 （社会的に影響の大きい天候に関する情報） (VPZI50)](/docs/telegrams/we02410.md)
* [地方気象情報 （社会的に影響の大きい天候に関する情報） (VPCJ50)](/docs/telegrams/we02420.md)
* [府県気象情報 （社会的に影響の大きい天候に関する情報） (VPFJ50)](/docs/telegrams/we02430.md)

## 共通ヘッダ

共通ヘッダは[こちら](/docs/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- |
| 1. | notice? | 情報による | **String**<br/> お知らせを記載する  |
| 2. | target |  | **String**<br/> 電文が対象とする地域を記載する [2. target](#2-target) |
| 3. | targetTime |  | **Object**<br/> この電文が対象とする天候解析開始日時とその期間を記載する [3. targetTime](#3-targettime) |
| 4. | mainTexts |  | **Array<Object\>**<br/> この電文が対象とする天候解析開始日時とその期間を記載する [4. mainText](#4-maintext) |
| 5.? | season | 梅雨の時期に関する<br/>情報のみ出現 | **Object**<br/> 梅雨の入り/明けの日時・地域について記載する [5. season](#5-season) |
| 6.? | statistics | 観測情報がない場合<br/>は出現しない | **Array<Object\>**<br/> アメダスや気象官署・特別地域気象観測所で観測した値などを記載する [6. statistics](#6-statistics) |
| 7.? | comment | 情報による | **String**<br/> 末文を記載する |

### 2. target

この電文が対象とする地域を記載します。

全般天候情報(VPZI50)または地方天候情報(VPCI50)の場合"全国・地方予報区等"、府県天候情報(VPFI50)の場合"気象情報／府県予報区・細分区域等"のコードを使用します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._1. | code |  | **String<Integer\>**<br/> 地域コード  |
| 2._2. | name |  | **String**<br/> 地域名 |

### 3. targetTime

この電文が対象とする天候解析開始日時とその期間を記載します。

梅雨の天候情報の場合、梅雨の時期に関する情報を発表した日付を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 3._1. | dateTime |  | **Object**<br/> 天候解析開始日時  |
| 3._1._1. | value |  | **ISO8601Time**<br/> 日時  |
| 3._1._2. | validFormat |  | **String**<br/> 日時が有効な範囲をフォーマットとして記載する  |
|||
| 3._2.? | duration | 情報による | **String**<br/> 基準日時からの期間を、 ISO8601 の Time intervals 形式で表す  |

### 4. mainText

情報の本文となる天候の状況及び地域を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | text |  | **String\|Null**<br/> 状況の解説をテキスト形式で記述する  |
| 4._2.? | zones | VPZI50、VPCI50の時出現 | **String<Object\>**<br/> 対象とする地域 |
| 4._2._1. | code |  | **String<Integer\>**<br/> 地域コード  |
| 4._2._2. | name|  | **String**<br/> 地域名 |
|||
| 4._3.? | prefectures | VPFI50の時出現 | **String<Object\>**<br/> 対象とする地域 |
| 4._3._1. | code |  | **String<Integer\>**<br/> 地域コード  |
| 4._3._2. | name|  | **String**<br/> 地域名 |

### 5. season

梅雨の入り/明けの日時・地域について記載します。

地方天候情報(VPCI50)の場合のみ出現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 5._1. | type |  | **String**<br/> シーズンの種別、`梅雨`で固定  |
| 5._2. | zones |  | **String<Object\>**<br/> 対象とする地域 |
| 5._2._1. | code |  | **String<Integer\>**<br/> 地域コード  |
| 5._2._2. | name |  | **String**<br/> 地域名 |
| 5._2._3. | type |  | **String**<br/> 情報の種類を記載する<br/>取りうる値は、`梅雨入り`、`梅雨明け` |
| 5._2._4. | eventData |  | **Object**<br/> 今年の梅雨入り／明けの日付、平年の梅雨入り／明けの日付、昨年の梅雨入り／明けの日付 、備考を記載する |
| 5._2._5._1.? | date | 情報による | **Object**<br/> 今年の梅雨入り／明けの日付を記載する<br/>今年は梅雨入り／梅雨明けの情報を発表しない旨の情報の場合には、出現しない |
| 5._2._5._1._1. | value |  | **String**<br/> 日時を記載する<br/> 例: `--07-19` |
| 5._2._5._1._2. | dubious |  | **String**<br/> 日時のあいまいさを示すため、`頃`を固定値として記載する |
||||
| 5._2._5._2. | normal |  | **Object**<br/> 平年の梅雨入り／明けの日付を記載する |
| 5._2._5._2._1. | value |  | **String**<br/> 日時を記載する<br/> 例: `--07-19` |
| 5._2._5._2._2. | dubious |  | **String**<br/> 日時のあいまいさを示すため、`頃`を固定値として記載する |
|||
| 5._2._5._3.? | lastYear | 情報による | **Object**<br/> 昨年の梅雨入り／明けの日付を記載する<br/>昨年は梅雨入り／梅雨明けの情報を発表しない旨の情報の場合には、出現しない |
| 5._2._5._3._1. | value |  | **String**<br/> 日時を記載する<br/> 例: `--07-19` |
| 5._2._5._3._2. | dubious |  | **String**<br/> 日時のあいまいさを示すため、`頃`を固定値として記載する |
|||
| 5._2._5._4.? | remark | 情報による | **String**<br/> 備考を記載する |

### 6. statistics

天候の状況を示す観測地等の統計データを記載します。この場合、観測データの種類毎、観測・統計期間ごとにまとめるため、複数回以上要素が出現します。

梅雨の天候情報のうち、梅雨入りの場合には出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 6._1. | type |  | **String**<br/> 観測データの種類を示す<br/>取りうる値は、`気象官署及び特別地域気象観測所`、`アメダス` |
| 6._2. | period |  | **Object**<br/> 統計データの範囲を記載する |
| 6._2._1. | dateTime |  | **Object**<br/> 統計データの開始基準日を記載する |
| 6._2._1._1. | value |  | **ISO8601Time**<br/> 統計データの開始基準日 |
| 6._2._1._2.? | validFormat | 情報による | **String**<br/> 日時が有効な範囲をフォーマットとして記載する  |
|||
| 6._2._2. | duration |  | **String**<br/> 統計データの開始基準日からの期間を、 ISO8601 の Time intervals 形式で表す  |
| 6._2._3. | name |  | **String**<br/> 統計データの開始基準日から終了日の情報をテキストで記載する  |
|||
| 6._3.? | text |  | **String**<br/> 統計データの期間と種類をテキストで記載する  |
| 6._4. | stations |  | **Array<Object\>**<br/> 観測点毎の統計データを記載する  |
| 6._4._1. | code |  | **String<Integer\>**<br/> 観測点コード  |
| 6._4._2. | name |  | **String**<br/> 観測点名 |
| 6._4._3. | type |  | **String**<br/> 情報の種類、`天候の状況（速報値）`で固定 |
| 6._4._4. | observedValues |  | **Array<Object\>**<br/> 統計データの値を種類・値毎に記載する |
| 6._4._4._1. | type |  | **String**<br/> 統計データの種類を示す |
| 6._4._4._2. | unit |  | **String**<br/> 統計データの単位を示す |
| 6._4._4._3. | value |  | **String<Float\>\|Null**<br/> 統計データの値を示す |
| 6._4._4._4.? | condition | 情報による | **String**<br/> 統計に係わる観測値の状態を記載する<br/>取りうる値は、`準正常`、`資料不足`、`値なし`、又はそれ以外の文字列とする|


## この電文で取り扱うコード類

コードは、気象庁防災情報XMLフォーマット コード表 20130621_AreaForecast 及び 20210310_PointAmedas 、20201026_WmoObservingStations に記載があります。

## サンプル

* [VPZI50 - 北・東・西日本の長期間の高温と少雨に関する全般気象情報](https://sample.dmdata.jp/conversion/json/schema/weather-impact-society/vpzi50_rjtd_20120824150004.json)
* [VPCI50 - 梅雨の時期に関する東北地方気象情報](https://sample.dmdata.jp/conversion/json/schema/weather-impact-society/vpci50_jpsn_20080805110000.json)
* [VPCI50 - 梅雨の時期に関する東北地方気象情報](https://sample.dmdata.jp/conversion/json/schema/weather-impact-society/vpci50_jpsn_20090810105821.json)
* [VPCI50 - 梅雨の時期に関する関東甲信地方気象情報](https://sample.dmdata.jp/conversion/json/schema/weather-impact-society/vpci50_rjtd_20080719110000.json)
* [VPFI50 - 日照不足に関する岩手県気象情報](https://sample.dmdata.jp/conversion/json/schema/weather-impact-society/vpfi50_jpdc_20660903141000.json)
