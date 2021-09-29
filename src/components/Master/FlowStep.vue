<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <!--ปุ่ม เพิ่มช้อมูล ไปที่หน้า RegisterAdd -->
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn color="primary" depressed @click="add()">
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
            </v-btn>
          </v-col>
        </v-row>

        <!-- select flow-->
        <v-col cols="12" sm="4">
          <v-select
            :items="DataFlowName"
            v-model="formUpdate.flowName"
            required
            dense
            outlined
            @change="getStepFlow() , getLayout()"
          ></v-select>
        </v-col>

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

        <div class="workRow">
          <v-row>
          <v-col class="colum" v-for="(element , work ) in Layout" :key="work">
               <div v-for="(item , indexitem) in Layout[work].workData" :key="indexitem">
                <v-card>
                  <v-toolbar
                    color="primary"
                    dark
                  >
                    <v-card-title class="cardData text-h6 lighten-2 pa-3">
                      {{item.stepTitle}}
                    </v-card-title>
                  </v-toolbar>
                    <div  v-for="(itemsJob, indexJob) in allJob.filter((row) => {return row.stepId == item.stepId})" :key="indexJob">
                      <v-list-item>
                      <v-alert
                        color="cyan"
                        border="left"
                        elevation="2"
                        colored-border
                      >
                      <v-icon right color="green darken-2" depressed @click="dialogAdd = true"> mdi-pencil </v-icon>
                    <div  v-for="(items, index) in JobDataItem.filter((row) => {return row.jobId == itemsJob.jobId})" :key="index">
                      <strong>{{ items.fieldName }}: </strong>{{ items.fieldValue}}<br>
                    </div>
                    <strong>ผู้รับผิดชอบ :{{ JobDataItem.filter((row) => {return row.jobId == itemsJob.jobId})[0].empStep }}</strong>
                    <v-spacer></v-spacer>
                      <v-col cols="6" class="v-margit_button text-right">
                        <v-btn color="primary" depressed @click="dialog = true, setUpdate(itemsJob)">
                          เปลี่ยนสถานะ
                        </v-btn>
                      </v-col>
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
      session: this.$session.getAll(),
      stepItemSelete: [],
      empSeleteStep: [],
      DataFlowName: [],
      ItemSelete: [],
      userId: '',
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
        branchStep: ''
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
      }
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    await this.getDataFlow()
    await this.getEmpSelect()
  },
  methods: {
    async add () {
      this.$router.push('/Master/RegisterAdd')
    },
    log: function (evt) {
      window.console.log(evt)
    },
    getDataFlow () {
      this.DataFlowName = []
      console.log('DataFlowName', this.DataFlowName)
      axios.get(this.DNS_IP + '/flow/get').then(response => {
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
    async getLayout () {
      this.Layout = []
      console.log('flowName', this.formUpdate.flowName)
      await axios.get(this.DNS_IP + '/WorkShopLayout/get?flowId=' + this.formUpdate.flowName)
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
        .get(this.DNS_IP + '/flowStep/get?flowId=' + this.formUpdate.flowName)
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
        .get(this.DNS_IP + '/job/get?flowId=' + this.formUpdate.flowName)
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
            this.userId = response.data[0].userId
            response.data.forEach(element => {
              if (jobs.indexOf(element.jobId) === -1) {
                jobs.push(element.jobId)
                this.allJob.push({jobId: element.jobId, stepId: element.stepId})
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
</style>
