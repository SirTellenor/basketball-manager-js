<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      hide-default-footer
    >
      <template v-slot:expanded-item="{ item }">
        <td colspan="12">
          <v-container>
            <PlayerTable :items="item.players" />
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import PlayerTable from "../components/PlayerTable";

export default {
  components: {
    PlayerTable
  },
  data() {
    return {
      expanded: [],
      headers: [
        {
          text: "Name",
          value: "name"
        }
      ]
    };
  },
  computed: {
    items() {
      const items = [];
      this.$store.state.clubs.forEach(club => {
        const _club = {
          ...club
        };
        _club.players.forEach(player => {
          player.club = club.name;
        });
        items.push(_club);
      });
      return items;
    }
  }
};
</script>
