---
title: Schema earthquake-explanation v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対称とするXML電文

* 地震の活動状況等に関する情報 (VXSE56)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1.? | naming | 情報による、取消時には出現しない | **Object**<br/> 命名地震 [#1. naming](#1-naming) |
| 2. | text |  | **String**<br/>自由形式で文章を記載する  |
| 3.? | comments | 取消時や付加的な情報がない場合は出現しない | **Object**<br/>付加的な情報を文章形式で提供する [#3. comments](#3-comments) |


### 1. naming

顕著な被害を起こした地震について命名した場合については、その名称を記載します「。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1. | text | | **String**<br/> 命名名 |
| 1._2.? | en | 英名がない場合は出現しない | **String**<br/> 命名名の英語 |


### 3. comments

取消時や付加的な情報がない場合は出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | free |  | **Object**<br/>その他の付加的な情報を自由形式で記載する |

## 取り扱い上の注意

南海トラフ地震に関連する情報(VYSE50, VYSE51, VYSE52)と同じ情報が2022年ごろまで発表されます。


## サンプル

### 南海トラフ地震に関連する情報（臨時）

* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512162033.json)
* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512162433.json)
* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512162632.json)
* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512162834.json)
* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512163826.json)
* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512164025.json)
* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512164228.json)

### 南海トラフ地震に関連する情報（定時）

* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20200512164452.json)

### 伊豆東部の地震活動の見通しに関する情報

* [VXSE56 - 地震の活動状況等に関する情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-counts/vxse56_rjtd_20191111170053.json)
