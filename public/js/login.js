/* eslint-disable */

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      alert('Logged in succesfully!');
      window.setTimeout(() => {
        location.assign('/admin');
      }, 500);
    }
    console.log(res);
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.querySelector('.login__form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('.email__input').value;
  const password = document.querySelector('.password__input').value;
  login(email, password);
});
