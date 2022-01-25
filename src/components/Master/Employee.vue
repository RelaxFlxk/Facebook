<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <v-row>
          <!-- Dialog export / import -->
          <v-col cols="12">
            <v-btn color="primary" depressed @click="dialogAdd = true, validate('ADD')">
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
            </v-btn>
            <v-btn color="primary" @click="exportData()">
              <v-icon left>mdi-download</v-icon>
              Export Data
            </v-btn>
            <v-btn color="primary" depressed @click="dialogImport = true">
              <v-icon left>mdi-import</v-icon>
              Manage Data By Excel.xls
            </v-btn>
          </v-col>

          <!-- Import -->
          <v-dialog v-model="dialogImport" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">จัดการไฟล์ผ่าน excel.xls</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <input type="file" @change="importData" accept=".xls" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <template>
                        <v-data-table
                          :headers="columnsImport"
                          :items="dataItemImport"
                          :items-per-page="5"
                          class="elevation-1"
                        ></v-data-table>
                      </template>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  color="red darken-1"
                  text
                  @click="(dialogImport = false), (dataItemImport = [])"
                >
                  ปิด
                </v-btn>
                <template v-if="!dataItemImportChecKHide">
                  <v-btn
                    elevation="2"
                    color="red"
                    text
                    @click="importDataApprove('delete')"
                  >
                    ล้างข้อมูลทั้งหมดที่เลือก
                  </v-btn>
                  <v-btn
                    elevation="2"
                    color="blue darken-1"
                    text
                    @click="importDataApprove('update')"
                  >
                    ปรับปรุงข้อมูลที่ตรงกัน
                  </v-btn>
                  <v-btn
                    elevation="2"
                    color="green darken-1"
                    text
                    @click="importDataApprove('add')"
                  >
                    นำเข้าใหม่ทั้งหมด
                  </v-btn>
                </template>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end Import -->

          <!-- ADD -->
          <v-dialog v-model="dialogAdd" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">เพิ่มข้อมูล</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                   <v-form
                    ref="form_add"
                    v-model="valid_add"
                    lazy-validation
                  >
                  <v-row>
                      <v-col cols="4">
                      <v-select
                        label="คำนำหน้า*"
                        :items="itemsTitle"
                        v-model="formAdd.empTitle_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="ชื่อ*"
                        v-model="formAdd.empFirst_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="นามสกุล*"
                        v-model="formAdd.empLast_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                   </v-form>
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
                  :disabled="!valid_add"
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
                  <v-form
                    ref="form_update"
                    v-model="valid_update"
                    lazy-validation
                  >
                  <v-row>
                      <v-col cols="4">
                      <v-select
                        label="คำนำหน้า*"
                        :items="itemsTitle"
                        v-model="formUpdate.empTitle_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="ชื่อ*"
                        v-model="formUpdate.empFirst_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="นามสกุล*"
                        v-model="formUpdate.empLast_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                   </v-form>
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
                  :disabled="!valid_update"
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
                      <v-col cols="4">
                      <v-select
                        label="คำนำหน้า*"
                        :items="itemsTitle"
                        v-model="formUpdate.empTitle_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="ชื่อ*"
                        v-model="formUpdate.empFirst_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="นามสกุล*"
                        v-model="formUpdate.empLast_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
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
                      color="blue"
                      fab
                      small
                      dark
                      @click.stop="(dialogEdit = true), getDataById(item), validate('UPDATE')"
                    >
                      <v-icon> mdi-tools </v-icon>
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
      path: '/empSelect/', // Path Model
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'รายชื่อพนักงาน',
          disabled: true,
          href: '/Master/Employee'
        }
      ],
      // End Menu Config
      itemsTitle: ['นาย', 'นาง', 'นางสาว'],
      dataReady: true,
      dateTime: '', // Generate DateTime
      date: this.momenDate_1(new Date()),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      code: 'EMP_', // Generate Code
      valid_add: true,
      valid_update: true,
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogImport: false,
      // END Dialog Config ADD EDIT DELETE
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      // Search All
      searchAll2: '',
      formAdd: {
        empCode: '',
        empTitle_NameTH: '',
        empFirst_NameTH: '',
        empLast_NameTH: '',
        shopId: this.$session.getAll().data.shopId
      },
      formUpdate: {
        empCode: '',
        empTitle_NameTH: '',
        empFirst_NameTH: '',
        empLast_NameTH: ''
      },
      formUpdateItem: {
        empCode: '',
        empTitle_NameTH: '',
        empFirst_NameTH: '',
        empLast_NameTH: ''
      },
      nameRules: [
        (v) => !!v || 'กรุณากรอกข้อมูล '
      ],
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        // { text: 'id', value: 'empId', align: 'center' },
        { text: 'ชื่อ-นามสกุล', value: 'empFull_NameTH', align: 'center' },
        // { text: 'แผนก', value: 'positionName', align: 'center' },
        // { text: 'สาขา', value: 'masBranchName', align: 'center' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      // End Data Table Config
      // Config Import
      columnsImport: [
        { text: 'empCode', value: 'empCode' },
        { text: 'empTitle_NameTH', value: 'empTitle_NameTH' },
        { text: 'empFirst_NameTH', value: 'empFirst_NameTH' },
        { text: 'empLast_NameTH', value: 'empLast_NameTH' }
      ],
      dataItemImportChecKHide: true,
      dataItemImport: [],
      // End Config Import
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ]
      // End Export Config
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
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
    async getDataById (item) {
      //
      //
      // สำหรับ เรียกข้อมูล ใส่ form Update / Delete
      //
      //
      // Get ID /main.js
      this.dataReady = false
      this.getDataByIdGlobal(this.DNS_IP, this.path, 'empId', item.empId)
    },
    async addData () {
      //
      //
      // สำหรับ เพิ่มข้อมูล
      // ต้องระบุ Create / Last User ว่าใครเป็นคนสร้าง
      //
      this.formAdd.CREATE_USER = this.$session.getAll().data.userName
      this.formAdd.LAST_USER = this.$session.getAll().data.userName

      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      //
      // กำหนด Code ของรายการ * อย่าลืมเปลี่ยน field
      //
      this.formAdd.empCode = this.code + this.generateCodeGlobal()
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

      console.log('form', JSON.stringify(this.formAdd))

      this.dataReady = false
      this.submitAdd(this.DNS_IP, this.path, this.formAdd)
    },
    async submitAdd (DNS_IP, PATH, ID, DT) {
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
              DNS_IP + PATH + "add",
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
              await this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
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
      this.editDataGlobal(this.DNS_IP, this.path, this.PK, this.formUpdateItem)
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
              await this.getDataGlobal(DNS_IP, PATH, this.$session.getAll().data.shopId)
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
      this.deleteDataGlobal(this.DNS_IP, this.path, this.PK, this.$session.getAll().data.shopId)
    },
    // * Option Import Excel
    // * ตั้งค่าจาก Data
    importData (event) {
      var input = event.target
      var reader = new FileReader()
      reader.onload = () => {
        var fileData = reader.result
        var wb = XLSX.read(fileData, { type: 'binary' })
        wb.SheetNames.forEach((sheetName) => {
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
          console.log(rowObj)
          this.dataItemImport = rowObj
        })
        if (this.dataItemImport.length === 0) {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง')
        } else {
          this.dataItemImportChecKHide = false
        }
      }

      reader.readAsBinaryString(input.files[0])
    },
    importDataApprove (action) {
      console.log('Action', action)
      var titleMsg = ''
      var checkError = false
      if (action === 'add') {
        titleMsg = 'ท่านต้องการ นำเข้าข้อมูลจากไฟล์นี้ ใช่หรือไม่'
      } else if (action === 'delete') {
        titleMsg = 'ท่านต้องการ ลบข้อมูลจากไฟล์นี้ ใช่หรือไม่'
      } else {
        titleMsg = 'ท่านต้องการ ปรับปรุงข้อมูลจากไฟล์นี้ ใช่หรือไม่'
      }

      this.$swal({
        title: titleMsg,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          for (var key in this.dataItemImport) {
            this.PK = this.dataItemImport[key].empId
            if (action === 'add') {
              console.log('add')
              await this.importDataAdd(this.dataItemImport[key])
              checkError = true
            } else {
              await axios
                .get(
                  // eslint-disable-next-line quotes
                  this.DNS_IP +
                    this.path +
                    'get?empId=' +
                    this.dataItemImport[key].empId
                )
                .then(async (response) => {
                  if (action === 'update') {
                    await this.importDataUpdate(this.dataItemImport[key])
                    checkError = true
                  }
                  if (action === 'delete') {
                    await this.importDataDelete(this.dataItemImport[key])
                    checkError = true
                  }
                })
                // eslint-disable-next-line handle-callback-err
                .catch((error) => {
                  checkError = false

                  console.log('error /empSelect/get?empId : ', error)
                })
            }
          }
          console.log(checkError)
          if (checkError === true) {
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            await this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
          } else {
            this.dataItemImport = []
            this.dataItemImportChecKHide = true
            alert('โปรดใส่ไฟล์ให้ถูกต้อง')
          }
        })
        .catch((error) => {
          console.log('error function importDataApprove : ', error)
          this.dataReady = true
        })
    },
    async importDataAdd (dt) {
      Object.assign(this.formAdd, dt)
      this.formAdd.CREATE_USER = this.$session.getAll().data.userName
      this.formAdd.LAST_USER = this.$session.getAll().data.userName

      delete this.formAdd['empId']
      delete this.formAdd['LAST_DATE']
      delete this.formAdd['CREATE_DATE']
      delete this.formAdd['RECORD_STATUS']
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + this.path + "add",
          this.formAdd
        )
        .then(async (response) => {
          this.dialogImport = false
          // Debug response
          console.log('/empSelect/add/', response)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง', dt)
          console.log('error function importDataAdd addData : ', error)
          this.dataReady = true
        })
    },
    async importDataUpdate (dt) {
      Object.assign(this.formUpdate, dt)
      delete this.formUpdate['empId']
      delete this.formUpdate['LAST_DATE']
      delete this.formUpdate['CREATE_DATE']
      delete this.formUpdate['RECORD_STATUS']
      this.formUpdate.LAST_USER = this.$session.getAll().data.userName

      for (var key in this.formUpdateItem) {
        for (var key2 in this.formUpdate) {
          if (key === key2) {
            this.formUpdateItem[key] = this.formUpdate[key2]
          }
        }
      }

      // Debug
      console.log('EDIT PK : ', this.PK)
      console.log('formUpdateItem', JSON.stringify(this.formUpdateItem))

      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/empSelect/" + "edit/" + dt.empId,
          this.formUpdateItem
        )
        .then(async (response) => {
          this.dialogImport = false
          // Debug response
          console.log('/empSelect/edit/', response)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง', dt)
          console.log('error function importDataUpdate : ', error)
        })
    },
    async importDataDelete (dt) {
      this.formUpdate.LAST_USER = this.$session.getAll().data.userName
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/empSelect/" + "delete/" + dt.empId,
          this.formUpdate,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async (response) => {
          this.dialogImport = false
          // Debug response
          console.log('/empSelect/delete/', response)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง', dt)
          console.log('error function importDataDelete : ', error)
        })
    },
    exportData () {
      this.dataItem = []
      axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + '/empSelect/' + "get?shopId=" + this.shopId
        )
        .then(async (response) => {
          this.dataItem = response.data
          var tem = []
          response.data.forEach(element => {
            var s = {}
            console.log(element)
            s.empCode = element.empCode
            s.empTitle_NameTH = element.empTitle_NameTH
            s.empFirst_NameTH = element.empFirst_NameTH
            s.empLast_NameTH = element.empLast_NameTH
            tem.push(s)
          })
          console.log(tem)
          var info = XLSX.utils.json_to_sheet(tem)
          var wb = XLSX.utils.book_new() // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, info, 'worksheet') // sheetAName is name of Worksheet
          XLSX.writeFile(wb, 'Employee.xls') // name of the file is 'book.xlsx'
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log(error)
        })
    },
    async clearData () {
      // eslint-disable-next-line no-redeclare
      for (var key in this.formAdd) {
        console.log('Key', key)
        console.log('Value', this.formAdd)

        if (this.formAdd[key]) {
          this.formAdd[key] = ''
        }
      }

      // eslint-disable-next-line no-redeclare
      for (var key in this.search) {
        console.log('Key', key)
        console.log('Value', this.search)

        if (this.search[key]) {
          this.search[key] = ''
        }
      }
    }
  }
}
</script>
<style scope>
</style>
