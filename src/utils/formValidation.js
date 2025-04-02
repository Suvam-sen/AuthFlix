const formValidation = (username = "", email, password) => {
  let errors = {};

  if (username) {
    const validUsername = /^[a-zA-Z0-9]+$/;
    if (!validUsername.test(username)) {
      errors.username = "Enter a valid username";
    }
  }

  const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || !validEmail.test(email)) {
    errors.email = "Enter a valid email address";
  }

  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password || !validPassword.test(password)) {
    errors.password = "Enter a valid password";
  }

  return errors;
};

export default formValidation;
