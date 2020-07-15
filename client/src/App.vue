<template>
  <div class="full">
    <section class="header shadow-lg">      
      <h1 @click="$router.push({name: 'Race'})" class="banner-text ml-3">ShiteRacer</h1>
        <ChallengeNotifiation class="challenge-notification" />
      <button @click="$router.push({name: 'Login'})" class="header-login-button mr-2 cursor-pointer shadow">Login</button>      
      <button @click="testCurrentUser">Current</button>
      
    </section>
    <div class="vue_container">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from 'axios';
import Component from "vue-class-component";
import ChallengeNotifiation from "./components/ChallengeNotification.vue";
import ChallengeListenerService from './service/firebase/ChallengeListenerService';
@Component({
  components: {
   ChallengeNotifiation
  }
})
export default class extends Vue {
  clickLogin() {
    
      console.log("Changed");
    // });
  }

  async testCurrentUser() {
    const {data} = await axios.get('http://localhost:7000/api/users/currentuser');
    console.log(data);
  }
}

</script>

<style scoped lang="scss">

.banner-text {
  grid-area: banner;
  font-size: 50px;  
  font-family: "American Typewriter";
  color: #f1faee;
}

.challenge-notification {
  grid-area: notification
}

.header-login-button {
  margin-top: 4%;
  justify-self: end;
  align-self: flex-start;
  grid-area: login_button;
  display: flex;
  border: 1px solid #f1faee;
  // border: 2px solid #a8dadc;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background-color: #a8dadc;
  font-size: 1.7rem;
  height: 42px;
  color: #f1faee;
  width: 130px;
  font-family: "American Typewriter";
  border-radius: 30px;
  // box-shadow: 0px 2px 20px -1px rgba(0,0,0,0.3);
  background-color: #a8dadc;
}

.header-login-button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0);
}

.dot {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f1faee;
  border-radius: 50%;
}

.login_button {
  background-color: #f1faee;
  border-radius: 20px;
}
</style>
