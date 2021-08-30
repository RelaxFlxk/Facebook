/* eslint-disable vue/return-in-computed-property */
<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
        </v-row>
        </div>
  <v-container>
    <v-row >
      <v-col cols="2"></v-col>
      <v-col cols="8">
         <div v-show="value !== ''">
           <v-card class="text-center">
           <br/>
            <qrcode-vue :value="value" :size="size" level="H" />
            <div v-for="(p , index) in jobitem" :key="index">
                <h4>{{p.name}} : {{p.value}}</h4>
            </div>
          </v-card>
         </div>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import Menu from '../System/Menu.vue'
import QrcodeVue from 'qrcode.vue'
// import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
// import XLSX from 'xlsx' // import xlsx
// import readXlsxFile from 'read-excel-file'
// import moment from 'moment' // แปลง date
// const app = Vue.createApp({})

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    Menu,
    QrcodeVue
    // downloadExcel: JsonExcel,
    // XLSX,
    // readXlsxFile
  },
  created () {
    // setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      PK: '',
      path: '/Job/',
      jobNo: this.$route.query.jobNo,
      jobitem: [],
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        }
      ],
      session: this.$session.getAll(),
      value: '',
      size: 200
    }
  },
  async mounted () {
    this.getCustomField()
  },
  methods: {
    getCustomField () {
      this.jobitem = []
      if (this.jobNo !== '') {
        axios.get(this.DNS_IP + '/job/get?jobNo=' + this.jobNo).then((response) => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {
                Id: d.jobId,
                value: d.fieldValue,
                name: d.fieldName
              }
              this.jobitem.push(s)
            }
          }
          this.value = 'http://betask-linked-web/jobConfirm?jobId=' + this.jobitem[0].Id
          console.log(this.jobitem)
          console.log(this.value)
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
}
</style>
