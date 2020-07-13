import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const router = express.Router();

router.get('/test_database', async (req, res) => {
    const user = await prisma.user.create({

        data: { username: 'alice@prisma.io', password:  'somePAssword' },

    });

    res.send(user);
})



export { router as testDatabaseRouter };