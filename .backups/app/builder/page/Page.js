class Page {
    constructor (params) {
        this.metas = params.metas
        this.page = params.page
        this.global = params.global
        this.tops = params.tops
        this.body = params.body
        this.javascripts = params.javascripts
        this.plugins = params.plugins
    }
}

module.exports = Page