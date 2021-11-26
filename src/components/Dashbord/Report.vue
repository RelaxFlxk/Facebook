<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
        <v-row>
          <v-col cols="12">
            {{day}}{{month}}{{year}}
            <v-sheet tile height="54" class="d-flex">
              <!-- วัน -->
              <v-select
                v-model="day"
                :items="dayName"
                dense
                outlined
                hide-details
                label="วัน"
                class="ma-2"
              ></v-select>
              <!-- เดือน -->
              <v-select
                v-model="month"
                :items="monthNameTH"
                dense
                outlined
                hide-details
                label="เดือน"
                class="ma-2"
              ></v-select>
              <!-- ปี -->
              <v-select
                v-model="year"
                :items="yearsNumber"
                dense
                outlined
                hide-details
                label="ปี"
                class="ma-2"
              ></v-select>
              <!-- ค้นหา -->
              <v-icon
                color="#871B12"
                size="30"
                @click="getDataToday()"
                >mdi-calendar-search</v-icon
              >
            </v-sheet>
          </v-col>
        </v-row>

        <v-divider class="mx-4"></v-divider>
        <v-row>
           <v-col cols="6">
              <v-card img-bottom>
            <ChartBarBase :chart-data="chartDataofMonth" />
          </v-card>
          </v-col>
          <v-col cols="6">
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
                    <v-col class="text-h3" cols="12">{{dataItem.length}}/{{StepCountAll}}</v-col>
                  </v-row>
                </v-card-text>

              </v-card>
              </center>
            </v-col>
            </v-row>
          <v-row>
            <v-col cols="4">
              <center>
              <v-card class="mx-auto" elevation="5">
                <v-list-item two-line>
                  <v-list-item-content>
                      ปากเกร็ด-เมืองทอง
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-row align="center">
                    <v-col class="text-h3" cols="12">{{dataItem.length}}/{{StepCountAll}}</v-col>
                  </v-row>
                </v-card-text>

              </v-card>
              </center>
            </v-col>
            <v-col cols="4">
              <center>
              <v-card class="mx-auto" elevation="5">
                <v-list-item two-line>
                  <v-list-item-content>
                      แจ้งวัฒนะ
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <v-row align="center">
                    <v-col class="text-h3" cols="12">{{dataItem.length}}/{{empCountAll}}</v-col>
                  </v-row>
                </v-card-text>

              </v-card>
              </center>
            </v-col>
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
                    <v-col class="text-h3" cols="12">{{dataItem.length}}/{{empCountAll}}</v-col>
                  </v-row>
                </v-card-text>

              </v-card>
              </center>
            </v-col>
              </v-row>
          </v-col>

        </v-row>
        <v-divider class="mx-4"></v-divider>
          <v-select
          v-model="select"
          :items="Branchitems"
          label="Standard"
          @change="getselectBranch ()"
        ></v-select>
         <v-row>
           <v-col cols="6">
              <v-card>
                  <LinechartBranch></LinechartBranch>
                <canvas id="myChartx"></canvas>
            </v-card>
          </v-col>
          <v-col cols="6">
            <CardBranch ref="modal1"></CardBranch>
          </v-col>

        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
// import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
import XLSX from 'xlsx' // import xlsx
import readXlsxFile from 'read-excel-file'
import moment from 'moment' // แปลง date
import dayName from '../../assets/master/Date/day.json'
import monthNameTH from '../../assets/master/Date/monthNameTH.json'
import yearsNumber from '../../assets/master/Date/yearsNumber.json'
import ChartBarBase from './Line.js'
import LinechartBranch from './LinechartBranch.vue'
import CardBranch from './CardBranch.vue'
import axios from 'axios'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    downloadExcel: JsonExcel,
    XLSX,
    readXlsxFile,
    moment,
    ChartBarBase,
    LinechartBranch,
    CardBranch
  },
  created () {
    setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      PK: '',
      center: {},
      session: this.$session.getAll(),
      // Menu Config
      select: '',
      Branchitems: [],
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
      dataItem: [],
      dayName: dayName,
      monthNameTH: monthNameTH,
      yearsNumber: yearsNumber,
      year: '',
      month: '',
      day: '',
      empCountAll: 0,
      StepCountAll: 0
    }
  },
  async mounted () {
    this.getMasbranch()
  },
  methods: {
    getselectBranch () {
      this.$refs.modal1.getBranch(this.select)
    },
    async getMasbranch () {
      this.Branchitems = []
      axios.get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          let s = {}
          s.text = d.masBranchName
          s.value = d.masBranchID
          this.Branchitems.push(s)
        }
        // console.log('this.Branchitems', this.Branchitems)
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
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
