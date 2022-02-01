<template>
  <div>
        <v-row no-gutters>
          <v-col cols="4">
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
                @input="(menuDate = false), getBookingList()"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="DataFlowName"
              v-model="flowId"
              dense
              outlined
              filled
              @change="getBookingList()"
              hide-details
              label="ประเภทบริการ"
              prepend-inner-icon="mdi-car-connected"
              class="ma-2"
            >
            </v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              :items="DataBranchName"
              v-model="masBranchName"
              @change="getBookingList()"
              dense
              outlined
              filled
              hide-details
              item-text="text"
              item-value="value"
              return-object
              label="สาขา"
              prepend-inner-icon="mdi-map-marker"
              class="ma-2"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-alert
              color="primary"
              dark
              icon="mdi-account-clock"
              border="left"
            >
              จำนวนลูกค้าต่อวัน : {{ countCus || 0 }}
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-card elevation="7" v-if="dataReady">
              <v-card-text>
                <v-sheet height="64">
                  <v-toolbar dense>
                    <v-btn
                      fab
                      text
                      small
                      color="grey darken-2"
                      @click="prev()"
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
                      @click="next()"
                    >
                      <v-icon small>
                        mdi-chevron-right
                      </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">{{
                      $refs.calendar.title
                    }}</v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-menu
                      bottom
                      right
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          outlined
                          color="grey darken-2"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <span>{{ typeToLabel[type] }}</span>
                          <v-icon right>
                            mdi-menu-down
                          </v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item class="vlistitem" @click="type = 'week', getBookingList()">
                          <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item class="vlistitem" @click="type = 'month', getBookingList()">
                          <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-toolbar>
                </v-sheet>
                <v-sheet>
                  <v-calendar
                    ref="calendar"
                    :now="today"
                    v-model="today"
                    :events="events"
                    locale="th-TH"
                    @click:event="showEvent"
                    color="primary"
                    :type="type"
                  >
                  <template v-slot:day="{ date }">
                    <template v-if="eventInfo[date] && eventInfo[date].all > 0">
                      <v-row>
                        <v-col>
                          <v-progress-linear
                            :value="eventInfo[date].allPercent"
                            :color="(eventInfo[date].allPercent >= 100) ? 'red lighten-1' : ((eventInfo[date].allPercent < 80) ? 'green lighten-1' : 'yellow lighten-1' ) "
                            height="25"
                            style="cursor: pointer"
                            @click.native="openTaskList(date, 'all')"
                          >
                            <template v-slot:default="{}">
                              {{ eventInfo[date].all }} / {{ countCus }}
                            </template>
                          </v-progress-linear>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="text-center mb-1 mt-0">
                          <v-badge
                            avatar
                            bordered
                            overlap
                            color="orange darken-1"
                            v-if="eventInfo[date].fastTrack > 0"
                            class="mr-1"
                            style="cursor: pointer"
                            @click.native="openTaskList(date, 'fastTrack')"
                          >
                            <template v-slot:badge>
                              <v-avatar class="mb-1" color="orange darken-1">
                                {{eventInfo[date].fastTrack}}
                              </v-avatar>
                            </template>

                            <v-avatar size="40" color="orange darken-3">
                              <v-icon dark>
                                  mdi-flash
                              </v-icon>
                            </v-avatar>
                          </v-badge>
                          <v-badge
                            avatar
                            bordered
                            overlap
                            color="red darken-1"
                            v-if="eventInfo[date].extraJob > 0"
                            class="mr-1"
                            style="cursor: pointer"
                            @click.native="openTaskList(date, 'extraJob')"
                          >
                            <template v-slot:badge>
                              <v-avatar class="mb-1" color="red darken-1">
                                {{eventInfo[date].extraJob}}
                              </v-avatar>
                            </template>

                            <v-avatar size="40" color="red darken-3">
                              <v-icon dark>
                                  mdi-alarm-plus
                              </v-icon>
                            </v-avatar>
                          </v-badge>
                          <v-badge
                            avatar
                            bordered
                            overlap
                            color="blue darken-1"
                            v-if="eventInfo[date].normal > 0"
                            class="mr-1"
                            style="cursor: pointer"
                            @click.native="openTaskList(date, 'normal')"
                          >
                            <template v-slot:badge>
                              <v-avatar class="mb-1" color="blue darken-1">
                                {{eventInfo[date].normal}}
                              </v-avatar>
                            </template>

                            <v-avatar size="40" color="blue darken-3">
                              <v-icon dark>
                                  mdi-clock-outline
                              </v-icon>
                            </v-avatar>
                          </v-badge>
                        </v-col>
                      </v-row>
                    </template>
                  </template>
                  </v-calendar>
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
                  <template v-for="(items, index) in dataSummary">
                    <v-chip
                      class="ma-2"
                      color="grey"
                      text-color="white"
                      v-bind:key="'sum'+index"
                    >
                      <v-avatar
                        left
                        class="grey darken-3"
                      >
                        {{items.length}}
                      </v-avatar>
                      {{index}}
                    </v-chip>
                  </template>
                  <v-card-text
                    v-for="(items, index) in dataCalendar"
                    :key="index"
                  >
                    <v-card elevation="2">
                      <v-list-item :style="((items.bgcolor) ? 'background-color:' + items.bgcolor + ' !important' : '') ">
                        <v-list-item-content>
                          <v-row style="color:#fff;">
                            <v-col cols="3">
                              <h3>{{items.timeDue}}</h3><br>
                              <v-icon dark class="mr-1" v-if="items.fastTrack === 'true' || items.fastTrack === 'True'">
                                  mdi-flash
                              </v-icon>
                              <v-icon dark class="mr-1" v-else-if="items.extraJob === 'true' || items.extraJob === 'True'">
                                  mdi-alarm-plus
                              </v-icon>
                              <v-icon dark class="mr-1" v-else>
                                  mdi-clock-outline
                              </v-icon>
                            </v-col>
                            <v-col cols="9">
                              <v-row>
                                <v-col cols="8"><h4>คุณ {{ items.name }}</h4></v-col>
                                <v-col cols="4" class="text-right">{{items.licenseNo}}</v-col>
                              </v-row>
                              {{ items.flowName }}<br>
                              โทร {{ items.tel }}
                              รุ่นรถ {{ items.carModel }}<br>
                              {{ format_date(items.contactDateBt) }}
                            </v-col>
                          </v-row>
                          <!-- <v-list-item-subtitle>
                            <v-btn
                              color="success"
                              fab
                              id="v-step-2"
                              v-if="items.statusBt !== 'confirmJob'"
                              :disabled="items.chkConfirm"
                              small
                              @click.stop="confirmChk(items)"
                            >
                              <v-icon dark> mdi-phone-check </v-icon>
                            </v-btn>
                            <v-btn
                              color="error"
                              fab
                              v-if="items.statusBt !== 'confirmJob'"
                              id="v-step-2"
                              small
                              :disabled="items.chkCancel"
                              @click.stop="cancelChk(items)"
                            >
                              <v-icon dark> mdi-phone-cancel </v-icon>
                            </v-btn>
                          </v-list-item-subtitle> -->
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
</template>
<script>
import axios from 'axios' // api
import draggable from 'vuedraggable'
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import moment from 'moment-timezone' // แปลง date

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
      today: this.momenDate_1(new Date()),
      events: [],
      countCus: 0,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      menuDate: false,
      dialog: false,
      dataCalendar: [],
      dataSummary: [],
      DataFlowName: [],
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1'
      ],
      DataBranchName: [],
      masBranchName: '',
      flowId: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week'
      },
      eventInfo: [],
      monthData: null,
      bookingData: []
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login')
    }
  },
  async mounted () {
    await this.getDataFlow()
    await this.getDataBranch()
    await this.getBookingList()
    this.$refs.calendar.checkChange()
    // await this.getBookingData()
  },
  methods: {
    prev () {
      this.$refs.calendar.prev()
      this.getBookingList()
      // this.getBookingData()
    },
    next () {
      this.$refs.calendar.next()
      this.getBookingList()
      // this.getBookingData()
    },
    async getDataFlow () {
      this.DataFlowName = []
      await axios
        .get(this.DNS_IP + '/flow/get?shopId=' + this.$session.getAll().data.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.DataFlowName.push({text: 'ทั้งหมด', value: 'allFlow'})
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.flowName
              d.value = d.flowId
              this.DataFlowName.push(d)
            }
            this.flowId = this.DataFlowName[0].value
          } else {
            this.DataFlowName = []
          }
        })
    },
    async getDataBranch () {
      this.DataBranchName = []
      await axios
        .get(
          this.DNS_IP +
            '/master_branch/get?shopId=' +
            this.$session.getAll().data.shopId
        )
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.masBranchName
              d.value = d.masBranchName
              this.DataBranchName.push(d)
            }
            this.masBranchName = this.DataBranchName[0]
          } else {
            this.DataBranchName = []
          }
        })
    },
    async getBookingData () {
      this.bookingData = []
      const dateSplit = this.today.split('-')
      const year = String(dateSplit[0])
      const month = String(dateSplit[1])
      let url = `${this.DNS_IP}/BookingData/get?shopId=${this.$session.getAll().data.shopId}&dueDate=${year}-${month}&masBranchName=${this.masBranchName.text}`
      await axios
        .get(url)
        .then(async response => {
          response.data.forEach((row) => {
            if (typeof (this.bookingData[row.bookNo]) === 'undefined') {
              this.bookingData[row.bookNo] = []
            }
            this.bookingData[row.bookNo].push(row)
          })
        })
    },
    async getBookingList () {
      this.getBookingData()
      // if (this.masBranchName) {
      //   this.masBranchName = this.masBranchName
      // } else {
      //   this.masBranchName = this.DataBranchName[0]
      // }
      // Clear Data ทุกครั้ง
      this.events = []
      // Clear ช่องค้นหา
      this.searchAll2 = ''
      const dateSplit = this.today.split('-')
      // console.log(dateSplit)
      // const date = dateSplit[0].split('-')
      const year = String(dateSplit[0])
      const month = String(dateSplit[1])
      this.countCus = this.masBranchName.countCus
      if (this.type === 'month') {
        let url = ''
        if (this.flowId === 'allFlow') {
          url = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.$session.getAll().data.shopId +
            '&dueDate=' +
            year +
            '-' +
            month +
            '&masBranchName=' +
            this.masBranchName.text
        } else {
          url = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.$session.getAll().data.shopId +
            '&dueDate=' +
            year +
            '-' +
            month +
            '&masBranchName=' +
            this.masBranchName.text +
            '&flowId=' + this.flowId
        }
        await axios
          .get(url)
          .then(async responses => {
            this.monthData = []
            this.eventInfo = []
            for (var x = 0; x < responses.data.length; x++) {
              var e = responses.data[x]
              let dueDate = e.dueDate
              dueDate = dueDate.split(' ')
              dueDate = dueDate[0]
              if (typeof this.eventInfo[dueDate] === 'undefined') {
                this.monthData[dueDate] = []
                this.eventInfo[dueDate] = {'timeDue': e.timeDue, 'all': 0, 'allPercent': 0, 'fastTrack': 0, 'extraJob': 0, 'normal': 0}
              }
              this.monthData[dueDate].push(e)
              if (e.statusBt) {
                if (e.statusBt === 'confirm' || e.statusBt === 'confirmJob') {
                  this.eventInfo[dueDate].all++
                  this.eventInfo[dueDate].allPercent = this.eventInfo[dueDate].all * 100 / this.countCus
                  if (e.fastTrack === 'True' || e.fastTrack === 'true') {
                    this.eventInfo[dueDate].fastTrack++
                  } else if (e.extraJob === 'True' || e.extraJob === 'true') {
                    this.eventInfo[dueDate].extraJob++
                  } else {
                    this.eventInfo[dueDate].normal++
                  }
                }
              }
            }
            this.dataReady = true
          })
      // -------   S T A R T   W E E K   ---------
      } else if (this.type === 'week') {
        let url = ''
        if (this.flowId === 'allFlow') {
          url = this.DNS_IP +
            '/booking_view/getCountNotime?shopId=' +
            this.$session.getAll().data.shopId +
            '&dueDate=' +
            year +
            '-' +
            month +
            '&masBranchName=' +
            this.masBranchName.text
        } else {
          url = this.DNS_IP +
            '/booking_view/getCountNotime?shopId=' +
            this.$session.getAll().data.shopId +
            '&dueDate=' +
            year +
            '-' +
            month +
            '&masBranchName=' +
            this.masBranchName.text +
            '&flowId=' + this.flowId
        }
        await axios
          .get(url)
          .then(async response => {
            this.dataReady = true
            this.countCus = this.masBranchName.countCus
            for (var i = 0; i < response.data.length; i++) {
              var d = response.data[i]
              var s = {}
              if (this.countCus > 0) {
                s.start = d.start
                d.d50 = parseInt((this.countCus / 100) * 50)
                d.d70 = parseInt((this.countCus / 100) * 70)
                d.d90 = parseInt((this.countCus / 100) * 90)
                if (parseInt(d.name) <= d.d50) {
                  s.color = 'blue'
                  s.name =
                  'คล่อง : ' +
                  d.name.toString() +
                  '/' +
                  this.countCus.toString()
                }
                if (parseInt(d.name) <= d.d70 && parseInt(d.name) >= d.d50) {
                  console.log('70')
                  s.color = 'deep-purple'
                  s.name =
                  'ติดขัด : ' +
                  d.name.toString() +
                  '/' +
                  this.countCus.toString()
                }
                if (parseInt(d.name) <= d.d90 && parseInt(d.name) >= d.d70) {
                  console.log('90')
                  s.color = 'red accent-1'
                  s.name =
                  'ติดขัด : ' +
                  d.name.toString() +
                  '/' +
                  this.countCus.toString()
                }
                if (parseInt(d.name) === this.countCus) {
                  s.color = 'red'
                  s.name =
                  'เต็ม : ' +
                  d.name.toString() +
                  '/' +
                  this.countCus.toString()
                }
                this.events.push(s)
              }
            }
            if (this.events.length === 0 || this.events.status === false) {
              this.events = []
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
            } else {
              let url = ''
              if (this.flowId === 'allFlow') {
                url = this.DNS_IP +
                  '/booking_view/getCount?shopId=' +
                  this.$session.getAll().data.shopId +
                  '&dueDate=' +
                  year +
                  '-' +
                  month +
                  '&masBranchName=' +
                  this.masBranchName.text
              } else {
                url = this.DNS_IP +
                  '/booking_view/getCount?shopId=' +
                  this.$session.getAll().data.shopId +
                  '&dueDate=' +
                  year +
                  '-' +
                  month +
                  '&masBranchName=' +
                  this.masBranchName.text +
                  '&flowId=' + this.flowId
              }
              await axios
                .get(url)
                .then(async responses => {
                  for (var x = 0; x < responses.data.length; x++) {
                    var e = responses.data[x]
                    var f = {}
                    // console.log(d)
                    if (e.statusBt) {
                      f.start = e.start + ' ' + e.timeDue + ':00'
                      f.end = e.start + ' ' + e.timeDue + ':30'
                      f.statusBt = e.statusBt
                      if (e.statusBt === 'confirm') {
                        f.color = 'green'
                        f.name =
                        'ยืนยัน เวลา ' +
                        e.timeDue +
                        ' โมง : ' +
                        e.name.toString()
                      } else if (e.statusBt === 'confirmJob') {
                        f.color = 'info'
                        f.name =
                        'รับรถ : ' +
                        e.name.toString()
                      } else {
                        f.color = 'red'
                        f.name =
                        'ยกเลิก เวลา ' +
                        e.timeDue +
                        ' โมง : ' +
                        e.name.toString()
                      }
                    } else {
                      f.start = e.start + ' ' + e.timeDue + ':00'
                      f.end = e.start + ' ' + e.timeDue + ':30'
                      f.statusBt = e.statusBt
                      f.color = 'orange'
                      f.name =
                      'รอยืนยัน เวลา ' +
                      e.timeDue +
                      ' โมง : ' +
                      e.name.toString()
                    }
                    this.events.push(f)
                  }
                })
            }
            console.log('events', this.events)
          })
        // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log(error)
            this.dataReady = true
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
          })
      }
    },
    openTaskList (date, type) {
      console.log('start TaskList')
      this.dataSummary = []
      this.dataCalendar = []
      let targetData = null
      if (type === 'fastTrack') {
        targetData = this.monthData[date].filter((row) => { return row.fastTrack === 'True' || row.fastTrack === 'true' })
      } else if (type === 'extraJob') {
        targetData = this.monthData[date].filter((row) => { return row.extraJob === 'True' || row.extraJob === 'true' })
      } else if (type === 'normal') {
        targetData = this.monthData[date].filter((row) => { return (row.fastTrack !== 'True' && row.fastTrack !== 'true') && (row.extraJob !== 'True' && row.extraJob !== 'true') })
      } else {
        targetData = this.monthData[date]
      }
      for (let i = 0; i < targetData.length; i++) {
        let d = targetData[i]
        d.chkConfirm = false
        d.chkCancel = false
        if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
          d.chkConfirm = true
          d.chkCancel = false
        }
        if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
          d.chkConfirm = false
          d.chkCancel = true
        }
        if (d.fastTrack === 'true' || d.fastTrack === 'True') {
          d.bgcolor = '#EF6C00'
        } else if (d.extraJob === 'true' || d.extraJob === 'True') {
          d.bgcolor = '#C62828'
        } else {
          d.bgcolor = '#1565C0'
        }
        d.name = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'ชื่อ' })
        d.licenseNo = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'เลขทะเบียน' })
        d.tel = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'เบอร์โทร' })
        d.carModel = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'รุ่นรถ' })
        d.name = (d.name.length > 0) ? d.name[0].fieldValue : ''
        d.licenseNo = (d.licenseNo.length > 0) ? d.licenseNo[0].fieldValue : ''
        d.tel = (d.tel.length > 0) ? d.tel[0].fieldValue : ''
        d.carModel = (d.carModel.length > 0) ? d.carModel[0].fieldValue : ''
        this.dataCalendar.push(d)
      }
      this.dataCalendar.sort((a, b) => {
        let keyA = new Date(a.dueDate)
        let keyB = new Date(b.dueDate)
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
        return 0
      })

      this.dataSummary = this.dataCalendar.reduce(function (r, a) {
        r[a.timeDue] = r[a.timeDue] || []
        r[a.timeDue].push(a)
        return r
      }, Object.create(null))
      console.log('dataSummary', this.dataSummary)
      this.dialog = true
    },
    async showEvent (event) {
      this.dataCalendar = []
      this.selectedEvent = event.event.start
      console.log('event', event.event)
      console.log('type', this.type)
      console.log('start', event.event.start + ' ' + event.event.timeDue)
      let url = ''
      if (this.type === 'week') {
        url = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            "&DATE_FORMAT(dueDate,'%%Y-%%m-%%d %%H')=" +
            moment(moment(new Date(event.event.start)), 'YYYY-MM-DD HH').format('YYYY-MM-DD HH') +
            '&statusBt=' + event.event.statusBt
      } else {
        url = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&dueDate=' + event.event.start + ' ' + event.event.timeDue +
            '&statusBt=' + event.event.statusBt
      }
      console.log('url', url)
      await axios
        .get(
          url
        )
        .then(async response => {
          console.log('getData', response.data)
          for (let i = 0; i < response.data.length; i++) {
            let d = response.data[i]
            d.chkConfirm = false
            d.chkCancel = false
            if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
              d.chkConfirm = true
              d.chkCancel = false
            }
            if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
              d.chkConfirm = false
              d.chkCancel = true
            }
            console.log('d.statusBt', d.statusBt)
            if (d.statusBt) {
              if (d.statusBt === 'confirm') {
                d.color = 'green'
              } else if (d.statusBt === 'confirmJob') {
                d.color = 'info'
              } else {
                d.color = 'red'
              }
            } else {
              d.color = 'orange'
            }
            d.name = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'ชื่อ' })
            d.licenseNo = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'เลขทะเบียน' })
            d.tel = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'เบอร์โทร' })
            d.carModel = this.bookingData[d.bookNo].filter((row) => { return row.fieldName === 'รุ่นรถ' })
            d.name = (d.name.length > 0) ? d.name[0].fieldValue : ''
            d.licenseNo = (d.licenseNo.length > 0) ? d.licenseNo[0].fieldValue : ''
            d.tel = (d.tel.length > 0) ? d.tel[0].fieldValue : ''
            d.carModel = (d.carModel.length > 0) ? d.carModel[0].fieldValue : ''
            this.dataCalendar.push(d)
          }
          this.dialog = true
        })
    },
    // async showEventre (event) {
    //   this.dataCalendar = []
    //   this.selectedEvent = event.event.start
    //   console.log('selectedEventweek', moment(moment(new Date(event.event.start)), 'YYYY-MM-DD HH').format('YYYY-MM-DD HH'))
    //   await axios
    //     .get(
    //       // eslint-disable-next-line quotes
    //       this.DNS_IP +
    //         '/booking_view/get?shopId=' +
    //         this.session.data.shopId +
    //         '&dueDate=' +
    //         event.event.start
    //     )
    //     .then(async response => {
    //       console.log('getData', response.data)
    //       for (let i = 0; i < response.data.length; i++) {
    //         let d = response.data[i]
    //         d.chkConfirm = false
    //         d.chkCancel = false
    //         if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
    //           d.chkConfirm = true
    //           d.chkCancel = false
    //         }
    //         if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
    //           d.chkConfirm = false
    //           d.chkCancel = true
    //         }
    //         console.log('d.statusBt', d.statusBt)
    //         if (d.statusBt) {
    //           if (d.statusBt === 'confirm') {
    //             d.color = 'green'
    //           } else if (d.statusBt === 'confirmJob') {
    //             d.color = 'info'
    //           } else {
    //             d.color = 'red'
    //           }
    //         } else {
    //           d.color = 'orange'
    //         }
    //         this.dataCalendar.push(d)
    //       }
    //       this.dialog = true
    //     })
    // },
    confirmChk (item) {
      console.log('item', item)
      this.$swal({
        title: 'ต้องการ บันทึกข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        var dt = {
          bookNo: item.bookNo,
          contactDate: this.format_date(new Date()),
          status: 'confirm',
          statusUse: 'use',
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
        }
        axios
          .post(this.DNS_IP + '/booking_transaction/add', dt)
          .then(response => {
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            this.getBookingList()
            console.log('addDataGlobal', response)
            this.dialog = false
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
      })
    },
    cancelChk (item) {
      // console.log('item', item)
      this.$swal({
        title: 'ต้องการ บันทึกข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        var dt = {
          bookNo: item.bookNo,
          contactDate: this.format_date(new Date()),
          status: 'cancel',
          statusUse: 'use',
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
        }
        axios
          .post(this.DNS_IP + '/booking_transaction/add', dt)
          .then(response => {
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            console.log('addDataGlobal', response)
            this.getBookingList()
            this.dialog = false
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
      })
    }
  }
}
</script>
<style scoped>
.vlistitem {
  background-color: #1B437C;
}
</style>
