---
slug: /telegrams/
title: 配信データ
---

# 配信データの区分

DMDATA.JP では以下の通り区分を分けて配信を行っています。

|             区分              |        API 名        | 説明                           |
|:---------------------------:|:-------------------:|:-----------------------------|
|   [緊急地震（予報） 区分](#緊急地震予報)    |    eew.forecast     | 緊急地震速報（予報）の情報                |
|   [緊急地震（警報） 区分](#緊急地震警報)    |     eew.warning     | 緊急地震速報（警報）の情報                |
|    [地震・津波関連 区分](#地震津波関連)    | telegram.earthquake | 地震・津波に関連する情報                 |
|      [火山関連 区分](#火山関連)       |  telegram.volcano   | 火山に関連する情報                    |
| [気象警報・注意報関連 区分](#気象警報注意報関連) |  telegram.weather   | 気象警報や気象情報・台風情報などの防災気象に関連する情報 |
|  [定時報・その他関連 区分](#定時報その他関連)  | telegram.scheduled  | 大雨危険度通知や海上警報など               |

## このドキュメント上での注意

このドキュメントでは XML 内容の表現として /Report/ ~~~ として、タグの名前をスラッシュで区切り、だんだんと階層が深くなっていきます。

時刻などが記載されている場合、断りがない限り日本時間となります。

## データ形式

- XML : [気象庁防災情報 XML フォーマット](https://xml.kishou.go.jp)によるもの
- A/N : 英文字・数字・記号・カタカナで構成される 1 バイト文字で作成された電文、形式は資料ごとに異なります。
- Binary : 世界気象機関が定める 2 進数形式通報式 FM94 BUFR または FM92 GRIB の仕様に沿った情報。
- JSON化 : Project DM-D.S.Sが独自に定めた[JSONスキーマ](/docs/reference/conversion/json/index.md)。

## 配信データのリスト

### 緊急地震（予報）

| 資料名                      | XML:/Report/Control/Title | データ種類コード | データ形式 | JSON化                                                       | 備考 |
|--------------------------|---------------------------|----------|-------|-------------------------------------------------------------|--|
| [緊急地震速報（予報）](ew09030)    | 緊急地震速報（予報）                | VXSE44   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) |  |
| [緊急地震速報（地震動予報）](ew09040) | 緊急地震速報（地震動予報）             | VXSE45   | XML   | [準備中](/docs/reference/conversion/json/schema/eew-information.md) | ※2022年度後半より配信開始 |
| [緊急地震速報テスト](ew09010)     | 緊急地震速報テスト                 | VXSE42   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) |  |

### 緊急地震（警報）

| 資料名                   | XML:/Report/Control/Title | データ種類コード | データ形式 | JSON化                                                       | 備考  |
|-----------------------|---------------------------|----------|-------|-------------------------------------------------------------|-----|
| [緊急地震速報（警報）](ew09020) | 緊急地震速報（警報）                | VXSE43   | XML   | [配信中](/docs/reference/conversion/json/schema/eew-information.md) |     |

### 地震・津波関連

| 資料名                                | XML:/Report/Control/Title | データ種類コード | データ形式 | JSON化                                                                    | 備考             |
|------------------------------------|---------------------------|----------|-------|--------------------------------------------------------------------------|----------------|
| [震度速報](et01310)                    | 震度速報                      | VXSE51   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                |
| [地震情報（震源に関する情報）](et01320)          | 震源に関する情報                  | VXSE52   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                |
| [地震情報（震源・震度に関する情報）](et01330)       | 震源・震度に関する情報               | VXSE53   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                |
| [地震情報（地震の活動状況等に関する情報）](et01340)    | 地震の活動状況等に関する情報            | VXSE56   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-explanation.md)       |                |
| [地震情報（地震回数に関する情報）](et01350)        | 地震回数に関する情報                | VXSE60   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-counts.md)            |                |
| [地震情報（顕著な地震の震源要素更新のお知らせ）](et01360) | 顕著な地震の震源要素更新のお知らせ         | VXSE61   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-hypocenter-update.md) |                |
| [長周期地震動に関する観測情報](et01370)          | 長周期地震動に関する観測情報            | VXSE62   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       | 2022年度後半から配信開始 |
| [南海トラフ地震臨時情報](et01410)             | 南海トラフ地震臨時情報               | VYSE50   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-nankai.md)            |                |
| [南海トラフ地震関連解説情報（定例外）](et01420)      | 南海トラフ地震関連解説情報             | VYSE51   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-nankai.md)            |                |
| [南海トラフ地震関連解説情報（定例）](et01421)       | 南海トラフ地震関連解説情報             | VYSE52   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-nankai.md)            |                |
| [津波警報・注意報・予報](et01110)             | 津波警報・注意報・予報a              | VTSE41   | XML   | [配信中](/docs/reference/conversion/json/schema/tsunami-information.md)          |                |
| [津波情報](et01120)                    | 津波情報a                     | VTSE51   | XML   | [配信中](/docs/reference/conversion/json/schema/tsunami-information.md)          |                |
| [津波情報（沖合の津波観測に関する情報）](et01121)     | 沖合の津波観測に関する情報             | VTSE52   | XML   | [配信中](/docs/reference/conversion/json/schema/tsunami-information.md)          |                |
| [国際津波関連情報（国内向け）](et01130)          |                           | WEPA60   | A/N   |                                                                          |                |
| [地震・津波に関するお知らせ](et01010)           | 地震・津波に関するお知らせ             | VZSE40   | XML   | [配信中](/docs/reference/conversion/json/schema/earthquake-information.md)       |                |

