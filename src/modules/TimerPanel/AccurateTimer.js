export default class AccurateTimer {
    // -- interval
    // -- callback (func)

    // Init timer
    init = (callback, interval, duration, isActiveFunc) => {
        this.duration = duration * 1000
        this.mainDuration = this.duration
        this.interval = interval
        this.callback = (ms) => callback(ms)
        this.setActive = isActiveFunc
    }

    // Start timer
    start = (callback, interval, duration, isActiveFunc) => {
        this.init(callback, interval, duration, isActiveFunc)
        this.expected = Date.now() + this.interval
        this.timeout = setTimeout(this.step, this.interval)
        // console.log('Started!')
    }

    // Cancel timer
    cancel = async () => {
        if (!this.callback) { return }
        clearTimeout(this.timeout)
        // wait a bit
        await new Promise(resolve => setTimeout(resolve, 1000))
        // update numbers
        this.callback(this.mainDuration)
        // console.log('Stopped!')
    }

    // Method that takes care of 
    // running our callback and
    // adjusting the time interval
    step = async () => {
        let drift = Date.now() - this.expected
        if (drift > this.interval) {
            // something really bad happened. Maybe the browser (tab) was inactive?
            // possibly special handling to avoid futile "catch up" run
        }
        this.duration -= this.interval
        this.callback(this.duration)
        clearTimeout(this.timeout)
        if (this.duration === 0) {
            // Logic end of current timer
            // steps:
            // wait a second
            await new Promise(resolve => setTimeout(resolve, 1000))
            // update numbers
            this.callback(this.mainDuration)
            // update state
            this.setActive(false)
        } else {
            // Next
            this.expected += this.interval
            this.timeout = setTimeout(this.step, Math.max(0, this.interval - drift))
        }
    }
}