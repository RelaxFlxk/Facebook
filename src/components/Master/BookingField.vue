<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main >
      <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
        </v-row>
      <v-container>
        <v-row>
          <v-col cols="12" md="5" sm="5" class="main">
            <div class="Bar">
              <v-card class="content p-3" height="700px" style="background: linear-gradient(180deg, #FFFFFF 0%, #E1F3FF 100%);">
            <h5 class="text-center" style="color:red;">(ตัวอย่าง)</h5>
            <v-img :src="require('@/assets/Booking.png')" class="a" style="width:56.3px;height:67.03px"></v-img>
            <h4 class="text-center">นัดหมายเข้ารับบริการ</h4>
             <div v-for="(itemFix , indexFix) in fixtureField" :key="indexFix">
                  <v-text-field
                  :label="itemFix.fieldName"
                  outlined
                  disabled
                  ></v-text-field>
                </div>
                <v-row>
              <v-col cols="6">
            <v-menu
              ref="menu"
              v-model="menuDate"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              required
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="วันที่"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                scrollable
                :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menuDate = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="time"
                  label="เวลา"
                  type="time"
                  suffix=""
                  required
                ></v-text-field>
              </v-col>
            </v-row>
              <form class="Review">
                <div v-for="(item , index) in Fielditem" :key="index">
                 <div v-if="item.showCard == true">
                  <v-text-field
                  :label="item.fieldName"
                  outlined
                  disabled
                  ></v-text-field>
                 </div>
                </div>
              </form>
              <div class="text-center">
                  <v-btn elevation="10" color="#1B437C" readonly small block dark
                    >ทำการนัดหมาย</v-btn
                  >
                </div>
            </v-card>
            </div>
          </v-col>
          <v-col cols="12" md="7" sm="7" class="main">
            <v-row>
              <v-col cols="12" md="12" sm="12" >
                <div v-if="Redirect !== ''">
                  <v-card class="p-3" height="200px" style="background-color:#050C42;">
                    <v-img :src="require('@/assets/linkicon.png')" class="a" style="width:29px;height:29px"></v-img>
                  <h3 class="text-center" style="color:#FFFFFF;">ลิ้งสำหรับลูกค้า</h3>
                  <v-card-text>
                    <v-row align-content="center">
                      <v-col cols="10">
                        <v-text-field
                        v-model="Redirect"
                        id="myInput"
                        style="background-color:#050C42;"
                        solo
                        dense
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="2" class="text-lelf" >
                        <v-btn
                          color="#1B437C"
                          small
                          fab
                          dark
                          @click="FunCopy()"
                        >
                          <v-icon>mdi-content-copy</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12" sm="12">
                <v-card min-height="50%">
                    <v-col cols="12" class="text-center">
                      <h4 class="text-center">โปรดเลือกข้อมูลที่ต้องการแสดง</h4>
                      <v-data-table
                        v-model="itemdetell"
                        :headers="FieldSelect"
                        :items="Fielditem"
                        rounded="xl"
                        hide-default-footer
                        class="elevation-10"
                      >
                        <template v-slot:[`item.showCard`]="{ item }">
                          <v-simple-checkbox
                            v-model="item.showCard"
                          ></v-simple-checkbox>
                        </template>
                      </v-data-table>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-btn elevation="5" color="#1B437C" dark @click="addBooking()"
                        >SAVE</v-btn
                      >
                      <!-- <v-btn elevation="5" color="#1B437C" outlined class="a"
                        >CANCEL</v-btn
                      > -->
                    </v-col>
                  </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        </v-container>
    </v-main>
  </div>
</template>

