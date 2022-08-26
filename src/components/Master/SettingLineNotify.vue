<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
        <v-row>
          <v-col cols="12">
            <v-btn color="primary" depressed @click="dialogAdd = true">
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่มข้อมูล
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-dialog
          v-model="dialogAdd"
          persistent
          max-width="600"
        >
          <v-card class="pa-10" min-height="700">
            <div class="text-center">
              <h3>เลือกบริการที่จะรับการแจ้งเตือน</h3>
            </div>
            <v-row class="pa-16">
              <v-col class="pa-0" cols="12">
                <!-- <p>{{itemBranch}}</p> -->
                <v-select
                  v-model="itemBranch"
                  :items="BranchItem"
                  label="เลือกสาขาที่ต้องการรับการแจ้งเตือน"
                  dense
                  outlined
                  multiple
                  persistent-hint
                  class="ma-3"
                ></v-select>
              </v-col>
              <v-col class="pa-0" cols="12" md='12'>
                <v-container fluid>
                  <h4 class="text-center font-weight-black mb-5">ประเภทบริการ</h4>
                   <v-row v-for="(item , index) in flowData" :key="index" class="mb-1"  style="border-style: groove;">
                    <v-col cols="12" class="text-center">
                      <p class="pa-0 ma-0 mt-4 font-weight-black" >{{item.text}}</p>
                    </v-col>
                    <v-col class="pa-0 ps-4 ma-0" cols="12">
                      <v-checkbox class="pa-0 ma-0"
                        v-model="item.checkBooking"
                        label="นัดหมายเข้ารับบริการ"
                      ></v-checkbox>
                      <v-checkbox class="pa-0 ma-0"
                        v-model="item.checkJob"
                        label="กระดานการทำงาน"
                      ></v-checkbox>
                      <v-checkbox class="pa-0 ma-0"
                        v-model="item.checkEpmtime"
                        label="การบันทึกเวลาพนักงาน"
                      ></v-checkbox>
                    </v-col>
                   </v-row>
                </v-container>
              </v-col>
              <!-- <v-col class="pa-0" cols="6" md='6'>
                <v-container fluid>
                    <p class="text-center">การBooking</p>
                    <v-checkbox
                    v-model="BookingSend"
                    label="Booking"
                  ></v-checkbox>
                </v-container>
              </v-col> -->
            </v-row>
            <div class="text-center">
              <v-btn
                small class="ma-2" color="#173053" dark
                @click="AddData()"
              >
                บันทึก
              </v-btn>
              <v-btn
                small class="ma-2" color="#173053" outlined dark
                @click="dialogAdd = false"
              >
                Close
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
          <v-dialog
          v-model="dialog"
          persistent
          max-width="600"
        >
          <v-card class="pa-10" min-height="700">
            <div class="text-center">
              <h3>เลือกบริการที่จะรับการแจ้งเตือน</h3>
            </div>
            <v-row class="pa-16">
              <v-col class="pa-0" cols="12">
                <!-- <p>{{itemBranch}}</p> -->
                <v-select
                  v-model="itemBranchEdit"
                  :items="BranchItem"
                  :menu-props="{ maxHeight: '400' }"
                  label="เลือกสาขาที่ต้องการรับการแจ้งเตือน"
                  dense
                  outlined
                  multiple
                  persistent-hint
                  class="ma-3"
                ></v-select>
              </v-col>
              <v-col class="pa-0" cols="12" md='12'>
                <v-container fluid>
                  <h4 class="text-center font-weight-black mb-5">ประเภทบริการ</h4>
                   <v-row v-for="(item , index) in itemSelectEdit" :key="index" class="mb-1" style="border-style: groove;">
                    <v-col cols="12" class="text-center">
                      <p class="pa-0 ma-0 mt-4 font-weight-black">{{item.text}}</p>
                    </v-col>
                    <v-col class="pa-0 ps-4 ma-0" cols="12">
                      <v-checkbox class="pa-0 ma-0"
                        v-model="item.checkBooking"
                        label="นัดหมายเข้ารับบริการ"
                      ></v-checkbox>
                    </v-col>
                    <v-col class="pa-0 ps-4 ma-0" cols="12">
                      <v-checkbox class="pa-0 ma-0"
                        v-model="item.checkJob"
                        label="กระดานการทำงาน"
                      ></v-checkbox>
                    </v-col>
                    <v-col class="pa-0 ps-4 ma-0" cols="12">
                      <v-checkbox class="pa-0 ma-0"
                        v-model="item.checkEpmtime"
                        label="การบันทึกเวลาพนักงาน"
                      ></v-checkbox>
                    </v-col>
                   </v-row>
                </v-container>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-btn
                small class="ma-2" color="#173053" dark
                @click="editData()"
              >
                แก้ไขข้อมูล
              </v-btn>
              <v-btn
                small class="ma-2" color="#173053" outlined dark
                @click="dialog = false"
              >
                Close
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="LineGroupitem"
              :search="search"
            >
            <!-- <template v-slot:[`item.Img`]="{ item }">
              <v-avatar>
                <img
                  :src="item.Img"
                >
              </v-avatar>
            </template> -->
            <template v-slot:[`item.action`]="{ item }">
              <v-btn
                color="info"
                fab
                v-if="item.accessToken === '' || item.accessToken === null"
                small
                dark
                @click="gotoSelectGroup(item)"
              >
                <v-icon > mdi-send-clock </v-icon>
              </v-btn>
              <v-btn
                color="#173053"
                fab
                x-small
                dark
                @click="setEdit(item) , dialog=true"
              >
                <v-icon > mdi-wrench </v-icon>
              </v-btn>
              <v-btn
                color="red"
                fab
                x-small
                dark
                @click="DeleteGroup(item)"
              >
                <v-icon > mdi-delete </v-icon>
              </v-btn>
            </template>
            </v-data-table>
          </v-card>
          </v-col>
        </v-row>
        </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import moment from 'moment-timezone'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
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
          text: 'จัดการ การแจ้งเตือน LineGroup',
          disabled: false,
          href: '/Master/SettingLineNotify'
        }
      ],
      dialog: false,
      dialogAdd: false,
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      search: '',
      headers: [
        { text: 'ชื่อ / ชื่อกลุ่ม', value: 'target' },
        { text: 'ประเภท', value: 'targetType' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATEtext' },
        { text: 'วันที่แก้ไข', value: 'LAST_DATEtext' },
        { text: 'จัดการข้อมูล', value: 'action', sortable: false, align: 'center' }

      ],
      LineGroupitem: [],
      itemSelect: [],
      itemSelectEdit: [],
      Flowitem: [],
      BranchItem: [],
      itemBranch: [],
      itemBranchEdit: [],
      BookingSend: false,
      BookingSendEdit: false,
      idEdit: '',
      notifyId: '',
      flowData: []
    }
  },
  async mounted () {
    this.getLineGroup()
    this.getDataBranch()
    this.getFLow()
  },
  methods: {
    async getLineGroup () {
      this.LineGroupitem = []
      await axios
        .get(this.DNS_IP + '/lineNotifySetUp/get?shopId=' + this.shopId).then((response) => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            this.LineGroupitem = rs
            // for (let i = 0; i < rs.length; i++) {
            //   let d = rs[i]
            //   let s = {}
            //   s.Id = d.Id
            //   s.GroupId = d.GroupId
            //   s.GroupName = d.LineGroupName
            //   s.Img = d.GroupImg
            //   this.LineGroupitem.push(s)
            // }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getFLow () {
      this.flowData = []
      await axios
        .get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then((response) => {
          let rs = response.data
          console.log('rs2', rs)
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.flowName
              s.value = d.flowId
              this.flowData.push(s)
            }
            // this.flowData = rs
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getDataBranch () {
      this.BranchItem = []
      await axios
        .get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId)
        .then(async (response) => {
          let rs = response.data
          // console.log('212', rs)
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            d.text = d.masBranchName
            d.value = d.masBranchID
            this.BranchItem.push(d)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async AddData () {
      let BranchJSON = []
      this.notifyId = moment().valueOf()
      // console.log('itemBrtanch', this.itemBranch)
      for (let i = 0; i < this.itemBranch.length; i++) {
        let d = this.itemBranch[i]
        let s = {}
        s.masBranchID = d
        BranchJSON.push(s)
      }
      let checkitemSelect = []
      this.flowData.forEach(v => {
        if (v.checkBooking === true) {
          checkitemSelect.push(v.checkBooking)
        } else if (v.checkJob === true) {
          checkitemSelect.push(v.checkJob)
        } else if (v.checkEpmtime === true) {
          checkitemSelect.push(v.checkEpmtime)
        }
      })
      let dataAdd = {}
      let bookingS = ''
      if (this.BookingSend) {
        bookingS = 'N'
      } else {
        bookingS = 'D'
      }
      if (checkitemSelect.length > 0) {
        dataAdd = {
          flowData: JSON.stringify(this.flowData),
          masBranchID: JSON.stringify(BranchJSON),
          BookingSend: bookingS,
          shopId: this.shopId,
          notifyId: this.notifyId.toString(),
          CREATE_USER: this.$session.getAll().data.userName,
          LAST_USER: this.$session.getAll().data.userName
        }
      } else {
        dataAdd = {
          flowData: null,
          masBranchID: JSON.stringify(BranchJSON),
          BookingSend: bookingS,
          shopId: this.shopId,
          notifyId: this.notifyId.toString(),
          CREATE_USER: this.$session.getAll().data.userName,
          LAST_USER: this.$session.getAll().data.userName
        }
      }
      if (this.BookingSend === false && checkitemSelect.length === 0) {
        this.$swal('ผิดพลาด', 'กรุณาเลือกรายการแจ้งเตือน', 'error')
      } else {
        if (BranchJSON.length > 0) {
          console.log('dataAdd', dataAdd)
          await axios
            .post(this.DNS_IP + '/lineNotifySetUp/add', dataAdd)
            .then(async (response) => {
              this.$swal('บันทึกข้อมูลเรียบร้อย', ' ', 'success')
              this.dialog = false
              window.location.href = 'https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=bH0O0FW2isiXycTQh9GoXp' +
              '&scope=notify&state=LQpoVxRXet0KHIKLNl5lyIySzAgIM5bIPVgKq74nvKd' +
              '&redirect_uri=https://betask-linked-admin.web.app/UpdateNotify?shopId=' + this.shopId + 'notifyId' + this.notifyId
            })
          // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              console.log('error function addData : ', error)
            })
        } else {
          this.$swal('ผิดพลาด', 'กรุณาเลือกสาขา', 'error')
        }
      }
      // console.log('dataAdd', dataAdd)
    },
    async DeleteGroup (item) {
      console.log('item', item)
      item.shopId = this.shopId
      item.LAST_USER = this.$session.getAll().data.userName
      this.$swal({
        title: 'ต้องการ ลบข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async () => {
        await axios
          .post(this.DNS_IP + '/lineNotifySetUp/delete/' + item.id, item)
          .then(async (response) => {
            this.$swal('ลบข้อมูลเรียบร้อย', ' ', 'success')
            this.getLineGroup()
            this.getDataBranch()
            this.getFLow()
          })
        // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            console.log('error function addData : ', error)
          })
      })
    },
    gotoSelectGroup (item) {
      window.location.href = 'https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=bH0O0FW2isiXycTQh9GoXp' +
              '&scope=notify&state=LQpoVxRXet0KHIKLNl5lyIySzAgIM5bIPVgKq74nvKd' +
              '&redirect_uri=https://betask-linked-admin.web.app/UpdateNotify?shopId=' + item.shopId + 'notifyId' + item.notifyId
    },
    setEdit (item) {
      console.log('item', item)
      this.itemBranchEdit = []
      this.idEdit = item.id
      this.itemSelectEdit = JSON.parse(item.flowData)
      JSON.parse(item.masBranchID).forEach((v, k) => {
        this.itemBranchEdit.push(v.masBranchID)
      })
      if (item.BookingSend === 'N') {
        this.BookingSendEdit = true
      } else {
        this.BookingSendEdit = false
      }
    },
    async editData () {
      console.log('this.itemSelectEdit', this.itemSelectEdit)
      var bookingS = ''
      if (this.BookingSendEdit) {
        bookingS = 'N'
      } else {
        bookingS = 'D'
      }
      let BranchJSON = []
      // console.log('itemBrtanch', this.itemBranch)
      for (let i = 0; i < this.itemBranchEdit.length; i++) {
        let d = this.itemBranchEdit[i]
        let s = {}
        s.masBranchID = d
        BranchJSON.push(s)
      }
      var data = {
        'flowData': JSON.stringify(this.itemSelectEdit),
        'masBranchID': JSON.stringify(BranchJSON),
        'BookingSend': bookingS,
        'LAST_USER': this.$session.getAll().data.userName
      }
      console.log('params', data)
      console.log('params', JSON.stringify(data))
      let checkitemSelect = []
      this.itemSelectEdit.forEach(v => {
        if (v.checkBooking === true) {
          checkitemSelect.push(v.checkBooking)
        } else if (v.checkJob === true) {
          checkitemSelect.push(v.checkJob)
        } else if (v.checkEpmtime === true) {
          checkitemSelect.push(v.checkEpmtime)
        }
      })
      if (this.BookingSendEdit === false && checkitemSelect.length === 0) {
        this.$swal('ผิดพลาด', 'กรุณาเลือกรายการแจ้งเตือน', 'error')
      } else {
        await axios.post(this.DNS_IP + '/lineNotifySetUp/edit/' + this.idEdit, data).then(async response => {
          this.$swal('แก้ไขเรียบร้อย', ' ', 'success')
          await this.getLineGroup()
          this.dialog = false
        })
      }
    }
  }
}
</script>
<style scope>
#margin {
  margin-top: 50px;
  margin-bottom: 40px;
}
.v_text_edit {
  Width: 255px;
  Height: 52px;
  font-size: 10px !important;
}
#subtext {
  color: #173053;
  font-size: 30px !important;
  font-weight: bold;
}
</style>
