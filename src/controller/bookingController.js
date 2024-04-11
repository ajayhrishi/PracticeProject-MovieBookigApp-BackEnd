import mongoose from "mongoose";
import Bookings from "../model/Bookings.js";
import User from "../model/User.js";
import Movie from '../model/Movie.js'

// ****************************************************
export const newBooking = async(req,res,next)=>{
    const {movie, date, seatNumber, user} = req.body;
    let newBooking;
    console.log('this is the booking function');
    try{
        newBooking = new Bookings({movie, date: new Date(date), seatNumber, user }); // created the bookingsModel object to push later

        const bookingUser = await User.findById(user); // fetched the user details who is going to book the movie
        if(!bookingUser){return res.status(404).json({message:"User not Found"})}
        bookingUser.bookings.push(newBooking); // updated the booking movie in the copy of the fetched user to push to DB later. 
        console.log('Found the user with Id, Proceeding further');

        const bookingMovie = await Movie.findById(movie); // fetched details of the movie that is about to book
        if(!bookingMovie){return res.status(404).json({message:"Movie not Found"})}
        bookingMovie.bookings.push(newBooking); // adding the booked details to the copy of the bookingMovie model. 
        console.log('Found the Movie with Id, Proceeding further');

        const session = await mongoose.startSession();

        session.startTransaction();
      
        await bookingUser.save({session});
        await bookingMovie.save({session});
        newBooking = await newBooking.save({session});

        await session.commitTransaction();

        if(!newBooking){
            return res.status(404).json({message:"Booking Failed"});
        }

        console.log("Booking SuccessFul", newBooking);

    }catch(err){
        console.log(err);
        return res.status(404).json({err});
    }

    if(!newBooking){
        return res.status(500).json({message: "Internal Error"});
    }

    return res.status(201).json({booking: newBooking});
};

// ****************************************************

export const getBooking = async(req,res,next)=>{
    const id = req.params.id;
    let booking;
    try{
        booking = await Bookings.findById(id);
    }catch(err){
        return res.status(404).json({message:"Could not find the Booking"});
    }

    if(!booking){
        return res.status(500).json({message:"Internal Error"});
    }

    return res.status(201).json({booking});
}

// ****************************************************

export const getAllBooking = async(req,res,next)=>{
    let bookings;
    try{
        bookings = await Bookings.find();
    }catch(err){
        return res.status(404).json({message:err});
    }
    if(!bookings){ return res.status(404).json({message:"there is no bookings so far"})}

    return res.status(200).json({bookings});
}

// ****************************************************

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        // Find and delete the booking
        booking = await Bookings.findByIdAndDelete(id);

        // If the booking doesn't exist, return a 404 response
        if (!booking) {
            return res.status(404).json({ message: "Unable to delete - Booking not found" });
        }

        // Start a new session for the transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Populate the user and movie fields of the booking
            await booking.populate("user movie").execPopulate();

            // Remove the booking from the user's bookings array
            booking.user.bookings.pull(booking);
            await booking.user.save({ session });

            // Remove the booking from the movie's bookings array
            booking.movie.bookings.pull(booking);
            await booking.movie.save({ session });

            // Commit the transaction
            await session.commitTransaction();

            // Send a success response
            return res.status(200).json({ message: "Successfully deleted" });
        } catch (err) {
            // Rollback the transaction if an error occurs
            await session.abortTransaction();
            throw err; // Re-throw the error for the outer catch block to handle
        } finally {
            session.endSession(); // End the session regardless of success or failure
        }
    } catch (err) {
        // Handle errors from the outer try-catch block
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};