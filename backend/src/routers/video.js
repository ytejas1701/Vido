import express from "express";
import Video from "../models/video.js";

import auth from '../middleware/auth.js';

const videoRouter = new express.Router();

//read Video by id
videoRouter.get(
    '/video/:id',
    auth,
    async({ params }, res)=>{
        try{    
            const video = await Video.findOne({
                _id: params.id,
            });
            if(!Video){throw new Error();}
            res.send(Video);
        }catch(error){
            res.status(400).send(error);
        }
    });


//read all Videos of a User
videoRouter.get(
    '/user/:id/video',
    auth,
    async({ params }, res)=>{
        try{    
            const videos = await Video.find({
                creatorId: params.id,
            });
            res.send(videos);
        }catch(error){
            res.status(400).send(error);
        }
    });

//read all Videos
videoRouter.get(
    '/video',
    auth,
    async({ params }, res)=>{
        try{    
            const videos = await Video.find({ });
            res.send(videos);
        }catch(error){
            res.status(400).send(error);
        }
    });

//create video
videoRouter.post(
    '/video',
    auth,
    async ({ body, user }, res)=>{
        try{
            if(user.role==="creator"){
                const video = new Video(body);
                await video.save();
                res.send(video);
            }else {
                throw new Error("permission denied");
            }
        }catch(error){
            res.status(400).send(error);
        }
    });

//edit Video
videoRouter.patch(
    '/video/:id',
    auth,
    async ({ params, body }, res)=>{
        try{
            const video = await Video.findOneAndUpdate({
                _id:params.id
            },
            body);
            if(!video){throw new Error();}
            res.send(video);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

export default videoRouter;