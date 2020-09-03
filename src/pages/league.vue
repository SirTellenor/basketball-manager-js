<template>
<v-container>
    <v-data-table
      :headers="headers"
      :items="$store.state.clubs"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      hide-default-footer
    >
      <template v-slot:expanded-item="{ item }">
        <td colspan="12">
          <v-container>
            <v-data-table
              :headers="playerHeaders"
              :items="item.players"
              :items-per-page="item.players.length"
              class="elevation-1"
              hide-default-footer
              item-key="id"
              sort-by="nr"
            ></v-data-table>
          </v-container>
        </td>
      </template>
    </v-data-table>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      expanded: [],
      headers: [{
        text: 'Name',
        value: 'name'
      }],
      playerHeaders: [
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
      ]
    }    
  }
}
</script>