class ParkingLOt {

    constructor() {
        this.parkingLot = []
    }

    parkCar(car) {
        this.parkingLot.push(car)
        return true

    }

}

module.exports = ParkingLOt