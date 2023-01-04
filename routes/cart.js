const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();
const auth = require("../middleware/auth")

router.get('/getcartitem/:id',auth, cartController.get_cart_items);
router.post('/addcartitem/:id',auth , cartController.add_cart_item);
router.put('/updatecartitem/:id',auth,cartController.update_cart_item);
router.delete('/deletecartitem/:userId/:itemId',auth,cartController.delete_item);
module.exports = router;