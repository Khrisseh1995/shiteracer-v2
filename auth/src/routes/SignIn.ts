import express, { Request, Response } from "express";
import { body } from 'express-validator';
import { User } from "../models/User";
import { validateRequest, BadRequestError } from '@khriiseh/common';
import { PasswordService } from "../services/PasswordService";
import { UserService } from '../services/UserService';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken';
const router = express.Router();


router.post('/api/users/signin',
    body('email')
        .isEmail()
        .withMessage('Email Must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must apply a password'),
    validateRequest,
    async (req: Request, res: Response) => {
        const userService = new UserService();
        const { email, password } = req.body;


        // const existingUser = await User.findOne({ email });
        const existingUser = await userService.findUser(email);

        if (!existingUser) {
            throw new BadRequestError('Invalid Credentials');
        }

        const passwordsMatch = await PasswordService.compare(existingUser.password, password);

        if (!passwordsMatch) {
            throw new BadRequestError('Invalid Credentials');
        }

        //Generate JWT store on session
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY!);

        



        res.cookie('jwt', userJwt, {
            httpOnly: true
        });

        req.session = {
            jwt: userJwt
        };

        res.status(200).send({
            success: true,
            accessToken: userJwt
        });

    });

export { router as signInRouter }