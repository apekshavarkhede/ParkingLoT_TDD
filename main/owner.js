class Owner {
    constructor() {
        this.full = false
    }

    informParkingLotFull() {
        return this.full = true
    }
}
module.exports = new Owner()