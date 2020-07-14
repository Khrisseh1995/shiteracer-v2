<template>
  <div class="race-container">
    <div class="race-card shadow-xl">
      <div class="race-header pt-4">
        <h1 class="pl-6 race-header-text">WPM: 95</h1>
        <h1 class="pr-6 race-header-text">2:00</h1>
      </div>
      <div class="bars px-10 py-5">
        <div  class="bar1 bar-background"></div>
        <div :style="{width: bar1Percentage}" class="bar1">
          <span class="pr-2" style="font-size: 1.2vw">💩</span>
        </div>
        <div class="bar2 bar-background"></div>
        <div class="bar2">
          <span class="pr-2" style="font-size: 1.2vw">💩</span>
        </div>
        <div class="bar3 bar-background"></div>
        <div class="bar3">
          <span class="pr-2" style="font-size: 1.2vw">💩</span>
        </div>
        <div class="bar4 bar-background"></div>
        <div class="bar4">
          <span class="pr-2" style="font-size: 1.2vw; opacity: 1;">💩</span>
        </div>
      </div>
      <div class="text-area px-5">
        <h1 class="race-words">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nulla mi, consectetur eu nibh vitae, eleifend porttitor felis. Maecenas vulputate in ipsum vitae volutpat. Phasellus vitae sollicitudin ex. Maecenas nonLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nulla mi, consectetur eu nibh vitae, eleifend porttitor felis. Maecenas vulputate in ipsum vitae volutpat. Phasellus vitae sollicitudin ex. Maecenas
          elit. Nullam nulla mi, consectetur eu nibh vitae, eleifend porttitor felis. Maecenas vulputate in ipsum vitae volutpat. Phasellus vitae sollicitudin ex. Maecenas
          elit. Nullam nulla mi, consectetur eu nibh vitae,
        </h1>
      </div>
      <div class="input">
        <input placeholder="Type Shit Here" class="race-input" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { firebase } from "../firebase";

@Component({})
export default class RaceComponent extends Vue {
  protected bar1Width = 0;
  protected bar2Width = 0;
  protected bar3Width = 0;
  protected bar4Width = 0;

  writeUserData(userId: number, name: string, email: string, imageUrl: string) {
    console.log("Run");
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        username: name,
        email: email,
        profilePicture: imageUrl
      });
  }

  get bar1Percentage() {
    return `${this.bar1Width}%`;
  }

  writeRaceData(
    raceId: number,
    bar1: number,
    bar2: number,
    bar3: number,
    bar4: number
  ) {
    firebase
      .database()
      .ref("races/" + raceId)
      .set({
        bar1,
        bar2,
        bar3,
        bar4
      });
  }

  listenToRaceValueChange() {
    const raceValue = firebase.database().ref("races/" + 512312 + "/bar1");
    raceValue.on("value", (snapshot) => {
      this.bar1Width = snapshot.val();
      console.log(snapshot.val());
      console.log(snapshot);
    });
  }

  listenToValueChange() {
    const starCountRef = firebase.database().ref("users/1/email");
    starCountRef.on("value", (snapshot) => {
      
      console.log(snapshot.val);
      console.log("Value Changed");
    });
  }

  mounted(): void {
    this.listenToValueChange();
    this.listenToRaceValueChange();
    this.writeRaceData(512312, 20, 50, 15, 70);
    // this.writeUserData(
    //   1,
    //   "Chris",
    //   "chrisclark876@gmail.com",
    //   "http://image.com"
    // );
  }
}
</script>

<style>
.race-header-text {
  font-size: calc(1.2rem + 1.2vw);
  font-family: Rockwell;
  color: #f1faee;
}

.text-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f1faee;
  grid-area: text-area;
}

.race-words {
  color: #969696;
  font-size: calc(0.5rem + 0.5vw);;
  font-family: Rockwell;
}

.race-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
  background-color: #a8dadc;
  grid-area: race-header;
}

.race-input:focus {
  outline: none;
  box-shadow: 0 0 0pt 2.5pt #a8dadc;
}

.race-input {
  font-family: Rockwell;
  padding-left: 1.7%;
  font-size: calc(0.5rem + 0.5vw);
  border-radius: 0 0 20px 20px;
  width: 100%;
  height: 100%;
}

.bar1 {
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  border-radius: 20px;  
  background-color: #a8dadc;
  grid-area: bar1;
  z-index: 1;
}

.bars > .bar-background {
  width: 100%;
  background-color: white;
}

.bar2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  border-radius: 20px;
  width: 70%;
  background-color: #f7aef8;
  /* opacity: 0.8; */
  grid-area: bar2;
}

.bar3 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  background-color: #fcb07e;
  border-radius: 20px;
  width: 30%;
  grid-area: bar3;
}

.bar4 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  background-color: #ea3546;
  border-radius: 20px;
  /* opacity: 0.5; */
  width: 15%;
  /* background-color: magenta; */
  grid-area: bar4;
}

.bars {
  display: grid;
  grid-template-areas:
    "bar1"
    "bar2"
    "bar3"
    "bar4";

  grid-template-rows: 1fr 1fr 1fr 1fr;
  row-gap: 0.6rem;

  background-color: #f1faee;
  grid-area: bars;
}

.input {
  grid-area: input;
}

.race-container {
  height: 100%;
  display: grid;
  grid-template-areas:
    ". . ."
    ". race-card ."
    ". . .";
  grid-template-rows: 1fr 5fr 2fr;
  grid-template-columns: 1fr 4fr 1fr;
}

.race-card {
  border-radius: 20px;
  grid-template-areas:
    "race-header"
    "bars"
    "text-area"
    "input";
  display: grid;
  grid-template-rows: 1fr 2fr 2fr 0.75fr;
  grid-template-columns: 1fr;
  /* background-color: #f1faee; */
  grid-area: race-card;
}
</style>  