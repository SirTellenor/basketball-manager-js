<template>
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
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
