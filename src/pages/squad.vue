<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="$store.getters.myPlayers"
      :items-per-page="$store.getters.myPlayers.length"
      class="elevation-1"
      hide-default-footer
      no-data-text="No players found :/ Please check your internet connection"
      item-key="id"
      sort-by="nr"
    >
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      headers: [
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
    };
  }
};
</script>
