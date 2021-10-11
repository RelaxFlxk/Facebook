<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn
              color="primary"
              style="z-index:8;"
              id="v-step-0"
              depressed
              @click="(dialogAdd = true), validate('ADD'), getBookingField()"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่ม
            </v-btn>
            <!-- </v-overlay> -->
          </v-col>
        </v-row>
        <v-row>
          <!-- ADD -->
          <v-dialog v-model="dialogAdd" persistent max-width="70%">
            <v-card class="text-center">
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-col class="text-right">
                      <v-btn
                        small
                        color="#E0E0E0"
                        @click="(dialogAdd = false), clearDataAdd();"
                      >
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          v-model="formAdd.flowId"
                          :items="DataFlowName"
                          label="ประเภทบริการ"
                          solo
                          required
                          :rules="[rules.required]"
                        ></v-select>
                        <v-select
                          v-model="formAdd.masBranchID"
                          :items="branch"
                          label="สาขา"
                          solo
                          required
                          :rules="[rules.required]"
                        ></v-select>
                        <!-- <input type="time" id="appt" name="appt"
             required> -->
                        <v-row>
                          <v-col cols="6">
                            <v-menu
                              ref="menu"
                              v-model="menuDate"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              :rules="[rules.required]"
                              transition="scale-transition"
                              offset-y
                              required
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="date"
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
                                v-model="date"
                                no-title
                                scrollable
                                :min="
                                  new Date(
                                    Date.now() -
                                      new Date().getTimezoneOffset() * 60000
                                  )
                                    .toISOString()
                                    .substr(0, 10)
                                "
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menuDate = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field
                              v-model="time"
                              label="เวลา"
                              type="time"
                              suffix=""
                              required
                              :rules="[rules.required]"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <div
                          v-for="(item, index) in fieldNameItem"
                          :key="index"
                        >
                          <div v-if="item.fieldType == 'text'">
                            <v-text-field
                              v-model="item.fieldValue"
                              :label="item.fieldName"
                              outlined
                              required
                              :rules="[rules.required]"
                            ></v-text-field>
                          </div>
                          <div v-if="item.fieldType == 'number'">
                            <v-text-field
                              v-model="item.fieldValue"
                              :label="item.fieldName"
                              outlined
                              required
                              :rules="[rules.required]"
                            ></v-text-field>
                          </div>
                          <div v-if="item.fieldType == 'Autocompletes'">
                            <v-autocomplete
                              v-model="item.fieldValue"
                              :items="JSON.parse(item.optionField)"
                              solo
                              :label="item.fieldName"
                              required
                              :rules="[rules.required]"
                            ></v-autocomplete>
                          </div>
                          <div v-if="item.fieldType == 'Selects'">
                            <v-select
                              v-model="item.fieldValue"
                              :items="JSON.parse(item.optionField)"
                              menu-props="auto"
                              :label="item.fieldName"
                              required
                              :rules="[rules.required]"
                              solo
                            ></v-select>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
              <v-card-actions id="v-step-1">
                <v-col id="margin">
                  <v-row justify="center">
                    <v-btn
                      elevation="2"
                      x-large
                      color="#173053"
                      :disabled="!validAdd"
                      @click="addData()"
                    >
                      <v-icon left>mdi-checkbox-marked-circle</v-icon>
                      เพิ่ม
                    </v-btn>
                  </v-row>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end add -->
          <!-- data table -->
          <v-col cols="12">
            <v-card elevation="7" v-if="dataReady">
              <v-card-title>
                <v-text-field
                  v-model="searchAll2"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="columns"
                  :items="dataItem"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.dueDate`]="{ item }">
                    {{ format_date(item.dueDate) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      id="v-step-2"
                      small
                      @click.stop="
                        (dialogEdit = true),
                          getDataById(item),
                          validate('UPDATE');
                      "
                    >
                      <v-icon dark> mdi-account-plus </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      fab
                      small
                      @click.stop="(dialogDelete = true), getDataById(item);"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
            <div v-if="!dataReady" class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-col>
          <!-- end data table -->
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
      Layout: [],
      dataReady: false,
      menuDate: false,
      date: '',
      time: '',
      session: this.$session.getAll(),
      fieldNameItem: [],
      DataflowId: '',
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'Flow',
          disabled: false,
          href: '/Master/BookingList'
        }
      ],
      branch: [],
      DataFlowName: [],
      // Data Table Config
      searchAll2: '',
      columns: [
        { text: 'Booking Id', value: 'bookingId' },
        { text: 'ชื่อบริการ', value: 'flowName' },
        { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
        // { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        // { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      // End Data Table Config
      formAdd: {
        bookingId: null,
        fieldId: '',
        fieldValue: '',
        flowId: null,
        masBranchID: null,
        dueDate: '',
        shopId: this.$session.getAll().data.shopId
      },
      formUpdate: {
        masBranchCode: '',
        masBranchName: '',
        tel: '',
        map: '',
        shopId: ''
      },
      validUpdate: true,
      validAdd: true,
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
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
      }
    }
  },
  async mounted () {
    this.dataReady = false
    this.getDataFlow()
    this.getDataBranch()
    this.getBookingList()
  },
  methods: {
    validate (Action) {
      switch (Action) {
        case 'ADD':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_add.validate()
          })
          break
        case 'UPDATE':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_update.validate()
          })
          break

        default:
          break
      }
    },
    async getDataFlow () {
      this.DataFlowName = []
      // console.log('DataFlowName', this.DataFlowName)
      axios
        .get(this.DNS_IP + '/flow/get?shopId=' + this.session.data.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.flowName
              s.value = d.flowId
              this.DataFlowName.push(s)
              // console.log('this.DataFlowName', this.DataFlowName)
            }
          } else {
            this.DataFlowName = []
          }
        })
    },
    async getDataBranch () {
      this.branch = []
      // console.log('branch', this.branch)
      axios
        .get(this.DNS_IP + '/master_branch/get?shopId=' + this.session.data.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.masBranchName
              s.value = d.masBranchID
              this.branch.push(s)
              // console.log('dtdtdtdt', this.branch)
            }
          } else {
            this.branch = []
          }
        })
    },
    async getBookingList () {
      // Clear Data ทุกครั้ง
      this.dataItem = []
      // Clear ช่องค้นหา
      this.searchAll2 = ''
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/booking_view/get?shopId=" + this.session.data.shopId
        )
        .then(async response => {
          console.log('getData', response.data)
          this.dataReady = true
          this.dataItem = response.data
          if (this.dataItem.length === 0 || this.dataItem.status === false) {
            this.dataItem = []
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
    async getBookingField () {
      this.bookingField = []
      let itemIncustomField = []
      axios
        .get(this.DNS_IP + '/BookingField/get?shopId=' + this.session.data.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.formAdd.bookingId = rs[0].bookingId
            console.log('rs', rs)
            let bookingData = []
            bookingData = JSON.parse(rs[0].flowfieldName)
            for (let i = 0; i < bookingData.length; i++) {
              let d = bookingData[i]
              itemIncustomField.push(d.fieldId)
            }
            this.getCustomField(itemIncustomField)
          } else {
          }
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async getCustomField (item) {
      await axios
        .get(this.DNS_IP + '/customField/fieldId?fieldId=' + item)
        .then(async response => {
          let rs = response.data
          // let aa = []
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.fieldId = d.fieldId
            s.fieldName = d.fieldName
            s.fieldType = d.fieldType
            s.optionField = d.optionField
            s.shopId = d.shopId
            s.fieldValue = ''
            this.fieldNameItem.push(s)
            // console.log('s', this.fieldNameItem)
          }
          setTimeout(() => this.validate('ADD'), 500)
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async addData () {
      let rs = this.fieldNameItem
      let Add = []
      for (let i = 0; i < rs.length; i++) {
        let d = rs[i]
        let update = {}
        update.masBranchID = this.formAdd.masBranchID
        update.bookingId = this.formAdd.bookingId
        update.flowId = this.formAdd.flowId
        update.fieldId = d.fieldId
        update.fieldValue = d.fieldValue
        update.shopId = d.shopId
        update.dueDate = this.date + ' ' + this.time
        Add.push(update)
      }
      console.log('Add', Add)
      this.$swal({
        title: 'ต้องการ บันทึกข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          axios
            .post(this.DNS_IP + '/BookingData/add', Add)
            .then(response => {
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              this.clearDataAdd()
              console.log('addDataGlobal DNS_IP + /job/add', response)
            })
            .catch(error => {
              console.log('error function addData : ', error)
            })
        })
        .catch(error => {
          console.log('Cencel : ', error)
        })
    },
    clearDataAdd () {
      this.date = ''
      this.time = ''
      this.fieldNameItem = []
      this.DataflowId = ''
      this.formAdd.bookingId = null
      this.formAdd.fieldId = ''
      this.formAdd.fieldValue = ''
      this.formAdd.flowId = null
      this.formAdd.masBranchID = null
      this.formAdd.dueDate = ''
      this.formAdd.shopId = this.$session.getAll().data.shopId
      this.dialogAdd = false
    },
    async getDataById (dt) {
      console.log(this.DNS_IP + '/BookingData/getID?bookingDataId=' + dt.bookingDataId)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + '/BookingData/getID?bookingDataId=' + dt.bookingDataId
        )
        .then(async (response) => {
          console.log('get id : ', response)
          this.dataReady = true
          if (response.data) {
            Object.assign(this.formUpdate, response.data)
            delete this.formUpdate['RECORD_STATUS']
            console.log('getDataById', this.formUpdate)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.dataReady = true
          console.log('error function getDataById : ', error)
        //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    },
    async deleteDataGlobal () {
      this.$swal({
        title: 'ต้องการ ลบข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#fa0202',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          this.formUpdate.LAST_USER = this.$session.getAll().data.userName
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/BookingData/delete/" + this.formUpdate.bookingDataId,
              this.formUpdate
            )
            .then(async (response) => {
              // Debug response
              console.log('DNS_IP + PATH + "delete/"', response)
              console.log('status', status)

              this.$swal('เรียบร้อย', 'ลบข้อมูลเรียบร้อย', 'success')
              // Close Dialog
              this.dialogDelete = false

              // Load Data
              if (status !== '') {
                await this.getDataFlow()
              }
              if (status === '') {
                await this.getDataFlow()
              }
            })
            // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              this.dataReady = true
              this.$swal('ผิดพลาด', 'ผิดพลาด -1', 'error')
              console.log('error function deleteDataGlobal : ', error)
            //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
            })
        })
        .catch((error) => {
          this.dataReady = true
          this.$swal('ผิดพลาด', 'ผิดพลาด -2', 'error')
          console.log('error function deleteDataGlobal : ', error)
        })
    }
  }
}
</script>
