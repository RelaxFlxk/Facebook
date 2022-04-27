<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="px-lg-4" style="overflow-x: hidden;">
        <v-row class="no-gutters">
          <v-col cols="12" md="6" lg="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="12" md="6" lg="6" class="text-right"> </v-col>
        </v-row>
        <v-row class="no-gutters">
          <v-col cols="12" md="6" lg="6" class="text-right">
            <v-select
              v-model="selectFlow"
              :items="itemFlow"
              menu-props="auto"
              label="ประเภทบริการ"
              hide-details
              prepend-icon="mdi-format-list-bulleted-type"
              single-line
              @change="getDataJob()"
            >
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-tabs v-model="tab" background-color="blue lighten-5" grow>
              <v-tabs-slider color="red"></v-tabs-slider>

              <v-tab v-for="(item, indexitem) in itemFlowStep" @click="cheSort(item)" :key="indexitem">
                {{ item.text }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" v-if="itemJob.length > 0">
              <v-tab-item
                v-for="(item, indexitem) in itemFlowStep"
                :key="indexitem"
                style="background-color:#eee"
                class="pb-5"
              >
                <div
                  v-for="(items, indexitems) in itemJob.filter(el => {
                    return el.stepId === item.value;
                  })"
                  :key="indexitems"
                >
                  <v-card
                    class="mx-2 mt-4 p-1"
                    color="#FFFFFF"
                    elevation="2"
                    :style="items.jobNo === jobNo ? 'border: 1px solid red;' : 'border: 1px solid white;'">
                  <v-row>
                      <v-col class="col-xs-4 col-sm-4 col-md-2 col-lg-2">
                        <v-sheet
                          rounded="xl"
                          width="100"
                          height="100"
                          color="blue darken-1"
                          class="text-center justify-center pt-4"
                        >
                          <!-- <span class="font-weight-bold white--text text-subtitle-2">{{format_dateThai(items.dueDate)}}</span><br>
                          <v-icon dark>
                            mdi-clock-outline
                          </v-icon> <span class="font-weight-bold white--text">{{momenTime(items.dueDate)}}</span> -->
                          <span class="font-weight-bold white--text text-subtitle-2">{{items.dataShow}}</span><br>
                          <v-icon dark>
                            mdi-clock-outline
                          </v-icon> <span class="font-weight-bold white--text">{{items.timeDue}}</span>
                        </v-sheet>
                      </v-col>
                      <v-col cols="8" class="pl-3">
                        <div v-for="(itemJobs, indexitemJob) in dataJob.filter(el => {return el.jobNo === items.jobNo;})" :key="indexitemJob">
                          <span class="font-weight-bold">{{itemJobs.fieldName}} :</span>
                          <span>{{itemJobs.fieldValue}}</span>
                        </div>
                        <div v-if="items.onsiteStartDateFomatTH">
                          <span class="font-weight-bold">เริ่มงาน :</span>
                          <span>{{items.onsiteStartDateFomatTH}}</span>
                        </div>
                        <div v-if="items.onsiteEndDateFomatTH">
                          <span class="font-weight-bold">เสร็จงาน :</span>
                          <span>{{items.onsiteEndDateFomatTH}}</span>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col class="m-2">
                        <v-btn
                          tile
                          color="deep-orange white--text"
                          @click="setShowMap(items)"
                        >
                          <v-icon left>
                            mdi-map-marker-radius-outline
                          </v-icon>
                          แผนที่
                        </v-btn>
                        <v-btn
                          tile
                          color="yellow darken-3 white--text"
                          @click="callCustomer(dataJob.filter(el => {return el.jobNo === items.jobNo;}))"
                        >
                          <v-icon left>
                            mdi-phone-outline
                          </v-icon>
                          โทร
                        </v-btn>
                        <v-btn
                          tile
                          color="info"
                          @click="detailsJob(items, dataJob.filter(el => {return el.jobNo === items.jobNo;}))"
                        >
                          <v-icon left>
                            mdi-clipboard-text-outline
                          </v-icon>
                          รายละเอียด
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-btn
                          v-if="items.sortNo === 1"
                          block
                          color="success"
                          class="mr-3"
                          @click="updateJobStart(items.sortNo, items.jobId, items)"
                        >
                          <v-icon left>
                            mdi-account-check-outline
                          </v-icon>
                          เริ่มงาน
                        </v-btn>
                        <v-btn
                          v-if="items.sortNo === 2"
                          block
                          color="success"
                          @click="closeJobStart(items.sortNo, items.jobId, items)"
                        >
                          <v-icon left>
                            mdi-water-check
                          </v-icon>
                          ปิดงาน
                        </v-btn>
                    </v-card-actions>

                    <div v-if="sortNo === 2">
                      <v-row>
                        <v-col cols="6" class="pb-0 text-center"><v-subheader>Before</v-subheader></v-col>
                        <v-col cols="6" class="pb-0 text-center"><v-subheader>After</v-subheader></v-col>
                      </v-row>
                      <v-row v-for="(itemBeforeAfter, indexBeforeAfter) in items.dataBeforeAfter" :key="indexBeforeAfter">
                        <v-col cols="6" class="pb-0">
                          <v-img
                            aspect-ratio="2"
                            contain
                            min-height="150"
                            :src="itemBeforeAfter.beforeImage"
                          ></v-img>
                            <v-row >
                              <v-col cols="6" class="text-right">
                                <v-file-input
                                hide-input
                                class="pt-0 ml-6"
                                color="info"
                                accept="image/*"
                                @change="selectImgUpdate(itemBeforeAfter,'before')"
                                v-model="itemBeforeAfter.filesBefore"
                                prepend-icon="mdi-camera"
                              ></v-file-input>
                              </v-col>
                              <v-col cols="6" class="text-left" v-if="itemBeforeAfter.beforeImage">
                                <v-btn
                                icon
                                dark
                                x-small
                                color="red"
                                @click="deleteBeforeAfter(itemBeforeAfter,'before')"
                              >
                                <v-icon dark>
                                  mdi-delete-circle
                                </v-icon>
                              </v-btn>
                              </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6" class="pb-0">
                          <v-img
                            aspect-ratio="2"
                            contain
                            min-height="150"
                            :src="itemBeforeAfter.afterImage"
                          ></v-img>
                          <v-row >
                              <v-col cols="6" class="text-right">
                                <v-file-input
                                hide-input
                                class="pt-0 ml-6"
                                color="info"
                                accept="image/*"
                                @change="selectImgUpdate(itemBeforeAfter,'after')"
                                v-model="itemBeforeAfter.filesAfter"
                                prepend-icon="mdi-camera"
                              ></v-file-input>
                              </v-col>
                              <v-col cols="6" class="text-left" v-if="itemBeforeAfter.afterImage">
                                <v-btn
                                icon
                                dark
                                x-small
                                color="red"
                                 @click="deleteBeforeAfter(itemBeforeAfter,'after')"
                              >
                                <v-icon dark>
                                  mdi-delete-circle
                                </v-icon>
                              </v-btn>
                              </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" class="pb-0 pt-0 text-center">
                          <v-btn
                            tile
                            x-small
                            color="error"
                            @click="deleteBeforeAfterAll(itemBeforeAfter)"
                          >
                            <v-icon left>
                              mdi-delete-circle
                            </v-icon>
                            ทั้งหมด
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" class="pt-0 text-center">
                          <v-btn
                            class="ma-2"
                            outlined
                            small
                            fab
                            @click="addBeforeAfter(items.dataBeforeAfter, items)"
                            color="indigo"
                          >
                            <v-icon>mdi-plus-circle-multiple</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
          <v-dialog v-model="dialogMap" :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>
                แสดงแผนที่
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" class="pb-0">
                      <v-text-field
                        v-model="address"
                        outlined
                        label="ชื่อของที่อยู่"
                        auto-grow
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pb-0">
                      <v-card class="text-center">
                          <GmapMap
                            v-if="center !== null"
                            :center="center"
                            :zoom="15"
                            style="width: 100%; height: 200px"
                            :options="{ disableDefaultUI: true }"
                          >
                            <GmapMarker @click="gotoMap()" :position="center" />
                            <gmap-info-window
                              :opened="true"
                              :position="center"
                              :options="{
                                pixelOffset: {
                                  width: 0,
                                  height: -35
                                }
                              }"
                          >
                              กดที่หมุดเพื่อ นำทาง
                          </gmap-info-window>
                          </GmapMap>
                      </v-card>
                    </v-col>
                  </v-row>
                  <hr />
                  <div class="text-center">
                    <v-btn
                      elevation="10"
                      color="#173053"
                      outlined
                      style="background-color:#FFFFFF"
                      small
                      @click="dialogMap = false"
                      >ปิด</v-btn
                    >
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
        <v-dialog v-model="dialogDetail" :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title><b>รายละเอียดนัดหมาย</b></v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="text-right">ประเภทบริการ</v-col>
                  <v-col class="text-left">{{dataInfo.flowName}}</v-col>
                </v-row>
                <v-row>
                  <v-col class="text-right">วันที่ต้องการนัดหมาย</v-col>
                  <v-col class="text-left">{{dataInfo.dueDateFomatTH}}</v-col>
                </v-row>
                <v-row  v-for="(row, indexitemJob) in dataJob.filter(el => {return el.jobNo === dataInfo.jobNo;})" :key="indexitemJob">
                  <v-col class="text-right">{{row.fieldName}}</v-col>
                  <v-col class="text-left">{{row.fieldValue}}</v-col>
                </v-row>
                <template v-if="dataInfoPackage.length > 0">
                  <v-subheader>ข้อมูลแพ็คเกจ</v-subheader>
                  <v-card
                    class="mb-0 mt-0"
                    height="auto"
                    style="box-shadow: 0px 4px 4px 0px #00000040;padding:15px;border-radius: 20px;"
                  >
                    <v-row v-for="(item, indexInfoPackage) in dataInfoPackage" :key="indexInfoPackage">
                      <v-col cols="4" style="padding-top:10px;" align="center">
                        <img :src="item.packageImg" style="width: 85px; height: 85px;border-radius: 25px;border-style: solid;border-color: #eeee;" class="link"/>
                      </v-col>
                      <v-col cols="8" class="pl-3 pr-0 text-left">
                        <div class="font16 bold mt-1">
                          <v-col class="pa-0">{{ item.packageName }}</v-col>
                          <v-col class="pl-0 pt-0 pb-1 font12">ใช้ก่อนวันที่ {{ format_dateFUllTime(new Date(item.expirePackage * 1000)) }}</v-col>
                          <v-col class="pl-0 pt-0 pb-1 font12">จำนวนการใช้ {{ item.balanceAmount }} / {{ item.amount }}</v-col>
                          <v-col v-if="item.packageDetail" class="pl-0 pt-0 pb-1 font12">รายละเอียด {{item.packageDetail}}</v-col>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </template>
              </v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-btn
                    depressed
                    color="error"
                    block
                    @click="dialogDetail = false"
                  >
                  ปิดหน้านี้
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import moment from 'moment-timezone' // แปลง date
export default {
  name: 'JobList',
  components: {
    'left-menu-admin': adminLeftMenu
  },
  computed: {
    dialogwidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '90%'
        case 'sm': return '80%'
        case 'md': return '70%'
        case 'lg': return '70%'
        case 'xl': return '70%'
      }
    }
  },
  data () {
    return {
      monthNamesThai: ['', 'ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'],
      swalConfig: {
        title: null,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      },
      session: this.$session.getAll(),
      breadcrumbs: [
        {
          text: 'รายการงานทั้งหมด',
          disabled: false,
          href: '/Onsite/JobList'
        }
      ],
      dialogDetail: false,
      itemFlow: [],
      selectFlow: '',
      tab: null,
      itemFlowStep: [],
      itemJob: [],
      dataJob: [],
      center: null,
      address: '',
      dialogMap: false,
      sortNo: '',
      jobNo: '',
      dataInfo: {},
      dataInfoPackage: []
    }
  },
  async mounted () {
    this.beforeCreate()
  },
  methods: {
    async beforeCreate () {
      if (JSON.parse(localStorage.getItem('sessionData')) !== null) {
        if (JSON.parse(localStorage.getItem('sessionData')).shopId === this.$route.query.shopId && this.$route.query.type === 'jobList' && JSON.parse(localStorage.getItem('sessionData')).empId === this.$route.query.empId) {
          if (this.$session.id() !== undefined) {
            await this.getDataFlow()
            await this.checkJobList()
          } else {
            this.$session.start()
            this.$session.set('data', JSON.parse(localStorage.getItem('sessionData')))
            location.reload()
            // await this.getDataFlow()
            // await this.checkJobList()
          }
        } else {
          if (this.$route.query.type === 'jobList') {
            this.$swal('ผิดพลาด', 'รายการนี้ไม่ได้มอบหมายให้คุณ', 'error')
            this.$router.push('/Onsite/JobList')
            // this.$router.push('/Core/Login?jobNo=' + this.$route.query.jobNo + '&shopId=' + this.$route.query.shopId + '&type=jobList&empId=' + this.$route.query.empId)
          } else {
            if (this.$session.id() === undefined) {
              this.$session.start()
              this.$session.set('data', JSON.parse(localStorage.getItem('sessionData')))
              // await this.getDataFlow()
              location.reload()
            } else {
              await this.getDataFlow()
            }
          }
        }
      } else {
        if (!this.$session.exists()) {
          if (this.$route.query.type === 'jobList') {
            this.$router.push('/Core/Login?jobNo=' + this.$route.query.jobNo + '&shopId=' + this.$route.query.shopId + '&type=jobList&empId=' + this.$route.query.empId)
          } else {
            this.$router.push('/Core/Login')
          }
        } else {
          if (this.$session.getAll().data.shopId === this.$route.query.shopId && this.$route.query.type === 'jobList' && this.$session.getAll().data.empId === this.$route.query.empId) {
            localStorage.setItem('sessionData', JSON.stringify(this.$session.getAll().data))
            await this.getDataFlow()
            await this.checkJobList()
          } else if (this.$session.id() !== undefined && this.$route.query.type === undefined) {
            localStorage.setItem('sessionData', JSON.stringify(this.$session.getAll().data))
            await this.getDataFlow()
          } else {
            if (this.$route.query.type === 'jobList') {
              this.$swal('ผิดพลาด', 'รายการนี้ไม่ได้มอบหมายให้คุณ', 'error')
              this.$router.push('/Onsite/JobList')
              // this.$router.push('/Core/Login?jobNo=' + this.$route.query.jobNo + '&shopId=' + this.$route.query.shopId + '&type=jobList&empId=' + this.$route.query.empId)
            } else {
              this.$router.push('/Core/Login')
            }
          }
        }
      }
      // console.log(JSON.stringify(this.$session.getAll().data))
    },
    async checkJobList () {
      await axios
        .get(
          this.DNS_IP +
            '/job/getList?shopId=' +
            this.$session.getAll().data.shopId +
            '&empStep=' +
            this.$session.getAll().data.empId +
            '&jobNo=' + this.$route.query.jobNo
        )
        .then(async response => {
          console.log('beforeCreate', response.data)
          if (response.data.status === false) {

          } else {
            this.selectFlow = parseInt(response.data[0].flowId)
            await this.getDataFlowStep()
            await this.checkEmpJob()
            await this.getJobData()
            if (response.data[0].sortNo === 2) {
              this.tab = 1
              this.sortNo = 2
            } else {
              this.tab = 0
              this.sortNo = ''
            }
            this.jobNo = this.$route.query.jobNo
          }
        })
    },
    async detailsJob (data, packageId) {
      this.dataInfo = {}
      this.dataInfoPackage = []
      this.dataInfo = data
      console.log('detailsJob', data)
      var packageIds = packageId[0].packageId || ''
      if (packageIds !== '') {
        await axios.get(this.DNS_IP_Loyalty + '/PackageLog/get?shopId=' + data.shopId + '&lineUserId=' + data.lineUserId + '&packageId=' + packageIds).then(response => {
          console.log('PackageLog', response.data)
          let rs = response.data
          if (rs.status === false) {
            this.dataInfoPackage = []
          } else {
            this.dataInfoPackage = rs
          }
        })
      }
      console.log('this.dataInfoPackage', this.dataInfoPackage)
      this.dialogDetail = true
    },
    callCustomer (data) {
      console.log('dataJob', data)
      if (data.filter(el => { return el.fieldName === 'เบอร์โทร' }).length > 0) {
        window.location = 'tel:' + data.filter(el => { return el.fieldName === 'เบอร์โทร' })[0].fieldValue
      } else {
        this.$swal(
          'ผิดพลาด',
          'ไม่มีเบอร์โทร',
          'error'
        )
      }
    },
    handleFileImportBefore () {
      window.addEventListener('focus', () => {
      }, { once: true })

      // Trigger click on the FileInput
      this.$refs.uploaderBefore.click()
    },
    async addBeforeAfter (item, dt) {
      console.log('addBeforeAfter', item)
      if (item[item.length - 1].afterImage === null && item[item.length - 1].beforeImage === null) {
        this.$swal(
          'ผิดพลาด',
          'กรุณาเพิ่มรูปภาพด้านบนก่อน',
          'error'
        )
      } else {
        item = []
        let dajobBeforeAfter = {
          jobId: dt.jobId,
          CREATE_USER: this.$session.getAll().data.userName,
          LAST_USER: this.$session.getAll().data.userName
        }
        await axios
          .post(this.DNS_IP + '/jobBeforeAfter/add', dajobBeforeAfter)
          .then(async response => {
            await this.checkEmpJob()
            // await axios
            //   .get(
            //     this.DNS_IP + '/jobBeforeAfter/get?jobId=' + dt.jobId
            //   )
            //   .then(async responses => {
            //     item = responses.data
            //   })
          })
      }
    },
    async selectImgUpdate (item, text) {
      console.log(item, text)
      if (text === 'after') {
        if (item.filesAfter) {
          let urlPic = ''
          let params = new FormData()
          params.append('file', item.filesAfter)
          await axios
            .post(this.DNS_IP + `/file/upload/beforeAfter`, params)
            .then(async function (response) {
              console.log('url Pic', response.data)
              urlPic = response.data
            })
          let dajobBeforeAfter = {
            afterImage: urlPic,
            LAST_USER: this.$session.getAll().data.userName
          }
          await axios
            .post(this.DNS_IP + '/jobBeforeAfter/edit/' + item.id, dajobBeforeAfter)
            .then(async responses => {
              item.afterImage = urlPic
            })
        }
      } else {
        if (item.filesBefore) {
          let urlPic = ''
          let params = new FormData()
          params.append('file', item.filesBefore)
          await axios
            .post(this.DNS_IP + `/file/upload/beforeAfter`, params)
            .then(async function (response) {
              console.log('url Pic', response.data)
              urlPic = response.data
            })
          let dajobBeforeAfter = {
            beforeImage: urlPic,
            LAST_USER: this.$session.getAll().data.userName
          }
          await axios
            .post(this.DNS_IP + '/jobBeforeAfter/edit/' + item.id, dajobBeforeAfter)
            .then(async responses => {
              item.beforeImage = urlPic
            })
        }
      }
    },
    async deleteBeforeAfter (item, text) {
      console.log(item, text)
      this.swalConfig.title = 'ต้องการ ลบรูปนี้ ใช่หรือไม่?'
      this.$swal(this.swalConfig).then(async () => {
        if (text === 'after') {
          let dajobBeforeAfter = {
            afterImage: 'is null',
            LAST_USER: this.$session.getAll().data.userName
          }
          await axios
            .post(this.DNS_IP + '/jobBeforeAfter/edit/' + item.id, dajobBeforeAfter)
            .then(async responses => {
              await this.checkEmpJob()
            })
        } else {
          let dajobBeforeAfter = {
            beforeImage: 'is null',
            LAST_USER: this.$session.getAll().data.userName
          }
          await axios
            .post(this.DNS_IP + '/jobBeforeAfter/edit/' + item.id, dajobBeforeAfter)
            .then(async responses => {
              await this.checkEmpJob()
            })
        }
      })
    },
    async deleteBeforeAfterAll (item) {
      this.swalConfig.title = 'ต้องการ ลบรูปทั้งหมดในแถว ใช่หรือไม่?'
      this.$swal(this.swalConfig).then(async () => {
        let dajobBeforeAfter = {
          LAST_USER: this.$session.getAll().data.userName
        }
        await axios
          .post(this.DNS_IP + '/jobBeforeAfter/delete/' + item.id, dajobBeforeAfter)
          .then(async responses => {
            await this.checkEmpJob()
          })
      })
    },
    cheSort (item) {
      console.log('cheSort', item.allData.sortNo)
      this.sortNo = item.allData.sortNo
    },
    gotoMap () {
      window.open('https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=' + this.center.lat + ',' + this.center.lng, '_blank')
    //   window.location.href =
    //     'https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=' +
    //     this.center.lat +
    //     ',' +
    //     this.center.lng
    },
    setShowMap (dt) {
      this.center = null
      if (dt.addressLatLong === null && dt.addressLatLong === '') {
        this.center = null
      } else {
        this.center = JSON.parse(dt.addressLatLong)
        this.address = dt.address
        this.dialogMap = true
      }
    },
    async getDataFlow () {
      this.itemFlow = await this.getDataFromAPI(
        '/flow/get',
        'flowId',
        'flowName',
        '&checkOnsite=True'
      )
    },
    async getDataFlowStep () {
      this.itemFlowStep = await this.getDataFromAPI(
        '/flowStep/get',
        'stepId',
        'stepTitle',
        '&flowId=' + this.selectFlow
      )
    },
    async getDataFromAPI (url, fieldId, fieldName, param) {
      let result = []
      await axios
        .get(this.DNS_IP + `${url}?shopId=${this.$session.getAll().data.shopId}${param}`)
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
            }
          } else {
            result = []
          }
        })
      return result
    },
    async getDataJob () {
      await this.getDataFlowStep()
      await this.checkEmpJob()
      await this.getJobData()
      if (this.itemJob.filter(el => { return el.sortNo === 2 }).length > 0) {
        this.tab = 1
        this.sortNo = 2
      } else {
        this.tab = 0
        this.sortNo = ''
      }
    },
    async checkEmpJob () {
      this.itemJob = []
      await axios
        .get(
          this.DNS_IP +
            '/job/getList?shopId=' +
            this.$session.getAll().data.shopId +
            '&empStep=' +
            this.$session.getAll().data.empId +
            '&flowId=' +
            this.selectFlow
        )
        .then(async response => {
          let rs = response.data
          if (rs.status === false) {
            this.itemJob = []
          } else {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              if (d.sortNo === 2) {
                await axios
                  .get(
                    this.DNS_IP + '/jobBeforeAfter/get?jobId=' + d.jobId
                  )
                  .then(async responses => {
                    if (responses.data.status === false) {
                      d.dataBeforeAfter = [{'beforeImage': null, 'afterImage': null, 'filesBefore': null, 'filesAfter': null}]
                      let dajobBeforeAfter = {
                        jobId: d.jobId,
                        CREATE_USER: this.$session.getAll().data.userName,
                        LAST_USER: this.$session.getAll().data.userName
                      }
                      await axios
                        .post(this.DNS_IP + '/jobBeforeAfter/add', dajobBeforeAfter)
                        .then(async responses => {
                        })
                    } else {
                      d.dataBeforeAfter = responses.data
                    }
                  })
              }
              d.dataShow = d.dueDateD + ' ' + this.monthNamesThai[parseInt(d.dueDateM)]
              this.itemJob.push(d)
            }
            console.log('this.itemJob', this.itemJob)
          }
        })
    },
    async getJobData () {
      this.dataJob = []
      await axios
        .get(
          this.DNS_IP +
            '/job/get?shopId=' +
            this.$session.getAll().data.shopId +
            '&empStepId=' +
            this.$session.getAll().data.empId +
            '&flowId=' +
            this.selectFlow
        )
        .then(async response => {
          let rs = response.data
          if (rs.status === false) {
            this.dataJob = []
          } else {
            this.dataJob = rs
            console.log('this.dataJob', this.dataJob)
          }
        })
    },
    updateJobStart (sortNo, jobId, data) {
      console.log('this.itemJob', this.itemJob)
      if (
        this.itemJob.filter(el => {
          return el.sortNo === 2
        }).length === 0
      ) {
        console.log('itemFlowStep', this.itemFlowStep)
        this.swalConfig.title = 'ต้องการ เริ่มงานนี้ ใช่หรือไม่?'
        this.$swal(this.swalConfig).then(async () => {
          if (this.$session.id() !== undefined) {
            var dt = {}
            var stepIdSelect = this.itemFlowStep.filter(el => {
              return el.allData.sortNo === sortNo + 1
            })[0].value
            if (sortNo === 1) {
              dt = {
                stepId: stepIdSelect,
                onsiteStartDate: moment(
                  moment(new Date()),
                  'YYYY-MM-DD HH:mm:ss'
                ).format('YYYY-MM-DD HH:mm:ss'),
                LAST_USER: this.$session.getAll().data.userName
              }
            }
            console.log('updateJob', dt)
            console.log(sortNo, jobId)
            await axios
              .post(this.DNS_IP + '/job/editAll/' + jobId, dt)
              .then(async response => {
                console.log(response)
                if (response.data.status) {
                  let dajobBeforeAfter = {
                    jobId: jobId,
                    CREATE_USER: this.$session.getAll().data.userName,
                    LAST_USER: this.$session.getAll().data.userName
                  }
                  await axios
                    .post(this.DNS_IP + '/jobBeforeAfter/add', dajobBeforeAfter)
                    .then(async responses => {
                      if (data.lineUserId) {
                        this.pushMessageCus(data.jobNo)
                      }
                      this.getDataJob()
                      this.$swal('เรียบร้อย', 'รับงานนี้เรียบร้อย', 'success')
                    })
                } else {
                  this.$swal(
                    'ผิดพลาด',
                    'เนื่องจากรายการนี้มีคนนำเข้าแล้ว',
                    'error'
                  )
                }
              })
          } else {
            this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
            this.$router.push('/Core/Login')
          }
        })
      } else {
        this.$swal(
          'ผิดพลาด',
          'เนื่องจากมีรายการที่เริ่มงานแล้ว กรุณาปิดงาน',
          'error'
        )
      }
    },
    closeJobStart (sortNo, jobId, data) {
      console.log('itemFlowStep', this.itemFlowStep)
      this.swalConfig.title = 'ต้องการ ปิดงานนี้ ใช่หรือไม่?'
      this.$swal(this.swalConfig).then(async () => {
        if (this.$session.id() !== undefined) {
          var dt = {}
          var stepIdSelect = this.itemFlowStep.filter(el => {
            return el.allData.sortNo === sortNo + 1
          })[0].value
          if (sortNo === 2) {
            dt = {
              stepId: stepIdSelect,
              onsiteEndDate: moment(
                moment(new Date()),
                'YYYY-MM-DD HH:mm:ss'
              ).format('YYYY-MM-DD HH:mm:ss'),
              LAST_USER: this.$session.getAll().data.userName
            }
          }
          console.log('updateJob', dt)
          console.log(sortNo, jobId)
          await axios
            .post(this.DNS_IP + '/job/editAll/' + jobId, dt)
            .then(async response => {
              console.log(response)
              if (response.data.status) {
                if (data.lineUserId) {
                  this.pushMessageCus(data.jobNo, 'close')
                }
                this.getDataJob()
                this.$swal('เรียบร้อย', 'ปิดงานนี้เรียบร้อย', 'success')
              }
            })
        } else {
          this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
          this.$router.push('/Core/Login')
        }
      })
    },
    pushMessageCus (jobNo) {
      let updateStatusSend = {
        updateStatusSend: 'false'
      }
      axios
        .post(this.DNS_IP + '/BookingOnsite/pushProgress/' + jobNo, updateStatusSend)
        .then(async responses => {})
    }
  }
}
</script>
<style scoped>
.a {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
}
.font12 {
  font-size: 12px;
}
.font13 {
  font-size: 13px;
}
.font14 {
  font-size: 14px;
}
.font16 {
  font-size: 16px;
}
.headline1 {
  color: var(--color_headline1) !important;
  font-weight: bold;
}
</style>
