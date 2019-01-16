const axios = require('axios');

function init(url, appId, secretKey) {
  if (url.length < 1) {
    throw new Error('url is empty!');
  }
  const instance = {}
  instance["URL"] = url ? url : "https://api.lazada.com.my/rest"
  instance["APP_ID"] = appId ? appId : ""
  instance["SECRET_KEY"] = secretKey ? secretKey: ""
}

module.exports = {
  init
}
