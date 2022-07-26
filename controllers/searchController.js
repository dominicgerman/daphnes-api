// const catchAsync = require('../utils/catchAsync');
// const Recipe = require('../models/recipeModel');

// exports.recipeSearch = catchAsync(async (req, res) => {
//   const search = req.body;
//   console.log(search);
//   const doc = await Recipe.find({ $text: { $search: 'boozy' } });

//   res.status(200).json({
//     data: doc,
//   });
// });
