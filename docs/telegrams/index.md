---
slug: /telegrams/
title: 配信データ（電文）
---

# 配信データの区分

DMDATA.JP では以下の通り区分を分けて配信を行っています。

|                 区分                 |        API 名         | 説明                           |
|:----------------------------------:|:--------------------:|:-----------------------------|
|       [緊急地震（予報） 区分](#緊急地震予報)       |     eew.forecast     | 緊急地震速報（予報）の情報                |
|       [緊急地震（警報） 区分](#緊急地震警報)       |     eew.warning      | 緊急地震速報（警報）の情報                |
| [緊急地震（リアルタイム震度） 区分](#緊急地震リアルタイム震度) |     eew.realtime     | 緊急地震速報のPLUM法で用いる予報基礎資料       |
|       [地震・津波関連 区分](#地震津波関連)        | telegram.earthquake  | 地震・津波に関連する情報                 |
|          [火山関連 区分](#火山関連)          |   telegram.volcano   | 火山に関連する情報                    |
|    [気象警報・注意報関連 区分](#気象警報注意報関連)     |   telegram.weather   | 気象警報や気象情報・台風情報などの防災気象に関連する情報 |
|        [天気予報関連 区分](#天気予報関連)        |  telegram.forecast   | 天気予報・概況、2週間気温予報、季節予報など       |
|        [気象観測関連 区分](#気象観測関連)        | telegram.observation | 地上・海上・高層・海洋観測等など             |
|     [定時報・その他関連 区分](#定時報その他関連)      |  telegram.scheduled  | 大雨危険度通知や海上予報・警報など            |
|        [雷観測データ 区分](#雷観測データ)        |  telegram.lightning  | LIDENによる前1分間雷観測データ           |

「緊急地震（予報）区分」と「緊急地震（警報）区分」で配信するデータは「緊急地震速報」と呼び、<br/>
「地震・津波関連区分」、「火山関連区分」、「気象警報・注意報区分」、「天気予報関連区分」、「気象観測関連区分」、「定時報・その他関連区分」、「雷観測データ区分」は「電文」と呼ぶ場合があります。

## このドキュメント上での注意

このドキュメントでは XML 内容の表現として /Report/ ~~~ として、タグの名前をスラッシュで区切り、だんだんと階層が深くなっていきます。

時刻などが記載されている場合、断りがない限り日本時間となります。

## データ形式

- XML : [気象庁防災情報 XML フォーマット](https://xml.kishou.go.jp)によるもの
- A/N : 英文字・数字・記号・カタカナで構成される 1 バイト文字（カタカナはShift-JIS）で作成された電文、形式は資料ごとに異なります。
- Binary : 世界気象機関が定める2進数形式通報式 FM94 BUFR、FM92 GRIB の仕様に沿った情報、または資料独自の形式。
- JSON : Project DM-D.S.Sが独自に定めた[JSONスキーマ](/docs/reference/conversion/json/index.md)。


:::info 情報
データ形式は、APIの `format` で表記します（すべて小文字）。
:::

## 配信データのリスト

### 緊急地震（予報）

| 資料名                             | XML:/Report/Control/Title | データ種類コード | データ形式 | JSON化                                                            | 備考        |
|---------------------------------|---------------------------|----------|-------|------------------------------------------------------------------|-----------|
| &#x1f6ab; [緊急地震速報（予報）](ew09030) | 緊急地震速報（予報）                | VXSE44   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) | ※配信終了時期未定 |
| [緊急地震速報（地震動予報）](ew09040)        | 緊急地震速報（地震動予報）             | VXSE45   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) |           |
| [緊急地震速報テスト](ew09010)            | 緊急地震速報テスト                 | VXSE42   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) |           |

### 緊急地震（警報）

| 資料名                   | XML:/Report/Control/Title | データ種類コード | データ形式 | JSON化                                                            | 備考 |
|-----------------------|---------------------------|----------|-------|------------------------------------------------------------------|----|
| [緊急地震速報（警報）](ew09020) | 緊急地震速報（警報）                | VXSE43   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) |    |

### 緊急地震（リアルタイム震度）

| 資料名                 | XML:/Report/Control/Title | データ種類コード | データ形式 | JSON化                                                            | 備考 |
|---------------------|---------------------------|----------|-------|------------------------------------------------------------------|----|
| [リアルタイム震度](ew09080) | リアルタイム震度                  | VXSE47   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) |    |

### 地震・津波関連

| 資料名                                | XML:/Report/Control/Title | データ種類コード | データ形式  | JSON化                                                                         | 備考                                   |
|------------------------------------|---------------------------|----------|--------|-------------------------------------------------------------------------------|--------------------------------------|
| [震度速報](et01310)                    | 震度速報                      | VXSE51   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                                      |
| [地震情報（震源に関する情報）](et01320)          | 震源に関する情報                  | VXSE52   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                                      |
| [地震情報（震源・震度に関する情報）](et01330)       | 震源・震度に関する情報               | VXSE53   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                                      |
| [地震情報（地震の活動状況等に関する情報）](et01340)    | 地震の活動状況等に関する情報            | VXSE56   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-explanation.md)       | VYSEii(ii=50,51,52)の<br/>移行措置配信が終了予定 |
| [地震情報（地震回数に関する情報）](et01350)        | 地震回数に関する情報                | VXSE60   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-counts.md)            |                                      |
| [地震情報（顕著な地震の震源要素更新のお知らせ）](et01360) | 顕著な地震の震源要素更新のお知らせ         | VXSE61   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-hypocenter-update.md) |                                      |
| [長周期地震動に関する観測情報](et01370)          | 長周期地震動に関する観測情報            | VXSE62   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                                      |
| [推計震度分布図作図用データ](et01380)           |                           | IXAC41   | Binary |                                                                               |                                      |
| [南海トラフ地震臨時情報](et01410)             | 南海トラフ地震臨時情報               | VYSE50   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-nankai.md)            |                                      |
| [南海トラフ地震関連解説情報（定例外）](et01420)      | 南海トラフ地震関連解説情報             | VYSE51   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-nankai.md)            |                                      |
| [南海トラフ地震関連解説情報（定例）](et01421)       | 南海トラフ地震関連解説情報             | VYSE52   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-nankai.md)            |                                      |
| [北海道・三陸沖後発地震注意情報](et01430)         | 北海道・三陸沖後発地震注意情報           | VYSE60   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-nankai.md)            | 2025年3月06日から配信開始                     |
| [津波警報・注意報・予報](et01110)             | 津波警報・注意報・予報a              | VTSE41   | XML    | [配信中](/docs/reference/conversion/json/schema/tsunami-information.md)          |                                      |
| [津波情報](et01120)                    | 津波情報a                     | VTSE51   | XML    | [配信中](/docs/reference/conversion/json/schema/tsunami-information.md)          |                                      |
| [津波情報（沖合の津波観測に関する情報）](et01121)     | 沖合の津波観測に関する情報             | VTSE52   | XML    | [配信中](/docs/reference/conversion/json/schema/tsunami-information.md)          |                                      |
| [国際津波関連情報（国内向け）](et01130)          |                           | WEPA60   | A/N    |                                                                               |                                      |
| [地震・津波に関するお知らせ](et01010)           | 地震・津波に関するお知らせ             | VZSE40   | XML    | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                                      |

