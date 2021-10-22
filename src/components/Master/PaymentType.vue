<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <v-row>

          <!-- Dialog export / import -->
          <v-col cols="12">
            <v-btn color="primary" depressed @click="dialogAdd = true">
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
            </v-btn>
          </v-col>

          <!-- ADD -->
          <v-dialog v-model="dialogAdd" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">เพิ่มข้อมูล</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-container fluid>
                      <v-textarea
                         rows="3" row-height="25"
                         label="ประเภทการชำระเงิน"
                        v-model="formAdd.payTypeName"
                      ></v-textarea>
                    </v-container>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  x-large
                  color="dark darken-1"
                  text
                  @click="dialogAdd = false,clearData()"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
                  color="success"
                  text
                  @click="addData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  เพิ่ม
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- edit -->
          <v-dialog v-model="dialogEdit" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">แก้ไขข้อมูล</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        label="รหัส ประเภทการชำระเงิน*"
                        v-model="formUpdate.payTypeCode"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"

                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-container fluid>
                      <v-textarea
                         rows="3" row-height="25"
                         label="ประเภทการชำระเงิน"
                        v-model="formUpdate.payTypeName"
                      ></v-textarea>
                    </v-container>
                  </v-row>
                </v-container>
              </v-card-text>
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
                  @click="editData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  แก้ไข
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end edit -->

          <!-- delete -->
          <v-dialog v-model="dialogDelete" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">ลบข้อมูลนี้</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                   <v-container fluid>
                      <v-textarea
                         rows="3" row-height="25"
                         label="ประเภทการชำระเงิน"
                        v-model="formUpdate.payTypeName"
                      ></v-textarea>
                    </v-container>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  x-large
                  color="dark darken-1"
                  text
                  @click="dialogDelete = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
                  color="red darken-1"
                  text
                  @click="deleteData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end delete -->

          <!-- data table -->
         <v-col cols="12">
            <v-card elevation="7" v-if="dataReady">
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
                  :headers="columns"
                  :items="dataItem"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                   <template v-slot:[`item.CREATE_DATE`]="{ item }">
                      {{ format_date(item.CREATE_DATE) }}
                  </template>
                   <template v-slot:[`item.LAST_DATE`]="{ item }">
                      {{ format_date(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      small
                      @click.stop="(dialogEdit = true), getDataById(item)"
                    >
                      <v-icon dark> mdi-tools </v-icon>
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
              </v-card-text>
            </v-card>
            <div v-if="!dataReady" class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-col>
          <!-- end data table -->
        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
import XLSX from 'xlsx' // import xlsx
import readXlsxFile from 'read-excel-file'
// import moment from 'moment' // แปลง date

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
      path: '/master_payment/', // Path Model
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'Payment',
          disabled: false,
          href: '/Master/PaymentType'
        }
      ],
      // End Menu Config
      dataReady: true,
      dateTime: '', // Generate DateTime
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      code: 'PAY_', // Generate Code
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogImport: false,
      // END Dialog Config ADD EDIT DELETE
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      // Search All
      searchAll: '',
      searchAll2: '',
      formAdd: {
        payTypeCode: '',
        payTypeName: '',
        shopId: 'MS2021101348536490'
      },
      formUpdate: {
        payTypeCode: '',
        payTypeName: ''
      },
      formUpdateItem: {
        payTypeCode: '',
        payTypeName: ''
      },
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 50 || 'Name must be less than 50 characters'
      ],
      nameSelect: [
        (v) => !!v || 'select is required',
        (v) => v.length > 1 || 'Please select'
      ],
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        { text: 'ID', value: 'payTypeId' },
        { text: 'รหัส', value: 'payTypeCode' },
        { text: 'ประเภทการชำระเงิน', value: 'payTypeName' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'ผู้สร้าง', value: 'CREATE_USER' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      // End Data Table Config
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ]
    }
  },
  async mounted () {
    this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    this.getDataGlobal(this.DNS_IP, this.path)
  },
  methods: {
    async getDataById (item) {
      //
      //
      // สำหรับ เรียกข้อมูล ใส่ form Update / Delete
      //
      //
      // Get ID /main.js
      this.dataReady = false
      this.getDataByIdGlobal(this.DNS_IP, this.path, 'payTypeId', item.payTypeId)
    },
    async addData () {
      //
      //
      // สำหรับ เพิ่มข้อมูล
      // ต้องระบุ Create / Last User ว่าใครเป็นคนสร้าง
      //
      this.formAdd.CREATE_USER = this.$session.getAll().data.userName
      this.formAdd.LAST_USER = this.$session.getAll().data.userName

      console.log('form', JSON.stringify(this.formAdd))

      this.formAdd.payTypeCode = this.code + this.generateCodeGlobal()

      this.dataReady = false
      this.submitAdd()
    },
    async submitAdd () {
      this.dataReady = false

      this.$swal({
        title: 'ต้องการ เพิ่มข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + this.path + "add",
              this.formAdd,
              {
                headers: {
                  'Application-Key': this.$session.getAll().ApplicationKey
                }
              }
            )
            .then(async (response) => {
              // Debug response
              console.log('addDataGlobal DNS_IP + PATH + "add"', response)

              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogAdd = false

              // Load Data
              await this.clearData()
              await this.getDataGlobal(this.DNS_IP, this.path)
            })
          // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              console.log('error function addDataGlobal : ', error)
              this.dataReady = true
            })
        })
        .catch((error) => {
          console.log('error function addData : ', error)
          this.dataReady = true
        })
    },
    async editData () {
      // Config User ทำรายการล่าสุด
      this.formUpdateItem.LAST_USER = this.$session.getAll().data.userName
      // End Config User ทำรายการล่าสุด

      for (var key in this.formUpdateItem) {
        for (var key2 in this.formUpdate) {
          if (key === key2) {
            this.formUpdateItem[key] = this.formUpdate[key2]
          }
        }
      }
      console.log('this.formUpdateItem', this.formUpdateItem)

      // Debug
      console.log('EDIT PK : ', this.PK)
      console.log('formUpdateItem', JSON.stringify(this.formUpdateItem))
      // End Debug
      // สำหรับ แก้ไขข้อมูล
      // ต้องระบุ  Last User ว่าใครเป็นคนแก้ไขล่าสุด
      //
      this.dataReady = false
      await this.editDataGlobal(
        this.DNS_IP,
        this.path,
        this.PK,
        this.formUpdateItem
      )
      this.dataReady = false
      this.submitEdit(this.DNS_IP, this.path, this.PK, this.formUpdateItem)
    },
    async submitEdit (DNS_IP, PATH, ID, DT) {
      // this.editDataGlobal(this.DNS_IP, this.path, this.PK, this.formUpdateItem)
      this.dataReady = false

      this.$swal({
        title: 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          await axios
            .post(
              // eslint-disable-next-line quotes
              DNS_IP + PATH + "edit/" + ID,
              DT,
              {
                headers: {
                  'Application-Key': this.$session.getAll().ApplicationKey
                }
              }
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)

              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogEdit = false

              // Load Data
              await this.getDataGlobal(DNS_IP, PATH)
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
    async deleteData () {
      console.log('DELETE PK : ', this.PK)
      //
      //
      // สำหรับ ลบข้อมูล
      // ต้องระบุ  Last User ว่าใครเป็นคนลบล่าสุด
      //
      this.formUpdate.LAST_USER = this.$session.getAll().data.userName
      this.dataReady = false
      this.deleteDataGlobal(this.DNS_IP, this.path, this.PK)
    },
    async clearData () {
      this.getDataCompany()
      // eslint-disable-next-line no-redeclare
      for (var key in this.formAdd) {
        if (this.formAdd[key]) {
          this.formAdd[key] = ''
        }
      }
    }
  }
}
</script>
<style scope>
</style>
