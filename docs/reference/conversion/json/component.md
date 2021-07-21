---
title: JSON化データ コンポーネントされた要素
---


## Earthquake 要素
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
            "value": "-10000.0000",
            "unit": "m"
          },
          "geodeticSystem": "日本測地系"
        },
        "depth": {
            "value": "10",
            "unit": "km"
        },
        "auxiliary": {
            "text": "牡鹿半島の東南東１３０ｋｍ付近",
            "code": "202",
            "direction": "東南東",
            "distance": {
                "value": "130",
                "unit": "km"
            }
        }
    },
    "magnitude": {
        "value": null,
        "unit": "Mj",
        "condition": {
            "name": "Ｍ８を超える巨大地震",
            "code": "d9101"
        }
    }
}
```

| 要素      | 出現 | 説明                  | 
| ----------- | ---- | --------------------- |
| earthquake.originTime  | 不定 | 地震発生時刻          |
| earthquake.arrivalTime |  | 地震検知時刻          |
| earthquake.hypocenter  | する | [Hypecenter](#hypecenter-要素) 要素を参照 | 
| earthquake.magnitude   | する | Magnitude 要素を参照  |     


## Hypecenter 要素
地震情報・津波情報における地震の発生位置を記載。

```json
{
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
            "value": "-10000.0000",
            "unit": "m"
        },
        "geodeticSystem": "日本測地系"
    },
    "depth": {
        "value": "10",
        "unit": "km"
    },
    "auxiliary": {
        "text": "牡鹿半島の東南東１３０ｋｍ付近",
        "code": "202",
        "direction": "東南東",
        "distance": {
            "value": "130",
            "unit": "km"
        }
    }
}
```


| 要素     | 出現               | 説明                  | 
| ---------- | ------------------ | --------------------- | 
| hypocenter.name       | する               | 地震発生時刻          | 
| hypocenter.code       | する               | 地震検知時刻          | 
| hypocenter.coordinate | する               | [Coordinate](#coordinate-要素) 要素を参照 |    
| hypocenter.depth      | する | [Hypecenter Depth](#hypecenter-depth-要素) 要素を参照      |       
| hypocenter.auxiliary  | 情報による             |  [Hypecenter Auxiliary](#hypecenter-auxiliary-要素) 要素を参照  |    

## Hypecenter Auxiliary 要素
震源の相対的な位置を記載する。
```json
{
    "text": "牡鹿半島の東南東１３０ｋｍ付近",
    "code": "202",
    "direction": "東南東",
    "distance": {
        "value": "130",
        "unit": "km"
    }
}
```

| 要素     | 出現               | 説明                  | 
| ---------- | ------------------ | --------------------- | 
| auxiliary.text       | はい               | テキスト文。 | 
| condition.code       | はい               | 起点となる場所のコード。          |
| condition.direction       | はい            |  方角、16方位で記述する。     |
| condition.distance.value       | はい            |  起点からの距離を記述する。単位はキロメートル。     |
| condition.distance.unit       | はい            |  起点からの距離の単位を記述する。単位はキロメートル。     |

## Hypecenter Depth 要素

```json
{
    "value": "10",
    "unit": "km"
}
```
```json
{
    "value": "0",
    "unit": "km",
    "condition": {
        "name": "ごく浅い",
        "code": "d9121"
    }
}
```

| 要素     | 出現               | 説明                  | 
| ---------- | ------------------ | --------------------- | 
| depth.value       | はい               | 海抜からの深さを表現する。 | 
| depth.unit       | はい               | 単位は、キロメートルで固定。          |
| depth.condition       | `height.value`が`0`、`700`または`null`の場合             |  深さの例外的な表現、[Condition](#condition-要素) 要素を参照。 <br/> `condition.name`は`ごく浅い`、`深さ７００ｋｍ以上`、`不明 `。     |

## Coordinate 要素
空間座標のピンポイントを表現する。

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
