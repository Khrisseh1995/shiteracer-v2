import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@khriiseh/common';
import { User } from "../models/User";
import { UserService } from '../services/UserService'
import 'express-async-errors';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post(
    '/api/users/signup',
    // [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20'),
    // ],
    validateRequest,
    async (req: Request, res: Response) => {
        const userService = new UserService();
        const { email, password } = req.body;

        // const existingUser = await User.findOne({ email });

        const existingUser = await userService.findUser(email);

        console.log(existingUser);

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }


        const user = await userService.saveUser(email, password);
        console.log(user);
        // const user = User.build({ email, password });
        // await user.save();
        // //Generate JWT store on session
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        res.cookie('jwt', userJwt, {       
            httpOnly: true
        });

        req.session = {
            jwt: userJwt
        };

        res.status(201).send({
            success: true
        });
    });

export { router as signupRouter }