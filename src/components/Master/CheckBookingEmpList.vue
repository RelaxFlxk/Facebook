<template>
  <div>
    <v-card flat v-if="!dataReady" class="centered">
      <v-card-text>
        <waitingAlert></waitingAlert>
      </v-card-text>
    </v-card>
    <v-card flat v-if="dataReady">
      <v-card-text>
        <v-container>
            <v-row>
            <v-col cols="12" class="text-left pt-6">
                <h6 class="font-weight-bold" style="color:#173053;">
                รายการที่ยังไม่ได้ยืนยัน
                </h6>
            </v-col>
            <v-col cols="12" class="pb-0">
                <v-data-table
                :headers="headers"
                :items="desserts"
                hide-default-footer
                disable-pagination
                :mobile-breakpoint="0"
                class="elevation-1"
                >
                <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                    @click="gotoBookNo(item)"
                    rounded
                    x-small
                    color="primary"
                    dark
                    >
                    จัดการ
                    </v-btn>
                </template>
                </v-data-table>
            </v-col>
            </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios' // api
import waitingAlert from '../waitingAlert.vue'
export default {
  components: {
    waitingAlert
  },
  name: 'BookingMobileEmp',
  data () {
    return {
      dataReady: false,
      BookingDataListWait: [],
      DataFlowName: [],
      headers: [
        {
          text: 'วันที่นัดหมาย',
          value: 'dueDate',
          sortable: true,
          align: 'left',
          width: '120px'
        },
        { text: 'ชื่อลูกค้า', value: 'cusName', sortable: true, align: 'left' },
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ],
      desserts: []
    }
  },
  async mounted () {
    await this.beforeCreate()
  },
  methods: {
    async beforeCreate () {
      if (JSON.parse(localStorage.getItem('sessionData')) !== null) {
        if (JSON.parse(localStorage.getItem('sessionData')).shopId === this.$route.query.shopId) {
          this.$session.start()
          this.$session.set('data', JSON.parse(localStorage.getItem('sessionData')))
          await this.getDataFlow()
          await this.getCheckWait()
        } else {
          this.$router.push('/Core/Login?shopId=' + this.$route.query.shopId + '&type=CheckListBookingEmp')
        }
      } else {
        if (!this.$session.exists()) {
          this.$router.push('/Core/Login?shopId=' + this.$route.query.shopId + '&type=CheckListBookingEmp')
        } else {
          if (this.$session.getAll().data.shopId === this.$route.query.shopId) {
            localStorage.setItem('sessionData', JSON.stringify(this.$session.getAll().data))
            await this.getDataFlow()
            await this.getCheckWait()
          } else {
            this.$router.push('/Core/Login?shopId=' + this.$route.query.shopId + '&type=CheckListBookingEmp')
          }
        }
      }
      // console.log(JSON.stringify(this.$session.getAll().data))
    },
    gotoBookNo (item) {
      this.$router.push('/BookingMobileEmp?bookNo=' + item.bookNo + '&shopId=' + this.$route.query.shopId)
      location.reload()
    },
    getDataFromFieldName (data, key) {
      if (data !== undefined) {
        return data.filter(function (el) {
          return el.fieldName === key
        })
      } else {
        return []
      }
    },
    async getCheckWait () {
      this.dataReady = false
      this.BookingDataListWait = []
      let url = `${this.DNS_IP}/BookingData/getView?shopId=${this.$route.query.shopId}&statusBt=is null`
      await axios
        .get(url)
        .then(async response => {
          if (response.data.status !== false) {
            response.data.forEach((row) => {
              if (typeof (this.BookingDataListWait[row.bookNo]) === 'undefined') {
                this.BookingDataListWait[row.bookNo] = []
              }
              this.BookingDataListWait[row.bookNo].push(row)
            })
          }
        })
      let urlApiwait = this.DNS_IP + '/booking_view/get?shopId=' + this.$route.query.shopId + '&statusBt=null&checkOnsite=is null'
      let dataItems = []
      await axios
        .get(urlApiwait)
        .then(async responses => {
          if (responses.data.length > 0) {
            // console.log('length', responses.data.length)
            for (let i = 0; i < responses.data.length; i++) {
              let d = responses.data[i]
              let s = {}
              if (this.BookingDataListWait[d.bookNo] !== undefined) {
                s.bookNo = d.bookNo
                s.flowId = d.flowId
                let checkDeposit = this.DataFlowName.filter(el => { return el.value === parseInt(d.flowId) })
                if (checkDeposit.length > 0) {
                  s.depositCheckStatus = checkDeposit[0].allData.checkDeposit || 'False'
                } else {
                  s.depositCheckStatus = 'False'
                }
                s.flowName = d.flowName
                s.dueDate = d.dueDate || ''
                if (d.timeText === null || d.timeText === '') {
                  d.timeText = d.timeDue
                }
                if (s.dueDate === '') {
                  s.dueDateText = 'ไม่มีเวลานัดหมาย'
                } else {
                  s.dueDateText = this.format_dateNotime(d.dueDate) + ' ' + d.timeText
                }
                s.shopId = d.shopId
                s.remark = d.remark || ''
                s.masBranchID = d.masBranchID
                s.limitBookingCheck = d.limitBookingCheck
                s.memberId = d.memberId || ''
                s.countHourLimit = d.countHourLimit
                s.empSelect = d.empSelect
                s.empFull_NameTH = d.empFull_NameTH || ''
                s.empFull_NameTH = s.empFull_NameTH.replace('นางสาว', '')
                s.empFull_NameTH = s.empFull_NameTH.replace('นาย', '')
                s.empFull_NameTH = s.empFull_NameTH.replace('นาง', '')
                s.userId = d.userId
                s.chkConfirm = false
                s.chkCancel = false
                s.address = d.address
                s.addressLatLong = d.addressLatLong
                s.jobNo = d.jobNo
                s.timeText = d.timeText
                s.remarkRemove = d.remarkRemove || ''
                s.remarkConfirm1 = (d.remarkConfirm1 === 'true' || d.remarkConfirm1 === 'True')
                s.remarkConfirm2 = (d.remarkConfirm2 === 'true' || d.remarkConfirm2 === 'True')
                s.extraJob = (d.extraJob === 'true' || d.extraJob === 'True')
                s.fastTrack = (d.fastTrack === 'true' || d.fastTrack === 'True')
                s.depositStatus = d.depositStatus || 'False'
                s.depositImge = d.depositImge || ''
                s.lineUserId = d.lineUserId
                s.memberPicture = d.memberPicture
                s.timeDueHtext = d.timeDueH + ':00'
                s.timeDuetext = d.timeDue
                s.countChangeTime = d.countChangeTime || 0
                s.remarkReturn = d.remarkReturn || ''
                s.dateReturn = d.dateReturn || ''
                s.packageId = d.packageId || ''
                s.tokenPackage = d.tokenPackage || ''
                s.memberDataTag = JSON.parse(d.memberDataTag) || []
                if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                  s.chkConfirm = true
                  s.chkCancel = false
                }
                if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                  s.chkConfirm = false
                  s.chkCancel = true
                }
                s.statusBt = d.statusBt || 'wait'
                switch (s.statusBt) {
                  case 'wait':
                    s.statusBtText = 'รายการนัดหมายใหม่'
                    break
                }
                s.cusName = this.getDataFromFieldName(this.BookingDataListWait[d.bookNo], 'ชื่อ')
                s.cusReg = this.getDataFromFieldName(this.BookingDataListWait[d.bookNo], 'เลขทะเบียน')
                s.tel = this.getDataFromFieldName(this.BookingDataListWait[d.bookNo], 'เบอร์โทร')
                s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                dataItems.push(s)
                // console.log('this.countWaiting', this.countWaiting)
              } else {
                console.log('BookingNo no bookingData', d.bookNo)
              }
            }
            console.log('dataItems', dataItems)
            if (dataItems.length > 0) {
              this.desserts = dataItems.filter(el => { return el.bookNo !== this.bookNo })
            } else {
              this.desserts = []
            }
            this.dataReady = true
          } else {
            this.dataReady = true
            this.desserts = []
          }
        })
    },
    async getDataFlow () {
      this.DataFlowName = await this.getDataFromAPI('/flow/get', 'flowId', 'flowName', '&checkOnsite=True')
    },
    async getDataFromAPI (url, fieldId, fieldName, param) {
      let result = []
      await axios
        .get(this.DNS_IP + `${url}?shopId=${this.$route.query.shopId}${param}`)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d[fieldName]
              s.value = d[fieldId]
              s.allData = d
              result.push(s)
              // console.log('this.DataFlowName', this.DataFlowName)
            }
          } else {
            result = []
          }
        })
      return result
    }
  }
}
</script>
<style scoped>
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
