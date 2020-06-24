import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/user.entity';
import { FirebaseModule } from './firebase/firebase.module';
import { EasyconfigModule } from  'nestjs-easyconfig';

@Module({
  imports: [
    EasyconfigModule.register({path: './config/.env'}),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      //Set up like this https://gist.github.com/joseluisq/b82716f76ab76eee071f53bdd8356530
      //@ts-ignore
      type: process.env.DB_TYPE,
      host: process.env.HOST,
      //@ts-ignore
      port: process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,    
      entities: [
        User
      ],  
      synchronize: true,
      // autoLoadEntities: true
    }),
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(private connection: Connection) {}
}
