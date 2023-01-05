const { Router } = require('express');
const searchController = require('../controllers/searchControllers');
const router = Router();


router.get('/search/:key',searchController.get_search_items);


module.exports = router;