<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
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
                  <template v-slot:[`item.tagData`]="{ item }">
                    <v-col cols="12" class="pt-0"  v-if="item.tagData.length > 0">
                        <v-chip-group
                          active-class="primary--text"
                          column
                        >
                          <v-chip
                            text-color="white" color="cyan"
                            v-for="(item , index) in item.tagDataShow" :key="index"
                          >
                            <v-avatar left>
                              <v-icon>mdi-tag-multiple</v-icon>
                            </v-avatar>
                            {{ item.text }}
                          </v-chip>
                        </v-chip-group>
                      </v-col>
                  </template>
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
                      color="info"
                      fab
                      x-small
                      dark
                      @click.stop="setDataProfile(item)"
                    >
                      <v-icon class="iconify" data-icon="icomoon-free:profile"> </v-icon>
                    </v-btn>
                    <!-- <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop=";(dialogData = true), getDataById(item)"
                    >
                      <v-icon dark> mdi-account </v-icon>
                    </v-btn> -->
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
            <v-dialog v-model="dialogDataProfile" scrollable persistent max-width="50%">
              <v-card>
                <v-card-title>
                  <span class="headline"></span>
                </v-card-title>
                <v-card-text v-if="profileStatus">
                  <v-container>
                    <v-row>
                      <v-col cols="6" class="text-left pt-5">
                        <h3><strong>รายละเอียดลูกค้า</strong></h3>
                      </v-col>
                      <v-col cols="6" class="pt-5">
                        <div style="text-align: end;">
                          <v-btn
                            class="mx-2"
                            fab
                            small
                            dark
                            color="white"
                            :style="styleCloseBt"
                            @click="dialogDataProfile = false, getDataList()"
                            >
                            X
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row >
                      <v-col class="main" col="12" md="12" sm="12" >
                        <v-card class="p-3 " rounded>
                          <div class="avatar text-center">
                            <v-avatar size="120" style="border:5px solid #FFFFFF;">
                            <v-img
                              v-if="dataProfile.pictureUrl"
                              :src="dataProfile.pictureUrl"
                            ></v-img>
                            <v-icon size="100" color="orange" v-else>
                              mdi-tooltip-account
                            </v-icon>
                          </v-avatar>
                          </div>
                          <br>
                          <v-card-text class="text-start"><h6 class="font-weight-bold">ชื่อลูกค้า : {{dataProfile.displayName}}</h6></v-card-text>
                          <v-card-text class="text-start"><h6 class="font-weight-bold">วันที่สร้าง : {{createProfile}}</h6></v-card-text>
                          <div class="text-center">
                            <v-btn
                              color="#1B437C"
                              dark
                              @click="openHistory(dataProfile)"
                            >
                              <v-icon left>mdi-content-copy</v-icon>
                              ประวัติเข้ารับบริการ
                            </v-btn>
                          </div>
                          <v-row v-if="phonenumItem.length > 0">
                            <v-col class="main" col="12" md="12" sm="12" >
                              <v-card class="p-3 " min-height="70vh" rounded>
                                <v-select
                                  v-model="phonenum"
                                  :items="phonenumItem"
                                  label="ค้นหาเบอร์โทร"
                                  dense
                                  solo
                                  @change="SelectDataHistory"
                                ></v-select>
                                  <v-timeline
                                  align-top
                                  dense
                                  v-if="phonenum.length > 0"
                                  >
                                    <v-timeline-item
                                    v-for="(item , index) in HistoryData[0]" :key="index"
                                    >
                                      <template v-slot:icon>
                                        <v-icon
                                          small dark>
                                          event</v-icon>
                                        </template>
                                      <div v-for="(item2 , index2) in item" :key="index2">
                                        <v-card-text class="text-start"><h6 class="font-weight-bold">{{format_dateThai(item2[0].dueDate)}}</h6></v-card-text>
                                        <v-card-text class="text-start"><h6 class="font-weight-bold">{{item2[0].flowName}}</h6></v-card-text>
                                        <v-card-text class="text-start"><h6 class="font-weight-bold">{{item2[0].masBranchName}}</h6></v-card-text>
                                        <div v-for="(item3 , index3) in item2" :key="index3">
                                          <v-card-text class="text-start" v-if="item3.fieldValue !== ''"><strong>{{item3.fieldName}} : </strong> {{item3.fieldValue}}</v-card-text>
                                        </div>
                                        <v-card-text v-if="item2[0].statusUpload1 === 'True' || item2[0].statusUpload2 === 'True'">
                                          <v-row>
                                            <v-col cols="auto" v-if="item2[0].statusUpload1 === 'True'">
                                              <v-btn
                                                tile
                                                color="#173053"
                                                dark
                                                small
                                                @click="showFileUpload(item2[0], '1')"
                                              >
                                                <v-icon left>
                                                  mdi-file-find
                                                </v-icon>
                                                Show File 1
                                              </v-btn>
                                            </v-col>
                                            <v-col cols="auto" v-if="item2[0].statusUpload2 === 'True'">
                                              <v-btn
                                                tile
                                                color="#173053"
                                                dark
                                                small
                                                @click="showFileUpload(item2[0], '2')"
                                              >
                                                <v-icon left>
                                                  mdi-file-find
                                                </v-icon>
                                                Show File 2
                                              </v-btn>
                                            </v-col>
                                          </v-row>
                                        </v-card-text>
                                      </div>
                                      </v-timeline-item>
                                  </v-timeline>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-text v-else>
                  <h5 class="font-weight-bold">ไม่สามารถเรียกข้อมูลลูกค้าได้</h5>
                  <h6 class="font-weight-bold">กรุณากดปุ่ม คัดลอกลิงค์</h6>
                  <v-btn
                    color="#1B437C"
                    small
                    dark
                    @click="FunCopyQrcode()"
                  >
                    <v-icon left>mdi-content-copy</v-icon>
                    คัดลอกลิงค์
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-dialog>
            <div v-if="!dataReady" class="text-center">
              <waitingAlert></waitingAlert>
            </div>
          </v-col>
          <!-- end data table -->
        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
