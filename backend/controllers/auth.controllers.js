import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genTokenAndSetCookie from "../utils/genToken.js";

export const signup=async(req,res)=>{
   try{
    const {username,password,cpassword,gender}=req.body;
    if(password!==cpassword){
        return res.status(402).json({"error":"Password doesn't match!!!"})
    }
    const user=await User.findOne({username});
    if(user){
        return res.status(402).json({"error":"Username already exists!!!"});
    }
    const boyProfile=`https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfile=`https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);

    const newUser=new User({
        username:username,
        password:hashPassword,
        gender:gender,
        profilePic:gender==="male" ? boyProfile:girlProfile
    });
    if(newUser){
        genTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        return res.status(201).json({data:newUser,status:"success"});
   
    }else{
        return res.status(400).json({"error":"Invalid User Data"})
    }
    
   }
   catch(error){
    res.status(500).json({error:error.message})
   }
}

export const login=async(req,res)=>{
    try {
        const {username,password}=req.body;

        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password || "");
        if(!user || !isPasswordCorrect){
            res.status(400).json({error:"Invalid Username or Password"})
        }
        
            genTokenAndSetCookie(user._id,res);
            return res.status(201).json({data:user})
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged Out Successfully!!!"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}