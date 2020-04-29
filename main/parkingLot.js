var owner = require('./owner')
var airportSecurity = require('../main/airportSecurity')
class ParkingLOt {

    constructor() {
        this.parkingLot = []
    }

    // function to park the car
    parkCar(car) {
        if (!this.checkParkingLotFull()) {
            if (typeof car === 'object') {
                this.parkingLot.push(car)
                if (this.checkParkingLotFull()) {
                    owner.informParkingLotFull()
                    airportSecurity.informParkingLotFull()
                }
                return true
            }
            throw new Error("car must be an object")
        }
        return "Parking lot full"
    }

    unParkCar(car) {
        if (this.parkingLot.includes(car)) {
            let indexOfParkCar = this.parkingLot.indexOf(car)
            this.parkingLot.splice(indexOfParkCar, 1, null)
            owner.informOwnerSpaceIsAvailable()
            return true
        }
        throw new Error("car not parked")
    }

    checkParkingLotFull() {
        return this.parkingLot.length === 4
    }

    chekEmptySlots() {
        for (let count = 0; count < this.parkingLot.length; count++) {
            if (this.parkingLot[count] === null) {
                return count;
            }
        }
        return false
    }

}

module.exports = ParkingLOt