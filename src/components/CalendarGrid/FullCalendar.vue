<template>
    <div>
      <v-sheet
        tile
        height="54"
        class="d-flex"
      >
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
      </v-sheet>
      <v-sheet height="750" style="width: 100%;">
        <v-calendar
          ref="calendar"
          v-model="focus"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          first-interval="6"
          :interval-count="24-6"
          :interval-format="customIntervalFormat"
          locale="th-TH"
          short-intervals
          @change="getEvents"
        >
        <template #event="{ event }">
            <!-- {{ event }} -->
        <div v-if="type === 'month'">
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
        </div>
        <div v-if="type === 'week'">
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
        </div>
        <div v-if="type === 'day'">
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
        </div>
        <div v-if="type === '4day'">
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
        </div>
        </template>
        </v-calendar>
      </v-sheet>
    </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      default: () => []
    },
    focus: {
      type: String,
      default: this.value
    },
    type: {
      type: String,
      default: () => 'month'
    },
    colors: {
      type: Array,
      default: () => []
    },
    names: {
      type: Array,
      default: () => []
    }
  },
  //   watch: {
  //     // whenever question changes, this function will run
  //     focus (newQuestion, oldQuestion) {
  //       console.log('focus', newQuestion, oldQuestion)
  //       this.value = newQuestion
  //     }
  //   },
  data () {
    return {
    //   type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      modes: ['stack', 'column'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { text: 'Mon, Wed, Fri', value: [1, 3, 5] }
      ],
      value: ''
    //   colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    //   names: ['ล้างรถยนต์นอกสถานที่', 'Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    }
  },
  methods: {
    customIntervalFormat (interval) {
      // จัดรูปแบบเวลาให้อยู่ในรูปแบบ HH:mm โดยไม่ใช้ AM/PM
      // console.log(interval)
      return interval.time
    },
    getEvents () {
      console.log('!!!!!!!!', this.events)
    },
    // getEvents ({ start, end }) {
    //   const events = []

    //   const min = new Date(`${start.date}T00:00:00`)
    //   const max = new Date(`${end.date}T23:59:59`)
    //   const days = (max.getTime() - min.getTime()) / 86400000
    //   const eventCount = this.rnd(days, days + 20)

    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
    //     const second = new Date(first.getTime() + secondTimestamp)

    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay
    //     })
    //   }
    //   console.log(events[0])
    //   this.events = this.ee
    //   console.log('this.eventsFULCALENDAR', this.events)
    // },
    getEventColor (event) {
      return event.color
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}
</script>
<style scoped>
.v-calendar-daily_head-weekday {
  display: none !important;
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
