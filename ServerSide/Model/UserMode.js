const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name:{
        type:String,
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
    UserType:{
        type:String,
        enum:['admin','student','instructor'],

    },
    avatar:{
        type:String,
    }
});
const User = mongoose.model('users',UserSchema);
module.exports=User;