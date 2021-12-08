<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn
              color="#1B437C"
              depressed
              @click="dialogSelect = true"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              เลือก กิจกรรมหรือของรางวัลที่จะส่ง
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog v-model="dialogSelect" persistent max-width="60%">
          <v-card>
            <v-card-title class="text-h6">
              เลือก กิจกรรมหรือของรางวัลที่จะส่ง
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-row style="height: 15px">
                    <v-subheader id="subtext"
                      >กรุณาเลือก แหล่งที่มาของข้อมูล</v-subheader
                    >
                  </v-row>
                  <v-row style="height: 65px">
                    <v-select
                      :items="selectItem"
                      v-model="selectData"
                      dense
                      @change="selectDB()"
                    ></v-select>
                  </v-row>
                </v-col>
                <v-col cols="12" v-if="showTabel">
                  <v-card elevation="7" v-if="dataReady">
                    <v-card-title>
                      <v-text-field
                        v-model="searchAll2"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        dense
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                        :headers="columns"
                        :items="dataItem"
                        :search="searchAll2"
                        :items-per-page="10"
                        dense
                      >
                        <template v-slot:[`item.CREATE_DATE`]="{ item }">
                          {{ format_dateNotime(item.CREATE_DATE) }}
                        </template>
                        <template v-slot:[`item.LAST_DATE`]="{ item }">
                          {{ format_dateNotime(item.LAST_DATE) }}
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                          <v-btn
                            class="ma-2"
                            color="question"
                            small
                            @click.stop="
                              ;(dialogSelect = false), getDataById(item)
                            "
                          >
                            เลือก
                            <!-- <v-icon dark> mdi-arrange-send-to-back </v-icon> -->
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
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="btn1 btn-color" @click="dialogSelect = false">
                ปิด
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row v-if="dataSelect">
          <v-col cols="12">
            <v-container>
              <v-card class="mx-auto" elevation="2" outlined shaped>
                <v-container>
                  <v-card-title>
                    <span class="text-h6">บรอดแคสต์</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form
                      ref="form_update"
                      v-model="validUpdate"
                      lazy-validation
                    >
                      <v-row>
                        <v-col cols="4" class="text-center">
                          <v-card elevation="2" class="mx-auto">
                            <v-container>
                              <v-card-title>เป้าหมายโดยประมาณ</v-card-title>
                              <v-card-text>
                                <v-progress-circular
                                  :rotate="360"
                                  :size="100"
                                  :width="15"
                                  :value="valueAdd"
                                  color="teal"
                                >
                                  {{ valueAdd }} %
                                </v-progress-circular>
                              </v-card-text>
                              <v-card-text>ประมาณ {{ dataAdd }} คน</v-card-text>
                            </v-container>
                          </v-card>
                          <br />
                          <v-card elevation="2" class="mx-auto">
                            <v-container>
                              <v-card-title>รายชื่อลูกค้า</v-card-title>
                              <v-card-text>
                                <v-list
                                  subheader
                                  dense
                                  style="max-height: 300px"
                                  class="overflow-y-auto"
                                >
                                  <v-list-item
                                    v-for="(item, index) in dataUserLine"
                                    :key="index"
                                  >
                                    <v-list-item-avatar>
                                      <v-img
                                        :alt="`${index} avatar`"
                                        :src="item.picture"
                                      ></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                      <v-list-item-title
                                        class="item__title"
                                        v-text="item.name"
                                      ></v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-divider inset></v-divider>
                                </v-list>
                              </v-card-text>
                            </v-container>
                          </v-card>
                        </v-col>
                        <v-col cols="8" class="text-center">
                          <v-row>
                            <v-col cols="12" class="text-center">
                              <v-img
                                aspect-ratio="6"
                                contain
                                :src="formUpdate.pictureUrl"
                              ></v-img>
                            </v-col>
                            <v-col cols="12">
                              <v-row style="height: 15px">
                                <v-subheader id="subtext"
                                  >เลือก Audience</v-subheader
                                >
                              </v-row>
                              <v-row style="height: 65px">
                                <v-select
                                  :items="dataAudience"
                                  v-model="selectAudience"
                                  dense
                                  required
                                  :rules="[rules.required]"
                                  @change="getDataAdd()"
                                ></v-select>
                              </v-row>
                            </v-col>
                            <v-col cols="12">
                              <v-row style="height: 25px">
                                <v-subheader id="subtext"
                                  >ข้อความที่จะส่ง</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-textarea
                                  auto-grow
                                  rows="2"
                                  name="input-7-4"
                                  placeholder="ข้อความที่จะส่ง"
                                  counter
                                  dense
                                  required
                                  :rules="[rules.required]"
                                  v-model="formUpdate.title"
                                ></v-textarea>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      elevation="2"
                      x-large
                      color="success"
                      :disabled="!validUpdate"
                      @click="sendPush()"
                    >
                      <v-icon left>mdi-checkbox-marked-circle</v-icon>
                      ส่ง
                    </v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
        <!-- <v-row v-if="!dataSelect">
          <v-col cols="12">
            <v-container>
              <v-card class="mx-auto" elevation="2" outlined shaped>
                <v-container>
                  <v-card-title>
                    <span class="text-h6">บรอดแคสต์</span>
                  </v-card-title>
                  <v-card-text>
                    <v-stepper v-model="e1">
                      <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1">
                          step 1
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step :complete="e1 > 2" step="2">
                          step 2
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3">
                          step 3
                        </v-stepper-step>
                      </v-stepper-header>

                      <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-card class="mx-auto" color="grey lighten-1">
                            <v-img :src="require('@/assets/bc1.jpg')"></v-img>
                          </v-card>

                          <v-btn color="primary" @click="e1 = 2">
                            Continue
                          </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                          <v-card class="mx-auto" color="grey lighten-1">
                            <v-img :src="require('@/assets/bc2.jpg')"></v-img>
                          </v-card>

                          <v-btn color="primary" @click="e1 = 3">
                            Continue
                          </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                          <v-card class="mx-auto" color="grey lighten-1">
                            <v-img :src="require('@/assets/bc3.jpg')"></v-img>
                          </v-card>

                          <v-btn color="primary" @click="e1 = 1">
                            Continue
                          </v-btn>
                        </v-stepper-content>
                      </v-stepper-items>
                    </v-stepper>
                  </v-card-text>
                </v-container>
              </v-card>
            </v-container>
          </v-col>
        </v-row> -->
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
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.blogExpiryDate`]="{ item }">
                    {{ format_dateNotime(item.blogExpiryDate) }}
                  </template>
                  <template v-slot:[`item.pictureUrl`]="{ item }">
                    <v-avatar color="primary" size="40">
                      <img :src="item.pictureUrl" alt="img"
                    /></v-avatar>
                  </template>
                  <!-- <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop="getDataById(item, 'edit')"
                    >
                      <v-icon dark> mdi-tools </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      fab
                      x-small
                      @click.stop="getDataById(item, 'delete')"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template> -->
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
      </div>
    </v-main>
  </div>
</template>
<style scoped>
.item__title {
  color: black !important;
  font-family: KittithadaBold !important;
  font-size: 20px !important;
}
</style>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import axios from 'axios' // api
export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  data () {
    return {
      e1: 1,
      valueAdd: 0,
      dataAdd: 0,
      searchAll2: '',
      dataReady: true,
      dataSelect: false,
      returnLink: '/BroadCast/BroadCast',
      session: this.$session.getAll(),
      dialogSelect: false,
      showTabel: false,
      validUpdate: true,
      selectItem: ['ของรางวัล', 'กิจกรรม'],
      selectData: '',
      selectAudience: '',
      rules: {
        required: value => !!value || 'กรุณากรอก.'
      },
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'บรอดแคสต์',
          disabled: false,
          href: '/BroadCast/BroadCast'
        }
      ],
      columns: [
        { text: 'รูป', value: 'pictureUrl' },
        { text: 'กลุ่มเป้าหมาย', value: 'audiencesName' },
        { text: 'ประเภท', value: 'module' },
        { text: 'วันอัพเดท', value: 'LAST_DATE' }
      ],
      dataItem: [],
      formUpdate: {},
      dataAudience: [],
      dataUserLine: [],
      idData: '',
      referId: '',
      path: ''
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
            '/broadcast/get?RECORD_STATUS=N&shopId=' +
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
    validate (Action) {
      switch (Action) {
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
    async selectDB () {
      this.columns = []
      this.showTabel = false
      if (this.selectData === 'ของรางวัล') {
        this.columns = [
          { text: 'ชื่อ', value: 'name' },
          { text: 'คะแนน', value: 'point' },
          { text: 'โควต้า', value: 'quota' },
          { text: 'ระดับ', value: 'levelNm' },
          { text: 'คำอธิบาย', value: 'description' },
          { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
          { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
          { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
        ]
        this.showTabel = true
        await this.getDataGlobal(
          this.DNS_IP,
          '/reward/',
          this.session.data.shopId,
          this.returnLink
        )
        this.idData = 'rewardId'
        this.path = '/reward/'
      } else if (this.selectData === 'กิจกรรม') {
        this.columns = [
          { text: 'หัวข้อ', value: 'title' },
          { text: 'ประเภท', value: 'type' },
          { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
          { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
          { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
        ]
        this.showTabel = true
        await this.getDataGlobal(
          this.DNS_IP,
          '/activity/',
          this.session.data.shopId,
          this.returnLink
        )
        this.idData = 'activityId'
        this.path = '/activity/'
      }
    },
    async getDataById (item) {
      this.dataReady = false
      this.referId = ''
      if (this.idData === 'rewardId') {
        this.referId = item.rewardId
      } else if (this.idData === 'activityId') {
        this.referId = item.activityId
      }
      await this.getDataByIdGlobal(
        this.DNS_IP,
        this.path,
        this.idData,
        this.referId,
        this.returnLink
      )
      this.dataSelect = true
      await this.getAudience()
      this.validate('UPDATE')
      console.log(this.formUpdate)
    },
    async getAudience () {
      // Clear Data ทุกครั้ง
      this.dataAudience = []
      // console.log('getDataTypeGroup')
      await axios
        .get(
          this.DNS_IP + '/audiences/get?shopId=' + this.session.data.shopId
        )
        .then(async response => {
          let rs = response.data
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            // var s = {}
            d.value = d.id
            d.text = d.audiencesName
            console.log(d)
            this.dataAudience.push(d)
          }
        })
        .catch(error => {
          console.log(error)
          this.$router.push('/system/Errorpage?returnLink=' + this.returnLink)
        })
    },
    async getDataAdd () {
      var data = this.dataAudience.filter(el => {
        return el.id === this.selectAudience
      })
      var dataUse = data[0]
      this.valueAdd = 0
      this.dataAdd = 0
      this.dataUserLine = []
      var num = 0
      await axios
        .get(
          this.DNS_IP + '/member/get?shopId=' + this.session.data.shopId
        )
        .then(async response => {
          console.log('response', response.data)
          if (response.data.status === false) {
            this.valueAdd = 0
            this.dataAdd = 0
          } else {
            num = response.data.length
            this.valueAdd = 100
            this.dataAdd = num
            if (dataUse.audiencesLastUseAll === 0) {
              dataUse.audiencesLastUseAll = ''
            }
            var url = ''
            if (
              (
                dataUse.audiencesLevel +
                dataUse.audiencesCoinStart +
                dataUse.audiencesCoinEnd +
                dataUse.audiencesExchangeRate +
                dataUse.audiencesLastUseAll
              ).length === 0
            ) {
              this.valueAdd = 100
              this.dataAdd = num
            } else if (
              dataUse.audiencesCoinStart === 0 &&
              dataUse.audiencesCoinEnd === 0 &&
              dataUse.audiencesLastUseAll === 0 &&
              this.formUpdate.audiencesExchangeRate === 0
            ) {
              if (dataUse.audiencesLevel === 'allLevel') {
                url =
                  this.DNS_IP +
                  '/member/getAudience?shopId=' +
                  this.session.data.shopId
              } else {
                url =
                  this.DNS_IP +
                  '/member/getAudience?shopId=' +
                  this.session.data.shopId +
                  '&levelId=' +
                  dataUse.audiencesLevel
              }
            } else {
              if (
                parseInt(dataUse.audiencesCoinStart || '0') +
                  parseInt(dataUse.audiencesCoinEnd || '0') >
                0
              ) {
                if (
                  parseInt(dataUse.audiencesCoinStart || '0') <
                  parseInt(dataUse.audiencesCoinEnd || '0')
                ) {
                  if (dataUse.audiencesLevel === 'allLevel') {
                    url =
                      this.DNS_IP +
                      '/member/getAudience?shopId=' +
                      this.session.data.shopId +
                      '&levelId=' +
                      dataUse.audiencesLevel +
                      '&coin=' +
                      dataUse.audiencesCoinStart +
                      ' ' +
                      dataUse.audiencesCoinEnd +
                      '&lastProductExchangeRateId=' +
                      dataUse.audiencesExchangeRate
                  } else {
                    url =
                      this.DNS_IP +
                      '/member/getAudience?shopId=' +
                      this.session.data.shopId +
                      '&levelId=' +
                      dataUse.audiencesLevel +
                      '&coin=' +
                      dataUse.audiencesCoinStart +
                      ' ' +
                      dataUse.audiencesCoinEnd +
                      '&lastUes=' +
                      dataUse.audiencesLastUseAll +
                      '&lastProductExchangeRateId=' +
                      dataUse.audiencesExchangeRate
                  }
                } else {
                  if (dataUse.audiencesLevel === 'allLevel') {
                    this.$swal(
                      'ผิดพลาด',
                      'กรุณาตั้ง Coin ไม่เกิน ให้มากกว่า Coin ขั้นต่ำ',
                      'error'
                    )
                    url =
                      this.DNS_IP +
                      '/member/getAudience?shopId=' +
                      this.session.data.shopId +
                      '&lastUes=' +
                      dataUse.audiencesLastUseAll +
                      '&lastProductExchangeRateId=' +
                      dataUse.audiencesExchangeRate
                  } else {
                    this.$swal(
                      'ผิดพลาด',
                      'กรุณาตั้ง Coin ไม่เกิน ให้มากกว่า Coin ขั้นต่ำ',
                      'error'
                    )
                    url =
                      this.DNS_IP +
                      '/member/getAudience?shopId=' +
                      this.session.data.shopId +
                      '&levelId=' +
                      dataUse.audiencesLevel +
                      '&lastUes=' +
                      dataUse.audiencesLastUseAll +
                      '&lastProductExchangeRateId=' +
                      dataUse.audiencesExchangeRate
                  }
                }
              } else {
                if (dataUse.audiencesLevel === 'allLevel') {
                  url =
                    this.DNS_IP +
                    '/member/getAudience?shopId=' +
                    this.session.data.shopId +
                    '&lastUes=' +
                    dataUse.audiencesLastUseAll +
                    '&lastProductExchangeRateId=' +
                    dataUse.audiencesExchangeRate
                } else {
                  url =
                    this.DNS_IP +
                    '/member/getAudience?shopId=' +
                    this.session.data.shopId +
                    '&levelId=' +
                    dataUse.audiencesLevel +
                    '&lastUes=' +
                    dataUse.audiencesLastUseAll +
                    '&lastProductExchangeRateId=' +
                    dataUse.audiencesExchangeRate
                }
              }
              await axios.get(url).then(async res => {
                // console.log('res', res.data)
                this.dataUserLine = []
                if (res.data.status === false) {
                  this.valueAdd = parseInt((0 / num) * 100)
                  this.dataAdd = 0
                  // console.log('memberCard1', res.data)
                  for (var i = 0; i < num; i++) {
                    var d = response.data[i]
                    var s = {}
                    s.lineUserId = d.lineUserId
                    s.picture = d.picture
                    s.name = d.name
                    this.dataUserLine.push(s)
                  }
                } else {
                  this.valueAdd = parseInt((res.data.length / num) * 100)
                  this.dataAdd = res.data.length
                  console.log('memberCard2', res.data)
                  for (var x = 0; x < res.data.length; x++) {
                    var dt = res.data[x]
                    var ss = {}
                    console.log(dt)
                    ss.lineUserId = dt.lineUserId
                    ss.picture = dt.picture
                    ss.name = dt.name
                    this.dataUserLine.push(ss)
                  }
                }
              })
            }
          }
        })
    },
    async sendPush () {
      this.$swal({
        title: 'ต้องการ แจ้งเตือน ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        var modules = ''
        if (this.idData === 'rewardId') {
          modules = 'ของรางวัล'
        } else if (this.idData === 'activityId') {
          modules = 'กิจกรรม'
        }
        var data = {
          shopId: this.session.data.shopId,
          audiencesId: this.selectAudience,
          module: modules,
          referId: this.referId,
          pictureUrl: this.formUpdate.pictureUrl,
          message: this.formUpdate.title,
          subName: this.formUpdate.subName,
          quota: this.formUpdate.quota,
          point: this.formUpdate.point,
          coin: this.formUpdate.coin,
          endDateStr: this.formUpdate.endDateStr,
          lineUserId: this.dataUserLine,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
        }
        await axios
          .post(
            // eslint-disable-next-line quotes
            this.DNS_IP + '/broadcast/add',
            data
          )
          .then(async response => {
            console.log('addDataGlobal DNS_IP + PATH + "add"', response)
            this.dataSelect = false
            this.formUpdate = {}
            this.dataUserLine = []
            this.referId = ''
            this.selectAudience = ''
            this.valueAdd = 0
            this.dataAdd = 0
            this.dataAudience = []
            this.dataUserLine = []
            this.dataItem = []
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log(error)
            this.$router.push('/system/Errorpage?returnLink=' + this.returnLink)
            this.dataReady = true
          })
      })
    }
  }
}
</script>
<style scoped>
</style>
