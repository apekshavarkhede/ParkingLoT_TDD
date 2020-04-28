class ParkingLOt {

    constructor() {
        this.parkingLot = []
    }

    // function to park the car
    parkCar(car) {
        if (typeof car === 'object') {
            this.parkingLot.push(car)
            return true
        }
        throw new Error("car must be an object")
    }

    unParkCar(car) {
        if (this.parkingLot.includes(car)) {
            this.parkingLot.pop(car)
            return true
        }
        throw new Error("car not parked")
    }

}

module.exports = ParkingLOt