### 火山関連

| 資料名                        | XML:/Report/Control/Title | データ種類コード            | データ形式 | JSON化                                                           | 備考  |
|----------------------------|---------------------------|---------------------|-------|-----------------------------------------------------------------|-----|
| [噴火警報・予報](vo01710)         | 噴火警報・予報                   | VFVO50              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [火山の状況に関する解説情報](vo01720)   | 火山の状況に関する解説情報             | VFVO51              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [噴火に関する火山観測報](vo01730)     | 噴火に関する火山観測報               | VFVO52              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [火山現象に関する海上警報・予報](vo01740) | 火山現象に関する海上警報・予報           | VFSVii (ii = 50-61) | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [降灰予報（定時）](vo01810)        | 降灰予報（定時）                  | VFVO53              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [降灰予報（速報）](vo01820)        | 降灰予報（速報）                  | VFVO54              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [降灰予報（詳細）](vo01830)        | 降灰予報（詳細）                  | VFVO55              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [噴火速報](vo01750)            | 噴火速報                      | VFVO56              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |
| [火山に関するお知らせ](vo01020)      | 火山に関するお知らせ                | VZVO40              | XML   | [配信中](/docs/reference/conversion/json/schema/volcano-information.md) |     |

### 気象警報・注意報関連

| 資料名                                          | XML:/Report/Control/Title | データ種類コード          | データ形式 | JSON化                                                              | 備考                 |
|----------------------------------------------|---------------------------|-------------------|-------|--------------------------------------------------------------------|--------------------|
| &#x1f6ab; [特別警報/警報/注意報](we02010)             | 気象特別警報・警報・注意報             | VPWW53            | XML   |                                                                    | VPWW54の経過移行措置として配信 |
| [特別警報/警報/注意報 （新しいステージに対応した防災気象情報）](we02050)  | 気象警報・注意報（Ｈ２７）             | VPWW54            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-warning.md)        |                    |
| [特別警報報知](we02020)                            | 特別警報報知                    | VPNO50            | XML   |                                                                    |                    |
| [記録的短時間大雨情報](we02030)                        | 記録的短時間大雨情報                | VPOA50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-warning.md)        |                    |
| [全般気象情報](we02310)                            | 全般気象情報                    | VPZJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [地方気象情報](we02320)                            | 地方気象情報                    | VPCJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [府県気象情報](we02330)                            | 府県気象情報                    | VPFJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [全般気象情報 （社会的に影響の大きい天候に関する情報）](we02410)       | 全般天候情報                    | VPZI50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-impact-society.md) |                    |
| [地方気象情報 （社会的に影響の大きい天候に関する情報）](we02420)       | 地方天候情報                    | VPCI50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-impact-society.md) |                    |
| [府県気象情報 （社会的に影響の大きい天候に関する情報）](we02430)       | 府県天候情報                    | VPFI50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-impact-society.md) |                    |
| [早期天候情報](we02560)                            | 早期天候情報                    | VPAW51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-early.md)          |                    |
| [竜巻注意情報](we02520)                            | 竜巻注意情報                    | VPHW50            | XML   |                                                                    |                    |
| [竜巻注意情報（目撃情報付き）](we02521)                    | 竜巻注意情報（目撃情報付き）            | VPHW51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-tornado.md)        |                    |
| [スモッグ気象情報](we02530)                          | スモッグ気象情報                  | VPSG50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [全般スモッグ気象情報](we02540)                        | 全般スモッグ気象情報                | VPZS50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [台風全般情報（総合情報、上陸等情報）](we02610)                | 全般台風情報                    | VPTI50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [台風全般情報（位置、発生情報）](we02620)                   | 全般台風情報（定型）                | VPTI51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [発達する熱帯低気圧に関する情報](we02620)                   | 全般台風情報（定型）                | VPTI51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [全般台風情報（位置詳細）](we02630)                      | 全般台風情報（詳細）                | VPTI52            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [台風解析・予報情報電文（５日進路・強度予報）](we02670)            | 台風解析・予報情報（５日予報）（Ｈ３０）      | VPTWii (ii=60-65) | XML   | [配信中](/docs/reference/conversion/json/schema/weather-typhoon.md)        |                    |
| &#x1f6ab; [~~台風解析・予報情報電文（５日進路予報）~~](we02660) | 台風解析・予報情報（５日予報）           | VPTWii (ii=50-55) | XML   |                                                                    | 廃止                 |
| &#x1f6ab; [~~台風解析・予報情報電文~~](we02650)         | 台風解析・予報情報（３日予報）           | VPTWii (ii=40-45) | XML   |                                                                    | 廃止                 |
| &#x1f6ab; [台風の暴風域に入る確率](we02690)             |                           | FXJPii (ii=51-56) | A/N   |                                                                    | 2022年03月09日15時終了   |
| &#x1f6ab; [台風の暴風域に入る確率（5 日）](we02695)        |                           | FXJPii (ii=61-72) | A/N   |                                                                    | 今後廃止予定             | 
| [台風に関する情報（定時）](we02680)                      |                           | WTJPii (ii=21-26) | A/N   |                                                                    |                    |
| [台風に関する情報（臨時）](we02680)                      |                           | WTJPii (ii=31-36) | A/N   |                                                                    |                    |
| [台風の暴風域に入る確率（Ｒ２）（電文）](we02691)               | 台風の暴風域に入る確率               | VPTAii (ii=50-55) | XML   |                                                                    |                    |
| [土砂災害警戒情報](we02710)                          | 土砂災害警戒情報                  | VXWW50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-landslide.md)      |                    |
| [指定河川洪水予報](we02810)                          | 指定河川洪水予報                  | VXKOii (ii=50-89) | XML   | [配信中](/docs/reference/conversion/json/schema/weather-river-flood.md)    |                    |
| &#x1f6ab; [~~地方高温注意情報~~](we02550)            | 地方高温注意情報                  | VPCT50            | XML   |                                                                    | 廃止                 |
| [熱中症警戒アラート](we02551)                         | 熱中症警戒アラート                 | VPFT50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [全般潮位情報](we02210)                            | 全般潮位情報                    | VMCJ50            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [地方潮位情報](we02220)                            | 地方潮位情報                    | VMCJ51            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |
| [府県潮位情報](we02230)                            | 府県潮位情報                    | VMCJ52            | XML   | [配信中](/docs/reference/conversion/json/schema/weather-information.md)    |                    |

### 定時報・その他関連

| 資料名                        | XML:/Report/Control/Title | データ種類コード | データ形式 | 備考              |
|----------------------------|---------------------------|----------|-------|-----------------|
| [大雨危険度通知](sc02070)         | 大雨危険度通知                   | VPRN50   | XML   | データサイズが大きいので注意。 |
| [全般海上警報（定時）（Ｈ２９）](sc02115) |                           | WWJP27   | A/N   |                 |
| [全般海上警報（臨時）（Ｈ２９）](sc02115) |                           | WWJP28   | A/N   |                 |
| [全般海上警報（定時）（Ｈ２９）](sc02110) | 全般海上警報（定時）（Ｈ２９）           | VPZU52   | XML   |                 |
| [全般海上警報（臨時）（Ｈ２９）](sc02110) | 全般海上警報（臨時）（Ｈ２９）           | VPZU53   | XML   |                 |
| [地方海上警報（Ｈ２８）](sc02120)     | 地方海上警報（Ｈ２８）               | VPCU51   | XML   |                 |

## 電文のサンプル

電文のサンプルをシナリオ別（事象）又は個別に掲載しています。

※ 準備中

## 更新履歴

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
- 2020/09/28 - 開設
