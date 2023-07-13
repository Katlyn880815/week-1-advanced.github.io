def get_number(index):
# your code here 
    #1. 先定義數列前三數
    #變數1.存進初始值0，數列的第一個數，會放進current_num索引的前兩個數
    pre_pre_num = 0
    #變數2. 存進數列第二個數，初始值3，會放進current_num索引的前一個數
    pre_num = 3
    #變數3. 每次迭代回圈要計算的那個數，初始值為4
    current_num = 4
    #變數4. 紀錄基偶數，每次迭代要切換布林值，初始為true，因為迴圈會從第三個數開始計算
    is_Odd = True

    if(index == 1):
        print(current_num)
        return
    
    for i in range(3, index + 1):
        if(is_Odd):
            current_num = pre_num + 4
        else:
            current_num = pre_pre_num + 3
        pre_pre_num = pre_num
        pre_num = current_num
        is_Odd = not is_Odd

    print(current_num)

    

get_number(1) # print 4
get_number(5) # print 10 
get_number(10) # print 15