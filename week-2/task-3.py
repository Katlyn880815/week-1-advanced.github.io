def func(*data):
# your code here
    middleNames = []
    result = ""

    # 1. 取出所有人的中間名，append到middleNames裡
    for item in data:
        middleNames.append(item[1])

    # 2. 檢查中間名是否與其他人重複
    for i in range(len(middleNames)):
        currentName = middleNames[i]
        # 計數器用來記錄重複次數，初始為零
        count = 0
        for j in range(len(middleNames)):
            if i == j:
                continue
            # 有重複 -> count + 1
            # 沒有重複 -> 不做任何動作
            if currentName == middleNames[j]:
                count += 1
        # 如果count = 0，代表沒有重複，取出該字存進變數result
        if count == 0:
            result += currentName

    # 3. 找出result在middleNames裡面的index，從data裡找到該名字
    if result in middleNames:
        print(data[middleNames.index(result)])
    else:
        print("沒有")




func("彭大牆", "王明雅", "吳明") # print 彭大牆
func("郭靜雅", "王立強", "林靜宜", "郭立恆", "林花花") #print 林花花
func ("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有