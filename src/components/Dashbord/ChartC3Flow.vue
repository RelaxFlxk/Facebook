<template lang="">
    <div >
      <v-row>
        <v-col cols="12">
          <v-card
        class="pa-md-4 mx-lg-auto "
        color="rgb(251, 133, 0)"
        height="60"
        dark
        v-if="chartItem.length > 0"
        >
          <v-card-title class="justify-center" ><h3>รถที่ซ่อมยังไม่เสร็จ</h3></v-card-title>
      </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(item , index) in chartItem" :key="index">
          <v-card
        class="pa-2"
        max-width="400"
      >
      <p class="text-center">{{chartName[index]}}</p>
      <C3Chart :chartData="chartItem[index]" v-if="chartItem[index]"></C3Chart>
      </v-card>
       </v-col>
      </v-row>
      <v-dialog
      v-model="dialog"
      max-width="600"
      class="pa-6"
    >
      <v-card class="pa-4">
              <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="4"
              class="elevation-1"
            ></v-data-table>
            </v-card>
    </v-dialog>
    </div>
</template>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import axios from 'axios'
import C3Chart from './C3Chart.vue'
export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    C3Chart

  },
  data () {
    return {
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      flowNameitem: [],
      chartItem: [],
      chartBranch: null,
      chartName: [],
      headers: [
        { text: 'ชื่อ', value: 'Name' },
        { text: 'เลขทะเบียน', value: 'carNo' },
        { text: 'วันที่ส่งรถ', value: 'endDate' },
        { text: 'ประเภทบริการ', value: 'flowName' }
      ],
      desserts: [],
      dessertsItem: [],
      dialog: false,
      startDate: '',
      endDate: ''
    }
  },
  async mounted () {
    // await this.getBranch()
  },
  methods: {
    async getFlow (masBranchName, dateRange) {
      await this.getDataflow()
      this.startDate = this.momenDate_1(dateRange.startDate)
      this.endDate = this.momenDate_1(dateRange.endDate)
      if (masBranchName) {
        await axios.get(this.DNS_IP + '/job_log/getChartflowByBranch?startDate=' + this.startDate + '&endDate=' + this.endDate + '&shopId=' + this.shopId + '&masBranchName=' + masBranchName)
          .then((response) => {
            let rs = response.data
            this.dessertsItem = rs
            // console.log('rs', rs)
            if (rs.length > 0) {
              this.genChart(rs)
            }
          })
          .catch((error) => {
            console.log('error function addDataGlobal : ', error)
          })
      } else {
        await axios.get(this.DNS_IP + '/job_log/getChartflowNoBranch?startDate=' + this.startDate + '&endDate=' + this.endDate + '&shopId=' + this.shopId)
          .then((response) => {
            let rs = response.data
            this.dessertsItem = rs
            // console.log('rs', rs)
            if (rs.length > 0) {
              this.genChart(rs)
            }
          })
          .catch((error) => {
            console.log('error function addDataGlobal : ', error)
          })
      }

      // console.log('this.statusitem', this.statusitem)
    },
    async getDataflow () {
      this.flowNameitem = []
      this.chartItem = []
      this.chartBranch = null
      await axios.get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          this.flowNameitem = rs.map(item => item.flowName)
        }
        // console.log('flowname', this.flowNameitem)
      })
    },
    async genChart (item) {
      let FullChart = []
      this.chartName = []
      let chartStep = []
      let chartValue = []
      const reducer = (previousValue, currentValue) => previousValue + currentValue
      for (let i = 0; i < this.flowNameitem.length; i++) {
        let a = []
        let d = this.flowNameitem[i]
        if (item.filter(row => row.flowName === d).map(item => item.flowName)[0] !== undefined) {
          this.chartName.push(item.filter(row => row.flowName === d).map(item => item.flowName)[0])
        }
        // console.log('charTNsame', this.chartName)
        chartStep.push(Array.from(new Set(item.filter(row => row.flowName === d).map(item => item.stepTitle))))
        chartStep.forEach((v, k) => {
          let dt = []
          v.forEach((v1, k1) => {
            let dd = item.filter(row => row.flowName === d).filter(row1 => row1.stepTitle === v1).map(item => item.Job)
            // console.log('dd', dd.length)
            if (dd.length > 1) {
              dt.push(dd.reduce(reducer))
            } else {
              dt.push(dd)
            }
          })
          console.log('dt', dt)
          a = dt
        })
        chartValue.push(a)
      }
      console.log('chartStep', chartStep)
      console.log('chartValue', chartValue)
      chartStep.forEach((element, key) => {
        let dtitem = []
        chartValue[key].forEach((v, k) => {
          chartStep[key].forEach((v2, k2) => {
            if (k === k2) {
              let item = [
                v2,
                v
              ]
              // console.log('Value', v)
              // console.log('Value2', v2)
              dtitem.push(item)
            }
          })
        })
        FullChart.push(dtitem)
      })
      let _this = this
      for (let a = 0; a < FullChart.length; a++) {
        let d = FullChart[a]
        if (d.length > 0) {
          let chartBranch = {
            data: {
              columns: d,
              type: 'donut',
              onclick: function (d, i) { _this.genDataTable(d, chartBranch) }
            },
            donut: {
              label: {
                format: function (value, ratio, id) {
                  return value
                }
              }
            },
            datafilter: this.chartName[a]
          }
          this.chartItem.push(chartBranch)
        }
      }
      console.log('this.chartItem.', this.chartItem)
      this.genDataTable()
    },
    async genDataTable (dataFilter, i) {
      console.log('datafilter', dataFilter, i)
      let Tableitem = []
      let dataitem = []
      let datafilter = this.dessertsItem
      await axios.get(this.DNS_IP + '/job_log/select_by_DataTable_TotalJob?startDate=' + this.startDate + '&endDate=' + this.endDate + '&shopId=' + this.shopId).then(response => {
        let rs = response.data
        dataitem = rs
        // console.log('rs2', rs)
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
      datafilter.forEach((element, key) => {
        let dt = {}
        dt.Name = dataitem.filter(item => item.jobId === element.jobId).filter(item2 => item2.fieldName === 'ชื่อ').map(row => row.fieldValue)[0]
        dt.carNo = dataitem.filter(item => item.jobId === element.jobId).filter(item2 => item2.fieldName === 'เลขทะเบียน').map(row => row.fieldValue)[0]
        dt.endDate = this.format_dateNotime(dataitem.filter(item => item.jobId === element.jobId).map(row => row.endDate)[0])
        dt.flowName = dataitem.filter(item => item.jobId === element.jobId).map(row => row.flowName)[0]
        dt.dateTotal = dataitem.filter(item => item.jobId === element.jobId).map(row => row.totalDateDiff)[0]
        dt.stepTitle = dataitem.filter(item => item.jobId === element.jobId).map(row => row.stepTitle)[0]
        dt.totalPrice = dataitem.filter(item => item.jobId === element.jobId).map(row => row.totalPrice)[0]
        dt.RECORD_STATUS = dataitem.filter(item => item.jobId === element.jobId).map(row => row.RECORD_STATUS)[0]
        Tableitem.push(dt)
        // datafilter.filter(item => item.JobId === element.JobId)
      })
      if (dataFilter) {
        let stepTitle = dataFilter.id
        let flowNameitem = i.datafilter
        // console.log('Tableitem', Tableitem)
        this.desserts = Tableitem.filter(item => item.flowName === flowNameitem).filter(item2 => item2.stepTitle === stepTitle)
        this.dialog = true
      } else {
        this.desserts = Tableitem
      }
      console.log('this.desserts', this.desserts)
    }
  }
}
</script>
<style lang="">

</style>
