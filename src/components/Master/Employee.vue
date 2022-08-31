<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="4" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <v-col cols="8" class="v-margit_button text-right">
            <v-btn color="primary" depressed @click="dialogAdd = true, validate('ADD')">
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่มรายชื่อพนักงาน
            </v-btn>
            <v-btn color="primary" @click="exportData()">
              <v-icon left>mdi-download</v-icon>
              Export Data
            </v-btn>
            <v-btn color="primary" depressed @click="dialogImport = true">
              <v-icon left>mdi-import</v-icon>
              Manage Data By Excel.xls
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- Dialog export / import -->
          <!-- Import -->
          <v-dialog v-model="dialogImport" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">จัดการไฟล์ผ่าน excel.xls</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <input type="file" @change="importData" accept=".xls" />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <template>
                        <v-data-table
                          :headers="columnsImport"
                          :items="dataItemImport"
                          :items-per-page="5"
                          class="elevation-1"
                        ></v-data-table>
                      </template>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  color="red darken-1"
                  text
                  @click="(dialogImport = false), (dataItemImport = [])"
                >
                  ปิด
                </v-btn>
                <template v-if="!dataItemImportChecKHide">
                  <!-- <v-btn
                    elevation="2"
                    color="red"
                    text
                    @click="importDataApprove('delete')"
                  >
                    ล้างข้อมูลทั้งหมดที่เลือก
                  </v-btn>
                  <v-btn
                    elevation="2"
                    color="blue darken-1"
                    text
                    @click="importDataApprove('update')"
                  >
                    ปรับปรุงข้อมูลที่ตรงกัน
                  </v-btn> -->
                  <v-btn
                    elevation="2"
                    color="green darken-1"
                    text
                    @click="importDataApprove('add')"
                  >
                    นำเข้าข้อมูล
                  </v-btn>
                </template>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end Import -->

          <!-- ADD -->
          <v-dialog v-model="dialogAdd" persistent max-width="35%">
            <v-card class="pa-1">
              <v-container>
                      <div style="text-align: end;" >
                        <v-btn
                          fab
                          small
                          dark
                          color="#F3F3F3"
                          @click="dialogAdd = false,clearData()"
                        >
                          <v-icon dark
                          color="#FE4A01 ">
                            mdi-close
                          </v-icon>
                        </v-btn>
                    </div>
              </v-container>
               <v-col class="text-left pa-0 pl-5 mb-n2" >
                <!-- <v-img
                  id="v_text_edits"
                  :src="require('@/assets/GroupEditTitle.svg')"
                ></v-img> -->
                <h2 class="font-weight-bold" style="color:#173053;">เพิ่มข้อมูล</h2>
              </v-col>
              <v-card-text class="pa-0 px-2">
                <v-container>
                   <v-form
                    ref="form_add"
                    v-model="valid_add"
                    lazy-validation
                  >
                  <v-row justify="center">
                    <v-col cols="12" class="text-center">
                      <v-img
                        aspect-ratio="6"
                        contain
                        :src="formAdd.pictureUrlPreview"
                      ></v-img>
                      <!-- <v-avatar size="100px"><img alt="Avatar" :src="formAdd.pictureUrl"></v-avatar> -->
                      <br />
                      <v-file-input
                        required
                        counter
                        show-size
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        label="รูปพนักงาน (ถ้ามี)"
                        @change="selectImgAdd"
                        v-model="filesAdd"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="12" class="pa-0">
                      <v-select
                      dense
                      outlined
                        label="คำนำหน้า*"
                        :items="itemsTitle"
                        v-model="formAdd.empTitle_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-text-field
                      dense
                      outlined
                        label="ชื่อ*"
                        v-model="formAdd.empFirst_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-text-field
                      dense
                      outlined
                        label="นามสกุล*"
                        v-model="formAdd.empLast_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <v-select
                        dense
                        outlined
                        v-model="formAdd.privacyPage"
                        :items="privacyPageSelect"
                        menu-props="auto"
                        :rules="nameRules"
                        label="เลือกหน้าที่จะแสดง"
                        prepend-icon="mdi-map"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-select
                        v-if="formAdd.privacyPage === 'bookingform'"
                        dense
                        outlined
                        v-model="formAdd.masBranchID"
                        :item-text="branch.text"
                        :items="branch"
                        :rules="nameRules"
                        label="สาขา"
                      ></v-select>
                    </v-col>
                  </v-row>
                   </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  block
                  dark
                  color="#173053"
                  :disabled="!valid_add"
                  @click="addData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- edit -->
          <v-dialog v-model="dialogEdit" persistent max-width="35%">
            <v-card class="pa-1">
              <v-container>
                      <div style="text-align: end;" >
                        <v-btn
                          fab
                          small
                          dark
                          color="#F3F3F3"
                          @click="dialogEdit = false, dataReady = true"
                        >
                          <v-icon dark
                          color="#FE4A01 ">
                            mdi-close
                          </v-icon>
                        </v-btn>
                    </div>
              </v-container>
               <v-col class="text-left pa-0 pl-5 mb-n2" >
                <!-- <v-img
                  id="v_text_edits"
                  :src="require('@/assets/GroupEditTitle.svg')"
                ></v-img> -->
                <h2 class="font-weight-bold" style="color:#173053;">แก้ไขข้อมูล</h2>
              </v-col>
              <v-card-text class="pa-0 px-2">
                <v-container>
                   <v-form
                    ref="form_update"
                    v-model="valid_update"
                    lazy-validation
                  >
                  <v-row justify="center">
                    <v-col cols="12" class="text-center">
                      <v-img
                        aspect-ratio="6"
                        contain
                        :src="formUpdate.pictureUrlPreview"
                      ></v-img>
                      <!-- <v-avatar size="100px"><img alt="Avatar" :src="formAdd.pictureUrl"></v-avatar> -->
                      <br />
                      <v-file-input
                        required
                        counter
                        show-size
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        label="รูปพนักงาน (ถ้ามี)"
                        @change="selectImgUpdate"
                        v-model="filesUpdate"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="12" class="pa-0">
                      <v-select
                      dense
                      outlined
                        label="คำนำหน้า*"
                        :items="itemsTitle"
                        v-model="formUpdate.empTitle_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-text-field
                      dense
                      outlined
                        label="ชื่อ*"
                        v-model="formUpdate.empFirst_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="pa-0">
                      <v-text-field
                      dense
                      outlined
                        label="นามสกุล*"
                        v-model="formUpdate.empLast_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" class="pa-0">
                      <v-select
                      dense
                      outlined
                        v-model="formUpdate.privacyPage"
                        :items="privacyPageSelect"
                        menu-props="auto"
                        :rules="nameRules"
                        label="เลือกหน้าที่จะแสดง"
                        prepend-icon="mdi-map"
                      ></v-select>
                    </v-col>
                      <v-col cols="12" class="pa-0">
                      <v-select
                        v-if="formUpdate.privacyPage === 'bookingform'"
                        dense
                        outlined
                        v-model="formUpdate.masBranchID"
                        :item-text="branch.text"
                        :items="branch"
                        :rules="nameRules"
                        label="สาขา"
                      ></v-select>
                    </v-col>
                  </v-row>
                   </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  block
                  dark
                  color="#173053"
                  :disabled="!valid_update"
                  @click="editData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  บันทึก
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end edit -->

          <!-- delete -->
          <v-dialog v-model="dialogDelete" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">ลบข้อมูลนี้</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                      <v-col cols="4">
                      <v-select
                        label="คำนำหน้า*"
                        :items="itemsTitle"
                        v-model="formUpdate.empTitle_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="ชื่อ*"
                        v-model="formUpdate.empFirst_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        label="นามสกุล*"
                        v-model="formUpdate.empLast_NameTH"
                        :rules="nameRules"
                        :counter="50"
                        maxlength="50"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  x-large
                  color="dark darken-1"
                  text
                  @click="dialogDelete = false, dataReady = true"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
                  color="red darken-1"
                  text
                  @click="deleteData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end delete -->
        <!-- dialog limitbookint -->
        <v-dialog v-model="dialoglimitbooking" max-width="45%" persistent >
          <v-card min-width="400px" min-height="500px" class="pa-1 " color="#F4F4F4">
            <!-- <v-card-title>asdasdasdas</v-card-title> -->
            <v-container>
            <div style="display: flex;justify-content: space-between;" class="ml-5">
              <h2 class="font-weight-bold" style="color:#173053;">ตั้งค่าเวลา</h2>
            <v-btn
              fab
              small
              dark
              color="#F3F3F3"
              @click="dialoglimitbooking = false, clearLimit()"
            >
              <v-icon dark
              color="#FE4A01 ">
                mdi-close
              </v-icon>
            </v-btn>
            </div>
            </v-container>
              <v-card-text>
                <v-container>
                  <v-form
                     ref="form_update"
                    v-model="valid_update"
                    lazy-validation
                  >
                  <v-row style="justify-content: space-between;">
      <v-col cols="12">
      <v-card class="pa-3 mb-5" min-height="675px">
        <h4 class="font-weight-bold mt-2">จัดการเวลานัดหมาย</h4>
          <v-row align="center" class="ma-0">
              <v-checkbox
                @click="chekshowTime()"
                false-value="False"
                true-value="True"
                :on-icon="'mdi-check-circle'"
                :off-icon="'mdi-checkbox-blank-circle-outline'"
                label="ต้องการใช้งานการจำกัดคิวนัดหมาย"
                v-model="formUpdateLimitbooking.limitBookingCheck"
                hide-details
                class="shrink ml-6 mr-0 mt-0 mb-2"
              ></v-checkbox>
            </v-row>

        <div class="text-center px-5 mb-5">
          <v-sheet class="pa-0">
          <v-row class="mt-3">
            <v-col cols="6"  class="pt-0" style="text-align: start;">
            <v-btn
            small
            class="mb-n3"
                color="teal"
                dark
                @click="presetTime()"
              >
                <v-icon class="mr-2" small dark> mdi-clock-time-eight</v-icon>เพิ่มเวลาอัตโนมัติ
              </v-btn>
          </v-col>
          <v-col cols="6" class="pt-0" style="text-align: end;">
             <v-btn
             small
             class="mb-n3"
              style="text-align: end;"
                color="#173053"
                dark
                @click="addNewNew">
                <v-icon class="mr-2" small dark>mdi-plus-box</v-icon>เพิ่มเวลานัดหมาย
              </v-btn>
          </v-col>
          <v-col cols="12" class="mb-0"  style="text-align: center;">
          <v-data-table
          disable-pagination
          hide-default-footer
          :headers="columnsAddTime"
          :items="dataItemAddTime"
          :search="search"
          disable-sort
          class="elevation-1"
          min-height="300px">
          <!-- <template v-slot:top>
            <v-toolbar color="white"> -->
              <!-- <div class="text-left">
              <v-btn
                  color="teal"
                  elevation="2"
                  rounded
                  small
                  dark
                  @click="presetTime()"
                >
                  แบบร่าง เวลา
                </v-btn>
              </div>
              <div class="text-right">

                <v-btn
                  small
                  color="primary"
                  class="ml-2 white--text"
                  @click="addNewNew">
                  <v-icon dark>mdi-plus</v-icon>เพิ่มเวลานัดหมาย
                </v-btn>
              </div> -->
            <!-- </v-toolbar>
          </template> -->
          <template v-slot:[`item.text`]="{ item }">
            <v-text-field class="pa-0 ma-0" filled v-model="editedItemNew.text" :counter="50" maxlength="50" :hide-details="true" dense single-line :autofocus="true" v-if="item.id === editedItemNew.id"></v-text-field>
            <span v-else>{{item.text}}</span>
          </template>
          <template v-slot:[`item.value`]="{ item }">
            <v-text-field class="pa-0 ma-0" placeholder="HH:mm" filled v-model="editedItemNew.value" v-mask="'##:##'" :hide-details="true" dense single-line v-if="item.id === editedItemNew.id" ></v-text-field>
            <span v-else>{{item.value}}</span>
          </template>
          <template v-slot:[`item.limitBooking`]="{ item }">
            <div v-if="item.id === editedItemNew.id" >
              <v-text-field class="pa-0 ma-0" filled v-model="editedItemNew.limitBooking" :hide-details="true" dense single-line v-if="formUpdateLimitbooking.limitBookingCheck === 'True'" ></v-text-field>
              <v-text-field class="pa-0 ma-0" filled v-model="editedItemNew.limitBooking" :hide-details="true" disabled dense single-line v-else></v-text-field>
            </div>
            <span v-else>{{item.limitBooking}}</span>
          </template>
          <template v-slot:[`item.actions2`]="{ item }">
            <div class="pa-0 ma-0" v-if="item.id === editedItemNew.id">
              <v-icon color="red" class="mr-3" @click="closeNew">
                mdi-window-close
              </v-icon>
              <v-icon color="green"  @click="saveNew">
                mdi-content-save
              </v-icon>
            </div>
            <div v-else>
              <v-icon color="green" class="mr-3" @click="editItemNew(item)">
                mdi-pencil
              </v-icon>
              <v-icon color="red" @click="deleteItemNew(item)">
                mdi-delete
              </v-icon>
            </div>
          </template>
        </v-data-table>
          </v-col>
          </v-row>
            </v-sheet>
          </div>
    </v-card>
                    </v-col>
                  </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
                <div class="text-center">
                  <v-btn
                  width="100%"
                  class="ma-0 mb-2"
                  elevation="2"
                  large
                  dark
                  color="#173053"
                  :disabled="!valid_update"
                  @click="EditlimitBooking()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  บันทึก
                </v-btn>
                </div>
          </v-card>
        </v-dialog>
          <!-- data table -->
          <v-col cols="12">
            <v-card elevation="7" v-if="dataReady">
                <v-card-title>
                <v-text-field
                  v-model="searchAll2"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="columns"
                  :items="dataItem"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                   <template v-slot:[`item.privacyPage`]="{ item }">
                     <p v-if="item.privacyPage === 'booking'">หน้านัดหมาย</p>
                     <p v-if="item.privacyPage === 'board'">หน้ากระดานการทำงาน</p>
                     <p v-if="item.privacyPage === 'bookingform'">หน้ากระดานการทำงาน</p>
                     <p v-if="item.privacyPage === 'all'">ทั้งหมด</p>
                   </template>
                   <template v-slot:[`item.CREATE_DATE`]="{ item }">
                      {{ format_date(item.CREATE_DATE) }}
                  </template>
                   <template v-slot:[`item.LAST_DATE`]="{ item }">
                      {{ format_date(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      v-if="item.privacyPage === 'bookingform'"
                      color="purple"
                      fab
                      small
                      @click="
                          (dialoglimitbooking = true),getlimitbooking(item)
                      "
                    >
                      <v-icon color="#FFFFFF"> mdi-calendar-clock </v-icon>
                    </v-btn>
                    <v-btn
                      color="blue"
                      fab
                      small
                      dark
                      @click.stop="(dialogEdit = true), getDataById(item), validate('UPDATE')"
                    >
                      <v-icon> mdi-tools </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      fab
                      small
                      @click.stop="(dialogDelete = true), getDataById(item)"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
            <div v-if="!dataReady" class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </v-col>
          <!-- end data table -->
        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
import XLSX from 'xlsx' // import xlsx
import readXlsxFile from 'read-excel-file'
// import moment from 'moment' // แปลง date

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    downloadExcel: JsonExcel,
    XLSX,
    readXlsxFile
  },
  created () {
    setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      PK: '',
      path: '/empSelect/', // Path Model
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'รายชื่อพนักงาน',
          disabled: true,
          href: '/Master/Employee'
        }
      ],
      // End Menu Config
      itemsTitle: ['นาย', 'นาง', 'นางสาว', 'คุณ'],
      dataReady: true,
      dateTime: '', // Generate DateTime
      date: this.momenDate_1(new Date()),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      code: 'EMP_', // Generate Code
      valid_add: true,
      valid_update: true,
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogImport: false,
      dialoglimitbooking: false,
      // END Dialog Config ADD EDIT DELETE
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      // Search All
      searchAll2: '',
      formAdd: {
        empCode: '',
        empTitle_NameTH: '',
        empFirst_NameTH: '',
        empLast_NameTH: '',
        privacyPage: '',
        empImge: '',
        pictureUrlPreview: '',
        shopId: this.$session.getAll().data.shopId,
        setTime: [],
        masBranchID: ''
      },
      formUpdate: {
        empCode: '',
        empTitle_NameTH: '',
        empFirst_NameTH: '',
        empLast_NameTH: '',
        empImge: '',
        pictureUrlPreview: '',
        privacyPage: '',
        setTime: [],
        masBranchID: ''
      },
      formUpdateItem: {
        empCode: '',
        empTitle_NameTH: '',
        empFirst_NameTH: '',
        empLast_NameTH: '',
        privacyPage: '',
        empImge: '',
        setTime: [],
        masBranchID: ''
      },
      formUpdateLimitbooking: {
        empId: null,
        time: '',
        setTime: '',
        limitBooking: 0,
        limitBookingCheck: 'Fales',
        shopId: this.$session.getAll().data.shopId
      },
      privacyPageSelect: [
        { text: 'หน้านัดหมาย', value: 'booking' },
        { text: 'หน้ากระดานการทำงาน', value: 'board' },
        { text: 'หน้านัดหมายของลูกค้า', value: 'bookingform' },
        { text: 'ทั้งหมด', value: 'all' }
      ],
      nameRules: [
        (v) => !!v || 'กรุณากรอกข้อมูล '
      ],
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        // { text: 'id', value: 'empId', align: 'center' },
        { text: 'ชื่อ-นามสกุล', value: 'empFull_NameTH', align: 'center' },
        { text: 'แสดงชื่อ', value: 'privacyPage', align: 'center' },
        // { text: 'แผนก', value: 'positionName', align: 'center' },
        // { text: 'สาขา', value: 'masBranchName', align: 'center' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      // End Data Table Config
      // Config Import
      columnsImport: [
        { text: 'empCode', value: 'empCode' },
        { text: 'empTitle_NameTH', value: 'empTitle_NameTH' },
        { text: 'empFirst_NameTH', value: 'empFirst_NameTH' },
        { text: 'empLast_NameTH', value: 'empLast_NameTH' },
        { text: 'privacyPage', value: 'privacyPage' }
      ],
      dataItemImportChecKHide: true,
      dataItemImport: [],
      // End Config Import
      json_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8'
          }
        ]
      ],
      filesUpdate: null,
      filesAdd: null,
      dataItemAddTime: [],
      columnsAddTime: [
        { text: 'แสดงเวลา', value: 'text' },
        { text: 'เวลา', value: 'value' },
        { text: 'จำนวนนัดหมาย', value: 'limitBooking', align: 'center', width: '200px' },
        // { text: 'เรียงตำแหน่ง', value: 'actions1', align: 'center' },
        { text: 'จัดการเวลา', value: 'actions2', align: 'center', width: '100px' }
      ],
      search: '',
      editedIndexNew: -1,
      editedItemNew: {
        id: 0,
        text: '',
        value: '',
        limitBooking: 0
      },
      defaultItemNew: {
        id: 0,
        text: '',
        value: '',
        limitBooking: 0
      },
      BookingFieldshowtime: null,
      branch: []
      // End Export Config
    }
  },
  async mounted () {
    await this.getDataBranch()
    await this.getBookingField()
    // this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
  },
  methods: {
    editItemNew (item) {
      console.log('item', item)
      console.log('this.dataItemAddTime', this.dataItemAddTime)
      this.editedIndexNew = this.dataItemAddTime.indexOf(item)
      this.editedItemNew = Object.assign({}, item)
    },

    deleteItemNew  (item) {
      const index = this.dataItemAddTime.indexOf(item)
      this.dataItemAddTime.splice(index, 1)
    },

    closeNew  () {
      setTimeout(() => {
        this.editedItemNew = Object.assign({}, this.defaultItemNew)
        this.editedIndexNew = -1
      }, 300)
    },
    addNewNew  () {
      const addObj = Object.assign({}, this.defaultItemNew)
      addObj.id = this.dataItemAddTime.length + 1
      this.dataItemAddTime.unshift(addObj)
      this.editItemNew(addObj)
    },
    saveNew  () {
      if (this.editedIndexNew > -1) {
        Object.assign(this.dataItemAddTime[this.editedIndexNew], this.editedItemNew)
      }
      this.dataItemAddTime.sort(function (a, b) {
        return a.value.localeCompare(b.value)
      })
      this.closeNew()
    },
    presetTime () {
      this.dataItemAddTime = [{'id': 1, 'value': '08:00', 'text': '08:00', 'limitBooking': ''}, {'id': 2, 'value': '08:30', 'text': '08:30', 'limitBooking': ''}, {'id': 3, 'value': '09:00', 'text': '09:00', 'limitBooking': ''}, {'id': 4, 'value': '09:30', 'text': '09:30', 'limitBooking': ''}, {'id': 5, 'value': '10:00', 'text': '10:00', 'limitBooking': ''}, {'id': 6, 'value': '10:30', 'text': '10:30', 'limitBooking': ''}, {'id': 7, 'value': '11:00', 'text': '11:00', 'limitBooking': ''}, {'id': 8, 'value': '11:30', 'text': '11:30', 'limitBooking': ''}, {'id': 9, 'value': '12:00', 'text': '12:00', 'limitBooking': ''}, {'id': 10, 'value': '12:30', 'text': '12:30', 'limitBooking': ''}, {'id': 11, 'value': '13:00', 'text': '13:00', 'limitBooking': ''}, {'id': 12, 'value': '13:30', 'text': '13:30', 'limitBooking': ''}, {'id': 13, 'value': '14:00', 'text': '14:00', 'limitBooking': ''}, {'id': 14, 'value': '14:30', 'text': '14:30', 'limitBooking': ''}, {'id': 15, 'value': '15:00', 'text': '15:00', 'limitBooking': ''}, {'id': 16, 'value': '15:30', 'text': '15:30', 'limitBooking': ''}, {'id': 17, 'value': '16:00', 'text': '16:00', 'limitBooking': ''}, {'id': 18, 'value': '16:30', 'text': '16:30', 'limitBooking': ''}, {'id': 19, 'value': '17:00', 'text': '17:00', 'limitBooking': ''}]
    },
    async getDataBranch () {
      this.branch = []
      this.branchData = []
      await axios.get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId).then(response => {
        let rs = response.data
        console.log('rs', rs)
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.text = d.masBranchName
            s.value = d.masBranchID
            this.branch.push(s)
            // console.log('dtdtdtdt', this.branch)
          }
        }
      })
      // console.log('branchData', this.branchData)
    },
    async getlimitbooking (item) {
      this.formUpdateLimitbooking.empId = item.empId
      // console.log('this.formUpdateLimitbooking.empId', this.formUpdateLimitbooking.empId)
      let dt = []
      await axios
        .get(this.DNS_IP + '/empSelect/get?empId=' + item.empId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            dt = rs
            console.log('rs', rs)
            this.formUpdateLimitbooking.limitBookingCheck = rs[0].limitBookingCheck || 'Fales'
            if (rs[0].setTime === null || rs[0].setTime === '') {
              this.dataItemAddTime = []
            } else {
              let setTime = JSON.parse(rs[0].setTime)
              setTime.map((v, k) => { v.id = k + 1 })
              console.log('settime222222222', setTime)
              if (setTime[0].limitBooking === undefined) {
                // console.log('dasdas')
                for (let i = 0; i < setTime.length; i++) {
                  let d = setTime[i]
                  d.limitBooking = ''
                  this.dataItemAddTime.push(d)
                }
              } else {
                this.dataItemAddTime = setTime
              }
            }
            console.log('testgetgetlimitbooking', this.formUpdateLimitbooking)
          }
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
      console.log('dt', dt)
      await this.chekshowTime('open', dt[0])
    },
    EditlimitBooking () {
      if (this.dataItemAddTime.filter(el => { return el.value === '' }).length === 0) {
        if (this.formUpdateLimitbooking.limitBookingCheck === 'True') {
          if (this.dataItemAddTime.filter(el => { return el.limitBooking === '' }).length === 0) {
            this.EditlimitBookingSubmit()
          } else {
            this.$swal('ผิดพลาด', 'กรุณาเลือก ใส่จำนวน Limit Booking ให้ครบ เนื่องจาก เปิดใช้งาน Limit การจอง', 'error')
          }
        } else {
          this.EditlimitBookingSubmit()
        }
      } else {
        this.$swal('ผิดพลาด', 'กรุณาเลือก กรอกเวลาให้ครบ', 'error')
      }
    },
    async EditlimitBookingSubmit () {
      console.log('Editdata', this.formUpdateLimitbooking)
      console.log('dataitem', this.dataItemAddTime)
      let Dataitem = {
        'limitBookingCheck': this.formUpdateLimitbooking.limitBookingCheck,
        'setTime': JSON.stringify(this.dataItemAddTime)
      }
      console.log('Dataitem', Dataitem)
      this.$swal({
        title: 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          await axios
            .post(this.DNS_IP + '/empSelect/edit/' + this.formUpdateLimitbooking.empId, Dataitem)
            .then(async (response) => {
              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              this.dialoglimitbooking = false
              await this.clearLimit()
            })
            .catch(error => {
              console.log('error function addData : ', error)
            })
        })
    },
    async getBookingField () {
      await axios
        .get(this.DNS_IP + '/BookingField/get?shopId=' + this.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.BookingFieldshowtime = rs[0].showTime
            console.log('this.BookingFieldshowtime', this.BookingFieldshowtime)
          }
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    chekshowTime (open, item) {
      if (open) {
        if (this.BookingFieldshowtime === 'แสดง') {
        } else {
          console.log('this.formUpdate.limitBookingCheck', this.formUpdateLimitbooking.limitBookingCheck)
          if (item.limitBookingCheck === 'True') {
            this.$swal('ปิด LimitBooking ', 'กรุณาเปิดการแสดงเวลานัดหมายเพื่อเปิด LimitBooking', 'error').then(() => {
              this.formUpdateLimitbooking.limitBookingCheck = 'False'
            })
          } else {
            console.log('else')
            this.formUpdateLimitbooking.limitBookingCheck = 'False'
          }
        }
      } else {
        if (this.BookingFieldshowtime === 'แสดง') {
        } else {
          this.$swal('ร้านของคุณไม่สามารถเปิด LimitBooking ได้', 'กรุณาเปิดการแสดงเวลานัดหมาย', 'error').then(() => {
            this.formUpdateLimitbooking.limitBookingCheck = 'False'
          })
        }
      }
    },
    async clearLimit () {
      this.timeText = ''
      this.formUpdateLimitbooking.setTime = ''
      this.formUpdateLimitbooking.limitBookingCheck = ''
      this.formUpdateLimitbooking.limitBooking = ''
      this.formUpdateLimitbooking.flowId = []
      this.typeTimeAdd = 'add'
      this.indexTimeAdd = 0
    },
    selectImgAdd () {
      if (this.filesAdd) {
        this.formAdd.pictureUrlPreview = URL.createObjectURL(
          this.filesAdd
        )
      } else {
        this.formAdd.pictureUrlPreview = ''
      }
      // console.log(event)
    },
    selectImgUpdate () {
      if (this.filesUpdate) {
        this.formUpdate.pictureUrlPreview = URL.createObjectURL(
          this.filesUpdate
        )
      } else {
        this.formUpdate.pictureUrlPreview = ''
      }
      // console.log(event)
    },
    validate (Action) {
      switch (Action) {
        case 'ADD':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_add.validate()
          })
          break
        case 'UPDATE':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_update.validate()
          })
          break

        default:
          break
      }
    },
    async getDataById (item) {
      //
      //
      // สำหรับ เรียกข้อมูล ใส่ form Update / Delete
      //
      //
      // Get ID /main.js
      this.dataReady = false
      this.PK = item.empId
      // this.getDataByIdGlobal(this.DNS_IP, this.path, 'empId', item.empId)
      Object.assign(this.formUpdate, item)
      if (item.empImge !== null) {
        this.formUpdate.pictureUrlPreview = item.empImge
      }
      if (item.setTime === null || []) {
        this.dataItemAddTime = []
      } else {
        this.dataItemAddTime = JSON.parse(item.setTime)
      }
      // delete this.formUpdate[FIELD_PK_NAME]
      delete this.formUpdate['LAST_DATE']
      delete this.formUpdate['CREATE_DATE']
      delete this.formUpdate['RECORD_STATUS']
      console.log('this.formUpdate', this.formUpdate)
    },
    async addData () {
      //
      //
      // สำหรับ เพิ่มข้อมูล
      // ต้องระบุ Create / Last User ว่าใครเป็นคนสร้าง
      //
      this.formAdd.CREATE_USER = this.$session.getAll().data.userName
      this.formAdd.LAST_USER = this.$session.getAll().data.userName
      this.formAdd.shopId = this.$session.getAll().data.shopId

      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      //
      // กำหนด Code ของรายการ * อย่าลืมเปลี่ยน field
      //
      this.formAdd.empCode = this.code + this.generateCodeGlobal()
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

      console.log('form', JSON.stringify(this.formAdd))

      this.dataReady = false
      this.submitAdd(this.DNS_IP, this.path, this.formAdd)
    },
    async submitAdd (DNS_IP, PATH, ID, DT) {
      this.dataReady = false

      this.$swal({
        title: 'ต้องการ เพิ่มข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          if (this.filesAdd) {
            const _this = this
            let params = new FormData()
            params.append('file', this.filesAdd)
            await axios
              .post(this.DNS_IP + `/file/upload/employee`, params)
              .then(function (response) {
                _this.formAdd.empImge = response.data
                console.log('url Pic', response.data)
              })
          } else {
            this.formAdd.empImge = ''
          }
          delete this.formAdd['pictureUrlPreview']
          await axios
            .post(
              // eslint-disable-next-line quotes
              DNS_IP + PATH + "add",
              this.formAdd,
              {
                headers: {
                  'Application-Key': this.$session.getAll().ApplicationKey
                }
              }
            )
            .then(async (response) => {
              // Debug response
              console.log('addDataGlobal DNS_IP + PATH + "add"', response)

              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogAdd = false

              // Load Data
              await this.clearData()
              await this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
            })
          // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              console.log('error function addDataGlobal : ', error)
              this.dataReady = true
            })
        })
        .catch((error) => {
          console.log('error function addData : ', error)
          this.dataReady = true
        })
    },
    async editData () {
      // Config User ทำรายการล่าสุด
      this.formUpdateItem.LAST_USER = this.$session.getAll().data.userName
      // End Config User ทำรายการล่าสุด

      for (var key in this.formUpdateItem) {
        for (var key2 in this.formUpdate) {
          if (key === key2) {
            this.formUpdateItem[key] = this.formUpdate[key2]
          }
        }
      }
      // console.log('this.formUpdateItem', this.formUpdateItem)

      // Debug
      console.log('EDIT PK : ', this.PK)
      console.log('formUpdateItem', JSON.stringify(this.formUpdateItem))
      // End Debug
      // สำหรับ แก้ไขข้อมูล
      // ต้องระบุ  Last User ว่าใครเป็นคนแก้ไขล่าสุด
      //
      // this.dataReady = false
      // this.editDataGlobal(this.DNS_IP, this.path, this.PK, this.formUpdateItem)
      this.dataReady = false
      this.submitEdit(this.DNS_IP, this.path)
    },
    async submitEdit (DNS_IP, PATH) {
      // this.editDataGlobal(this.DNS_IP, this.path, this.PK, this.formUpdateItem)
      this.dataReady = false

      this.$swal({
        title: 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          if (this.filesUpdate) {
            const _this = this
            let params = new FormData()
            params.append('file', this.filesUpdate)
            await axios
              .post(this.DNS_IP + `/file/upload/employee`, params)
              .then(function (response) {
                _this.formUpdateItem.empImge = response.data
                console.log('url Pic', response.data)
              })
          } else {
            this.formUpdateItem.empImge = this.formUpdate.pictureUrlPreview
          }
          await axios
            .post(
              // eslint-disable-next-line quotes
              DNS_IP + PATH + "edit/" + this.PK,
              this.formUpdateItem
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)

              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogEdit = false
              this.filesUpdate = ''
              // Load Data
              await this.getDataGlobal(DNS_IP, PATH, this.$session.getAll().data.shopId)
            })
            // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              this.dataReady = true
              console.log('error function editDataGlobal : ', error)
            })
        })
        .catch((error) => {
          this.dataReady = true
          console.log('error function editDataGlobal : ', error)
        })
    },
    async deleteData () {
      console.log('DELETE PK : ', this.PK)
      //
      //
      // สำหรับ ลบข้อมูล
      // ต้องระบุ  Last User ว่าใครเป็นคนลบล่าสุด
      //
      this.formUpdate.LAST_USER = this.$session.getAll().data.userName
      this.dataReady = false
      this.deleteDataGlobal(this.DNS_IP, this.path, this.PK, this.$session.getAll().data.shopId)
    },
    // * Option Import Excel
    // * ตั้งค่าจาก Data
    importData (event) {
      var input = event.target
      var reader = new FileReader()
      reader.onload = () => {
        var fileData = reader.result
        var wb = XLSX.read(fileData, { type: 'binary' })
        wb.SheetNames.forEach((sheetName) => {
          var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
          console.log(rowObj)
          this.dataItemImport = rowObj
        })
        if (this.dataItemImport.length === 0) {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง')
        } else {
          this.dataItemImportChecKHide = false
        }
      }

      reader.readAsBinaryString(input.files[0])
    },
    importDataApprove (action) {
      console.log('Action', action)
      var titleMsg = ''
      if (action === 'add') {
        titleMsg = 'ท่านต้องการ นำเข้าข้อมูลจากไฟล์นี้ ใช่หรือไม่'
      } else if (action === 'delete') {
        titleMsg = 'ท่านต้องการ ลบข้อมูลจากไฟล์นี้ ใช่หรือไม่'
      } else {
        titleMsg = 'ท่านต้องการ ปรับปรุงข้อมูลจากไฟล์นี้ ใช่หรือไม่'
      }

      this.$swal({
        title: titleMsg,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          console.log('this.dataItemImport', this.dataItemImport)
          let dataItem = []
          for (var i = 0; i < this.dataItemImport.length; i++) {
            var d = this.dataItemImport[i]
            if (d.empCode !== '') {
              d.shopId = this.$session.getAll().data.shopId
              d.userName = this.$session.getAll().data.userName
              dataItem.push(d)
            }
          }
          if (dataItem.length > 0) {
            await axios
              .post(
              // eslint-disable-next-line quotes
                this.DNS_IP + this.path + "addImport",
                dataItem
              )
              .then(async (response) => {
                this.dialogImport = false
                // Debug response
                this.$swal('เรียบร้อย', 'นำเข้าข้อมูล เรียบร้อย', 'success')
                await this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
                console.log('/empSelect/addImport/', response)
              })
            // eslint-disable-next-line handle-callback-err
              .catch((error) => {
                alert('โปรดใส่ไฟล์ให้ถูกต้อง')
                console.log('error function importDataAdd addData : ', error)
                this.dataReady = true
              })
          } else {
            this.$swal('ผิดพลาด', 'กรุณาเซ็คข้อมูลให้ครบ', 'error')
          }
        })
        .catch((error) => {
          console.log('error function importDataApprove : ', error)
          this.dataReady = true
        })
    },
    async importDataAdd (dt) {
      Object.assign(this.formAdd, dt)
      this.formAdd.CREATE_USER = this.$session.getAll().data.userName
      this.formAdd.LAST_USER = this.$session.getAll().data.userName

      delete this.formAdd['empId']
      delete this.formAdd['LAST_DATE']
      delete this.formAdd['CREATE_DATE']
      delete this.formAdd['RECORD_STATUS']
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + this.path + "add",
          this.formAdd
        )
        .then(async (response) => {
          this.dialogImport = false
          // Debug response

          console.log('/empSelect/add/', response)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง', dt)
          console.log('error function importDataAdd addData : ', error)
          this.dataReady = true
        })
    },
    async importDataUpdate (dt) {
      Object.assign(this.formUpdate, dt)
      delete this.formUpdate['empId']
      delete this.formUpdate['LAST_DATE']
      delete this.formUpdate['CREATE_DATE']
      delete this.formUpdate['RECORD_STATUS']
      this.formUpdate.LAST_USER = this.$session.getAll().data.userName

      for (var key in this.formUpdateItem) {
        for (var key2 in this.formUpdate) {
          if (key === key2) {
            this.formUpdateItem[key] = this.formUpdate[key2]
          }
        }
      }

      // Debug
      console.log('EDIT PK : ', this.PK)
      console.log('formUpdateItem', JSON.stringify(this.formUpdateItem))

      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/empSelect/" + "edit/" + dt.empId,
          this.formUpdateItem
        )
        .then(async (response) => {
          this.dialogImport = false
          // Debug response
          console.log('/empSelect/edit/', response)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง', dt)
          console.log('error function importDataUpdate : ', error)
        })
    },
    async importDataDelete (dt) {
      this.formUpdate.LAST_USER = this.$session.getAll().data.userName
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/empSelect/" + "delete/" + dt.empId,
          this.formUpdate,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async (response) => {
          this.dialogImport = false
          // Debug response
          console.log('/empSelect/delete/', response)
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          alert('โปรดใส่ไฟล์ให้ถูกต้อง', dt)
          console.log('error function importDataDelete : ', error)
        })
    },
    exportData () {
      this.dataItem = []
      axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + '/empSelect/' + "get?shopId=" + this.shopId
        )
        .then(async (response) => {
          this.dataItem = response.data
          var tem = []
          response.data.forEach(element => {
            var s = {}
            console.log(element)
            s.empCode = element.empCode
            s.empTitle_NameTH = element.empTitle_NameTH
            s.empFirst_NameTH = element.empFirst_NameTH
            s.empLast_NameTH = element.empLast_NameTH
            s.privacyPage = element.privacyPage
            tem.push(s)
            // tem.push({'empCode': element.empCode,
            //   'คำนำหน้า': element.empTitle_NameTH,
            //   'ชื่อ': element.empFirst_NameTH,
            //   'นามสกุล': element.empLast_NameTH,
            //   'แสดงชื่อที่หน้าไหน': element.privacyPage
            // })
          })
          console.log(tem)
          var info = XLSX.utils.json_to_sheet(tem)
          var wb = XLSX.utils.book_new() // make Workbook of Excel
          XLSX.utils.book_append_sheet(wb, info, 'worksheet') // sheetAName is name of Worksheet
          XLSX.writeFile(wb, 'Employee.xls') // name of the file is 'book.xlsx'
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log(error)
        })
    },
    async clearData () {
      this.formAdd.empCode = ''
      this.formAdd.empTitle_NameTH = ''
      this.formAdd.empFirst_NameTH = ''
      this.formAdd.empLast_NameTH = ''
      this.formAdd.privacyPage = ''
      this.formAdd.empImge = ''
      this.formAdd.pictureUrlPreview = ''
      this.formAdd.shopId = this.$session.getAll().data.shopId
      this.formUpdate.empCode = ''
      this.formUpdate.empTitle_NameTH = ''
      this.formUpdate.empFirst_NameTH = ''
      this.formUpdate.empLast_NameTH = ''
      this.formUpdate.empImge = ''
      this.formUpdate.pictureUrlPreview = ''
      this.formUpdate.privacyPage = ''
      this.filesAdd = null
      this.filesUpdate = null
    }
  }
}
</script>
<style scope>
</style>
