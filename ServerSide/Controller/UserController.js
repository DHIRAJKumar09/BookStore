const User = require('../Model/UserMode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const Register = async(req,res)=>{
    const {name,email,password,UserType,avatar}=req.body;
    try{
      let user = await User.findOne({email:email});
      if(user){
        return res.status(400).json({
            message:"User Already found",
            succcess:false,
        })
      }
    
      const hasedpassword =await bcrypt.hash(password,10);
      user =new User({name,email,password:hasedpassword,UserType:UserType,avatar});
      await user.save();

      res.status(200).json({
        message:"Registration successfully",
        success:true,
        user,
        
      })


    }catch(error){
        console.error("error",error);
    }


}

const Login = async(req,res)=>{
    const{email,password}= req.body;
    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).jons({
                message:"User not foune , First Register ",
                success:false,

            })
        }
   

        const decodePassword = await bcrypt.compare(password,user.password);
        if(!decodePassword){
            res.status(400).jons({
                message:"Please enter correct password "
            });
        }
        const token = jwt.sign({id:user._id,UserType:user.UserType},process.env.JWT_SECRET);
        res.status(200).json(
            {
                message:"Login Successfully",
                user:{name:user.name,email:user.email,UserType:user.UserType},
                token:token,
            }
        )

    }catch(error){
        console.error("error found",error);
    }
}

module.exports= {Register,Login}