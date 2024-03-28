import express from 'express';
import { getAllUsers } from '../controller/userController';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);