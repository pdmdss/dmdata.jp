---
slug: /sample/javascript
title: サンプル JavaScript
---
## WebSocketから情報を取得する例


以下は地震・津波関連区分を取得する場合です。
```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>DMDATA.JP - Sample</title>
<script>
(() => {
    const socketStartUrl = 'https://api.dmdata.jp/v2/socket';
    const getClassifications = ['telegram.earthquake'];
    const apiKey = 'socket.start, telegram.get.earthquake の許可設定されたAPIキー';
    
    
    fetch(`${socketStartUrl}?key=${apiKey}`, 
        { method:'post', body: JSON.stringify({ classifications: getClassifications }) })
        .then(response  => response.json())
        .then(socket => {
            const websocket = new WebSocket(socket.websocket.url, ['dmdata.v2']);
            websocket.addEventListener('message', async ev => {
                const msg = JSON.parse(ev.data);
                
                if(msg.type === 'ping'){
                    websocket.send(JSON.stringify({ type:'pong', pingId: msg.pingId} ));
                }
                if(msg.type === 'data' && msg.format === 'xml'){
                    const xmlDoc = await bodyToDocument(msg.body);
                    console.log(xmlDoc, msg);
                }
            });
            
            websocket.addEventListener('close', () => console.log('WebSocket closed.'));
        });
    
    async function bodyToDocument(data) {
        const decoder = new TextDecoder();
        
        const buffer = new Uint8Array(atob(data).split('').map(c => c.charCodeAt(0)))
        const stream = new Blob([buffer])
            .stream()
            .pipeThrough(
                new DecompressionStream('gzip')
            );

        const gunzippedBuffer = new Uint8Array(await new Response(stream).arrayBuffer());
             
        return new DOMParser().parseFromString(decoder.decode(gunzippedBuffer), 'application/xml');
    }

})();
</script>
</head>
<body>
  
</body>
</html>
```

ブラウザ等で任意に実行してみてください。

他の区分を取得したい場合は、変数`getClassifications`を編集してください。

緊急地震（予報）区分:　eew.forecast <br/>
緊急地震（警報）区分:　eew.warning <br/>
リアルタイム震度区分:　eew.realtime <br/>
地震・津波関連区分:　telegram.earthquake <br/>
火山関連区分: telegram.volcano <br/>
気象警報・注意報関連区分: telegram.weather <br/>
定時関連区分: telegram.scheduled <br/>


APIの詳細は、[API リファレンス](/docs/reference/api/v2)を参照してください。
