class ParkingLOt {

    constructor() {
        this.parkingLot = []
    }

    parkCar(car) {
        if (typeof car === 'object') {
            this.parkingLot.push(car)
            return true
        }
        return false
    }

}

module.exports = ParkingLOt