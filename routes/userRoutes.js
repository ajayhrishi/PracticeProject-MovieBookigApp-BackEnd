import express from 'express';
import {addUser, getAllUsers} from '../controller/userController.js'

const userRouter = express.Router();

userRouter.get('/allUsers', getAllUsers);
userRouter.post('/signUp', addUser);



export default userRouter;