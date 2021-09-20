import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ['chartData'],
  data () {
    return {
      options: {
        scales: {
          yAxes: [{
            id: 'A',
            position: 'left',
            ticks: {
              beginAtZero: true
            }
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
