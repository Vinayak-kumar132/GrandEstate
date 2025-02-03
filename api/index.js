import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRouter from './routes/user.route.js'

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err);
})


const app=express();

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});

app.use("/api/user",userRouter);