### 火山関連

| 資料名                        | XML:/Report/Control/Title | データ種類コード            | データ形式 | JSON化                                                                | 備考  |
|----------------------------|---------------------------|---------------------|-------|----------------------------------------------------------------------|-----|
| [噴火警報・予報](vo01710)         | 噴火警報・予報                   | VFVO50              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [火山の状況に関する解説情報](vo01720)   | 火山の状況に関する解説情報             | VFVO51              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [噴火に関する火山観測報](vo01730)     | 噴火に関する火山観測報               | VFVO52              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [火山現象に関する海上警報・予報](vo01740) | 火山現象に関する海上警報・予報           | VFSVii (ii = 50-61) | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [降灰予報（定時）](vo01810)        | 降灰予報（定時）                  | VFVO53              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [降灰予報（速報）](vo01820)        | 降灰予報（速報）                  | VFVO54              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [降灰予報（詳細）](vo01830)        | 降灰予報（詳細）                  | VFVO55              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [噴火速報](vo01750)            | 噴火速報                      | VFVO56              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [推定噴煙流向報](vo01760)         | 推定噴煙流向報                   | VFVO60              | XML   |                                                                      |     |
| [火山に関するお知らせ](vo01020)      | 火山に関するお知らせ                | VZVO40              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |

### 気象警報・注意報関連

