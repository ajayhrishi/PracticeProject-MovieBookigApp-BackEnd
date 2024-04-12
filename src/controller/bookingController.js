import mongoose from "mongoose";
import Bookings from "../model/Bookings.js";
import User from "../model/User.js";
import Movie from '../model/Movie.js'

// ****************************************************
export const newBooking = async(req,res,next)=>{
    const {movie, date, seatNumber, user} = req.body;
    let newBooking;
    // console.log('this is the booking function');
    try{
        newBooking = new Bookings({movie, date: new Date(date), seatNumber, user }); // created the bookingsModel object to push later

        const bookingUser = await User.findById(user); // fetched the user details who is going to book the movie
        if(!bookingUser){return res.status(404).json({message:"User not Found"})}
        bookingUser.bookings.push(newBooking); // updated the booking movie in the copy of the fetched user to push to DB later. 
        // console.log('Found the user with Id, Proceeding further');

        const bookingMovie = await Movie.findById(movie); // fetched details of the movie that is about to book
        if(!bookingMovie){return res.status(404).json({message:"Movie not Found"})}
        bookingMovie.bookings.push(newBooking); // adding the booked details to the copy of the bookingMovie model. 
        // console.log('Found the Movie with Id, Proceeding further');

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
        booking = await Bookings.findByIdAndDelete(id).populate("movie user");
        console.log('populated booking Model with the user and movie',booking);
        console.log('Moving On');
        const session = await mongoose.startSession();

        session.startTransaction();
        console.log('trasaction started');
        console.log('testing if the userbookings is actually populated',booking.user.bookings);
        await booking.user.bookings.pull(booking);
        console.log('done with user booking pull');
        await booking.movie.bookings.pull(booking);
        console.log('done with the movie booking pull');
        await booking.movie.save({session});
        await booking.user.save({session});

        session.commitTransaction();
        console.log('completed the transaction without breaking');
    }catch(err){ 
        console.log('this is an error from try catch', err);
    }

    if(!booking){
        return res.status(500).json({message:"Internal Error"});
    }

    return res.status(201).json({message:"Delete Complete"});
};