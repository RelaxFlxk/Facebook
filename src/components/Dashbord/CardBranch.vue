<template lang="">
    <div v-if="Branchitems.length > 0">
      <v-row>
    <v-col cols="4">
      <center>
      <v-card class="mx-auto" elevation="5">
        <v-list-item two-line>
          <v-list-item-content>
              {{Branchitems[0]}}
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="text-h5" cols="12">{{statusitem[0].totalJob}}/{{statusitem[0].closeJob}}</v-col>
          </v-row>
        </v-card-text>

      </v-card>
      <br>
      <v-card class="mx-auto" elevation="5">
        <v-list-item two-line>
          <v-list-item-content>
              {{Branchitems[0]}}
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="text-h5" cols="12">{{statusitem[0].totalJob}}/{{statusitem[0].closeJob}}</v-col>
          </v-row>
        </v-card-text>

      </v-card>
      </center>
    </v-col>
  </v-row>
    </div>
</template>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import axios from 'axios'
export default {
  components: {
    'left-menu-admin': adminLeftMenu

  },
  data () {
    return {
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      Branchitems: [],
      statusitem: []
    }
  },
  async mounted () {
    await this.getBranch()
  },
  methods: {
    getBranch (masBranchID) {
      console.log('masBranchID', masBranchID)
      this.statusitem = []
      axios.get(this.DNS_IP + '/job_log/getReport_branch?shopId=' + this.shopId).then(response => {
        let rs = response.data
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          if (d.masBranchID === masBranchID) {
            let s = {}
            s.totalJob = d.totalJob
            s.closeJob = d.closeJob
            this.statusitem.push(s)
          }
        }
        console.log('dddd', this.statusitem)
        if (this.statusitem.length === 0) {
          console.log('dddd')
          let s = {}
          s.totalJob = 0
          s.closeJob = 0
          this.statusitem.push(s)
        }
        this.getMasbranch(masBranchID)
        console.log('this.statusitem', this.statusitem)
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async getMasbranch (masBranchID) {
      this.Branchitems = []
      axios.get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId + '&masBranchID=' + masBranchID).then(response => {
        let rs = response.data
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          this.Branchitems.push(d.masBranchName)
        }
        console.log('this.Branchitems', this.Branchitems)
      })
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
        })
    }
  }
}
</script>
<style lang="">

</style>
