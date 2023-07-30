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

//驗證使用者輸入數字
const inputNum = document.getElementById("number");
const btnCalc = document.querySelector(".btn__calc");
const formCalc = document.querySelector(".calc__form");
const hint_entering_correct_num = document.querySelector(
  ".hint_entering_correct_num"
);

btnCalc.addEventListener("click", function (e) {
  e.preventDefault();
  hint_entering_correct_num.style.opacity = 0;
  let number = inputNum.value;
  //檢查使用者是否有輸入值以及該值能夠被轉換為數字
  if (number && Number(number)) {
    //true -> 呼叫submit
    submit();
  } else {
    //false -> 顯示錯誤訊息
    hint_entering_correct_num.style.opacity = 1;
  }
});

function submit() {
  let num = inputNum.value;
  //設定url路徑
  let url = "/square/" + num;
  //使用BOM物件將路徑放進location.href
  window.location.href = url;
  return false;
}
