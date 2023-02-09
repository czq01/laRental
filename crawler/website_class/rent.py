from util import *

class Rent:
    url = "https://www.rent.com/california/los-angeles-houses?{}"
    index = 1
    result = {}
    drv: wb.Chrome
    headers: dict
    sleep_time = 1

    def __init__(self, headers: dict, drv:wb.Chrome) -> None:
        self.headers = headers;
        self.drv = drv;

    def driver_main(self, params: dict):
        self.drv.get(self.url.format("&".join(params)));
        lis = self.drv.find_elements("xpath","//div[@data-tid='listing-section']");
        if (not len(lis)):
            fixed = 0;
            if (fixed): lis = self.drv.find_elements("xpath","//div[@data-tid='listing-section']")
            else: return;
        count = 1;
        for element in lis:
            self.result[self.index] = {};
            print(f"\r        sub page:  {count}/{len(lis)}", end='');
            count += 1;
            href = element.find_element("xpath",".//a[@data-tid='property-title']").get_attribute("href")
            href = href if "http" in href else "https://www.rent.com/" + href;
            self.result[self.index]["href"] = href;
            try:
                element.find_element("xpath",".//div[@data-bold='Top Amenities']")
                tags = "Top Amenities"
            except: tags = ""
            self.result[self.index]["tags"] = tags
            self.get_secondary_attr(href);
            self.index+=1;
            sleep(self.sleep_time);

    def get_secondary_attr(self, info_url: str):
        sleep(0.2)
        self.drv.switch_to.window(self.drv.window_handles[1])
        while (True):
            self.drv.get(info_url)
            try:
                head =  self.drv.find_element("xpath","//div[@class='leading-none']")
                price = self.drv.find_element("xpath","//div[contains(@data-tid,'Info_price')]").text;
                break
            except:
                print("?",end='')
                if (True):
                    sleep(60)
                    continue
                else:
                    drv.switch_to.window(drv.window_handles[0])
                    return

        addr = self.drv.find_element("xpath","//*[contains(@data-tid,'Info_citystatezip')]").text
        st, *line2, city, state, zip = [i.strip() for i in addr.split(",")]
        bed = self.drv.find_element("xpath","//*[contains(@data-tid,'Info_bed')]").text
        try: bath = self.drv.find_element("xpath", "//*[contains(@data-tid,'Info_bath')]").text
        except: bath = "-- bath"
        try: sqft = self.drv.find_element("xpath", "//*[contains(@data-tid,'Info_sqFt')]").text
        except: sqft = "-- sqft"
        # try: tags = drv.find_element("xpath","//div[@class='ListingRestrictions']").text
        # except: tags = ""
        try:
            amenities  = [i.text.capitalize() for i in self.drv.find_elements("xpath","//section[@data-tag_section='amenities']//div[@data-tid='amenity-list']/div//li")]
        except: amenities = []
        try:
            highlights = [i.text.capitalize() for i in self.drv.find_elements("xpath","//li[@class='px-10 lg:pr-30']")]
        except: highlights = []
        try:
            pets_policy= [i.text.capitalize() for i in self.drv.find_elements("xpath","//section[@data-tag_section='pet_policy']//*[contains(@data-tid,'PetPolicyList')]/div//dt")]
        except: pets_policy = []
        price = self.drv.find_element("xpath","//div[contains(@data-tid,'Info_price')]").text;
        units = [bed, bath]
        size = sqft
        addrline1 = st
        addrline2 = f"{city}, CA {zip}"
        highlights = highlights+pets_policy
        deep_info = ["units", "size", "price", "addrline1", "addrline2", "amenities", "highlights"]
        for i in deep_info:
            exec(f"self.result[self.index]['{i}']={i}")
        self.drv.switch_to.window(self.drv.window_handles[0])
        return deep_info

    def get_pagenum(self):
        self.drv.get(self.url.format(''))
        page_total = self.drv.find_element("xpath","//span[@data-tid='pagination-total']").text
        page_end = self.drv.find_element("xpath","//span[@data-tid='pagination-end']").text
        # html = etree.HTML(website.content)
        # pagetotal = html.xpath("//span[@data-tid='pagination-total']/text()")[0]
        # pageend = html.xpath("//span[@data-tid='pagination-end']/text()")[0]
        return int(page_total)//int(page_end)+1

    def main(self):
        params = []
        pagenum = self.get_pagenum()
        for page in range(pagenum):
            print(f"\nProcessing page: {page+1}/{pagenum} --> {(page)/pagenum*100:.2f}%")
            if True:
            # try:
                self.driver_main(params+["page={}".format(page+1)])
                sleep(self.sleep_time)

    def get_res(self):
        global index;
        self.index = index;
        self.main()
        index = self.index+1
        return self.result
