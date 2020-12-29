const Factory = require("../../template/factory/Factory")

const factoryStack = {}

const register = (name, builder) => {
    factoryStack[name] = {
        getInstance (config) {
            return new builder(config)
        }
    }
}

const factory = (name) => {
    return factoryStack[name]
}

module.exports = {
    register,
    factory
}