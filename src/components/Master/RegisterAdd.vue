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
        <v-row>
          <!-- FromDataShow -->
            <v-col clos="5">
              <template>
              <div class="text-center">
              <v-card>
              <v-form>
              <v-row>
                <v-col cols="12" >
               <v-sheet tile height="54" class="d-flex">
                  <v-col cols="12" sm="4">
                  <v-select
                  v-model="formAdd.flowCode"
                  :items="editedItemSelete"
                  label="เลือกขั้นตอนบริการ"
                  dense
                  outlined
                  hide-details
                  @change="flowfieldtest() , pushmessagToGroup(formAdd.flowCode) "
                  >
                  </v-select>
                  </v-col>

                  <!-- สาขา -->
                    <v-col cols="12" sm="4">
                    <v-select
                      :items="DataBranchName"
                      v-model="masBranchName"
                      @change="getStepFlow() , getLayout()"
                      dense
                      outlined
                      hide-details
                      label="สาขา"
                    ></v-select>
                    </v-col>
                   </v-sheet>
                    <br>
                      <v-card v-show="formAdd.flowCode !== '' "
                      class="mx-auto"
                      max-width="500">
                          <v-container>
                            <v-row>
                              <v-col cols="1"></v-col>
                              <v-col cols="12">
                              <div v-for="(p , index) in flowfieldNameitem" :key="index">
                                <div v-show="((p.conditionField == '') || (flowfieldNameitem.filter((row) => { return row.fieldName === p.conditionField })[0]['fieldValue'] == p.conditionValue))">
                                  <div v-if="p.fieldType == 'text'">
                                    <p>{{form1[p.fieldId]}}</p>
                                  <v-text-field
                                     v-model="p.fieldValue"
                                    :label="p.fieldName"
                                    :rules ="[rules.required]"
                                  ></v-text-field>
                                  </div>
                                  <br/>
                                  <div v-if="p.fieldType == 'number'">
                                  <p>{{p.fieldName}}</p>
                                  <v-text-field
                                    v-model="p.fieldValue"
                                    :label="p.fieldName"
                                    :rules ="[rules.required]"

                                  ></v-text-field>
                                  </div>
                                  <div v-if="p.fieldType == 'dateTime'">
                                    <p>{{p.fieldName}}</p>
                                  <v-menu
                                    ref="menu1"
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="auto"
                                    :rules ="[rules.required]"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="p.fieldValue"
                                        label="Date"
                                        hint="MM/DD/YYYY format"
                                        persistent-hint
                                        prepend-icon="mdi-calendar"
                                        v-bind="attrs"
                                        @blur="date = parseDate(dateFormatted)"
                                        v-on="on"
                                        :rules ="[rules.required]"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="p.fieldValue"
                                      no-title
                                      @input="menu1 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                  <p>Date in ISO format: <strong>{{ date }}</strong></p>
                                  </div>
                                  <v-row>
                                  <v-col cols="8" v-if="p.fieldType== 'Autocompletes'">
                                    <p>{{p.fieldName}}</p>
                                    <v-autocomplete
                                      v-model="p.fieldValue"
                                      :items="JSON.parse(p.optionField)"
                                      dense
                                      filled
                                      label="Search"
                                      :rules ="[rules.required]"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="8" v-if="p.fieldType== 'Selects'">
                                    <div>
                                    <p>{{p.fieldName}}</p>
                                    <v-select
                                      v-model="p.fieldValue"
                                      :items="JSON.parse(p.optionField)"
                                      menu-props="auto"
                                      label="Select"
                                      hide-details
                                      solo
                                    ></v-select>
                                    </div>
                                  </v-col>
                                  </v-row>
                                  <div v-if="p.fieldType== 'Radio'">
                                    <!-- <p>{{p.fieldName}}</p> -->
                                    <v-container fluid>
                                      <v-radio-group row
                                      v-model="p.fieldValue">
                                        <template v-slot:label>
                                        </template>
                                        <div v-for="radios in JSON.parse(p.optionField)" :key="radios.toISOString">
                                        <v-radio
                                          :label="radios.text"
                                          :value="radios.value"
                                        ></v-radio>
                                        </div>
                                      </v-radio-group>
                                    </v-container>
                                  </div>
                                  </div>
                              </div>

    <v-col cols="12">
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="delivDate"
              label="วันที่นัดส่งรถลูกค้า"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="delivDate"
            no-title
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
    </v-col>

                              <br/>
                              <v-btn depressed
                              @click="addData()">
                                  Save
                                </v-btn>
                                <v-btn depressed
                              @click="clearData()">
                                  Clear
                                </v-btn>
                              </v-col>
                              <v-col cols="1"></v-col>
                            </v-row>
                          </v-container>
                        </v-card>

                </v-col>
                </v-row>
              </v-form>
              </v-card>
                   </div>
              </template>
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
// import moment from 'moment' // แปลง date

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    Menu
  },
  data () {
    return {
      PK: '',
      path: '/flow/', // Path Model
      // Menu Config
      dtname: [],
      dtitem: [],
      GroupId: [],
      editedItemSelete: [],
      flowfieldNameitem: [],
      flowCode: '',
      form1: {},
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'AddFormJob',
          disabled: false,
          href: '/Master/CustomTable'
        }
      ],
      showCard: false,
      DataBranchName: [],
      masBranchName: '',
      delivDate: '',
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 9,
        precision: 0
      },

      // End Menu Config
      dataReady: true,
      canvas: true,
      dateTime: '', // Generate DateTime
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      session: this.$session.getAll(),
      formAdd: {
        flowId: '',
        fieldId: [],
        fieldName: '',
        optionField: '',
        flowCode: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      rules: {
        numberRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: value => value.length <= 10 || 'Max 10 characters',
        IDcardRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        required: value => !!value || 'กรุณากรอก.',
        resizeImag: value =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
        counterIDcard: value => value.length <= 13 || 'Max 13 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        { text: 'FieldId', value: 'fieldId' },
        { text: 'FieldName', value: 'fieldName' },
        { text: 'Type', value: 'fieldType' },
        { text: 'Option', value: 'optionField' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      validAdd: false,
      validUpdate: false
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    this.getCustomField()
    this.getDataBranch()
  },
  methods: {
    getCustomField () {
      this.editedItemSelete = []
      axios.get(this.DNS_IP + '/flow/get').then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            d.text = d.flowName
            d.value = d.flowCode
            this.editedItemSelete.push(d)
          }
        }console.log(this.editedItemSelete)
      })
    },
    getDataBranch () {
      this.DataBranchName = []
      console.log('DataBranchName', this.DataBranchName)
      axios.get(this.DNS_IP + '/master_branch/get').then(response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.masBranchName
            d.value = d.masBranchID
            this.DataBranchName.push(d)
          }
        } else {
          this.DataBranchName = []
        }
      })
    },
    pushmessagToGroup (flowCode) {
      this.GroupId = []
      axios.get(this.DNS_IP + '/LineGroupFlow/get?flowCode=' + flowCode).then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            this.GroupId.push(d.GroupId)
          }
        }
        console.log('GroupId', this.GroupId)
      })
    },
    flexData (item) {
      if (item.length > 0) {
        let showCD = item.filter((dt) => {
          return dt.showCard === true
        })
        for (let i = 0; i < showCD.length; i++) {
          let d = showCD[i]
          if (d.fieldName === 'ชื่อ') {
            let dtitem = {
              'type': 'text',
              'text': 'คุณ' + '' + '' + d.fieldValue,
              'align': 'start',
              'size': 'lg',
              'weight': 'bold'
            }
            this.dtname.push(dtitem)
          } else {
            let n = [ {
              'type': 'text',
              'text': d.fieldName + ':'
            },
            {
              'type': 'text',
              'text': d.fieldValue,
              'align': 'start'
            }]
            var flex = {
              'type': 'box',
              'layout': 'baseline',
              'contents': n,
              'spacing': 'none',
              'margin': 'md'
            }
            this.dtitem.push(flex)
          }
        }
      }
    },
    flowfieldtest () {
      this.flowfieldNameitem = []
      axios.get(this.DNS_IP + '/flowField/get?flowCode=' + this.formAdd.flowCode).then((response) => {
        let tt = response.data
        console.log(tt)
        var flowfieldName = []
        flowfieldName = JSON.parse(tt[0].flowfieldName)
        for (var i = 0; i < flowfieldName.length; i++) {
          let d = flowfieldName[i]
          let s = {}
          s.fieldId = d.fieldId
          s.flowId = tt[0].flowId
          s.fieldName = d.fieldName
          s.optionField = d.optionField
          s.conditionField = d.conditionField
          s.fieldType = d.fieldType
          s.fieldValue = ''
          s.CREATE_USER = ''
          s.LAST_USER = ''
          s.showCard = d.showCard
          s.conditionValue = d.value
          if (d.conditionField !== '') {
            s.conditionFieldId = this.flowfieldNameitem.filter((row) => { return row.fieldName === d.conditionField })[0]['fieldId']
          } else {
            s.conditionField = ''
          }
          this.form1[d.fieldId] = ''
          this.flowfieldNameitem.push(s)
          console.log(this.flowfieldNameitem)
        }
      })
    },
    validate (Action) {
      switch (Action) {
        case 'ADD':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_add.validate()
          })
          break
        case 'UPDATE':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_update.validate()
          })
          break

        default:
          break
      }
    },
    async addData (p) {
      this.dataReady = false
      this.$swal({
        title: 'ต้องการ เพิ่มข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          var GG = this.GroupId
          this.formAdd.CREATE_USER = this.session.data.userName
          this.formAdd.LAST_USER = this.session.data.userName
          this.flexData(this.flowfieldNameitem)
          var Text = JSON.stringify(this.dtitem)
          var flexitem = JSON.parse(Text)
          console.log('checkdata', this.flowfieldNameitem)
          console.log('showflex', flexitem)
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + '/job/add',
              this.flowfieldNameitem

            )
            .then(async (response) => {
              // Debug response
              console.log('addDataGlobal DNS_IP + /job/add', response)
              console.log('data', response)
              for (var i = 0; i < GG.length; i++) {
                var dtgroupId = GG[i]
                var flex = {
                  'to': dtgroupId,
                  'messages': [
                    {
                      'type': 'flex',
                      'contents': {
                        'type': 'bubble',
                        'size': 'kilo',
                        'direction': 'ltr',
                        'body': {
                          'type': 'box',
                          'layout': 'vertical',
                          'contents': [
                            {
                              'type': 'box',
                              'layout': 'baseline',
                              'contents': this.dtname
                            },
                            {
                              'type': 'box',
                              'layout': 'vertical',
                              'contents': flexitem
                            },
                            {
                              'type': 'box',
                              'layout': 'vertical',
                              'contents': [
                                {
                                  'type': 'button',
                                  'action': {
                                    'type': 'uri',
                                    'label': 'QR CODE',
                                    'uri': 'http://localhost:8080/Master/JobQrCode?jobNo=' + response.data.jobNo
                                  },
                                  'style': 'secondary',
                                  'height': 'sm',
                                  'offsetTop': 'none'
                                }
                              ],
                              'margin': 'xl'
                            }
                          ]
                        }
                      },
                      'altText': 'Flex Message'
                    }
                  ]}
                console.log('ssssssssssss', flex)
                await axios
                  .post(
                    this.DNS_IP + '/LineGroupFlow/pushmessage', flex
                  )
                  .then(
                    this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success'),
                    this.clearData(),
                    this.$router.push('/Master/FlowStep')
                  )
              }
            })
          // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              console.log('error function addDataGlobal : ', error)
              this.dataReady = true
            })
        })
        .catch((error) => {
          console.log('error function addData : ', error)
          this.dataReady = true
        })
    },
    async clearData () {
      // eslint-disable-next-line no-redeclare
      this.formAdd.flowCode = ''
      this.dtname = []
      this.dtitem = []
      this.GroupId = []
      for (var key in this.flowfieldNameitem) {
        if (this.flowfieldNameitem[key]) {
          this.flowfieldNameitem[key] = ''
        }
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
