import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";  
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoute.js";



dotenv.config();            
import cors from "cors";        
  

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;          

app.use(cors());
app.use(bodyParser.json());         

mongoose.connect(MONGO_URL)
        .then(() => {     
            console.log("Connected to MongoDB");
            app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });      


app.use("/api", userRoutes);    