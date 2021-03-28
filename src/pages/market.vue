<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          outlined
          label="search player ..."
          prepend-inner-icon="mdi-magnify"
          @change="searchPlayers"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="selectedPositions"
          :items="items"
          label="Positions"
          multiple
          outlined
          @change="searchPlayers"
        ></v-select>
      </v-col>
      <v-col>
        <v-switch 
          v-model="onlyContractless"
          label="Only contractless Players"
          @change="searchPlayers"
        />
      </v-col>
    </v-row>

    <h3 v-if="isLoading">Searching ...</h3>

    <v-container v-if="!isLoading && players.length > 0">
      <v-data-table
        :items="players"
        :headers="headers"
        :items-per-page="players.length"
        class="elevation-1"
        hide-default-footer
        no-data-text="No players found :/"
        item-key="id"
        group-by="club"
      >
        <template v-slot:item="{ item }">
          <tr @click="showPlayerInfo(item)" style="cursor:pointer">
            <td>
              {{ item.position }}
            </td>
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.nationality }}
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-dialog
        v-if="dialog"
        :value="dialog"
        @click:outside="dialog = false"
        :max-width="$vuetify.breakpoint.mdAndUp ? '750px' : '100%'"
      >
        <PlayerCard
          v-model="selectedPlayer"
          :showOffer="selectedPlayer.club === 'contractless'"
          @offer="offer()"
        />
      </v-dialog>
    </v-container>
  </v-container>
</template>

<script>
import PlayerCard from "../components/PlayerCard.vue";

export default {
  components: {
    PlayerCard
  },
  data() {
    return {
      isLoading: false,
      items: [
        {
          text: "Point Guard",
          value: "PG"
        },
        {
          text: "Shooting Guard",
          value: "SG"
        },
        {
          text: "Small Forward",
          value: "SF"
        },
        {
          text: "Power Forward",
          value: "PF"
        },
        {
          text: "Center",
          value: "C"
        }
      ],
      selectedPositions: [],
      search: "",
      players: [],
      headers: [
        {
          text: "Position",
          value: "position"
        },
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Nationality",
          value: "nationality"
        }
      ],
      onlyContractless: true,
      dialog: false,
      selectedPlayer: {}
    };
  },
  created() {
    this.searchPlayers()
  },
  computed: {
    playersArr() {
      let playersArr = [];

      this.$store.state.market.contractlessPlayers.forEach(player => {
        player.club = "contractless";
        playersArr.push(player);
      });

      if(!this.onlyContractless) {
        this.$store.state.clubs.forEach(club => {
          club.players.forEach(player => {
            player.club = club.name;
            playersArr.push(player);
          });
        });
      }

      return playersArr;
    }
  },
  methods: {
    searchPlayers() {
      this.isLoading = true;
      this.players = this.playersArr;
      if (this.search.length > 2) {
        this.players = this.players.filter(x =>
          this.like("%" + this.search + "%", x.name)
        );
      }
      if (this.selectedPositions.length > 0) {
        this.filterPlayersByPosition(this.selectedPositions);
      }
      this.isLoading = false;
    },
    filterPlayersByPosition(positions) {
      if (positions && positions.length > 0) {
        this.players = this.players.filter(x => positions.includes(x.position));
      }
    },
    like(search, haystack) {
      if (typeof search !== "string" || haystack === null) {
        return false;
      }

      // Remove special chars
      search = search.replace(
        new RegExp(
          "([\\.\\\\\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-])",
          "g"
        ),
        "\\$1"
      );

      // Replace % and _ with equivalent regex
      search = search.replace(/%/g, ".*").replace(/_/g, ".");

      // Check matches
      return RegExp("^" + search + "$", "gi").test(haystack);
    },
    showPlayerInfo(player) {
      this.dialog = true;
      this.selectedPlayer = player;
    },
    offer() {
      const newPlayer = JSON.parse(JSON.stringify(this.selectedPlayer));
      newPlayer.nr = this.$store.getters.getShirtNr(newPlayer.nr);
      this.$store.commit("ADD_PLAYER", newPlayer);
      this.$store.commit("REMOVE_PLAYER_CONTRACTLESS", this.selectedPlayer);
      this.selectedPlayer = this.dialog = false;
      this.$dialog.notify.info("The player was succesfully added to your club");
      this.searchPlayers();
    }
  }
};
</script>
