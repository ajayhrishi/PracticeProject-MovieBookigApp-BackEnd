import Bookings from "../model/Bookings.js";

export const newBooking = async(req,res,next)=>{
    const {movie, date, seatNumber, user} = req.body;
    let newBooking;

    try{
        newBooking = new Bookings({
            movie, 
            date: new Date(date), 
            seatNumber, 
            user 
        });
        newBooking = await newBooking.save();
    }catch(err){
        return res.status(404).json({message:err})
    }

    if(!newBooking){
        return res.status(500).json({message: "Internal Error"});
    }

    return res.status(201).json({booking: newBooking});
};