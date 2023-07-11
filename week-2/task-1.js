/*
Task 1:
We have example messages from 6 persons in JSON format. There are at least 3 persons
who are older than 17. Using a loop to find out those who are most probably older than 17
years old based on example messages. Print their names in the console.
*/

function findAndPrint(messages) {
  //I've defined 4 rules as below:

  /*
  1. if the message has "I'm 18 years old".
  2. if the message has "legal age".
  3. if the message has "college student".
  4. if the message has "vote".
   */

  //My code here:

  const arr = Object.entries(messages);

  //Expecting Output： Bob, Copper, Leslie, Vivian
  for (let i = 0; i < arr.length; i++) {
    let [name, mes] = arr[i];
    filterStr(mes, name);
  }
}

function filterStr(str, name) {
  let rules = ["I'm 18 years old", "legal age", "college student", "vote"];
  for (let i = 0; i < rules.length; i++) {
    if (str.includes(rules[i])) console.log(name);
  }
}

findAndPrint({
  Bob: "My name is Bob. I'm 18 years old.",
  Mary: "Hello, glad to meet you.",
  Copper: "I'm a college student. Nice to meet you.",
  Leslie: "I am of legal age in Taiwan.",
  Vivian: "I will vote for Donald Trump next week",
  Jenny: "Good morning.",
});
