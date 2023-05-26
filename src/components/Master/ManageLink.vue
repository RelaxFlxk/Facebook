<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
          </v-col>
        </v-row>
        <h3 class="text-left ml-4 mb-16 font-weight-bold">ลิ้งค์สำหรับส่งให้ลูกค้า / Admin</h3>
        <v-row>
          <v-col  >
            <v-sheet min-height="650px">
              <h3 class="text-left ml-4 mb-10 font-weight-bold"> QR CODE สำหรับสแกน</h3>
              <div class="ml-1">
                <v-card class="pa-2 ma-4">
                  <h3 class="text-center mt-5" v-if="value !== ''">{{linkItem.filter((v) => v.text === value)[0].title}}</h3>
                  <div class="text-center ma-7 mt-3" ref="printMe" v-if="value !== ''">
                   <v-sheet class="py-6">
                      <qrcode-vue :value="value" :size="size" level="H" :foreground="foreground" />
                   </v-sheet>
                </div>
                <div class="text-center ma-7" v-else>
                  <v-icon color="#000000" style="font-size:200px;">
                    mdi-select-search
                  </v-icon>
                </div>
                <!-- <div class="text-center mt-n2 mb-5" v-if="value !== ''">
                  <v-btn
                    class="mx-2"
                    dark
                    rounded
                    x-large
                    color="#173053"
                    @click="downloadQR()"
                  >
                    <v-icon dark x-large>
                      mdi-cloud-download
                    </v-icon>
                  </v-btn>
                </div> -->
                </v-card>
                <!-- <h6>ระบุ URL ที่ต้องการสร้างคิวอาร์โค๊ด</h6> -->
                <v-row>
                  <v-col cols="12" v-if="qrValue !== '' && qrValue !== null">
                    <v-text-field
                    v-model="qrValue"
                    label="URL"
                    outlined
                    prepend-inner-icon="mdi-paperclip"
                    disabled
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-btn
                  v-if="qrValue !== '' && qrValue !== null"
                  block
                  color="#2BC155"
                  dark
                  rounded
                  large
                  @click="downloadQR()"
                >Download QR CODE
                <v-icon class="ml-3" dark x-large>
                      mdi-cloud-download
                    </v-icon>
                    </v-btn>
              </div>
            </v-sheet>
          </v-col>
          <v-col >
            <v-sheet min-height="650px">
              <h3 class="text-left ml-4 mb-10 font-weight-bold">ลิ้งค์สำหรับลูกค้า</h3>
              <div class="ml-10" >
                <!-- <h6 v-if="item.type === 'customer'">{{item.title}}</h6> -->
                <v-row v-for="(item1,i) in linkItem" :key="i">
                  <v-col cols="12" class="pa-0" v-if="item1.type === 'customer'">
                    <v-text-field
                    class=""
                    solo
                    v-model="item1.title"
                    readonly
                    >
                    <template v-slot:append-outer>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                          class="mx-2 mt-n2 ml-n1"
                          dark
                          fab
                          small
                          v-bind="attrs"
                          v-on="on"
                          color="#2BC155"
                          @click="coppyLink(item1.text)"
                        >
                          <v-icon dark>
                            mdi-content-copy
                          </v-icon>
                        </v-btn>
                        </template>
                        <span>Coppy Link / สร้าง QR CODE</span>
                      </v-tooltip>
                    </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </div>
              <h3 class="text-left ml-4 mb-10 mt-5 font-weight-bold">ลิ้งค์สำหรับ Admin</h3>
              <div class="ml-10" >
                <v-row v-for="(item2,y) in linkItem" :key="y" >
                  <v-col cols="12" class="pa-0" v-if="item2.type === 'admin'">
                    <v-text-field
                    class=""
                    solo
                    v-model="item2.title"
                    readonly
                    >
                    <template v-slot:append-outer>
                     <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                          class="mx-2 mt-n2 ml-n1"
                          dark
                          fab
                          small
                          v-bind="attrs"
                          v-on="on"
                          color="#2BC155"
                          @click="coppyLink(item2.text)"
                        >
                          <v-icon dark>
                            mdi-content-copy
                          </v-icon>
                        </v-btn>
                        </template>
                        <span>Coppy Link / สร้าง QR CODE</span>
                      </v-tooltip>
                    </template>
                    </v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import QrcodeVue from 'qrcode.vue'
// import moment from 'moment-timezone'

import Vue from 'vue'
import VueHtml2Canvas from 'vue-html2canvas'
Vue.use(VueHtml2Canvas)

