<template>
  <div id="login" class="bgPage">
    <v-row>
      <v-col  cols="6"  class="text-center mt-15">
        <v-img
          class="ma-15"
          :src="require('@/assets/logIn.svg')"
        ></v-img>
      </v-col>
      <v-col cols="6" class="text-center mt-16">
        <v-row class="mt-15" justify="center" no-gutters>
          <v-col cols="10">
             <v-img
              width="120px"
              :src="require('@/assets/Welcome.svg')"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="10">
            <v-row style="height: 25px">
              <v-subheader id="subtext">Username</v-subheader>
            </v-row>
            <v-row style="height: 65px">
              <v-text-field
                prepend-icon="mdi-account"
                v-model="form.userName"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="10">
            <v-row style="height: 25px">
              <v-subheader id="subtext">Password</v-subheader>
            </v-row>
            <v-row style="height: 75px">
               <v-text-field
                prepend-icon="mdi-lock"
                v-model="form.userPassword"
                type="password"
              ></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="10" id="margin">
            <v-row justify="center">
              <v-btn
                elevation="2"
                x-large
                color="#173053"
                block
                dark
                @click="onSubmit()"
              >
                <v-icon left>mdi-checkbox-marked-circle</v-icon>
                เข้าสู่ระบบ
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="5">
          </v-col>
          <v-col cols="5">
            <v-btn text @click="dialog = true, validate('UPDATE')">
              Forgot Password?
            </v-btn>
            <!-- <v-list-tile @click="dialog = true, validate('UPDATE')">Forgot Password?</v-list-tile> -->
          </v-col>
          <v-col cols="10">
            <h6>Don’t have an account yet? <a href="https://betask-linked.web.app/register">Sign up!</a></h6>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="445"
    >
      <v-card>
        <v-container>
          <v-card-text>
              <v-row class="mb-6" justify="center">
                <v-col md="auto">
                  <v-img :src="require('@/assets/forgotPassword.svg')" class="a" style="width:103px;height:103px"></v-img>
                </v-col>
              </v-row>
          </v-card-text>
          <v-card-text>
              <v-row class="mb-6" justify="center" no-gutters>
                <v-col md="auto">
                  <h1 style="font-size:10vw;" class="underline-06">Forget Password?</h1>
                  <!-- <h1 style="color:black;"><strong>Forget Password?</strong></h1> -->
                </v-col>
              </v-row>
          <v-form ref="form_update" v-model="validUpdate" lazy-validation>
          <v-row no-gutter>
            <v-subheader class="pl-16"><strong>Username/ Email</strong></v-subheader>
          </v-row>
          <v-row
          no-gutter
              justify="center"
            >
              <v-col lg="12" class="pt-0 pb-0">
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="form.newUserName"
                  label="Username"
                  solo
                  :rules="[rules.email]"
                  required
                ></v-text-field>
              </v-col>
              <v-col lg="12" class="pa-0">
                <v-subheader class="pl-16">Enter you email address and we will send you an email for reset password</v-subheader>
              </v-col>
          </v-row>
          </v-form>
        </v-card-text>
        <br>
        <v-row justify="center" no-gutter>
               <v-col md="auto">
            <v-btn
              elevation="2"
              x-large
              dark
              color="#1B437C"
              @click="onSubmitForgot()"
              :disabled="!validUpdate"
            >
              <v-icon left>mdi-checkbox-marked-circle</v-icon>
              Reset Password
            </v-btn>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutter>
               <v-col md="auto">
                <a class="v-subheader" @click="dialog = false">Return to Signin</a>
               </v-col>
            </v-row>
        </v-container>
      </v-card>
    </v-dialog>
      <div v-if="!dataReady" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
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
  // beforeCreate () {
  //   this.$liff.init({ liffId: this.$liff_id_login }, function (data) {})
  // },
  data () {
    return {
      session: this.$session.getAll(),
      queryData: '',
      bookNo: '',
      jobNo: '',
      dialog: false,
      sheet: false,
      profile: [],
      privacyConfigDetail: '',
      privacyConfigCode: '',
      menu: [],
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
        newUserName: '',
        userPassword: '',
        newUserPassword: ''
      },
      dataReady: true,
      hidePrivacy: true,
      validUpdate: true
    }
  },
  // eslint-disable-next-line space-before-function-paren
  async mounted() {
    // await this.checkLiffLogin()
    this.$session.destroy()
    this.$session.clear()
  },
  methods: {
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
      if (this.$route.query.bookNo) {
        this.bookNo = this.$route.query.bookNo
        this.queryData = 'bookNo'
        this.$router.push('/Master/BookingList?' + this.queryData + '=' + this.bookNo)
      } else if (this.$route.query.jobNo) {
        this.jobNo = this.$route.query.jobNo
        this.queryData = 'jobNo'
        this.$router.push('/Master/jobQrCode?' + this.queryData + '=' + this.jobNo)
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
    async onSubmitForgot () {
      // this.dataReady = false
      this.form.type = 'username'
      // console.log(JSON.stringify(this.form))
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/system_user/get?userName=' +
            this.form.newUserName
        )
        .then(async (response) => {
          if (response.data[0]) {
            var md5 = require('md5')
            let autogen = await this.generateCodeGlobal
            let token = md5(autogen)

            let dt = {
              'refId': response.data[0].userId,
              'typeJob': 'forgot',
              'status': 'wait',
              'token': token,
              'CREATE_USER': response.data[0].userName,
              'LAST_USER': response.data[0].userName
            }
            await axios
              .post(
                this.DNS_IP + '/token_email/add', dt
              )
              .then(async response1 => {
                console.log('response1', response1.data.status)
                if (response1.data.status) {
                  let dt = {
                    'email': response.data[0].userName,
                    'status': 'forgot',
                    'token': token
                  }
                  await axios
                    .post(
                      'https://asia-southeast1-be-linked-a7cdc.cloudfunctions.net/Welcome-sendMail', dt
                    )
                    .then(async response => {
                      this.dialog = false
                      this.$swal('เรียบร้อย', 'กรุณาตรวจสอบ Email ของท่าน', 'success')
                      // location.reload()
                      this.form.newUserName = ''
                    })
                } else {
                  this.$swal('ผิดพลาด', 'กรุณาทำรายการใหม่', 'error')
                  this.form.newUserName = ''
                }
              })
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
.bgPage {
  background: linear-gradient(180deg, #FFFFFF 10%, #E1F3FF 100%);
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
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
.v-subheader {
    color: #1B437C !important;
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
