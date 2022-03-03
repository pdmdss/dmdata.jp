---
slug: /reference/oauth2/v1 
title: OAuth2 v1
---

## 概要

DMDATA.JPでは、認可にOAuth2.0を使用します。 認可コードフロー/リフレッシュトークンフロー、インプリシットフロー、クライアント・クレデンシャルズフローをサポートしています。

RFC6749、RFC7009、RFC7636にて定義されている仕様に沿って認可サーバーは実装(一部コアな実装を除く)されています。

** アカウント連携などの認証 (OpenID Connect) はサポートしていません。 **

### OAuth クライアント

OAuth2.0では、作成したアプリケーションごとにクライアント必要です。クライアントの発行は、[認証情報](https://manager.dmdata.jp/control/credentials)よりできます。

また、リダイレクトURIや使用するフロー、製作者の公開連絡先、アプリケーションの公開URL、利用規約、プライバシーポリシーが必要です。

#### クライアントの種類

OAuthではクライアントの種類が2つ定められており、「機密」と「公開」があります。

**公開**は、クライアントシークレットキーが保護できないWebアプリケーションや、ネイティブアプリケーションに使用します。 クライアント・クレデンシャルズフローは使用できません。

**機密**は、クライアントシークレットキーが保護できるごく限られたWebサーバーなどに使用します。

クライアントの種類が機密の場合、トークンエンドポイントにリクエストする際、シークレットキーが必要となります。

### エンドポイント

#### 認可エンドポイント

`https://manager.dmdata.jp/account/oauth2/v1/auth`

#### トークンエンドポイント

`https://manager.dmdata.jp/account/oauth2/v1/token`

#### トークン確認用エンドポイント

`https://manager.dmdata.jp/account/oauth2/v1/introspect`

#### 失効エンドポイント

`https://manager.dmdata.jp/account/oauth2/v1/revoke`

### リダイレクトURI

このOAuthでは、事前にクライアントに設定されたリダイレクトURIと**厳密に一致**するかチェックしています。

しかし、ローカル環境では使用できるポートやhttpスキーマが不定であるということから、下記に全て一致するリダイレクトURIついてはポートやhttpスキーマのチェックをしません。

* スキーム名が `http` であること。
* ホストが `localhost` または IPv4アドレス `127.0.0.1` ～ `127.255.255.254` の範囲内であること。
* クライアントに設定されたリダイレクトURIが上記であり、ポートが指定されていないこと。
* [認可コードを要求](#1-認可コードを要求)する時にリダイレクトURIが指定されていること。

**以下はポートをチェックしない例です。**

* クライアントに設定されたリダイレクトURI <br/> http://127.10.10.1/code
* 実際に認可コードを要求する時に使用するリダイレクトURI <br/> http://127.10.10.1:8080/code

-->> 許可

**以下はポートをチェックする例です。**

* クライアントに設定されたリダイレクトURI <br/> http://127.10.10.1:9090/code
* 実際に認可コードを要求する時に使用するリダイレクトURI <br/> http://127.10.10.1:8080/code

-->> 拒否

* クライアントに設定されたリダイレクトURI <br/> http://127.10.10.1:9090/code
* 実際に認可コードを要求する時に使用するリダイレクトURI <br/> http://127.10.10.1:9090/code

-->> 許可

**以下はhttpスキーマをチェックしない例です。**

* クライアントに設定されたリダイレクトURI <br/> http://127.10.10.1/code
* 実際に認可コードを要求する時に使用するリダイレクトURI <br/> https://127.10.10.1/code

-->> 許可

* クライアントに設定されたリダイレクトURI <br/> http://127.10.10.1/code
* 実際に認可コードを要求する時に使用するリダイレクトURI <br/> https://127.10.10.1:8080/code

-->> 許可

**以下はhttpスキーマをチェックする例です。**

* クライアントに設定されたリダイレクトURI <br/> https://127.10.10.1:9090/code
* 実際に認可コードを要求する時に使用するリダイレクトURI <br/> http://127.10.10.1:9090/code

-->> 拒否

* クライアントに設定されたリダイレクトURI <br/> https://127.10.10.1:9090/code
* 実際に認可コードを要求する時に使用するリダイレクトURI <br/> https://127.10.10.1:9090/code

-->> 許可

## 認可コードフロー

このフローではWebサーバーアプリケーションや、Webアプリ、ネイティブアプリケーション等に適しています。

**認可エンドポイント**に認可リクエストを送信し、ユーザーに認可されると、DMADTA.JPは登録されたリダイレクトURIに認可コードを送信します。

OAuth クライアントは、受け取った認可コードを**トークンエンドポイント**にアクセストークンを発行要求し、認可が完了すると、各種APIにアクセスできるアクセストークンを送信します。

また、セキュリティ対策のため、**state**を必須としているほか、ネイティブアプリケーション（特にiOSやAndroid）においては認可コード横取り攻撃の対策のため、[PKCE(Proof Key for Code Exchange)](https://tools.ietf.org/html/rfc7636)の実装を推奨します。

### 1. 認可コードを要求

認可エンドポイントに各種パラメータを含めて要求します。

```
https://manager.dmdata.jp/account/oauth2/v1/auth
?client_id=CId.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
&response_type=code
&redirect_uri=https:%2F%2Fmanager.dmdata.jp%2Fcontrol%2Faccount
&response_type=query
&scope=telegram.list%20telegram.get.earthquake%20telegram.data
&state=abcd
&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
&code_challenge_method=S256
```

Query パラメータ

|パラメータ名|必須|説明|
|:--|:-:|:--|
|client_id|はい|**String** <br/> OAuth クライアント毎に割り当てられた、`CId.`で始まるID|
|response_type|はい|**String** <br/> 認可コードフローでは、`code`を指定する必要があります。|
|redirect_uri|はい|**String** <br/> 認可コードを送信するURIで、OAuth クライアントで指定されたリダイレクトURIを厳密に一致させる必要があります。<br/>[リダイレクトURI](#リダイレクトURI)にあるようにローカル環境で、変数的な要素を含む場合は必須です。<br/>クライアントに設定したリダイレクトURIが1個のみで、実際のリダイレクト先と一致する場合は必要ではありません。|
|scope|はい|**String** <br/> ユーザーから認可を求めるスコープ（権限）。複数含める場合はスペースで区切ります。|
|response_mode|オプション|**String** <br/> 認可コードを送信する際に使用する場所を指定します。<br/>`query`、`fragment`、`form_post`を指定でき、デフォルトでは`query`が指定されています。<br/>また、パラメータ`response_type`に`token`が含まれる場合`query`は選択できません。|
|state|はい|**String** <br/> `state`はCSRF対策の一環で実装が必須です。<br/>またこの値は一意の値であり、64バイト以下である必要があります。<br/>この値は認可コード発行時にリダイレクトURIと一緒に返答されます。|
|code_challenge|オプション|**String** <br/> PKCEを使用し、認可コードを保護します。<br/>パラメータ`code_challenge_method`が含まれている場合必須です。|
|code_challenge_method|オプション|**String** <br/> `code_challenge`のエンコードを示すメソッド。<br/>`S256`と`plain`が使用できますが、`S256`を推奨します。|

リクエストが送信されると、ユーザーへの認可要求ページが表示されます。ユーザーが認可すると、`redirect_uri`と`response_mode`に基づき認可コードと`state`を送信します。

#### 成功した応答 response_mode=query

```
https://manager.dmdata.jp/control/account
?code=ACe.AAAAAAAAAAAAAAAAAAAAAAAA
&state=abcd
```

Query パラメータ

|パラメータ名|説明|
|:--|:--|
|code|**String** <br/> 要求に対して発行された`ACe.`で始まる認可コード。<br/>この認可コードを使用してアクセストークンを要求します。<br/>この認可コードの有効期間は5分間です。|
|state|**String** <br/> 要求にある`state`と同じ値を返答します。<br/>クライアントは要求に含めた`state`と一致するかどうか検証する必要があります。|

#### 成功した応答 response_mode=fragment

```
https://manager.dmdata.jp/control/account
#code=ACe.AAAAAAAAAAAAAAAAAAAAAAAA
&state=abcd
```

#### 成功した応答 response_mode=form_post

リダイレクトURIにPOSTを実行し、リクエストBody内にformとして送信します。

```http request
POST /control/account
Host: manager.dmdata.jp
Content-Type: application/x-www-form-urlencoded

code=ACe.AAAAAAAAAAAAAAAAAAAAAAAA
&state=abcd
```

#### エラー

ユーザーが拒否したなど認可に失敗した場合、次のようにリダイレクトURIに送信します。

```
https://manager.dmdata.jp/control/account
?error=access_denied
&state=abcd
```

また、リダイレクトURIを特定できないか、認可ページ表示段階で失敗している場合は、リダイレクトは発生しません。

|パラメータ名|説明|
|:--|:--|
|error|**String** <br/> エラーの際に使用するエラーコード。|
|error_description|**String** <br/> エラーの際、どのような問題が発生しているか、具体的に記述したメッセージ。|
|state|**String** <br/> 要求にある`state`と同じ値を返答します。|

返答するエラーコードは以下の通りです。

|エラーコード|説明|
|:--|:--|
|invalid_request|リクエストされたパラメーターが足りないか、パラメータの値が正しくありません。|
|invalid_client|リクエストされた`client_id`が見つかりません。|
|invalid_redirect_uri|リクエストされた`redirect_uri`が設定されたリダイレクトURIと一致しません。|
|invalid_scope|リクエストされた`scope`が正しくない形式か、存在しないスコープが含まれています。|
|unauthorized_client|クライアントは指定された方法で認可コードを取得することを許可されていません。|
|access_denied|ユーザーが認可を拒否しました。|
|recaptcha_verification_failed|Google reCaptchaの検証に失敗。これを受け取った場合、もう一度認可フローを最初から実行する必要があります。|
|unsupported_response_type|認可サーバーは、リクエストされた`response_type`をサポートしていません。|
|unsupported_code_challenge_method|認可サーバーは、リクエストされた`code_challenge_method`をサポートしていません。|
|no_signin|ユーザーがサインインしていません。通常このエラーは出現しません。|
|server_error|内部エラーにより処理できません。|

### 2. アクセストークンを要求

認可コードを取得したら、次はトークンエンドポイントにアクセストークン発行要求を実行します。

トークンエンドポイントにPOST要求、フォームでデータを渡します。

```http request
POST /account/oauth2/v1/token
Host: manager.dmdata.jp
Content-Type: application/x-www-form-urlencoded

client_id=CId.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
&client_secret=CSt.SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
&grant_type=authorization_code
&code=ACe.AAAAAAAAAAAAAAAAAAAAAAAA
&redirect_uri=https:%2F%2Fmanager.dmdata.jp%2Fcontrol%2Faccount
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

Form パラメータ

|パラメータ名|必須|説明|
|:--|:-:|:--|
|client_id|はい|**String** <br/> OAuth クライアント毎に割り当てられた、`CId.`で始まるID|
|client_secret|オプション|**String** <br/> OAuth クライアント毎に割り当てられた、`CSt.`で始まるシークレットキー。<br/>[クライアントの種類](#クライアントの種類)が「機密」の場合は必須です。|
|grant_type|はい|**String** <br/> 認可コードフローでは、`authorization_code`を指定する必要があります。|
|code|はい|**String** <br/> 認可コード要求で取得した`ACe.`で始まる認可コード。|
|redirect_uri|はい|**String** <br/> 認可コード要求する際にパラメータに入力した`redirect_uri`を指定します。<br/>クライアントに設定したリダイレクトURIが1個のみで、実際のリダイレクト先と一致する場合は必要ではありません。 |
|code_verifier|オプション|**String** <br/> 認可コード要求時に、PKCEが使用されていた場合は必須です。|

#### 成功した応答

```json
{
  "access_token": "ATn.TTTTTTTTTTTTTTTTTTTTTTTTTTT",
  "token_type": "Bearer",
  "expires_in": 21600,
  "refresh_token": "ARh.RRRRRRRRRRRRRRRRRRRRRRRRRRR",
  "scope": "telegram.list telegram.get.earthquake telegram.data"
}
```

|パラメータ名|説明|
|:--|:--|
|access_token|**String** <br/> `ATn.`で始まるアクセストークン。|
|token_type|**String** <br/> アクセストークンの種類を示し、`Bearer`で固定です。|
|expires_in|**Integer** <br/> アクセストークンの有効期間（秒）。6時間有効です。|
|refresh_token|**String** <br/> アクセストークンの有効期限が切れた場合、このリフレッシュトークンを使用して、[アクセストークンを再度発行](#3-アクセストークンを更新する)できます。<br/>リフレッシュトークンは、半年が有効期間ですが使用するごとに半年期限が延長されます。|
|scope|**String** <br/> アクセストークンに付与されたスコープ。|


#### エラー

```json
{
  "error": "invalid_request",
  "error_description": "The client_id is missing."
}
```

|パラメータ名|説明|
|:--|:--|
|error|**String** <br/> エラーの際に使用するエラーコード。|
|error_description|**String** <br/> エラーの際、どのような問題が発生しているか、具体的に記述したメッセージ。|

返答するエラーコードは以下の通りです。

|エラーコード|説明|
|:--|:--|
|invalid_request|リクエストされたパラメーターが足りないか、パラメータの値が正しくありません。|
|invalid_client|リクエストされた`client_id`が見つかりません。|
|invalid_redirect_uri|リクエストされた`redirect_uri`が設定されたリダイレクトURIと一致しません。|
|invalid_grant|認可コードが見つかりませんでした。|
|invalid_code_verifier|PKCE検証に失敗しました。|
|unauthorized_client|クライアントは指定された方法で取得することが許可されていません、。|
|unsupported_grant_type|認可サーバーは、リクエストされた`grant_type`をサポートしていません。|
|server_error|内部エラーにより処理できません。|

### 3. アクセストークンを再取得

アクセストークンは、有効期間が短いため続けて使用する際はアクセストークンをリフレッシュトークンフローで再度取得する必要があります。トークンエンドポイントを使用し、[2. アクセストークンを要求する](#2-アクセストークンを要求)で取得したリフレッシュトークンを使用します。

トークンエンドポイントにPOST要求、フォームでデータを渡します。

```http request
POST /account/oauth2/v1/token
Host: manager.dmdata.jp
Content-Type: application/x-www-form-urlencoded

client_id=CId.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
&client_secret=CSt.SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
&grant_type=refresh_token
&refresh_token=ARh.RRRRRRRRRRRRRRRRRRRRRRRRRRR
```

Form パラメータ

|パラメータ名|必須|説明|
|:--|:-:|:--|
|client_id|はい|**String** <br/> OAuth クライアント毎に割り当てられた、`CId.`で始まるID|
|client_secret|オプション|**String** <br/> OAuth クライアント毎に割り当てられた、`CSt.`で始まるシークレットキー。<br/>[クライアントの種類](#クライアントの種類)が「機密」の場合は必須です。|
|grant_type|はい|**String** <br/> リフレッシュトークンフローでは、`refresh_token`を指定する必要があります。|
|refresh_token|はい|**String** <br/> 認可コード要求で取得した`ARh.`で始まるリフレッシュトークン。|

#### 成功した応答

```json
{
  "access_token": "ATn.TTTTTTTTTTTTTTTTTTTTTTTTTTT",
  "token_type": "Bearer",
  "expires_in": 21600,
  "scope": "telegram.list telegram.get.earthquake telegram.data"
}
```

|パラメータ名|説明|
|:--|:--|
|access_token|**String** <br/> `ATn.`で始まるアクセストークン。|
|token_type|**String** <br/> アクセストークンの種類を示し、`Bearer`で固定です。|
|expires_in|**Integer** <br/> アクセストークンの有効期間（秒）。6時間有効です。|
|scope|**String** <br/> アクセストークンに付与されたスコープ。|


#### エラー

```json
{
  "error": "invalid_request",
  "error_description": "The client_id is missing."
}
```

|パラメータ名|説明|
|:--|:--|
|error|**String** <br/> エラーの際に使用するエラーコード。|
|error_description|**String** <br/> エラーの際、どのような問題が発生しているか、具体的に記述したメッセージ。|

返答するエラーコードは以下の通りです。

|エラーコード|説明|
|:--|:--|
|invalid_request|リクエストされたパラメーターが足りないか、パラメータの値が正しくありません。|
|invalid_client|リクエストされた`client_id`が見つかりません。|
|invalid_grant|リフレッシュトークンが見つかりませんでした。|
|unauthorized_client|クライアントは指定された方法で取得することが許可されていません、。|
|unsupported_grant_type|認可サーバーは、リクエストされた`grant_type`をサポートしていません。|
|server_error|内部エラーにより処理できません。|


## クライアント・クレデンシャルズフロー

このフローではOAuthクライアントのみを使用して、クライアントを作成したアカウントのアクセストークンを要求できます。

また、[クライアントの種類](#クライアントの種類)が機密である必要があります。

### アクセストークンの要求

トークンエンドポイントにPOST要求、フォームでデータを渡します。

```http request
POST /account/oauth2/v1/token
Host: manager.dmdata.jp
Content-Type: application/x-www-form-urlencoded

client_id=CId.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
&client_secret=CSt.SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
&grant_type=client_credentials
&scope=telegram.list%20telegram.get.earthquake%20telegram.data
```

Form パラメータ

|パラメータ名|必須|説明|
|:--|:-:|:--|
|client_id|はい|**String** <br/> OAuth クライアント毎に割り当てられた、`CId.`で始まるID|
|client_secret|はい|**String** <br/> OAuth クライアント毎に割り当てられた、`CSt.`で始まるシークレットキー。|
|grant_type|はい|**String** <br/> クライアント・クレデンシャルズフローでは、`client_credentials`を指定する必要があります。|
|scope|はい|**String** <br/> ユーザーから認可を求めるスコープ（権限）。複数含める場合はスペースで区切ります。|


#### 成功した応答

```json
{
  "access_token": "ATn.TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
  "token_type": "Bearer",
  "expires_in": 21600,
  "scope": "telegram.list telegram.get.earthquake telegram.data"
}
```

|パラメータ名|説明|
|:--|:--|
|access_token|**String** <br/> `ATn.`で始まるアクセストークン。|
|token_type|**String** <br/> アクセストークンの種類を示し、`Bearer`で固定です。|
|expires_in|**Integer** <br/> アクセストークンの有効期間（秒）。6時間有効です。|
|scope|**String** <br/> アクセストークンに付与されたスコープ。|


#### エラー

```json
{
  "error": "invalid_request",
  "error_description": "The client_id is missing."
}
```

|パラメータ名|説明| 
|:--|:--| 
|error|**String** <br/> エラーの際に使用するエラーコード。| 
|error_description|**String** <br/> エラーの際、どのような問題が発生しているか、具体的に記述したメッセージ。|

返答するエラーコードは以下の通りです。

|エラーコード|説明| 
|:--|:--| 
|invalid_request|リクエストされたパラメーターが足りないか、パラメータの値が正しくありません。| 
|invalid_client|リクエストされた`client_id`が見つかりません。| 
|unauthorized_client|クライアントは指定された方法で取得することが許可されていません、。|
|unsupported_grant_type|認可サーバーは、リクエストされた`grant_type`をサポートしていません。| 
|server_error|内部エラーにより処理できません。|

## トークンの失効

アクセストークンやリフレッシュトークンが不要になった場合は直ちにトークンの失効を実行しなければなりません。

ただし、ユーザーが[コントロールパネル上](https://manager.dmdata.jp/control/my/oauth/approved)で認可を失効した場合は、紐づけられたリフレッシュトークン、アクセストークンが削除されます。

トークンの失効後、防災情報APIに限り最大60秒間そのトークンがAPIを実行できる可能性があります（契約更新やアカウント情報を取得するAPIなどはキャッシュを使用しないため即座にアクセスできなくなります）。

### 失効の要求

```http request
POST /account/oauth2/v1/revoke
Host: manager.dmdata.jp
Content-Type: application/x-www-form-urlencoded

client_id=CId.CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
&client_secret=CSt.SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
&tokne=ATn.TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
```

Form パラメータ

|パラメータ名|必須|説明|
|:--|:-:|:--|
|client_id|はい|**String** <br/> OAuth クライアント毎に割り当てられた、`CId.`で始まるID|
|client_secret|オプション|**String** <br/> OAuth クライアント毎に割り当てられた、`CSt.`で始まるシークレットキー。<br/>[クライアントの種類](#クライアントの種類)が「機密」の場合は必須です。|
|token|はい|**String** <br/> `ATn.`で始まるアクセストークンか、`ARh.`で始まるリフレッシュトークン。|


#### 成功した応答

トークン失効に成功した場合、認可サーバーは何も返しません。

また、トークンがない場合でも成功します。

#### エラー

```json
{
  "error": "invalid_request",
  "error_description": "The client_id is missing."
}
```

|パラメータ名|説明|
|:--|:--|
|error|**String** <br/> エラーの際に使用するエラーコード。|
|error_description|**String** <br/> エラーの際、どのような問題が発生しているか、具体的に記述したメッセージ。|

返答するエラーコードは以下の通りです。

|エラーコード|説明|
|:--|:--|
|invalid_request|リクエストされたパラメーターが足りないか、パラメータの値が正しくありません。|
|invalid_client|リクエストされた`client_id`が見つかりません。|
|server_error|内部エラーにより処理できません。|

## 各コード/トークンの有効期間

* 認可コード - 600秒（10分）
* アクセストークン - 21,600秒（6時間）
* リフレッシュトークン - 183日（リフレッシュトークンフローで使用するごとに、有効期間が183日になるようリセットされます。）
