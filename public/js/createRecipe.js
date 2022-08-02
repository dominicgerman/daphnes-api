/* eslint-disable */

const addAnotherIngredient = () => {
  const markup = `
    <form class="ingredient--item">
        <label for="ingredient-name">Ingredient name</label>
        <input class="ingredient-name__input" type="text" name="name" placeholder="name" />
        <label for="ingredient-measure">Ingredient measure</label>
        <input class="ingredient-measure__input" type="text" name="measure" placeholder="amount" />
    </form>
    `;
  document
    .querySelector('.ingredient-forms')
    .insertAdjacentHTML('beforeend', markup);
};

const getIngredients = () => {
  const [...ingredientForms] = document.querySelectorAll('.ingredient--item');
  const ingredients = ingredientForms.map((el) => {
    const [...ingOutput] = new FormData(el);
    const ingredientObjects = Object.fromEntries(ingOutput);
    return ingredientObjects;
  });
  return ingredients;
};

const getRecipe = () => {
  const recipeForm = document.querySelector('.create-recipe__form');
  //   output = an array of key/value pair arrays
  const [...output] = new FormData(recipeForm);

  return Object.fromEntries(output);
};

const postRecipe = async (recipeObj) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://daphnes-api.herokuapp.com/api/v1/recipes',
      data: recipeObj,
    });

    if (res.data.status === 'success') {
      alert('Recipe created succesfully!');
      window.setTimeout(() => {
        location.assign('/admin');
      }, 500);
    }
    console.log(res.data);
  } catch (err) {
    console.error(err.response.data.message);
  }
};

const handleFormSubmission = () => {
  const ingredients = getIngredients();
  let recipe = getRecipe();
  recipe.ingredients = ingredients;
  recipe.tags = recipe.tags.split(',').map((str) => str.trimStart());
  recipe.similarTo = recipe.similarTo.split(',').map((str) => str.trimStart());
  recipe.imageCover = recipe.imageCover.slice(1, -1);

  postRecipe(recipe);
};

// const getIngredients = () => {
//   const [...arrNames] = document.querySelectorAll('.ingredient-name__input');
//   const [...arrAmts] = document.querySelectorAll('.ingredient-measure__input');
//   console.log(arrNames, arrAmts);
//   const ingMeasures = arrAmts.map((el) => el.value);
//   const ingNames = arrNames.map((el) => el.value);
//   console.log(ingMeasures, ingNames);
//   const ingredient = {
//     name: document.querySelector('.ingredient-name__input').value,
//     measure: document.querySelector('.ingredient-measure__input').value,
//   };
// };

// document
//   .querySelector('.create-recipe__form')
//   .addEventListener('submit', (e) => {
//     e.preventDefault();
//     const name = document.querySelector('.name__input').value;
//     const difficulty = document.querySelector('.difficulty__input').value;
//     const strength = document.querySelector('.strength__input').value;
//     const tags = document.querySelector('.tags__input').value.split(',');
//     const description = document.querySelector('.description__input').value;
//     const about = document.querySelector('.about__input').value;
//     const instructions = document.querySelector('.instructions__input').value;

//     const similar = document.querySelector('.similar__input').value.split(',');
//     const imgCover = document.querySelector('.img__input').value.slice(1, -1);

//     const recipeData = {
//       //   name,
//       //   difficulty,
//       //   strength,
//       //   tags,
//       //   description,
//       //   about,
//       //   ingredient,
//       //   ingredients,
//       //   instructions,
//       //   similar,
//       //   imgCover,
//     };
//     // console.log(recipeData);
//   });

// const form = document.querySelector('.create-recipe__form');
// console.log(form);

// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const data = new FormData(form);
//   console.log(data);
// });

// const form = document.getElementById('form');
