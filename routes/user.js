import express from "express";
import { 
    getMe, 
    getUserById, 
    loginUser, 
    registerUser,  
} from "../controllers/user.js";
import { protect } from "../middleware/authMid.js";
const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/:user_id', getUserById);
userRouter.get('/me', protect, getMe);

export default userRouter;