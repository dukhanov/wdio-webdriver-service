import GeckoDriver from 'geckodriver'
import ChromeDriver from 'chromedriver'

class Driver {
    constructor (name, binPath) {
        this.name = name
        this.binPath = binPath
    }
}
const DRIVERS = [
    new Driver('geckodriver', GeckoDriver.path),
    new Driver('chromedriver', ChromeDriver.path)
]

export const isValidDriverType = type => DRIVERS.some(dr => dr.name === type)
export const getBinPath = type => DRIVERS.find(d => d.name === type).binPath
