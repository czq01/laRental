from util import *

class Hotpot:
    url = "https://hotpads.com/los-angeles-ca/houses-for-rent?{}"
    index = 1
    result = {}
    drv: wb.Chrome
    headers: dict
    sleep_time = 1
    simclick = SimClick()

    def __init__(self, headers: dict, drv:wb.Chrome) -> None:
        self.headers = headers;
        self.drv = drv;

    def driver_main(self, params: dict):
        self.drv.get(self.url.format("&".join(params)))
        lis = self.drv.find_elements("xpath","//li[@class='ListingWrapper']/div/div/div[2]")
        if (not len(lis)):
            fixed = 0
            if (fixed): lis = self.drv.find_elements("xpath","//li[@class='ListingWrapper']/div/div/div[2]")
            else: return
        count = 1
        for element in lis:
            self.result[self.index] = {}
            print(f"\r        sub page:  {count}/{len(lis)}",end='')
            count += 1
            price = element.find_element("xpath","./div[contains(@class, 'Price')]").text
            href = element.find_element("xpath","./a").get_attribute("href")
            href = href if "http" in href else "https://hotpads.com" + href
            self.result[self.index]["price"] = price;
            self.result[self.index]["href"] = href;
            self.get_secondary_attr(href);
            self.index+=1;
            sleep(self.sleep_time)

    def get_secondary_attr(self, info_url: str):
        self.drv.switch_to.window(self.drv.window_handles[1])
        while (True):
            self.drv.get(info_url)
            try:
                addr =  self.drv.find_element("xpath","//section[@class='HdpAddress-title']/h1").text
                break
            except:
                print("")
                if (self.simclick.simclick()):
                    sleep(5)
                    continue
                else:
                    self.drv.switch_to.window(self.drv.window_handles[0])
                    return
        try:
            button=self.drv.find_element("xpath", "//div[@class='LinkToggle']//button")
            title = self.drv.find_element("xpath","//header[@id='Apartment-amenities-header']")
            self.drv.execute_script("arguments[0].scrollIntoView();", title)
            self.drv.execute_script("window.scrollBy(0,-30);")
            button.click()
        except: pass

        house_info = [i.text for i in self.drv.find_elements("xpath","//div[@class='BedsBathsSqft']/div")]
        size = house_info[-1]
        units = house_info[:-1]
        try: tags = self.drv.find_element("xpath","//div[@class='ListingRestrictions']").text
        except: tags = ""
        addrline1,addrline2 =  addr.split('\n')
        amenities = [i.text.capitalize() for i in self.drv.find_elements("xpath","//div[@class='HdpAmenitySection']//li[@class='ListItem']")]
        highlights = [i.text.capitalize() for i in self.drv.find_elements("xpath","//li[contains(@class, 'HighlightsListItems')]")]
        pets_policy= [i.text.capitalize() for i in self.drv.find_elements("xpath","//*[@aria-labelledby='Pet-policy-header']/div/div/div")]
        highlights = highlights + pets_policy
        deep_info = ["units", "size", "tags", "addrline1", "addrline2", "amenities", "highlights"]
        for i in deep_info:
            exec(f"self.result[self.index]['{i}']={i}")
        self.drv.switch_to.window(self.drv.window_handles[0])
        return deep_info

    def get_pagenum(self):
        website = rqs.get(self.url.format(''),headers=self.headers)
        html = etree.HTML(website.content)
        pagetext = html.xpath('//p[contains(@class,"MainPagingText")]/text()')[0]
        return int(pagetext.strip()[:-1].split("/")[-1])

    def main(self):
        params = ["propertyTypes=house","z=15"]
        pagenum = self.get_pagenum()
        for page in range(pagenum):
            print(f"\nProcessing page: {page+1}/{pagenum} --> {(page)/pagenum*100:.2f}%")
            try:
                self.driver_main(params+["page={}".format(page+1)])
                sleep(self.sleep_time)
            except:
                print("test")
                sleep(3600)

    def get_res(self):
        global index;
        self.index = index
        self.main()
        index = self.index+1
        return self.result
