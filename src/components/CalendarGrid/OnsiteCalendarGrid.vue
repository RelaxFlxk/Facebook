<template>
  <v-main>
    <v-row class="fill-height">
    <v-col class="pa-3">
      <!-- \border-color: rgb(0 0 0)!important; -->
      <!-- <v-sheet
        tile
        height="54"
        class="d-flex"
      >
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.prev()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
        ></v-select>
        <v-select
          v-model="mode"
          :items="modes"
          dense
          outlined
          hide-details
          label="event-overlap-mode"
          class="ma-2"
        ></v-select>
        <v-select
          v-model="weekday"
          :items="weekdays"
          dense
          outlined
          hide-details
          label="weekdays"
          class="ma-2"
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn
          icon
          class="ma-2"
          @click="$refs.calendar.next()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-sheet> -->
          <div class="pa-0 ma-0" v-if="colsSize === 'md' || colsSize === 'lg' || colsSize === 'xl'">
            <v-sheet class="Main pa-3" v-if="focus">
            <div class="menuleft">
            <div>
              <v-select
              v-model="type"
              :items="types"
              dense
              outlined
              hide-details
              class="ma-2"
              label="ประเภทปฏิทิน"
            ></v-select>
            </div>
            <div style="overflow-y: scroll;">
            <v-date-picker
            v-model="focus"
            no-title
            >
            </v-date-picker>
              <v-sheet elevation="2" class="pa-2 px-3 py-6 ma-1">
              <h6 class="text-center font-weight-black">EVENT COLOR</h6>
              <div style="display: flex;justify-content: space-around;">
                <v-switch
                v-model="typeColor"
                hide-details
                inset
                label="บริการ"
                :true-value="typesColor[0]"
                :false-value="typesColor[1]"
              ></v-switch>
              <v-switch
                v-model="typeColor"
                hide-details
                inset
                :true-value="typesColor[1]"
                :false-value="typesColor[0]"
                label="พนักงาน"
              ></v-switch>
              </div>
            </v-sheet>
            <v-expansion-panels v-model="panel" multiple class="pa-2">
              <v-expansion-panel>
                <v-expansion-panel-header>บริการ</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div class="pa-1"  v-for="(item , index) in flowName" :key="index">
                    <h6 style="display: flex;align-items: center;">
                      <v-icon class="mr-2" :color="colors[index]">mdi-checkbox-multiple-blank</v-icon>
                      {{ item.text }}
                    </h6>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>พนักงาน</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- Filter ช่างได้ -->
                  <!-- {{ categoriesCheckBoxs }} -->
                  <div class="pa-1" v-if="categoriesCheckBox.length > 0">
                    <v-checkbox
                      :color="colors[index2]"
                      hide-details
                      v-for="(item2 , index2) in categoriesCheckBox" :key="index2"
                      v-model="categories"
                      :label="item2"
                      :value="item2"
                      @click="filterEmp(item2, index2)"
                    ></v-checkbox>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            </div>
          </div>
          <div class="pl-1 menuright">
            <FullCalendar
             v-if="type !== 'category'"
            :events="events"
            :focus="focus"
            :type="type"
            :colors="colors"
            :categories="categories"
            :typeColor="typeColor"
            :names="names"
            :flowName="flowName"
            @send-data="changeData"
            @more="clickMore"
            ></FullCalendar>
            <CategoryCalendar
              v-else
              :events="events"
              :focus="focus"
              :type="type"
              :typeColor="typeColor"
              :colors="colors"
              :names="names"
              :categories="categories"
              :categoriesItem="categoriesItem"
              :empDayoff="empDayoff"
              :flowName="flowName"
              @send-data="changeData"
              >
              </CategoryCalendar>
          </div>
        </v-sheet>
          </div>
          <div class="pa-0 ma-0" v-else>
            <v-sheet class="pa-3 MainMobile" v-if="focus">
              <div class="pl-1 menuright">
                <CategoryCalendar
                :events="events"
                :focus="focus"
                :type="type"
                :typeColor="typeColor"
                :colors="colors"
                :names="names"
                :categories="categories"
                :categoriesItem="categoriesItem"
                :empDayoff="empDayoff"
                :flowName="flowName"
                @send-data="changeData"
                >
                </CategoryCalendar>
              </div>
            </v-sheet>
          </div>
      <!-- เป็น prop ที่ไว้แสดงเวลาเริ่มและเวลาสิ้นสุด
        first-interval="7"
          :interval-count="24-7" -->
    </v-col>
  </v-row>
  <!-- <FullCalendar :events="TT"></FullCalendar> -->
  </v-main>
</template>

