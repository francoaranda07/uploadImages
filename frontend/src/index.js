const express = require("express")
const path = require("path")
const morgan = require("morgan")

//init
const app = express()

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'))//para que me muestre por consola la peticion
app.use(express.urlencoded({extended: false}))//para que el server entienda los datos de los formularios

//Routes
app.use(require('./routes/index.js'))

//Static files
app.use(express.static(path.join(__dirname, 'public')))//para que esta carpeta sea accedida desde el navegador
//start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})