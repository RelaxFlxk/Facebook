<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs
          class="pl-0 pb-10"
          :items="breadcrumbs"
          divider=">"
        ></v-breadcrumbs>
        <v-row>
          <!-- edit -->
          <v-dialog ref="dialogEdit" v-model="dialogEdit" persistent max-width="50%">
            <v-card class="text-center">
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-col class="text-right">
                      <v-btn small color="#E0E0E0" @click="dialogEdit = false">
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <v-row justify="center">
                      <v-col md="auto">
                        <h1 style="font-size:10vw;" class="underline-06">แก้ไขข้อมูลร้านค้า</h1>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                          <v-col cols="6 " class="text-center">
                            <v-avatar
                              color="#FFFFFF"
                              size="150"
                            >
                             <v-img
                              aspect-ratio="6"
                              contain
                              :src="formUpdate.pictureUrlPreview"
                            ></v-img>
                            </v-avatar>
                            <!-- <v-avatar size="100px"><img alt="Avatar" :src="formAdd.pictureUrl"></v-avatar> -->
                            <br />
                            <v-file-input
                              required
                              counter
                              show-size
                              :rules="[rules.resizeImag]"
                              accept="image/png, image/jpeg, image/bmp"
                              prepend-icon="mdi-camera"
                              label="รูปโปรไฟล์"
                              @change="selectImgUpdate"
                              v-model="filesUpdate"
                            ></v-file-input>
                          </v-col>
                          <v-col cols="6 " class="text-center">
                            <v-avatar
                              tile
                              color="#FFFFFF"
                              size="150"
                            >
                             <v-img
                              aspect-ratio="6"
                              contain
                              :src="formUpdate.pictureCoverUrlPreview"
                            ></v-img>
                            </v-avatar>
                            <!-- <v-avatar size="100px"><img alt="Avatar" :src="formAdd.pictureUrl"></v-avatar> -->
                            <br />
                            <v-file-input
                              required
                              counter
                              show-size
                              :rules="[rules.resizeImag]"
                              accept="image/png, image/jpeg, image/bmp"
                              prepend-icon="mdi-camera"
                              label="รูป Cover"
                              @change="selectImgCoverUpdate"
                              v-model="filesUpdateImgCover"
                            ></v-file-input>
                          </v-col>
                        </v-row>
                    <v-row>
                      <v-col cols="6" class="pb-0">
                          <v-text-field
                            outlined
                            label="ชื่อร้าน"
                            placeholder="ชื่อร้าน*"
                            v-model="formUpdate.shopName"
                            :rules="[rules.required]"
                            required
                          ></v-text-field>
                      </v-col>
                      <v-col cols="6" class="pb-0">
                          <v-text-field
                          outlined
                            label="เบอร์โทรศัพท์"
                            placeholder="Contact Tel*"
                            v-model="formUpdate.contactTel"
                            :rules="[rules.required, rules.numberRules]"
                            :counter="10"
                            maxlength="10"
                            required
                          ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6" class="pb-0">
                          <v-text-field
                          outlined
                            label="E-mail"
                            v-model="formUpdate.contactEmail"
                            type="email"
                            :rules="[rules.email]"
                            required
                          ></v-text-field>
                      </v-col>
                      <v-col cols="6" class="pb-0">
                          <v-switch
                            v-model="formUpdate.darkMode"
                            inset
                          >
                            <template v-slot:label>
                              <div class="mt-3">Dark Mode</div>
                            </template>
                          </v-switch>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="formUpdate.category"
                          :items="category"
                          label="ประเภทธุรกิจ"
                          outlined
                          dense
                          required
                          :rules="[rules.required]"
                        ></v-select>
                      </v-col>
                    </v-row>
                     <v-row>
                      <v-col cols="12" class="pb-0">
                          <v-textarea
                            outlined
                            label="ข้อความตอบกลับการนัดหมาย"
                            v-model="formUpdate.bookingthankText"
                          ></v-textarea>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6" class="pb-2 pt-0">
                        <v-subheader>สีพื้นหลัง</v-subheader>
                        <v-color-picker
                          dot-size="25"
                          v-model="formUpdate.primaryColor"
                          mode="hexa"
                          show-swatches
                          swatches-max-height="100"
                        ></v-color-picker>
                      </v-col>
                      <v-col cols="6" class="pb-2 pt-0">
                        <v-subheader>สีปุ่ม</v-subheader>
                        <v-color-picker
                          dot-size="25"
                          v-model="formUpdate.secondaryColor"
                          mode="hexa"
                          show-swatches
                          swatches-max-height="100"
                        ></v-color-picker>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
              <v-card-actions>
                <v-col id="margin">
                  <v-row justify="center">
                    <v-btn
                      elevation="2"
                      dark
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
                      dark
                      small
                      @click.stop="
                        ;(dialogEdit = true),
                          getDataById(item),
                          validate('UPDATE')
                      "
                    >
                      <v-icon dark> mdi-tools </v-icon>
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
      showComponents: false,
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
        pictureUrlPreview: '',
        pictureCoverUrlPreview: '',
        contactTel: '',
        shopName: '',
        shopImge: '',
        expireDate: '',
        contactEmail: '',
        map: '',
        ZIP_CD: '',
        optionSubDistrictNew: '',
        optionDistrictNew: '',
        optionProvinceNew: '',
        shopImageCover: '',
        primaryColor: '',
        secondaryColor: '',
        darkMode: false,
        category: ''
      },
      filesShop: null,
      category: [
        { text: 'ธุรกิจรถยนต์', value: 'ธุรกิจรถยนต์' },
        { text: 'ธุรกิจอื่นๆ', value: 'ธุรกิจอื่นๆ' }
      ],
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
        { text: 'ประเภทธุรกิจ', value: 'category' },
        // { text: 'วันที่หมดอายุ', value: 'expireDate' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      filesUpdate: null,
      filesUpdateImgCover: null,
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
    editDataByBookingField (item) {
      console.log('item1111111111111111111111111111', item)
      this.dialogEdit = true
      this.getDataById(item[0])
      this.validate('UPDATE')
      // this.getDataById()
    },
    selectImgUpdate () {
      if (this.filesUpdate) {
        this.formUpdate.pictureUrlPreview = URL.createObjectURL(
          this.filesUpdate
        )
      } else {
        this.formUpdate.pictureUrlPreview = ''
      }
      // console.log(event)
    },
    selectImgCoverUpdate () {
      if (this.filesUpdateImgCover) {
        this.formUpdate.pictureCoverUrlPreview = URL.createObjectURL(
          this.filesUpdateImgCover
        )
      } else {
        this.formUpdate.pictureCoverUrlPreview = ''
      }
      // console.log(event)
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
      this.formUpdate.pictureUrlPreview = this.formUpdate.shopImge
      this.formUpdate.pictureCoverUrlPreview = this.formUpdate.shopImageCover
      if (this.formUpdate.darkMode === 'True') {
        this.formUpdate.darkMode = true
      } else {
        this.formUpdate.darkMode = false
      }
      if (this.formUpdate.bookingthankText === null) {
        this.formUpdate.bookingthankText = ''
      } else {
        console.log('bookingthankText', this.formUpdate.bookingthankText)
      }
      // this.formUpdate.primaryColor = item.primaryColor
      // this.formUpdate.secondaryColor = item.secondaryColor
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
          if (this.filesUpdate) {
            const _this = this
            let params = new FormData()
            params.append('file', this.filesUpdate)
            await axios
              .post(this.DNS_IP + `/file/upload/shop`, params)
              .then(function (response) {
                _this.formUpdate.shopImge = response.data
                console.log('url Pic', response.data)
              })
          } else {
            this.formUpdate.shopImge = this.formUpdate.pictureUrlPreview
          }
          if (this.filesUpdateImgCover) {
            const _this = this
            let params = new FormData()
            params.append('file', this.filesUpdateImgCover)
            await axios
              .post(this.DNS_IP + `/file/upload/shop`, params)
              .then(function (response) {
                _this.formUpdate.shopImageCover = response.data
                console.log('url Pic', response.data)
              })
          } else {
            this.formUpdate.shopImageCover = this.formUpdate.pictureCoverUrlPreview
          }
          var darkMode = ''
          if (this.formUpdate.darkMode === true) {
            darkMode = 'True'
          } else {
            darkMode = 'False'
          }
          let bookingthankText = null
          if (this.formUpdate.bookingthankText === '') {
            bookingthankText = ''
          } else {
            bookingthankText = this.formUpdate.bookingthankText
          }
          var dt = {
            shopName: this.formUpdate.shopName,
            shopImge: this.formUpdate.shopImge,
            shopImageCover: this.formUpdate.shopImageCover,
            contactTel: this.formUpdate.contactTel,
            LAST_USER: this.session.data.userName,
            contactEmail: this.formUpdate.contactEmail,
            primaryColor: this.formUpdate.primaryColor,
            secondaryColor: this.formUpdate.secondaryColor,
            category: this.formUpdate.category,
            darkMode: darkMode,
            bookingthankText: bookingthankText
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
              var ds = {
                shopName: this.formUpdate.shopName,
                shopImge: this.formUpdate.shopImge,
                shopImageCover: this.formUpdate.shopImageCover,
                contactTel: this.formUpdate.contactTel,
                LAST_USER: this.session.data.userName,
                contactEmail: this.formUpdate.contactEmail,
                primaryColor: this.formUpdate.primaryColor,
                secondaryColor: this.formUpdate.secondaryColor,
                darkMode: darkMode,
                bookingthankText: bookingthankText,
                sourceProgram: 'belinked'
              }
              this.updateBetaskDB(ds, this.$session.getAll().data.shopId)
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
    async updateBetaskDB (ds, shopId) {
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP_Betask + "/sys_shop/editData/" + shopId,
          ds
        )
        .then(async response => {
        })
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
