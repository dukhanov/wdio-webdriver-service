exports.config = {
    port: '9516',
    path: '/',
    specs: [
        './test/integration/*.spec.js'
    ],

    capabilities: [{
    }],

    sync: true,
    logLevel: 'verbose',
    coloredLogs: true,

    baseUrl: 'http://webdriver.io',

    waitforTimeout: 10000,
    connectionRetryTimeout: 10000,
    connectionRetryCount: 1,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd'
    },

    services: [
        require('../../launcher')
    ],
    webDriverType: process.env.npm_config_driver_type || 'geckodriver',
    webDriverLogs: './',
    webDriverArgs: [],
    webDriverKillProcess: true
}
