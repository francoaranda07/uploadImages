const express = require('express')
const routers = express.Router();
const pila = require("./pila.router")
const file = require("./file.router")

routers.use("/", pila);
routers.use("/", file);

module.exports = routers;