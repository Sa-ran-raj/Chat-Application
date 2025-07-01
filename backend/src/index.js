import express from "express";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js"
import cors from "cors";
import { app,server,io } from "./lib/socket.js";
import path from "path";



app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

dotenv.config();

app.use(cookieParser());

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

const _dirname =path.resolve();

app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname, "../frontend","dist","index.html")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../frontend","dist","index.html"));
    })
}

server.listen(5001,()=>{
    console.log("server running on port 5001");
    connectDB();
});    