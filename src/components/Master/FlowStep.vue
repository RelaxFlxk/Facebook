<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn color="primary" depressed @click="dialogAdd = true, validate('ADD')">
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- ADD -->
          <v-dialog v-model="dialogAdd" persistent max-width="60%">
            <v-card>
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                      <v-btn small color="#E0E0E0" @click="(dialogAdd = false), clearData()">
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                  </v-col>
                  <v-row justify="center">
                    <v-col cols="5" class="text-center">
                        <v-col class="text-center">
                      <v-img  class="v-margit_img_reward" :src="require('@/assets/GroupLevel.svg')" max-width="330"></v-img>
                      </v-col>
                    </v-col>

                      <v-col cols="6" class="v-margit_text_add mt-1">
                    <v-col class="text-center">
                      <v-img class="v_text_add" :src="require('@/assets/Grouptitle.svg')"></v-img>
                      </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">title</v-subheader>
                      </v-row>
                      <v-row style="height: 70px">
                      <v-text-field
                        v-model="formAdd.stepTitle"
                        placeholder="Title"
                        dense
                        required
                      ></v-text-field>
                      </v-row>
                    </v-col>
                      <v-col id="margin">
                      <v-row justify="center">
                      <v-btn
                        elevation="2"
                        x-large
                        color="#173053"
                        :disabled="!validAdd"
                        @click="addData()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        เพิ่ม
                      </v-btn>
                      </v-row>
                      </v-col>
                      </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- edit -->
          <v-dialog v-model="dialogEdit" persistent max-width="60%">
            <v-card>
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                      <v-btn small color="#E0E0E0" @click="(dialogEdit = false), clearData()">
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                  </v-col>
                  <v-row justify="center">
                      <v-col cols="6" class="v-margit_text_add mt-1">
                    <v-col class="text-center">
                      <v-img class="v_text_edit" :src="require('@/assets/GroupEditTitle.svg')"></v-img>
                      </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">title</v-subheader>
                      </v-row>
                      <v-row style="height: 70px">
                      <v-text-field
                        v-model="formUpdate.stepTitle"
                        dense
                        required
                      ></v-text-field>
                      </v-row>
                    </v-col>
                      <v-col id="margin">
                      <v-row justify="center">
                      <v-btn
                        elevation="2"
                        x-large
                        color="#173053"
                        :disabled="!validUpdate"
                        @click="editData()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        แก้ไข
                      </v-btn>
                      </v-row>
                      </v-col>
                      </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end  -->

          <!-- delete -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title>คุณต้องการลบใช่หรือไม่</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" @click="dialogDelete = false">Cancel</v-btn>
                <v-btn color="#173053"  @click="deleteItem(item)">OK</v-btn>
                <v-spacer></v-spacer>
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
                  class="table-striped table-bordered elevation-1"
                  :headers="columns"
                  :items="dataItem"
                  :search="searchAll2"
                >
                <template  v-slot:[`item.actions2`]="{ item }">
                    <v-btn
                      color="green"
                      fab
                      x-small
                      @click="actionUp(item)"
                    >
                      <v-icon dark> mdi-arrow-up-bold </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      fab
                      x-small
                      @click="actionDown(item.stepId)"
                    >
                      <v-icon dark> mdi-arrow-down-bold </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop="(dialogEdit = true), getDataById(item), validate('UPDATE')"
                    >
                      <v-icon dark> mdi-tools </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      fab
                      x-small
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
import VuetifyMoney from '../VuetifyMoney.vue'
// import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
// import XLSX from 'xlsx' // import xlsx
// import readXlsxFile from 'read-excel-file'
// import moment from 'moment' // แปลง date

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
    // downloadExcel: JsonExcel,
    // XLSX,
    // readXlsxFile
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  created () {
    // setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      PK: '',
      path: '/flowStep/', // Path Model
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'Flow',
          disabled: false,
          href: '/Master/FlowStep'
        }
      ],
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 9,
        precision: 0
      },
      // End Menu Config
      dataReady: true,
      dateTime: '', // Generate DateTime
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      // END Dialog Config ADD EDIT DELETE
      session: this.$session.getAll(),
      // Search All
      searchAll: '',
      searchAll2: '',
      formAdd: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      formUpdate: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      formUpdateItem: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      desserts: [],
      editedItemSelete: [],
      editedItem: {
        fieldId: '',
        fieldName: ''
      },
      stepItemSelete: [],
      // Data Table Config
      columns: [
        { text: 'ID', value: 'stepId' },
        { text: 'Title', value: 'stepTitle' },
        { text: ' ', value: 'actions2', sortable: false, align: 'center' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      validAdd: true,
      validUpdate: true,
      filesAdd: null,
      filesUpdate: null,
      editedIndex: -1
      // End Data Table Config
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    await this.getCustomField()
    await this.getStepTitle()
    await this.getDataGlobal(this.DNS_IP, this.path)
    console.log('555', this.dataItem.sort())
    // this.dataItem = this.dataItem.sort((a, b) => a.sortNo - b.sortNo)
  },
  methods: {
    actionUp (item) {
      this.dataItem = !this.sortBy
    },
    actionDown (stepId) {
      console.log('stepId', stepId)
      console.log('this.dataItem', this.dataItem)
      let index = this.dataItem.findIndex(e => e.stepId === stepId)
      console.log('index', index)
      if (index !== -1 && index < this.dataItem.length - 1) {
        let el = this.dataItem[index]
        console.log(el)
        this.dataItem[index] = this.dataItem[index + 1]
        this.dataItem[index + 1] = el
        this.updateMoveDown(this.dataItem)
        console.log('movedown', this.dataItem)
      }
    },
    updateMoveDown (dt) {

    },
    getCustomField () {
      this.editedItemSelete = []
      axios.get(this.DNS_IP + '/customField/get').then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.stepTitle
            d.value = d.stepTitle
            this.editedItemSelete.push(d)
          }
        }
      })
    },
    getStepTitle () {
      this.stepItemSelete = []
      axios.get(this.DNS_IP + '/flowStep/get').then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.stepTitle
            d.value = d.stepTitle
            this.stepItemSelete.push(d)
          }
        }
      })
    },
    deleteItem (item) {
      this.editedItemSelete.push(item)
      var x = this.desserts.indexOf(item)
      this.$delete(this.desserts, x)
    },
    save (item) {
      this.desserts.push(item.fieldName)
      var x = this.editedItemSelete.indexOf(item.fieldName)
      this.$delete(this.editedItemSelete, x)
    },
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
    async searchDataAll () {
      //
      //
      // สำหรับ ค้นหาแบบ LIKE Search
      // ต้องระบุ Field ที่จะส่งไปให้ตรงกับ Model
      //
      var search =
        '?levelId=' + this.searchAll +
         '&name=' + this.searchAll +
         '&Point=' + this.searchAll +
         '&priviledge=' + this.searchAll
      this.dataReady = false
      this.searchDataAllGlobal(this.DNS_IP, this.path, search)
    },
    // async getDataById (item) {
    //   console.log('item', item)
    //   this.dataReady = false
    //   await this.getDataByIdGlobal(this.DNS_IP, this.path, 'flowCode', item.flowCode)
    // },
    async getDataById (item) {
      this.editedItemSelete = []
      this.desserts = ''
      this.dataReady = false
      this.PK = item.flowCode
      console.log('item: ', item)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + this.path + "getCode?" + 'flowCode' + "=" + item.flowCode,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async (response) => {
          console.log('get flowCode : ', response.data[0].flowfieldName)
          console.log('flowww', response.data.stepTitle)
          this.dataReady = true
          if (response.data) {
            Object.assign(this.formUpdate, response.data)
            this.formUpdate.stepTitle = response.data.stepTitle
            // this.desserts = JSON.parse(response.data[0].flowfieldName)
            // this.getDataCompany()
            this.getCustomField(this.formUpdate.stepTitle)
            this.dataReady = true
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.dataReady = true
          console.log('error function getDataById : ', error)
        })
    },
    async addData () {
      this.dataReady = false
      // this.formAdd.flowCode = this.generateCodeGlobal()
      console.log('forAdd', this.formAdd)
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
          this.formAdd.CREATE_USER = this.session.data.userName
          this.formAdd.LAST_USER = this.session.data.userName
          delete this.formAdd['stepId']
          delete this.formAdd['flowId']
          delete this.formAdd['sortNo']
          // this.formAdd.flowCode = this.generateCodeGlobal()
          // this.formAdd.stepTitle = this.stepTitle
          console.log('stepTitle', this.formAdd.stepTitle)
          console.log('forAdd', this.formAdd)
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

              // this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogAdd = false

              // Load Data
              // await this.clearData()
              await this.getDataGlobal(this.DNS_IP, this.path)
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
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
      console.log('formUpdateItem', this.formUpdateItem)

      // Debug
      console.log('EDIT PK : ', this.PK)
      console.log('formUpdateItem', JSON.stringify(this.formUpdateItem))
      // End Debug
      // สำหรับ แก้ไขข้อมูล
      // ต้องระบุ  Last User ว่าใครเป็นคนแก้ไขล่าสุด
      //
      this.dataReady = false
      this.editDataSubmit(this.DNS_IP, this.path, this.PK, this.formUpdateItem)
    },
    async editDataSubmit (DNS_IP, PATH, ID, DT) {
      let id = this.formUpdate['fieldId']
      let dt = this.formUpdate
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
          let ds = {
            stepTitle: dt.stepTitle,
            fieldName: JSON.stringify(dt.fieldName)
          }
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + this.path + "edit/" + id,
              ds
              // {
              //   headers: {
              //     'Application-Key': this.$session.getAll().ApplicationKey
              //   }
              // }
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)

              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogEdit = false

              // Load Data
              await this.getDataGlobal(this.DNS_IP, this.path)
              // await this.reloadData()
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
      this.formUpdate.LAST_USER = this.session.data.userName
      console.log('DELETE PK : ', this.formUpdate.levelId)
      //
      //
      // สำหรับ ลบข้อมูล
      // ต้องระบุ  Last User ว่าใครเป็นคนลบล่าสุด
      //
      // this.formUpdate.LAST_USER = this.$session.getAll().data.userName
      this.dataReady = false
      this.deleteDataGlobal(this.DNS_IP, this.path, this.formUpdate.levelId, this.session.data.shopId)
    },
    async clearData () {
      // eslint-disable-next-line no-redeclare
      for (var key in this.formAdd) {
        if (this.formAdd[key]) {
          this.formAdd[key] = ''
        }
      }

      // eslint-disable-next-line no-redeclare
      for (var key in this.formUpdate) {
        if (this.formUpdate[key]) {
          this.formUpdate[key] = ''
        }
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
