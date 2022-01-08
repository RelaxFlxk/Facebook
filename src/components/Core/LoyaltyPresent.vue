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
    gotoLoyalty () {

    }
  }
}
</script>
