<template>
  <v-main>
    <v-row class="fill-height">
    <v-col class="pa-3">
      <!-- \border-color: rgb(0 0 0)!important; -->
      <div v-if="focus" class="pa-3 ma-0" style="display: flex;justify-content: center;">
        <v-btn-toggle
          rounded
          color="#000000"
        >
        <v-btn
            outlined
            @click="prev"
          >
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            outlined
            @click="setToday"
          >
            Today
          </v-btn>
          <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                v-bind="attrs"
                v-on="on"
              >
              <p class="ma-0" style="color: black;">{{ momentTitle(focus)}}</p>
              </v-btn>
            </template>
            <v-date-picker
            v-model="focus"
            no-title
            @input="menu = false"
            >
            </v-date-picker>
          </v-menu>
          <v-btn
            outlined
            @click="next"
          >
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
        <v-sheet elevation="4" class="Main pa-3" v-if="focus">
          {{ colsSize }}
          <v-row>
            <v-col cols="3" class="pr-0">
               <div  class="menuleft">
                <v-date-picker
                v-model="focus"
                no-title
                >
                </v-date-picker>
                <div  v-for="(item , index) in flowName" :key="index">
                <h6 style="display: flex;align-items: center;">
                  <v-icon class="mr-2" :color="colors[index]">mdi-checkbox-multiple-blank</v-icon>
                  {{ item.text }}
                </h6>
                </div>
              </div>
            </v-col>
            <v-col cols="9" class="pl-0">
              <FullCalendar :events="TT" :focus="focus"></FullCalendar>
            </v-col>
          </v-row>
      </v-sheet>
      <!-- เป็น prop ที่ไว้แสดงเวลาเริ่มและเวลาสิ้นสุด
        first-interval="7"
          :interval-count="24-7" -->
    </v-col>
  </v-row>
  <FullCalendar :events="TT"></FullCalendar>
  </v-main>
</template>