防災気象情報の体系整理を踏まえた電文の改変が2026年出水期を目途に行われる予定です。
（&#x1f6a9;：運用・一部電文内容の変更、または廃止予定あり、&#x1f195;：新しく運用開始される電文）

| 資料名                                                   | XML:/Report/Control/Title | データ種類コード          | データ形式 | JSON化                                                                   | 備考                                 |
|-------------------------------------------------------|---------------------------|-------------------|-------|-------------------------------------------------------------------------|------------------------------------|
| &#x1f6a9; &#x1f6ab; [特別警報/警報/注意報](we02010)            | 気象特別警報・警報・注意報             | VPWW53            | XML   |                                                                         | VPWW54の経過移行措置として配信<br/>2028年以降終了予定 |
| &#x1f6a9; [特別警報/警報/注意報 （新しいステージに対応した防災気象情報）](we02050) | 気象警報・注意報（Ｈ２７）             | VPWW54            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-warning.md)        | 2028年以降終了予定                        |
| &#x1f195; [大雨に関する警戒レベル情報](we02061)                    | 気象警報・注意報（Ｒ０６）（大雨）         | VPWW55            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [土砂災害に関する警戒レベル情報](we02062)                  | 気象警報・注意報（Ｒ０６）（土砂）         | VPWW56            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [高潮に関する警戒レベル情報](we02063)                    | 気象警報・注意報（Ｒ０６）（高潮）         | VPWW57            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [暴風・暴風雪に関する警報・注意報](we02064)                 | 気象警報・注意報（Ｒ０６）（暴風）         | VPWW58            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [波浪に関する警報・注意報](we02065)                     | 気象警報・注意報（Ｒ０６）（波浪）         | VPWW59            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [大雪に関する警報・注意報](we02066)                     | 気象警報・注意報（Ｒ０６）（大雪）         | VPWW60            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [その他の気象注意報](we02067)                        | 気象警報・注意報（Ｒ０６）（その他の注意報）    | VPWW61            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [警戒・注意事項と各気象要素の時系列予想](we02080)              | 気象警報・注意報時系列情報（Ｒ０６）        | VPWP50            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [警戒・注意事項を全要素した全国集約通報](we02069)              | 気象警報・注意報（Ｒ０６）（集約通報）       | VPWS50            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f6a9; [気象特別警報報知](we02020)                         | 気象特別警報報知                  | VPNO50            | XML   |                                                                         | 2028年以降終了予定                        |
| &#x1f6a9; [記録的短時間大雨情報](we02030)                       | 記録的短時間大雨情報                | VPOA50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-warning.md)        | 2028年以降終了予定                        |
| &#x1f6a9; [全般気象情報](we02310)                           | 全般気象情報                    | VPZJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2028年以降終了予定                        |
| &#x1f6a9; [地方気象情報](we02320)                           | 地方気象情報                    | VPCJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2028年以降終了予定                        |
| &#x1f6a9; [府県気象情報](we02330)                           | 府県気象情報                    | VPFJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2028年以降終了予定                        |
| &#x1f195; [気象防災速報](we02341)                           | 府県気象防災速報                  | VPBS50            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [気象防災速報（潮位）](we02342)                       | 府県気象防災速報（潮位）              | VPBS51            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [全般気象解説情報](we02311)                         | 全般気象解説情報                  | VPZJ51            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [地方気象解説情報](we02321)                         | 地方気象解説情報                  | VPCJ51            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [府県気象解説情報](we02331)                         | 府県気象解説情報                  | VPFJ51            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [全般気象解説情報（潮位）](we02312)                     | 全般気象防災速報（潮位）              | VMCJ53            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [地方気象解説情報（潮位）](we02322)                     | 地方気象防災速報（潮位）              | VMCJ54            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| &#x1f195; [府県気象解説情報（潮位）](we02332)                     | 府県気象防災速報（潮位）              | VMCJ55            | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| [全般気象情報 （社会的に影響の大きい天候に関する情報）](we02410)                | 全般天候情報                    | VPZI50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-impact-society.md) |                                    |
| [地方気象情報 （社会的に影響の大きい天候に関する情報）](we02420)                | 地方天候情報                    | VPCI50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-impact-society.md) |                                    |
| [早期天候情報](we02560)                                     | 早期天候情報                    | VPAW51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-early.md)          |                                    |
| &#x1f6a9; [全般潮位情報](we02210)                           | 全般潮位情報                    | VMCJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2028年以降終了予定                        |
| &#x1f6a9; [地方潮位情報](we02220)                           | 地方潮位情報                    | VMCJ51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2028年以降終了予定                        |
| &#x1f6a9; [府県潮位情報](we02230)                           | 府県潮位情報                    | VMCJ52            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2028年以降終了予定                        |
| &#x1f6a9; [竜巻注意情報](we02520)                           | 竜巻注意情報                    | VPHW50            | XML   |                                                                         |                                    |
| &#x1f6a9; [竜巻注意情報（目撃情報付き）](we02521)                   | 竜巻注意情報（目撃情報付き）            | VPHW51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-tornado.md)        |                                    |
| &#x1f6a9; [台風全般情報（総合情報、上陸等情報）](we02610)               | 全般台風情報                    | VPTI50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2026年出水期を目途に終了予定                   |
| &#x1f6a9; [台風全般情報（位置、発生情報）](we02620)                  | 全般台風情報（定型）                | VPTI51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2026年出水期を目途に終了予定                   |
| &#x1f6a9; [発達する熱帯低気圧に関する情報](we02620)                  | 全般台風情報（定型）                | VPTI51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2026年出水期を目途に終了予定                   |
| &#x1f6a9; [全般台風情報（位置詳細）](we02630)                     | 全般台風情報（詳細）                | VPTI52            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    | 2026年出水期を目途に終了予定                   |
| [台風解析・予報情報電文（５日進路・強度予報）](we02670)                     | 台風解析・予報情報（５日予報）（Ｈ３０）      | VPTWii (ii=60-65) | XML   | [配信中](/docs/reference/conversion/json/schema/weather-typhoon.md)        |                                    |
| [台風に関する情報（定時）](we02680)                               |                           | WTJPii (ii=21-26) | A/N   |                                                                         |                                    |
| [台風に関する情報（臨時）](we02680)                               |                           | WTJPii (ii=31-36) | A/N   |                                                                         |                                    |
| [台風の暴風域に入る確率（Ｒ２）（電文）](we02691)                        | 台風の暴風域に入る確率               | VPTAii (ii=50-55) | XML   |                                                                         |                                    |
| &#x1f6a9; [土砂災害警戒情報](we02710)                         | 土砂災害警戒情報                  | VXWW50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-landslide.md)      | 2028年以降終了予定                        |
| [指定河川洪水予報](we02810)                                   | 指定河川洪水予報                  | VXKOii (ii=50-89) | XML   | [配信中](/docs/reference/conversion/json/schema/weather-river-flood.md)    |                                    |
| &#x1f195; （新）指定河川洪水予報（未定）                             |                           |                   | XML   |                                                                         | 配信開始時期未定                           |
| &#x1f195; [水位周知河川に関する情報](we02821)                     | 水位周知河川に関する情報              | VXSUii (ii=50-59) | XML   | 準備中                                                                     | 2026年出水期を目途に配信開始                   |
| [熱中症警戒アラート](we02551)                                  | 熱中症警戒アラート                 | VPFT50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                                    |

