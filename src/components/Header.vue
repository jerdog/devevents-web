<template>
  <div>
    <div
      role="navigation"
      class="has-background-black"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="columns is-vcentered is-mobile">
          <div class="column">
            <router-link :to="{ path: '/' }">
              <h1
                class="title is-size-4 is-size-6-mobile"
                style="letter-spacing: -2px"
              >
                <span class="has-text-white-ter has-text-nowrap"
                  >dev<span class="has-text-success">.</span
                  ><span class="has-text-weight-normal">events</span>
                </span>
              </h1>
            </router-link>
          </div>
          <div class="column">
            <div class="columns is-mobile is-pulled-right is-vcentered">
              <div class="column">
                <Continents />
              </div>
              <div class="column" v-if="isSignedIn">
                <div class="dropdown is-hoverable is-right">
                  <div class="dropdown-trigger">
                    <figure
                      class="image is-24x24"
                      v-if="user.photoURL"
                      aria-haspopup="true"
                      aria-controls="user-menu"
                    >
                      <img
                        class="is-rounded"
                        alt="Your avatar"
                        :src="user.photoURL"
                      />
                    </figure>
                    <avatar
                      v-else
                      :username="username"
                      :size="24"
                      aria-haspopup="true"
                      aria-controls="user-menu"
                    ></avatar>
                  </div>
                  <div
                    class="dropdown-menu user-menu"
                    id="user-menu"
                    role="menu"
                  >
                    <div class="dropdown-content">
                      <router-link
                        v-if="isAdmin"
                        class="dropdown-item"
                        :to="{ path: '/admin' }"
                        >admin</router-link
                      >
                      <a class="dropdown-item" @click="signOut()">log out</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isSignedIn">
        <Login />
      </div>
    </div>
  </div>
</template>
<script>
import Login from "./Login";
import Continents from "./Continents";
import Avatar from "vue-avatar";
import { mapState, mapGetters, mapActions } from "vuex";
import mixins from "@/mixins/navigation";
export default {
  mixins,
  methods: {
    ...mapActions("auth", ["signOut"])
  },
  created() {},
  computed: {
    ...mapGetters("auth", ["isSignedIn", "isAdmin", "username"]),
    ...mapState("auth", {
      user: state => state.user
    })
  },
  components: { Login, Avatar, Continents }
};
</script>
<style lang="scss" scoped>
div[role="navigation"] {
  padding: 1em;
  .container {
    margin-top: 0;
    margin-bottom: 0;
  }
  section {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
