---
title: JSON化データ コンポーネントされた要素
---


## Earthquake component
地震情報・津波情報における地震の発生位置、規模を記載。

```json
{
    "originTime": "2011-03-11T14:46:00+09:00",
    "arrivalTime": "2011-03-11T14:46:00+09:00",
    "hypocenter": {
        "name": "三陸沖",
        "code": "288",
        "coordinate": {
            "latitude": {
                "text": "38.0˚N",
                "value": "38.0000"
            },
            "longitude": {
                "text": "142.9˚E",
                "value": "142.9000"
            },
            "height": {
                "type": "高さ",
                "value": "-10000",
                "unit": "m"
            },
            "geodeticSystem": "日本測地系"
        },
        "depth": {
            "type": "深さ",
            "value": "10",
            "unit": "km"
        },
        "auxiliary": {
            "text": "牡鹿半島の東南東１３０ｋｍ付近",
            "code": "202",
            "name": "牡鹿半島",
            "direction": "東南東",
            "distance": {
                "value": "130",
                "unit": "km"
            }
        }
    },
    "magnitude": {
        "type": "マグニチュード",
        "value": null,
        "unit": "Mj",
        "condition": "Ｍ８を超える巨大地震"
    }
}
```

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1. | originTime | | **String**<br/> 地震発生時刻を分単位で、ISO8601の日本時間で記載する |
| 2. | arrivalTime |  | **String**<br/> 地震検知時刻を分単位で、ISO8601の日本時間で記載する |
| 3. | hypocenter | | **Object**<br/> 地震の震源要素 [#3. hypocenter](#3-hypocenter)を参照 |
| 4. | magnitude |  | **Object**<br/> 地震の規模 [#4. magnitude](#4-magnitude)を参照 |

### 3. hypocenter

地震の震源要素を記載。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 3._1. | name | | **String**<br/> 震央地名 |
| 3._2. | code |  | **String<Integer\>**<br/> 震央地名コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 3._3. | coordinate | | **Object**<br/> 震源地の空間座標  [#Coordinate component](#coordinate-component)を参照  |
| 3._4. | depth |  | **Object**<br/> 深さ情報 [#3. 4. depth](#3-4-depth)を参照|
| 3._5.? | detailed | 情報による | **Object**<br/> 震源地の詳細 [#3. 5. detailed](#3-5-detailed)を参照|
| 3._6.? | auxiliary | 情報による | **Object**<br/> 震源位置の補足情報 [#3. 6. auxiliary](#3-6-auxiliary)を参照|

#### 3. 4. depth

震源の深さ。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 3._4._1. | type |  | **String**<br/> 深さ情報のタイプ。"深さ"で固定 |
| 3._4._2. | unit |  | **String**<br/> 深さ情報の単位。"km"で固定 |
| 3._4._3. | value |  | **String<Integer\>\|Null**<br/> 震源の深さ。不明時は **Null** とする |
| 3._4._4.? | condition | depth.valueが<br/>"0"または"700"または**Null**の時 | **String**<br/> 深さの例外的表現。取りうる値は "ごく浅い"、"７００ｋｍ以上"、 "不明"|

#### 3. 5. detailed

震央地名を補足する詳細震央地名。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 3._5._1. | code |  | **String<Integer\>**<br/> 震央地名を補足する詳細震央地コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 3._5._1. | name |  | **String**<br/> 震央地名を補足する詳細震央地名 |

#### 3. 6. auxiliary

震源位置の補足情報。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 3._6._1. | text |  | **String**<br/> 震源位置の捕捉位置を記載 |
| 3._6._2. | code |  | **String<Integer\>**<br/> 震源位置の捕捉位置を表現する代表地域コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 3._6._3. | name |  | **String**<br/> 震源位置の捕捉位置を表現する代表地域名 |
| 3._6._4. | direction |  | **String**<br/> 代表地域から震源への方角を16方位で表現 |
| 3._6._4._1. | distance.unit |  | **String**<br/> 距離情報の単位。"km"で固定
| 3._6._4._2. | distance.value |  | **String<Integer\>**<br/> 代表地域から震源への方角を16方位で表現 |


### 4. magnitude

地震の規模（マグニチュード）。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | type | | **String**<br/> "マグニチュード" で固定 |
| 4._2. | unit |  | **String**<br/> マグニチュードの種別。"Mj" または "M" が入る |
| 4._3. | value | | **String<Float\>\|Null**<br/> マグニチュードの数値。不明時またはM8以上の巨大地震と推測される場合は **Null** とする   |
| 4._4.? | condition | value == **Null** | **String**<br/> マグニチュードの数値が求まらない事項を記載。"不明" 又は "Ｍ８を超える巨大地震" が入る   |







## Coordinate component
空間座標のある一点を表現する。

```json
{
    "latitude": {
        "text": "38.0˚N",
        "value": "38.0000"
    },
    "longitude": {
        "text": "142.9˚E",
        "value": "142.9000"
    },
    "geodeticSystem": "日本測地系"
}
```

| 階層 | フィールド     | 出現条件                   | 説明                                                                | 
| ---- | -------------- | -------------------------- | ------------------------------------------------------------------- | 
| 1.?   | latitude       | 不明時は出現しない         | **Object**<br/> 緯度を表現                                                          | 
| 1._1. | latitude.text  |                            | **String**<br/> 緯度をテキスト文で表現する。                              | 
| 1._2. | latitude.value |                            | **String<Float\>**<br/> 緯度を10進数法、単位度で表現する。                        | 
| 2.?   | longitude       | 不明時は出現しない         | **Object**<br/> 経度を表現                                                          | 
| 2._1. | longitude.text  |                            | **String**<br/> 経度をテキスト文で表現する。                              | 
| 2._2. | longitude.value |                            | **String<Float\>**<br/> 経度を10進数法、単位度で表現する。                        | 
| 3.?   | height         | 不明時・未定義は出現しない | **Object**<br/> 高さを表現 | 
| 3._1. | height.type  |                            | **String**<br/> "高さ" で固定                              | 
| 3._2. | height.unit  |                            | **String**<br/> 高さ情報の単位 "m" で固定                              | 
| 3._3. | height.value |                            | **String<Float\>**<br/> 高さの数値                       | 
| 4.?   | geodeticSystem | 情報による                 | **String**<br/> "世界測地系" または "日本測地系" が入る                             | 
| 5.?   | condition      | 緯度経度が不明時のみ       | **String**<br/> "不明" が入る                                                       | 
