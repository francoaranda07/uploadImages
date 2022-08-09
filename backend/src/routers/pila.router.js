const express = require('express')
const router = express.Router();
const { check } = require("express-validator")
const { validaterCampos } = require("../middlewares/validaterCamp")
const { getAll, getById, newPila, editPila, deletePila} = require("../controllers/pila.controllers")

router.get("/pila", getAll)

router.get("/pila/:id", getById)

router.post("/pila", [check("name", "El nombre no puede ir vacío").not().isEmpty().trim().escape(), validaterCampos], newPila)

router.post("/pila/:id", [check('name', "El nombre no puede ir vacío").not().isEmpty().trim().escape(), validaterCampos], editPila)

router.delete("/pila/:id", deletePila)

module.exports = router;
