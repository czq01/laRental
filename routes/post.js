import express from "express";
import { 
    createPost, 
    getPostBySearch,
    postInterest, 
} from "../controllers/post.js";
import { protect } from "../middleware/authMid.js";
const postRouter = express.Router();

postRouter
    .route('/')
    .post(protect, createPost)
    .get(getPostBySearch);

postRouter.post('/like/:post_id', protect, postInterest);

export default postRouter;