export default {
  components: {
    QrcodeVue,
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  data () {
    return {
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'จัดการ การแจ้งเตือน LineGroup',
          disabled: false,
          href: '/Master/SettingLineNotify'
        }
      ],
      shopId: this.$session.getAll().data.shopId,
      linkItem: [],
      Alerts: false,
      output: null,
      value: '',
      size: 200,
      foreground: '#000000',
      qrValue: null,
      dataLineConfig: {}
    }
  },
  async mounted () {
    this.dataLineConfig = await this.getDataLineConfig(this.$session.getAll().data.shopId)
    await this.getShop()
    await this.setLinkItem()
  },
  methods: {
    async downloadQR () {
      await this.print()
      await axios({
        url: this.output,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        let fileUrl = window.URL.createObjectURL(new Blob([response.data]))
        let fileLink = document.createElement('a')
        fileLink.href = fileUrl
        let fieldName = this.linkItem.filter((v) => v.text === this.value)[0].title
        fileLink.setAttribute('download', 'QR CODE ' + fieldName + '.jpg')
        document.body.appendChild(fileLink)

        fileLink.click()
      })
    },
    async genQrCode (link) {
      this.qrValue = link
      this.value = link
    },
    async print () {
      const el = this.$refs.printMe
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: 'dataURL'
      }
      this.output = await this.$html2canvas(el, options)
      console.log('this.output', this.output)
    },
    async getShop () {
      await axios
        .get(this.DNS_IP + '/sys_shop/get?shopId=' + this.shopId)
        .then(response => {
          let rs = response.data
          console.log('rssssssssssss', rs)
        })
    },
    async coppyLink (item) {
      console.log('item', item)
      // this.$swal.fire('Any fool can use a computer')
      // this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
      this.$swal({
        title: 'Copy successfully',
        text: 'คัดลอกลิ้งสำเร็จ',
        type: 'success',
        timer: 2000,
        showConfirmButton: false
      })
      await navigator.clipboard.writeText(item)
      // setTimeout(() => {
      //   this.Alerts = false
      // }, 4000)
      await this.genQrCode(item)
    },
    async setLinkItem () {
      this.linkItem = []
      if (this.$session.getAll().data.timeSlotStatus === 'True') {
        let itemLink = [
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/CalendarBookingEmp?shopId=' + this.shopId,
            'title': 'ตรวจสอบคิวว่างก่อนนัดหมาย',
            'type': 'customer'
          },
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/CalendarBookingAutoEmp?shopId=' + this.shopId,
            'title': 'ตรวจสอบคิวว่างก่อนนัดหมาย (ลูกค้าไม่ระบุช่าง)',
            'type': 'customer'
          },
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/PaymentUpload?shopId=' + this.shopId,
            'title': 'อัพโหลดสลิปมัดจำ ( ย้อนหลัง )',
            'type': 'customer'
          },
          {
            'text': 'https://betask-linked-admin.web.app/CheckBookingEmpList?shopId=' + this.shopId,
            'title': 'ตรวจสอบรายการนัดหมาย ( มือถือ / แทปเล็ต )',
            'type': 'admin'
          },
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/CheckBookingLatest?shopId=' + this.shopId,
            'title': 'ตรวจสอบรายการนัดหมาย',
            'type': 'customer'
          },
          // {
          //   'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/CheckBookingNext?shopId=' + this.shopId,
          //   'title': 'ลูกค้านัดหมาย',
          //   'type': 'customer'
          // },
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/stampFirstStep?shopId=' + this.shopId,
            'title': 'ลูกค้าตรวจสอบและเข้ารับบริการ',
            'type': 'customer'
          }
        ]
        this.linkItem = itemLink
      } else {
        let itemLink = [
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/CalendarBooking?shopId=' + this.shopId,
            'title': 'ตรวจสอบคิวว่างก่อนนัดหมาย',
            'type': 'customer'
          },
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/PaymentUpload?shopId=' + this.shopId,
            'title': 'อัพโหลดสลิปมัดจำ ( ย้อนหลัง )',
            'type': 'customer'
          },
          {
            'text': 'https://betask-linked-admin.web.app/CheckBookingList?shopId=' + this.shopId,
            'title': 'ตรวจสอบรายการนัดหมาย ( มือถือ / แทปเล็ต )',
            'type': 'admin'
          },
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/CheckBookingLatest?shopId=' + this.shopId,
            'title': 'ตรวจสอบรายการนัดหมาย ',
            'type': 'customer'
          },
          // {
          //   'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/CheckBookingNext?shopId=' + this.shopId,
          //   'title': 'ลูกค้าตรวจสอบและเข้ารับบริการ',
          //   'type': 'customer'
          // },
          {
            'text': 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/stampFirstStep?shopId=' + this.shopId,
            'title': 'ลูกค้าตรวจสอบและเข้ารับบริการ',
            'type': 'customer'
          }
        ]
        this.linkItem = itemLink
      }
      console.log('test', this.linkItem)
    }
  }
}
</script>
<style scope>
#margin {
  margin-top: 50px;
  margin-bottom: 40px;
}
.v_text_edit {
  Width: 255px;
  Height: 52px;
  font-size: 10px !important;
}
#subtext {
  color: #173053;
  font-size: 30px !important;
  font-weight: bold;
}
/* width */
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #173053;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #173053;
}
</style>
