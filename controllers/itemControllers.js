const Item = require("../models/Item")
const upload = require("../upload")
const {errorHandler} = require("../util")

module.exports.get_single_item = async (req,res) =>{
    try {
        Item.findOne({_id: req.params.id}).then(async function(item){
            let fileKey = await upload.getFileURL(item.imageKey)
            item.imageKey = fileKey
            res.json(item);
        });
    } catch (error) {
        errorHandler(error)
        console.log(error)
        return res.status(500).json({msg:"Technical error occured"})
    }
}

module.exports.get_items = async (req,res) =>{
try{
    Item.find().sort({date:-1}).then( async function(items) {
       let finalResponse = []
       for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if(element.imageKey){
            element.imageKey = await upload.getFileURL(element.imageKey)
        }
        finalResponse.push(element) 
       }
     
        res.json(finalResponse)
    }) 
}
catch (error) {
    errorHandler(error)
    console.log(error)
    return res.status(500).json({msg:"Technical error occured"})
}
    
    
}

module.exports.post_item = async (req,res)=>{
    try {
        const { title, description, category ,price } = req.body;
        if (!title ||  !description ||  !category ||  !price || !req.files) {
            res.status(400).json({ msg: "Please enter all fields" });
        }; 
        
        let product = await Item.findOne({ title })
        if (product) return res.status(400).json({ msg: "Product already exist" });

        const newItem = new Item(req.body)
        let fileKey =  await upload.uploadFile(req.files)
        newItem.imageKey = fileKey;
         await newItem.save();
    res.json(newItem)
    // newItem.save().then(item => res.json(item));
    } catch (error) {
        errorHandler(error)
        console.log(error)
         return res.status(500).json({msg:"Technical error occured"})
    }
    
}

module.exports.update_item = async (req,res) => {

    try{
        const { title, description, category ,price } = req.body;
        if (!title ||  !description ||  !category ||  !price ) {
            res.status(400).json({ msg: "Please enter all fields" });
        }; 
      
        let product = {
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            // imageKey:fileKey 
        }
    
        if(req.files){
            product.imageKey = await upload.uploadFile(req.files);
        }
        
        Item.findByIdAndUpdate({_id: req.params.id},
           product).then(function(item){
            Item.findOne({_id: req.params.id}).then(function(item){
                res.json(item);
            });
        }).catch((error) => {
            console.error(error);
          });
    }
    catch (error){
        errorHandler(error)
        console.log(error)
         return res.status(500).json({msg:"Technical error occured"})
      }
    
}

module.exports.delete_item = (req,res) => {
    try{
        Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
            res.json({success: true});
        });
    }
    catch (error){
        errorHandler(error)
        console.log(error)
         return res.status(500).json({msg:"Technical error occured"})
    }
}