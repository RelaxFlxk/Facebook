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

              <v-form>
              <v-row>
                <v-col cols="12" >
               <v-sheet tile height="54" class="d-flex">

                 <!-- เลือกขั้นตอนบริการ -->
                  <v-col cols="12" sm="4">
                  <v-select
                  v-model="formAdd.flowCode"
                  :items="editedItemSelete"
                  label="เลือกขั้นตอนบริการ"
                  dense
                  outlined
                  hide-details
                  @change="flowfieldtest(formAdd.flowCode)"
                  >
                  </v-select>
                  </v-col>

                  <!-- สาขา -->
                    <v-col cols="12" sm="4">
                    <v-select
                      v-model="formAdd.masBranchName"
                      :items="DataBranchName"
                      @change="flowfieldtest()"
                      dense
                      outlined
                      hide-details
                      label="สาขา"
                    ></v-select>
                    </v-col>
                   </v-sheet>
                    <br>
                      <!-- <v-card v-show="formAdd.flowCode && formAdd.masBranchName !== '' "
                      class="mx-auto"
                      max-width="500"> -->
                       <v-card v-show="formAdd.flowCode && formAdd.masBranchName !== '' "  max-width="450%">
                          <v-container>
                            <v-row justify="center">
                              <v-col cols="6">
                                <v-col style="margin-left: 1px;">
                              <v-img :src="require('@/assets/newcarAdd.png')"></v-img>
                              </v-col>
                            </v-col>
                              <v-col cols="6">
                                 <v-col class="text-center">
                              <v-img class="v_text_new" :src="require('@/assets/NewcarText.png')"></v-img>
                              </v-col>
                              <div v-for="(p , index) in flowfieldNameitem" :key="index">
                                <div v-show="p.conditionField === '' || p.conditionField === null ">
                                  <div>
                                  <div v-if="p.fieldType == 'text'">
                                    <br>
                                  <v-text-field
                                     v-model="p.fieldValue"
                                    :label="p.fieldName"
                                    :rules ="[rules.required]"
                                    outlined
                                  ></v-text-field>
                                  </div>
                                  <div v-if="p.fieldType == 'number'">
                                    <br>
                                  <!-- <p>{{p.fieldName}}</p> -->
                                  <v-text-field
                                    v-model="p.fieldValue"
                                    :label="p.fieldName"
                                    :rules ="[rules.required]"
                                    outlined
                                  ></v-text-field>
                                  </div>
                                  <v-row>
                                  <v-col cols="12" v-if="p.fieldType== 'Autocompletes'">
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
                                  <v-col cols="12" v-if="p.fieldType== 'Selects'">
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
                                    <br>
                                    <v-container fluid>
                                      <p>{{p.fieldName}}</p>
                                      <v-radio-group
                                      column
                                      v-model="p.fieldValue">
                                        <template v-slot:label>
                                        </template>
                                        <div v-for="radios in JSON.parse(p.optionField)" :key="radios.toISOString" class="text-center">
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
                                <div v-if="p.conditionField !== '' && flowfieldNameitem.filter((row) => { return row.fieldId === parseInt(p.conditionField)}).length > 0">
                                  <div v-if="p.conditionValue === flowfieldNameitem.filter((row) => { return row.fieldId === parseInt(p.conditionField)})[0].fieldValue ">
                                  <v-col cols="12" v-if="p.fieldType== 'Autocompletes'">
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
                                  <v-col cols="12" v-if="p.fieldType== 'Selects'">
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
                                    <div v-if="p.fieldType== 'Radio'">
                                    <br>
                                    <v-container fluid>
                                      <p>{{p.fieldName}}</p>
                                      <v-radio-group row
                                      v-model="p.fieldValue">
                                        <template v-slot:label>
                                        </template>
                                        <div v-for="radios in JSON.parse(p.optionField)" :key="radios.toISOString" class="text-center">
                                        <v-radio
                                          :label="radios.text"
                                          :value="radios.value"
                                        ></v-radio>
                                        </div>
                                      </v-radio-group>
                                    </v-container>
                                  </div>
                                  </v-col>
                                  </div>
                                </div>
                              </div>

  <v-row>
    <v-col cols="6">
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
              v-model="endDate"
              label="วันที่นัดส่งรถลูกค้า"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="endDate"
            no-title
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
    </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="endTime"
                  label="เวลา"
                  type="time"
                  suffix=""
                  required
                ></v-text-field>
              </v-col>
            </v-row>

                              <br/>
                              <v-btn depressed dark color=red
                              @click="addData()">
                                  Save
                                </v-btn>
                                <v-btn depressed dark color="#1B437C"
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
          text: 'รับรถลูกค้ารายใหม่',
          disabled: false,
          href: '/Master/CustomTable'
        }
      ],
      showCard: false,
      DataBranchName: [],
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
      endDate: '',
      endTime: '',
      checkCar: 'False',
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      formAdd: {
        flowId: '',
        fieldId: [],
        fieldName: '',
        optionField: '',
        flowCode: '',
        CREATE_USER: '',
        LAST_USER: '',
        masBranchName: ''
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
    async getCustomField () {
      this.editedItemSelete = []
      axios.get(this.DNS_IP + '/flow/get?shopId=' + this.shopId).then((response) => {
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
      axios.get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.masBranchName
            d.value = d.masBranchID
            this.DataBranchName.push(d)
          }
        }
      })
    },
    flowfieldtest (item) {
      let itemIncustomField = []
      axios.get(this.DNS_IP + '/flowField/get?flowCode=' + this.formAdd.flowCode + '&shopId=' + this.shopId).then((response) => {
        let tt = response.data
        // console.log('tt', tt)
        let flowId = tt[0].flowId
        let flowfieldName = []
        flowfieldName = JSON.parse(tt[0].flowfieldName)
        for (let a = 0; a < flowfieldName.length; a++) {
          let d = flowfieldName[a]
          itemIncustomField.push(d.fieldId)
        }
        this.getCustomfield(itemIncustomField, flowId)
        // console.log('itemIncustomField', itemIncustomField)
      })
    },
    async getCustomfield (item, flowId) {
      this.flowfieldNameitem = []
      await axios.get(this.DNS_IP + '/customField/fieldId?fieldId=' + item)
        .then(async response => {
          let rs = response.data
          console.log('rs', rs)
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.fieldId = d.fieldId
            s.flowId = flowId
            s.fieldName = d.fieldName
            s.optionField = d.optionField
            s.conditionField = d.conditionField
            s.fieldType = d.fieldType
            s.fieldValue = ''
            s.CREATE_USER = ''
            s.LAST_USER = ''
            s.showCard = d.showCard
            s.shopId = this.shopId
            s.endDate = ''
            s.endTime = ''
            s.checkCar = 'False'
            s.conditionValue = d.conditionValue
            // if (d.conditionField !== '') {
            //   s.conditionFieldId = this.flowfieldNameitem.filter((row) => { return row.fieldId === d.conditionField })['fieldId']
            // } else {
            //   s.conditionField = ''
            // }
            this.form1[d.fieldId] = ''
            this.flowfieldNameitem.push(s)
            console.log('flowfieldNameitem', this.flowfieldNameitem)
          }
          setTimeout(() => this.validate(), 500)
        })
        .catch((error) => {
          console.log('error function addData : ', error)
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
      this.flowfieldNameitem[0].endDate = this.endDate
      this.flowfieldNameitem[0].endTime = this.endTime
      this.flowfieldNameitem[0].CREATE_USER = this.session.data.userName
      this.flowfieldNameitem[0].LAST_USER = this.session.data.userName
      console.log('flowfieldNameitem', this.flowfieldNameitem)
      let Add = []
      let fielditem = this.flowfieldNameitem
      for (let i = 0; i < this.flowfieldNameitem.length; i++) {
        let d = this.flowfieldNameitem[i]
        let update = {}
        if (d.conditionField === '' || d.conditionField === null) {
          update.CREATE_USER = update.CREATE_USER
          update.LAST_USER = update.LAST_USER
          update.checkCar = d.checkCar
          update.conditionField = d.conditionField
          update.conditionValue = d.conditionValue
          update.endDate = d.endDate
          update.endTime = d.endTime
          update.fieldId = d.fieldId
          update.fieldName = d.fieldName
          update.fieldType = d.fieldType
          update.fieldValue = d.fieldValue
          update.flowId = d.flowId
          update.optionField = d.optionField
          update.shopId = d.shopId
          update.showCard = d.showCard
          Add.push(update)
        } else {
          if (fielditem.filter((row) => { return row.fieldId === parseInt(d.conditionField) }).length > 0) {
            console.log('this', fielditem)
            if (d.conditionValue === fielditem.filter((row) => { return row.fieldId === parseInt(d.conditionField) })[0].fieldValue) {
              update.CREATE_USER = update.CREATE_USER
              update.LAST_USER = update.LAST_USER
              update.checkCar = d.checkCar
              update.conditionField = d.conditionField
              update.conditionValue = d.conditionValue
              update.endDate = d.endDate
              update.endTime = d.endTime
              update.fieldId = d.fieldId
              update.fieldName = d.fieldName
              update.fieldType = d.fieldType
              update.fieldValue = d.fieldValue
              update.flowId = d.flowId
              update.optionField = d.optionField
              update.shopId = d.shopId
              update.showCard = d.showCard
              Add.push(update)
            }
          }
        }
      }
      console.log('Add', Add)
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
          this.shopId = this.shopId
          this.endDate = this.endDate
          this.endTime = this.endTime
          this.checkCar = this.checkCar
          console.log('Add', Add)
          console.log('checkCar', this.checkCar)
          console.log('endDate', this.endDate)
          console.log('endTime', this.endTime)
          console.log('shopId', this.shopId)
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + '/job/add', Add
            )
            .then(async (response) => {
              // Debug response
              console.log('addDataGlobal DNS_IP + /job/add', response)
              console.log('data', response)
              let updateStatusSend = {
                updateStatusSend: 'false'
              }
              await axios
                .post(
                  this.DNS_IP + '/job/pushQr/' + response.data.jobNo, updateStatusSend
                )
                .then(
                  this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success'),
                  this.clearData()
                  // this.$router.push('/Master/FlowStep')
                ).catch((error) => {
                  console.log('error function addDataGlobal : ', error)
                })
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
      this.formAdd.masBranchName = ''
      this.dtname = []
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
