<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          outlined
          label="search player ..."
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="selectedPositions"
          :items="items"
          multiple
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <h3 v-if="isLoading">Searching ...</h3>

    <v-container v-if="!isLoading && search != '' && search.length > 2">
      <v-data-table
        :items="players"
        :headers="headers"
        :items-per-page="players.length"
        class="elevation-1"
        hide-default-footer
        no-data-text="No players found :/"
        item-key="id"
        group-by="club"
      />
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      items: [
        "Point Guard",
        "Shooting Guard",
        "Small Forward",
        "Power Forward",
        "Center"
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
      ]
    };
  },
  computed: {
    playersArr() {
      let playersArr = []

      this.$store.state.clubs.forEach((club) => {
        club.players.forEach((player) => {
          player.club = club.name
          playersArr.push(player)
        })
      })

      return playersArr
    }
  },
  watch: {
    search() {
      this.searchPlayers();
    }
  },
  methods: {
    searchPlayers() {
      if (this.search.length > 2) {
        this.isLoading = true;
        this.players = this.playersArr.filter(x =>
          this.like("%" + this.search + "%", x.name)
        );
        this.isLoading = false;
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
    }
  }
};
</script>
