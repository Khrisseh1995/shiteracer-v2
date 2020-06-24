import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import { UsersController } from './users.controller';
import { UserSubscriber } from './user.subscriber';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FirebaseService],
  providers: [UsersService, UserSubscriber, FirebaseService],
  controllers: [UsersController],
 exports: [UsersService, TypeOrmModule] 
})
export class UsersModule {}
