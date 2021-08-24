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
        <v-row>
          <!-- FromDataShow -->
            <v-col clos="5">
              <template>
              <div class="text-center">
              <v-card>
              <v-form>
              <v-row>
                <v-col cols="12" >
                <v-subheader>Flow</v-subheader>
                  <v-select
                  v-model="formAdd.flowCode"
                  :items="editedItemSelete"
                  label="Selects"
                  @change="flowfieldtest() , pushmessagToGroup(formAdd.flowCode) "
                  >
                  </v-select>
                      <v-subheader>SHOWFORM
                      </v-subheader>
                      <v-card>
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
                                  ></v-text-field>
                                  </div>
                                  <br/>
                                  <div v-if="p.fieldType == 'number'">
                                  <p>{{p.fieldName}}</p>
                                  <v-text-field
                                    v-model="p.fieldValue"
                                    :label="p.fieldName"
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
                              <br/>
                              <br/>
                              <br/>
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
// import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
// import XLSX from 'xlsx' // import xlsx
// import readXlsxFile from 'read-excel-file'
// import moment from 'moment' // แปลง date

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    Menu
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
      path: '/flow/', // Path Model
      // Menu Config
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
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 9,
        precision: 0
      },
      selectTypeField: [
        { text: 'Text', value: 'text' },
        { text: 'Number', value: 'number' },
        { text: 'Datetime', value: 'dateTime' },
        { text: 'Dropdown', value: 'dropdown' },
        { text: 'Radio_buttons', value: 'Radio_buttons' }
      ],

      // End Menu Config
      dataReady: true,
      canvas: true,
      dateTime: '', // Generate DateTime
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      dialogDeleteF: false,
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      // Search All
      searchAll: '',
      searchAll2: '',
      formAdd: {
        flowId: '',
        fieldId: [],
        fieldName: '',
        optionField: '',
        flowCode: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      formUpdate: {
        fieldId: '',
        fieldName: '',
        fieldType: '',
        LAST_USER: '',
        flowCode: ''
      },
      formSelect: {
        flowId: '',
        flowCode: '',
        flowName: ''
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
      // filesAdd: null,
      // filesUpdate: null
      // End Data Table Config
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    this.getCustomField()
  },
  methods: {
    getCustomField () {
      this.editedItemSelete = []
      axios.get(this.DNS_IP + '/flow/get').then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.flowName
            d.value = d.flowCode
            this.editedItemSelete.push(d)
          }
        }console.log(this.editedItemSelete)
      })
    },
    pushmessagToGroup (flowCode) {
      this.GroupId = []
      axios.get(this.DNS_IP + '/LineGroupFlow/get?flowCode=' + flowCode).then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            this.GroupId.push(d.GroupId)
          }
        }
        console.log('GroupId', this.GroupId)
      })
    },
    flexData (item) {
      if (item.length > 0) {
        for (var i = 0; i < item.length; i++) {
          var d = item[i]
          if (d.showCard === false) {
            var t = {
              'type': 'text',
              'text': d.fieldName + ':' + d.fieldValue,
              'size': 'md'
            }
            this.dtitem.push(t)
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
          var d = flowfieldName[i]
          var s = {}
          if (d.showCard) {
            s.fieldId = d.fieldId
            s.flowId = tt[0].flowId
            s.fieldName = d.fieldName
            s.optionField = d.optionField
            s.conditionField = d.conditionField
            s.fieldType = d.fieldType
            s.fieldValue = ''
            s.CREATE_USER = ''
            s.LAST_USER = ''
            s.showCard = false
            s.conditionValue = d.value
            if (d.conditionField !== '') {
              s.conditionFieldId = this.flowfieldNameitem.filter((row) => { return row.fieldName === d.conditionField })[0]['fieldId']
            } else {
              s.conditionField = ''
            }
            this.form1[d.fieldId] = ''
            this.flowfieldNameitem.push(s)
          }
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
    async searchDataAll () {
      var search =
        '?levelId=' + this.searchAll +
         '&name=' + this.searchAll +
         '&Point=' + this.searchAll +
         '&priviledge=' + this.searchAll
      this.dataReady = false
      this.searchDataAllGlobal(this.DNS_IP, this.path, search)
    },
    // async getDataById (item) {
    //   console.log(item)
    //   this.dataReady = false
    //   await this.getDataByIdGlobal(this.DNS_IP, this.path, 'flow', item.flowId)
    // },
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
          var dtitem = this.dtitem
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
                var d = GG[i]
                var flex = {
                  'to': d,
                  'messages': [
                    {
                      'type': 'flex',
                      'contents': {
                        'type': 'bubble',
                        'body': {
                          'type': 'box',
                          'layout': 'vertical',
                          'contents': dtitem
                        },
                        'footer': {
                          'type': 'box',
                          'layout': 'vertical',
                          'contents': [
                            {
                              'type': 'separator',
                              'color': '#000000'
                            },
                            {
                              'type': 'button',
                              'action': {
                                'type': 'uri',
                                'label': 'action',
                                'uri': 'http://linecorp.com/'
                              },
                              'style': 'secondary',
                              'height': 'sm',
                              'margin': 'md'
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
              }
              // Close Dialog
              // this.dialogAdd = false
              // Load Data
              // await this.getDataGlobal(this.DNS_IP, this.path)
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              await this.clearData()
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
