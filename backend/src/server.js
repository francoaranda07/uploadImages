const express = require("express")
const cors = require("cors");
const helmet = require("helmet")
const morgan = require("morgan")
const env = require("dotenv/config")
const dbConfig = require("./db/db.config");
const router = require("./routers/index")
const path = require("path")
const db = require("./models")

const app = express();

app.use(helmet())
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
app.use(morgan('dev'))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.json("api Upload Images")
})

//Static files
app.use(express.static(path.join(__dirname, 'public')))//para que esta carpeta sea accedida desde el navegador

//Routes
app.use('/api', router)

app.get('*', function (req, res){
    res.status(404).send('Error 404 - Not Found');
})

