<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <v-row>
          <v-col cols="12">
            <v-sheet tile height="54" class="d-flex">
 <v-col cols="3">
    <v-select
      v-model="masBranchName"
      :items="BranchItem"
      dense
      outlined
      hide-details
      label="สาขา"
      class="ma-3"
    ></v-select>
</v-col>
 <v-col cols="3">
    <v-select
      v-model="empStep"
      :items="EmployeeItem"
      dense
      outlined
      hide-details
      label="พนักงาน"
      class="ma-3"
    ></v-select>
</v-col>
<v-col cols="6">
     <date-range-picker
            ref="picker"
            :locale-data="{ firstDay: 1, format: 'yyyy-mm-dd' }"
            v-model="dateRange"
      />
</v-col>
            </v-sheet>
          </v-col>
        </v-row>

        <v-divider class="mx-4"></v-divider>
        <v-row>
          <center>
          <v-col cols="12">
            <v-row>
            <v-col cols="6">
              <center>
              <v-card class="mx-auto" elevation="5">
                <v-list-item two-line>
                  <v-list-item-content>
                      Total Job
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-row align="center">
                    <v-col class="text-h3" cols="12">{{dataItem.length}}/{{closeJob}}</v-col>
                  </v-row>
                </v-card-text>

              </v-card>
              </center>
            </v-col>
            </v-row>
            <v-row>
              <div cols="12" v-for="(items, index) in BranchItem" :key="index">
            <v-col >
              <center>
              <v-card class="mx-auto" elevation="5">
                <v-list-item two-line>
                  <v-list-item-content>
                      {{items.masBranchName}}
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-row align="center">
                    <v-col class="text-h3" cols="12">{{dataItem.length}}/{{closeJob}}</v-col>
                  </v-row>
                </v-card-text>

              </v-card>
              </center>
            </v-col>
              </div>
            </v-row>
          </v-col>
          </center>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <v-select
          v-model="select"
          :items="BranchItem"
          dense
          outlined
          hide-details
          @change="getselectBranch()"
          label="สาขา"
          class="ma-3"
        ></v-select>
         <v-row>
           <v-col cols="6">
              <v-card>
                  <!-- <LinechartBranch></LinechartBranch> -->
                  <CardBranch ref="modal1"></CardBranch>
                <canvas id="myChartx"></canvas>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-row>
           <v-col cols="4">
             <center>
              <v-card class="mx-auto" elevation="5">
                <v-list-item two-line>
                  <v-list-item-content>
                      หนองแขม
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-row align="center">
                    <v-col class="text-h5" cols="12">{{dataItem.length}}/{{stepCountAll}}</v-col>
                  </v-row>
                </v-card-text>

              </v-card>
             </center>
            </v-col>
              </v-row>
          </v-col>

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
// import dayName from '../../assets/master/Date/day.json'
// import monthNameTH from '../../assets/master/Date/monthNameTH.json'
// import yearsNumber from '../../assets/master/Date/yearsNumber.json'
import ChartBarBase from './Line.js'
import LinechartBranch from './LinechartBranch.vue'
import DateRangePicker from 'vue2-daterange-picker'
// you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import CardBranch from './CardBranch.vue'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    downloadExcel: JsonExcel,
    XLSX,
    readXlsxFile,
    moment,
    ChartBarBase,
    LinechartBranch,
    DateRangePicker,
    CardBranch
  },
  created () {
    setInterval(this.getNowGlobal, 1000)
  },
  data () {
    let startDate = new Date()
    let endDate = new Date()
    return {
      PK: '',
      center: {},
      session: this.$session.getAll(),
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'รายงาน',
          disabled: false,
          href: '/Dashbord/Report'
        }
      ],
      stepData: [],
      Layout: [],
      DataflowId: '',
      DataFlowName: [],
      chartDataofMonth: false,
      shopId: this.$session.getAll().data.shopId,
      fromAdd: {
        workColum: null,
        workData: '',
        flowId: null,
        CREATE_USER: '',
        LAST_USER: '',
        shopId: ''
      },
      dialog: false,
      dataReady: true,
      dateTime: '', // Generate DateTime
      searchAll2: '',
      loader: null,
      loading3: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      dataItem: [],
      EmployeeItem: [],
      empStep: '',
      dataByEmpView: [],
      // dayName: dayName,
      // monthNameTH: monthNameTH,
      // yearsNumber: yearsNumber,
      year: '',
      month: '',
      day: '',
      disableYear: true,
      disableMonth: true,
      dateRange: {startDate, endDate},
      format: 'yyyy-mm-dd',
      firstDay: 0,
      showDropdowns: false,
      showWeekNumbers: '',
      linkedCalendars: '',
      masBranchName: '',
      Branch: '',
      select: '',
      BranchItem: [],
      stepCountAll: '',
      totalJob: 0,
      closeJob: 0
    }
  },
  async mounted () {
    console.log('shopId', this.shopId)
    this.dataReady = false
    await this.getDataBranch()
    await this.getEmpSelect()
    await this.getDataCountStep()
  },
  methods: {
    async getEmpSelect () {
      this.EmployeeItem = []
      await axios
        .get(this.DNS_IP + '/empSelect/get?shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH
              s.value = d.empFirst_NameTH
              this.EmployeeItem.push(s)
            }
          }
        })
    },
    getselectBranch () {
      this.$refs.modal1.getBranch(this.select)
    },
    async getDataBranch () {
      this.BranchItem = []
      await axios
        .get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId)
        .then(async (response) => {
          let rs = response.data
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.masBranchName
            d.value = d.masBranchId
            this.BranchItem.push(d)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.BranchItem = []
        })
    },
    async getDataCountStep () {
      this.dataReady = false
      this.dataItem = []
      this.totalJob = 0
      this.closeJob = 0
      // var Branch =
      //   this.Branch === '' ? '' : '&masBranchId=' + this.Branch
      await axios
        .get(this.DNS_IP + '/job_log/getReport_branch'
        )
        .then(async (response) => {
          console.log('dataItem', this.dataItem)
          console.log('totalJob', this.totalJob)
          console.log('closeJob', this.closeJob)
          this.dataItem = response.data
          let rs = this.dataItem
          this.totalJob = rs.length
          this.closeJob = rs.length
          // for (var i = 0; i < rs.length; i++) {
          //   var d = rs[i]
          //   d.totalJob = this.totalJob += 1
          //   d.closeJob = this.closeJob += 1
          // }
          console.log('dataItem', this.dataItem)
          console.log('totalJob', this.totalJob)
          console.log('closeJob', this.closeJob)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scope>
.v-data-table-header {
  background-color: #1b437c !important;
}
.Color-Font {
  color: #808588;
}
.Color-Font-Action {
  color: #b61c1c;
}
.Color-Font-Preview {
  color: #262a34;
}
.Color-Button {
  color: #b61c1c;
}
.Divider {
  border: 2px solid #808588;
  background: #808588;
  border-radius: 5px;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.v-data-table-header {
  background-color: var(--table-head-bg) !important;
}
</style>
