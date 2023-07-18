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
  for (let i = 0; i < 3; i++) {
    //新增元素div(class = content__item-above)
    let contentItemAbove = document.createElement("div");
    contentItemAbove.className = "content__item-above";
    //新增元素div(class = content__pic content__pic-top)
    let contentPicBoxTop = document.createElement("div");
    contentPicBoxTop.className = "content__pic content__pic-top";
    //新增元素div(class = content__txt)
    let contentTxt = document.createElement("div");
    contentTxt.className = "content__txt";

    //圖片區塊content__pic-top
    let imgEl = document.createElement("img");
    imgEl.className = "content__img content__img-top";
    imgEl.src = get_first_img(dataAll[0][i].file);
    contentPicBoxTop.appendChild(imgEl);

    //文字區塊content__txt
    //新增元素h3
    let newH3 = document.createElement("h3");
    newH3.className = "heading__secondary";
    //新增文字節點
    let title = document.createTextNode(dataAll[0][i].stitle);
    //標題文字節點加進h3裡
    newH3.appendChild(title);
    contentTxt.appendChild(newH3);

    //全部放進contentItemAbove
    contentItemAbove.appendChild(contentPicBoxTop);
    contentItemAbove.appendChild(contentTxt);
    contentBoxAbove.appendChild(contentItemAbove);
  }

  //下方12個區塊
  const contentBoxBelow = document.querySelector(".content__box-below");
  for (let i = 3; i < 15; i++) {
    console.log(i);
    let contentItemBelow = document.createElement("div");
    contentItemBelow.className = "content__item-below";
    //新增元素picBoxBottom
    let contentPicBoxBottom = document.createElement("div");
    contentPicBoxBottom.className = "content__pic content__pic-bottom";
    //新增元素content__txt
    let contentTxt = document.createElement("div");
    contentTxt.className = "content__txt";

    //新增元素img
    let imgEl = document.createElement("img");
    imgEl.className = "content__img content__img-bottom";
    imgEl.src = get_first_img(dataAll[0][i].file);
    contentPicBoxBottom.appendChild(imgEl);

    //新增元素h3
    let h3 = document.createElement("h3");
    h3.className = "heading__secondary";

    //新增文字節點
    let title = document.createTextNode(dataAll[0][i].stitle);
    h3.appendChild(title);

    contentTxt.appendChild(h3);

    //放進contentItemBelow
    contentItemBelow.appendChild(contentPicBoxBottom);
    contentItemBelow.appendChild(contentTxt);
    contentBoxBelow.appendChild(contentItemBelow);
  }

  //先有12個區塊，使用者點擊按鍵繼續載入12個
  const btnLoad = document.querySelector(".btn__load");
  let count = 15;
  btnLoad.addEventListener("click", function () {
    for (let i = 0, j = count; i < 12; i++, j++, count++) {
      let contentItemBelow = document.createElement("div");
      contentItemBelow.className = "content__item-below";
      //新增元素picBoxBottom
      let contentPicBoxBottom = document.createElement("div");
      contentPicBoxBottom.className = "content__pic content__pic-bottom";
      //新增元素content__txt
      let contentTxt = document.createElement("div");
      contentTxt.className = "content__txt";

      //新增元素img
      let imgEl = document.createElement("img");
      imgEl.className = "content__img content__img-bottom";
      imgEl.src = get_first_img(dataAll[0][j].file);
      contentPicBoxBottom.appendChild(imgEl);

      //新增元素h3
      let h3 = document.createElement("h3");
      h3.className = "heading__secondary";

      //新增文字節點
      let title = document.createTextNode(dataAll[0][j].stitle);
      h3.appendChild(title);

      contentTxt.appendChild(h3);

      //放進contentItemBelow
      contentItemBelow.appendChild(contentPicBoxBottom);
      contentItemBelow.appendChild(contentTxt);
      contentBoxBelow.appendChild(contentItemBelow);
      if (j === dataAll[0].length - 1) btnLoad.style.display = "none";
    }
  });
}

//取得圖片網址
function get_first_img(str) {
  let index = str.search(/jpg|JPG/i);
  let imgUrl = str.slice(0, index + 3);
  return imgUrl;
}
