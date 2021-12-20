<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs
          class="pl-0 pb-10"
          :items="breadcrumbs"
          divider=">"
        ></v-breadcrumbs>
        <v-row>
          <!-- edit -->
          <v-dialog v-model="dialogEdit" persistent max-width="50%">
            <v-card class="text-center">
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-col class="text-right">
                      <v-btn small color="#E0E0E0" @click="dialogEdit = false">
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <!-- <v-row justify="center">
                      <v-col cols="12" class="text-center">
                        <v-img
                          aspect-ratio="6"
                          contain
                          :src="formUpdate.logoPreview"
                        ></v-img>
                        <v-avatar size="100px"><img alt="Avatar" :src="formAdd.pictureUrl"></v-avatar>
                        <br />
                        <v-file-input
                          required
                          counter
                          show-size
                          accept="image/png, image/jpeg, image/bmp"
                          prepend-icon="mdi-camera"
                          label="โลโก้ร้าน"
                          @change="selectImgShop"
                          v-model="filesShop"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="5" class="text-center">
                        <v-img
                          class="v_text"
                          :src="require('@/assets/GroupEditTitle.svg')"
                        ></v-img>
                      </v-col>
                    </v-row> -->
                    <v-row>
                      <v-col cols="6">
                        <v-row style="height: 35px">
                          <v-subheader id="subtext">ชื่อร้าน</v-subheader>
                        </v-row>
                        <v-row style="height: 50px">
                          <v-text-field
                            placeholder="ชื่อร้าน*"
                            v-model="formUpdate.shopName"
                            :rules="[rules.required]"
                            required
                          ></v-text-field>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-row style="height: 35px">
                          <v-subheader id="subtext">เบอร์โทรศัพท์</v-subheader>
                        </v-row>
                        <v-row style="height: 50px">
                          <v-text-field
                            placeholder="Contact Tel*"
                            v-model="formUpdate.contactTel"
                            :rules="[rules.required, rules.numberRules]"
                            :counter="10"
                            maxlength="10"
                            required
                          ></v-text-field>
                        </v-row>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6">
                        <v-row style="height: 35px">
                          <v-subheader id="subtext">E-mail</v-subheader>
                        </v-row>
                        <v-row style="height: 50px">
                          <v-text-field
                            v-model="formUpdate.contactEmail"
                            type="email"
                            :rules="[rules.email]"
                            required
                          ></v-text-field>
                        </v-row>
                      </v-col>
                    </v-row>

                    <!-- <v-row>
                      <v-col cols="6">
                        <v-row style="height: 35px">
                          <v-subheader id="subtext">รหัสไปรษณีย์</v-subheader>
                        </v-row>
                        <v-row style="height: 50px">
                          <v-text-field
                            v-model="formUpdate.ZIP_CD"
                            type="email"
                            @change="getAddress()"
                          ></v-text-field>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                          <v-row style="height: 35px">
                          <v-subheader id="subtext">ตำบล/แขวง</v-subheader>
                        </v-row>
                        <v-row style="height: 50px">
                          <v-select
                            v-model="formUpdate.optionSubDistrictNew"
                            :items="optionSubDistrict"
                          ></v-select>
                        </v-row>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6">
                          <v-row style="height: 35px">
                          <v-subheader id="subtext">อำเภอ/เขต</v-subheader>
                        </v-row>
                        <v-row style="height: 50px">
                          <v-select
                            v-model="formUpdate.optionDistrictNew"
                            :items="optionDistrict"
                          ></v-select>
                        </v-row>
                      </v-col>
                      <v-col cols="6">
                        <v-row style="height: 35px">
                          <v-subheader id="subtext">จังหวัด</v-subheader>
                        </v-row>
                        <v-row style="height: 50px">
                          <v-select
                            v-model="formUpdate.optionProvinceNew"
                            :items="optionProvince"
                          ></v-select>
                        </v-row>
                      </v-col>
                    </v-row> -->
                  </v-container>
                </v-card-text>
              </v-form>
              <v-card-actions>
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
                      บันทึก
                    </v-btn>
                  </v-row>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end edit -->

          <!-- data table -->
          <v-col cols="12">
            <v-card elevation="7" v-if="dataReady">
              <v-card-title> </v-card-title>
              <v-card-text>
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
                  <template v-slot:[`item.expireDate`]="{ item }">
                    {{ format_dateNotime(item.expireDate) }}
                  </template>
                  <template v-slot:[`item.shopImge`]="{ item }">
                    <v-avatar color="primary" size="40">
                      <img :src="item.shopImge" alt="img"
                    /></v-avatar>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop="
                        ;(dialogEdit = true),
                          getDataById(item),
                          validate('UPDATE')
                      "
                    >
                      <v-icon dark> mdi-tools </v-icon>
                    </v-btn>
                    <!-- <v-btn
                      color="red"
                      dark
                      fab
                      x-small
                      @click.stop="(dialogDelete = true), getDataById(item)"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn> -->
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
import moment from 'moment' // แปลง date

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
      path: '/sys_shop/', // Path Model
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
      formUpdate: {
        logo: '',
        logoPreview: '',
        contactTel: '',
        shopName: '',
        shopImge: '',
        expireDate: '',
        contactEmail: '',
        map: '',
        ZIP_CD: '',
        optionSubDistrictNew: '',
        optionDistrictNew: '',
        optionProvinceNew: ''
      },
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
      rules: {
        numberRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: value => value.length <= 10 || 'Max 10 characters',
        IDcardRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        required: value => !!value || 'กรุณากรอก.',
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
      // End Form Config ADD EDIT
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'จัดการ ร้านค้า',
          disabled: true,
          href: '/System/EditShop'
        }
      ],
      // End Menu Config
      // Data Table Config
      columns: [
        { text: 'โลโก้', value: 'shopImge' },
        // { text: 'ID', value: 'shopId' },
        { text: 'ชื่อร้าน', value: 'shopName' },
        { text: 'เบอร์ร้าน', value: 'contactTel' },
        { text: 'E-mail', value: 'contactEmail' },
        { text: 'วันที่หมดอายุ', value: 'expireDate' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      validUpdate: true
      // End Data Table Config
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login')
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    // this.getDataTypeGroup()
    this.dataReady = false
    // Get Data
    this.getDataGlobal(
      this.DNS_IP,
      this.path,
      this.session.data.shopId,
      this.returnLink
    )
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
    selectImgShop () {
      if (this.filesShop) {
        this.formUpdate.logoPreview = URL.createObjectURL(this.filesShop)
      } else {
        this.formUpdate.logoPreview = ''
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
      await this.getDataByIdGlobal(
        this.DNS_IP,
        this.path,
        'shopId',
        item.shopId,
        this.returnLink
      )
      // this.formUpdate.logoPreview = this.formUpdate.logo
      this.formUpdate.expireDate = moment(this.formUpdate.expireDate).format(
        'YYYY-MM-DD HH:mm'
      )
      // if (this.formUpdate.ZIP_CD.length >= 5) {
      //   this.getAddress()
      // }
    },
    async editData () {
      console.log(this.formUpdate)
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
        .then(async result => {
          // this.formUpdate.LAST_USER = this.session.data.userName
          var ID = this.formUpdate.shopId
          var dt = {
            shopName: this.formUpdate.shopName,
            contactTel: this.formUpdate.contactTel,
            LAST_USER: this.session.data.userName,
            contactEmail: this.formUpdate.contactEmail
          }
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + this.path + 'edit/' + ID,
              dt
              // {
              //   headers: {
              //     'Application-Key': this.$session.getAll().ApplicationKey
              //   }
              // }
            )
            .then(async response => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)

              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogEdit = false

              // Load Data
              // await this.reloadData()
              await this.clearDataUpdate()
              this.filesShop = null
              await this.getDataGlobal(
                this.DNS_IP,
                this.path,
                this.session.data.shopId,
                this.returnLink
              )
            })
            // eslint-disable-next-line handle-callback-err
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
    },
    async getAddress () {
      if (this.formUpdate.ZIP_CD.length >= 5) {
        this.optionSubDistrict = []
        this.optionDistrict = []
        this.optionProvince = []
        await axios
          .get(
            // eslint-disable-next-line quotes
            'https://api.betaskthai.com/hrm/location/map_thai/?zipcode=' +
              this.formUpdate.ZIP_CD
          )
          .then(async response => {
            let rs = response.data
            // this.form.ADDRESS_PROVINCE = response.data[0].province
            for (var i = 0; i < rs.length; i++) {
              var x = rs[i]
              var z = {}
              z.text = x.district
              z.value = x.district
              this.optionDistrict.push(z)
            }
            for (var t = 0; t < rs.length; t++) {
              var k = rs[t]
              var l = {}
              l.text = k.province
              l.value = k.province
              this.optionProvince.push(l)
            }
            for (var b = 0; b < rs.length; b++) {
              var d = rs[b]
              var s = {}
              s.text = d.sub_district
              s.value = d.sub_district
              this.optionSubDistrict.push(s)
            }
            // }
          }) // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log(error)
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          })
      }
    },
    async clearDataUpdate () {
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
<style scope></style>
