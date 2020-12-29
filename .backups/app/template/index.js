const factoryStack = {}

const register = (name, factory) => {
    factoryStack[name] = factory
}

const factory = (name) => {
    return factoryStack[name]
}

module.exports = {
    register,
    factory
}