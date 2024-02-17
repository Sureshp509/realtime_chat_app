import mongoose from "mongoose";

const DbConnect=async()=>{
    try{
       await  mongoose.connect("mongodb://localhost:27017/chat-app-db");
       console.log("Connected to database!!!")
    }
    catch(error){
        console.error("error",error)
    }
}

export default DbConnect;