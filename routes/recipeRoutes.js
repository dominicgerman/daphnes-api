const express = require('express');
const recipeController = require('../controllers/recipeController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', recipeController.checkID);

router
  .route('/')
  .get(recipeController.getAllRecipes)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.createRecipe
  );
router
  .route('/:id')
  .get(recipeController.getRecipe)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.updateRecipe
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    recipeController.deleteRecipe
  );

// router.route('/:search').get(recipeController.getRecipe);

module.exports = router;
