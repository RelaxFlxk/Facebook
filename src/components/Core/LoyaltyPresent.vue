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
      session: this.$session.getAll()
    }
  },
  methods: {
    async gotoLoyalty () {
      console.log('session', this.session.data)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP_Loyalty +
            '/system_shop/get?userName=' +
            this.session.data.userName
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
                // this.$router.push('/Core/Login')
              })
            // eslint-disable-next-line handle-callback-err
              .catch((error) => {
                console.log(error)
                // this.$router.push('/system/Errorpage?returnLink=' + this.returnLink)
                this.dataReady = true
              })
          } else {
            this.$swal('ผิดพลาด', 'ขออภัย Admin User นี้มีอยู่ในระบบอยู่แล้ว', 'error')
          }
        })// eslint-disable-next-line handle-callback-err
        .catch(async (error) => {
          console.log(error)
        })
    }
  }
}
</script>
