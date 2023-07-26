const termCheckBox = document.querySelector("#accept_terms");
const btnSignin = document.querySelector(".btn__signin");
const hintMesCheckBox = document.querySelector(".hint__mes-check_box");
const form = document.querySelector(".login__form");

btnSignin.addEventListener("click", function (e) {
  e.preventDefault();
  if (termCheckBox.checked) {
    form.submit();
  } else {
    hintMesCheckBox.style.opacity = 1;
  }
});
