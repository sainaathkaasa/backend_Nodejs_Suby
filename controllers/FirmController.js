
const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");


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



const addFirm = async(req, res)=>{

    try {
        const {firmname, area, category, region, offer} = req.body;

        const image = req.file?req.file.filename:undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if(!vendor){
        return res.status(404).json({error:"vendor not found"});
    }

    const firm = new Firm({
        firmname, area, category, region, offer, image, vendor: vendor._id
    })

    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm);

    await vendor.save();

    res.status(200).json({message:"Firm added successfully"})
        
    } catch (error) {
        console.log(error);
        res.status(500).json("internal server error  hello")
    }
}

const deleteFirmById = async(req, res)=>{
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if(!deletedFirm){
            res.status(404).json({error:"no firm exist"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}


module.exports ={ addFirm: [upload.single('image'), addFirm], deleteFirmById}