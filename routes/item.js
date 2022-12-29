const { Router } = require('express');
const itemController = require('../controllers/itemControllers');
const router = Router();

router.get('/getItem/:id', itemController.get_single_item);
router.get('/items', itemController.get_items);
router.post('/addItem',itemController.post_item);
router.put('/updateItem/:id',itemController.update_item);
router.delete('/items/:id',itemController.delete_item);

module.exports = router;