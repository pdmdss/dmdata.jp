---
title: Schema weather-early v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* [早期天候情報 (VPAW51)](/docs/telegrams/we02560.md)

## 共通ヘッダ

共通ヘッダは[こちら](/docs/reference/conversion/json/index.md#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド      | 出現条件  | 説明                                                                                                  | 
|----|------------|-------|-----------------------------------------------------------------------------------------------------|
| 1. | notice?    | 情報による | **String**<br/> お知らせを記載する                                                                           |
| 2. | target     |       | **String**<br/> 電文が対象とする地域を記載する [2. target](#2-target)                                              |
| 3. | targetTime |       | **Object**<br/> この電文が対象とする予報開始日時とその期間を記載する [3. targetTime](#3-targettime)                           |
| 4. | mainTexts  |       | **Array&lt;Object&gt;**<br/> この電文が対象とする天候解析開始日時とその期間を記載する<br/>常に要素は1つとする [4. mainText](#4-maintext) |
| 5. | early      |       | **Array&lt;Object&gt;**<br/> 早期警戒の内容、閾値・確率を記載する<br/>対象とする気象要素毎に要素が出現する [5. early](#5-early)         |

### 2. target

この電文が対象とする地域を記載します。

| 階層    | フィールド | 出現条件 | 説明                                   |
|-------|-------|------|--------------------------------------|
| 2._1. | code  |      | **String&lt;Integer&gt;**<br/> 地域コード |
| 2._2. | name  |      | **String**<br/> 地域名                  |

### 3. targetTime

この電文が対象とする予報開始日時とその期間を記載します。

| 階層       | フィールド       | 出現条件 | 説明                                                                |
|----------|-------------|------|-------------------------------------------------------------------|
| 3._1.    | dateTime    |      | **Object**<br/> 天候解析開始日時                                          |
| 3._1._1. | value       |      | **ISO8601Time**<br/> 日時                                           |
| 3._1._2. | validFormat |      | **String**<br/> 日時が有効な範囲をフォーマットとして記載する                            |
| 3._1._3. | precision   |      | **String**<br/> 時刻の正確さの幅がある程度あることを、ISO8601 の Time intervals 形式で表す |
|          |             |
| 3._2.    | duration    |      | **String**<br/> 基準日時からの期間の長さを、 ISO8601 の Time intervals 形式で表す     |

### 4. mainText

情報の本文となる天候の状況及び地域を記載します。

| 階層       | フィールド | 出現条件 | 説明                                   |
|----------|-------|------|--------------------------------------|
| 4._1.    | text  |      | **String**<br/> 状況の解説をテキスト形式で記述する    |
| 4._2.    | zones |      | **Array&lt;Object&gt;**<br/> 対象とする地域 |
| 4._2._1. | code  |      | **String&lt;Integer&gt;**<br/> 地域コード |
| 4._2._2. | name  |      | **String**<br/> 地域名                  |

### 5. early

早期警戒の種類、閾値・確率を記載します。

対象とする気象要素毎に要素が出現します。

| 階層          | フィールド                  | 出現条件                    | 説明                                                                    |
|-------------|------------------------|-------------------------|-----------------------------------------------------------------------|
| 5._1.       | type                   |                         | **String**<br/> 量的予想の種類を記載する<br/>取りうる値は、`かなりの高温`、`かなりの低温`、`大雪`        |
| 5._2.       | forecasts              |                         | **Object**<br/> 特徴のある確率と閾値の内容を記載する                                    |
| 5._2._1.?   | probabilityAboveNormal | `かなりの高温`又は`大雪`<br/>の時出現 | **Object**<br/> `かなりの高温`又は`大雪`となり、閾値を超える確率を記載する                       |
| 5._2._1._1. | unit                   |                         | **String**<br/> 確立の単位 `%` で固定                                         |
| 5._2._1._2. | value                  |                         | **String&lt;Integer&gt;**<br/> 平年よりかなりの高い・多い確立                        |
| 5._2._1._3. | bound                  |                         | **String**<br/> `以上` で固定                                              |
|             |                        |
| 5._2._1.?   | thresholdAboveNormal   | `かなりの高温`又は`大雪`<br/>の時出現 | **Object**<br/> `かなりの高温`又は`大雪`となる閾値を記載する                              |
| 5._2._1._1. | unit                   |                         | **String**<br/> 単位、`かなりの高温`の場合は`℃`、`大雪`の場合は`%`とする                     |
| 5._2._1._2. | value                  |                         | **String&lt;Integer&gt;**<br/> 平年よりかなりの高いとなる温度の閾値(℃)又は、平年より多いとなる閾値(%) |
| 5._2._1._3. | bound                  |                         | **String**<br/> `以上` で固定                                              |
|             |                        |
| 5._2._1.?   | probabilityBelowNormal | `かなりの低温`<br/>の時出現       | **Object**<br/> `かなりの低温`となり、閾値を超える確率を記載する                             |
| 5._2._1._1. | unit                   |                         | **String**<br/> 確立の単位 `%` で固定                                         |
| 5._2._1._2. | value                  |                         | **String&lt;Integer&gt;**<br/> 平年よりかなりの低い確立                           |
| 5._2._1._3. | bound                  |                         | **String**<br/> `以上` で固定                                              |
|             |                        |
| 5._2._1.?   | thresholdBelowNormal   | `かなりの低温`<br/>の時出現       | **Object**<br/> `かなりの低温`となる閾値を記載する                                    |
| 5._2._1._1. | unit                   |                         | **String**<br/> 単位、`かなりの低温`の場合は`℃`とする                                 |
| 5._2._1._2. | value                  |                         | **String&lt;Integer&gt;**<br/> 平年よりかなりの低いとなる温度の閾値(℃)                  |
| 5._2._1._3. | bound                  |                         | **String**<br/> `以下` で固定                                              |
|             |                        |
|             |                        |
| 5._3.       | zones                  |                         | **Array&lt;Object&gt;**<br/> 対象とする地域                                  |
| 5._3._1.    | code                   |                         | **String&lt;Integer&gt;**<br/> 地域コード                                  |
| 5._3._2.    | name                   |                         | **String**<br/> 地域名                                                   |


## この電文で取り扱うコード類

コードは、気象庁防災情報XMLフォーマット コード表 AreaForecast に記載があります。

## サンプル

* [VPAW50 - 雪に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171120142157.json)
* [VPAW50 - 高温に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171204142157.json)
* [VPAW50 - 低温に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171204142158.json)
* [VPAW50 - 大雪に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171204142159.json)
* [VPAW50 - 低温と大雪に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171204142200.json)
* [VPAW50 - 低温と雪に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171204142201.json)
* [VPAW50 - 高温と大雪に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171204142202.json)
* [VPAW50 - 高温と雪に関する早期天候情報（東北地方）](https://sample.dmdata.jp/conversion/json/schema/weather-early/vpaw51_jpsn_20171204142203.json)
