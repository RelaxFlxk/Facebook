<template>
  <div>
    <v-card flat v-if="!dataReady">
      <v-card-text>
        <div class="text-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>

          <v-progress-circular
            :width="3"
            color="red"
            indeterminate
          ></v-progress-circular>

          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>

          <v-progress-circular
            :width="3"
            color="green"
            indeterminate
          ></v-progress-circular>

          <v-progress-circular
            :size="50"
            color="amber"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
    <v-card flat v-if="dataReady">
      <v-toolbar color="#173053" dark extended flat>
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      </v-toolbar>

      <v-card class="mx-auto" max-width="700" style="margin-top: -64px;">
        <v-toolbar flat>
          <v-toolbar-title class="#173053--text">
            {{ dataItem[0].cusName }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn color="#173053" icon @click="toggle">
            <v-icon>mdi-calendar-multiple-check</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text style="height: 100%;">
          <v-container>
            <template v-if="BookingDataItemEdit">
              <v-row class="InputData">
                  <v-text-field
                    v-model="BookingDataItemEdit[0].masBranchName"
                    label="สาขา"
                    class="pa-2 pb-0 pt-0"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
              <v-row class="InputData">
                  <v-text-field
                    v-model="BookingDataItemEdit[0].flowName"
                    label="ประเภทบริการ"
                    class="pa-2 pb-0 pt-0"
                    outlined
                    dense
                    readonly
                  ></v-text-field>
                </v-row>
              <div
                v-for="(item, index) in BookingDataItemEdit"
                :key="index"
              >
                <template
                  v-if="
                    item.conditionField === '' ||
                      item.conditionField === null
                  "
                >
                  <v-row class="InputData">
                    <v-text-field
                      v-model="item.fieldValue"
                      :label="item.fieldName"
                      class="pa-2 pb-0 pt-0"
                      outlined
                      dense
                      readonly
                    ></v-text-field>
                    <v-icon class="pa-3 pb-10 pt-0" v-if="item.fieldName === 'เบอร์โทร'" large color="#64DD17" @click="dial(item.phone)">call</v-icon>
                  </v-row>
                </template>
                <template
                  v-if="
                    item.conditionField !== '' &&
                      BookingDataItemEdit.filter(row => {
                        return (
                          row.fieldId ===
                          parseInt(item.conditionField)
                        );
                      }).length > 0
                  "
                >
                  <template
                    v-if="
                      item.conditionValue ===
                        BookingDataItemEdit.filter(row => {
                          return (
                            row.fieldId ===
                            parseInt(item.conditionField)
                          );
                        })[0].fieldValue
                    "
                  >
                    <v-row class="InputData">
                      <v-text-field
                        v-model="item.fieldValue"
                        :label="item.fieldName"
                        outlined
                        readonly
                        class="pa-2 pb-0 pt-0"
                        dense
                      ></v-text-field>
                      <v-icon class="pa-3 pb-10 pt-0" v-if="item.fieldName === 'เบอร์โทร'" large color="#64DD17" @click="dial(item.phone)">call</v-icon>
                    </v-row>
                  </template>
                </template>
                  <template  v-if="item.conditionField === 'flow' ">
                    <template v-if="parseInt(item.conditionValue) === parseInt(flowIdSelect) ">
                      <v-row class="InputData">
                        <v-text-field
                          v-model="item.fieldValue"
                          :label="item.fieldName"
                          dense
                          readonly
                          class="pa-2 pb-0 pt-0"
                          outlined
                        ></v-text-field>
                        <v-icon class="pa-3 pb-10 pt-0" v-if="item.fieldName === 'เบอร์โทร'" large color="#64DD17" @click="dial(item.phone)">call</v-icon>
                      </v-row>
                    </template>
                  </template>
              </div>
            </template>
            <v-row class="InputData">
              <v-text-field
                v-model="BookingDataItem[0].fieldValue"
                :label="BookingDataItem[0].fieldName"
                class="pa-2 pb-0 pt-0"
                outlined
                dense
                readonly
              ></v-text-field>
            </v-row>
            <!-- <v-col
              v-for="(item, indexitem) in BookingDataItem"
              :key="indexitem"
              cols="12"
              class="pa-1"
            >
            <v-row class="pa-0 pb-0 pt-0">
              <v-text-field
                :label="item.fieldName"
                :value="item.fieldValue"
                class="pa-2 pb-3 pt-0"
                outlined
                dense
                readonly
              >
              </v-text-field>
              <v-icon class="pa-3 pb-10 pt-0" v-if="item.fieldName === 'เบอร์โทร'" large color="#64DD17" @click="dial(item.phone)">call</v-icon>
              </v-row>
            </v-col> -->
            <v-col cols='12' class="pb-0 pt-0 mt-0">
              <v-radio-group v-model="radiosRemark" row>
                <!-- <template v-slot:label>
                  <div>Your favourite <strong>search engine</strong></div>
                </template> -->
                <v-radio value="ซ่อมปกติ">
                  <template v-slot:label>
                    <div class="mt-3"><strong class="primary--text">ซ่อมปกติ</strong></div>
                  </template>
                </v-radio>
                <v-radio value="ExtraJob">
                  <template v-slot:label>
                    <div class="mt-3"><strong class="error--text">Extra Job</strong></div>
                  </template>
                </v-radio>
                <v-radio value="FastTrack">
                  <template v-slot:label>
                    <div class="mt-3"><strong class="orange--text">Fast Track</strong></div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
            <div class="text-center">
              <v-btn
                color="success"
                fab
                id="v-step-2"
                v-if="
                  dataItem[0].statusBt !== 'confirmJob' &&
                    dataItem[0].statusBt !== 'confirm'
                "
                :disabled="dataItem[0].chkConfirm"
                small
                @click.stop="confirmChk(dataItem[0])"
              >
                <v-icon dark> mdi-phone-check </v-icon>
              </v-btn>
              <v-btn
                color="warning"
                fab
                id="v-step-2"
                small
                @click.stop="setDataChang(dataItem[0])"
              >
                <v-icon> mdi-calendar-clock </v-icon>
              </v-btn>
              <v-btn
                color="error"
                fab
                id="v-step-2"
                v-if="
                  dataItem[0].statusBt !== 'cancel' &&
                    dataItem[0].statusBt !== 'confirmJob'
                "
                small
                @click.stop="setDataRemove(dataItem[0])"
              >
                <v-icon dark> mdi-phone-cancel </v-icon>
              </v-btn>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-card>
    <v-dialog v-model="dialogChange" persistent max-width="90%">
      <v-card class="text-center">
        <v-card-title>เปลี่ยนเวลานัดหมาย</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" class="pt-0 pb-0">
              <v-menu
                v-model="menuDateChange"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formChange.date"
                    label="วันที่"
                    prepend-icon="mdi-calendar"
                    readonly
                    outlined
                    dense
                    v-bind="attrs"
                    v-on="on"
                    required
                    :rules="[rules.required]"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formChange.date"
                  @input="menuDateChange = false"
                  :min="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" class="pt-0 pb-0">
              <v-select
                  v-model="formChange.time"
                  :items="timeavailable"
                  label="เวลา"
                  menu-props="auto"
                  outlined
                  dense
                  required
                  :rules ="[rules.required]"
                ></v-select>
            </v-col>
          </v-row>
          <div class="text-center">
            <v-btn
              elevation="10"
              color="#173053"
              dark
              small
              @click="changeChk(dataChange)"
              >เปลี่ยนเวลานัดหมาย</v-btn
            >
          </div>
          <div class="text-center">
            <v-btn
              elevation="10"
              color="#173053"
              outlined
              style="background-color:#FFFFFF"
              small
              @click="dialogChange = false"
              >ยกเลิก</v-btn
            >
          </div>
        </v-card-text>
        <br />
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogConfirm" max-width="70%">
            <v-card class="text-center">
              <v-card-title>
                ยืนยันรายการนี้
              </v-card-title>
              <v-card-text>
                <v-container>
                <v-row>
                  <v-select
                    v-model="empSelect"
                    :items="empSelectStep"
                    label="พนักงานที่รับนัดหมาย"
                    menu-props="auto"
                    outlined
                    dense
                  ></v-select>
                </v-row>
                <div class="text-center">
                  <v-btn
                    elevation="10"
                    color="#173053"
                    dark
                    small
                    @click="onConfirm(dataConfirm)"
                    >ยืนยันรายการนี้</v-btn
                  >
                  <v-btn
                    elevation="10"
                    color="#173053"
                    outlined
                    style="background-color:#FFFFFF"
                    small
                    @click="dialogConfirm = false"
                    >ยกเลิก</v-btn
                  >
                </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogRemove" max-width="70%">
            <v-card class="text-center">
              <v-card-title>
                ยกเลิกรายการนี้
              </v-card-title>
              <v-card-text>
                <v-container>
                <v-row>
                  <v-textarea
                    v-model="remarkRemove"
                    outlined
                    label="หมายเหตุในการยกเลิก"
                    auto-grow
                  ></v-textarea>
                </v-row>
                <v-row>
                  <v-select
                    v-model="empSelect"
                    :items="empSelectStep"
                    label="พนักงานที่รับนัดหมาย"
                    menu-props="auto"
                    outlined
                    dense
                  ></v-select>
                </v-row>
                <div class="text-center">
                  <v-btn
                    elevation="10"
                    color="#173053"
                    dark
                    small
                    @click="cancelChk()"
                    >ยกเลิกรายการนี้</v-btn
                  >
                  <v-btn
                    elevation="10"
                    color="#173053"
                    outlined
                    style="background-color:#FFFFFF"
                    small
                    @click="dialogRemove = false"
                    >ยกเลิก</v-btn
                  >
                </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <BookingQueue :branchParent="branch" :masBranchIDParent="masBranchID" :drawerParent="drawer" :menu1Parent="menu1" :timeTableParent="timeTable" :rulesParent="rules" :masterTimeParent="masterTime" :dataItemTimesChangeParent="dataItemTimesChange" :getTimesChangeParent="getTimesChange" :toggleParent="toggle" @updateTimeTable="updateTimeTablefromChild"></BookingQueue>
  </div>
</template>
<script>
import axios from 'axios' // api
import moment from 'moment-timezone'
import BookingQueue from './BookingQueueMobile.vue'
export default {
  components: {
    BookingQueue
  },
  name: 'BookingList',
  data () {
    return {
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
      menuDateChange: false,
      menu1: false,
      session: this.$session.getAll(),
      dataItem: [],
      dataItemBooking: [],
      dataItemTimesChange: [],
      BookingDataItem: [],
      dataItemCheck: [],
      dataReady: false,
      getSelectText: '',
      timeTable: '',
      radiosRemark: 'ซ่อมปกติ',
      getSelectCount: 0,
      dialogEdit: false,
      dialogDelete: false,
      dialogChange: false,
      dialogJob: false,
      dialogConfirm: false,
      dialogRemove: false,
      drawer: false,
      formChange: {
        date: '',
        time: ''
      },
      masterTime: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      timeavailable: [],
      empSelectStep: [],
      dataConfirm: [],
      empSelect: '',
      bookNoRemove: '',
      remarkRemove: '',
      masBranchID: '',
      branch: [],
      BookingDataList: [],
      BookingDataItemEdit: [],
      BookingDataListTimechange: [],
      dateStart: '',
      flowIdSelect: ''
    }
  },
  async mounted () {
    await this.beforeCreate()
  },
  methods: {
    async beforeCreate () {
    // if (!this.$session.exists()) {
    //   this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId)
    // }
      // console.log(JSON.parse(localStorage.getItem('sessionData')))
      if (JSON.parse(localStorage.getItem('sessionData')) !== null) {
        if (JSON.parse(localStorage.getItem('sessionData')).shopId === this.$route.query.shopId) {
          await this.chkBookingNo()
          await this.getDataBranch()
        } else {
          this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId)
        }
      } else {
        if (!this.$session.exists()) {
          this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId)
        } else {
          if (this.session.data.shopId === this.$route.query.shopId) {
            localStorage.setItem('sessionData', JSON.stringify(this.session.data))
            await this.chkBookingNo()
            await this.getDataBranch()
          } else {
            this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId)
          }
        }
      }
      console.log(JSON.stringify(this.session.data))
    },
    getDataFromFieldName (data, key) {
      return data.filter(function (el) {
        return el.fieldName === key
      })
    },
    updateTimeTablefromChild (timeTable) {
      this.timeTable = timeTable
    },
    async getDataBranch () {
      this.branch = await this.getDataFromAPI('/master_branch/get', 'masBranchID', 'masBranchName')
    },
    async getDataFromAPI (url, fieldId, fieldName) {
      let result = []
      await axios
        .get(this.DNS_IP + `${url}?shopId=${this.$route.query.shopId}`)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d[fieldName]
              s.value = d[fieldId]
              s.allData = d
              result.push(s)
              // console.log('this.DataFlowName', this.DataFlowName)
            }
          } else {
            result = []
          }
        })
      return result
    },
    dial: function (number) {
      window.location = 'tel:' + number
    },
    toggle () {
      this.timeTable = this.momenDate_1(new Date())
      this.getTimesChange('update')
      this.drawer = !this.drawer
    },
    async getTimesChange (text) {
      try {
        this.dataItemTimesChange = []
        // console.log('this.dataItem', this.dataItem.filter(el => { return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable }))
        if (text === 'all') {
          this.dataItemTimesChange = this.dataItemBooking
        } else {
          if (moment(moment(this.timeTable, 'YYYY-MM').toDate()).format('YYYY-MM') === this.dateStart) {
            console.log('month old')
            this.dataItemTimesChange = this.dataItemBooking.filter(el => {
              let dueDate = moment(moment(el.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
              return dueDate === this.timeTable
            // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
            }).sort((a, b) => {
              if (a.timeDuetext < b.timeDuetext) return -1
              return a.timeDuetext > b.timeDuetext ? 1 : 0
            })
          } else {
            var data = this.dataItemCheck.filter(el => {
              let dueDate = moment(moment(el.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
              return dueDate === this.timeTable
            // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
            })
            console.log('data', data)
            if (data.length === 0) {
              if (this.masBranchID) {
                this.masBranchID = this.masBranchID
              } else {
                if (this.branch.length > 0) {
                  this.masBranchID = this.branch[0].value
                } else {
                  this.masBranchID = ''
                }
              }
              this.dataItemCheck = []
              var dataItems = []
              // var dataItemTimes = []
              var dateStart = moment(moment(this.timeTable, 'YYYY-MM').toDate()).format('YYYY-MM')
              console.log('dateStartxx', dateStart)
              await this.getBookingDataListTimechange(dateStart)
              await axios
                .get(
                  // eslint-disable-next-line quotes
                  this.DNS_IP +
                    '/booking_view/get?shopId=' +
                    this.$route.query.shopId +
                    '&masBranchID=' +
                    this.masBranchID +
                    '&dueDate=' + moment(moment(this.timeTable, 'YYYY-MM').toDate()).format('YYYY-MM')
                )
                .then(async response => {
                  console.log('getData', response.data)
                  if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                      let d = response.data[i]
                      let s = {}
                      s.bookNo = d.bookNo
                      s.flowId = d.flowId
                      s.flowName = d.flowName
                      s.dueDate = d.dueDate
                      s.userId = d.userId
                      s.chkConfirm = false
                      s.chkCancel = false
                      s.jobNo = d.jobNo
                      s.remarkRemove = d.remarkRemove || ''
                      s.timeDueHtext = d.timeDueH + ':00'
                      s.timeDuetext = d.timeDue
                      s.extraJob = (d.extraJob === 'true' || d.extraJob === 'True')
                      s.fastTrack = (d.fastTrack === 'true' || d.fastTrack === 'True')
                      if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                        s.chkConfirm = true
                        s.chkCancel = false
                      }
                      if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                        s.chkConfirm = false
                        s.chkCancel = true
                      }
                      s.statusBt = d.statusBt || 'wait'
                      switch (d.statusBt) {
                        case 'confirm':
                          s.statusBtText = 'ยืนยันแล้ว'
                          break
                        case 'cancel':
                          s.statusBtText = 'ยกเลิก'
                          break
                        case 'confirmJob':
                          s.statusBtText = 'รับรถแล้ว'
                          break
                        default:
                          s.statusBtText = 'รายการนัดหมายใหม่'
                          break
                      }
                      // let dataBookingData = []
                      // await axios
                      //   .get(
                      //     this.DNS_IP + `/BookingData/get?bookNo=${d.bookNo}`
                      //   )
                      //   .then(async responses => {
                      //     dataBookingData = responses.data
                      //   })
                      // s.cusName = this.getDataFromFieldName(dataBookingData, 'ชื่อ')
                      // s.cusReg = this.getDataFromFieldName(dataBookingData, 'เลขทะเบียน')
                      // s.tel = this.getDataFromFieldName(dataBookingData, 'เบอร์โทร')
                      // s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                      // s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                      // s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''

                      s.cusName = this.getDataFromFieldName(this.BookingDataListTimechange[d.bookNo], 'ชื่อ')
                      s.cusReg = this.getDataFromFieldName(this.BookingDataListTimechange[d.bookNo], 'เลขทะเบียน')
                      s.tel = this.getDataFromFieldName(this.BookingDataListTimechange[d.bookNo], 'เบอร์โทร')
                      s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                      s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                      s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                      // var chkTime = this.dataItemTime.filter(el => { return el.timeDueHtext === s.timeDueHtext })
                      // if (chkTime.length === 0) {
                      //   dataItemTimes.push(s)
                      // }
                      dataItems.push(s)
                    }
                  }
                  if (dataItems.length === 0 || dataItems.status === false) {
                    this.dataItemCheck = []
                    // this.dataItemTime = []
                    // this.dataReady = true
                    // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
                  } else {
                    console.log('month new if')
                    this.dataItemCheck = dataItems
                    this.dataItemTimesChange = this.dataItemCheck.filter(el => {
                      let dueDate = moment(moment(el.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
                      return dueDate === this.timeTable
                      // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
                    }).sort((a, b) => {
                      if (a.timeDuetext < b.timeDuetext) return -1
                      return a.timeDuetext > b.timeDuetext ? 1 : 0
                    })
                  }
                })
            } else {
              console.log('month new else')
              this.dataItemTimesChange = this.dataItemCheck.filter(el => {
                let dueDate = moment(moment(el.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
                return dueDate === this.timeTable
                // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
              }).sort((a, b) => {
                if (a.timeDuetext < b.timeDuetext) return -1
                return a.timeDuetext > b.timeDuetext ? 1 : 0
              })
            }
          }
        }
        console.log('this.dataItemTimesChange', this.dataItemTimesChange)
      } catch (err) {
        console.log(err)
      }
    },
    async getBookingDataListTimechange (dateStart) {
      this.BookingDataListTimechange = []
      if (this.masBranchID) {
        this.masBranchID = this.masBranchID
      } else {
        if (this.branch.length > 0) {
          this.masBranchID = this.branch[0].value
        } else {
          this.masBranchID = ''
        }
      }
      let url = `${this.DNS_IP}/BookingData/get?shopId=${this.$route.query.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}`
      await axios
        .get(url)
        .then(async response => {
          if (response.data.status !== false) {
            response.data.forEach((row) => {
              if (typeof (this.BookingDataListTimechange[row.bookNo]) === 'undefined') {
                this.BookingDataListTimechange[row.bookNo] = []
              }
              this.BookingDataListTimechange[row.bookNo].push(row)
            })
          }
        })
      console.log(this.BookingDataListTimechange)
    },
    async chkBookingNo () {
      this.BookingDataItem = []
      this.dataReady = false
      this.bookNo = this.$route.query.bookNo
      if (this.bookNo === undefined) {
        // console.log('11111111111111', this.bookNo)
      } else {
        let dt = {
          bookNo: this.bookNo
        }
        axios
          .get(
            this.DNS_IP +
              '/booking_view/get?shopId=' +
              this.$route.query.shopId +
              '&bookNo=' +
              dt.bookNo
          )
          .then(async response => {
            let rs = response.data
            if (rs.length > 0) {
              var dataItems = []
              this.dataItem = []
              for (let i = 0; i < rs.length; i++) {
                let d = rs[i]
                let s = {}
                s.shopId = d.shopId
                if (d.fastTrack === 'False' && d.extraJob === 'False') {
                  this.radiosRemark = 'ซ่อมปกติ'
                } else if (d.fastTrack === 'False' && d.extraJob === 'True') {
                  this.radiosRemark = 'ExtraJob'
                } else if (d.fastTrack === 'True' && d.extraJob === 'False') {
                  this.radiosRemark = 'FastTrack'
                }
                s.bookNo = d.bookNo
                s.flowId = d.flowId
                s.flowName = d.flowName
                s.dueDate = d.dueDate
                s.userId = d.userId
                s.chkConfirm = false
                s.chkCancel = false
                s.jobNo = d.jobNo
                s.lineUserId = d.lineUserId
                s.remarkConfirm1 = (d.remarkConfirm1 === 'true' || d.remarkConfirm1 === 'True')
                s.remarkConfirm2 = (d.remarkConfirm2 === 'true' || d.remarkConfirm2 === 'True')
                s.extraJob = (d.extraJob === 'true' || d.extraJob === 'True')
                s.fastTrack = (d.fastTrack === 'true' || d.fastTrack === 'True')
                s.timeDueHtext = d.timeDueH + ':00'
                s.timeDuetext = d.timeDue
                if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                  s.chkConfirm = true
                  s.chkCancel = false
                }
                if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                  s.chkConfirm = false
                  s.chkCancel = true
                }
                s.statusBt = d.statusBt || 'wait'
                let dataBookingData = []
                await axios
                  .get(
                    // eslint-disable-next-line quotes
                    this.DNS_IP + "/BookingData/get?bookNo=" + d.bookNo
                  )
                  .then(async responses => {
                    console.log('dataBookingData', responses.data)
                    dataBookingData = responses.data
                    if (responses.data) {
                      this.BookingDataItem.push({
                        fieldName: 'วันที่นัดหมาย',
                        fieldValue: this.format_dateFUllTime(s.dueDate)
                      })
                      for (var i = 0; i < responses.data.length; i++) {
                        var t = responses.data[i]
                        if (t.userId === 'user-skip') {
                          t.userId = ''
                        }
                        t.shopId = this.$route.query.shopId
                        t.userName = JSON.parse(localStorage.getItem('sessionData')).userName
                        this.BookingDataItem.push(t)
                      }
                      console.log('BookingDataItem', this.BookingDataItem)
                      // await this.getBookingField()
                      // await this.getflowfield(dt)
                    }
                    // for (let i = 0; i < response.data.length; i++) {
                    //   let e = response.data[i]
                    //   if (e.fieldName === 'ชื่อ') {
                    //     s.cusName = s.fieldValue
                    //   }
                    //   if (e.fieldName === 'เลขทะเบียน') {
                    //     s.cusReg = s.fieldValue
                    //   }
                    // }
                  })
                this.flowIdSelect = dataBookingData[0].flowId
                s.masBranchID = dataBookingData[0].masBranchID
                this.masBranchID = dataBookingData[0].masBranchID
                this.timeavailable = JSON.parse(dataBookingData[0].setTime)
                s.cusName = this.getDataFromFieldName(dataBookingData, 'ชื่อ')
                s.cusReg = this.getDataFromFieldName(dataBookingData, 'เลขทะเบียน')
                s.tel = this.getDataFromFieldName(dataBookingData, 'เบอร์โทร')
                s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                dataItems.push(s)
              }
              console.log('dataItems', dataItems)
              if (dataItems.length === 0 || dataItems.status === false) {
                this.dataItem = []
                // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
              } else {
                this.dataItem = dataItems
                // this.dataReady = true
                await this.getBookingList(dataItems[0])
              }
            }
          })
        // masBranchID
        // this.getBookingData(dt)
        this.dialogEdit = true
      }
    },
    async getflowfield (item) {
      let itemIncustomField = []
      await axios
        .get(
          this.DNS_IP +
            '/flowField/get?flowId=' +
            item.flowId +
            '&shopId=' +
            this.$route.query.shopId
        )
        .then(response => {
          let tt = response.data
          // console.log('tt', tt)
          let flowId = tt[0].flowId
          let flowfieldName = []
          flowfieldName = JSON.parse(tt[0].flowfieldName)
          for (let a = 0; a < flowfieldName.length; a++) {
            let d = flowfieldName[a]
            itemIncustomField.push(d.fieldId)
          }
          this.getCustomfieldFlow(itemIncustomField, flowId)
          // console.log('itemIncustomField', itemIncustomField)
        })
    },
    async getCustomfieldFlow (item, flowId) {
      let flowfieldNameitems = []
      this.flowfieldNameitem = []
      await axios
        .get(this.DNS_IP + '/customField/fieldId?fieldId=' + item)
        .then(async response => {
          let rs = response.data
          console.log('rs', rs)
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.fieldId = d.fieldId
            s.flowId = flowId
            s.fieldName = d.fieldName
            s.optionField = d.optionField
            s.conditionField = d.conditionField || ''
            s.fieldType = d.fieldType
            s.fieldValue = ''
            s.CREATE_USER = ''
            s.LAST_USER = ''
            s.showCard = d.showCard
            s.shopId = this.shopId
            s.endDate = ''
            s.endTime = ''
            s.checkCar = 'False'
            s.conditionValue = d.conditionValue
            s.requiredField = d.requiredField
            flowfieldNameitems.push(s)
          }
          var data1 = flowfieldNameitems.filter(
            el => parseInt(el.conditionField || 0) > 0
          )
          // var data2 = []
          for (let i = 0; i < data1.length; i++) {
            let d = data1[i]
            let indexC = flowfieldNameitems.findIndex(function (o) {
              return o.fieldId === d.fieldId
            })
            let indexF = flowfieldNameitems.findIndex(function (o) {
              return o.fieldId === parseInt(d.conditionField)
            })
            flowfieldNameitems.splice(
              indexF + 1,
              0,
              flowfieldNameitems.splice(indexC, 1)[0]
            )
            // data2.push({'indexC': indexC, 'indexF': indexF})
          }
          // console.log('data1', data1)
          // console.log('data2', data2)
          for (var x = 0; x < flowfieldNameitems.length; x++) {
            var s = flowfieldNameitems[x]
            var chk = this.BookingDataItem.filter(el => {
              return parseInt(el.fieldId) === s.fieldId
            })
            console.log('cccxxx', s)
            console.log('chk', chk)
            if (chk.length === 0) {
              this.flowfieldNameitem.push(s)
            }
          }
          console.log('flowfieldNameitems', this.flowfieldNameitem)
          console.log('flowfieldNameitems', flowfieldNameitems)
          console.log('BookingDataItem', this.BookingDataItem)
          // setTimeout(() => this.validate('ADD'), 500)
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async confirmChk (item) {
      this.dataConfirm = item
      await this.getEmpSelect(item)
      this.dialogConfirm = true
    },
    onConfirm (item) {
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
        .then(async response => {
          await this.updateRemark(item)
          this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
          let DTitem = item.userId
          console.log('DTITEM', DTitem)
          if (DTitem !== 'user-skip') {
            await this.chkBookingNo()
            this.getTimesChange('update')
            let pushText = {
              'to': item.lineUserId,
              'messages': [
                {
                  'type': 'text',
                  'text': ` ✍️ ยืนยันเวลานัดหมา\n ✅ ชื่อ : ${item.cusName}\n ✅ เลขทะเบียน : ${item.cusReg}
                          \nวันเดือนปี ${this.format_dateFUllTime(item.dueDate)}`
                }
              ]
            }
            axios
              .post(
                this.DNS_IP + '/line/pushmessage?shopId=' + this.$session.getAll().data.shopId,
                pushText
              )
              .catch(error => {
                console.log('error function addData : ', error)
              })
          } else {
            await this.chkBookingNo()
            this.getTimesChange('update')
          }
          this.dialogConfirm = false
          console.log('addDataGlobal', response)
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async setDataRemove (item) {
      this.bookNoRemove = item
      await this.getEmpSelect(item)
      this.dialogRemove = true
    },
    cancelChk () {
      var dt = {
        bookNo: this.bookNoRemove.bookNo,
        contactDate: this.format_date(new Date()),
        status: 'cancel',
        statusUse: 'use',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: this.session.data.userName,
        LAST_USER: this.session.data.userName,
        remarkRemove: this.remarkRemove
      }
      axios
        .post(this.DNS_IP + '/booking_transaction/add', dt)
        .then(async response => {
          await this.updateRemark(this.bookNoRemove)
          this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
          console.log('addDataGlobal', response)
          this.dialogRemove = false
          await this.chkBookingNo()
          this.getTimesChange('update')
          this.dialogRemove = false
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async updateRemark (item) {
      var dt = {}
      if (this.radiosRemark === 'ซ่อมปกติ') {
        dt = {
          fastTrack: 'False',
          extraJob: 'False',
          LAST_USER: this.session.data.userName,
          empSelect: this.empSelect
        }
      } else if (this.radiosRemark === 'ExtraJob') {
        dt = {
          fastTrack: 'False',
          extraJob: 'True',
          LAST_USER: this.session.data.userName,
          empSelect: this.empSelect
        }
      } else if (this.radiosRemark === 'FastTrack') {
        dt = {
          fastTrack: 'True',
          extraJob: 'False',
          LAST_USER: this.session.data.userName,
          empSelect: this.empSelect
        }
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/edit/" + item.bookNo,
          dt
        )
        .then(async response => {})
    },
    async getEmpSelect (item) {
      this.empSelectStep = []
      await axios
        .get(this.DNS_IP + '/empSelect/get?shopId=' + item.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH
              s.value = d.empId
              this.empSelectStep.push(s)
            }
            this.empSelect = this.empSelectStep[0].value
          }
        })
    },
    setDataChang (item) {
      console.log('dueDate', item.dueDate)
      this.dataChange = item
      this.formChange.date = this.momenDate_1(item.dueDate)
      this.formChange.time = this.momenTime(item.dueDate)
      this.dialogChange = true
      console.log(this.formChange)
    },
    async changeChk (item) {
      console.log('item', item)
      console.log('formChange', this.formChange)
      this.$swal({
        title: 'ต้องการ เปลี่ยนเวลานัดหมาย ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        var dtChange = {
          changeDueDate: 'change',
          dueDate: this.formChange.date + ' ' + this.formChange.time
        }
        await axios
          .post(
            // eslint-disable-next-line quotes
            this.DNS_IP + "/BookingData/edit/" + item.bookNo,
            dtChange
          )
          .then(async response => {
            var dt = {
              bookNo: item.bookNo,
              contactDate: this.format_date(new Date()),
              status: 'change',
              statusUse: 'use',
              shopId: this.$session.getAll().data.shopId,
              CREATE_USER: this.session.data.userName,
              LAST_USER: this.session.data.userName,
              changDate: this.formChange.date + ' ' + this.formChange.time
            }
            await axios
              .post(this.DNS_IP + '/booking_transaction/add', dt)
              .then(async response => {
                this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
                this.dialogChange = false
                console.log('addDataGlobal', response)
                if (item.statusBt === 'confirm') {
                  if (item.userId !== 'user-skip') {
                    await this.chkBookingNo()
                    this.getTimesChange('update')
                    let pushText = {
                      'to': item.lineUserId,
                      'messages': [
                        {
                          'type': 'text',
                          'text': ` ✍️ ยืนยันเวลานัดหมา\n ✅ ชื่อ : ${item.cusName}\n ✅ เลขทะเบียน : ${item.cusReg}
                          \nวันเดือนปี ${this.format_dateFUllTime(this.formChange.date + ' ' + this.formChange.time)}`
                        }
                      ]
                    }
                    axios
                      .post(
                        this.DNS_IP + '/line/pushmessage?shopId=' + this.$session.getAll().data.shopId,
                        pushText
                      )
                      .catch(error => {
                        console.log('error function addData : ', error)
                      })
                  } else {
                    await this.chkBookingNo()
                    this.getTimesChange('update')
                  }
                } else {
                  await this.chkBookingNo()
                  this.getTimesChange('update')
                }
              })
              .catch(error => {
                console.log('error function addData : ', error)
              })
          })
      })
    },
    async getBookingList (dt) {
      // Clear Data ทุกครั้ง
      this.dataReady = false
      this.dataItemBooking = []
      // Clear ช่องค้นหา
      this.searchAll2 = ''
      var dataItems = []
      this.dateStart = dt.dueDate.substring(0, 7)
      await this.getBookingDataList(dt)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.$route.query.shopId +
            '&masBranchID=' +
            dt.masBranchID +
            '&dueDate=' +
            dt.dueDate.substring(0, 7)
        )
        .then(async response => {
          console.log('getBookingList', response.data)
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              let d = response.data[i]
              let s = {}
              s.bookNo = d.bookNo
              s.flowId = d.flowId
              s.flowName = d.flowName
              s.dueDate = d.dueDate
              s.userId = d.userId
              s.chkConfirm = false
              s.chkCancel = false
              s.remarkConfirm1 = (d.remarkConfirm1 === 'true' || d.remarkConfirm1 === 'True')
              s.remarkConfirm2 = (d.remarkConfirm2 === 'true' || d.remarkConfirm2 === 'True')
              s.extraJob = (d.extraJob === 'true' || d.extraJob === 'True')
              s.fastTrack = (d.fastTrack === 'true' || d.fastTrack === 'True')
              s.jobNo = d.jobNo
              s.timeDueHtext = d.timeDueH + ':00'
              s.timeDuetext = d.timeDue
              if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                s.chkConfirm = true
                s.chkCancel = false
              }
              if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                s.chkConfirm = false
                s.chkCancel = true
              }
              s.cusName = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'ชื่อ')
              s.cusReg = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เลขทะเบียน')
              s.tel = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เบอร์โทร')
              s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
              s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
              s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
              s.statusBt = d.statusBt || 'wait'
              dataItems.push(s)
            }
          }
          if (dataItems.length === 0 || dataItems.status === false) {
            this.dataItemBooking = []
            this.BookingDataItemEdit = []
            let itemIncustomField = []
            await axios
              .get(
                this.DNS_IP + '/BookingField/get?shopId=' + this.$route.query.shopId
              )
              .then(async response1 => {
                let rs2 = response1.data
                if (rs2.length > 0) {
                  let bookingData = []
                  bookingData = JSON.parse(rs2[0].flowfieldName)
                  for (let i = 0; i < bookingData.length; i++) {
                    let d = bookingData[i]
                    itemIncustomField.push(d.fieldId)
                  }
                  await axios
                    .get(this.DNS_IP + '/customField/fieldId?fieldId=' + itemIncustomField)
                    .then(async responses => {
                      let rs1 = responses.data
                      for (var i = 0; i < rs1.length; i++) {
                        var d = rs1[i]
                        var s = {}
                        var dataBD = this.BookingDataItem.filter(el => { return parseInt(el.fieldId) === parseInt(d.fieldId) })
                        console.log('dataBD', dataBD)
                        if (dataBD.length > 0) {
                          s.flowName = dataBD[0].flowName
                          s.masBranchName = dataBD[0].masBranchName
                          s.bookingFieldId = rs2[0].bookingFieldId
                          s.conditionField = d.conditionField
                          s.fieldId = d.fieldId
                          s.fieldType = d.fieldType
                          s.fieldValue = dataBD[0].fieldValue
                          s.fieldName = d.fieldName
                          s.conditionField = d.conditionField
                          s.conditionValue = d.conditionValue
                          s.requiredField = d.requiredField
                          s.optionField = d.optionField
                          this.BookingDataItemEdit.push(s)
                        }
                      }
                    })
                }
              })
            this.dataReady = true
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          } else {
            this.dataItemBooking = dataItems
            this.BookingDataItemEdit = []
            let itemIncustomField = []
            await axios
              .get(
                this.DNS_IP + '/BookingField/get?shopId=' + this.$route.query.shopId
              )
              .then(async response1 => {
                let rs2 = response1.data
                if (rs2.length > 0) {
                  let bookingData = []
                  bookingData = JSON.parse(rs2[0].flowfieldName)
                  for (let i = 0; i < bookingData.length; i++) {
                    let d = bookingData[i]
                    itemIncustomField.push(d.fieldId)
                  }
                  await axios
                    .get(this.DNS_IP + '/customField/fieldId?fieldId=' + itemIncustomField)
                    .then(async responses => {
                      let rs1 = responses.data
                      for (var i = 0; i < rs1.length; i++) {
                        var d = rs1[i]
                        var s = {}
                        var dataBD = this.BookingDataItem.filter(el => { return parseInt(el.fieldId) === parseInt(d.fieldId) })
                        console.log('dataBD', dataBD)
                        if (dataBD.length > 0) {
                          s.flowName = dataBD[0].flowName
                          s.masBranchName = dataBD[0].masBranchName
                          s.bookingFieldId = rs2[0].bookingFieldId
                          s.conditionField = d.conditionField
                          s.fieldId = d.fieldId
                          s.fieldType = d.fieldType
                          s.fieldValue = dataBD[0].fieldValue
                          s.fieldName = d.fieldName
                          s.conditionField = d.conditionField
                          s.conditionValue = d.conditionValue
                          s.requiredField = d.requiredField
                          s.optionField = d.optionField
                          this.BookingDataItemEdit.push(s)
                        }
                      }
                    })
                }
              })
            this.dataReady = true
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    },
    async getBookingDataList (dt) {
      this.BookingDataList = []
      let url = `${this.DNS_IP}/BookingData/get?shopId=${this.$route.query.shopId}&masBranchID=${dt.masBranchID}&dueDate=${dt.dueDate.substring(0, 7)}`
      await axios
        .get(url)
        .then(async response => {
          console.log('getBookingDataList', response)
          if (response.data.status !== false) {
            response.data.forEach((row) => {
              if (typeof (this.BookingDataList[row.bookNo]) === 'undefined') {
                this.BookingDataList[row.bookNo] = []
              }
              this.BookingDataList[row.bookNo].push(row)
            })
          }
        })
      console.log(this.BookingDataList)
    }
  }
}
</script>
<style scoped>
.theme--light.v-divider {
    border-color: rgba(243, 5, 25, 0.904) !important;
}
.InputData{
  margin: 0px !important;
  padding: 0px !important;
}
.slidein {
  max-width: 100%;
  padding: 2em 1em;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background: #fff;
  height: 100%;
  overflow: scroll;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
}
button {
  padding: .5em 1em;
  border-radius: 3em;
  font-size: 1.1em;
}
/* before the element is shown, start off the screen to the right */
.slide-enter, .slide-leave-active {
  right: -100%;
}

.close-btn {
  border: none;
  font-weight: bold;
  font-size: 2em;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5em;
}

/* General styles unrelated to slide in */
body {
  font-family: 'Mulish', sans-serif;
}

.toggle {
  margin: 1em;
}
.v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
}
</style>
