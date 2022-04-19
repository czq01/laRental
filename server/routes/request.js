import express from "express";
import { createRequest, deleteRequest, getRequestById, handleRequest } from "../controllers/request.js";
import { protect } from "../middleware/authMid.js";

const requestRouter = express.Router();

// starts with /request
requestRouter.route('/').post(protect, createRequest)

requestRouter.route('/:request_id')
  .get(getRequestById)
  .put(protect, handleRequest)
  .delete(protect, deleteRequest)

export default requestRouter;