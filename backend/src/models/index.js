const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.pila = require("./pila.model");
db.file = require("./file.model")

module.exports = db;