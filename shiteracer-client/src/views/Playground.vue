<template>
  <div>
    <!-- <h1>Test</h1> -->
    <!-- <challenge-notification /> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ChallengeNotification from "../components/ChallengeNotification.vue";
import Component from "vue-class-component";
@Component({
  components: {
    ChallengeNotification
  }
})
export default class Playground extends Vue {}
</script>

<style>
</style>