<template>
  <div>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />
        <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer></v-spacer>
      <v-avatar class="mr-3">
        <v-img :src="session.data.shopImge"></v-img>
      </v-avatar>
      <v-toolbar-title>{{ session.data.shopName }}</v-toolbar-title>
        <!-- <v-list-item-avatar>
          <v-img :src="session.data.shopImge"></v-img>
        </v-list-item-avatar>
        <v-list-item-content><strong style="color: white;">{{ session.data.shopName }}</strong></v-list-item-content> -->
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
      <!-- <v-list>
        <v-list-item to="/Core/Home">
          <v-list-item-icon>
            <v-icon color="white">mdi-view-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="menu-head">Dashboard</v-list-item-title>
        </v-list-item>
      </v-list> -->

      <v-list-group
      dense
      :value="true"
      prepend-icon="mdi-shopping"
      color="white"
      no-action
      v-if="Dashboard.length > 0"
    >
    <template v-slot:activator>
        <v-list-item-title class="menu-head">Dashboard</v-list-item-title>
      </template>

      <v-list-item
      dense
        v-for="(item, i) in Dashboard"
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
        v-if="booking.length > 0"
      >
      <template v-slot:activator>
        <v-list-item-title class="menu-head">ระบบนัดหมาย</v-list-item-title>
      </template>

        <v-list-item
          v-for="(item, i) in booking"
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
        prepend-icon="mdi-graph-outline"
        color="white"
        no-action
        v-if="broadCast.length > 0"
      >
      <template v-slot:activator>
          <v-list-item-title class="menu-head">เครื่องมือการตลาด</v-list-item-title>
        </template>

        <v-list-item
          v-for="(item, i) in broadCast"
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

    <v-list-group
      dense
        :value="true"
        prepend-icon="mdi-toolbox "
        color="white"
        no-action
        v-if="workflow.length > 0"
      >
      <template v-slot:activator>
        <v-list-item-title class="menu-head">จัดการงานในศูนย์</v-list-item-title>
      </template>

        <v-list-item
          v-for="(item, i) in workflow"
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
        prepend-icon="mdi-toolbox "
        color="white"
        no-action
        v-if="customer.length > 0"
      >
      <template v-slot:activator>
        <v-list-item-title class="menu-head">ข้อมูลลูกค้า</v-list-item-title>
      </template>

        <v-list-item
          v-for="(item, i) in customer"
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
        prepend-icon="mdi-toolbox"
        color="white"
        no-action
        v-if="corporate.length > 0"
      >
      <template v-slot:activator>
          <v-list-item-title class="menu-head">ข้อมูลบริษัท</v-list-item-title>
        </template>

        <v-list-item
          v-for="(item, i) in corporate"
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
        <v-btn block
            text
            tile
            dark
            class="nav-button-dark"
            @click.prevent="$router.push('/LoyaltyPresent')">
            <v-icon color="white">mdi-gift-open</v-icon>&nbsp;&nbsp;Be-Loyalty
          </v-btn>
        <v-divider class="ma-0"></v-divider>
        <v-btn block
            text
            tile
            dark
            class="nav-button-dark"
            @click.prevent="chkPlan()">
            <v-icon color="white">mdi-briefcase-edit-outline</v-icon>&nbsp;&nbsp;จัดการแพคเกจ
          </v-btn>
        <v-divider class="ma-0"></v-divider>
          <v-btn block
            text
            tile
            dark
            class="nav-button-dark"
            @click.prevent="logout()">
            <v-icon color="white">mdi-logout</v-icon>&nbsp;&nbsp;ออกจากระบบ
          </v-btn>
      </template>
      <v-dialog
      v-model="dialogCash"
      max-width="50%"
    >
      <v-card>
        <v-card-title class="text-h5">
          Be-Linked billing plans
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col col="6" v-for="(item, index) in dataPackage" :key="index">
              <v-container>
                <v-card>
                  <v-row>
                  <v-col col="12">
                    <v-list two-line>
                      <v-list-item  v-for="(items, index) in item.description" :key="index">
                        <v-list-item-icon>
                          <v-icon>
                            {{items.icon}}
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>{{items.title}}</v-list-item-title>
                          <v-list-item-subtitle class="feature_detail">{{items.subtitle}}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  </v-row>
                  <div v-if="dataBilling !== item.id" class="text-center plan_button">
                    <v-btn
                      rounded
                      color="primary"
                      dark
                      @click="billingPlan(item)"
                    >
                      เปลี่ยนแพลน
                    </v-btn>
                  </div>
                  <div v-if="dataBilling === item.id" class="text-center plan_button">
                    <v-btn
                      rounded
                      outlined
                      color="teal"
                      dark
                    >
                      แพลนปัจจุบัน
                    </v-btn>
                  </div>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <!-- <v-card>
        <v-card-title class="text-h5">
          Be-Linked billing plans
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col col="6">
              <v-container>
                <v-card>
                  <v-row>
                  <v-col col="12">
                    <v-list two-line>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="white">
                            mdi-projector-screen-outline
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>ระบบที่สามารถใช้งานได้</v-list-item-title>
                          <v-list-item-subtitle class="feature_detail">สามารถใช้ได้ทั้งหมด</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="white">
                            mdi-car-multiple
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>จำนวนรถในศูนย์บริการ</v-list-item-title>
                          <v-list-item-subtitle class="feature_detail">จำกัดแค่ 10 คัน</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="white">
                            mdi-cash-multiple
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>ราคา</v-list-item-title>
                          <v-list-item-subtitle class="feature_detail">ฟรี</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  </v-row>
                  <div v-if="!btFree" class="text-center plan_button">
                    <v-btn
                      rounded
                      color="primary"
                      dark
                      @click="updateFreePlan()"
                    >
                      เปลี่ยนแพลน
                    </v-btn>
                  </div>
                  <div v-if="btFree" class="text-center plan_button">
                    <v-btn
                      rounded
                      outlined
                      color="teal"
                      dark
                    >
                      แพลนปัจจุบัน
                    </v-btn>
                  </div>
                </v-card>
              </v-container>
            </v-col>
            <v-col col="6">
              <v-container>
                <v-card>
                  <v-row>
                  <v-col col="12">
                    <v-list two-line>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="white">
                            mdi-projector-screen-outline
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>ระบบที่สามารถใช้งานได้</v-list-item-title>
                          <v-list-item-subtitle class="feature_detail">สามารถใช้ได้ทั้งหมด</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="white">
                            mdi-car-multiple
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>จำนวนรถในศูนย์บริการ</v-list-item-title>
                          <v-list-item-subtitle class="feature_detail">ไม่จำกัดจำนวน</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon color="white">
                            mdi-cash-multiple
                          </v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>ราคา</v-list-item-title>
                          <v-list-item-subtitle class="feature_detail">฿ 2,999 ต่อเดือน</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  </v-row>
                  <div v-if="!btBilling" class="text-center plan_button">
                    <v-btn
                      rounded
                      color="primary"
                      dark
                      @click="billingPlan()"
                    >
                      เปลี่ยนแพลน
                    </v-btn>
                  </div>
                  <div v-if="btBilling" class="text-center plan_button">
                    <v-btn
                      rounded
                      outlined
                      color="teal"
                      dark
                    >
                      แพลนปัจจุบัน
                    </v-btn>
                  </div>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card> -->
    </v-dialog>
    </v-navigation-drawer>
  </div>
