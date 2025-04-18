---
title:  EEWについて
---

DMDATA.JPでは気象庁の発表する、緊急地震速報の配信を行っています。

## 配信の内容

気象庁から配信される緊急地震速報（予報及び警報）をそのままDMDATA.JPで再配信するものとなります。

配信する電文と配信区分は次の通りです。

* eew.forecast (緊急地震（予報）区分)
  * [VXSE42 緊急地震速報配信テスト](/docs/telegrams/ew09010.md)
  * [VXSE44 緊急地震速報（予報）](/docs/telegrams/ew09030.md) （廃止予定、VXSE45をご利用ください）
  * [VXSE45 緊急地震速報（地震動予報）](/docs/telegrams/ew09040.md) 
* eew.warning (緊急地震（警報）区分)
  * [VXSE43 緊急地震速報（警報）](/docs/telegrams/ew09020.md)
* eew.realtime (緊急地震（リアルタイム震度）区分)
  * [VXSE47 リアルタイム震度](/docs/telegrams/ew09080.md)


参考：[緊急地震速報（警報）及び（予報）について（気象庁）](https://www.data.jma.go.jp/eew/data/nc/shikumi/shousai.html)

:::caution 注意
[長周期地震動階級に基づく基準を追加した緊急地震速報の配信（2023年02月01日より）](https://dmdata.jp/doc/jma/technical/566.pdf)の開始に伴い、当サービスでも新しい配信資料「VXSE45 緊急地震速報（地震動予報）」の配信をしています。

それに伴いまして、重複・古い形式の配信となる「VXSE44 緊急地震速報（予報）」は当面の間配信を継続しますが、今後配信の終了を予定しています。
VXSE44の配信終了日時が決定しましたら、改めてお知らせいたします。
:::

### 配信の方法

**WebSocketによる配信のみ**の提供となります。

緊急地震速報の電文を[事後的に参照するためのAPI](/docs/reference/api/v2/gd.eew.list.md)があります(緊急地震（予報）区分契約者のみ)。

過去配信した緊急地震速報電文をまとめて利用したい場合は、[Archive API](/docs/reference/api/v2/archive.list.md)をご利用ください。

#### 配信順序

気象庁が発表（送信）した順番でDMDATA.JPから配信しますが、以下のような配信順序（表の上から順番に配信）となっています。

|  データ種類コード  |       電文名       |  n報   |
|:----------:|:---------------:|:-----:|
|   VXSE44   |   緊急地震速報（予報）    |   1   |
|   VXSE45   |  緊急地震速報（地震動予報）  |   1   |
|   VXSE43   |   緊急地震速報（警報）    |   1   |
|   VXSE47   |    リアルタイム震度     |   1   |
|   VXSE44   |   緊急地震速報（予報）    |   2   |
|   VXSE45   |  緊急地震速報（地震動予報）  |   2   |
|   VXSE43   |   緊急地震速報（警報）    |   2   |
|   VXSE47   |    リアルタイム震度     |   2   |
|    ...     |       ...       |  ...  |
|   VXSE44   |   緊急地震速報（予報）    |   n   |
|   VXSE45   |  緊急地震速報（地震動予報）  |   n   |
|   VXSE43   |   緊急地震速報（警報）    |   n   |
|   VXSE47   |    リアルタイム震度     |   n   |

VXSE43については、警報発表・更新基準に達した場合に発表されます。
それ以外のVXSE44、45、47については、上の表の通りに発表されます。

なお、この配信順序は2025年03月01日時点のものであり保証するものではありません。配信順序は予告なく変更される場合があります。

### JSON化データ

気象庁から送られてくるXMLデータのほか、DMDATA.JPで独自で定めたJSON化データも配信します。

定義仕様は[こちら](/docs/reference/conversion/json/schema/eew-information.md)。

## 訓練報の配信について

毎年11月頃、気象庁により実施・配信されます。
[緊急地震速報を活用した訓練について（気象庁HP）](https://www.data.jma.go.jp/svd/eew/data/nc/kunren/kunren.html)

実際に訓練が行われます際には、6~8週間程度前を目途にお知らせするとともに、前日にも実施のお知らせを致します。
当日の地震・気象状況によっては中止となる場合もございます。

また訓練報は、APIに対して明示的にテスト報を取得する設定なっている場合のみ配信いたします。

## 利用する上での注意点

特にDMDATA.JPで緊急地震速報を利用する際の注意点と、緊急地震速報自体の特性による注意点がありますので、開発の際は下記にご留意ください。

### 開発者の方向け

* 配信データは、**必ずしも発表された順番どおりには配信されません**。
  * 0.1秒単位で発表され、処理などの差により入れ違えが発生する可能性があります。
  * 必ず、古いデータ(Serialで番号が古いなど)は破棄するか反映をしない処理を加えてください。
  * Serialは、取消時（キャンセル報）には1つ前のデータと同じSerialが振られたデータが配信されます。


* 緊急地震速報は**1秒間に最大20報程度配信**されることがあります。
  * 緊急地震速報の発表処理に係る気象庁システム上の限界となります。

* 1点観測（レベル法、IPF法1点、仮定震源要素\[PLUM法のみ]による震度予測がない緊急地震速報）による緊急地震速報については精度が低いことが多いため、
  ユーザーに表示しない・置換するか、あらかじめユーザーに説明する必要があります。
  * レベル法（1点100gal以上観測した場合）は、地震以外の事象により発表される場合が多くあります。
  * IPF法1点は、震源精度が低い場合があります。また、気象庁による震度予測(Body/Intensity要素)はありません。
  * 仮定震源要素\[PLUM法のみ]となった緊急地震速報に、観測点数等の精度情報はありませんが、震度予測(Body/Intensity要素)の有無で1点/2点以上が判別できます。


* 緊急地震速報の**訓練報を配信することがあります**ので、取り扱いは十分に注意の上ご利用ください。
  * DMDATA.JPでは、訓練報など通常ではないデータは、明示的に指定しない限り配信しません。
  * アプリケーション等で訓練を表示する際、ユーザーが即座に訓練と分かる表示をしてください。


* **レベル法・仮定震源**の緊急地震速報では、**震源要素をユーザーへ表示しない・置換する対策をするか注意文を記載**してください。
  * 通常の震源を計算するIPF法・着未着法・EPOS震源が利用できない場合に、100gal以上(レベル法による処理)・リアルタイム震度2.5以上(PLUM法による処理)を観測した地震又は事象に対して、
    利用できない震源要素に変わって「初めに観測（条件を満たした）した地点の緯度経度」「深さ10km」「仮想的な発生時刻」「M1.0」の仮想的な震源要素を記載します。
    この仮想的な震源要素は、地震学的に意味のない・電文の仕様互換性を持たせるために記載されるものでありますので、十分に理解のないユーザーへ表示される場合は、適切に置換するなどの対処を行ってください。


* 緊急地震速報（警報）を使用する場合は、規模や深さを表示しないようにしてください。
* 緊急地震速報電文のリアルタイムに行なわれる（当配信サービスから見ての）**二次配信はエンドユーザーまでの到達が遅くなる可能性があるため推奨しません**。
* DMDATA.JPのデータを使い、地震動予報業務を行うことはできません。
* アプリケーション等で外部へ配布する際は、一般の方向けへの注意文を必ず明記してください。

### 一般の方向け

* 地震発生後、数秒で情報を作成するため、誤報が発生することがあります。
* 地震検知直後の情報は震源やマグニチュードの推定や、予測震度の精度が低いことがあります。
* 通常でも推定震度は1階級程度の誤差があります。
* PLUM法のみの情報・100gal検知の場合、震源要素（規模、深さ、震央）は地震学的に意味がない仮の値となります。
* 深さ150kmより深い地震の場合、予想最大震度は発表されません（※PLUM法により発表される場合があります）。
* ご利用の通信環境により、発表から情報到達まで1秒以上かかる可能性があります。5Mbps以上の安定した通信環境をご用意ください。

### 再配信ポリシー

個人向けのプランを契約で、当配信サービスから受け取った緊急地震速報（予報）の内容を、広く公開するAPI等の提供は禁止させていただいておりますが、以下の図にある制限内での利用はできます。

なお、ソフトウエア等を利用してYouTubeやTwitter(X)等への配信・動画投稿についてはこのポリシー対象外とし、ご利用ただけます。

**法人契約（法人・団体アカウント、契約区分の後に（法人）とついているもの）の場合はこのポリシーに関係なくご利用いただけます。**

10月31日以降は連絡の必要はありません。

![](/img/eew-policy.svg)


このポリシーは、データ配信に係る費用の公平な負担をお願いするものです。


* 2023年10月31日 改訂 - 改訂による変更がありますが、 すでにDMDATA.JPから許可を得ている場合、追加の連絡等は不要で引き続きご利用いただけます。
* 2023年07月03日 改訂 - 改訂による変更がありますが、 すでにDMDATA.JPから許可を得ている場合、追加の連絡等は不要でご利用いただけます。
* 2023年01月01日 制定

## 気象庁のガイドライン対応状況について

本サービスでは、緊急地震速報（予報）・リアルタイム震度電文を配信する配信事業者であるため、
「[緊急地震速報を適切に利用するために必要な受信端末の機能及び配信能力に関するガイドライン](https://www.data.jma.go.jp/svd/eew/data/nc/katsuyou/receive.html)」の対応状況について記載するものです。

なお、本サービスで行っている緊急地震速報（業）についてのガイドライン対応状況については、[こちらを参照](/eewclient/guidline)ください。

DMDATA.JPでは、気象庁の指定事業者である（一財）気象業務支援センター（JMBSC)から直接電文を受け取っています。

---

**気象庁が緊急地震速報(予報)・リアルタイム震度電文を発表してから緊急地震速報(予報／業)等を端末に届けるのに要する時間**

気象庁が緊急地震速報を発表してからDMDATA.JPのWebSocketによる配信開始するまでの時間は1秒未満でありますが、
インターネット経由での配信であるため、通信状況によっては利用者に到達するまで1秒以上かかる場合があります。

DMDATA.JP内での処理時間平均（電文を受け取ってから利用者へ配信が開始できる状態になるまで）はXML電文で10ms、JSON化電文で15～70msです。

JMBSCとDMDATA.JP間のping平均は7msです。

---

**気象庁から端末まで配信を途切れさせないような対策**

JMBSCとDMDATA.JPの間は常に地理冗長化された通信と処理システム（東京と大阪）を構築し、万が一片方が使用不能となった場合でも正常に稼働しているサーバーへ連携して配信をします。

DMDATA.JPから利用者へ緊急地震速報の配信を行うWebSocketサーバーは、おおよそ3ヶ月毎に再起動を行っています。
その間に地震が起き緊急地震速報が発表されても受信できるよう、利用者側で[複数のサーバーに接続する](/docs/reference/api/v2/websocket.md#エンドポイント情報)などの対策が必要となります。

WebSocketサーバー再起動は、1つずつ行い複数のサーバーが同時に再起動によって利用できなくなることはありません。

また、データベース障害が発生しても既に接続されているWebSocketの配信には影響が出ない仕組みになっています。

---

**サーバーや回線のセキュリティ対策**

JMBSCとDMDATA.JPの間は、VPN接続による受信を行っています。
また、DMDATA.JP内部のデータのやりとりはAWSのプライベート空間で完結するようになっております。

DMDATA.JPと利用者間の通信はHTTPS化（TLSv1.2以降のみ）されている場合のみWebSocketへの接続ができます。

---

**不正な緊急地震速報(予報／業)等のサーバーでの破棄条件**

データサイズの不一致や電文のハッシュ比較により、一致しない場合は破棄を行います。

---

**サーバーの時刻合わせ**

常に適切な時計合わせを行っています。

---

**サーバーの設置環境**

クラウド環境を使用しているため、耐震・停電対策済みといたします。

---

**サーバーや端末の故障時等保守対応**

DMDATA.JPの配信サービスの障害時には、メールでお知らせするほか[status.dmdata.jp](https://status.dmdata.jp/)でも提供を行います。

障害発生時には24時間対応致します。

---

**端末利用者への連絡手段・内容**

メールで電文の改廃や訓練などのお知らせを行います。
