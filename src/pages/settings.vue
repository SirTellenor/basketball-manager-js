<template>
  <v-container>
    <v-row>
      <v-spacer />
      <v-switch
        v-model="settings.showWelcomeDialog"
        label="Welcome Dialog"
        @change="updateSettings(settings)"
      />
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-text-field
        v-model="settings.clubname"
        label="Clubname"
        @change="updateSettings(settings)"
      />
      <v-spacer />
    </v-row>
    <v-row>
      <v-spacer />
      <v-switch
        v-model="settings.darkMode"
        label="Darkmode"
        @change="
          $vuetify.theme.dark = !$vuetify.theme.dark
          updateSettings(settings)
        "
      />
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        ...this.$store.state.settings
      }
    };
  },
  methods: {
    updateSettings(settings) {
      this.$store.commit("SET_SETTINGS", settings);
    }
  }
};
</script>
