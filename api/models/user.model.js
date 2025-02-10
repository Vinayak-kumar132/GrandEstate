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
        default:"https://static.vecteezy.com/system/resources/thumbnails/020/911/732/small_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png",
    },

},{timestamps:true});

const User=mongoose.model('User',userSchema);
export default User;