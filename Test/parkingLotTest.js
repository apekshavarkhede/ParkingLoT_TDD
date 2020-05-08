var assert = require('chai').assert
var parkingLot = require('../main/parkingLot')
var owner = require('../main/owner')
var sinon = require('sinon');
var expect = require('chai').expect
var airportSecurity = require('../main/airportSecurity')
var driver = require('../main/driver')
var vehicle = require('../main/vehicle')

describe('Testing for parkinLot', function () {

    //UC1...park the car
    it('given car when park should return park ', function () {
        let parkingLotObject = new parkingLot(2, 2, 4)
        let totalCars = [{}, {}, {}, {}]
        totalCars.forEach(car => {
            let driverType = driver.type.NORMAL
            var res = parkingLotObject.parkCar(car, new Date(), driverType)
            expect(res).to.be.equal(true)
        })
    })

    // throw exception when  car is not object typed
    it('given car as other than object should throw exception', function () {
        try {
            let car = 0;
            let parkingLotObject = new parkingLot(2, 2, 4)
            let driverType = driver.type.NORMAL
            let parkTheCar = parkingLotObject.parkCar(car, new Date(), driverType)
        } catch (error) {
            assert.equal(error.message, "car must be an object")
        }
    })

    //UC2..unpark the car
    it('given parked car when when unpark return true', function () {
        let parkingLotObject = new parkingLot(3, 4, 12)
        let driverType = driver.type.NORMAL
        let car = {};
        let parkCar = parkingLotObject.parkCar(car, new Date(), driverType)
        let unParkCar = parkingLotObject.unParkCar(car, new Date())
        assert.isTrue(unParkCar)
    })

    // throw exception when unpark the car which is not park
    it('given not park car when unpark should throw exception', function () {
        try {
            let parkingLotObject = new parkingLot(2, 2, 4)
            let car = {};
            let car1 = {};
            let driverType = driver.type.NORMAL
            let parkCar = parkingLotObject.parkCar(car, new Date(), driverType)
            let unParkCar = parkingLotObject.unParkCar(car1, new Date())
        } catch (error) {
            assert.equal(error.message, "car not parked");
        }
    })

    // UC3..inform owner when parkingLot is full
    it('given parking lot when is full then inform owner', function () {
        let parkingLotObject = new parkingLot(2, 2, 4)
        sinon.stub(parkingLotObject, "checkParkingLotFull").onFirstCall().returns(false).onSecondCall().returns(true)
        let car = {}
        let car1 = {}
        let driverType = driver.type.NORMAL
        assert.equal(true, parkingLotObject.parkCar(car, new Date(), driverType))
        assert.equal(parkingLotObject.parkCar(car1, new Date()), "Parking lot full")
        parkingLotObject.checkParkingLotFull.restore()
    })

    // check is owner receive parking lot full notification
    it('given parking lot full when check is owner receive notification should return true', function () {
        let parkingLotObject = new parkingLot(2, 2, 4)
        let driverType = driver.type.NORMAL
        let car = {};
        let car1 = {};
        expect(parkingLotObject.parkCar(car, new Date(), driverType)).to.be.equal(true)
        parkingLotObject.parkCar(car1, new Date(), driverType)
        expect(owner.informParkingLotFull()).to.be.equal(true)
    })

    // inform airportSecurity when parking lot is full 
    it('should inform airport security when parkingLot is full', function () {
        let parkingLotObject = new parkingLot(2, 2, 4)
        let car = {};
        let car1 = {};
        let driverType = driver.type.NORMAL
        let parkCar = parkingLotObject.parkCar(car1, new Date(), driverType)
        assert.isTrue(parkCar)
        let check = airportSecurity.informParkingLotFull()
        expect(check).to.be.equal(true)
    })

    // UC5.. inform owner when space is available when 
    it('inform owner if space is available in parkingLot', function () {
        let parkingLotObject = new parkingLot(2, 2, 4)
        let car = {};
        let driverType = driver.type.NORMAL
        let parkCar = parkingLotObject.parkCar(car, new Date(), driverType)
        assert.isTrue(parkCar)
        let unParkCar = parkingLotObject.unParkCar(car)
        assert.isTrue(unParkCar)
        let informOwner = owner.informOwnerSpaceIsAvailable()
    })
})

