var assert = require('chai').assert
var parkingLot = require('../main/parkingLot')

describe('Testing for parkinLot', function () {
    it('given car when park should return park ', function () {
        let parkingLotObject = new parkingLot();
        let car = {}
        let parkTheCar = parkingLotObject.parkCar(car)
        assert.isTrue(parkTheCar)
    })

    it.only('given car as other than object should throw exception', function () {
        try {
            let parkingLotObject = new parkingLot();
            let car = 0;
        } catch (error) {
            let parkTheCar = parkingLotObject.parkCar(car)
            assert.equal(error.message, parkTheCar)
        }
    })

})