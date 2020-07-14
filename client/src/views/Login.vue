<template>
  <div class="login_container">
    <section id="loginsection">
      <section id="sectionheader">
        <img
          class="cursor-pointer shadow-xl dot my-auto mx-auto w-16 h-16 sm:h-8 sm:w-8 md:h-16 md:w-16 lg:h-30 lg:w-30 lg:h-42 xl:w-42"
          src="https://www.freepngimg.com/thumb/google/67060-play-photos-search-google-account-png-file-hd.png"
        />
        <img
          style="background-color: #b4d6e3"
          class="cursor-pointer shadow-xl dot my-auto mx-auto w-16 h-16"
          src="https://seeklogo.com/images/T/twitter-icon-circle-black-logo-35827D553B-seeklogo.com.png"
        />
        <img
          class="shadow-2xl cursor-pointer dot my-auto mx-auto w-16 h-16 sm:h-8 sm:w-8 md:h-16 md:w-16 lg:h-30 lg:w-30 lg:h-42 xl:w-42"
          src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=512&h=512"
        />
      </section>
      <section class="shadow-2xl" id="sectioncontent">
        <div class="error-message-container">
          <div class="error-message" v-if="loginError">
            <i style="color: #D72638; padding-bottom: 1%" class="pl-2 fa fa-times fa-2x"></i>
            <span
              class="pl-3 error-text"
              style="color: #D72638; font-family: 'American Typewriter';"
            >Username or Password Incorrect</span>
          </div>
        </div>
        <section class="forms px-6">
          <div class="user_container">
            <!--                        <div class="username icon_background"></div>-->
            <span class="input-icon ml-3 mt-2">
              <span :class="{icon_error_state: loginError}" class="fa fa-user fa-2x"></span>
            </span>
            <input
              :class="{error_state: loginError}"
              @input="onUsernameInput($event)"
              v-model="username"
              placeholder="Username"
              class="username mb-10"
            />
          </div>
          <div class="user_container">
            <span class="input-icon h-30 w-30 ml-3 mt-2">
              <span :class="{icon_error_state: loginError}" class="fa fa-lock fa-2x"></span>
            </span>
            <input
              :class="{error_state: loginError}"
              type="password"
              @keyup.enter="login"
              @input="onPasswordInput($event) "
              v-model="password"
              placeholder="Password"
              class="password"
            />
          </div>
        </section>
        <section class="buttons">
          <button
            @click="signingUp ? signup() : login()"
            class="login-button cursor-pointer shadow-xl"
          >
            <template v-if="loading">
              <div class="ldio-lv6sf0p6qe">
                <div></div>
              </div>
            </template>
            <template v-else>{{buttonStatus}}</template>
          </button>
          <p @click="signingUp ^= true" class="cursor-pointer signup_text mt-5">{{signupTextStatus}}</p>
        </section>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import axios from "axios";
import { auth } from "../firebase";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import {db} from '../firebase';
const userModule = namespace("user");

@Component
export default class Login extends Vue {
  @userModule.Mutation("setJWT") setJWT!: (jwt: string) => void;
  @userModule.Action('setJwtAction') setJwtAction!: (jwt: string) => void;

  protected username = "";
  protected password = "";
  protected loading = false;
  protected signingUp = false;
  protected loginError = false;

  onUsernameInput(input: string): void {
    console.log(input);
  }

  get buttonStatus() {
    return this.signingUp ? "Sign Up" : "Login";
  }

  get signupTextStatus() {
    return this.signingUp
      ? "Got an account? Sign In!"
      : "Not got an account? Sign up!";
  }

  async signup(): Promise<void> {    
    this.loading = true;
    const loginDetails = {
      email: this.username,
      password: this.password
    };
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/users/signup",
        loginDetails
      );
      this.loginError = false;
      console.log(data);
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  }

  mounted(): void {
    const user = auth.currentUser;

    if (user) {
      console.log(user);
      console.log("Signed in");
    } else {
      console.log("Not signed in");
    }

    console.log(process.env.VUE_APP_CLOUD_MESSAGING_KEY);
  }

  async login(): Promise<void> {
    this.loading = true;
    const loginDetails = {
      email: this.username,
      password: this.password
    };
    console.log(this.username);
    console.log(this.password);
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/users/signin",
        loginDetails
      );
      const { access_token: accessToken } = data;
      this.setJwtAction(accessToken);
      // this.setJWT(accessToken);
      this.loginError = false;
      this.loading = false;
    } catch (e) {
      this.loginError = true;
      console.log(e);
      this.loading = false;
    }
  }

  onPasswordInput(input: string): void {
    console.log(input);
  }
}
</script>

