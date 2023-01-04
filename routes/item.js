const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();
const auth = require("../middleware/auth")


router.get('/getItem/:id',auth, itemController.get_single_item);
router.get('/items', itemController.get_items);
router.post('/addItem',auth,itemController.post_item);
router.put('/updateItem/:id',auth,itemController.update_item);
router.delete('/deleteitem/:id',auth,itemController.delete_item);

module.exports = router;