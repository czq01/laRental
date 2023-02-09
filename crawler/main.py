from website_class import *
from databases import *
from selenium import webdriver as wb
from functools import reduce
import json
from time import time
from selenium import webdriver as wb

option = wb.ChromeOptions()
option.add_experimental_option("debuggerAddress", "localhost:9222")
# option.add_argument("--headless")
drv = wb.Chrome("./chromedriver.exe",options=option)
# drv = wb.Chrome("./chromedriver.exe")
drv.execute_script("window.open('about:blank')")
drv.switch_to.window(drv.window_handles[0])
headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    "sec-ch-ua": '"Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98";',
    "sec-ch-ua-platform": "Windows",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "zh-CN,zh;q=0.9,en-CN;q=0.8,en;q=0.7",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
}

# CONNECTION_INFO = "mongodb://ec2-54-193-6-57.us-west-1.compute.amazonaws.com:27017"
CONNECTION_INFO = "mongodb+srv://luxunzhe:003773@cluster0.6y9fy.mongodb.net/la_rental?retryWrites=true&w=majority"
COLLECTION = "la_rental"
TABLE = "houses"
conn = MongoConn(COLLECTION, TABLE, CONNECTION_INFO)
crawler_class_list = (Hotpot, Rent,)

while (True):
    start = time()
    index = 1
    result = reduce(
        lambda x,y: {**x, **y},
        map(
            lambda x: x.get_res(),
            map(lambda x: x(headers, drv), crawler_class_list)
        )
    )
    end = time()
    if ((end-start)/3600 < 1.5):
        print("Error: too fast.")
        continue
    conn.main(result)
    with open("./result.json", "w") as f:
        json.dump(result, f)
