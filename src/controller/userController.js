 
import User from '../model/User.js'
import  bcrypt  from "bcryptjs";
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
   
    const {name, email, password } = req.body;
    if(
        !name && name ==="" && !email && email==="" && !password && password===""
    ){
        return res.status(422).json({message:"Invalid data"});
    }

    let user;
    const cryptedPassword = bcrypt.hashSync(password); 
    try{
        user = new User({name,email, password:cryptedPassword});
        user = await user.save();
    }catch(err){
        return next(err);
    }

    if(!user){
        return res.status(500).json({message:'Internal Error'});
    }

    return res.status(201).json({user});
}

export const updateUser = async(req,res,next)=>{
    const id = req.params.id;
    const {name, email, password } = req.body;
    if(
        !name && name ==="" && !email && email==="" && !password && password===""
    ){
        return res.status(422).json({message:"Invalid data"});
    }

    let user;
    const cryptedPassword = bcrypt.hashSync(password); 
    try{
        user = await User.findByIdAndUpdate(id,{
            name, email, password: cryptedPassword
        });
    }catch(err){
        return next(err); 
    }
    if(!user){
        return res.status(500).json({message:"Internal Error"});
    }

    return res.status(201).json({user});
}

export const deleteUser = async(req,res,next) =>{
    let user;
    try{
    user = await User.findByIdAndDelete(req.params.id)
}catch(err){
    console.log(err);
    return res.status(404).json({message:'unable to delete'});
}
if(!user){
    return res.status(500).json({message:"Internal Server Error"});
}

return res.status(201).json({message:'deleted'})
}


export const loginUser = async(req,res,next) =>{
    
    let {email, password } = req.body; 

    if(
       !email && email==="" && !password && password===""
    ){
        return res.status(422).json({message:"Invalid data"});
    }
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message:'unable to find user with this email'});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:'Incorrect Password'}); 
    }

    return res.status(201).json({message:'loggedIn', id: existingUser.id});
}