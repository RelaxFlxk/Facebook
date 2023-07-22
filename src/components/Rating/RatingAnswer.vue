<template>
  <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4 d-flex">
    <v-row class="col-md-12">
      <div class="col-md-7 col-sm-12">
        <div class="card" style="padding: 20px">
          <h3>สร้างแบบสอบถามความพึงพอใจ</h3>
          <form>
            <v-col cols="12" md="12">
              <v-textarea
                solo
                v-model="inputText"
                :rows="2"
                hidden-detail
              ></v-textarea>
            </v-col>
            <div style="padding: 0px 4px;" align="right">
              <v-btn
                :loading="loading"
                :disabled="inputText.length < 1,loading"
                color="#1B437C"
                class="ma-2 white--text"
                @click="confirm"
                large
                style="width: -webkit-fill-available;border-radius: 16px;margin-top: -20px !important;font-weight: bold;"
              >
                เพิ่มแบบสอบถาม
                <!-- <v-icon right dark> mdi-playlist-plus </v-icon> -->
              </v-btn>
            </div>
          </form>
        </div>
        <div class="card" style="padding: 20px">
          <h3>รายการ</h3>
          <table>
            <tbody v-if="formData.message !== 'No data found'">
              <draggable
                :list="formData"
                :disabled="!enabled"
                class="list-group"
                ghost-class="ghost"
                :move="checkMove"
                @start="dragging = true"
                @end="updateOrder"
              >
                <div
                  style="display: flex; justify-content: space-between; "
                  class="list-group-item"
                  v-for="(element, index) in formData"
                  :key="index"
                >
                  <div>
                    <v-icon>mdi-drag-variant</v-icon>
                    {{ index + 1 }}
                    {{ element.answer }}
                  </div>
                  <v-btn
                    :loading="loading3"
                    :disabled="loading3"
                    class="ma-2 white--text"
                    small
                    elevation="0"
                    @click="deleteRating(element.id)"
                  >
                    <v-icon align="right"
                    dark
                    color="#ffbaba"
                    >
                      mdi-delete-forever
                    </v-icon>
                  </v-btn>
                </div>
              </draggable>
            </tbody>
            <tbody v-else>
              ยังไม่มีการเพิ่มแบบสอบถาม
            </tbody>
          </table>
        </div>
      </div>

      <!-- //ตัวโมบาย -->
      <div class="col-md-5 col-sm-12">
        <div class="respons_mobie">
          <div class="body_mobie">
            <div class="screen_mobye">
              <!-- <div class="camera"></div> -->
              <div
                style="display: flex; justify-content: center;flex-wrap: wrap;"
              >
                <!-- <div>ประเมินการบริการ</div> -->
                <img src="../../assets/iPhone X (or newer).png"
                      width="100%"
                    />
                <img src="../../assets/Navigation Bar.png"
                      width="100%"
                      style="position: relative;padding: 10px 28px !important;"
                    />
                <div style="margin-top: -35px;">
                  <div class="col-sm-12 col-md-12" style="width: 347px !important">
                    <img
                      src="../../assets/review-01.jpg"
                      width="100%"
                    />
                    <div v-if="formData.message !== 'No data found'">
                      <div v-for="(data, index) in formData" :key="index">
                        <p class="padding-left" v-if="formData.length > 1">{{ index + 1 }}. {{ data.answer }}</p>
                        <p class="padding-left" v-if="formData.length === 1">{{ data.answer }}</p>
                        <div class="rating-margin">
                          <v-rating
                            v-model="data.rating"
                            color="#FFB461"
                            background-color="#EAEAEF"
                            empty-icon="$ratingFull"
                            :full-icon="starBoldIcon"
                            length="6"
                            :size="100"
                            hover
                            large
                            fab
                            rounded
                          >
                        </v-rating>
                          <br />
                        </div>
                      </div>
                    </div>
                    <div class="padding-left" v-else>
                      <br />
                      <div>
                        <div class="rating-margin text-center">
                          <v-rating
                            v-model="rating"
                            color="#FFB461"
                            background-color="#EAEAEF"
                            empty-icon="$ratingFull"
                            :full-icon="starBoldIcon"
                            length="6"
                            :size="100"
                            hover
                            large
                            fab
                            rounded
                          >
                        </v-rating>
                        <p class="padding-left text-center">ขอบคุณที่เข้ารับบริการกับเรา</p>
                        </div>
                      </div>
                    </div>

                    <!-- <hr class="style-hr" /> -->
                    <v-col cols="12" md="12">
                      <label class="text-bold">ข้อเสนอแนะ</label>
                      <v-textarea
                        outlined
                        flat
                        name="input-7-4"
                        clear-icon="mdi-close-circle"
                        class=""
                      >
                      </v-textarea>
                    </v-col>
                    <v-checkbox
                      v-model="checkbox"
                      color="success"
                      label="ฉันยอมรับให้ พนักงานติดต่อกลับ"
                      :on-icon="'mdi-check-circle'"
                      :off-icon="'mdi-checkbox-blank-circle-outline'"
                      class="padding-left"
                      style="border-radius: 100%;margin: -30px 0 -15px 0;"
                    >
                        <template v-slot:label>
                            <div>ต้องการให้เจ้าหน้าที่ติดต่อกลับ</div>
                        </template>
                    </v-checkbox>
                    <div class="padding-left" align="center" style="padding: 12px 0 0 12px;">
                      <v-btn
                        :loading="loading2"
                        :disabled="loading2"
                        color="#1B437C"
                        class="white--text"
                        x-large
                        style="width: -webkit-fill-available;border-radius: 16px;font-weight: bold;"
                      >
                        ส่งแบบประเมิน
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-row>
  </div>
  </v-main>
