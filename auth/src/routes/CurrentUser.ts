import express, {Request, Response} from "express";
import {currentUser} from "@khriiseh/common";

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
    console.log(req.session!.jwt);
    res.send({currentUser: req.currentUser || null});
});

export {router as currentUserRouter}