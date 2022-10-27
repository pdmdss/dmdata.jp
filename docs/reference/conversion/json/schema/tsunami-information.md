---
title: Schema tsunami-information v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [津波警報・注意報・予報a (VTSE41)](/docs/telegrams/et01110.md)
* [津波情報a (VTSE51)](/docs/telegrams/et01120.md)
* [沖合の津波観測に関する情報 (VTSE52)](/docs/telegrams/et01121.md)

## 共通ヘッダ

共通ヘッダは[こちら](/docs/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- |
| 1.? | tsunami | 取消時には出現しない | **Object**<br/> 津波情報 [#1. tsunami](#1-tsunami) |
| 2.? | earthquakes | 取消時には出現しない | **Array<Object\>**<br/> [Earthquake component](/docs/reference/conversion/json/component.md#Earthquake-component) を配列に0個以上格納する |
| 3.? | text | 取消時の理由や、<br/>その他の追記事項がある場合に出現 | **String**<br/>自由形式で文章を記載する  |
| 4.? | comments | 取消時や付加的な情報がない場合は出現しない | **Object**<br/>付加的な情報を文章形式で提供する [#4. comments](#4-comments) |


### 1. tsunami

VTSE41、VTSE51、VTSE52で共通化された部分が多いため統一標準化しています。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1.? | forecasts | VTSE41、VTSE51の時出現 | **Array<Object\>**<br/> 津波の予測情報を配列で格納する [#1. 1. forecast](#1-1-forecast) |
| 1._2.? | observations | VTSE51、VTSE52の時で、<br/> 観測値がある場合にのみ出現| **Array<Object\>**<br/> 津波の観測地情報を配列で格納する [#1. 2. observation](#1-2-observation) |
| 1._3.? | estimations | VTSE52の時出現 | **Array<Object\>**<br/> 津波の推定情報を配列で格納する [#1. 3. estimation](#1-3-estimation) |

#### 1. 1. forecast

津波警報・注意報・予報に関する情報を本要素に記載します。

VTSE41や、VTSE51に出現します。VTSE51の場合、津波観測がされるとその津波予報区で到達予想時刻が`第１波到達を確認`となります。

下記は各予報区ごとに出現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1._1. | code | | **String<Integer\>**<br/> 津波予報区コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による | 
| 1._1._2. | name | | **String**<br/> 津波予報区名 | 
| 1._1._3. | kind |  | **Object**<br/>津波警報等の種別 [#1. 1. 3. kind](#1-1-3-kind) |
| 1._1._4.? | firstHeight | 若干の海面変動の場合は出現しない | **Object**<br/> 対象津波予報区に対しての津波の到達予想時刻 [#1. 1. 4. first height](#1-1-4-first-height) |
| 1._1._5.? | maxHeight | 津波注意報以上から、若干の海面変動<br/>となった場合は出現しない | **Object**<br/> 対象津波予報区に対しての津波の予想高さ [#1. 1. 5. max height](#1-1-5-max-height) |
| 1._1._6.? | stations | VTSE51で、<br/>津波注意情報以上の時に出現する | **Array<Object\>**<br/> 対象津波予報区に所属する潮位観測点毎の満潮時刻と到達予想時刻 [#1. 1. 6. station](#1-1-6-station) |

##### 1. 1. 3. kind

大津波警報、津波警報、津波注意報、津波予報（若干の海面変動）の種別を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1._3._1. | code |  | **String<Integer\>**<br/> 津波警報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 1._1._3._2. | name |  | **String**<br/> 津波警報等の種別名 |
| 1._1._3._3. | lastKind |  | **Object**<br/> 前回発表した津波警報等の種別 |
| 1._1._3._3._1 | code |  | **String<Integer\>**<br/> 前回発表した津波警報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 1._1._3._3._2 | name |  | **String**<br/> 前回発表した津波警報等の種別名 |

##### 1. 1. 4. first height

津波の到達予想時刻を表現します。

対象とする津波予報区が`若干の海面変動`の時には出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1._4._1.? | arrivalTime | まだ津波が到達していない場合、<br/>到達していないと推測される場合に出現する | **ISO8601Time**<br/> 津波到達予想時刻、ISO8601の日本時間で記載する |
| 1._1._4._2.? | condition |  すでに津波が到達している場合や、推測される場合、<br/>直ちに津波が来襲されると予想される場合に出現する | **String**<br/> 取りうる値は `津波到達中と推測`、<br/>`第１波の到達を確認`、`ただちに津波来襲と予測` |
| 1._1._4._3.? | revise | 続報により新しく津波予報区が追加された場合や、<br/>予想時刻が更新された場合に出現する | **String**<br/> 到達予想の更新フラグ<br/> 取りうる値は `追加` 又は `更新` |

##### 1. 1. 5. max height

津波の予想の高さを表現します。

津波注意報以上が発表されていた場合に続報において津波予報（若干の海面変動）となった場合は、出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1._5._1. | height |  | **Object**<br/> 津波の予想される高さ |
| 1._1._5._1._1. | type |  | **String**<br/> 数値情報のタイプ、 `津波の高さ` で固定 |
| 1._1._5._1._2. | unit |  | **String**<br/> 数値情報の単位、 `m` で固定 |
| 1._1._5._1._3. | value |  | **String<Float\>\|Null**<br/> 津波の予想される高さ。定性的表現をする場合は **Null** とする |
| 1._1._5._1._4.? | over | 数値情報より大きいことを示す場合に出現 | **Boolean**<br/> 10m超となるときに出現し、数値情報を補助する<br/> 取りうる値は **true** のみ |
| 1._1._5._1._5.? | condition | 定性的表現がある場合 | **String**<br/> 津波の高さを定性的表現をする、津波注意報時は出現しない<br/>  取りうる値は `高い` 又は `巨大` |
|||
| 1._1._5._2.? | condition | 大津波警報で初めて発表する場合や<br/>大津波警報で上方修正を行った場合に出現する | **String**<br/> 取りうる値は `重要` |
| 1._1._5._3.? | revise | 続報により新しく津波予報区が追加された場合や、<br/>予想時刻が更新された場合に出現する | **String**<br/> 津波の高さの更新フラグ<br/>  取りうる値は `追加` 又は `更新` |


##### 1. 1. 6. station

潮位観測点の満潮時刻と津波の到達予想時刻を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1._6._1. | code |  | **String<Integer\>**<br/> 潮位観測点コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 1._1._6._2. | name |  | **String**<br/> 潮位観測点名 |
| 1._1._6._3. | highTideDateTime |  | **ISO8601Time**<br/> 満潮時刻、ISO8601の日本時間で記載する |
| 1._1._6._4. | firstHeight |  | **Object**<br/> 潮位観測点に対しての津波の到達予想時刻 |
| 1._1._6._4._1.? | arrivalTime | まだ津波が到達していない場合、<br/>到達していないと推測される場合に出現する | **ISO8601Time**<br/> 津波到達予想時刻、ISO8601の日本時間で記載する |
| 1._1._6._4._2.? | condition |  すでに津波が到達している場合や、推測される場合に出現する | **String**<br/> 取りうる値は `津波到達中と推測`、`第１波の到達を確認` |
| 1._1._6._4._3.? | revise | 続報により新しく追加された場合や、<br/>予想時刻が更新された場合に出現する | **String**<br/> 到達予想の更新フラグ<br/> 取りうる値は `追加` 又は `更新` |

#### 1. 2. observation

津波の観測値に関する情報を本要素に記載します。

VTSE51や、VTSE52に出現します。

下記は津波予報区ごとに出現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._2._1. | code | | **String<Integer\>\|Null**<br/> 津波予報区コード <br/> VTSE52の場合は**Null**とします <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 1._2._2. | name | | **String\|Null**<br/> 津波予報区名 <br/> VTSE52の場合は**Null**とします |
| 1._2._3. | stations |  | **Array<Object\>**<br/> 潮位観測点の満潮時刻と津波の到達予想時刻 [#1. 2. 3. station](#1-2-3-station) |

##### 1. 2. 3. station

潮位観測点の満潮時刻と津波の到達予想時刻を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._2._3._1. | code |  | **String<Integer\>**<br/> 潮位観測点コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 1._2._3._2. | name |  | **String**<br/> 潮位観測点名 |
| 1._2._3._3.? | sensor | 特殊な観測機器の場合に出現 | **String**<br/> GPS波浪計や圧力計などの特殊な観測機器の名称を記載する |
| 1._2._3._4. | firstHeight |  | **Object**<br/> 第一波の到達時刻  [#1. 2. 3. 4. first height](#1-2-3-4-first-height) |
| 1._2._3._5. | maxHeight |  | **Object**<br/> 津波の最大波を観測した値 [#1. 2. 3. 5. max height](#1-2-3-5-max-height) |

###### 1. 2. 3. 4. first height

津波の第一波の到達時刻を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._2._3._4._1.? | arrivalTime | 識別不能時は出現しない | **ISO8601Time**<br/> 津波の第一波の到達時刻、ISO8601の日本時間で記載する |
| 1._2._3._4._2.? | initial | 極性がない場合や<br/> 識別不能時は出現しない | **String**<br/> 津波の第一波の極性を記載する<br/> 取りうる値は `押し`、`引き` |
| 1._2._3._4._3.? | condition |  識別不能時に出現する | **String**<br/> 取りうる値は `第１波識別不能` で固定 |
| 1._2._3._4._4.? | revise | 続報により新しく追加された場合や、<br/>更新された場合に出現する | **String**<br/> 第一波の到達の更新フラグ<br/> 取りうる値は `追加` 又は `更新` |

###### 1. 2. 3. 5. max height

津波の最大波を観測した値を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._2._3._5._1.? | dateTime | 日時が明確である場合に出現 | **ISO8601Time**<br/> 津波の最大波を観測した日時、ISO8601の日本時間で記載する |
| 1._2._3._5._2.? | height | 津波が小さい場合や、津波警報以上で<br/>まだ津波の観測値が小さい場合は出現しない | **Object**<br/> 津波の最大波を観測した値 |
| 1._2._3._5._2._1. | type |  | **String**<br/> 数値情報のタイプ、 `これまでの最大波の高さ` で固定 |
| 1._2._3._5._2._2. | unit |  | **String**<br/> 数値情報の単位、 `m` で固定 |
| 1._2._3._5._2._3. | value |  | **String<Float\>**<br/> 津波の最大波の高さ。 |
| 1._2._3._5._2._4.? | over | 数値情報より大きいことを示す場合に出現 | **Boolean**<br/> 観測範囲より津波の高さが超過した場合に使用し、数値情報を補助する<br/> 取りうる値は **true** のみ |
| 1._2._3._5._2._5.? | condition |  数値情報に付加的情報が必要な場合に出現 | **String**<br/> 取りうる値は `上昇中` で固定 |
|||
| 1._2._3._5._3.? | condition | 津波が小さい場合や、津波警報以上で<br/>まだ津波の観測値が小さい場合、重要な場合に出現する | **String**<br/> 取りうる値は `微弱`、`観測中`、`重要` |
| 1._2._3._5._4.? | revise | 続報により新しく追加された場合や、<br/>更新された場合に出現する | **String**<br/> 津波の高さの更新フラグ<br/>  取りうる値は `追加` 又は `更新` |


#### 1. 3. estimation

沖合の潮位観測点で観測された津波の情報に基づき、津波が到達とすると推定される沿岸地域について津波の推定値に関する情報を記載します。

VTSE52に出現します。

下記は推定された予報区ごとに出現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._3._1. | code | | **String<Integer\>**<br/> 津波予報区コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 1._3._2. | name | | **String**<br/> 津波予報区名 |
| 1._3._3. | firstHeight | | **Object**<br/> 対象津波予報区に対しての津波の到達予想時刻（推定値） [#1. 3. 3. first height](#1-3-3-first-height) |
| 1._3._4. | maxHeight |  | **Object**<br/> 対象津波予報区に対しての津波の予想高さ（推定値） [#1. 3. 4. max height](#1-3-4-max-height) |

##### 1. 3. 3. first height

津波の到達予想時刻（推定値）を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._3._3._1. | arrivalTime |  | **ISO8601Time**<br/> 津波到達予想時刻、ISO8601の日本時間で記載する |
| 1._3._3._2.? | condition |  早いところでは既に津波到達と推定される場合に出現する | **String**<br/> 取りうる値は `早いところでは既に津波到達と推定` |
| 1._3._3._3.? | revise | 続報により新しく津波予報区が追加された場合や、<br/>予想時刻が更新された場合に出現する | **String**<br/> 到達予想の更新フラグ<br/> 取りうる値は `追加` 又は `更新` |

##### 1. 3. 4. max height

津波の予想の高さ（推定値）を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._3._4._1.? | dateTime | 日時が明確である場合に出現 | **ISO8601Time**<br/> 津波の最大波となる日時（推定）、ISO8601の日本時間で記載する |
| 1._3._4._2.? | height | 津波警報以上でまだ津波の観測値が小さい場合は出現しない | **Object**<br/> 津波の最大波を推定した値 |
| 1._3._4._2._1. | type |  | **String**<br/> 数値情報のタイプ、 `津波の高さ` で固定 |
| 1._3._4._2._2. | unit |  | **String**<br/> 数値情報の単位、 `m` で固定 |
| 1._3._4._2._3. | value |  | **String<Float\>\|Null**<br/> 津波の予想される高さ。定性的表現をする場合は **Null** とする |
| 1._3._4._2._4.? | over | 数値情報より大きいことを示す場合に出現 | **Boolean**<br/> 10m超となるときに出現し、数値情報を補助する<br/> 取りうる値は **true** のみ |
| 1._3._4._2._5.? | condition | 定性的表現がある場合 | **String**<br/> 津波の高さを定性的表現をする、津波注意報時は出現しない<br/>  取りうる値は `高い` 又は `巨大` |
|||
| 1._3._4._3.? | condition | 津波警報以上でまだ津波の観測値が小さい場合に出現する | **String**<br/> 取りうる値は `観測中` |
| 1._3._4._4.? | revise | 続報により新しく追加された場合や、<br/>更新された場合に出現する | **String**<br/> 津波のを推定した高さの更新フラグ<br/>  取りうる値は `追加` 又は `更新` |


### 4. comments

取消時や付加的な情報がない場合は出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1.? | free | 情報による | **String**<br/>その他の付加的な情報を自由形式で記載する |
| 4._2.? | warning | 情報による | **Object**<br/>津波や緊急地震速報に関する情報を固定付加文の形式で記載する [#4. 2. warning](#4-2-warning) |

#### 4. 2. warning

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._2._1. | text | | **String**<br/>固定付加文を記載する。複数ある場合は改行コード 0x0A を区切りに挿入する | 
| 4._2._2. | codes | | **Array<String<Integer\>\>**<br/>固定付加文をのコードを記載する <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による | 

## 取り扱い上の注意

[配信資料に関する技術情報 第484号 - 津波警報・注意報の切り替え時における運用改善について](https://dmdata.jp/doc/jma/technical/484.pdf)


## サンプル

### 東日本大震災の例

* [VTSE41 - 津波警報・注意報・予報a 定性的表現](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_jpos_20110311144959.json)
* [VTSE51 - 津波情報a 満潮時刻・到達予想時刻](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_jpos_20110311145046.json)
* [VTSE41 - 津波警報・注意報・予報a 沖合の津波観測による切り替え](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_jpos_20110311145300.json)
* [VTSE51 - 津波情報a 津波観測](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_jpos_20110311145927.json)
* [VTSE41 - 津波警報・注意報・予報a 数値表現に切り替え](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_jpos_20110311150000.json)
* [VTSE51 - 津波情報a 津波観測](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_jpos_20110311145927.json)
* [VTSE41 - 津波警報・注意報・予報a 沖合の津波観測による切り替え](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_jpos_20110311151200.json)
* [VTSE41 - 津波警報・注意報・予報a 津波注意報解除](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_jpos_20110313175818.json)


### 想定南海トラフ地震の例

* [VTSE41 - 津波警報・注意報・予報a 巨大地震](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_rjtd_20160901071300.json)
* [VTSE51 - 津波情報a 満潮時刻・到達予想時刻](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20160901071400.json)
* [VTSE52 - 沖合の津波観測に関する情報](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse52_rjtd_20160901071530.json)
* [VTSE51 - 津波情報a 津波観測](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20160901072000.json)
* [VTSE41 - 津波警報・注意報・予報a 数値表現に切り替え](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_rjtd_20160901072600.json)
* [VTSE51 - 津波情報a 満潮時刻・到達予想時刻](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20160901072700.json)
* [VTSE51 - 津波情報a 津波観測](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20160901074000.json)
* [VTSE51 - 津波情報a 津波観測](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20160901081000.json)
* [VTSE51 - 津波情報a 津波観測](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20160901091000.json)
* [VTSE41 - 津波警報・注意報・予報a 津波注意報解除](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_rjtd_20160901095500.json)
* [VTSE51 - 津波情報a 津波観測](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20160901095500.json)

### 2021/03/20 18:09 宮城県沖

* [VTSE41 - 津波警報・注意報・予報a 津波注意報](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_rjtd_20210320181112.json)
* [VTSE51 - 津波情報a 満潮時刻・到達予想時刻](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse51_rjtd_20210320181144.json)
* [VTSE41 - 津波警報・注意報・予報a 津波注意報解除](https://sample.dmdata.jp/conversion/json/schema/tsunami-information/vtse41_rjtd_20210320193018.json)
