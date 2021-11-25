<template lang="">
  <v-card>
    <Chart :chart-data="chartData" />
  </v-card>
</template>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import Chart from './Line'
export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    Chart
  },
  data () {
    return {
      chartData: null,
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      data: [65, 59, 80, 81, 56, 55, 40, 30, 90]
    }
  },
  async mounted () {
    await this.getChart()
  },
  methods: {
    getChart () {
      this.chartData = {
        labels: this.labels,
        datasets: [{
          label: 'My First Dataset',
          data: this.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    }
  }
}
</script>
<style lang="">

</style>