</template>

<script>
import axios from 'axios' // api
export default {
  data () {
    return {
      title: 'Be-Linked',
      drawer: true,
      mini: false,
      session: this.$session.getAll(),
      workflow: [],
      master: [],
      corporate: [],
      customer: [],
      booking: [],
      broadCast: [],
      items: [],
      Dashboard: [],
      dataPackage: [],
      dialogCash: false,
      btFree: false,
      btBilling: false
    }
  },
  // beforeCreate () {
  //   console.log(this.$route.query)
  //   if (!this.$session.exists()) {
  //     this.$router.push('/Core/Login?' + this.$route.query)
  //   }
  // },
  computed: {},
  mounted () {
    console.log('session', this.session)
    this.items = []
    this.adminChk()
    this.$OmiseCard.configure({
      publicKey: this.$omise_public_key
    })
  },
  methods: {
    logout () {
      console.log(this.$session.getAll())
      // this.$session.destroy()
      // this.$session.clear()
      this.$router.push('/Core/Login')
    },
    adminChk () {
      this.master = []
      this.customer = [
        { title: 'ข้อมูลลงทะเบียนลูกค้า', icon: 'mdi-account-edit', to: '/System/ListMember' }
      ]
      this.booking = [
        { title: 'หน้านัดหมาย', icon: 'mdi-application-settings', to: '/Master/BookingLink' },
        { title: 'รายชื่อลูกค้านัดหมาย', icon: 'mdi-account-edit', to: '/Master/BookingList' },
        { title: 'ปฏิทินนัดหมาย', icon: 'mdi-account-edit', to: '/Master/CalendarBooking' }
      ]
      this.Dashboard = [
        { title: 'นัดหมายเข้ารับบริการ', icon: 'mdi-application-settings', to: '/Dashbord/ReportBooking' },
        { title: 'งานซ่อม', icon: 'mdi-application-settings', to: '/Dashbord/Report' },
        { title: 'Performance', icon: 'mdi-application-settings', to: '/Dashbord/Performance' }

      ]
      this.workflow = [
        { title: 'รับรถลูกค้ารายใหม่', icon: 'mdi-account-plus', to: '/Master/RegisterAdd' },
        // { title: 'จัดการงานบนกระดาน', icon: 'mdi-clipboard-check-multiple-outline', to: '/Master/FlowStep' },
        { title: 'กระดานการทำงาน', icon: 'mdi-clipboard-check-multiple-outline', to: '/Master/BoardControl' },
        // { title: 'เพิ่ม/ลบ กระดาน', icon: 'mdi-application-cog', to: '/Master/JobList' },
        { title: 'เพิ่ม/ลบ สถานะการบริการ', icon: 'mdi-transit-connection-variant', to: '/Master/Flow' },
        { title: 'จัดโครงสร้างกระดาน', icon: 'dashboard', to: '/Master/WorkShop' },
        { title: 'จัดการ ช่องกรอกข้อมูล', icon: 'mdi-account-edit', to: '/Master/CustomField' },
        { title: 'ข้อมูลคะแนนบริการ', icon: 'mdi-account-edit', to: '/Master/Rating' },
        { title: 'จัดการLineGroup', icon: 'mdi-wrench', to: '/Master/SettingLineGroup' }
        // { title: 'รายชื่อร้านค้า', icon: 'mdi-playlist-check', to: '/System/ListShop' },
        // { title: 'กลุ่มผู้ใช้งาน', icon: 'mdi-account-group', to: '/System/UserTypeGroup' },
        // { title: 'Vgroup', icon: 'mdi-account-group', to: '/System/VgroupMapCoin' }
      ]
      this.corporate = [
        { title: 'สาขา', icon: 'mdi-home-group', to: '/Master/Branch' },
        { title: 'พนักงาน', icon: 'mdi-account-multiple', to: '/Master/Employee' },
        { title: 'ช่องทางการชำระเงิน', icon: 'mdi-credit-card-outline', to: '/Master/PaymentType' },
        { title: 'จัดการบริษัท', icon: 'mdi-home-city', to: '/System/EditShop' },
        { title: 'สมัครเเละจัดการยูเซอร์', icon: 'mdi-account-circle', to: '/System/ManageUser' }
      ]
      this.broadCast = [
        { title: 'กลุ่มเป้าหมาย', icon: 'mdi-account-group', to: '/BroadCast/Audience' },
        { title: 'บรอดแคสต์', icon: 'mdi-bullhorn', to: '/BroadCast/BroadCast' }
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
    },
    billingPlan (dt) {
      this.$swal({
        title: 'ต้องการ อัพเดทสมาชิก ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          if (dt.pricePackage === '') {
            var ds = {
              billingPlan: dt.id,
              LAST_USER: this.$session.getAll().data.userName,
              billingCustomerId: '',
              billingCustomerCardId: '',
              billingScheduleId: '',
              billingCustomerData: ''
            }
            axios
              .post(
              // eslint-disable-next-line quotes
                this.DNS_IP + "/sys_shop/edit/" + this.$session.getAll().data.shopId,
                ds
              )
              .then(async response => {
                this.chkPlan()
                this.$swal('เรียบร้อย', 'คุณได้อัพเดทเป็นสมาชิกสายฟรีแล้ว', 'success')
              })
          } else {
            this.$OmiseCard.open({
              amount: parseInt(dt.pricePackage + '00'),
              currency: 'THB',
              defaultPaymentMethod: 'credit_card',
              onCreateTokenSuccess: (nonce) => {
                if (nonce.startsWith('tokn_')) {
                  this.omiseToken = nonce
                  this.getCustomersOmise(nonce, dt)
                } else {
                  this.omiseSource = nonce
                }
              // form.submit()
              }
            })
          }
        })
        .catch(error => {
          this.dataReady = true
          console.log('error function editDataGlobal : ', error)
        })
    },
    async getCustomersOmise (tokn, dt) {
      var ds = {
        billingPlan: dt.id,
        email: this.$session.getAll().data.userName,
        description: this.$session.getAll().data.shopName,
        descriptionCharge: dt.source + '-' + dt.name + '-' + this.$session.getAll().data.shopId,
        card: tokn,
        shopId: this.$session.getAll().data.shopId
      }
      await axios
        .post(this.DNS_IP + '/omise/customers', ds)
        .then(async response => {
          console.log('getCustomersOmise', response)
          if (response.data.status) {
            this.chkPlan()
            this.$swal('เรียบร้อย', 'คุณได้อัพเดทเป็นสมาชิก Premium แล้ว', 'success')
          } else {
            this.$swal('ผิดพลาด', 'กรุณาตรวจสอบข้อมูลครับ', 'error')
          }
        })
    },
    // updateFreePlan () {
    //   this.$swal({
    //     title: 'ต้องการ อัพเดทสมาชิก ใช่หรือไม่?',
    //     type: 'question',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#b3b1ab',
    //     confirmButtonText: 'ใช่',
    //     cancelButtonText: 'ไม่'
    //   })
    //     .then(async result => {
    //       var dt = {
    //         billingPlan: 'free',
    //         LAST_USER: this.$session.getAll().data.userName,
    //         billingCustomerId: '',
    //         billingCustomerCardId: '',
    //         billingScheduleId: '',
    //         billingCustomerData: ''
    //       }
    //       axios
    //         .post(
    //           // eslint-disable-next-line quotes
    //           this.DNS_IP + "/sys_shop/edit/" + this.$session.getAll().data.shopId,
    //           dt
    //         )
    //         .then(async response => {
    //           this.chkPlan()
    //           this.$swal('เรียบร้อย', 'คุณได้อัพเดทเป็นสมาชิกสายฟรีแล้ว', 'success')
    //         })
    //     })
    //     .catch(error => {
    //       this.dataReady = true
    //       console.log('error function editDataGlobal : ', error)
    //     })
    // },
    async chkPlan () {
      this.dataBilling = ''
      await axios
        .get(this.DNS_IP + '/sys_shop/get?shopId=' + this.$session.getAll().data.shopId)
        .then(async response => {
          let rs = response.data[0]
          if (response.data.length > 0) {
            this.dataBilling = parseInt(rs.billingPlan)
            // console.log('shop', response.data[0])
            // if (rs.billingPlan === 'free') {
            //   this.btFree = true
            //   this.btBilling = false
            // } else {
            //   this.btFree = false
            //   this.btBilling = true
            // }
          }
        })
      this.dataPackage = []
      await axios
        .get(this.DNS_IP_Betask + '/packet/getSortNo?source=BeLinked')
        .then(async (responses) => {
          let rsPacket = responses.data
          for (let i = 0; i < rsPacket.length; i++) {
            var d = rsPacket[i]
            var s = {}
            s.id = d.id
            if (d.sortNo === null || d.sortNo === '') {
              s.sortNo = i + 1
            } else {
              s.sortNo = d.sortNo
            }
            s.name = d.name
            s.description = JSON.parse(d.description)
            s.warning = d.warning
            s.close = d.close
            s.source = d.source
            s.pricePackage = d.pricePackage
            s.rangeRePackage = d.rangeRePackage
            this.dataPackage.push(s)
          }
          // this.dataPackage = rsPacket
        })
      this.dialogCash = true
    }
  }
}
</script>

<style lang="css" scoped>
.plan_button {
  padding-bottom: 10px;
}
.feature_detail {
  color:#ddd !important;
}
.listChin {
    background-color: white !important;
}
#img_bt {
  width: 50px;
  height: 50px;
}

</style>
