import express from 'express'
import { newBooking } from '../controller/bookingController.js';

const bookingRouter= express.Router();

bookingRouter.post('/', newBooking);


export default bookingRouter;