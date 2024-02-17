import User from "../models/user.model.js";

export const getUsers=async(req,res)=>{
    try {
        const loggedInUser=req.user._id;
        const Users=await User.find({_id:{$ne:loggedInUser}}).select("-password");
        res.status(200).json(Users);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