describe('Testing parkingLot extra functionality', function () {

    let parkingLotObject;
    beforeEach(function () {
        parkingLotObject = new parkingLot(2, 2, 4)
    })
    // UC6..give owner parkingLot attendance
    it('should inform owner about empty slots in parking car', function () {
        let car = {};
        let car2 = {};
        let driverType = driver.type.NORMAL
        assert.isTrue(parkingLotObject.parkCar(car, new Date(), driverType))
        assert.isTrue(parkingLotObject.parkCar(car2, new Date(), driverType))
        assert.isTrue(parkingLotObject.unParkCar(car2))
        let availableSpace = parkingLotObject.chekEmptySlots()
        assert.equal(availableSpace.slot, 1)
        assert.equal(availableSpace.lot, 0)
    })

    // return false when no slot is empty
    it('should return false when checking for empty slot when their is no empty slot', function () {
        let car = {};
        let car1 = {};
        let car2 = {};
        let car3 = {};
        let driverType = driver.type.NORMAL
        assert.isTrue(parkingLotObject.parkCar(car, new Date(), driverType))
        assert.isTrue(parkingLotObject.parkCar(car1, new Date(), driverType))
        assert.isTrue(parkingLotObject.parkCar(car2, new Date(), driverType))
        assert.isTrue(parkingLotObject.parkCar(car3, new Date(), driverType))
        assert.equal(false, parkingLotObject.chekEmptySlots())
    })

    // UC7.. driver can find car
    it('given park car when driver serach car should able to search car', function () {
        let totalCars = [
            { type: 'small', color: 'silver', numberPlate: 'MH-41-AK-0910' },
            { type: 'small', color: 'white', numberPlate: 'MH-14-NS-7799' },
            { type: 'small', color: 'black', numberPlate: 'MH-15-AK-2244' },
            { type: 'small', color: 'white', numberPlate: 'MH-19-AK-0460' },
        ]
        let driverType = driver.type.NORMAL
        totalCars.forEach(car => {
            let parkCar = parkingLotObject.parkCar(car, new Date(), driverType)
            assert.isTrue(parkCar)
        })
        let searchCar = {
            numberPlate: 'MH-41-AK-0910'
        }
        let positionOfDriverCar = parkingLotObject.searchCar(searchCar)
        assert.equal(0, positionOfDriverCar[0].lot)
        assert.equal(0, positionOfDriverCar[0].slot)
    })

    // UC8.. inform owner about parking time of car
    it(`should inform owner about parkingTime of car`, function () {
        let car = {};
        let driverType = driver.type.NORMAL
        let parkCar = parkingLotObject.parkCar(car, new Date(), driverType)
        assert.isTrue(parkCar)
    })

    // UC10..search nearest place to park car for handicap driver
    it(`should return nearest place for handicap driver to park the car`, function () {
        let car = {};
        let car1 = {};
        let parkCar = parkingLotObject.parkCar(car, new Date(), driver.type.NORMAL)
        let parkAnotherCar = parkingLotObject.parkCar(car1, new Date(), driver.type.HANDICAP)
        assert.isTrue(parkCar)
        assert.isTrue(parkAnotherCar)
    })

    //UC11... search place to park the large car
    it(`given cars when parked large vehicle should search place to park the large vehicle`, function () {
        // parkingLotObject = new parkingLot(3, 3, 6)
        let totalCars = [{}, {}, { type: 'large' }]
        totalCars.forEach(car => {
            let parkCar = parkingLotObject.parkCar(car)
            assert.isTrue(parkCar)
        })
    })

    // testCase for checking function defined or not
    it(`should  exist`, () => {
        expect(parkingLotObject.checkParkingLotFull()).to.be.not.undefined
    });

    //UC12..search all white car locations
    it(`should search all white cars`, function () {
        let totalCars = [
            { type: 'small', color: 'silver' },
            { type: 'small', color: 'white' },
            { type: 'small', color: 'black' },
            { type: 'small', color: 'white' },
        ]
        totalCars.forEach(car => {
            let parkCar = parkingLotObject.parkCar(car, new Date())
            assert.isTrue(parkCar)
        })

        let searchCar = {
            color: 'white',
        }

        let whiteCars = parkingLotObject.searchCar(searchCar)
        assert.equal(whiteCars[0].lot, 1)
        assert.equal(whiteCars[0].slot, 0)
        assert.equal(whiteCars[1].lot, 1)
        assert.equal(whiteCars[1].slot, 1)
    })

    // UC13...find Toyota cars having blue color
    it(`given cars when search blue toyota  should return all blue toyota  cars`, () => {
        let totalCars = [
            { type: 'small', company: 'Toyota', color: `White` },
            { type: 'small', company: 'Toyota', color: `Blue` },
            { type: 'small', company: 'Mahindra', color: `Blue` },
            { type: 'small', company: 'Toyota', color: `Blue` },
        ]
        totalCars.forEach(car => {
            let parkCar = parkingLotObject.parkCar(car, new Date())
            assert.isTrue(parkCar)
        })

        let searchCar = {
            company: 'Toyota',
            color: 'Blue',
        }

        let cars = parkingLotObject.searchCar(searchCar)
        assert.equal(cars[0].lot, 1)
        assert.equal(cars[0].slot, 0)
        assert.equal(cars[1].lot, 1)
        assert.equal(cars[1].slot, 1)

    })

    // UC14...find BMW cars
    it(`give cars when search car by company name  should search cars `, (done) => {
        let totalCars = [
            { type: 'small', company: 'Toyota', color: `White` },
            { type: 'small', company: 'BMW', color: `Blue` },
            { type: 'small', company: 'Mahindra', color: `White` },
            { type: 'small', company: 'BMW', color: `Blue` },
        ]
        totalCars.forEach(car => {
            let parkCar = parkingLotObject.parkCar(car, new Date())
            assert.isTrue(parkCar)
        })

        let searchCar = {
            company: 'BMW',
        }

        let cars = parkingLotObject.searchCar(searchCar)
        assert.equal(cars[0].lot, 1)
        assert.equal(cars[0].slot, 0)
        assert.equal(cars[1].lot, 1)
        assert.equal(cars[1].slot, 1)
        done()
    })

    // UC15...search cars park in last 30 minutes
    it(`given cars when search cars park in last 30 minutes should return cars`, () => {
        let date = new Date();
        date.setMinutes(date.getMinutes() - 30)
        let parkTimeFor1stCar = date.getTime()
        let date1 = new Date()
        date1.setMinutes(date1.getMinutes() - 50)
        let parkTimeFor2ndCar = date1.getTime()
        let date2 = new Date();
        date2.setMinutes(date2.getMinutes() - 20)
        let parkTimeFor3rdCar = date2.getTime()
        let totalCars = [
            { type: 'small', company: 'Toyota', color: `White`, parkTiming: parkTimeFor1stCar },
            { type: 'small', company: 'BMW', color: `Blue`, parkTiming: parkTimeFor2ndCar },
            { type: 'small', company: 'BMW', color: `Blue`, parkTiming: parkTimeFor3rdCar }
        ]

        totalCars.forEach(car => {
            let parkCar = parkingLotObject.parkCar(car)
        })

        let carsParkedInLast30Minutes = parkingLotObject.searchCarsParkedInLast30Minutes()
        assert.equal(0, carsParkedInLast30Minutes[0].lot)
        assert.equal(0, carsParkedInLast30Minutes[0].slot)
        assert.equal(0, carsParkedInLast30Minutes[1].lot)
        assert.equal(1, carsParkedInLast30Minutes[1].slot)
    })


})
