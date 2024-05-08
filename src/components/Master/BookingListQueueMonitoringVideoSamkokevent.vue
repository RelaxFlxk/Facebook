<template>
    <div id="app-container" class="fullscreen-background d-flex flex-column">
        <!-- <main> -->
        <v-main class="main">
            <div class="mb-2 d-flex justify-content-center responsive-image" style="text-align: center;">
                <img
                :src="require('@/assets/thaiairways-logo.png')"
                alt="Thai Airways Logo"
                />
            </div>
            <div class="main-content">
                <v-card color="#31215F" class="col-11 mx-auto main-card align-content-center">
                    <div class="row d-flex">
                        <div v-for="(group, groupIndex) in groupedData" :key="groupIndex" class="col-4">
                            <div class="col-12 text-white" color="#31215F">
                                <div class="d-flex mb-3">
                                    <v-card-title class="col-6 justify-start subtext-title text-white">
                                        เลขคิว
                                    </v-card-title>
                                    <v-card-title class="col-6 justify-end subtext-title text-white">
                                        ช่องบริการ
                                    </v-card-title>
                                </div>
                                <v-card class="d-flex text-center mb-3" color="#ffffff"
                                v-for="(item, index) in group" :key="index">
                                    <div class="col-6 subtext">
                                        {{ item.queue }}
                                    </div>
                                    <div class="col-6 subtext">
                                        {{ item.serviceNo }}
                                    </div>
                                </v-card>
                            </div>
                        </div>
                    </div>
                </v-card>
            </div>
        <!-- </main> -->
        </v-main>
        <v-footer padless :style="{ backgroundColor: 'rgba(255, 255, 255, 0)' }" :class="`flex-grow-1 fixed-bottom d-flex flex-row justify-content-between align-items-center ${isPortrait ? '' : 'mt-3'}`">
            <div class="col py-0">
                <v-icon class="mr-3">
                {{ wifiIcon }}
                </v-icon>
                <v-btn icon color="#000000" @click="changeStatusSound('off')" v-if="statusSound === true">
                <v-icon>mdi-volume-high</v-icon>
                </v-btn>
                <v-btn icon color="#000000" @click="changeStatusSound('on')" v-else>
                <v-icon>mdi-volume-off</v-icon>
                </v-btn>
            </div>
            <div class="col d-flex justify-content-center"><span class="text-footer">POWER BY BETASK CONSULTING
                </span></div>
            <div class="col py-0 d-flex justify-content-end"><span class="text-datetime">{{ formattedDateTime }}</span>
            </div>
        </v-footer>
    </div>
</template>

