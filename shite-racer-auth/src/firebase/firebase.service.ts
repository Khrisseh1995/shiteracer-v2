import { Injectable } from '@nestjs/common';
import { db } from './Firebase';
@Injectable()
export class FirebaseService {
    constructor() { }

    createUserInRealtimeDb(uuid: string, username: string) {
        const ref = db.ref(`users/${uuid}`);        
        ref.set({
            username: username,
            challenged: {
                isChallenged: false,
                challenger: ''
            }
        });
    }
}
