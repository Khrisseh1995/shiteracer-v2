import { Controller, Request, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-guard.auth';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { PasswordService } from './auth/auth.password.service';
import { FirebaseService } from './firebase/firebase.service';


@Controller()
export class AppController {

  constructor(private authService: AuthService, private firebaseService: FirebaseService) { }


  @Post('auth/testhash')
  async testPasswordservice(@Request() req): Promise<string> {
    const { password } = req.body;
    const hash = PasswordService.toHash(password);
    return hash;
  }

  @Post('auth/login')
  async login(@Request() req) {
    const { username, password } = req.body;
    const user = {
      username,
      password
    }
    console.log(req.body);
    const { access_token } = await this.authService.login(user);
    return {
      access_token,
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/create_database')
  addToDatabase(): string {
    return "Success";
  }
}
