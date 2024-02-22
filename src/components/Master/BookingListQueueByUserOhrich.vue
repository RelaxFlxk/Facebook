<template>
  <v-main class="main">
    <div class="d-flex flex-column flex-sm-row mx-5 my-sm-5 my-2">
      <div class="col-12 col-sm-12 col-md-6">
        <v-card flat v-if="!overlay">
            <v-card-text>
               <div class="text-center">
                <waitingAlert></waitingAlert>
              </div>
            </v-card-text>
        </v-card>
        <v-card class="p-3 p-md-5 main-card" v-if="overlay">
        <div class="d-flex flex-column">
          <div class="d-flex flex-row d-flex justify-content-between">
            <div><h5 class="font-weight-bold m-0" v-if="itemBooking.length > 0" >Counter {{$session.getAll().data.counter}}</h5></div>
            <div class="d-flex flex-sm-row">
              <div class="d-flex flex-row align-items-center mr-3" v-if="branchItem">
                <div class="mr-1"><v-icon  color="red">mdi-map-marker</v-icon></div>
                <div><span class="text-main">{{ branchItem.filter(el => { return masBranchID === el.value })[0].text }}</span></div>
              </div>
              <div class="d-flex flex-row align-items-center mr-3">
                <div class="mr-1"><v-icon  color="red">mdi-calendar-blank-outline</v-icon></div>
                <div><span class="text-main">{{currentDate }}</span></div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <v-card class="p-3">
              <div>
                <h5 class="font-weight-bold">เลือกประเภทของบริการ</h5>
              </div>
              <div v-for="(flowitem, index) in flowSelectCheckItem" :key="index">
                <div class="d-flex flex-row justify-content-between align-items-center">
                  <div><span>{{ flowitem.flowNameEn + ' : Type ' + flowitem.storeFrontText }}</span></div>
                  <div><v-switch inset color="success" v-model="flowSelectCheck" :value="flowitem.storeFrontText" @change="UpdatetypeStoreFrontText()" /></div>
                </div>
                <v-divider v-if="(index + 1) < flowSelectCheckItem.length" class="m-0"></v-divider>
                 </div>
            </v-card>
          </div>
          <div class="d-flex flex-row justify-content-between align-items-center my-5">
            <div><span class="text-center font-weight-black text-number">{{  itemBooking && itemBooking.length >0  ? itemBooking[0].storeFrontQueue : 'XXXX' }}</span></div>
            <div>
              <v-btn
                @click="closeJobSubmit(itemBooking[0])"
                :disabled= "itemBooking[0].statusBt !== 'confirm'"
                dark
                :class="`rounded-btn justify-content-center align-items-center ${itemBooking[0].statusBt === 'confirm' ? 'rounded-btn-confirm':'rounded-btn-closejob'}`">
                <div class="d-flex flex-column">
                <div><v-icon size="45">mdi-bell-ring</v-icon></div>
                <div><span :class="`text-event ${itemBooking[0].statusBt === 'confirm' ? 'text-white' :'text-bell-disabled'}`">เรียกคิว</span></div>
                </div>
            </v-btn>
            </div>
          </div>
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div class="w-100 mr-2">
              <v-btn class="btn-event" color="warning" rounded elevation="1" @click="removeQueue(itemBooking[0])">
               <v-icon class="mr-2">mdi-delete</v-icon><span class="text-event">ลบคิว</span> </v-btn></div>
            <div class="w-100 mx-2">
               <v-btn  class="btn-event" color="#1B437C" rounded :disabled="itemBooking[0].statusBt === 'confirmJob' ? false : true"
               @click="closeJobSubmitReturn(itemBooking[0])">
                <strong class="text-white text-event">เรียกคิวซ้ำ</strong>
                </v-btn>
            </div>
            <div class="w-100 ml-2">
              <v-btn class="btn-event" color="#F38383" rounded
              :disabled="itemBooking[0].statusBt === 'confirmJob' && dataReady === false ? false : true"
              @click="backHomeSubmit(itemBooking[0])">
               <strong class="text-white text-event">ปิดงาน</strong>
               </v-btn>
            </div>
          </div>
        </div>
        </v-card>
    </div>
      <div class="col-12 col-sm-12 col-md-6">
        <v-card class="p-4 main-card h-100">
         <div class="d-flex flex-column">
           <div><h3 class="font-weight-black text-center mt-3"> {{ 'จำนวนคิวที่รอ (' + datawainingShow.length + ')' }}</h3></div>
           <div class="pa-1" style="display: flex;flex-wrap: wrap;justify-content: space-around;flex-direction: row;">
            <v-col :cols="resCol === '12' ? '4' : '4'" v-for="(itemShow, i) in datawainingShow" :key="i">
             <h3 class="font-weight-black text-center">{{ itemShow.storeFrontQueue }}</h3>
              </v-col>
          </div>
         </div>
      </v-card>
    </div>
    </div>
    <v-footer fixed padless color="rgb(148 213 11)" class="text-center mt-n16"
     style="justify-content: center;">
      <p class="text-white" width="100%">POWERED BY BETASK CONSULTING</p>
    </v-footer>
  </v-main>