<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  data () {
    return {
      itemdetell: [],
      Redirect: 'https://liff.line.me/1656581804-7KRQyqo5/Booking?shopId=' + this.$session.getAll().data.shopId,
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      IdUpdate: '',
      bookingField: [],
      menuDate: false,
      date: '',
      time: '',
      Fielditem: [],
      showCard: false,
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'ข้อมูลนัดหมาย',
          disabled: false,
          href: '/Master/BookingField'
        }
      ],
      fixtureField: [
        {
          fieldName: 'ประเภทบริการ'
        },
        {
          fieldName: 'สาขา'
        }
      ],
      FieldSelect: [
        {
          text: 'Field Id',
          value: 'fieldId'
        },
        {
          text: 'Field Name',
          value: 'fieldName'
        },
        { text: 'AC', value: 'showCard' }
      ]
    }
  },
  async mounted () {
    await this.getBookingField()
  },
  methods: {
    async getBookingField () {
      let itemIncustomField = []
      await axios.get(this.DNS_IP + '/BookingField/get?shopId=' + this.shopId).then((response) => {
        let rs = response.data
        this.IdUpdate = rs[0].bookingFieldId
        console.log('this.IdUpdate', this.IdUpdate)
        console.log('rs', rs)
        if (rs.length > 0) {
          let bookingData = []
          bookingData = JSON.parse(rs[0].flowfieldName)
          for (let i = 0; i < bookingData.length; i++) {
            let d = bookingData[i]
            itemIncustomField.push(d.fieldId)
          }
          console.log('item', itemIncustomField)
          this.getCustomField(itemIncustomField)
        } else {

        }
      })
        .catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getCustomField (item) {
      let checkdata = []
      await axios.get(this.DNS_IP + '/customField/get?shopId=' + this.shopId).then(response => {
        let dt = response.data
        for (let i = 0; i < dt.length; i++) {
          let d = dt[i]
          checkdata.push(d.fieldId)
        }
      }).catch((error) => {
        console.log('error function addData : ', error)
      })
      let fieldAll = checkdata.filter(function (x) { return !item.includes(x) })
      if (item.length > 0) {
        await axios.get(this.DNS_IP + '/customField/fieldId?fieldId=' + item)
          .then(async response => {
            let rs = response.data
            // let aa = []
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.fieldId = d.fieldId
              s.fieldName = d.fieldName
              s.fieldType = d.fieldType
              s.optionField = d.optionField
              s.shopId = d.shopId
              s.fieldValue = ''
              s.showCard = true
              this.Fielditem.push(s)
              console.log('s', this.Fielditem)
            }
          })
          .catch((error) => {
            console.log('error function addData : ', error)
          })
      }
      if (fieldAll.length > 0) {
        await axios.get(this.DNS_IP + '/customField/fieldId?fieldId=' + fieldAll)
          .then(async response => {
            let rs = response.data
            // let aa = []
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.fieldId = d.fieldId
              s.fieldName = d.fieldName
              s.fieldType = d.fieldType
              s.optionField = d.optionField
              s.shopId = d.shopId
              s.fieldValue = ''
              s.showCard = false
              this.Fielditem.push(s)
            }
          })
          .catch((error) => {
            console.log('error function addData : ', error)
          })
      }
    },
    async addBooking () {
      let booking = {}
      let UpdateField = []
      // this.Redirect = this.DNS_IP + '/booking?shopId=' + this.$route.query.shopId
      for (let i = 0; i < this.Fielditem.length; i++) {
        let d = this.Fielditem[i]
        if (d.showCard === true) {
          UpdateField.push({
            fieldId: d.fieldId
          })
        }
      }
      booking.flowfieldName = JSON.stringify(UpdateField)
      booking.shopId = this.shopId
      console.log('dtbooking', booking)
      this.$swal({
        title: 'ต้องการ บันทึกข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          axios
            .post(this.DNS_IP + '/BookingField/edit/' + this.IdUpdate, booking)
            .then(response => {
              this.$swal('บันทึกข้อมูลเรียบร้อย', ' ', 'success')
              console.log('addDataGlobal DNS_IP + /job/add', response)
            })
            .catch(error => {
              console.log('error function addData : ', error)
            })
        })
        .catch(error => {
          console.log('Cencel : ', error)
        })
    },
    FunCopy () {
      var copyText = document.getElementById('myInput')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      navigator.clipboard.writeText(copyText.value)
    }
  }
}
</script>

<style scoped>
span.v-btn__content {
  color: #1B437C !important;
}
.main {
  margin-top: 1rem;
  min-height: 700px;
}
.Bar {
  padding: 10px;
  background-color: #FFFFFF;
  height: 100%;
  width: 400px;
}
.Review {
  padding: 20px, 20px, 20px, 20px;
}
.content {
  overflow: auto;
  white-space: normal;
}
.a{
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
}
.continer{
  padding: 20px, 20px, 20px, 20px;
}

</style>
