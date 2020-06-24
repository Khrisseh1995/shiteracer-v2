import Vue from 'vue';
import Vuex from 'vuex';
import { VuexModule, Mutation, Action, Module } from 'vuex-module-decorators'
import { get } from 'request'

Vue.use(Vuex);

@Module({ namespaced: true, name: 'firebase' })
export default class FirebaseModule extends VuexModule {

    tokenIsSentToServer = false;
    customFirebaseToken = '';

    get tokenIsSent() {
        return this.tokenIsSentToServer;
    }

    @Mutation
    setToServer(sentToServer: boolean) {
        this.tokenIsSentToServer = sentToServer
    }

    @Action
    async fetchIsSentToServer(payload: boolean) {        
        this.context.commit('setToServer', payload)
    }
}