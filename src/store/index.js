import Vue from "vue";
import Vuex from "vuex";
import lazyAxios from "../utils/axios";

import auth from "./auth";
import creation from "./creation";
import fetching from "./fetching";
import admin from "./admin";
import router from "../router";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "devevents",
      paths: ["auth", "sorting", "admin"]
    })
  ],
  modules: {
    creation,
    fetching,
    auth,
    admin
  },
  state: {
    continents: {},
    allTopics: {},
    allTopicsOrdered: [],
    countries: [],
    isOnline: false,
    sorting: "startDate",
    countryName: undefined,
    more: false,
    noEvents: false,
    doneFetching: false,
    events: [],
    topics: [],
    stats: {
      total: 0,
      shown: 0
    },
    pages: 0,
    cursor: "",
    country: ""
  },
  actions: {
    bootstrap({ commit }) {
      const continents = {
        EU: "EU",
        AM: "America",
        AS: "Asia",
        AF: "Africa",
        OC: "Oceania",
        ON: "Online"
      };
      const allTopics = {
        cpp: {
          name: "C/C++"
        },
        mobile: {
          name: "Mobile"
        },
        iot: {
          name: "Hardware/IoT"
        },
        web: {
          name: "Web/Frontend"
        },
        data: {
          name: "Data/AI/ML"
        },
        devops: {
          name: "DevOps/Cloud"
        },
        dotnet: {
          name: ".NET"
        },
        elixir: {
          name: "Elixir"
        },
        react: {
          name: "React"
        },
        fullstack: {
          name: "Architecture/Full-stack"
        },
        golang: {
          name: "Golang"
        },
        java: {
          name: "Java"
        },
        javascript: {
          name: "JavaScript"
        },
        leadership: {
          name: "Leadership/Management"
        },
        game: {
          name: "Game development"
        },
        architecture: {
          name: "Software architecture"
        },
        agile: {
          name: "Agile"
        },
        php: {
          name: "PHP"
        },
        oss: {
          name: "Open source"
        },
        product: {
          name: "Product/UX"
        },
        python: {
          name: "Python"
        },
        ruby: {
          name: "Ruby and Rails"
        },
        security: {
          name: "Security"
        },
        qa: {
          name: "Testing/QA"
        },
        blockchain: {
          name: "Blockchain"
        },
        recruit: {
          name: "Career/Hiring/HR"
        },
        vr: {
          name: "AR/VR/XR"
        },
        fp: {
          name: "Functional programming"
        },
        fintech: {
          name: "Fintech"
        },
        rust: {
          name: "Rust"
        }
      };

      const allTopicsOrdered = Object.keys(allTopics)
        .map(code => ({ code: code, name: allTopics[code].name }))
        .sort((it, that) => it.name.localeCompare(that.name));

      commit("bootstrap", { continents, allTopics, allTopicsOrdered });
    },
    async moreEvents({ commit, state }) {
      commit("fetchingInProgress");
      const axios = await lazyAxios();
      return axios
        .get(`/events/search`, {
          params: {
            ...{ start: state.cursor },
            ...state.route.params,
            ...state.route.query,
            sorting: state.sorting
          }
        })
        .then(response =>
          commit("eventsFetched", { data: response.data, merge: true })
        )
        .catch(() => commit("fetchingFailed"));
    },
    async fetchEvents({ commit, state }) {
      commit("fetchingInProgress");
      const axios = await lazyAxios();
      return axios
        .get(`/events/search`, {
          params: {
            ...state.route.params,
            ...state.route.query,
            sorting: state.sorting
          }
        })
        .then(response => commit("eventsFetched", { data: response.data }))
        .catch(() => commit("fetchingFailed"));
    },
    async deleteEvent({ commit }, eventId) {
      const axios = await lazyAxios();
      return axios
        .post(`/admin/${eventId}/delete`)
        .then(() => commit("excludeOne", eventId));
    },
    async updateEvent(undefined, { id, ...event }) {
      if (!id) {
        throw new Error("No ID provided.");
      }
      const goToNewEvent = () => {
        router.push({
          name: "confs",
          params: {
            continent: event.continentCode,
            country: event.countryCode,
            topic: event.topics[0]
          }
        });
      };
      const axios = await lazyAxios();
      return axios
        .post(`/admin/${id}/update`, event)
        .then(() => goToNewEvent());
    }
  },
  mutations: {
    bootstrap(state, { continents, allTopics, allTopicsOrdered }) {
      state.continents = continents;
      state.allTopics = allTopics;
      state.allTopicsOrdered = allTopicsOrdered;
    },
    fetchingInProgress(state) {
      state.doneFetching = false;
    },
    fetchingFailed(state) {
      state.doneFetching = true;
    },
    excludeOne(state, eventId) {
      state.events = state.events.filter(({ id }) => id !== eventId);
    },
    eventsFetched(state, { data, merge = false }) {
      const [events, meta] = data;
      state.events = merge ? state.events.concat(events) : events;
      state.topics = meta.topics;
      state.countries = meta.countries.filter(({ code }) => code !== "ON");
      state.free = meta.free;
      state.doneFetching = true;
      state.countryName = meta.countryName;
      state.isOnline = state.route.params.continent === "ON";
      state.stats.total = meta.total;
      state.stats.shown = state.events.length;
      state.noEvents = state.events.length == 0;
      state.more = meta.more;
      state.cursor = meta.cursor;
    }
  }
});
