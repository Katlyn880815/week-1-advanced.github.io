function getNumber(index) {
  //變數1. 代表currentNumber前兩個數字，初始為零
  let prevPrevNumber = 0;
  //變數2. 代表currentNumber前一個數字，第三個數字為3
  let prevNumber = 3;
  //變數3. 代表目前數字
  let currentNumber = 4;
  //變數4. 判斷迴圈index是否為基數
  let isOdd = true;

  //1. 如果index是1，數字是4，也就是currentNumber
  if (index === 1) {
    console.log(currentNumber);
    return;
  }
  //2. 迴圈從第三個數字開始，因為現在只有算到第三個數字，到i=index結束回圈
  for (let i = 3; i <= index; i++) {
    //如果i是奇數，目前數 = 上一個數字+4
    if (isOdd) {
      currentNumber = prevNumber + 4;
    } else {
      //如果i是偶數，目前數等於上上個數字+3
      currentNumber = prevPrevNumber + 3;
    }

    //上上數字改為上個數字
    prevPrevNumber = prevNumber;
    //上個數字改為目前數字
    prevNumber = currentNumber;
    //切換isOdd布林值
    isOdd = !isOdd;
  }

  console.log(currentNumber);
}

getNumber(1); // print 4
getNumber(5); // print 10
getNumber(10); // print 15
