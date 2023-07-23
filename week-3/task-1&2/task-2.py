import urllib.request, json, csv
from bs4 import BeautifulSoup

#負責處理次數、拿到nextlink回傳nextlink
def get_next_link(html):
    next_link = html.find('a', string='‹ 上頁')
    return 'https://www.ptt.cc/' + next_link['href'] if next_link else None


#負責處理request拿取資料
def get_data(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0'
    }

    req = urllib.request.Request(url, headers=headers)
    response = urllib.request.urlopen(req)

    #解析html
    html = BeautifulSoup(response, 'html.parser')
    #取得標題的link
    return html


#負責處理單頁面，並寫進txt檔案
def process_data(html, file):
    titles = html.find_all('div', class_='title')
    for i in titles:
        if i.a:
            link = 'https://www.ptt.cc/' + i.a['href']
            html_article = get_data(link)
            time = html_article.find('span', string="時間")
            time = time.next_sibling.text
            push_tags = html_article.select('span.push-tag')
            count = sum(1 for tag in push_tags if tag.string.strip() == '推')
            file.write(i.a.string + ', ' + str(count) + ', ' + time + '\n')

def main():
    url = 'https://www.ptt.cc/bbs/movie/index.html'
    count = 0

    with open('movie.txt', mode='w', encoding='utf-8') as file:
        while count < 3:
            html = get_data(url)
            if html:
                process_data(html, file)
                url = get_next_link(html)
                count += 1

if __name__ == "__main__":
    main()