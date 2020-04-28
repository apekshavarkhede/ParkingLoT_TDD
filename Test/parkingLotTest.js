var assert = require('chai').assert
var parkingLot = require('../main/parkingLot')

describe('Testing for parkinLot', function () {

    let parkingLotObject;
    beforeEach(function () {
        parkingLotObject = new parkingLot();
    })

    //UC1...park the car
    it('given car when park should return park ', function () {
        let car = {}
        let parkTheCar = parkingLotObject.parkCar(car)
        assert.isTrue(parkTheCar)
    })

    // throw exception when  car is not object typed
    it('given car as other than object should throw exception', function () {
        try {
            let car = 0;
        } catch (error) {
            let parkTheCar = parkingLotObject.parkCar(car)
            assert.equal(error.message, parkTheCar)
        }
    })

    //UC2..unpark the car
    it('given parked car when when unpark return true', function () {
        let car = {};
        let parkCar = parkingLotObject.parkCar(car)
        let unParkCar = parkingLotObject.unParkCar(car)
    })



})