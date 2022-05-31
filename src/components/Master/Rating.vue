<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
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
      <v-card class="p-3" style="background: linear-gradient(180deg, #FFFFFF 0%, #E1F3FF 100%);">
        <v-timeline>
          <v-timeline-item
            v-for="(item , index) in timelineitem" :key="index"
            :color="codeColor[index]"
            small
          >
            <template v-slot:opposite>
              <span>{{format_dateNotime(item.DTLAST_DATE)}}</span>
            </template>
            <v-card class="elevation-2 p-2">
              <v-card-title class="text-h6" style="color:#173053;">
              </v-card-title>
              <v-card-text>
                <p style="margin-bottom: 0px;color:#000000;">ขั้นตอน {{item.stepTitle}}</p>
                <!-- <p style="margin-bottom: 0px; color:#173053;">ขั้นตอน {{item.stepTitle}}</p> -->
                <p style="margin-bottom: 0px;"> เวลาที่รับงาน {{momenTime(item.DTLAST_DATE)}}</p>
                <p style="margin-bottom: 0px;"> ผู้รับผิดชอบ {{item.empStep}}</p>
                <p style="margin-bottom: 0px;">เวลาการทำงาน {{item.Counttime}} นาที</p>
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
                @click="getJobitem(item) , dialog=true"
              >
                <v-icon > mdi-account-convert </v-icon>
              </v-btn>
            </template>
            </v-data-table>
          </v-card>
          </v-col>
        </v-row>
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
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      search: '',
      headers: [
        { text: 'ID', value: 'refId' },
        { text: 'คะแนน', value: 'rating' },
        { text: 'ความคิดเห็นเพิ่มเติม', value: 'comment' },
        { text: 'ประเภทงาน', value: 'typeWork' },
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
      ]
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
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.refId = d.refId
              s.rating = parseInt(d.rating)
              s.comment = d.comment
              s.typeWork = d.typeWork
              this.Ratingitem.push(s)
            }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getJobitem (item) {
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
              s.stepTitle = d.stepTitle
              s.timediff = d.timediff
              s.Counttime = this.jsTimeDiff(d.CREATE_DATE, d.LAST_DATE)
              this.timelineitem.push(s)
            }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
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
