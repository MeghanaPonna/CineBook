import express from 'express';
import { createBooking, getOccupiedSeats, getUserBookings, getAllBookings } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);
bookingRouter.get('/seats/:showId',getOccupiedSeats)
bookingRouter.get('/user-bookings',getUserBookings);
bookingRouter.get("/all-bookings", getAllBookings);

export default bookingRouter;