<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import moment from 'moment-timezone'
import { CardWaitingOhrich, BookingUseEventCat, CardSubService } from '../TV'

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    CardWaitingOhrich,
    BookingUseEventCat,
    CardSubService
  },
  computed: {
    videoElement () {
      return this.$refs.video
    },
    formattedDateTime () {
      return this.currentTime
    },
    wifiIcon () {
      switch (this.wifiStatus) {
        case 'connected':
          return 'mdi-wifi'
        case 'disconnected':
          return 'mdi-wifi-off'
        default:
          return 'mdi-wifi-strength-alert-outline'
      }
    },
    groupedData () {
      const chunkSize = 6
      const groups = []
      for (let i = 0; i < this.dataMockQ.length; i += chunkSize) {
        groups.push(this.dataMockQ.slice(i, i + chunkSize))
      }
      return groups
    }
  },
  created () {
    this.checkWiFiStatus()
    window.addEventListener('online', () => { this.wifiStatus = 'connected' })
    window.addEventListener('offline', () => { this.wifiStatus = 'disconnected' })
  },
  data () {
    return {
      dataMockQ: [
        {
          queue: 'A001',
          serviceNo: 1
        },
        {
          queue: 'A002',
          serviceNo: 2
        },
        {
          queue: 'A003',
          serviceNo: 3
        },
        {
          queue: 'B001',
          serviceNo: 4
        },
        {
          queue: 'A004',
          serviceNo: 5
        },
        {
          queue: 'B002',
          serviceNo: 11
        },
        {
          queue: 'A005',
          serviceNo: 6
        },
        {
          queue: 'A006',
          serviceNo: 7
        },
        {
          queue: 'A007',
          serviceNo: 8
        },
        {
          queue: 'B004',
          serviceNo: 9
        },
        {
          queue: 'A008',
          serviceNo: 10
        },
        {
          queue: 'B005',
          serviceNo: 16
        },
        {
          queue: 'A009',
          serviceNo: 11
        },
        {
          queue: 'A010',
          serviceNo: 12
        },
        {
          queue: 'A011',
          serviceNo: 13
        },
        {
          queue: 'B005',
          serviceNo: 14
        },
        {
          queue: 'A012',
          serviceNo: 15
        },
        {
          queue: 'B012',
          serviceNo: 20
        }
      ],
      orientation: '',
      statusSound: true,
      dateStartShow: '',
      video: '',
      DarkModeBackground: '#FFFFFF',
      validSearch: true,
      itemBooking: [],
      itemBookingUse: [],
      BookingDataList: [],
      time: '',
      timeavailable: [],
      branchItem: [],
      masBranchID: '',
      flowSelect: '',
      dateStart: '',
      shop: [],
      dialog: false,
      search: '',
      shopColor: '',
      shopImage: '',
      bgColor: '',
      bgColor2: '',
      bgColor3: '',
      text: '',
      videoLinkMonition: '',
      statusSoundCheck: null,
      hideSound: false,
      audio: null,
      timeCount: 0,
      repeatRound: 2,
      speakerId: 27,
      history: [],
      objInterval: null,
      text2: '',
      tableId: 0,
      currentTime: moment().format('DD MMM YYYY HH:mm a'),
      isPortrait: true,
      wifiStatus: 'unknown',
      checkRef: false,
      soundQueneNo: [],
      dataListPlay: [],
      dataService: [],
      dataWaiting: [],
      dataSound: [],
      playingSound: [],
      empList: [4300, 4301, 4302, 4303, 4304, 4305, 4306, 4307, 4308, 4309, 4310, 4311, 4312, 4313, 4314, 4315, 4316, 4317, 4318],
      dataListTest1: [1, 2, 3, 4, 5, 6, 7],
      dataListTest2: [1, 2, 3, 4, 5, 6]
    }
  },

  async mounted () {
    this.checkOrientation()
    this.setupEventListeners()
    await this.getShop()
    await this.getBooking()
    await this.getFirestore()
    this.startDateTimeInterval()
  },
  destroyed () {
    window.removeEventListener('resize', this.checkOrientation)
  },
  beforeDestroy () {
    this.$root.$off('dataReturn')
    clearInterval(this.interval)
  },
  methods: {
    checkOrientation () {
      this.isPortrait = window.innerHeight > window.innerWidth
    },
    setupEventListeners () {
      window.addEventListener('resize', this.checkOrientation)
      window.addEventListener('orientationchange', this.checkOrientation)
      document.querySelector('body').requestFullscreen()
    },
    startDateTimeInterval () {
      this.interval = setInterval(() => {
        this.currentTime = moment().format('DD MMM YYYY HH:mm a')
      }, 1000)
    },
    async getFirestore () {
      try {
        this.firestore = this.$firebase.firestore()
        const FieldPath = this.$firebase.firestore.FieldPath
        this.firestore.collection('CatEvent')
          .where(FieldPath.documentId(), '==', this.$session.getAll().data.userName)
          .onSnapshot((snapshot) => {
            if (snapshot.empty) {
              this.updateProcessUpdate()
            } else {
              const doc = snapshot.docs.find(doc => doc.id === this.$session.getAll().data.userName)
              if (doc && doc.data().active === '1') {
                this.updateProcessUpdate()
                this.getBooking()
                this.updateNotifyByShopId()
              }
            }
          })
      } catch (error) {
        console.log('Error getFirestore', error)
      }
    },
    updateProcessUpdate () {
      let params = {
        userName: this.$session.getAll().data.userName
      }
      axios.post('https://asia-southeast1-be-linked-a7cdc.cloudfunctions.net/CatEvent-ProcessUseNew', params)
    },
    async changeStatusSound (text) {
      if (text === 'on') {
        this.statusSound = true
        await this.updateNotifyByShopId()
      } else {
        this.statusSound = false
      }
    },
    async getMessageNoInterval (storeFrontQueue, dueDateDay) {
      try {
        let branchId = this.$session.getAll().data.masBranchID || 2185
        let url = `${this.DNS_IP}/callQueues/get?statusNotify=False&shopId=${this.$session.getAll().data.shopId}&masBranchID=${branchId}&storeFrontQueue=${storeFrontQueue}&CREATE_DATE=${dueDateDay}`
        await axios
          .get(
            url
          ).then(async (response) => {
            if (response.data.status !== false) {
              let result = await this.generateSound(response.data[0])
              await this.updateMessage(response.data[0].id, result)
            }
          })
      } catch (e) {
        console.log(e)
      }
    },
    updateMessage (id, result) {
      const params = {
        statusNotify: 'True',
        audioFile: result.audio_url
      }
      axios.post(`${this.DNS_IP}/callQueues/edit/${id}`, params)
    },
    async generateSound (item) {
      try {
        // eslint-disable-next-line no-tabs
        this.tableId = item.servicePoint.replace('    ', '').replace(' ', '').trim()
        let storeFrontQueue = item.storeFrontQueue
        storeFrontQueue = this.replaceFunc(storeFrontQueue.replace('A', 'เอ'))
        let result
        let oldSound = this.soundQueneNo.filter((row) => { return row.queue === item.storeFrontQueue })
        item.audioFile = null
        if (oldSound.length > 0) {
          item.audioFile = oldSound[0].audioFile
        } else {
          // let branchId = this.$session.getAll().data.masBranchID || 2185
          await axios
            .get(
              `${this.DNS_IP}/callQueues/get?storeFrontQueue=${item.storeFrontQueue}&shopId=` + this.$session.getAll().data.shopId + `&audioFile=notNull`
            ).then(async (response) => {
              if (response.data.length > 0 && typeof response.data.status === 'undefined') {
                item.audioFile = response.data[0].audioFile
              }
            })
        }
        if (item.audioFile === null) {
          var params = {
            text: ' ' + storeFrontQueue,
            text_delay: ' ' + storeFrontQueue,
            speaker: this.speakerId,
            volume: 1,
            speed: 0.75,
            type_media: 'wav'
          }
          await axios
            .post(
              'https://api-voice.botnoi.ai/openapi/v1/generate_audio',
              params,
              { headers: { 'Botnoi-Token': 'VTNjZDc5OTM3ZjM4MDg4NzhkYzlkMTI0ZjNiZWZlMTZkNTYxODk0' } }
            ).then((res) => {
              this.dataListPlay.push(res.data)
              this.playSound()
              result = res.data
            })
        } else {
          let res = { text: item.storeFrontQueue, audio_url: item.audioFile }
          this.dataListPlay.push(res)
          this.playSound()
          result = res
        }
        return result
      } catch (e) {
        console.log(e)
        return null
      }
    },
    playSoundBooking (playList) {
      let playerTV = document.getElementById('playerTV')
      // let video = document.getElementById('videoAds')
      try {
        if (playerTV.paused) {
          let roundCount = 0
          let maxRounds = 2
          // video.pause()
          let index = 0
          let playNext = () => {
            if (index < playList.length) {
              playerTV.src = playList[index++]
              playerTV.load()
              playerTV.play()
            } else if (roundCount < maxRounds - 1) {
              index = 0
              roundCount++
              playNext()
            } else {
              // video.play()
            }
          }
          playerTV.onended = playNext
          playNext()
        } else {
          setTimeout(() => {
            this.playSoundBooking(playList)
          }, 2000)
        }
      } catch (error) {
        console.log('playSoundBooking', error)
      }
    },
    async getShop () {
      await axios
        .get(`${this.DNS_IP}/sys_shop/get?shopId=${this.$session.getAll().data.shopId}`)
        .then(response => {
          let data = response.data
          if (data.length > 0) {
            this.shopColor = data[0].secondaryColor
            this.videoLinkMonition = data[0].videoLinkMonition ? data[0].videoLinkMonition : 'https://firebasestorage.googleapis.com/v0/b/betask-linked/o/BeLinked.mp4?alt=media&token=f88d1f83-3009-4ba4-871b-8e25b60ab01c'
          }
        })
    },
    async getBooking () {
      let arrDataService = []
      try {
        await axios.get(`${this.DNS_IP}/booking_cat_event/getByEmpNoComfirmjob`)
          .then(async response => {
            if (response.data) {
              const res = response.data
              if (res.status) {
                arrDataService = res.data.map(element => {
                  if (element.empNo !== '') {
                    let servicePoint = this.empList.indexOf(parseInt(element.empNo))
                    element.servicePoint = servicePoint + 1
                  }
                  return element
                })
              } else {
                arrDataService = []
              }
            }
          })
      } catch (error) {
        console.log('Error')
      }
      this.dataService = arrDataService
      if (this.statusSound) {
        arrDataService.filter(item => item.statusNotify === 'False').forEach(itemIsNotify => {
          console.log(itemIsNotify)
          let playSound = ['https://storage.googleapis.com/cat-sound/prefix.wav']
          for (const character of itemIsNotify.storeFrontQueue) {
            playSound.push(`https://storage.googleapis.com/cat-sound/${parseInt(character)}.wav`)
          }
          let empId = this.empList.indexOf(parseInt(itemIsNotify.empNo))
          playSound.push(`https://storage.googleapis.com/cat-sound/suffix_${empId + 1}.wav`)
          this.playingSound.push({ playSound: playSound })
        }
        )
      }
      if (this.playingSound.length > 0) {
        this.playingSound.reverse()
        for (let index = this.playingSound.length - 1; index >= 0; index--) {
          let sound = this.playingSound[index]
          this.playSoundBooking(sound.playSound)
          this.playingSound.pop()
        }
      }
    },
    async updateNotifyByShopId () {
      const params = {
        statusNotify: 'True',
        shopId: this.$session.getAll().data.shopId
      }
      await axios.post(`${this.DNS_IP}/callQueues/updateStatusNotify`, params)
    },
    updateMessageSound (bookNo, audioUrl) {
      try {
        const params = {
          statusNotify: 'True',
          audioFile: audioUrl
        }
        axios.post(`${this.DNS_IP}/callQueues/edit/${bookNo}`, params)
      } catch (error) {
        console.log('Error updateMessageSound', error)
      }
    },
    checkWiFiStatus () {
      this.wifiStatus = navigator.onLine ? 'connected' : 'disconnected'
    },
    soundTest () {
      try {
        let filterData = this.dataList.filter(item => item.IsNotify === 'False')
        filterData.forEach(item => {
          let playSound = ['https://storage.googleapis.com/cat-sound/prefix.wav']
          for (const character of item.storeFrontQueue) {
            playSound.push(`https://storage.googleapis.com/cat-sound/${parseInt(character)}.wav`)
          }
          let empId = this.empList.indexOf(parseInt(item.empNo))
          playSound.push(`https://storage.googleapis.com/cat-sound/suffix_${empId + 1}.wav`)
          console.log(playSound)
          this.playSoundBooking(playSound)
        })
      } catch (error) {
        console.log('soundTest ->', error)
      }
    }
  }
}

