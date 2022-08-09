const express = require('express')
const router = express.Router();
const multer = require("multer")
const { getAll, getById, newFile, deleteFile} = require("../controllers/file.controllers")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname+'../../public/img/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

router.get("/file", getAll)

router.get("/file/:id", getById)

router.post("/file/:id", upload.single('file'), newFile)

router.delete("/file/:id", deleteFile)

module.exports = router;
