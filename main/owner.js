class Owner {
    constructor() {
        this.full = false
    }

    informParkingLotFull() {
        this.full = true
    }
}
module.exports = new Owner()