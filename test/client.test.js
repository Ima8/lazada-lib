const CLIENT = require('../client');


test('InitWithEmptyURL', () => {
  const t = () => {
    const client = CLIENT.init("","test","test")
  };
  expect(t).toThrow("url is empty!");
})

test('testInitWithUrlAppIdSecretKeyShouldGotObject',()=> {
  const client = CLIENT.init("https://api.lazada.com.my/rest","","")
})

