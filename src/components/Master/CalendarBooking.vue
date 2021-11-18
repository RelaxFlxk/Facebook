<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="6"> </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-menu
                      v-model="menuDate"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="today"
                          label="วันที่"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="today"
                        @input="menuDate = false , getBookingList()"
                        :max="
                          new Date(
                            Date.now() - new Date().getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .substr(0, 10)
                        "
                      ></v-date-picker>
                    </v-menu>
          </v-col>
          <v-col cols="12">
            <v-card elevation="7" v-if="dataReady">
              <v-card-text>
                <v-sheet height="64">
                  <v-toolbar dense>
                    <v-toolbar-title v-if="$refs.calendar">{{
                      $refs.calendar.title
                    }}</v-toolbar-title>

                    <v-spacer></v-spacer>
                  </v-toolbar>
                </v-sheet>
                <v-sheet>
                  <v-calendar
                    ref="calendar"
                    :now="today"
                    :value="today"
                    :events="events"
                    @click:event="showEvent"
                    color="primary"
                    type="month"
                  ></v-calendar>
                </v-sheet>
              </v-card-text>
            </v-card>
            <div class="text-center">
              <v-dialog v-model="dialog" width="500">
                <v-card>
                  <v-card-title class="text-h6 grey lighten-2">
                    รายชื่อลูกค้านัดหมาย
                  </v-card-title>
                  <br />
                  <v-card-text
                    v-for="(items, index) in dataCalendar"
                    :key="index"
                  >
                    <v-card elevation="2">
                      <v-list-item three-line>
                        <v-list-item-content>
                          <div class="text-overline mb-4">
                            {{ items.flowName }}
                          </div>
                          <v-list-item-subtitle>
                            <p>วันที่นัดหมาย : {{format_date(items.dueDate)}}</p>
                          </v-list-item-subtitle>
                          <v-list-item-group
                            :color="items.color"
                          >
                            <p>สถานะ ยืนยัน : {{items.statusBt || 'wait'}}</p>
                          </v-list-item-group>
                          <v-list-item-subtitle v-if="items.contactDateBt">
                            <p>วันที่ ยืนยัน : {{format_date(items.contactDateBt)}}</p>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      ยืนยัน
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import draggable from 'vuedraggable'
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'

export default {
  name: 'BookingList',
  components: {
    draggable,
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  data () {
    return {
      session: this.$session.getAll(),
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'ปฏิทินลูกค้านัดหมาย',
          disabled: false,
          href: '/Master/CalendarBooking'
        }
      ],
      dataReady: true,
      today: new Date().toISOString().substr(0, 10),
      events: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      menuDate: false,
      dialog: false,
      dataCalendar: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login')
    }
  },
  async mounted () {
    await this.getBookingList()
  },
  methods: {
    async getBookingList () {
      // Clear Data ทุกครั้ง
      this.events = []
      // Clear ช่องค้นหา
      this.searchAll2 = ''
      const dateSplit = this.today.split('-')
      // console.log(dateSplit)
      // const date = dateSplit[0].split('-')
      const year = String(dateSplit[0])
      const month = String(dateSplit[1])
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/booking_view/getCount?shopId=' +
            this.$session.getAll().data.shopId + '&dueDate=' + year + '-' + month
        )
        .then(async response => {
          console.log('getData', response.data)
          this.dataReady = true
          for (let i = 0; i < response.data.length; i++) {
            let d = response.data[i]
            if (d.statusBt) {
              if (d.statusBt === 'confirm') {
                d.color = 'green'
                d.name = d.statusBt + ' : ' + d.name.toString()
              } else {
                d.color = 'red'
                d.name = d.statusBt + ' : ' + d.name.toString()
              }
            } else {
              d.color = 'orange'
              d.name = 'wait' + ' : ' + d.name.toString()
            }
            this.events.push(d)
            console.log('events', this.events)
          }
          if (this.events.length === 0 || this.events.status === false) {
            this.events = []
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          this.dataReady = true
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    },
    async showEvent (event) {
      this.dataCalendar = []
      this.selectedEvent = event.event.start
      console.log('selectedEvent', this.selectedEvent)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&dueDate=' +
            event.event.start
        )
        .then(async response => {
          console.log('getData', response.data)
          for (let i = 0; i < response.data.length; i++) {
            let d = response.data[i]
            if (d.statusBt) {
              if (d.statusBt === 'confirm') {
                d.color = 'green'
              } else {
                d.color = 'red'
              }
            } else {
              d.color = 'orange'
            }
            this.dataCalendar.push(d)
          }
          this.dialog = true
        })
    }
  }
}
</script>
