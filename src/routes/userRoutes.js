import express from 'express';
import {addUser, deleteUser, getAllUsers, loginUser, updateUser, getAllUserBookings} from '../controller/userController.js'

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/signUp', addUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/login', loginUser);
userRouter.get('/bookings/:id',getAllUserBookings)
export default userRouter;