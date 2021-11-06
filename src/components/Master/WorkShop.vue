<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="stepLayout">
        <v-row>
        <v-col cols="12" sm="4">
          <h5>เลือกประเภทงาน</h5>
          <v-select
          v-model="DataflowId"
            :items="DataFlowName"
            required
            dense
            outlined
            @change="getLayout()"
          ></v-select>
        </v-col>
      </v-row>
      </div>
        <div class="workLayout">
          <v-row class="rowstep">
              <draggable v-model="stepData" group="workshop">
              <div v-for="(element , step) in stepData" :key="step">
                <v-card class="rowIncolum" elevation="12">
                  <v-card-text>
                    <h2>{{element.stepTitle}}</h2>
                  </v-card-text>
                </v-card>
              </div>
            </draggable>
            <div v-for="(element , i ) in Layout" :key="i">
                <v-col cols="12" class="Layoutcolum">
                <draggable  v-model="Layout[i].workData" group="workshop" @change="UpdateworkShop ()">
                  <div v-for="(element , workData) in Layout[i].workData" :key="workData">
                    <v-card
                    class="mb-12"
                    width="220"
                   >
                     <v-toolbar
                    color="primary"
                    dark
                    >
                    {{element.stepTitle}}
                    </v-toolbar>
                      <v-card-text class="text pa-3" >

                      </v-card-text>
                    </v-card>
                  </div>
                </draggable>
                </v-col>
            </div>
            <v-col >
              <div v-show="stepData.length > 0 || Layout.length > 0">
                <v-btn class="mx-2" elevation="12" fab dark small color="primary" @click="AddColum ()">
                  <v-icon dark> mdi-plus </v-icon>
              </v-btn>
              </div>
              <div v-show="Layout.length > 0">
                <v-btn class="mx-2" elevation="12" fab dark small color="error" @click="DeleteColum ()">
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
              </div>
            </v-col>
            </v-row>
        </div>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import Menu from '../System/Menu.vue'
import draggable from 'vuedraggable'

// import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
// import XLSX from 'xlsx' // import xlsx
// import readXlsxFile from 'read-excel-file'
// import moment from 'moment' // แปลง date
// const app = Vue.createApp({})

