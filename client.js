const axios = require('axios');

function init(url, appId, secretKey) {
  if (url.length < 1) {
    throw new Error('url is empty!');
  }
  const instance = {}
  instance["URL"] = url ? url : "https://api.lazada.com.my/rest"
  instance["APP_ID"] = appId ? appId : ""
  instance["SECRET_KEY"] = secretKey ? secretKey : ""
  return instance
}

function initRequest(path) {
  if (path.length < 1) {
    throw new Error('path is empty!');
  }
  const requestInstance = {}
  requestInstance["PATH"] = path
  return requestInstance
}


function addApiParam(instance, key, value) {
  if (!instance || (Object.keys(instance).length === 0 && instance.constructor === Object)) {
    throw new Error('instance is null');
  }

  if (!key || key.length<1) {
    throw new Error('key is null');
  }
  if (!value || value.length<1) {
    throw new Error('value is null');
  }

  let newInstance = JSON.parse(JSON.stringify(instance));
  if (!newInstance["params"] || newInstance["params"].length < 1) {
    newInstance["params"] = []
  }
  newInstance["params"].push({key,value})
  return newInstance
}

module.exports = {
  init,
  initRequest,
  addApiParam
}
