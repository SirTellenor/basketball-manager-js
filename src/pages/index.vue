<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <h1>
        Welcome to
        {{
          $store.state.settings.clubname
            ? $store.state.settings.clubname
            : "your club"
        }}!
      </h1>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider />
    <br />
    <br />
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close"
      color="primary"
      dark
      dismissible
    >
      Welcome to basketball manager. This is an free software, completely
      written in VueJS and VuetifyJS. Feel free and checkout my github repo.
    </v-alert>

    <v-row>
      <v-col :cols="4">
        <apexcharts 
          type="donut" 
          :options="chartOptions" 
          :series="series"
        ></apexcharts>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
      apexcharts: VueApexCharts,
    },
    data: function() {
      return {
        series: [
          this.$store.state.clubs[0].players.filter(x => x.position === 'PG').length, 
          this.$store.state.clubs[0].players.filter(x => x.position === 'SG').length, 
          this.$store.state.clubs[0].players.filter(x => x.position === 'SF').length, 
          this.$store.state.clubs[0].players.filter(x => x.position === 'PF').length,
          this.$store.state.clubs[0].players.filter(x => x.position === 'C').length
        ],
        chartOptions: {
          labels: ['Point Guards', 'Shooting Guards', 'Small Forwards', 'Power Forwards', 'Center'],
        },
        alert: this.$store.state.settings.showWelcomeDialog
      }
    },
}
</script>
