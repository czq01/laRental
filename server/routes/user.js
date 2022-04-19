import express from "express";
import { 
    getMe,
    getUserById, 
    loginUser, 
    registerUser,
    updateUserById,  
} from "../controllers/user.js";
import { protect } from "../middleware/authMid.js";
const userRouter = express.Router();

userRouter.route('/')
        .post(registerUser)

userRouter.post('/login', loginUser);
userRouter.get('/me', protect, getMe)

userRouter.route('/:user_id')
        .get(getUserById)
        .put(protect, updateUserById)

export default userRouter;