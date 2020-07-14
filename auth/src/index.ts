// import mongoose from 'mongoose';
import {app} from "./app";


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    
    app.listen(8080, () => {
        console.log("Listening on 8080");
    });
};

start();

