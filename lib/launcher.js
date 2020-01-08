import fs from 'fs-extra'
import getFilePath from './utils/getFilePath'
import { getDriver } from './utils/drivers'

const DEFAULT_LOG_FILENAME = 'webdriver-log.txt'

export default class WebDriverLauncher {
    constructor() {
        this.webDriverLogs = null
        this.logToStdout = false
        this.webDriverKillProcess = true
    }

    onPrepare(config) {
        this.driver = getDriver(config.webDriverType)
        if (!this.driver) {
            return Promise.reject(new Error(`webDriverType ${config.webDriverType} is not valid`))
        }

        let webDriverArgs = [`--port=${config.port}`]
        if (config.webDriverArgs) {
            webDriverArgs = webDriverArgs.concat(config.webDriverArgs)
        }
        this.webDriverLogs = config.webDriverLogs
        this.logToStdout = config.logToStdout
        if (config.webDriverKillProcess !== undefined) {
            this.webDriverKillProcess = config.webDriverKillProcess
        }

        return new Promise((resolve, reject) => {
            console.log(`run webdriver for ${config.webDriverType} with params: `, webDriverArgs)
            const process = this.driver.start(webDriverArgs)
            if (typeof this.webDriverLogs === 'string') {
                this._redirectLogStream(process)
            }
            resolve()
        })
    }

    onComplete() {
        if (this.webDriverKillProcess && this.driver) {
            this.driver.stop()
        }
    }

    _redirectLogStream(process) {
        const logFile = getFilePath(this.webDriverLogs, DEFAULT_LOG_FILENAME)

        // ensure file & directory exists
        fs.ensureFileSync(logFile)
        const logStream = fs.createWriteStream(logFile, { flags: 'w' })
        process.stdout.pipe(logStream)
        process.stderr.pipe(logStream)
    }
}
