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
        this.parkingLot = [lotNo];
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
                    return this.parkLargeVehicle(car)
                }
                if (driverType === 'handicap') {
                    return this.searchPlaceForHandicapDriverAndParkCar(car)
                }
                else {
                    return this.searchPlaceForNormalDriverAndParkCar(car)
                }
            }
            throw new Error("car must be an object")
        }
        return "Parking lot full"
    }

    searchPlaceForNormalDriverAndParkCar(car) {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[slot][lot] === null) {
                    this.parkingLot[slot][lot] = car
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

    parkLargeVehicle(car) {
        let arr = [];
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            let largelot = 0
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[lot][slot] === null) {
                    largelot++;
                }
            }
            arr[lot] = largelot - 1
        }
        let largeLot = Math.max.apply(null, arr)
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
        return false
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

    searchCar(searchParameter) {
        let cars = []
        let keys = Object.keys(searchParameter);
        let values = Object.values(searchParameter)
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot.length; slot++) {
                if (this.parkingLot[lot][slot] != null) {
                    if (this.parkingLot[lot][slot][keys[lot]] === values[lot] && this.parkingLot[lot][slot][keys[lot + 1]] === values[lot + 1]) {
                        let car = {
                            lot: lot,
                            slot: slot
                        }
                        cars.push(car)
                    }
                }
            }
        }
        return cars
    }

    searchCarsParkedInGivenMinutes(timeValue) {
        let date = new Date();
        let currentTiming = date.getTime()
        let cars = []
        for (let i = 0; i < this.parkingLot.length; i++) {
            for (let j = 0; j < this.parkingLot[i].length; j++) {
                if (this.parkingLot[i][j] != null) {
                    let difference = ((currentTiming - this.parkingLot[i][j].parkTiming) / 1000)
                    difference /= 60;
                    let differenceBetweenParkedTimining = Math.abs(Math.round(difference))
                    if (differenceBetweenParkedTimining <= timeValue) {
                        let carPosition = {
                            lot: i,
                            slot: j
                        }
                        cars.push(carPosition)
                    }
                }
            }
        }
        return cars
    }


}

module.exports = ParkingLOt