### 天気予報関連

防災気象情報の体系整理を踏まえた電文の改変が2026年出水期を目途に行われる予定です。
（&#x1f6a9;：運用・一部電文内容の変更、または廃止予定あり、&#x1f195;：新しく運用開始される電文）

| 資料名                                        | XML:/Report/Control/Title             | データ種類コード | データ形式 | JSON化                                                                         | 備考               |
|--------------------------------------------|---------------------------------------|----------|-------|-------------------------------------------------------------------------------|------------------|
| [府県天気予報／地域時系列予報](fo03010)                  | 府県天気予報（Ｒ１）                            | VPFD51   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-prefecture.md)          |                  |
| [天気概況](fo03020)                            | 天気概況                                  | VPFG50   | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)          |                  |
| &#x1f6a9; [早期注意情報（明日までの警報級の可能性）](fo03050)  | 警報級の可能性（明日まで）                         | VPFD60   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-warning-possibility.md) | 2028年以降終了予定      |
| &#x1f195; [早期注意情報（明日までの警報級の可能性）](fo03051)  | 早期注意情報（明日まで）（Ｒ０６）                     | VPFD61   | XML   | 準備中                                                                           | 2026年出水期を目途に配信開始 |
| [府県週間天気予報](fo03130)                        | 府県週間天気予報                              | VPFW50   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-prefecture.md)          |                  |
| &#x1f6a9; [早期注意情報（明後日以降の警報級の可能性）](fo03150) | 警報級の可能性（明後日以降）                        | VPFW60   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-warning-possibility.md) |
| [全般季節予報](fo03210)                          | 全般１か月予報 <br/> 全般３か月予報 <br/> 全般暖・寒候期予報 | VPZK50   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-season.md)              |
| [地方季節予報](fo03220)                          | 地方１か月予報 <br/> 地方３か月予報 <br/> 地方暖・寒候期予報 | VPCK50   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-season.md)              |
| [全般2週間気温予報](fo03230)                       | 全般季節予報（２週間気温予報）                       | VPZK70   | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)          |
| [地方2週間気温予報](fo03240)                       | 地方季節予報（２週間気温予報）                       | VPCK70   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-2week-temperature.md)   |
| [地上実況図（天気図情報）](fo03510)                    | 地上実況図                                 | VZSA50   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-weathermap.md)          |
| [地上24時間予想図（天気図情報）](fo03520)                | 地上２４時間予想図                             | VZSF50   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-weathermap.md)          |
| [地上48時間予想図（天気図情報）](fo03530)                | 地上４８時間予想図                             | VZSF51   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-weathermap.md)          |
| [アジア太平洋地上天気図（天気図情報）](fo03540)              | アジア太平洋地上実況図                           | VZSA60   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-weathermap.md)          |
| [アジア太平洋海上悪天24時間予想図（天気図情報）](fo03550)        | アジア太平洋海上悪天２４時間予想図                     | VZSF60   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-weathermap.md)          |
| [アジア太平洋海上悪天48時間予想図（天気図情報）](fo03560)        | アジア太平洋海上悪天４８時間予想図                     | VZSF61   | XML   | [配信中](/docs/reference/conversion/json/schema/forecast-weathermap.md)          |

