# Lazada non-official library

## Main feature 
* Auth
* Sent Request with Hmac sign 

## How to use for POST 
```
  const instance = CLIENT.init("https://api.lazada.com.my/rest/", "api_key", "serect_key")
  let request = CLIENT.initRequest("/auth/token/refresh","POST")
  request = CLIENT.addApiParam(request, "refresh_token", "")

  CLIENT.execute(instance, request, "").then((res) => {
    const data = res.data
    console.log(data);
  })
```

## How to use for GET 
```
  const instance = CLIENT.init("https://api.lazada.com.my/rest/", "api_key", "serect_key")
  let request = CLIENT.initRequest("/auth/token/refresh","GET")
  request = CLIENT.addApiParam(request, "refresh_token", "")

  CLIENT.execute(instance, request, "").then((res) => {
    const data = res.data
    console.log(data);
  })
```
