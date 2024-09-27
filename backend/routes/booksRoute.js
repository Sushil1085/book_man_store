import express from "express";
import { Book } from "../models/bookModel.js";

const router=express.Router();



router.post("/",async(request,response)=>{
    try{
        if(!request.body.title ||  //The body property of the request object holds the data sent by the client in the body of the HTTP request. This data is typically in the form of JSON, but it could also be form data, XML, etc., depending on how the client sends it.
            !request.body.author ||
            !request.body.publishYear)
            {
            return response.status(400).send("all fields are required");
        }
        const newBook={
            title:request.body.title,   //By creating a separate newBook object, you make the code more readable and maintainable. It clearly shows that you are gathering the necessary fields (title, author, publishYear) from the request.body and packaging them into an object that represents the new book.
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book=await Book.create(newBook);
        return response.status(201).send(book);
        }
    catch(error){
        console.log(error.massage);
        return response.status(500).send("something went wrong");
    }
});

router.get("/",async(request,response)=>{
    try{
        const books=await Book.find();
        return response.status(200).json({ 
            count:books.length,
            data:books});
       
    } 
    catch(error){
        console.log(error.massage);
        return response.status(500).send("something went wrong");
    }
});

router.get("/:id",async(request,response)=>{ //for gettiong specific id of book
    try{
        const {id}=request.params;
        const book=await Book.findById(id);
        return response.status(200).json(book);
       
    } 
    catch(error){
        console.log(error.massage);
        return response.status(500).send("something went wrong");
    }
});

router.put("/:id",async(request,response)=>{
    try{
        if(!request.body.title ||  
            !request.body.author ||
            !request.body.publishYear)
            {
            return response.status(400).send("all fields are required");
        }
       const {id}=request.params;
       const result =await Book.findByIdAndUpdate(id,request.body);

       if(!result){
        return response.status(404).json({message:"book not found"});
       }
       return response.status(200).send({message:"book updated"});
    } 
    catch(error){
        console.log(error.massage);
        return response.status(500).send("something went wrong");
    }
});

router.delete("/:id",async(request,response)=>{
    try{
        const {id}=request.params;
        const result =await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:"book not found"});
           }
           return response.status(200).send({message:"book deleted"});
    } 
    catch(error){
        console.log(error.massage);
        return response.status(500).send("something went wrong");
    }
});

export default router;