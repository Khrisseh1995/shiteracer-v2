import express, {Response, Request, NextFunction} from 'express';
import {json} from 'body-parser';
import {errorHandler, NotFoundError} from "@khriiseh/common";
import 'express-async-errors';
import cookieSession from "cookie-session";
import {currentUserRouter} from './routes/CurrentUser';
import {signupRouter} from "./routes/SignUp";
import {signoutRouter} from "./routes/SignOut";
import {signInRouter} from "./routes/SignIn";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config()


const app = express();
// app.use(cookieParser());
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(signupRouter);
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signInRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {
    app
}