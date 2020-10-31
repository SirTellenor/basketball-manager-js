<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="items.length"
      class="elevation-1"
      hide-default-footer
      no-data-text="No players found :/"
      item-key="id"
      sort-by="nr"
    >
      <template v-slot:item="{ item }">
        <tr @click="showPlayerInfo(item)" style="cursor:pointer">
          <td>
            {{ item.nr }}
          </td>
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
      max-width="750px"
    >
      <PlayerCard 
        v-model="selectedPlayer"
        @dismiss="dismiss"
        :showDismiss="!!myPlayers"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import PlayerCard from "../components/PlayerCard";

export default {
  components: {
    PlayerCard
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    myPlayers: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const headers = [
      {
        text: "Number",
        value: "nr"
      },
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
    ];
    return {
      headers,
      dialog: false,
      selectedPlayer: false
    };
  },
  methods: {
    showPlayerInfo(player) {
      this.selectedPlayer = player
      this.dialog = true
    },
    dismiss() {      
      this.$store.commit('DISMISS_PLAYER', this.selectedPlayer)
      this.dialog = false
      this.selectedPlayer = false      
    }
  }
};
</script>
