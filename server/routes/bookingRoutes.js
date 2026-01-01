import express from 'express';
import { createBooking, getOccupiedSeats, getUserBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId',getOccupiedSeats)
bookingRouter.get('/user-bookings',getUserBookings);

export default bookingRouter;