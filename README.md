WDIO WebDriver Service
================================

(Based on [wdio-selenium-standalone-service](https://github.com/webdriverio/wdio-selenium-standalone-service))

----

This service helps you to run Chromedriver or Geckodriver seamlessly when running tests with the [WDIO testrunner](http://webdriver.io/guide/testrunner/gettingstarted.html). 
It uses:
- [geckodriver](https://www.npmjs.com/package/geckodriver) NPM package for runnings tests with Firefox.
- [chromedriver](https://www.npmjs.com/package/chromedriver) NPM package for runnings tests with Chrome.


Note - this service does not require a Selenium server, but uses ChromeDriver or GeckoDriver to communicate with the browser directly.
It supports:

```js
capabilities: [{
        browserName: 'firefox'
    }]
```

and 

```js
capabilities: [{
        browserName: 'chrome'
    }]
```

## Installation

The easiest way is to keep `wdio-webdriver-service` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "wdio-webdriver-service": "~0.1"
  }
}
```

You can simple do it by:

```bash
npm install wdio-webdriver-service --save-dev
```

Instructions on how to install `WebdriverIO` can be found [here.](http://webdriver.io/guide/getstarted/install.html)

## Configuration

To use the service you need to add `webdriver` to your service array:

```js
// wdio.conf.js
export.config = {
  port: '9515',
  path: '/',
  // ...
  services: ['webdriver'],
  // ...
  webDriverType: 'geckodriver',
  webDriverLogs: './',
  webDriverArgs: ['--silent'],
  webDriverKillProcess: false, // to kill webdriver (chromedriver or geckodriver) process after complete, default true
};
```

## Options

### webDriverLogs
Path where all logs from the WebDriver server should be stored.

Type: `String`

----

### webDriverType
Type of the driver component to use.
Possible values: `geckodriver`, `chromedriver`

Type: `String`

----

### webDriverArgs
Arguments to run driver component binary with.
Note that options for Gecko driver and Chrome driver are different.

More info:
- Gecko driver options:
  ```
  -b BINARY/--binary BINARY       Path to the Firefox binary to use.
  --connect-existing              Connecting to an existing Firefox instance. 
  --host HOST                     Host to use for the WebDriver server. Defaults to 127.0.0.1.
  --log LEVEL                     Set the Gecko and geckodriver log level.
  --marionette-port PORT          Port to use for connecting to the Marionette remote protocol.
  -p PORT/--port PORT             Port to use for the WebDriver server. Defaults to 4444.
  ```

- Chrome driver options:
  ```
  --port=PORT                     Port to listen on
  --adb-port=PORT                 Adb server port
  --verbose                       Log verbosely
  --version                       Print the version number and exit
  --silent                        Log nothing
  --url-base                      Base URL path prefix for commands, e.g. wd/url
  --port-server                   Address of server to contact for reserving a port
  --whitelisted-ips               Comma-separated whitelist of remote IPv4 addresses which are allowed to connect to ChromeDriver
  ```

Type: `Array`

----

For more information on WebdriverIO see the [homepage](http://webdriver.io).

----

## TODO list
- [x] add support for [Gecko driver](https://github.com/mozilla/geckodriver/releases/)
- [x] add support for [Chrome driver](http://chromedriver.storage.googleapis.com/index.html)
- [ ] add support for [Edge driver](http://go.microsoft.com/fwlink/?LinkId=619687)
- [ ] add support for [Safari driver](https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_10_0.html#//apple_ref/doc/uid/TP40014305-CH11-DontLinkElementID_28)