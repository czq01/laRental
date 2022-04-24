import express from "express";
import { 
    createPost, 
    getPostBySearch,
    getPostsByIds,
} from "../controllers/post.js";
import { protect } from "../middleware/authMid.js";
const postRouter = express.Router();

postRouter
    .route('/')
    .post(protect, createPost)
    .get(getPostBySearch);

postRouter.get('/ids', getPostsByIds)

export default postRouter;