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
          <v-col cols="4">
            <v-select
              :items="DataBranchName"
              v-model="masBranchName"
              @change="getBookingList()"
              dense
              outlined
              hide-details
              item-text="text"
              item-value="value"
              return-object
              label="สาขา"
              class="ma-2"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-alert
              color="primary"
              dark
              icon="mdi-account-clock"
              border="left"
              prominent
            >
              จำนวนลูกค้าต่อวัน : {{countCus || 0}}
            </v-alert>
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
                    locale="th-TH"
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
                          <v-list-item-subtitle>
                          <v-btn
                                color="success"
                                fab
                                id="v-step-2"
                                :disabled = items.chkConfirm
                                small
                                @click.stop="confirmChk(items)"
                              >
                                <v-icon dark> mdi-phone-check </v-icon>
                              </v-btn>
                              <v-btn
                                color="error"
                                fab
                                id="v-step-2"
                                small
                                :disabled = items.chkCancel
                                @click.stop="cancelChk(items)"
                              >
                                <v-icon dark> mdi-phone-cancel </v-icon>
                              </v-btn>
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
      countCus: 0,
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      menuDate: false,
      dialog: false,
      dataCalendar: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      DataBranchName: [],
      masBranchName: ''
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login')
    }
  },
  async mounted () {
    await this.getDataBranch()
  },
  methods: {
    getDataBranch () {
      this.DataBranchName = []
      axios.get(this.DNS_IP + '/master_branch/get?shopId=' + this.$session.getAll().data.shopId).then(async response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.masBranchName
            d.value = d.masBranchName
            this.DataBranchName.push(d)
          }
          this.masBranchName = this.DataBranchName[0]
          console.log('DataBranchName', this.DataBranchName)
          await this.getBookingList()
        } else {
          this.DataBranchName = []
        }
      })
    },
    async getBookingList () {
      console.log('masBranchName', this.masBranchName)
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
            this.$session.getAll().data.shopId + '&dueDate=' + year + '-' + month + '&masBranchName=' + this.masBranchName.text
        )
        .then(async response => {
          console.log('getData', response.data)
          this.dataReady = true
          this.countCus = this.masBranchName.countCus
          for (var i = 0; i < response.data.length; i++) {
            var d = response.data[i]
            var s = {}
            console.log('d', d)
            if (this.countCus > 0) {
              s.start = d.start
              d.d50 = parseInt((this.countCus / 100) * 50)
              d.d70 = parseInt((this.countCus / 100) * 70)
              d.d90 = parseInt((this.countCus / 100) * 90)
              console.log('d.d', parseInt(d.name), d.d50, d.d70, d.d90)
              if (parseInt(d.name) <= d.d50) {
                console.log('50')
                s.color = 'blue'
                s.name = 'คล่อง : ' + d.name.toString() + '/' + this.countCus.toString()
              } if (parseInt(d.name) <= d.d70 && parseInt(d.name) >= d.d50) {
                console.log('70')
                s.color = 'deep-purple'
                s.name = 'ติดขัด : ' + d.name.toString() + '/' + this.countCus.toString()
              } if (parseInt(d.name) <= d.d90 && parseInt(d.name) >= d.d70) {
                console.log('90')
                s.color = 'red accent-1'
                s.name = 'ติดขัด : ' + d.name.toString() + '/' + this.countCus.toString()
              } if (parseInt(d.name) === this.countCus) {
                s.color = 'red'
                s.name = 'เต็ม : ' + d.name.toString() + '/' + this.countCus.toString()
              }
              this.events.push(s)
            }
          }
          if (this.events.length === 0 || this.events.status === false) {
            this.events = []
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          } else {
            for (var x = 0; x < response.data.length; x++) {
              var e = response.data[x]
              var f = {}
              // console.log(d)
              if (f.statusBt) {
                f.start = e.start
                if (f.statusBt === 'confirm') {
                  f.color = 'green'
                  f.name = e.statusBt + ' : ' + e.name.toString()
                } else {
                  f.color = 'red'
                  f.name = e.statusBt + ' : ' + e.name.toString()
                }
              } else {
                f.start = e.start
                f.color = 'orange'
                f.name = 'wait' + ' : ' + e.name.toString()
              }
              this.events.push(f)
            }
          }
          console.log('events', this.events)
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
    },
    async showEventre (event) {
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
    },
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
      })
        .then(async (result) => {
          var dt = {
            bookNo: item.bookNo,
            contactDate: this.format_dateFUllTime(new Date()),
            status: 'confirm',
            statusUse: 'use',
            shopId: this.$session.getAll().data.shopId,
            CREATE_USER: this.session.data.userName,
            LAST_USER: this.session.data.userName
          }
          axios
            .post(
              this.DNS_IP + '/booking_transaction/add', dt
            )
            .then(response => {
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              this.getBookingList()
              console.log('addDataGlobal', response)
              this.dialog = false
            })
            .catch((error) => {
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
      })
        .then(async (result) => {
          var dt = {
            bookNo: item.bookNo,
            contactDate: this.format_dateFUllTime(new Date()),
            status: 'cancel',
            statusUse: 'use',
            shopId: this.$session.getAll().data.shopId,
            CREATE_USER: this.session.data.userName,
            LAST_USER: this.session.data.userName
          }
          axios
            .post(
              this.DNS_IP + '/booking_transaction/add', dt
            )
            .then(response => {
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              console.log('addDataGlobal', response)
              this.getBookingList()
              this.dialog = false
            })
            .catch((error) => {
              console.log('error function addData : ', error)
            })
        })
    }
  }
}
</script>
