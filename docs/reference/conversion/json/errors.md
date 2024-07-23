---
title: JSON化データのスキーマチェック結果
---

DMDATA.JP では、配信したJSONデータのスキーマチェックを常時行い、スキーマ通りに変換が行われていることを確認しています。

その結果、スキーマチェックエラーとなったJSONデータを一覧にしていますのでご参考ください。
なお、手動更新につきリアルタイム反映はできません。

| JSON電文ID | 配信資料名         | スキーマ                   | バージョン | 配信日時                | エラーの内容                                                       | 備考                                                                           |
|----------|---------------|------------------------|-------|---------------------|--------------------------------------------------------------|------------------------------------------------------------------------------|
| b1b6bb5  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | 2024/05/15 14:21:26 | OfficeInfo->URL 要素が一部存在しない                                   | 訓練配信                                                                         |
| 29a7bb3  | 津波情報a         | tsunami-information    | 1.0.0 | 2023/10/09 08:25:11 | MaxHeight 要素の欠落                                              | [配信資料に関するお知らせ (2023/10/13)](https://dmdata.jp/docs/jma/notice/20231013a.pdf) |
| 334a029  | 津波情報a         | tsunami-information    | 1.0.0 | 2023/10/09 07:52:08 | MaxHeight 要素の欠落                                              | [配信資料に関するお知らせ (2023/10/13)](https://dmdata.jp/docs/jma/notice/20231013a.pdf) |
| 5454ae2  | 津波情報a         | tsunami-information    | 1.0.0 | 2023/10/09 07:45:17 | MaxHeight 要素の欠落                                              | [配信資料に関するお知らせ (2023/10/13)](https://dmdata.jp/docs/jma/notice/20231013a.pdf) |
| 6cb0fa2  | 地方天候情報        | weather-impact-society | 1.0.0 | 2023/07/20 11:00:03 | MeteorologicalInfos->MeteorologicalInfo->Item[2] 要素（梅雨明け）の欠落 |                                                                              |
| 38a0ac9  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | 2023/06/03 04:54:52 | OfficeInfo->URL 要素が一部存在しない                                   |                                                                              |
| 14a5407  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | 2023/06/03 00:53:43 | OfficeInfo->URL 要素が一部存在しない                                   |                                                                              |
| f47afdb  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | 2023/05/10 13:40:43 | OfficeInfo->URL 要素が一部存在しない                                   | 訓練配信                                                                         |
| 6790453  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | 2023/05/10 10:10:23 | OfficeInfo->URL 要素が一部存在しない                                   | 訓練配信                                                                         |
| 6b45f5e  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | 2023/01/30 10:20:30 | OfficeInfo->URL 要素が一部存在しない                                   | 訓練配信                                                                         |
| 0c4474c  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | 2023/01/30 10:02:17 | OfficeInfo->URL 要素が一部存在しない                                   | 訓練配信                                                                         |
| 203c587  | リアルタイム震度      | eew-information        | 1.0.0 | 2023/01/16 13:52:54 | 短縮震央地名未設定地域で発生したと推定する地震によるEEWで、短縮震央地名が入らなかった                 | [配信資料に関する技術情報 第567号](https://dmdata.jp/docs/jma/technical/567.pdf)           |
| 1da39b8  | 緊急地震速報（予報）    | eew-information        | 1.0.0 | 2023/01/16 13:52:54 | 短縮震央地名未設定地域で発生したと推定する地震によるEEWで、短縮震央地名が入らなかった                 | [配信資料に関する技術情報 第567号](https://dmdata.jp/docs/jma/technical/567.pdf)           |
| 8a0e4c3  | リアルタイム震度      | eew-information        | 1.0.0 | 2023/01/16 13:52:53 | 短縮震央地名未設定地域で発生したと推定する地震によるEEWで、短縮震央地名が入らなかった                 | [配信資料に関する技術情報 第567号](https://dmdata.jp/docs/jma/technical/567.pdf)           |
| de79633  | 緊急地震速報（予報）    | eew-information        | 1.0.0 | 2023/01/16 13:52:53 | 短縮震央地名未設定地域で発生したと推定する地震によるEEWで、短縮震央地名が入らなかった                 | [配信資料に関する技術情報 第567号](https://dmdata.jp/docs/jma/technical/567.pdf)           |
| ed8365a  | 気象警報・注意報（Ｈ２７） | weather-warning        | 1.0.0 | 2022/12/22 15:29:20 | Additionの空要素がたくさん不要に入った                                      | [配信資料に関するお知らせ (2022/12/22)](https://dmdata.jp/docs/jma/notice/20221222a.pdf) |
| cfe5837  | 気象警報・注意報（Ｈ２７） | weather-warning        | 1.0.0 | 2022/12/22 15:13:18 | Additionの空要素がたくさん不要に入った                                      | [配信資料に関するお知らせ (2022/12/22)](https://dmdata.jp/docs/jma/notice/20221222a.pdf) |
| e04f060  | 津波情報a         | tsunami-information    | 1.0.0 | 2022/10/20 14:11:37 | MaxHeight 要素の欠落                                              | 訓練配信                                                                         |
| 5454ae2  | 津波情報a         | tsunami-information    | 1.0.0 | 2022/10/20 13:25:47 | MaxHeight 要素の欠落                                              | 訓練配信                                                                         |
| 9423f25  | 府県潮位情報        | weather-information    | 1.0.0 | 2022/03/22 04:41:29 | Control->Title の内容が「府県潮位情報」でなかった                             | [配信資料に関するお知らせ (2022/03/22)](https://dmdata.jp/docs/jma/notice/20220322a.pdf) |
| c893da1  | 府県潮位情報        | weather-information    | 1.0.0 | 2022/03/22 04:19:43 | Control->Title の内容が「府県潮位情報」でなかった                             | [配信資料に関するお知らせ (2022/03/22)](https://dmdata.jp/docs/jma/notice/20220322a.pdf) |
| 4784752  | 府県潮位情報        | weather-information    | 1.0.0 | 2022/03/22 03:13:40 | Control->Title の内容が「府県潮位情報」でなかった                             | [配信資料に関するお知らせ (2022/03/22)](https://dmdata.jp/docs/jma/notice/20220322a.pdf) |
| 34a5754  | 府県潮位情報        | weather-information    | 1.0.0 | 2022/03/20 11:13:23 | Control->Title の内容が「府県潮位情報」でなかった                             | [配信資料に関するお知らせ (2022/03/22)](https://dmdata.jp/docs/jma/notice/20220322a.pdf) |
| b979699  | 府県潮位情報        | weather-information    | 1.0.0 | 2022/03/20 03:46:48 | Control->Title の内容が「府県潮位情報」でなかった                             | [配信資料に関するお知らせ (2022/03/22)](https://dmdata.jp/docs/jma/notice/20220322a.pdf) |
| 33163ff  | 降灰予報（速報）      | volcano-information    | 1.0.0 | N/A                 | CraterCoordinate が ISO8601 仕様外なデータにより要素解析失敗                  |                                                                              |
| b5752a6  | 全般台風情報        | weather-information    | 1.0.0 | N/A                 | Control->Title の内容が「全般台風情報」でなかった                             | [配信資料に関するお知らせ (2021/07/27)](https://dmdata.jp/docs/jma/notice/20210727a.pdf) |
| 43c532d  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | N/A                 | Warning->Item->Areas->Area 要素中の Code 要素が存在しない                | 訓練配信                                                                         |
| e88708c  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | N/A                 | Warning->Item->Areas->Area 要素中の Code 要素が存在しない                | 訓練配信                                                                         |
| 448b4f8  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | N/A                 | Warning->Item->Areas->Area 要素中の Code 要素が存在しない                | 訓練配信                                                                         |
| f3524a0  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | N/A                 | Warning->Item->Areas->Area 要素中の Code 要素が存在しない                | 訓練配信                                                                         |
| dc3567f  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | N/A                 | Warning->Item->Areas->Area 要素中の Code 要素が存在しない                | 訓練配信                                                                         |
| ea97624  | 指定河川洪水予報      | weather-river-flood    | 1.0.0 | N/A                 | Warning->Item->Areas->Area 要素中の Code 要素が存在しない                | 訓練配信                                                                         |

※電文ID は 最初の7ケタ
