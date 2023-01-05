const Item = require("../models/Item");
const upload = require("../upload")
const { errorHandler } = require("../util");

module.exports.get_search_items = async (req, res) => {
  try {
    let items = await Item.find({
      $or: [
        {
          title: { $regex: req.params.key },
         
          
        },
        {
          category: { $regex: req.params.key }
        },
        {
          description: { $regex: req.params.key }
        }
      ],
    });
    if(!items){
      return res.status(500).json({msg:"No Product match with this name"})
    }
    let finalResponse = []
    for (let index = 0; index < items.length; index++) {
     const element = items[index];
     if(element.imageKey){
         element.imageKey = await upload.getFileURL(element.imageKey)
     }
     finalResponse.push(element) 
    }
  
     res.json(finalResponse)
   
  } catch (error) {
    errorHandler(error)
    console.log(error)
    return res.status(500).json({msg:"Technical error occured"})
  }
};
