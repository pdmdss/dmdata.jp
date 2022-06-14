---
slug: /reference/
title: DMDATA.JP Reference
---

## API

防災情報に関するAPIを提供しているDMDATA.JPですが、以下の方法によって提供しています。

* WebSocket
* PuLL

WebSocketの場合、同時接続の上限がかかりますが気象業務支援センターより配信された情報を即座に受け取ることができます。

本APIではTLSv1.2及び、TLSv1.3にのみ対応、安全な暗号スイートのみ有効化しています。

HTTP/1.1、HTTP/2に対応しています。

### API v2

現在運用中です。詳細は[こちら](/docs/reference/api/v2/index.md)

### OAuth2.0

DMDATA.JPでは、OAuth2.0に対応しています。詳細は[こちら](/docs/reference/oauth2/v1/index.md)

## JSON Schema

気象庁防災情報XMLフォーマット電文について、本サービスでJSON化したデータを同様に配信しています。

[詳細はこちら](/docs/reference/conversion/json/index.md)。
