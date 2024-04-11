import express from 'express'
import { newBooking,getBooking, getAllBooking,deleteBooking } from '../controller/bookingController.js';

const bookingRouter= express.Router();

bookingRouter.post('/', newBooking);
bookingRouter.get('/:id',getBooking);
bookingRouter.get('/', getAllBooking);
bookingRouter.delete('/:id',deleteBooking);
export default bookingRouter;