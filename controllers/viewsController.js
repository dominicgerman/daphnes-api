exports.getRoot = (req, res) => {
  res.status(200).render('base', {});
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.getAdmin = (req, res) => {
  res.status(200).render('admin', {
    title: 'Admin resources',
  });
};

exports.getCreateRecipeForm = (req, res) => {
  res.status(200).render('createRecipe', {
    title: 'Create a new recipe',
  });
};
