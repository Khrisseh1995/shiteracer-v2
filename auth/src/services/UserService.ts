import { PrismaClient } from '@prisma/client'
import { PasswordService } from "../services/PasswordService";
const prisma = new PrismaClient()

export class UserService {
    async saveUser(email: string, password: string) {
        const hashedPassword = await PasswordService.toHash(password);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        })
        
        return user;
    }

    async findUser(email: string) {
        const existingUser = await prisma.user.findOne({
            where: {
                email,
            },
        });

        return existingUser;
    }
}
