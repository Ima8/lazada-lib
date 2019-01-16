const axios = require('axios');
const crypto = require('crypto');
const _  = require("lodash")
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

function initRequest(path, method = "POST") {
  if (path.length < 1) {
    throw new Error('path is empty!');
  }
  const requestInstance = {}
  requestInstance["PATH"] = path
  requestInstance["METHOD"] = method
  return requestInstance
}


function addApiParam(instance, key, value) {
  if (!instance || (Object.keys(instance).length === 0 && instance.constructor === Object)) {
    throw new Error('instance is null');
  }

  if (!key || key.length < 1) {
    throw new Error('key is null');
  }
  if (!value || value.length < 1) {
    throw new Error('value is null');
  }

  let newInstance = JSON.parse(JSON.stringify(instance));
  if (!newInstance["params"] || newInstance["params"].length < 1) {
    newInstance["params"] = []
  }
  newInstance["params"].push({
    key,
    value
  })
  return newInstance
}

function sortByKey(array, key) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function generateSign(key, path, params) {
  console.log(params);
  params = sortByKey(params,"key")
  console.log(params);
  let strToBeSigned = path
  for (let i = 0; i < params.length; i++){
    strToBeSigned += params[i].key+params[i].value
  }
  console.log(strToBeSigned);
  let hash = crypto.createHmac('sha256', key)
  .update(strToBeSigned)
    .digest('hex');
  console.log(hash.toUpperCase());
  
  return hash.toUpperCase()
}

function execute(instance, request, accessToken) {
  let params = request.params
  params.push({ "key": "app_key", "value": instance["APP_ID"] })
  params.push({ "key": "sign_method","value":"sha256"})
  const timestamp = new Date().getTime()
  params.push({ "key": "timestamp","value":timestamp})

  if (accessToken) {
    params.push({ "key": "access_token","value":accessToken})
  }
  let requestURL = instance["URL"]
  if (_.endsWith(requestURL, "/")) { 
    requestURL = requestURL.substring(0, requestURL.length-1)
  }
  requestURL += request["PATH"]
  let sign = generateSign(instance["SECRET_KEY"],request["PATH"],params)
  params.push({ "key": "sign", "value": sign })
  
  console.log(requestURL);
  console.log(params);
  
}

module.exports = {
  init,
  initRequest,
  addApiParam,
  execute
}
