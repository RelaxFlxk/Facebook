<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" sm="4" class="main">
            <v-card class="content"
                min-height="100%"
            >
            <h4 class="text-center">นัดหมายเข้ารับบริการ</h4>
             <div v-for="(itemFix , indexFix) in fixtureField" :key="indexFix">
                  <v-text-field
                  :label="itemFix.fieldName"
                  outlined
                  disabled
                  ></v-text-field>
                </div>
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
            </v-card>
          </v-col>
          <v-col cols="12" md="8" sm="8" class="main">
            <v-card
             min-height="50%"
            >
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
              <v-btn
                elevation="5"
                color="success"
                @click="addBooking()"
              >SAVE</v-btn>
              <v-btn
                elevation="5"
                color="error"
                @click="addBooking()"
              >CANCEL</v-btn>
            </v-col>
            </v-card>
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
      session: this.$session.getAll(),
      shopId: 'MS2021100857563483',
      bookingField: [],
      Fielditem: [],
      showCard: false,
      fixtureField: [
        {
          fieldName: 'ประเภทบริการ'
        },
        {
          fieldName: 'สาขา'
        },
        {
          fieldName: 'วันที่/เวลา'
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
    this.getBookingField()
  },
  methods: {
    async getBookingField () {
      this.bookingField = []
      axios.get(this.DNS_IP + '/BookingField/get?shopId=' + this.shopId).then((response) => {
        let rs = response.data
        // console.log('rs', rs)
        if (rs.length > 0) {
          this.$swal('คุณได้เพิ่มข้อมูลแล้ว', ' ', 'success')
            .then(() => {
              window.close()
            })
        } else {
          this.getCustomField()
        }
      })
        .catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getCustomField () {
      this.Fielditem = []
      await axios
        .get(this.DNS_IP + '/customField/get?shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.fieldId = d.fieldId
            s.fieldName = d.fieldName
            this.Fielditem.push(s)
          }
          console.log('flowfield', this.Fielditem)
        })
        .catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async addBooking () {
      let booking = {}
      let UpdateField = []
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
        .then(async (result) => {
          axios
            .post(
              this.DNS_IP + '/BookingField/add', booking
            )
            .then(response => {
              console.log('addDataGlobal DNS_IP + /job/add', response)
            })
            .catch((error) => {
              console.log('error function addData : ', error)
            })
        })
        .catch((error) => {
          console.log('Cencel : ', error)
        })
    }
  }
}
</script>

<style scoped>
.main{
  margin-top: 1rem;
  min-height: 700px;
}
.Review{
  padding: 20px,20px,20px,20px;
}
.content{
  padding: 20px;
}

</style>
