const dbConnection = require('../database/MySqlConnection')
class ModelBase {
    constructor() {
        this.connection = dbConnection
        this.tableName
    }
    insert(values) {
        const query = `INSERT INTO ${this.tableName} SET ?`
        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (error, results, fields) => {
                if (error) return reject(error)
                return resolve({ results })
            })
        })
    }
    update(values) {
        const query = `UPDATE ${this.tableName} SET ? WHERE ?`
        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (error, results, fields) => {
                if (error) return reject(error)
                return resolve({ results })
            })
        })
    }
    delete(values) {
        const query = `DELETE FROM ${this.tableName} WHERE ?`
        return new Promise((resolve, reject) => {
            this.connection.query(query, values, (error, results, fields) => {
                if (error) return reject(error)
                return resolve({ results })
            })
        })
    }
    getAll() {
        const query = `SELECT * FROM ${this.tableName}`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, results, fields) => {
                if (error) return reject(error)
                return resolve({ results })
            })
        })
    }
    getByPage(posion, limit) {
        const query = `SELECT * FROM ${this.tableName} LIMIT ${posion}, ${limit}`
        return new Promise((resolve, reject) => {
            this.connection.query(query, (error, results, fields) => {
                if (error) return reject(error)
                return resolve({ results })
            })
        })
    }
}
module.exports = ModelBase