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
      //localStorage.setItem("bmjs_players", JSON.stringify(state.players));
    },
    SET_SETTINGS(state, settings) {
      state.settings = settings;
      localStorage.setItem("bmjs_settings", JSON.stringify(state.settings));
    },
    INIT_CLUBS(state, clubs) {
      state.clubs = clubs;
    }
  },
  actions: {
    /* fetchPlayers({ commit }) {
      commit("RESET_PLAYERS");

      let players = JSON.parse(localStorage.getItem("bmjs_players"));
      // let players = []

      if (!players || players.length <= 0) {
        axios
          .get("https://randomuser.me/api/?results=13&gender=male")
          .then(res => {
            let numbers = [];

            res.data.results.forEach((player, key) => {
              const _player = {
                name: player.name.first + " " + player.name.last,
                nr: numbers[key],
                position: positions[key],
                id: player.login.uuid,
                nationality: player.location.country
              };

              players.push(_player);
            });

            commit("SET_PLAYERS", players);
          });
      } else {
        commit("SET_PLAYERS", players);
      }
    }, */
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
      return state.clubs[0].players
    }
  }
});
