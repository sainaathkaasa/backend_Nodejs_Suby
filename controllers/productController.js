
const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm")


// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });


const addProduct = async(req, res)=>{
    try {

        const {productname, price, category, bestseller, description} = req.body;

        const image = req.file? req.file.filename : undefined;

        const firmId = req.params.firmId;

        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({error:"NO Firm Found"});
        }
        
        const product = new Product({
            productname, price, category, bestseller, description, image, firm : firm._id
        })

        const savedProduct = await product.save();

        firm.product.push(savedProduct);

        await firm.save()

        res.status(200).json(savedProduct);



    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
}

const getProductBYFirm = async(req, res)=>{
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            res.status(404).json({error:"no firm found"});

        }


        const resturentname = firm.firmname;
        const products = await Product.find({firm:firmId});

        res.status(200).json({resturentname, products});

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"});
    }
}

const deleteProductById = async(req, res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            res.status(404).json({error:"no product exist"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

module.exports = {addProduct:[upload.single('image'), addProduct], getProductBYFirm, deleteProductById};