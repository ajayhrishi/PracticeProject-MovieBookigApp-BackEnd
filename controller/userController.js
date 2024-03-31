
import User from "../model/User.js";

export const getAllUsers = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();

    }catch(err){
        return next(err);
    }

    if(!users){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }

    return res.status(200).json({users});

}


export const addUser = async(req,res,next)=>{
    console.log('add user Function triggered');
    const {name, email, password } = req.body;
    if(
        !name && name ==="" && !email && email==="" && !password && password===""
    ){
        return res.status(422).json({message:"Invalid data"});
    }

    let user;

    try{
        user = new User({name,email, password});
        user = await user.save();
    }catch(err){
        return next(err);
    }

    if(!user){
        return res.status(500).json({message:'Internal Error'});
    }

    return res.status(201).json({user});
}