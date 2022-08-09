const Pila = require("../models/pila.model")
const File = require("../models/file.model")
const path = require("path")
const { unlink }= require("fs-extra")

const getAll = async (req, res) => {
    try {
        let foundPilas = await Pila.find()
        if(foundPilas == "" || foundPilas == 0 || foundPilas == null){
            return res.status(404).json({
                msg: "No se encontraron datos"
            })
        }else{
            Pila.find({}, function (err, pilas) {
                File.populate(pilas, { path: "files" }, function (err, pilas) {
                    res.status(200).send(pilas);
                });
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
};

const getById = async (req, res) =>{    
    const { id } = req.params
    try {
        let foundPila = await Pila.findById(id)
        if(foundPila == null){
            return res.status(404).json({
                msg: "No se encontró esa pila"
            })
        }else{
            Pila.find({_id: id}, function (err, pilas) {
                File.populate(pilas, { path: "files" }, function (err, pilas) {
                    res.status(200).send(pilas);
                });
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}

const newPila = async (req, res) => {
    const { name }= req.body
    
    const foundPila = await Pila.findOne({ name })
    
    if (foundPila) {
        return res.status(400).json({
            msg: 'Ya existe pila con ese nombre'
        })
    }
    const pila = new Pila(req.body)
    try {
        const result = await pila.save()
        if(result){
            res.status(201).json({msg: "Pila creada correctamente"})
        }else{
            res.status(400).json({msg: "Ocurrió un error al crear el slider"})
        }
    } catch (error) {
        res.status(500).json({msg: "El servidor no puede devolver una respuesta"})
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

}

const editPila = async (req, res) =>{
    const {id} = req.params
    const {name} = req.body
    
    if(!name){
        return res.status(400).json({
            msg: 'Nombre no puede estar vacío'
        })
    }
    try {
        var foundPila = await Pila.findById(id)
        // var oldPath = foundPila.path
        if(foundPila == null || foundPila == ""){
            return res.status(203).json({msg: "No se encontró la pila"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    const verifyRepeat = await Pila.find({name})//verifica que no haya otro nombre con otro ID
    if(verifyRepeat){
        if(verifyRepeat != "" && verifyRepeat[0]["name"] == name && verifyRepeat[0]["_id"] != id){// si el nombre es igual y el ID es distinto al que se está editando que no lo deje editar
            return res.status(400).json({
                msg: 'Ya existe pila con ese nombre'
            })
        }
    }
    
    try {
        const resultPila = await Pila.updateOne({_id: id},{$set: {
            name: name
        }})
        if(resultPila){
            res.status(201).json({msg: "Nombre de pila actualizado correctamente"})
        }
        // if(oldPath != newPath){//si las imagenes son distintas al actualizar que se borre la antigúa del servidor
        //     await unlink(path.resolve('./src/public'+ oldPath))//elimina del server
        // }
    } catch (error) {
        res.status(500).json({ msg: "Ocurrio un error al actualizar" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
 
const deletePila = async(req, res) =>{
    const {id} = req.params
    try {
        var foundPila = await Pila.findById(id)
        if(foundPila == null || foundPila == ""){
            return res.status(203).json({msg: "No se encontró la pila"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }

    try {
        for(var i = 0; i < foundPila.files.length; i++){// que busque las relaciones con las pilas y las elimine de la bd y del server
            const resultFile = await File.findByIdAndDelete(foundPila.files[i]["_id"])
            // console.log(resultFile);
            await unlink(path.resolve('./src/public'+ resultFile.path))//elimina del server
        }
        const resultPila = await Pila.findByIdAndDelete(id)//elimina de la db
        if(resultPila){
            res.status(201).json({msg: "Pila eliminada correctamente con sus respectivas relaciones"})
        }
    } catch (error) {
        res.status(500).json({ msg: "El servidor no puede devolver una respuesta" })
        console.error(`Tipo: ${error.name}, Error: ${error.message}`);
    }
}
module.exports= {
    getAll,
    getById,
    newPila,
    editPila,
    deletePila
}