### 気象観測関連

| 資料名                                   | XML:/Report/Control/Title | データ種類コード                                                                                                                                                                                          | データ形式  | JSON化 | 備考                                 |
|---------------------------------------|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|-------|------------------------------------|
| [地上気象実況報 コード形式](ob04010)              |                           | ﾁｼﾞﾖｳ                                                                                                                                                                                             | A/N    |       | 国内(SYNOP報)                         |
| [地上気象実況報 コード形式](ob04010)              |                           | S@JPii (@=I,M,N, ii=60-61)                                                                                                                                                                        | A/N    |       | 国内(SYNOP報)                         |
| [地上気象実況報 バイナリ形式](ob04015)             |                           | IS#&01 (#&=IC,IL,MC,ML,NC) <br/> IS#&11 (#&=IC,MC,NC) <br/> ISNC02                                                                                                                                | Binary |       | 国測(SYNOP報)                         |
| [地上気象実況報 コード形式](ob04010)              |                           | SMAA01 <br/> S@AA21 (@=I,N)                                                                                                                                                                       | A/N    |       | 昭和基地(SYNOP報)                       |
| [地上気象実況報 バイナリ形式](ob04015)             |                           | IS#&01 (#&=IL,ML,NL)                                                                                                                                                                              | Binary |       | 昭和基地(SYNOP報)                       |
| [地上気象実況報 コード形式](ob04010)              |                           | SI#&60 (#&=CI,KO,KR,RA) <br/> SICI80 <br/> SIPA20 <br/> SMAEii (ii=40,41) <br/> SMASii (ii=92,93) <br/> SM#&60 (#&=CI,KO,KR,RA) <br/> SMCI80 <br/> SMMO40 <br/> SM#&92 (#&=AU,NA,XS) <br/> SMPA01 | A/N    |       | 海外(SYNOP報)                         |
| [地上気象実況報 バイナリ形式](ob04015)             |                           | IS@#ii (@=I,M,N, #=A~L,N,S,T,X)                                                                                                                                                                   | Binary |       | 海外編集(SYNOP報)                       |
| [地上高層実況気象報に関する連絡報](ob04020)           |                           | ｺｿ                                                                                                                                                                                                | A/N    |       |                                    |
| &#x1f6ab; [地上高層実況気象報 コード形式](ob04021)  |                           | ｺｿ1 <br/> ｺｿ2                                                                                                                                                                                     | A/N    |       | 国内(TEMP報) <br/> 廃止予定               |
| &#x1f6ab; [地上高層実況気象報 コード形式](ob04021)  |                           | U@JP01 (@=E,K,L,S) <br/> U@JP60 (@=K,S)                                                                                                                                                           | A/N    |       | 国内(TEMP報) <br/> 廃止予定               |
| &#x1f6ab; [地上高層実況気象報 バイナリ形式](ob04022) |                           | IUSCii (ii=01-12)                                                                                                                                                                                 | Binary |       | 国内(TEMP報) <br/> 廃止予定               |
| [地上高層実況気象報 バイナリ形式](ob04022)           |                           | IU#&ii (#&=KL, SLii=01,02)                                                                                                                                                                        | Binary |       | 国内(TEMP報)                          |
| [高分解能地上高層実況気象報](ob04023)              |                           | IU#Cii (#=K,S, ii=60-75)                                                                                                                                                                          | Binary |       | 国内                                 |
| [地上高層実況気象報 コード形式](ob04021)            |                           | USAA01 <br/> UKAA01 <br/> ULAA01 <br/> UEAA01                                                                                                                                                     | A/N    |       | 昭和基地(TEMP報)                        |
| [地上高層実況気象報 コード形式](ob04021)            |                           | U@#&ii (@=E,G,K,L,P,S, #&=RA,CI,MO,PH,PA,AE,HK,KO,KR, ii=01,17,27,40,41,60,80) <br/> USAE40 <br/> USPA01                                                                                          | A/N    |       | 海外(TEMP報)                          |
| [地上高層実況気象報 バイナリ形式](ob04022)           |                           | IU@#ii (@=K,S, #=A~L,N,S,T,X)                                                                                                                                                                     | Binary |       | 海外編集(TEMP報)                        |
| [地上高層風実況気象報](ob04025)                 |                           | IU@#ii (@=J,W, #=A~L,N,S,T,X)                                                                                                                                                                     | Binary |       | 海外編集(PILOT報)                       |
| [ドロップゾンデ高層実況気象報](ob04026)             |                           | IUD#ii (#=A~L,N,S,T,X)                                                                                                                                                                            | Binary |       | TEMP DROP                          |
| [海上気象実況報](ob04110)                    |                           | U@S@#&ii (@=I,M,N, #=V,W, &=B,D,E,X, ii=10,11,20~25,41)                                                                                                                                           | A/N    |       | SHIP報                              |
| &#x1f6ab; [海上高層実況気象報](ob04120)        |                           | U@VX01 (@=E,K,L,P,S) <br/> UGVX20                                                                                                                                                                 | A/N    |       | TEMP-SHIP報、PILOT-SHIP報 <br/> 廃止予定　 |
| [高分解能海上高層実況気象報](ob04125)              |                           | IU#C8i (#=K,S, i=0,1) <br/> IUSX40                                                                                                                                                                | Binary |       |                                    |
| [海上気象実況報](ob04110)                    |                           | SHVXii (ii=41~45)                                                                                                                                                                                 | A/N    |       | SHIP報                              |
| [海洋気象ブイロボット実況報](ob04210)              |                           | SSVBii (ii=01~19)                                                                                                                                                                                 | A/N    |       | BUOY報                              |
| [潮位実況報](ob04310)                      |                           | ISTC61 <br/> ISTC62                                                                                                                                                                               | Binary |       |                                    |
| [潮位観測報](ob04320)                      |                           | ISTC81 <br/> ISTC82                                                                                                                                                                               | Binary |       |                                    |
| [高潮異常潮観測通報](ob04330)                  |                           | ﾁﾖｳｲｶﾝｼ                                                                                                                                                                                           | A/N    |       |                                    |
| [沿岸波浪観測報](ob04410)                    |                           | SWJP60                                                                                                                                                                                            | A/N    |       |                                    |
| [特殊気象報](ob04510)                      | 季節観測　<br/> 特殊気象報          | VGSK50 <br/> VGSK60                                                                                                                                                                               | XML    |       |                                    |
| [生物季節観測報告気象報](ob04610)                | 生物季節観測                    | VGSK55                                                                                                                                                                                            | XML    |       |                                    |
| [地上月気候統計値 コード形式](ob05010)             |                           | CSJPii (ii=01~07) <br/> CSAA01                                                                                                                                                                    | A/N    |       | CLIMAT報                            |
| [地上月気候統計値 バイナリ形式](ob05011)            |                           | IS#&01 (#&=CC,CL)                                                                                                                                                                                 | Binary |       | CLIMAT報                            |
| [地上月気候統計値 バイナリ形式](ob05011)            |                           | ISC#ii (#=A\~L,N,S,T,X, ii=01\~45)                                                                                                                                                                | Binary |       | 海外編集(CLIMAT報)                      |
| [気象衛星資料解析気象報](ob05110.md)             |                           | IUCC10                                                                                                                                                                                            | Binary |       | SAREP報                             |

