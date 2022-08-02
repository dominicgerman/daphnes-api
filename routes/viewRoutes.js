const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getRoot);
router.get('/login', viewsController.getLoginForm);
router.get('/admin', authController.protect, viewsController.getAdmin);
router.get(
  '/createRecipe',
  authController.protect,
  viewsController.getCreateRecipeForm
);

module.exports = router;
