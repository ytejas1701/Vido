import express from "express";
import Comment from "../models/comment.js";

import auth from '../middleware/auth.js';

const commentRouter = new express.Router();

//read all Comments of a Video
commentRouter.get(
    '/video/:id/comment',
    async({ params }, res)=>{
        try{    
            const comments = await Comment.find({
                videoId: params.id,
            });
            res.send(comments);
        }catch(error){
            res.status(400).send(error);
        }
    });

//create Comment
commentRouter.post(
    '/comment',
    auth,
    async ({ body }, res)=>{
        try{
            const comment = new Comment(body);
            await comment.save();
            res.send(comment);
        }catch(error){
            res.status(400).send(error);
        }
    });

//edit Bit
commentRouter.patch(
    '/comment/:id',
    auth,
    async ({ params, body }, res)=>{
        try{
            const comment = await Comment.findOneAndUpdate({
                _id:params.id
            },
            body);
            if(!comment){throw new Error();}
            res.send(comment);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

export default commentRouter;