<script>
import { Doughnut } from 'vue-chartjs'

export default {
    extends: Doughnut,
    props: {
      chartData: {
        type: Object,
        default: () => {}
      }
    },
    data: () => {
      return {
        chartoptions: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.chartoptions)
    }
}
</script>