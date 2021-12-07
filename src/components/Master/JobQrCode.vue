/* eslint-disable vue/return-in-computed-property */
<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
   <!-- มีข้อมูล    -->
  <v-container class="QrBg" v-show="value !== ''">
  <br>
   <v-card >
     <v-container >
      <v-row >
        <v-col cols="12">
          <div class=" text-center">
           <br/>
             <br>
             <h2 style="font-weight: 900; color:#FFA000">ติดตามสถานะ!</h2>
            <qrcode-vue :value="value" :size="size" level="H" :foreground="foreground" />
         </div>
      </v-col>
    </v-row>
    </v-container>
    <v-row >
      <v-col cols="12">
          <v-container class="text-center" >
            <v-container>
                <div v-for="(p , index) in jobitem" :key="index">
                <h4>{{p.name}} : {{p.value}}</h4>
            </div>
            </v-container>
            <v-btn small class="ma-2" color="primary" @click="jobConfirm" dark>
                    SKIP
                <v-icon dark right>
                mdi-checkbox-marked-circle
                </v-icon>
                </v-btn>
                <v-btn small class="ma-2" color="error" @click="clearData()" dark >
                    Close
                    <v-icon dark right>
                        mdi-minus-circle
                    </v-icon>
                </v-btn>
         </v-container>
      </v-col>
    </v-row>
   </v-card>
   <br>
  </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios' // api
// import adminLeftMenu from '../Sidebar.vue' // เมนู
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
      pathToweb: 'https://liff.line.me/1656581804-7KRQyqo5/JobConfirm?jobId=',
      userId: '',
      jobNo: this.$route.query.jobNo,
      skip: {
        userId: 'user-skip'
      },
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
      size: 200,
      foreground: '#173053'
    }
  },
  async mounted () {
    await this.beforeCreate()
  },
  methods: {
    beforeCreate () {
      if (!this.$session.exists()) {
        this.$router.push('/Core/Login?jobNo=' + this.$route.query.jobNo + '&shopId=' + this.$route.query.shopId)
      } else {
        this.getjob()
      }
    },
    getjob () {
      this.jobitem = []
      if (this.jobNo !== '') {
        axios.get(this.DNS_IP + '/job/getJobNo?jobNo=' + this.jobNo).then((response) => {
          let rs = response.data
          let Id = ''
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {
                Id: d.jobId,
                value: d.fieldValue,
                name: d.fieldName
              }
              Id = d.userId
              this.jobitem.push(s)
            }
            this.userId = Id
            this.value = this.pathToweb + this.jobitem[0].Id + '&shopId=' + this.$session.getAll().data.shopId
            console.log(this.jobitem)
            console.log(this.value)
            console.log('UserId', this.userId)
            this.getUserId()
          } else {
            this.$swal('กรุณา', 'ติดต่อเจ้าหน้าที่', 'success')
          }
        })
      }
    },
    async jobConfirm () {
      this.$swal({
        title: 'ต้องการ ยืนยันข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async () => {
          await axios
            .post(
              this.DNS_IP + '/job/update/' + this.jobitem[0].Id, this.skip
            ).then(async (response) => {
              console.log(response)
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
                .then(() => {
                  this.clearData()
                })
            })
        })
    },
    getUserId () {
      if (this.userId === null) {
        console.log('yes')
      } else {
        this.$swal({
          title: 'มีลูกค้าอยู่แล้ว',
          type: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ใช่'
        }).then(() => {
          this.clearData()
        })
      }
    },
    async clearData () {
      // eslint-disable-next-line no-redeclare
      this.$router.push('/Core/Home')
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
.QrBg{
  background-color: #173053;
  height: 100vh;
}
</style>