</template>
<script>
import waitingAlert from '../waitingAlert.vue'
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import pdfMake from 'pdfmake'
import pdfFonts from '../../assets/custom-fonts.js' // 1. import custom fonts
import moment from 'moment-timezone'
import printJS from 'print-js'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    waitingAlert
  },
  data () {
    return {
      languageSelect: 0,
      servicePointItem: [],
      servicePoint: '',
      closeItem: '',
      dialogServicePointStatus: false,
      validSearch: true,
      statusReturn: false,
      itemBooking: [],
      BookingDataList: [],
      menuStart: false,
      dialogPrint: false,
      overlay: true,
      time: '',
      timeavailable: [],
      branchItem: [],
      masBranchID: '',
      DataFlowItem: [],
      flowSelect: '',
      dateStart: '',
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'จัดการ Queue',
          disabled: false,
          href: '/Master/BookingListQueue'
        }
      ],
      dialog: false,
      dialogAdd: false,
      // session: this.$session.getAll(),
      // shopId: this.$session.getAll().data.shopId,
      search: '',
      shopName: '',
      shopImg: '',
      headers: [
        { text: 'คิว', value: 'storeFrontQueue' },
        // { text: 'วันที่นัดหมาย', value: 'dueDate' },
        { text: 'บริการ', value: 'flowName' },
        { text: 'ชื่อลูกค้า', value: 'cusName' },
        // { text: 'H.N.', value: 'hnNo' },
        { text: 'จัดการข้อมูล', value: 'action', sortable: false, align: 'center' }
      ],
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
      dataLineConfig: {},
      HistoryData: [],
      pictureUrHistory: '',
      dialogHistory: false,
      shopPhone: '',
      setTimerCalendar: null,
      checkRef: false,
      checkStatusEdit: false,
      datawainingShow: [],
      dataReady: false,
      flowSelectCheckItem: [],
      flowSelectCheck: [],
      currentDate: moment().format('DD/MMM/YYYY')
      // datawainingShowtest: [
      //   'A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A001', 'A002', 'A003', 'A004', 'A005', 'A006'
      // ]
    }
  },
  watch: {
    // whenever question changes, this function will run
    flowSelectCheck (newQuestion, oldQuestion) {
      console.log('flowSelectCheck', newQuestion, oldQuestion)
    }
  },
  computed: {
    resCol () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '12'
        case 'sm':
          return '12'
        case 'md':
          return '6'
        case 'lg':
          return '6'
        case 'xl':
          return '6'
      }
    },
    dialogwidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '70%'
        case 'sm': return '60%'
        case 'md': return '50%'
        case 'lg': return '50%'
        case 'xl': return '50%'
      }
    }
  },
  async mounted () {
    this.dateStart = this.momenDate_1(new Date())
    await this.beforeCreate()
    // await this.UpdatetypeStoreFrontText()
  },
  methods: {
    async UpdatetypeStoreFrontText () {
      console.log('Start !! UpdatetypeStoreFrontText')
      let dataSession = this.$session.get('data')
      dataSession.typeStoreFrontText = this.flowSelectCheck
      this.$session.set('data', dataSession)
      let obj = {
        'typeStoreFrontText': JSON.stringify(this.flowSelectCheck)
      }
      let id = this.$session.getAll().data.userId
      this.searchBooking('unNoti')
      this.updateSYS_USER(id, obj)
    },
    async updateSYS_USER (id, obj) {
      await axios
        .post(this.DNS_IP + '/system_user/edit/' + id, obj)
        .then(async responses => { console.log(responses) })
        .catch((error) => { console.log(error) })
    },
    async getFirestore () {
      this.firestore = this.$firebase.firestore()
      this.firestore.collection('ProcessOhrichUpdate').limit(1000).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (this.checkRef === false) {
            this.checkRef = true
            this.updateProcessOhrichUpdate()
            await this.getBefore()
          } else {
            if (change.doc.data().active === '1' && change.doc.data().masBranchID === this.$session.getAll().data.masBranchID) {
              // if (change.doc.data().active === '1' && change.doc.id === this.$session.getAll().data.userName) {
              if (JSON.parse(localStorage.getItem('sessionData')) !== null) {
                if (change.doc.id === this.$session.getAll().data.userName) {
                  if (!this.checkStatusEdit) {
                    await this.getBefore()
                    this.updateProcessOhrichUpdate()
                  }
                }
              } else {
                await this.checkSession()
              }
            }
          }
        })
      })
    },
    updateProcessOhrichUpdate (item) {
      let params = {
        userName: this.$session.getAll().data.userName,
        masBranchID: this.$session.getAll().data.masBranchID
      }
      axios.post('https://asia-southeast1-be-linked-a7cdc.cloudfunctions.net/Pepsico-ProcessOhrichUseNew', params)
    },
    async resetFirebaseUse (item) {
      let params = {
        userName: this.$session.getAll().data.userName,
        masBranchID: this.$session.getAll().data.masBranchID
      }
      await axios.post('https://asia-southeast1-be-linked-a7cdc.cloudfunctions.net/Pepsico-ProcessOhrichNew', params)
    },
    closeSetTimeBookingListQueue () {
      clearInterval(this.setTimerCalendar)
      this.setTimerCalendar = null
    },
    clearTimeLoop () {
      clearInterval(this.setTimerCalendar)
      this.setTimerCalendar = null
      let _this = this
      this.setTimerCalendar = setInterval(function () { _this.searchBooking('unNoti') }, 15000)
    },
    async removeQueue (item) {
      // console.log('removeQueue', item)
      let statusBooking = await this.checkBookingStatus(item.bookNo)
      this.checkStatusEdit = true
      if (statusBooking === 'confirmJob' || statusBooking === 'confirm') {
        // this.$swal({
        //   title: 'ต้องการยกเลิกคิวนี้ ใช่หรือไม่?',
        //   type: 'question',
        //   showCancelButton: true,
        //   confirmButtonColor: '#1DBF73',
        //   cancelButtonColor: '#F38383',
        //   confirmButtonText: 'ใช่',
        //   cancelButtonText: 'ไม่'
        // }).then(async response => {
        // // await this.clearConfirmJob(item.dueDate)
        var dtt = {
          bookNo: item.bookNo,
          contactDate: this.format_date(new Date()),
          status: 'cancel',
          statusUse: 'use',
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.$session.getAll().data.userName,
          LAST_USER: this.$session.getAll().data.userName,
          remarkRemove: 'เนื่องจากลูกค้าไม่มาตามคิวที่เลือก'
        }
        await axios
          .post(this.DNS_IP + '/booking_transaction/add', dtt)
          .then(async responses => {
            // this.$swal('เรียบร้อย', 'ยกเลิกคิวสำเร็จ', 'success')
            this.resetFirebaseUse()
            await this.searchBooking('unNoti')
            // this.clearTimeLoop()
          })
        // }).catch(async err => {
        //   // this.$router.push({ name: '404' })
        //   console.log(err.code, err.message)
        //   await this.searchBooking('unNoti')
        //   // this.clearTimeLoop()
        // })
      } else {
        this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
        this.resetFirebaseUse()
        await this.searchBooking('unNoti')
        // this.clearTimeLoop()
      }
    },
    async getBefore () {
      this.setTime()
      this.getShop()
      // this.checkSearch()
      // this.$root.$on('closeSetTimeBookingListQueue', () => {
      // // your code goes here
      //   this.closeSetTimeBookingListQueue()
      // })
      this.dataLineConfig = await this.getDataLineConfig(this.$session.getAll().data.shopId)
      this.searchBooking('unNoti')
      this.checkStatusEdit = false
      // this.clearTimeLoop()
    },
    async checkSession () {
      if (!this.$session.exists()) {
        this.$router.push('/Core/Login')
      } else {
        if (this.$session.getAll().data.shopId) {
          localStorage.setItem('sessionData', JSON.stringify(this.$session.getAll().data))
          await this.getDataBranch()
          await this.getDataFlow()
          await this.getFirestore()
          // await this.getBefore()
        } else {
          this.$router.push('/Core/Login')
        }
      }
    },
    async beforeCreate () {
      if (JSON.parse(localStorage.getItem('sessionData')) !== null) {
        if (JSON.parse(localStorage.getItem('sessionData')).shopId) {
          this.$session.start()
          this.$session.set('data', JSON.parse(localStorage.getItem('sessionData')))
          await this.getDataBranch()
          await this.getDataFlow()
          await this.getFirestore()
          // await this.getBefore()
        } else {
          this.$router.push('/Core/Login')
        }
      } else {
        await this.checkSession()
      }
    },
    momentThaiText (item) {
      let dt = moment(item).locale('th').format('LL')
      return dt
    },
    dial: function (number) {
      window.location = 'tel:' + number
    },
    async sendQonline (item) {
      let dtt = {
        checkGetQueue: 'False'
      }
      await axios
        .post(this.DNS_IP + '/Booking/pushMsgQueueOhrich/' + item.bookNo, dtt)
        .then(async responses => {
          // this.$swal({
          //   title: 'Send successfully',
          //   text: 'ส่งสำเร็จ',
          //   type: 'success',
          //   timer: 2000,
          //   showConfirmButton: false
          // })
        }).catch(error => {
          console.log('error function pushMsgQueueOhrich : ', error)
        })
    },
    async openHistory (item) {
      // console.log('item', item)
      // console.log('this.BookingDataList[item.bookNo]', this.BookingDataList[item.bookNo])
      if (item) {
        this.HistoryData = this.BookingDataList[item.bookNo]
        this.pictureUrHistory = item.memberPicture
        let phoneNum = this.HistoryData.filter(item3 => { return item3.fieldValue !== '' && item3.fieldName === 'เบอร์โทร' })
        if (phoneNum.length > 0) {
          this.shopPhone = phoneNum[0].fieldValue.replace(/-/g, '')
        } else {
          this.shopPhone = ''
        }
      // axios.get(this.DNS_IP + '/BookingData/get_history?bookNo=' + item.bookNo)
      //   .then(async (response) => {
      //     let rs = response.data
      //     if (rs.status !== false) {
      //       this.HistoryData = response.data
      // this.dialogHistory = true
      //     }
      //   })
      //   .catch((error) => {
      //     console.log('error function addData : ', error)
      //   })
      }
    },
    async getShop () {
      let shopImg = ''
      await axios
        .get(this.DNS_IP + '/sys_shop/get?shopId=' + this.$session.getAll().data.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            this.shopName = rs[0].shopName
            shopImg = rs[0].imageBase64 || ''
          } else {
            this.shopName = ''
            this.shopImg = ''
            shopImg = ''
          }
          if (shopImg !== '') {
            this.shopImg = shopImg
          } else {
            this.shopImg = ''
          }
        })
    },
    validate (Action) {
      switch (Action) {
        case 'SEARCH':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_search.validate()
          })
          break
        default:
          break
      }
    },
    checkSearch () {
      // this.validate('SEARCH')
      // setTimeout(() => this.searchBooking('unNoti'), 500)
      this.searchBooking('unNoti')
    },
    async GroupArrayQueue (dataArray) {
      let dataConfirm = []
      let data = []
      let dataB = []
      let dataC = []
      for (let i = 0; i < dataArray.length; i++) {
        let d = dataArray[i]
        if (d.statusBt === 'confirmJob') {
          dataConfirm.push(d)
        } else {
          console.log('[GroupArrayQueue] :', this.flowSelectCheck.filter((item) => item === d.storeFrontText), d.storeFrontText)
          if (this.flowSelectCheck.filter((item) => item === d.storeFrontText).length > 0) {
            if (d.storeFrontText === 'B') {
              dataB.push(d)
            } else if (d.storeFrontText === 'C') {
              dataC.push(d)
            } else {
              data.push(d)
            }
          }
          console.log('[List flowSelectCheck]', this.flowSelectCheck, 'dataB', dataB, 'dataC', dataC, 'data', data)
        }
      }
      // let mergedData = [...dataB, ...data.slice(0)]
      let mergedData = [...dataC, ...dataB, ...data.slice(0)]
      dataConfirm.push(...mergedData)
      console.log('Data [dataConfirm]', dataConfirm)
      return dataConfirm
    },
    // async GroupArrayQueue (dataArray) {
    //   // ใช้ Map เพื่อจัดกลุ่มตาม flowId
    //   const sortedArray = dataArray.sort((a, b) => {
    //     const getParts = (str) => {
    //       const match = str.match(/([A-Z]+)([0-9]+)/)
    //       return [match[1], parseInt(match[2])]
    //     }

    //     const [prefixA, numA] = getParts(a.storeFrontQueue)
    //     const [prefixB, numB] = getParts(b.storeFrontQueue)

    //     // เรียงลำดับตาม num และ prefix
    //     if (numA === numB) {
    //       return prefixA.localeCompare(prefixB)
    //     } else {
    //       return numA - numB
    //     }
    //   })
    //   return sortedArray
    // },
    async searchBooking (checkNoti, item) {
      console.log('searchBooking ', checkNoti, item)
      if (this.validSearch === true) {
        this.checkStatusEdit = false
        // this.overlay = false
        // this.itemBooking = []
        let itemBooking = []
        await this.getBookingDataList(this.dateStart)
        let urlApi = {}
        if (this.flowSelect === 'allFlow') {
          urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.$session.getAll().data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            // '&flowId=' +
            // this.flowSelect +
            '&dueDate=' +
            this.dateStart + '&storeFrontQueue=is not null&statusBt=confirm and confirmJob'
        // '&dueDate=' +
        // this.dateStart + ' ' + this.time + '&storeFrontQueue=is not null&statusBt=confirm'
        } else {
          urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.$session.getAll().data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&flowId=' +
            this.flowSelect +
            '&dueDate=' +
            this.dateStart + '&storeFrontQueue=is not null&statusBt=confirm and confirmJob'
        }
        await axios
          .get(urlApi)
          .then(async response => {
            // console.log('getData', response.data)
            let rs = response.data
            if (rs.length > 0) {
              let sortData = await this.GroupArrayQueue(rs)
              // let sortData = rs.sort((a, b) => {
              //   if (a.storeFrontQueue < b.storeFrontQueue) return -1
              //   return a.storeFrontQueue > b.storeFrontQueue ? 1 : 0
              // })
              for (let i = 0; i < sortData.length; i++) {
                let d = sortData[i]
                if (this.BookingDataList[d.bookNo] !== undefined) {
                  d.cusName = d.bookingDataCustomerName || ''
                  itemBooking.push(d)
                }
              }
              // console.log('itemBooking', itemBooking)
              let USER_ROLE = this.$session.getAll().data.USER_ROLE || ''
              let empId = this.$session.getAll().data.empId || ''
              let itemBookings = []
              if (USER_ROLE === 'storeFront' && empId !== '') {
                let dataCon = itemBooking.filter(el => { return el.statusBt === 'confirmJob' && el.storeFrontQueueEmpId === parseInt(empId) })
                let dataWain = itemBooking.filter(el => { return el.statusBt === 'confirm' })
                this.datawainingShow = itemBooking.filter(el => { return el.statusBt === 'confirm' })
                itemBookings = [ ...dataCon, ...dataWain ]
              } else {
                itemBookings = itemBooking
              }
              this.itemBooking = itemBookings
              this.overlay = true
              this.openHistory(this.itemBooking[0])
              if (checkNoti === 'noti') {
                // console.log('item', item, checkNoti, item.storeFrontNotifySet, item.storeFrontNotifyStatus)
                if (item.storeFrontNotifyStatus === 'True') {
                  if (parseInt(item.storeFrontNotifySet) > 0) {
                    this.pushMessageRecallQueue(parseInt(item.storeFrontNotifySet), 'False')
                  }
                }
              }
            } else {
              this.itemBooking = []
              this.datawainingShow = []
              this.overlay = true
            }
          })
      } else {
        this.checkStatusEdit = false
        this.overlay = true
      }
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
    async getBookingDataList (dateStart) {
      let BookingDataList = []
      // this.BookingDataList = []
      let url = ''
      if (this.flowSelect === 'allFlow') {
        url = `${this.DNS_IP}/BookingData/getView?shopId=${this.$session.getAll().data.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}`
      } else {
        url = `${this.DNS_IP}/BookingData/getView?shopId=${this.$session.getAll().data.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}&flowId=${this.flowSelect}`
      }
      // let url = `${this.DNS_IP}/BookingData/getView?shopId=${this.$session.getAll().data.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}&flowId=${this.flowSelect}`
      await axios
        .get(url)
        .then(async response => {
          if (response.data.status !== false) {
            response.data.forEach((row) => {
              if (typeof (BookingDataList[row.bookNo]) === 'undefined') {
                BookingDataList[row.bookNo] = []
              }
              BookingDataList[row.bookNo].push(row)
            })
            this.BookingDataList = BookingDataList
          }
        }).catch(error => {
          // this.dataEditReady = true
          setTimeout(() => this.getBookingDataList(dateStart), 3000)
          console.log('catch getBookingDataList : ', error)
        })
      // console.log('this.BookingDataList1', this.BookingDataList)
    },
    setTime () {
      this.timeavailable = []
      let checkFlow = this.DataFlowItem.filter(el => { return el.value === this.flowSelect })
      if (checkFlow.length > 0) {
        this.timeavailable = JSON.parse(checkFlow[0].allData.setTime)
      } else {
        this.timeavailable = []
      }
    },
    async getDataFlow () {
      let resultOption = []
      await axios
        .get(this.DNS_IP + `/flow/get?shopId=${this.$session.getAll().data.shopId}&storeFrontCheck=True&masBranchIDAll=${this.masBranchID}`)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            // resultOption.push({'text': 'ทั้งหมด', 'value': 'allFlow'})
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              if (JSON.parse(this.$session.getAll().data.flowId).filter(el => { return el === d.flowId }).length > 0) {
                let checkCounter = JSON.parse(d.servicePointCount)
                let counterByUser = this.$session.getAll().data.counter
                // console.log('checkCounter', checkCounter, counterByUser)
                if (checkCounter.filter((aa) => aa.textTh === counterByUser).length > 0) {
                  s.text = d.flowName
                  s.value = d.flowId
                  s.allData = d
                  resultOption.push(s)
                  this.flowSelectCheckItem.push(d)
                  if (this.$session.getAll().data.typeStoreFrontText === null) {
                    this.flowSelectCheck.push(d.storeFrontText)
                  } else {
                    let dt = JSON.parse(this.$session.getAll().data.typeStoreFrontText) || []
                    this.flowSelectCheck = dt
                  }
                }
              }
            }
          } else {
            resultOption = []
          }
        })
      this.DataFlowItem = resultOption
      if (resultOption.length === 1) {
        this.flowSelect = this.DataFlowItem[0].value
      }
      if (resultOption.length > 1) {
        this.flowSelect = 'allFlow'
      }
    },
    async getDataBranch () {
      // if (localStorage.getItem('BRANCH') === null) {
      //   let temp = await this.getDataFromAPI('/master_branch/get', 'masBranchID', 'masBranchName')
      //   console.log(typeof temp)
      //   localStorage.setItem('BRANCH', JSON.stringify(temp))
      // }
      // this.branch = JSON.parse(localStorage.getItem('BRANCH'))
      // this.branchItem = await this.getDataFromAPI('/master_branch/get', 'masBranchID', 'masBranchName', '')
      // if (this.branchItem.length > 0) {
      //   this.masBranchID = this.branchItem[0].value
      //   console.log('this.branchItem', this.branchItem)
      //   console.log('this.masBranchID', this.masBranchID)
      // }
      let masBranchID = this.$session.getAll().data.masBranchID
      await axios
        .get(this.DNS_IP + `/master_branch/get?shopId=${this.$session.getAll().data.shopId}&masBranchID=${masBranchID}`)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.masBranchName
              s.value = d.masBranchID
              s.allData = d
              this.branchItem.push(s)
              // console.log('this.DataFlowName', this.DataFlowName)
            }
            this.masBranchID = rs[0].masBranchID
          }
        })
    },
    async getDataFromAPI (url, fieldId, fieldName, param) {
      let result = []
      await axios
        .get(this.DNS_IP + `${url}?shopId=${this.$session.getAll().data.shopId}${param}`)
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
    },
    async closeJobServicePointReturn (item) {
      if (this.servicePoint === '') {
        this.$swal('ผิดพลาด', 'กรุณาเลือกจุดบริการ', 'error')
        this.checkStatusEdit = false
      } else {
        this.checkStatusEdit = true
        this.overlay = false
        await this.updateServicePoint(item.bookNo)
        await this.reCallNoti(item)
        let lineUserId = item.lineUserId || ''
        if (lineUserId !== '') {
          let dtt = {
            checkGetQueue: 'True'
          }
          await axios
            .post(this.DNS_IP + '/Booking/pushMsgQueueReturnOhrich/' + item.bookNo, dtt)
            .then(async responses => {}).catch(error => {
              console.log('error function pushMsgQueueReturnOhrich : ', error)
            })
        }
        await this.resetFirebaseUse()
        this.dialogServicePointStatus = false
        // this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
        await this.searchBooking('unNoti')
        // this.clearTimeLoop()
      }
    },
    async closeJobServicePointSubmit (item) {
      var dtt = {
        bookNo: item.bookNo,
        contactDate: this.format_date(new Date()),
        status: 'confirmJob',
        statusUse: 'use',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: this.$session.getAll().data.userName,
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(this.DNS_IP + '/booking_transaction/add', dtt)
        .then(async responses => {
          await this.updateServicePoint(item.bookNo)
          await this.CallNoti(item)
          let lineUserId = item.lineUserId || ''
          if (lineUserId !== '') {
            let dtt = {
              checkGetQueue: 'True'
            }
            await axios
              .post(this.DNS_IP + '/Booking/pushMsgQueueOhrich/' + item.bookNo, dtt)
              .then(async responses => {}).catch(error => {
                console.log('error function pushMsgQueueOhrich : ', error)
              })
          }
          await this.resetFirebaseUse()
          this.dialogServicePointStatus = false
          // this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
          await this.searchBooking('noti', item)
          // this.clearTimeLoop()
        })
    },
    async closeJobServicePoint (item) {
      if (this.servicePoint === '') {
        this.$swal('ผิดพลาด', 'กรุณาเลือกจุดบริการ', 'error')
        this.checkStatusEdit = false
      } else {
        let statusBooking = await this.checkBookingStatus(item.bookNo)
        if (statusBooking === 'confirm') {
          this.checkStatusEdit = true
          this.overlay = false
          // await this.clearConfirmJob(item.dueDate)
          let USER_ROLE = this.$session.getAll().data.USER_ROLE || ''
          let empId = this.$session.getAll().data.empId || ''
          if (USER_ROLE === 'storeFront' && empId !== '') {
            let statusBookingCheck = await this.checkBookingStatus(item.bookNo)
            if (statusBookingCheck === 'confirm') {
              let statusUpdateEmp = await this.updateEmp(item.bookNo, 'confirm')
              if (statusUpdateEmp === true) {
                this.closeJobServicePointSubmit(item)
              } else {
                this.$swal('คำเตือน', 'รายการนี้มีพนักงานท่านอื่น เริ่มงานไปแล้ว', 'info')
                this.dialogServicePointStatus = false
                await this.searchBooking('unNoti')
                // this.clearTimeLoop()
              }
            } else {
              this.$swal('คำเตือน', 'รายการนี้มีพนักงานท่านอื่น เริ่มงานไปแล้ว', 'info')
              this.dialogServicePointStatus = false
              await this.searchBooking('unNoti')
              // this.clearTimeLoop()
            }
          } else {
            this.closeJobServicePointSubmit(item)
          }
        } else {
          this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
          this.dialogServicePointStatus = false
          await this.searchBooking('unNoti')
          // this.clearTimeLoop()
        }
      }
    },
    settingCounter () {

    },
    async closeJobSubmitReturn (item) {
      console.log('closeJobSubmit', item)
      this.checkStatusEdit = true
      if (item.servicePointStatus === 'True') {
        this.closeItem = item
        // this.dialogServicePointStatus = true
        // this.servicePoint = item.servicePoint || ''
        this.servicePoint = this.$session.getAll().data.counter
        await this.closeJobServicePointReturn(this.closeItem)
        if (item.servicePointRecursive === 'False') {
          await this.setservicePointCount(item)
        } else {
          this.servicePointItem = JSON.parse(item.servicePointCount) || []
        }
        this.statusReturn = true
      } else {
        let lineUserId = item.lineUserId || ''
        this.reCallNoti(item)
        if (lineUserId !== '') {
          let dtt = {
            checkGetQueue: 'True'
          }
          await axios
            .post(this.DNS_IP + '/Booking/pushMsgQueueReturnOhrich/' + item.bookNo, dtt)
            .then(async responses => {}).catch(error => {
              console.log('error function pushMsgQueueReturnOhrich : ', error)
            })
        }
        // this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
        await this.resetFirebaseUse()
        await this.searchBooking('unNoti')
        // this.clearTimeLoop()
      }
    },
    async backHomeSubmit (item) {
      this.dataReady = true
      let statusBooking = await this.checkBookingStatus(item.bookNo)
      this.checkStatusEdit = true
      if (statusBooking === 'confirmJob') {
        var dtt = {
          bookNo: item.bookNo,
          contactDate: this.format_date(new Date()),
          status: 'closeJob',
          statusUse: 'use',
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.$session.getAll().data.userName,
          LAST_USER: this.$session.getAll().data.userName
        }
        await axios
          .post(this.DNS_IP + '/booking_transaction/add', dtt)
          .then(async responses => {
            // this.$swal('เรียบร้อย', 'ปิดงานสำเร็จ', 'success')
            await this.resetFirebaseUse()
            await this.searchBooking('unNoti')
            this.dataReady = false
            // this.clearTimeLoop()
          }).catch(error => {
            this.dataReady = false
            console.log('catch getBookingDataList : ', error)
          })
      } else {
        this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
        await this.resetFirebaseUse()
        await this.searchBooking('unNoti')
        this.dataReady = false
        // this.clearTimeLoop()
      }
    },
    async setservicePointCount (item) {
      this.servicePointItem = []
      await axios
        // .get(this.DNS_IP + '/BookingData/get?shopId=' + this.$session.getAll().data.shopId + '&bookNo=' + this.bookNo)
        .get(this.DNS_IP + '/booking_view/get?shopId=' + item.shopId + '&flowId=' + item.flowId +
        '&dueDateDay=' + this.dateStart + '&storeFrontQueue=is not null&statusBt=confirmJob&servicePointStatus=True')
        .then(async response => {
          let rs = response.data
          if (rs.status !== false) {
            let servicePointItem = rs.filter(el => { return el.servicePoint !== null || el.servicePoint !== '' })
            if (servicePointItem.length > 0) {
              if (JSON.parse(item.servicePointCount).length > 0) {
                for (let i = 0; i < JSON.parse(item.servicePointCount).length; i++) {
                  let d = JSON.parse(item.servicePointCount)[i]
                  if (servicePointItem.filter(el => { return el.servicePoint === d.textTh }).length === 0) {
                    this.servicePointItem.push(d)
                  }
                }
                if (servicePointItem.filter(el => { return el.servicePoint === item.servicePoint }).length > 0) {
                  let otherCounr = JSON.parse(item.servicePointCount).filter(el => { return el.textTh === item.servicePoint })
                  if (otherCounr.length > 0) {
                    this.servicePointItem.push(otherCounr[0])
                  }
                }
              } else {
                this.servicePointItem = []
              }
            } else {
              this.servicePointItem = JSON.parse(item.servicePointCount) || []
            }
          } else {
            this.servicePointItem = JSON.parse(item.servicePointCount) || []
          }
        })
        .catch(err => {
          // this.$router.push({ name: '404' })
          console.log(err.code, err.message)
          this.servicePointItem = JSON.parse(item.servicePointCount) || []
        })
    },
    async closeJobSubmit (item) {
      if (item.statusBt === 'confirm') {
        this.checkStatusEdit = true
        let statusBooking = await this.checkBookingStatus(item.bookNo)
        if (statusBooking === 'confirm') {
          if (item.servicePointStatus === 'True') {
            this.closeItem = item
            // this.dialogServicePointStatus = true
            this.servicePoint = this.$session.getAll().data.counter
            await this.closeJobServicePoint(this.closeItem)
            // this.servicePoint = item.servicePoint || ''
            if (item.servicePointRecursive === 'False') {
              await this.setservicePointCount(item)
            } else {
              this.servicePointItem = JSON.parse(item.servicePointCount) || []
            }
            this.statusReturn = false
          } else {
            let USER_ROLE = this.$session.getAll().data.USER_ROLE || ''
            let empId = this.$session.getAll().data.empId || ''
            if (USER_ROLE === 'storeFront' && empId !== '') {
              let statusBookingCheck = await this.checkBookingStatus(item.bookNo)
              if (statusBookingCheck === 'confirm') {
                let statusUpdateEmp = await this.updateEmp(item.bookNo, 'confirm')
                if (statusUpdateEmp === true) {
                  this.closeJob(item)
                } else {
                  this.$swal('คำเตือน', 'รายการนี้มีพนักงานท่านอื่น เริ่มงานไปแล้ว', 'info')
                  await this.searchBooking('unNoti')
                  // this.clearTimeLoop()
                }
              } else {
                this.$swal('คำเตือน', 'รายการนี้มีพนักงานท่านอื่น เริ่มงานไปแล้ว', 'info')
                await this.searchBooking('unNoti')
                // this.clearTimeLoop()
              }
            } else {
              this.closeJob(item)
            }
          }
        } else {
          this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
          await this.searchBooking('unNoti')
          // this.clearTimeLoop()
        }
      }
    },
    async closeJob (item) {
      var dtt = {
        bookNo: item.bookNo,
        contactDate: this.format_date(new Date()),
        status: 'confirmJob',
        statusUse: 'use',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: this.$session.getAll().data.userName,
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(this.DNS_IP + '/booking_transaction/add', dtt)
        .then(async responses => {
          await this.CallNoti(item)
          let lineUserId = item.lineUserId || ''
          if (lineUserId !== '') {
            let dtt = {
              checkGetQueue: 'True'
            }
            await axios
              .post(this.DNS_IP + '/Booking/pushMsgQueueOhrich/' + item.bookNo, dtt)
              .then(async responses => {}).catch(error => {
                console.log('error function pushMsgQueueOhrich : ', error)
              })
          }
          // this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
          await this.resetFirebaseUse()
          await this.searchBooking('noti', item)
          // this.clearTimeLoop()
        })
    },
    async clearConfirmJob (dueDateUse) {
      var dtt = {
        dueDate: dueDateUse,
        shopId: this.$session.getAll().data.shopId
      }
      await axios
        .post(this.DNS_IP + '/booking_transaction/changeQueue', dtt)
        .then(async responses => {})
    },
    async updateServicePoint (bookNo) {
      var dtt = {
        servicePoint: this.servicePoint
      }
      await axios
        .post(this.DNS_IP + '/Booking/edit/' + bookNo, dtt)
        .then(async responses => {})
    },
    async checkBookingStatus (bookNo) {
      let result = ''
      await axios
        .get(this.DNS_IP + '/booking_view/get?shopId=' +
            this.$session.getAll().data.shopId +
            '&bookNo=' + bookNo)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            result = rs[0].statusBt || ''
          } else {
            result = ''
          }
        })
      return result
    },
    async updateEmp (bookNo, status) {
      let result = ''
      var dtt = {
        storeFrontQueueEmpId: parseInt(this.$session.getAll().data.empId),
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(this.DNS_IP + '/Booking/editQueueEmp/' + bookNo + '?status=' + status, dtt)
        .then(async response => {
          let rs = response.data
          result = rs.status
        })
      return result
    },
    async CallNoti (item) {
      let dtdt = {
        bookNo: item.bookNo,
        servicePoint: this.servicePoint,
        shopId: this.$session.getAll().data.shopId,
        storeFrontQueue: item.storeFrontQueue,
        CREATE_USER: this.$session.getAll().data.userName,
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(this.DNS_IP + '/callQueues/add', dtdt)
        .then(async responses => {})
    },
    async reCallNoti (item) {
      let dtdt = {
        statusNotify: 'False',
        servicePoint: this.servicePoint,
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(this.DNS_IP + '/callQueues/edit/' + item.audioFileId, dtdt)
        .then(async responses => {
          // this.$swal('เรียบร้อย', 'กรุณารอเรียกคิว', 'success')
        })
    },
    // async getBase64ImageFromURL (img) {
    //   let image = await axios.get(img, {withCredentials: true, responseType: 'arraybuffer'})
    //   let raw = Buffer.from(image.data).toString('base64')
    //   this.shopImg = 'data:' + image.headers['content-type'] + ';base64,' + raw
    // },
    setPrint (item, language) {
      let docDefinition = {}
      if (this.shopImg === '') {
        if (language === 'th') {
          docDefinition = {
            pageSize: 'A4',
            content: [
              {
                text: this.shopName,
                style: 'header',
                alignment: 'center'
              },
              // {
              //   text: '   ',
              //   style: 'header',
              //   widths: ['*']
              // },
              // {
              //   text: '   ',
              //   style: 'subheader',
              //   widths: ['*']
              // },
              // {
              //   columns: [
              //     {
              //       style: 'subheader',
              //       text: 'รับคิวเวลา'
              //     },
              //     {
              //       style: 'subheader',
              //       text: item.timeText,
              //       alignment: 'right'
              //     }
              //   ]
              // },
              {
                alignment: 'center',
                text: item.flowName,
                fontSize: 30,
                widths: ['*']
              },
              {
                text: [
                  {alignment: 'center', text: 'หมายเลขคิวของคุณ\n', fontSize: 20, color: 'black'},
                  {alignment: 'center', text: item.storeFrontQueue, fontSize: 120, color: 'black'}
                ]
              // alignment: 'center',
              // style: 'tableExample',
              // table: {
              //   heights: [50],
              //   widths: ['*'],
              //   body: [
              //     [
              //       {
              //         text: [
              //           {text: 'หมายเลขคิวของคุณ\n', fontSize: 20, color: 'black'},
              //           {text: item.storeFrontQueue, fontSize: 120, color: 'black'}
              //         ],
              //         border: [false, false, false, false]
              //         // fillColor: '#092C4C'
              //       }
              //     ]
              //   ]
              // }
              },
              {
                text: 'QR Code สำหรับรับการแจ้งเตือน',
                fontSize: 15,
                alignment: 'center'
              },
              { qr: 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/ConfirmUser?bookNo=' + item.bookNo + '&shopId=' + item.shopId, fit: '200', alignment: 'center' },
              {
                text: '   ',
                fontSize: 15,
                // style: 'subheader',
                widths: ['*']
              },
              {
                text: '*ทางบริษัทขอสงวนสิทธิ์ในการข้ามคิว กรณีลูกค้าไม่แสดงตน',
                // text: '*ทางโรงพยาบาลขอสงวนสิทธิ์ในการข้ามคิว กรณีลูกค้าไม่แสดงตน',
                fontSize: 15,
                alignment: 'center'
              },
              // {
              //   text: '   ',
              //   fontSize: 25,
              //   widths: ['*']
              // },
              {
                columns: [
                  {
                    fontSize: 15,
                    alignment: 'center',
                    text: 'วันที่ ' + item.dueDateText.split(' ')[0]
                  }
                ]
              },
              {
                text: '................................................',
                style: 'subheader',
                widths: ['*'],
                alignment: 'center'
              }
            ],
            styles: {
              header: {
                fontSize: 30,
                bold: true
              },
              subheader: {
                fontSize: 29,
                bold: true
              },
              quote: {
                italics: true
              },
              small: {
                fontSize: 8
              },
              defaultStyle: {
                columnGap: 20
              },
              tableExample: {
                margin: [0, 5, 0, 15]
              }
            },
            defaultStyle: { // 4. default style 'KANIT' font to test
              font: 'Kanit'
            }
          }
        } else {
          docDefinition = {
            pageSize: 'A4',
            content: [
              {
                text: this.shopName,
                style: 'header',
                alignment: 'center'
              },
              // {
              //   text: '   ',
              //   style: 'header',
              //   widths: ['*']
              // },
              // {
              //   text: '   ',
              //   style: 'subheader',
              //   widths: ['*']
              // },
              // {
              //   columns: [
              //     {
              //       style: 'subheader',
              //       text: 'Time'
              //     },
              //     {
              //       style: 'subheader',
              //       text: item.timeText,
              //       alignment: 'right'
              //     }
              //   ]
              // },
              // {
              //   text: '   ',
              //   style: 'subheader',
              //   widths: ['*']
              // },
              {
                alignment: 'center',
                text: item.flowNameEn,
                fontSize: 30,
                widths: ['*']
              },
              {
                alignment: 'center', text: 'Number', fontSize: 20, color: 'black'
              },
              {
                alignment: 'center', text: item.storeFrontQueue, fontSize: 110, color: 'black'
              },
              // {
              //   text: [
              //     {alignment: 'center', text: 'Number\n', fontSize: 20, color: 'black'},
              //     {alignment: 'center', text: item.storeFrontQueue, fontSize: 120, color: 'black'}
              //   ]
              //   // alignment: 'center',
              //   // style: 'tableExample',
              //   // table: {
              //   //   heights: [50],
              //   //   widths: ['*'],
              //   //   body: [
              //   //     [
              //   //       {
              //   //         text: [
              //   //           {text: 'Number\n', fontSize: 20, color: 'black'},
              //   //           {text: item.storeFrontQueue, fontSize: 120, color: 'black'}
              //   //         ],
              //   //         border: [false, false, false, false]
              //   //         // fillColor: '#092C4C'
              //   //       }
              //   //     ]
              //   //   ]
              //   // }
              // },
              {
                text: 'QR Code for receiving notifications',
                fontSize: 15,
                alignment: 'center'
              },
              { qr: 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/ConfirmUser?bookNo=' + item.bookNo + '&shopId=' + item.shopId, fit: '200', alignment: 'center' },
              {
                text: '   ',
                fontSize: 15,
                // style: 'subheader',
                widths: ['*']
              },
              {
                text: "The company reserves the right to skip the queue. In case the customer doesn't come",
                // text: "The hospital reserves the right to skip the queue. In case the customer doesn't come",
                fontSize: 15,
                alignment: 'center'
              },
              {
                columns: [
                  {
                    fontSize: 15,
                    alignment: 'center',
                    text: 'Date ' + item.dueDateText.split(' ')[0]
                  }
                ]
              },
              {
                text: '................................................',
                style: 'subheader',
                widths: ['*'],
                alignment: 'center'
              }
            ],
            styles: {
              header: {
                fontSize: 30,
                bold: true
              },
              subheader: {
                fontSize: 29,
                bold: true
              },
              quote: {
                italics: true
              },
              small: {
                fontSize: 8
              },
              defaultStyle: {
                columnGap: 20
              },
              tableExample: {
                margin: [0, 5, 0, 15]
              }
            },
            defaultStyle: { // 4. default style 'KANIT' font to test
              font: 'Kanit'
            }
          }
        }
      } else {
        if (language === 'th') {
          docDefinition = {
            pageSize: 'A4',
            content: [
              {
                text: this.shopName,
                style: 'header',
                alignment: 'center'
              },
              {
                image: 'mySuperImage',
                width: 150,
                alignment: 'center'
              },
              // {
              //   text: '   ',
              //   style: 'header',
              //   widths: ['*']
              // },
              // {
              //   text: '   ',
              //   style: 'subheader',
              //   widths: ['*']
              // },
              // {
              //   columns: [
              //     {
              //       style: 'subheader',
              //       text: 'รับคิวเวลา'
              //     },
              //     {
              //       style: 'subheader',
              //       text: item.timeText,
              //       alignment: 'right'
              //     }
              //   ]
              // },
              {
                alignment: 'center',
                text: item.flowName,
                fontSize: 30,
                widths: ['*']
              },
              {
                text: [
                  {alignment: 'center', text: 'หมายเลขคิวของคุณ\n', fontSize: 20, color: 'black'},
                  {alignment: 'center', text: item.storeFrontQueue, fontSize: 120, color: 'black'}
                ]
              // alignment: 'center',
              // style: 'tableExample',
              // table: {
              //   heights: [50],
              //   widths: ['*'],
              //   body: [
              //     [
              //       {
              //         text: [
              //           {text: 'หมายเลขคิวของคุณ\n', fontSize: 20, color: 'black'},
              //           {text: item.storeFrontQueue, fontSize: 120, color: 'black'}
              //         ],
              //         border: [false, false, false, false]
              //         // fillColor: '#092C4C'
              //       }
              //     ]
              //   ]
              // }
              },
              {
                text: 'QR Code สำหรับรับการแจ้งเตือน',
                fontSize: 15,
                alignment: 'center'
              },
              { qr: 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/ConfirmUser?bookNo=' + item.bookNo + '&shopId=' + item.shopId, fit: '200', alignment: 'center' },
              {
                text: '   ',
                fontSize: 15,
                // style: 'subheader',
                widths: ['*']
              },
              {
                text: '*ทางบริษัทขอสงวนสิทธิ์ในการข้ามคิว กรณีลูกค้าไม่แสดงตน',
                // text: '*ทางโรงพยาบาลขอสงวนสิทธิ์ในการข้ามคิว กรณีลูกค้าไม่แสดงตน',
                fontSize: 15,
                alignment: 'center'
              },
              // {
              //   text: '   ',
              //   fontSize: 25,
              //   widths: ['*']
              // },
              {
                columns: [
                  {
                    fontSize: 15,
                    alignment: 'center',
                    text: 'วันที่ ' + item.dueDateText.split(' ')[0]
                  }
                ]
              },
              {
                text: '................................................',
                style: 'subheader',
                widths: ['*'],
                alignment: 'center'
              }
            ],
            images: {
              mySuperImage: this.shopImg

            // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
            // snow: this.shopImg

            // is supported loading images via url with custom headers (minimal version: 0.2.5)
            // strawberries: {
            //   url: 'https://picsum.photos/id/1080/367/267',
            //   headers: {
            //     myheader: '123',
            //     myotherheader: 'abc',
            //   }
            // }
            },
            styles: {
              header: {
                fontSize: 30,
                bold: true
              },
              subheader: {
                fontSize: 29,
                bold: true
              },
              quote: {
                italics: true
              },
              small: {
                fontSize: 8
              },
              defaultStyle: {
                columnGap: 20
              },
              tableExample: {
                margin: [0, 5, 0, 15]
              }
            },
            defaultStyle: { // 4. default style 'KANIT' font to test
              font: 'Kanit'
            }
          }
        } else {
          docDefinition = {
            pageSize: 'A4',
            content: [
              {
                text: this.shopName,
                style: 'header',
                alignment: 'center'
              },
              {
                image: 'mySuperImage',
                width: 150,
                alignment: 'center'
              },
              // {
              //   text: '   ',
              //   style: 'header',
              //   widths: ['*']
              // },
              // {
              //   text: '   ',
              //   style: 'subheader',
              //   widths: ['*']
              // },
              // {
              //   columns: [
              //     {
              //       style: 'subheader',
              //       text: 'Time'
              //     },
              //     {
              //       style: 'subheader',
              //       text: item.timeText,
              //       alignment: 'right'
              //     }
              //   ]
              // },
              // {
              //   text: '   ',
              //   style: 'subheader',
              //   widths: ['*']
              // },
              {
                alignment: 'center',
                text: item.flowNameEn,
                fontSize: 30,
                widths: ['*']
              },
              {
                alignment: 'center', text: 'Number', fontSize: 20, color: 'black'
              },
              {
                alignment: 'center', text: item.storeFrontQueue, fontSize: 110, color: 'black'
              },
              // {
              //   text: [
              //     {alignment: 'center', text: 'Number\n', fontSize: 20, color: 'black'},
              //     {alignment: 'center', text: item.storeFrontQueue, fontSize: 120, color: 'black'}
              //   ]
              //   // alignment: 'center',
              //   // style: 'tableExample',
              //   // table: {
              //   //   heights: [50],
              //   //   widths: ['*'],
              //   //   body: [
              //   //     [
              //   //       {
              //   //         text: [
              //   //           {text: 'Number\n', fontSize: 20, color: 'black'},
              //   //           {text: item.storeFrontQueue, fontSize: 120, color: 'black'}
              //   //         ],
              //   //         border: [false, false, false, false]
              //   //         // fillColor: '#092C4C'
              //   //       }
              //   //     ]
              //   //   ]
              //   // }
              // },
              {
                text: 'QR Code for receiving notifications',
                fontSize: 15,
                alignment: 'center'
              },
              { qr: 'https://liff.line.me/' + this.dataLineConfig.liffMainID + '/ConfirmUser?bookNo=' + item.bookNo + '&shopId=' + item.shopId, fit: '200', alignment: 'center' },
              {
                text: '   ',
                fontSize: 15,
                // style: 'subheader',
                widths: ['*']
              },
              {
                text: "The company reserves the right to skip the queue. In case the customer doesn't come",
                // text: "The hospital reserves the right to skip the queue. In case the customer doesn't come",
                fontSize: 15,
                alignment: 'center'
              },
              {
                columns: [
                  {
                    fontSize: 15,
                    alignment: 'center',
                    text: 'Date ' + item.dueDateText.split(' ')[0]
                  }
                ]
              },
              {
                text: '................................................',
                style: 'subheader',
                widths: ['*'],
                alignment: 'center'
              }
            ],
            images: {
              mySuperImage: this.shopImg

            // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
            // snow: this.shopImg

            // is supported loading images via url with custom headers (minimal version: 0.2.5)
            // strawberries: {
            //   url: 'https://picsum.photos/id/1080/367/267',
            //   headers: {
            //     myheader: '123',
            //     myotherheader: 'abc',
            //   }
            // }
            },
            styles: {
              header: {
                fontSize: 30,
                bold: true
              },
              subheader: {
                fontSize: 29,
                bold: true
              },
              quote: {
                italics: true
              },
              small: {
                fontSize: 8
              },
              defaultStyle: {
                columnGap: 20
              },
              tableExample: {
                margin: [0, 5, 0, 15]
              }
            },
            defaultStyle: { // 4. default style 'KANIT' font to test
              font: 'Kanit'
            }
          }
        }
      }
      pdfMake.vfs = pdfFonts.pdfMake.vfs // 2. set vfs pdf font
      pdfMake.fonts = {
        // download default Roboto font from cdnjs.com
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        },
        // Kanit Font
        Kanit: { // 3. set Kanit font
          normal: 'Kanit-Regular.ttf',
          bold: 'Kanit-Medium.ttf',
          italics: 'Kanit-Italic.ttf',
          bolditalics: 'Kanit-MediumItalic.ttf'
        }
      }
      // pdfMake.createPdf(docDefinition).open({}, window)
      // pdfMake.createPdf(docDefinition).print({}, window)

      // pdfMake.createPdf(docDefinition).print()
      // this.$scope.generatePdf = function () {
      // create the window before the callback
      // win.close()
      // }

      pdfMake.createPdf(docDefinition).getDataUrl(function (outDoc) {
        // document.getElementById('pdfV').src = outDoc
        let dataReplate = outDoc.replace('data:application/pdf;base64,', '')
        printJS({printable: dataReplate, type: 'pdf', base64: true})
      })
      this.overlay = true
      // var pdfFrame = window.frames['pdfV']
      // pdfFrame.print()
      // this.dialogPrint = true
    },
    async pushMessageRecallQueue (countNoti, checkGetQueue) {
      let bookSelect = this.itemBooking.filter((element, index) => { return element.statusBt === 'confirm' })
      if (bookSelect.length > 0) {
        let bookSelectuse = bookSelect.filter((element, index) => { return index < countNoti })
        for (let i = 0; i < bookSelectuse.length; i++) {
          let d = bookSelectuse[i]
          let s = {}
          s.lineUserId = d.lineUserId || ''
          if (s.lineUserId !== '') {
            let dtt = {
              checkGetQueue: checkGetQueue
            }
            await axios
              .post(this.DNS_IP + '/Booking/pushMsgQueueOhrich/' + d.bookNo, dtt)
              .then(async responses => {}).catch(error => {
                console.log('error function pushMsgQueueOhrich : ', error)
              })
          }
        }
      }
    }
  }
}
</script>
<style scope>
.main {
  overflow-x: hidden;
  height:100vh;
  background-color: rgb(148 213 11)
}
.main-card {
  border-radius: 20px !important;
}
.text-main{
  font-size: 0.9vw;
}
.text-number{
  color:#092C4C;
  font-size: 90px;
}
.btn-event {
  width: 100%;
  height: 45px !important;
}
.text-event{
  font-size: 20px;
  font-weight: bold;
}

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
.rounded-btn-closejob {
  background: linear-gradient(#DADADA,  #A1A1A1) padding-box, linear-gradient(to right,#DADADA,  #A1A1A1) border-box;
}
.rounded-btn-confirm {
  background: linear-gradient(#25D366,  #23B091) padding-box, linear-gradient(to right,#25D366,  #23B091) border-box;
}
.rounded-btn {
  color: white;
  padding: 10px 20px; /* Adjust padding as needed */
  border: none;
  cursor: pointer;
  font-size: 40px;
  border-radius: 50em;
  width: 140px !important;
  height: 140px !important;
  box-sizing: border-box;
  border: 10px solid transparent;
}
.text-bell{
  width: 100px !important;
}
.text-bell-disabled{
  color: hsla(0,0%,100%,.3)!important;
}
@media (max-width: 600px){
  .text-main {
    font-size: 3vw;
  }
  .text-number {
  font-size: 13vw;
  }
  .text-event{
  font-size: 15px;
  font-weight: bold;
}
}
@media (min-width: 601px) and (max-width: 1300px) {
  .text-main {
    font-size: 1.5vw;
  }
}
  @media (min-width: 1301px) and (max-width: 1500px) {
  .text-main {
    font-size: 1vw;
  }
}
</style>
