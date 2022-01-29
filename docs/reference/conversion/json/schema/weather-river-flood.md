---
title: Schema weather-river-flood v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [指定河川洪水予報 (VXKOii (ii=50-89))](/telegrams/we02810.md)

## 共通ヘッダ

共通ヘッダは[こちら](/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

"河川"と"指定河川"は区別して取り扱います。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- |
| 1.? | notice | 情報による | **String**<br/> お知らせを記載する  |
| 2. | target |  | **String**<br/> 電文が対象とする指定河川と情報種別を記載する [2. target](#2-target) |
| 3.? | mainTexts | 簡略版では出現しない | **Array<Object\>**<br/> 主文について記載する [3. mainText](#3-maintext) |
| 4.? | supposition | 情報による<br/> 簡略版では出現しない | **Object**<br/> 浸水想定地区または氾濫発生情報について記載する [4. supposition](#4-supposition) |
| 5.? | rainfall | 情報による<br/> 簡略版では出現しない | **Object**<br/> 雨量情報について記載する [5. rainfall](#5-rainfall) |
| 6.? | waterLevel | 情報による<br/> 簡略版では出現しない | **Object**<br/> 水位・流量及びレベルの観測と予測について記載する [6. waterLevel](#6-waterlevel) |
| 7.? | floodedWaters | 情報による<br/> 簡略版では出現しない | **Array<Object\>**<br/> 氾濫水の予報について記載する [7. floodedWater](#7-floodedwater) |
| 8.? | offices | 簡略版では出現しない | **Array<Object\>**<br/> 共同発表した官署について記載する [8. office](#8-office) |
| 9.? | reference | 情報による<br/> 簡略版では出現しない | **Array<Object\>**<br/>水位観測所の受け持ち区間と基準の諸要素について記載する [9. reference](#9-reference) |


### 2. target

この電文が対象とする指定河川を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._1. | code |  | **String<Integer\>**<br/> 指定河川コード  |
| 2._2. | name |  | **String**<br/> 指定河川名 |
| 2._3. | kind |  | **Object**<br/> 指定河川洪水予報の種別 |
| 2._3._1. | code |  | **String<Integer\>**<br/> 指定河川洪水予報の種別コード |
| 2._3._2. | name |  | **String**<br/> 指定河川洪水予報の種別名 |
| 2._3._3. | condition | | **String**<br/> 洪水予報の種類 |


#### 指定河川洪水予報の種別コードと洪水予報の種類の関係

| Name                         | Code | Condition              |
| ---------------------------- | ---- | ---------------------- |
| 氾濫注意情報解除             | 10   | 洪水注意報解除         |
| 氾濫注意情報                 | 20   | 洪水注意報（発表）     |
| 氾濫注意情報                 | 21   | 洪水注意報             |
| 氾濫注意情報（警戒情報解除） | 22   | 洪水注意報（警報解除） |
| 氾濫警戒情報                 | 30   | 洪水警報（発表）       |
| 氾濫警戒情報                 | 31   | 洪水警報               |
| 氾濫危険情報                 | 40   | 洪水警報（発表）       |
| 氾濫危険情報                 | 41   | 洪水警報               |
| 氾濫発生情報                 | 51   | 洪水警報               |
| 氾濫発生情報（氾濫水の予報） | 53   | 洪水警報               |

### 3. mainText

主文について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 3._1. | text |  | **String\|Null**<br/> 主文をテキスト形式で記述する、省略する際は**Null**とする |
| 3._2. | rivers |  | **String<Object\>**<br/> 対象とする河川 |
| 3._2._1. | code |  | **String<Integer\>**<br/> 河川コード  |
| 3._2._2. | name|  | **String**<br/> 河川名 |
|||
| 3._3. | stations |  | **String<Object\>**<br/> 対象とする河川の水位・流量観測所、要素が0の場合がある |
| 3._3._1. | code |  | **String<Integer\>**<br/> 観測所コード  |
| 3._3._2. | name |  | **String**<br/> 観測所名 |
| 3._3._3. | location |  | **String**<br/> 観測所の大まかな位置を記載する |

### 4. supposition

浸水想定地区又は氾濫発生情報について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | type |  | **String**<br/> 浸水想定又は氾濫発生についての情報種別を示す<br/> 取りうる値は、`浸水想定地区`、`浸水想定地区（氾濫発生情報）` |
| 4._2. | description |  | **String**<br/> 浸水想定地区に対する説明を記載する |
| 4._3. | kind |  | **Object**<br/> 浸水想定又は氾濫発生についての情報種別を示す |
| 4._3._1. | code |  | **String<Integer\>**<br/> 浸水想定又は氾濫発生についての情報種別コード<br/>取りうる値は、`1`か`2`|
| 4._3._1. | name |  | **String**<br/> 浸水想定又は氾濫発生についての情報種別名<br/>取りうる値は、フィールド type と同じで、`浸水想定地区`、`浸水想定地区（氾濫発生情報）`|
|||
| 4._4. | districts |  | **Object**<br/> 対象となる観測所又は地域・地区を記載する<br/> `浸水想定地区`の場合は観測点を、`浸水想定地区（氾濫発生情報）`の場合は地域・地区を記載する |
| 4._4._1.? | code | 観測点の場合に出現 | **String<Integer\>**<br/> 観測所コード  |
| 4._4._2. | name |  | **String**<br/> 観測所名又は地域・地区名 |
| 4._4._3. | prefecture |  | **Object**<br/> 観測所名又は地域・地区が所在する都道府県 |
| 4._4._3._1. | code |  | **String<Integer\>**<br/> 都道府県コード  |
| 4._4._3._2. | name |  | **String**<br/> 都道府県名 |
|||
| 4._4._4. | city |  | **Object**<br/> 観測所名又は地域・地区が所在する市町村 |
| 4._4._4._1. | code |  | **String<Integer\>**<br/> 市町村コード  |
| 4._4._4._2. | name |  | **String**<br/> 市町村名 |
|||
| 4._4._5. | district |  | **String**<br/> 対象となる地域・地区の名称 |

### 5. rainfall

流域雨量情報について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | dateTime |  | **ISO8601**<br/> 予報・観測の基点時刻 |
| 4._2. | text |  | **String**<br/> 雨量の予報・観測文を記載 |
| 4._3. | timeSeries |  | **Array<Object\>**<br/> 雨量の時系列情報、時系列の定義の数だけ出現する |
| 4._3._1. | timeDefines |  | **Array<Object\>**<br/> 全ての予想期間を示すとともに、対応する要素の個々の時刻定義を記載する |
| 4._3._1._1. | timeId |  | **String<Integer\>**<br/> 時刻ID |
| 4._3._1._2. | dateTime |  | **ISO8601**<br/> 予想する基準日時 |
| 4._3._1._3. | duration |  | **String**<br/> 基準日時からの予想時間の幅を、 ISO8601 の Time intervals 形式で表す |
| 4._3._1._4. | name |  | **String**<br/> 時刻定義の内容 |
|||
| 4._3._2. | items |  | **Array<Object\>**<br/> 予想の時系列等の内容と対象河川を記載する |
| 4._3._2._1. | name |  | **String**<br/> 対象河川名 |
| 4._3._2._2. | forecasts | | **Array<Object\>**<br/> 量的予想・観測情報を記載する |
| 4._3._2._2._1.| refId | | **String**<br/> 対応する時刻ID |
| 4._3._2._2._2. | unit | | **String**<br/> 量的予想・観測情報の単位 |
| 4._3._2._2._3. | value | | **String<Float\>\|Null**<br/> 量的予想・観測情報の値 |

### 6. waterLevel

水位・流量及びレベルの観測と予測について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 6._1. | timeSeries |  | **Array<Object\>**<br/> 水位・流量及びレベルの時系列情報、時系列の定義の数だけ出現する |
| 6._1._1. | timeDefines |  | **Array<Object\>**<br/> 全ての予想期間を示すとともに、対応する要素の個々の時刻定義を記載する |
| 6._1._1._1. | timeId |  | **String<Integer\>**<br/> 時刻ID |
| 6._1._1._2. | dateTime |  | **ISO8601**<br/> 予想する基準日時 |
| 6._1._1._3. | duration |  | **String**<br/> 基準日時からの予想時間の幅を、 ISO8601 の Time intervals 形式で表す |
| 6._1._1._4. | name |  | **String**<br/> 時刻定義の内容 |
|||
| 6._1._2. | items |  | **Array<Object\>**<br/> 観測と予測の時系列等の内容と対象河川を記載する |
| 6._1._2._1. | code |  | **String**<br/> 水位・流量観測所コード |
| 6._1._2._2. | name |  | **String**<br/> 水位・流量観測所名 |
| 6._1._2._3. | location |  | **String**<br/> 水位・流量観測所の大まかな位置 |
| 6._1._2._4. | type |  | **String**<br/> 観測所の種類<br/>取りうる値は、`水位`、`流量` |
| 6._1._2._5. | forecasts | | **Array<Object\>**<br/> 量的予想・観測情報を記載する |
| 6._1._2._5._1.| refId | | **String**<br/> 対応する時刻ID |
| 6._1._2._5._2. | unit | | **String**<br/> 量的予想・観測情報の単位 |
| 6._1._2._5._3. | value | | **String<Float\>\|Null**<br/> 量的予想・観測情報の値 |
| 6._1._2._5._4. | level | | **String<Integer\>\|Null**<br/> 量的予想・観測情報のレベル、値は`1`、`2`、`3`、`4`、**Null**とする<br/>計画高水位・計画高水量時はレベル4となる |
| 6._1._2._5._5. | condition | | **String**<br/> 流量実況変化傾向や実況・予測値の状況を記載 |

### 7. floodedWater

氾濫水の予報について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 7._1. | code |  | **String<Integer\>**<br/> 河川コード  |
| 7._2. | name |  | **String**<br/> 河川名 |
| 7._3. | dateTime |  | **ISO8601**<br/> 予報の基点時刻 |
| 7._4. | text |  | **String**<br/> 氾濫水の予報に対する説明文を記載 |
| 7._5. | assumptions |  | **Array<Object\>**<br/> 浸水区域、氾濫水到達時刻、氾濫水最深時刻、想定最大浸水深について記載します |
| 7._5._1. | district |  | **String**<br/> 浸水区域  |
| 7._5._2. | attainmentTime |  | **Object**<br/> 氾濫水到達時刻  |
| 7._5._2._1. | value |  | **ISO8601Time**<br/> 日時  |
| 7._5._2._2. | dubious |  | **String**<br/> 日時のあいまいさを示すため、`頃`を固定値として記載する  |
|||
| 7._5._3. | attainmentDeepestTime |  | **Object**<br/> 氾濫水最深時刻  |
| 7._5._3._1. | value |  | **ISO8601Time**<br/> 日時  |
| 7._5._3._2. | dubious |  | **String**<br/> 日時のあいまいさを示すため、`頃`を固定値として記載する  |
|||
| 7._5._4. | floodDepth |  | **Object**<br/> 想定最大浸水深  |
| 7._5._4._1. | from |  | **String<Float\>\|Null**<br/> 想定浸水深の下限  |
| 7._5._4._2. | to |  | **String<Float\>\|Null**<br/> 想定浸水深の上限  |

### 8. office

共同発表した官署について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 8._1. | type |  | **String**<br/> 官署種別<br/> 取りうる値は、`水位関係`、`気象関係`  |
| 8._2. | code |  | **String<Integer\>**<br/> 官署コード  |
| 8._3. | name |  | **String**<br/> 官署名 |
| 8._4. | contact |  | **String**<br/> 官署の連絡先 |
| 8._5. | url |  | **String**<br/> 参考となるURL |

### 9. reference

水位・流量観測所の受け持ち区間と基準の諸要素について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1. | code |  | **String<Integer\>**<br/> 観測所コード  |
| 9._2. | name |  | **String**<br/> 観測所名 |
| 9._3. | location |  | **String**<br/> 観測所の大まかな位置を記載する |
| 9._4. | district |  | **String**<br/> 浸水想定地域・地区 |
| 9._5. | section |  | **Array<String\>**<br/> 水位・流量観測所の受け持ち区間を記載する |
| 9._6. | criteria |  | **Array<Object\>**<br/> 水位・流量基準を記載する |
| 9._6._1.| type | | **String**<br/> 基準の種類を記載する |
| 9._6._2. | unit | | **String**<br/> 基準の単位 |
| 9._6._3. | value | | **String<Float\>\|Null**<br/> 基準の値 |
| 9._6._4. | condition | | **String**<br/> 基準の値が有効かどうか示す<br/>取りうる値は、`有効`、`無効` |

## この電文で取り扱うコード類

コードは、気象庁防災情報XMLフォーマット コード表 20200713_AreaRiver 及び 20200713_AreaFloodForecast 、20140423_RiverOffice 、20201224_WaterLevelStation に記載があります。

## サンプル

* [VXKOii - 警戒レベル２（氾濫注意情報）](https://sample.dmdata.jp/conversion/json/schema/weather-river-flood/vxkoii_%23%23%23%23_20190509204043.json)
* [VXKOii - 警戒レベル４（氾濫危険情報）](https://sample.dmdata.jp/conversion/json/schema/weather-river-flood/vxkoii_%23%23%23%23_20190527090000.json)
* [VXKOii - 警戒レベル４（氾濫危険情報）](https://sample.dmdata.jp/conversion/json/schema/weather-river-flood/vxkoii_%23%23%23%23_20190527090001.json)
* [VXKOii - 警戒レベル５（氾濫水の予報）](https://sample.dmdata.jp/conversion/json/schema/weather-river-flood/vxkoii_%23%23%23%23_20190527180000.json)
* [VXKOii - 六角川氾濫警戒情報](https://sample.dmdata.jp/conversion/json/schema/weather-river-flood/vxkoii_jpfc_20210813152131.json)
