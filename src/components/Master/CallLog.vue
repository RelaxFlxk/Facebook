<template>
    <div class="example">
        <v-main>
            <v-row>
                <v-col cols="12" class="text-right" style="margin-top: 10px; magin-right: 9px" @click="dialogHistoryCall = true, getDateTime()">
                    <v-btn dark>บันทึการโทร</v-btn>
                </v-col>
            </v-row>
            <v-dialog v-model="dialogHistoryCall"  max-width="35%"  persistent style="background: #FFFFFF;box-shadow: 0px 1px 28px rgba(0, 0, 0, 0.12);border-radius: 14px; height:900px">
                <v-card height="900px">
                    <v-container>
                        <v-row style="padding-left: 5%; padding-right: 0.5%; padding-top: 2%;">
                            <v-col cols="6" class="text-left">
                                <h1>บันทึกการโทร</h1>
                            </v-col>
                            <v-col cols="6">
                                <div style="text-align: end;">
                                    <v-btn
                                    class="button5"
                                    @click="reset(), dialogHistoryCall = false, param = true, clearDataUpdate(), clearDataAdd(), getEmpSelectAdd(), tab = 'tab-1'"
                                    >
                                    <v-icon large color="#F1F1F1 ">
                                        mdi-close
                                    </v-icon>
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <v-row style="padding-left: 5%">
                            <v-col cols="12" >
                                <v-row>
                                    <span style=" padding-right: 1%; color: #69D1FD">*</span><h4 style="color : #161616">กรุณากรอกข้อมูลเพื่อเก็บประวัติการโทร</h4>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row style="padding-top: 2%;">
                            <v-col>
                                <v-tabs
                                    v-model="tab"
                                    fixed-tabs
                                    centered
                                    color="primary"
                                    style="text-di"
                                >
                                <v-tabs-slider color="#ffffff00"></v-tabs-slider>
                                    <v-tab @click="reset(), getDateTime(), getEmpSelectAdd()" href='#tab-1'><h3>บันทึกการโทร</h3></v-tab>
                                    <v-tab @click="getEmpSelectAdd()" href='#tab-2'><h3>ประวัติการโทร</h3></v-tab>
                                    <v-tab-item transition="fade-transition" value='tab-1'>
                                        <v-container fluid>
                                            <v-row v-if="param">
                                                <v-col>
                                                    <v-form ref="form_add" v-model="valid_add" lazy-validation>
                                                    <v-card style="width: 681px;height: 542px;background: #FFFFFF;box-shadow: 1.5px 2.6px 10px rgba(119, 119, 119, 0.1);" class="mx-auto">
                                                        <v-container>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="4" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">วันที่*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="8">
                                                                    <v-text-field
                                                                        v-model="callDate"
                                                                        placeholder="2022/03/20"
                                                                        outlined
                                                                        v-mask="'####-##-##'"
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="4" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">เวลา*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="8">
                                                                    <v-text-field
                                                                        v-model="callTime"
                                                                        placeholder="15:00"
                                                                        v-mask="'##:##'"
                                                                        outlined
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="4" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">ผู้บันทึกข้อมูล*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="8">
                                                                    <v-select
                                                                        v-model="formAdd.empSelect"
                                                                        :items="empSelectStepAdd"
                                                                        placeholder="เกวลิน  ทรัพทย์มาก"
                                                                        outlined
                                                                        offset-y
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                        :menu-props="{
                                                                            bottom: true,
                                                                            offsetY: true,
                                                                            }"
                                                                    ></v-select>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="12" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">หมายเหตุ*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="12">
                                                                    <v-textarea
                                                                        outlined
                                                                        name="input-7-4"
                                                                        v-model="formAdd.remark"
                                                                        placeholder="ห่างไกลแต่ไม่ห่างกันด้วยแอพเพื่อการสื่อสารแบบครบวงจรของเราที่ใช้งานได้ฟรี* ครบครันด้วยฟีเจอร์ส่งข้อความตัวอักษร ข้อความเสียง วิดีโอคอล ..."
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                    ></v-textarea>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card>
                                                    <v-row class="mx-auto">
                                                        <v-col class="text-center">
                                                            <v-btn x-large color="#14AE5C" style="width: 681px; height: 67px;" @click="validate(), addData() "><h2>บันทึก</h2></v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-form>
                                                </v-col>
                                            </v-row>
                                            <v-row v-if="!param">
                                                <v-col>
                                                    <v-form ref="form_update" v-model="valid_update" lazy-validation>
                                                    <v-card style="width: 681px;height: 542px;background: #FFFFFF;box-shadow: 1.5px 2.6px 10px rgba(119, 119, 119, 0.1);" class="mx-auto">
                                                        <!-- {{formUpdate}} -->
                                                        <v-container>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="4" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">วันที่*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="8">
                                                                    <v-text-field
                                                                        v-model="formUpdate.callDate"
                                                                        placeholder="callDate"
                                                                        outlined
                                                                        v-mask="'####-##-##'"
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="4" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">เวลา*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="8">
                                                                    <v-text-field
                                                                        v-model="formUpdate.callTime"
                                                                        placeholder="15:00"
                                                                        v-mask="'##:##'"
                                                                        outlined
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                    ></v-text-field>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="4" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">ผู้บันทึกข้อมูล*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="8">
                                                                    <v-select
                                                                        v-model="formUpdate.empSelect"
                                                                        :items="empSelectStepAdd"
                                                                        item-text="text"
                                                                        placeholder="เกวลิน  ทรัพทย์มาก"
                                                                        outlined
                                                                        :menu-props="{
                                                                            bottom: true,
                                                                            offsetY: true,
                                                                            }"
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                    ></v-select>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row style="padding: 10px 15px 0px 15px; height: 85px;">
                                                                <v-col cols="12" style="padding: 0px 15px">
                                                                    <v-subheader class="subheader">หมายเหตุ*</v-subheader>
                                                                </v-col>
                                                                <v-col cols="12">
                                                                    <v-textarea
                                                                        outlined
                                                                        name="input-7-4"
                                                                        v-model="formUpdate.remark"
                                                                        placeholder="ห่างไกลแต่ไม่ห่างกันด้วยแอพเพื่อการสื่อสารแบบครบวงจรของเราที่ใช้งานได้ฟรี* ครบครันด้วยฟีเจอร์ส่งข้อความตัวอักษร ข้อความเสียง วิดีโอคอล ..."
                                                                        :rules="[v => !!v || 'กรุณากรอกข้อมูล']"
                                                                    ></v-textarea>
                                                                </v-col>
                                                            </v-row>
                                                        </v-container>
                                                    </v-card>
                                                    <v-row class="mx-auto" v-if="!param">
                                                        <v-col class="text-center">
                                                             <v-btn x-large color="#14AE5C" style="width: 681px; height: 67px;" @click="editData()"><h2>แก้ไข</h2></v-btn>
                                                        </v-col>
                                                    </v-row>
                                                    </v-form>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-tab-item>
                                    <v-tab-item value='tab-2' transition="fade-transition">
                                    <v-container fluid>
                                        <v-row>
                                            <v-col>
                                                <v-data-table
                                                    :headers="columns"
                                                    :items="dataItem"
                                                    hide-default-footer
                                                    class="elevation-1"
                                                >
                                                <template v-slot:[`item.action`]="{ item }">
                                                    <v-btn
                                                    color="success"
                                                    dark
                                                    fab
                                                    small
                                                    @click.stop="getDataById(item),getEmpSelectAdd(), (param = false),(tab = 'tab-1'), validate('UPDATE')"
                                                    >
                                                    <v-icon dark> mdi-pencil-box-outline </v-icon>
                                                    </v-btn>
                                                    <v-btn
                                                    color="red"
                                                    dark
                                                    fab
                                                    small
                                                    @click.stop="(dialogDelete = true), getDataById(item)"
                                                    >
                                                    <v-icon> mdi-delete </v-icon>
                                                    </v-btn>
                                                </template>
                                                </v-data-table>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    </v-tab-item>
                                </v-tabs>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-main>
        <v-dialog v-model="dialogDelete" persistent max-width="50%">
            <v-card>
              <v-card-title>
                <span class="headline">ลบข้อมูลนี้</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="ชื่อบทความ"
                        v-model="formUpdate.blogName"
                        outlined
                        dense
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="formUpdate.blogExpiryDate"
                        label="วันหมดอายุ"
                        dense
                        outlined
                        required
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  x-large
                  class="btn-color"
                  dark
                  @click="dialogDelete = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  dark
                  x-large
                  color="red darken-1"
                  @click="deleteData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </div>
  </template>
