---
slug: /reference/
title: DMDATA.JP API
---
防災情報に関するAPIを提供しているDMDATA.JPですが、以下の方法によって提供しています。

* WebSocket
* PuLL

WebSocketの場合、同時接続の上限がかかりますが気象業務支援センターより配信された情報を即座に受け取ることができます。

本APIではTLSv1.2及び、TLSv1.3にのみ対応、安全な暗号スイートのみ有効化しています。

HTTP/1.1、HTTP/2に対応しています。

## API v2
現在運用中です。詳細は[こちら](/reference/api/v2/)

## API v1
**&#x1f6ab;下記のAPIは非推奨です。**
* [Socket Start v1](/reference/api/socket.v1/start)
* [Telegram List v1](/reference/api/telegram.v1/list)
* [Parameters Tsunami station v1](/reference/api/parameters/tsunami)
* [Parameters Earthquake station v1](/reference/api/parameters/earthquake)
* [WebSocket v1](/reference/api/websocket.v1/websocket)

**2021年10月22日18時に提供を終了します。**

なお、下記のAPIは今後も使用できます。
* [Telegram Data v1](/reference/api/v1/telegram.data)

## OAuth2.0
DMDATA.JPでは、OAuth2.0に対応しています。詳細は[こちら](/reference/oauth2/v1/)
