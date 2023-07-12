function getNumber(index) {
  let arr = [];
  let number = 0;
  //1. 先解出前面三個數字
  for (let i = 0; i <= 2; i++) {
    if (i === 0) arr.push(i);
    if (i === 2) arr.splice(1, 0, number);
    if (i === 1) {
      number += 3;
      arr.push(number);
      number += 1;
    }
  }

  //2. 回圈到小於等於index
  for (let i = 3; i <= index; i++) {
    if (i % 2 !== 0) {
      //基數
      number = arr[i - 1] + 4;
      arr.push(number);
    } else {
      //偶數
      number = arr[i - 2] + 3;

      arr.push(number);
    }
  }
  console.log(arr[index]);
}

getNumber(1); // print 4
getNumber(5); // print 10
getNumber(10); // print 15
