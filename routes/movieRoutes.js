import express from 'express'
import {getAllMovies, addMovie, updateMovie, deleteMovie, bookMovie, cancelMovie} from '../controller/movieController.js';

const adminRouter = express.Router();

adminRouter.get('/', getAllMovies);
adminRouter.post('/signUp', addMovie);
adminRouter.put('/:id', updateMovie);
adminRouter.delete('/:id', deleteMovie);
adminRouter.post('/login', bookMovie);
adminRouter.delete('/cancel/:id', cancelMovie);

export default adminRouter;