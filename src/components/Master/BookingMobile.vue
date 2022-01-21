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
            <v-col
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
              <!-- <v-icon left large
              color="#64DD17"
              v-if="item.fieldName === 'เบอร์โทร'"
              @click="dial(item.phone)">call</v-icon> -->
              </v-text-field>
              <v-icon class="pa-3 pb-10 pt-0" v-if="item.fieldName === 'เบอร์โทร'" large color="#64DD17" @click="dial(item.phone)">call</v-icon>
              <!-- {{item.fieldName}} : {{item.fieldValue}} -->
              </v-row>
            </v-col>
            <!-- <v-form ref="form_update" v-model="validUpdate" lazy-validation>
              <div v-for="(p, index) in flowfieldNameitem" :key="index">
                <div class="pa-0" v-if="p.conditionField === ''">
                  <div>
                    <div v-if="p.fieldType == 'text'">
                      <br />
                      <v-text-field
                        v-model="p.fieldValue"
                        :label="p.fieldName"
                        dense
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                        outlined
                      ></v-text-field>
                    </div>
                    <div v-if="p.fieldType == 'number'">
                      <br />
                      <v-text-field
                        v-model="p.fieldValue"
                        :label="p.fieldName"
                        dense
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                        outlined
                      ></v-text-field>
                    </div>
                    <v-row>
                      <v-col
                        cols="12"
                        v-if="p.fieldType == 'Autocompletes'"
                        style="padding-top: 0px;padding-bottom: 0px;"
                      >
                        <br />
                        <v-autocomplete
                          v-model="p.fieldValue"
                          :items="JSON.parse(p.optionField)"
                          dense
                          filled
                          :label="p.fieldName"
                          :rules="
                            p.requiredField === 'True'
                              ? [rules.required]
                              : [true]
                          "
                        ></v-autocomplete>
                      </v-col>
                      <v-col
                        cols="12"
                        v-if="p.fieldType == 'Selects'"
                        style="padding-top: 0px;padding-bottom: 0px;"
                      >
                        <br />
                        <div>
                          <v-select
                            v-model="p.fieldValue"
                            :items="JSON.parse(p.optionField)"
                            menu-props="auto"
                            :label="p.fieldName"
                            hide-details
                            outlined
                            dense
                            :rules="
                              p.requiredField === 'True'
                                ? [rules.required]
                                : [true]
                            "
                          ></v-select>
                        </div>
                      </v-col>
                    </v-row>
                    <div v-if="p.fieldType == 'Radio'" style="padding:0px;">
                      <br />
                      <v-container fluid style="padding:0px;">
                        <v-radio-group
                          row
                          v-model="p.fieldValue"
                          style="margin:0px;"
                          :rules="
                            p.requiredField === 'True'
                              ? [rules.required]
                              : [true]
                          "
                        >
                          <template v-slot:label> </template>
                          <div
                            v-for="radios in JSON.parse(p.optionField)"
                            :key="radios.toISOString"
                            class="text-center"
                          >
                            <v-radio
                              :label="radios.text"
                              dense
                              :value="radios.value"
                            ></v-radio>
                          </div>
                        </v-radio-group>
                      </v-container>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    p.conditionField !== '' &&
                      flowfieldNameitem.filter(row => {
                        return row.fieldId === parseInt(p.conditionField);
                      }).length > 0
                  "
                >
                  <div
                    v-if="
                      p.conditionValue ===
                        flowfieldNameitem.filter(row => {
                          return row.fieldId === parseInt(p.conditionField);
                        })[0].fieldValue
                    "
                  >
                    <div cols="12" v-if="p.fieldType == 'Autocompletes'">
                      <v-autocomplete
                        v-model="p.fieldValue"
                        :items="JSON.parse(p.optionField)"
                        dense
                        filled
                        :label="p.fieldName"
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                      ></v-autocomplete>
                    </div>
                    <div v-if="p.fieldType == 'Selects'">
                      <v-select
                        v-model="p.fieldValue"
                        :items="JSON.parse(p.optionField)"
                        menu-props="auto"
                        :label="p.fieldName"
                        dense
                        hide-details
                        outlined
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                      ></v-select>
                    </div>
                    <div v-if="p.fieldType === 'Radio'" style="padding:0px;">
                      <br />
                      <v-container fluid style="padding:0px;">
                        <v-radio-group
                          row
                          v-model="p.fieldValue"
                          style="margin:0px;"
                          :rules="
                            p.requiredField === 'True'
                              ? [rules.required]
                              : [true]
                          "
                        >
                          <template v-slot:label> </template>
                          <div
                            v-for="radios in JSON.parse(p.optionField)"
                            :key="radios.toISOString"
                            class="text-center"
                          >
                            <v-radio
                              :label="radios.text"
                              dense
                              :value="radios.value"
                            ></v-radio>
                          </div>
                        </v-radio-group>
                      </v-container>
                    </div>
                  </div>
                </div>
                <div v-if="p.conditionField === 'flow'">
                  <div
                    v-if="
                      parseInt(p.conditionValue) === parseInt(formAdd.flowId)
                    "
                  >
                    <div v-if="p.fieldType == 'text'">
                      <br />
                      <v-text-field
                        v-model="p.fieldValue"
                        :label="p.fieldName"
                        dense
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                        outlined
                      ></v-text-field>
                    </div>
                    <div v-if="p.fieldType == 'number'">
                      <br />
                      <v-text-field
                        v-model="p.fieldValue"
                        :label="p.fieldName"
                        dense
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                        outlined
                      ></v-text-field>
                    </div>
                    <div cols="12" v-if="p.fieldType == 'Autocompletes'">
                      <v-autocomplete
                        v-model="p.fieldValue"
                        :items="JSON.parse(p.optionField)"
                        dense
                        filled
                        :label="p.fieldName"
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                      ></v-autocomplete>
                    </div>
                    <div v-if="p.fieldType == 'Selects'">
                      <v-select
                        v-model="p.fieldValue"
                        :items="JSON.parse(p.optionField)"
                        menu-props="auto"
                        :label="p.fieldName"
                        dense
                        :rules="
                          p.requiredField === 'True' ? [rules.required] : [true]
                        "
                        hide-details
                        outlined
                      ></v-select>
                    </div>
                    <div v-if="p.fieldType === 'Radio'" style="padding:0px;">
                      <br />
                      <v-container fluid style="padding:0px;">
                        <v-radio-group
                          row
                          v-model="p.fieldValue"
                          style="margin:0px;"
                          :rules="
                            p.requiredField === 'True'
                              ? [rules.required]
                              : [true]
                          "
                        >
                          <template v-slot:label> </template>
                          <div
                            v-for="radios in JSON.parse(p.optionField)"
                            :key="radios.toISOString"
                            class="text-center"
                          >
                            <v-radio
                              :label="radios.text"
                              dense
                              :value="radios.value"
                            ></v-radio>
                          </div>
                        </v-radio-group>
                      </v-container>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <v-row>
                <v-col cols="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endDate"
                        label="วันที่นัดส่งรถลูกค้า"
                        persistent-hint
                        dense
                        outlined
                        required
                        :rules="[rules.required]"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="endDate"
                      no-title
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    v-model="endTime"
                    label="เวลา"
                    type="time"
                    suffix=""
                    required
                    :rules="[rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form> -->
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
                @click.stop="cancelChk(dataItem[0])"
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
    <transition name="slide">
      <div class="slidein" v-if="drawer">
        <h4 @click="toggle">ตรวจสอบคิวจองรายวัน</h4>
        <v-row>
          <v-col cols="8">
            <v-menu
              ref="menu"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="timeTable"
                  label="วันที่นัดลูกค้า"
                  persistent-hint
                  dense
                  outlined
                  readonly
                  required
                  :rules="[rules.required]"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="timeTable"
                no-title
                @input="(menu1 = false), getTimesChange('update')"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <button class="close-btn" @click="toggle()">X</button>
        <v-row justify="center">
                      <v-expansion-panels>
                        <v-expansion-panel
                          v-for="(item, indexitem) in masterTime" :key="indexitem"
                        >
                          <v-expansion-panel-header v-slot="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                {{item}}
                              </v-col>
                              <v-col
                                cols="8"
                                class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span v-if="open && dataItemTimesChange.filter(el => { return el.timeDueHtext === item && (el.statusBt==='confirmJob' || el.statusBt==='confirm') }).length > 0">
                                    {{'รายการนัดหมาย ' + dataItemTimesChange.filter(el => { return el.timeDueHtext === item && (el.statusBt==='confirmJob' || el.statusBt==='confirm') }).length + ' คัน'}} </span>
                                  <span v-if="open && dataItemTimesChange.filter(el => { return el.timeDueHtext === item && (el.statusBt==='confirmJob' || el.statusBt==='confirm') }).length === 0">
                                    ไม่มีรายการนัดหมาย</span>
                                  <v-row
                                    v-if="!open && dataItemTimesChange.filter(el => { return el.timeDueHtext === item && (el.statusBt==='confirmJob' || el.statusBt==='confirm') }).length > 0"
                                    no-gutters
                                    style="width: 100%"
                                  >
                                    <v-col cols="6">
                                    </v-col>
                                    <v-col cols="6" class="text-right">
                                      <v-chip
                                        class="ma-2"
                                        color="primary"
                                        label
                                        small
                                      >
                                        <v-icon left>
                                          mdi-car-multiple
                                        </v-icon>
                                        {{dataItemTimesChange.filter(el => { return el.timeDueHtext === item && (el.statusBt==='confirmJob' || el.statusBt==='confirm') }).length + ' คัน'}}
                                      </v-chip>
                                    </v-col>
                                  </v-row>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content v-for="(items, indexitems) in dataItemTimesChange.filter(el => { return el.timeDueHtext === item && (el.statusBt==='confirmJob' || el.statusBt==='confirm') })" :key="'td'+indexitems">
                            <v-card
                              color="#1B437C"
                            >
                              <v-container class="pt-0 pb-0">
                                <v-list-item class="pa-0">
                                  <v-icon
                                    large
                                    dark
                                    left
                                  >
                                    mdi-car-wash
                                  </v-icon>
                                  <v-list-item-content>
                                    <v-list-item-title class="pt-0 pb-0">{{items.flowName}}</v-list-item-title>
                                  </v-list-item-content>
                                  <v-row
                                    align="center"
                                    justify="end"
                                  >
                                    <v-icon dark class="mr-1">
                                      mdi-clock-outline
                                    </v-icon>
                                    <span class="white--text mr-2">{{items.timeDuetext}}</span>
                                  </v-row>
                                </v-list-item>
                              <v-card-text>
                                <v-row class="white--text">
                                  <v-col cols="12" class="pt-0 pb-0">
                                    คุณ {{items.cusName}}
                                  </v-col>
                                  <v-col cols="12" class="pt-0 pb-0">
                                    ทะเบียน {{items.cusReg}}
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              </v-container>
                            </v-card>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-row>
        <!-- <v-simple-table dense>
          <tbody>
            <template v-for="(item, indexitem) in masterTime">
              <tr :key="'tr' + indexitem">
                <td valign="top">
                  <b>{{ item }}</b>
                </td>
                <td>
                  <v-simple-table dense class="table_detail_2">
                    <tbody>
                      <tr
                        v-for="(items,
                        indexitems) in dataItemTimesChange.filter(el => {
                          return (
                            el.timeDueHtext === item &&
                            (el.statusBt === 'confirmJob' ||
                              el.statusBt === 'confirm')
                          );
                        })"
                        :key="'td' + indexitems"
                      >
                        <td>{{ items.timeDuetext }}</td>
                        <td>{{ items.flowName }}</td>
                        <td>{{ items.cusName }}</td>
                        <td>{{ items.cusReg }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </td>
              </tr>
            </template>
          </tbody>
        </v-simple-table> -->
      </div>
    </transition>
  </div>
</template>
<script>
import axios from 'axios' // api
import moment from 'moment-timezone'
export default {
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
      getSelectCount: 0,
      dialogEdit: false,
      dialogDelete: false,
      dialogChange: false,
      dialogJob: false,
      drawer: false,
      formChange: {
        date: '',
        time: ''
      },
      masterTime: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      timeavailable: []
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId)
    }
  },
  async mounted () {
    await this.chkBookingNo()
  },
  methods: {
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
              this.dataItemCheck = []
              var dataItems = []
              // var dataItemTimes = []
              await axios
                .get(
                  // eslint-disable-next-line quotes
                  this.DNS_IP +
                    '/booking_view/get?shopId=' +
                    this.session.data.shopId +
                    '&masBranchID=' +
                    this.dataItem[0].masBranchID +
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
                      if (d.statusBt) {
                        s.statusBt = d.statusBt
                        if (d.statusBt === 'confirm') {
                          s.statusBtText = 'โทรยืนยันแล้ว'
                        } else if (d.statusBt === 'cancel') {
                          s.statusBtText = 'ยกเลิก'
                        } else if (d.statusBt === 'confirmJob') {
                          s.statusBtText = 'รับรถแล้ว'
                        }
                      } else {
                        s.statusBt = 'wait'
                        s.statusBtText = 'รายการนัดหมายใหม่'
                      }
                      let dataBookingData = []
                      await axios
                        .get(
                          // eslint-disable-next-line quotes
                          this.DNS_IP + "/BookingData/get?bookNo=" + d.bookNo
                        )
                        .then(async responses => {
                          // console.log('getDataData', responses.data)
                          dataBookingData = responses.data
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
                      s.cusName = dataBookingData.filter(function (el) {
                        return el.fieldName === 'ชื่อ'
                      })
                      s.cusReg = dataBookingData.filter(function (el) {
                        return el.fieldName === 'เลขทะเบียน'
                      })
                      s.tel = dataBookingData.filter(function (el) {
                        return el.fieldName === 'เบอร์โทร'
                      })
                      if (s.cusName.length > 0) {
                        s.cusName = s.cusName[0].fieldValue
                      } else {
                        s.cusName = ''
                      }
                      if (s.cusReg.length > 0) {
                        s.cusReg = s.cusReg[0].fieldValue
                      } else {
                        s.cusReg = ''
                      }
                      if (s.tel.length > 0) {
                        s.tel = s.tel[0].fieldValue
                      } else {
                        s.tel = ''
                      }
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
                    // this.dataItemTimesChange = this.dataItemCheck.filter(el => {
                    //   let dueDate = moment(moment(el.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
                    //   return dueDate === this.timeTable
                    //   // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
                    // }).sort((a, b) => {
                    //   if (a.timeDuetext < b.timeDuetext) return -1
                    //   return a.timeDuetext > b.timeDuetext ? 1 : 0
                    // })
                    // var datause = dataItemTimes.sort((a, b) => {
                    //   if (a.timeDueHtext < b.timeDueHtext) return -1
                    //   return a.timeDueHtext > b.timeDueHtext ? 1 : 0
                    // })
                    // for (var k = 0; k < datause.length; k++) {
                    //   var t = datause[k]
                    //   var h = {}
                    //   h.timeDueHtext = t.timeDueHtext
                    //   let chkTimes = this.dataItemTime.filter(el => { return el.timeDueHtext === t.timeDueHtext })
                    //   console.log('chkTimes', chkTimes)
                    //   if (chkTimes.length === 0) {
                    //     this.dataItemTime.push(h)
                    //   }
                    // }
                    // this.dataItemTime = dataItemTimes.sort((a, b) => {
                    //   if (a.timeDueHtext < b.timeDueHtext) return -1
                    //   return a.timeDueHtext > b.timeDueHtext ? 1 : 0
                    // })
                    // console.log('dataItemTime', this.dataItemTime)
                    // this.dataReady = true
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
          // this.dataItemTimesChange = this.dataItemBooking.filter(el => {
          //   let dueDate = this.momenDate_1(el.dueDate)
          //   return dueDate === this.timeTable
          //   // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
          // }).sort((a, b) => {
          //   if (a.timeDuetext < b.timeDuetext) return -1
          //   return a.timeDuetext > b.timeDuetext ? 1 : 0
          // })
          }
        }
      } catch (err) {
        console.log(err)
      }
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
              this.session.data.shopId +
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
                s.bookNo = d.bookNo
                s.flowId = d.flowId
                s.flowName = d.flowName
                s.dueDate = d.dueDate
                s.userId = d.userId
                s.chkConfirm = false
                s.chkCancel = false
                s.jobNo = d.jobNo
                s.lineUserId = d.lineUserId
                s.timeDueHtext = d.timeDueH + ':00'
                s.timeDuetext = d.timeDue
                this.countAll = this.countAll + 1
                if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                  s.chkConfirm = true
                  s.chkCancel = false
                }
                if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                  s.chkConfirm = false
                  s.chkCancel = true
                }
                if (d.statusBt) {
                  s.statusBt = d.statusBt
                  if (d.statusBt === 'confirm') {
                    s.statusBtText = 'โทรยืนยันแล้ว'
                  } else if (d.statusBt === 'cancel') {
                    s.statusBtText = 'ยกเลิก'
                  } else if (d.statusBt === 'confirmJob') {
                    s.statusBtText = 'รับรถแล้ว'
                  }
                } else {
                  s.statusBt = 'wait'
                  s.statusBtText = 'รายการนัดหมายใหม่'
                }
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
                        var d = responses.data[i]
                        if (d.userId === 'user-skip') {
                          d.userId = ''
                        }
                        d.shopId = this.session.data.shopId
                        d.userName = this.$session.getAll().data.userName
                        this.BookingDataItem.push(d)
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
                s.masBranchID = dataBookingData[0].masBranchID
                this.timeavailable = JSON.parse(dataBookingData[0].setTime)
                s.cusName = dataBookingData.filter(function (el) {
                  return el.fieldName === 'ชื่อ'
                })
                s.cusReg = dataBookingData.filter(function (el) {
                  return el.fieldName === 'เลขทะเบียน'
                })
                s.tel = dataBookingData.filter(function (el) {
                  return el.fieldName === 'เบอร์โทร'
                })
                if (s.cusName.length > 0) {
                  s.cusName = s.cusName[0].fieldValue
                } else {
                  s.cusName = ''
                }
                if (s.cusReg.length > 0) {
                  s.cusReg = s.cusReg[0].fieldValue
                } else {
                  s.cusReg = ''
                }
                if (s.tel.length > 0) {
                  s.tel = s.tel[0].fieldValue
                } else {
                  s.tel = ''
                }
                dataItems.push(s)
              }
              console.log('dataItems', dataItems)
              if (dataItems.length === 0 || dataItems.status === false) {
                this.dataItem = []
                // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
              } else {
                this.dataItem = dataItems
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
            this.session.data.shopId
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
    confirmChk (item) {
      console.log('item', item)
      this.$swal({
        title: 'ต้องการ ยืนยัน ใช่หรือไม่?',
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
          .then(async response => {
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
            console.log('addDataGlobal', response)
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
      })
    },
    cancelChk (item) {
      // console.log('item', item)
      this.$swal({
        title: 'ต้องการ ยกเลิก ใช่หรือไม่?',
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
          .then(async response => {
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            console.log('addDataGlobal', response)
            await this.chkBookingNo()
            this.getTimesChange('update')
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
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
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            dt.masBranchID +
            '&dueDate=' +
            dt.dueDate.substring(0, 7)
        )
        .then(async response => {
          // console.log('getData', response.data)
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
              if (d.statusBt) {
                s.statusBt = d.statusBt
                if (d.statusBt === 'confirm') {
                  s.statusBtText = 'โทรยืนยันแล้ว'
                } else if (d.statusBt === 'cancel') {
                  s.statusBtText = 'ยกเลิก'
                } else if (d.statusBt === 'confirmJob') {
                  s.statusBtText = 'รับรถแล้ว'
                }
              } else {
                s.statusBt = 'wait'
                s.statusBtText = 'รายการนัดหมายใหม่'
              }
              dataItems.push(s)
            }
          }
          if (dataItems.length === 0 || dataItems.status === false) {
            this.dataItemBooking = []
            this.dataReady = true
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          } else {
            this.dataItemBooking = dataItems
            this.dataReady = true
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    }
  }
}
</script>
<style scoped>
.theme--light.v-divider {
    border-color: rgba(243, 5, 25, 0.904) !important;
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
</style>