<script>
import axios from 'axios' // api
import moment from 'moment' // แปลง date
import FullCalendar from './FullCalendar.vue'
// import CalendarCategory from './CalendarCategory.vue'
import CategoryCalendar from './CategoryCalendar.vue'
export default {
  components: {
    CategoryCalendar,
    FullCalendar
  },
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
      panel: [0, 1],
      type: 'month',
      types: ['month', 'week', 'day', '4day', 'category'],
      typeColor: 'Flow',
      typesColor: ['Flow', 'Emp'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] }
      ],
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      focus: null,
      events: [],
      colors: [
        'green',
        'red',
        'blue',
        'orange',
        'purple',
        'cyan',
        'pink',
        'teal',
        'lime',
        'brown',
        'grey',
        'blueGrey',
        'amber',
        'lightGreen',
        'deepOrange',
        'indigo',
        'lightBlue',
        'deepPurple'
      ],
      names: [],
      // categories: ['AAAAAA', 'BBBBBB']
      flowName: [],
      dataFlow: [],
      categories: [],
      categoriesCheckBox: [],
      categoriesItem: [],
      eventsItem: [],
      empDayoff: [],
      dataJob: [],
      TT: []
    }
  },
  watch: {
    // whenever question changes, this function will run
    async colsSize (newQuestion, oldQuestion) {
      if (newQuestion === 'md' || newQuestion === 'lg' || newQuestion === 'xl') {
      } else {
        this.type = 'category'
        this.typeColor = 'Flow'
      }
    },
    async focus (newQuestion, oldQuestion) {
      if (oldQuestion) {
        let monthnewQuestion = moment(newQuestion).format('YYYY-MM')
        let montholdQuestion = moment(oldQuestion).format('YYYY-MM')
        if (monthnewQuestion !== montholdQuestion) {
          this.events = []
          await this.setEvent()
        }
      }
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
    clickMore (data) {
      this.type = 'day'
      this.focus = data
    },
    changeData (data) {
      // console.log('data!!!!', data)
      this.focus = data
    },
    filterEmp (item, key) {
      this.categories.sort((a, b) => {
        return this.categoriesCheckBox.indexOf(a) - this.categoriesCheckBox.indexOf(b)
      })
      // console.log('-------', item, ' - ', key)
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
      let month = moment(this.focus).format('YYYY-MM')
      let params = this.DNS_IP + '/job/get?shopId=' + this.shopId + '&checkOnsite=True' + '&dueDate=' + month
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
                this.names.push(d.flowName)
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
      let param = this.DNS_IP + `/empSelect/get?shopId=${this.shopId}`
      if (this.session.data.USER_ROLE === 'onsite') {
        param = this.DNS_IP + `/empSelect/get?shopId=${this.shopId}&empId=${this.session.data.empId}`
      }
      await axios
        .get(param)
        .then(async (response) => {
          let rs = response.data
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              if (d.USER_ROLE === 'onsite') {
                // console.log('empId', d)
                d.value = d.empId
                d.text = d.empFirst_NameTH
                this.categoriesItem.push(d)
                this.categories.push(d.empFirst_NameTH)
                this.categoriesCheckBox.push(d.empFirst_NameTH)
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
      let param = this.DNS_IP + `/CalendarGridTime/get?shopId=${this.shopId}&start=${month}`
      if (this.session.data.USER_ROLE === 'onsite') {
        param = this.DNS_IP + `/CalendarGridTime/get?shopId=${this.shopId}&start=${month}&empId=${this.session.data.empId}`
      }
      await axios
        .get(param)
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
          if (this.flowName.filter((item) => item.value === element.flowId).length && this.categoriesItem.length > 0) {
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
              timed: true,
              item: this.dataJob.filter((item) => item.bookNo === element.refID),
              category: this.categoriesItem.filter((item) => item.value === element.empId)[0].text,
              startTime: moment(element.start, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('HH:mm'),
              endTime: moment(element.end, 'ddd, DD MMM YYYY HH:mm:ss [GMT]').tz('Asia/Bangkok').format('HH:mm')
              // name: flowName,
              // start: start,
              // end: end,
              // color: this.colors[findIndex],
              // timed: true
            })
          }
        }
        console.log('events', events)
        this.events = events
        this.TT = TT
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.MainMobile {
  min-height: 750px;
}
.Main {
  min-height: 650px;
  display: flex;
  border-style: solid;
  border-width: 1px;
  border-color: #e0e0e0;
}
.menuleftDrawer{
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 83vh;
  background-color: #FFFFFF;
  padding: 22px;
}
.menuleft {
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 83vh;
}
.menuright {
  flex-grow: 1;
  overflow: scroll;
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
