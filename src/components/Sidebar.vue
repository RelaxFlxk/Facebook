<template>
  <div>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
        <!-- <v-toolbar-title v-text="title" /> -->
          <v-col cols="11" class='text-right'>
            <v-list-item-avatar>
              <v-img :src="session.data.logo"></v-img>
            </v-list-item-avatar>
          </v-col>
        <v-list-item-title>{{ session.data.name }}</v-list-item-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" bottom fixed app>
      <v-list>
        <v-list-item>
          <v-col>
        <v-img :src="require('@/assets/LogoBetask.svg')" max-width="70px"></v-img>
          </v-col>
          <v-col>
        <v-img class="ml-1 mr-9" :src="require('@/assets/GroupBetask.svg')" max-width="80px"></v-img>
          </v-col>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item to="/Core/Home">
          <v-list-item-icon>
            <v-icon color="white">mdi-view-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="menu-head">Dashboard</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-group
      dense
        :value="true"
        prepend-icon="mdi-shopping"
        color="white"
        no-action
        v-if="master.length > 0"
      >
      <template v-slot:activator>
          <v-list-item-title class="menu-head">จัดการข้อมูลร้าน</v-list-item-title>
        </template>

        <v-list-item
        dense
          v-for="(item, i) in master"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" dense  color="white"></v-icon>
          </v-list-item-icon>
          <v-list-item-title dense v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    <v-list-group
      dense
        :value="true"
        prepend-icon="mdi-toolbox "
        color="white"
        no-action
        v-if="system.length > 0"
      >
      <template v-slot:activator>
          <v-list-item-title class="menu-head">จัดการข้อมูลระบบ</v-list-item-title>
        </template>

        <v-list-item
          v-for="(item, i) in system"
          :key="i"
          :to="item.to"
          router
          exact
          dense
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" dense  color="white"></v-icon>
          </v-list-item-icon>
          <v-list-item-title dense v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    <v-list-group
      dense
        :value="true"
        prepend-icon="mdi-qrcode-scan"
        color="white"
        no-action
        v-if="tool.length > 0"
      >
      <template v-slot:activator>
          <v-list-item-title class="menu-head">จัดการคะแนน</v-list-item-title>
        </template>

        <v-list-item
          v-for="(item, i) in tool"
          :key="i"
          :to="item.to"
          router
          exact
          dense
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" dense color="white"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.title" dense color="white"></v-list-item-title>
        </v-list-item>
      </v-list-group>
      <template v-slot:append>
        <v-divider class="ma-0"></v-divider>
        <div class="pa-2 nav-button">
          <v-btn block
            text
            tile
            class="nav-button"
            @click.prevent="logout()">
            <v-icon color="white">mdi-logout</v-icon>&nbsp;&nbsp;ออกจากระบบ
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Be-Linked',
      drawer: true,
      mini: false,
      session: this.$session.getAll(),
      system: [],
      master: [],
      tool: [],
      items: []
    }
  },
  computed: {},
  mounted () {
    this.items = []
    if (this.session.data.userTypeGroup === 'Admin') {
      this.adminChk()
    }
    // if (this.session.data.userTypeGroup === 'Shop Admin') {
    //   this.shopAdminChk()
    // }
    // if (this.session.data.userTypeGroup === 'Operation') {
    //   this.operationChk()
    // }
  },
  methods: {
    logout () {
      console.log(this.$session.getAll())
      // this.$session.destroy()
      // this.$session.clear()
      this.$router.push('/Core/Login?access=' + this.$session.getAll().AccessKey)
    },
    adminChk () {
      this.system = []
      this.master = []
      this.tool = []
      this.system = [
        { title: 'ข้อมูลลงทะเบียนลูกค้า', icon: 'mdi-account-edit', to: '/Master/CustomField' },
        { title: 'Booking', icon: 'mdi-account-edit', to: '/Master/BookingField' },
        { title: 'สถานะการบริการ', icon: 'mdi-cash-register', to: '/Master/Flow' },
        { title: 'กระดานการทำงาน', icon: 'mdi-cash-register', to: '/Master/FlowStep' },
        { title: 'จัดโครงสร้างกระดาน', icon: 'dashboard', to: '/Master/WorkShop' },
        { title: 'จัดการพนักงาน', icon: 'mdi-playlist-check', to: '/Master/Employee' },
        { title: 'จัดการสาขา', icon: 'mdi-playlist-check', to: '/Master/Branch' },
        { title: 'จัดการบริษัท', icon: 'mdi-playlist-check', to: '/Master/Company' }
        // { title: 'รายชื่อร้านค้า', icon: 'mdi-playlist-check', to: '/System/ListShop' },
        // { title: 'กลุ่มผู้ใช้งาน', icon: 'mdi-account-group', to: '/System/UserTypeGroup' },
        // { title: 'Vgroup', icon: 'mdi-account-group', to: '/System/VgroupMapCoin' }
      ]
      // this.master = [
      //   // { title: 'Code 4', icon: 'mdi-numeric-4-circle', to: '/insurance/AllocateProspectiveCode4' },
      //   { title: 'สาขา', icon: 'mdi-home-floor-b', to: '/Master/Branch' },
      //   { title: 'Theme', icon: 'mdi-format-color-fill', to: '/Master/Color' },
      //   { title: 'Level', icon: 'mdi-signal-cellular-3', to: '/Master/Level' },
      //   // { title: 'การ์ด', icon: 'mdi-cards', to: '/Master/Card' },
      //   { title: 'รางวัล', icon: 'mdi-gift-open', to: '/Master/Reward' },
      //   { title: 'อัตราแลกเปลี่ยนสินค้า', icon: 'mdi-atom-variant', to: '/Master/ProductExchangeRate' }
      // ]
      // this.tool = [
      //   { title: 'Qr Code เก็บคะแนน', icon: 'mdi-alpha-c-box', to: '/Tool/CollectQRCode' },
      //   { title: 'Qr Code Lot', icon: 'mdi-book-plus-multiple', to: '/Tool/CollectQRCodeLot' },
      //   { title: 'กิจกรรม', icon: 'mdi-account-voice', to: '/Tool/Activity' }
      //   // { title: 'Qr Code แลกสินค้า', icon: 'mdi-alpha-r-box ', to: '/insurance/ReportProcess' }
      // ]
    }
    // shopAdminChk () {
    //   this.system = [
    //     { title: 'บัญชี', icon: 'mdi-account-edit', to: '/System/User' },
    //     { title: 'ร้านค้า', icon: 'mdi-cash-register', to: '/System/EditShop' },
    //     { title: 'รายการ ลูกค้า', icon: 'mdi-account-details', to: '/System/ListMember' }
    //   ]
    //   this.master = [
    //     // { title: 'Code 4', icon: 'mdi-numeric-4-circle', to: '/insurance/AllocateProspectiveCode4' },
    //     { title: 'สาขา', icon: 'mdi-home-floor-b', to: '/Master/Branch' },
    //     { title: 'Theme', icon: 'mdi-format-color-fill', to: '/Master/Color' },
    //     { title: 'Level', icon: 'mdi-signal-cellular-3', to: '/Master/Level' },
    //     // { title: 'การ์ด', icon: 'mdi-cards', to: '/Master/Card' },
    //     { title: 'รางวัล', icon: 'mdi-gift-open', to: '/Master/Reward' },
    //     { title: 'อัตราแลกเปลี่ยนสินค้า', icon: 'mdi-atom-variant', to: '/Master/ProductExchangeRate' }
    //   ]
    //   this.tool = [
    //     { title: 'Qr Code เก็บคะแนน', icon: 'mdi-alpha-c-box', to: '/Tool/CollectQRCode' },
    //     { title: 'Qr Code Lot', icon: 'mdi-book-plus-multiple', to: '/Tool/CollectQRCodeLot' },
    //     // { title: 'Qr Code แลกสินค้า', icon: 'mdi-alpha-r-box ', to: '/insurance/ReportProcess' },
    //     { title: 'กิจกรรม', icon: 'mdi-account-voice', to: '/Tool/Activity' }
    //   ]
    // },
    // operationChk () {
    //   this.tool = [
    //     { title: 'Qr Code เก็บคะแนน', icon: 'mdi-alpha-c-box', to: '/Tool/CollectQRCode' },
    //     { title: 'Qr Code Lot', icon: 'mdi-book-plus-multiple', to: '/Tool/CollectQRCodeLot' },
    //     { title: 'กิจกรรม', icon: 'mdi-account-voice', to: '/Tool/Activity' }
    //     // { title: 'Qr Code แลกสินค้า', icon: 'mdi-alpha-r-box ', to: '/insurance/ReportProcess' }
    //   ]
    // }
  }
}
</script>

<style lang="css" scoped>

#img_bt {
  width: 50px;
  height: 50px;
}

</style>
