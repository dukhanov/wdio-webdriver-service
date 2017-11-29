import fs from 'fs-extra'
import getFilePath from './utils/getFilePath'
import { isValidDriverType, getBinPath } from './utils/drivers'
import childProcess from 'child_process'

const DEFAULT_LOG_FILENAME = 'webdriver-log.txt'

class WebDriverLauncher {
    constructor () {
        this.webDriverLogs = null
        this.logToStdout = false
    }

    onPrepare (config) {
        if (!isValidDriverType(config.webDriverType)) {
            return Promise.reject(new Error(`webDriverType ${config.webDriverType} is not valid`))
        }

        const binPath = getBinPath(config.webDriverType)
        const webDriverArgs = [ `--port=${config.port}` ]
        if (webDriverArgs.webDriverArgs) {
            webDriverArgs.concat(config.webDriverArgs)
        }
        this.webDriverLogs = config.webDriverLogs
        this.logToStdout = config.logToStdout

        return new Promise((resolve, reject) => {
            console.log(`run webdriver for ${config.webDriverType} with params: `, webDriverArgs)
            this.process = childProcess.execFile(binPath, webDriverArgs, (err, stdout, stderr) => {
                console.log(err, stdout, stderr)
                if (err) return reject(err)
            })

            if (this.process) {
                if (typeof this.webDriverLogs === 'string') {
                    this._redirectLogStream()
                }
                resolve()
            }
        })
    }

    onComplete () {
        if (this.process) {
            this.process.kill()
        }
    }

    _redirectLogStream () {
        const logFile = getFilePath(this.webDriverLogs, DEFAULT_LOG_FILENAME)

        // ensure file & directory exists
        fs.ensureFileSync(logFile)
        const logStream = fs.createWriteStream(logFile, { flags: 'w' })
        this.process.stdout.pipe(logStream)
        this.process.stderr.pipe(logStream)
    }
}

export default WebDriverLauncher
