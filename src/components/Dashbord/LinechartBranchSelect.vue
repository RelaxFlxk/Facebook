<template lang="">
  <v-card>
    <Chart :chart-data="chartData" />
  </v-card>
</template>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import Chart from './Line'
import axios from 'axios'
export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    Chart
  },
  data () {
    return {
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      chartData: null,
      dataitem: [],
      codeColor: ['#3333FF', '#FF0000', '#CC00FF', '#99FF00', '#6600FF', '#FFFF33', '#330033']
    }
  },
  async mounted () {
  },
  methods: {
    async getBranchSelect (masBranchName, dateRange) {
      this.dataitem = []
      let startDate = this.momenDate_1(dateRange.startDate)
      let endDate = this.momenDate_1(dateRange.endDate)
      // console.log('masBranchName', masBranchName)
      await axios.get(this.DNS_IP + '/job_log/getDashbord_total?startDate=' + startDate + '&endDate=' + endDate + '&shopId=' + this.shopId).then(response => {
        let rs = response.data
        // console.log('rs', rs)
        if (rs.length > 0) {
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            if (d.masBranchName === masBranchName) {
              this.dataitem.push(d)
            }
          }
          // console.log('this.dataitem', this.dataitem)
          // console.log('this.dataitem', this.dataitem)
        }
        this.getChart()
        // console.log('this.statusitem', this.statusitem)
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async getChart () {
      let datasetsitem = []
      // console.log('item', item)
      let s = {}
      s.label = this.dataitem[0].masBranchName
      s.data = this.dataitem.map(item => { return item.totalJob })
      s.fill = false
      s.borderColor = '#FF0000'
      s.tension = 0.1
      datasetsitem.push(s)
      const labels = this.dataitem.map(item => { return item.CREATE_DATE })
      this.chartData = {
        labels: labels,
        datasets: datasetsitem
      }
      // [1, 2, 3, 4, 5]
    }
  }
}
</script>
<style lang="">

</style>
