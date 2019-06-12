import GeckoDriver from 'geckodriver'
import ChromeDriver from 'chromedriver'

const INSTANCE = Symbol('instance')

class Driver {
    constructor(name, instance) {
        this.name = name
        this[INSTANCE] = instance
    }

    start(args) {
        return this[INSTANCE].start(args)
    }

    stop() {
        this[INSTANCE].stop()
    }
}

const DRIVERS = [
    new Driver('geckodriver', GeckoDriver),
    new Driver('chromedriver', ChromeDriver)
]

export const getDriver = type => DRIVERS.find(d => d.name === type)

