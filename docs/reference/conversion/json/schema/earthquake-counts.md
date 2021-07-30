---
title: Schema earthquake-counts v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対称とするXML電文

* 地震回数に関する情報 (VXSE60)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1.? | earthquakeCounts | 取消時には出現しない | **Array<Object\>**<br/> 地震の回数 [#1. earthquake count](#1-earthquake-count) |
| 2.? | nextAdvisory | 取消時には出現しない | **String**<br/> 続報を発表する予定がある場合に、次回発表予定時刻などを記載する |
| 3.? | text | 取消時の理由や、<br/>その他の追記事項がある場合に出現 | **String**<br/>自由形式で文章を記載する  |
| 4.? | comments | 取消時には出現しない | **Object**<br/>付加的な情報を文章形式で提供する [#4. comments](#4-comments) |


### 1. earthquake count

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1. | type | | **String**<br/> 表現する期間幅に対応した文字列が入る <br/> 取りうる値は `１時間地震回数`、`累計地震回数`、`地震回数` |
| 1._2. | targetTime | | **Object**<br/> 対象とする期間を記載する |
| 1._2._1. | start | | **String**<br/> 対象とする期間の始まりをISO8601の日本時間で記載する |
| 1._2._2. | end | | **String**<br/> 対象とする期間の終わりをISO8601の日本時間で記載する |
| 1._3. | values |  | **Object**<br/> 対象とする期間内に観測した地震の回数を記載する |
| 1._3._1. | all |  | **String<Integer\>\|Null**<br/> 無感地震を含む観測した地震の回数。発表しない場合は**Null**とする |
| 1._3._2. | felt |  | **String<Integer\>\|Null**<br/> 有感地震を観測した地震の回数。発表しない場合は**Null**とする |


### 4. comments

取消時は出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | free |  | **Object**<br/>その他の付加的な情報を自由形式で記載する |

## 取り扱い上の注意


## サンプル

* [VXSE60 - 地震回数に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse60_rjtd_20080826120015.json)
