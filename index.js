const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const venderRoutes = require("./routes/vendorRoutes");
const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoute")
const productRoutes = require("./routes/productRoute")
const path = require('path')

const app = express()

const PORT = 4000;

dotEnv.config()

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((err)=>[
    console.log(err)
])

app.use(bodyParser.json());
app.use("/vendor",venderRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static('uploads'))

// to start server
app.listen(PORT, ()=>{
    console.log(`Server started and running at ${PORT}`)
})

// have to create route on the base of server
app.use('/home',(req, res)=>{
    res.send("<h1>Welcome to SUBY");
})