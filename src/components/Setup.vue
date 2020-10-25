<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" large
          >Your club</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" large
          >Other clubs</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step step="3">Summary</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-spacer />
            <v-text-field v-model="clubname" label="Clubname" />
            <v-spacer />
          </v-row>

          <v-icon :disabled="true" large>
            mdi-chevron-left
          </v-icon>
          <v-icon @click="e1 = 2" large>
            mdi-chevron-right
          </v-icon>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-row v-for="(club, key) in clubs" :key="key">
            <v-spacer />
            <v-text-field
              v-model="club.name"
              :label="key + 1 + '. Other Clubname'"
            />
            <v-spacer />
          </v-row>

          <v-icon @click="e1 = 1" large>
            mdi-chevron-left
          </v-icon>
          <v-icon @click="e1 = 3" large>
            mdi-chevron-right
          </v-icon>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-data-table
            hide-default-footer
            :items="clubItems"
            :headers="[
              {
                text: '',
                value: 'name',
                sortable: false
              }
            ]"
          />

          <v-row pa-2>
            <v-col>
              <v-icon @click="e1 = 2" large>
                mdi-chevron-left
              </v-icon>
              <v-icon :disabled="true" large>
                mdi-chevron-right
              </v-icon>
            </v-col>

            <v-spacer />

            <v-col cols="1">
              <v-btn color="primary" @click="setup()" depressed>
                Setup
              </v-btn>
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import axios from "axios";

const shuffle = array => {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  array = array.slice(0, 13);
  return array;
};

export default {
  data() {
    return {
      e1: 1,
      clubname: "",
      clubs: [
        {
          name: ""
        },
        {
          name: ""
        },
        {
          name: ""
        }
      ]
    };
  },
  computed: {
    clubItems() {
      let items = [
        {
          name: this.clubname
        }
      ];

      this.clubs.forEach(club => {
        items.push(club);
      });

      return items;
    }
  },
  methods: {
    setup() {
      let clubs = [...this.clubItems];
      const cnt = clubs.length * 13;
      let numbers = [];
      for (let i = 0; i < 100; i++) numbers.push(i);

      const positions = [
        "C",
        "PG",
        "SG",
        "SF",
        "PF",
        "PF",
        "C",
        "SG",
        "PG",
        "C",
        "SF",
        "PG",
        "SF"
      ];

      axios
        .get("https://randomuser.me/api/?results=" + cnt + "&gender=male")
        .then(res => {
          res = res.data.results;
          let resCnt = 0;
          const stamina = 5;
          for (let i = 0; i < clubs.length; i++) {
            clubs[i].players = [];
            for (let j = 0; j < 13; j++) {
              let playerNumbers = [...numbers];
              playerNumbers = shuffle(playerNumbers);

              const player = res[resCnt];

              const _player = {
                name: player.name.first + " " + player.name.last,
                nr: playerNumbers[j],
                position: positions[j],
                id: player.login.uuid,
                nationality: player.location.country,
                stamina,
                offence: Math.floor(Math.random() * (8 - 3)) + 3,
                defence: Math.floor(Math.random() * (8 - 3)) + 3
              };

              clubs[i].players.push(_player);
              resCnt++;
            }
          }

          const settings = {
            showWelcomeDialog: true,
            clubname: this.clubname,
            isInstalled: true
          };

          const market = {
            contractlessPlayers: []
          }

          localStorage.setItem("bmjs_market", JSON.stringify(market));
          localStorage.setItem("bmjs_clubs", JSON.stringify(clubs));
          this.$store.commit("SET_SETTINGS", settings);
          location.reload();
        });
    }
  }
};
</script>
