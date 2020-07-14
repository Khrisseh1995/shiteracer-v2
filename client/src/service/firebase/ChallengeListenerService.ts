import {db} from '../../firebase';
import store from '../../store/index';

export default class ChallengeListenerService {
    private static instance: ChallengeListenerService;

    public static getInstance(): ChallengeListenerService {
        if (!ChallengeListenerService.instance) {
            ChallengeListenerService.instance = new ChallengeListenerService();
        }
        return ChallengeListenerService.instance;
    }

    public createChallengeListener() {
        const challengedValue = db.ref("users/3082026e-0270-44ae-8666-4ff4fe753631/challenged/isChallenged");  
        challengedValue.on("value", (snapshot => {
            const challengedValue = snapshot.val();
            store.commit('user/setChallenged', challengedValue);            
          }));    
    }

}