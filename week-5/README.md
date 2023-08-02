# # Week5任務 - MySQL
## # Description
使用MySQL完成week-5任務，並且在終端機上執行SQL指令。底下數字列表為題目，code block中是指令，最後為在終端機上下指令截圖畫面。
## # Requirement
* MySQL
### # Task-3 - SQL CRUD
1. 使用INSERT指令新增一筆資料到member資料庫中，username 與 password 必須為 'test'
   ```
   INSERT INTO member (name, username, password) VALUES ('test', 'test', 'test);
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK3%20-%20SQL%20CRUD/1.png)
   
2. 使用SELECT指令取得所有在member資料表中的會員資料
   ```
   SELECT * FROM member;
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK3%20-%20SQL%20CRUD/2.png)
   
3. 使⽤ SELECT 指令取得所有在 member 資料表中的會員資料，並按照 time 欄位，由近到遠排序。
   ```
   SELECT * FROM member
   ORDER BY time DESC;
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK3%20-%20SQL%20CRUD/3.png)
   
4. 使⽤ SELECT 指令取得 member 資料表中第 2 到第 4 筆共三筆資料，並按照 time 欄位，由近到遠排序。
   ```
   SELECT * FROM member
   ORDER BY time DESC
   LIMIT 3 OFFSET 1;
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK3%20-%20SQL%20CRUD/4.png)
   
5. 使⽤ SELECT 指令取得欄位 username 是 test 的會員資料。
   ```
   SELECT * FROM member WHERE username = 'test';
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK3%20-%20SQL%20CRUD/5.png)
   
6. 使⽤ SELECT 指令取得欄位 username 是 test、且欄位 password 也是 test 的資料。
   ```
   SELECT * FROM member WHERE username = 'test' and password = 'test';
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK3%20-%20SQL%20CRUD/6.png)
   
7. 使⽤ UPDATE 指令更新欄位 username 是 test 的會員資料，將資料中的 name 欄位改成 test2。
   ```
   UPDATE member SET name = 'test2' WHERE username = 'test'
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK3%20-%20SQL%20CRUD/7-modified.png)

### # Task-4 SQL Aggregate Functions
1. 取得 member 資料表中，總共有幾筆資料 ( 幾位會員 )
  ```
   SELECT COUNT(id) FROM member;
  ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK4/1.png)
   
2. 取得 member 資料表中，所有會員 follower_count 欄位的總和
   ```
   SELECT SUM(follower_count) FROM member;
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK4/2.png)
   
3. 取得 member 資料表中，所有會員 follower_count 欄位的平均數
   ```
   SELECT AVG(follower_count) FROM member;
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK4/3.png)
   
### # Task-5 SQL JOIN
1. 新建資料庫message，並符合要求
  ```
   CREATE TABLE message(
   id BIGINT PRIMARY KEY AUTO_INCREMENT,
   member_id BIGINT NOT NULL,
   content VARCHAR(255) NOT NULL,
   like_count INT UNSIGNED NOT NULL DEFAULT 0,
   time datetime NOT NULL DEFAULT NOW(),
   FOREIGN KEY(member_id) PREFERENCE member(id)
   );
  ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK5/1.png)
   
2. 使⽤ SELECT 搭配 JOIN 語法，取得所有留⾔，結果須包含留⾔者的姓名
   ```
   SELECT message.content, member.name FROM member INNER JOIN message ON member.id = message.member_id;
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK5/2.png)
   
3. 使⽤ SELECT 搭配 JOIN 語法，取得 member 資料表中欄位 username 是 test 的所有留⾔，資料中須包含留⾔者的姓名。
   ```
   SELECT message.content, member.name FROM member INNER JOIN message ON member.id = message.member_id WHERE member.username = 'test';
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK5/3.png)
   
4. 使⽤ SELECT、SQL Aggregate Functions 搭配 JOIN 語法，取得 member 資料表中欄位 username 是 test 的所有留⾔平均按讚數
   ```
   SELECT AVG(message.like_count), member.username FROM member INNER JOIN message ON member.id = message.member_id Where member.username = 'test' GROUP BY message.member_id;
   ```
   ![image](https://github.com/Katlyn880815/week-1-advanced.github.io/blob/main/week-5/week-5/TASK5/4.png)
