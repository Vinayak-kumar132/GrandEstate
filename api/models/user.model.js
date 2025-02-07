import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    token: {
        type: String,
    },
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQncwmjK9JtQBeWuoCPkioKY3gsv4l7L7_Egw&s"
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
export default User;