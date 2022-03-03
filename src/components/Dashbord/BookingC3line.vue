<template lang="">
    <div >
      <v-card class="p-3" v-if="BookingC3line">
        <h3 class="text-center">รายการนัดหมายในเดือนนี้</h3>
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
      dataMonth: [],
      codeColor: [
        '#F898A4',
        '#0099FF',
        '#CC0066',
        '#CCFF00',
        'rgb(33, 158, 188)',
        'rgb(2, 48, 71)',
        'rgb(255, 183, 3)',
        'rgb(61,90,128)',
        'rgb(152,193,217)',
        'rgb(28,251,252)',
        'rgb(255,212,91)',
        'rgb(238,108,77)',
        'rgb(41,50,65)'
      ]
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
      // console.log('dataMonth', this.dataMonth)
      await this.getBookingC3line(picker)
    },
    async getBookingC3line (picker) {
      this.BookingC3line = null
      // console.log('picker', picker)
      await axios.get(this.DNS_IP + '/booking_view_getBookC3line/get?picker=' + picker + '&shopId=' + this.shopId)
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
      let itemdt = Array.from(new Set(dt.map(item => item.sourceLink)))
      // console.log(itemdt)
      let itemChart = [
        ['x', ...this.dataMonth.map(item => item.day)]
      ]
      itemdt.forEach((vitemdt, kitemdt) => {
        let ChartEach = [vitemdt]
        // console.log(kitemdt, vitemdt)
        this.dataMonth.forEach((vdataMonth, kdataMonth) => {
          if (dt.filter((item) => item.CREATE_DATE === vdataMonth.date && item.sourceLink === vitemdt).length > 0) {
            ChartEach.push(...dt.filter((item) => item.CREATE_DATE === vdataMonth.date && item.sourceLink === vitemdt).map(item2 => item2.Book))
          } else {
            // let numberInt = '0'
            ChartEach.push(...[0])
          }
        })
        itemChart.push(ChartEach)
      })
      // console.log(itemChart)
      this.BookingC3line = {
        data: {
          x: 'x',
          columns: itemChart
        },
        color: {
          pattern: this.codeColor
        },
        size: {
          height: 300
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

</style>
