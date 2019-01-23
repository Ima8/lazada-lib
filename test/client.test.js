const CLIENT = require('../client');

expect.extend({
  toContainObject(received, argument) {

    const pass = this.equals(received,
      expect.arrayContaining([
        expect.objectContaining(argument)
      ])
    )

    if (pass) {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
        pass: true
      }
    } else {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
        pass: false
      }
    }
  }
})

test('InitWithEmptyURL', () => {
  const t = () => {
    const client = CLIENT.init("", "test", "test")
  };
  expect(t).toThrow("url is empty!");
})

test('testInitWithUrlAppIdSecretKeyShouldGotObject', () => {
  const instance = CLIENT.init("https://api.lazada.com.my/rest", "", "")
  expect(typeof instance).toBe('object');
})

test('InitRequestWithEmptyURL', () => {
  const t = () => {
    const client = CLIENT.initRequest("")
  };
  expect(t).toThrow("path is empty!");
})

test('initRequest', () => {
  const instance = CLIENT.initRequest("/auth/token/refresh")
  expect(typeof instance).toBe('object');
  expect(instance).toEqual( 
    expect.objectContaining({ 
      PATH: '/auth/token/refresh' 
    })
  )
})

test('addParam3Param', () => {
  let instance = CLIENT.initRequest("/auth/token/refresh")
  instance = CLIENT.addApiParam(instance, "key", "value")
  instance = CLIENT.addApiParam(instance, "key2", "value2")
  instance = CLIENT.addApiParam(instance, "key3", "value3")
  expect(instance.params).toContainObject({"key": "key", "value": "value"})
  expect(instance.params).toContainObject({"key": "key2", "value": "value2"})
  expect(instance.params).toContainObject({"key": "key3", "value": "value3"})
})

test('executeWithPost', () => {
  const instance = CLIENT.init("https://api.lazada.com.my/rest/", "", "")
  let request = CLIENT.initRequest("/auth/token/refresh")
  request = CLIENT.addApiParam(request, "refresh_token", "")

  return CLIENT.execute(instance, request, "").then((res) => {
    const data = res.data
    console.log(data);
    const expectKey = ['account','access_token','code',"request_id","country","refresh_token","country_user_info_list","account_platform","refresh_expires_in","country_user_info","expires_in"]
    expect(Object.keys(data).sort()).toEqual(expectKey.sort());
  })
})

test('executeWithGet', () => {
  const instance = CLIENT.init("https://api.lazada.com.my/rest/", "", "")
  let request = CLIENT.initRequest("/order/get", "GET")
  request = CLIENT.addApiParam(request, "order_id", "")
 
  return CLIENT.execute(instance, request, "").then((res) => {
    const data = res.data
    console.log(data);
    const expectKey = ['code','request_id',"data"]
    expect(Object.keys(data).sort()).toEqual(expectKey.sort());
  })
})
