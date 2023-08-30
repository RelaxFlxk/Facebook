<template>
  <v-main>
    <div
      class="col-md-12 ml-sm-auto col-lg-12 px-4 d-flex"
      style="background-color: #f2f7ff"
    >
      <StepMessageForm
        ref="StepMessageForm"
        @testData="getdata()"
        @testDataInsert="getdata()"
      ></StepMessageForm>
      <div style="width: -webkit-fill-available;">
        <div class="row-title">
          <div class="text-title">เทมเพลสตั้งเวลาเเจ้งเตือน</div>
          <div
            class="col-md-4"
            style="display: flex;justify-content: flex-end;align-items: baseline;"
          >
            &emsp14;
            <v-btn color="primary" @click="getDataId(item)">
              <v-icon left color="#fff" size="25">mdi mdi-plus</v-icon>
              Add Task
            </v-btn>
          </div>
        </div>
        <div class="row">

        </div>
        <v-row class="container col-md-12">
          <div class="" style="padding-top: 13px" @click="viewBy">
            <div class="disiblefield">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    @click="gotosession(2)"
                    left
                    color="#ddd"
                    size="20"
                    v-bind="attrs"
                    v-on="on"
                    style="color:#ddd;padding: 3px 5px 3px 5px;margin:0px 10px 0px 0px;background-color: #5987D6 !important;transform: scale(1.5);border-radius: 5px !important;"
                    >mdi mdi-border-all</v-icon
                  >
                </template>
                <span>โชว์แบบการ์ด</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    @click="gotosession(1)"
                    color="#ddd"
                    size="25"
                    v-bind="attrs"
                    v-on="on"
                    >mdi mdi-format-list-bulleted</v-icon
                  >
                </template>
                <span>โชว์แบบตาราง</span>
              </v-tooltip>
            </div>
          </div>
          <div class="col-md-3" style="padding-top: 13px;padding-left: 20px;cursor: pointer;">
          <div>
              <div class="radio-switch">
                <input
                  type="radio"
                  class="radio-switch-input"
                  id="radio-switch-All"
                  value="All"
                  v-model="formfilter.statusTitle"
                />
                <label
                  class="radio-switch-label"
                  for="radio-switch-All"
                  :style="{
                    backgroundColor:
                      selectedOptionAll === 'All' ? '#5987d6' : '#fff',
                    color:
                      selectedOptionAll === 'All' ? '#fff' : '#ddd',
                      borderRadius:selectedOptionAll === 'All' ? '10px' : '10px 0px 0px 10px',
                  }"
                  >All</label
                >
                <input
                  type="radio"
                  class="radio-switch-input"
                  id="radio-switch-low"
                  value="nomal"
                  v-model="formfilter.statusTitle"
                />
                <label
                  class="radio-switch-label"
                  for="radio-switch-low"
                  :style="{
                    backgroundColor:
                      selectedOptionAll === 'nomal' ? '#5987d6' : '#fff',
                    color:
                      selectedOptionAll === 'nomal' ? '#fff' : '#ddd',
                      borderRadius:selectedOptionAll === 'nomal' ? '10px' : '0px',
                  }"
                  >nomal</label
                >

                <input
                  type="radio"
                  class="radio-switch-input"
                  id="radio-switch-medium"
                  value="extraJob"
                  v-model="formfilter.statusTitle"
                />
                <label
                  class="radio-switch-label"
                  for="radio-switch-medium"
                  :style="{
                    backgroundColor:
                      selectedOptionAll === 'extraJob' ? '#5987d6' : '#fff',
                    color:
                      selectedOptionAll === 'extraJob' ? '#fff' : '#ddd',
                      borderRadius:
                      selectedOptionAll === 'extraJob' ? '10px' : '0px',
                  }"
                  >extraJob</label
                >
                <input
                  type="radio"
                  class="radio-switch-input"
                  id="radio-switch-high"
                  value="fastTrack"
                  v-model="formfilter.statusTitle"
                />
                <label
                  class="radio-switch-label"
                  for="radio-switch-high"
                  :style="{
                    backgroundColor:
                      selectedOptionAll === 'fastTrack' ? '#5987d6' : '#fff',
                    color:
                      selectedOptionAll === 'fastTrack' ? '#fff' : '#ddd',
                    borderRadius:
                      selectedOptionAll === 'fastTrack' ? '10px' : '0px 10px 10px 0px',
                  }"
                  >fastTrack</label
                >
              </div>
          </div>
          </div>
          <div class="col-md-5"  style="padding-top: 13px;padding-left: 20px;cursor: pointer;">
            <div class="row">
            <v-select
              style="padding: 3px 5px !important;"
              dense
              hide-details
              class="pa-0 col-md-4"
              v-model="formAdd.masBranchID"
              :items="branchItem"
              label="สาขา"
              required
              attach
              solo
              flat
              :menu-props="{ bottom: true, offsetY: true }"
              @change="getdata(), getDataflow()"
            ></v-select>
            <v-select
              style="padding: 3px 0 !important;"
              dense
              solo
              flat
              class="pa-0 col-lg-4"
              v-model="formAdd.flowId"
              :items="flowItem"
              label="บริการ"
              required
              attach
              :menu-props="{ bottom: true, offsetY: true }"
              @change="getdata()"
            ></v-select>
            </div>
          </div>
          <div class="col-md-3"  style="padding-top: 13px; padding-left: 20px;" @click="viewBy">
            <div>
                <v-select
                class="hideselect col-md-6"
                :items="items"
                label="แสดง"
                @change="filterData()"
                v-model="selectedItem"
                solo
                dense
                flat
              ></v-select>
            </div>
            <!-- <div class="disiblefield">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="gotosession(1)"
                        left
                        color="#ddd"
                        size="25"
                        v-bind="attrs"
                        v-on="on"
                        >mdi mdi-table</v-icon
                      >
                    </template>
                    <span>โชว์แบบตาราง</span>
                  </v-tooltip>
                </div> -->
          </div>
        </v-row>
        <v-row
          @click="viewBy"
          v-if="viewByType !== null"
          style=" display: flex;  justify-content: center; align-items: center;"
        >
          <v-card v-if="viewByType === 1">
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ค้นหา"
                single-line
                hide-details
              ></v-text-field>
              <div
                style="display: flex;  align-items: baseline;justify-content: flex-end; padding-top: 20px;"
              >
                <v-col>
                  <v-select
                    class="hideselect"
                    :items="items"
                    label="แสดง"
                    @change="filterData()"
                    v-model="selectedItem"
                  ></v-select>
                </v-col>
                <div class="disiblefield">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        @click="gotosession(2)"
                        left
                        color="#ddd"
                        size="25"
                        v-bind="attrs"
                        v-on="on"
                        >mdi-window-maximize</v-icon
                      >
                    </template>
                    <span>โชว์แบบการ์ด</span>
                  </v-tooltip>
                </div>
              </div>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="dataTableValues"
              :search="search"
            >
              <template v-slot:[`item.No`]="{ item, index }">
                <div>
                  {{ index + 1 }}
                </div>
              </template>
              <template v-slot:[`item.statusTitle`]="{ item }">
                <v-chip
                  class="ma-2"
                  :color="getStatusColor(item.statusTitle)"
                  variant="outlined"
                >
                  <v-icon start icon="mdi-server-plus"></v-icon>
                  {{ item.statusTitle }}
                </v-chip>
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-switch
                  @click="updateActive(item.id)"
                  v-model="item.status"
                  color="#00a5fead"
                  true-value="Active"
                  false-value="Close"
                  hide-details
                ></v-switch>
              </template>
              <template v-slot:[`item.logData`]="{ item }">
                <v-switch
                  @click="updateDataField(item.id)"
                  v-model="item.logData"
                  true-value="true"
                  false-value="false"
                  hide-details
                ></v-switch>
              </template>
              <template v-slot:[`item.dataFeilds`]="{ item }">
                <div style="display: flex;">
                  <div
                    v-for="(itemForm, i) in JSON.parse(item.dataField)"
                    :key="i"
                    style="padding: 8px 10px;"
                  >
                    <p class="clip">{{ itemForm.fieldName }}</p>
                  </div>
                </div>
              </template>
              <template
                v-if="dataTableValues.length > 0"
                v-slot:[`item.actions`]="{ item }"
              >
                <div class="text-dot" @click="showCard(item.id)" id="hidecard">
                  <p class="showdot">กดเพื่อตั้งค่าเพิ่มเติม</p>
                  <v-icon left size="25" style=""> mdi-dots-vertical</v-icon>
                </div>
                <v-card
                  class="card-setting card-position-table"
                  v-if="showingCard === item.id"
                  ref="card"
                >
                  <v-list dense>
                    <v-list-item-group v-model="selectedItem" color="primary">
                      <v-list-item
                        v-for="(itemEdit, i) in item_edit"
                        :key="i"
                        @click="handleItemClick(item, itemEdit)"
                      >
                        <v-list-item-icon>
                          <v-icon v-text="itemEdit.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            style="color:#000 !important"
                            v-text="itemEdit.text"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </template>
            </v-data-table>
          </v-card>
          <div v-else style="width: -webkit-fill-available;">
            <div
              class="col-md-12"
              v-if="dataTableValues[0].message !== 'No data found'"
            >
              <div class="row">
                <div class="col-xl-4 col-md-4 col-sm-12">
                  <div class="row">
                    <div
                      v-for="(item, index) in dataTableValuesnomal"
                      :key="index"
                      class="col-xl-12 col-md-12 col-sm-12"
                    >
                      <v-card
                        id="chover"
                        style=" height: 100%;"
                        :class="getStatuscardClass(item.statusTitle)"
                      >
                        <div>
                          <div class="row flex-between">
                            <div v-if="item.status !== 'Active'">
                              <span
                                :class="getStatusClass(item.statusTitle)"
                                class="text-white d-flex"
                                >{{ item.date }} Day
                              </span>
                            </div>
                            <div v-else>
                              <span
                                :class="getStatusClass(item.statusTitle)"
                                class="text-white d-flex"
                                >{{ item.date }} Day
                              </span>
                            </div>
                            <v-switch
                              inset
                              @click="updateActive(item.id)"
                              v-model="item.status"
                              color="#00a5fead"
                              true-value="Active"
                              false-value="Close"
                              hide-details
                            ></v-switch>
                          </div>
                          <div class="">
                            <div class="text-title-name text-bold text-lg">
                              {{ item.title }}
                            </div>
                            <div class="text-title-name text-sm multiline-text">
                              {{ item.text }}
                            </div>
                          </div>
                          <!-- <v-icon
                      class="icon-edit"
                      left
                      size="25"
                      @click="showCard(item.id)"
                      id="hidecard"
                      style="align-items: flex-start position: absolute right: 5px"
                    >
                      mdi-dots-vertical</v-icon
                    > -->
                          <v-card
                            class="card-setting card-position"
                            v-if="showingCard === item.id"
                            ref="card"
                          >
                            <v-list dense>
                              <v-list-item-group
                                v-model="selectedItem"
                                color="primary"
                              >
                                <v-list-item
                                  v-for="(itemEdit, i) in item_edit"
                                  :key="i"
                                  @click="handleItemClick(item, itemEdit)"
                                >
                                  <v-list-item-icon>
                                    <v-icon v-text="itemEdit.icon"></v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      style="color:#000 !important"
                                      v-text="itemEdit.text"
                                    ></v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-card>
                        </div>
                        <v-row>
                          <div class="row" v-if="item.dataField">
                            <div class="col-md-8 row">
                              <div
                                v-for="(itemForm, i) in JSON.parse(
                                  item.dataField
                                ) || []"
                                :key="i"
                                class="col-md-4 col-sm-4"
                                style="padding: 2px;"
                              >
                                <div class="clip">
                                  <p style="color:#5889C4">
                                    {{ itemForm.fieldName }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              class="col-md-4 col-sm-12"
                              style="display: flex;justify-content: flex-end;"
                            >
                              <v-btn
                                class="ma-2"
                                outlined
                                style="color:#5889C4"
                                @click="getDataId(item)"
                              >
                                <v-icon>mdi-square-edit-outline</v-icon>
                                แก้ไข
                              </v-btn>
                            </div>
                          </div>
                        </v-row>
                      </v-card>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-4 col-sm-12">
                  <div class="row">
                    <div
                      v-for="(item, index) in dataTableValuesextraJob"
                      :key="index"
                      class="col-xl-12 col-md-12 col-sm-12"
                    >
                      <v-card
                        id="chover"
                        style=" height: 100%;"
                        :class="getStatuscardClass(item.statusTitle)"
                      >
                        <div>
                          <div class="row flex-between">
                            <div v-if="item.status !== 'Active'">
                              <span
                                :class="getStatusClass(item.statusTitle)"
                                class="text-white d-flex"
                                >{{ item.date }} Day
                              </span>
                            </div>
                            <div v-else>
                              <span
                                :class="getStatusClass(item.statusTitle)"
                                class="text-white d-flex"
                                >{{ item.date }} Day
                              </span>
                            </div>
                            <v-switch
                              inset
                              @click="updateActive(item.id)"
                              v-model="item.status"
                              color="#00a5fead"
                              true-value="Active"
                              false-value="Close"
                              hide-details
                            ></v-switch>
                          </div>
                          <div class="">
                            <div class="text-title-name text-bold text-lg">
                              {{ item.title }}
                            </div>
                            <div class="text-title-name text-sm multiline-text" style="max-height: 10%;">
                              {{ item.text }}
                            </div>
                          </div>
                          <!-- <v-icon
                      class="icon-edit"
                      left
                      size="25"
                      @click="showCard(item.id)"
                      id="hidecard"
                      style="align-items: flex-start position: absolute right: 5px"
                    >
                      mdi-dots-vertical</v-icon
                    > -->
                          <v-card
                            class="card-setting card-position"
                            v-if="showingCard === item.id"
                            ref="card"
                          >
                            <v-list dense>
                              <v-list-item-group
                                v-model="selectedItem"
                                color="primary"
                              >
                                <v-list-item
                                  v-for="(itemEdit, i) in item_edit"
                                  :key="i"
                                  @click="handleItemClick(item, itemEdit)"
                                >
                                  <v-list-item-icon>
                                    <v-icon v-text="itemEdit.icon"></v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      style="color:#000 !important"
                                      v-text="itemEdit.text"
                                    ></v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-card>
                        </div>
                        <v-row>
                          <div class="row" v-if="item.dataField">
                            <div class="col-md-8 row">
                              <div
                                v-for="(itemForm, i) in JSON.parse(
                                  item.dataField
                                ) || []"
                                :key="i"
                                class="col-md-4 col-sm-4"
                                style="padding: 2px;"
                              >
                                <div class="clip">
                                  <p style="color:#5889C4">
                                    {{ itemForm.fieldName }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              class="col-md-4 col-sm-12"
                              style="display: flex;justify-content: flex-end;"
                            >
                              <v-btn
                                class="ma-2"
                                outlined
                                style="color:#5889C4"
                                @click="getDataId(item)"
                              >
                                <v-icon>mdi-square-edit-outline</v-icon>
                                แก้ไข
                              </v-btn>
                            </div>
                          </div>
                        </v-row>
                      </v-card>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-md-4 col-sm-12">
                  <div class="row">
                    <div
                      v-for="(item, index) in dataTableValuesfastTrack"
                      :key="index"
                      class="col-xl-12 col-md-12 col-sm-12"
                    >
                      <v-card
                        id="chover"
                        style=" height: 100%;"
                        :class="getStatuscardClass(item.statusTitle)"
                      >
                        <div>
                          <div class="row flex-between">
                            <div v-if="item.status !== 'Active'">
                              <span
                                :class="getStatusClass(item.statusTitle)"
                                class="text-white d-flex"
                                >{{ item.date }} Day
                              </span>
                            </div>
                            <div v-else>
                              <span
                                :class="getStatusClass(item.statusTitle)"
                                class="text-white d-flex"
                                >{{ item.date }} Day
                              </span>
                            </div>
                            <v-switch
                              inset
                              @click="updateActive(item.id)"
                              v-model="item.status"
                              color="#00a5fead"
                              true-value="Active"
                              false-value="Close"
                              hide-details
                            ></v-switch>
                          </div>
                          <div class="">
                            <div class="text-title-name text-bold text-lg">
                              {{ item.title }}
                            </div>
                            <div class="text-title-name text-sm multiline-text" row="2">
                              {{ item.text }}
                            </div>
                          </div>
                          <!-- <v-icon
                      class="icon-edit"
                      left
                      size="25"
                      @click="showCard(item.id)"
                      id="hidecard"
                      style="align-items: flex-start position: absolute right: 5px"
                    >
                      mdi-dots-vertical</v-icon
                    > -->
                          <v-card
                            class="card-setting card-position"
                            v-if="showingCard === item.id"
                            ref="card"
                          >
                            <v-list dense>
                              <v-list-item-group
                                v-model="selectedItem"
                                color="primary"
                              >
                                <v-list-item
                                  v-for="(itemEdit, i) in item_edit"
                                  :key="i"
                                  @click="handleItemClick(item, itemEdit)"
                                >
                                  <v-list-item-icon>
                                    <v-icon v-text="itemEdit.icon"></v-icon>
                                  </v-list-item-icon>
                                  <v-list-item-content>
                                    <v-list-item-title
                                      style="color:#000 !important"
                                      v-text="itemEdit.text"
                                    ></v-list-item-title>
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                          </v-card>
                        </div>
                        <v-row>
                          <div class="row" v-if="item.dataField">
                            <div class="col-md-8 row">
                              <div
                                v-for="(itemForm, i) in JSON.parse(
                                  item.dataField
                                ) || []"
                                :key="i"
                                class="col-md-4 col-sm-4"
                                style="padding: 2px;"
                              >
                                <div class="clip">
                                  <p style="color:#5889C4">
                                    {{ itemForm.fieldName }}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div
                              class="col-md-4 col-sm-12"
                              style="display: flex;justify-content: flex-end;"
                            >
                              <v-btn
                                class="ma-2"
                                outlined
                                style="color:#5889C4"
                                @click="getDataId(item)"
                              >
                                <v-icon>mdi-square-edit-outline</v-icon>
                                แก้ไข
                              </v-btn>
                            </div>
                          </div>
                        </v-row>
                      </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-row>
      </div>
    </div>
  </v-main>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import StepMessageForm from './StepMessageForm.vue'
