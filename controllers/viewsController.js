exports.getRoot = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudfare.com"
    )
    .render('base', {});
};

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudfare.com"
    )
    .render('login', {
      title: 'Login',
    });
};

exports.getAdmin = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudfare.com"
    )
    .render('admin', {
      title: 'Admin resources',
    });
};

exports.getCreateRecipeForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudfare.com"
    )
    .render('createRecipe', {
      title: 'Create a new recipe',
    });
};
