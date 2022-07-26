const Recipe = require('../models/recipeModel');
const factory = require('./handlerFactory');
// const APIFeatures = require('../utils/apiFeatures');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');

exports.getAllRecipes = factory.getAll(Recipe);

exports.getRecipe = factory.getOne(Recipe, {
  path: 'similarTo',
  select: 'name imageCover',
});

exports.createRecipe = factory.createOne(Recipe);

exports.updateRecipe = factory.updateOne(Recipe);

exports.deleteRecipe = factory.deleteOne(Recipe);