export default {
  components: {
    draggable,
    Menu,
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  created () {
    // setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      stepData: [],
      Layout: [],
      DataflowId: '',
      DataFlowName: [],
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      fromAdd: {
        workColum: null,
        workData: '',
        flowId: null,
        CREATE_USER: '',
        LAST_USER: '',
        shopId: ''
      },
      numberRules: [ (v) => (!isNaN(parseFloat(v)) && v >= 0 && v <= 9999999999) ]
    }
  },
  async mounted () {
    this.showData()
    await this.getDataFlow()
  },
  methods: {
    showData () {
      console.log('showcard', this.Layout)
    },
    getDataFlow () {
      this.DataFlowName = []
      console.log('DataFlowName', this.DataFlowName)
      console.log('shopId', this.shopId)
      axios.get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.flowName
            d.value = d.flowId
            this.DataFlowName.push(d)
          }
        } else {
          this.DataFlowName = []
        }
      })
    },
    async getLayout () {
      this.Layout = []
      await axios.get(this.DNS_IP + '/WorkShopLayout/get?flowId=' + this.DataflowId + '&shopId=' + this.shopId)
        .then((response) => {
          let rs = response.data
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            var workData = []
            workData = JSON.parse(d.workData)
            this.Layout.push(
              {
                workShopId: d.workShopId,
                workColum: d.workColum,
                workData: workData
              }
            )
          }
          const flowId = this.DataflowId
          this.getStep(flowId)
          console.log('this.Layout', this.Layout)
        })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async getStep (flowId) {
      this.stepData = []
      await axios
        .get(this.DNS_IP + '/flowStep/get?flowId=' + flowId + '&shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
          const dt = rs.map((item) => {
            return {
              stepId: item.stepId,
              stepTitle: item.stepTitle,
              sortNo: item.sortNo
            }
          })
          console.log('dt', dt)
          let datastep = []
          for (let i = 0; i < this.Layout.length; i++) {
            let aa = this.Layout[i]
            if (aa.workData.length > 0) {
              for (let y = 0; y < aa.workData.length; y++) {
                datastep.push(aa.workData[y].stepId)
              }
            }
          }
          this.stepData = dt.filter(item => !datastep.includes(item.stepId))
        })
    },
    async UpdateworkShop () {
      const dt = this.Layout
      for (let i = 0; i < dt.length; i++) {
        let d = dt[i]
        let workDt = {
          workData: JSON.stringify(d.workData)
        }
        console.log('update', workDt)
        await axios
          .post(
            this.DNS_IP + '/WorkShopLayout/update/' + d.workShopId, workDt
          )
          .then(
          )
          .catch((error) => {
            console.log('error function addData : ', error)
          })
      }
      // this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
    },
    async DeleteColum () {
      this.$swal({
        title: 'ต้องการลบ Colum ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          let Delete = this.Layout.length - 1
          let workShopId = this.Layout[Delete].workShopId
          let LAST_USER = {
            LAST_USER: this.session.data.userName
          }
          if (this.Layout[Delete].workData.length > 0) {
            this.$swal({
              title: 'มีข้อมูลอยู่ใน Colum นี้ ไม่สามารถลบได้',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#b3b1ab',
              confirmButtonText: 'ใช่',
              cancelButtonText: 'ไม่'
            })
          } else {
            await axios
              .post(
                this.DNS_IP + '/WorkShopLayout/delete/' + workShopId, LAST_USER
              ).then(async (response) => {
                console.log('addDataGlobal DNS_IP + /job/add', response)
                this.getLayout()
                await this.clearData()
              })
              .catch((error) => {
                console.log('error function addData : ', error)
              })
            this.$swal('เรียบร้อย', 'DeleteColum', 'success')
          }
        })
    },
    async AddColum () {
      this.$swal({
        title: 'ต้องการเพิ่ม Colum ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          this.fromAdd.CREATE_USER = this.session.data.userName
          this.fromAdd.LAST_USER = this.session.data.userName
          this.fromAdd.workData = '[]'
          this.fromAdd.workColum = this.Layout.length + 1
          this.fromAdd.flowId = this.DataflowId
          this.fromAdd.shopId = this.shopId
          console.log('fromAdd', this.fromAdd)
          await axios
            .post(
              this.DNS_IP + '/WorkShopLayout/add', this.fromAdd
            ).then(async (response) => {
              console.log('addDataGlobal DNS_IP + /job/add', response)
              this.dialogAdd = false
              this.getLayout()
              await this.clearData()
            })
            .catch((error) => {
              console.log('error function addData : ', error)
            })
        })
    },
    clearData () {
      this.fromAdd = {}
    }
  }
}

</script>
<style scope>
.main{
  margin-top: 1rem;
  background-color: #FFFFFF;
  height: 800px;
  max-height: max-content;
}
.Layoutcolum{
  margin-top: 2px;
  margin-left: 5px;
  min-height: 600px !important;
  width: 250px !important;
  border-color: #ffffff ;
  background-color: #f0eeee ;
  display:flex;
}
.layout{
  flex-wrap: wrap;
  display: flex;
}
.stepLayout{
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding-left: 1rem;
  width: 100%;
}
.workLayout{
  margin-top: 1rem;
  margin-bottom: 2rem;
  padding-left: 1rem;
  width: max-content;
}
body{
  overflow:auto;
  white-space: normal;
}
.rowIncolum{
  margin-top: 10px;
  margin-left: 1px;
  padding: 20px 20px 20px 20px;
  height: 100px !important;
  width: 220px !important;
  border-style: groove;
  border-color: #000002;
  background-color: #FFFFFF ;
  display:flex;
}
.rowStepworkshop{
  background-color: rgb(92, 90, 90);
  min-width: 100px !important;
}
</style>
