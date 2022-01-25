---
title: Schema volcano-information v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [噴火警報・予報 (VFVO50)](/telegrams/vo01710.md)
* [火山の状況に関する解説情報 (VFVO51)](/telegrams/vo01720.md)
* [噴火に関する火山観測報 (VFVO52)](/telegrams/vo01730.md)
* [降灰予報（定時） (VFVO53)](/telegrams/vo01810.md)
* [降灰予報（速報） (VFVO54)](/telegrams/vo01820.md)
* [降灰予報（詳細） (VFVO55)](/telegrams/vo01830.md)
* [噴火速報 (VFVO56)](/telegrams/vo01750.md)
* [火山現象に関する海上警報・予報 (VFSVii (ii = 50-61))](/telegrams/vo01740.md)
* [火山に関するお知らせ (VZVO40)](/telegrams/vo01020.md)

## 共通ヘッダ

共通ヘッダは[こちら](/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- |
| 1.? | notice | 情報による | **String**<br/> 電文に関するお知らせ（訓練文であることなど）を自由文で記載する |
| 2.? | target | 取消時には出現しない<br/>VFVO51、VZVO40以外で出現 | **Object**<br/> 火山名や座標、火口などを記載する [#2. target](#2-target) |
| 3.? | targets |取消時には出現しない<br/> VFVO51でのみ出現 | **Array<Object\>**<br/> 火山名や座標、火口などを配列で記載する [#2. target](#2-target)  |
| 4.? | cities | 取消時には出現しない<br/>VFVO50、VFVO53、VFVO54、VFVO55、VFVO56で出現 | **Array<Object\>**<br/> 対象市町村における状況や、噴火警報・予報などの情報を記載する [#4. city](#4-city)  |
| 5.? | oceanZones | 取消時には出現しない<br/>VFSVii (ii = 50-61)で出現 | **Array<Object\>**<br/> 対象海上予報区での火山警報・予報情報を記載する [#5. oceanZones](#5-ocean-zones) |
| 6.? | disasterPreventions | 取消時には出現しない<br/>VFVO50で出現 | **Array<Object\>**<br/> 対象市町村での避難行動を記載する [#6. disasterPrevention](#6-disaster-prevention) |
| 7.? | eruption | 取消時には出現しない<br/>VFVO52、VFVO54、VFVO55、VFVO56で出現 | **Object**<br/> 噴火の情報 [#7. eruption](#7-eruption) |
| 8.? | comments | 取消時には出現しない<br/>VFVO52、VZVO40以外で出現、情報による | **Object**<br/> 火山関連情報等の内容 [#8. comments](#8-comments) |
| 9.? | ash | 取消時には出現しない<br/>VFVO53、VFVO54、VFVO55で出現 | **Object**<br/> 降灰情報 [#9. ash](#9-ash) |
| 10.? | text | VZVO40時・取消時の理由や、<br/>その他の追記事項がある場合に出現 | **String**<br/>自由形式で文章を記載する  |

---

### 2. target

火山の基本情報と噴火警報・予報の状況を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._1. | code | | **String<Integer\>**<br/> 火山コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 2._2. | name | | **String**<br/> 火山名 |
| 2._3. | coordinate | | **Object**<br/> 火山の空間座標  [Coordinate component](/reference/conversion/json/component.md#coordinate-component)を参照、高さ要素は常にあり  |
| 2._4.? | areaFromMark | 情報による | **String**<br/> 位置補足情報を記載 |
| 2._5.? | crater | VFVO52、VFVO53、VFVO54、VFVO55で出現<br/>火山や情報による | **Object**<br/> 火山の火口情報 [#2. 5. crater](#2-5-crater) |
| 2._6. | kind |  | **Object**<br/>噴火警報・予報等の種別 [#2. 6. kind](#2-6-kind)


#### 2. 5. crater

火山の火口についての名前及び座標を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._5._1. | name | | **String\|Null**<br/> 火口名。ない場合は**Null**とする |
| 2._5._2. | coordinate | | **Object**<br/> 火山の空間座標  [Coordinate component](/reference/conversion/json/component.md#coordinate-component)を参照、高さ要素は常にあり  |

#### 2. 6. kind

対象火山に発表している噴火警報・予報または現象、情報等の種別を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._6._1. | code |  | **String<Integer\>**<br/> 噴火警報・予報または現象、情報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 2._6._2. | name |  | **String**<br/> 噴火警報・予報または現象、情報等の種別名 |
| 2._6._3.? | condition | VFVO50、VFVO51、VFSVii (ii = 50-61)で出現 | **String**<br/> 噴火警報・予報等の、前回と今回の状況からの変化を記載 |
| 2._6._4.? | lastKind | 情報による | **Object**<br/> 前回発表した噴火警報・予報等の種別 |
| 2._6._4._1 | code |  | **String<Integer\>**<br/> 前回発表した噴火警報・予報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 2._6._4._2 | name |  | **String**<br/> 前回発表した噴火警報・予報等の種別名 |

---

### 4. city

対象市町村の情報を記載します。

この要素が出現する電文は、噴火警報・予報(VFVO50)、降灰予報(VFVO53, VFVO54, VFVO55)、噴火速報(VFVO56)です。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | code | | **String<Integer\>**<br/> 火山関連市町村コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 4._2. | name | | **String**<br/> 市町村名 |
| 4._3. | kinds |  | **Array<Object\>**<br/>状況や、噴火警報等の種別、VFVO50とVFVO56では配列の要素は必ず1つ [#4. 3. kind](#4-3-kind)

#### 4. 3. kind

対象市町村における状況や、噴火警報等の情報を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._3._1. | code |  | **String<Integer\>**<br/> 状況や、噴火警報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 4._3._2. | name |  | **String**<br/> 状況や、噴火警報等の種別名 |
| 4._3._3.? | condition | VFVO50で出現 | **String**<br/> 噴火警報・予報等の、前回と今回の状況からの変化を記載 |
| 4._3._4.? | lastKind | VFVO50で出現 | **Object**<br/> 前回発表した噴火警報等の種別 |
| 4._3._4._1. | code |  | **String<Integer\>**<br/> 前回発表した噴火警報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 4._3._4._2. | name |  | **String**<br/> 前回発表した噴火警報等の種別名 |

---

### 5. ocean zones

対象海上予報区の情報を記載します。

この要素が出現する電文は、火山現象に関する海上警報・予報 (VFSVii (ii = 50-61))です。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 5._1. | code | | **String<Integer\>**<br/> 火山現象に関する海上警報・海上予報区コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 5._2. | name | | **String**<br/> 火山現象に関する海上警報・海上予報区名 |
| 5._3. | kinds |  | **Array<Object\>**<br/>噴火警報・予報等の種別、配列の要素は必ず1つ [#5. 3. kind](#5-3-kind)

#### 5. 3. kind

対象海上予報区に発表している噴火警報・予報等の種別を表現します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 5._3._1. | code |  | **String<Integer\>**<br/> 噴火警報・予報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 5._3._2. | name |  | **String**<br/> 噴火警報・予報等の種別名 |
| 5._3._3. | condition |  | **String**<br/> 噴火警報・予報等の、前回と今回の状況からの変化を記載 |
| 5._3._4. | lastKind |  | **Object**<br/> 前回発表した噴火警報・予報等の種別 |
| 5._3._4._1 | code |  | **String<Integer\>**<br/> 前回発表した噴火警報・予報等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 5._3._4._2 | name |  | **String**<br/> 前回発表した噴火警報・予報等の種別名 |

---

### 6. disaster prevention

対象市町村への防災対応等を記載します。

この要素が出現する電文は、噴火警報・予報(VFVO50)です。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 6._1. | code | | **String<Integer\>**<br/> 火山関連市町村コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 6._2. | name | | **String**<br/> 市町村名 |
| 6._3. | kinds |  | **Array<Object\>**<br/>防災対応等の種別、要素は必ず1つ [#6. 3. kind](#4-3-kind)

#### 6. 3. kind

対象市町村への防災対応等を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 6._3._1. | code |  | **String<Integer\>**<br/> 防災対応等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 6._3._2. | name |  | **String**<br/> 防災対応等の種別名 |
| 6._3._3. | condition | | **String**<br/> 噴た防災対応等の、前回と今回の状況からの変化を記載 |
| 6._3._4. | lastKind |  | **Object**<br/> 前回発表した防災対応等の種別 |
| 6._3._4._1. | code |  | **String<Integer\>**<br/> 前回発表した防災対応等の種別コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 6._3._4._2. | name |  | **String**<br/> 前回発表した防災対応等の種別名 |

---

### 7. eruption

噴火の観測について記載します。

この要素が出現する電文は、噴火に関する火山観測報(VFVO52)、降灰予報(VFVO54, VFVO55)、噴火速報(VFVO56)です。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 7._1.? | eventDateTime | 不明時は出現しない | **Object**<br/> 噴火現象が発生した日時 [#7. 1. eventDateTime](#7-1-event-time) |
| 7._2.? | colorPlume | VFVO56では出現しない<br/>観測情報がない場合は出現しない | **Object**<br/> 有色噴煙情報 [#7. 2. plume](#7-2-plume) |
| 7._3.? | whitePlume | VFVO56では出現しない<br/>観測情報がない場合は出現しない | **Object**<br/> 白色噴煙情報 [#7. 2. plume](#7-2-plume) |
| 7._4.? | appendix | VFVO56では出現しない<br/>情報による | **String**<br/> 噴火警戒レベルなどの捕捉について文章で記載する  |
| 7._5.? | otherObservation | VFVO56では出現しない<br/>情報による | **String**<br/> 自由文で他の火山現象等を記載する |

#### 7. 1. event time

噴火現象が発生した日時を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 7._1._1. | value |  | **ISO8601Time**<br/> 現象が発生した日時 |
| 7._1._2. | validFormat |  | **String**<br/> 日時が有効な範囲をフォーマットとして記載する |
| 7._1._3.? | dubious | 情報による | **String**<br/> 日時があいまいであることとして`頃`を記載する |

#### 7. 2. plume

噴煙について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 7._2._1.? | heightAboveCrater | 情報による | **Object**<br/> 火口上噴煙高度 [#7. 2. 1. heightAboveCrater](#7-2-1-height-above-crater) |
| 7._2._2.? | heightSeaLevel | 情報による | **Object**<br/> 海抜噴煙高度 [#7. 2. 2. heightSeaLevel](#7-2-2-height-sea-level) |
| 7._2._3.? | direction | 情報による | **Object**<br/> 噴煙の流向 [#7. 2. 3. direction](#7-2-3-direction) |
| 7._2._4.? | comment | 情報による | **String**<br/> 現象の内容と時刻を説明を記載する |

#### 7. 2. 1. height above crater

火口上噴煙高度について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 7._2._1._1. | type |  | **String**<br/> 数値情報のタイプ、撮りうる値は `火口上噴煙高度` または `海面上噴煙高度` |
| 7._2._1._2. | unit |  | **String**<br/> 数値情報の単位、 `m` で固定 |
| 7._2._1._3. | value |  | **String<Integer\>\|Null**<br/> 火口上からの噴煙高度または海面上からの噴煙高度。噴煙なし・不明時の場合は **Null** とする |
| 7._2._1._4.? | condition | 情報による | **String**<br/> 取りうる値は `以上`、`噴煙なし`、`不明` とする |

#### 7. 2. 2. height sea level

海抜噴煙高度について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 7._2._2._1. | type |  | **String**<br/> 数値情報のタイプ、 `海抜噴煙高度` で固定 |
| 7._2._2._2. | unit |  | **String**<br/> 数値情報の単位、 `ft` で固定 |
| 7._2._2._3. | value |  | **String<Integer\>\|Null**<br/> 海抜からの噴煙高度。噴煙なし・明時の場合は **Null** とする |
| 7._2._2._4.? | condition | 情報による | **String**<br/> 取りうる値は `以上`、`噴煙なし`、`不明` とする |

#### 7. 2. 3. direction

噴煙の流向について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 7._2._3._1. | type |  | **String**<br/> 情報のタイプ、 `噴煙の流向` で固定 |
| 7._2._3._2. | unit |  | **String**<br/> 情報の単位、 `漢字` で固定 |
| 7._2._3._3. | value |  | **String**<br/> 流向8方位または `直上`、`流向不明`、`噴煙なし`とする |
| 7._2._3._4.? | condition | 噴煙なしの場合 | **String**<br/> `噴煙なし` とする |

---

### 8. comments

取消時や付加的な情報がない場合は出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 8._1.? | headline | 情報による | **String**<br/> 対象火山の概況等について文章で記載する  |
| 8._2.? | activity | 情報による | **String**<br/> 対象火山の活動状況について文章で記載する  |
| 8._3.? | prevention | 情報による | **String**<br/> 防災上の警戒事項について文章で記載する  |
| 8._4.? | nextAdvisor | 情報による | **String**<br/> 次の情報発表日時について文章で記載する  |
| 8._5.? | otherInfo | 情報による | **String**<br/> その他、必要がある事項について文章で記載する  |
| 8._6.? | appendix | 情報による | **String**<br/> 噴火警戒レベルなどの捕捉について文章で記載する  |
| 8._7.? | text | 情報による | **String**<br/> 自由文形式で訂正の内容等、追加的に記載する必要がある場合に、本要素を用いて記載する  |

---

### 9. ash

降灰について記載します。

この要素が出現する電文は、降灰予報(VFVO53, VFVO54, VFVO55)です。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1. | forecasts | | **Array<Object\>**<br/> 降灰予報について時系列で記載する  |

#### 9. 1. forecast

降灰予報について記載します。

この要素が出現する電文は、降灰予報(VFVO53, VFVO54, VFVO55)です。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1._1. | type | | **String**<br/> 時系列において種類を示す、`予報`で固定  |
| 9._1._2. | elapsedTime | | **String**<br/> 時系列において基準時からの経過時間を、ISO8601 の Time intervals 形式で表す |
| 9._1._3. | sateTime | | **ISO8601Time**<br/> 対象とする予報の開始時間  |
| 9._1._4. | endTime | | **ISO8601Time**<br/> 対象とする予報の終了時間  |
| 9._1._5. | items | | **Array<Object\>**<br/> この時系列における詳細予報を記載する  |

#### 9. 1. 5. item

対象時系列における詳細予報（噴煙、噴石）について記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1._5._1. | code | | **String**<br/> 予報をする現象コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による  |
| 9._1._5._2. | name | | **String**<br/> 予報をする現象名 |
| 9._1._5._3. | polygons | | **Array<Array<Array<Float\>\>\>**<br/> 現象の影響域をpolygonで表す |
| 9._1._5._4. | size | 現象の量や大きさを<br/>予報するときに出現 | **Object**<br/> 噴煙の量や、噴石の量や大きさを記載する [#9. 1. 5. 4. size](#9-1-5-4-size) |
| 9._1._5._5. | direction | | **Object**<br/> 影響範囲の方向 [#9. 1. 5. 5. direction](#9-1-5-5-direction) |
| 9._1._5._6. | distance | | **Object**<br/> 影響範囲の距離 [#9. 1. 5. 6. distance](#9-1-5-6-distance) |
| 9._1._5._7.? | remark | 情報による | **String**<br/> 注意事項・付加事項を記載する |
| 9._1._5._8. | cities | | **Object**<br/> 影響を受ける市町村 [#9. 1. 5. 8. city](#9-1-5-8-city) |

#### 9. 1. 5. 4. size

噴煙の量や、噴石の量や大きさを記載します。

予報のする現象が、`多量の降灰`、`やや多量の降灰`、`少量の降灰`である場合は、`降灰量`又は`降灰の厚さ`を表し、
`小さな噴石の落下`である場合は、`小さな噴石の大きさ `を表します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1._5._4._1. | type |  | **String**<br/> 数値情報のタイプ、取りうる値は `降灰量`、`降灰の厚さ`、`小さな噴石の大きさ` |
| 9._1._5._4._2. | unit |  | **String**<br/> 数値情報の単位、取りうる値は `g/m2`、`mm`、`cm` |
| 9._1._5._4._3. | value |  | **String<Float\>**<br/> 数値情報 |

#### 9. 1. 5. 5. direction

影響範囲の方向を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1._5._5._1. | type |  | **String**<br/> 情報のタイプ、取りうる値は `降灰の方向`、`小さな噴石の落下方向` |
| 9._1._5._5._2. | unit |  | **String**<br/> 情報の単位、 `漢字` で固定 |
| 9._1._5._5._3. | value |  | **String**<br/> 8方位または `火口近傍`、`方向不定`とする  |

#### 9. 1. 5. 6. distance

影響範囲の距離を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1._5._6._1. | type |  | **String**<br/> 数値情報のタイプ、取りうる値は `降灰の到達距離`、`小さな噴石の到達距離` |
| 9._1._5._6._2. | unit |  | **String**<br/> 数値情報の単位、 `km` で固定 |
| 9._1._5._6._3. | value |  | **String<Float\>**<br/> 数値情報 |

#### 9. 1. 5. 8. city

影響を受ける市町村を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 9._1._5._8._1. | code | | **String<Integer\>**<br/> 火山関連市町村コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 9._1._5._8._2. | name | | **String**<br/> 市町村名 |

---

## サンプル

### 噴火警報・予報

* [VFVO50 - 有珠山　噴火警報（噴火警戒レベル２）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpsp_20000328005000.json)
* [VFVO50 - 有珠山　噴火警報（噴火警戒レベル３）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpsp_20000328025000.json)
* [VFVO50 - 有珠山　噴火警報（噴火警戒レベル４）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpsp_20000328115503.json)
* [VFVO50 - 有珠山　噴火警報（噴火警戒レベル５）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpsp_20000329111005.json)


* [VFVO50 - 桜島　噴火警報（噴火警戒レベル５）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpfk_20170101120030.json)
* [VFVO50 - 桜島　噴火警報（噴火警戒レベル３）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpfk_20170102120020.json)
* [VFVO50 - 桜島　噴火警報（噴火警戒レベル５）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpfk_20170103120010.json)
* [VFVO50 - 桜島　噴火警報（噴火警戒レベル５）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpfk_20170105120012.json)


* [VFVO50 - 霧島山（御鉢）　噴火警報（噴火警戒レベル５）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpfk_20170104120005.json)
* [VFVO50 - 霧島山（御鉢）　噴火警報（噴火警戒レベル１）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpfk_20170106120006.json)


* [VFVO50 - 肘折　火口周辺警報（火口周辺危険）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpsn_20191028110532.json)
* [VFVO50 - 肘折　火口周辺警報（入山危険）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpsn_20191028134142.json)
* [VFVO50 - 肘折　噴火警報（居住地域厳重警戒）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_jpsn_20191028140745.json)
* [VFVO50 - 福徳岡ノ場　噴火予報（活火山であることに留意）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_rjtd_20130227134304.json)
* [VFVO50 - 福徳岡ノ場　噴火警報（周辺海域）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo50_rjtd_20130227160000.json)

### 火山の状況に関する解説情報

* [VFVO51 - 有珠山　火山の状況に関する解説情報（臨時）　第１号](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo51_jpsp_20000328111009.json)
* [VFVO51 - 有珠山　火山の状況に関する解説情報　第２号](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo51_jpsp_20000331131008.json)
* [VFVO51 - 全国の活火山　火山の状況に関する解説情報　第１３号](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo51_rjtd_20151008160013.json)

### 噴火に関する火山観測報

* [VFVO52 - 桜島　噴火に関する火山観測報　第１号](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo52_jpfk_20170102204010.json)
* [VFVO52 - 霧島山（御鉢）　噴火に関する火山観測報　第１号](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo52_jpfk_20170104090215.json)
* [VFVO52 - 有珠山　噴火に関する火山観測報　第１号](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo52_jpsp_20000331131200.json)
* [VFVO52 - 有珠山　噴火に関する火山観測報　第１号](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo52_jpsp_20000331140300.json)

### 降灰予報

* [VFVO53 - 桜島　降灰予報（定時）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo53_rjtd_20210219140000.json)
* [VFVO54 - 桜島　降灰予報（速報）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo54_rjtd_20210219133500.json)
* [VFVO55 - 桜島　降灰予報（詳細）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo55_rjtd_20210219135500.json)

### 噴火速報

* [VFVO56 - 御嶽山　噴火速報](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo56_rjtd_20140927120012.json)
* [VFVO56 - 御嶽山　噴火速報（取消）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfvo56_rjtd_20140927121012.json)

### 火山現象に関する海上警報・海上予報

* [VFSV50 - 桜島　周辺海域警戒](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfsvii_rjtd_20170103120022.json)
* [VFSV50 - 桜島　活火山であることに留意（海底火山）](https://sample.dmdata.jp/conversion/json/schema/volcano-information/vfsvii_rjtd_20170105120025.json)
