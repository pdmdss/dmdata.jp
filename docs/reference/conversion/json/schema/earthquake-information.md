---
title: Schema earthquake-information v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [震度速報 (VXSE51)](/telegrams/et01310.md)
* [震源に関する情報 (VXSE52)](/telegrams/et01320.md)
* [震源・震度に関する情報 (VXSE53)](/telegrams/et01330.md)
* [地震・津波に関するお知らせ (VZSE40)](/telegrams/et01010.md)

## 共通ヘッダ

共通ヘッダは[こちら](/reference/conversion/json#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1.? | earthquake | VXSE52、VXSE53時に出現、<br/>取消時には出現しない | **Object**<br/> [Earthquake component](/reference/conversion/json/component.md#Earthquake-component) を参照 |
| 2.? | intensity | VXSE51、VXSE53時に出現、<br/>震度データがない場合や取消時には出現しない | **Object**<br/>震度情報 [#2. intensity](#2-intensity) |
| 3.? | text | VZSE40時・取消時の理由や、<br/>その他の追記事項がある場合に出現 | **String**<br/>自由形式で文章を記載する  |
| 4.? | comments | 取消時や付加的な情報がない場合は出現しない | **Object**<br/>付加的な情報を文章形式で提供する [#4. comments](#4-comments) |


### 2. intensity

VXSE51、VXSE53時に出現し、 震度データがない場合（遠地地震や、緊急地震速報（警報）を発表したが震度1以上を観測しなかったとき等）や取消時には出現しません。

震度の表現として、`1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7`, `!5-`を使用し、`!5-` は「震度5弱以上未入電」とします。

また、VXSE51（震度速報）では、`3`, `4`, `5-`, `5+`, `6-`, `6+`, `7`のみを使用します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._1. | maxInt | | **String**<br/>最大震度、`1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7` で記載する |
| 2._2. | prefectures | | **Array<Object\>**<br/>都道府県内における最大震度 [#2. 2. prefectures](#2-2-prefectures) |
| 2._3. | region | | **Array<Object\>**<br/>一次細分化地域内における最大震度 [#2. 3. region](#2-3-region) |
| 2._4.? | cities | VXSE53時のみ | **Array<Object\>**<br/>市区町村における最大震度 [#2. 4. city](#2-4-city) |
| 2._5.? | stations | VXSE53時のみ | **Array<Object\>**<br/>観測点における震度 [#2. 5. stations](#2-5-stations) |

#### 2. 2. prefectures

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._2._1. | code | | **String<Integer\>**<br/>都道府県コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による | 
| 2._2._2. | name | | **String**<br/>都道府県名 | 
| 2._2._3.? | maxInt | 入電した震度がない場合は出現しない | **String**<br/>その都道府県における最大震度、`1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7` で記載する | 
| 2._2._4.? | revise | VXSE53時で、続報で震度変化があれば出現 | **String**<br/>その都道府県における最大震度が続報で変化した場合に記載する。<br/>取りうる値は`上方修正`又は`追加` | 

#### 2. 3. region

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._3._1. | code | | **String<Integer\>**<br/>一次細分化地域コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による | 
| 2._3._2. | name | | **String**<br/>一次細分化地域名 | 
| 2._3._3.? | maxInt | 入電した震度がない場合は出現しない | **String**<br/>その一次細分化地域における最大震度、`1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7` で記載する | 
| 2._3._4.? | revise | VXSE53時で、続報で震度変化があれば出現 | **String**<br/>その一次細分化地域における最大震度が続報で変化した場合に記載する。<br/>取りうる値は`上方修正`又は`追加` | 

#### 2. 4. city

VXSE51（震度速報）の時には出現しない。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._4._1. | code | | **String<Integer\>**<br/>市区町村コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による | 
| 2._4._2. | name | | **String**<br/>市区町村名 | 
| 2._4._3.? | maxInt | 入電した震度がない場合は出現しない | **String**<br/>その市区町村における最大震度、`1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7` で記載する　| 
| 2._4._4.? | revise | 続報で震度変化があれば出現 | **String**<br/>その市区町村における最大震度が続報で変化した場合に記載する。<br/>取りうる値は`上方修正`又は`追加` | 
| 2._4._5.? | condition | 入電した震度がない場合に出現 | **String**<br/>その市区町村内で震度5弱以上未入電の震度観測点があり、市区町村における確定震度がない場合、”震度５弱以上未入電”を記載する |

#### 2. 5. stations

VXSE51（震度速報）の時には出現しない。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._5._1. | code | | **String<Integer\>**<br/>観測点コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による | 
| 2._5._2. | name | | **String**<br/>観測点名 | 
| 2._5._3. | int | | **String**<br/>その観測点における最大震度、`1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7`, `!5-` で記載する | 
| 2._5._4.? | revise | 続報で震度変化があれば出現 | **String**<br/>その観測点における震度が続報で変化した場合に記載する <br/>取りうる値は`上方修正`又は`追加` | 
| 2._5._5.? | condition | 入電した震度がない場合に出現 | **String**<br/>その観測点で震度5弱以上未入電の震度観測点がある場合、”震度５弱以上未入電”を記載する |

### 4. comments

取消時や付加的な情報がない場合は出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1.? | free | 情報による | **Object**<br/>その他の付加的な情報を自由形式で記載する |
| 4._3.? | forecast | 情報による | **Object**<br/>津波や緊急地震速報に関する情報を固定付加文の形式で記載する [#4. 3. forecast](#4-2-forecast) |
| 4._3.? | var | 情報による | **Object**<br/>その他の付加的な情報を固定付加文の形式で記載する [#4. 3. var](#4-3-var) |

#### 4. 2. forecast

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._2._1. | text | | **String**<br/>固定付加文を記載する。複数ある場合は改行コード 0x0A を区切りに挿入する | 
| 4._2._2. | codes | | **Array<String<Integer\>\>**<br/>固定付加文をのコードを記載する <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による | 

#### 4. 3. var

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._3._1. | text | | **String**<br/>固定付加文を記載する。複数ある場合は改行コード 0x0A を区切りに挿入する | 
| 4._3._2. | codes | | **Array<String<Integer\>\>**<br/>固定付加文をのコードを記載する <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |

## 取り扱い上の注意

VXSE52（震源に関する情報）は、その海域において大津波警報・津波警報・津波注意報が発表中の時には発表されません。


## サンプル

### 2021/02/13 23:08 福島県沖
 
* [VXSE51 - 震度速報 2021/02/13 23:09:36 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse51_rjtd_20210213230936.json)
* [VXSE51 - 震度速報 2021/02/13 23:11:35 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse51_rjtd_20210213231135.json)
* [VXSE52 - 震源に関する情報 2021/02/13 23:11:44 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse52_rjtd_20210213231144.json)
* [VXSE53 - 震源・震度に関する情報 2021/02/13 23:13:02 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse53_rjtd_20210213231302.json)
* [VXSE53 - 震源・震度に関する情報 2021/02/13 23:18:00 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse53_rjtd_20210213231800.json)


### 2021/03/20 18:09 宮城県沖

津波注意報発表あり

* [VXSE51 - 震度速報 2021/03/20 18:12:29 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse51_rtjt_20210320181229.json)
* [VXSE53 - 震源・震度に関する情報 2021/03/20 18:13:04 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse53_rjtd_20210320181304.json)


### 2021/07/22 06:15 中米/パナマ南方

* [VXSE53 - 震源・震度に関する情報 2021/07/22 06:44:05 発表](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse53_rjtd_20210722064405.json)

### 取消報

* [VXSE53 - 震源・震度に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-information/vxse53_rjtd_20080614090634.json)
