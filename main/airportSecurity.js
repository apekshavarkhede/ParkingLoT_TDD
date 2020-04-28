class AirportSecurity {

    constructor() {
        this.full = false
    }

    informParkingLotFull() {
        return this.full = true
    }
}
module.exports = new AirportSecurity;