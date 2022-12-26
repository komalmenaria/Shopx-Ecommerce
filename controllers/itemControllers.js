const Item = require("../models/Item")
const upload = require("../upload")



module.exports.get_items = async (req,res) =>{
try{
    Item.find().sort({date:-1}).then( async function(items) {

        

        // let url = await upload.getFileURL(item.imageKey);
        //    url = item.imageKey
     
        res.json(items)
    }) 
    // let url = upload.getFileURL(items.imageKey)
    // res.send(url)
}
catch (error) {
    console.log(error)
     res.status(500).json({msg:"Something went wrong"})
}
    
    
}

module.exports.post_item = async (req,res)=>{
    try {
        const newItem = new Item(req.body);
        
        let fileKey =  await upload.uploadFile(req.files)
        newItem.imageKey = fileKey;
         await newItem.save();
    res.json(newItem)
    // newItem.save().then(item => res.json(item));
    } catch (error) {
        console.log(error)
         res.status(500).json({msg:"Something went wrong"})
    }
    
}

module.exports.update_item = (req,res) => {
   
    Item.findByIdAndUpdate({_id: req.params.id},req.body).then(function(item){
        Item.findOne({_id: req.params.id}).then(function(item){
            res.json(item);
        });
    });
}

module.exports.delete_item = (req,res) => {
    Item.findByIdAndDelete({_id: req.params.id}).then(function(item){
        res.json({success: true});
    });
}