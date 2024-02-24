<template>
    <div>
      <v-sheet
        tile
        height="54"
        class="d-flex"
      >
      </v-sheet>
      <v-sheet height="750">
        <!-- {{ focus }}
        {{ categories }}
        {{ names }} -->
        <v-calendar
        ref="calendar"
        v-model="focus"
        color="success"
        type="category"
        category-show-all
        first-interval="6"
        :interval-count="24-6"
        :interval-format="customIntervalFormat"
        short-intervals
        :categories="categories"
        :events="events"
        locale="th-TH"
        :event-timed="isTimedEvent"
        @change="getEvents"
        >
        <template #event="{ event }">
        <!-- <div v-if="event.item.length > 0" style="height: 100%;" class="pa-1 pl-3">
          <div class="ma-0 pa-0 font-weight-black" style="display:flex;justify-content:space-between;">
              <p class="ma-0">{{ event.item[0].flowName}}</p>
          </div>
          <p class="mb-1"><v-icon small color="#FFFFFF">mdi-map-marker-outline</v-icon> {{ event.item[0].address }}</p>
        </div>
        <div v-else>
          {{ event }}
        </div> -->
        <div v-if="event.item.length > 0" class="eventIF">
                <div class="ma-0 pa-0 font-weight-black" style="display:flex;justify-content:space-between;">
                    <p class="ma-0">{{ event.item[0].flowName}}</p>
                </div>
                <p class="mb-1"><v-icon small color="#FFFFFF">mdi-map-marker-outline</v-icon> {{ event.item[0].address }}</p>
                </div>
                <div v-else class="eventElse">
                    <div class="ma-0 pa-0 font-weight-black" style="display:flex;justify-content:space-between;">
                    <p class="ma-0">{{ event.name}}</p>
                </div>
                <p class="mb-1"> {{ event.startTime + ' - ' + event.endTime }}</p>
            </div>
        </template>
        <template #interval="{ date, time, category}">
        <!-- Custom content for the interval -->
        <div class="intervalOff" v-if="setDayOff(category, date)">
        <!-- Render additional content here -->
        </div>
        <!-- <div v-else class="intervalOn"></div> -->
        </template>
        <!-- <template v-slot:day-label-header="{}">-</template> -->
        <!-- ปรับแต่งการแสดงของแต่ละ category -->
        <template #category="{ category }" >
        <!-- นำรูปภาพมาแสดง -->
        <!-- <img v-if="category.image" :src="category.image" alt="Category Image" /> -->
        <!-- <v-sheet class="categoriesProfile pa-4"> -->
        <v-sheet class="d-flex flex-column justify-content-center  align-items-center m-2">
        <!-- {{ categoriesItem.filter((item) => item.text === category)[0].empImge }} -->
        <v-avatar
        class="mb-3"
        v-if="categoriesItem.filter((item) => item.text === category)[0].empImge"
        style="border-width: 4px;border-color: #1c437c;border-style: solid;"
        size="90"
        >
        <img
            :src="categoriesItem.filter((item) => item.text === category)[0].empImge"
            :alt="category"
        >
        </v-avatar>
        <v-avatar
        class="mb-3"
        v-else
        color="indigo"
            size="90"
        >
            <v-icon dark  x-large>
            mdi-account-circle
            </v-icon>
        </v-avatar>
        <p>{{ category }}</p>
        </v-sheet>
        <!-- หรือสามารถใส่ HTML ตามที่ต้องการ -->
        <!-- <div v-else>{{ category.name }}</div> -->
        </template>
        </v-calendar>
      </v-sheet>
    </div>
</template>

<script>
import moment from 'moment' // แปลง date
export default {
  props: {
    events: {
      type: Array,
      default: () => []
    },
    focus: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: () => 'month'
    },
    weekday: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => []
    },
    names: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    },
    empDayoff: {
      type: Array,
      default: () => []
    },
    categoriesItem: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    //   type: 'month',
    //   types: ['month', 'week', 'day', '4day'],
    //   mode: 'stack',
    //   modes: ['stack', 'column'],
    //   weekday: [0, 1, 2, 3, 4, 5, 6],
    //   weekdays: [
    //     { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
    //     { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
    //     { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
    //     { text: 'Mon, Wed, Fri', value: [1, 3, 5] }
    //   ],
    //   value: '',
    //   colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    //   names: ['ล้างรถยนต์นอกสถานที่', 'Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    }
  },
  watch: {
    // whenever question changes, this function will run
    focus (newQuestion, oldQuestion) {
      console.log('focus', newQuestion, oldQuestion)
    },
    events (newQuestion, oldQuestion) {
      console.log('focus', newQuestion, oldQuestion)
    }
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
    getEvents () {
      console.log('@@@@@@@@@', this.events)
    },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}
</script>
<style>
.v-calendar-category .v-calendar-category__columns .v-calendar-category__column-header {
    min-width: 300px;
}
.v-calendar-category .v-calendar-daily__day {
    min-width: 300px;
}
.categoriesProfile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.intervalOff {
  border-top: 1px solid #9e9e9e;
  border-right: 1px solid #9e9e9e;
  border-left: 1px solid #9e9e9e;
  background: linear-gradient(45deg, #d1d1d1 37.50%, #e6e6e6 37.50%, #e6e6e6 50%, #d1d1d1 50%, #d1d1d1 87.50%, #e6e6e6 87.50%, #e6e6e6 100%);
  background-size: 10px 10px;height: 100%;
}
.eventIF {
    padding-left: 0.5vw;
    height: 100%;
}
.eventElse {
    padding-left: 0.5vw;
    height: 100%;
}
</style>
