<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <br>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
        </v-row>
        <v-card flat v-if="!overlay">
          <v-card-text>
            <div class="text-center">
              <waitingAlert></waitingAlert>
            </div>
          </v-card-text>
        </v-card>
        <template v-else>
        <v-form ref="form_search" v-model="validSearch" lazy-validation>
          <v-row>
            <v-col col="auto">
              <v-menu
                ref="menu"
                v-model="menuStart"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    hide-details
                    background-color="white"
                    v-model="dateStart"
                    style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                    label="เดือน/ปี"
                    readonly
                    outlined
                    dense
                    required
                    :rules ="[rules.required]"
                    v-bind="attrs"
                    v-on="on"
                  >
                  <template #prepend-inner>
                  <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                    mdi-calendar
                  </v-icon>
                </template></v-text-field>
                </template>
                <v-date-picker
                  @input="menuStart = false, checkSearch()"
                  v-model="dateStart"
                  type="month"
                  no-title
                  scrollable
                >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row style="justify-content: space-around;">
            <v-col cols="auto" style="display: flex;justify-content: center;">
              <v-card
                style="padding: 10px; width: 230px;"
                :color="(getSelectText === 'wait') ? '#DBDBDB' : 'white'"
                dense
                elevation="0"
                prominent
                @click="getSelect('wait'), getSelectText = 'wait'"
              >
                <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
                  <div class="text-center">
                    <v-avatar
                      size="70"
                      class="pa-3"
                      color="#c2c2c2"
                    >
                      <v-icon dark size="30" class="iconify" data-icon="ps:warning">
                      </v-icon>
                    </v-avatar>
                  </div>
                  <div style="margin: auto 0;">
                    <strong>ยังไม่ได้ยืนยัน</strong>
                    <div>จำนวน : {{countWait}}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="auto" style="display: flex;justify-content: center;">
              <v-card
                style="padding: 10px; width: 230px;"
                :color="(getSelectText === 'confirm') ? 'teal lighten-4' : 'white'"
                dense
                elevation="0"
                prominent
                @click="getSelect('confirm'), getSelectText = 'confirm'"
              >
                <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
                  <div class="text-center">
                    <v-avatar
                      size="70"
                      class="pa-3"
                      color="teal"
                    >
                      <v-icon dark size="30" class="iconify" data-icon="mdi:cash-check">
                      </v-icon>
                    </v-avatar>
                  </div>
                  <div style="margin: auto 0;">
                    <strong>ชำระเรียบร้อย</strong>
                    <div>จำนวน : {{countConfirm}}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="auto" style="display: flex;justify-content: center;">
              <v-card
                style="padding: 10px; width: 230px;"
                :color="(getSelectText === 'noCash') ? '#E0F4FF' : 'white'"
                dense
                icon="mdi-email-check"
                prominent
                elevation="0"
                @click="getSelect('noCash'), getSelectText = 'noCash'"
              >
              <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
                <div class="text-center">
                  <v-avatar
                    size="70"
                    color="#ade2ff"
                    style="padding:13px"
                  >
                    <v-icon dark size="40" class="iconify" data-icon="mdi:cash-remove">
                    </v-icon>
                  </v-avatar>
                </div>
                <div style="margin: auto 0;">
                  <strong>ไม่ได้ชำระ</strong>
                  <div>จำนวน : {{countNoCash}}</div>
                </div>
              </div>
              </v-card>
            </v-col>
            <v-col cols="auto" style="display: flex;justify-content: center;">
              <v-card
                style="padding: 10px; width: 230px;"
                :color="(getSelectText === 'finish') ? '#9FA8DA' : 'white'"
                dense
                icon="mdi-email-check"
                prominent
                elevation="0"
                @click="getSelect('finish'), getSelectText = 'finish'"
              >
              <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
                <div class="text-center">
                  <v-avatar
                    size="70"
                    color="#3F51B5"
                    style="padding:13px"
                  >
                    <v-icon dark size="40" class="iconify" data-icon="game-icons:finish-line">
                    </v-icon>
                  </v-avatar>
                </div>
                <div style="margin: auto 0;">
                  <strong>เสร็จสิ้น</strong>
                  <div>จำนวน : {{countFinish}}</div>
                </div>
              </div>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col cols="12">
            <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="itemBookingUse"
              :search="search"
              disable-pagination
              hide-default-footer
            >
            <template v-slot:[`item.dueDate`]="{ item }">
              {{ format_dateFUllTime(item.dueDate) }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <!-- <v-chip
                class="ma-2"
                color="primary"
                outlined
                pill
                v-if="item.paymentStatus === 'confirm'"
                @click="changStatus(item, 'finish')"
              >
                ชำระเรียบร้อย
                <v-icon right>
                  mdi-cash-check
                </v-icon>
              </v-chip> -->
              <v-btn
                v-if="item.paymentStatus === 'confirm'"
                color="primary"
                small
                dark
                @click="changStatus(item, 'finish')"
              >
                <v-icon > mdi-cash-check</v-icon>
                ชำระเรียบร้อย
              </v-btn>
              <v-btn
                v-if="item.paymentStatus === 'confirm'"
                color="orange"
                small
                dark
                @click="changStatus(item, 'wait')"
              >
                <v-icon >mdi-cash-sync</v-icon>
                ลูกค้าชำระอีกครั้ง
              </v-btn>
              <v-btn
                v-if="item.paymentStatus === 'wait'"
                color="success"
                small
                dark
                @click="changStatus(item, 'confirm')"
              >
                <v-icon > mdi-check-circle </v-icon>
                Confirm
              </v-btn>
            </template>
            <template v-slot:[`item.paymentImage`]="{ item }">
              <v-avatar color="primary" size="40" @click="gotoPicture(item.paymentImage)" v-if="item.paymentImage !== null">
                <img :src="item.paymentImage" alt="img"
              /></v-avatar>
            </template>
            </v-data-table>
          </v-card>
          </v-col>
        </v-row>
        </template>
        </div>
    </v-main>
  </div>
</template>
<script>
import waitingAlert from '../waitingAlert.vue'
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import moment from 'moment-timezone'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    waitingAlert
  },
  data () {
    return {
      countWait: 0,
      countConfirm: 0,
      countNoCash: 0,
      countFinish: 0,
      getSelectText: 'wait',
      validSearch: true,
      itemBooking: [],
      BookingDataList: [],
      menuStart: false,
      dialogPrint: false,
      overlay: true,
      time: '',
      timeavailable: [],
      branchItem: [],
      masBranchID: '',
      DataFlowItem: [],
      flowSelect: '',
      dateStart: '',
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'จัดการ Queue',
          disabled: false,
          href: '/Master/BookingListQueue'
        }
      ],
      dialog: false,
      dialogAdd: false,
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      search: '',
      shopName: '',
      shopImg: '',
      headers: [
        { text: 'ชื่อร้าน', value: 'shopName' },
        // { text: 'วันที่นัดหมาย', value: 'dueDate' },
        { text: 'เบอร์โทร', value: 'contactTel' },
        { text: 'สลิป', value: 'paymentImage' },
        { text: 'ราคาแพ็กเกจ', value: 'paymentAmount' },
        { text: 'สถานะ', value: 'paymentStatus' },
        { text: 'วันที่จ่าย', value: 'paymentDate' },
        { text: 'จัดการข้อมูล', value: 'action', sortable: false, align: 'center' }
      ],
      rules: {
        numberRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: value => value.length <= 10 || 'Max 10 characters',
        IDcardRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        required: value => !!value || 'กรุณากรอก.',
        resizeImag: value =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
        counterIDcard: value => value.length <= 13 || 'Max 13 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      itemBookingUse: []
    }
  },
  async mounted () {
    this.dateStart = moment(moment(new Date(), 'YYYY-MM').toDate()).format('YYYY-MM')
    this.checkSearch()
  },
  methods: {
    gotoPicture (Linkitem) {
      window.open(Linkitem, '_blank')
    },
    checkSearch () {
      // this.validate('SEARCH')
      // setTimeout(() => this.searchBooking(), 500)
      this.searchBooking()
    },
    async searchBooking () {
      this.countWait = 0
      this.countConfirm = 0
      this.countNoCash = 0
      this.countFinish = 0
      this.itemBooking = []
      this.itemBookingUse = []
      let urlApi = this.DNS_IP + '/system_shop_Payment/get?paymentStatus=not null&paymentDate=' + this.dateStart
      await axios
        .get(urlApi)
        .then(async response => {
          console.log('getData', response.data.length)
          let rs = response.data
          if (rs.status !== false) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              d.paymentStatus = d.paymentStatus || ''
              this.itemBooking.push(d)
            }
            // this.itemBookingUse = this.itemBooking.filter(el => { return el.paymentStatus === this.getSelectText })
          }
        })
      let urlApi1 = this.DNS_IP + '/system_shop_Payment/get?paymentStatus=is null'
      await axios
        .get(urlApi1)
        .then(async response => {
          let rs = response.data
          console.log('system_shop_Payment', rs)
          if (rs.status !== false) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              d.paymentStatus = d.paymentStatus || 'noCash'
              if (d.paymentStatus === 'noCash') {
                this.itemBooking.push(d)
              }
            }
          } else {
            this.itemBooking = []
            this.itemBookingUse = []
            this.countWait = 0
            this.countConfirm = 0
            this.countNoCash = 0
          }
        })
      this.countWait = this.itemBooking.filter(el => { return el.paymentStatus === 'wait' }).length
      this.countFinish = this.itemBooking.filter(el => { return el.paymentStatus === 'finish' }).length
      this.countConfirm = this.itemBooking.filter(el => { return el.paymentStatus === 'confirm' }).length
      this.countNoCash = this.itemBooking.filter(el => { return el.paymentStatus === 'noCash' }).length
      this.getSelect(this.getSelectText)
    },
    async changStatus (item, text) {
      let url = this.DNS_IP + '/system_shop_Payment/edit/' + item.id
      let dt = {
        paymentStatus: text,
        LAST_USER: this.$session.getAll().data.userName
      }
      // }
      await axios.post(url, dt).then(async (response) => {
        this.checkSearch()
      })
    },
    getSelect (text) {
      this.getSelectText = text
      this.itemBookingUse = this.itemBooking.filter(el => { return el.paymentStatus === this.getSelectText })
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
