import express from "express";
import { addHouse, getAllHouses, getHouseByAmenities } from "../controllers/house.js";

const houseRouter = express.Router();

// starts with /house
houseRouter.post('/', addHouse);
houseRouter.get('/', getAllHouses);
houseRouter.get('/amenities/:amenities', getHouseByAmenities);
export default houseRouter;