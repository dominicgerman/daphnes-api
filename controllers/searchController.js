const catchAsync = require('../utils/catchAsync');
const Recipe = require('../models/recipeModel');

exports.recipeSearch = catchAsync(async (req, res) => {
  const search = req.params.q;
  //   console.log(search);
  const results = await Recipe.find({ $text: { $search: search } }).select(
    'name imageCover'
  );

  res.status(200).json({
    data: results,
  });
});
