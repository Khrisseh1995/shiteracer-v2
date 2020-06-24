import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';
import { PasswordService } from 'src/auth/auth.password.service';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    const hash = await PasswordService.toHash(event.entity.password);
    event.entity.password = hash;
    console.log(event.entity);
    console.log(`BEFORE USER INSERTED: `, event.entity);
  }
}