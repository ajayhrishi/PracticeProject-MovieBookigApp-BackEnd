import Admin from '../model/Admin.js'
import  bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken"; // using jwt will help to give a special code from the backend to perform a spesific task and will only be valid for a while

// ****************************************************
export const getAllAdmin = async(req,res,next)=>{
    
    let admins ;
    try{
        admins  = await Admin.find();

    }catch(err){
        return next(err);
    }

    if(!admins){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }

    return res.status(200).json({admins});

}

// ****************************************************
export const addAdmin = async(req,res,next)=>{
   
    const {name, email, password } = req.body;
    if(
        !name && name ==="" && !email && email==="" && !password && password===""
    ){
        return res.status(422).json({message:"Invalid data"});
    }

    let admin;
    const cryptedPassword = bcrypt.hashSync(password); 
    try{
        admin = new Admin({name,email, password:cryptedPassword});
        admin = await admin.save();
    }catch(err){
        return next(err);
    }

    if(!admin){
        return res.status(500).json({message:'Internal Error'});
    }

    return res.status(201).json({admin});
}
// ****************************************************
export const updateAdmin = async(req,res,next)=>{
    const id = req.params.id;
    const {name, email, password } = req.body;
    if(
        !name && name ==="" && !email && email==="" && !password && password===""
    ){
        return res.status(422).json({message:"Invalid data"});
    }

    let admin;
    const cryptedPassword = bcrypt.hashSync(password); 
    try{
        admin = await Admin.findByIdAndUpdate(id,{
            name, email, password: cryptedPassword
        });
    }catch(err){
        return next(err); 
    }
    if(!admin){
        return res.status(500).json({message:"Internal Error"});
    }

    return res.status(201).json({admin});
}

// ****************************************************

export const deleteAdmin = async(req,res,next) =>{
    let admin;
    try{
        admin = await Admin.findByIdAndDelete(req.params.id)
}catch(err){
    console.log(err);
    return res.status(404).json({message:'unable to delete'});
}
if(!admin){
    return res.status(500).json({message:"Internal Server Error"});
}

return res.status(201).json({message:'deleted'})
}

// ****************************************************

export const loginAdmin = async(req,res,next) =>{
    
    let {email, password } = req.body; 

    if(
       !email && email==="" && !password && password===""
    ){
        return res.status(422).json({message:"Invalid data"});
    }
    let  existingAdmin;
    try{
        existingAdmin = await Admin.findOne({email});
    }catch(err){
        return console.log(err);
    }

    if(!existingAdmin){
        return res.status(404).json({message:'unable to find user with this email'});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:'Incorrect Password'}); 
    }

    const token = jwt.sign({id: existingAdmin._id}, process.env.adminKey, {expiresIn:"7d",});

    return res.status(201).json({message:'loggedIn', id:  existingAdmin.id, token});
}

// ****************************************************