<style>
.error-text {
  margin-left: 1.5%;
  font-size: calc(0.45rem + 0.45vw);
}

.signup_text {
  color: #969696;
}

.username.icon_background {
  width: 15%;
  border: 1px solid transparent;
  border-radius: 50%;
  height: 100%;
  background-color: white;
  z-index: 35;
}

.login_container {
  height: 100%;
  display: grid;
  grid-template-columns: auto minmax(400px, 0.1fr) auto;
  grid-template-rows: auto auto auto;
  grid-template-areas: ". . ." ". login . " ". . .";
}

.login-button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

header {
  grid-area: header;
  background-color: #a8dadc;
}

#loginsection {
  display: grid;
  grid-template-rows: 19% 81%;
  grid-template-areas: "sectionheader" "sectioncontent";
  grid-area: login;
  background-color: #f1faee;
}

.dot {
  background-color: #f1faee;
  border-radius: 50%;
}

#sectionheader {
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  border-radius: 20px 20px 0px 0px;
  grid-area: sectionheader;
  background-color: #a8dadc;
}

#sectioncontent {
  display: grid;
  grid-template-areas: "error-message" "forms" "buttons";
  grid-template-columns: 100%;
  grid-template-rows: 1fr 2fr 2fr;
  grid-area: sectioncontent;
  background-color: #f1faee;
  border-radius: 20px 20px 20px 20px;
}

.error-message-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-content: center;   */
  align-items: center;
  align-self: center;
  align-self: center;

  grid-area: error-message;
  z-index: 35;
  height: 50%;

  background-color: #f1faee;
  /* border: 1px solid #D72638; */
}

.error-message {
  margin-top: 2%;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 65%;
  border: 1.5px solid #d72638;
  background-color: #f1faee;
  /* align-self: center; */
  /* background-color: blue; */
  border-radius: 20px;
}

.forms {
  display: flex;
  flex-direction: column;
  grid-area: forms;
  grid-row: 2 / 3;
  /* grid-column: 2 / 3; */
  justify-content: center;
  background-color: #f1faee;
}

.buttons {
  margin-top: 8%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  grid-area: buttons;
  background-color: #f1faee;
  border-radius: 20px 20px 20px 20px;
}

.username {
  height: 50px;
  border-radius: 30px;
}

.error_state {
  color: #d7283a;
  outline: none;
  box-shadow: 0 0 0pt 2pt #d7283a;
}

.icon_error_state {
  color: #d7283a;
}

.placeholder_error_state {
  color: #d7283a;
}

.password {
  height: 50px;
  border-radius: 30px;
}

.login-button {
  font-size: 2rem;
  height: 50px;
  width: 50%;
  font-family: "American Typewriter";
  border-radius: 30px;
  color: white;
  background-color: #a8dadc;
}

.user_container {
  position: relative;
  display: grid;
  grid-template-areas: "icon form";
  grid-template-rows: 50%;
  grid-template-columns: 5% 99%;
}

.username {
  grid-column: span 3 / 3;
  grid-row: span 1 / 2;
  /* padding-top: 8px; */
  padding-left: 42px;
  line-height: 100%;
  z-index: 10;
  padding-right: 10px;
  font-size: 22px;
  font-family: "American Typewriter";
  /*text-indent: 45px;*/
}

.input-icon {
  background-color: white;
  grid-area: icon;

  z-index: 100;
  color: #a8dadc;
}

.username::placeholder {
  color: #969696;
  opacity: 0.9;
}

.username:focus,
.password:focus {
  outline: none;
  box-shadow: 0 0 0pt 2pt #a8dadc;
}

.password {
  grid-column: span 3 / 3;
  grid-row: span 1 / 2;
  /* vertical-align: middle; */
  /* padding-top: 5px; */
  font-size: 22px;
  line-height: 1;
  font-family: "American Typewriter";
  padding-left: 45px;
}

.password::placeholder {
  color: #969696;
  opacity: 0.9;
}

@keyframes ldio-lv6sf0p6qe {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.ldio-lv6sf0p6qe div {
  margin-top: 12%;
  margin-left: 13%;
  width: 10%;
  height: 20px;
  border: 5px solid #f1faee;
  border-top-color: transparent;
  border-radius: 50%;
}

.ldio-lv6sf0p6qe div {
  animation: ldio-lv6sf0p6qe 1s linear infinite;
}

.ldio-lv6sf0p6qe {
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform-origin: 0 0;
}

.ldio-lv6sf0p6qe div {
  box-sizing: content-box;
}
</style>