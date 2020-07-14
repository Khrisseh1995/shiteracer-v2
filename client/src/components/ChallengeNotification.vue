<template>
  <div :style="{marginTop: marginTopVal}" class="notification-container shadow-3xl">
    <div class="top">
        <span class="pl-3 challenge-text top">You have been challenged by</span>
        <button class="mr-3 accept-button shadow-xl">Accept</button>
    </div>
    <div class="bottom">
        <span class="pl-3 challenge-text bottom-text">{{fetchChallenger}}</span>
        <button class="mr-3 deny-button shadow-xl">Deny</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import {namespace} from 'vuex-class';
const userModule = namespace('user');

@Component({})
export default class ChallengeNotification extends Vue {
  @userModule.Getter("fetchChallenged") fetchChallenged!: () => boolean;
  @userModule.Getter('fetchChallenger') fetchChallenger!: () => string;

  get marginTopVal() {
    return !this.fetchChallenged ? '-90px' : '30px';    
  }


}
</script>

<style>

.accept-button {
    /* border: 1px solid #F1FAEE;  */
    font-size: 1.25em;
    font-family: 'American Typewriter';
    width: 15%;
    display: flex;
    flex-direction: column;    
    justify-content: center;
    height: 70%;
    color: #F1FAEE;
    background-color: #A8DADC;
    border-radius: 20px;

}


.deny-button {
    font-size: 1.25em;
    font-family: 'American Typewriter';
    display: flex;
    flex-direction: column;    
    justify-content: center;    
    height: 70%;
    width: 15%;
    color: #F1FAEE;
    background-color: #EF6461;
    border-radius: 20px;
}

.challenge-text {
    font-size: calc(1vh + 0.9em);
    font-family: 'American Typewriter';
    color: #F1FAEE;
}

.top {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* border-radius: 20px 20px 0 0; */
  /* width: 100%; */
  /* background-color: green; */
  grid-area: top;
}

.bottom {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 0 0 20px 20px;
    width: 100%;
  /* background-color: pink; */
  grid-area: bottom;
}

.notification-container {
    /* border-radius: 0 0 20px 20px; */
  /* margin-top: 30px; */
  display: grid;
  grid-template-areas:
    "top"
    "bottom";
    justify-self: center;
  grid-template-rows: 1fr 1fr;  
  height: 80%;
  width: 70%;
  border-radius: 15px;
  background-color: #0D5D56;
}
</style>