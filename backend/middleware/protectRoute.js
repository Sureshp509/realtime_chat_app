import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            res.status(401).json({error:"Unauthorized-no token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({error:"Unauthorized-Invalid token"});
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(400).json({error:"Unauthorized-user not found"})
        }
        req.user=user;
        next();
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

export default protectRoute;