import { Controller, Get, Inject, Req, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { User } from './user.entity';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post('test/user')
    async testGetUser(@Req() req: Request): Promise<string> {
        const { username, password } = req.body;        
        this.userService.createUser(username, password);

        return "success";
    }

    @Get("test/customtoken")
    async createCustomToken(): Promise<string> {                        
        return "Test";
    }


}
