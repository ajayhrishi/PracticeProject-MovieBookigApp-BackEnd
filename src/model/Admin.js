import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        unique: true,
    },
    email:{type:String,
        required:true,
        unique:true,},
    password:{type:String,
        required:true,
        minlength:6,
    },
    movies:[{
        type:mongoose.Types.ObjectId,
        ref: "Movie",
    }]


});

export default mongoose.model("Admin", adminSchema);