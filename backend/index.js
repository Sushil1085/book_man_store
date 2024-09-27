import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import CORS from "cors";


const app=express();
app.use(express.json());

app.use(CORS());

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("hello");
});

app.use("/books",booksRoute);

mongoose.connect(mongoDBURL)
        .then(()=>{console.log("database connected");
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`); 
        });
    })
        .catch((error)=>
            console.log(error));

        // https://cloud.mongodb.com/v2/66cf36fc9f383b6b2dcf81a3#/clusters/connect?clusterId=Book-Store-MERN