export default {
  namespaced: true,
  state: {
    remindedEvents: []
  },
  actions: {
    reminded({ commit }, eventId) {
      commit("addToReminded", eventId);
    }
  },
  mutations: {
    addToReminded(state, eventId) {
      state.remindedEvents = [...new Set(state.remindedEvents), eventId].filter(
        Boolean
      );
    }
  }
};
