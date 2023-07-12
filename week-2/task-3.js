/*
Task 3:
Find out whose middle name is unique among all the names, and print it. You can assume every input is a Chinese name with 2 ~ 3 words. If there are only 2 words in a name, the middle name is defined as the second word.
*/

function func(...data) {
  let middleNames = [];
  let result = "";

  //1. 取出所有人的中間名，push到變數middleNames
  data.forEach((item) => {
    middleNames.push(item[1]);
  });

  //2. 檢查中間名是否與其他人重複

  for (let i = 0; i < middleNames.length; i++) {
    let currentName = middleNames[i];
    //計數器用來記錄重複次數，初始為零
    let count = 0;
    for (let j = 0; j < middleNames.length; j++) {
      if (i === j) continue;
      // 有重複 -> count + 1
      //沒有重複 -> 不做任何動作
      if (currentName === middleNames[j]) count++;
    }
    //如果count = 0，代表沒有重複，取出該字存進變數result
    if (count === 0) result += currentName;
  }

  //3. 找出result在middleNames裡面的index，從data裡找到該名字，印出
  middleNames.indexOf(result) >= 0
    ? console.log(data[middleNames.indexOf(result)])
    : console.log("沒有");
}

func("彭大牆", "王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
