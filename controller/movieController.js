import Movie from "../model/Movie.js";
import mongoose from "mongoose";

import jwt from "jsonwebtoken"; 
import { decrypt } from "dotenv";




export const getAllMovies = async(req,res,next)=>{
    console.log('this is the getallMovie function');
    let movies;
    try{
        movies = await Movie.find();
    }catch(err){
        console.log(err);
       return res.status(404).jason({message:"No movies found"}); 
    }
    if(!movies){
        console.log('there is no movies inside');
    }
    return res.status(200).json({movies});

}



export const addMovie = async(req,res,next)=>{
    console.log('addmovie function triggered');
    console.log(req.headers.authorization);
    const extractedToken = req.headers.authorization; //bearer token
    if(!extractedToken&&extractedToken===""){
        return res.status(404).jason({message: "Token not found"})
    }
    let adminId;
    try{
        await jwt.verify(extractedToken,process.env.adminKey,(err,decrypted)=>{
            if(err){
                return res.status(400).json({message:`${err.message}`});
            }else{
                adminId = decrypted.id;
            }
            return;
        })
    }catch(err){
        return res.status(404).json({message: "JWT token verification has some issues"});
    }
       
    const {title, description, posterURL,releaseDate, actors, featured} = req.body

    if(!title && title==="" && !description && description==="" && !releaseDate && releaseDate===""&& !posterURL && posterURL==="" && !actors && actors ===''){
        return res.status(422).json({message:"invalid Inputs"});
    }
    let movie; 
    try{
        movie = new Movie({title, description, releaseDate: new Date(`${releaseDate}`), posterURL,actors, admin: adminId})
        movie =  await movie.save();
        }catch(err){
        return res.status(500).json({message:"internal Error"});
    }
    return res.status(201).json({movie});
}

export const updateMovie = async(req,res,next)=>{

console.log('this is the updateMovie function');

    
}
 

export const deleteMovie = async(req,res,next)=>{
    console.log('this is the deleteMovie function');


    
}


export const bookMovie = async(req,res,next)=>{

    console.log('this is the bookMovie function');

    
}

export const cancelMovie = async(req,res,next)=>{

    console.log('this is the cancelMovie function');

    
}