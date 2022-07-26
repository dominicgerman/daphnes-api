const mongoose = require('mongoose');
const slugify = require('slugify');

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A recipe must have a name'],
      unique: true,
    },
    slug: String,
    description: String,
    menuDescription: String,
    strength: String,
    similarTo: [{ type: mongoose.Schema.ObjectId, ref: 'Recipe' }],
    tags: [String],
    about: String,
    ingredients: [
      {
        name: String,
        measure: String,
      },
    ],
    instructions: {
      type: String,
      required: [true, 'A recipe must have instructions'],
    },
    notes: {
      type: String,
    },
    difficulty: {
      type: String,
      required: [true, 'A recipe must have a difficulty'],
      enum: {
        values: ['easy', 'intermediate', 'advanced'],
        message: 'Difficulty must be easy, intermediate or advanced',
      },
    },
    imageCover: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  // virtual fields are not stored in the database; they're calculated in real-time (like averages)
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// INDEXES
recipeSchema.index({ name: 'text', 'ingredients.name': 'text' });

// DOCUMENT MIDDLEWARE: runs before .save() and create()
recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE: runs before .save() and create()
// recipeSchema.pre('find', function (next) {
//   this.populate({
//     path: 'similarTo',
//     select: 'name imageCover',
//   });

//   next();
// });

// AGGREGATION MIDDLEWARE

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
