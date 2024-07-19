const express = require("express");
const firmController = require("../controllers/FirmController");
const verifyToken = require("../middlewares/verifyToken");
const FirmController = require("../controllers/FirmController");

const router = express.Router()

router.post('/add-firm', verifyToken, firmController.addFirm);

router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname, '..','uploads',imageName));
})

router.delete('/:firmId', FirmController.deleteFirmById);

module.exports = router