<template lang="">
    <div >
      <v-card class="p-3" v-if="BookingC3line">
        <h3 class="text-center">ประเภทการนัดหมายเข้ารับบริการ</h3>
        <C3Chart :chartData="BookingC3line"></C3Chart>
      </v-card>
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
  computed: {
    resCol () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '12'
        case 'md': return '6'
        case 'lg': return '4'
        case 'xl': return '4'
      }
      console.log('this.$vuetify.breakpoint.name', this.$vuetify.breakpoint.name)
    }
  },
  data () {
    return {
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      startDate: '',
      endDate: '',
      BookingC3line: null,
      dataMonth: []
    }
  },
  async mounted () {
    // await this.getBranch()
  },
  methods: {
    async getDate (picker) {
      this.dataMonth = []
      const year = picker.split('-')[0]
      const month = picker.split('-')[1]
      var a = this.daysInMonth(month, year)
      for (var i = 0; i < a; i++) {
        var data = {}
        data.date = year + '-' + month + '-' + (i + 101).toString().substr(1, 2)
        data.day = (i + 101).toString().substr(1, 2)
        this.dataMonth.push(data)
      }
      console.log('dataMonth', this.dataMonth)
    },
    async getBookingC3line (dateRange) {
      this.BookingC3line = null
      this.startDate = this.momenDate_1(dateRange.startDate)
      this.endDate = this.momenDate_1(dateRange.endDate)
      console.log('data', dateRange)
      await axios.get(this.DNS_IP + '/booking_view_getBookflowName/get?startDate=' + this.startDate + '&endDate=' + this.endDate + '&shopId=' + this.shopId)
        .then((response) => {
          let rs = response.data
          // console.log('rs', rs)
          if (rs.length > 0) {
            this.genChart(rs)
          }
        })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async genChart (dt) {
      let chartData = []
      dt.forEach((value, key) => {
        chartData.push([value.flowName, value.Total])
      })
      // console.log('chart', chartData)
      this.BookingC3line = {
        data: {
        // iris data from R
          columns: chartData,
          type: 'pie'
          // onclick: function (d, i) { console.log('onclick', d, i) },
          // onmouseover: function (d, i) { console.log('onmouseover', d, i) },
          // onmouseout: function (d, i) { console.log('onmouseout', d, i) }
        },
        pie: {
          label: {
            format: function (value, ratio, id) {
              return value
            }
          }
        }
      }
    },
    daysInMonth (month, year) {
      return new Date(year, month, 0).getDate()
    }
  }
}
</script>
<style lang="">
.BGmain {
  --bg-color: #f2f2f2;
  background-color: var(--bg-color);
}

</style>
