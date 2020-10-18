import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";

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
    RESET_CLUBS(state) {
      state.clubs = []
      state.settings = settingsObj
      localStorage.setItem("bmjs_settings", JSON.stringify(settingsObj));
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
    }
  },
  getters: {
    myPlayers: state => {
      return state.clubs[0].players;
    }
  }
});
