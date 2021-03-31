<template>
  <router-link
    v-if="isSignedIn"
    :to="{ name: 'new', query: $route.params }"
    class="button has-background-success has-text-white"
  >
    <span>
      <font-awesome-icon icon="plus" title="Add new event" />
      Add event
    </span>
  </router-link>
  <a
    v-else
    class="button has-background-success has-text-white"
    @click="signIn()"
  >
    <span>
      <font-awesome-icon icon="plus" title="Add new event" />
      Add event
    </span>
  </a>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", ["signIn"])
  },
  computed: {
    ...mapGetters("auth", ["isSignedIn"])
  }
};
</script>
<style lang="scss" scoped>
.button:hover {
  text-decoration: none;
}
.button {
  background-color: #42b983 !important;
  position: fixed;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  box-shadow: -6px 6px 22px -12px rgb(153, 116, 116);
  font-size: 18px;
  border: 0;
}
</style>
