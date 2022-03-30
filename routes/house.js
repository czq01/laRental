import express from "express";
import { addHouse, getHouseBySearch } from "../controllers/house.js";

const houseRouter = express.Router();

// starts with /house
houseRouter
    .route('/')
    .get(getHouseBySearch)
    .post(addHouse)

export default houseRouter;