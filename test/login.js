
'use strict'

const assert = require('assert')

const wd = require('wd')
const CONFIG = {
  SERVER: {
    host: 'localhost',
    port: 4723,
  },
  DEVICE: {    
    browserName: '',
    'appium-version': '1.6.5',
    
    appPackage: 'org.reactjs.native.example.XCUITest',
    platformName: 'iOS',
    platformVersion: '10.3',
    deviceName: 'iPhone 6s',
    app: 'ios/build/Build/Products/Debug-iphonesimulator/XCUITest.app'
    
    // platformName: 'Android',
    // appPackage: 'com.gigatum.merchantapp',
    // platformVersion: '6.0.1',
    // deviceName: 'GGC00C08640E46A',
    // app: '/Users/thanhtu/MyProjects/Nodejs/reactjs/Clingme/MerchantApp/android/app/build/outputs/apk/app-release.apk'
  }
}
Object.freeze(CONFIG)

describe('appium', function () {
  this.timeout(200000)
  let driver
  let allArePassed = true

  before(function () {
    driver = wd.promiseChainRemote(CONFIG.SERVER)
    addEventListenersTo(driver)
    return driver.init(CONFIG.DEVICE)
  })

  after(function () {
    driver.quit()
  })

  afterEach(function () {
    allArePassed = allArePassed && this.currentTest.state === 'passed'
  })

  // auto login
  it('auto login', function (done) {
    driver.waitForElementByAccessibilityId('username', 10000).then(el=>{      
      el.type('ha@clingme.vn')    
      driver.elementByAccessibilityId('login').click()
      setTimeout(done, 15000)      
    })
  }) 

})


function isDevelopment() {
  const NODE_ENV = process.env.NODE_ENV
  return !NODE_ENV || (NODE_ENV && NODE_ENV === 'development')
}
function addEventListenersTo(driver) {
  if (!isDevelopment()) {
    return
  }

  driver.on('status', function (info) {
    console.log(info)
  })
  driver.on('command', function (command, method, data) {
    console.log(command, method, data || '')
  })
  driver.on('http', function (method, path, data) {
    console.log(method, path, data || '')
  })
}