※海外編集は、伝統的文字通報式（A/N）からBUFR報に編集したデータ。

### 定時報・その他関連

| 資料名                        | XML:/Report/Control/Title | データ種類コード | データ形式 | 備考              |
|----------------------------|---------------------------|----------|-------|-----------------|
| [大雨危険度通知](sc02070)         | 大雨危険度通知                   | VPRN50   | XML   | データサイズが大きいので注意。 |
| [全般海上警報（定時）（Ｈ２９）](sc02115) |                           | WWJP27   | A/N   |                 |
| [全般海上警報（臨時）（Ｈ２９）](sc02115) |                           | WWJP28   | A/N   |                 |
| [全般海上警報（定時）（Ｈ２９）](sc02110) | 全般海上警報（定時）（Ｈ２９）           | VPZU52   | XML   |                 |
| [全般海上警報（臨時）（Ｈ２９）](sc02110) | 全般海上警報（臨時）（Ｈ２９）           | VPZU53   | XML   |                 |
| [地方海上警報（Ｈ２８）](sc02120)     | 地方海上警報（Ｈ２８）               | VPCU51   | XML   |                 |
| [地方海上予報（Ｈ２８）](sc03310)     | 地方海上予報（Ｈ２８）               | VPCY51   | XML   |                 |

### 雷観測データ

