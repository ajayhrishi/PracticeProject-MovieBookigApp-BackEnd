import express from 'express' // will try using require() later in the code to see the difference. 
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());   
mongoose.connect(`mongodb+srv://ajayhrishi:${process.env.db}@moviebooking.kjzzkly.mongodb.net/`).then(()=>console.log('DataBaseConnected'))
.then(()=>{app.listen(5000,()=>{console.log("intiated the work on backend Movie booking app");})}).catch((err)=>{console.log(err)});






// in package.json file the line //"start": "nodemon --experimental-modules --es-module-specifier-resolution=node app.js",  is only enabling the es6 to the project  
// project passowrd uoKyNhj0u5MRWsYp