import waitingAlert from '../waitingAlert.vue'
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
import XLSX from 'xlsx' // import xlsx
import readXlsxFile from 'read-excel-file'
import VuetifyMoney from '../VuetifyMoney.vue'
// import moment from 'moment' // แปลง date

export default {
  components: {
    waitingAlert,
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
      defaultData: [],
      phonenumItem: [],
      HistoryData: [],
      phonenum: [],
      dialogDataProfile: false,
      profileStatus: false,
      dataProfile: [],
      createProfile: '',
      linkUpdateUserId: '',
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
      columns: [],
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
      Company: [],
      tagItem: [],
      dataLineConfig: {}
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login')
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    this.dataLineConfig = await this.getDataLineConfig(this.$session.getAll().data.shopId)
    if (this.dataLineConfig.checkConfig === false) {
      this.columns = [
        { text: 'รูปโปรไฟล์', value: 'picture' },
        { text: 'ชื่อลูกค้า', value: 'name', align: 'left' },
        { text: 'Tag', value: 'tagData', align: 'center' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE', align: 'center' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE', align: 'center' }
      ]
    } else {
      this.columns = [
        { text: 'รูปโปรไฟล์', value: 'picture' },
        { text: 'ชื่อลูกค้า', value: 'name', align: 'left' },
        { text: 'Tag', value: 'tagData', align: 'center' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE', align: 'center' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE', align: 'center' },
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ]
    }
    this.dataReady = false
    // Get Data
    await this.getTagData()
    this.getDataList()
  },
  methods: {
    async SelectDataHistory () {
      this.HistoryData = []
      this.HistoryData.push(this.defaultData[this.phonenum])
      console.log('this.HistoryData', this.HistoryData)
    },
    async openHistory (item) {
      console.log('openHistory', item)
      const BookingData = await axios.get(this.DNS_IP + '/BookingData/get_history?shopId=' + this.$session.getAll().data.shopId + '&userId=' + item.userId)
        .then(async (response) => {
          return response.data
        })
        .catch((error) => {
          console.log('error function addData : ', error)
          return null
        })
      await this.ConvertHistoryData(BookingData)
    },
    async ConvertHistoryData (BookingData) {
      this.HistoryData = []
      this.phonenumItem = []
      // console.log('BookingData', BookingData)
      if (BookingData !== null) {
        if (BookingData.length > 0) {
          this.defaultData = BookingData.reduce((r, a) => {
            let bookNo = a.bookNo
            let filter = (a.fieldName === 'เบอร์โทร') ? a.fieldValue : null
            if (filter !== null) {
              r[filter] = r[filter] || {}
              r[filter][bookNo] = r[filter][bookNo] || []
              r[filter][bookNo].push(BookingData.filter(item => item.bookNo === a.bookNo))
              this.phonenumItem.push(filter)
            }
            return r
          }, Object.create(null))

          console.log(this.defaultData)
          this.phonenum = ''
        } else if (BookingData.status === false) {
          this.$swal('ไม่พบประวัติการเข้ารับบริการ', 'กรูณาตรวจสอบข้อมูล', 'info')
        }
      } else {
        this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
      }

      // console.log('this.HistoryData', this.HistoryData)
    },
    FunCopyQrcode () {
      // var copyText = document.getElementById('myInput')
      // copyText.select()
      // copyText.setSelectionRange(0, 99999)
      navigator.clipboard.writeText(this.linkUpdateUserId)
      this.$swal({
        title: 'Copy successfully',
        text: 'คัดลอกลิ้งสำเร็จ',
        type: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      this.dialogDataProfile = false
    },
    async setDataProfile (item) {
      this.HistoryData = []
      this.phonenumItem = []
      console.log('setDataProfile', item)
      this.dataReady = false
      this.profileStatus = false
      this.dataProfile = []
      let lineUserId = item.lineUserId || ''
      this.createProfile = item.CREATE_DATE || ''
      if (lineUserId === '') {
        this.profileStatus = false
        this.linkUpdateUserId = 'https://betask-linked.web.app/UpdateLineUserID?shopId=' + item.shopId + '&memberId=' + item.memberId
      } else {
        await axios
          .get(this.DNS_IP + '/line/getProfileByUserId?shopId=' + this.session.data.shopId + '&userId=' + lineUserId)
          .then(async response => {
            console.log('getProfileByUserId', response)
            let rs = response.data
            if (rs.message) {
              this.profileStatus = false
              this.linkUpdateUserId = 'https://betask-linked.web.app/UpdateLineUserID?shopId=' + item.shopId + '&memberId=' + item.memberId
            } else {
              this.profileStatus = true
              this.dataProfile = rs
              if (item.name !== rs.displayName || item.picture !== rs.pictureUrl) {
                const params = {
                  name: rs.displayName,
                  picture: rs.pictureUrl,
                  LAST_USER: rs.userId
                }
                const result = await this.callBeTaskAPIActivity('post', '/member/editWebhook/' + item.memberId, params)
                console.log('result', result.status)
              }
            }
          })
      }
      this.dialogDataProfile = true
      this.dataReady = true
    },
    async callBeTaskAPIActivity (method, url, params) {
      let result = null
      //   const token = this.$liff.getAccessToken() || '1234567890'
      await axios({
        method: method,
        // headers: {
        //   accessToken: token,
        //   lineUserId: this.profile.userId,
        //   activityId: this.formUpdate.activityId
        // },
        url: this.DNS_IP + url,
        data: params
      }).then((response) => {
        result = response.data
      }).catch((error) => {
        console.log(error)
        result = null
      })
      return result
    },
    async getTagData () {
      this.tagItem = await this.getDataFromAPI('/Mas_Tag/get', 'tagId', 'tagName', '')
    },
    async getDataFromAPI (url, fieldId, fieldName, param) {
      let result = []
      await axios
        .get(this.DNS_IP + `${url}?shopId=${this.session.data.shopId}${param}`)
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
            this.session.data.shopId
        )
        .then(async response => {
          if (response.data.length > 0) {
            this.dataReady = true
            let rs = response.data
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.picture = d.picture
              s.name = d.name
              s.CREATE_DATE = d.CREATE_DATE
              s.LAST_DATE = d.LAST_DATE
              s.tagData = JSON.parse(d.tagData) || []
              if (s.tagData.length > 0) {
                s.tagDataShow = []
                let memberDataTag = s.tagData
                for (let a = 0; a < memberDataTag.length; a++) {
                  let d = memberDataTag[a]
                  let x = {}
                  let checkTagItem = this.tagItem.filter(el => { return el.value === d })
                  if (checkTagItem.length > 0) {
                    x.text = checkTagItem[0].text
                    x.value = checkTagItem[0].value
                    s.tagDataShow.push(x)
                  }
                }
              }
              s.memberId = d.memberId
              s.lineUserId = d.lineUserId
              s.liffUserId = d.liffUserId
              s.shopId = d.shopId
              this.dataItem.push(s)
            }
          } else {
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
            this.dataReady = true
          }
          // this.export_data = response.data
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          // this.$router.push('/system/Errorpage?returnLink=' + this.returnLink)
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
