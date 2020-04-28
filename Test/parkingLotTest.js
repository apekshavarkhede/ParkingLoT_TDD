var assert = require('chai').assert
var parkingLot = require('../main/parkingLot')
var owner = require('../main/owner')
var sinon = require('./node_modules/sinon')
var expect = require('chai').expect

describe('Testing for parkinLot', function () {

    let parkingLotObject;
    beforeEach(function () {
        parkingLotObject = new parkingLot();
        sinon.stub(parkingLotObject, "checkParkingLotFull").
            onFirstCall().returns(false).onSecondCall().returns(true)
    })

    this.afterEach(function () {
        parkingLotObject.checkParkingLotFull.restore()
    })

    //UC1...park the car
    it('given car when park should return park ', function () {
        let car = {}
        expect(parkingLotObject.parkCar(car)).to.be.equal(true)
    })

    // throw exception when  car is not object typed
    it('given car as other than object should throw exception', function () {
        try {
            let car = 0;
            let parkTheCar = parkingLotObject.parkCar(car)
        } catch (error) {
            assert.equal(error.message, "car must be an object")
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
            assert.equal(error.message, "car not parked");
        }
    })

    // UC3..inform owner when parkingLot is full
    it('given parking lot when is full then inform owner', function () {
        let car = {}
        let car1 = {}
        expect(parkingLotObject.parkCar(car)).to.be.equal(true)
        expect(parkingLotObject.parkCar(car1)).to.be.equal("Parking lot full")
    })

    // check is owner receive parking lot full notification
    it('given parking lot full when check is owner receive notification should return true', function () {
        let car = {};
        let car1 = {};
        expect(parkingLotObject.parkCar(car)).to.be.equal(true)
        parkingLotObject.parkCar(car1)
        expect(owner.informParkingLotFull()).to.be.equal(true)
    })

})
