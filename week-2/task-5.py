def find_index_of_car(seats, status, number):
# your code here
    #直接尋找相同數的車廂
    available = None
    
    try: 
        available = seats.index(number)
    except ValueError:
        pass

    curNum = float('inf')
    curIndex = 0
    #有：判斷該車廂status，沒有或status != 1 ：進行接下來判斷
    if(available is not None and status[available] == 1):
        print(available)
    else:
        for i in range(len(status)):
            if(status[i] == 1 and seats[i] > number and seats[i] < curNum):
                curNum = seats[i]
                curIndex = i
        
        if(curNum >= 0 and status[curIndex] == 1):
            print(curIndex)
        else:
            print(-1)

find_index_of_car([3, 1, 5, 4, 2], [0, 1, 0, 1, 1], 2) # print 4 
find_index_of_car([1, 0, 5, 1, 3], [0, 1, 0, 1, 1], 4) # print -1 
find_index_of_car([4, 6, 5, 8], [0, 1, 1, 1], 4) # print 2