<template>
  <v-container fluid>
    <v-icon>{{ icon }}</v-icon>
    <span
      v-if="showDismiss || selectedPlayer.club === $store.state.clubs[0].name"
    >
      {{ value }}
    </span>
    <v-icon v-else>
      {{ value >= 5 ? "mdi-arrow-up" : "mdi-arrow-down" }}
    </v-icon>
  </v-container>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    showDismiss: {
      type: Boolean,
      required: true
    },
    selectedPlayer: {
      type: Object,
      required: true
    }
  }
};
</script>
