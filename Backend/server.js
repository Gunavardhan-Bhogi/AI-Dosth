import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();

const PORT = process.env.PORT ||8080;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 204
}));

app.use(express.json());

app.use("/api", chatRoutes);

app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected");
    } catch(err){
        console.log("Failed ",err);
    }
}
