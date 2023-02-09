from time import sleep, time
from selenium import webdriver as wb
import requests as rqs
from lxml import etree


class SimClick:
    import pyautogui as pag
    import multiprocessing as mp
    from multiprocessing.synchronize import Lock

    def _HoldUp_mouses(self,lock: Lock):
        while (True):
            try:
                x,y = self.pag.locateCenterOnScreen("end.png", confidence=0.98)
                lock.release()
                break
            except: pass
            sleep(0.25)

    def simclick(self) -> bool:
        lock = self.mp.Lock()
        try: x,y = self.pag.locateCenterOnScreen("start.png", confidence=0.9)
        except : return 0
        p = self.mp.Process(target=self._HoldUp_mouses,args=(lock,))
        p.start()
        lock.acquire()
        self.pag.mouseDown(x,y)
        lock.acquire()
        self.pag.mouseUp(x,y)
        p.terminate()
        return 1
