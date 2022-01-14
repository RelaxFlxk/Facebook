<template lang="">
    <div >
      <v-row>
        <v-col cols="5" md="5" >
          <v-card class="pa-2" v-if="chartBranch">
          <C3Chart :chartData="chartBranch" ></C3Chart>
          </v-card>
       </v-col>
       <v-col cols="7" md="7">
            <v-card class="pa-4" v-if="chartBranch">
              <v-data-table
              :headers="headers"
              :items="desserts"
              :items-per-page="4"
              class="elevation-1"
            ></v-data-table>
            </v-card>
          </v-col>
      </v-row>
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
      chartBranch: null,
      headers: [
        { text: 'ชื่อ', value: 'Name' },
        { text: 'เลขทะเบียน', value: 'carNo' },
        { text: 'วันที่ส่งรถ', value: 'endDate' },
        { text: 'ประเภทบริการ', value: 'flowName' }
      ],
      desserts: [],
      dessertsItem: [],
      startDate: '',
      endDate: ''
    }
  },
  async mounted () {
    // await this.getBranch()
  },
  methods: {
    async getCloseJob (masBranchName, dateRange) {
      this.chartBranch = null
      this.startDate = this.momenDate_1(dateRange.startDate)
      this.endDate = this.momenDate_1(dateRange.endDate)
      let rs = []
      if (masBranchName) {
        await axios.get(this.DNS_IP + '/job_log/getChartCloseJobByBranch?startDate=' + this.startDate + '&endDate=' + this.endDate + '&shopId=' + this.shopId + '&masBranchName=' + masBranchName).then(response => {
          rs = response.data
        }).catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
      } else {
        await axios.get(this.DNS_IP + '/job_log/getChartCloseJobNoBranch?startDate=' + this.startDate + '&endDate=' + this.endDate + '&shopId=' + this.shopId).then(response => {
          rs = response.data
        }).catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
      }
      if (rs.length > 0) {
        let JobGood = []
        let JobLate = []
        if (rs.length > 0) {
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            if (d.totalDateDiff > 0) {
              JobGood.push('1')
            } else if (d.totalDateDiff < 0) {
              JobLate.push('1')
            }
          }
        }
        this.dessertsItem = rs
        this.genDataTable()
        console.log('rs', rs)
        this.genChart(JobGood, JobLate)
      }
    },
    async genChart (JobGood, JobLate) {
      // this.chartBranch = null
      let columns = [
        ['เสร็จตามเวลา', ...JobGood],
        ['เสร็จช้ากว่าเวลาที่กำหนด', ...JobLate]
      ]
      let _this = this
      this.chartBranch = {
        data: {
          columns: columns,
          type: 'donut',
          onclick: function (d, i) { _this.genDataTable(d) }
        },
        donut: {
          label: {
            format: function (value, ratio, id) {
              return value
            }
          }
        }
      }
    },
    async genDataTable (dataFilter) {
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
        dt.totalPrice = dataitem.filter(item => item.jobId === element.jobId).map(row => row.totalPrice)[0]
        dt.RECORD_STATUS = dataitem.filter(item => item.jobId === element.jobId).map(row => row.RECORD_STATUS)[0]
        Tableitem.push(dt)
        // datafilter.filter(item => item.JobId === element.JobId)
      })
      if (dataFilter) {
        if (dataFilter.name === 'เสร็จตามเวลา') {
          console.log('1')
          this.desserts = Tableitem.filter(item => item.dateTotal > 0)
        }
        if (dataFilter.name === 'เสร็จช้ากว่าเวลาที่กำหนด') {
          console.log('2')
          this.desserts = Tableitem.filter(item => item.dateTotal < 0)
        }
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
