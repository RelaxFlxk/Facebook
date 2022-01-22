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
              Add User
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
                    <v-col cols="12">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="ชื่อ-นามสกุล"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label=" Email"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :rules="nameRules"
                        label="password"
                        required
                      ></v-text-field>
                       <v-text-field
                        v-model="email"
                        label="User Name"
                        disabled
                        required
                      ></v-text-field>
                       <v-text-field
                        v-model="password"
                        label="Password"
                        disabled
                        required
                      ></v-text-field>
                    </v-col>
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
                      <v-col cols="4">
                      <v-text-field
                        label="user Name"
                        v-model="formUpdate.userName"
                        required
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="password"
                        v-model="formUpdate.userPassword"
                        required
                        :rules="nameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="Name"
                        v-model="formUpdate.userFirst_NameTH"
                        required
                        :rules="nameRules"
                      ></v-text-field>
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
                      v-if="item.USER_ROLE === 'user'"
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
      nameRules: [
        v => !!v || 'Name is required'
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
          text: 'จัดการUser',
          disabled: true,
          href: '/System/ManageUser'
        }
      ],
      // End Menu Config
      // Data Table Config
      columns: [
        { text: 'userCode', value: 'userCode' },
        // { text: 'ID', value: 'shopId' },
        { text: 'userName', value: 'userName' },
        { text: 'userPassword', value: 'userPassword' },
        { text: 'USER_ROLE', value: 'USER_ROLE' },
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
    this.getDataGlobal(this.DNS_IP, this.path, this.session.data.shopId)
    console.log(this.dataItem + this.path + this.session.data.shopId)
  },
  methods: {
    async addData () {
      this.$refs.form.validate()
      if (this.$refs.form.validate() === false) {
        console.log('false', this.session.data.shopId)
      } else {
        axios
          .get(this.DNS_IP + '/system_user/get?userName=' + this.email)
          .then(response1 => {
            console.log('status', response1.data.status)
            if (response1.data.status === false) {
              let data = [{
                'userCode': 'SYS_USER_' + (new Date()).getTime(),
                'userName': this.email,
                'userFirst_NameTH': this.name,
                'userPassword': this.password,
                'USER_ROLE': 'user',
                'CREATE_USER': 'admin',
                'LAST_USER': 'admin',
                'shopId': this.session.data.shopId
              }]
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
                    this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
                    this.clearDataAdd()
                    this.dialogAdd = false
                    this.getDataGlobal(this.DNS_IP, this.path, this.session.data.shopId)
                    console.log('addDataGlobal DNS_IP + /job/add', response)
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
            this.getDataGlobal(this.DNS_IP, this.path, this.session.data.shopId)
            // Close Dialog
            this.dialogDelete = false
          })
      })
    },
    getDataById (item) {
      this.formUpdate = item
      console.log('dff', this.formUpdate)
    },
    editData () {
      this.$refs.form_update.validate()
      if (this.$refs.form_update.validate() === false) {
        console.log('false', this.session.data.shopId)
      } else {
        axios
          .get(this.DNS_IP + '/system_user/get?userName=' + this.formUpdate.userName)
          .then(response1 => {
            console.log('status', response1.data.status)
            if (response1.data.status === false) {
              this.$swal({
                title: `ต้องการ เเก้ไขข้อมูล ใช่หรือไม่?`,
                type: 'question',
                showCancelButton: true,
                confirmButtonColor: '#fa0202',
                cancelButtonColor: '#b3b1ab',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่'
              }).then(async result => {
                let data = [{
                  'userName': this.formUpdate.userName,
                  'userFirst_NameTH': this.formUpdate.userFirst_NameTH,
                  'userPassword': this.formUpdate.userPassword
                }]
                console.log('dd', data)

                await axios
                  .post(
                  // eslint-disable-next-line quotes
                    this.DNS_IP + "/system_user/edit/" + this.formUpdate.userId, ...data
                  )
                  .then(async response => {
                    this.$swal('เรียบร้อย', 'แก้ไขข้อมูลเรียบร้อย', 'success')
                    this.getDataGlobal(this.DNS_IP, this.path, this.session.data.shopId)
                    // Close Dialog
                    this.dialogEdit = false
                  })
              })
            } else {
              this.$swal('ผิดพลาด', 'อีเมลของท่าน มีอยู่ในระบบแล้ว กรุณากรอกอีเมลใหม่', 'error')
              this.dataReady = true
            }
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
