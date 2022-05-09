<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-7 pr-12 pb-0 col-md-12 ml-sm-auto col-lg-12 px-4">
        <!-- <v-col class="ma-2" id="text-Board">กระดานทำงาน</v-col> -->
      </div>
      <div class="pl-2 pr-2 pt-0 col-md-12 ml-sm-auto col-lg-12 px-4">
            <v-card>
              <v-toolbar
                color="#1b437c"
                dark
                flat
                v-if="flownameTap.length > 0"
              >
                <v-toolbar-title>
                  <v-row>
                  <v-col cols="12">
                    <h5 class="mb-0">
                      <v-icon
                        x-large
                        class="mb-3 mr-2"
                        style="font-size:40px !important;"
                        color="#FFFFFF"
                      >
                        mdi-account-cog
                      </v-icon>
                      {{this.$session.getAll().data.userFirst_NameTH}}
                    </h5>
                  </v-col>
                  </v-row>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-slot:extension>
                  <v-tabs
                    v-model="tab"
                    align-with-title
                  >
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab
                    class="ms-2"
                      v-for="(item , index) in flownameTap"
                      :key="index"
                    >
                      {{ item }}
                    </v-tab>
                  </v-tabs>
                </template>
              </v-toolbar>

              <v-tabs-items v-model="tab">
                <v-tab-item
                  v-for="(item , index) in flownameTap"
                      :key="index"
                >
                  <v-card
                  class="pa-4 pt-5"
                  min-height="715px"
                  flat
                  color="#F2F4F4"
                  >
                    <v-card
                    v-for="(itemsJob, indexJob) in allJob.filter(i => {return i.flowName === item})" :key="indexJob"
                    class="mt-4 pt-3 pb-4"
                    min-height="110px"
                    :style="'background: linear-gradient(to right,'+ codeColor[index] + ' 65%,#FFFFFF 35%);'"

                    >
                      <v-row >
                        <v-col cols="8" class="pa-2 pl-8 pb-4 mb-n1">
                          <h4 class="ma-0 mt-1 text-center font-weight-medium" style="height:22px;color:#FFFFFF;"><v-icon color="yellow" class="mr-1 mb-2">mdi-hammer-wrench</v-icon>{{JobDataItem.filter(row => { return row.jobId == itemsJob.jobId})[0].stepTitle}}</h4>
                          <v-card-title
                          v-for="(items, index) in JobDataItem.filter(row => { return row.jobId == itemsJob.jobId})" :key="index"
                          >
                          <div style="height:22px;color:#FFFFFF;" v-if="items.showCard === 'True' && items.fieldValue !== ''">
                            <v-tooltip
                            color="#1b437c"
                            v-if="items.fieldValue.length > 14"
                            top
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <h4
                                  class="ma-0 mt-1"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                {{ items.fieldValue.substring(0, 14)}}...
                                </h4>
                              </template>
                              <span>{{items.fieldValue}}</span>
                            </v-tooltip>
                            <h4 v-if="items.fieldValue.length <= 14" class="ma-0 mt-1">{{ items.fieldValue}}</h4>
                          </div>
                          </v-card-title>
                        </v-col>
                        <v-col cols="4" class="ps-6 pb-4 mb-n1">
                                <v-icon
                                  v-if="itemsJob.statusTime === 'timeStart' || itemsJob.statusTime === null"
                                  style="font-size:40px !important;"
                                  class="mt-3 ms-2"
                                    x-large
                                    color="#84C650"
                                    @click="updateTimeEmp(itemsJob,'timeStart')"
                                  >
                                    mdi-timer
                                </v-icon>
                                <v-icon
                                  v-if="itemsJob.statusTime === 'timeEnd' && itemsJob.statusTime !== null"
                                  style="font-size:40px !important;"
                                  class="mt-3 ms-2"
                                    x-large
                                    color="#DE6467"
                                    @click="updateTimeEmp(itemsJob,'timeEnd')"
                                  >
                                    mdi-timer-off
                                </v-icon>
                                <p
                                class="font-weight-black"
                                  v-if="itemsJob.statusTime === 'timeEnd' && itemsJob.statusTime !== null"
                                >
                                {{itemsJob.showTime}}
                                </p>
                                <p
                                class="font-weight-black"
                                  v-if="itemsJob.statusTime === 'timeStart' && itemsJob.statusTime !== null"
                                >
                                {{convertHMS(timeItem.filter((item) => item.jobId === itemsJob.jobId && item.stepId === itemsJob.stepId && item.empId === itemsJob.empId)[0].totalTime)}}
                                </p>
                                <p
                                class="font-weight-black"
                                  v-if="itemsJob.statusTime === null"
                                >
                                00:00:00
                                </p>
                        </v-col>
                      </v-row>
                    </v-card>

                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import draggable from 'vuedraggable'
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import Menu from '../System/Menu.vue'
// import moment from 'moment' // แปลง date

