---
title: Schema earthquake-nankai v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* 南海トラフ地震臨時情報 (VYSE50)
* 南海トラフ地震関連解説情報 (VYSE51)
* 南海トラフ地震関連解説情報 (VYSE51)

## 共通ヘッダ

共通ヘッダは[こちら](../#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1.? | earthquakeInfo | 取消時には出現しない | **Object**<br/> 南海トラフ地震に関連する情報の諸要素 [#1. earthquake info](#1-earthquake-info) |
| 2.? | nextAdvisory | 予定がない場合や、取消時には出現しない | **String**<br/> 続報を発表する予定がある場合に、次回発表予定時刻などを記載する |
| 3.? | text | 取消時の理由や、<br/>その他の追記事項がある場合に出現 | **String**<br/>自由形式で文章を記載する  |


### 1. earthquake info

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1._1.? | kind | 設定がない場合出現しない | **Object**<br/> 情報の発表区分 |
| 1._1._1. | code | | **String<Integer\>**<br/> 南海トラフ地震に関連する情報の情報種別を表すコードを表す <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 1._1._2. | name | | **String**<br/> 南海トラフ地震に関連する情報の情報種別を表す |
| 1._2. | text | | **String**<br/> 自由文形式により本文を記載する |
| 1._3.? | appendix | 参考情報がない場合は出現しない | **String**<br/> 南海トラフ地震に関連する情報の種類などの参考情報を記載する。 |


## 取り扱い上の注意

地震の活動状況等に関する情報(VXSE61)と同じ情報が2022年ごろまで発表されます。


## サンプル

### 南海トラフ地震臨時情報

* [VYSE50 - 南海トラフ地震臨時情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse50_rjtd_20200512162033.json)
* [VYSE50 - 南海トラフ地震臨時情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse50_rjtd_20200512162433.json)
* [VYSE50 - 南海トラフ地震臨時情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse50_rjtd_20200512162632.json)
* [VYSE50 - 南海トラフ地震臨時情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse50_rjtd_20200512162834.json)
* [VYSE50 - 南海トラフ地震臨時情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse50_rjtd_20200512163230.json)
* [VYSE50 - 南海トラフ地震臨時情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse50_rjtd_20200512163431.json)
* [VYSE50 - 南海トラフ地震臨時情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse50_rjtd_20200512163629.json)

### 南海トラフ地震解説情報（定例外）

* [VYSE51 - 南海トラフ地震解説情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse51_rjtd_20200512163826.json)
* [VYSE51 - 南海トラフ地震解説情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse51_rjtd_20200512164025.json)
* [VYSE51 - 南海トラフ地震解説情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse51_rjtd_20200512164228.json)

### 南海トラフ地震解説情報（定例）

* [VYSE52 - 南海トラフ地震解説情報](https://sample.dmdata.jp/conversion/json/schema/earthquake-nankai/vyse52_rjtd_20200512164452.json)
