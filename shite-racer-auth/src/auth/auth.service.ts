
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {Request} from 'express';
import { PasswordService } from './auth.password.service';
import { v4 as uuidv4 } from 'uuid';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    constructor(
        // @Inject(REQUEST) private request: Request,
        private usersService: UsersService,
        private jwtService: JwtService,
        private firebaseService: FirebaseService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        console.log(user);
        const { password, ...result } = user;
        const valid = await PasswordService.compare(password, pass);
        // console.log(valid);
        if (user && valid) {            
            return result;
        }
        return null;
    }

    async login(user: any) {        
        const {username} = user;
        const fetchedUser = await this.usersService.findOneByUsername(username);                
        const {uuid} = fetchedUser;
        const payload = { username, user_id: uuid};
        
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}