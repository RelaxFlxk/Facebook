<template>
  <div>
    <v-dialog v-model="dialogDeposit" persistent max-width="80%">
      <v-card>
        <v-card-title>
          <span class="headline">คืนเงินมัดจำ</span>
        </v-card-title>
        <v-card-text v-if="pictureUrlPreviewDeposit === ''">
          <v-alert dense border="left" type="warning">
            <strong>ไม่มี รูปหลักฐานการมัดจำ</strong>
          </v-alert>
          <v-file-input
            required
            :rules="[rules.resizeImag]"
            counter
            show-size
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="รูปหลักฐานการมัดจำ"
            @change="selectImgDeposit"
            v-model="filesDeposit"
          ></v-file-input>
        </v-card-text>
        <v-card-text v-else>
          <v-container>
            <v-form ref="form_deposit" v-model="valid_deposit" lazy-validation>
              <v-row justify="center">
                <v-col cols="12" class="text-center">
                  <v-img
                    aspect-ratio="6"
                    height="500"
                    contain
                    @click="gotoPicture(pictureUrlPreviewDeposit)"
                    :src="pictureUrlPreviewDeposit"
                  ></v-img>
                  <br />
                  <v-file-input
                    required
                    :rules="[rules.resizeImag]"
                    counter
                    show-size
                    accept="image/png, image/jpeg, image/bmp"
                    prepend-icon="mdi-camera"
                    label="รูปหลักฐานการมัดจำ"
                    @change="selectImgDeposit"
                    v-model="filesDeposit"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            elevation="2"
            x-large
            color="red darken-1"
            text
            @click="(dialogDeposit = false), (pictureUrlPreviewDeposit = null)"
            :loading="loadingDeposit"
            :disabled="loadingDeposit"
          >
            <v-icon left> mdi-cancel</v-icon>
            ปิด
          </v-btn>
          <v-btn
            elevation="2"
            x-large
            color="success"
            text
            @click="editStatusDeposit()"
            :loading="loadingDeposit"
            :disabled="loadingDeposit"
          >
            <v-icon left>mdi-checkbox-marked-circle</v-icon>
            อัพเดท
          </v-btn>
          <v-btn
            v-if="statusDeposit === true"
            elevation="2"
            x-large
            color="error"
            text
            @click="cancelStatusDeposit()"
            :loading="loadingDeposit"
            :disabled="loadingDeposit"
          >
            <v-icon left>mdi-checkbox-marked-circle</v-icon>
            ยกเลิกสถานะเงินมัดจำ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios' // api
export default {
  data () {
    return {
      loadingDeposit: true,
      statusDeposit: false,
      dialogDeposit: false,
      pictureUrlDeposit: null,
      pictureUrlPreviewDeposit: null,
      filesDeposit: null,
      valid_deposit: true,
      bookNo: ''
    }
  },
  methods: {
    setData () {

    },
    gotoPicture (Linkitem) {
      window.open(Linkitem, '_blank')
    },
    async editStatusDeposit () {
      this.loadingDeposit = true
      console.log('bookNo', this.bookNo)
      if (this.filesDeposit) {
        const _this = this
        let params = new FormData()
        params.append('file', this.filesDeposit)
        await axios
          .post(this.DNS_IP + `/file/upload/deposit`, params)
          .then(function (response) {
            _this.pictureUrlDeposit = response.data
            console.log('url Pic', response.data)
          })
      } else {
        this.pictureUrlDeposit = this.pictureUrlPreviewDeposit
      }
      let dt = {
        depositStatus: 'True',
        depositImge: this.pictureUrlDeposit,
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/edit/" + this.bookNo,
          dt
        )
        .then(async response => {
          this.$swal('เรียบร้อย', 'อัพเดทหลักฐานเงินมัดจำเรียบร้อย', 'success')
          this.dialogDeposit = false
          this.pictureUrlDeposit = null
          this.filesDeposit = null
          this.loadingDeposit = false
          this.pictureUrlPreviewDeposit = null
        })
    },
    async cancelStatusDeposit () {
      this.loadingDeposit = true
      console.log('bookNo', this.bookNo)
      let dt = {
        depositStatus: 'False',
        LAST_USER: this.$session.getAll().data.userName
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/edit/" + this.bookNo,
          dt
        )
        .then(async response => {
          this.$swal('เรียบร้อย', 'อัพเดทหลักฐานเงินมัดจำเรียบร้อย', 'success')
          this.pictureUrlDeposit = null
          this.filesDeposit = null
          this.loadingDeposit = false
          this.dialogDeposit = false
          this.statusDeposit = false
          this.pictureUrlPreviewDeposit = null
        })
    },
    selectImgDeposit () {
      if (this.filesDeposit) {
        this.pictureUrlPreviewDeposit = URL.createObjectURL(this.filesDeposit)
      } else {
        this.pictureUrlPreviewDeposit = ''
      }
      // console.log(event)
    }
  }
}
</script>
