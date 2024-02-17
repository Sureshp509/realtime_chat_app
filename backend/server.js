import express from "express"
const app=express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import DbConnect from "./db/Mongodb_Connection.js";

app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello World!!!");
});

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
const port=process.env.PORT
app.listen(port,()=>{
    DbConnect();
    console.log(`Server running on port:${port}`)
});