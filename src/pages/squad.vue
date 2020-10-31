<template>
  <v-container>
    <PlayerTable 
      :items="$store.state.clubs[0].players" 
      :myPlayers="true" 
    />
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
      items: []
    };
  }
};
</script>
