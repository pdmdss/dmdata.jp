---
title: Schema weather-information v1.0.0
---

XMLをJSON化したデータのスキーマ情報を提供しています。

## 対象とするXML電文

* 全般気象情報 (VPZJ50)
* 地方気象情報 (VPCJ50)
* 府県気象情報 (VPFJ50)
* スモッグ気象情報 (VPSG50)
* 全般スモッグ気象情報 (VPZS50)
* 台風全般情報（総合情報、上陸等情報） (VPTI50)
* 台風全般情報（位置、発生情報） (VPTI51)
* 発達する熱帯低気圧に関する情報 (VPTI51)
* 全般台風情報（位置詳細） (VPTI52)
* 熱中症警戒アラート (VPFT50)
* 全般潮位情報 (VMCJ50)
* 地方潮位情報 (VMCJ51)
* 府県潮位情報 (VMCJ52)

## 共通ヘッダ

共通ヘッダは[こちら](../#schema-head)

## 本文

body フィールド内の定義となります。

| 階層 | フィールド | 出現条件 | 説明 | 
| -- | -- | -- | -- | 
| 1.? | target | 使用しない | **String**<br/> 電文が対象とする地域を記載する |
| 2. | notice |  | **String\|Null**<br/> お知らせを記載する  |
| 3. | comment |  | **String\|Null**<br/> 一般報の内容をテキスト形式で記述する |

## サンプル

### 気象情報

* [VPZJ50 - 大雨と雷及び突風に関する全般気象情報　第１号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpzj50_rjtd_20080902180007.json)
* [VPZJ50 - 大雨と雷及び突風に関する全般気象情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpzj50_rjtd_20090724180007.json)
* [VPZJ50 - 大雨と雷及び突風に関する全般気象情報　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpzj50_rjtd_20090724205007.json)
* [VPZJ50 - 大雨と雷及び突風に関する全般気象情報　第３号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpzj50_rjtd_20090725050507.json)
* [VPCJ50 - 大雨と突風に関する九州北部地方（山口県を含む）気象情報　第３号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpcj50_jpfk_20090724161410.json)
* [VPCJ50 - 大雨と突風に関する九州北部地方（山口県を含む）気象情報　第４号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpcj50_jpfk_20090724182810.json)
* [VPCJ50 - 大雨と突風に関する九州北部地方（山口県を含む）気象情報　第５号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpcj50_jpfk_20090724203010.json)
* [VPCJ50 - 大雨と落雷及び突風に関する近畿地方気象情報　第８号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpcj50_jpos_20080902163010.json)
* [VPFJ50 - 大雨と突風に関する福岡県気象情報　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpfj50_jpfk_20090724160903.json)
* [VPFJ50 - 大雨と突風に関する福岡県気象情報　第５号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpfj50_jpfk_20090724192003.json)
* [VPFJ50 - 大雨と突風に関する福岡県気象情報　第８号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpfj50_jpfk_20090724203503.json)
* [VPFJ50 - 大雨に関する鹿児島県（奄美地方を除く）気象情報　第３号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpfj50_jpkg_20080906213703.json)
* [VPFJ50 - 大雨と落雷に関する兵庫県気象情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpfj50_jpob_20130715091941.json)

### スモッグ気象情報

* [VPZG50 - 全般スモッグ気象情報（光化学オキシダント）　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpzs50_rjtd_20100627105945.json)
* [VPSG50 - スモッグ気象情報（光化学オキシダント）　第４号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpsg50_rjtd_20100827094016.json)
* [VPSG50 - スモッグ気象情報（光化学オキシダント）　第５号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpsg50_rjtd_20100827132516.json)
* [VPSG50 - スモッグ気象情報（光化学オキシダント）　第６号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpsg50_rjtd_20100827154016.json)
* [VPSG50 - スモッグ気象情報（光化学オキシダント）　第１１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpsg50_rjtd_20100830142516.json)

### 台風全般情報

* [VPTI50 - 平成２１年　台風第８号に関する情報　第１４号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti50_rjtd_20090805162508.json)
* [VPTI50 - 平成２１年　台風第８号に関する情報　第１４号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti50_rjtd_20090805163842.json)
* [VPTI50 - 発達する熱帯低気圧に関する情報　第０３の０２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti50_rjtd_20190919111324.json)
* [VPTI50 - 発達する熱帯低気圧に関する情報　第０１の０２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti50_rjtd_20200928170821.json)
* [VPTI50 - 発達する熱帯低気圧に関する情報　第０１の０２号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti50_rjtd_20200928171821.json)
* [VPTI50 - 発達する熱帯低気圧に関する情報　第０１の０２号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti50_rjtd_20200928172821.json)
* [VPTI50 - 発達する熱帯低気圧に関する情報　第０２の０６号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti50_rjtd_20200930174821.json)
* [VPTI51 - 平成１９年　台風第４号に関する情報](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20070709035508.json)
* [VPTI51 - 発達する熱帯低気圧に関する情報　第０１の０１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20070808043008.json)
* [VPTI51 - 平成２１年　台風第８号に関する情報　第２６号　（位置）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20090806134008.json)
* [VPTI51 - 平成２１年　台風第８号に関する情報　第２７号　（位置）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20090806144008.json)
* [VPTI51 - 発達する熱帯低気圧に関する情報　第０１の０１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20200928154711.json)
* [VPTI51 - 発達する熱帯低気圧に関する情報　第０１の０１号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20200928155211.json)
* [VPTI51 - 発達する熱帯低気圧に関する情報　第０１の０１号（訂正）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20200928155811.json)
* [VPTI51 - 発達する熱帯低気圧に関する情報　第０２の０５号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti51_rjtd_20200930160712.json)
* [VPTI52 - 平成１９年　台風第１１号に関する情報　第７３号付録　（位置詳細）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti52_rjtd_20070916155508.json)
* [VPTI52 - 平成２１年　台風第８号に関する情報　第２５号付録　（位置詳細）](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpti52_rjtd_20090806125008.json)


### 熱中症警戒アラート

* [VPFT50 - 東京都熱中症警戒アラート　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vpft50_rjtd_20200515050000.json)

### 潮位情報

* [VMCJ50 - 山陰から九州北部地方にかけての副振動に関する全般潮位情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vmcj50_rjtd_20090715201023.json)
* [VMCJ50 - 山陰から九州北部地方にかけての副振動に関する全般潮位情報　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vmcj50_rjtd_20090716103008.json)
* [VMCJ51 - 九州北部地方（山口県を含む）の副振動に関する地方潮位情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vmcj51_jpfk_20130715200513.json)
* [VMCJ51 - 九州北部地方（山口県を含む）の副振動に関する地方潮位情報　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vmcj51_jpfk_20130716100524.json)
* [VMCJ52 - 副振動に関する山口県潮位情報　第１号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vmcj52_jpfa_20090715194013.json)
* [VMCJ52 - 副振動に関する山口県潮位情報　第２号](https://sample.dmdata.jp/conversion/json/schema/weather-information/vmcj52_jpfa_20090716102536.json)
