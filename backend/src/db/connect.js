import mongoose from "mongoose";

const connect = async ()=> mongoose.connect('mongodb+srv://anomander:bUqKWjeewmnLOUN8@cluster0.ejtsrzq.mongodb.net/vido?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

let db;
try {
    db = await connect();
    console.log("mongodb connected at server 27017");
}catch(error){
    console.log(error);
}

export default db;