export default {
  components: {
    StepMessageForm
  },
  data () {
    return {
      text: 'center',
      icon: 'left',
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],
      DNS_IPS: 'http://localhost:5004/',
      shopId: this.$session.getAll().data.shopId,
      id_data: '',
      pageName: 'StepMessage',
      cards: [], // รายการการ์ด
      containerWidth: 0, // ความกว้างของ v-container
      containerHeight: 0, // ความสูงของ v-container
      showingCard: 0, // 0 คือไม่มีการแสดง card ใด ๆ
      modeli: '',
      viewByType: null,
      dataTableValue: [],
      dataTableValues: [],
      dataTableValuesextraJob: [],
      dataTableValuesnomal: [],
      dataTableValuesfastTrack: [],
      dataCustomfeild: [],
      matchingFields: [],
      fieldNameItem: [],
      Fielditem: [],
      Customfeild: [],
      itemIncustomField: [],
      branchItem: [],
      flowItem: [],
      formfilter: {
        statusTitle: 'nomal'
      },
      formAdd: {
        masBranchID: '',
        flowId: ''
      },
      item: {
        id: '0',
        masBranchID: '',
        flowId: '',
        shopId: this.$session.getAll().data.shopId
      },
      item_edit: [
        {
          text: 'แก้ไข',
          icon: 'mdi-clock',
          click: item => this.getDataId(item)
        },
        { text: 'ลบ', icon: 'mdi-account', click: item => this.delete(item) },
        { text: 'สำเนา', icon: 'mdi-flag', click: item => this.copy(item) }
      ],
      items: [
        'ทั้งหมด',
        'เปิดใช้งาน',
        'ปิดใช้งาน',
        'เก็บข้อมูล',
        'ไม่เก็บข้อมูล'
      ],
      itemsi: [],
      selectedItem: 'ทั้งหมด',
      filtered: null,
      search: '',
      headers: [
        { text: 'ลำดับที่', value: 'No' },
        { text: 'สเตตัส', value: 'statusTitle' },
        { text: 'ชื่อ', value: 'title' },
        { text: 'กำหนดส่ง', value: 'date' },
        { text: 'สเตตัส', value: 'status' },
        { text: 'เก็บข้อมูล', value: 'logData' },
        { text: 'ฟิลที่เก็บ', value: 'dataFeilds' },
        { text: '', value: 'actions' }
      ],
      formupdate: {
        id: '',
        statusTitle: '',
        title: '',
        date: '',
        status: '',
        logData: ''
      },
      ascending: true,
      deleteAlert: {
        title: 'ลบสำเร็จ',
        showCancelButton: false,
        type: 'success',
        icon: 'error'
      },
      updateActiveAlert: {
        title: 'อัพเดต สำเร็จ',
        icon: 'success',
        type: 'success',
        showConfirmButton: false
      },
      updateDataFieldAlert: {
        title: 'อัพเดต สำเร็จ',
        icon: 'success',
        type: 'success',
        showConfirmButton: false
      },
      copyAlert: {
        title: 'คัดลอก สำเร็จ',
        icon: 'success',
        type: 'success',
        showConfirmButton: false
      },
      setviewByType: ''
    }
  },
  computed: {
    getStatusColor () {
      return function (status) {
        if (status === 'extraJob') {
          // return '#feb700'
          return '#00a5fead'
        } else if (status === 'nomal') {
          return '#00a5fead'
          // return 'primary'
        } else if (status === 'fastTrack') {
          // return '#ff481f'
          return '#00a5fead'
        } else {
          return '#ddd'
        }
      }
    },
    filteredItem () {
      return this.dataTableValues.flatMap(item => {
        return Object.values(item).filter(value => typeof value === 'string')
      })
    },
    selectedOptionAll () {
      if (this.formfilter.statusTitle) {
        return this.formfilter.statusTitle
      } else {
        return 'nomal'
      }
    }
  },
  mounted () {
    this.getDataBranch()
    this.getDataflow()
    this.$session.start()
    this.$session.set('viewByType', 2)
    this.$on('call-get-data', this.getdata())
    document.body.addEventListener('click', this.hideCard)
  },
  beforeUnmount () {
    document.body.removeEventListener('click', this.hideCard)
  },
  created () {
    this.getdata()
    const storedViewByType = this.$session.get('viewByType')
    if (storedViewByType !== null) {
      this.viewByType = storedViewByType
    }
  },
  watch: {
    viewByType: {
      handler (newVal) {},
      immediate: true
    }
  },
  methods: {
    gotosession (item) {
      this.$session.set('viewByType', item)
      this.viewByType = item
    },
    reload () {
      console.log('reload')
      this.getdata()
    },
    sortBy () {
      this.ascending = !this.ascending
      this.sortDataTable()
    },
    sortDataTable () {
      this.dataTableValues.sort((a, b) => {
        if (this.ascending) {
          return a.id - b.id
        } else {
          return b.id - a.id
        }
      })
    },
    filterDatacol () {
      this.dataTableValuesextraJob = this.dataTableValue.filter(
        item => item.statusTitle === 'extraJob'
      )
      this.dataTableValuesnomal = this.dataTableValue.filter(
        item => item.statusTitle === 'nomal'
      )
      this.dataTableValuesfastTrack = this.dataTableValue.filter(
        item => item.statusTitle === 'fastTrack'
      )
    },
    async filterData () {
      if (this.selectedItem === 'เปิดใช้งาน') {
        this.dataTableValues = this.dataTableValue.filter(
          item => item.status === 'Active'
        )
        console.log('this.selectedItem', this.selectedItem)
      // } else if (this.selectedItem === 'extraJob') {
      //   this.dataTableValues = this.dataTableValue.filter(
      //     item => item.statusTitle === 'extraJob'
      //   )
      //   console.log(' this.selectedItem', this.selectedItem)
      } else if (this.selectedItem === 'ปิดใช้งาน') {
        this.dataTableValues = this.dataTableValue.filter(
          item => item.status === 'Close'
        )
        console.log('this.selectedItem', this.selectedItem)
      // } else if (this.selectedItem === 'nomal') {
      //   this.dataTableValues = this.dataTableValue.filter(
      //     item => item.statusTitle === 'nomal'
      //   )
      //   console.log('this.selectedItem', this.selectedItem)
      // } else if (this.selectedItem === 'fastTrack') {
      //   this.dataTableValues = this.dataTableValue.filter(
      //     item => item.statusTitle === 'fastTrack'
      //   )
      //   console.log('this.selectedItem', this.selectedItem)
      } else if (this.selectedItem === 'เก็บข้อมูล') {
        this.dataTableValues = this.dataTableValue.filter(
          item => item.logData === 'true'
        )
        console.log('this.selectedItem', this.selectedItem)
      } else if (this.selectedItem === 'ไม่เก็บข้อมูล') {
        this.dataTableValues = this.dataTableValue.filter(
          item => item.logData === 'false'
        )
        console.log('this.selectedItem', this.selectedItem)
      } else if (this.selectedItem === 'ทั้งหมด') {
        this.dataTableValues = this.dataTableValue
        console.log('this.selectedItem', this.selectedItem)
      }
    },
    // ดึงดาต้า
    getIdFrom (IsfromId) {
      try {
        axios.post(this.DNS_IP + '/getIdForm/get/' + IsfromId).then(respone => {
          this.formupdate.id = respone.data.id
          this.formupdate.statusTitle = respone.data.statusTitle
          this.formupdate.title = respone.data.title
          this.formupdate.status = respone.data.status
          this.formupdate.date = respone.data.date
          this.formupdate.logData = respone.data.logData
        })
      } catch (error) {
        console.log(error)
      }
    },
    getDataId (item) {
      // console.log('item', item)
      this.$refs.StepMessageForm.setDataCustomField(item, this.formAdd)
    },
    getStatusClass (statusTitle) {
      if (statusTitle === 'fastTrack') {
        return 'text-bold bg-yellow text-title'
      } else if (statusTitle === 'nomal') {
        return 'text-bold bg-blue text-title'
      } else {
        return 'text-bold bg-false text-title'
      }
    },
    getStatuscardClass (statusTitle) {
      if (statusTitle === 'fastTrack') {
        return 'text-bold shardow-yellow text-title'
      } else if (statusTitle === 'nomal') {
        return 'text-bold shardow-blue text-title'
      } else {
        return 'text-bold shardow-false text-title'
      }
    },
    async getdata () {
      this.dataTableValue = []
      this.dataTableValues = []
      try {
        const payload = {
          shopId: this.$session.getAll().data.shopId,
          masBranchID: this.formAdd.masBranchID,
          flowId: this.formAdd.flowId !== 'All' ? this.formAdd.flowId : null
        }
        axios
          .get(this.DNS_IP + '/stepMessage/get', { params: payload })
          .then(async res => {
            console.log('res', res)
            this.dataTableValue = res.data
            this.dataTableValues = res.data
            console.log('dataTableValues', this.dataTableValues)
            // this.getViewtype()
            this.filterData()
            this.filterDatacol()
          })
      } catch (error) {
        console.log(error)
      }
    },
    async getDataBranch () {
      this.branchItem = []
      await axios
        .get(
          this.DNS_IP +
            '/master_branch/get?shopId=' +
            this.$session.getAll().data.shopId
        )
        .then(response => {
          let rs = response.data
          console.log('rsss', rs)
          console.log('shopId=', this.$session.getAll().data.shopId)
          if (rs.status !== false) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              if (
                this.$session.getAll().data.masBranchID === '' ||
                this.$session.getAll().data.masBranchID === null
              ) {
                let s = {}
                s.text = d.masBranchName
                s.value = d.masBranchID.toString()
                this.branchItem.push(s)
              } else {
                if (d.masBranchID === this.masBranchID) {
                  let s = {}
                  s.text = d.masBranchName
                  s.value = d.masBranchID.toString()
                  this.branchItem.push(s)
                }
              }
              console.log('dtdtdtdt', this.branch)
            }
          }
          if (this.branchItem.length > 0) {
            this.formAdd.masBranchID = this.branchItem[0].value
            this.item.masBranchID = this.branchItem[0].value
          }
        })
      await this.getDataflow()
      console.log('branch', this.branch)
    },
    async getDataflow () {
      this.flowItem = []
      await axios
        .get(
          this.DNS_IP +
            '/flow/get?shopId=' +
            this.$session.getAll().data.shopId +
            '&masBranchIDAll=' +
            this.formAdd.masBranchID
        )
        .then(async response => {
          await this.getdata()
          let rs = response.data
          console.log('rsss', rs)
          console.log('shopId=', this.$session.getAll().data.shopId)
          if (rs.status !== false) {
            let a = {}
            a.text = 'All'
            a.value = 'All'
            this.flowItem.push(a)
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              if (
                this.$session.getAll().data.flowId === '' ||
                this.$session.getAll().data.flowId === null
              ) {
                let s = {}
                s.text = d.flowName
                s.value = d.flowId.toString()
                this.flowItem.push(s)
              } else {
                if (d.flowId === this.flowId) {
                  let s = {}
                  s.text = d.flowName
                  s.value = d.flowId.toString()
                  this.flowItem.push(s)
                }
              }
              console.log('dtdtdtdt', this.flowItem)
            }
          }
          if (this.flowItem.length > 0) {
            this.formAdd.flowId = this.flowItem[0].value
            this.item.flowId = this.flowItem[0].value
          }
        })
      console.log('flowIdflowItem', this.flowItem)
    },
    copy (item) {
      try {
        let formData = Object.assign({}, item)
        delete formData.id
        delete formData.RECORD_STATUS
        delete formData.CREATE_DATE
        delete formData.LAST_DATE
        delete formData.dataFields
        // delete formData.StepMessageRECORD_STATUS
        // delete formData.StepMessageLAST_DATE
        // delete formData.StepMessageCREATE_USER
        // delete formData.StepMessageCREATE_DATE
        formData.text = 'copy ' + formData.text
        formData.title = 'copy ' + formData.title
        if (Date.parse(formData.dateFull)) {
          formData.dateFull = moment(formData.dateFull).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
        if (formData) {
          axios.post(this.DNS_IP + '/stepMessage/add', formData).then(res => {
            // console.log('res', res)
            this.$swal(this.copyAlert)
            this.getdata()
          })
        }
      } catch (error) {
        console.log(error)
      }
    },

    // อัพเดท
    updateActive (IsactiveId) {
      try {
        axios
          .post(this.DNS_IP + '/updateActive/post/' + IsactiveId)
          .then(updateActive => {
            this.$swal(this.updateActiveAlert)
            // console.log(
            //   'this.dataTableValue.status',
            //   this.dataTableValue,
            //   updateActive
            // )
            this.getdata()
          })
      } catch (error) {
        console.log(error)
      }
    },
    updateDataField (IsField) {
      try {
        axios
          .post(this.DNS_IP + '/updateDataField/post/' + IsField)
          .then(updateActive => {
            this.$swal(this.updateDataFieldAlert)
            this.getdata()
          })
      } catch (error) {
        console.log(error)
      }
    },
    // ลบ
    delete (item) {
      try {
        this.$swal(this.deleteAlert).then(async result => {
          if (result) {
            axios
              .post(this.DNS_IP + `/stepMessage/delete/` + item.id)
              .then(data => {
                this.$swal(this.delete)
                console.log(data)
                this.getdata()
              })
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    // อื่นๆ
    callGetData () {
      this.$refs.StepMessageForm.getdata()
    },
    viewBy () {
      switch (this.viewByType) {
        case '2':
          this.viewByType = '1'
          break

        case '1':
          this.viewByType = '2'
          break
      }
    },
    showCard (cardId) {
      console.log(cardId)
      if (this.showingCard === cardId) {
        this.showingCard = 0
      } else {
        this.showingCard = cardId
      }
    },
    calculateContainerSize () {
      const container = this.$el.querySelector('.v-container')
      if (container) {
        this.containerWidth = container.offsetWidth
        this.containerHeight = container.offsetHeight
      }
    },
    showCardSetting () {
      this.cards.forEach(card => {
        if (card.left + card.width > this.containerWidth) {
          card.left = this.containerWidth - card.width
        }
        if (card.top + card.height > this.containerHeight) {
          card.top = this.containerHeight - card.height
        }
      })
    },
    hideCard (event) {
      if (
        !event.target.closest('#hidecard') &&
        !event.target.closest('.card-setting')
      ) {
        this.showingCard = 0
      }
    },
    async handleItemClick (item, itemEdit) {
      if (itemEdit.text === 'แก้ไข') {
        await this.getDataId(item)
      } else if (itemEdit.text === 'ลบ') {
        await this.delete(item)
      } else if (itemEdit.text === 'สำเนา') {
        await this.copy(item)
      } else {
        console.log('คลิกที่รายการ', item)
      }
    }
  }
}
</script>

<style scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
}
.v-text-field {
  padding-top: 0px !important;
  margin-top: 4px;
}
.container {
  margin: 0px 0px;
}
.text-dot {
  display: flex;
}
@media screen and (min-width: 400px) {
  .showdot {
    display: none !important;
  }
}
.v-input--selection-controls {
  margin-top: 0px;
}
.v-application p {
  margin-bottom: 0px !important;
}
.row {
  margin: 0px;
  align-items: baseline;
}
.row-title {
  margin: 0px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.v-list-item--active {
  background-color: #ddd;
}
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  background-color: #ffffff !important;
}

.icon-edit {
  position: absolute;
  right: 15px;
}

.v-sheet.v-card[data-v-6dd5ac1a] {
  margin: 3px;
  width: -webkit-fill-available;
}

.out-of-viewport {
  top: 10px;
  bottom: auto;
}

.hideselect .v-sheet.v-card:not(.v-sheet--outlined) {
  /* box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12) */
  box-shadow: none !important;
}

.disiblefield {
  box-shadow: none !important;
  background-color: #fff !important;
  justify-content: end;
  background-color: #fff !important;
  border: solid #fff;
  filter: drop-shadow(0px 0px 3px #f1f1f1);
  border-radius: 9px;
  padding: 5px 5px;
}

.disiblefieldALL {
  box-shadow: none !important;
  background-color: #fff !important;
  justify-content: end;
  background-color: #fff !important;
  border: solid #fff;
  filter: drop-shadow(0px 0px 3px #f1f1f1);
  border-radius: 9px;
  padding: 5px 5px;
}

.card-setting {
  position: absolute;
  right: -115px;
  z-index: 999;
  top: 55px;
  width: 161px !important;
  border-radius: 10px !important;
  /* box-shadow: 0px 3px 1px -2px rgba(149, 149, 149, 0.2),
    0px 2px 2px 3px rgba(139, 139, 139, 0.14),
    0px 1px 5px 1px rgba(149, 149, 149, 0.12) !important; */
}

.v-sheet.v-card .card-setting {
  padding: 0px !important;
  position: absolute;
  right: 15px;
  margin: 40px !important;
  max-width: 368px;
}

.v-sheet.v-card {
  padding: 15px !important;
  line-height: 35px;
  border-radius: 20px;
}
.v-card.v-sheet #chover:hover {
  /* filter: drop-shadow(2px 4px 6px #a5a5a5); */
  transform: translateY(-4px);
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: none !important;
}

.card-position {
  top: auto;
  right: 17% !important;
}

.card-position-table {
  top: auto;
}

.td-card {
  width: 35%;
  color: #bcbcbc;
  text-align-last: justify;
  vertical-align: top;
}

.text-title {
  font-size: 12px;
  padding-left: 15px;
}

.text-title-name {
  font-size: 16px;
  padding-left: 15px;
}

.text-true {
  color: #05ad34;
}

.text-false {
  color: #fe7070;
}

.text-red {
  color: #ff481f;
}

.text-white {
  color: #fff !important;
}

.text-blue {
  color: #00a5fead;
}

.text-yellow {
  color: #feb700;
}

.text-bold {
  font-weight: bold;
}
.text-gray {
  color: #ddd;
}
.text-sm {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  color: #1e1e1e;
}
.text-lg {
  font-size: 16px;
}
.bg-blue {
  background-color: #5889c4;
  padding: 2px 30px;
  border-radius: 30px;
  width: fit-content;
}
.bg-yellow {
  background-color: #feb700;
  padding: 2px 30px;
  border-radius: 30px;
  width: fit-content;
}
.bg-false {
  background-color: #ec5453;
  padding: 2px 30px;
  border-radius: 30px;
  width: fit-content;
}
.shardow-blue {
  filter: drop-shadow(0px 4px 0px #5889c4);
}
.shardow-yellow {
  filter: drop-shadow(0px 4px 0px #feb700);
}
.shardow-false {
  filter: drop-shadow(0px 4px 0px #ec5453);
}
.footer-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  align-items: baseline;
  bottom: 20px;
  position: fixed;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.sort {
  display: block;
}
.ma-2 {
  border-radius: 6px;
}
.clip {
  background-color: rgb(255 255 255);
  padding: 2px 4px;
  border-radius: 30px;
  min-width: 69px;
  line-height: normal;
  text-align: center;
  color: #d9d9d9 !important;
  /* -webkit-filter: drop-shadow(2px 4px 6px #b9b9b9); */
  /* filter: drop-shadow(2px 4px 6px #b9b9b9); */
  border: solid 1px;
}
.theme--light.v-chip {
  color: #ffffff !important;
  font-weight: bold;
}
.theme--light.v-chip :hover {
  transform: scale(1.03) !important;
}
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-row {
  height: 0;
}
.head-card {
  padding: 0px 30px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: flex-end;
}
.v-application--is-ltr .v-data-table__mobile-row__cell {
  text-align: left;
}
.multiline-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Number of lines to show */
  -webkit-box-orient: vertical;
}
.radio-switch {
    display: flex;
    align-items: center;
    padding-bottom: 40px;
    /* filter: drop-shadow(2px 4px 6px #ddd); */
  }

  .radio-switch-input {
    display: none;
  }

  .radio-switch-label {
    display: block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #333;
    cursor: pointer;
  }

  .radio-switch-label[for="radio-switch-All"] {
    background-color: #007bff;
    color: #fff;
    width: -webkit-fill-available;
    height: 40px;
    display: flex;
    padding: 10px;
    place-content: center;
    align-items: center;
    border-radius: 10px 0px 0px 10px;
    /* text-shadow: rgb(255, 255, 255) 1px 1px 5px; */
    font-weight: bold;
  }
  .radio-switch-label[for="radio-switch-low"] {
    background-color: #007bff;
    color: #fff;
    width: -webkit-fill-available;
    height: 40px;
    padding: 10px;
    display: flex;
    place-content: center;
    align-items: center;
    /* text-shadow: rgb(255, 255, 255) 1px 1px 5px; */
    font-weight: bold;
  }

  .radio-switch-label[for="radio-switch-medium"] {
    background-color: #ffc107;
    color: #fff;
    height: 40px;
    display: flex;
    place-content: center;
    padding: 10px;
    align-items: center;
    width: -webkit-fill-available;
    /* text-shadow: rgb(255, 255, 255) 1px 1px 5px; */
    font-weight: bold;
  }

  .radio-switch-label[for="radio-switch-high"] {
    background-color: #dc3545;
    color: #fff;
    height: 40px;
    display: flex;
    place-content: center;
    padding: 10px;
    align-items: center;
    width: -webkit-fill-available;
    border-radius: 0px 10px 10px 0px;
    /* text-shadow: rgb(255, 255, 255) 1px 1px 10px; */
    font-weight: bold;
  }

  .radio-switch-label[for="radio-switch-low"],
  .radio-switch-label[for="radio-switch-medium"],
  .radio-switch-label[for="radio-switch-high"] {
    background-color: #fff;
    /* border:solid #ddd !important; */
  }
</style>
