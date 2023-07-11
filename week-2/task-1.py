def find_and_print(messages):
# I've defined 4 rules as below:

#   1. if the message has "I'm 18 years old".
#   2. if the message has "legal age".
#   3. if the message has "college student".
#   4. if the message has "vote".

# My code here : 
    for (name, mes) in messages.items():
        rules = ["I'm 18 years old", "legal age", "college student", "vote"]
        filterObj = filter(rules, name, mes)
        filterObj.filterMes()
        

class filter:
    def __init__(self, rules, name, mes):
        self.rules = rules
        self.name = name
        self.mes = mes
    def filterMes(self):
        for rule in self.rules:
           # Expecting output -> Bob, Copper, leslie, Vivian
            if rule in self.mes:
                print(self.name)
        

find_and_print({
    "Bob":"My name is Bob. I'm 18 years old.",
    "Mary":"Hello, glad to meet you.",
    "Copper":"I'm a college student. Nice to meet you.",
    "Leslie":"I am of legal age in Taiwan.",
    "Vivian":"I will vote for Donald Trump next week",
    "Jenny":"Good morning."
})

