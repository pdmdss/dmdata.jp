---
title: Schema earthquake-hypocenter-update v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* 顕著な地震の震源要素更新のお知らせ (VXSE61)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1.? | earthquake | 取消時には出現しない | **Object**<br/> [Earthquake component](.././component#Earthquake-component) を参照、空間座標は度分単位で示す |
| 2.? | text | 取消時の理由や、<br/>その他の追記事項がある場合に出現 | **String**<br/>自由形式で文章を記載する  |
| 3.? | comments | 取消時や付加的な情報がない場合は出現しない | **Object**<br/>付加的な情報を文章形式で提供する [#3. comments](#3-comments) |

### 3. comments

取消時や付加的な情報がない場合は出現しません。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1.? | free |  | **Object**<br/>その他の付加的な情報を自由形式で記載する |

## 取り扱い上の注意

XMLでは震源情報の空間座標（震源位置）が**度**単位と**度分**単位がありますが、このJSONでは**度分**単位の情報のみ表現します。

## サンプル

* [VXSE61 - 顕著な地震の震源要素更新のお知らせ](https://sample.dmdata.jp/conversion/json/schema/earthquake-hypocenter-update/vxse61_rjtd_20210320201026.json)
