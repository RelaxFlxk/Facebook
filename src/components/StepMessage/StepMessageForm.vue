<template>
    <v-dialog v-model="isDialogOpen" max-width="500px">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="isDialogOpen = false,this.item = []">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title> เพิ่มเทมเพลสตั้งเวลาเเจ้งเตือน</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>ตั้งค่าการส่ง</v-subheader>
          <v-form ref="form">
            <div class="radio-switch">
              <input
                type="radio"
                class="radio-switch-input"
                id="radio-switch-low"
                value="nomal"
                v-model="form.statusTitle"
              />
              <label
                class="radio-switch-label"
                for="radio-switch-low"
                :style="{
                  backgroundColor:
                    selectedOption === 'nomal' ? '#00a5fead' : '#fff',
                  color:
                    selectedOption === 'nomal' ? '#fff' : '#ddd',
                }"
                >nomal</label
              >

              <input
                type="radio"
                class="radio-switch-input"
                id="radio-switch-medium"
                value="extraJob"
                v-model="form.statusTitle"
              />
              <label
                class="radio-switch-label"
                for="radio-switch-medium"
                :style="{
                  backgroundColor:
                    selectedOption === 'extraJob' ? '#00a5fead' : '#fff',
                  color:
                    selectedOption === 'extraJob' ? '#fff' : '#ddd',
                }"
                >extraJob</label
              >
              <input
                type="radio"
                class="radio-switch-input"
                id="radio-switch-high"
                value="fastTrack"
                v-model="form.statusTitle"
              />
              <label
                class="radio-switch-label"
                for="radio-switch-high"
                :style="{
                  backgroundColor:
                    selectedOption === 'fastTrack' ? '#00a5fead' : '#fff',
                  color:
                    selectedOption === 'fastTrack' ? '#fff' : '#ddd',
                }"
                >fastTrack</label
              >
            </div>
            <!-- {{ form }} -->
            <v-text-field
              v-model="form.title"
              :value="form.title"
              :counter="200"
              label="หัวข้อ"
              required
            ></v-text-field>
            <v-textarea
              v-model="form.text"
              :value="form.text"
              auto-grow
              label="คำอธิบาย"
              rows="1"
            ></v-textarea>
            <v-text-field
              v-model="form.date"
              min="0"
              type="number"
              label="หลังจากสมัครส่งในอีกกี่วัน"
              required
            ></v-text-field>
            <!-- <v-row justify="center" v-else  style="padding-left: 45px; margin-top: -20px">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="form.dateFull"
                    label="รูปแบบวันที่ส่ง"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.dateFull"
                  @input="menu2 = false"
                  :min="new Date().toISOString().substr(0, 10)"
                ></v-date-picker>
              </v-menu>
            </v-row> -->
            <v-list-item style="background-color: #fff !important;color: rgb(51, 51, 51) !important;">
              <v-list-item-action>
                <v-checkbox
                  v-model="form.logData"
                  @change="toggleLogDatacheckbox"
                  false-value="false"
                  true-value="true"
                  :on-icon="'mdi-check-circle'"
                  :off-icon="'mdi-checkbox-blank-circle-outline'"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title style="background-color: #fff !important;color: rgb(51, 51, 51) !important;">เก็บข้อมูลตอบกลับ</v-list-item-title >
                <v-list-item-subtitle>เงื่อนไขเก็บข้อมูล</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <div v-if="form.logData === true || form.logData === 'true'" class="row col-md-12 col-sm-12">
              <div  class="col-sm-4 col-md-4 col-xs-4 set-datafeild"
                v-for="(dataLog, i) in logget"
                :key="i"
               >
                <div id="itemFieldLog" class="fixcolor fixpadding">
                 <v-checkbox
                  :on-icon="'mdi-check-circle'"
                  :off-icon="'mdi-checkbox-blank-circle-outline'"
                  v-model="dataLog.id"
                  :label="dataLog.fieldName"
                ></v-checkbox>
                </div>
              </div>
            </div>

            <v-switch
            v-model="form.status"
                  color="#00a5fead"
                  true-value="Active"
                  false-value="Close"
                  hide-details
              inset
              label="สถานะใช้งาน"
              style="padding: 1px 20px 40px 20px"
            >
            </v-switch>
              <v-btn class="col-md-12" color="#1876d2" large @click="editItem" style="color: #fff;"> submit </v-btn>
          </v-form>
        </v-list>
      </v-card>
    </v-dialog>
  </template>

