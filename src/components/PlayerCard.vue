<template>
  <v-card>
    <v-card-title>{{
      (showDismiss ? "#" + selectedPlayer.nr + " " : "") +
        selectedPlayer.name +
        " | " +
        selectedPlayer.position
    }}</v-card-title>
    <v-card-text>
      <p>{{ selectedPlayer.nationality }}</p>
      <v-row>
        <v-col cols="4">
          <PlayerData
            :value="selectedPlayer.offence"
            icon="mdi-sword"
            :selectedPlayer="selectedPlayer"
            :showDismiss="showDismiss"
          />
        </v-col>
        <v-col cols="4">
          <PlayerData
            :value="selectedPlayer.defence"
            icon="mdi-shield"
            :selectedPlayer="selectedPlayer"
            :showDismiss="showDismiss"
          />
        </v-col>
        <v-col cols="4">
          <PlayerData
            :value="selectedPlayer.stamina"
            icon="mdi-battery-charging-60"
            :selectedPlayer="selectedPlayer"
            :showDismiss="showDismiss"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="error"
        @click="dismiss()"
        block
        v-if="showDismiss"
        outlined
        text
      >
        Dismiss
      </v-btn>
      <v-btn
        color="primary"
        @click="offer()"
        block
        v-if="showOffer"
        text
        outlined
      >
        <v-icon class="ma-1">
          mdi-offer
        </v-icon>
        Make an Offer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PlayerData from "./PlayerData";

export default {
  components: {
    PlayerData
  },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    showDismiss: {
      type: Boolean,
      default: false
    },
    showOffer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedPlayer: JSON.parse(JSON.stringify(this.value))
    };
  },
  watch: {
    value() {
      this.selectedPlayer = JSON.parse(JSON.stringify(this.value));
    }
  },
  methods: {
    async dismiss() {
      const res = await this.$dialog.confirm({
        text: "Do you realy want to dismiss this Player?",
        title: "Warning"
      });

      if (res) {
        this.$emit("dismiss");
      }
    },
    async offer() {
      const res = await this.$dialog.confirm({
        text: "Do you realy want this Player to join your club?",
        title: "Warning"
      });

      if (res) {
        this.$emit("offer");
      }
    }
  }
};
</script>
