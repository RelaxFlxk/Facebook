<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-dialog
      v-model="dialog"
      persistent
      max-width="750"
    >
      <v-card class="p-3">
        <v-timeline>
          <v-timeline-item
            v-for="(item , index) in timelineitem" :key="index"
            color="red lighten-2"
            small
          >
            <template v-slot:opposite>
              <span>ผู้รับผิดชอบ {{item.empStep}}</span>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="text-h5">
              </v-card-title>
              <v-card-text>
                วันที่เริ่ม {{item.CREATE_DATE}}
              </v-card-text>
              <v-card-text>
                วันที่เปลี่ยน {{item.endDate}}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <br>
        <div class="text-center">
          <v-btn
            small class="ma-2" color="primary"
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
                color="question"
                fab
                small
                @click="getJobitem(item) , dialog=true"
              >
                <v-icon dark> mdi-account-convert </v-icon>
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
      timelineitem: []
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
              s.rating = d.rating
              s.comment = d.comment
              s.typeWork = d.typeWork
              this.Ratingitem.push(s)
            }
          }
          console.log('rs', rs)
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getJobitem (item) {
      this.timelineitem = []
      await axios
        .get(this.DNS_IP + '/job_logCloseJob/' + item.refId).then((response) => {
          let rs = response.data
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.empStep = d.empStep
              s.endDate = d.endDate
              s.CREATE_DATE = d.CREATE_DATE
              this.timelineitem.push(s)
            }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
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
