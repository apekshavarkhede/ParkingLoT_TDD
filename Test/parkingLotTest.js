var assert = require('chai').assert
var parkingLot = require('../main/parkingLot')
var owner = require('../main/owner')
var sinon = require('sinon');
var expect = require('chai').expect
var airportSecurity = require('../main/airportSecurity')

describe('Testing for parkinLot', function () {

    let parkingLotObject;
    beforeEach(function () {
        parkingLotObject = new parkingLot();
        sinon.stub(parkingLotObject, "checkParkingLotFull").
            onFirstCall().returns(false).onSecondCall().returns(true)
    })

    afterEach(function () {
        parkingLotObject.checkParkingLotFull.restore()
    })

    //UC1...park the car
    it('given car when park should return park ', function () {
        let car = {}
        expect(parkingLotObject.parkCar(car, new Date())).to.be.equal(true)
    })

    // throw exception when  car is not object typed
    it('given car as other than object should throw exception', function () {
        try {
            let car = 0;
            let parkTheCar = parkingLotObject.parkCar(car, new Date())
        } catch (error) {
            assert.equal(error.message, "car must be an object")
        }
    })

    //UC2..unpark the car
    it('given parked car when when unpark return true', function () {
        let car = {};
        let parkCar = parkingLotObject.parkCar(car, new Date())
        let unParkCar = parkingLotObject.unParkCar(car, new Date())
        assert.isTrue(unParkCar)
    })

    // throw exception when unpark the car which is not park
    it('given not park car when unpark should throw exception', function () {
        try {
            let car = {};
            let car1 = {};
            let parkCar = parkingLotObject.parkCar(car, new Date())
            let unParkCar = parkingLotObject.unParkCar(car1, new Date())
        } catch (error) {
            assert.equal(error.message, "car not parked");
        }
    })

    // UC3..inform owner when parkingLot is full
    it('given parking lot when is full then inform owner', function () {
        let car = {}
        let car1 = {}
        assert.equal(true, parkingLotObject.parkCar(car, new Date()))
        assert.equal(parkingLotObject.parkCar(car1, new Date()), "Parking lot full")
    })

    // check is owner receive parking lot full notification
    it('given parking lot full when check is owner receive notification should return true', function () {
        let car = {};
        let car1 = {};
        expect(parkingLotObject.parkCar(car, new Date())).to.be.equal(true)
        parkingLotObject.parkCar(car1, new Date())
        expect(owner.informParkingLotFull()).to.be.equal(true)
    })

    // inform airportSecurity when parking lot is full 
    it('should inform airport security when parkingLot is full', function () {
        let car = {};
        let car1 = {};
        let parkCar = parkingLotObject.parkCar(car1, new Date())
        assert.isTrue(parkCar)
        let check = airportSecurity.informParkingLotFull()
        expect(check).to.be.equal(true)
    })

    // UC5.. inform owner when space is available when 
    it('inform owner if space is available in parkingLot', function () {
        let car = {};
        let parkCar = parkingLotObject.parkCar(car, new Date())
        assert.isTrue(parkCar)
        let unParkCar = parkingLotObject.unParkCar(car)
        assert.isTrue(unParkCar)
        let informOwner = owner.informOwnerSpaceIsAvailable()
    })
})

describe('Testing parkingLot extra functionality', function () {

    let parkingLotObject;
    beforeEach(function () {
        parkingLotObject = new parkingLot();
    })
    // UC6..give owner parkingLot attendance
    it('should inform owner about empty slots in parking car', function () {
        let car = {};
        let car1 = {};
        let car2 = {};
        assert.isTrue(parkingLotObject.parkCar(car, new Date()))
        assert.isTrue(parkingLotObject.parkCar(car1, new Date()))
        assert.isTrue(parkingLotObject.parkCar(car2, new Date()))
        assert.isTrue(parkingLotObject.unParkCar(car1, new Date()))
        assert.equal(1, parkingLotObject.chekEmptySlots())
    })

    // return false when no slot is empty
    it('should return false when checking for empty slot when their is no empty slot', function () {
        let car = {};
        let car1 = {};
        let car2 = {};
        assert.isTrue(parkingLotObject.parkCar(car, new Date()))
        assert.isTrue(parkingLotObject.parkCar(car1, new Date()))
        assert.isTrue(parkingLotObject.parkCar(car2, new Date()))
        assert.equal(false, parkingLotObject.chekEmptySlots())
    })

    // UC7.. driver can find car
    it('given park car when driver serach car should able to search car', function () {
        let car = {};
        let car1 = {};
        let car2 = {};
        let parkCar = parkingLotObject.parkCar(car, new Date())
        assert.isTrue(parkCar)
        assert.isTrue(parkingLotObject.parkCar(car1, new Date()))
        assert.isTrue(parkingLotObject.parkCar(car2, new Date()))
        let findDriverCar = parkingLotObject.findCar(car2)
        assert.equal(2, findDriverCar)
    })

    // UC8.. inform owner about parking time of car
    it(`should inform owner about parkingTime of car`, function () {
        let car = {};
        let parkCar = parkingLotObject.parkCar(car, new Date())
        assert.isTrue(parkCar)
    })
})
