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
        this.parkingLot.pop(car)
        return true
    }

}

module.exports = ParkingLOt