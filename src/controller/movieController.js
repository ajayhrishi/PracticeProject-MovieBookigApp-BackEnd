import Movie from "../model/Movie.js";
import Admin from "../model/Admin.js";
import mongoose from "mongoose";

import jwt from "jsonwebtoken"; 
import { decrypt } from "dotenv";



// *************************************************************************************************
export const getAllMovies = async(req,res,next)=>{
    console.log('this is the getallMovie function');
    let movies;
    try{
        movies = await Movie.find();
    }catch(err){
        console.log(err);
       return res.status(404).json({message:"No movies found"}); 
    }
    if(!movies){
        console.log('there is no movies inside');
    }
    return res.status(200).json({movies});

}
// *************************************************************************************************
export const getMovieById = async(req,res,next)=>{

    console.log('this is the getMovieById function');
    let id = req.params.id;
    console.log(id);
    let movie;
    try{
        movie = await Movie.findById(id);
    }catch(err){
        console.log(err);
       return res.status(404).json({message:"No movies found"}); 
    }
    if(!movie){
        console.log('there is no movie with this id inside');
    }
    return res.status(200).json({movie});

    
}

 



// *************************************************************************************************

export const addMovie = async(req,res,next)=>{
    console.log('addmovie function triggered');

    let extractedToken = req.headers.authorization.split(" ")[1]; //bearer token
    if(!extractedToken&&extractedToken.trim()===""){
        return res.status(404).jason({message: "Token not found"})
    }

    
    let adminId=0;
    try {
        const decrypted = jwt.verify(extractedToken, process.env.adminKey);
        console.log(decrypted);
        adminId = decrypted.id;
    } catch (err) {
        return res.status(400).json({ message: `${err}` });
    }
       
    const {title, description, posterURL,releaseDate, actors, featured} = req.body

    if(!title && title==="" && !description && description==="" && !releaseDate && releaseDate===""&& !posterURL && posterURL==="" && !actors && actors ===''){
        return res.status(422).json({message:"invalid Inputs"});
    }
    let movie; 
    try{
        movie = new Movie({title, description, releaseDate: new Date(`${releaseDate}`), posterURL,actors, admin: adminId, actors})
        movie =  await movie.save();
        }catch(err){
        return res.status(500).json({message:"internal Error"});
    }
    return res.status(201).json({movie});
}


// *************************************************************************************************

export const updateMovie = async(req,res,next)=>{

console.log('this is the updateMovie function');

    
}
 
// *************************************************************************************************
export const deleteMovie = async(req,res,next)=>{
    console.log('this is the deleteMovie function');


    
}
// *************************************************************************************************

