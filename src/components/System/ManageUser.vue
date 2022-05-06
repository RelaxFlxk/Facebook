<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-5">
        <v-row>
          <v-col cols="6">
            <v-breadcrumbs
              class="pl-0 pb-10"
              :items="breadcrumbs"
              divider=">"
            ></v-breadcrumbs>
          </v-col>
          <v-col cols="6" align="right">
            <v-btn
              class="mt-6 mr-10"
              color="primary"
              style="z-index: 8"
              id="v-step-0"
              depressed
              @click="(dialogAdd = true)"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่มรหัสผู้ใช้งาน
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialogAdd" persistent max-width="70%">
        <v-card class="text-center">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-text>
              <v-container>
                <v-col class="text-right pa-0">
                  <v-btn
                    small
                    color="#E0E0E0"
                    @click="(dialogAdd = false), clearDataAdd()"
                  >
                    <v-icon color="#173053">mdi-close</v-icon>
                  </v-btn>
                </v-col>
                <v-row justify="center">
                  <v-col cols="5" class="text-center" style="margin: auto 0">
                    <v-col class="text-center">
                      <v-img
                        class="v-margit_img_reward"
                        :src="require('@/assets/AddBookingList.svg')"
                        max-width="470.37"
                        max-height="247"
                      ></v-img>
                    </v-col>
                  </v-col>

                  <v-col cols="6" class="v-margit_text_add mt-0 pa-0">
                    <v-col class="text-center pa-3 ml-2">
                      <v-img
                        class="v_text_add"
                        :src="require('@/assets/Grouptitle.svg')"
                      ></v-img>
                    </v-col>
                    <v-row>
                    <v-col cols="6" class="pb-0 pt-0">
                      <v-text-field
                        clearable
                        v-model="name"
                        label="ชื่อ-นามสกุล"
                        required
                        :rules="empSelectAdd === '' || empSelectAdd === null ? nameRules : [true]"
                        :disabled="empSelectAdd === '' || empSelectAdd === null ? false : true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pb-0 pt-0">
                      <v-select
                        required
                        :rules="name === '' || name === null ? nameRules : [true]"
                        :disabled="name === '' || name === null ? false : true"
                        v-model="empSelectAdd"
                        :items="empItem"
                        label="พนักงาน"
                        menu-props="auto"
                        item-text="text"
                        item-value="value"
                        return-object
                        clearable
                      ></v-select>
                    </v-col>
                    </v-row>
                    <v-row v-if="empSelectAdd || '' !== ''">
                      <v-col cols="12" class="pb-0 pt-0">
                        <v-select
                          v-model="USER_ROLE"
                          :items="USER_ROLEitem"
                          label="สิทธิการใช้งาน"
                          dense
                          required
                          :rules="emptyRules"
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="12" class="pt-0">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label=" Email (Username)"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :rules="passRules"
                        label="password"
                        required
                      ></v-text-field>
                    </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-btn
                    class="mt-3"
                    elevation="2"
                    large
                    color="success"
                    :disabled="!valid"
                    @click="addData()"
                  >
                    <v-icon left>mdi-checkbox-marked-circle</v-icon>
                    เพิ่ม
                  </v-btn>
                </div>
              </v-container>
            </v-card-text>
          </v-form>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogEdit" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">แก้ไขข้อมูล</span>
              </v-card-title>
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" class="pb-0 pt-0">
                      <v-text-field
                        clearable
                        v-model="formUpdate.userFirst_NameTH"
                        label="ชื่อ-นามสกุล"
                        required
                        :rules="empSelectEdit === '' || empSelectEdit === null ? nameRules : [true]"
                        :disabled="empSelectEdit === '' || empSelectEdit === null ? false : true"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" class="pb-0 pt-0" v-if="formUpdate.USER_ROLE !== 'admin'">
                      <v-select
                        required
                        :rules="formUpdate.userFirst_NameTH === '' || formUpdate.userFirst_NameTH === null ? nameRules : [true]"
                        :disabled="formUpdate.userFirst_NameTH === '' || formUpdate.userFirst_NameTH === null ? false : true"
                        v-model="empSelectEdit"
                        :items="empItemEdit"
                        label="พนักงาน"
                        menu-props="auto"
                        item-text="text"
                        item-value="value"
                        return-object
                        clearable
                      ></v-select>
                    </v-col>
                    </v-row>
                  <v-row>
                      <v-col cols="4">
                      <v-text-field
                        label="Username"
                        v-model="formUpdate.userName"
                        required
                        :rules="emailRules"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Password"
                        v-model="formUpdate.userPassword"
                        required
                        :rules="passRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4" v-if="empSelectEdit || '' !== ''">
                        <v-select
                          v-model="USER_ROLE"
                          :items="USER_ROLEitem"
                          label="สิทธิการใช้งาน"
                          required
                          :rules="emptyRules"
                        ></v-select>
                      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  x-large
                  color="blue darken-1"
                  text
                  @click="dialogEdit = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
                  color="success"
                  text
                  :disabled="!validUpdate"
                  @click="editData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  แก้ไข
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      <div>
        <!-- <v-card class="pa-3" width="50%" style="margin: 0 auto">
          <v-form ref="form" v-model="valid" lazy-validation>
            <h4 style="margin: 15px">
            </h4>
            <v-text-field
              v-model="name"
              label="ชื่อ"
              outlined
              clearable
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="นามสกุล"
              outlined
            clearable
            ></v-text-field>
          </v-form>
        </v-card> -->
        <v-card class="pa-3" width="100%" style="margin: 0 auto">
          <v-data-table
            :headers="columns"
            :items="dataItem"
            :items-per-page="10"
          >
            <template v-slot:[`item.CREATE_DATE`]="{ item }">
              {{ format_dateFUllTime(item.CREATE_DATE) }}
            </template>
            <template v-slot:[`item.LAST_DATE`]="{ item }">
              {{ format_dateFUllTime(item.LAST_DATE) }}
            </template>
            <template v-slot:[`item.action`]="{ item }">
               <v-btn
                      v-if="item.USER_ROLE === 'user' || item.USER_ROLE === 'onsite'"
                      color="red"
                      dark
                      fab
                      small
                      @click="deleteData(item)"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
              <v-btn
                      color="blue"
                      fab
                      small
                      dark
                      @click.stop="(dialogEdit = true), getDataById(item)"
                    >
                      <v-icon> mdi-tools </v-icon>
                    </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios'
