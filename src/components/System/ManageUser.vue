<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-5">
        <v-breadcrumbs
          class="pl-0 pb-10"
          :items="breadcrumbs"
          divider=">"
        ></v-breadcrumbs>
      </div>
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
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
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
                  </template>
                </v-data-table>
                </v-card>
      </div>
    </v-main>
  </div>
</template>
<script>
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
      date: new Date().toISOString().substr(0, 10),
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
        numberRules: (value) =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: (value) => value.length <= 10 || 'Max 10 characters',
        IDcardRules: (value) =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        required: (value) => !!value || 'กรุณากรอก.',
        resizeImag: (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
        counterIDcard: (value) => value.length <= 13 || 'Max 13 characters',
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
      dataItem: [],
      validUpdate: true
      // End Data Table Config
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
      this.session.data.shopId
    )
    console.log(this.dataItem + this.path + this.session.data.shopId)
  },
  methods: {}
}
</script>
<style scope></style>
