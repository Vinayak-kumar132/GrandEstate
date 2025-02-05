import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err);
})


const app=express();
//by default we are not allowed to send any json to server
app.use(express.json());

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);

//middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});