| 資料名               | XML:/Report/Control/Title | データ種類コード | データ形式  | 備考              |
|-------------------|---------------------------|----------|--------|-----------------|
| [雷観測データ](li10010) |                           | VPJP40   | Binary |                 |

### 廃止された電文

過去に配信され、現在は配信していない資料になります。

| 資料名                                              | XML:/Report/Control/Title | データ種類コード          | データ形式 | JSON化                                                                                                          | 備考 |
|--------------------------------------------------|---------------------------|-------------------|-------|----------------------------------------------------------------------------------------------------------------|----|
| &#x1f6ab; [府県気象情報 （社会的に影響の大きい天候に関する情報）](we02430) | 府県天候情報                    | VPFI50            | XML   | [weather-impact-society v1.0.0](/docs/reference/conversion/json/schema/legacy/weather-impact-society_1.0.0.md) |    |
| &#x1f6ab; [スモッグ気象情報](we02530)                    | スモッグ気象情報                  | VPSG50            | XML   | [weather-information v1.0.0](/docs/reference/conversion/json/schema/weather-information.md)                    |    |
| &#x1f6ab; [全般スモッグ気象情報](we02540)                  | 全般スモッグ気象情報                | VPZS50            | XML   | [weather-information v1.0.0](/docs/reference/conversion/json/schema/weather-information.md)                    |    |
| &#x1f6ab; [台風解析・予報情報電文（５日進路予報）](we02660)         | 台風解析・予報情報（５日予報）           | VPTWii (ii=50-55) | XML   |                                                                                                                |    |
| &#x1f6ab; [台風解析・予報情報電文](we02650)                 | 台風解析・予報情報（３日予報）           | VPTWii (ii=40-45) | XML   |                                                                                                                |    |
| &#x1f6ab; [台風の暴風域に入る確率](we02690)                 |                           | FXJPii (ii=51-56) | A/N   |                                                                                                                |    |
| &#x1f6ab; [台風の暴風域に入る確率（5日）](we02695)             |                           | FXJPii (ii=61-72) | A/N   |                                                                                                                |    | 
| &#x1f6ab; [地方高温注意情報](we02550)                    | 地方高温注意情報                  | VPCT50            | XML   |                                                                                                                |    |


