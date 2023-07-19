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

//1. 取得景點資料
//AJAX Fetch 連線至目標網址
let url =
  "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json";

let data = [];
fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (result) {
    data.push(result);
    render();
  });

function render() {
  let dataAll = [];
  data.forEach((item) => {
    dataAll.push(item.result.results);
  });

  //上方三個區塊
  const contentBoxAbove = document.querySelector(".content__box-above");
  let count = 0;
  getItems(
    contentBoxAbove,
    "content__item-above",
    "content__pic-top",
    "content__img-top"
  );

  //下方12個區塊
  const contentBoxBelow = document.querySelector(".content__box-below");
  getItems(
    contentBoxBelow,
    "content__item-below",
    "content__pic-bottom",
    "content__img-bottom"
  );

  //先有12個區塊，使用者點擊按鍵繼續載入12個
  const btnLoad = document.querySelector(".btn__load");
  btnLoad.addEventListener("click", function () {
    getItems(
      contentBoxBelow,
      "content__item-below",
      "content__pic-bottom",
      "content__img-bottom"
    );
  });

  //取得圖片網址函式
  function get_first_img(str) {
    let index = str.search(/jpg|JPG/i);
    let imgUrl = str.slice(0, index + 3);
    return imgUrl;
  }

  //取得內部html
  function getItems(
    contentBox,
    contentItemclassName,
    contentPicClassName,
    contentImgClassName
  ) {
    for (let i = 0, j = count + 1; i < 12; i++, j++, count++) {
      let contentItem = document.createElement("div");
      contentItem.className = contentItemclassName;
      //新增元素picBoxBottom
      let contentPic = document.createElement("div");
      contentPic.className = `content__pic ${contentPicClassName}`;
      //新增元素content__txt
      let contentTxt = document.createElement("div");
      contentTxt.className = "content__txt";

      //新增元素img
      let imgEl = document.createElement("img");
      imgEl.className = `content__img ${contentImgClassName}`;
      imgEl.src = get_first_img(dataAll[0][j].file);
      contentPic.appendChild(imgEl);

      //新增元素h3
      let h3 = document.createElement("h3");
      h3.className = "heading__secondary";

      //新增文字節點
      let title = document.createTextNode(dataAll[0][j].stitle);
      h3.appendChild(title);

      contentTxt.appendChild(h3);

      //放進contentItemBelow
      contentItem.appendChild(contentPic);
      contentItem.appendChild(contentTxt);
      contentBox.appendChild(contentItem);
      if (j === dataAll[0].length - 1) btnLoad.style.display = "none";
      if (contentBox === contentBoxAbove && count === 2) break;
    }
  }
}
