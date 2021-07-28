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
                "value": "-10000.0000",
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
        "condition": {
            "name": "Ｍ８を超える巨大地震",
            "code": "d9101"
        }
    }
}
```

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1. | originTime | | **String**<br/> 地震発生時刻を分単位で記述する |
| 2. | arrivalTime |  | **String**<br/> 地震検知時刻を分単位で記述する |
| 3. | hypocenter | | **Object**<br/> 地震の震源要素  |
| 4. | magnitude |  | **Object**<br/> 地震の規模 |

### 3. hypocenter

地震の震源要素を記載。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 1. | name | | **String**<br/> 震央地名 |
| 2. | code |  | **String<Integer\>**<br/> 震央地名コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 3. | coordinate | | **Object**<br/> 震源地の空間座標   |
| 4. | depth |  | **Object**<br/> 深さ情報 [#3. 4. depth](#3-4-depth)を参照|
| 5.? | auxiliary |  | **Object**<br/> 震源位置の補足情報 [#3. 5. auxiliary](#3-5-auxiliary)を参照|

#### 3. 4. depth

震源の深さ。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 4._1. | type |  | **String**<br/> 深さ情報のタイプ。"深さ"で固定 |
| 4._2. | unit |  | **String**<br/> 深さ情報の単位。"km"で固定 |
| 4._3. | value |  | **String<Integer\>\|Null**<br/> 震源の深さ。不明時は **Null** を格納 |
| 4._4.? | condition | depth.valueが<br/>"0"または"700"または**Null**の時 | **String**<br/> 深さの例外的表現。取りうる値は "ごく浅い"、"７００ｋｍ以上"、 "不明"|

#### 3. 5. Auxiliary

震源位置の補足情報。

| 階層 | フィールド | 出現条件 | 説明 |
| -- | -- | -- | -- |
| 5._1. | text |  | **String**<br/> 震源位置の捕捉位置を記載 |
| 5._2. | code |  | **String<Integer\>**<br/> 震源位置の捕捉位置を表現する代表地域コード <br/> コードは、気象庁防災情報XMLフォーマット コード表 地震火山関連コード表 による |
| 5._3. | name |  | **String**<br/> 震源位置の捕捉位置を表現する代表地域名 |
| 5._4. | direction |  | **String**<br/> 代表地域から震源への方角を16方位で表現 |
| 5._4. | distance.type |  | **String**<br/> の単位。"km"で固定  |
| 5._4. | distance.unit |  | **String**<br/> 距離情報の単位。"km"で固定
| 5._4. | distance.value |  | **String<Integer\>**<br/> 代表地域から震源への方角を16方位で表現 |










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

| 要素     | 出現               | 説明                  | 
| ---------- | ------------------ | --------------------- | 
| coordinate.latitude       | 不明時は出現しない               | 緯度を表現、[Coordinate LatLon](#coordinate-latlon-要素) 要素を参照          |   
| coordinate.longitude       | 不明時は出現しない               | 経度を表現、[Coordinate LatLon](#coordinate-latlon-要素) 要素を参照          |  
| coordinate.height | 不明時・未定義は出現しない               | 高さを表現、[Coordinate Height](#coordinate-height-要素) 要素を参照 | 
| coordinate.geodeticSystem      | 情報による | "世界測地系" または "日本測地系" が入る     |
| coordinate.condition       | 緯度経度が不明時のみ               | 状態説明、[Condition](#condition-要素) 要素を参照。 <br/> `condition.name`は`不明`のみ。        |  


## Coordinate LatLon 要素

```json
{
  "text": "38.0˚N",
  "value": "38.0000"
}
```

| 要素     | 出現               | 説明                  | 
| ---------- | ------------------ | --------------------- | 
| [latitude\|longitude].text       | する               | 緯度または経度をテキスト文で表現する。          | 
| [latitude\|longitude].text       | する               | 緯度または経度を10進数法、単位度で表現する。          |


## Coordinate Height 要素

```json
{
    "value": "-10000.0000",
    "unit": "m"
}
```

| 要素     | 出現               | 説明                  | 
| ---------- | ------------------ | --------------------- | 
| height.value       | する               | 海抜からの高さを表現する。マイナスの場合は地中を示す。          | 
| height.unit       | する               | 単位は、メートルで固定。          |

## Condition 要素
```json
{
    "name": "不明",
    "code": "d9980"
}
```

| 要素     | 出現               | 説明                  | 
| ---------- | ------------------ | --------------------- | 
| condition.name       | する               | 状況説明テキスト。          | 
| condition.code       | する               |状況説明コード。          |

状況説明テキストと状況説明コードの対応は下記の通り。

| condition.name       | condition.code | 説明                                                 | 
| -------------------- | -------------- | ---------------------------------------------------- | 
| Ｍ８を超える巨大地震 | d9101          | 地震・津波情報において、超巨大地震と推定される場合。 | 
| ごく浅い             | d9121          | 地震・津波情報において、深さが7km以下の場合。        | 
| 深さ７００ｋｍ以上   | d9125          | 地震・津波情報において、深さが700kmよりも深い場合。  | 
| 不明                 | d9980          | 値が、不明な時。                                     | 