</script>
<style scope>
.main-card {
  border-radius: 20px 20px 0 0 !important;
  /* width: 1190px; */
  /* height: 700px; */
}

#app-container {
  height: 100vh;
  overflow: hidden;
}

.fullscreen-background {
  background-image: url('../../assets/thaiairways-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
}

.main-card-container {
    height: calc(100vh - 120px); /* ปรับค่าตามความสูงของ footer */
    overflow-y: auto; /* เพิ่มแถบเลื่อนถ้าเนื้อหามากเกินไป */
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .subtext {
        color: #14142B;
        font-size: 10px !important;
        font-weight: bold;
    }
    .subtext-title {
        color: #14142B;
        font-size: 10px !important;
        font-weight: bold;
    }
    .responsive-image {
        height: 110px;
    }
    .text-datetime,
    .text-footer {
        font-size: 11px;
        font-weight: 700;
        color: black;
    }
    .main-content {
        height: 90%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
 }

 /* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
    .subtext {
        color: #14142B;
        font-size: 22px !important;
        font-weight: bold;
    }
    .subtext-title {
        color: #14142B;
        font-size: 16px !important;
        font-weight: bold;
    }
    .responsive-image {
        height: 150px;
    }
    .text-datetime,
    .text-footer {
        font-size: 15px;
        font-weight: 700;
        color: black;
    }
    .main-content {
        height: 85%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
 }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .subtext {
        color: #14142B;
        font-size: 35px !important;
        font-weight: bold;
    }
    .subtext-title {
        color: #14142B;
        font-size: 22px !important;
        font-weight: bold;
    }
    .responsive-image {
        height: 150px;
    }
    .text-datetime,
    .text-footer {
        font-weight: 700;
        color: black;
    }
    .main-content {
        height: 85%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
 }

 /* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    .subtext {
        color: #14142B;
        font-size: 47px !important;
        font-weight: bold;
    }
    .subtext-title {
        color: #14142B;
        font-size: 28px !important;
        font-weight: bold;
    }
    .responsive-image {
        height: 200px;
    }
    .text-datetime,
    .text-footer {
        font-weight: 700;
        color: black;
    }
    .main-content {
        height: 80%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
 }

 /* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
    .subtext {
        color: #14142B;
        font-size: 48px !important;
        font-weight: bold;
    }
    .subtext-title {
        color: #14142B;
        font-size: 28px !important;
        font-weight: bold;
    }
    .responsive-image {
        height: 200px;
    }
    .text-datetime,
    .text-footer {
        font-weight: 700;
        color: black;
    }
    .main-content {
        height: 80%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
 }
</style>
