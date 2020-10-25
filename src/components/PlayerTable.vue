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
      <v-card>
        <v-card-title>{{
          "#" + selectedPlayer.nr + " " + selectedPlayer.name
        }}</v-card-title>
        <v-card-text>
          <p>{{ selectedPlayer.nationality }}</p>
          <v-row>
            <v-col cols="4">
              <v-icon>mdi-sword</v-icon>
              {{ selectedPlayer.offence }}
            </v-col>
            <v-col cols="4">
              <v-icon>mdi-shield</v-icon>
              {{ selectedPlayer.defence }}
            </v-col>
            <v-col cols="4">
              <v-icon>mdi-battery-charging-60</v-icon>
              {{ selectedPlayer.stamina }}
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions v-if="myPlayers">
          <v-btn color="error" @click="dismiss()" block>
            DISMISS
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
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
      this.selectedPlayer = player;
      this.dialog = true;
    },
    dismiss() {
      this.$store.commit('DISMISS_PLAYER', this.selectedPlayer)
      this.dialog = false
      this.selectedPlayer = false      
    }
  }
};
</script>
