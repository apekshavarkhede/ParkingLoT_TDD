class Owner {

    informParkingLotFull() {
        return this.full = true
    }

    informOwnerSpaceIsAvailable() {
        this.full = false
        return "space is available"
    }
}
module.exports = new Owner()