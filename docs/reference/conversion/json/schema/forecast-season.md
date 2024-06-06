---
title: Schema forecast-season v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [全般季節予報 (VPZK50)](/docs/telegrams/fo03210.md)
* [地方季節予報 (VPCK50)](/docs/telegrams/fo03220.md)

## 共通ヘッダ

共通ヘッダは[こちら](/docs/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

| 階層  | フィールド            | 出現条件                 | 説明                                                                                   | 
|-----|------------------|----------------------|--------------------------------------------------------------------------------------|
| 1.? | notice           | お知らせがある場合            | **String**<br/> お知らせを記載する                                                            |
| 2.  | target           |                      | **Object**<br/> 電文が対象とする地域を記載する  [#2. target](#2-target)                             |
| 3.  | seasons          |                      | **Array&lt;Object&gt;**<br/> 季節予報の内容に関する事項を記載する  [#3. season](#3-season)             |
| 4.? | timeSeries       | 暖候期予報・寒候期予報の場合は出現しない | **Array&lt;Object&gt;**<br/> 予報対象地域の時系列で表現した予報を記載する  [#4. timeSeries](#4-timeseries) |
| 5.  | forecastAddition |                      | **Object**<br/> 季節予報の付加事項を記載する  [#5. forecastAddition](#5-forecast-addition)         |

### 2. target

電文が対象とする全国・地方予報区等を記載します。

| 階層    | フィールド | 出現条件 | 説明                                             |
|-------|-------|------|------------------------------------------------|
| 2._1. | code  |      | **String&lt;Integer&gt;**<br/> 全国・地方予報区等の地域コード |
| 2._2. | name  |      | **String**<br/> 全国・地方予報区等の地域名                  |

### 3. season

各期間を通した地域の予報内容、予想確率・確率文等を記載します。

| 階層          | フィールド       | 出現条件 | 説明                                                                                        |
|-------------|-------------|------|-------------------------------------------------------------------------------------------|
| 3._1.       | type        |      | **String**<br/> `季節予報` で固定                                                                |
| 3._2.       | period      |      | **Object**<br/> 予報・観測基点時刻                                                                 |
| 3._2._1.    | dateTime    |      | **Object**<br/> 予報・観測基点時刻                                                                 |
| 3._2._1._1. | value       |      | **ISO8601Time**<br/> 日時（日までが有効）                                                           |
| 3._3._1._2. | validFormat |      | **String**<br/> 日時が有効な範囲をフォーマットとして記載する                                                    |
|             |             |
| 3._3._2.    | duration    |      | **String**<br/> 基点時刻からの期間の長さを、 ISO8601 の Time intervals 形式で表す                             |
| 3._3._3.    | name        |      | **String**<br/> 予報期間の文字表現を記載する                                                            |
|             |             |      |                                                                                           |
| 3._4.       | items       |      | **Array&lt;Object&gt;**<br/> 概況文・特徴のある確率文、予報要素・確率値を各地域の各要素毎に記載する [#3. 4. item](#3-4-item) |

#### 3. 4. item

概況文・特徴のある確率文、予報要素・確率値を各地域の各要素毎を記載します。

##### 概況文・特徴のある確率文の場合

この item 要素は、1つのみ items の最初に記載します。

| 階層                | フィールド         | 出現条件              | 説明                                                      |
|-------------------|---------------|-------------------|---------------------------------------------------------|
| 3._4._1.?         | kinds         | 概況文・特徴のある確率文がある場合 | **Array&lt;Object&gt;**<br/> 概況文・特徴のある確率文を記載する、要素は1つのみ  |
| 3._4._1._1.       | type          |                   | **String**<wbr/> `出現の可能性が最も大きい天候と、特徴のある気温、降水量等の確率` で固定  |
| 3._4._1._2.       | summaries     |                   | **Array&lt;Object&gt;**<wbr/> 概況文・特徴のある確率文を記載する、要素は0か1つ |
| 3._4._1._2._1.?   | text          | 場合による             | **String**<wbr/> 出現の可能性が最も大きい天候の平文表現を記載する               |
| 3._4._1._2._2.    | significances |                   | **Array&lt;Object&gt;**<wbr/> 概況文・特徴のある確率文を各要素ごとに記載する   |
| 3._4._1._2._2._1. | type          |                   | **String**<wbr/> `気温`、`降水量`、`日照時間` または `降雪量`            |
| 3._4._1._2._2._2. | value         |                   | **String**<wbr/> 概況文・特徴のある確率文の平文表現を記載する                 |
|                   |               |                   |                                                         |
| 3._4._2.?         | zones         | 概況文・特徴のある確率文がある場合 | **Array&lt;Object&gt;**<br/> 対象の地域、要素は1つのみ              |
| 3._4._2._1.       | code          |                   | **String&lt;Integer&gt;**<br/> 全国・地方予報区等の地域コード          |
| 3._4._2._2.       | name          |                   | **String**<br/> 全国・地方予報区等の地域名                           |
|                   |               |                   |                                                         |
| 3._4._3.?         | condition     | 概況文・特徴のある確率文がない場合 | **String**<br/> `要素なし` と記載する                            |

##### 予報要素・確率値の場合

この item 要素は、0個以上 items の2番目以降に記載します。

| 階層                | フィールド         | 出現条件         | 説明                                                  |
|-------------------|---------------|--------------|-----------------------------------------------------|
| 3._4._1.          | kinds         |              | **Array&lt;Object&gt;**<br/> 予報要素・確率値を記載する、要素は1つのみ  |
| 3._4._1._1.       | type          |              | **String**<wbr/> `地域・期間平均平年偏差各階級の確率` で固定            |
| 3._4._1._2.       | probabilities |              | **Array&lt;Object&gt;**<wbr/> 予報要素・確率値を記載する、要素は1つのみ |
| 3._4._1._2._1.    | type          |              | **String**<wbr/> `気温`、`降水量`、`日照時間` または `降雪量`        |
| 3._4._1._2._2.    | belowNormal   |              | **Object;**<wbr/> 平年より低い・少ない確率                      |
| 3._4._1._2._2._1. | type          |              | **String**<wbr/> `平年より低い確率` または `平年より少ない確率`         |
| 3._4._1._2._2._2. | unit          |              | **String**<wbr/> `%` で固定                            |
| 3._4._1._2._2._3. | value         |              | **String&lt;Integer&gt;**<wbr/> 確率                  |
| 3._4._1._2._2._4. | significant   | 特徴のある確率である場合 | **Boolean**<wbr/> **True** のみとする                    |
|                   |               |              |                                                     |
| 3._4._1._2._2.    | norma         |              | **Object;**<wbr/> 平年並みの確率                           |
| 3._4._1._2._2._1. | type          |              | **String**<wbr/> `平年並みの確率` で固定                      |
| 3._4._1._2._2._2. | unit          |              | **String**<wbr/> `%` で固定                            |
| 3._4._1._2._2._3. | value         |              | **String&lt;Integer&gt;**<wbr/> 確率                  |
| 3._4._1._2._2._4. | significant   | 特徴のある確率である場合 | **Boolean**<wbr/> **True** のみとする                    |
|                   |               |              |                                                     |
| 3._4._1._2._2.    | aboveNormal   |              | **Object;**<wbr/> 平年より高い・多い確率                       |
| 3._4._1._2._2._1. | type          |              | **String**<wbr/> `平年より高い確率` または `平年より多い確率`          |
| 3._4._1._2._2._2. | unit          |              | **String**<wbr/> `%` で固定                            |
| 3._4._1._2._2._3. | value         |              | **String&lt;Integer&gt;**<wbr/> 確率                  |
| 3._4._1._2._2._4. | significant   | 特徴のある確率である場合 | **Boolean**<wbr/> **True** のみとする                    |
|                   |               |              |                                                     |
| 3._4._2.          | zones         |              | **Array&lt;Object&gt;**<br/> 対象の地域、要素は1つのみ          |
| 3._4._2._1.       | code          |              | **String&lt;Integer&gt;**<br/> 全国・地方予報区等の地域コード      |
| 3._4._2._2.       | name          |              | **String**<br/> 全国・地方予報区等の地域名                       |

### 4. timeSeries

各地域の予報内容、予想確率・確率文等を時系列で記載します。

| 階層       | フィールド       | 出現条件 | 説明                                                                                                        | 
|----------|-------------|------|-----------------------------------------------------------------------------------------------------------|
| 4._1.    | timeSeries  |      | **Array&lt;Object&gt;**<br/> 各地域の予報内容、予想確率・確率文等を時系列で記載する、要素は1つのみ                                          |
| 4._1._1. | timeDefines |      | **Array&lt;Object&gt;**<br/> 全ての予想期間を示すとともに、対応する要素の個々の時刻定義を記載する [#4. 1. 1. timeDefine](#4-1-1-timedefine) |
| 4._1._2. | items       |      | **Array&lt;Object&gt;**<br/> 予報内容、予想確率・確率文等の内容と地域を記載する [#4. 1. 2. item](#4-1-2-item)                      |

#### 4. 1. 1. timeDefine

時系列の予報で参照番号として用いるための時刻 ID をフィールド timeId で記述し、基点時刻、対象期間、時刻定義の内容を記載します。

| 階層          | フィールド    | 出現条件 | 説明                                                             |
|-------------|----------|------|----------------------------------------------------------------|
| 4._1._1._1. | timeId   |      | **String&lt;Integer&gt;**<br/> 時刻ID                            |
| 4._1._1._2. | dateTime |      | **ISO8601Time**<br/> 予想する基準日時                                  |
| 4._1._1._3. | duration |      | **String**<br/> 基準日時からの予想時間の幅を、 ISO8601 の Time intervals 形式で表す |
| 4._1._1._4. | name     |      | **String**<br/> 時刻定義の内容                                        |

#### 4. 1. 2. item

概況文・特徴のある確率文、予報要素・確率値を各地域の各要素毎を記載します。

##### 概況文・特徴のある確率文の場合

この item 要素は、1つのみ items の最初に記載します。

| 階層                   | フィールド         | 出現条件  | 説明                                                     |
|----------------------|---------------|-------|--------------------------------------------------------|
| 4._1._2._1.?         | kinds         |       | **Array&lt;Object&gt;**<br/> 概況文・特徴のある確率文を記載する、要素は1つのみ |
| 4._1._2._1._1.       | type          |       | **String**<wbr/> `出現の可能性が最も大きい天候と、特徴のある気温、降水量等の確率` で固定 |
| 4._1._2._1._2.       | summaries     |       | **Array&lt;Object&gt;**<wbr/> 概況文・特徴のある確率文を時系列で記載する    |
| 4._1._2._1._2._1.    | refId         |       | **String&lt;Integer&gt;**<wbr/> 対応する時刻ID               |
| 4._1._2._1._2._2.?   | text          | 場合による | **String**<wbr/> 出現の可能性が最も大きい天候の平文表現を記載する              |
| 4._1._2._1._2._3.    | significances |       | **Array&lt;Object&gt;**<wbr/> 概況文・特徴のある確率文を各要素ごとに記載する  |
| 4._1._2._1._2._3._1. | type          |       | **String**<wbr/> `気温`、`降水量`、`日照時間` または `降雪量`           |
| 4._1._2._1._2._3._2. | value         |       | **String**<wbr/> 概況文・特徴のある確率文の平文表現を記載する                |
|                      |               |       |                                                        |
| 4._1._2._2.?         | zones         |       | **Array&lt;Object&gt;**<br/> 対象の地域、要素は1つのみ             |
| 4._1._2._2._1.       | code          |       | **String&lt;Integer&gt;**<br/> 全国・地方予報区等の地域コード         |
| 4._1._2._2._2.       | name          |       | **String**<br/> 全国・地方予報区等の地域名                          |

##### 予報要素・確率値の場合

この item 要素は、0個以上 items の2番目以降に記載します。

| 階層                   | フィールド         | 出現条件         | 説明                                                 |
|----------------------|---------------|--------------|----------------------------------------------------|
| 4._1._2._1.          | kinds         |              | **Array&lt;Object&gt;**<br/> 予報要素・確率値を記載する、要素は1つのみ |
| 4._1._2._1._1.       | type          |              | **String**<wbr/> `地域・期間平均平年偏差各階級の確率` で固定           |
| 4._1._2._1._2.       | probabilities |              | **Array&lt;Object&gt;**<wbr/> 予報要素・確率値を時系列で記載する    |
| 4._1._2._1._2._1.    | refId         |              | **String&lt;Integer&gt;**<wbr/> 対応する時刻ID           |
| 4._1._2._1._2._2.    | type          |              | **String**<wbr/> `気温`、`降水量`、`日照時間` または `降雪量`       |
| 4._1._2._1._2._3.    | belowNormal   |              | **Object;**<wbr/> 平年より低い・少ない確率                     |
| 4._1._2._1._2._3._1. | type          |              | **String**<wbr/> `平年より低い確率` または `平年より少ない確率`        |
| 4._1._2._1._2._3._2. | unit          |              | **String**<wbr/> `%` で固定                           |
| 4._1._2._1._2._3._3. | value         |              | **String&lt;Integer&gt;**<wbr/> 確率                 |
| 4._1._2._1._2._3._4. | significant   | 特徴のある確率である場合 | **Boolean**<wbr/> **True** のみとする                   |
|                      |               |              |                                                    |
| 4._1._2._1._2._4.    | norma         |              | **Object;**<wbr/> 平年並みの確率                          |
| 4._1._2._1._2._4._1. | type          |              | **String**<wbr/> `平年並みの確率` で固定                     |
| 4._1._2._1._2._4._2. | unit          |              | **String**<wbr/> `%` で固定                           |
| 4._1._2._1._2._4._3. | value         |              | **String&lt;Integer&gt;**<wbr/> 確率                 |
| 4._1._2._1._2._4._4. | significant   | 特徴のある確率である場合 | **Boolean**<wbr/> **True** のみとする                   |
|                      |               |              |                                                    |
| 4._1._2._1._2._5.    | aboveNormal   |              | **Object;**<wbr/> 平年より高い・多い確率                      |
| 4._1._2._1._2._5._1. | type          |              | **String**<wbr/> `平年より高い確率` または `平年より多い確率`         |
| 4._1._2._1._2._5._2. | unit          |              | **String**<wbr/> `%` で固定                           |
| 4._1._2._1._2._5._3. | value         |              | **String&lt;Integer&gt;**<wbr/> 確率                 |
| 4._1._2._1._2._5._4. | significant   | 特徴のある確率である場合 | **Boolean**<wbr/> **True** のみとする                   |
|                      |               |              |                                                    |
| 4._1._2._2.          | zones         |              | **Array&lt;Object&gt;**<br/> 対象の地域、要素は1つのみ         |
| 4._1._2._2._1.       | code          |              | **String&lt;Integer&gt;**<br/> 全国・地方予報区等の地域コード     |
| 4._1._2._2._2.       | name          |              | **String**<br/> 全国・地方予報区等の地域名                      |

### 5. forecast addition

季節予報の付加事項を記載します。

| 階層       | フィールド                 | 出現条件 | 説明                                                     |
|----------|-----------------------|------|--------------------------------------------------------|
| 5._1.    | nextForecastSchedules |      | **Array&lt;Object&gt;**<br/> 季節予報の次回発表予定               |
| 5._1.‗1. | type                  |      | **String**<br/> `１か月予報`、`３か月予報`、`暖候期予報` または `寒候期予報`    |
| 5._1.‗2. | text                  |      | **String**<br/> 季節予報の次回発表予定の平文表現を記載する                  |
| 5._1.‗3. | dateTime              |      | **ISO8601Time**<br/> 季節予報の次回発表予定の日時を記載する               |
|          |                       |      |                                                        |
| 5._2.    | scheduleNotice        |      | **String\|Null**<br/> 最新資料利用の注意喚起等を記載する、ない場合は **Null** |
| 5._3.    | additionalNotice      |      | **String\|Null**<br/> その他お知らせ・特記事項を記載する、ない場合は **Null** |

## この電文で取り扱うコード類

コードは、気象庁防災情報XMLフォーマット コード表 AreaForecast に記載があります。

## サンプル

* [VPZK50 - 全般暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpzk50_rjtd_20080225135500.json)
* [VPZK50 - 全般寒候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpzk50_rjtd_20080924135500.json)
* [VPZK50 - 全般暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpzk50_rjtd_20350223135500.json)
* [VPZK50 - 全般１か月予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpzk50_rjtd_20080306142500.json)
* [VPZK50 - 全般３か月予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpzk50_rjtd_20080825135500.json)
* [VPZK50 - 全般３か月予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpzk50_rjtd_20080825135501.json)
* [VPCK50 - 北海道地方暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpsp_20080225135300.json)
* [VPCK50 - 北海道地方寒候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpsp_20530924135500.json)
* [VPCK50 - 北海道地方１か月予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpsp_20080306142500.json)
* [VPCK50 - 北海道地方３か月予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpsp_20080825135500.json)
* [VPCK50 - 北海道地方３か月予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpsp_20081024135500.json)
* [VPCK50 - 関東甲信地方３か月予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jptk_20171025160430.json)
* [VPCK50 - 中国地方暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jphr_20080225135600.json)
* [VPCK50 - 中国地方暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jphr_20560225135600.json)
* [VPCK50 - 九州南部・奄美地方暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpkg_20080225135500.json)
* [VPCK50 - 九州南部・奄美地方暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpkg_20560225135500.json)
* [VPCK50 - 沖縄地方暖候期予報](https://sample.dmdata.jp/conversion/json/schema/forecast-season/vpck50_jpok_20080225135522.json)
