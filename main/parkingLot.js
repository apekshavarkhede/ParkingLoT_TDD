var owner = require('./owner')
var airportSecurity = require('../main/airportSecurity')
class ParkingLOt {

    constructor(totalNoOfLot, capacityOfEveryLot, totalVehiclesAllowInParkingLot) {
        this.parkingLot;
        this.designParkingLot(totalNoOfLot, capacityOfEveryLot)
        this.noOfVehiclesAllowToPark = totalVehiclesAllowInParkingLot
        this.noOfVehicles = 0
    }

    // design parkingLot
    designParkingLot(lotNo, capacityOfEveryLot) {
        this.parkingLot = [];
        for (let lot = 0; lot < lotNo; lot++) {
            this.parkingLot[lot] = [capacityOfEveryLot]
            for (let slot = 0; slot < capacityOfEveryLot; slot++) {
                this.parkingLot[lot][slot] = null
            }
        }
    }

    // function to park the car
    parkCar(car, parkTime, driverType) {
        if (this.checkParkingLotFull() === false) {
            if (typeof car === 'object') {
                if (car.type === 'large') {
                    this.searchSpaceForLargeVehicle(car)
                }
                if (driverType === 'handicap') {
                    return this.searchPlaceForHandicapDriverAndParkCar(car)
                }
                return this.searchPlaceForNormalDriverAndParkCar(car)
            }
            throw new Error("car must be an object")
        }
        return "Parking lot full"
    }

    searchPlaceForNormalDriverAndParkCar(car) {
        this.noOfVehicles++
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[slot][lot] === null) {
                    this.parkingLot[slot][lot] = car
                    if (this.checkParkingLotFull()) {
                        owner.informParkingLotFull()
                        airportSecurity.informParkingLotFull()
                    }
                    return true
                }
            }
        }
    }

    searchPlaceForHandicapDriverAndParkCar(car) {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[lot][slot] === null) {
                    this.parkingLot[lot][slot] = car
                    this.noOfVehicles++
                    if (this.checkParkingLotFull()) {
                        owner.informParkingLotFull()
                        airportSecurity.informParkingLotFull()
                    }
                    return true
                }
            }
        }
    }

    searchSpaceForLargeVehicle(car) {
        let largeLot = 0;
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            if (this.parkingLot[lot].length > largeLot) {
                largeLot = lot
            }
        }
        for (let slot = 0; slot < this.parkingLot[largeLot].length; slot++) {
            if (this.parkingLot[largeLot][slot] === null) {
                this.parkingLot[largeLot][slot] = car
                this.noOfVehicles++
                if (this.checkParkingLotFull()) {
                    owner.informParkingLotFull()
                    airportSecurity.informParkingLotFull()
                }
                return true
            }
        }
    }

    unParkCar(car) {
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j <= this.parkingLot[i].length; j++) {
                if (this.parkingLot[i][j] == car) {
                    this.parkingLot[i][j] = null
                    this.noOfVehicles--
                    return true
                }
            }
        }
        throw new Error("car not parked")
    }

    checkParkingLotFull() {
        if (this.noOfVehicles === this.noOfVehiclesAllowToPark) {
            return true
        }
        return false;
    }

    chekEmptySlots() {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[lot][slot] === null) {
                    let availableSlot = {
                        lot: lot,
                        slot: slot
                    }
                    return availableSlot
                }
            }
        }
        return false
    }

    findCar(car) {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[lot][slot] === car) {
                    let carPosition = {
                        lot: lot,
                        slot: slot
                    }
                    return carPosition
                }
            }
        }
    }

}

module.exports = ParkingLOt