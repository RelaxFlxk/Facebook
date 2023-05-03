<template>
    <div>
        <v-btn
        elevation="2"
        @click="handleClickLogin"
        color="green"
        >Google Log in</v-btn>
        <!-- <v-row v-if="checkLogin"> -->
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="Summmary"
              label="Summmary"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="Description"
              label="Description"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="Location"
              label="Location"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="StartDate"
                  label="StartDate"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="StartDate"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
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
                  v-model="EndDate"
                  label="EndDate"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="EndDate"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-btn
              elevation="2"
              color="info"
              @click="createEvent()"
              >CREATE Event</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              elevation="2"
              color="orange"
              @click="updateEvent()"
              >Update Event</v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn
              elevation="2"
              color="error"
              @click="deleteEvent()"
              >delete Event</v-btn>
          </v-col>
        </v-row>
    </div>
</template>
<script>
import axios from 'axios' // api
// // import moment from 'moment-timezone'
// import QrcodeVue from 'qrcode.vue'
// import adminLeftMenu from '../Sidebar.vue' // เมนู
export default {
  components: {

  },
  data () {
    return {
      eventId: '66h6jueetal14hcm8vn7an38p8',
      calendarId: '66h6jueetal14hcm8vn7an38p8@google.com',
      refreshToken: '1//0g-0dt6i9koddCgYIARAAGBASNwF-L9IrAA7TwseZlg1WSp8z4zcWcU946s2hs5-ztdpDn96Qz5sAGNpHqFrYxwolc1Y9wckw4Y0',
      checkLogin: false,
      Summmary: '',
      Description: '',
      Location: '',
      menu1: false,
      menu2: false,
      StartDate: '',
      EndDate: ''
    }
  },
  methods: {
    async handleClickLogin () {
      this.$gAuth
        .getAuthCode()
        .then((authCode) => {
          // on success
          console.log('authCode', authCode)
          axios
            .post('http://localhost:5002/be-linked-a7cdc/asia-southeast1/GoogleCalendar-createToken', {code: authCode})
            .then(async (response) => {
              this.checkLogin = true
              console.log('token', response.data)
            })
        })
        .catch((error) => {
          console.log('error login', error)
          // on fail do something
        })
    },
    createEvent () {
      let dt = {
        refreshToken: this.refreshToken,
        Summmary: this.Summmary,
        Description: this.Description,
        Location: this.Location,
        StartDate: this.StartDate,
        EndDate: this.EndDate
      }
      axios
        .post('http://localhost:5002/be-linked-a7cdc/asia-southeast1/GoogleCalendar-createEvent', dt)
        .then(async (response) => {
          console.log('createEvent', response.data)
        })
    },
    updateEvent () {
      let dt = {
        refreshToken: this.refreshToken,
        eventId: this.eventId,
        Summmary: this.Summmary,
        Description: this.Description,
        Location: this.Location,
        StartDate: this.StartDate,
        EndDate: this.EndDate
      }
      axios
        .post('http://localhost:5002/be-linked-a7cdc/asia-southeast1/GoogleCalendar-updateEvent', dt)
        .then(async (response) => {
          console.log('createEvent', response.data)
        })
    },
    deleteEvent () {
      let dt = {
        refreshToken: this.refreshToken,
        eventId: this.eventId
      }
      axios
        .post('http://localhost:5002/be-linked-a7cdc/asia-southeast1/GoogleCalendar-deleteEvent', dt)
        .then(async (response) => {
          console.log('createEvent', response.data)
        })
    }
  }
}
</script>
