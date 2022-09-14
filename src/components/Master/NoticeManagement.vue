<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn color="primary" depressed @click="dialogSendNotic = true">
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่ม NoticeManagement
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog
          v-model="dialogSendNotic"
          persistent
          width="40%"
        >
          <v-card class="pa-3" min-height="600" style="overflow-x: hidden;">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div style="text-align: end;">
                <v-btn
                  fab
                  small
                  dark
                  color="#F3F3F3"
                  @click="reset"
                >
                  <v-icon dark
                  color="#FE4A01 ">
                    mdi-close
                  </v-icon>
                </v-btn>
            </div>
            <v-col class="text-left py-0">
              <h2 class="font-weight-bold"  style="color:#000000;">ตั้งค่าการแจ้งเตือน</h2>
              <p class="font-weight-medium"  style="color:#000000;"><v-icon class="mr-1" color="#69D1FD" style="font-size: 10px">mdi-checkbox-blank-circle</v-icon>สร้างกลุ่มเป้าหมาย</p>
            </v-col>
            <v-row class="pa-3 ma-0">
              <v-col cols="6" class="pa-1">
              <v-select
                v-model="formSendNotify.flowId"
                dense
                :items="DataFlowName"
                label="เลือกประเภทบริการ"
                outlined
                append-icon="mdi-map"
                @change="setTime()"
                :rules="required"
              ></v-select>
            </v-col>
            <v-col cols="6" class="pa-1">
              <v-select
                v-if="session.data.empId === null"
                v-model="formSendNotify.empSelect"
                dense
                :items="dataEmp"
                label="เลือกพนักงาน"
                outlined
                append-icon="mdi-account-arrow-right"
                :rules="required"
              ></v-select>
            </v-col>
            <v-col cols="6" class="pa-1 mt-n4">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formSendNotify.targetDate"
                    label="วันที่นัดหมาย"
                    append-icon="mdi-calendar"
                    color-icon
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="required"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="formSendNotify.targetDate"
                  no-title
                  scrollable
                  :rules="required"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6" class="pa-1 mt-n4">
              <v-select
              v-if="formSendNotify.flowId !== ''"
                dense
                v-model="formSendNotify.afterTime"
                :items="timeavailable"
                label="ตั่งแต่เวลา"
                outlined
                :rules="required"
              ></v-select>
            </v-col>
            </v-row>
            <v-col class="text-left py-0">
              <p class="font-weight-medium"  style="color:#000000;"><v-icon class="mr-1" color="#69D1FD" style="font-size: 10px">mdi-checkbox-blank-circle</v-icon>ตั้งค่ากลุ่มแจ้งเตือน</p>
              <v-radio-group
                v-model="formSendNotify.confirmOnly"
                row
                :rules="required"
              >
                <v-radio
                  label="ลูกค้าที่ยังไม่ได้เข้ารับบริการ"
                  value="confirm"
                  :on-icon="'mdi-checkbox-marked'"
                  :off-icon="'mdi-checkbox-blank-outline'"
                  color="#1B437C"
                ></v-radio>
                <v-radio
                  label="ลูกค้าที่เข้ารับบริการแล้ว"
                  value="confirmJob"
                  :on-icon="'mdi-checkbox-marked'"
                  :off-icon="'mdi-checkbox-blank-outline'"
                  color="#1B437C"
                ></v-radio>
              </v-radio-group>
            </v-col>
            <v-col class="py-0">
                <v-row>
                  <v-col cols="6" >
                    <p class="font-weight-medium text-left mt-1"  style="color:#000000;">
                    <v-icon class="mr-1" color="#69D1FD" style="font-size: 10px">mdi-checkbox-blank-circle</v-icon>
                    ตรวจสอบรายชื่อลูกค้า
                    <v-btn
                    class="mx-2"
                    fab
                    small
                    dark
                    color="#14AE5C"
                    @click="getMemberList()"
                  >
                    <v-icon dark>
                      mdi-file-search
                    </v-icon>
                  </v-btn>
                    </p>
                  </v-col>
                  <v-col cols="6" >
                    <p class="font-weight-medium text-right mt-3"  style="color:#000000;">
                    {{'จำนวนลูกค้า  ' +  memberData.length + '  คน'}}
                    </p>
                  </v-col>
                </v-row>
              <v-card class="scroll pa-3 pl-6" height="155px">
                <v-row>
                  <v-col cols="4" class="mt-1" v-for="(item,index) in memberData" :key="index">
                    <v-sheet class="pa-1">
                      <v-row >
                        <v-col cols="4" class="pa-1">
                          <v-avatar>
                            <img
                               v-if="item.memberPicture"
                              :src="item.memberPicture"
                            >
                            <v-icon dark v-else>
                              mdi-account-circle
                            </v-icon>
                          </v-avatar>
                        </v-col>
                        <v-col cols="8" class="pa-1 mt-3">
                          <p>{{item.memberName}}</p>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col class="text-left py- mt-3">
              <p class="font-weight-medium"  style="color:#000000;"><v-icon class="mr-1" color="#69D1FD" style="font-size: 10px">mdi-checkbox-blank-circle</v-icon>ข้อความ</p>
                <v-textarea
                    v-model="formSendNotify.message"
                    outlined
                    name="input-7-4"
                    label="ข้อความ"
                    rows="4"
                    row-height="6"
                    :rules="required"
                  ></v-textarea>
            </v-col>
            <div class="text-ceer">
              <v-btn
                block
                class="ma-2 ml-n1"
                color="#14AE5C"
                dark
                :readonly="!valid"
                @click="validate"
              >
                ส่งข้อความ
              </v-btn>
            </div>
            </v-form>
          </v-card>
        </v-dialog>
        <v-row>
         <v-col cols="12">
            <v-card elevation="7" v-if="dataItem">
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
                  :headers="headers"
                  :items="dataItem"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                   <template v-slot:[`item.sendDate`]="{ item }">
                      {{ format_date(item.sendDate) }}
                  </template>
                   <template v-slot:[`item.targetDate`]="{ item }">
                      {{ momenDate_1(item.targetDate) }}
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
import waitingAlert from '../waitingAlert.vue'
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู

