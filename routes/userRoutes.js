import express from 'express';
import {addUser, deleteUser, getAllUsers, loginUser, updateUser} from '../controller/userController.js'

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signUp', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/login', loginUser)
export default userRouter;