</template>
<script>
import axios from 'axios'
import draggable from 'vuedraggable'
// axios.defaults.baseURL = "http://localhost:5004/"
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
export default {
  data () {
    return {
      DNS_IP: 'http://localhost:5004',
      rating: 0,
      starBoldIcon: 'mdi-star',
      checkbox: false,
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      inputText: '',
      formData: [],
      disabled: true,
      enabled: true,
      dragging: false,
      dragOptions: {
        animation: 150
      },
      swasuccess: {
        title: 'สำเร็จ',
        text: 'เพิ่มคำถามเรียบร้อยแล้ว',
        type: 'success',
        icon: 'success'
      }
    }
  },
  components: {
    draggable
  },
  mounted () {
    this.getData()
  },
  methods: {
    checkMove (e) {
      // console.log('Future index:', e.draggedContext.futureIndex)
      this.formData.splice(
        e.draggedContext.futureIndex,
        0,
        this.formData.splice(e.draggedContext.index, 1)[0]
      )
      this.formData.forEach((item, index) => {
        item.sort = index + 1
      })
    },
    updateOrder () {
      // console.log('Updated order:', this.formData)

      const updatedFormData = this.formData.map((element, index) => {
        return Object.assign({}, element, { sort: index + 1 })
      })

      axios
        .post(this.DNS_IP + '/ratingformat/setindex', updatedFormData)
        .then(response => {
          // console.log('Update successful', response)
          this.getData()
        })
        .catch(error => {
          console.error('Update failed:', error)
        })
    },
    getData () {
      try {
        const payload = {
          RECORD_STATUS: 'N',
          shopId: this.$session.getAll().data.shopId
        }
        axios.get(this.DNS_IP + '/ratingformat/get', payload).then(respone => {
          // this.formData = respone.data
          this.formData = JSON.parse(JSON.stringify(respone.data))
          // console.log('formData__GET()()()', this.formData)
        })
      } catch (error) {
        console.log(error)
      }
    },
    deleteRating (id) {
      try {
        const payload = {
          LAST_USER: this.$session.getAll().data.userName
        }
        this.$swal({
          title: 'ลบคำถาม?',
          text: 'คุณต้องการลบคำถาม!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ใช่, ต้องการลบ'
        }).then(result => {
          if (id) {
            axios
              .post(this.DNS_IP + '/ratingAnswer/delete/' + id, payload)
              .then(response => {
                this.getData()
                this.$swal('ลบสำเร็จ!', 'คุณได้ลบคำถามแล้ว', 'success')
              })
              .catch(error => {
                console.log(error)
              })
          } else if (result.dismiss === 'cancel') {
            this.$swal('ยกเลิก', 'คุณยกเลิกการลบคำถาม', 'error')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },

    confirm () {
      try {
        const payload = {
          answer: this.inputText,
          rating: 0,
          shopId: this.$session.getAll().data.shopId,
          LAST_USER: this.$session.getAll().data.userName,
          CREATE_USER: this.$session.getAll().data.userName
        }
        this.loading = true
        axios.post(this.DNS_IP + '/ratingformat/add', payload).then(respone => {
          this.$swal(this.swasuccess)
          this.loading = false
          // console.log(respone)
          this.getData()
          this.inputText = ''
        })
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style scope>

p{
  color:#77808D;
}
.v-rating .v-icon {
  padding: 0rem !important;
    padding-right: 4px !important;
}
.theme--light.v-btn.v-btn--has-bg {
    background-color: #ffffff00;
}
.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
    padding: 0 12px;
}
.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot {
    margin-right: 0px;
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)>.v-input__control>.v-input__slot fieldset {
    color: #EAEAEF;
}
.v-text-field.v-text-field--enclosed .v-text-field__details, .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)>.v-input__control>.v-input__slot {
    padding: 0 0;
}
.theme--light.v-text-field--solo>.v-input__control>.v-input__slot {
    background: #ffffff00;
}
.padding-left{
  padding: 12px 15px;
}
.text-bold{
  font-weight: bold;
}
.card {
  padding: 10px;
  border: solid #e3e3e3;
  border-radius: 20px;
  margin-bottom: 20px;
}
@media screen and (min-width: 768px) {
  .respons_mobie {
  display: flex;
  justify-content: center;
  position: fixed;
}
}
.respons_mobie {
  display: flex;
  justify-content: center;
}
.body_mobie {
  border-radius: 16px;
  background: #FFF;
  /* box-shadow: 0px 4px 20px -2px rgba(50, 50, 71, 0.04), 0px 0px 1px 0px rgba(12, 26, 75, 0.03); */
  box-shadow: 0px 4px 20px -2px rgba(50, 50, 71, 0.04), 0px 0px 1px 0px rgba(12, 26, 75, 0.03);
}
.screen_mobye {
  width: 367px;
  height: 730px;
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  overflow: scroll;
  /* background-image: url(https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?cs=srgb&dl=pexels-matheus-bertelli-799443.jpg&fm=jpg); */
}

.card-title {
  padding-top: 40px;
  border-radius: 25px;
  background-color: #797979;
  display: flex;
  align-items: center;
  background: #000000;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.4px);
  -webkit-backdrop-filter: blur(3.4px);
}
.title-1 {
  font-weight: bold !important;
  color: #fff;
  filter: drop-shadow(0px 1px 2px #828282);
  font-size: 20px;
}
.style-hr {
  background-color: #ffffff00;
  border-top: 2px dotted #8c8b8b;
  margin: 15px;
}
.draggable-item {
  background-color: lightgray;
  padding: 10px;
  margin-bottom: 10px;
}
.bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  top: 0;
  left: 0;
}
.bubble {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  background: #f1f1f1;
  border-radius: 50%;
  opacity: 0.5;
  animation: rise 10s infinite ease-in;
}
.bubble:nth-child(1) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 8s;
}
.bubble:nth-child(2) {
  width: 20px;
  height: 20px;
  left: 20%;
  animation-duration: 5s;
  animation-delay: 1s;
}
.bubble:nth-child(3) {
  width: 50px;
  height: 50px;
  left: 35%;
  animation-duration: 7s;
  animation-delay: 2s;
}
.bubble:nth-child(4) {
  width: 80px;
  height: 80px;
  left: 50%;
  animation-duration: 11s;
  animation-delay: 0s;
}
.bubble:nth-child(5) {
  width: 35px;
  height: 35px;
  left: 55%;
  animation-duration: 6s;
  animation-delay: 1s;
}
.bubble:nth-child(6) {
  width: 45px;
  height: 45px;
  left: 65%;
  animation-duration: 8s;
  animation-delay: 3s;
}
.bubble:nth-child(7) {
  width: 90px;
  height: 90px;
  left: 70%;
  animation-duration: 12s;
  animation-delay: 2s;
}
.bubble:nth-child(8) {
  width: 25px;
  height: 25px;
  left: 80%;
  animation-duration: 6s;
  animation-delay: 2s;
}
.bubble:nth-child(9) {
  width: 15px;
  height: 15px;
  left: 70%;
  animation-duration: 5s;
  animation-delay: 1s;
}
.bubble:nth-child(10) {
  width: 90px;
  height: 90px;
  left: 25%;
  animation-duration: 10s;
  animation-delay: 4s;
}
.rating-margin {
  margin: -20px 0px -30px 12px;
}
@keyframes rise {
  0% {
    bottom: -100px;
    transform: translateX(0);
  }
  50% {
    transform: translate(100px);
  }
  100% {
    bottom: 1080px;
    transform: translateX(-200px);
  }
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
