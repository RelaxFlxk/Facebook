<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row v-if="formUpdate.flowName && masBranchName">
          <v-col cols="12" class="text-center">
            <p class="text-h4 text--primary">
              {{formUpdate.flowName}} ({{masBranchName}})
            </p>
          </v-col>
        </v-row>

        <!-- select flow-->
        <v-sheet tile height="54" class="d-flex">
          <!-- ประเภทบริการ -->
          <v-col cols="12" sm="4">
          <v-select
            :items="DataFlowName"
            v-model="formUpdate.flowName"
            @change="getStepFlow() , getLayout()"
            dense
            outlined
            hide-details
            label="ประเภทบริการ"
            class="ma-2"
          ></v-select>
          </v-col>
          <!-- สาขา -->
          <v-col cols="12" sm="4">
          <v-select
            :items="DataBranchName"
            v-model="masBranchName"
            @change="getStepFlow() , getLayout()"
            dense
            outlined
            hide-details
            label="สาขา"
            class="ma-2"
          ></v-select>
          </v-col>
          <v-btn class="ma-2 mt-5" color="primary" depressed @click="newCars()">
              <v-icon left>mdi-account-plus</v-icon>
              รับรถใหม่
            </v-btn>
          <v-btn class="ma-2 mt-5" color="primary" depressed @click="editLayout()">
            <v-icon left>mdi-application-cog</v-icon>
            แก้ไข Layout
          </v-btn>
          <v-btn style="margin-top: 20px" color="primary" depressed @click="editStep()">
              <v-icon left>mdi-application-cog</v-icon>
              แก้ไข ขั้นตอน
            </v-btn>
        </v-sheet>
        <v-divider></v-divider>

        <!-- เปลี่ยนสถานะ step-->
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              max-width="300px"
            >
              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  เปลี่ยนสถานะ
                </v-card-title>
                <br>
                <v-card-text>
                    <v-select
                    outlined
                    dense
                    v-model="formUpdate.stepTitle"
                    :items="stepItemSelete"
                    label="ขั้นตอนต่อไป"
                    item-text="text"
                    item-value="stepId"
                    return-object
                    ></v-select>
                </v-card-text>
                <v-card-text>
                    <v-autocomplete
                    outlined
                    dense
                    v-model="formUpdate.empStep"
                    :items="empSeleteStep"
                    label="ชื่อ คนรับผิดชอบ"
                    ></v-autocomplete>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                   <v-btn color="primary" depressed  @click="onUpdate()">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <!-- end เปลี่ยนสถานะ step -->

          <!-- DIALOG ADD -->
          <v-dialog v-model="dialogAdd" persistent max-width="50%">
            <v-card>
              <v-card-title>
                <span class="headline">แก้ไขข้อมูล</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <div class="column is-3" v-for="(itemsEdit, index) in JobDataItem" :key="index">
                    <strong>{{ itemsEdit.fieldName }}: </strong>
                    <v-col cols="12">
                      <v-text-field
                      v-model="itemsEdit.fieldValue"
                      required dense />
                    </v-col>
                    </div>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary" depressed
                  @click="dialogAdd = false,clearData()"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  depressed
                  color="success"
                  @click="addData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  แก้ไข
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- DIALOG Delete -->
          <v-dialog v-model="dialogDelete" persistent max-width="50%">
            <v-card>
              <v-card-title>
                <span class="headline">ค่าใช้จ่ายทั้งหมด</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                      v-model="formDelete.totalPrice"
                      required dense />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary" depressed
                  @click="dialogDelete = false,clearData()"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  depressed
                  color="success"
                  @click="deleteDataPrice()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end add -->

        <div class="workRow" v-show="formUpdate.flowName && masBranchName !== ''">
          <v-row>
          <v-col class="colum" v-for="(element , work ) in Layout" :key="work">
               <div v-for="(item , indexitem) in Layout[work].workData" :key="indexitem">
                <v-card class="mb-6">
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <v-card-title class=" text pa-3">
                      {{item.stepTitle}} ({{allJob.filter((row) => {return row.stepId == item.stepId}).length}})
                    </v-card-title>
                  </v-toolbar>

                  <div  v-for="(itemsJob, indexJob) in allJob.filter((row) => {return row.stepId == item.stepId})" :key="indexJob">
                    <v-list-item>
                      <v-alert class="allFrame pb-3"
                        color="cyan"
                        border="left"
                        elevation="2"
                        colored-border
                      >
                        <div class="bodyFrame" v-for="(items, index) in JobDataItem.filter((row) => {return row.jobId == itemsJob.jobId})" :key="index">
                          {{ items.fieldValue}}<br>
                        </div>
                        <v-icon large color="black"> mdi-account</v-icon> <strong>{{ JobDataItem.filter((row) => {return row.jobId == itemsJob.jobId})[0].empStep }}</strong>
                        <v-spacer></v-spacer>
                        <v-container class="grey lighten-4" style="position:absolute; width:30px; right:0px; top:0px;">
                          <v-row class="pl-1">
                              <v-icon v-if="allJob.filter((row) => {return row.stepId == item.stepId})[0].checkCar == 'False'"
                                color="#CDDC39"
                                depressed
                                @click="updateStatusCars(itemsJob.jobId, 'False')"
                              > mdi-car </v-icon>

                              <v-icon v-else
                                color="green"
                                depressed
                                @click="updateStatusCars(itemsJob.jobId, 'True')"
                              > mdi-car </v-icon>
                          </v-row>
                          <v-row class="pt-2 pl-1">
                            <v-icon large color="primary" dark @click="dialogAdd = true"> mdi-circle-edit-outline </v-icon>
                          </v-row>
                          <v-row class="pt-2 pl-1">
                              <v-icon large color="primary" @click="dialog = true, setUpdate(itemsJob)"> mdi-list-status</v-icon>
                          </v-row>
                          <v-row class="pt-2 pl-1">
                              <v-icon large color="green" @click="dialogDelete = true"> mdi-check-bold</v-icon>
                          </v-row>
                        </v-container>
                      </v-alert>
                    </v-list-item>
                  </div>

                </v-card>
               </div>
             </v-col>
        </v-row>
        </div>

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
  name: 'hello',
  components: {
    draggable,
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  data () {
    return {
      Layout: [],
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
      DataflowId: '',
      dialog: false,
      dialogAdd: false,
      dialogDelete: false,
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      stepItemSelete: [],
      empSeleteStep: [],
      DataFlowName: [],
      DataBranchName: [],
      ItemSelete: [],
      userId: '',
      masBranchName: '',
      formUpdate: {
        stepId: '',
        flowId: '',
        flowName: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: '',
        endDate: '',
        jobId: '',
        empStep: '',
        departmentStep: '',
        branchStep: '',
        checkCar: ''
      },
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
      formDelete: {
        jobNo: '',
        shopId: this.$session.getAll().data.shopId,
        totalPrice: ''
      },
      formUpdateCar: {
        jobNo: '360043981634784276004',
        shopId: 'MS2021101348536490',
        checkCar: ''
      }
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    await this.getDataFlow()
    await this.getDataBranch()
    await this.getEmpSelect()
  },
  methods: {
    async newCars () {
      this.$router.push('/Master/RegisterAdd')
    },
    async editStep () {
      this.$router.push('/Master/Flow')
    },
    async editLayout () {
      this.$router.push('/Master/WorkShop')
    },
    log: function (evt) {
      window.console.log(evt)
    },
    getDataFlow () {
      this.DataFlowName = []
      console.log('DataFlowName', this.DataFlowName)
      axios.get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.flowName
            d.value = d.flowName
            this.DataFlowName.push(d)
          }
        } else {
          this.DataFlowName = []
        }
      })
    },
    getDataBranch () {
      this.DataBranchName = []
      console.log('DataBranchName', this.DataBranchName)
      axios.get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.masBranchName
            d.value = d.masBranchName
            this.DataBranchName.push(d)
          }
        } else {
          this.DataBranchName = []
        }
      })
    },
    async getLayout () {
      this.Layout = []
      console.log('flowName', this.formUpdate.flowName)
      await axios.get(this.DNS_IP + '/WorkShopLayout/get?flowName=' + this.formUpdate.flowName)
        .then((response) => {
          let rs = response.data
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            var workData = []
            workData = JSON.parse(d.workData)
            this.Layout.push(
              {
                workShopId: d.workShopId,
                workColum: d.workColum,
                workData: workData
              }
            )
          }
          console.log('this.Layout', this.Layout)
        })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async getStepFlow () {
      this.stepItemSelete = []
      await axios
        .get(this.DNS_IP + '/flowStep/get?flowName=' + this.formUpdate.flowName)
        .then(async response => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.stepTitle
              d.value = d.stepTitle
              this.stepItemSelete.push(d)
            }
            console.log('stepItemSelete', this.formUpdate)
            await this.getJobData()
          }
        })
    },
    async getEmpSelect () {
      this.empSeleteStep = []
      await axios
        .get(this.DNS_IP + '/empSelect/get')
        .then(async response => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH
              s.value = d.empFirst_NameTH
              this.empSeleteStep.push(s)
            }
            console.log('empSeleteStep', this.formUpdate)
            await this.getJobData()
          }
        })
    },
    async getJobData () {
      this.JobDataItem = []
      this.allJob = []
      axios
        .get(this.DNS_IP + '/job/get?flowName=' + this.formUpdate.flowName)
        .then(async (response) => {
          this.dataReady = true
          var jobs = []
          console.log('res', response.data)
          // console.log('userId', this.formUpdate.userId === 'NULL')
          if (response.data) {
            this.formUpdate.stepId = response.data[0].stepId
            this.formUpdate.flowId = response.data[0].flowId
            this.formUpdate.jobId = response.data[0].jobId
            this.formUpdate.empStep = response.data[0].empStep
            this.formUpdate.departmentStep = response.data[0].departmentStep
            this.formUpdate.branchStep = response.data[0].branchStep
            this.formUpdate.checkCar = response.data[0].checkCar
            this.userId = response.data[0].userId
            response.data.forEach(element => {
              if (jobs.indexOf(element.jobId) === -1) {
                jobs.push(element.jobId)
                this.allJob.push({jobId: element.jobId, stepId: element.stepId, checkCar: element.checkCar})
              }
            })
            this.JobDataItem = response.data
          }
          console.log('JobDataItem', this.JobDataItem)
          console.log('JobLEN', this.userId)
        })
    },
    async pushmessage (jobId) {
      await axios
        .post(
          this.DNS_IP + '/job/pushMsg/' + jobId
        )
        .then(
          console.log(jobId)
        )
    },
    async setUpdate (item) {
      this.formUpdate.jobId = item.jobId
    },
    async onUpdate () {
      this.formUpdate.stepId = this.formUpdate.stepTitle.stepId
      console.log('stepId', this.formUpdate.stepTitle.stepId)
      console.log('id', this.formUpdate.jobId)
      console.log('formUpdate', this.formUpdate)
      console.log('allJob', this.allJob)
      console.log('empSeleteStep', this.empSeleteStep)
      console.log('empStep', this.formUpdate.empStep)
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
        .then(async (result) => {
          this.formUpdate.LAST_USER = this.session.data.userName
          var ID = this.formUpdate.jobId
          delete this.formUpdate['flowId']
          delete this.formUpdate['flowName']
          delete this.formUpdate['sortNo']
          delete this.formUpdate['CREATE_USER']
          // delete this.formUpdate['stepTitle']
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/job/edit/" + ID,
              this.formUpdate
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              this.dialog = false
              this.$swal('เรียบร้อย', 'แก้ไขสถานะ เรียบร้อย', 'success')
              this.allJob.map((row, index) => {
                if (row.jobId === ID) {
                  this.allJob[index].stepId = this.formUpdate.stepId
                }
              })
              this.pushmessage(this.formUpdate.jobId)
              console.log('allJob', this.allJob)
              console.log(this.formUpdate.jobId)
              console.log(this.formUpdate.stepId)
            })
            // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              this.dataReady = true
              console.log('error function editDataGlobal : ', error)
            })
        })
        .catch((error) => {
          this.dataReady = true
          console.log('error function editDataGlobal : ', error)
        })
    },
    async clearData () {
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
        cancelButtonText: 'ไม่'
      })
        .then(async (response) => {
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
            .post(
              this.DNS_IP + '/job/editStatus/' + ID, ds
            )
            .then(async response => {
              this.$swal('เรียบร้อย', 'อัพเดท สถานะรถ เรียบร้อย', 'success')
              console.log('shopId:', this.shopId)
              console.log('form:', this.formUpdateCar)
            })
        })
    },
    deleteDataPrice () {
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
      })
        .then(async (response) => {
          var ID = this.formUpdate.jobId
          let ds = {
            jobNo: this.formDelete.jobNo,
            shopId: this.formDelete.shopId,
            totalPrice: this.formDelete.totalPrice,
            LAST_USER: this.session.data.userName,
            statusDelete: 'true'
          }
          console.log('ds', ds)
          await axios
            .post(
              this.DNS_IP + '/job/editPrice/' + ID, ds
            )
            .then(async response => {
              this.$swal('เรียบร้อย', 'ลบข้อมูล เรียบร้อย', 'success')
              this.dialogDelete = false
              console.log('shopId:', this.shopId)
              console.log('form:', this.formDelete)
            })
        })
    }
  }
}
</script>
<style scoped>
.workRow{
  display: inline-block;
  width: max-content;
  height: max-content;
}
.colum{
  margin-top: 1rem;
  width: 250px;
  background-color: #f0eeee;
  margin-left: 5px;
}
.allFrame{
  padding-top: 0px;
  width: 100%;
  height: max-content;
}
.bodyFrame {
  padding-top: 1px;
}
</style>
