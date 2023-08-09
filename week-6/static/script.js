//FORMS
const signupForm = document.getElementById("form__signup");
const loginForm = document.getElementById("form__login");

//FOR SIGNUP
//CHECKING USER'S INPUT IF IS INVALID
signupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkFormValidity(signupForm, ".hint__blank-signup");
});

//FOR LOGIN
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  checkFormValidity(loginForm, ".hint__blank-login");
});

//Checking form validity function
function checkFormValidity(form, hintClassName) {
  const formInputs = form.querySelectorAll("input");

  let isFormValid = true;
  formInputs.forEach((input) => {
    if (input.value === "") {
      isFormValid = false;
    }
  });

  if (isFormValid) {
    form.submit();
  } else {
    document.querySelector(`${hintClassName}`).style.opacity = 1;
  }
}
