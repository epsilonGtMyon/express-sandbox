# http-proxy-middleware-sandbox


## それぞれ動かす
```
node ./index_backend1.js
node ./index_backend2.js
node ./index_proxy.js
```


## ブラウザから

headerやcookieはそのままproxy経由で後ろまで渡ってそう

```
await fetch(`/backend1`, {
    credentials: 'include',
    headers: {
        a:1,
        b:2
    }
})


await fetch(`/backend2`, {
    credentials: 'include',
    headers: {
        a:1,
        b:2
    }
})
```