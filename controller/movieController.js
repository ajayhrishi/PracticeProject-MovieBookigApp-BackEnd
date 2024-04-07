import Movie from "../model/Movie.js";
import mongoose from "mongoose";

import jwt from "jsonwebtoken"; 




export const getAllMovies = async(req,res,next)=>{
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
    const extractedToken = req.headers.autharization;
    if(!extractedToken&&extractedToken===""){
        return res.status(404).jason({message: "Token not found"})
    }
    console.log(extractedToken);
    
}


export const updateMovie = async(req,res,next)=>{



    
}


export const deleteMovie = async(req,res,next)=>{



    
}


export const bookMovie = async(req,res,next)=>{



    
}

export const cancelMovie = async(req,res,next)=>{



    
}