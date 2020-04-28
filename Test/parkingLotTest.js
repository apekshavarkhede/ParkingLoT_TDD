var assert = require('chai').assert
var parkingLot = require('../main/parkingLot')
var owner = require('../main/owner')
var sinon = require('sinon')
var expect = require('chai').expect

describe('Testing for parkinLot', function () {

    let parkingLotObject;
    beforeEach(function () {
        parkingLotObject = new parkingLot();
    })

    //UC1...park the car
    it.only('given car when park should return park ', function () {
        let car = {}
        let stub = sinon.stub(parkingLotObject, "checkParkingLotFull").returns(false);
        expect(parkingLotObject.parkCar(car)).to.be.equal(true)
        stub.restore()
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
        assert.isTrue(unParkCar)
    })

    // throw exception when unpark the car which is not park
    it('given not park car when unpark should throw exception', function () {
        try {
            let car = {};
            let car1 = {};
            let parkCar = parkingLotObject.parkCar(car)
            let unParkCar = parkingLotObject.unParkCar(car1)
        } catch (error) {
            console.log(error.message);
        }
    })

    // UC3..inform owner when parkingLot is full
    it('given parking lot when is full then inform owner', function () {
        let car = {}
        let car1 = {}
        let parkCar = parkingLotObject.parkCar(car)
        let parkAnotherCar = parkingLotObject.parkCar(car1)
        assert.equal(parkAnotherCar, "Parking lot full")
    })

})
