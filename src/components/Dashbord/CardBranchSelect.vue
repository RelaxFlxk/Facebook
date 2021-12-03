<template lang="">
<div v-if="Carditem.length > 0">
  <div v-for="(item,index) in Carditem" :key="index">
    <div :id="ID +  flowNameitem[index] "></div>
  </div>
</div>
    <!-- <div v-if="Carditem.length > 0">
      <div v-for="(item , index) in Carditem" :key='index'>
        <v-card class="p-3" >
          <v-row >
          <v-col cols="6" >
        <center>
        <v-card class="mx-auto" elevation="5" :color="codeColor[index]" dark>
          <v-list-item two-line>
            <v-list-item-content>
                <p>{{item.flowName}}</p>
            </v-list-item-content>
          </v-list-item>
          </v-card>
        </center>
        </v-col>
          <v-col cols="6">
          <v-row >
            <v-col cols="12" >
              <div v-for="(item2 , index2) in item.stepTitle" :key='index2'>
              <center>
              <v-card class="mx-auto" elevation="5"  :color="codeColor[index2]" dark  >
                  <p style="margin-bottom: 0px;">{{item2}}({{item.Jobitem[index2] - item.closeJob[index2]}})</p>
                </v-card>
              </center>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
        </v-card>
      </div>
    </div> -->
</template>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import axios from 'axios'
import D3Funnel from 'd3-funnel'
export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    D3Funnel

  },
  data () {
    return {
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      flowNameitem: [],
      dataitem: [],
      Carditem: [],
      codeColor: ['#00CED1', '#48D1CC', '#40E0D0', '#00FFFF', '#7FFFD4', '#66CDAA', '#5F9EA0'],
      Chartitem: [],
      data: [],
      options: {
        block: {
          dynamicHeight: true,
          minHeight: 15
        },
        chart: {
          inverted: true

        }
      },
      ID: 'A'
    }
  },
  async mounted () {
    // await this.getBranch()

  },
  methods: {
    async getBranchSelectCard (masBranchName, dateRange) {
      this.dataitem = []
      this.flowNameitem = []
      await this.getFlow()
      let startDate = this.momenDate_1(dateRange.startDate)
      let endDate = this.momenDate_1(dateRange.endDate)
      await axios.get(this.DNS_IP + '/job_log/getDashbord_selectBranch_card?startDate=' + startDate + '&endDate=' + endDate + '&shopId=' + this.shopId + '&masBranchName=' + masBranchName).then(response => {
        let rs = response.data
        // console.log('rs', rs)
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          this.dataitem.push(d)
        }
        console.log(' this.dataitem', this.dataitem)
        this.getCard()
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
      // console.log('this.statusitem', this.statusitem)
    },
    async getFlow () {
      await axios.get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          this.flowNameitem.push(d.flowName)
        }
        console.log('rs2', this.flowNameitem)
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async getCard () {
      this.Carditem = []
      for (let i = 0; i < this.flowNameitem.length; i++) {
        let d = this.flowNameitem[i]
        // console.log('d', d)
        let aa = []
        for (let a = 0; a < this.dataitem.filter(item => item.flowName === d).length; a++) {
          let ff = this.dataitem.filter(item => item.flowName === d)[a]
          let s = {}
          s.label = ff.stepTitle
          s.value = ff.totalJob - ff.closeJob
          aa.push(s)
        }
        console.log('aa', aa)
        // this.Carditem.push(this.dataitem.filter(item => item.flowName === d)).map(function (row) {
        //   return {
        //     label: row.stepTitle,
        //     value: row.totalJob
        //   }
        // })
        // let s = {}
        // s.flowName = this.dataitem.filter(item => item.flowName === d).map(row => { return row.flowName })[0]
        // s.stepTitle = this.dataitem.filter(item => item.flowName === d).map(row => { return row.stepTitle })
        // s.Jobitem = this.dataitem.filter(item => item.flowName === d).map(row => { return row.totalJob })
        // s.closeJob = this.dataitem.filter(item => item.flowName === d).map(row => { return row.closeJob })
        this.Carditem.push(aa)
      }
      console.log(' this.Carditem', JSON.stringify(this.Carditem))
      // setTimeout(() => {
      //   this.renderChart()
      // }, 2000)
    }
    // async renderChart () {
    //   const chart = new D3Funnel('#' + this.ID + this.flowNameitem[0])
    //   chart.draw(this.data, this.options)
    //   const chart2 = new D3Funnel('#' + this.ID + this.flowNameitem[1])
    //   chart2.draw(this.data, this.options)
    // }
  }
}
</script>
<style lang="">

</style>
