import express from 'express'
import { addAdmin, deleteAdmin, getAllAdmin, loginAdmin, updateAdmin,getAdmin } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/', getAllAdmin);
adminRouter.get('/:id', getAdmin);
adminRouter.post('/signUp', addAdmin);
adminRouter.put('/:id', updateAdmin);
adminRouter.delete('/:id', deleteAdmin);
adminRouter.post('/login', loginAdmin);

export default adminRouter;