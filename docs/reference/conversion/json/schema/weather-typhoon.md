---
title: Schema weather-typhoon v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [台風解析・予報情報電文（５日進路・強度予報） (VPTWii (ii=60-65))](/telegrams/we02670.md)

## 共通ヘッダ

共通ヘッダは[こちら](/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1. | typhoon |  | **Object**<br/> 台風・熱帯低気圧等に関する諸情報を記載する [#1. typhoon](#1-typhoon) |
| 2. | forecasts |  | **Array<Object\>**<br/> 台風・熱帯低気圧等の実況・推定・予報情報を記載する [#2. forecast](#2-forecast)  |

### 1. typhoon

台風・熱帯低気圧等に関する諸情報を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1. | tcNumber | | **String**<br/> TC番号、熱帯擾乱低気圧ごとに付与される識別番号 |
| 1._2. | name | | **Object**<br/> 台風等の名称 |
| 1._2._1. | text | | **String\|Null**<br/> 台風・ハリケーンなどの英名称<br/>台風などに一度も成っていないく、名称付与がされていない熱帯擾乱低気圧は**Null**とする |
| 1._2._2. | kana | | **String\|Null**<br/> 台風・ハリケーンなどのカナ名称<br/>台風などに一度も成っていないく、名称付与がされていない熱帯擾乱低気圧は**Null**とする
| 1._2._3. | number | | **String\|Null**<br/> 台風番号<br/>台風に一度も成っていないく、台風番号付与がされていない熱帯擾乱低気圧は**Null**とする |
|||
| 1._3. | remark | | **String\|Null**<br/> 注意事項・付加事項を示す<br/>取りうる値は、`台風発生`、`台風発生（域外から入る）`、`台風消滅（域外へ出る）`、<br/>`台風消滅（温帯低気圧化）`、`台風消滅（熱帯低気圧化）`、`台風発生の可能性が小さくなった`、<br/>`発表間隔変更（毎時から３時間毎）`、`発表間隔変更（3時間毎から毎時）`、<br/>`台風発生予報`、`温帯低気圧化しつつある`|

### 2. forecast

台風・熱帯低気圧等の実況・推定・予報情報を記載します。

台風消滅時や台風発生の可能性が小さくなった場合は実況のみ出現します。

また発表間隔が毎時となっているとき、00時、03時、06時、09時、12時、15時、18時、21時の観測時刻以外の場合は実況と推定のみ出現します。

00時、06時、12時、18時の観測に基づく5日先までの強度予報・進路予報のうち、2日先以降の予報は、3時間前の観測に基づく、48時間、72時間、96時間、120時間予報をそれぞれ、45時間、69時間、93時間、117時間予報として発表されます。


| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._1. | type | | **String**<br/> 実況・推定・予報を区別しする<br/>取りうる値は、`実況`、`推定`、`予報`|
| 2._2. | elapsedTime | | **String**<br/> 解析基準時刻からの時間経過を ISO8601 の Time intervals 形式で表す |
| 2._3. | dateTime |  | **ISO8601**<br/> 実況・推定・予報をする日時、実況では解析基準時刻とする |
| 2._4. | classification |  | **Object**<br/> 台風の階級・大きさ・強さを記載する [2. 4. classification](#2-4-classification) |
| 2._5. | center |  | **Object**<br/> 台風の所在位置、移動速度・方角、中心気圧、予報円を記載する [2. 5. center](#2-5-center)  |
| 2._6.? | wind | 台風予報終了時<br/>などは出現ことがある | **Object**<br/> 台風の最大風速・最大瞬間風速、強風域・暴風域、暴風警戒域を記載する [2. 6. wind](#2-6-wind)  |

#### 2. 4. classification

台風の階級・大きさ・強さを記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._4._1. | category |  | **String**<br/> 熱帯擾乱低気圧の階級<br/>取りうる値は、`TY`、`STS`、`TS`、`TD`、`Hurricane`、`Tropical Storm`、`LOW` |
| 2._4._2. | name |  | **String**<br/> 熱帯擾乱低気圧の階級名称<br/>取りうる値は、`台風`、`熱帯低気圧`、`ハリケーン`、`発達した熱帯低気圧`、`温帯低気圧` |
| 2._4._3.? | area | 実況・推定で出現する | **String\|Null**<br/> 台風の大きさ<br/>取りうる値は、`大型`、`超大型` |
| 2._4._4. | intensity |  | **String\|Null**<br/> 台風の強さ<br/>取りうる値は、`強い`、`非常に強い`、`猛烈な` |

#### 2. 5. center

台風の所在位置、移動速度・方角、中心気圧、予報円を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._5._1. | location |  | **String\|Null**<br/> 台風の存在域 |
| 2._5._2.? | coordinate | 実況・推定で出現する | **Object**<br/> 台風の存在空間座標  [#Coordinate component](/reference/conversion/json/component.md#coordinate-component)を参照<br/> Coordinate 内の condition は中心位置精度を記載する、`正確`、`ほぼ正確`、`不正確`または記述無し |
| 2._5._3.? | probabilityCircle | 予報で出現する | **Object**<br/> 台風の予報円について記載する |
| 2._5._3._1. | basePoint |  | **String\|Null**<br/> 予報円の中心座標  [#Coordinate component](/reference/conversion/json/component.md#coordinate-component)を参照 |
| 2._5._3._2. | axes |  | **Array<Object\>**<br/> 予報円の半径を記載する、要素は常に1つで固定 |
| 2._5._3._2._1. | direction |  | **Object**<br/> 予報円半径のずれを方角で示す |
| 2._5._3._2._1._1. | type |  | **String**<br/> 方角の種別、`方向`で固定 |
| 2._5._3._2._1._2. | unit |  | **String**<br/> 方角の単位、`８方位漢字`で固定 |
| 2._5._3._2._1._3. | value |  | **Null**<br/> 方角、**Null**で固定 |
| 2._5._3._2._1._4. | azimuth |  | **String**<br/> 方位角、**Null**で固定 |
| 2._5._3._2._1._5. | condition |  | **String**<br/> その他付加事項、`全域`で固定 |
|||
| 2._5._3._2._2. | radius |  | **Object**<br/> 予報円半径を示す |
| 2._5._3._2._2._1. | type |  | **String**<br/> 半径の種別、`７０パーセント確率半径`で固定 |
| 2._5._3._2._2._2. | unit |  | **String**<br/> 半径の単位、`km`で固定 |
| 2._5._3._2._2._3. | value |  | **String<Integer\>**<br/> 半径 |
|||
|||
| 2._5._4. | direction |  | **Object**<br/> 台風の移動方向を記載する |
| 2._5._4._1. | type |  | **String**<br/> 方角の種別、`移動方向`で固定 |
| 2._5._4._2. | unit |  | **String**<br/> 方角の単位、`１６方位漢字`で固定 |
| 2._5._4._3. | value |  | **String\|Null**<br/> 方角、`北`～`北北東`～`北東`～`東北東`などと記載する<br/>移動方向が特定できない場合は**Null**とする |
| 2._5._4._4. | azimuth |  | **String<Float\>\|Null**<br/> 方位角、`0`を北とし角度記載する<br/>移動方向が特定できない場合は**Null**とする |
| 2._5._4._5.? | condition | 情報による | **String**<br/> 移動方向が特定できない場合は`不定`と記載する |
|||
| 2._5._5. | speed |  | **Object**<br/> 台風の移動速度を記載する |
| 2._5._5._1. | type |  | **String**<br/> 速度の種別、`移動速度`で固定 |
| 2._5._5._2. | unit |  | **String**<br/> 速度の単位、`km/h`で固定 |
| 2._5._5._3. | value |  | **String<Integer\>\|Null**<br/> 速度を記載する<br/>移動が遅く速度が特定できない場合は**Null**とする |
| 2._5._5._4.? | condition | 情報による | **String**<br/> 移動速度が特定できない場合は`ゆっくり`または`ほとんど停滞`と記載する |
|||
| 2._5._6. | pressure |  | **Object**<br/> 台風の気圧を記載する |
| 2._5._6._1. | type |  | **String**<br/> 気圧の種別、`中心気圧`で固定 |
| 2._5._6._2. | unit |  | **String**<br/> 気圧の単位、`hPa`で固定 |
| 2._5._6._3. | value |  | **String<Integer\>**<br/> 気圧を記載する |

#### 2. 6. wind

台風の最大風速・最大瞬間風速、強風域・暴風域、暴風警戒域を記載します。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 2._6._1. | average |  | **Object**<br/> 最大風速を記載する |
| 2._6._1._1. | type |  | **String**<br/> 風速の種別、`最大風速`で固定 |
| 2._6._1._2. | unit |  | **String**<br/> 風速の単位、`m/s`で固定 |
| 2._6._1._3. | value |  | **String<Integer\>**<br/> 風速を記載する |
| 2._6._1._4.? | condition | 情報による | **String**<br/> 最大風速の区分を示す、`中心付近`、`中心付近を除く`、`なし`または記述しない |
|||
| 2._6._2. | instantaneous |  | **Object**<br/> 最大瞬間風速を記載する |
| 2._6._2._1. | type |  | **String**<br/> 風速の種別、`最大瞬間風速`で固定 |
| 2._6._2._2. | unit |  | **String**<br/> 風速の単位、`m/s`で固定 |
| 2._6._2._3. | value |  | **String<Integer\>**<br/> 風速を記載する |
|||
| 2._6._3.? | area | 場合により出現しない | **Object**<br/> 強風域・暴風域または暴風警戒域を記載する |
| 2._6._3._1.? | storm | 実況・推定で出現する | **Array<Object\>**<br/> 強風域を記載する<br/>強風域がない場合は要素は0個、ある場合は1個、強風域が台風中心からずれている場合は2個出現する |
| 2._6._3._1._1. | direction |  | **Object**<br/> 台風中心位置からの強風域半径のずれを方角で示す |
| 2._6._3._1._1._1. | type |  | **String**<br/> 方角の種別、`方向`で固定 |
| 2._6._3._1._1._2. | unit |  | **String**<br/> 方角の単位、`８方位漢字`で固定 |
| 2._6._3._1._1._3. | value |  | **String\|Null**<br/> 方角、中心からずれていない場合は**Null**とする |
| 2._6._3._1._1._4. | azimuth |  | **String<Integer\>\|Null**<br/> 方位角、中心からずれていない場合は**Null**とする |
| 2._6._3._1._1._5.? | condition | 情報による | **String**<br/> その他付加事項、中心からずれていない場合は`全域`で固定 |
|||
| 2._6._3._1._2. | radius |  | **Object**<br/> 強風域半径を示す |
| 2._6._3._1._2._1. | type |  | **String**<br/> 半径の種別、`半径`で固定 |
| 2._6._3._1._2._2. | unit |  | **String**<br/> 半径の単位、`km`で固定 |
| 2._6._3._1._2._3. | value |  | **String<Integer\>**<br/> 半径 |
|||
|||
| 2._6._3._2.? | strong | 実況・推定で出現する | **Array<Object\>**<br/> 暴風域を記載する<br/>暴風域がない場合は要素は0個、ある場合は1個、暴風域が台風中心からずれている場合は2個出現する |
| 2._6._3._2._1. | direction |  | **Object**<br/> 台風中心位置からの暴風域半径のずれを方角で示す |
| 2._6._3._2._1._1. | type |  | **String**<br/> 方角の種別、`方向`で固定 |
| 2._6._3._2._1._2. | unit |  | **String**<br/> 方角の単位、`８方位漢字`で固定 |
| 2._6._3._2._1._3. | value |  | **String\|Null**<br/> 方角、中心からずれていない場合は**Null**とする |
| 2._6._3._2._1._4. | azimuth |  | **String<Integer\>\|Null**<br/> 方位角、中心からずれていない場合は**Null**とする |
| 2._6._3._2._1._5.? | condition | 情報による | **String**<br/> その他付加事項、中心からずれていない場合は`全域`で固定 |
|||
| 2._6._3._2._2. | radius |  | **Object**<br/> 暴風域半径を示す |
| 2._6._3._2._2._1. | type |  | **String**<br/> 半径の種別、`半径`で固定 |
| 2._6._3._2._2._2. | unit |  | **String**<br/> 半径の単位、`km`で固定 |
| 2._6._3._2._2._3. | value |  | **String<Integer\>**<br/> 半径 |
|||
|||
| 2._6._3._3.? | stormWarning | 予報で出現する | **Array<Object\>**<br/> 暴風警戒域を記載する<br/>暴風警戒域がない場合は要素は0個、ある場合は1個出現する |
| 2._6._3._3._1. | direction |  | **Object**<br/> 台風中心位置からの暴風警戒域半径のずれを方角で示す |
| 2._6._3._3._1._1. | type |  | **String**<br/> 方角の種別、`方向`で固定 |
| 2._6._3._3._1._2. | unit |  | **String**<br/> 方角の単位、`８方位漢字`で固定 |
| 2._6._3._3._1._3. | value |  | **Null**<br/> 方角、**Null**で固定 |
| 2._6._3._3._1._4. | azimuth |  | **String**<br/> 方位角、**Null**で固定 |
| 2._6._3._3._1._5. | condition |  | **String**<br/> その他付加事項、`全域`で固定 |
|||
| 2._6._3._3._2. | radius |  | **Object**<br/> 暴風警戒域半径を示す |
| 2._6._3._3._2._1. | type |  | **String**<br/> 半径の種別、`半径`で固定 |
| 2._6._3._3._2._2. | unit |  | **String**<br/> 半径の単位、`km`で固定 |
| 2._6._3._3._2._3. | value |  | **String<Integer\>**<br/> 半径 |


## 取り扱い上の注意

発表された情報は約1時間有効であり、続報の発表をもって継続となります。 失効時刻は、共通ヘッダを必ず参照してください。

## この電文で取り扱うコード類

コードは、[typhoon-name-table_2020.xlsx(Download)](https://dmdata.jp/doc/jma/code/typhoon-name/typhoon-name-table_2020.xlsx)に記載があります。

## サンプル

* [VPTW60 - 台風解析・予報情報（TC201725）　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20170909042907.json)
* [VPTW60 - 台風解析・予報情報（TC201725）　第１１号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20170910095153.json)
* [VPTW60 - 台風解析・予報情報（TC201725）　第５５号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20170913214139.json)
* [VPTW60 - 台風解析・予報情報（TC201725）　第５８号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20170914004235.json)
* [VPTW60 - 台風解析・予報情報（TC201725）　第１４３号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20170918214907.json)
* [VPTW60 - 台風解析・予報情報（TC201730）　第３号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20171016094753.json)
* [VPTW60 - 台風解析・予報情報（TC201925）　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20191005101416.json)
* [VPTW60 - 台風解析・予報情報（TC202001）　第３号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20200928154711.json)
* [VPTW60 - 台風解析・予報情報（TC202001）　第３号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20200928155211.json)
* [VPTW60 - 台風解析・予報情報（TC202001）　第３号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw60_rjtd_20200928155811.json)
* [VPTW61 - 台風解析・予報情報（TC202002）　第５号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw61_rjtd_20200930160712.json)
* [VPTW62 - 台風解析・予報情報（TC202003）　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-typhoon/vptw62_rjtd_20200930102242.json)
