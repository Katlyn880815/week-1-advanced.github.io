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
    const searchForm = document.querySelector("#form__search-user");
    const formForNewName = document.querySelector("#form__new_name");
    const deleteMsgForm = document.getElementById("form__delete-msg");

    if (deleteMsgForm) {
      //For delete message
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

    /************* WEEK-7 *******************/
    //for search user
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let userInputUsername = document.querySelector("#search-user").value;
      getData("GET", userInputUsername)
        .then((response) => {
          return response.json();
        })
        .then((resData) => {
          console.log(resData);
          render(resData, "searchForm");
        })
        .catch((err) => console.log(err));
    });
    //for update name
    formForNewName.addEventListener("submit", function (e) {
      e.preventDefault();
      let newName = document.querySelector("#new_name").value;
      getData("PATCH", newName)
        .then((response) => {
          return response.json();
        })
        .then((resData) => {
          console.log(resData);
          render(resData, "UpdateForm");
        })
        .then(function () {
          let nameBlock = document.querySelector(".name");
          let curUserComments = document.querySelectorAll(".current__user");
          nameBlock.innerHTML = `${newName}，歡迎登入系統`;
          curUserComments.forEach((cur) => {
            cur.innerHTML = `${newName}:`;
          });
        });
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

//AJAX
function getData(method, userInput) {
  let data = {};
  let url;
  if (method == "GET") {
    data["method"] = "GET";
    data["headers"] = {
      "Content-Type": "application/json",
    };
    url = `http://127.0.0.1:3000/api/member?username=${userInput}`;
  } else if (method == "PATCH") {
    data["method"] = "PATCH";
    data["headers"] = {
      "Content-Type": "application/json",
    };
    data["body"] = JSON.stringify({
      name: userInput,
    });
    url = "http://127.0.0.1:3000/api/member";
  }
  return new Promise((resolve, reject) => {
    fetch(url, data)
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
}

function render(data, form) {
  let resultSearch = document.querySelector(".result__search");
  let resultUpdate = document.querySelector(".result__update");
  if (form === "searchForm") {
    if (data === null) {
      resultSearch.innerHTML = "沒有此會員";
    } else {
      console.log(data.name);
      resultSearch.innerHTML = `${data.name}(${data.username})`;
    }
  } else {
    if (data["ok"]) {
      resultUpdate.innerHTML = "更新成功！";
    } else if (data["error"]) {
      if (data["cause"] === "Name Not Modified") {
        resultUpdate.innerHTML = "更新失敗，新的名稱不能與舊名稱重複";
      } else {
        resultUpdate.innerHTML = "更新失敗，伺服器出錯，請稍等再試。";
      }
    }
  }
}
