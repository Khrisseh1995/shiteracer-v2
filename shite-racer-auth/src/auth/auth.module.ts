import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {LocalStrategy} from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import {FirebaseService} from '../firebase/firebase.service';
@Module({
  imports: [
    FirebaseService,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, FirebaseService],
  exports: [AuthService],
})
export class AuthModule {}