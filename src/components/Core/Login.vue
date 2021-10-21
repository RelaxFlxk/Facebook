<template>
  <div id="login">
    <v-card elevation="15" max-width="600" class="mx-auto my-12">
      <div
        class="d-flex flex-column justify-space-between align-center"
        v-if="dataReady"
      >
        <v-container>
          <vuetify-logo />
          <br />
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <br />
          <v-text-field
            prepend-icon="mdi-account"
            v-model="form.userName"
            label="Username"
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-lock"
            v-model="form.userPassword"
            label="Password"
            type="password"
          ></v-text-field>
          <br />
          <template v-if="hidePrivacy">
            <v-btn color="teal" @click="onSubmit()" dark large block
              >Login</v-btn
            >
          </template>
          <template v-if="!hidePrivacy">
            <v-bottom-sheet v-model="sheet" max-width="95%" scrollable>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="teal" dark v-bind="attrs" v-on="on" block>
                  Login
                </v-btn>
              </template>
              <v-sheet>
                <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
                  close
                </v-btn>
                <div>
                  <v-card id="xxxxxx">
                    <div class="a" v-html="privacyConfigDetail"></div>
                    <v-btn
                      color="teal"
                      @click="onSubmitPrivacy()"
                      dark
                      large
                      block
                      >ยอมรับเงื่อนไข - Agree</v-btn
                    >
                  </v-card>
                </div>
              </v-sheet>
            </v-bottom-sheet>
          </template>
        </v-container>
      </div>
      <div v-if="!dataReady" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'
