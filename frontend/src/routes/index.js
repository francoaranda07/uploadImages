const { Router } = require("express")
const router = Router()
const axios = require("axios")
const env = require("dotenv/config")

router.get('/', async (req, res) =>{ //tra todas las pilas index
    axios.get(process.env.API +'/api/pila')
    .then(function (response) {
        const pilas = response.data
       
        res.render('index', {pilas: pilas})
    })
    .catch(function (error){
        console.log(error);
        const pilas = ""
        res.render('index', {pilas: pilas})
    })    
})  

router.post('/upload', async (req, res) =>{ //nuevo casillero- index
    const { name } = req.body
    axios.post(process.env.API +'/api/pila',{
        name: name
    })
    .then(function (response) {
        res.send(response.data.msg)
    })
    .catch(function (error) {
        var err = error.response.data.msg
        res.send(err)
    })
})

router.get('/edit/:id', async (req, res) =>{ //editar nombre de casillero 
    const {id} = req.params
    axios.get(process.env.API +'/api/pila/'+id)
    .then(function (response) {
        const id = response.data[0]["_id"]
        const name = response.data[0]["name"]
        res.render('edit', {name, id})//paso al front        
    })
    .catch(function (error){
        console.log(error);
    })  
})

router.post('/edit/:id', async (req, res) =>{ //enviar al back el nuevo nombre del casillero 
    const {id} = req.params
    const { name }= req.body
    axios.post(process.env.API +'/api/pila/'+id,{
        name: name
    })
    .then(function (response) {
        res.send(response.data.msg)    
    })
    .catch(function (error) {
        var err = error.response.data.msg
        res.send(err)
    })
})

router.get('/pila/:id', async (req, res) =>{//que traiga las pilas con sus relaciones
    const {id} = req.params
    await axios.get(process.env.API +'/api/pila/'+ id)
    .then(function (response) {
        const pilas = response.data[0]["files"]
        const title = response.data[0]["name"]
        const url = process.env.API
        res.render('pila', {id, pilas, title, url})//paso al front        
    })
    .catch(function (error){
        console.log(error.response.data.msg);
    })   
})

router.post('/pila/:id/delete', async (req, res) =>{//que elimine una pila con todas sus relaciones
    const {id} = req.params
    axios.delete(process.env.API +'/api/pila/'+ id)
    .then(function (response) {
        res.send(response.data.msg)      
    })
    .catch(function (error){
        res.send(error.response.data.msg)
    })   
})

router.post('/file/:id/delete', async (req, res) =>{
    const {id} = req.params
    console.log("Llego del front a eliminar: ",id);
    axios.delete(process.env.API +'/api/file/'+ id)
    .then(function (response) {
        res.send(response.data.msg)      
    })
    .catch(function (error){
        res.send(error.response.data.msg)
    })  
})

module.exports = router