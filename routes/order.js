const { Router } = require('express');
const orderController = require('../controllers/orderControllers');
const router = Router();
const auth = require("../middleware/auth")


router.get('/order/:id',auth,orderController.get_orders);
router.post('/order/:id',auth,orderController.checkout);

module.exports = router;