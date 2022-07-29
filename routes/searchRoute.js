const express = require('express');
const searchController = require('../controllers/searchController');

const router = express.Router();

router.route('/:q').get(searchController.recipeSearch);

module.exports = router;
