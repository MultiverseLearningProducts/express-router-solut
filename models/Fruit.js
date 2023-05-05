const Sequelize = require("sequelize");
const db = require("../db/connection");

const Fruit = db.define("fruit", {
    name: Sequelize.STRING,
    color: Sequelize.STRING
})

module.exports = Fruit;