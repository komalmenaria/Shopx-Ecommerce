const { Router } = require('express');
const cartController = require('../controllers/cartControllers');
const router = Router();

router.get('/getcartitem/:id',cartController.get_cart_items);
router.post('/addcartitem/:id',cartController.add_cart_item);
router.put('/updatecartitem/:id',cartController.update_cart_item);
router.delete('/deletecartitem/:userId/:itemId',cartController.delete_item);
module.exports = router;