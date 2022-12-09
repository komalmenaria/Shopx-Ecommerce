const Cart = require('../models/Cart');
const Item = require('../models/Item');

module.exports.get_cart_items =async (req,res)=>{
const userId = req.params.id;
try{
    let cart = await Cart.findOne({userId});
    if(cart && cart.items.length>0){
        res.send(cart);
    }
    else{
        res.send(null)
    }
}catch(err){
    console.log(err)
    res.staus(500).send('Something went wrong')
}
}