import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from"cookie-parser";
import cors from 'cors';
dotenv.config();

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err);
})


const app=express();
//by default we are not allowed to send any json to server
app.use(express.json());
app.use(cookieParser());
// app.use(
// 	cors({
// 	  origin: [
// 	     // Deployed frontend URL
// 		"http://localhost:3000" // Local development URL
// 	  ],
// 	  credentials: true, // If you are using cookies or sessions
// 	})
//   );

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Allow Vite frontend
      "http://localhost:3000"  // Allow other local instances if needed
    ],
    credentials: true, // Required if you're using cookies or authentication
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/listing",listingRouter);

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