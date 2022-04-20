<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
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
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="red"></v-tabs-slider>

              <v-tab v-for="(item, indexitem) in itemFlowStep" :key="indexitem">
                {{ item.text }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" v-if="itemJob.length > 0">
              <v-tab-item
                v-for="(item, indexitem) in itemFlowStep"
                :key="indexitem"
              >
                <div
                  v-for="(items, indexitems) in itemJob.filter(el => {
                    return el.stepId === item.value;
                  })"
                  :key="indexitems"
                >
                  <v-card
                    class="ma-2 p-1"
                    width="340"
                    height="160"
                    color="#FFFFFF"
                    elevation="6"
                  >
                    <v-row>
                      <v-col cols="4" class="pr-1">
                        <v-img
                          contain
                          max-height="80"
                          max-width="200"
                          :src="items.memberPicture"
                        ></v-img>
                        <v-btn
                          v-if="items.sortNo === 1"
                          tile
                          x-small
                          color="success"
                          @click="updateJobStart(items.sortNo, items.jobId)"
                        >
                          <v-icon left>
                            mdi-account-check-outline
                          </v-icon>
                          เริ่มงาน
                        </v-btn>
                        <v-btn
                          tile
                          x-small
                          color="info"
                          @click="setShowMap(items)"
                        >
                          <v-icon left>
                            mdi-map-marker-radius-outline
                          </v-icon>
                          MAP
                        </v-btn>
                        <!-- <v-btn class="ml-3" color="green" outlined rounded x-small>รับงาน</v-btn> -->
                      </v-col>
                      <v-col cols="8" class="pb-6">
                        <v-row
                          class="font12 headline1"
                          v-for="(itemJobs, indexitemJob) in dataJob.filter(
                            el => {
                              return el.jobNo === items.jobNo;
                            }
                          )"
                          :key="indexitemJob"
                        >
                          <v-col class="pl-0 pt-0 pb-0">{{
                            itemJobs.fieldName + " : " + itemJobs.fieldValue
                          }}</v-col>
                          <!-- <v-btn class="mr-4 mt-3" v-if="item.packageId !== packageId" color="green" outlined rounded x-small @click="UpdatePackage(item.packageId,'ตกลง',item.packageName)">ตกลง</v-btn>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId === packageId" color="red" outlined rounded x-small @click="UpdatePackage(item.packageId,'ยกเลิก',item.packageName)">ยกเลิก</v-btn> -->
                        </v-row>
                        <v-row class="font12 headline1">
                          <v-col class="pl-0 pt-0 pb-0"
                            >วันที่นัดหมาย : {{ items.dueDateFomatTH }}</v-col
                          >
                        </v-row>
                        <v-row class="font12 headline1">
                          <v-col class="pl-0 pt-0 pb-0"
                            >วันเวลาที่เริ่ม :
                            {{ items.onsiteStartDateFomatTH }}</v-col
                          >
                        </v-row>
                        <!-- <v-row class="font14 headline1">
                                    <v-col class="pl-0 pt-0 pb-0">วันหมดอายุ  {{new Date(item.expirePackage * 1000).toLocaleString().substr(0,9)}} </v-col>
                                </v-row> -->
                      </v-col>
                    </v-row>
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
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pb-0">
                      <v-card class="text-center">
                        <v-container>
                          <GmapMap
                            v-if="center !== null"
                            :center="center"
                            :zoom="15"
                            style="width: 100%; height: 200px"
                            :options="{ disableDefaultUI: true }"
                          >
                            <GmapMarker @click="gotoMap()" :position="center" />
                            <!-- <gmap-info-window
                          @closeclick="window_open=false"
                          :opened="window_open"
                          :position="center"
                          :options="{
                            pixelOffset: {
                              width: 0,
                              height: -35
                            }
                          }"
                      >
                          {{address}}
                      </gmap-info-window> -->
                          </GmapMap>
                        </v-container>
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
        case 'xs': return '70%'
        case 'sm': return '60%'
        case 'md': return '50%'
        case 'lg': return '50%'
        case 'xl': return '50%'
      }
    }
  },
  data () {
    return {
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
      itemFlow: [],
      selectFlow: '',
      tab: null,
      itemFlowStep: [],
      itemJob: [],
      dataJob: [],
      center: null,
      address: '',
      dialogMap: false
    }
  },
  async mounted () {
    this.getDataFlow()
  },
  methods: {
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
    },
    async checkEmpJob () {
      this.itemJob = []
      await axios
        .get(
          this.DNS_IP +
            '/job/getList?shopId=' +
            this.session.data.shopId +
            '&empStep=' +
            this.session.data.empId +
            '&flowId=' +
            this.selectFlow
        )
        .then(async response => {
          let rs = response.data
          if (rs.status === false) {
            this.itemJob = []
          } else {
            this.itemJob = rs
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
            this.session.data.shopId +
            '&empStepId=' +
            this.session.data.empId +
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
    updateJobStart (sortNo, jobId) {
      console.log('this.itemJob', this.itemJob)
      if (
        this.itemJob.filter(el => {
          return el.sortNo === 2
        }).length === 0
      ) {
        console.log('itemFlowStep', this.itemFlowStep)
        this.swalConfig.title = 'ต้องการ รับงานนี้ ใช่หรือไม่?'
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
                LAST_USER: this.session.data.userName
              }
            }
            console.log('updateJob', dt)
            console.log(sortNo, jobId)
            await axios
              .post(this.DNS_IP + '/job/editAll/' + jobId, dt)
              .then(async response => {
                console.log(response)
                if (response.data.status) {
                  this.getDataJob()
                  this.$swal('เรียบร้อย', 'รับงานนี้เรียบร้อย', 'success')
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
