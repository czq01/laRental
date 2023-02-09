class MongoConn:
    from datetime import datetime, timedelta
    from dateutil import parser
    import pymongo
    import re
    import geocoder
    __mytable = None
    __now_time = datetime.now()

    def __init__(self, collection, table, conn_info) -> None:
        __myclient = self.pymongo.MongoClient(conn_info)
        __mydb = __myclient[collection]
        self.__mytable = __mydb[table]

    def __price_format(self, price: str) -> int:
        tmp = self.re.sub("[$+,]","",price)
        try:
            if ('k' in price): return int(eval(tmp.replace("k",""))*1000)
            return int(tmp)
        except: return -1

    def __get_now_time(self) -> str:
        # return self.__now_time.strftime('%Y-%m-%dT%H:%M:%S.{:3.0f}Z').format(self.__now_time.microsecond/1000)
        return self.parser.parse(self.__now_time.strftime('%Y-%m-%d %H:%M:%S'))

    def __update_now_time(self) ->None:
        self.__now_time = self.datetime.now()

    def __format_addr(self, addr: str) -> dict:
        g = self.geocoder.mapquest(addr, key='pju0DtJbrW3VQ6606AKTqGZG8Yrn3ux8')
        dict_t = g.geojson["features"][0]
        location = dict_t["geometry"]
        raw = dict_t["properties"]["raw"]
        i = 7
        addr = raw["street"]
        while (i>=4):
            i-=1
            if (f"adminArea{i}" not in raw or raw[f"adminArea{i}"]==''): continue
            addr+= ", "
            addr+=raw[f"adminArea{i}"]
        addr += f' {raw["postalCode"]}, US'
        location["formattedAddr"] = addr
        return location

    def __get_tmp_item(self, items: dict) -> dict:
        tmp_item = {
                "price": self.__price_format(items["price"]),
                "units":items["units"],
                "size": items["size"],
                "amenities": items["amenities"],
                "highlights": items["highlights"],
                "href": items["href"],
                "delete": False,
                "updatedAt": self.__get_now_time(),
            }
        return tmp_item

    def __submit_result(self, result: dict) -> None:
        tmp_item = {}

        for key, items in result.items():
            if "addrline1" not in items: continue
            addr = ", ".join((items["addrline1"], items["addrline2"]))
            addr = self.__format_addr(addr)
            tmp_item = self.__get_tmp_item(items)

            size_t = list(self.__mytable.find(filter={"location.formattedAddr": addr["formattedAddr"]}))
            if (not len(size_t)):
                tmp_item["createdAt"] = tmp_item["updatedAt"];
                tmp_item["location"] = addr
                self.__mytable.insert_one(tmp_item)
            else:
                # 没测
                query = {"location.formattedAddr": addr["formattedAddr"]}
                self.__mytable.update_one(query, {"$set":tmp_item})

    def __soft_delete(self) -> None:
        self.__now_time -= self.timedelta(minutes=30)
        self.__mytable.update_many(filter={"updatedAt": {"$lte": self.__get_now_time()}}, update={"$set": {"deleted": True}}) # todo

    def main(self, items: dict) -> None:
        self.__update_now_time()
        self.__submit_result(items)
        self.__soft_delete()