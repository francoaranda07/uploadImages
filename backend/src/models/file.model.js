const {Schema, model} = require("mongoose");

const fileSchema = new Schema({
    description: String,
    filename: String,
    path: String,
    public_id: String,
    mimetype: String,
    size: String,
})

module.exports = model('File', fileSchema)