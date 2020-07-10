const ModelBase = require('./ModelBase')

class Character extends ModelBase {
    constructor() {
        super()
        this.tableName = 'characters'
    }
}

module.exports = Character