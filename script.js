//手機版選單
//1. 點選漢堡圖案 -> 出現側邊選單欄
const menu = document.querySelector(".navigation__icon-open");
const list = document.querySelector(".navigation__list");
const clostBtn = document.querySelector(".navigation__icon-close");

menu.addEventListener("click", function () {
  list.style.display = "block";
});

clostBtn.addEventListener("click", function () {
  list.style.display = "none";
});
