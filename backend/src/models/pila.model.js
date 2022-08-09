const mongoose = require("mongoose");
const {Schema, model} = require("mongoose");

const Pila = mongoose.model("Pila", new mongoose.Schema({
    name: String,
    files: [
        {
            ref: 'File',
            type: Schema.Types.ObjectId
        }
    ]
    })
);

module.exports = Pila;