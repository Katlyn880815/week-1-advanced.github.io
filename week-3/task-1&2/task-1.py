import urllib.request, json, csv, re

#目標網址
url = "https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json"

response = urllib.request.urlopen(url)
data = response.read()

data = json.loads(data)
data = data['result']['results']

#擷取區域字串函式
def get_district(str):
    result = ''
    for i in range(3):
        result += str[i]
    return result
#擷取img的第一圖檔函式
def get_imgUrl(str):
    pattern = re.compile(r"jpg|JPG")
    match = pattern.search(str)
    result = str[0:match.start()+3]
    return result

#找出所有mar資料，然後用set過濾
mrt_all = set()
for i in range(len(data)):
    if(data[i]['MRT'] == None):
        continue
    mrt_all.add(data[i]['MRT'])
#把set轉成list資料
mrt_list = list(mrt_all)
print(mrt_list)


with open("attraction.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    for i in range(len(data)):
        spot = data[i]['stitle']
        district = get_district(data[i]['address'])
        longitude = data[i]['longitude']
        imgUrl = get_imgUrl(data[i]['file'])
        writer.writerow([spot, district, longitude, imgUrl])



with open("mrt.csv", mode="w", newline="") as file:
    writer = csv.writer(file)
    for i in range(len(mrt_list)):
        row = [mrt_list[i]]
        for j in range(len(data)):
            if(data[j]['MRT'] == mrt_list[i]):
                row.append(data[j]['stitle'])
        writer.writerow(row)
