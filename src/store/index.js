import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const settingsObj = {
  showWelcomeDialog: true,
  clubname: "",
  isInstalled: false
};

export default new Vuex.Store({
  state: {
    clubs: [],
    settings: {
      showWelcomeDialog: false,
      darkMode: false
    },
    market: {
      contractlessPlayers: []
    }
  },
  mutations: {
    RESET_PLAYERS(state) {
      state.players = [];
    },
    SET_PLAYERS(state, players) {
      state.players = players;
    },
    SET_SETTINGS(state, settings) {
      state.settings = settings;
      localStorage.setItem("bmjs_settings", JSON.stringify(state.settings));
    },
    INIT_CLUBS(state, clubs) {
      state.clubs = clubs;
    },
    INIT_MARKET(state, market) {
      state.market = market
    },
    RESET_CLUBS(state) {
      state.clubs = [];
      state.settings = settingsObj;
      localStorage.setItem("bmjs_settings", JSON.stringify(settingsObj));
    },
    DISMISS_PLAYER(state, player) {
      state.market.contractlessPlayers.push(player)
      state.clubs[0].players = state.clubs[0].players.filter(x => x != player)
      localStorage.setItem("bmjs_clubs", JSON.stringify(state.clubs))
      localStorage.setItem("bmjs_market", JSON.stringify(state.market))
    }
  },
  actions: {
    fetchSettings({ commit }) {
      let settings = JSON.parse(localStorage.getItem("bmjs_settings"));

      if (!settings) {
        settings = settingsObj;
      }
      commit("SET_SETTINGS", settings);

      return settings;
    },
    fetchClubs({ commit }) {
      let clubs = JSON.parse(localStorage.getItem("bmjs_clubs"));

      commit("INIT_CLUBS", clubs);

      return clubs;
    },
    fetchMarket({ commit }) {
      let market = JSON.parse(localStorage.getItem("bmjs_market"));

      commit("INIT_MARKET", market);

      return market;
    }
  },
  getters: {
    myPlayers: state => {
      return state.clubs[0].players;
    }
  }
});
