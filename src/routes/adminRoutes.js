import express from 'express'
import { addAdmin, deleteAdmin, getAllAdmin, loginAdmin, updateAdmin } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/', getAllAdmin);
adminRouter.post('/signUp', addAdmin);
adminRouter.put('/:id', updateAdmin);
adminRouter.delete('/:id', deleteAdmin);
adminRouter.post('/login', loginAdmin);

export default adminRouter;