def get_number(index):
# your code here 
    sequenceList = []
    number = 0

    for i in range(3):
        if(i == 0):
            sequenceList.append(i)
        elif(i == 2):
            sequenceList.insert(1, number)
        else:
            number += 3
            sequenceList.append(number)
            number += 1
    
    
    for i in range(3, index + 1):
        if(i % 2 != 0):
            number = sequenceList[i - 1] + 4
            sequenceList.append(number)
        else:
            number = sequenceList[i - 2] + 3
            sequenceList.append(number)
    print(sequenceList)
    print(sequenceList[index])
    

get_number(1) # print 4
get_number(5) # print 10 
get_number(10) # print 15