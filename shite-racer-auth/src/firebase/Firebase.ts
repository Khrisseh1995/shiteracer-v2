import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceKey.json';


const params = serviceAccount as any;
admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

export {
  db
};

