<template>
  <div>
    <v-card flat>
      <v-toolbar color="#173053" dark extended flat>
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      </v-toolbar>

      <v-card class="mx-auto" max-width="700" style="margin-top: -64px;">
        <v-toolbar flat>
          <v-toolbar-title class="#173053--text">
            {{ dataItem[0].cusName }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn color="#173053" icon>
            <v-icon>mdi-calendar-multiple-check</v-icon>
          </v-btn>
        </v-toolbar>

        <v-divider></v-divider>

        <v-card-text style="height: 200px;"></v-card-text>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios' // api
export default {
  name: 'BookingList',
  data () {
    return {
      session: this.$session.getAll(),
      dataItem: [],
      dataReady: false
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo)
    }
  },
  async mounted () {
    this.chkBookingNo()
  },
  methods: {
    async chkBookingNo () {
      this.dataReady = false
      this.bookNo = this.$route.query.bookNo
      if (this.bookNo === undefined) {
        // console.log('11111111111111', this.bookNo)
      } else {
        let dt = {
          bookNo: this.bookNo
        }
        axios
          .get(
            this.DNS_IP +
              '/booking_view/get?shopId=' +
              this.session.data.shopId +
              '&bookNo=' +
              dt.bookNo
          )
          .then(async response => {
            let rs = response.data
            if (rs.length > 0) {
              var dataItems = []
              this.dataItem = []
              for (let i = 0; i < rs.length; i++) {
                let d = rs[i]
                let s = {}
                s.bookNo = d.bookNo
                s.flowId = d.flowId
                s.flowName = d.flowName
                s.dueDate = d.dueDate
                s.userId = d.userId
                s.chkConfirm = false
                s.chkCancel = false
                s.jobNo = d.jobNo
                s.timeDueHtext = d.timeDueH + ':00'
                s.timeDuetext = d.timeDue
                this.countAll = this.countAll + 1
                if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                  s.chkConfirm = true
                  s.chkCancel = false
                }
                if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                  s.chkConfirm = false
                  s.chkCancel = true
                }
                if (d.statusBt) {
                  s.statusBt = d.statusBt
                  if (d.statusBt === 'confirm') {
                    s.statusBtText = 'โทรยืนยันแล้ว'
                  } else if (d.statusBt === 'cancel') {
                    s.statusBtText = 'ยกเลิก'
                  } else if (d.statusBt === 'confirmJob') {
                    s.statusBtText = 'รับรถแล้ว'
                  }
                } else {
                  s.statusBt = 'wait'
                  s.statusBtText = 'รายการนัดหมายใหม่'
                }
                let dataBookingData = []
                await axios
                  .get(
                    // eslint-disable-next-line quotes
                    this.DNS_IP + "/BookingData/get?bookNo=" + d.bookNo
                  )
                  .then(async responses => {
                    // console.log('getDataData', responses.data)
                    dataBookingData = responses.data
                    // for (let i = 0; i < response.data.length; i++) {
                    //   let e = response.data[i]
                    //   if (e.fieldName === 'ชื่อ') {
                    //     s.cusName = s.fieldValue
                    //   }
                    //   if (e.fieldName === 'เลขทะเบียน') {
                    //     s.cusReg = s.fieldValue
                    //   }
                    // }
                  })
                s.cusName = dataBookingData.filter(function (el) {
                  return el.fieldName === 'ชื่อ'
                })
                s.cusReg = dataBookingData.filter(function (el) {
                  return el.fieldName === 'เลขทะเบียน'
                })
                s.tel = dataBookingData.filter(function (el) {
                  return el.fieldName === 'เบอร์โทร'
                })
                if (s.cusName.length > 0) {
                  s.cusName = s.cusName[0].fieldValue
                } else {
                  s.cusName = ''
                }
                if (s.cusReg.length > 0) {
                  s.cusReg = s.cusReg[0].fieldValue
                } else {
                  s.cusReg = ''
                }
                if (s.tel.length > 0) {
                  s.tel = s.tel[0].fieldValue
                } else {
                  s.tel = ''
                }
                dataItems.push(s)
              }
              console.log('dataItems', dataItems)
              if (dataItems.length === 0 || dataItems.status === false) {
                this.dataItem = []
                this.dataReady = true
                // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
              } else {
                this.dataItem = dataItems
                this.dataReady = true
              }
            }
          })
        // masBranchID
        // this.getBookingData(dt)
        this.dialogEdit = true
      }
    },
    async getBookingList () {
      // Clear Data ทุกครั้ง
      console.log('this.masBranchID1', this.masBranchID)
      if (this.masBranchID) {
        this.masBranchID = this.masBranchID
      } else {
        this.masBranchID = this.branch[0].value
      }
      this.dataReady = false
      this.selectedStatus = false
      this.getSelectText = ''
      this.dataItem = []
      // Clear ช่องค้นหา
      this.searchAll2 = ''
      var dataItemTimes = []
      var dataItems = []
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&dueDate=' +
            this.dateStart
        )
        .then(async response => {
          // console.log('getData', response.data)
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              let d = response.data[i]
              let s = {}
              s.bookNo = d.bookNo
              s.flowId = d.flowId
              s.flowName = d.flowName
              s.dueDate = d.dueDate
              s.userId = d.userId
              s.chkConfirm = false
              s.chkCancel = false
              s.jobNo = d.jobNo
              s.timeDueHtext = d.timeDueH + ':00'
              s.timeDuetext = d.timeDue
              this.countAll = this.countAll + 1
              if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                s.chkConfirm = true
                s.chkCancel = false
              }
              if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                s.chkConfirm = false
                s.chkCancel = true
              }
              if (d.statusBt) {
                s.statusBt = d.statusBt
                if (d.statusBt === 'confirm') {
                  s.statusBtText = 'โทรยืนยันแล้ว'
                  this.countConfirm = this.countConfirm + 1
                } else if (d.statusBt === 'cancel') {
                  s.statusBtText = 'ยกเลิก'
                  this.countCancel = this.countCancel + 1
                } else if (d.statusBt === 'confirmJob') {
                  s.statusBtText = 'รับรถแล้ว'
                  this.countJob = this.countJob + 1
                }
              } else {
                s.statusBt = 'wait'
                s.statusBtText = 'รายการนัดหมายใหม่'
                this.countWaiting = this.countWaiting + 1
              }
              var chkTime = this.dataItemTime.filter(el => {
                return el.timeDueHtext === s.timeDueHtext
              })
              if (chkTime.length === 0) {
                dataItemTimes.push(s)
              }
              let dataBookingData = []
              await axios
                .get(
                  // eslint-disable-next-line quotes
                  this.DNS_IP + "/BookingData/get?bookNo=" + d.bookNo
                )
                .then(async responses => {
                  // console.log('getDataData', responses.data)
                  dataBookingData = responses.data
                  // for (let i = 0; i < response.data.length; i++) {
                  //   let e = response.data[i]
                  //   if (e.fieldName === 'ชื่อ') {
                  //     s.cusName = s.fieldValue
                  //   }
                  //   if (e.fieldName === 'เลขทะเบียน') {
                  //     s.cusReg = s.fieldValue
                  //   }
                  // }
                })
              s.cusName = dataBookingData.filter(function (el) {
                return el.fieldName === 'ชื่อ'
              })
              s.cusReg = dataBookingData.filter(function (el) {
                return el.fieldName === 'เลขทะเบียน'
              })
              s.tel = dataBookingData.filter(function (el) {
                return el.fieldName === 'เบอร์โทร'
              })
              if (s.cusName.length > 0) {
                s.cusName = s.cusName[0].fieldValue
              } else {
                s.cusName = ''
              }
              if (s.cusReg.length > 0) {
                s.cusReg = s.cusReg[0].fieldValue
              } else {
                s.cusReg = ''
              }
              if (s.tel.length > 0) {
                s.tel = s.tel[0].fieldValue
              } else {
                s.tel = ''
              }
              dataItems.push(s)
            }
          }
          if (dataItems.length === 0 || dataItems.status === false) {
            this.dataItem = []
            this.dataItemTime = []
            this.dataReady = true
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          } else {
            this.dataItem = dataItems
            var datause = dataItemTimes.sort((a, b) => {
              if (a.timeDueHtext < b.timeDueHtext) return -1
              return a.timeDueHtext > b.timeDueHtext ? 1 : 0
            })
            for (var k = 0; k < datause.length; k++) {
              var t = datause[k]
              var h = {}
              h.timeDueHtext = t.timeDueHtext
              let chkTimes = this.dataItemTime.filter(el => {
                return el.timeDueHtext === t.timeDueHtext
              })
              console.log('chkTimes', chkTimes)
              if (chkTimes.length === 0) {
                this.dataItemTime.push(h)
              }
            }
            // this.dataItemTime = dataItemTimes.sort((a, b) => {
            //   if (a.timeDueHtext < b.timeDueHtext) return -1
            //   return a.timeDueHtext > b.timeDueHtext ? 1 : 0
            // })
            console.log('dataItemTime', this.dataItemTime)
            this.dataReady = true
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          this.dataReady = true
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    },
    async getBookingData (dt) {
      this.BookingDataItem = []
      await axios
        .get(this.DNS_IP + '/BookingDataSelect/get?bookNo=' + dt.bookNo)
        .then(async response => {
          let rs = response.data
          console.log('BookingDataSelect', rs)
          if (response.data) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              if (d.userId === 'user-skip') {
                d.userId = ''
              }
              d.shopId = this.session.data.shopId
              d.userName = this.$session.getAll().data.userName
              this.BookingDataItem.push(d)
            }
            // await this.getBookingField()
            await this.getflowfield(dt)
          }
        })
    }
  }
}
</script>