// import moment from 'moment' // แปลง date

export default {
  components: {
    waitingAlert,
    'left-menu-admin': adminLeftMenu
  },
  created () {
    setInterval(this.getNowGlobal, 1000)
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'จัดการ NoticeManagement',
          disabled: false,
          href: '/Master/NoticeManagement'
        }
      ],
      dialogSendNotic: false,
      headers: [
        { text: 'วันที่ส่งข้อความ', value: 'sendDate' },
        { text: 'วันที่นัดหมาย', value: 'targetDate' },
        { text: 'เวลา', value: 'afterTime' },
        { text: 'จำนวนข้อความ', value: 'memberCnt' },
        { text: 'ผู้ส่งข้อความ', value: 'empFull' }

      ],
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      date: '',
      valid: true,
      rules: {
        numberRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: value => value.length <= 10 || 'Max 10 characters',
        IDcardRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        required: value => !!value || '',
        resizeImag: value =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
        counterIDcard: value => value.length <= 13 || 'Max 13 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      required: [
        v => !!v || 'กรุณากรอกข้อมูล'
      ],
      searchAll2: '',
      formSendNotify: {
        flowId: '',
        targetDate: '',
        afterTime: '',
        confirmOnly: '',
        memberCnt: '',
        memberList: null,
        message: '',
        shopId: '',
        empSelect: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      menu: false,
      dataItem: null,
      timeavailable: [],
      DataFlowName: [],
      DataFlowNameAll: [],
      memberData: [],
      dataEmp: []
    }
  },
  async mounted () {
    await this.getnotice()
    await this.getDataFlow()
    await this.getEmp()
  },
  methods: {
    validate () {
      // this.$refs.form.validate()
      if (this.$refs.form.validate()) {
        this.addNotice()
      }
    },
    reset () {
      this.$refs.form.resetValidation()
      this.dialogSendNotic = false
    },
    async getnotice () {
      this.dataItem = []
      await axios
        .get(this.DNS_IP + '/notice/get?shopId=' + this.shopId).then((response) => {
          let rs = response.data
          console.log('this.rs', rs)
          if (rs.length > 0) {
            this.dataItem = rs
          } else {
            this.dataItem = []
          }
          console.log('this.dataItem', this.dataItem)
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getDataFlow () {
      this.DataFlowName = []
      this.DataFlowNameAll = []
      await axios.get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        console.log('getDataFlow', rs)
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.text = d.flowName
            s.textEng = d.flowNameEn
            s.value = d.flowId
            this.DataFlowName.push(s)
            this.DataFlowNameAll.push(d)
          }
          console.log('this.DataFlowNameAll', this.DataFlowNameAll)
        } else {
          this.DataFlowName = []
          this.DataFlowNameAll = []
        }
      })
    },
    async setTime () {
      this.timeavailable = JSON.parse(this.DataFlowNameAll.filter(item => { return item.flowId === this.formSendNotify.flowId })[0].setTime) || []
    },
    async getMemberList () {
      console.log('test', this.formSendNotify)
      this.memberData = []
      if (this.formSendNotify.targetDate !== '' && this.formSendNotify.afterTime !== '' && this.formSendNotify.flowId !== '' && this.formSendNotify.confirmOnly !== '') {
        await axios.get(this.DNS_IP + '/notice/NoticMember?targetDate=' + this.formSendNotify.targetDate +
      '&afterTime=' + this.formSendNotify.afterTime + '&flowId=' +
      this.formSendNotify.flowId + '&shopId=' + this.shopId + '&confirmOnly=' + this.formSendNotify.confirmOnly)
          .then(response => {
            let rs = response.data
            console.log('getMemberList', rs)
            if (rs.length > 0) {
              for (var i = 0; i < rs.length; i++) {
                let d = rs[i]
                if (d.lineUserId !== null) {
                  if (this.memberData.filter((item) => item.lineUserId === d.lineUserId).length === 0) {
                    let s = {}
                    s.lineUserId = d.lineUserId
                    s.memberPicture = d.memberPicture
                    s.memberName = d.memberName
                    this.memberData.push(s)
                  }
                }
              }
              if (this.memberData.length === 0) {
                this.$swal('ไม่พบข้อมูลลูกค้า', 'กรุณาตรวจสอบเงือนไข', 'warning')
              }
              console.log('this.memberData', this.memberData)
            } else {
              this.$swal('ไม่พบข้อมูลลูกค้า', 'กรุณาตรวจสอบเงือนไข', 'warning')
            }
          }).catch((error) => {
            console.log(error)
          })
      } else {
        this.$swal('ผิดพลาด', 'กรุณาเลือกเงือนไขให้ครบ', 'error')
      }
    },
    async getEmp () {
      this.dataEmp = []
      await axios.get(this.DNS_IP + '/empSelect/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.text = d.empFull_NameTH
            s.value = d.empId
            this.dataEmp.push(s)
          }
        } else {
          this.dataEmp = []
        }
      })
      console.log('dataEmp', this.dataEmp)
    },
    async addNotice () {
      this.formSendNotify.shopId = this.shopId
      this.formSendNotify.memberList = JSON.stringify(this.memberData.map((item) => { return item.lineUserId }))
      this.formSendNotify.memberCnt = this.memberData.length
      if (this.session.data.empId !== null) {
        this.formSendNotify.empSelect = this.session.data.empId
      } else {
        this.formSendNotify.empSelect = this.formSendNotify.empSelect
      }
      this.formSendNotify.CREATE_USER = this.$session.getAll().data.userName
      this.formSendNotify.LAST_USER = this.$session.getAll().data.userName
      console.log('this.formSendNotify', this.formSendNotify)
      if (this.valid !== false) {
        await axios
          .post(this.DNS_IP + '/notice/add', this.formSendNotify)
          .then(async (response) => {
            console.log('response', response)
            let noticeNo = response.data.noticeNo
            if (noticeNo) {
              await this.sendMulticast(noticeNo)
              await this.clearData()
              await this.getMethod()
            }
          })
        // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            console.log('error function addData : ', error)
          })
      }
    },
    async sendMulticast (noticeNo) {
      await axios
        .post(this.DNS_IP + '/notice/sendMulticast/' + noticeNo)
        .then(async (response) => {
          console.log('response', response)
          this.$swal('บันทึกข้อมูลเรียบร้อย', ' ', 'success')
        })
      // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async clearData () {
      this.dialogSendNotic = false
      this.memberData = []
      this.formSendNotify.flowId = ''
      this.formSendNotify.targetDate = ''
      this.formSendNotify.afterTime = ''
      this.formSendNotify.confirmOnly = ''
      this.formSendNotify.memberCnt = ''
      this.formSendNotify.memberList = ''
      this.formSendNotify.message = ''
      this.formSendNotify.empSelect = ''
      this.formSendNotify.CREATE_USER = ''
      this.formSendNotify.LAST_USER = ''
    },
    async getMethod () {
      await this.getnotice()
      await this.getDataFlow()
      await this.getEmp()
    }
  }
}
</script>
<style scope>
.scroll {
   overflow-y: scroll;
   overflow-x: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
::-webkit-scrollbar-button {
  width: 2px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #173053;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #173053;
}
/* .v-label{
  margin-bottom: 0;
  color:#1B437C !important;
  font-weight: bold;
} */
</style>
