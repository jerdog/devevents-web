import lazyAxios from "../utils/axios";
import router from "../router";

export default {
  namespaced: true,
  state: {
    validationErrors: [],
    globalError: undefined,
    topics: [],
    countries: [],
    types: []
  },
  actions: {
    async createNew({ commit }, event) {
      const axios = await lazyAxios();
      const goToNewEvent = continent => {
        router.push({
          name: "confs",
          params: {
            continent,
            country: event.countryCode != "ON" ? event.countryCode : undefined,
            topic: event.topic
          }
        });
      };
      return axios
        .post(`/events/new`, event)
        .then(response => {
          goToNewEvent(response.data.continentCode);
        })
        .catch(err => commit("creationFailed", err.response));
    },
    async fetchInfo({ commit }) {
      const axios = await lazyAxios();
      return axios
        .get(`/events/new/prepare`)
        .then(response => commit("infoFetched", response.data));
    }
  },
  mutations: {
    creationFailed(state, { data, status }) {
      state.validationErrors = {};
      state.globalError = undefined;
      if (status === 422) {
        state.validationErrors = data;
      }
      if (status === 409) {
        state.globalError = data;
      }
    },
    infoFetched(state, data) {
      state.validationErrors = {};
      state.globalError = undefined;
      state.topics = data.topics;
      state.types = data.types;
      state.countries = data.countries;
    }
  }
};
