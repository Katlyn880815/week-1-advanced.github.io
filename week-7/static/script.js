//FORMS
const signupForm = document.getElementById("form__signup");
const loginForm = document.getElementById("form__login");

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("form__signup");
  const loginForm = document.getElementById("form__login");
  //判斷為哪個網頁
  if (signupForm && loginForm) {
    //FOR SIGNUP
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      checkFormValidity(signupForm, ".hint__blank-signup");
    });
    //FOR LOGIN
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      checkFormValidity(loginForm, ".hint__blank-login");
    });
  } else {
    const deleteMsgForm = document.getElementById("form__delete-msg");
    console.log(deleteMsgForm);
    deleteMsgForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log(this);
      let result = confirm("您確定要刪除本留言嗎？");
      if (result) {
        deleteMsgForm.submit();
      } else {
        return;
      }
    });
  }
});

//Checking form validity function
//CHECKING USER'S INPUT IF IS INVALID
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
