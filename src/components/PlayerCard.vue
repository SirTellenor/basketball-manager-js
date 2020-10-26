<template>
  <v-card>
    <v-card-title>{{
      "#" + selectedPlayer.nr + " " + selectedPlayer.name + ' | ' + selectedPlayer.position
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
    <v-card-actions v-if="showActions">
      <v-btn color="error" @click="dismiss()" block>
        DISMISS
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    showActions: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectedPlayer: JSON.parse(JSON.stringify(this.value))
    }
  },
  watch: {
    value () {
      this.selectedPlayer = JSON.parse(JSON.stringify(this.value))
    }
  },
  methods: {
    async dismiss() {
      const res = await this.$dialog.confirm({
        text: 'Do you realy want to dismiss this Player?',
        title: 'Warning'
      })

      if(res) {
        this.$emit('dismiss')
      }
    }
  }
}
</script>