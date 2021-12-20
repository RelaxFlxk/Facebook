<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <v-row>
                <v-col cols="12">
                  <div style="display: flex">
                    <date-range-picker
                    ref="picker"
                    :locale-data="{ firstDay: 1, format: 'yyyy-mm-dd' }"
                    v-model="dateRange"
                    />
                    <v-btn
                      small class="ml-5 mt-2" color="#173053" dark
                      @click="getBranch()"
                    >
                      ค้นหา
                    </v-btn>
                  </div>
                </v-col>
        </v-row>

        <v-divider class="mx-4"></v-divider>
        <v-row>
          <v-col cols="12" md="6">
            <LinechartBranch ref="modal2"></LinechartBranch>
          </v-col>
          <v-col cols="12" md="6">
              <CardBranch ref="modal1"></CardBranch>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="masBranchName"
              :items="BranchItem"
              dense
              outlined
              hide-details
              label="สาขา"
              class="ma-3"
              @change="getselectBranch()"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6" v-if="masBranchName.length > 0">
            <v-select
              v-model="SelectFlowName"
              :items="itemFlowName"
              :menu-props="{ maxHeight: '400' }"
              label="ประเภทงาน"
              dense
              outlined
              multiple
              hint="เลือกประเภทงานที่ต้องการสแดง"
              persistent-hint
              class="ma-3"
              @change="SelectFlow ()"
            ></v-select>
          </v-col>
        </v-row>
         <v-row>
           <v-col cols="12" md="6">
              <LinechartBranchSelect ref="modal3"></LinechartBranchSelect>
          </v-col>
          <v-col cols="12" md="6">
            <CardBranchSelect ref="modal4"></CardBranchSelect>
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
import LinechartBranchSelect from './LinechartBranchSelect.vue'
import CardBranchSelect from './CardBranchSelect.vue'

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
    CardBranch,
    LinechartBranchSelect,
    CardBranchSelect
  },
  created () {
    setInterval(this.getNowGlobal, 1000)
  },
  data () {
    let startDate = new Date()
    let endDate = new Date()
    return {
      PK: '',
      itemFlowName: [],
      SelectFlowName: [],
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
      date: this.momenDate_1(),
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
    this.dataReady = false
    await this.getDataBranch()
    await this.getEmpSelect()
    await this.getFlow()
  },
  methods: {
    async getEmpSelect () {
      this.EmployeeItem = []
      await axios
        .get(this.DNS_IP + '/empSelect/get?shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
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
    async SelectFlow () {
      // console.log('this', this.SelectFlowName)
      this.$refs.modal4.selectflowname(this.SelectFlowName)
    },
    async getFlow () {
      this.itemFlowName = []
      this.SelectFlowName = []
      await axios.get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          this.itemFlowName.push(d.flowName)
        }
        this.SelectFlowName = this.itemFlowName
        // console.log('rs2', this.itemFlowName)
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    getBranch () {
      this.$refs.modal1.getBranchCard(this.masBranchName, this.dateRange)
      this.$refs.modal2.getBranchLine(this.dateRange)
    },
    getselectBranch () {
      this.$refs.modal3.getBranchSelect(this.masBranchName, this.dateRange)
      this.$refs.modal4.getBranchSelectCard(this.masBranchName, this.dateRange)
    },
    async getDataBranch () {
      this.BranchItem = []
      this.masBranchName = ''
      await axios
        .get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId)
        .then(async (response) => {
          let rs = response.data
          // console.log('rsrsrs', rs)
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.masBranchName
            d.value = d.masBranchName
            this.BranchItem.push(d)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.BranchItem = []
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
