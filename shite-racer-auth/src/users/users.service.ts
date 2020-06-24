
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import {User} from './user.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepostiory: Repository<User>,
    private firebaseService: FirebaseService,
    private connection: Connection
  ) {

  }

  findAll(): Promise<User[]> {
    return this.usersRepostiory.find();
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepostiory.findOne({username});
  }

  findOne(id: string): Promise<User> {
    return this.usersRepostiory.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepostiory.delete(id);
  }

  createUser(username: string, password: string) {    
    const uuid = uuidv4();

    const user = {
      username, 
      password,
      uuid
    };
    
    this.firebaseService.createUserInRealtimeDb(uuid, username);
    this.usersRepostiory.save(user);
  }
  
}