<script>
import axios from 'axios' // api
import moment from 'moment' // แปลง date
import FullCalendar from './FullCalendar.vue'
export default {
  computed: {
    colsWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '12'
        case 'md': return '12'
        case 'lg': return '4'
        case 'xl': return '4'
      }
    },
    colsSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'xs'
        case 'sm': return 'sm'
        case 'md': return 'md'
        case 'lg': return 'lg'
        case 'xl': return 'xl'
      }
    }
  },
  data () {
    return {
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      focus: null,
      menu: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['ซ่อมทั่วไป', 'ตัดผม', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      // categories: ['AAAAAA', 'BBBBBB']
      flowName: [],
      dataFlow: [],
      categories: [],
      categoriesItem: [],
      eventsItem: [],
      empDayoff: [],
      dataJob: [],
      TT: []
    }
  },
  async mounted () {
    // console.log('this.DNS_IP ', this.DNS_IP)
    await this.getEmpOnsite()
    await this.getFlow()
    this.focus = moment().format('YYYY-MM-DD')
    // await this.getEventEmp()
    await this.setEvent()
    // await this.$refs.calendar.checkChange()
  },
  methods: {
    momentTitle (focus) {
      return moment(focus).format('ddd, MMM D, YYYY')
    },
    isTimedEvent (event) {
      // console.log('event!!!!!"', event)
      // event.end = '2024-02-05'
      return event
    },
    customIntervalFormat (interval) {
      // จัดรูปแบบเวลาให้อยู่ในรูปแบบ HH:mm โดยไม่ใช้ AM/PM
      // console.log(interval)
      return interval.time
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = moment().format('YYYY-MM-DD')
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent (refID) {
      let dt = this.dataJob.filter((item) => item.bookNo === refID)
      console.log(dt)
    },
    async getJobData () {
      this.dataJob = []
      // let params = null
      let params = this.DNS_IP + '/job/get?shopId=' + this.shopId + '&checkOnsite=True' + '&dueDate=' + this.focus
      await axios
        .get(params)
        .then(async (response) => {
          let rs = response.data
          if (rs.status === false) {
            this.dataJob = []
          } else {
            this.dataJob = rs
            console.log('this.dataJob', this.dataJob)
          }
        })
    },
    setDayOff (category, date) {
      let empDayoffItem = this.empDayoff.filter((item) => item.empName === category)[0]
      if (empDayoffItem.typeDayCustom === 'off') {
        let dayCustomStatus = empDayoffItem.dateDayCustom.filter((item) => item === date)
        let newDate = new Date(date)
        let day = newDate.getDay()
        let dayValueStatus = empDayoffItem.dateDayoffValue.filter((item) => item === day)
        // console.log('status', dayCustomStatus, typeof day)
        // console.log('IF')
        if (dayCustomStatus.length > 0 || dayValueStatus.length > 0) {
          return true
        } else {
          return false
        }
      } else {
        // console.log('ELSE')
        let dayCustomStatus = empDayoffItem.dateDayCustom.filter((item) => item === date)
        if (dayCustomStatus.length > 0) {
          return false
        } else {
          return true
        }
      }
      // console.log('category', category, date)
      // console.log('this.categoriesItem', this.categoriesItem)
      // return true
    },
    async getFlow () {
      await axios
        .get(this.DNS_IP + `/flow/get?shopId=${this.shopId}`)
        .then(async (response) => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              // console.log('d', d)
              if (d.checkOnsite === 'True') {
                let s = {}
                s.value = d.flowId
                s.text = d.flowName
                this.flowName.push(s)
              }
            }
            console.log('flowName', this.flowName)
            // console.log('this.$refs.calendar', this.$refs.calendar)
            // await this.$refs.calendar.checkChange()
          } else {
            // กรณีไม่มีข้อมูล
            console.log('No data returned from the server.')
          }
        })
        .catch(error => {
          // ดัก error และทำอะไรกับ error นั้น
          console.error('Error fetching data:', error)
        })
      // console.log('this.categories', this.categories)
    },
    async getEmpOnsite () {
      await axios
        .get(this.DNS_IP + `/empSelect/get?shopId=${this.shopId}`)
        .then(async (response) => {
          let rs = response.data
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              if (d.USER_ROLE === 'onsite') {
                console.log('empId', d)
                d.value = d.empId
                d.text = d.empFirst_NameTH
                this.categoriesItem.push(d)
                this.categories.push(d.empFirst_NameTH)
                let dayOff = {
                  'empName': d.empFirst_NameTH,
                  'typeDayCustom': d.typeDayCustom,
                  'dateDayCustom': JSON.parse(d.dateDayCustom) || [],
                  'dateDayoffValue': JSON.parse(d.dateDayoffValue) || []
                }
                this.empDayoff.push(dayOff)
              }
            }
            // console.log('this.empDayoff', this.empDayoff)
            // await this.$refs.calendar.checkChange()
          } else {
            // กรณีไม่มีข้อมูล
            console.warn('No data returned from the server.')
          }
        })
        .catch(error => {
          // ดัก error และทำอะไรกับ error นั้น
          console.error('Error fetching data:', error)
        })
      console.log('this.categories', this.categories)
    },
    async getEventEmp () {
      this.eventsItem = []
      // console.log('getEventEmp', this.DNS_IP)
      let month = moment(this.focus).format('YYYY-MM')
      console.log('month', month)
      await axios
        .get(this.DNS_IP + `/CalendarGridTime/get?shopId=${this.shopId}&start=${month}`)
        .then(async (response) => {
          let rs = response.data
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              this.eventsItem.push(d)
            }
            console.log('this.eventsItm', this.eventsItem)
            // console.log('this.$refs.calendar', this.$refs.calendar)
            // await this.$refs.calendar.checkChange()
          } else {
            // กรณีไม่มีข้อมูล
            // console.warn('No data returned from the server.')
          }
        })
        .catch(error => {
          // ดัก error และทำอะไรกับ error นั้น
          console.error('Error fetching data:', error)
        })
      // console.log('this.categories', this.categories)
    },
    async setEvent () {
      try {
        await this.getEventEmp()
        await this.getJobData()
        // console.log('----', this.eventsItem)
        const events = []
        let TT = []
        for (let i = 0; i < this.eventsItem.length; i++) {
          let element = this.eventsItem[i]
          // console.log('DATE', element.start)
          // console.log('DATEMONENT', moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'))
          // console.log('newDATE', new Date(moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')))
          // console.log('------', startDate, startTime)
          let start = new Date(moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'))
          let end = new Date(moment(element.end, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'))
          let findIndex = this.flowName.findIndex((item) => item.value === element.flowId)
          console.log('!!!!!!', element.flowId, this.flowName.filter((item) => item.value === element.flowId))
          if (this.flowName.filter((item) => item.value === element.flowId).length > 0) {
            let flowName = this.flowName.filter((item) => item.value === element.flowId)[0].text
            // console.log('moment', moment())
            // console.log('start', start, ' - ', end)
            events.push({
              name: flowName,
              start: start,
              end: end,
              color: this.colors[findIndex],
              timed: true,
              category: this.categoriesItem.filter((item) => item.value === element.empId)[0].text,
              item: this.dataJob.filter((item) => item.bookNo === element.refID),
              startTime: moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('HH:mm'),
              endTime: moment(element.end, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('HH:mm')
            })
            TT.push({
              name: flowName,
              start: start,
              end: end,
              color: this.colors[findIndex],
              timed: true
            })
            TT.push({
              name: flowName,
              start: start,
              end: end,
              color: this.colors[findIndex],
              timed: true
            })
            TT.push({
              name: flowName,
              start: start,
              end: end,
              color: this.colors[findIndex],
              timed: true
            })
            TT.push({
              name: flowName,
              start: start,
              end: end,
              color: this.colors[findIndex],
              timed: true
            })
          }
        }
        // console.log('events', JSON.stringify(TT))
        this.events = events
        this.TT = TT
      } catch (error) {
        console.log(error)
      }
    }
  },
  components: { FullCalendar }
}
</script>

<style>
.Main {
  min-height: 600px;
  display: flex;
  flex-wrap: wrap;
}
.menuright {
  width: 100%;
}
.menuleft {
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-color: #e0e0e0;
  width: 300px;
  height: 100%;
}
/* .v-calendar-daily_head-weekday {
  display: none !important;
}
.v-calendar-daily_head-day-label {
  display: none !important;
} */
.categoriesProfile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative; /* ต้องกำหนด position เป็น relative หรือ absolute */
    top: -40px;
}
.intervalOff {
  border-top: 1px solid #9e9e9e;
  border-right: 1px solid #9e9e9e;
  border-left: 1px solid #9e9e9e;
  background: linear-gradient(45deg, #d1d1d1 37.50%, #e6e6e6 37.50%, #e6e6e6 50%, #d1d1d1 50%, #d1d1d1 87.50%, #e6e6e6 87.50%, #e6e6e6 100%);
  background-size: 10px 10px;height: 100%;
}
</style>
