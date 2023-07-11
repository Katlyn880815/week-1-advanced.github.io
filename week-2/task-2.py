def calculate_sum_of_bonus(data):
# I've difinded 3 rules here as below:

# 1. 依據performance: 
#         above average，獎金金額為薪水的10%
#         average: 為薪水的7% 
#         below average: 為薪水的4%

#   2. 依據job role做加成：
#         CEO: 獎金金額 + 獎金金額的8% = 最後總獎金
#         Engineer: 獎金金額 + 獎金金額的5% = 最後總獎金
#         Sales: 獎金金額 + 獎金金額的3% = 最後總獎金

#   3. 如果超過NTD 10000，以10000為最大值

#   Expecting output:
#         John - NTD 3150
#         Bob - NTD 4536
#         Jenny - NTD 2060


    employees = data['employees']
    for data in employees:
        handleNumber = handleStr(data['salary'])
        salary = handleNumber.toNumber()
        calcBonusObj = bonus(data['performance'], salary, data['role'])
        finalBonus = calcBonusObj.CalculateBonus()
        print('The sum of', data['name'],"'s bonus is NTD", finalBonus)


# 計算 Bonus 實體物件
class bonus:
    def __init__(self, performance, salary, role):
        self.performance = performance
        self.salary = salary
        self.role = role
    def CalculateBonus(self):
        #Rule 1 - Based on Performance
        if(self.performance == 'above average'):
            bonus = self.salary * 0.10
        elif(self.performance == 'average'):
            bonus = self.salary * 0.07
        else:
            bonus = self.salary * 0.04

        if(self.role == 'CEO'):
            bonus += bonus * 0.08
        elif(self.role == 'Engineer'):
            bonus += bonus * 0.05
            
        elif(self.role == 'Sales'):
            bonus += bonus * 0.03

        return int(bonus)

        
# 轉換字串、計算匯率實體物件
class handleStr:
    def __init__(self, str):
        self.str = str
    def toNumber(self):
        if isinstance(self.str, str):
            if("USD" in self.str):
                newData = self.str.replace('USD','')
                newData = int(newData) * 30
                return newData
            elif("," in self.str):
                newData = self.str.replace(',', '')
                newData = int(newData)
                return newData
        else:
            return self.str



calculate_sum_of_bonus({
        "employees":[
        {
            "name":"John",
            "salary":"1000USD",
            "performance":"above average",
            "role":"Engineer"
        },
        {
            "name":"Bob",
            "salary":60000,
            "performance":"average",
            "role":"CEO"
        },
        {
            "name":"Jenny",
            "salary":"50,000",
            "performance":"below average",
            "role":"Sales"
        }
    ]
})