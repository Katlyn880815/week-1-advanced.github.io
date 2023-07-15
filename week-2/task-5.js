/*
Task - 5
Given available seats for each car of a train, status bitmap, and number of incoming passengers, writing a procedure to find out the index of the most fitted car to serve passengers. Print -1 if there is no car which can serve incoming passengers.
給出每個車廂的空位還有點陣圖以及即將到來的乘客數量，寫出處理最符合乘客數量的車廂。印出負一如果沒有車廂可以給即將到來的乘客。
- Available Seats: list/array containing number of available seats for each car. 空位：一個陣列顯示每個車廂的空位
- Status Bitmap: list/array containing only 0 or 1. 1 means the corresponding car can serve passengers for now. 狀態點陣圖：一個陣列包含1或-1，1代表目前車廂可以讓乘客坐乘
- Passenger Number: number of incoming passengers.
We can assume all incoming passengers should be served in the same car. 我們可以假設所有乘客應被安排在同一車廂內

*/

function findIndexOfCar(seats, status, number) {
  //1. 先找出seats有無與number相同的數
  let available = seats.indexOf(number);
  let curIndex = 0;
  let curNum = Infinity;
  //2. 判斷該車廂是否status = 1
  if (available && status[available] === 1) {
    //是：印出該車廂位置
    console.log(available);
    //否：重新檢視status
  } else {
    for (let i = 0; i < status.length; i++) {
      //3. 如果i車廂status = 1，並且seats[i] 小於上一個紀錄的車廂空位數，並且大於number
      if (status[i] === 1 && seats[i] < curNum && seats[i] > number) {
        //4. 把該車廂的座位數替代curNum，並且記錄該車廂index
        curNum = seats[i];
        curIndex = i;
      }
    }
    //5. 如果curNum >= 0 代表有車廂是符合規則，但要再檢查一次該車廂status是否為1
    curNum >= 0 && status[curIndex] === 1
      ? //是：就印出curIndex
        console.log(curIndex)
      : //否：印出-1
        console.log(-1);
  }
}

findIndexOfCar([3, 1, 5, 4, 2], [0, 1, 0, 1, 1], 2); // print 4
findIndexOfCar([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4); // print -1
findIndexOfCar([4, 6, 5, 8], [0, 1, 1, 1], 4); // print 2
