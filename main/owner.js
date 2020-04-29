class Owner {

    informParkingLotFull() {
        return this.full = true
    }

    informOwnerSpaceIsAvailable() {
        return this.empty = true
    }
}
module.exports = new Owner()