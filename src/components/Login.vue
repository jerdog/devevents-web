<template>
  <div>
    <a class="has-text-light is-size-7" @click="signIn()">login</a>
    <div class="modal" v-bind:class="{ 'is-active': authInProgress }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <section id="firebaseui-auth-container"></section>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="stopAuth()"
      ></button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["authInProgress"])
  },
  methods: {
    ...mapActions("auth", ["signIn", "stopAuth"])
  }
};
</script>
