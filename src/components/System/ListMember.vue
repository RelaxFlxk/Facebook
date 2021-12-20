<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs
          class="pl-0 pb-10"
          :items="breadcrumbs"
          divider=">"
        ></v-breadcrumbs>
        <v-row>
          <!-- Data -->
          <v-dialog v-model="dialogData" persistent max-width="30%">
            <v-card max-width="100%">
              <v-card-actions>
                <v-col id="margin">
                  <v-row justify="center">
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                    <v-avatar color="teal" size="190">
                      <img alt="user" :src="this.fromUpdate.picture" />
                    </v-avatar>
                    <v-card-text align="center" class="mx-0">
                      <div class="my-4 text-subtitle-1">
                        ข้อมูลส่วนตัว
                      </div>
                    </v-card-text>

                    <v-card-text align="left" class="mx-0">
                      <div>ชื่อลูกค้า {{ fromUpdate.name }}</div>
                      <div>เบอร์โทรศัพท์ {{ fromUpdate.tel }}</div>
                      <div>วันเกิด {{ fromUpdate.birthDay }}</div>
                    </v-card-text>

                    <v-btn
                      elevation="2"
                      medium
                      color="blue darken-1"
                      @click="dialogData = false"
                    >
                      <v-icon left>mdi-close-circle-outline</v-icon>
                      ปิด
                    </v-btn>
                  </v-row>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end edit -->
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
                  dense
                ></v-text-field>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="columns"
                  :items="dataItem"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                  <template v-slot:[`item.totalPoint`]="{ item }">
                    {{ formatNumber(item.totalPoint) }}
                  </template>
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateFUllTime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.picture`]="{ item }">
                    <v-avatar color="primary" size="40">
                      <img :src="item.picture" alt="img"
                    /></v-avatar>
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateFUllTime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop=";(dialogData = true), getDataById(item)"
                    >
                      <v-icon dark> mdi-account </v-icon>
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
import adminLeftMenu from '../Sidebar.vue' // เมนู
import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
import XLSX from 'xlsx' // import xlsx
import readXlsxFile from 'read-excel-file'
import VuetifyMoney from '../VuetifyMoney.vue'
// import moment from 'moment' // แปลง date

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    downloadExcel: JsonExcel,
    XLSX,
    readXlsxFile,
    VuetifyMoney
  },
  created () {
    setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      PK: '',
      path: '/member/', // Path Model
      returnLink: '/system/ListMember',
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'รายการลูกค้า',
          disabled: false,
          href: '/System/ListMember'
        }
      ],
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 9,
        precision: 0
      },
      // End Menu Config
      dataReady: true,
      dateTime: '', // Generate DateTime
      date: this.momenDate_1(new Date()),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      code: 'BCH_', // Generate Code
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogImport: false,
      dialogData: false,
      fromUpdate: [],
      // END Dialog Config ADD EDIT DELETE
      panel: [1],
      panel1: [1],
      session: this.$session.getAll(),
      // Search All
      searchAll: '',
      searchAll2: '',
      // Search Advanced
      search: {
        shopId: '',
        name: '',
        totalPoint: '',
        LevelName: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 50 || 'Name must be less than 50 characters'
      ],
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        { text: 'รูปโปรไฟล์', value: 'picture' },
        { text: 'ชื่อลูกค้า', value: 'name', align: 'left' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE', align: 'center' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE', align: 'center' }
        // { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      // End Data Table Config

      // Config Import
      columnsImport: [
        { text: 'masBranchID', value: 'masBranchID' },
        { text: 'masBranchCode', value: 'masBranchCode' },
        { text: 'masBranchName', value: 'masBranchName' },
        { text: 'masCompanyCode', value: 'masCompanyCode' },
        { text: 'masCompanyName', value: 'masCompanyName' }
      ],
      dataItemImportChecKHide: true,
      dataItemImport: [],
      // End Config Import
      // Export Config
      exportType: 'xls',
      exportFileName: 'Master-Branch.xls',
      exportWorksheet: 'WorkSheet',
      export_fields: {
        masBranchID: 'masBranchID',
        masBranchCode: 'masBranchCode',
        masBranchName: 'masBranchName',
        masCompanyCode: 'masCompanyCode',
        masCompanyName: 'masCompanyName'
      },
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ],
      // End Export Config
      Company: []
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login')
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    this.getDataList()
  },
  methods: {
    async getDataList () {
      this.dataReady = false
      // Clear Data ทุกครั้ง
      this.dataItem = []
      // Clear ช่องค้นหา
      this.searchAll = ''

      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            this.path +
            'get?RECORD_STATUS=N&shopId=' +
            this.session.data.shopId,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async response => {
          // var dateObj = new Date(response.data.CREATE_DATE)
          // var momentObj = moment(dateObj)
          // response.data.CREATE_DATE = momentObj.format('YYYY-MM-DD')
          if (response.data.length > 0) {
            console.log('getData', response.data)
            this.dataReady = true
            this.dataItem = response.data
          } else {
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
            this.dataReady = true
          }
          // this.export_data = response.data
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          this.$router.push('/system/Errorpage?returnLink=' + this.returnLink)
          this.dataReady = true
        })
    },
    async searchDataAll () {
      //
      //
      // สำหรับ ค้นหาแบบ LIKE Search
      // ต้องระบุ Field ที่จะส่งไปให้ตรงกับ Model
      //
      var search = '?name=' + this.searchAll + '&shopId=' + this.searchAll
      this.dataReady = false
      this.searchDataAllGlobal(
        this.DNS_IP,
        this.path,
        search,
        this.session.data.shopId,
        this.returnLink
      )
    },
    async saerchDataAdvanced () {
      var search = ''
      var check = false

      for (var key in this.search) {
        check = true
        if (this.search[key]) {
          if (search !== '') {
            search += '&'
          }
          search += key + '=' + this.search[key]
        }

        if (
          this.search.last_date_start === '' &&
          this.search.last_date_end !== ''
        ) {
          check = false
          this.$swal('ผิดพลาด', 'กรุณาเลือกวันที่แก้ไข เริ่มต้น', 'error')
        }

        if (
          this.search.create_date_start === '' &&
          this.search.create_date_end !== ''
        ) {
          check = false
          this.$swal('ผิดพลาด', 'กรุณาเลือกวันที่สร้าง เริ่มต้น', 'error')
        }
      }
      console.log('saerchDataAdvanced', search)
      //
      //
      // สำหรับ ค้นหาแบบ กำหนดจาก form serach
      //
      if (check === true) {
        this.dataReady = false

        this.saerchDataAdvancedGlobal(
          this.DNS_IP,
          this.path,
          search,
          this.session.data.shopId,
          this.returnLink
        )
      } else {
        this.dataReady = true
      }
    },
    async getDataById (item) {
      this.fromUpdate.name = item.name
      this.fromUpdate.point = item.point
      this.fromUpdate.level = item.level
      this.fromUpdate.picture = item.picture
      this.fromUpdate.tel = item.tel
      this.fromUpdate.birthDay = item.birthDay
      //   this.getDataByIdGlobal(this.DNS_IP, this.path, 'memberId', item.memberId, this.returnLink)
      console.log(item)
    },
    async clearData () {
      // this.getDataCompany()
      // eslint-disable-next-line no-redeclare
      // for (var key in this.formAdd) {
      //   if (this.formAdd[key]) {
      //     this.formAdd[key] = ''
      //   }
      // }

      // eslint-disable-next-line no-redeclare
      for (var key in this.search) {
        if (this.search[key]) {
          this.search[key] = ''
        }
      }
    }
  }
}
</script>
<style scope></style>
