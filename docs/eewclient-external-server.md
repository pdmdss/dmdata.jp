---
title: EEW Client 外部連携用APIの仕様
---

EEW Client で計算した予想震度等をWebSocketで配信します。

---

## 利用条件

この機能を利用するにあたり、以下の事項を守っていただきますようお願いします。

* 商用利用をしないこと。
* インターネットへの送信（クラウドなどへの送信を含む）をしないこと（手動による動画投稿等を除く）。
* この機能で得たデータの一部または全部をリレー等によって複製を行わないこと。
* 動画等（YouTube等の生放送を含む）に連携するソフトウエアを利用する場合は本ソフトウエアを利用していることを明記すること。
* 公共施設・商業施設等で使用しないこと。
* 工作機器・医療機器等で使用しないこと。

また、この機能についての保証等は一切致しかねますので予めご了承ください。

最大5つまで接続できます。

---

## 利用方法

EEW Client が WebSocketサーバーとなります（ユーザーによって本機能を有効化する必要があります）。

ポート番号は、初回有効時にランダムに決定されますがユーザーによって変更が可能です。
なお、127.0.0.1にバインドして起動します。

:::caution
EEW Clientの表示条件にかかわらず、すべてのデータが配信されます。

なお、1点観測点に基づく緊急地震速報、100gal越え緊急地震速報、1点によるPLUM法のみの緊急地震速報はデフォルトで配信しません。
EEW Clientの設定（緊急地震速報受信設定）から有効化してください。
:::

---

## レスポンス

WebSocketは常にJSONを返答します。


### type: start

接続初回に配信します。

| 階層 | フィールド | 出現条件 | 説明                                          | 
|------|------------|----------|-----------------------------------------------|
| 1.   | type       |          | **String**<br/> イベントタイプ `start` で固定 |
| 2.   | version    |          | **String**<br/> EEW Client のバージョン       |


```json
{
  "type": "start",
  "version": "1.4.0"
}
```

---

### type: user-point

予想地点の経度・緯度を、接続初回・状態変化時に配信します。

| 階層 | フィールド | 出現条件 | 説明                                                                                                                                    | 
|------|------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------|
| 1.   | type       |          | **String**<br/> イベントタイプ `user-point` で固定                                                                                      |
| 2.   | location   |          | **Array&lt;Float&gt;\|Null\|False**<br/> 予想地点の経度緯度を記載する <br/>設定がない場合は **Null**、共有しない場合は **Flase** とする |

```json
{
  "type": "user-point",
  "location": [135.1111, 35.1111]
}
```

---

### type: server-status

dmdata.jp と接続しているWebSocketの接続状況を、接続初回・状態変化時に配信します。

| 階層 | フィールド | 出現条件 | 説明                                                                           | 
|------|------------|----------|--------------------------------------------------------------------------------|
| 1.   | type       |          | **String**<br/> イベントタイプ `server-status` で固定                          |
| 2.   | status     |          | **String**<br/> 接続状況を記載する <br/>各ステータスと意味は以下のリストの通り |

* `no-auth` ：dmdata.jp とのアカウント連携が未実施（なお、EEW Client起動時に連携の有無にかかわらず配信される場合があります）
* `no-contract` ：有効な契約がなく、利用ができない状態
* `limit` ：WebSocket の接続上限に達していて、利用できない状態
* `close` ：WebSocket が切断された状態
* `connecting` ：WebSocket との接続を開始した状態
* `open` ：WebSocket と接続中

```json
{
  "type": "server-status",
  "status": "open"
}
```

---

### type: eew

:::danger 警告
ユーザーが実行する訓練データによる予想についても配信します。

処理を行わないように対策するなどしてください。（isTestで判別）
:::

:::caution
同じ、イベントID、イベント通番の更新番号（serial）が2回配信される場合があります

（PLUM法による予想が発生している場合。このとき同じ更新番号でも予想震度等が変化する場合があります。）
:::