export default {
  name: 'hello',
  components: {
    draggable,
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    Menu
  },
  computed: {
    colsWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '12'
        case 'md': return '12'
        case 'lg': return '4'
        case 'xl': return '4'
      }
    },
    classWork () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return ''
        case 'sm': return ''
        case 'md': return ''
        case 'lg': return 'workRow'
        case 'xl': return 'workRow'
      }
    }
  },
  data () {
    return {
      timelineitem: [],
      Layout: [],
      layout: 'grid',
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'Flow',
          disabled: false,
          href: '/Master/Flow'
        }
      ],
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 9,
        precision: 0
      },
      rules: {
        numberRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: value => value.length <= 10 || 'Max 10 characters',
        required: value => !!value || 'กรุณากรอก.'
      },
      columnsStep: [
        { text: 'Title', value: 'stepTitle' },
        { text: ' ', value: 'actions2', sortable: false, align: 'center' }
      ],
      DataflowId: '',
      dialog: false,
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogProgress: false,
      date: this.momenDate_1(),
      // DIALOG ADD
      drawer: false,
      drawer1: false,
      endDate: '',
      endTime: '',
      editedItemSelete: [],
      flowfieldNameitem: [],
      item_newcars: [],
      flowCode: '',
      form1: {},
      menu: false,
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      stepItemSelete: [],
      stepItemSeleteInBoard: [],
      empSeleteStep: [],
      DataFlowName: [],
      validAdd: false,
      TotalDate: [],
      DataBranchName: [],
      ItemSelete: [],
      userId: '',
      totalDateDiff: '',
      masBranchID: '',
      branchData: [],
      timeavailable: [],
      formUpdate: {
        stepId: '',
        flowId: '',
        flowName: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: '',
        endDate: '',
        endTime: '',
        jobId: '',
        empStep: '',
        departmentStep: '',
        branchStep: '',
        checkCar: ''
      },
      updateEndDateOld: '',
      updateEndTimeOld: '',
      lineUserId: '',
      JobDataItem: [],
      allJob: [],
      form: {
        jobId: '',
        flowId: '',
        stepId: '',
        fieldId: '',
        fieldValue: '',
        fieldName: ''
      },
      codeColor: [
        '#57A2AC',
        '#824D99',
        '#84C650',
        '#C65050',
        '#CE2220',
        '#E67F33',
        '#EB56F6',
        '#FED966',
        '#4D67AB',
        '#4E79C4'
      ],
      formDelete: {
        jobNo: '',
        shopId: this.$session.getAll().data.shopId,
        totalPrice: '0'
      },
      formUpdateCar: {
        jobNo: '',
        shopId: this.$session.getAll().data.shopId,
        checkCar: ''
      },
      formEditData: {
        jobNo: '',
        shopId: this.$session.getAll().data.shopId,
        fieldValue: '',
        endDate: '',
        endTime: ''
      },
      formUpdateStep: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        LAST_USER: '',
        shopId: '',
        sendCard: ''
      },
      checkPayment: 'True',
      setTimerJob: '',
      packageId: '',
      dataPackage: [],
      flowId: '',
      dataCoin: '',
      productExchangeRateId: '',
      flownameTap: [],
      tab: null,
      timeItem: [],
      clearInter: null
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    this.$root.$on('closeSetTime', () => {
      // your code goes here
      this.closeSetTime()
    })
    await this.getJobData()
    await this.getTime()
    // await this.getLayoutDefault()
  },
  methods: {
    setTimeJob () {
      let _this = this
      this.setTimerJob = setInterval(function () { _this.getJobData() }, 60000)
    },
    closeSetTime () {
      clearInterval(this.setTimerJob)
      this.setTimerJob = null
    },
    async chkFlowName () {
      if (this.flowId !== '') {
        await this.getStepFlow()
        await this.getLayout()
        await this.getJobData()
        this.setTimeJob()
      } else {
        this.$swal('ผิดพลาด', 'กรุณาเลือก ประเภทบริการ', 'error')
      }
    },
    async chkBranchName () {
      if (this.masBranchID !== '') {
        await this.getStepFlow()
        await this.getLayout()
        await this.getJobData()
        this.setTimeJob()
      }
    },
    getDataFlow () {
      this.DataFlowName = []
      console.log('DataFlowName', this.DataFlowName)
      axios
        .get(this.DNS_IP + '/flow/get?shopId=' + this.shopId + '&checkOnsite=is null')
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.flowName
              d.value = d.flowId
              this.DataFlowName.push(d)
            }
          } else {
            this.DataFlowName = []
          }
        })
    },
    checkTime () {
      console.log('this.branchData', this.branchData)
      console.log('masBranchID', this.masBranchID)
      this.timeavailable = JSON.parse(this.branchData.filter(item => { return item.masBranchID === this.masBranchID })[0].setTime)
      console.log('timevailable', this.timeavailable)
    },
    getDataBranch () {
      this.DataBranchName = []
      this.branchData = []
      console.log('DataBranchName', this.DataBranchName)
      axios
        .get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.masBranchName
              d.value = d.masBranchID
              this.DataBranchName.push(d)
              this.branchData.push(d)
            }
          } else {
            this.DataBranchName = []
          }
        })
    },
    async getLayout () {
      this.Layout = []
      // console.log('Branch' + this.masBranchID)
      // console.log('this.stepItemSelete', this.stepItemSelete)
      await axios
        .get(
          this.DNS_IP +
            '/WorkShopLayout/get?flowId=' +
            this.flowId +
            '&masBranchID=' + this.masBranchID +
            '&shopId=' +
            this.shopId
        )
        .then(response => {
          let rs = response.data
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            var workData = []
            var workDataUse = []
            workData = JSON.parse(d.workData)
            console.log('workData', workData)
            if (workData.length > 0) {
              for (let x = 0; x < workData.length; x++) {
                let t = workData[x]
                let s = {}
                s.sortNo = t.sortNo
                s.stepId = t.stepId
                var chkStepTitle = this.stepItemSelete.filter(el => { return el.stepId === t.stepId })
                if (chkStepTitle.length > 0) {
                  s.stepTitle = this.stepItemSelete.filter(el => { return el.stepId === t.stepId })[0].stepTitle
                  workDataUse.push(s)
                }
              }
            } else {
              workDataUse = []
            }
            this.Layout.push({
              workShopId: d.workShopId,
              workColum: d.workColum,
              workData: workDataUse
            })
          }
          // console.log('this.Layout', this.Layout)
        })
        .catch(error => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async getStepFlow () {
      this.stepItemSelete = []
      await axios
        .get(
          this.DNS_IP +
            '/flowStep/get?flowId=' +
            this.flowId +
            '&shopId=' +
            this.shopId
        )
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.stepTitle
              d.value = d.stepId
              this.stepItemSelete.push(d)
            }
            // console.log('stepItemSelete', this.stepItemSelete)
          }
        })
    },
    async getEmpSelect () {
      this.empSeleteStep = []
      await axios
        .get(this.DNS_IP + '/empSelect/getUse?privacyPage=board&shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH + ' ' + d.empLast_NameTH
              s.value = d.empId
              this.empSeleteStep.push(s)
            }
            // console.log('empSeleteStep', this.empSeleteStep)
          }
        })
    },
    async getJobData () {
      // this.JobDataItem = []
      // this.allJob = []
      var JobDataItem = []
      var allJob = []
      axios
        .get(this.DNS_IP + '/job/get?checkUser=check&shopId=' + this.shopId + '&empId=' + this.$session.getAll().data.empId + '&checkOnsite=is null')
        .then(async response => {
          this.dataReady = true
          var jobs = []
          // console.log('res', response.data.length)
          console.log('res', response.data)
          if (response.data.length > 0) {
            for (var i = 0; i < response.data.length; i++) {
              var d = response.data[i]
              d.userId = d.userId || ''
              if (jobs.indexOf(d.jobId) === -1) {
                jobs.push(d.jobId)
                if (d.userId !== '') {
                  var rss = response.data.filter(el => { return el.jobId === d.jobId })
                  for (var x = 0; x < response.data.filter(el => { return el.jobId === d.jobId }).length; x++) {
                    var s = rss[x]
                    // jobs.push(element.jobId)
                    JobDataItem.push(s)
                  }
                  allJob.push({
                    jobId: d.jobId,
                    jobNo: d.jobNo,
                    stepId: d.stepId,
                    checkCar: d.checkCar,
                    totalDateDiff: d.totalDateDiff,
                    endDate: d.endDate,
                    endTime: d.endTime,
                    checkPayment: d.checkPayment,
                    empStepId: d.empStepId,
                    empId: d.empId,
                    lineUserId: d.lineUserId,
                    userId: d.userId,
                    packageId: d.packageId,
                    statusTime: d.statusTime,
                    timeStart: d.timeStart,
                    timeEnd: d.timeEnd,
                    totalTime: d.totalTime,
                    flowName: d.flowName,
                    showTime: '',
                    countTime: 0
                  })
                }
              }
              if (JobDataItem.length > 0) {
                this.JobDataItem = JobDataItem
              } else {
                this.JobDataItem = []
              }
              if (allJob.length > 0) {
                this.allJob = allJob
              } else {
                this.allJob = []
              }
            }
            console.log('this.JobDataItem', this.JobDataItem)
          } else {
            this.JobDataItem = []
            this.allJob = []
            this.$swal('ไม่มีข้อมูล', 'กรุณาเลือกบริการใหม่', 'warning')
            clearInterval(this.setTimerJob)
            this.setTimerJob = null
          }
          this.genflownameTap()
        })
    },
    async genflownameTap () {
      let dt = []
      this.allJob.forEach((v, k) => {
        dt.push(v.flowName)
      })
      this.flownameTap = Array.from(new Set(dt))
    },
    async pushmessage (jobId) {
      let updateStatusSend = { updateStatusSend: 'false' }
      await axios
        .post(this.DNS_IP + '/job/pushMsg/' + jobId, updateStatusSend)
        .then(console.log(jobId))
    },
    async editStep () {
      this.$router.push('/Master/Flow')
    },
    async newCars () {
      this.$router.push('/Master/RegisterAdd')
    },
    async editLayout () {
      this.$router.push('/Master/WorkShop')
    },
    itemCars (item) {
      this.item_newcars = item
    },
    async setUpdate (item, text, stepItem) {
      this.dataPackage = []
      this.dataCoin = []
      // console.log(this.formUpdate)
      // console.log(this.stepItemSelete)
      console.log('item1', item)
      // console.log('stepItem', stepItem)
      clearInterval(this.setTimerJob)
      this.setTimerJob = null
      this.checkPayment = item.checkPayment
      var dataStepItemSelete = this.stepItemSelete
      // var index = dataStepItemSelete.findIndex(key => key.text === stepTitle)
      this.formUpdate.jobId = item.jobId
      this.updateEndDateOld = this.momenDate_1(item.endDate)
      this.updateEndTimeOld = item.endTime
      this.formUpdate.endDate = this.momenDate_1(item.endDate)
      this.formUpdate.endTime = item.endTime
      this.formDelete.jobNo = item.jobNo
      this.formUpdate.empStep = parseInt(item.empStepId)
      var lineUserId = ''
      var userId = ''
      if (item.lineUserId === null || item.lineUserId === '' || item.lineUserId === 'user-skip' || item.lineUserId === undefined) {
        lineUserId = ''
      } else {
        lineUserId = item.lineUserId
      }
      if (item.userId === null || item.userId === '' || item.userId === 'user-skip' || item.userId === undefined) {
        userId = ''
      } else {
        userId = item.userId
      }
      this.lineUserId = lineUserId
      this.userId = userId
      // this.formUpdate.empStep = this.JobDataItem.filter(row => {
      //   return row.jobId === item.jobId
      // })[0].empStep
      if (text === 'editFlow') {
        this.stepItemSeleteInBoard = dataStepItemSelete.filter(el => el.text !== stepItem.stepTitle)
      }
      if (text === 'closeJob') {
        this.getCoin()
        if (item.packageId === '' || item.packageId === null) {

        } else {
          await this.getPackage(item)
          if (this.dataPackage.length > 0) {
            var dataPack = this.dataPackage.filter(el => { return el.packageId === item.packageId })
            this.packageId = {text: dataPack[0].text, value: item.packageId}
          }
        }
      }
    },
    async getPackage (dt) {
      // this.fieldNameItem.forEach((field, index) => {
      //   if (field.fieldId === 101) {
      //     this.fieldNameItem[index].fieldValue = String(this.fromAdd.flowId)
      //   }
      // })
      this.dataPackage = []
      await axios.get(this.DNS_IP_Loyalty + '/PackageLog/get?shopId=' + this.shopId + '&lineUserId=' + dt.lineUserId +
      '&flowId=' + this.flowId).then(response => {
        console.log('PackageLog', response.data)
        let rs = response.data
        if (rs.status !== false) {
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            d.text = d.packageName
            d.value = d.packageId
            this.dataPackage.push(d)
            // console.log('this.DataFlowName', this.DataFlowName)
          }
        } else {
          this.dataPackage = []
        }
      })
    },
    async getCoin (dt) {
      // this.fieldNameItem.forEach((field, index) => {
      //   if (field.fieldId === 101) {
      //     this.fieldNameItem[index].fieldValue = String(this.fromAdd.flowId)
      //   }
      // })
      if (this.lineUserId !== '') {
        this.dataCoin = []
        await axios.get(this.DNS_IP_Loyalty + '/productExchangeRate/get?shopId=' + this.shopId +
      '&flowId=' + this.flowId).then(response => {
          console.log('productExchangeRate', response.data)
          let rs = response.data
          if (rs.status !== false) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              d.text = d.name
              d.value = d.productExchangeRateId
              this.dataCoin.push(d)
            // console.log('this.DataFlowName', this.DataFlowName)
            }
          } else {
            this.dataCoin = []
          }
        })
      }
    },
    async onUpdate () {
      this.formUpdate.stepId = this.formUpdate.stepTitle.stepId
      // console.log('stepId', this.formUpdate.stepTitle.stepId)
      // console.log('id', this.formUpdate.jobId)
      // console.log('formUpdate', this.formUpdate)
      // console.log('allJob', this.allJob)
      // console.log('empSeleteStep', this.empSeleteStep)
      // console.log('empStep', this.formUpdate.empStep)
      if (this.formUpdate.empStep !== '' && this.formUpdate.stepTitle !== '') {
        this.dataReady = false
        this.$swal({
          title: 'ต้องการ แก้ไขสถานะ ใช่หรือไม่?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#b3b1ab',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ไม่'
        })
          .then(async result => {
            this.formUpdate.LAST_USER = this.session.data.userName
            var ID = this.formUpdate.jobId
            var flowId = this.flowId
            delete this.formUpdate['flowId']
            delete this.formUpdate['flowName']
            delete this.formUpdate['sortNo']
            delete this.formUpdate['CREATE_USER']
            // delete this.formUpdate['stepTitle']
            await axios
              .post(
              // eslint-disable-next-line quotes
                this.DNS_IP + '/job/edit/' + ID,
                this.formUpdate
              )
              .then(async response => {
              // Debug response
                console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
                // this.dialog = false
                // this.$swal('เรียบร้อย', 'แก้ไขสถานะ เรียบร้อย', 'success')
                // this.getStepFlow()
                // this.getLayout()
                // this.allJob.map((row, index) => {
                //   if (row.jobId === ID) {
                //     this.allJob[index].stepId = this.formUpdate.stepId
                //   }
                // })
                this.flowId = flowId
                await this.pushmessage(this.formUpdate.jobId)
                this.dialog = false
                this.$swal('เรียบร้อย', 'แก้ไขสถานะ เรียบร้อย', 'success')
                this.getStepFlow()
                this.getLayout()
                await this.getJobData()
                this.setTimeJob()
              // console.log('allJob', this.allJob)
              // console.log(this.formUpdate.jobId)
              // console.log(this.formUpdate.stepId)
              })
            // eslint-disable-next-line handle-callback-err
              .catch(error => {
                this.dataReady = true
                console.log('error function editDataGlobal : ', error)
              })
          })
          .catch(error => {
            this.dataReady = true
            console.log('error function editDataGlobal : ', error)
          })
      } else {
        this.$swal('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบ', 'error')
      }
    },
    async clearData () {
      // this.formUpdate.stepTitle = ''
      // eslint-disable-next-line no-redeclare
      for (var key in this.formEdit) {
        console.log('Key', key)
        console.log('Value', this.formEdit)

        if (this.formEdit[key]) {
          this.formEdit[key] = ''
        }
      }
    },
    async updateStatusCars (item, status) {
      console.log(this.formUpdate.jobId)
      console.log(item)
      this.$swal({
        title: 'อัพเดท สถานะรถ ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ยกเลิก'
      }).then(async response => {
        var ID = item
        var statusUse = ''
        if (status === 'True') {
          statusUse = 'False'
        } else {
          statusUse = 'True'
        }
        let ds = {
          jobNo: this.formUpdateCar.jobNo,
          shopId: this.formUpdateCar.shopId,
          checkCar: statusUse,
          LAST_USER: this.session.data.userName,
          statusUpdateCar: 'True'
        }
        console.log('ds', ds)
        await axios
          .post(this.DNS_IP + '/job/editStatus/' + ID, ds)
          .then(async response => {
            this.$swal('เรียบร้อย', 'อัพเดท สถานะรถ เรียบร้อย', 'success')
            this.getStepFlow()
            this.getLayout()
            await this.getJobData()
            console.log('shopId:', this.shopId)
            console.log('form:', this.formUpdateCar)
          })
      })
    },
    async pushmessagePrice (jobNo) {
      let updateStatusSend = { updateStatusSend: 'false', checkPayment: this.checkPayment }
      await axios
        .post(this.DNS_IP + '/job/pushClosejob/' + jobNo, updateStatusSend)
        .then(console.log(jobNo))
    },
    closeJob () {
      console.log('this.productExchangeRateId', this.productExchangeRateId)
      console.log('this.packageId', this.packageId)
      if (this.checkPayment === 'True') {
        if (this.formDelete.totalPrice !== '') {
          this.closeJobSubmit(this.formDelete.totalPrice)
        } else {
          this.$swal('ผิดพลาก', 'กรุณาใส่จำนวนเงิน', 'error')
        }
      } else {
        this.closeJobSubmit('0')
      }
    },
    closeJobSubmit (totalPrice) {
      this.jobNo = ''
      console.log('shopId:', this.shopId)
      console.log('form:', this.formDelete)
      this.$swal({
        title: 'ให้บริการ เสร็จเรียบร้อยแล้ว ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#fa0202',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async response => {
        if (this.packageId !== '' && this.productExchangeRateId === '') {
          await this.usePackage()
        } else if (this.packageId === '' && this.productExchangeRateId !== '') {
          if (this.lineUserId !== '') {
            await this.useCoin(totalPrice)
          }
        } else if (this.packageId !== '' && this.productExchangeRateId !== '') {
          if (this.lineUserId !== '') {
            await this.useCoin(totalPrice)
            await this.usePackage()
          } else {
            await this.usePackage()
          }
        }
        var ID = this.formUpdate.jobId
        let ds = {
          jobNo: this.formDelete.jobNo,
          shopId: this.shopId,
          totalPrice: totalPrice,
          LAST_USER: this.session.data.userName,
          statusDelete: 'true'
        }
        console.log('ds', ds)
        await axios
          .post(this.DNS_IP + '/job/editPrice/' + ID, ds)
          .then(async response => {
            await this.pushmessagePrice(this.formDelete.jobNo)
            this.$swal('เรียบร้อย', 'ลบข้อมูล เรียบร้อย', 'success')
            await this.getStepFlow()
            await this.getLayout()
            await this.getJobData()
            this.setTimeJob()
            this.dialogDelete = false
            this.formDelete.totalPrice = 0
            console.log('shopId:', this.shopId)
            console.log('form:', this.formDelete)
          })
      })
    },
    async usePackage () {
      var params = {
        shopId: this.shopId,
        token: this.packageId.token
      }
      await axios({
        method: 'post',
        headers: {
          shopId: this.shopId,
          lineUserId: this.lineUserId,
          lineId: this.userId
        },
        url: this.DNS_IP_Loyalty + '/use_package/edit',
        data: params
      }).then((response) => {})
    },
    async useCoin (totalPrice) {
      // productExchangeRateId
      const today = new Date()
      // console.log(today)
      const date =
            today.getFullYear() +
            '' +
            (today.getMonth() + 1) +
            '' +
            today.getDate()
      const time =
            today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
      const token = date + '' + time
      var point = ''
      if (this.productExchangeRateId.exchangeRate === 0) {
        point = 0
      } else {
        point = parseInt(totalPrice) / this.productExchangeRateId.exchangeRate
      }
      var md5 = require('md5')
      var tokenKey = md5(token)
      let ds = {
        productExchangeRateId: this.productExchangeRateId.value,
        amount: parseInt(totalPrice),
        refId: '',
        point: parseInt(point),
        token: tokenKey,
        status: 'waiting',
        statusMemberCard: 'collect',
        CREATE_USER: this.session.data.userName,
        LAST_USER: this.session.data.userName,
        shopId: this.shopId,
        qrCodeURL: `https://liff.line.me/1656906322-RnAKKNyq/collect?shopId=${this.shopId}&token=${tokenKey}`
        // masBranchID: '',
        // branchName: ''
      }
      console.log('ds', ds)
      await axios
        .post(this.DNS_IP_Loyalty + '/qrcode/add', ds)
        .then(async response => {
          var params = {
            shopId: this.shopId,
            token: tokenKey
          }
          await axios({
            method: 'post',
            headers: {
              shopId: this.shopId,
              lineUserId: this.lineUserId,
              lineId: this.userId
            },
            url: this.DNS_IP_Loyalty + '/memberCard/edit',
            data: params
          }).then((response) => {})
        })
    },
    async editData () {
      console.log(
        this.JobDataItem.filter(row => {
          return row.jobId === this.formUpdate.jobId
        })
      )
      this.jobNo = ''
      console.log('shopId', this.shopId)
      console.log('formEditData', this.formEditData)
      this.$swal({
        title: 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        // var ID = this.formUpdate.jobId
        let rs = this.JobDataItem.filter(row => {
          return row.jobId === this.formUpdate.jobId
        })
        console.log('rs JobDataItem', rs)
        let dt = []
        var cusName = ''
        var cusReg = ''
        var jobDate = this.formUpdate.endDate + ' ' + this.formUpdate.endTime
        for (var i = 0; i < rs.length; i++) {
          var d = rs[i]
          var s = {}
          s.jobNo = d.jobNo
          s.jobId = d.jobId
          s.fieldId = d.fieldId
          if (d.fieldName === 'ชื่อ') {
            cusName = d.fieldValue
          }
          if (d.fieldName === 'เลขทะเบียน') {
            cusReg = d.fieldValue
          }
          s.fieldValue = d.fieldValue
          s.endDate = this.formUpdate.endDate
          s.endTime = this.formUpdate.endTime
          s.LAST_USER = d.LAST_USER
          dt.push(s)
        }
        console.log('dt', dt)
        await axios
          .post(
            // eslint-disable-next-line quotes
            this.DNS_IP + '/jobData/editData',
            dt
          )
          .then(async response => {
            this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
            var dateNew = this.formUpdate.endDate + this.formUpdate.endTime
            var dateOld = this.updateEndDateOld + this.updateEndTimeOld
            var jodDateOld = this.updateEndDateOld + ' ' + this.updateEndTimeOld
            console.log(dateNew, dateOld)
            console.log(this.lineUserId)
            if (dateNew !== dateOld && this.lineUserId !== '') {
              // แจ้งเตือนลูกค้า this.lineUserId
              let pushText = {
                'to': this.lineUserId,
                'messages': [
                  {
                    'type': 'text',
                    'text': ` ✍️ มีการเปลี่ยนแปลงเวลาวันรับรถ\n ✅ ชื่อ : ${cusName}\n ✅ เลขทะเบียน : ${cusReg}
                          \nจาก วันที่ ${this.format_dateFUllTime(jodDateOld)}
                          \nเป็น วันที่ ${this.format_dateFUllTime(jobDate)}`
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
            }
            this.getStepFlow()
            this.getLayout()
            await this.getJobData()
            this.setTimeJob()
            this.dialogEdit = false
            console.log('shopId:', this.shopId)
            console.log('form:', this.formEditData)
          })
      })
    },
    async getJobitem (item) {
      console.log('*******************', item)
      this.timelineitem = []
      await axios
        .get(this.DNS_IP + '/job_logCloseJob/' + item.jobNo).then((response) => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let t = i + 1
              if (t === rs.length) {
                let s = {}
                s.empStep = d.empStep
                s.endDate = d.endDate
                s.totalPrice = s.totalPrice
                s.DTCREATE_DATE = d.CREATE_DATE
                s.DTLAST_DATE = d.LAST_DATE
                s.stepTitle = d.stepTitle
                s.timediff = d.timediff
                s.Counttime = 0
                this.timelineitem.push(s)
              } else {
                let s = {}
                s.empStep = d.empStep
                s.endDate = d.endDate
                s.totalPrice = s.totalPrice
                s.DTCREATE_DATE = d.CREATE_DATE
                s.DTLAST_DATE = d.LAST_DATE
                s.stepTitle = d.stepTitle
                s.timediff = d.timediff
                s.Counttime = rs[t].timediff - d.timediff
                this.timelineitem.push(s)
              }
            }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async updateTimeEmp (itemsJob, status) {
      this.$swal({
        title: 'อัพเดท เวลา ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ยกเลิก'
      }).then(async (result) => {
        let dt = this.format_date(new Date())
        // console.log('dtttttttttttt', dt)
        itemsJob.Time = dt
        itemsJob.statusTime = status
        console.log('itemsJobitemsJob', itemsJob)
        if (itemsJob.empId !== '' && itemsJob.empId !== null) {
          await axios.post(this.DNS_IP + '/TimeEmp_Log_Update/get', itemsJob).then(async (response) => {
            await this.$swal('เรียบร้อย', 'อัพเดทเวลาสำเร็จ', 'success')
            await this.getJobData()
            await this.getTime()
          }).catch((error) => {
            console.log('error function addData : ', error)
          })
        } else {
          this.$swal('ผิดพลาด', 'กรุณาเลือกพนักงานที่รับผิดชอบ', 'error')
        }
      })
    },
    async getTime () {
      await axios
        .get(this.DNS_IP + '/TimeEmp_Log/totalTime/' + this.$session.getAll().data.empId).then((response) => {
          let rs = response.data
          let time = []
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              if (this.allJob.filter(i => { return i.jobId === d.jobId && i.stepId === d.stepId && i.empId === d.empId }).length > 0) {
                if (this.allJob.filter(i => { return i.jobId === d.jobId && i.stepId === d.stepId && i.empId === d.empId })[0].statusTime === 'timeEnd') {
                  let TimeNow = this.jsTimeDiff(this.allJob.filter(i => { return i.jobId === d.jobId && i.stepId === d.stepId && i.empId === d.empId })[0].timeStart)
                  d.totalTime = d.totalTime + TimeNow
                  d.showTime = this.convertHMS(d.totalTime)
                }
              } else {
                console.log('tttttttttttttttttt')
                d.showTime = this.convertHMS(d.totalTime)
              }
              time.push(d)
            }
            this.timeItem = time
          }
          console.log('timeItem', this.timeItem)
          clearInterval(this.clearInter)
          this.clearInter = null
          this.clearInter = setInterval(this.setTimeshow, 1000)
        }).catch((error) => {
          console.log('error function addData : ', error)
          console.log('False')
        })
    },
    setTimeshow (tr, dt) {
      for (let i = 0; i < this.allJob.length; i++) {
        let d = this.allJob[i]
        // if (d.statusTime === 'timeEnd') {
        //   // console.log('showTime', this.jsTimeDiff(new Date(d.timeStart)))
        // }
        if (this.timeItem.filter((item) => { return item.jobId === d.jobId && item.stepId === d.stepId }).length > 0) {
          let showTime = this.timeItem.filter((item) => { return item.jobId === d.jobId && item.stepId === d.stepId })[0].totalTime
          if (d.countTime === 0) {
            d.countTime = showTime + 1
          } else {
            d.countTime = d.countTime + 1
          }
          d.showTime = this.convertHMS(d.countTime)
          // console.log('test', d.countTime)
          // console.log('showTime', d.showTime)
        }
      }
    },
    convertHMS (value) {
      const sec = parseInt(value, 10) // convert value to number if it's string
      let hours = Math.floor(sec / 3600) // get hours
      let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
      let seconds = sec - (hours * 3600) - (minutes * 60) // get seconds
      // add 0 if value < 10; Example: 2 => 02
      if (hours < 10) { hours = '0' + hours }
      if (minutes < 10) { minutes = '0' + minutes }
      if (seconds < 10) { seconds = '0' + seconds }
      return hours + ':' + minutes + ':' + seconds // Return is HH : MM : SS
    },
    jsTimeDiff (strDateTime1) {
      // var oneday = 1000 * 60
      let strDateTime2 = new Date()
      var defDate = (strDateTime2.getTime() - new Date(strDateTime1).getTime()) / 1000
      console.log('def', defDate)
      return defDate
    }
  }
}
</script>
<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  background-color: #f0eeee !important;
}
.workRow {
  display: inline-block;
  width: max-content;
  height: max-content;
}
.colum {
  margin-top: 1rem;
  width: 200px;
  background-color: #f0eeee;
  margin-left: 1.5px;
}
.allFrame {
  padding-top: 0px;
  width: 100%;
  height: max-content;
}
#subtextTitle {
  color: #173053;
  font-size: 20px !important;
  font-weight: bold;
}
#textTitleB {
  color: #173053;
  font-size: 40px !important;
  font-weight: bold;
  font-family: Roboto;
  font-style: normal;
}
#cardleft {
  height: 1024px;
  width: 502px;
  left: 1210px;
  top: 0px;
  border-radius: 0px;
}
#v-img-car {
  height: 60px;
  width: 64px;
}
#img_edit_step {
  width: 135px;
  height: 100px;
}
#text_edit_step {
  Width: 250px;
  Height: 50px;
}
#textButton {
  height: 50px;
  width: 117px;
  font-family: Kittithada Bold 75;
  font-style: normal;
  font-weight: bold;
  align-items: center;
}
#text-Board {
  position: absolute;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #1b437c;
}
#cardTitle {
  width: auto;
  height: auto;
  border-radius: 2px;
}
#v-text-editLayout {
  height: 50px;
  width: 238px;
}
body {
  overflow: auto;
  white-space: normal;
}
</style>
