const File = require("../models/file.model")
const Pila = require("../models/pila.model")
const path = require("path")
const { unlink }= require("fs-extra")

const getAll = async (req, res) => {
    try {
        let files = await File.find()
        if(files == "" || files == 0 || files == null){
            res.status(404).json({msg: "No se encontraron datos"})
        }else{
            res.status(200).send(files)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let file = await File.findById(id)
        if(file == "" || file == null){
            res.status(204).json({msg: "No se encontró el dato"})
        }else{
            res.status(200).send(file)
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newFile = async (req, res) =>{
    const { id } = req.params
    try {
        let foundPila = await Pila.findById(id)
        if(foundPila == null || foundPila == ""){
            return res.status(203).json({msg: "No se encontró la pila"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }    
    const files = new File()
    files.description = req.body.description
    files.filename = req.file.filename
    files.path = '/img/uploads/' + req.file.filename
    files.mimetype = req.file.mimetype,
    files.size = req.file.size
    try {
        const resultFile = await files.save()  
        const saveId = resultFile._id
        const resultPila = await Pila.updateOne({_id: id},{$push:{files:{$each:[{_id: saveId}]}}})
        if(resultFile && resultPila){
            res.status(201).json({msg: "Archivo añadido correctamente"})
        }else{
            res.status(400).json({msg: "Ocurrió un error al añadir el archivo"})
        }      
    } catch (error) {
        res.status(500).send({msg: "El servidor no puede devolver una respuesta"})
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

}
 
const deleteFile = async(req, res) =>{
    const {id} = req.params
    try {//verificador de existencia en DB archivos
        let foundFile = await File.findById(id)
        if(foundFile == null || foundFile == ""){
            return res.status(203).json({msg: "No se encontró el archivo"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {//verificador de existencia en DB pila
        var foundPila = await Pila.findOne({files : {_id: id}})        
        if (foundPila == null || foundPila == ""){
            return res.status(203).json({msg: "El archivo no pertenece a ninguna pila"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {//elimina de la base de datos file y elimina el campo correspondiente a la relacion con la db pila
        const resultFile = await File.findByIdAndDelete(id)//elimina de la db file
        await unlink(path.resolve('./src/public'+ resultFile.path))//elimina del server
        const resultPila = await Pila.updateOne({_id: foundPila._id}, {$pull: {files: id}})//actualiza la db pila
        if(resultFile && resultPila){
            res.status(201).json({msg: "Archivo eliminado correctamente"})
        }
        
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newFile,
    deleteFile
}