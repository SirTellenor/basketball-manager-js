<template>
  <v-container>
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
      <v-col lg="4" md="12">
        <Chart :chartData="chartData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from '../components/Chart'

export default {
  components: {
    Chart
  },
  data: function() {
    return {
      alert: this.$store.state.settings.showWelcomeDialog
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['Point Guards', 'Shooting Guards', 'Small Forwards', 'Power Forwards', 'Center'],
        datasets: [
          {
            data: [
              this.$store.state.clubs[0].players.filter(x => x.position === 'PG').length, 
              this.$store.state.clubs[0].players.filter(x => x.position === 'SG').length, 
              this.$store.state.clubs[0].players.filter(x => x.position === 'SF').length, 
              this.$store.state.clubs[0].players.filter(x => x.position === 'PF').length,
              this.$store.state.clubs[0].players.filter(x => x.position === 'C').length
            ],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)'
            ]
          }
        ]
      }
    }
  }
}
</script>
