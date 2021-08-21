<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn color="primary" depressed @click="add()">
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
            </v-btn>
          </v-col>
        </v-row>

        <v-col cols="12" sm="4">
          <v-select
            :items="DataFlowName"
            v-model="formUpdate.flowName"
            required
            dense
            outlined
            @change="getStepFlow()"
          ></v-select>
        </v-col>

        <v-row>
          <v-col cols="3" v-for="(itemsStep, indexStep) in stepItemSelete" :key="indexStep">
            <v-card>
              <v-card-title class="text-center">
                <h3>{{ itemsStep.stepTitle }}</h3>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                 <draggable class="list-group" group="people" @change="log">
                  <div class="column is-3" v-for="(itemsJob, indexJob) in allJob.filter((row) => {return row.stepId == itemsStep.stepId})" :key="indexJob">
                <v-list-item>
                    <v-alert
                      dismissible
                      color="cyan"
                      border="left"
                      elevation="2"
                      colored-border
                    >
                  <div class="column is-3" v-for="(items, index) in JobDataItem.filter((row) => {return row.jobId == itemsJob.jobId})" :key="index">
                    <strong>{{ items.fieldName }}: </strong>{{ items.fieldValue}}<br>
                  </div>
                    </v-alert>
                </v-list-item>
                  </div>
                  </draggable>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios' // api
import draggable from 'vuedraggable'
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'

export default {
  name: 'hello',
  components: {
    draggable,
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'Flow',
          disabled: false,
          href: '/Master/Flow'
        }
      ],
      session: this.$session.getAll(),
      stepItemSelete: [],
      DataFlowName: [],
      formUpdate: {
        stepId: '',
        flowId: '',
        flowName: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      JobDataItem: [],
      allJob: [],
      form: {
        jobId: '',
        flowId: '',
        stepId: '',
        fieldId: '',
        fieldValue: '',
        fieldName: ''
      }
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    await this.getDataFlow()
  },
  methods: {
    getDataFlow () {
      this.DataFlowName = []
      axios.get(this.DNS_IP + '/flow/get').then(response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.flowName
            d.value = d.flowId
            this.DataFlowName.push(d)
          }
        }
      })
    },
    getStepFlow () {
      this.stepItemSelete = []
      axios
        .get(this.DNS_IP + '/flowStep/get?flowId=' + this.formUpdate.flowName)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.stepTitle
              d.value = d.stepTitle
              this.stepItemSelete.push(d)
            }
            console.log(this.formUpdate)
            this.getJobData()
          }
        })
    },
    async getJobData () {
      this.JobDataItem = []
      axios
        .get(this.DNS_IP + '/job/get?flowId=' + this.formUpdate.flowName)
        .then(async (response) => {
          this.dataReady = true
          var jobs = []
          console.log('res', response.data)
          if (response.data) {
            response.data.forEach(element => {
              if (jobs.indexOf(element.jobId) === -1) {
                jobs.push(element.jobId)
                this.allJob.push({jobId: element.jobId, stepId: element.stepId})
              }
            })
            this.JobDataItem = response.data
          }
        })
    },
    async add () {
      this.$router.push('/Master/RegisterAdd')
    },
    log: function (evt) {
      window.console.log(evt)
    }
  }
}
</script>
