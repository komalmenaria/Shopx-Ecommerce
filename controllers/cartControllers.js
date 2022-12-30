const Cart = require('../models/Cart');
const Item = require('../models/Item');
const upload = require("../upload")
const {errorHandler} = require("../util")


module.exports.get_cart_items =async (req,res)=>{
const userId = req.params.id;
// console.log(userId)
try{
    let cart = await Cart.findOne({userId});
    if(cart && cart.items.length>0){
        let finalResponse = []
        for (let index = 0; index < cart.items.length; index++) {
         const element = cart.items[index];
         if(element.imageKey){
             element.imageKey = await upload.getFileURL(element.imageKey)
         }
         finalResponse.push(element) 
        }
      cart.items = finalResponse
        //  res.json(finalResponse)
        res.send(cart);
    }
    else{
        res.status(500).send('No Item in the cart')
    }
}catch (error) {
    errorHandler(error)
    console.log(error)
     return res.status(500).json({msg:"Technical error occured"})
}
}


module.exports.add_cart_item = async (req,res) => {
    const userId = req.params.id;
    const { productId , quantity } = req.body;
    
    try{
        let cart = await Cart.findOne({userId});
        let item = await Item.findOne({_id:productId});

        if (!item) {
            res.status(404).send('Item not found')
        }
        // console.log(item.description)
        const price = item.price;
        const name = item.title;
        const description = item.description;
        const imageKey = item.imageKey


        if(cart){
        // if cart exists for the user
            let itemIndex = cart.items.findIndex( p => p.productId == productId);

        // Check if product exists or not
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            // console.log(productItem.quantity)
            productItem.quantity += quantity;
            cart.items[itemIndex] = productItem;
        }
        else{
            cart.items.push({productId,name, quantity, price,imageKey,description })
        }

        cart.bill += quantity*price;
        cart = await cart.save();
        return res.status(201).send(cart);
        }
        else{
            // no cart exists , create one
            const newCart = await Cart.create({
                userId,
                items:[{productId,name,quantity,price,imageKey,description}],
                bill:quantity*price
            });
            return res.status(201).send(newCart);
        }
    }
    catch (error) {
    errorHandler(error)
    console.log(error)
     return res.status(500).json({msg:"Technical error occured"})
}

}


module.exports.update_cart_item = async (req,res) =>{
    const userId = req.params.id;
    const { productId , quantity} = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let item = await Item.findOne({_id:productId});

        if(!item)
        return res.status(404).send("Item not found!");

        if(!cart)
        return res.status(400).send("Cart not found");
        else{
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId ==  productId);

            // check if product exists or not
            if(itemIndex == -1)
            return res.status(404).send('Item not found in cart!');
            else{
                let productItem = cart.items[itemIndex];
                productItem.quantity = quantity;
                cart.items[itemIndex] = productItem;
            }

            cart.bill = cart.items.reduce((sum,item)=> sum + item.price * item.quantity ,0);
            cart = await cart.save();
            return res.status(201).send(cart);
        }
    }
  
    catch (error) {
        errorHandler(error)
        console.log('Error in update cart')
        return res.status(500).json({msg:"Technical error occured"})
    }
}


module.exports.delete_item = async (req,res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    try{
        let cart = await Cart.findOne({userId});
        if(!cart)
        return res.status(500).send("Cart not found")
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            // console.log(productItem)
            cart.bill -= productItem.quantity*productItem.price;
       
            cart.items.splice(itemIndex,1);
        }
        else{
            return res.status(500).send("no items in cart")
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (error) {
        errorHandler(error)
        console.log(error)
         return res.status(500).json({msg:"Technical error occured"})
    }
}

