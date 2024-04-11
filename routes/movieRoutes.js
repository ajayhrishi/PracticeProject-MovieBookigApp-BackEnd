import express from 'express'
import {getAllMovies, addMovie, updateMovie, deleteMovie, getMovieById} from '../controller/movieController.js';

const adminRouter = express.Router();

adminRouter.get('/', getAllMovies);
adminRouter.get('/:id', getMovieById);
adminRouter.post('/addMovie', addMovie);
adminRouter.put('/:id', updateMovie);
adminRouter.delete('/:id', deleteMovie);


export default adminRouter;


// /movie/addMovie