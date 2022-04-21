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

              <v-tab v-for="(item, indexitem) in itemFlowStep" @click="cheSort(item)" :key="indexitem">
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
                    width="95%"
                    height="100%"
                    color="#FFFFFF"
                    elevation="6"
                  >
                    <v-row>
                      <v-col cols="4" class="pr-1">
                        <v-img
                          contain
                          max-height="80px"
                          max-width="200px"
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
                          v-if="items.sortNo === 2"
                          tile
                          x-small
                          color="success"
                          @click="closeJobStart(items.sortNo, items.jobId)"
                        >
                          <v-icon left>
                            mdi-water-check
                          </v-icon>
                          ปิดงาน
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
                        <v-row class="font12 headline1" v-if="items.onsiteStartDateFomatTH">
                          <v-col class="pl-0 pt-0 pb-0"
                            >วันเวลาที่เริ่ม :
                            {{ items.onsiteStartDateFomatTH }}</v-col
                          >
                        </v-row>
                      </v-col>
                    </v-row>
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
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import moment from 'moment-timezone' // แปลง date
import UploadButton from 'vuetify-upload-button'
export default {
  name: 'JobList',
  components: {
    'left-menu-admin': adminLeftMenu,
    'upload-btn': UploadButton
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
      dialogMap: false,
      sortNo: ''
    }
  },
  async mounted () {
    this.getDataFlow()
  },
  methods: {
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
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
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
            LAST_USER: this.session.data.userName
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
            LAST_USER: this.session.data.userName
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
      if (text === 'after') {
        let dajobBeforeAfter = {
          afterImage: 'is null',
          LAST_USER: this.session.data.userName
        }
        await axios
          .post(this.DNS_IP + '/jobBeforeAfter/edit/' + item.id, dajobBeforeAfter)
          .then(async responses => {
            await this.checkEmpJob()
          })
      } else {
        let dajobBeforeAfter = {
          beforeImage: 'is null',
          LAST_USER: this.session.data.userName
        }
        await axios
          .post(this.DNS_IP + '/jobBeforeAfter/edit/' + item.id, dajobBeforeAfter)
          .then(async responses => {
            await this.checkEmpJob()
          })
      }
    },
    async deleteBeforeAfterAll (item) {
      let dajobBeforeAfter = {
        LAST_USER: this.session.data.userName
      }
      await axios
        .post(this.DNS_IP + '/jobBeforeAfter/delete/' + item.id, dajobBeforeAfter)
        .then(async responses => {
          await this.checkEmpJob()
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
                        CREATE_USER: this.session.data.userName,
                        LAST_USER: this.session.data.userName
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
                  let dajobBeforeAfter = {
                    jobId: jobId,
                    CREATE_USER: this.session.data.userName,
                    LAST_USER: this.session.data.userName
                  }
                  await axios
                    .post(this.DNS_IP + '/jobBeforeAfter/add', dajobBeforeAfter)
                    .then(async responses => {
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
    closeJobStart (sortNo, jobId) {
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
                this.$swal('เรียบร้อย', 'ปิดงานนี้เรียบร้อย', 'success')
              }
            })
        } else {
          this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
          this.$router.push('/Core/Login')
        }
      })
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