import VuetifyLogo from '../logo'
export default {
  components: {
    VuetifyLogo
  },
  name: 'Login',
  beforeCreate () {
    this.$liff.init({ liffId: this.$liff_id_login }, function (data) {})
  },
  data () {
    return {
      session: this.$session.getAll(),
      bookNo: this.$route.query.bookNo,
      sheet: false,
      profile: [],
      privacyConfigDetail: '',
      privacyConfigCode: '',
      menu: [],
      formCheckPrivacy: {
        privacyConfigCode: '',
        userCode: '',
        privacyStatus: '',
        userTypeGroup: ''
      },
      form: {
        userLineId: '',
        userLinepictureUrl: '',
        userName: '',
        userPassword: ''
      },
      dataReady: true,
      hidePrivacy: true
    }
  },
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    await this.checkLiffLogin()
    this.$session.destroy()
    this.$session.clear()
  },
  methods: {
    async checkLiffLogin () {
      await this.$liff.ready.then(async () => {
        if (process.env.NODE_ENV === 'development') {
          this.getProfile_dev()
        } else {
          if (!this.$liff.isLoggedIn()) {
            this.$liff.login({ redirectUri: window.location })
          } else {
            await this.getProfile()
          }
        }
      })
    },
    async checkbookNo () {
      if (this.bookNo !== '') {
        this.$router.push('/Master/BookingList?bookNo=' + this.bookNo)
      } else {
        this.$router.push('/Core/Home')
      }
    },
    async getProfile () {
      let _this = this
      await this.$liff
        .getProfile()
        .then(async (profileLine) => {
          _this.form.userLineId = profileLine.userId
          _this.form.userLinepictureUrl = profileLine.pictureUrl
          // await _this.getTokenCheck()
        })
        .catch(function (error) {
          alert('Error getting profile: ' + error)
        })
    },
    async getProfile_dev () {
      let _this = this
      _this.form.userLineuserId = _this.main_profile.userLineuserId
      _this.form.userLinepictureUrl = _this.main_profile.pictureUrl
      // await _this.getTokenCheck()
    },
    async getTokenCheck () {
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/system_token/getKey?tokenName=' +
            this.$route.query.access
        )
        .then(async (response) => {
          await this.getPrivacy()
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.$router.push('/Core/LoginFailed')
          console.log(error)
        })
    },
    async getPrivacy () {
      this.dataReady = false
      this.formPrivacy = {}
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/system_privacy/get?RECORD_STATUS=N&privacyConfigStatus=ON'
        )
        .then(async (response) => {
          this.hidePrivacy = false
          this.dataReady = true
          this.privacyConfigDetail = response.data[0].privacyConfigDetail
          this.formCheckPrivacy.privacyConfigCode =
            response.data[0].privacyConfigCode
          // formCheckPrivacy
          // console.log(this.formPrivacy)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.hidePrivacy = true
          this.dataReady = true
          console.log(error)
        })
    },
    async onSubmit () {
      this.dataReady = false
      this.form.type = 'username'
      console.log(JSON.stringify(this.form))
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/system_user/auth?userName=' +
            this.form.userName +
            '&userPassword=' +
            this.form.userPassword
        )
        .then(async (response) => {
          if (response.data[0]) {
            this.$session.start()
            this.$session.set('data', response.data[0])
            this.checkbookNo()
          } else {
            this.dataReady = true
            this.$swal('ผิดพลาด', 'Account ไม่ถูกต้อง1', 'error')
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.dataReady = true
          console.log(error)
          this.$swal('ผิดพลาด', 'Account ไม่ถูกต้อง2', 'error')
        })
    },
    async onSubmitPrivacy () {
      this.dataReady = false
      this.form.type = 'username'
      console.log(JSON.stringify(this.form))
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/system_user/auth?userName=' +
            this.form.userName +
            '&userPassword=' +
            this.form.userPassword
        )
        .then(async (response) => {
          // ExpireDateDiff
          if (response.data[0].ExpireDateDiff < 1) {
            this.dataReady = true
            this.$swal(
              'ผิดพลาด',
              'Account หมดอายุ กรุณาติดต่อเจ้าหน้าที่',
              'error'
            )
          } else {
            // console.log(response.data[0])
            this.$session.start()
            this.$session.set('data', response.data[0])
            this.formCheckPrivacy.userCode = response.data[0].userCode
            this.formCheckPrivacy.CREATE_USER = response.data[0].userName
            this.formCheckPrivacy.LAST_USER = response.data[0].userName
            this.formCheckPrivacy.userTypeGroup =
              response.data[0].userTypeGroup
            this.formCheckPrivacy.privacyStatus = 'Confirm'

            // ตรวจสอบว่ามีเคย check privacy หรือไม่
            await axios
              .get(
                // eslint-disable-next-line quotes
                this.DNS_IP +
                  '/system_privacy_check/get?RECORD_STATUS=N&userCode='
              )
              .then(async (response) => {
                // เคย
                // console.log(response)
                // this.$router.push('/Core/Home')
                this.getMenu(this.formCheckPrivacy)
              })
              // eslint-disable-next-line handle-callback-err
              .catch((error) => {
                // เคย
                axios
                  .post(
                    // eslint-disable-next-line quotes
                    this.DNS_IP + "/system_privacy_check/add",
                    this.formCheckPrivacy
                  )
                  .then(async (response) => {
                    // console.log(response)
                    this.getMenu(this.formCheckPrivacy)
                    // this.$router.push('/Core/Home')
                  })
                  // eslint-disable-next-line handle-callback-err
                  .catch((error) => {
                    this.dataReady = true
                    console.log(error)
                  })
              })
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.dataReady = true
          console.log(error)
          this.$swal('ผิดพลาด', 'Account ไม่ถูกต้อง3', 'error')
        })
    },
    async getMenu (dt) {
      console.log('getMenu', dt)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/system_menu/get?RECORD_STATUS=N&userTypeGroup=' +
            dt.userTypeGroup
        )
        .then(async (response) => {
          console.log(
            '/system_menu/get?RECORD_STATUS=N&userTypeGroup=' +
              dt.userTypeGroup,
            response.data
          )
          this.$session.set('menu', response.data)
          this.$session.set('AccessKey', this.$route.query.access)
          this.$router.push('/Core/Home?access=' + this.$route.query.access)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
h1 {
  text-align: center;
}
.a >>> .ql-align-center {
  text-align: center;
}
a {
  color: #42b983;
}
#danger {
  color: red;
}
#login {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 60px;
}
#xxxxxx {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
