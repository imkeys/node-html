class Factory {
    getInstance () {
        throw new Error('u must be override this method')
    }
}

module.exports = Factory