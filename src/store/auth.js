import { firebase, ui, auth, noCredentialsHelper } from "../utils/firebase";
import emojiStrip from "emoji-strip";

export default {
  namespaced: true,
  state: {
    authInProgress: false,
    user: {}
  },
  getters: {
    username: state => {
      return emojiStrip(state.user.name);
    },
    isAdmin: state => {
      return !!state.user.claims?.admin;
    },
    isSignedIn: state => {
      return !!state.user.jwtToken;
    }
  },
  actions: {
    signIn({ commit }) {
      commit("authInProgress", true);
      const signInSuccessWithAuthResult = ({ user }) => {
        user
          .getIdTokenResult(true)
          .then(it => ({ ...user, claims: it.claims, jwtToken: it.token }))
          .then(it => commit("setUser", it))
          .then(() => location.reload());
      };
      const uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult
        },
        signInFlow: "popup",
        credentialHelper: noCredentialsHelper,
        signInSuccessUrl: window.location.href,
        signInOptions: [
          auth.GithubAuthProvider.PROVIDER_ID,
          auth.TwitterAuthProvider.PROVIDER_ID,
          auth.EmailAuthProvider.PROVIDER_ID
        ]
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    },
    stopAuth({ commit }) {
      commit("authInProgress", false);
    },
    signOut({ commit }) {
      commit("authInProgress", false);
      firebase
        .auth()
        .signOut()
        .then(() => commit("setUser", {}))
        .then(() => location.reload());
    }
  },
  mutations: {
    authInProgress(state, inProgress) {
      state.authInProgress = inProgress;
    },
    setUser(state, user) {
      state.user = {
        name: user.displayName,
        claims: user.claims,
        jwtToken: user.jwtToken,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid
      };
    }
  }
};
