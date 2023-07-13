/*
Task 2:
Using a loop to complete functions below to calculate the sum of bonus of all employees in TWD and print it.

1. Bonus should depend on salary, performance and role fields. Define your own rules and calculate a bonus for each employee based on it.
2. The sum of bonus of all employees cannot exceed 10000 TWD based on your rules and example data.
3. You can assume the USD to TWD Exchange Rate is 30.
4. Salary is default to TWD if there is no specific mark.

*/

function calculateSumOfBonus(data) {
  // I've defined 3 rules here as below:
  /*
  1. 依據performance: 
        above average，獎金金額為薪水的10%
        average: 為薪水的7% 
        below average: 為薪水的4%

  2. 依據job role做加成：
        CEO: 獎金金額 + 獎金金額的8% = 最後總獎金
        Engineer: 獎金金額 + 獎金金額的5% = 最後總獎金
        Sales: 獎金金額 + 獎金金額的3% = 最後總獎金

  3. 如果超過NTD 10000，以10000為最大值

  Expecting output:
        John - NTD 3150
        Bob - NTD 4536
        Jenny - NTD 2060

  */

  //My Code here :
  let employeesList = data.employees;
  let sumOfBonus = 0;

  for (let i = 0; i < employeesList.length; i++) {
    let salary = toNumber(employeesList[i].salary);
    let name = employeesList[i].name;
    let bonus = calculateBonus(
      employeesList[i].performance,
      salary,
      employeesList[i].role
    );

    sumOfBonus += bonus;
  }
  console.log(sumOfBonus);
}

//計算Bonus
function calculateBonus(performance, salary, role) {
  let bonus = 0;

  //Rule 1 - Based on Performance
  if (performance === "above average") {
    //10% of salary
    bonus = salary * 0.1;
  } else if (performance === "average") {
    bonus = salary * 0.07;
  } else {
    bonus = salary * 0.04;
  }

  //Rule 2 - Based on Job position
  if (role === "CEO") {
    bonus += bonus * 0.08;
  } else if (role === "Engineer") {
    bonus += bonus * 0.05;
  } else if (role === "Sales") {
    bonus += bonus * 0.03;
  }

  //Rule 3 - Cannot exceed NTD 10000
  if (bonus > 10000) bonus = 10000;
  return bonus;
}

//處理匯率以及字串轉數字型態
function toNumber(str) {
  //如果字串裡面是有USD，移除掉USD並轉成數字，再*30
  if (typeof str === "string") {
    if (str.includes("USD")) {
      let newData = str.replace("USD", "");
      return Number(newData) * 30;
    } else if (str.includes(",")) {
      //如果字串裡面有USD或者逗號，把他們移除
      let newData = str.replace(",", "");
      return Number(newData);
    }
  } else {
    return str;
  }
}

calculateSumOfBonus({
  employees: [
    {
      name: "John",
      salary: "1000USD",
      performance: "above average",
      role: "Engineer",
    },
    {
      name: "Bob",
      salary: 60000,
      performance: "average",
      role: "CEO",
    },
    {
      name: "Jenny",
      salary: "50,000",
      performance: "below average",
      role: "Sales",
    },
  ],
});
