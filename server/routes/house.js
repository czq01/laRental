import express from "express";

import { 
    addHouse, 
    attachedByPost, 
    getHouseBySearch,
    getHousesByLoc,
    updateHouseLikes,
 } from "../controllers/house.js";
 import { protect } from "../middleware/authMid.js";

const houseRouter = express.Router();

// starts with /house
houseRouter
    .route('/')
    .get(getHouseBySearch)
    .post(addHouse)

houseRouter.get('/loc', getHousesByLoc)

houseRouter.put('/post/:house_id', protect, attachedByPost)
houseRouter.put('/likes/:house_id', protect, updateHouseLikes)

export default houseRouter;