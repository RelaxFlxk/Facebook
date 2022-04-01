<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn
              color="primary"
              style="z-index:8;"
              id="v-step-0"
              depressed
              @click="gotoLoyalty()"
            >
              <v-icon left>mdi-gift-open</v-icon>
              เปิดใช้งานโปรแกรม Loyalty
            </v-btn>
          </v-col>
        </v-row>
        <v-dialog
            v-model="dialogError"
            persistent
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                ผิดพลาด
              </v-card-title>
              <v-card-text>ขออภัย Admin User นี้มีอยู่ในระบบอยู่แล้ว</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  color="red darken-1"
                  @click="dialogError = false"
                >
                  รับทราบ
                </v-btn>
                <v-btn
                  dark
                  color="green darken-1"
                  @click="gotoWebLoyalty()"
                >
                  ไปยังเว็บ Loyalty
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </div>
    </v-main>
  </div>
</template>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import axios from 'axios' // api
export default {
  components: {
    'left-menu-admin': adminLeftMenu
  },
  data () {
    return {
      session: this.$session.getAll(),
      dialogError: false
    }
  },
  methods: {
    gotoWebLoyalty () {
      window.open('https://betask-loyalty-admin.web.app', '_blank')
      this.dialogError = false
    },
    async gotoLoyalty () {
      console.log('session', this.session.data)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP_Loyalty +
            '/system_shop/get?shopId=' +
            this.session.data.shopId
        )
        .then(async (response) => {
          if (response.data.status === false) {
            var dt = {
              shopId: this.session.data.shopId,
              logo: this.session.data.shopImge,
              name: this.session.data.shopName,
              userName: this.session.data.userName,
              password: this.session.data.userPassword,
              userCode: this.session.data.userCode,
              userCreate: this.session.data.userName
            }
            console.log('add', dt)
            await axios
              .post(
              // eslint-disable-next-line quotes
                this.DNS_IP_Loyalty + "/system_shop/createShop",
                dt
              )
              .then(async (response) => {
                this.$swal('เรียบร้อย', 'สร้างร้าน เรียบร้อย', 'success')
                window.location.href = `https://betask-loyalty-admin.web.app/core/login`
                // this.$router.push('/Core/Login')
              })
            // eslint-disable-next-line handle-callback-err
              .catch((error) => {
                console.log(error)
                // this.$router.push('/system/Errorpage?returnLink=' + this.returnLink)
                this.dataReady = true
              })
          } else {
            this.dialogError = true
          }
        })// eslint-disable-next-line handle-callback-err
        .catch(async (error) => {
          console.log(error)
        })
    }
  }
}
</script>
