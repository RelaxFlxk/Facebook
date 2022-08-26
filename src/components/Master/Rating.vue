<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
        </v-row>
        <v-row>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600"
          >
            <v-card class="p-3">
              <v-timeline>
                <v-timeline-item
                  v-for="(item , index) in timelineitem" :key="index"
                  :color="codeColor[index]"
                  small
                >
                  <template v-slot:opposite>
                    <span>{{format_dateNotime(item.DTLAST_DATE)}}</span>
                  </template>
                  <v-card  class="elevation-2 p-2" :style="'border-top: 8px solid ' + codeColor[index]+ ';'">
                    <v-card-title class="text-h6" style="color:#173053;">
                    </v-card-title>
                    <v-card-text>
                      <p class="font-weight-black" style="margin-bottom: 0px;color:#000000;">ขั้นตอน {{item.stepTitle}}</p>
                      <!-- <p style="margin-bottom: 0px; color:#173053;">ขั้นตอน {{item.stepTitle}}</p> -->
                      <p v-if="item.stepTitle !== 'ปิดจ๊อบ'" class="font-weight-bold" style="margin-bottom: 0px;"> เวลาที่รับงาน {{momenTime(item.DTLAST_DATE)}}</p>
                      <p v-if="item.stepTitle !== 'ปิดจ๊อบ'" class="font-weight-bold" style="margin-bottom: 0px;"> ผู้รับผิดชอบ {{item.empStep}}</p>
                      <p v-if="item.stepTitle !== 'ปิดจ๊อบ'" class="font-weight-bold" style="margin-bottom: 0px;">เวลาการทำงาน {{item.Counttime}} นาที</p>
                      <p v-if="item.stepTitle === 'ปิดจ๊อบ'" class="font-weight-bold" style="margin-bottom: 0px;">สรุปค่าใช้จ่าย {{item.totalPrice}} บาท</p>
                      <!-- <p style="margin-bottom: 0px;">วันที่เปลี่ยน {{format_dateNotime(item.DTLAST_DATE)}}</p> -->
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
              <br>
              <div class="text-center">
                <v-btn
                  small class="ma-2" color="#173053" dark
                  @click="dialog = false"
                >
                  Close
                </v-btn>
              </div>
            </v-card>
          </v-dialog>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="Ratingitem"
              :search="search"
            >
          <template v-slot:[`item.displayName`]="{ item }">
              <v-avatar class="pa-2">
                <img
                  :src="item.pictureUrl"
                >
              </v-avatar>
              <strong v-html="item.displayName"></strong>
            </template>
          <template v-slot:[`item.rating`]="{ item }">
                <v-rating
                v-model="item.rating"
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$ratingFull"
                readonly
                small
              ></v-rating>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                color="#173053"
                fab
                small
                dark
                @click="getBookingData(item)"
              >
                <v-icon > mdi-account-details </v-icon>
              </v-btn>
              <v-btn
                color="#173053"
                fab
                small
                dark
                @click="getJobitem(item) , dialog=true"
              >
                <v-icon > mdi-timeline-clock </v-icon>
              </v-btn>
            </template>
            </v-data-table>
          </v-card>
          </v-col>
        </v-row>
        <v-dialog
            v-model="dialogBooking"
            persistent
            max-width="600"
          >
            <v-card class="p-3">
              <v-card-title>รายละเอียดนัดหมาย</v-card-title>
                  <v-card-text class="text-start">
                    <v-container>
                      <h6 class="font-weight-bold">วันที่นัดหมาย : {{format_dateThai(booking.dueDate)}}</h6>
                      <h6 class="font-weight-bold">ประเภทบริการ : {{booking.flowName}}</h6>
                      <h6 class="font-weight-bold">สาขา : {{booking.masBranchName}}</h6>
                      <v-row v-for="(item , index3) in bookingData" :key="index3">
                        <v-col v-if="item.fieldValue !== ''" col="6" class="pb-0"><strong>{{item.fieldName}} : </strong> {{item.fieldValue}}</v-col>
                      </v-row>
                      <v-row>
                        <h6 class="font-weight-bold" v-if="booking.remark">หมายเหตุเพิ่มเติม : {{booking.remark}}</h6>
                      </v-row>
                    </v-container>
                  </v-card-text>
              <br>
              <div class="text-center">
                <v-btn
                  block
                  small class="ma-2" color="error" dark
                  @click="dialogBooking = false"
                >
                  ตกลง
                </v-btn>
              </div>
            </v-card>
          </v-dialog>
        </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'ข้อมูลนัดหมาย',
          disabled: false,
          href: '/Master/Rating'
        }
      ],
      dialog: false,
      dialogBooking: false,
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      search: '',
      headers: [
        { text: 'วันที่', value: 'CREATE_DATE' },
        { text: 'ชื่อลูกค้า', value: 'displayName' },
        { text: 'คะแนน', value: 'rating' },
        { text: 'ความคิดเห็นเพิ่มเติม', value: 'comment' },
        { text: 'ดูรายละเอียดงาน', value: 'action', sortable: false, align: 'center' }
      ],
      Ratingitem: [],
      timelineitem: [],
      codeColor: [
        'rgb(142, 202, 230)',
        'rgb(33, 158, 188)',
        'rgb(2, 48, 71)',
        'rgb(241, 91, 76)',
        'rgb(255, 183, 3)',
        'rgb(251, 133, 0)',
        'rgb(61,90,128)',
        'rgb(152,193,217)',
        'rgb(224,251,252)',
        'rgb(255,212,91)',
        'rgb(238,108,77)',
        'rgb(41,50,65)'
      ],
      booking: [],
      bookingData: []
    }
  },
  async mounted () {
    this.getRating()
  },
  methods: {
    async getRating () {
      this.Ratingitem = []
      await axios
        .get(this.DNS_IP + '/rating/get?shopId=' + this.shopId).then((response) => {
          let rs = response.data
          console.log('show', rs)
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.id = d.id
              s.refId = d.refId
              s.rating = parseInt(d.rating)
              s.comment = d.comment
              s.typeWork = d.typeWork
              s.displayName = d.displayName
              s.pictureUrl = d.pictureUrl
              s.CREATE_DATE = this.format_dateNotime(d.CREATE_DATE)
              this.Ratingitem.push(s)
            }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getBookingData (item) {
      this.booking = []
      this.bookingData = []
      let urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&jobNo=' +
            item.refId
      await axios
        .get(urlApi)
        .then(async response => {
          console.log('getBookingData', response.data)
          if (response.data.status === false) {
            this.booking = []
            this.bookingData = []
            this.dialogBooking = false
            this.$swal('ผิดพลาด', 'ไม่มีข้อมูลนัดหมาย', 'error')
          } else {
            this.booking = response.data[0]
            await axios
              .get(`${this.DNS_IP}/BookingData/get?shopId=${this.session.data.shopId}&jobNo=${item.refId}`)
              .then(async responses => {
                console.log('BookingData', responses.data)
                if (responses.data.status === false) {
                  this.bookingData = []
                } else {
                  this.bookingData = responses.data
                }
              })
            this.dialogBooking = true
          }
        })
    },
    async getJobitem (item) {
      console.log('getJobitem', item)
      this.timelineitem = []
      await axios
        .get(this.DNS_IP + '/job_logCloseJob/' + item.refId).then((response) => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.empStep = d.empStep
              s.endDate = d.endDate
              s.totalPrice = s.totalPrice
              s.DTCREATE_DATE = d.CREATE_DATE
              s.DTLAST_DATE = d.LAST_DATE
              s.stepTitle = d.totalPrice === null ? d.stepTitle : 'ปิดจ๊อบ'
              s.timediff = d.timediff
              s.Counttime = this.convertHMS(this.jsTimeDiff(d.CREATE_DATE, d.LAST_DATE))
              s.totalPrice = d.totalPrice
              this.timelineitem.push(s)
            }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    convertHMS (value) {
      const sec = parseInt(value, 10) // convert value to number if it's string
      let hours = Math.floor(sec / 3600) // get hours
      let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
      let seconds = sec - (hours * 3600) - (minutes * 60) // get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) { hours = '0' + hours }
      if (minutes < 10) { minutes = '0' + minutes }
      if (seconds < 10) { seconds = '0' + seconds }
      return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
    },
    jsTimeDiff (Time1, Time2) {
      var oneday = 1000 * 60
      var defDate = (new Date(Time2).getTime() - new Date(Time1).getTime()) / oneday
      // console.log('def', Time1, Time2)
      return defDate
    },
    async clearData () {
      this.timelineitem = []
    }
  }
}
</script>
<style scope>
#margin {
  margin-top: 50px;
  margin-bottom: 40px;
}
.v_text_edit {
  Width: 255px;
  Height: 52px;
  font-size: 10px !important;
}
#subtext {
  color: #173053;
  font-size: 30px !important;
  font-weight: bold;
}
</style>