<script>
import axios from 'axios'
import VuetifyLogo from '../logo'
import moment from 'moment' // แปลง date
export default {
  components: {
    VuetifyLogo,
    moment
  },
  beforeCreate () {
    this.$liff.init({ liffId: this.$liff_id_login }, function (data) {})
  },
  data () {
    return {
      path: '/callLog/',
      returnLink: '/Master/CallLog',
      session: this.$session.getAll(),
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      formAdd: {
        bookNo: 'BK598132041662359939813',
        callDateTime: '',
        remark: '',
        empSelect: '',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: '',
        LAST_USER: ''
      },
      formUpdate: {
        id: '',
        bookNo: '',
        callDateTime: '',
        callDate: '',
        callTime: '',
        remark: '',
        empSelect: '',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: '',
        LAST_USER: ''
      },
      callDate: moment().format('YYYY-MM-D'),
      callTime: ('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2),
      validAdd: true,
      validUpdate: true,
      empSelectStepAdd: [],
      columns: [
        { text: 'วันที่โทร', value: 'callDate' },
        { text: 'เวลา', value: 'callTime' },
        { text: 'หมายเหตุ', value: 'remark' },
        { text: 'ผู้บันทึกข้อมูล', value: 'empFull_NameTH' },
        { text: '', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      searchAll2: '',
      dialogDelete: false,
      dialogHistoryCall: false,
      toggle: true,
      tab: 'tab-1',
      param: true,
      modelCallDate: '',
      valid: true
    }
  },
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
    this.getEmpSelectAdd()
  },
  methods: {
    validate (Action) {
      switch (Action) {
        case 'ADD':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_add.validate()
          })
          break
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
    reset () {
      this.$refs.form_add.reset()
    },
    async getDataById (item) {
      this.dataReady = false
      this.getDataByIdGlobal(this.DNS_IP, this.path, 'id', item.id)
    },
    async getEmpSelectAdd () {
      this.empSelectStepAdd = []
      await axios
        .get(this.DNS_IP + '/empSelect/getUse?privacyPage=booking&shopId=' + this.$session.getAll().data.shopId)
        .then(async response => {
          let rs = response.data
          console.log(rs)
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFull_NameTH
              s.value = d.empId.toString()
              this.empSelectStepAdd.push(s)
            }
          }
          console.log(this.empSelectStepAdd)
          if (this.$session.getAll().data.userId) {
            this.formAdd.empSelect = this.empSelectStepAdd.filter(el => { return el.value === this.$session.getAll().data.userId })[0].value
            console.log(this.formAdd.empSelect.value)
          }
        })
      console.log(this.empSelectStepAdd)
    },
    getDateTime () {
      this.callDate = moment().format('YYYY-MM-D')
      this.callTime = ('0' + new Date().getHours()).slice(-2) + ':' + ('0' + new Date().getMinutes()).slice(-2)
    },
    addData () {
      if (this.$refs.form_add.validate('ADD')) {
        this.$swal({
          title: 'ต้องการ เพิ่มข้อมูล ใช่หรือไม่?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#b3b1ab',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ไม่'
        })
          .then(async result => {
            this.formAdd.CREATE_USER = this.session.data.userName
            this.formAdd.LAST_USER = this.session.data.userName
            this.formAdd.callDateTime = this.callDate.split(' ') + ' ' + this.callTime
            await axios
              .post(
                this.DNS_IP + this.path + 'add',
                this.formAdd
              )
              .then(async response => {
                // console.log('addDataGlobal DNS_IP + PATH + "add"', response)
                this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
                await this.clearDataAdd()
                await this.getDataGlobal(
                  this.DNS_IP,
                  this.path,
                  this.session.data.shopId,
                  this.returnLink
                )
                this.tab = 'tab-2'
              })
              .catch(error => {
                console.log('error function addDataGlobal : ', error)
                this.$router.push(
                  '/system/Errorpage?returnLink=' + this.returnLink
                )
                this.dataReady = true
              })
          })
      }
    },
    editData () {
      if (this.$refs.form_update.validate('UPDATE')) {
        this.$swal({
          title: 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#b3b1ab',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ไม่'
        })
          .then(async result => {
            this.formUpdate.LAST_USER = this.session.data.userName
            this.formUpdate.callDateTime = this.formUpdate.callDate + ' ' + this.formUpdate.callTime.split(' ')[0]
            var ID = this.formUpdate.id
            delete this.formUpdate['id']
            delete this.formUpdate['callDate']
            delete this.formUpdate['callTime']
            await axios
              .post(
                this.DNS_IP + this.path + 'edit/' + ID,
                this.formUpdate
              )
              .then(async response => {
                // console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
                this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
                await this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
                this.tab = 'tab-2'
                this.param = true
                this.clearDataUpdate()
              })
              .catch(error => {
                this.dataReady = true
                console.log('error function editDataGlobal : ', error)
                this.$router.push(
                  '/system/Errorpage?returnLink=' + this.returnLink
                )
              })
          })
          .catch(error => {
            this.dataReady = true
            console.log('error function editDataGlobal : ', error)
          })
      }
    },
    async deleteData () {
      this.formUpdate.LAST_USER = this.session.data.userName
      console.log('DELETE PK : ', this.formUpdate.id)
      this.dataReady = false
      await this.deleteDataGlobal(
        this.DNS_IP,
        this.path,
        this.formUpdate.id,
        this.session.data.shopId,
        '',
        this.returnLink
      )
    },
    clearDataAdd () {
      this.formAdd.bookNo = 'BK598132041662359939813'
      this.formAdd.callDateTime = ''
      this.formAdd.remark = ''
      this.formAdd.empSelect = ''
      this.formAdd.shopId = ''
      this.formAdd.CREATE_USER = ''
      this.formAdd.LAST_USER = ''
      this.callDate = ''
      this.callTime = ''
    },
    clearDataUpdate () {
      this.formUpdate.id = ''
      this.formUpdate.bookNo = ''
      this.formUpdate.callDateTime = ''
      this.formUpdate.remark = ''
      this.formUpdate.empSelect = ''
      this.formUpdate.shopId = ''
      this.formUpdate.CREATE_USER = ''
      this.formUpdate.LAST_USER = ''
    },
    clear () {
      this.formAdd.bookNo = ''
      this.formAdd.callDateTime = ''
      this.formAdd.remark = ''
      this.formAdd.empSelect = ''
      this.formAdd.shopId = ''
      this.formAdd.CREATE_USER = ''
      this.formAdd.LAST_USER = ''
      this.callDate = ''
      this.callTime = new Date().getHours() + ':' + new Date().getMinutes()
      this.formUpdate.id = ''
      this.formUpdate.bookNo = ''
      this.formUpdate.callDateTime = ''
      this.formUpdate.remark = ''
      this.formUpdate.empSelect = ''
      this.formUpdate.shopId = ''
      this.formUpdate.CREATE_USER = ''
      this.formUpdate.LAST_USER = ''
    }
  }
}
</script>
  <style scoped>
    .button5 {
background-color: #DADADA !important;
  border: none;
  /* padding: 20px !important; */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 1px 2px;
  cursor: pointer;
  height: 60% !important;
  width: 36px !important;
  border-radius: 50%;
}
.v-btn:not(.v-btn--round).v-size--default {
    height: 36px;
    min-width: 40px;
    padding: 0 16px;
}
h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 34px !important;
    line-height: 51px;
    color: #202020;
}
h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 30px !important;
    line-height: 24px;
    color: #FFFFFF;

}
h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 22px !important;
    line-height: 30px;
    color: #161616;

}
.subheader {
    font-weight: 400;
    font-size: 20px;
    line-height: 54px;
    display: flex;
    align-items: center;
    color: #464A53;
    padding-top: 20px;
}
v-data-table-header {
  background-color: #FFFFFF !important;
}
.v-dialog {
    overflow-y: hidden !important;
    overflow-x: hidden !important;
}
.v-application a {
    /* position: absolute; */
    color:#464255 !important;
}
.v-tabs-slider {
    height: 0%;
    width: 100%;
    background-color: #BDE3FF !important;
}
.v-tab--active {
    color: inherit;
    background-color: #BDE3FF !important;
}
.v-tab:before, .v-tabs-slider {
    background-color: #BDE3FF !important;
}
a.v-tab {
    text-decoration: none;
}
  </style>
