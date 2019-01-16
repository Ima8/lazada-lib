# Lazada non-official library

## Main feature 
* Auth
* Sent Request with Hmac sign 

## How to use
```
  const instance = CLIENT.init("https://api.lazada.com.my/rest/", "api_key", "serect_key")
  let request = CLIENT.initRequest("/auth/token/refresh")
  request = CLIENT.addApiParam(request, "refresh_token", "")

  CLIENT.execute(instance, request, "").then((res) => {
    const data = res.data
    console.log(data);
  })
```
