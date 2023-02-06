<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div :class="dialogwidth === '50%' ? 'pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4' : 'px-lg-4'" :style="dialogwidth === '50%' ? '' : 'overflow-x: hidden;height:100vh;background-color: #1B437C;'">
        <v-row>
          <v-col cols="6" class="text-left" v-if="dialogwidth === '50%'">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right" v-if="dialogwidth === '50%'">
            <v-col col="auto">
              <v-btn
                color="info"
                fab
                style="border-radius: 20px !important;box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.4), 0px 5px 15px rgba(162, 171, 198, 0.6);"
                @click="checkSearch()"
              >
                <v-icon color="white">mdi-backup-restore</v-icon>
              </v-btn>
            </v-col>
          </v-col>
          <v-col cols="6" v-else></v-col>
        </v-row>
        <v-card flat v-if="!overlay">
          <v-card-text>
            <div class="text-center">
              <waitingAlert></waitingAlert>
            </div>
          </v-card-text>
        </v-card>
        <template v-else>
        <v-form ref="form_search" v-model="validSearch" lazy-validation v-if="dialogwidth === '50%'">
          <v-row>
            <v-col cols="3">
              <v-select
                v-model="masBranchID"
                background-color="white"
                style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                hide-details
                :items="branchItem"
                label="สาขา"
                outlined
                dense
                required
                :rules ="[rules.required]"
                @change="searchBooking()"
                ><template #prepend-inner>
                  <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                    mdi-map-marker-outline
                  </v-icon>
                </template>
              </v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                v-model="flowSelect"
                hide-details
                background-color="white"
                :items="DataFlowItem"
                label="ประเภทบริการ"
                outlined
                dense
                required
                :rules ="[rules.required]"
                @change="searchBooking()"
              >
                <template #prepend-inner>
                  <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                    mdi-note-text-outline
                  </v-icon>
                </template>
              </v-select>
            </v-col>
            <v-col cols="3">
              <v-menu
                ref="menu"
                v-model="menuStart"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    hide-details
                    background-color="white"
                    v-model="dateStart"
                    style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                    label="วัน/เดือน/ปี"
                    readonly
                    outlined
                    dense
                    required
                    :rules ="[rules.required]"
                    v-bind="attrs"
                    v-on="on"
                  >
                  <template #prepend-inner>
                  <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                    mdi-calendar
                  </v-icon>
                </template></v-text-field>
                </template>
                <v-date-picker
                  @input="menuStart = false, checkSearch()"
                  v-model="dateStart"
                  no-title
                  scrollable
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <!-- <v-col col="auto">
              <v-select
                style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                v-model="time"
                hide-details
                background-color="white"
                :items="timeavailable"
                label="เวลา"
                outlined
                dense
                required
                :rules ="[rules.required]"
              >
                <template #prepend-inner>
                  <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                    mdi-map-marker-circle
                  </v-icon>
                </template>
              </v-select>
            </v-col> -->
            <v-col cols="3" class="pt-0">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- <v-row justify="center">
            <v-col cols="3" class="pt-0">
              <v-btn
                color="warning"
                block
                style="border-radius: 20px !important;margin-right: 0px;box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.4), 0px 5px 15px rgba(162, 171, 198, 0.6);"
                @click="checkSearch()"
              >
                <v-icon color="white" left>mdi-clipboard-text-search</v-icon>
                ค้นหา
              </v-btn>
            </v-col>
          </v-row> -->
        </v-form>
        <v-form ref="form_search" v-model="validSearch" lazy-validation v-else>
          <v-row>
            <v-col cols="12" class="pl-10 pr-10">
              <v-select
                style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                v-model="flowSelect"
                hide-details
                background-color="white"
                :items="DataFlowItem"
                outlined
                dense
                required
                :rules ="[rules.required]"
                @change="searchBooking()"
              >
                <template #prepend-inner>
                  <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                    mdi-note-text-outline
                  </v-icon>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" class="pl-10 pr-10">
              <v-menu
                ref="menu"
                v-model="menuStart"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    hide-details
                    background-color="white"
                    v-model="dateStart"
                    style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                    readonly
                    outlined
                    dense
                    required
                    :rules ="[rules.required]"
                    v-bind="attrs"
                    v-on="on"
                  >
                  <template #prepend-inner>
                  <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                    mdi-calendar
                  </v-icon>
                </template></v-text-field>
                </template>
                <v-date-picker
                  @input="menuStart = false, checkSearch()"
                  v-model="dateStart"
                  no-title
                  scrollable
                >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
        <v-row v-if="dialogwidth === '50%'">
          <v-col cols="12">
            <v-card>
            <!-- <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title> -->
            <v-data-table
              :headers="headers"
              :items="itemBooking"
              :search="search"
              disable-pagination
              hide-default-footer
            >
            <template v-slot:[`item.dueDate`]="{ item }">
              {{ format_dateFUllTime(item.dueDate) }}
            </template>
            <template v-slot:[`item.action1`]="{ item }">
              <v-btn
                class="btnTobicon"
                color="#809FB8"
                small
                dark
                wigth="46px"
                height="46px"
                outlined
                @click="overlay = false, setPrint(item, 'th')"
              >
                <v-icon > mdi-printer </v-icon>
                TH
              </v-btn>
              <v-btn
                class="btnTobicon"
                color="#809FB8"
                small
                dark
                wigth="46px"
                height="46px"
                outlined
                @click="overlay = false, setPrint(item, 'en')"
              >
                <v-icon> mdi-printer </v-icon>
                EN
              </v-btn>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-row class="text-center">
                <v-col cols="4" class="pb-0">
                  <v-btn
                    color="#24C74D"
                    small
                    rounded
                    block
                    :disabled="item.statusBt === 'confirm' ? false:true"
                    @click="closeJobSubmit(item)"
                    :class="item.statusBt === 'confirm' ? 'text-white':''"
                  >
                    เรียกคิว
                  </v-btn>
                </v-col>
                <v-col cols="4" class="pb-0">
                  <v-btn
                    color="#F38383"
                    small
                    rounded
                    block
                    :disabled="item.statusBt === 'confirmJob' ? false:true"
                    @click="closeJobSubmitReturn(item)"
                    :class="item.statusBt === 'confirmJob' ? 'text-white':''"
                  >
                    เรียกคิวซ้ำ
                  </v-btn>
                </v-col>
                <v-col cols="4" class="pb-0">
                  <v-btn
                    color="#1B437C"
                    small
                    rounded
                    block
                    :disabled="item.statusBt === 'confirmJob' ? false:true"
                    @click="backHomeSubmit(item)"
                    :class="item.statusBt === 'confirmJob' ? 'text-white':''"
                  >
                    เสร็จสิ้น
                  </v-btn>
                </v-col>
              </v-row>
            </template>
            <template v-slot:[`item.storeFrontQueue`]="{ item }">
              <v-row>
                <v-col cols="12">
                  <v-row>
                    <v-col col="auto" class="text-ceter" v-if="item.userId === 'user-skip' || item.userId === '' || item.userId === null || item.userId === 'data import'">
                        {{ item.storeFrontQueue }}
                    </v-col>
                    <template v-else>
                      <v-col col="auto" class="text-ceter">
                        <a @click.stop="openHistory(item)" style="cursor:hand"><u>{{ item.storeFrontQueue }}</u></a>
                      </v-col>
                    </template>
                  </v-row>
                </v-col>
              </v-row>
            </template>
            </v-data-table>
          </v-card>
          </v-col>
        </v-row>
        <v-row v-if="itemBooking.filter(el => el.statusBt !== 'closeJob').length > 0 && dialogwidth !== '50%'">
          <v-col cols="12"  v-for="(item, id) in itemBooking.filter(el => el.statusBt !== 'closeJob')" :key="id">
            <v-card class="mx-6 pa-3 ma-2" style="background: #FFFFFF;box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.08);border-radius: 24px;">
              <div mb-n5>
                <!-- <h6 style="color:#092C4C" class="text-left font-weight-bold ml-10">{{ item.flowName }}</h6> -->
                <v-row>
                  <v-col cols="8">
                    <p style="color:#092C4C;font-size: 48px;" class="text-left font-weight-black mt-n1 mb-n5 pa-7">{{item.storeFrontQueue}}</p>
                    <p style="color:#000000;font-size: 16px;" class="text-left font-weight-medium mt-n10 ml-7">{{item.cusName}}</p>
                    <p style="color:#000000;font-size: 16px;" class="text-left font-weight-medium mt-n3 ml-7">{{ languageSelect === 0 ? item.servicePoint : JSON.parse(item.servicePointCount).filter(el => { return el.textTh === item.servicePoint}).length > 0 ? JSON.parse(item.servicePointCount).filter(el => { return el.textTh === item.servicePoint})[0].textEn:item.servicePoint}}</p>
                  </v-col>
                  <v-col cols="4">
                    <div class="mt-5" align="center">
                      <v-img
                        @click="closeJobSubmit(item)"
                        :src="item.statusBt === 'confirm' ? 'https://firebasestorage.googleapis.com/v0/b/betask-linked/o/picture-app%2FselectActiveQ1.png?alt=media&token=938edfa3-26a9-4c27-94a6-208cc2e81a0f': 'https://firebasestorage.googleapis.com/v0/b/betask-linked/o/picture-app%2FselectInactiveQ1.png?alt=media&token=e7c25716-7e4d-4499-af94-8ef382a51185'" max-width="107px" max-height="107px"></v-img>
                    </div>
                  </v-col>
                </v-row>
                <!-- <h5 v-if="item.servicePoint" class="text-start  ml-10 mt-2"><strong>{{ languageSelect === 0 ? item.servicePoint : JSON.parse(item.servicePointCount).filter(el => { return el.textTh === item.servicePoint}).length > 0 ? JSON.parse(item.servicePointCount).filter(el => { return el.textTh === item.servicePoint})[0].textEn:item.servicePoint}}</strong></h5> -->
                <div class="text-center">
                  <v-btn
                  color="#F8CD70"
                  rounded
                  min-width="88px"
                  v-if="item.cusPhone !== ''"
                  @click="dial(item.cusPhone)"
                >
                  <strong class="text-white">โทร</strong>
                </v-btn>
                <v-btn
                  color="#1B437C"
                  rounded
                  min-width="88px"
                  :disabled="item.statusBt === 'confirmJob' ? false:true"
                  @click="closeJobSubmitReturn(item)"
                >
                  <strong class="text-white">เรียกคิวซ้ำ</strong>
                </v-btn>
                <v-btn
                  color="#F38383"
                  rounded
                  min-width="88px"
                  :disabled="item.statusBt === 'confirmJob' ? false:true"
                  @click="backHomeSubmit(item)"
                >
                  <strong class="text-white">ปิดงาน</strong>
                </v-btn>
                </div>
                <!-- <v-row> -->
                  <!-- <v-col col="12" class="text-center">
                    <div class=" mt-2" style="display: flex;">
                      <v-icon  color="#F38080" class="iconify" data-icon="ic:twotone-access-time"></v-icon>
                      <p class="font-weight-medium text-center ma-0 ml-2" v-if="dateStart" style="font-size:16px;color:#979797;">
                        {{momentThaiText(dateStart)}}</p>
                    </div>
                  </v-col> -->
                  <!-- <v-col cols="6" class="pl-0 pr-0">
                    <div class="text-start mt-2" style="display: flex;word-break: break-word;">
                      <v-icon color="#979797" class="mx-1 mr-2">mdi-map-marker-radius</v-icon>
                      <p class="font-weight-medium mb-1" style="font-size:16px;color:#979797;" v-if="masBranchID !== ''">
                      สาขา : {{branchItem.filter(el => { return masBranchID === el.value })[0].text}}
                    </p>
                    </div>
                  </v-col> -->
                <!-- </v-row> -->
              </div>
            </v-card>
          </v-col>
          <br>
        </v-row>
        </template>
        <v-dialog v-model="dialogPrint" scrollable transition="dialog-bottom-transition" persistent max-width="100%">
              <v-card class="text-center">
                <v-card-text>
                  <iframe id='pdfV' style="width:100%; height: 900px"></iframe>
                </v-card-text>
                <v-card-actions class="text-center">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error"
                    class="button"
                    dark
                    large
                    @click="dialogPrint = false"
                  >
                    ปิด
                  </v-btn>
                  <!-- </div> -->
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogHistory" scrollable persistent :max-width="dialogwidth">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="6" class="text-left pt-10">
                      <h3><strong>รายละเอียดนัดหมาย</strong></h3>
                    </v-col>
                    <v-col cols="6" class="pt-10">
                      <div style="text-align: end;">
                        <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="dialogHistory = false"
                          >
                          X
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                   <v-row >
                    <v-col cols="12">
                      <div class="avatar text-center">
                        <v-avatar size="120" style="border:5px solid #FFFFFF;">
                          <v-img
                            v-if="pictureUrHistory"
                            :src="pictureUrHistory"
                          ></v-img>
                          <v-icon size="100" color="orange" v-else>
                            mdi-tooltip-account
                          </v-icon>
                        </v-avatar>
                      </div>
                      <br>
                      <template v-if="HistoryData.length > 0">
                        <h6 class="text-start font-weight-bold">{{format_dateThai(HistoryData[0].dueDate)}}</h6>
                        <h6 class="text-start font-weight-bold">{{HistoryData[0].flowName}}</h6>
                        <h6 class="text-start font-weight-bold">{{HistoryData[0].masBranchName}}</h6>
                        <div v-for="(item3 , index3) in HistoryData" :key="index3">
                          <p class="text-start" v-if="item3.fieldValue !== ''"><strong>{{item3.fieldName}} : </strong> {{item3.fieldValue}}</p>
                        </div>
                        <v-btn
                          color="#1B437C"
                          small
                          dark
                          @click="sendQonline(HistoryData[0])"
                        >
                          <v-icon left>mdi-send-check-outline</v-icon>
                          ส่งคิวออนไลน์
                        </v-btn>
                      </template>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogServicePointStatus" scrollable persistent :max-width="dialogwidth">
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="10" class="text-left pt-10">
                      <h3><strong>กรุณาเลือกจุดบริการ</strong></h3>
                    </v-col>
                    <v-col cols="2" class="pt-7">
                      <div style="text-align: end;">
                        <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="dialogServicePointStatus = false"
                          >
                          X
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                   <v-row >
                    <v-col cols="12">
                      <!-- <v-select
                        v-model="servicePoint"
                        item-text="textTh"
                        item-value="textTh"
                        background-color="white"
                        style="box-shadow: 0px 38px 72px 30px rgb(10 4 60 / 6%);border-radius: 40px !important;margin-bottom: 10px;"
                        hide-details
                        :items="servicePointItem"
                        label="จุดบริการ"
                        outlined
                        dense
                        ><template #prepend-inner>
                          <v-icon color="#69D1FD" style="background-color: #E0F4FF;padding: 4px;border-radius: 50px;margin-top: -1px;margin-right: 3px;margin-bottom: 3px;">
                            mdi-access-point
                          </v-icon>
                        </template>
                      </v-select> -->
                      <v-radio-group v-model="servicePoint" row>
                        <v-radio
                          v-for="(n, id) in servicePointItem" :key="id"
                          :label="`${n.textTh}`"
                          :value="n.textTh"
                        ></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        color="#1DBF73"
                        block
                        v-if="statusReturn"
                        dark
                        @click="closeJobServicePointReturn(closeItem)"
                      >
                        เรียกคิว
                      </v-btn>
                      <v-btn
                        v-else
                        color="#1DBF73"
                        block
                        dark
                        @click="closeJobServicePoint(closeItem)"
                      >
                        เรียกคิว
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <v-footer v-if="dialogwidth !== '50%'" fixed padless color="#1B437C" class="text-center" style="justify-content: center;padding-top: 10px;">
          <p class="text-white" width="100%">POWER BY  BETASK CONSULTING</p>
        </v-footer>
    </v-main>
  </div>
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
      shopPhone: '',
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
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      search: '',
      shopName: '',
      shopImg: '',
      headers: [
        { text: 'คิว', value: 'storeFrontQueue' },
        // { text: 'วันที่นัดหมาย', value: 'dueDate' },
        { text: 'บริการ', value: 'flowName' },
        { text: 'ชื่อลูกค้า', value: 'cusName' },
        // { text: 'H.N.', value: 'hnNo' },
        { text: 'ปริ้นบัตรคิว', value: 'action1', sortable: false, align: 'center' },
        { text: 'การจัดการคิว', value: 'action', sortable: false, align: 'center', width: '400px' }
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
      dialogHistory: false
    }
  },
  computed: {
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
    this.dataLineConfig = await this.getDataLineConfig(this.$session.getAll().data.shopId)
    this.dateStart = this.momenDate_1(new Date())
    await this.getDataFlow()
    await this.getDataBranch()
    this.setTime()
    this.getShop()
    this.checkSearch()
  },
  methods: {
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
        .post(this.DNS_IP + '/Booking/pushMsgQueue/' + item.bookNo, dtt)
        .then(async responses => {
          this.$swal({
            title: 'Send successfully',
            text: 'ส่งสำเร็จ',
            type: 'success',
            timer: 2000,
            showConfirmButton: false
          })
        }).catch(error => {
          console.log('error function pushMsgQueue : ', error)
        })
    },
    async openHistory (item) {
      console.log('item', item)
      console.log('this.BookingDataList[item.bookNo]', this.BookingDataList[item.bookNo])
      this.HistoryData = this.BookingDataList[item.bookNo]
      this.pictureUrHistory = item.memberPicture
      // axios.get(this.DNS_IP + '/BookingData/get_history?bookNo=' + item.bookNo)
      //   .then(async (response) => {
      //     let rs = response.data
      //     if (rs.status !== false) {
      //       this.HistoryData = response.data
      this.dialogHistory = true
      //     }
      //   })
      //   .catch((error) => {
      //     console.log('error function addData : ', error)
      //   })
    },
    async getShop () {
      let shopImg = ''
      await axios
        .get(this.DNS_IP + '/sys_shop/get?shopId=' + this.shopId)
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
      this.validate('SEARCH')
      setTimeout(() => this.searchBooking(), 500)
    },
    async searchBooking () {
      if (this.validSearch === true) {
        this.itemBooking = []
        await this.getBookingDataList(this.dateStart)
        let urlApi = {}
        if (this.flowSelect === 'allFlow') {
          urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.shopId +
            '&masBranchID=' +
            this.masBranchID +
            // '&flowId=' +
            // this.flowSelect +
            '&dueDate=' +
            this.dateStart + '&storeFrontQueue=is not null&statusBt=confirm and confirmJob and closeJob'
        // '&dueDate=' +
        // this.dateStart + ' ' + this.time + '&storeFrontQueue=is not null&statusBt=confirm'
        } else {
          urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&flowId=' +
            this.flowSelect +
            '&dueDate=' +
            this.dateStart + '&storeFrontQueue=is not null&statusBt=confirm and confirmJob and closeJob'
        }
        await axios
          .get(urlApi)
          .then(async response => {
            console.log('getData', response.data.length)
            let rs = response.data
            if (rs.length > 0) {
              let sortData = rs.sort((a, b) => {
                if (a.storeFrontQueue < b.storeFrontQueue) return -1
                return a.storeFrontQueue > b.storeFrontQueue ? 1 : 0
              })
              for (let i = 0; i < sortData.length; i++) {
                let d = sortData[i]
                if (this.BookingDataList[d.bookNo] !== undefined) {
                  d.cusName = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'ชื่อ')
                  d.cusName = (d.cusName.length > 0) ? d.cusName[0].fieldValue : ''
                  d.cusPhone = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เบอร์โทร')
                  d.cusPhone = (d.cusPhone.length > 0) ? d.cusPhone[0].fieldValue : ''
                  this.itemBooking.push(d)
                }
              }
            }
          })
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
      this.BookingDataList = []
      let url = ''
      if (this.flowSelect === 'allFlow') {
        url = `${this.DNS_IP}/BookingData/getView?shopId=${this.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}`
      } else {
        url = `${this.DNS_IP}/BookingData/getView?shopId=${this.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}&flowId=${this.flowSelect}`
      }
      // let url = `${this.DNS_IP}/BookingData/getView?shopId=${this.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}&flowId=${this.flowSelect}`
      await axios
        .get(url)
        .then(async response => {
          if (response.data.status !== false) {
            response.data.forEach((row) => {
              if (typeof (this.BookingDataList[row.bookNo]) === 'undefined') {
                this.BookingDataList[row.bookNo] = []
              }
              this.BookingDataList[row.bookNo].push(row)
            })
          }
        }).catch(error => {
          // this.dataEditReady = true
          setTimeout(() => this.getBookingDataList(dateStart), 3000)
          console.log('catch getBookingDataList : ', error)
        })
      console.log('this.BookingDataList1', this.BookingDataList)
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
        .get(this.DNS_IP + `/flow/get?shopId=${this.shopId}&storeFrontCheck=True`)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            if (this.$session.getAll().data.USER_ROLE === 'storeFront') {
              for (let i = 0; i < rs.length; i++) {
                let d = rs[i]
                let s = {}
                if (JSON.parse(this.$session.getAll().data.flowId).filter(el => { return el === d.flowId }).length > 0) {
                  s.text = d.flowName
                  s.value = d.flowId
                  s.allData = d
                  resultOption.push(s)
                }
              }
            } else {
              resultOption.push({'text': 'ทั้งหมด', 'value': 'allFlow'})
              for (let i = 0; i < rs.length; i++) {
                let d = rs[i]
                let s = {}
                s.text = d.flowName
                s.value = d.flowId
                s.allData = d
                resultOption.push(s)
              // console.log('this.DataFlowName', this.DataFlowName)
              }
            }
          } else {
            resultOption = []
          }
        })
      this.DataFlowItem = resultOption
      if (resultOption.length > 0) {
        this.flowSelect = this.DataFlowItem[0].value
      }
    },
    async getDataBranch () {
      // if (localStorage.getItem('BRANCH') === null) {
      //   let temp = await this.getDataFromAPI('/master_branch/get', 'masBranchID', 'masBranchName')
      //   console.log(typeof temp)
      //   localStorage.setItem('BRANCH', JSON.stringify(temp))
      // }
      // this.branch = JSON.parse(localStorage.getItem('BRANCH'))
      this.branchItem = await this.getDataFromAPI('/master_branch/get', 'masBranchID', 'masBranchName', '')
      if (this.branchItem.length > 0) {
        this.masBranchID = this.branchItem[0].value
      }
    },
    async getDataFromAPI (url, fieldId, fieldName, param) {
      let result = []
      await axios
        .get(this.DNS_IP + `${url}?shopId=${this.shopId}${param}`)
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
      } else {
        let statusBooking = await this.checkBookingStatus(item.bookNo)
        if (statusBooking === 'confirmJob') {
          this.$swal({
            title: 'ต้องการเรียกคิวนี้ ใช่หรือไม่?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1DBF73',
            cancelButtonColor: '#F38383',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
          }).then(async response => {
            await this.updateServicePoint(item.bookNo)
            let lineUserId = item.lineUserId || ''
            if (lineUserId !== '') {
              let dtt = {
                checkGetQueue: 'True'
              }
              await axios
                .post(this.DNS_IP + '/Booking/pushMsgQueueReturn/' + item.bookNo, dtt)
                .then(async responses => {}).catch(error => {
                  console.log('error function pushMsgQueueReturn : ', error)
                })
            }
            this.dialogServicePointStatus = false
            this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
            await this.searchBooking()
          })
        } else {
          this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
          await this.searchBooking()
        }
      }
    },
    async closeJobServicePoint (item) {
      if (this.servicePoint === '') {
        this.$swal('ผิดพลาด', 'กรุณาเลือกจุดบริการ', 'error')
      } else {
        let statusBooking = await this.checkBookingStatus(item.bookNo)
        if (statusBooking === 'confirm') {
          this.$swal({
            title: 'ต้องการเรียกคิวนี้ ใช่หรือไม่?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1DBF73',
            cancelButtonColor: '#F38383',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
          }).then(async response => {
          // await this.clearConfirmJob(item.dueDate)
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
                let lineUserId = item.lineUserId || ''
                if (lineUserId !== '') {
                  let dtt = {
                    checkGetQueue: 'True'
                  }
                  await axios
                    .post(this.DNS_IP + '/Booking/pushMsgQueue/' + item.bookNo, dtt)
                    .then(async responses => {}).catch(error => {
                      console.log('error function pushMsgQueue : ', error)
                    })
                }
                let USER_ROLE = this.session.data.USER_ROLE || ''
                let empId = this.session.data.empId || ''
                if (USER_ROLE === 'storeFront' && empId !== '') {
                  this.updateEmp(item.bookNo)
                }
                this.dialogServicePointStatus = false
                this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
                await this.searchBooking()
              })
          })
        } else {
          this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
          await this.searchBooking()
        }
      }
    },
    async closeJobSubmitReturn (item) {
      console.log('closeJobSubmit', item)
      let statusBooking = await this.checkBookingStatus(item.bookNo)
      if (statusBooking === 'confirmJob') {
        if (item.servicePointStatus === 'True') {
          this.closeItem = item
          this.dialogServicePointStatus = true
          this.servicePoint = item.servicePoint || ''
          if (item.servicePointRecursive === 'False') {
            await this.setservicePointCount(item)
          } else {
            this.servicePointItem = JSON.parse(item.servicePointCount) || []
          }
          this.statusReturn = true
        } else {
          this.$swal({
            title: 'ต้องการเรียกคิวนี้ ใช่หรือไม่?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1DBF73',
            cancelButtonColor: '#F38383',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
          }).then(async response => {
            let lineUserId = item.lineUserId || ''
            if (lineUserId !== '') {
              let dtt = {
                checkGetQueue: 'True'
              }
              await axios
                .post(this.DNS_IP + '/Booking/pushMsgQueueReturn/' + item.bookNo, dtt)
                .then(async responses => {}).catch(error => {
                  console.log('error function pushMsgQueueReturn : ', error)
                })
            }
            this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
            await this.searchBooking()
          })
        }
      } else {
        this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
        await this.searchBooking()
      }
    },
    async backHomeSubmit (item) {
      console.log('backHomeSubmit', item)
      let statusBooking = await this.checkBookingStatus(item.bookNo)
      if (statusBooking === 'confirmJob') {
        this.$swal({
          title: 'ต้องการปิดงานนี้ ใช่หรือไม่?',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#1DBF73',
          cancelButtonColor: '#F38383',
          confirmButtonText: 'ใช่',
          cancelButtonText: 'ไม่'
        }).then(async response => {
        // await this.clearConfirmJob(item.dueDate)
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
              this.$swal('เรียบร้อย', 'ปิดงานสำเร็จ', 'success')
              await this.searchBooking()
            // let bookSelect = this.itemBooking.filter((element, index) => { return index <= 2 })
            // if (bookSelect.length > 0) {
            //   for (let i = 0; i < bookSelect.length; i++) {
            //     let d = bookSelect[i]
            //     let s = {}
            //     s.lineUserId = d.lineUserId || ''
            //     if (s.lineUserId !== '') {
            //       await axios
            //         .post(this.DNS_IP + '/Booking/pushMsgQueue/' + d.bookNo)
            //         .then(async responses => {}).catch(error => {
            //           console.log('error function pushMsgQueue : ', error)
            //         })
            //     }
            //   }
            // }
            })
        })
      } else {
        this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
        await this.searchBooking()
      }
    },
    async setservicePointCount (item) {
      this.servicePointItem = []
      await axios
        // .get(this.DNS_IP + '/BookingData/get?shopId=' + this.shopId + '&bookNo=' + this.bookNo)
        .get(this.DNS_IP + '/booking_view/get?shopId=' + item.shopId + '&flowId=' + item.flowId +
        '&dueDateDay=' + this.dateStart + '&storeFrontQueue=is not null&statusBt=confirmJob&servicePointStatus=True')
        .then(async response => {
          let rs = response.data
          console.log('setservicePointCount', rs)
          if (rs.status !== false) {
            let servicePointItem = rs.filter(el => { return el.servicePoint !== null || el.servicePoint !== '' })
            if (servicePointItem.length > 0) {
              if (JSON.parse(item.servicePointCount).length > 0) {
                for (let i = 0; i < JSON.parse(item.servicePointCount).length; i++) {
                  let d = JSON.parse(item.servicePointCount)[i]
                  console.log('Count', servicePointItem.filter(el => { return el.servicePoint === d.textTh }))
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
      console.log('closeJobSubmit', item)
      if (item.statusBt === 'confirm') {
        let statusBooking = await this.checkBookingStatus(item.bookNo)
        if (statusBooking === 'confirm') {
          if (item.servicePointStatus === 'True') {
            this.closeItem = item
            this.dialogServicePointStatus = true
            this.servicePoint = item.servicePoint || ''
            if (item.servicePointRecursive === 'False') {
              await this.setservicePointCount(item)
            } else {
              this.servicePointItem = JSON.parse(item.servicePointCount) || []
            }
            this.statusReturn = false
          } else {
            this.$swal({
              title: 'ต้องการเรียกคิวนี้ ใช่หรือไม่?',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#1DBF73',
              cancelButtonColor: '#F38383',
              confirmButtonText: 'ใช่',
              cancelButtonText: 'ไม่'
            }).then(async response => {
              // await this.clearConfirmJob(item.dueDate)
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
                  let lineUserId = item.lineUserId || ''
                  if (lineUserId !== '') {
                    let dtt = {
                      checkGetQueue: 'True'
                    }
                    await axios
                      .post(this.DNS_IP + '/Booking/pushMsgQueue/' + item.bookNo, dtt)
                      .then(async responses => {}).catch(error => {
                        console.log('error function pushMsgQueue : ', error)
                      })
                  }
                  let USER_ROLE = this.session.data.USER_ROLE || ''
                  let empId = this.session.data.empId || ''
                  if (USER_ROLE === 'storeFront' && empId !== '') {
                    this.updateEmp(item.bookNo)
                  }
                  this.$swal('เรียบร้อย', 'เรียกคิวสำเร็จ', 'success')
                  await this.searchBooking()
                // let bookSelect = this.itemBooking.filter((element, index) => { return index <= 2 })
                // if (bookSelect.length > 0) {
                //   for (let i = 0; i < bookSelect.length; i++) {
                //     let d = bookSelect[i]
                //     let s = {}
                //     s.lineUserId = d.lineUserId || ''
                //     if (s.lineUserId !== '') {
                //       await axios
                //         .post(this.DNS_IP + '/Booking/pushMsgQueue/' + d.bookNo)
                //         .then(async responses => {}).catch(error => {
                //           console.log('error function pushMsgQueue : ', error)
                //         })
                //     }
                //   }
                // }
                })
            })
          }
        } else {
          this.$swal('ผิดพลาด', 'รายการนี้ได้เปลี่ยนสถานะไปแล้ว', 'info')
          await this.searchBooking()
        }
      }
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
    async updateEmp (bookNo) {
      var dtt = {
        storeFrontQueueEmpId: parseInt(this.session.data.empId)
      }
      await axios
        .post(this.DNS_IP + '/Booking/edit/' + bookNo, dtt)
        .then(async responses => {})
    },
    async checkBookingStatus (bookNo) {
      let result = ''
      await axios
        .get(this.DNS_IP + '/booking_view/get?shopId=' +
            this.shopId +
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
    }
  }
}
</script>
<style scope>
.btnTobicon .v-btn__content {
    display:flex;
    flex-direction:column;
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
</style>
