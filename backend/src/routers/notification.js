import express from "express";
import Notification from "../models/notification.js";

import auth from '../middleware/auth.js';

const notificationRouter = new express.Router();

//read all Notifications of a user
notificationRouter.get(
    '/user/:id/notification',
    auth,
    async({ params }, res)=>{
        try{    
            const notifications = await Notification.find({
                userId: params.id,
            });
            res.send(notifications);
        }catch(error){
            res.status(400).send(error);
        }
    });

//create Notification
notificationRouter.post(
    '/notification',
    auth,
    async ({ body }, res)=>{
        try{
            const notification = new Notification(body);
            await notification.save();
            res.send(notification);
        }catch(error){
            res.status(400).send(error);
        }
    });

//edit Notification
notificationRouter.patch(
    '/notification/:id',
    auth,
    async ({ params, body }, res)=>{
        try{
            const notification = await Notification.findOneAndUpdate({
                _id:params.id
            },
            body);
            if(!notification){throw new Error();}
            res.send(notification);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });

//delete Notification
notificationRouter.delete(
    '/notification/:id',
    async({ params }, res)=>{
        try{
            const notification = await Notification.delete({
                _id: params.id,
            });    
            if(!notification){throw new Error();}
            res.status(200).send(notification);
        }catch(error){
            console.log(error);
            res.status(400).send(error);
        }
    });


export default notificationRouter;