<script scope>
import axios from 'axios'
import moment from 'moment'
// import StepMessage from './StepMessage.vue'
export default {
  components: {
    // StepMessage
  },
  // props: ["isOpen", "fields", "desserts_data","params"],
  computed: {
    selectedOption () {
      if (this.form.statusTitle) {
        return this.form.statusTitle
      } else {
        return 'nomal'
      }
    }
    // formattedDate () {
    //   const dateFromPicker = new Date(this.form.dateFull)

    //   // แปลงเป็นรูปแบบ "2023-07-01 01:35:20"
    //   return dateFromPicker.toISOString().slice(0, 19).replace('T', ' ')
    // }
  },
  data () {
    return {
      DNS_IPS: 'http://localhost:5004/',
      switchLevel: 'low',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      form: {
        statusTitle: 'nomal',
        title: '',
        status: '',
        date: '',
        dateFull: null,
        loopStatus: '',
        dataField: '',
        shopId: 'U63f4a14fe78b8bf8414c1d197e432954',
        logData: false,
        masBranchID: '',
        flowId: ''
      },
      checkbox2: false,
      checkbox3: true,
      Fielditem: [],
      logget: [],
      dataLog: [],
      model: true,
      isDialogOpen: false,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      name: null,
      phoneNumber: '',
      email: '',
      select: null,
      checkbox: null,
      dataSetItem: [],
      editAlert: {
        title: 'แก้ไข สำเร็จ',
        icon: 'success',
        type: 'success',
        showConfirmButton: false
      },
      addAlert: {
        title: 'เพิ่มข้อมูล สำเร็จ',
        icon: 'success',
        type: 'success',
        showConfirmButton: false
      }
    }
  },
  mounted () {
    this.setDataCustomField()
  },
  methods: {
    toggleLogDatacheckbox () {
      if (this.form.logData === false) {
        this.checkbox2 = true
      }
    },
    closeDialog () {
      this.$emit('close-dialog')
    },

    submit () {
      this.$refs.observer.validate()
    },
    // clear () {
    //   this.checkbox = null
    //   this.$refs.observer.reset()
    // },
    async setData (item, ref) {
      console.log('itemitemitem', item)
      if (item !== undefined) {
        if (item.id !== '0') {
          console.log('เข้า')
          this.id = item.id
          if (item.statusTitle) {
            this.form.statusTitle = item.statusTitle
          }
          if (item.shopId) {
            this.form.shopId = item.shopId
          }
          if (item.flowId) {
            this.form.flowId = item.flowId
          }
          if (item.masBranchID) {
            this.form.masBranchID = item.masBranchID
          }
          this.form.title = item.title
          this.form.status = item.status
          if (item.loopStatus !== undefined) {
            this.form.loopStatus = item.loopStatus === 'true' // แปลงเป็นค่า Boolean
          } else {
            this.form.loopStatus = true
          }
          this.form.date = item.date
          if (item.dateFull) {
            this.form.dateFull = moment(item.dateFull).format('YYYY-MM-DD')
          } else {
            this.form.dateFull = moment().format('YYYY-MM-DD')
          }
          if (item.logData !== undefined) {
            this.form.logData = item.logData.toLowerCase()
          }
          this.form.text = item.text
          if (item.dataField !== undefined) {
            this.form.dataField = JSON.parse(item.dataField)
          }
          this.isDialogOpen = true
          if (this.logget !== undefined) {
            if (this.logget && this.logget.length > 0) {
              this.form.dataField.forEach(dataFieldItem => {
                this.logget.map((logItem, i) => {
                  if (logItem.fieldId === dataFieldItem.fieldId) {
                    logItem.id = true
                  }
                })
              })
            }
          }
        } else {
          this.id = item.id
          console.log('เข้า  else')
          this.id = 0
          if (item.statusTitle) {
            this.form.statusTitle = item.statusTitle
          }
          if (item.shopId) {
            this.form.shopId = item.shopId
          }
          this.form.title = item.title
          this.form.status = item.status
          if (item.loopStatus !== undefined) {
            this.form.loopStatus = item.loopStatus === 'true' // แปลงเป็นค่า Boolean
          } else {
            this.form.loopStatus = true
          }
          this.form.date = item.date
          if (item.dateFull) {
            this.form.dateFull = moment(item.dateFull).format('YYYY-MM-DD')
          } else {
            this.form.dateFull = moment().format('YYYY-MM-DD')
          }
          if (item.logData !== undefined) {
            this.form.logData = item.logData.toLowerCase()
          }
          this.form.text = item.text
          if (item.dataField !== undefined) {
            this.form.dataField = JSON.parse(item.dataField)
          }
          this.isDialogOpen = true
          this.form.masBranchID = ref.masBranchID
          this.form.flowId = ref.flowId
        }
      }

      console.log('this.form.logData', this.form.logData)
    },
    setDataCustomField (item, ref) {
      try {
        const payload = {
          shopId: this.form.shopId,
          masBranchID: this.masBranchID,
          flowId: this.flowId
        }
        console.log('payload', payload)
        axios
          .get(this.DNS_IP + '/customField/get', {params: payload})
          .then(async res => {
            this.logget = res.data
            this.loggetonce = res.data[0]
            this.setData(item, ref)
            console.log('this.logget', this.logget)
          })
      } catch (error) {
        console.log(error)
      }
    },
    // selectOption (item) {
    //   if (item.value === this.form.statusTitle) {
    //     // ทำงานเมื่อค่าที่เลือกอยู่ในตัวเลือก
    //     // console.log('Selected Option:', item)
    //   } else {
    //     // ทำงานเมื่อค่าที่เลือกไม่อยู่ในตัวเลือก
    //     // console.log('Invalid Option:', item)
    //   }
    // },
    // toggleLogData () {
    //   this.form.logData = !this.form.logData
    // },
    editItem () {
      try {
        let formData = Object.assign({}, this.form, { dataField: '' })
        delete formData.dataFields
        if (this.logget && this.logget.length > 0) {
          let selectedLogs = this.logget.filter(
            (dataLog) => dataLog.id === true
          )
          let dataFieldArray = selectedLogs.map((d) => ({
            fieldId: d.fieldId
          }))
          if (this.form.dateFull !== 'Invalid date') {
            formData.dateFull = moment(this.form.dateFull).format(
              'YYYY-MM-DD HH:mm:ss'
            )
          }

          for (let i = 0; i < selectedLogs.length; i++) {
            let d = selectedLogs[i]
            if (d.logData === true) {
              dataFieldArray.push({
                fieldId: d.fieldId
              })
            }
          }

          formData.dataField = JSON.stringify(dataFieldArray)
        }

        console.log('formdddd', formData)

        if (this.id === 0) {
          console.log('Id........undefined')
          axios.post(this.DNS_IP + '/stepMessage/add', formData).then((res) => {
            // console.log('nnn : ', res)
            this.$swal(this.addtAlert)
            this.isDialogOpen = false
            this.item = []
            this.$emit('testDataInsert')
          })
        } else {
          console.log('Id........', formData)
          axios
            .post(this.DNS_IP + '/stepMessage/edit/' + this.id, formData)
            .then((res) => {
              console.log('ccc : ', res)
              this.$swal(this.editAlert)
              this.isDialogOpen = false
              this.item = []
              // Reload
              this.$emit('testData')
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

  <style scoped>
  .set-datafeild{
    background-color: #fff !important;color: rgb(51, 51, 51) !important;padding-left: 45px; margin-top: -20px;display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
  }
  .fixcolor{
    color: rgb(51, 51, 51) !important;
    /* background-color: rgb(255, 255, 255) !important; */
  }
  .fixpadding{
    padding-top: 20px;
    display: flex;
    align-content: flex-start;
  }
  .text-true[data-v-6dd5ac1a] {
    color: #4caf50;
}
  form {
    padding: 20px;
  }
  .v-list-item
    > #itemFieldLog
    > div
    > div
    > div
    > div
    > div
    .v-application
    .primary--text {
    color: #0ab730 !important;
  }
  .radio-switch {
    display: flex;
    align-items: center;
    padding-bottom: 40px;
    /* filter: drop-shadow(2px 4px 6px #ddd); */
  }

  .radio-switch-input {
    display: none;
  }

  .radio-switch-label {
    display: block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #333;
    cursor: pointer;
  }

  .radio-switch-label[for="radio-switch-low"] {
    background-color: #007bff;
    color: #fff;
    width: -webkit-fill-available;
    height: 50px;
    display: flex;
    place-content: center;
    align-items: center;
    border-radius: 30px 0px 0px 30px;
    /* text-shadow: rgb(255, 255, 255) 1px 1px 5px; */
    font-weight: bold;
  }

  .radio-switch-label[for="radio-switch-medium"] {
    background-color: #ffc107;
    color: #fff;
    height: 50px;
    display: flex;
    place-content: center;
    align-items: center;
    width: -webkit-fill-available;
    /* text-shadow: rgb(255, 255, 255) 1px 1px 5px; */
    font-weight: bold;
  }

  .radio-switch-label[for="radio-switch-high"] {
    background-color: #dc3545;
    color: #fff;
    height: 50px;
    display: flex;
    place-content: center;
    align-items: center;
    width: -webkit-fill-available;
    border-radius: 0px 30px 30px 0px;
    /* text-shadow: rgb(255, 255, 255) 1px 1px 10px; */
    font-weight: bold;
  }

  .radio-switch-label[for="radio-switch-low"],
  .radio-switch-label[for="radio-switch-medium"],
  .radio-switch-label[for="radio-switch-high"] {
    background-color: #fff;
    border:solid #ddd !important;
  }
  </style>