| 階層      | フィールド        | 出現条件                                                   | 説明                                                                                                                                                                                                     | 
|-----------|-------------------|------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1.        | type              |                                                            | **String**<br/> イベントタイプ `eew` で固定                                                                                                                                                              |
| 2.        | eventId           |                                                            | **String&lt;Integer&gt;**<br/> EEWのEventID                                                                                                                                                              |
| 3.        | serial            |                                                            | **String&lt;Integer&gt;**<br/> イベント通番の更新番号                                                                                                                                                    |
| 4.        | author            |                                                            | **String**<br/> EEWの発表官署 `気象庁本庁` または `大阪管区気象台`                                                                                                                                       |
| 5.        | pressTime         |                                                            | **ISO8601Time**<br/> EEWの発表時刻                                                                                                                                                                       |
| 6.        | processTime       |                                                            | **ISO8601Time**<br/> EEW Client の処理時刻                                                                                                                                                               |
| 7.        | isTest            |                                                            | **Boolean**<br/> 訓練データを用いているかどうかを識別する <br/>**True** の場合は、訓練データによるもの                                                                                                   |
| 8.        | isCanceled        |                                                            | **Boolean**<br/> このイベントが取り消されたかどうかを識別する                                                                                                                                            |
| 9.        | isLastInfo        |                                                            | **Boolean**<br/> このイベントで最後の更新かどうかを識別する                                                                                                                                              |
| 10.       | isPlumOnly        |                                                            | **Boolean**<br/> 震源推定がなく、PLUM法のみによるEEWかどうかを識別する                                                                                                                                   |
| 11.       | isLevelOver       |                                                            | **Boolean**<br/> レベル法（100gal検知）によるEEWかどうかを識別する                                                                                                                                       |
| 12.       | isWarning         |                                                            | **Boolean**<br/> このイベントで緊急地震速報（警報）が発表されたか識別する                                                                                                                                |
| 13.       | epicenterName     |                                                            | **String**<br/> 震央地名                                                                                                                                                                                 |
| 14.       | epicenterLocation |                                                            | **Array&lt;Float&gt;**<br/> 震源の経度、緯度                                                                                                                                                             |
| 15.       | depth             |                                                            | **Integer**<br/> 震源の深さ（km）                                                                                                                                                                        |
| 16.       | magnitude         |                                                            | **Float\|Null**<br/> マグニチュードを記載する <br/>PLUM報のみ、レベル法のみによるEEWの場合は **Null** とする                                                                                             |
| 17.       | originTime        |                                                            | **ISO8601Time\|Null**<br/> 地震発生時刻を秒単位で記載する <br/>レベル法のみによるEEWの場合には **Null** とする                                                                                           |
| 18.       | arrivalTime       |                                                            | **ISO8601Time**<br/> 地震検知時刻を秒単位で記載する                                                                                                                                                      |
| 19.       | accuracy          |                                                            | **Object**<br/> 震源及びマグニチュードの計算精度情報を記載する <br/>[eew-information v1.0.0 7. 4. 7. accuracy](/docs/reference/conversion/json/schema/eew-information.md#7-4-7-accuracy)                 |
| 20.?      | maxInt            | 予想がない場合は出現しない                                 | **Object**<br/> 気象庁による最大予測震度を記載する <br/>[eew-information v1.0.0 8. 4. 5. forecastMaxInt](/docs/reference/conversion/json/schema/eew-information.md#8-4-5-forecastmaxint)                 |
| 21.?      | maxLgInt          | 予想がない場合は出現しない                                 | **Object**<br/> 気象庁による最大予測長周期地震動階級を記載する <br/>[eew-information v1.0.0 8. 4. 6. forecastMaxLgInt](/docs/reference/conversion/json/schema/eew-information.md#8-4-6-forecastmaxlgint) |
| 22.       | regionForecasts   |                                                            | **Array&lt;Object&gt;**<br/> EEW Client が計算した細分区域の予想震度を記載する                                                                                                                           |
| 22._1.    | code              |                                                            | **String&lt;Integer&gt;**<br/> 細分区域コード                                                                                                                                                            |
| 22._2.    | to                |                                                            | **String**<br/> 予測震度を、 `1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7` で記載する                                                                                                                  |
|           |                   |                                                            |                                                                                                                                                                                                          |
| 23.?      | pointForecast     | 予想地点が設定されていない場合、予想がない場合は出現しない | **Object**<br/> 設定された予想地点における予想震度、予測長周期地震動階級、到達予想時刻を記載する                                                                                                         |
| 23._1.    | sWave             |                                                            | **Object**<br/> 到達予想時刻を記載する                                                                                                                                                                   |
| 23._1._1. | status            |                                                            | **String**<br/> 到達予想時刻の計算ステータスを記載し、`ok` または `not-calculated`（PLUM法による震度予測、震源距離2000km以上の場合など）                                                                 |
| 23._1._2. | time              |                                                            | **ISO8601Time\|Null**<br/> 到達予想時刻を記載する 予想時刻がない場合は **Null** とする                                                                                                                   |
|           |                   |                                                            |                                                                                                                                                                                                          |
| 23._2.?   | lpgm              | 予想できない場所の場合は出現しない                         | **Object**<br/> 予測長周期地震動階級・絶対応答速度スペクトルを記載する（1.6秒～7.8秒の周期帯）                                                                                                           |
| 23._2._1. | maxSva            |                                                            | **String\|Null**<br/> 予想絶対速度応答スペクトル（cm/s）を記載し、予想がない場合は **Null** とする                                                                                                       |
| 23._2._2. | lgInt             |                                                            | **String\|Null**<br/> 予測長周期地震動階級を `0`, `1`, `2`, `3`, `4` で記載し、予想がない場合は **Null** とする                                                                                          |
|           |                   |                                                            |                                                                                                                                                                                                          |
| 23._3.    | intensity         |                                                            | **Object**<br/> 予測震度を記載する                                                                                                                                                                       |
| 23._3._1. | type              |                                                            | **String**<br/> 予想震度の計算手法を記載し、 `attenuation`（震源由来震度） または `plum`（PLUM法による震度予測）                                                                                         |
| 23._3._2. | k                 |                                                            | **String&lt;Float&gt;\|Null**<br/> 予想震度を記載し、予想がない場合は **Null** とする                                                                                                                    |
| 23._3._3. | int               |                                                            | **String\|Null**<br/> 予想震度階級を `0`, `1`, `2`, `3`, `4`, `5-`, `5+`, `6-`, `6+`, `7` で記載し、予想がない場合は **Null** とする                                                                     |

震源由来震度（従来法）、長周期地震動階級・絶対速度応答スペクトルは、深さ150km以下のものについて予想を行っています。

取消報（キャンセル時）の場合、前回の発表データ、予想を記載します。

```json
{
  "type": "eew",
  "eventId": "20240101160608",
  "serial": "13",
  "author": "気象庁本庁",
  "pressTime": "2024-01-01T16:06:24+09:00",
  "processTime": "2024-01-01T16:06:24.400+09:00", 
  "isTest": true,
  "isCanceled": false,
  "isLastInfo": false,
  "isPlumOnly": false,
  "isLevelOver": false,
  "isWarning": true,
  "epicenterName": "石川県能登地方",
  "epicenterLocation": [137.2, 37.5],
  "depth": 10,
  "magnitude": 5.6,
  "originTime": "2024-01-01T16:06:06+09:00",
  "arrivalTime": "2024-01-01T16:06:08+09:00",
  "accuracy": {
    "epicenters": ["4", "4"],
    "depth": "4",
    "magnitudeCalculation": "4",
    "numberOfMagnitudeCalculation": "4"
  },
  "maxInt": {"from": "5+", "to": "5+"},
  "maxLgInt": {"from": "1", "to": "1"},
  "regionForecasts": [
    {"code": "390", "maxInt": "5-"},
    {"code": "391", "maxInt": "3"},
    {"code": "400", "maxInt": "2"}
  ],
  "pointForecast": {
    "sWave": {
      "status": "ok",
      "time": "2024-01-01T16:07:00.000+09:00"
    },
    "lpgm": {
      "maxSva": "0.16",
      "lgInt": "0"
    },
    "intensity": {
      "type": "attenuation",
      "k": "1.09",
      "int": "1"
    }
  }
}
```