import adminLeftMenu from '../Sidebar.vue' // เมนู
import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
import XLSX from 'xlsx' // import xlsx
import readXlsxFile from 'read-excel-file'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    downloadExcel: JsonExcel,
    XLSX,
    readXlsxFile
  },
  created () {
    setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      PK: '',
      path: '/system_user/', // Path Model
      returnLink: '/system/EditShop',
      dataReady: true,
      dateTime: '', // Generate DateTime
      date: this.momenDate_1(new Date()),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      code: 'SYS_GROUP_TYPE_', // Generate Code
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogImport: false,
      // END Dialog Config ADD EDIT DELETE
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      ZIP_CD: '',
      optionSubDistrict: [],
      optionDistrict: [],
      optionProvince: [],
      formUpdate: {},
      filesShop: null,
      empItem: [],
      empItemEdit: [],
      empSelectAdd: '',
      empSelectEdit: '',
      formUpdateItem: {
        userTypeGroupCode: '',
        userTypeGroupName: '',
        CAN_VIEW: '',
        CAN_ADD: '',
        CAN_UPDATE: '',
        CAN_DELETE: '',
        CAN_IMPORT: '',
        CAN_EXPORT: ''
      },
      valid: false,
      validUpdate: false,
      name: '',
      lastName: '',
      password: '',
      USER_ROLE: '',
      USER_ROLEitem: [
        // { text: 'Admin', value: 'admin' },
        // { text: 'User', value: 'user' },
        { text: 'Onsite', value: 'onsite' },
        { text: 'Board', value: 'board' }
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      emptyRules: [
        v => !!v || 'required'
      ],
      passRules: [
        v => !!v || 'Password is required'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      // End Form Config ADD EDIT
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'จัดการ รหัสผู้ใช้งาน',
          disabled: true,
          href: '/System/ManageUser'
        }
      ],
      // End Menu Config
      // Data Table Config
      columns: [
        { text: 'Username', value: 'userName' },
        { text: 'Password', value: 'userPassword' },
        { text: 'สิทธิใช้งาน', value: 'USER_ROLE' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: []
      // End Data Table Config
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    // this.getDataTypeGroup()
    this.dataReady = false
    // Get Data
    await this.getData(this.DNS_IP, this.path, this.session.data.shopId)
  },
  methods: {
    async getData (DNS_IP, PATH, shopId) {
      // Clear Data ทุกครั้ง
      this.dataItem = []
      // Clear ช่องค้นหา
      this.searchAll = ''

      await axios
        .get(
          // eslint-disable-next-line quotes
          DNS_IP + PATH + "get?shopId=" + shopId
        )
        .then(async (response) => {
          // var dateObj = new Date(response.data.CREATE_DATE)
          // var momentObj = moment(dateObj)
          // response.data.CREATE_DATE = momentObj.format('YYYY-MM-DD')
          console.log('getData', response.data)
          this.getEmpSelect()
          this.dataReady = true
          this.dataItem = response.data
          if (this.dataItem.length === 0 || this.dataItem.status === false) {
            this.dataItem = []
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log(error)
          this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          this.dataReady = true
        })
    },
    async getEmpSelect () {
      console.log('dataItem', this.dataItem)
      this.empItem = []
      await axios
        .get(this.DNS_IP + '/empSelect/getUse?shopId=' + this.session.data.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              if (this.dataItem.filter(el => { return parseInt(el.empId) === d.empId }).length === 0) {
                d.text = d.empFull_NameTH
                d.value = d.empId
                this.empItem.push(d)
              }
            }
          }
        })
    },
    async getEmpSelectEdit () {
      this.empItemEdit = []
      await axios
        .get(this.DNS_IP + '/empSelect/getUse?shopId=' + this.session.data.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.empFull_NameTH
              d.value = d.empId
              this.empItemEdit.push(d)
            }
          }
        })
    },
    async addData () {
      console.log('this.empSelectAdd', this.empSelectAdd)
      this.$refs.form.validate()
      if (this.$refs.form.validate() === false) {
        console.log('false', this.session.data.shopId)
      } else {
        axios
          .get(this.DNS_IP + '/system_user/get?userName=' + this.email + '&shopId=' + this.session.data.shopId)
          .then(response1 => {
            let data = []
            if (this.empSelectAdd === '' || this.empSelectAdd === null) {
              data = [{
                'userCode': 'SYS_USER_' + (new Date()).getTime(),
                'userName': this.email,
                'userFirst_NameTH': this.name,
                'userPassword': this.password,
                'USER_ROLE': 'user',
                'CREATE_USER': this.session.data.userName,
                'LAST_USER': this.session.data.userName,
                'shopId': this.session.data.shopId
              }]
            } else {
              data = [{
                'userCode': 'SYS_USER_' + (new Date()).getTime(),
                'userName': this.email,
                'userFirst_NameTH': this.empSelectAdd.text,
                'userPassword': this.password,
                'USER_ROLE': this.USER_ROLE,
                'empId': this.empSelectAdd.value,
                'CREATE_USER': this.session.data.userName,
                'LAST_USER': this.session.data.userName,
                'shopId': this.session.data.shopId
              }]
            }
            if (response1.data.status === false) {
              console.log(data)
              this.$swal({
                title: 'ต้องการ บันทึกข้อมูล ใช่หรือไม่?',
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#b3b1ab',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่'
              }).then(async result => {
                axios
                  .post(this.DNS_IP + `/admin_register_user/?userName=${this.session.data.userName}&shopId=${this.session.data.shopId}`, ...data)
                  .then(response => {
                    if (response.data.status) {
                      this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
                      this.clearDataAdd()
                      this.dialogAdd = false
                      this.getData(this.DNS_IP, this.path, this.session.data.shopId)
                      console.log('addDataGlobal DNS_IP + /job/add', response)
                    } else {
                      this.$swal('ผิดพลาด', 'สิทธิการใช้งานไม่สามารถ สร้างรหัสผู้ใช้ได้', 'error')
                      this.clearDataAdd()
                      this.dialogAdd = false
                      this.getData(this.DNS_IP, this.path, this.session.data.shopId)
                    }
                  })
                  .catch(error => {
                    console.log('error function addData : ', error)
                  })
              })
                .catch(error => {
                  console.log('Cencel : ', error)
                })
            } else {
              this.$swal('ผิดพลาด', 'อีเมลของท่าน มีอยู่ในระบบแล้ว กรุณากรอกอีเมลใหม่', 'error')
              this.dataReady = true
            }
          })
      }
    },
    clearDataAdd () {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    },
    deleteData (item) {
      console.log('test', item)
      this.$swal({
        title: `ต้องการ ลบข้อมูล ${item.userName} ใช่หรือไม่?`,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#fa0202',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        this.formUpdate.LAST_USER = this.$session.getAll().data.userName
        await axios
          .post(
            // eslint-disable-next-line quotes
            this.DNS_IP + "/system_user/delete/" + item.userId, item
          )
          .then(async response => {
            // Debug response
            console.log('DNS_IP + PATH + "delete/"', response)
            console.log('status', status)

            this.$swal('เรียบร้อย', 'ลบข้อมูลเรียบร้อย', 'success')
            this.getData(this.DNS_IP, this.path, this.session.data.shopId)
            // Close Dialog
            this.dialogDelete = false
          })
      })
    },
    async getDataById (item) {
      console.log('item', item)
      await this.getEmpSelectEdit()
      this.formUpdate = item
      this.USER_ROLE = item.USER_ROLE || ''
      if (this.USER_ROLE === 'user' || this.USER_ROLE === 'admin') {
        this.USER_ROLE = ''
      }
      if (item.empId === '' || item.empId === null) {
        this.formUpdate.userFirst_NameTH = item.userFirst_NameTH
        this.empSelectEdit = ''
      } else {
        this.formUpdate.userFirst_NameTH = ''
        this.empSelectEdit = this.empItemEdit.filter(el => { return el.value === parseInt(item.empId) })[0] || ''
      }
      console.log('dff', this.formUpdate)
      console.log('empSelectEdit', this.empSelectEdit)
    },
    editData () {
      console.log('this.$refs.form_update.validate()', this.$refs.form_update.validate())
      this.$refs.form_update.validate()
      if (this.$refs.form_update.validate() === false) {
        console.log('false', this.session.data.shopId)
      } else {
        this.$swal({
          title: `ต้องการ แก้ไขข้อมูล ใช่หรือไม่?`,
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#0c86b3',
          cancelButtonColor: '#b3b1ab',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ไม่'
        }).then(async result => {
          let data = []
          if (this.formUpdate.USER_ROLE === 'admin') {
            data = [{
              'userName': this.formUpdate.userName,
              'userFirst_NameTH': this.formUpdate.userFirst_NameTH,
              'userPassword': this.formUpdate.userPassword,
              'USER_ROLE': 'admin',
              'empId': '',
              'LAST_USER': this.session.data.userName
            }]
          } else {
            if (this.empSelectEdit === '' || this.empSelectEdit === null) {
              data = [{
                'userName': this.formUpdate.userName,
                'userFirst_NameTH': this.formUpdate.userFirst_NameTH,
                'userPassword': this.formUpdate.userPassword,
                'USER_ROLE': 'user',
                'empId': '',
                'LAST_USER': this.session.data.userName
              }]
            } else {
              data = [{
                'userName': this.formUpdate.userName,
                'userFirst_NameTH': this.formUpdate.userFirst_NameTH,
                'userPassword': this.formUpdate.userPassword,
                'USER_ROLE': this.USER_ROLE,
                'LAST_USER': this.session.data.userName,
                'empId': this.empSelectEdit.value
              }]
            }
          }
          console.log('dd', data)

          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/system_user/edit/" + this.formUpdate.userId, ...data
            )
            .then(async response => {
              this.$swal('เรียบร้อย', 'แก้ไขข้อมูลเรียบร้อย', 'success')
              this.getData(this.DNS_IP, this.path, this.session.data.shopId)
              // Close Dialog
              this.dialogEdit = false
            })
        })
      }
    }
  }
}
</script>
<style scope>
.v-text-field{
  padding: 10px;
}
</style>
