<template>
  <v-app>
    <v-app-bar app color="primary" dark v-if="isInstalled">
      <template v-for="(route, key) in $router.options.routes">
        <v-btn
          :to="route.path"
          :key="key"
          text
          v-if="route.name != 'Setup'"
          depressed
        >
          {{ route.name }}
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <template v-if="isInstalled">
        <router-view />
      </template>
      <template v-else>
        <Setup />
      </template>
    </v-main>
  </v-app>
</template>

<script>
import Setup from "./components/Setup";

export default {
  components: {
    Setup
  },
  computed: {
    isInstalled() {
      return this.$store.state.settings.isInstalled && true
    }
  },
  created() {
    this.$store.dispatch("fetchSettings");
    this.$store.dispatch("fetchClubs");
    if(this.$store.state.settings.darkMode) this.$vuetify.theme.dark = true
  }
};
</script>
