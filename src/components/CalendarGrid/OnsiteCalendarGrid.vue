<template>
  <v-main>
    <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600" v-if="focus">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          type="category"
          category-show-all
          :categories="categories"
          :events="events"
          @change="setEvent"
        >
        <!-- ปรับแต่งการแสดงของแต่ละ category -->
        <template #category="{ category }" >
          <!-- นำรูปภาพมาแสดง -->
          <!-- <img v-if="category.image" :src="category.image" alt="Category Image" /> -->
          <div class="categoriesProfile">
            <!-- {{ categoriesItem.filter((item) => item.text === category)[0].empImge }} -->
            <v-avatar v-if="categoriesItem.filter((item) => item.text === category)[0].empImge">
            <img
              :src="categoriesItem.filter((item) => item.text === category)[0].empImge"
              :alt="category.name"
            >
            </v-avatar>
            <v-avatar v-else color="indigo">
              <v-icon dark>
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <p>{{ category }}</p>
          </div>
          <!-- หรือสามารถใส่ HTML ตามที่ต้องการ -->
          <!-- <div v-else>{{ category.name }}</div> -->
        </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
  </v-main>
</template>

<script>
import axios from 'axios' // api
import moment from 'moment' // แปลง date

export default {
  data () {
    return {
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      focus: null,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['ซ่อมทั่วไป', 'ตัดผม', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      // categories: ['AAAAAA', 'BBBBBB']
      flowName: [],
      dataFlow: [],
      categories: [],
      categoriesItem: [],
      eventsItem: []
    }
  },
  async mounted () {
    // console.log('this.DNS_IP ', this.DNS_IP)
    await this.getEmpOnsite()
    await this.getFlow()
    this.focus = moment().format('YYYY-MM-DD')
    // await this.getEventEmp()
    // await this.setEvent()
    // await this.$refs.calendar.checkChange()
  },
  methods: {
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
    fetchEvents ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)
        console.log('this.categories[this.rnd(0, this.categories.length - 1)]', this.categories)
        // console.log('TTTT', {
        //   name: this.names[this.rnd(0, this.names.length - 1)],
        //   start: first,
        //   end: second,
        //   color: this.colors[this.rnd(0, this.colors.length - 1)],
        //   timed: !allDay,
        //   category: this.categories[this.rnd(0, this.categories.length - 1)]
        // })
        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
          category: this.categories[this.rnd(0, this.categories.length - 1)]
        })
        // console.log('events', events)
      }

      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
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
              let s = {}
              s.value = d.flowId
              s.text = d.flowName
              this.flowName.push(s)
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
                // console.log('empId', d.empId)
                d.value = d.empId
                d.text = d.empFirst_NameTH
                this.categoriesItem.push(d)
                this.categories.push(d.empFirst_NameTH)
              }
            }
            console.log('this.categoriesItem', this.categoriesItem)
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
      console.log('getEventEmp', this.DNS_IP)
      await axios
        .get(this.DNS_IP + `/CalendarGridTime/get?shopId=${this.shopId}&start=${this.focus}`)
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
            console.warn('No data returned from the server.')
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
        console.log('----', this.eventsItem)
        const events = []
        for (let i = 0; i < this.eventsItem.length; i++) {
          let element = this.eventsItem[i]
          // console.log('DATE', element.start)
          // console.log('DATEMONENT', moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'))
          // console.log('newDATE', new Date(moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss')))
          // console.log('------', startDate, startTime)
          let start = new Date(moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'))
          let end = new Date(moment(element.end, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss'))
          let findIndex = this.flowName.findIndex((item) => item.value === element.flowId)
          let flowName = this.flowName.filter((item) => item.value === element.flowId)[0].text
          // console.log('moment', moment())
          // console.log('start', start, ' - ', end)
          events.push({
            name: flowName,
            start: start,
            end: end,
            color: this.colors[findIndex],
            timed: true,
            category: this.categoriesItem.filter((item) => item.value === element.empId)[0].text
          })
        }
        console.log('events', events)
        this.events = events
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.categoriesProfile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
