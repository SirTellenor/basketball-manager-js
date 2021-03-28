<template>
  <v-app id="inspire">
    <v-app-bar app flat v-if="$vuetify.breakpoint.mdAndDown">
      <v-container class="py-0 fill-height">
        <v-btn
          v-for="link in $router.options.routes"
          :key="link.path"
          text
          :to="link.path"
        >
          {{ link.name }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center black--text">
            <h1>
              Welcome to
              {{
                $store.state.settings.clubname
                  ? $store.state.settings.clubname
                  : "your club"
              }}
            </h1>
          </v-col>
          <v-col cols="2" v-if="$vuetify.breakpoint.lgAndUp">
            <v-sheet class="pa-2" rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="link in $router.options.routes"
                  :key="link.path"
                  :to="link.path"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ link.name }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-main class="pa-0">
                <template v-if="isInstalled">
                  <router-view />
                </template>
                <template v-else>
                  <Setup />
                </template>
              </v-main>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
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
      return !!this.$store.state.settings.isInstalled;
    }
  },
  created() {
    this.$store.dispatch("fetchSettings");
    this.$store.dispatch("fetchClubs");
    this.$store.dispatch("fetchMarket");
    console.log(this.$store.state.market)
    if (this.$store.state.settings.darkMode) this.$vuetify.theme.dark = true;
  }
};
</script>
