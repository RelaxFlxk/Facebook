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
            <v-col cols="auto" class="pt-0">
              <v-btn
                color="warning"
                block
                class="mt-4"
                style="border-radius: 20px !important;margin-right: 0px;box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.4), 0px 5px 15px rgba(162, 171, 198, 0.6);"
                @click="checkSearch()"
              ><v-icon color="white" left>mdi-account-reactivate</v-icon>รีเฟรชข้อมูล</v-btn>
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
            <v-col cols="auto" style="display: flex;justify-content: center;">
              <v-card
                style="padding: 10px; width: 230px;"
                :color="(getSelectText === 'inactive') ? 'error lighten-4' : 'white'"
                dense
                elevation="0"
                prominent
                @click="getSelect('inactive'), getSelectText = 'inactive'"
              >
                <div style="display: flex;justify-content: space-around;flex-wrap: wrap;">
                  <div class="text-center">
                    <v-avatar
                      size="70"
                      class="pa-3"
                      color="error"
                    >
                      <v-icon dark size="30" class="iconify" data-icon="lucide:shield-close">
                      </v-icon>
                    </v-avatar>
                  </div>
                  <div style="margin: auto 0;">
                    <strong>Inactive</strong>
                    <div>จำนวน : {{countInactive}}</div>
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
                v-if="item.paymentStatus === 'confirm' || item.paymentStatus === 'finish'"
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
                Active
              </v-btn>
              <v-btn
                v-if="item.paymentStatus === 'inactive'"
                color="success"
                small
                dark
                @click="changStatus(item, 'inactiveToactive')"
              >
                <v-icon > mdi-check-circle </v-icon>
                Active
              </v-btn>
              <v-btn
                v-if="item.paymentStatus === 'wait' || item.paymentStatus === 'noCash'"
                color="error"
                small
                dark
                @click="changStatus(item, 'inactive')"
              >
                <v-icon > mdi-close-circle </v-icon>
                Inactive
              </v-btn>
            </template>
            <template v-slot:[`item.paymentImage`]="{ item }">
              <v-avatar color="primary" size="40" @click="gotoPicture(item.paymentImage)" v-if="item.paymentImage !== null">
                <img :src="item.paymentImage" alt="img"
              /></v-avatar>
            </template>
            <template v-slot:[`item.shopName`]="{ item }">
              <v-row>
                <v-col cols="12">
                  <a @click.stop="openDetail(item)" style="cursor:hand"><u>{{ item.shopName }}</u></a>
                </v-col>
              </v-row>
            </template>
            </v-data-table>
          </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogDetails" scrollable persistent max-width="500px">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="8" class="text-left pt-10">
                      <h3><strong>รายละเอียดนัดหมาย</strong></h3>
                    </v-col>
                    <v-col cols="4" class="pt-10">
                      <div style="text-align: end;">
                        <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="dialogDetails = false"
                          >
                          X
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row >
                    <v-col cols="12">
                      <v-card-text v-if="itemPayMent">
                        <div class="avatar text-center">
                          <v-avatar size="120" style="border:5px solid #FFFFFF;">
                          <v-img
                            v-if="itemPayMent.shopImge"
                            :src="itemPayMent.shopImge"
                          ></v-img>
                          <v-icon size="100" color="orange" v-else>
                            mdi-tooltip-account
                          </v-icon>
                        </v-avatar>
                        </div>
                        <div class="text-center">
                          <h3>{{itemPayMent.shopName}}</h3>
                        </div>
                        <v-row>
                          <v-col cols="12" class="pb-0">
                            <h4>เลขประจำตัวผู้เสียภาษี : {{itemPayMent.billingTax}}</h4>
                          </v-col>
                          <v-col cols="12" class="pb-0">
                            <h4>ชื่อ-สกุล : {{itemPayMent.billingCusName}}</h4>
                          </v-col>
                          <v-col cols="12" class="pb-0">
                            <h4>เบอร์โทร : {{itemPayMent.billingPhone || itemPayMent.contactTel}}</h4>
                          </v-col>
                          <v-col cols="12" class="pb-0">
                            <h4>อีเมล : {{itemPayMent.contactEmail}}</h4>
                          </v-col>
                          <v-col cols="12" class="pb-0">
                            <h4>ที่อยู่ : {{itemPayMent.billingAddress}}</h4>
                          </v-col>
                          <v-col cols="12" class="pb-0">
                            <h4>ราคาแพ็คเกจ : {{itemPayMent.paymentAmount}}</h4>
                          </v-col>
                          <v-col cols="12" class="pt-0">
                            <h4>รอบชำระ : {{itemPayMent.paymentDateMonthYear}}</h4>
                          </v-col>
                        </v-row>
                        <br>
                          <div class="text-center" v-if="itemPayMent.paymentImage !== ''">
                            <h6><strong>หลักฐานเงินมัดจำ</strong></h6>
                          </div>
                      </v-card-text>
                      <v-card-text>
                        <v-container>
                          <v-img
                            v-if="itemPayMent.paymentImage !== ''"
                            class="pa-3"
                            contain
                            max-height="100%"
                            max-width="100%"
                            @click="gotoPicture(itemPayMent.paymentImage)"
                            :src="itemPayMent.paymentImage"
                          ></v-img>
                        </v-container>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
        </v-dialog>
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
      countInactive: 0,
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
        { text: 'เบอร์โทร', value: 'billingPhone' },
        { text: 'email', value: 'contactEmail' },
        { text: 'จำนวนนัดหมายที่สร้างของเดือนที่แล้ว', value: 'countBooking' },
        { text: 'สลิป', value: 'paymentImage' },
        { text: 'ราคาแพ็กเกจ', value: 'paymentAmount' },
        { text: 'สถานะ', value: 'paymentStatus' },
        { text: 'วันที่จ่าย', value: 'paymentDate' },
        { text: 'วันวันที่สิ้นสุดทดลองใช้', value: 'trialsVersionDate' },
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
      itemBookingUse: [],
      itemPayMent: [],
      itemCountBooking: [],
      dialogDetails: false
    }
  },
  async mounted () {
    this.dateStart = moment(moment(new Date(), 'YYYY-MM').toDate()).format('YYYY-MM')
    this.checkSearch()
  },
  methods: {
    openDetail (item) {
      this.itemPayMent = item
      this.dialogDetails = true
    },
    gotoPicture (Linkitem) {
      window.open(Linkitem, '_blank')
    },
    checkSearch () {
      // this.validate('SEARCH')
      // setTimeout(() => this.searchBooking(), 500)
      this.searchBooking()
    },
    async getCountBooking () {
      this.itemCountBooking = []
      let urlApi = this.DNS_IP + '/Booking/getCountBooking'
      await axios
        .get(urlApi)
        .then(async response => {
          let rs = response.data
          if (rs.status !== false) {
            this.itemCountBooking = rs
          } else {
            this.itemCountBooking = []
          }
        })
    },
    async searchBooking () {
      await this.getCountBooking()
      this.countWait = 0
      this.countConfirm = 0
      this.countNoCash = 0
      this.countFinish = 0
      this.countInactive = 0
      this.itemBooking = []
      this.itemBookingUse = []
      let urlApi = this.DNS_IP + '/system_shop_Payment/get?paymentStatus=not null&paymentDate=' + this.dateStart
      await axios
        .get(urlApi)
        .then(async response => {
          console.log('system_shop_Payment', response.data)
          let rs = response.data
          if (rs.status !== false) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              d.billingPhone = d.billingPhone || d.contactTel
              d.paymentStatus = d.paymentStatus || ''
              if (this.itemCountBooking.filter(el => { return el.shopId === d.shopId }).length > 0) {
                d.countBooking = this.itemCountBooking.filter(el => { return el.shopId === d.shopId })[0].countBooking
              } else {
                d.countBooking = 0
              }
              if (d.shopActive === 'inactive') {
                d.paymentStatus = 'inactive'
              }
              this.itemBooking.push(d)
            }
            // this.itemBookingUse = this.itemBooking.filter(el => { return el.paymentStatus === this.getSelectText })
          }
        })
      let urlApi1 = this.DNS_IP + '/system_shop_Payment/get?accountTest=False'
      // let urlApi1 = this.DNS_IP + '/system_shop_Payment/get?paymentStatus=is null&NopaymentDate=' + this.dateStart
      await axios
        .get(urlApi1)
        .then(async response => {
          let rs = response.data
          console.log('system_shop_Payment', rs)
          if (rs.status !== false) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              d.billingPhone = d.billingPhone || d.contactTel
              // d.paymentStatus = d.paymentStatus || 'noCash'
              console.log(this.itemBooking.filter(el => { return el.shopId === d.shopId_Shop }))
              if (this.itemBooking.filter(el => { return el.shopId === d.shopId_Shop }).length === 0) {
                if (this.itemCountBooking.filter(el => { return el.shopId === d.shopId_Shop }).length > 0) {
                  d.countBooking = this.itemCountBooking.filter(el => { return el.shopId === d.shopId_Shop })[0].countBooking
                } else {
                  d.countBooking = 0
                }
                d.paymentStatus = 'noCash'
                if (d.paymentStatus === 'noCash') {
                  if (d.shopActive === 'inactive') {
                    d.paymentStatus = 'inactive'
                  }
                  this.itemBooking.push(d)
                }
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
      this.countInactive = this.itemBooking.filter(el => { return el.paymentStatus === 'inactive' }).length
      this.getSelect(this.getSelectText)
    },
    async changStatus (item, text) {
      let textShow = ''
      if (text === 'finish') {
        textShow = 'ชำระเรียบร้อย'
      } else if (text === 'wait') {
        textShow = 'ลูกค้าชำระอีกครั้ง'
      } else if (text === 'confirm') {
        textShow = 'Active'
      } else if (text === 'inactive') {
        textShow = 'Inactive'
      }
      console.log('changStatus', item, text)
      this.$swal({
        title: 'ต้องการเปลี่ยนแปลงสถานะเป็น ' + textShow + ' ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          if (item.id) {
            let url = this.DNS_IP + '/system_shop_Payment/edit/' + item.id
            let dt = {
              paymentStatus: text,
              LAST_USER: this.$session.getAll().data.userName
            }
            // }
            await axios.post(url, dt).then(async (response) => {
              if (text === 'inactive') {
                await this.updateShopActive('inactive', item)
                this.checkSearch()
              } else if (text === 'confirm') {
                if (item.shopActive === 'inactive') {
                  await this.updateShopActive('active', item)
                  this.checkSearch()
                } else {
                  this.checkSearch()
                }
              } else {
                this.checkSearch()
              }
            })
          } else {
            if (text === 'inactive') {
              await this.updateShopActive('inactive', item)
              this.checkSearch()
            } else if (text === 'inactiveToactive') {
              await this.updateShopActive('active', item)
              this.checkSearch()
            } else {
              this.$swal(
                'พบความผิดพลาดระหว่างดำเนินการ',
                'ไม่มีข้อมูลร้านค้า',
                'info'
              )
            }
          }
        })
    },
    async updateShopActive (text, item) {
      var ds = {
        shopActive: text,
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/sys_shop/edit/" + item.shopId,
          ds
        )
        .then(async (response) => {
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
