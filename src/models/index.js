const { dbConnection, Sequelize } = require('../db-config/connection')

const db = {}

db.Sequelize = Sequelize
db.sequelize = dbConnection

db.user = require('./user')(dbConnection,Sequelize)
db.task = require('./task')(dbConnection,Sequelize)

module.exports = db