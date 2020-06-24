import store from '../index'
// import DataSnapshot from 'firebase.database';
import {db} from '../../firebase';
import { Observable, from} from 'rxjs';
import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import ChallengeListenerService from '@/service/firebase/ChallengeListenerService';

// import Store from '../index';
interface User {
  username: string;
  password: string;
}

@Module({     
  namespaced: true,
  store
})
export default class UserModule extends VuexModule {
  currentJWT = '';
  currentUser = '';
  challenged = false;
  challenger = 'Chris';

  get fetchChallenged() {
    return this.challenged;
  }

  get fetchChallenger() {
    return this.challenger;
  }

  get jwt() {
    return this.currentJWT;
  }

  get jwtData() {
    return this.currentJWT ? JSON.parse(this.jwt.split('.')[1]) : null;
  }

  get jwtSubject() {
    return this.jwtData ? this.jwtData.sub : null
  }

  get jwtIssuer() {
    return this.jwtData ? this.jwtData.iss : null
  }

  @Mutation
  setChallenged(value: boolean): void {
    this.challenged = value;
  }

  @Action({ rawError: true })
  setJwtAction(jwt: string) {
    const listenerService = ChallengeListenerService.getInstance();
    listenerService.createChallengeListener();
    this.context.commit('setJWT', jwt);    
  }

  @Mutation
  setJWT(jwt: string) {
    this.currentJWT = jwt;
  }
}