## 電文のサンプル

XML電文については、[気象庁防災情報XMLフォーマット 情報提供ページ](https://xml.kishou.go.jp/tec_material.html)にて提供されていますのでそちらを参照してください。

一部XML電文・その他については、各配信資料ページにサンプルリンクを掲載していますのでご利用ください。

## 更新履歴

- 2025/01/08 - 南海トラフ関連情報の移行措置配信の終了時期について追記
- 2024/12/11 - 配信資料に関する技術情報 第637号 の発行に伴う変更
- 2024/10/31 - 配信資料に関する技術情報 第634号 の発行に伴う変更・資料追加
- 2024/09/30 - 配信資料に関する技術情報 第630号 の発行に伴う追記
- 2024/08/21 - 配信資料に関する技術情報 第628号 の発行に伴う追記
- 2024/07/17 - 配信資料に関する技術情報 第626号、第627号 の発行に伴う追記
- 2024/06/03 - 予報・気象観測・雷データの区分を新しく追加
- 2024/05/28 - 配信資料に関する技術情報 第625号 の発行に伴う追記
- 2024/05/20 - 地方海上予報（Ｈ２８）を追加
- 2024/04/29 - 配信資料に関するお知らせなどを追加
- 2024/03/13 - 配信資料に関する技術情報 第622号 の発行に伴う追記
- 2024/01/05 - 配信資料に関する技術情報 第620号 の発行に伴う追記
- 2023/02/16 - 推定噴煙流向報の配信開始に伴う追加
- 2023/01/11 - 推計震度分布図のサンプルリンク追加
- 2022/12/01 - リアルタイム震度 を追加
- 2022/09/30 - FXJPii(ii=51-56) が終了していたためその旨追記
- 2022/08/01 - 長周期地震動関連プロダクト開始時期の変更
- 2022/07/15 - 配信資料に関する技術情報 第591号 の発行に伴う追記
- 2022/03/16 - 配信資料に関する技術情報 第585号 の発行に伴う追記
- 2022/02/10 - 配信資料に関する技術情報 第573号 の発行に伴う追記
- 2022/01/30 - 緊急地震速報についての配信資料を追加
- 2022/01/24 - 台風の暴風域に入る確率（FXJP）の終了について追記
- 2022/01/09 - 配信資料に関する技術情報 第573号 の発行に伴う追記
- 2021/12/22 - 長周期地震動に関する情報のドキュメント追加
- 2021/10/08 - JSON化スキーマを確定
- 2021/06/28 - 配信資料に関する技術情報 第564号 の発行に伴う追記
- 2021/06/11 - 一部台風関連プロダクト終了時期の確定
- 2021/06/09 - 指定河川洪水予報の技術資料を更新
- 2021/02/25 - 一部台風関連プロダクトの配信開始・終了時期の変更
- 2021/02/02 - 配信資料に関する仕様へのリンクを追加
- 2021/01/20 - 地方高温注意情報の廃止、府県高温注意情報を熱中症警戒アラートへ変更の記載
- 2021/01/01 - 電文一覧をこのページに移動
- 2020/12/21 - 技術資料の追加
- 2020/10/26 - 気象庁組織再編に伴う解説資料の差し替え
