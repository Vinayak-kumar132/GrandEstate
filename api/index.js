// import express from 'express';
const express = require("express");
const mongoose=require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err);
})


const app=express();

app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});