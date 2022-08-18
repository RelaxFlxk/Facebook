<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-8">
        <v-row class="no-gutters">
          <v-col cols="12" md="6" lg="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="12" md="6" lg="6" class="v-margit_button text-right">
            <v-btn-toggle>
              <v-btn
                :loading="loadingRefresh"
                :disabled="loadingRefresh"
                color="warning"
                style="z-index:8;margin-right: 5px;"
                @click="getDataDefault(), searchOther = '', showColorSearch = false, statusSearch = 'no'"
              >
                <v-icon left>mdi-refresh-circle</v-icon>
                Refresh
                <template v-if="loadingRefresh">
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>
              <v-btn
                color="primary"
                style="z-index:8;margin-right: 5px;"
                id="v-step-0"
                depressed
                @click="addDataSet()"
              >
                <v-icon left>mdi-text-box-plus</v-icon>
                เพิ่ม
              </v-btn>
              <!-- <v-btn
                color="teal"
                style="z-index:8;"
                id="v-step-0"
                dark
                depressed
                @click="(dialogExport = true), validate('EXPORT')"
              >
                <v-icon left>mdi-download</v-icon>
                Export Data
              </v-btn> -->
            </v-btn-toggle>
            <!-- </v-overlay> -->
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-left">
            <template  v-if="changeBackgroundColor">
            <v-row class="test">
              <v-col cols="3" class="text-center" align="left">
                <div>
                  <v-col cols="12" class="pt-0 mb-5" style="border-right: 4px solid #25318C;">
                    <v-card
                      style="padding: 18px;
                              color:black;
                              border-top-right-radius: 20px;
                              border-top-left-radius: 20px;
                              border-bottom-left-radius: 20px;
                              border-bottom-right-radius: 20px;"
                      :color="(getSelectText === 'wait') ? '#F9DBB2' : 'white'"
                      dense
                      prominent
                      @click="getSelect('wait',countWaiting)"
                    >
                    <div style="display: flex;justify-content: center;">
                      <div class="text-center">
                        <v-avatar
                          size="70"
                          class="pa-3 mr-4"
                          color="#FEAE34"
                        >
                          <v-icon dark size="30" class="iconify" data-icon="ps:warning">
                            mdi-alarm
                          </v-icon>
                        </v-avatar>
                      </div>
                      <div style="margin: auto 0;">
                        <strong>{{dataTypeProcess1}}</strong>
                        <div>จำนวน : {{countWaiting}}</div>
                      </div>
                    </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12" style="border-right: 4px solid #25318C;">
                    <v-card
                    style="padding: 18px;
                              border-top-right-radius: 20px;
                              border-top-left-radius: 20px;
                              border-bottom-left-radius: 20px;
                              border-bottom-right-radius: 20px;"
                      :color="(getSelectText === 'cancel') ? '#F9CACA' : 'white'"
                      dense
                      icon="mdi-calendar-remove"
                      prominent
                      @click="getSelect('cancel',countCancel)"
                    >
                    <div style="display: flex;justify-content: center;">
                      <div class="text-center mr-4">
                        <v-avatar
                          size="70"
                          class="pa-3"
                          color="#B72929"
                        >
                          <v-icon dark size="40" class="iconify" data-icon="carbon:rule-cancelled">
                            mdi-alarm
                          </v-icon>
                        </v-avatar>
                      </div>
                      <div style="margin: auto 0;">
                        <strong>{{dataTypeProcess3}}</strong>
                         <div>จำนวน : {{countCancel}}</div>
                      </div>
                    </div>
                    </v-card>
                  </v-col>
                </div>
              </v-col>
              <v-col cols="9" class="text-center">
                <v-row>
                  <v-col cols="4" >
                    <v-card
                      style="padding: 18px"
                      :color="(getSelectText === 'confirm') ? '#C9F2DC' : 'white'"
                      dense
                      icon="mdi-email-check"
                      prominent
                      @click="getSelect('confirm',countConfirm)"
                    >
                    <div style="display: flex;justify-content: center;">
                      <div class="text-center mr-4">
                        <v-avatar
                          size="70"
                          color="#97DDBB"
                          style="padding:13px"
                        >
                          <v-icon dark size="40" class="iconify" data-icon="quill:mail-subbed">
                            mdi-alarm
                          </v-icon>
                        </v-avatar>
                      </div>
                      <div style="margin: auto 0;">
                       <strong>{{dataTypeProcess2}}</strong>
                        <div>จำนวน : {{countConfirm}}</div>
                      </div>
                    </div>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card
                      style="padding: 18px"
                      :color="(getSelectText === 'confirmJob') ? '#F9E8F5' : 'white'"
                      dense
                      icon="mdi-account-check"
                      prominent
                      @click="getSelect('confirmJob',countJob)"
                    >
                    <div style="display: flex;justify-content:center;">
                      <div class="text-center mr-4">
                        <v-avatar
                          color="#E5B5D8"
                          size="70"
                          class="pa-3"
                        >
                          <v-icon dark size="40" class="iconify" data-icon="bi:people">
                            mdi-alarm
                          </v-icon>
                        </v-avatar>
                      </div>
                      <div style="margin: auto 0;">
                        <strong>{{dataTypeProcess4}}</strong>
                         <div style="text-align: left;">จำนวน : {{countJob}}</div>
                      </div>
                    </div>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card
                      style="padding: 18px"
                      :color="(getSelectText === 'confirmSum') ? '#D7E8F9' : 'white'"
                      dense
                      icon="mdi-expand-all"
                      @click="getSelect('confirmSum',(countConfirm + countJob))"
                    >
                    <div style="display: flex;justify-content: center;">
                      <div class="text-center mr-4">
                        <v-avatar
                          color="#76ABE5"
                          size="70"
                          class="pa-3"
                        >
                          <v-icon dark size="40" class="iconify" data-icon="bi:folder-plus">
                          </v-icon>
                        </v-avatar>
                      </div>
                      <div style="margin: auto 0;">
                        <strong>รวมผู้เข้ารับบริการ</strong>
                        <div style="text-align: left;">รวม : {{countConfirm + countJob}}</div>
                      </div>
                    </div>
                    </v-card>
                  </v-col>
                  <v-col cols="12" class="pb-4">
                    <v-card
                      style="padding:18px;color:black !important;margin-top:20px;border-radius: 20px !important;"
                      color="white"
                      @click="getSelect('all',countAll)"
                    >
                     <v-avatar
                          class="mr-8 pa-3"
                          color="#76ABE5"
                          size="70"
                        >
                          <v-icon dark size="40" class="iconify" data-icon="healthicons:chart-bar-outline">
                          </v-icon>
                        </v-avatar>
                      รวมรายการนัดหมายทั้งหมด : {{countAll}}
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  :color="'orange ' + ((getSelectText === 'wait') ? '' : 'lighten-4')"
                  :dark="((getSelectText === 'wait') ? true : false)"
                  dense
                  icon="mdi-phone-ring"
                  prominent
                  @click="getSelect('wait',countWaiting)"
                >
                  <div>
                    <strong>{{dataTypeProcess1}}</strong>
                  </div>
                  <div>จำนวน : {{countWaiting}}</div>
                </v-alert>
              </v-col>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  :color="'green ' + ((getSelectText === 'confirm') ? '' : 'lighten-4')"
                  :dark="((getSelectText === 'confirm') ? true : false)"
                  dense
                  icon="mdi-phone-check"
                  prominent
                  @click="getSelect('confirm',countConfirm)"
                >
                  <div>
                    <strong>{{dataTypeProcess2}}</strong>
                  </div>
                  <div>จำนวน : {{countConfirm}}</div>
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  :color="'red ' + ((getSelectText === 'cancel') ? '' : 'lighten-4')"
                  :dark="((getSelectText === 'cancel') ? true : false)"
                  dense
                  icon="mdi-phone-cancel"
                  prominent
                  @click="getSelect('cancel',countCancel)"
                >
                  <div>
                    <strong>{{dataTypeProcess3}}</strong>
                  </div>
                  <div>จำนวน : {{countCancel}}</div>
                </v-alert>
              </v-col>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  :color="'blue ' + ((getSelectText === 'confirmJob') ? '' : 'lighten-4')"
                  :dark="((getSelectText === 'confirmJob') ? true : false)"
                  dense
                  icon="mdi-car-cog"
                  prominent
                  @click="getSelect('confirmJob',countJob)"
                >
                   <div>
                    <strong>{{dataTypeProcess4}}</strong>
                  </div>
                  <div>จำนวน : {{countJob}}</div>
                </v-alert>
              </v-col>
            </v-row> -->
            <!-- <v-row>
              <v-col cols="12" class="text-center pb-0  pt-0">
                <v-btn
                  color="blue-grey"
                  dense
                  dark
                  rounded
                  block
                  class="ma-2 white--text"
                  @click="getSelect('all',countAll)"
                >
                  ทั้งหมด จำนวน : {{countAll}}
                  <v-icon
                    right
                    dark
                  >
                    mdi-database-arrow-down
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row> -->
            </template>
          </v-col>
        </v-row>
        <div class="pa-4 mb-4">
          <h3 style="margin-bottom: 15px;color: #1C3879;font-weight: bolder;">ตรวจสอบรายชื่อลูกค้านัดหมายรายเดือน</h3>
          <v-row>
            <v-col cols="4">
              <v-card class="pa-2">
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
                  v-model="dateStart"
                  prepend-inner-icon="mdi-calendar"
                  label="เลือก เดือน/ปี"
                  readonly
                  outlined
                  dense
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                @input="menuStart = false,dataReady = false,getBookingList()"
                v-model="dateStart"
                type="month"
                no-title
                scrollable
              >
              </v-date-picker>
              </v-menu>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="pa-2">
                 <v-select
              v-model="masBranchID"
              hide-details
              :items="branch"
              label="สาขา"
              outlined
              dense
              required
              @change="dataReady = false,getBookingList()"
              ></v-select>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card class="pa-2">
                <v-select
              v-model="flowSelect"
              hide-details
              :items="DataFlowName"
              label="ประเภทบริการ"
              outlined
              dense
              @change="dataReady = false,getBookingList()"
            ></v-select>
              </v-card>
            </v-col>
          </v-row>
          </div>
        <v-row>
          <!-- EXPORT -->
          <v-dialog v-model="dialogExport" persistent max-width="70%">
            <v-card class="text-center">
              <v-form ref="form_export" v-model="validExport" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-col class="text-right pa-0">
                      <v-btn
                        small
                        color="#E0E0E0"
                        @click="(dialogExport = false)"
                      >
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <v-row justify="center">
                      <v-col
                        cols="5"
                        class="text-center"
                        style="margin: auto 0;"
                      >
                        <v-col class="text-center">
                          <v-img
                            class="v-margit_img_reward"
                            :src="require('@/assets/ExportExcel.svg')"
                            max-width="470.37"
                            max-height="247"
                          ></v-img>
                        </v-col>
                      </v-col>

                      <v-col cols="6" class="v-margit_text_add mt-0 pa-0">
                        <v-col class="text-center pa-3 ml-2">
                          <v-img
                            class="v_text_add"
                            :src="require('@/assets/Grouptitle.svg')"
                          ></v-img>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="6">
                               <p>เลือกสาขา</p>
                              <v-select
                                v-model="masBranchIDExport"
                                :items="branch"
                                label=""
                                outlined
                                :rules="[rules.required]"
                              ></v-select>
                            </v-col>
                            <v-col cols="6">
                              <p>เลือกวันที่</p>
                              <date-range-picker
                                opens="left"
                                :append-to-body='appendBody'
                                ref="picker"
                                :locale-data="localeData"
                                v-model="dateRange"
                                :rules="[rules.required]"
                                @update="updateValuesExport()"
                                >
                                  <template #ranges="ranges">
                                    <div class="ranges">
                                      <ul>
                                        <li v-for="(range, name) in ranges.ranges" :key="name" @click="ranges.clickRange(range)">
                                          <b v-if="name === 'Today'">วันนี้</b>
                                          <b v-if="name === 'Yesterday'">เมื่อวาน</b>
                                          <b v-if="name === 'This month'">เดือนนี้</b>
                                          <b v-if="name === 'This year'">ปีนี้ทั้งปี</b>
                                          <b v-if="name === 'Last month'">เดือนที่แล้ว</b>
                                        </li>
                                        <!-- <li data-range-key="Today" tabindex="0" class="active" @click="ranges.clickRange('Today')">วันนี้ </li>
                                        <li data-range-key="Yesterday" tabindex="0" class="" @click="ranges.clickRange('Yesterday')">เมื่อวาน </li>
                                        <li data-range-key="This month" tabindex="0" class="" @click="ranges.clickRange('This month')">เดือนนี้ </li>
                                        <li data-range-key="This year" tabindex="0" class="" @click="ranges.clickRange('This year')">ปีนี้ทั้งปี </li>
                                        <li data-range-key="Last month" tabindex="0" class="" @click="ranges.clickRange('Last month')">เดือนที่แล้ว </li> -->
                                      </ul>
                                    </div>
                                  </template>
                                </date-range-picker>
                            </v-col>
                            </v-row>
                        </v-col>
                      </v-col>
                    </v-row>
                    <div class="text-center" v-if="export_data.length > 0">
                      <v-btn color="yellow-light" @click="dialogExport = false">
                        <v-icon left>mdi-download</v-icon>
                        <download-excel
                          class="btn btn-default"
                          :data="export_data"
                          :fields="export_fields"
                          :type="exportType"
                          :worksheet="exportWorksheet"
                          :name="exportFileName"
                        >
                          Export Data
                        </download-excel>
                      </v-btn>
                    </div>
                  </v-container>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end add -->
          <!-- ADD -->
          <v-dialog v-model="dialogAdd"
          max-width="100%"
          persistent>
          <!-- <v-dialog v-model="dialogAdd" persistent max-width="70%"> -->
            <v-card class="text-center">
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
                <v-card-text>
                    <v-col class="text-right pa-0">
                      <v-btn
                        small
                        color="#E0E0E0"
                        @click="(dialogAdd = false), clearDataAdd()"
                      >
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <v-row justify="center">
                      <v-col
                        cols="9"
                      >
                        <v-col class="text-center">
                          <CalendarBooking ref="CalendarBooking"></CalendarBooking>
                        </v-col>
                      </v-col>

                      <v-col cols="3">
                      <!-- <v-col cols="12" sm="6" md="6" lg="6" class="v-margit_text_add mt-0 pa-0"> -->
                        <v-col class="text-center pa-3 ml-2">
                          <v-img
                            class="v_text_add"
                            :src="require('@/assets/Grouptitle.svg')"
                          ></v-img>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="formAdd.flowId"
                            :items="dataFlowSelectAdd"
                            label="ประเภทบริการ"
                            outlined
                            dense
                            required
                            @change="SetallowedDates(),setFlowAdd(), checkTime(), date = ''"
                            :rules="[rules.required]"
                          ></v-select>
                          <!-- <v-select
                            v-model="formAdd.flowId"
                            :items="dataFlowSelectAdd"
                            label="ประเภทบริการ"
                            outlined
                            dense
                            required
                            @change="setFlowAdd()"
                            :rules="[rules.required]"
                          ></v-select> -->
                          <v-select
                            v-model="formAdd.masBranchID"
                            :items="branch"
                            label="สาขา"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-select>
                          <!-- <v-select
                            v-model="formAdd.masBranchID"
                            :items="branch"
                            label="สาขา"
                            outlined
                            dense
                            required
                            @change="checkTime()"
                            :rules="[rules.required]"
                          ></v-select> -->
                          <template v-if="fieldNameItem">
                            <div
                              v-for="(item, index) in fieldNameItem"
                              :key="index"
                            >
                              <template
                                v-if="
                                  item.conditionField === '' ||
                                    item.conditionField === null
                                "
                              >
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'text'">
                                  <v-text-field
                                    v-if="item.fieldName === 'เบอร์โทร'"
                                    v-mask="'###-###-####'"
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                  <v-text-field
                                    v-else
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'number'">
                                  <v-text-field
                                    v-if="item.fieldName === 'เบอร์โทร'"
                                    v-mask="'###-###-####'"
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                  <v-text-field
                                    v-else
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'Autocompletes'">
                                  <v-autocomplete
                                    v-model="item.fieldValue"
                                    :items="JSON.parse(item.optionField)"
                                    outlined
                                    :label="item.fieldName"
                                    required
                                    dense
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'Selects'">
                                  <v-select
                                  class="mb-6"
                                    v-model="item.fieldValue"
                                    :items="JSON.parse(item.optionField)"
                                    menu-props="auto"
                                    :label="item.fieldName"
                                    clearable
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    dense
                                    outlined
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'Radio'" style="padding:0px;">
                                  <v-container fluid style="padding:0px;">
                                    <v-radio-group
                                      column
                                      dense
                                      v-model="item.fieldValue"
                                      style="margin:0px;"
                                    >
                                      <template v-slot:label> </template>
                                      <div
                                        v-for="radios in JSON.parse(
                                          item.optionField
                                        )"
                                        :key="radios.toISOString"
                                      >
                                        <v-radio
                                          :label="radios.text"
                                          dense
                                          :value="radios.value"
                                        ></v-radio>
                                      </div>
                                    </v-radio-group>
                                  </v-container>
                                </v-col>
                              </template>
                              <template
                                v-if="
                                  item.conditionField !== '' &&
                                    fieldNameItem.filter(row => {
                                      return (
                                        row.fieldId ===
                                        parseInt(item.conditionField)
                                      );
                                    }).length > 0
                                "
                              >
                                <template
                                  v-if="
                                    item.conditionValue ===
                                      fieldNameItem.filter(row => {
                                        return (
                                          row.fieldId ===
                                          parseInt(item.conditionField)
                                        );
                                      })[0].fieldValue
                                  "
                                >
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'text'">
                                    <v-text-field
                                      v-if="item.fieldName === 'เบอร์โทร'"
                                      v-mask="'###-###-####'"
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                    <v-text-field
                                      v-else
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'number'">
                                    <v-text-field
                                      v-if="item.fieldName === 'เบอร์โทร'"
                                      v-mask="'###-###-####'"
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                    <v-text-field
                                      v-else
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'Autocompletes'">
                                    <v-autocomplete
                                      v-model="item.fieldValue"
                                      :items="JSON.parse(item.optionField)"
                                      outlined
                                      :label="item.fieldName"
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'Selects'">
                                    <v-select
                                    class="mb-6"
                                      v-model="item.fieldValue"
                                      :items="JSON.parse(item.optionField)"
                                      menu-props="auto"
                                      :label="item.fieldName"
                                      required
                                      dense
                                      clearable
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                      outlined
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'Radio'" style="padding:0px;">
                                    <v-container fluid style="padding:0px;">
                                      <v-radio-group
                                        row
                                        dense
                                        v-model="item.fieldValue"
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        style="margin:0px;"
                                      >
                                        <template v-slot:label> </template>
                                        <div
                                          v-for="radios in JSON.parse(
                                            item.optionField
                                          )"
                                          :key="radios.toISOString"
                                        >
                                          <v-radio
                                            :label="radios.text"
                                            :value="radios.value"
                                            dense
                                          ></v-radio>
                                        </div>
                                      </v-radio-group>
                                    </v-container>
                                  </v-col>
                                </template>
                              </template>
                                <template  v-if="item.conditionField === 'flow' ">
                                  <template v-if="parseInt(item.conditionValue) === parseInt(formAdd.flowId) ">
                                    <v-col cols="12" class="InputData" v-if="item.fieldType == 'text'">
                                      <v-text-field
                                        v-if="item.fieldName === 'เบอร์โทร'"
                                        v-mask="'###-###-####'"
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                      <v-text-field
                                        v-else
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="InputData" v-if="item.fieldType == 'number'">
                                      <v-text-field
                                        v-if="item.fieldName === 'เบอร์โทร'"
                                        v-mask="'###-###-####'"
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                      <v-text-field
                                        v-else
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      class="InputData"
                                      v-if="item.fieldType == 'Autocompletes'"
                                    >
                                      <v-autocomplete
                                        v-model="item.fieldValue"
                                        :items="JSON.parse(item.optionField)"
                                        dense
                                        filled
                                        :label="item.fieldName"
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                      ></v-autocomplete>
                                    </v-col>
                                      <v-col cols="12" class="InputData" v-if="item.fieldType == 'Selects'">
                                        <v-select
                                        class="mb-6"
                                          v-model="item.fieldValue"
                                          :items="JSON.parse(item.optionField)"
                                          menu-props="auto"
                                          :label="item.fieldName"
                                          clearable
                                          dense
                                          :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                          hide-details
                                          outlined
                                        ></v-select>
                                      </v-col>
                                      <v-col cols="12" class="InputData" v-if="item.fieldType === 'Radio'" style="padding:0px;">
                                        <v-container fluid style="padding:0px;">
                                          <v-radio-group
                                            row
                                            v-model="item.fieldValue"
                                            style="margin:0px;"
                                            :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                          >
                                            <template v-slot:label> </template>
                                            <div
                                              v-for="radios in JSON.parse(
                                                item.optionField
                                              )"
                                              :key="radios.toISOString"
                                              class="text-center"
                                            >
                                              <v-radio
                                                :label="radios.text"
                                                dense
                                                :value="radios.value"
                                              ></v-radio>
                                            </div>
                                          </v-radio-group>
                                        </v-container>
                                      </v-col>
                                  </template>
                                </template>
                            </div>
                          </template>
                          <v-row>
                            <div v-if="formAdd.flowId">
                            <v-col class="pb-0">
                              <v-menu
                                ref="menu"
                                v-model="menuDate"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                :rules="[rules.required]"
                                transition="scale-transition"
                                offset-y
                                required
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="date"
                                    readonly
                                    label="วันที่"
                                    outlined
                                    dense
                                    v-bind="attrs"
                                    v-on="on"
                                    required
                                    @click="pickerDate ? getMonth(pickerDate) : null"
                                    :rules="[rules.required]"
                                  >
                                    <template #prepend>
                                      <v-icon right>
                                        mdi-calendar
                                      </v-icon>
                                    </template>
                                  </v-text-field>
                                </template>
                                <!-- <div class="text-center">
                                <v-progress-circular
                                  indeterminate
                                  color="primary"
                                ></v-progress-circular>
                                </div> -->
                                <v-date-picker
                                  v-model="date"
                                  no-title
                                  scrollable
                                  :allowed-dates="allowedDates"
                                  :picker-date.sync="pickerDate"
                                  @change="setLimitBooking(date)"
                                  @input="(menuDate = false), $refs.menu.save(date)"
                                  :min="currentDate"
                                >
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            </div>
                            <v-col class="pb-0" v-if="timeavailable.length > 0 && date !== ''">
                              <v-select
                              v-model="time"
                              :items="timeavailable"
                              label="เวลา"
                              item-text="text"
                              item-value="text"
                              persistent-hint
                              return-object
                              outlined
                              dense
                              required
                              :rules ="[rules.required]"
                            ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="pt-0">
                              <v-radio-group v-model="formAdd.radiosRemark" row required :rules ="[rules.required]">
                                <v-radio value="ซ่อมปกติ">
                                  <template v-slot:label>
                                    <div class="mt-3"><strong class="primary--text">{{dataTypeJob1}}</strong></div>
                                  </template>
                                </v-radio>
                                <v-radio value="ExtraJob">
                                  <template v-slot:label>
                                    <div class="mt-3"><strong class="error--text">{{dataTypeJob2}}</strong></div>
                                  </template>
                                </v-radio>
                                <v-radio value="FastTrack">
                                  <template v-slot:label>
                                    <div class="mt-3"><strong class="orange--text">{{dataTypeJob3}}</strong></div>
                                  </template>
                                </v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                          <v-row v-if="checkDepositAdd === 'True'">
                            <v-col cols="12" class="pt-0">
                              <v-checkbox
                                :label="`มีมัดจำหรือไม่ : ${dataDepositAdd.toString()}`"
                                false-value="ไม่มี"
                                true-value="มี"
                                v-model="dataDepositAdd"
                                hide-details
                                @change="dataDepositAdd === 'มี' ? panelDeposit = [0] : panelDeposit = []"
                              ></v-checkbox>
                              <!-- <v-text-field v-model="dataDepositAdd" dense outlined readonly label="มีมัดจำหรือไม่"></v-text-field> -->
                            </v-col>
                            <v-col cols="12" class="pt-0" v-if="dataDepositAdd === 'มี'">
                              <v-expansion-panels
                                v-model="panelDeposit"
                                multiple
                              >
                                <v-expansion-panel>
                                  <v-expansion-panel-header>อัพเดทหลักฐานเงินมัดจำ</v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    <v-row justify="center">
                                      <v-col cols="12" class="text-center">
                                        <v-img
                                          aspect-ratio="3"
                                          contain
                                          :src="formAdd.pictureUrlPreviewDeposit"
                                        ></v-img>
                                        <br />
                                        <v-file-input
                                          counter
                                          show-size
                                          accept="image/png, image/jpeg, image/bmp"
                                          prepend-icon="mdi-camera"
                                          label="รูปหลักฐานการมัดจำ"
                                          @change="selectImgAdd"
                                          v-model="filesDepositAdd"
                                        ></v-file-input>
                                      </v-col>
                                    </v-row>
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="pt-0">
                              <v-select
                                v-model="empSelectAdd"
                                :items="empSelectStepAdd"
                                label="พนักงานที่รับนัดหมาย"
                                menu-props="auto"
                                outlined
                                required
                                :rules="[rules.required]"
                                dense
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="pt-0">
                            <v-textarea
                              v-model="remark"
                              outlined
                              label="หมายเหตุเพิ่มเติม"
                              auto-grow
                            ></v-textarea>
                            </v-col>
                          </v-row>
                          <div class="text-center">
                            <v-btn
                              elevation="2"
                              large
                              color="#173053"
                              :loading="loadingAdd"
                              :disabled="loadingAdd"
                              class="white--text"
                              @click="addData()"
                            >
                              <template v-slot:loader>
                                <span class="custom-loader">
                                  <v-icon light>mdi-cached</v-icon>
                                </span>
                              </template>
                              <v-icon color="white" dark left>mdi-checkbox-marked-circle</v-icon>
                              เพิ่ม
                            </v-btn>
                          </div>
                        </v-col>
                      </v-col>
                    </v-row>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- delete -->
          <v-dialog v-model="dialogDelete" persistent max-width="70%">
            <v-card>
              <v-card-title>
                <span class="headline">ลบข้อมูลนี้</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="รหัส Booking No"
                        v-model="formUpdate.bookNo"
                        readonly
                        dense
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
                  dark
                  color="dark darken-1"
                  @click="dialogDelete = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
                  dark
                  color="red darken-1"
                  @click="deleteData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- end delete -->

          <!-- edit -->
          <v-dialog v-model="dialogEdit" persistent :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>นำเข้ากระดานการทำงาน</v-card-title>
              <v-card-text  v-if="dataEditJobReady && statusConfirmJob">
                <v-container>
                  <v-col class="pb-0 pt-0" cols="12" v-if="dataPackage.filter(el => { return el.balanceAmount > 0 }).length > 0 && dataPackageDefault === false">
                    <v-card class="pl-1">
                      <v-subheader>ลูกค้ามี {{dataPackage.filter(el => { return el.balanceAmount > 0 }).length}} แพ็คเกจ</v-subheader>
                      <v-subheader v-show="StatusPackage.packageName">ลูกค้าได้ทำการเลือกแพ็คเกจ {{StatusPackage.packageName}}</v-subheader>
                      <v-slide-group
                        v-model="modelPackageIndexConfirmJob"
                        center-active
                        show-arrows
                        >
                        <v-slide-item v-for="(item, index) in dataPackage.filter(el => { return el.balanceAmount > 0 })" :key="index">
                            <v-card
                            class="ma-2 p-1"
                            width="340"
                            height="100"
                            color="#FFFFFF"
                            elevation="6"
                            :style="item.packageId === packageId && item.token === tokenPackage ? 'border: 1px solid green;' : 'border: 1px solid white;'"
                            >
                            <v-row>
                              <v-col cols="4" class="pr-1">
                                <v-img
                              contain
                              max-height="80"
                              max-width="200"
                              :src="item.packageImg"
                            ></v-img>
                              </v-col>
                              <v-col cols="8" class="pb-6" >
                                <v-row class="font16 headline1">
                                    <v-col class="pl-0 pt-2 pb-0">{{item.packageName}}</v-col>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId !== packageId && item.token !== tokenPackage" color="green" outlined rounded x-small @click="UpdatePackage(item.packageId,'ตกลง',item.packageName, item, item.token), jobCheckPackage = true">ตกลง</v-btn>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId === packageId && item.token !== tokenPackage" color="green" outlined rounded x-small @click="UpdatePackage(item.packageId,'ตกลง',item.packageName, item, item.token), jobCheckPackage = true">ตกลง</v-btn>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId === packageId && item.token === tokenPackage" color="red" outlined rounded x-small @click="UpdatePackage(item.packageId,'ยกเลิก',item.packageName, item, item.token), jobCheckPackage = false">ยกเลิก</v-btn>
                                </v-row>
                                <v-row class="font14 headline1">
                                    <v-col class="pl-0 pt-0 pb-0">จำนวนการใช้  {{item.balanceAmount}} / {{item.amount}} </v-col>
                                </v-row>
                                <v-row class="font14 headline1">
                                    <v-col class="pl-0 pt-0 pb-0">
                                      <VueCustomTooltip label="สามารถใช้ได้" position="is-top" v-if="dateTimestamp <= item.expirePackage">
                                        <v-icon
                                          large
                                          color="teal darken-2"
                                        >
                                          mdi-clock-check
                                        </v-icon>
                                      </VueCustomTooltip>
                                      <VueCustomTooltip label="หมดอายุแล้ว" position="is-top" v-if="dateTimestamp > item.expirePackage">
                                        <v-icon
                                          large
                                          color="red darken-2"
                                        >
                                          mdi-clock-alert
                                        </v-icon>
                                      </VueCustomTooltip>
                                      >> วันหมดอายุ  {{new Date(item.expirePackage * 1000).toLocaleString().substr(0,9)}}
                                    </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                    </v-card>
                    <br>
                  </v-col>
                  <v-col class="pb-0 pt-0" cols="12" v-if="dataPackage.filter(el => { return el.balanceAmount > 0 }).length > 0 && dataPackageDefault === true">
                    <v-card class="pl-1">
                      <v-subheader>ลูกค้ามี {{dataPackage.filter(el => { return el.balanceAmount > 0 }).length}} แพ็คเกจ</v-subheader>
                      <v-subheader v-show="StatusPackage.packageName">ลูกค้าได้ทำการเลือกแพ็คเกจ {{StatusPackage.packageName}}</v-subheader>
                      <v-slide-group
                        v-model="modelPackageIndexConfirmJob"
                        center-active
                        show-arrows
                        >
                        <v-slide-item v-for="(item, index) in dataPackage.filter(el => { return el.balanceAmount > 0 })" :key="index">
                            <v-card
                            class="ma-2 p-1"
                            width="340"
                            height="100"
                            color="#FFFFFF"
                            elevation="6"
                            :style="item.packageId === packageId && item.token === tokenPackage ? 'border: 1px solid green;' : 'border: 1px solid white;'"
                            >
                            <v-row>
                              <v-col cols="4" class="pr-1">
                                <v-img
                              contain
                              max-height="80"
                              max-width="200"
                              :src="item.packageImg"
                            ></v-img>
                              </v-col>
                              <v-col cols="8" class="pb-6" >
                                <v-row class="font16 headline1">
                                    <v-col class="pl-0 pt-2 pb-0">{{item.packageName}}</v-col>
                                    <!-- <v-btn class="mr-4 mt-3" v-if="item.packageId !== packageId" color="green" outlined rounded x-small @click="UpdatePackage(item.packageId,'ตกลง',item.packageName, item)">ตกลง</v-btn>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId === packageId" color="red" outlined rounded x-small @click="UpdatePackage(item.packageId,'ยกเลิก',item.packageName, item)">ยกเลิก</v-btn> -->
                                </v-row>
                                <v-row class="font14 headline1">
                                    <v-col class="pl-0 pt-0 pb-0">จำนวนการใช้  {{item.balanceAmount}} / {{item.amount}} </v-col>
                                </v-row>
                                <v-row class="font14 headline1">
                                    <v-col class="pl-0 pt-0 pb-0">
                                      <VueCustomTooltip label="สามารถใช้ได้" position="is-top" v-if="dateTimestamp <= item.expirePackage">
                                        <v-icon
                                          large
                                          color="teal darken-2"
                                        >
                                          mdi-clock-check
                                        </v-icon>
                                      </VueCustomTooltip>
                                      <VueCustomTooltip label="หมดอายุแล้ว" position="is-top" v-if="dateTimestamp > item.expirePackage">
                                        <v-icon
                                          large
                                          color="red darken-2"
                                        >
                                          mdi-clock-alert
                                        </v-icon>
                                      </VueCustomTooltip>
                                      >> วันหมดอายุ  {{new Date(item.expirePackage * 1000).toLocaleString().substr(0,9)}}
                                    </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                    </v-card>
                    <br>
                  </v-col>
                  <v-col
                    v-for="(item, indexitem) in BookingDataItem"
                    :key="indexitem"
                    cols="12"
                    class="pa-0"
                  >
                    <v-text-field
                      :label="item.fieldName"
                      :value="item.fieldValue"
                      class="pa-0"
                      outlined
                      dense
                      readonly
                    ></v-text-field>
                    <!-- {{item.fieldName}} : {{item.fieldValue}} -->
                  </v-col>
                  <v-form ref="form_update" v-model="validUpdate" lazy-validation>
                  <div v-for="(p, index) in flowfieldNameitem" :key="index">
                    <div class="pa-0" v-if="p.conditionField === ''">
                      <div>
                        <div v-if="p.fieldType == 'text'">
                          <br />
                          <v-text-field
                            v-if="p.fieldName === 'เบอร์โทร'"
                            v-mask="'###-###-####'"
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-else
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                        </div>
                        <div v-if="p.fieldType == 'number'">
                          <br />
                          <!-- <p>{{p.fieldName}}</p> -->
                          <v-text-field
                            v-if="p.fieldName === 'เบอร์โทร'"
                            v-mask="'###-###-####'"
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-else
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                        </div>
                        <v-row>
                          <v-col
                            cols="12"
                            v-if="p.fieldType == 'Autocompletes'"
                            style="padding-top: 0px;padding-bottom: 0px;"
                          >
                          <br />
                            <v-autocomplete
                              v-model="p.fieldValue"
                              :items="JSON.parse(p.optionField)"
                              dense
                              filled
                              :label="p.fieldName"
                              :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            ></v-autocomplete>
                          </v-col>
                          <v-col
                            cols="12"
                            v-if="p.fieldType == 'Selects'"
                            style="padding-top: 0px;padding-bottom: 0px;"
                          >
                          <br />
                            <div>
                              <v-select
                                v-model="p.fieldValue"
                                :items="JSON.parse(p.optionField)"
                                menu-props="auto"
                                :label="p.fieldName"
                                hide-details
                                outlined
                                dense
                                :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                              ></v-select>
                            </div>
                          </v-col>
                        </v-row>
                        <div v-if="p.fieldType == 'Radio'" style="padding:0px;">
                            <br />
                            <v-container fluid style="padding:0px;">
                              <v-radio-group
                                row
                                v-model="p.fieldValue"
                                style="margin:0px;"
                                :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                              >
                              <template v-slot:label> </template>
                              <div
                                v-for="radios in JSON.parse(
                                  p.optionField
                                )"
                                :key="radios.toISOString"
                                class="text-center"
                              >
                                <v-radio
                                  :label="radios.text"
                                  dense
                                  :value="radios.value"
                                ></v-radio>
                              </div>
                            </v-radio-group>
                          </v-container>
                        </div>
                      </div>
                    </div>
                    <div  v-if="p.conditionField !== '' && flowfieldNameitem.filter(row => {return (row.fieldId === parseInt(p.conditionField));}).length > 0">
                      <div v-if="p.conditionValue === flowfieldNameitem.filter(row => {return (row.fieldId === parseInt(p.conditionField));})[0].fieldValue">
                        <div
                          cols="12"
                          v-if="p.fieldType == 'Autocompletes'"
                        >
                          <v-autocomplete
                            v-model="p.fieldValue"
                            :items="JSON.parse(p.optionField)"
                            dense
                            filled
                            :label="p.fieldName"
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                          ></v-autocomplete>
                        </div>
                          <div v-if="p.fieldType == 'Selects'">
                            <v-select
                              v-model="p.fieldValue"
                              :items="JSON.parse(p.optionField)"
                              menu-props="auto"
                              :label="p.fieldName"
                              dense
                              hide-details
                              outlined
                              :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            ></v-select>
                          </div>
                          <div v-if="p.fieldType === 'Radio'" style="padding:0px;">
                            <br />
                            <v-container fluid style="padding:0px;">
                              <v-radio-group
                                row
                                v-model="p.fieldValue"
                                style="margin:0px;"
                                :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                              >
                                <template v-slot:label> </template>
                                <div
                                  v-for="radios in JSON.parse(
                                    p.optionField
                                  )"
                                  :key="radios.toISOString"
                                  class="text-center"
                                >
                                  <v-radio
                                    :label="radios.text"
                                    dense
                                    :value="radios.value"
                                  ></v-radio>
                                </div>
                              </v-radio-group>
                            </v-container>
                          </div>
                      </div>
                    </div>
                    <div  v-if="p.conditionField === 'flow' ">
                      <div v-if="parseInt(p.conditionValue) === parseInt(formAdd.flowId) ">
                        <div v-if="p.fieldType == 'text'">
                          <br />
                          <v-text-field
                            v-if="p.fieldName === 'เบอร์โทร'"
                            v-mask="'###-###-####'"
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-else
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                        </div>
                        <div v-if="p.fieldType == 'number'">
                          <br />
                          <v-text-field
                            v-if="p.fieldName === 'เบอร์โทร'"
                            v-mask="'###-###-####'"
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-else
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                            outlined
                          ></v-text-field>
                        </div>
                        <div
                          cols="12"
                          v-if="p.fieldType == 'Autocompletes'"
                        >
                          <v-autocomplete
                            v-model="p.fieldValue"
                            :items="JSON.parse(p.optionField)"
                            dense
                            filled
                            :label="p.fieldName"
                            :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                          ></v-autocomplete>
                        </div>
                          <div v-if="p.fieldType == 'Selects'">
                            <v-select
                              v-model="p.fieldValue"
                              :items="JSON.parse(p.optionField)"
                              menu-props="auto"
                              :label="p.fieldName"
                              dense
                              :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                              hide-details
                              outlined
                            ></v-select>
                          </div>
                          <div v-if="p.fieldType === 'Radio'" style="padding:0px;">
                            <br />
                            <v-container fluid style="padding:0px;">
                              <v-radio-group
                                row
                                v-model="p.fieldValue"
                                style="margin:0px;"
                                :rules="p.requiredField === 'True' ? [rules.required] : [true]"
                              >
                                <template v-slot:label> </template>
                                <div
                                  v-for="radios in JSON.parse(
                                    p.optionField
                                  )"
                                  :key="radios.toISOString"
                                  class="text-center"
                                >
                                  <v-radio
                                    :label="radios.text"
                                    dense
                                    :value="radios.value"
                                  ></v-radio>
                                </div>
                              </v-radio-group>
                            </v-container>
                          </div>
                      </div>
                    </div>
                  </div>
                  <br>
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="6" class="pb-0" v-if="statusShowDateConfiremjob">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="endDate"
                            label="วันที่คาดว่าจะเสร็จ"
                            persistent-hint
                            dense
                            outlined
                            required
                            :rules="[rules.required]"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                            readonly
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          no-title
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="6" lg="6" class="pb-0" v-if="statusShowDateConfiremjob">
                          <!-- <v-select
                          v-model="endTime"
                          :items="timeavailable"
                          label="เวลา"
                          menu-props="auto"
                          outlined
                          dense
                          required
                          :rules ="[rules.required]"
                        ></v-select> -->
                        <v-select
                          v-model="endTime"
                          :items="timeavailable"
                          label="เวลา"
                          item-text="text"
                          item-value="text"
                          persistent-hint
                          return-object
                          outlined
                          dense
                          required
                          :rules ="[rules.required]"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-select
                        v-model="empSelectJob"
                        :items="empSelectStepAdd"
                        label="พนักงานที่นำเข้ากระดานทำงาน"
                        menu-props="auto"
                        outlined
                        required
                        :rules="[rules.required]"
                        dense
                      ></v-select>
                    </v-col>
                  </v-row>
                  </v-form>
                  <div class="text-center">
                    <v-btn
                      elevation="2"
                      small
                      dark
                      color="#173053"
                      @click="addDataJob()"
                    >
                      <v-icon left>mdi-checkbox-marked-circle</v-icon>
                      นำเข้าตารางงาน
                    </v-btn>
                    <v-btn small color="red" dark @click="dialogEdit = false, getDataDefault(), searchOther = '', showColorSearch = false, statusSearch = 'no'">
                      <v-icon color="#173053">mdi-close</v-icon> ยกเลิก
                    </v-btn>
                  </div>
                </v-container>
              </v-card-text>
              <v-card-text  v-if="dataEditJobReady && !statusConfirmJob">
                <strong><h2>เนื่องจากวันที่นัดหมาย {{format_dateNotime(dueDate)}} ไม่ตรงกับวันที่ปัจจุบัน</h2></strong>
                <strong style="color: red;"><h3>กรุณาตรวจสอบข้อมูล หรือ เปลี่ยนเวลานัดหมายใหม่</h3></strong>
                <div class="text-center">
                  <v-btn small color="red" dark @click="dialogEdit = false, getDataDefault(), searchOther = '', showColorSearch = false, statusSearch = 'no'">
                    <v-icon color="#173053">mdi-close</v-icon> ปิดหน้าต่าง
                  </v-btn>
                </div>
              </v-card-text>
              <v-card-text  v-if="!dataEditJobReady">
                <v-container>
                  <div class="text-center">
                    <v-progress-circular
                      :size="50"
                      color="primary"
                      indeterminate
                    ></v-progress-circular>

                    <v-progress-circular
                      :width="3"
                      color="red"
                      indeterminate
                    ></v-progress-circular>

                    <v-progress-circular
                      :size="70"
                      :width="7"
                      color="purple"
                      indeterminate
                    ></v-progress-circular>

                    <v-progress-circular
                      :width="3"
                      color="green"
                      indeterminate
                    ></v-progress-circular>

                    <v-progress-circular
                      :size="50"
                      color="amber"
                      indeterminate
                    ></v-progress-circular>
                    </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- end -->

          <v-dialog v-model="dialogJob" persistent :max-width="dialogwidth">
            <v-card
              style="background: linear-gradient(180deg, #FFFFFF 0%, #E1F3FF 100%);">
                <v-container >
                  <v-row >
                    <v-col cols="12" v-if="checkShowSelectUser">
                      <div class=" text-center">
                        <v-tabs
                          v-model="tabSelectUser"
                          background-color="#1B437C"
                          centered
                          dark
                          icons-and-text
                        >
                          <v-tabs-slider></v-tabs-slider>
                          <v-tab>
                            ลูกค้าที่นัดหมาย
                            <v-icon>mdi-card-account-phone</v-icon>
                          </v-tab>

                          <v-tab>
                            แสกน QR / Skip
                            <v-icon>mdi-qrcode-edit</v-icon>
                          </v-tab>

                          <v-tab-item style="background: linear-gradient(180deg, #FFFFFF 0%, #E1F3FF 100%);">
                            <br>
                            <v-row justify="center" class="spacer" no-gutters>
                              <v-col cols="4" sm="2" md="1">
                                <v-avatar
                                  size="60px"
                                >
                                  <img
                                    alt="Avatar"
                                    :src="dataSelectUser.picture"
                                  >
                                </v-avatar>
                              </v-col>
                              <v-col cols="6" sm="4" md="2">คุณ {{dataSelectUser.name}}</v-col>
                            </v-row>
                            <v-row justify="center" class="spacer" no-gutters>
                              <v-col col="12"><strong>ลูกค้าที่นัดหมาย</strong></v-col>
                            </v-row>
                          </v-tab-item>
                          <v-tab-item style="background: linear-gradient(180deg, #FFFFFF 0%, #E1F3FF 100%);">
                            <br>
                            <div v-if="jobitem.length > 0 && userId === ''" class="avatar text-center">
                              <qrcode-vue :value="value" :size="size" level="H" :foreground="foreground" />
                            </div>
                          </v-tab-item>
                        </v-tabs>
                      </div>
                    </v-col>
                    <v-col cols="12" v-if="!checkShowSelectUser">
                      <div class=" text-center">
                      <br>
                        <br>
                        <h2 style="font-weight: 900; color:#FFA000">ติดตามสถานะ!</h2>
                        <qrcode-vue v-if="userId === ''" :value="value" :size="size" level="H" :foreground="foreground" />
                        <template v-if="jobitem.length > 0">
                         <div v-if="userId !== ''" class="avatar text-center">
                            <v-avatar v-if="memberPicture !== ''" size="120" style="border:5px solid #FFFFFF;">
                                <img :src= memberPicture>
                            </v-avatar>
                            <v-avatar v-if="memberPicture === '' && userId === 'user-skip' && jobitem[0].recordStatus === 'D'" size="120" style="border:5px solid #FFFFFF;">
                                <v-img
                                  class="v_text_add"
                                  :src="require('@/assets/OtherP.svg')"
                                ></v-img>
                            </v-avatar>
                            <!-- <p class="text-center">{{profile.displayName}}</p> -->
                        </div>
                        </template>
                         <div v-if="jobitem.length > 0" class="avatar text-center">
                           <qrcode-vue v-if="userId === 'user-skip' && jobitem[0].recordStatus === 'N'" :value="value" :size="size" level="H" :foreground="foreground" />
                        </div>
                    </div>
                  </v-col>
                </v-row>
                </v-container>
                <v-row >
                  <v-col cols="12">
                      <v-container class="text-center" >
                        <v-container>
                            <div v-for="(p , index) in jobitem" :key="index">
                              <h4>{{p.name}} : {{p.value}}</h4>
                              <!-- <h4 v-if="p.showCard === 'True' ">{{p.name}} : {{p.value}}</h4> -->
                            </div>
                            <div v-if="jobitem.length > 0">
                              <v-btn small class="ma-2" color="teal" v-if="jobitem[0].recordStatus === 'D'" @click="setBookingingAgain()" dark>
                                  นัดหมายอีกครั้ง
                                <v-icon dark right>
                                  mdi-notebook-check
                                </v-icon>
                              </v-btn>
                              <strong style="color: red;" v-if="jobitem[0].recordStatus === 'D'"><h2>รายการนี้ปิดไปแล้ว</h2></strong>
                            </div>
                            <div>
                              <v-btn small class="ma-2" color="success" v-if="userId !== '' && recordStatusJob === 'N'" @click="dialogCloseJob = true" dark>
                                  ปิดงานนี้
                                <v-icon dark right>
                                  mdi-cash-usd-outline
                                </v-icon>
                              </v-btn>
                            </div>
                        </v-container>
                        <template v-if="!checkShowSelectUser">
                          <v-btn small class="ma-2" color="success" v-if="userId === ''" @click="pushMsgSelectUser" dark>
                            ส่ง QR Code
                          <v-icon dark right>
                          mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>
                        <v-btn small class="ma-2" color="primary" v-if="userId === ''" @click="jobConfirm" dark>
                            SKIP
                          <v-icon dark right>
                          mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>
                        <v-btn small class="ma-2" color="error" @click="dialogJob = false" dark >
                        Close
                        <v-icon dark right>
                            mdi-minus-circle
                        </v-icon>
                        </v-btn>
                        </template>
                        <template v-if="checkShowSelectUser">
                        <v-btn small class="ma-2" color="success" v-if="userId === '' && tabSelectUser === 1" @click="pushMsgSelectUser" dark>
                            ส่ง QR Code
                          <v-icon dark right>
                          mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>
                        <v-btn small class="ma-2" color="primary" v-if="userId === '' && tabSelectUser === 1" @click="jobConfirm" dark>
                            SKIP
                          <v-icon dark right>
                          mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>
                        <v-btn small class="ma-2" color="primary" v-if="tabSelectUser === 0 || tabSelectUser === null" @click="jobConfirmUser" dark>
                            ลูกค้าท่านเดียวกับที่นัดหมาย
                          <v-icon dark right>
                            mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>
                        <v-btn small class="ma-2" color="error" @click="dialogJob = false" dark >
                            Close
                            <v-icon dark right>
                                mdi-minus-circle
                            </v-icon>
                        </v-btn>
                        </template>
                    </v-container>
                  </v-col>
                </v-row>
              </v-card>
          </v-dialog>

          <v-dialog v-model="dialogChange" persistent :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>เปลี่ยนเวลานัดหมาย</v-card-title>
              <v-form ref="form_change" v-model="validChange" lazy-validation>
                <v-card-text v-if="dataChangeReady">
                  <v-container>
                    <v-row>
                      <v-col cols= "12">
                        <v-textarea
                          v-model="remark"
                          outlined
                          v-if="checkSelectText === 'confirm'"
                          label="หมายเหตุเพิ่มเติม"
                          auto-grow
                        ></v-textarea>
                      </v-col>
                  </v-row>
                   <!-- <v-row v-if="limitBookingCheck === 'True'">
                    <v-col cols="12" md="6" lg="6">
                      <h4 class="text-center">ต้องการใช้ Limit การจองหรือไม่</h4>
                      <v-row align="center">
                        <v-checkbox
                          false-value="False"
                          true-value="True"
                          v-model="limitBookingSelect"
                          hide-details
                          class="shrink ml-6 mr-0 mt-3 mb-6"
                        ></v-checkbox>
                        <v-text-field class="mt-3" dense outlined :value="limitBookingSelect === 'True' ? 'ต้องการ' : 'ไม่ต้องการ'" readonly label="Limit การจอง"></v-text-field>
                         </v-row>
                    </v-col>
                    <v-col cols="12" md="6" lg="6" v-if="limitBookingSelect === 'True'">
                      <v-select
                        v-model="selectCountBookingLimit"
                        :items="[1,2,3,4,5,6,7,8]"
                        label="จำนวนชั่วโมง Limit"
                        outlined
                        dense
                        class="mt-10"
                        @change="setCountTime(dataChange)"
                      ></v-select>
                    </v-col>
                   </v-row>
                   <h4 v-if="limitBookingSelect === 'True'" class="text-center">ตารางนี้แสดงผลลัพธ์เมื่อท่านเลือกจำนวนชั่วโมง / Limit ที่ตั้งไว้</h4>
                   <v-row v-if="limitBookingSelect === 'True' && dataLimitBookingDate.length > 0">
                    <v-col cols="12">
                      <v-data-table
                        :headers="headersLimitBookingDate"
                        :items="dataLimitBookingDate"
                        :items-per-page="10"
                        dense
                        class="elevation-1"
                      >
                        <template v-slot:[`item.countBookingLimit`]="{ item }">
                          <v-chip
                            class="ma-2 white--text"
                            :color="item.color"
                          >
                            <strong>{{item.countBookingLimit}}</strong>
                          </v-chip>
                        </template>
                      </v-data-table>
                    </v-col>
                   </v-row>
                   <v-row v-if="limitBookingSelect === 'True' && dataLimitBookingDate.length === 0">
                      <v-col cols="12" class="text-center">
                      <v-alert
                        type="success"
                      >
                        <strong>ท่านสามารถนัดหมายในวันที่ : {{formChange.date}} ได้ทุกเวลา</strong>
                      </v-alert>
                      </v-col>
                    </v-row> -->
                   <v-divider></v-divider>
                  <v-row>
                    <v-col cols="12" md="6" lg="6">
                      <v-menu
                        v-model="menuDateChange"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formChange.date"
                            label="วันที่"
                            prepend-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="formChange.date"
                          :allowed-dates="allowedDatesChange"
                          @input="menuDateChange = false, getDataLimitBooking(dataChange)"
                          :min="
                            new Date(
                              Date.now() -
                                new Date().getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .substr(0, 10)
                          "
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col  cols="12" md="6" lg="6">
                         <v-select
                            v-model="formChange.time"
                            :items="timeavailable"
                            label="เวลา"
                            item-text="text"
                            item-value="text"
                            persistent-hint
                            return-object
                            outlined
                            dense
                            required
                            @change="setCountTime(dataChange)"
                            :rules ="[rules.required]"
                          ></v-select>
                    </v-col>
                  </v-row>
                  <div class="text-center">
                    <v-btn
                      elevation="10"
                      color="green darken-1"
                      v-if="checkSelectText !== 'cancel'"
                      dark
                      small
                      :disabled="!validChange"
                      @click="changeChk(dataChange, 'confirm')"
                      >เปลี่ยนวันเวลานัดหมาย (ยืนยัน)</v-btn
                    >
                    <v-btn
                      elevation="10"
                      color="#173053"
                      dark
                      v-if="checkSelectText !== 'confirm'"
                      small
                      :disabled="!validChange"
                      @click="changeChk(dataChange, 'change')"
                      >เปลี่ยนวันเวลานัดหมาย</v-btn
                    >
                    <v-btn
                      elevation="10"
                      color="#173053"
                      outlined
                      style="background-color:#FFFFFF"
                      small
                      @click="dialogChange = false"
                      >ยกเลิก</v-btn
                    >
                  </div>
                  </v-container>
                </v-card-text>
                <div class="text-center" v-if="!dataChangeReady">
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :width="3"
                    color="red"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :width="3"
                    color="green"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :size="50"
                    color="amber"
                    indeterminate
                  ></v-progress-circular>
                  </div>
                <br />
              </v-form>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogInfo" :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title><b>รายละเอียดนัดหมาย</b></v-card-title>
              <v-card-text v-if="dataInfo">
                <v-row>
                  <v-col class="text-right">ประเภทบริการ</v-col>
                  <v-col class="text-left">{{dataInfo.flowName}}</v-col>
                </v-row>
                <v-row>
                  <v-col class="text-right">วันที่ต้องการเข้ารับบริการ</v-col>
                  <v-col class="text-left">{{dataInfo.dueDate}}</v-col>
                </v-row>
                <v-row v-for="(row, index) in BookingDataItem" v-bind:key="index">
                  <v-col class="text-right">{{row.fieldName}}</v-col>
                  <v-col class="text-left">{{row.fieldValue}}</v-col>
                </v-row><br>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogRemove" :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>
                ยกเลิกรายการนี้
              </v-card-title>
              <v-form ref="form_remove" v-model="validRemove" lazy-validation>
                <v-container>
              <v-card-text v-if="dataCancelReady">
                <v-row>
                  <v-col cols= "12">
                  <v-textarea
                    v-model="remarkRemove"
                    outlined
                    label="หมายเหตุในการยกเลิก"
                    auto-grow
                    required
                    :rules="[rules.required]"
                  ></v-textarea>
                  </v-col>
                  <v-col cols= "12">
                  <v-select
                    v-model="empSelect"
                    :items="empSelectStep"
                    label="พนักงานที่รับนัดหมาย"
                    menu-props="auto"
                    outlined
                    dense
                  ></v-select>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-btn
                    elevation="10"
                    color="#173053"
                    dark
                    small
                    @click="cancelChk()"
                    >ยกเลิกรายการนี้</v-btn
                  >
                  <v-btn
                    elevation="10"
                    color="#173053"
                    outlined
                    style="background-color:#FFFFFF"
                    small
                    @click="dialogRemove = false"
                    >ยกเลิก</v-btn
                  >
                </div>
              </v-card-text>
              <div class="text-center" v-if="!dataCancelReady">
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :width="3"
                    color="red"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :width="3"
                    color="green"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :size="50"
                    color="amber"
                    indeterminate
                  ></v-progress-circular>
                  </div>
              </v-container>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogRemarkReturn" :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>
                หมายเหตุเรียกกลับ
              </v-card-title>
              <!-- <v-form ref="form_remove" v-model="validRemove" lazy-validation> -->
                <v-container>
              <v-card-text>
                <v-row>
                  <v-col cols= "12" class="pb-0">
                    <v-menu
                      ref="menuReturn"
                      v-model="menuReturn"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateReturn"
                          label="วันที่เรียกลูกค้ากลับมา"
                          persistent-hint
                          dense
                          outlined
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                          readonly
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dateReturn"
                        no-title
                        @input="menuReturn = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols= "12">
                  <v-textarea
                    v-model="remarkReturn"
                    outlined
                    label="หมายเหตุเรียกกลับ"
                    auto-grow
                  ></v-textarea>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-btn
                    elevation="10"
                    color="#173053"
                    dark
                    small
                    @click="onSaveRemarkReturn()"
                    >อัพเดทหมายเหตุ</v-btn
                  >
                  <v-btn
                    elevation="10"
                    color="#173053"
                    outlined
                    style="background-color:#FFFFFF"
                    small
                    @click="dialogRemarkReturn = false"
                    >ยกเลิก</v-btn
                  >
                </div>
              </v-card-text>
              </v-container>
              <!-- </v-form> -->
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogRemark" :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>
                หมายเหตุเพิ่มเติม
              </v-card-title>
              <!-- <v-form ref="form_remove" v-model="validRemove" lazy-validation> -->
                <v-container>
              <v-card-text>
                <v-row>
                  <v-col cols= "12">
                  <v-textarea
                    v-model="remark"
                    outlined
                    label="หมายเหตุเพิ่มเติม"
                    auto-grow
                  ></v-textarea>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-btn
                    elevation="10"
                    color="#173053"
                    dark
                    small
                    @click="onSaveRemark()"
                    >หมายเหตุเพิ่มเติม</v-btn
                  >
                  <v-btn
                    elevation="10"
                    color="#173053"
                    outlined
                    style="background-color:#FFFFFF"
                    small
                    @click="dialogRemark = false"
                    >ยกเลิก</v-btn
                  >
                </div>
              </v-card-text>
              </v-container>
              <!-- </v-form> -->
            </v-card>
          </v-dialog>
          <!-- data table -->
          <v-col cols="12" >
            <BookingQueue :branchParent="branch" :masBranchIDParent="masBranchID" :drawerParent="drawer" :menu1Parent="menu1" :timeTableParent="timeTable" :rulesParent="rules" :masterTimeParent="masterTime" :dataItemTimesChangeParent="dataItemTimesChange" :getTimesChangeParent="getTimesChange" :exportExcelParent="exportExcel" :exportExcelMazdaParent="exportExcelMazda" :dataRemoveExportParent="dataRemoveExport" :exportExcelRemoveParent="exportExcelRemove" :toggleParent="toggle" @updateTimeTable="updateTimeTablefromChild"></BookingQueue>
            <v-card elevation="7" v-if="dataReady">
              <v-card-text>
              <v-row>
                <v-col col="auto">
                  <v-btn
                  v-if="dataItem.length > 0"
                  color="blue-grey"
                  class="ma-2 white--text"
                  @click="toggle"
                  small
                >
                  ตรวจสอบคิวจองรายวัน
                  <v-icon
                    right
                    dark
                  >
                    mdi-table-eye
                  </v-icon>
                </v-btn>
                <v-btn
                  color="blue-grey"
                  class="ma-2 white--text"
                  small
                  @click="addDataSet()"
                >
                  ตรวจสอบคิวจองรายเดือน
                </v-btn>
                </v-col>
                <v-col class="text-right" col="auto">
                  <v-text-field
                    dense
                    v-model="searchOther"
                    append-icon="mdi-text-box-search"
                    label="ค้นหาทั้งหมด"
                    :color="showColorSearch ? 'green' : 'info'"
                    @click:append="searchAny(), showColorSearch = true, statusSearch = 'yes', dataReady = false"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="text-right" cols="auto"></v-col>
              </v-row>
              </v-card-text>
              <v-card-title>
                <v-text-field
                  v-model="searchAll2"
                  append-icon="mdi-magnify"
                  label="ค้นหา"
                  single-line
                  dense
                  hide-details
                ></v-text-field>
                <v-menu
                  v-model="menuDateSearch"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="filters"
                      label="ค้นหาจากวันที่นัดหมาย"
                      prepend-icon="mdi-calendar"
                      readonly
                      outlined
                      class="pa-4"
                      append-icon="mdi-magnify"
                      dense
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="filters"
                    @input="menuDateSearch = false"
                  ></v-date-picker>
                </v-menu>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="red"
                      fab
                      class="mb-7"
                      dark
                      small
                      @click.stop="filters=''"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon> mdi-calendar-remove </v-icon>
                    </v-btn>
                  </template>
                  <span>เคลียร์ ค้นหาจากวันที่นัดหมาย</span>
                </v-tooltip>
                <!-- <v-icon color="#64DD17" small @click="filters=''">call</v-icon> -->
              </v-card-title>
              <v-card-text>
                <v-data-table
                  :headers="columns"
                  :items="dataItem"
                  v-if="!selectedStatus"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                  <template v-slot:[`item.cusName`]="{ item }">
                    <a @click.stop="openInfo(item)" style="cursor:hand"><u>{{ item.cusName }}</u></a>
                  </template>
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.dueDate`]="{ item }">
                    {{ format_date(item.dueDate) }}
                  </template>
                  <template v-slot:[`item.action2`]="{ item }">
                    <v-row>
                      <v-col>
                        <v-chip
                          filter
                          dark
                          v-if="item.statusBt === 'confirm' || item.statusBt === 'confirmJob'"
                          :color="(item.remarkConfirm1) ? 'green darken-2' : 'grey darken-1'"
                          v-model="item.remarkConfirm1"
                          @click.stop="item.remarkConfirm1=!item.remarkConfirm1;confirmRemark(item, 'inAdvance')"
                        >
                          1 วัน
                        </v-chip>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-slot:[`item.action3`]="{ item }">
                    <v-row>
                      <v-col>
                        <v-chip
                          filter
                          dark
                          :color="(item.fastTrack) ? 'green darken-2' : 'grey darken-1'"
                          v-model="item.fastTrack"
                          @click.stop="item.fastTrack=!item.fastTrack;confirmRemark(item, 'fastTrack')"
                        >
                          {{dataTypeJob3}}
                        </v-chip>
                      </v-col>
                      <v-col>
                        <v-chip
                          filter
                          dark
                          :color="(item.extraJob) ? 'green darken-2' : 'grey darken-1'"
                          v-model="item.extraJob"
                          @click.stop="item.extraJob=!item.extraJob;confirmRemark(item, 'extraJob')"
                        >
                          {{dataTypeJob2}}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <!-- confirm -->
                    <v-btn
                      color="success"
                      fab
                      id="v-step-2"
                      v-if="item.statusBt !== 'confirmJob'"
                      :disabled="item.chkConfirm"
                      small
                      @click.stop="confirmChk(item)"
                    >
                      <v-icon dark> mdi-phone-check </v-icon>
                    </v-btn>
                    <v-btn
                      color="error"
                      fab
                      id="v-step-2"
                      v-if="item.statusBt !== 'confirmJob'"
                      small
                      :disabled="item.chkCancel"
                      @click.stop="setDataRemove(item)"
                      title="ยกเลิกนัด"
                    >
                      <v-icon dark> mdi-phone-cancel </v-icon>
                    </v-btn>
                    <v-tooltip bottom v-if="item.statusBt !== 'confirmJob'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          avatar
                          bordered
                          overlap
                          :content="item.countChangeTime"
                          color="warning"
                          class="mr-1"
                          style="cursor: pointer"
                        >
                          <v-btn
                            color="warning"
                            fab
                            small
                            @click.stop="setDataChang(item)"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon> mdi-calendar-clock </v-icon>
                          </v-btn>
                        </v-badge>
                      </template>
                      <span>เปลี่ยนเวลานัดหมาย</span>
                    </v-tooltip>

                    <v-btn
                      color="primary"
                      fab
                      v-if="item.statusBt === 'confirm'"
                      small
                      @click.stop="(dialogEdit = true), getBookingData(item), checkTimeFlow(item)"
                    >
                      <v-icon dark> mdi-account-plus </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      v-if="item.statusBt === 'confirmJob' || item.statusBt === 'cancel'"
                      fab
                      small
                      @click.stop="(dialogDelete = true), getDataById(item)"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                    <v-btn
                      color="info"
                      dark
                      v-if="item.statusBt === 'confirmJob'"
                      fab
                      small
                      @click.stop="(dialogJob = true), getjob(item)"
                    >
                      <v-icon> mdi-qrcode-scan </v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
                <v-data-table
                  :headers="columnsSelected"
                  :items="filteredSelect"
                  v-if="selectedStatus"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                  <!-- <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.dueDate`]="{ item }">
                    {{ (item.dueDate) }}
                  </template> -->
                  <template v-slot:[`item.cusName`]="{ item }">
                    <v-row>
                      <v-col cols="12">
                        <v-row>
                          <v-col col="auto" class="text-ceter" v-if="item.userId === 'user-skip' || item.userId === '' || item.userId === null">
                             {{ item.cusName }}
                          </v-col>
                          <v-col col="auto" class="text-ceter" v-else>
                            <a @click.stop="openHistory(item)" style="cursor:hand"><u>{{ item.cusName }}</u></a>
                          </v-col>
                          <v-col col="auto" class="text-left">
                            <v-btn
                              fab
                              dark
                              x-small
                              color="teal"
                              @click="getTagData(), dialogTag = true, tagData = item.memberDataTag, bookNo = item.bookNo, memberId = item.memberId"
                            >
                              <v-icon dark>
                                mdi-tag-plus
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" class="pt-0"  v-if="item.memberDataTag.length > 0">
                        <v-chip-group
                          active-class="primary--text"
                          column
                        >
                          <v-chip
                            text-color="white" color="cyan"
                            v-for="(item , index) in item.tagDataShow" :key="index"
                          >
                            <v-avatar left>
                              <v-icon>mdi-tag-multiple</v-icon>
                            </v-avatar>
                            {{ item.text }}
                          </v-chip>
                        </v-chip-group>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-slot:[`item.remarkReturn`]="{ item }">
                    <a v-if="item.remarkReturn !== ''" @click.stop="openRemarkReturn(item)" style="cursor:hand"><u>{{ item.remarkReturn }}</u></a>
                    <v-btn
                      color="purple"
                      small
                      v-if="item.remarkReturn === ''"
                      dark
                      @click.stop="openRemarkReturn(item)"
                    >
                      <v-icon left dark> mdi-playlist-edit </v-icon>
                      เพิ่มหมายเหตุเรียกกลับ
                    </v-btn>
                  </template>
                  <template v-slot:[`item.remark`]="{ item }">
                    <a v-if="item.remark !== ''" @click.stop="openRemark(item)" style="cursor:hand"><u>{{ item.remark }}</u></a>
                    <v-btn
                      color="teal"
                      small
                      v-if="item.remark === ''"
                      dark
                      @click.stop="openRemark(item)"
                    >
                      <v-icon left dark> mdi-playlist-edit </v-icon>
                      เพิ่มหมายเหตุ
                    </v-btn>
                  </template>
                  <template v-slot:[`item.action4`]="{ item }">
                    <template v-if="item.depositCheckStatus === 'True'">
                    <v-chip
                      filter
                      dark
                      v-if="item.depositStatus === 'False'"
                      color="grey darken-1"
                      @click="dialogDeposit = true, bookNo = item.bookNo"
                    >
                      อัพเดทสถานะเงินมัดจำ
                    </v-chip>
                    <v-row v-if="item.depositStatus === 'True'">
                      <!-- <v-col col="auto">
                        <v-avatar color="primary" size="40" v-if="item.depositImge !== ''">
                          <img :src="item.depositImge" alt="img"/></v-avatar>
                        <v-avatar color="error" size="40" v-else>
                          <v-icon dark>
                            mdi-image-edit
                          </v-icon>
                        </v-avatar>
                      </v-col> -->
                      <v-col col="auto">
                        <v-chip
                          filter
                          dark
                          color="green darken-1"
                          @click="dialogDeposit = true, bookNo = item.bookNo, statusDeposit = true, pictureUrlPreviewDeposit = item.depositImge || ''"
                        >
                          แก้ไขสถานะเงินมัดจำ
                        </v-chip>
                      </v-col>
                    </v-row>
                    </template>
                  </template>
                  <template v-slot:[`item.action2`]="{ item }">
                    <v-row>
                      <v-col>
                        <v-chip
                          filter
                          dark
                          v-if="item.statusBt === 'confirm' || item.statusBt === 'confirmJob'"
                          :color="(item.remarkConfirm1) ? 'green darken-2' : 'grey darken-1'"
                          v-model="item.remarkConfirm1"
                          @click.stop="item.remarkConfirm1=!item.remarkConfirm1;confirmRemark(item, 'inAdvance')"
                        >
                          1 วัน
                        </v-chip>
                      </v-col>
                      <!-- <v-col>
                        <v-chip
                          filter
                          dark
                          v-if="item.statusBt === 'confirm' || item.statusBt === 'confirmJob'"
                          :color="(item.remarkConfirm2) ? 'green darken-2' : 'grey darken-1'"
                          v-model="item.remarkConfirm2"
                          @click.stop="item.remarkConfirm2=!item.remarkConfirm2;confirmRemark(item, 'inDay')"
                        >
                          30 นาที
                        </v-chip>
                      </v-col> -->
                    </v-row>
                  </template>
                  <template v-slot:[`item.action3`]="{ item }">
                    <v-row>
                      <v-col>
                        <v-chip
                          filter
                          dark
                          :color="(item.fastTrack) ? 'green darken-2' : 'grey darken-1'"
                          v-model="item.fastTrack"
                          @click.stop="item.fastTrack=!item.fastTrack;confirmRemark(item, 'fastTrack')"
                        >
                          {{dataTypeJob3}}
                        </v-chip>
                      </v-col>
                      <v-col>
                        <v-chip
                          filter
                          dark
                          :color="(item.extraJob) ? 'green darken-2' : 'grey darken-1'"
                          v-model="item.extraJob"
                          @click.stop="item.extraJob=!item.extraJob;confirmRemark(item, 'extraJob')"
                        >
                          {{dataTypeJob2}}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <!-- confirm -->
                    <VueCustomTooltip label="ดูแผนที่" position="is-top" v-if="item.addressLatLong !== null">
                    <!-- <VueCustomTooltip label="ดูแผนที่" :position="filteredSelect.length === 1 ? 'is-top' : 'is-bottom'" v-if="item.addressLatLong !== null"> -->
                      <v-btn
                          color="blue-grey darken-1"
                          fab
                          small
                          dark
                          @click.stop="setShowMap(item)"
                        >
                          <v-icon dark> mdi-map-marker-radius-outline </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="แก้ไขข้อมูล" position="is-top">
                        <v-btn
                          color="yellow"
                          fab
                          small
                          @click.stop="setDataEdit(item)"
                        >
                          <v-icon dark> mdi-tools </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="กลับไปสถานะก่อนหน้า" position="is-top"  v-if="item.statusBt === 'confirm'">
                        <v-btn
                          color="indigo"
                          fab
                          small
                          @click.stop="updateStatusBookingTransaction(item)"
                        >
                          <v-icon dark> mdi-skip-backward </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="รับเข้าบริการ" position="is-top"  v-if="item.statusBt === 'confirm'">
                        <v-btn
                          color="primary"
                          fab
                          small
                          @click.stop="(dialogEdit = true), getBookingDataJob(item, 'qrcode')"
                        >
                          <v-icon dark> mdi-account-plus </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="Copy Link (ผูกลูกค้า)" position="is-top"  v-if="item.statusBt === 'confirm' && (item.userId === 'user-skip' || item.userId === '' || item.userId === null)">
                        <v-btn
                          color="cyan"
                          fab
                          small
                          v-clipboard:success="onCopySuccess"
                          v-clipboard:copy="'https://liff.line.me/1656581804-7KRQyqo5/ConfirmUser?bookNo=' + item.bookNo + '&shopId=' + item.shopId"
                        >
                          <v-icon dark> mdi-content-copy </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="ยืนยันนัดหมาย" position="is-top" v-if="item.statusBt !== 'confirmJob' && item.statusBt !== 'confirm'">
                        <v-btn
                          color="success"
                          fab
                          :disabled="item.chkConfirm"
                          small
                          @click.stop="confirmChk(item)"
                        >
                          <v-icon dark> mdi-phone-check </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="เปลี่ยนเวลานัดหมาย" position="is-top" v-if="item.statusBt !== 'confirmJob'">
                        <v-badge
                          avatar
                          bordered
                          overlap
                          :content="item.countChangeTime"
                          :value="item.countChangeTime"
                          color="warning"
                          class="mr-1"
                          style="cursor: pointer"
                        >
                          <v-btn
                            color="warning"
                            fab
                            small
                            @click.stop="setDataChang(item)"
                          >
                            <v-icon> mdi-calendar-clock </v-icon>
                          </v-btn>
                        </v-badge>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="ยกเลิกนัดหมาย" position="is-top" v-if="item.statusBt !== 'cancel' && item.statusBt !== 'confirmJob'">
                        <v-btn
                          color="error"
                          fab
                          small
                          :disabled="item.chkCancel"
                          @click.stop="setDataRemove(item)"
                        >
                          <v-icon dark> mdi-phone-cancel </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <VueCustomTooltip label="QR Code สำหรับให้ลูกค้า" position="is-top" bottom v-if="item.statusBt === 'confirmJob'">
                        <v-btn
                          color="info"
                          dark
                          fab
                          small
                          @click.stop="(dialogJob = true), getjob(item)"
                        >
                          <v-icon> mdi-qrcode-scan </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <!-- <VueCustomTooltip label="จบงาน" position="is-top" bottom v-if="item.statusBt === 'confirmJob' && item.jobNo !== ''">
                        <v-btn
                          color="#84C650"
                          dark
                          fab
                          small
                          @click.stop="(dialogCloseJob = true), getjob(item)"
                        >
                          <v-icon>  mdi-cash-usd-outline </v-icon>
                        </v-btn>
                    </VueCustomTooltip> -->
                    <VueCustomTooltip label="ลบรายการนี้" position="is-top" bottom v-if="item.statusBt === 'cancel'">
                        <v-btn
                          color="red"
                          dark
                          fab
                          small
                          @click.stop="(dialogDelete = true), getDataById(item)"
                        >
                          <v-icon> mdi-delete </v-icon>
                        </v-btn>
                    </VueCustomTooltip>
                    <!-- <v-tooltip bottom v-if="item.addressLatLong !== null">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="blue-grey darken-1"
                          fab
                          small
                          dark
                          @click.stop="setShowMap(item)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark> mdi-map-marker-radius-outline </v-icon>
                        </v-btn>
                      </template>
                      <span>ดูแผนที่</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="yellow"
                          fab
                          small
                          @click.stop="setDataEdit(item)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark> mdi-tools </v-icon>
                        </v-btn>
                      </template>
                      <span>แก้ไขข้อมูล</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="item.statusBt === 'confirm'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          fab
                          small
                          @click.stop="(dialogEdit = true), getBookingDataJob(item, 'qrcode')"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark> mdi-account-plus </v-icon>
                        </v-btn>
                      </template>
                      <span>รับรถเข้าศูนย์</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="item.statusBt !== 'confirmJob' && item.statusBt !== 'confirm'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="success"
                          fab
                          :disabled="item.chkConfirm"
                          small
                          @click.stop="confirmChk(item)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark> mdi-phone-check </v-icon>
                        </v-btn>
                      </template>
                      <span>ยืนยันนัดหมาย</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="item.statusBt !== 'confirmJob'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-badge
                          avatar
                          bordered
                          overlap
                          :content="item.countChangeTime"
                          :value="item.countChangeTime"
                          color="warning"
                          class="mr-1"
                          style="cursor: pointer"
                        >
                          <v-btn
                            color="warning"
                            fab
                            small
                            @click.stop="setDataChang(item)"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon> mdi-calendar-clock </v-icon>
                          </v-btn>
                        </v-badge>
                      </template>
                      <span>เปลี่ยนเวลานัดหมาย</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="item.statusBt !== 'cancel' && item.statusBt !== 'confirmJob'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="error"
                          fab
                          small
                          :disabled="item.chkCancel"
                          @click.stop="setDataRemove(item)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon dark> mdi-phone-cancel </v-icon>
                        </v-btn>
                      </template>
                      <span>ยกเลิกนัดหมาย</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="item.statusBt === 'confirmJob'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="info"
                          dark
                          fab
                          small
                          @click.stop="(dialogJob = true), getjob(item)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon> mdi-qrcode-scan </v-icon>
                        </v-btn>
                      </template>
                      <span>QR Code สำหรับให้ลูกค้า</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="item.statusBt === 'cancel'">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="red"
                          dark
                          fab
                          small
                          @click.stop="(dialogDelete = true), getDataById(item)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon> mdi-delete </v-icon>
                        </v-btn>
                      </template>
                      <span>ลบรายการนี้</span>
                    </v-tooltip> -->
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
        <v-dialog v-model="dialogMap" :max-width="dialogwidth">
           <v-card class="text-center">
          <v-card-title>
            แสดงแผนที่
          </v-card-title>
          <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols= "12" class="pb-0">
                    <v-text-field
                      v-model="address"
                      outlined
                      label="ชื่อของที่อยู่"
                      auto-grow
                    ></v-text-field>
                  </v-col>
                  <v-col cols= "12" class="pb-0">
                    <v-card class="text-center">
                      <v-container>
                      <GmapMap
                        v-if="center !== null"
                        :center="center"
                        :zoom="15"
                        style="width: 100%; height: 200px"
                        :options="{ disableDefaultUI: true }"
                      >
                        <GmapMarker @click="gotoMap()" :position="center" />
                        <gmap-info-window
                              :opened="true"
                              :position="center"
                              :options="{
                                pixelOffset: {
                                  width: 0,
                                  height: -35
                                }
                              }"
                          >
                              กดที่หมุดเพื่อ นำทาง
                          </gmap-info-window>
                      </GmapMap>
                      </v-container>
                    </v-card>
                  </v-col>
                </v-row>
                <hr>
                <div class="text-center">
                  <v-btn
                    elevation="10"
                    color="#173053"
                    outlined
                    style="background-color:#FFFFFF"
                    small
                    @click="dialogMap = false"
                    >ปิด</v-btn
                  >
                </div>
              </v-container>
          </v-card-text>
           </v-card>
        </v-dialog>
        <v-dialog v-model="dialogConfirm" :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>
                ยืนยันรายการนี้
              </v-card-title>
              <v-card-text v-if="dataConfirmReady">
                <v-container>
                <v-row>
                  <v-col class="pb-0 pt-0" cols="12" v-if="dataPackage.filter(el => { return el.balanceAmount > 0 }).length > 0">
                    <v-card class="pl-1">
                      <v-subheader>ลูกค้ามี {{dataPackage.filter(el => { return el.balanceAmount > 0 }).length}} แพ็คเกจ</v-subheader>
                      <v-subheader v-show="StatusPackage.packageName">ลูกค้าได้ทำการเลือกแพ็คเกจ {{StatusPackage.packageName}}</v-subheader>
                      <v-slide-group
                        v-model="modelPackageIndexConfirm"
                        show-arrows
                        center-active
                        >
                        <v-slide-item v-for="(item, index) in dataPackage.filter(el => { return el.balanceAmount > 0 })" :key="index">
                            <v-card
                            class="ma-2 p-1"
                            width="340"
                            height="100"
                            color="#FFFFFF"
                            elevation="6"
                            :style="item.packageId === packageId && item.token === tokenPackage ? 'border: 1px solid green;' : 'border: 1px solid white;'"
                            >
                            <!-- <v-card
                            class="ma-2 p-1"
                            width="340"
                            height="100"
                            color="#FFFFFF"
                            elevation="6"
                            :style="item.packageId === packageId && item.token === tokenPackage ? 'border: 1px solid green;' : 'border: 1px solid white;'"
                            > -->
                            <v-row>
                              <v-col cols="4" class="pr-1">
                                <v-img
                              contain
                              max-height="80"
                              max-width="200"
                              :src="item.packageImg"
                            ></v-img>
                              </v-col>
                              <v-col cols="8" class="pb-6" >
                                <v-row class="font16 headline1">
                                    <v-col class="pl-0 pt-2 pb-0">{{item.packageName}}</v-col>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId !== packageId && item.token !== tokenPackage" color="green" outlined rounded x-small @click="UpdatePackage(item.packageId,'ตกลง',item.packageName, item, item.token)">ตกลง</v-btn>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId === packageId && item.token !== tokenPackage" color="green" outlined rounded x-small @click="UpdatePackage(item.packageId,'ตกลง',item.packageName, item, item.token)">ตกลง</v-btn>
                                    <v-btn class="mr-4 mt-3" v-if="item.packageId === packageId && item.token === tokenPackage" color="red" outlined rounded x-small @click="UpdatePackage(item.packageId,'ยกเลิก',item.packageName, item, item.token)">ยกเลิก</v-btn>
                                </v-row>
                                <v-row class="font14 headline1">
                                    <v-col class="pl-0 pt-0 pb-0">จำนวนการใช้  {{item.balanceAmount}} / {{item.amount}} </v-col>
                                </v-row>
                                <v-row class="font14 headline1">
                                    <v-col class="pl-0 pt-0 pb-0">
                                      <VueCustomTooltip label="สามารถใช้ได้" position="is-top" v-if="dateTimestamp <= item.expirePackage">
                                        <v-icon
                                          large
                                          color="teal darken-2"
                                        >
                                          mdi-clock-check
                                        </v-icon>
                                      </VueCustomTooltip>
                                      <VueCustomTooltip label="หมดอายุแล้ว" position="is-top" v-if="dateTimestamp > item.expirePackage">
                                        <v-icon
                                          large
                                          color="red darken-2"
                                        >
                                          mdi-clock-alert
                                        </v-icon>
                                      </VueCustomTooltip>
                                      >> วันหมดอายุ  {{new Date(item.expirePackage * 1000).toLocaleString().substr(0,9)}}
                                    </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                    </v-card>
                    <br>
                  </v-col>
                  <v-col cols= "12" class="pb-0">
                  <v-select
                    v-model="empSelect"
                    :items="empSelectStep"
                    label="พนักงานที่รับนัดหมาย"
                    menu-props="auto"
                    outlined
                    dense
                  ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols= "12"  class="pb-0">
                  <v-textarea
                    v-model="remark"
                    outlined
                    label="หมายเหตุเพิ่มเติม"
                    auto-grow
                  ></v-textarea>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-btn
                    elevation="10"
                    color="#173053"
                    dark
                    small
                    @click="onConfirm(dataConfirm)"
                    >ยืนยันรายการนี้</v-btn
                  >
                  <v-btn
                    elevation="10"
                    color="#173053"
                    outlined
                    style="background-color:#FFFFFF"
                    small
                    @click="dialogConfirm = false"
                    >ยกเลิก</v-btn
                  >
                </div>
                </v-container>
              </v-card-text>
               <div class="text-center" v-if="!dataConfirmReady">
                  <v-progress-circular
                    :size="50"
                    color="primary"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :width="3"
                    color="red"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :width="3"
                    color="green"
                    indeterminate
                  ></v-progress-circular>

                  <v-progress-circular
                    :size="50"
                    color="amber"
                    indeterminate
                  ></v-progress-circular>
                  </div>
            </v-card>
          </v-dialog>
        <v-dialog v-model="dialogEditData" :max-width="dialogwidth">
          <!-- <v-dialog v-model="dialogAdd" persistent max-width="70%"> -->
            <v-card class="text-center">
                <v-card-text>
                    <v-col class="text-right pa-0">
                      <v-btn
                        small
                        color="#E0E0E0"
                        @click="(dialogEditData = false, this.dataEditReady = true)"
                      >
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <v-row justify="center">
                      <!-- <v-col
                        cols="6"
                      > -->
                      <!-- <v-col
                        cols="8"
                        class="text-center d-none d-sm-flex"
                        style="margin: auto 0;"
                      > -->
                        <!-- <v-col class="text-center">
                          <CalendarBooking ref="CalendarBooking"></CalendarBooking> -->
                          <!-- <v-img
                            class="v-margit_img_reward"
                            :src="require('@/assets/AddBookingList.svg')"
                            max-width="470.37"
                            max-height="247"
                          ></v-img> -->
                        <!-- </v-col> -->
                      <!-- </v-col> -->

                      <v-col cols="12">
                      <!-- <v-col cols="12" sm="6" md="6" lg="6" class="v-margit_text_add mt-0 pa-0"> -->
                        <v-col class="text-center pa-3 ml-2">
                          <h3 style="font-size:10vw;" class="underline-06">แก้ไขข้อมูล</h3>
                          <!-- <v-img
                            class="v_text_add"
                            :src="require('@/assets/Grouptitle.svg')"
                          ></v-img> -->
                        </v-col>
                        <v-col class="pb-0 pt-0" cols="12" v-if="dataPackage.filter(el => { return el.balanceAmount > 0 && el.packageId === packageId && el.token === tokenPackage }).length > 0 && dataPackageDefault === true">
                        <v-card class="pl-1">
                          <!-- <v-subheader>ลูกค้ามี {{dataPackage.filter(el => { return el.balanceAmount > 0 && el.packageId === packageId && el.token === tokenPackage }).length}} แพ็คเกจ</v-subheader> -->
                          <v-subheader v-show="StatusPackage.packageName">ลูกค้าได้ทำการเลือกแพ็คเกจ {{StatusPackage.packageName}}</v-subheader>
                          <v-slide-group
                            v-model="modelPackageIndexConfirm"
                            center-active
                            show-arrows
                            >
                            <v-slide-item v-for="(item, index) in dataPackage.filter(el => { return el.balanceAmount > 0 && el.packageId === packageId && el.token === tokenPackage })" :key="index">
                                <v-card
                                class="ma-2 p-1"
                                width="340"
                                height="100"
                                color="#FFFFFF"
                                elevation="6"
                                :style="item.packageId === packageId && item.token === tokenPackage ? 'border: 1px solid green;' : 'border: 1px solid white;'"
                                >
                                <v-row>
                                  <v-col cols="4" class="pr-1">
                                    <v-img
                                  contain
                                  max-height="80"
                                  max-width="200"
                                  :src="item.packageImg"
                                ></v-img>
                                  </v-col>
                                  <v-col cols="8" class="pb-6" >
                                    <v-row class="font16 headline1">
                                        <v-col class="pl-0 pt-2 pb-0">{{item.packageName}}</v-col>
                                        <!-- <v-btn class="mr-4 mt-3" v-if="item.packageId !== packageId" color="green" outlined rounded x-small @click="UpdatePackage(item.packageId,'ตกลง',item.packageName, item)">ตกลง</v-btn>
                                        <v-btn class="mr-4 mt-3" v-if="item.packageId === packageId" color="red" outlined rounded x-small @click="UpdatePackage(item.packageId,'ยกเลิก',item.packageName, item)">ยกเลิก</v-btn> -->
                                    </v-row>
                                    <v-row class="font14 headline1">
                                        <v-col class="pl-0 pt-0 pb-0">จำนวนการใช้  {{item.balanceAmount}} / {{item.amount}} </v-col>
                                    </v-row>
                                    <v-row class="font14 headline1">
                                        <v-col class="pl-0 pt-0 pb-0">
                                          <VueCustomTooltip label="สามารถใช้ได้" position="is-top" v-if="dateTimestamp <= item.expirePackage">
                                            <v-icon
                                              large
                                              color="teal darken-2"
                                            >
                                              mdi-clock-check
                                            </v-icon>
                                          </VueCustomTooltip>
                                          <VueCustomTooltip label="หมดอายุแล้ว" position="is-top" v-if="dateTimestamp > item.expirePackage">
                                            <v-icon
                                              large
                                              color="red darken-2"
                                            >
                                              mdi-clock-alert
                                            </v-icon>
                                          </VueCustomTooltip>
                                          >> วันหมดอายุ  {{new Date(item.expirePackage * 1000).toLocaleString().substr(0,9)}}
                                        </v-col>
                                    </v-row>
                                  </v-col>
                                </v-row>
                                </v-card>
                            </v-slide-item>
                        </v-slide-group>
                        </v-card>
                        <br>
                      </v-col>
                        <v-form ref="form_edit" v-model="validEdit" lazy-validation>
                        <v-col cols="12" v-if="dataEditReady">
                          <v-select
                            v-model="formEdit.flowId"
                            :items="dataFlowSelectEdit"
                            label="ประเภทบริการ"
                            outlined
                            dense
                            required
                            @change="SetallowedDatesEdit(), checkTimeEdit()"
                            :rules="[rules.required]"
                          ></v-select>
                          <v-select
                            v-model="formEdit.masBranchID"
                            :items="branch"
                            label="สาขา"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-select>
                          <template v-if="BookingDataItemEdit">
                            <div
                              v-for="(item, index) in BookingDataItemEdit"
                              :key="index"
                            >
                              <template
                                v-if="
                                  item.conditionField === '' ||
                                    item.conditionField === null
                                "
                              >
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'text'">
                                  <v-text-field
                                    v-if="item.fieldName === 'เบอร์โทร'"
                                    v-mask="'###-###-####'"
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                  <v-text-field
                                    v-else
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'number'">
                                  <v-text-field
                                    v-if="item.fieldName === 'เบอร์โทร'"
                                    v-mask="'###-###-####'"
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                  <v-text-field
                                    v-else
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'Autocompletes'">
                                  <v-autocomplete
                                    v-model="item.fieldValue"
                                    :items="JSON.parse(item.optionField)"
                                    outlined
                                    :label="item.fieldName"
                                    required
                                    dense
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                  ></v-autocomplete>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'Selects'">
                                  <v-select
                                  class="mb-6"
                                    v-model="item.fieldValue"
                                    :items="JSON.parse(item.optionField)"
                                    menu-props="auto"
                                    :label="item.fieldName"
                                    required
                                    :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    dense
                                    clearable
                                    outlined
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" class="InputData" v-if="item.fieldType == 'Radio'" style="padding:0px;">
                                  <v-container fluid style="padding:0px;">
                                    <v-radio-group
                                      column
                                      dense
                                      v-model="item.fieldValue"
                                      style="margin:0px;"
                                    >
                                      <template v-slot:label> </template>
                                      <div
                                        v-for="radios in JSON.parse(
                                          item.optionField
                                        )"
                                        :key="radios.toISOString"
                                      >
                                        <v-radio
                                          :label="radios.text"
                                          dense
                                          :value="radios.value"
                                        ></v-radio>
                                      </div>
                                    </v-radio-group>
                                  </v-container>
                                </v-col>
                              </template>
                              <template
                                v-if="
                                  item.conditionField !== '' &&
                                    BookingDataItemEdit.filter(row => {
                                      return (
                                        row.fieldId ===
                                        parseInt(item.conditionField)
                                      );
                                    }).length > 0
                                "
                              >
                                <template
                                  v-if="
                                    item.conditionValue ===
                                      BookingDataItemEdit.filter(row => {
                                        return (
                                          row.fieldId ===
                                          parseInt(item.conditionField)
                                        );
                                      })[0].fieldValue
                                  "
                                >
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'text'">
                                    <v-text-field
                                      v-if="item.fieldName === 'เบอร์โทร'"
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      v-mask="'###-###-####'"
                                      outlined
                                      dense
                                      required
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                    <v-text-field
                                      v-else
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'number'">
                                    <v-text-field
                                      v-if="item.fieldName === 'เบอร์โทร'"
                                      v-mask="'###-###-####'"
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                    <v-text-field
                                      v-else
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'Autocompletes'">
                                    <v-autocomplete
                                      v-model="item.fieldValue"
                                      :items="JSON.parse(item.optionField)"
                                      outlined
                                      :label="item.fieldName"
                                      required
                                      dense
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                    ></v-autocomplete>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'Selects'">
                                    <v-select
                                    class="mb-6"
                                      v-model="item.fieldValue"
                                      :items="JSON.parse(item.optionField)"
                                      menu-props="auto"
                                      :label="item.fieldName"
                                      required
                                      dense
                                      clearable
                                      :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                      outlined
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="12" class="InputData" v-if="item.fieldType == 'Radio'" style="padding:0px;">
                                    <v-container fluid style="padding:0px;">
                                      <v-radio-group
                                        row
                                        dense
                                        v-model="item.fieldValue"
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        style="margin:0px;"
                                      >
                                        <template v-slot:label> </template>
                                        <div
                                          v-for="radios in JSON.parse(
                                            item.optionField
                                          )"
                                          :key="radios.toISOString"
                                        >
                                          <v-radio
                                            :label="radios.text"
                                            :value="radios.value"
                                            dense
                                          ></v-radio>
                                        </div>
                                      </v-radio-group>
                                    </v-container>
                                  </v-col>
                                </template>
                              </template>
                                <template  v-if="item.conditionField === 'flow' ">
                                  <template v-if="parseInt(item.conditionValue) === parseInt(formEdit.flowId) ">
                                    <v-col cols="12" class="InputData" v-if="item.fieldType == 'text'">
                                      <v-text-field
                                        v-if="item.fieldName === 'เบอร์โทร'"
                                        v-mask="'###-###-####'"
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                      <v-text-field
                                        v-else
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" class="InputData" v-if="item.fieldType == 'number'">
                                      <v-text-field
                                        v-if="item.fieldName === 'เบอร์โทร'"
                                        v-mask="'###-###-####'"
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                      <v-text-field
                                        v-else
                                        v-model="item.fieldValue"
                                        :label="item.fieldName"
                                        dense
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                        outlined
                                      ></v-text-field>
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      class="InputData"
                                      v-if="item.fieldType == 'Autocompletes'"
                                    >
                                      <v-autocomplete
                                        v-model="item.fieldValue"
                                        :items="JSON.parse(item.optionField)"
                                        dense
                                        filled
                                        :label="item.fieldName"
                                        :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                      ></v-autocomplete>
                                    </v-col>
                                      <v-col cols="12" class="InputData" v-if="item.fieldType == 'Selects'">
                                        <v-select
                                        class="mb-6"
                                          v-model="item.fieldValue"
                                          :items="JSON.parse(item.optionField)"
                                          menu-props="auto"
                                          :label="item.fieldName"
                                          dense
                                          clearable
                                          :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                          hide-details
                                          outlined
                                        ></v-select>
                                      </v-col>
                                      <v-col cols="12" class="InputData" v-if="item.fieldType === 'Radio'" style="padding:0px;">
                                        <v-container fluid style="padding:0px;">
                                          <v-radio-group
                                            row
                                            v-model="item.fieldValue"
                                            style="margin:0px;"
                                            :rules="item.requiredField === 'True' ? [rules.required] : [true]"
                                          >
                                            <template v-slot:label> </template>
                                            <div
                                              v-for="radios in JSON.parse(
                                                item.optionField
                                              )"
                                              :key="radios.toISOString"
                                              class="text-center"
                                            >
                                              <v-radio
                                                :label="radios.text"
                                                dense
                                                :value="radios.value"
                                              ></v-radio>
                                            </div>
                                          </v-radio-group>
                                        </v-container>
                                      </v-col>
                                  </template>
                                </template>
                            </div>
                          </template>
                          <v-row v-if="checkSelectText !== 'confirmJob'">
                            <v-col class="pb-0">
                              <v-menu
                                v-model="menuDateEdit"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="dateEdit"
                                    label="วันที่"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    dense
                                    outlined
                                    v-on="on"
                                    required
                                    :rules="[rules.required]"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="dateEdit"
                                  :allowed-dates="allowedDatesEdit"
                                  @input="menuDateEdit = false"
                                  :min="
                                    new Date(
                                      Date.now() -
                                        new Date().getTimezoneOffset() * 60000
                                    )
                                      .toISOString()
                                      .substr(0, 10)
                                  "
                                ></v-date-picker>
                                <!-- <v-date-picker
                                  v-model="dateEdit"
                                  @input="menuDate = false"
                                ></v-date-picker> -->
                              </v-menu>
                            </v-col>
                            <v-col class="pb-0">
                              <!-- <v-select
                              v-model="timeEdit"
                              :items="timeavailable"
                              label="เวลา"
                              menu-props="auto"
                              outlined
                              dense
                            ></v-select> -->
                            <v-select
                              v-model="timeEdit"
                              :items="timeavailable"
                              label="เวลา"
                              item-text="text"
                              item-value="text"
                              persistent-hint
                              return-object
                              outlined
                              dense
                              required
                              :rules ="[rules.required]"
                            ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col class="pt-0 pb-0">
                              <v-radio-group v-model="formEdit.radiosRemark" row  required :rules ="[rules.required]">
                                <v-radio value="ซ่อมปกติ">
                                  <template v-slot:label>
                                    <div class="mt-3"><strong class="primary--text">{{dataTypeJob1}}</strong></div>
                                  </template>
                                </v-radio>
                                <v-radio value="ExtraJob">
                                  <template v-slot:label>
                                    <div class="mt-3"><strong class="error--text">{{dataTypeJob2}}</strong></div>
                                  </template>
                                </v-radio>
                                <v-radio value="FastTrack">
                                  <template v-slot:label>
                                    <div class="mt-3"><strong class="orange--text">{{dataTypeJob3}}</strong></div>
                                  </template>
                                </v-radio>
                              </v-radio-group>
                            </v-col>
                          </v-row>
                          <v-row v-if="checkSelectText !== 'confirmJob'">
                            <v-col class="pt-0">
                              <v-select
                                v-model="empSelectEdit"
                                :items="empSelectStepAdd"
                                label="พนักงานที่รับนัดหมาย"
                                menu-props="auto"
                                outlined
                                dense
                              ></v-select>
                            </v-col>
                          </v-row>
                          <div class="text-center">
                            <v-btn
                              elevation="2"
                              large
                              color="#173053"
                              class="text-white"
                              :loading="loadingEdit"
                              :disabled="loadingEdit"
                              @click="editDataSelect()"
                            >
                              <template v-slot:loader>
                                <span class="custom-loader">
                                  <v-icon light>mdi-cached</v-icon>
                                </span>
                              </template>
                              <v-icon left>mdi-checkbox-marked-circle</v-icon>
                              แก้ไขข้อมูล
                            </v-btn>
                            <v-btn
                              elevation="2"
                              large
                              color="red"
                              dark
                              @click="dialogEditData = false"
                            >
                              <v-icon left>mdi-close</v-icon>
                              ปิด
                            </v-btn>
                          </div>
                        </v-col>
                        </v-form>
                        <div class="text-center" v-if="!dataEditReady">
                            <v-progress-circular
                              :size="50"
                              color="primary"
                              indeterminate
                            ></v-progress-circular>

                            <v-progress-circular
                              :width="3"
                              color="red"
                              indeterminate
                            ></v-progress-circular>

                            <v-progress-circular
                              :size="70"
                              :width="7"
                              color="purple"
                              indeterminate
                            ></v-progress-circular>

                            <v-progress-circular
                              :width="3"
                              color="green"
                              indeterminate
                            ></v-progress-circular>

                            <v-progress-circular
                              :size="50"
                              color="amber"
                              indeterminate
                            ></v-progress-circular>
                            </div>
                      </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogAddCon"
            persistent
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                บันทึกข้อมูล
              </v-card-title>
              <v-card-text>ต้องการ บันทึกข้อมูล ใช่หรือไม่?</v-card-text>
              <v-card-actions v-if="dataReadyAdd">
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  color="red darken-1"
                  @click="dialogAddCon = false, loadingAdd = false"
                >
                  ตรวจสอบอีกครั้ง
                </v-btn>
                <v-btn
                  dark
                  color="green darken-1"
                  @click="addDataInsert()"
                >
                  บันทึกข้อมูล
                </v-btn>
              </v-card-actions>
              <div class="text-center" v-if="!dataReadyAdd">
                <v-progress-circular
                  :size="50"
                  color="primary"
                  indeterminate
                ></v-progress-circular>

                <v-progress-circular
                  :width="3"
                  color="red"
                  indeterminate
                ></v-progress-circular>

                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  indeterminate
                ></v-progress-circular>

                <v-progress-circular
                  :width="3"
                  color="green"
                  indeterminate
                ></v-progress-circular>

                <v-progress-circular
                  :size="50"
                  color="amber"
                  indeterminate
                ></v-progress-circular>
              </div>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogError"
            persistent
            max-width="500px"
          >
            <v-card>
              <v-card-title class="text-h5">
                ผิดพลาด
              </v-card-title>
              <v-card-text>{{textError}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  color="red darken-1"
                  @click="dialogError = false"
                >
                  ตรวจสอบอีกครั้ง
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogTag" persistent max-width="40%">
            <v-card>
              <v-card-title>
                <span class="headline">อัพเดท Tag</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-autocomplete
                    v-model="tagData"
                    :items="tagItem"
                    outlined
                    dense
                    chips
                    small-chips
                    label="รายการ Tag"
                    multiple
                  ></v-autocomplete>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  x-large
                  color="red darken-1"
                  text
                  @click="dialogTag = false"
                  :loading="loadingTag"
                  :disabled="loadingTag"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
                  color="wait"
                  text
                  @click="editTagData()"
                  :loading="loadingTag"
                  :disabled="loadingTag"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  อัพเดท
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
                  color="success"
                  text
                  @click="dialogAddTag = true"
                  :loading="loadingTag"
                  :disabled="loadingTag"
                >
                  <v-icon left>mdi-tag-plus</v-icon>
                  เพิ่ม Tag
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDeposit" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">อัพเดทหลักฐานเงินมัดจำ</span>
              </v-card-title>
              <v-card-text v-if="pictureUrlPreviewDeposit === ''">
                <v-alert
                    dense
                    border="left"
                    type="warning"
                  >
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
                   <v-form
                    ref="form_deposit"
                    v-model="valid_deposit"
                    lazy-validation
                  >
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
                  @click="dialogDeposit = false, pictureUrlPreviewDeposit = null"
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
          <v-dialog v-model="dialogAddTag"
          persistent
          max-width="30%"
        >
          <v-card>
            <v-card-title>
                <span class="headline">เพิ่ม Tag</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="tagName"
                    label="กรอกข้อมูล Tag"
                    outlined
                  ></v-text-field>
                  <div class="text-center">
                    <v-btn
                      small class="ma-2" color="#173053" dark
                      @click="AddDataTag()"
                    >
                      บันทึก
                    </v-btn>
                    <v-btn
                      small class="ma-2" color="#173053" outlined dark
                      @click="dialogAddTag = false , tagName = ''"
                    >
                      ปิด
                    </v-btn>
                  </div>
                </v-container>
              </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogHistory" scrollable persistent max-width="50%">
            <v-card>
              <v-card-title>
                <span class="headline">ประวัติเข้ารับบริการ</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                   <v-row >
                    <v-col class="main" col="12" md="12" sm="12" >
                      <v-card class="p-3 " min-height="70vh" rounded>
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
                        <v-select
                          v-model="phonenum"
                          :items="phonenumItem"
                          label="ค้นหาเบอร์โทร"
                          dense
                          solo
                          @change="SelectDataHistory"
                        ></v-select>
                          <v-timeline
                          align-top
                          dense
                          v-if="phonenum.length > 0"
                          >
                              <v-timeline-item
                               v-for="(item , index) in HistoryData[0]" :key="index"
                              >
                                <template v-slot:icon>
                                  <v-icon
                                    small dark>
                                    event</v-icon>
                                  </template>
                                <div v-for="(item2 , index2) in item" :key="index2">
                                  <v-card-text class="text-start"><h6 class="font-weight-bold">{{format_dateThai(item2[0].dueDate)}}</h6></v-card-text>
                                  <v-card-text class="text-start"><h6 class="font-weight-bold">{{item2[0].flowName}}</h6></v-card-text>
                                  <v-card-text class="text-start"><h6 class="font-weight-bold">{{item2[0].masBranchName}}</h6></v-card-text>
                                  <div v-for="(item3 , index3) in item2" :key="index3">
                                    <v-card-text class="text-start" v-if="item3.fieldValue !== ''"><strong>{{item3.fieldName}} : </strong> {{item3.fieldValue}}</v-card-text>
                                  </div>
                                  <v-card-text v-if="item2[0].statusUpload1 === 'True' || item2[0].statusUpload2 === 'True'">
                                    <v-row>
                                      <v-col cols="auto" v-if="item2[0].statusUpload1 === 'True'">
                                        <v-btn
                                          tile
                                          color="#173053"
                                          dark
                                          small
                                          @click="showFileUpload(item2[0], '1')"
                                        >
                                          <v-icon left>
                                            mdi-file-find
                                          </v-icon>
                                          Show File 1
                                        </v-btn>
                                      </v-col>
                                      <v-col cols="auto" v-if="item2[0].statusUpload2 === 'True'">
                                        <v-btn
                                          tile
                                          color="#173053"
                                          dark
                                          small
                                          @click="showFileUpload(item2[0], '2')"
                                        >
                                          <v-icon left>
                                            mdi-file-find
                                          </v-icon>
                                          Show File 2
                                        </v-btn>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </div>
                                </v-timeline-item>
                          </v-timeline>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  elevation="2"
                  x-large
                  color="red darken-1"
                  text
                  @click="dialogHistory = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- DIALOG ค่าใช้จ่าย -->
        <v-dialog v-model="dialogCloseJob" persistent max-width="400px">
          <v-card v-if="checkPayment === 'True'">
            <center>
              <v-col>
                <v-img
                  :aspect-ratio="1"
                  width="300"
                  height="100%"
                  :src="require('@/assets/paymentCloseJob.png')"
                ></v-img>
              </v-col>
            </center>
            <v-col class="text-center">
              <span class="headline">ค่าใช้จ่าย</span>
            </v-col>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <VuetifyMoney
                      v-model="formCloseJob.totalPrice"
                      placeholder="ค่าใช้จ่ายทั้งหมด"
                      dense
                      label="ค่าใช้จ่ายทั้งหมด"
                      required
                      outlined
                      :rules="[rules.required]"
                      v-bind:options="options2"
                    />
                  </v-col>
                  <v-col class="text-center"  cols="12">
                    <v-btn
                      class="white--text"
                      elevation="2"
                      depressed
                      color="#1B437C"
                      :loading="loadingCloseJob"
                      :disabled="loadingCloseJob"
                      @click="closeJob()"
                    >
                      <v-icon dark left>mdi-checkbox-marked-circle</v-icon>
                      ชำระเงิน
                    </v-btn>
                    <v-btn
                      color="primary"
                      :loading="loadingCloseJob"
                      :disabled="loadingCloseJob"
                      depressed
                      @click=";(dialogCloseJob = false)"
                    >
                      <v-icon left> mdi-cancel</v-icon>
                      ยกเลิก
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card v-if="checkPayment === 'False'">
            <center>
              <v-col>
                <v-img
                  :aspect-ratio="1"
                  width="300"
                  height="100%"
                  :src="require('@/assets/closeJob.png')"
                ></v-img>
              </v-col>
            </center>
            <v-col class="text-center">
              <span class="headline">จบกระบวนการซ่อม</span>
            </v-col>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col class="text-center"  cols="12">
                    <v-btn
                      dark
                      elevation="2"
                      depressed
                      color="#1B437C"
                      @click="closeJob()"
                    >
                      <v-icon left>mdi-checkbox-marked-circle</v-icon>
                      จบกระบวนการซ่อม
                    </v-btn>
                    <v-btn
                      color="primary"
                      depressed
                      @click=";(dialogCloseJob = false)"
                    >
                      <v-icon left> mdi-cancel</v-icon>
                      ยกเลิก
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- end add -->
        <v-dialog v-model="dialogBookingAgain" persistent :max-width="dialogwidth">
            <v-card class="text-center">
              <v-card-title>นัดหมายอีกครั้ง</v-card-title>
              <v-form ref="form_bookingAgain" v-model="validBookingAgain" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                       <v-col class="pa-0" cols= "12" v-for="(item, index) in bookingData" :key="index">
                        <h6 class="text-center" v-if="item.fieldValue !== ''"><strong>{{item.fieldName}} : </strong> {{item.fieldValue}}</h6>
                       </v-col>
                    </v-row>
                  <v-row>
                    <v-col cols="12" md="6" lg="6">
                      <v-menu
                        v-model="menuDataBokkAgain"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="date"
                            label="วันที่"
                            prepend-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="date"
                          @input="menuDataBokkAgain = false"
                          :min="
                            new Date(
                              Date.now() -
                                new Date().getTimezoneOffset() * 60000
                            )
                              .toISOString()
                              .substr(0, 10)
                          "
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col  cols="12" md="6" lg="6">
                         <v-select
                            required
                            :rules="[rules.required]"
                            v-model="time"
                            :items="timeavailable"
                            label="เวลา"
                            item-text="text"
                            item-value="text"
                            persistent-hint
                            return-object
                            outlined
                            dense
                          ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-col cols= "12">
                        <v-textarea
                          required
                          :rules="[rules.required]"
                          v-model="remark"
                          outlined
                          label="หมายเหตุเพิ่มเติม"
                          auto-grow
                        ></v-textarea>
                      </v-col>
                  </v-row>
                  <div class="text-center">
                    <v-btn
                      elevation="10"
                      color="green darken-1"
                      dark
                      small
                      :loading="loadingBookingAgain"
                      :disabled="loadingBookingAgain"
                      @click="addBookingAgain()"
                      >ยืนยันนัดหมาย</v-btn
                    >
                    <v-btn
                      elevation="10"
                      color="#173053"
                      outlined
                      style="background-color:#FFFFFF"
                      small
                      :loading="loadingBookingAgain"
                      :disabled="loadingBookingAgain"
                      @click="dialogBookingAgain = false"
                      >ยกเลิก</v-btn
                    >
                  </div>
                  </v-container>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>

        <v-dialog v-model="dialogShowFileUpload" persistent max-width="80%">
          <v-card>
            <v-card-title>
              File Upload
            </v-card-title>
            <v-card-text>
            <v-row justify="center">
              <v-col class="videoWrapper">
                <iframe :src="srcUpload"></iframe>
              </v-col>
            </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                elevation="2"
                color="red darken-1"
                text
                @click="dialogShowFileUpload = false"
              >
                <v-icon left> mdi-cancel</v-icon>
                ปิด
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import draggable from 'vuedraggable'
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
import XLSX from 'xlsx' // import xlsx
import readXlsxFile from 'read-excel-file'
import DateRangePicker from 'vue2-daterange-picker'
// you need to import the CSS manually
import QrcodeVue from 'qrcode.vue'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import { PivotTable } from '@click2buy/vue-pivot-table'
import moment from 'moment-timezone'
import BookingQueue from './BookingQueue.vue'
import CalendarBooking from './CalendarBookingList.vue'

export default {
  name: 'BookingList',
  components: {
    draggable,
    'left-menu-admin': adminLeftMenu,
    DateRangePicker,
    downloadExcel: JsonExcel,
    XLSX,
    readXlsxFile,
    VuetifyMoney,
    QrcodeVue,
    PivotTable,
    BookingQueue,
    CalendarBooking
  },
  computed: {
    filteredSelect () {
      return this.dataItemSelect.filter(d => {
        return this.filters.length < 1 || d['dueDate'].toString().toLowerCase().includes(this.filters.toLowerCase())
        // return Object.keys(this.filters).every(f => {
        // f is search column
        // this.filters[f] is the current search string entered by user
        // d[f] is the entry being tested against the search string
        //   return this.filters[f].length < 1 || d[f].toString().toLowerCase().includes(this.filters[f].toLowerCase())
        // })
      })
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
  watch: {
    // menuDate (val) {
    //   val && setTimeout(() => (this.$refs.dateRef.activePicker = 'month'))
    // },
    pickerDate (newval, oldval) {
      this.getMonth(newval)
      // this.allowedDates()
      // here you can check if month changed using newval and oldval
    }
  },
  data () {
    let startDate = null
    let endDate = null
    return {
      srcUpload: '',
      dialogShowFileUpload: false,
      pickerDate: null,
      currentDate: moment().format('YYYY-MM-DD'),
      currentMonth: moment().format('YYYY-MM'),
      headersLimitBookingDate: [
        {
          text: 'เวลา',
          align: 'center',
          sortable: true,
          value: 'bookingTime'
        },
        { text: 'จำนวน Limit ปัจจุบัน / จำนวน Limit ที่ตั้งไว้', value: 'countBookingLimit', align: 'center' }
      ],
      dataLimitBookingDate: [],
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 9,
        precision: 0
      },
      options1: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 1,
        precision: 0
      },
      recordStatusJob: '',
      checkPayment: 'True',
      formCloseJob: {
        jobId: '',
        jobNo: '',
        totalPrice: 0
      },
      dialogCloseJob: false,
      loadingCloseJob: false,
      modelPackageIndexConfirm: null,
      modelPackageIndexConfirmJob: null,
      dataPackageDefault: false,
      jobCheckPackage: false,
      dateTimestamp: '',
      packageId: '',
      tokenPackage: '',
      dataPackage: [],
      StatusPackage: {
        status: 'ตกลง',
        color: 'green',
        packageName: '',
        token: ''
      },
      dataFlowSelectAdd: [],
      dataFlowSelectEdit: [],
      checkSelectText: '',
      pictureUrHistory: '',
      tagName: '',
      dialogHistory: false,
      dialogAddTag: false,
      tagItem: [],
      tagData: [],
      panelDeposit: [],
      dataDepositAdd: 'ไม่มี',
      pictureUrlPreviewDeposit: null,
      pictureUrlDeposit: null,
      filesDeposit: null,
      filesDepositAdd: null,
      valid_deposit: true,
      statusDeposit: false,
      flowSelect: '',
      dueDate: '',
      statusConfirmJob: false,
      filters: '',
      loadingTag: false,
      loadingDeposit: false,
      loadingEdit: false,
      loadingAdd: false,
      loadingRefresh: false,
      menuDateSearch: false,
      timeTable: '',
      drawer: false,
      value: '',
      size: 200,
      foreground: '#173053',
      userId: '',
      skip: {
        userId: 'user-skip'
      },
      pathToweb: 'https://liff.line.me/1656581804-7KRQyqo5/JobConfirm?jobId=',
      changeBackgroundColor: true,
      countWaiting: 0,
      countConfirm: 0,
      countCancel: 0,
      countJob: 0,
      countAll: 0,
      export_fields: {
        'Booking Id': 'bookNo',
        'สาขา': 'masBranchName',
        'ชื่อลูกค้า': 'cusName',
        'ทะเบียนรถ': 'cusReg',
        'วันและเวลานัดหมาย': 'dueDate',
        'ชื่อบริการ': 'flowName',
        'สถานะ ติดต่อ': 'statusBt',
        'วันที่ ติดต่อ': 'contactDateBt',
        // 'วันที่ แจ้งเปลี่ยน': 'changDateBt',
        'สถานะนำเข้ากระดาน': 'statusUseBt',
        'วันที่ สร้าง': 'CREATE_DATE',
        'วันที่ แก้ไขล่าสุด': 'LAST_DATE'
      },
      exportType: 'xls',
      exportFileName: 'BookingList' + new Date().toISOString().substr(0, 10).replace('/-/g', '') + '.xls',
      exportWorksheet: 'WorkSheet',
      export_data: [],
      dateRange: {startDate, endDate},
      localeData: {
        // direction: 'ltr',
        format: 'yyyy-mm-dd',
        // separator: ' - ',
        applyLabel: 'ยืนยัน',
        cancelLabel: 'ยกเลิก',
        // weekLabel: 'W',
        // customRangeLabel: 'Custom Range',
        // daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysOfWeek: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
        monthNames: ['ม.ค', 'ก.พ', 'มี.ค', 'เม.ย', 'พ.ค', 'มิ.ย', 'ก.ค', 'ส.ค', 'ก.ย', 'ต.ค', 'พ.ย', 'ธ.ค'],
        // monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        firstDay: 1
      },
      masterTime: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
      masBranchID: '',
      masBranchIDExport: '',
      bookNo: '',
      BookingDataItem: [],
      Layout: [],
      dataItemTime: [],
      dataItemTimesChange: [],
      appendBody: true,
      dataEditReady: true,
      dataConfirmReady: true,
      dataCancelReady: true,
      dialogTag: false,
      dialogExport: false,
      dialogRemove: false,
      dialogError: false,
      dialogDeposit: false,
      dataReady: false,
      menuDate: false,
      menuDateEdit: false,
      menuDateChange: false,
      menuDataBokkAgain: false,
      date: '',
      time: '',
      empSelectAdd: '',
      dateEdit: '',
      timeEdit: '',
      empSelectEdit: '',
      session: this.$session.getAll(),
      fieldNameItem: [],
      flowfieldNameitem: [],
      DataflowId: '',
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'รายชื่อลูกค้านัดหมาย',
          disabled: false,
          href: '/Master/BookingListBeauty'
        }
      ],
      branch: [],
      DataFlowName: [],
      // Data Table Config
      searchAll2: '',
      columns: [
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        // { text: 'Booking Id', value: 'bookNo' },
        { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
        { text: 'ชื่อบริการ', value: 'flowName' },
        { text: 'ชื่อลูกค้า', value: 'cusName' },
        { text: 'เบอร์โทร', value: 'tel' },
        { text: 'ทะเบียนรถ', value: 'cusReg' },
        { text: 'สถานะนัดหมาย', value: 'statusBtText' },
        { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
        { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' }
        // { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
      ],
      columnsSelected: [],
      dataItem: [],
      dataItemCheck: [],
      dataexport: [],
      dataItemSelect: [],
      editedItemSeleteField: [],
      jobitem: [],
      // End Data Table Config
      formAdd: {
        bookingId: null,
        fieldId: '',
        fieldValue: '',
        flowId: null,
        masBranchID: null,
        dueDate: '',
        shopId: this.$session.getAll().data.shopId,
        bookingFieldId: '',
        radiosRemark: '',
        depositStatus: '',
        depositImge: '',
        pictureUrlPreviewDeposit: ''
      },
      formEdit: {
        bookingId: null,
        fieldId: '',
        fieldValue: '',
        flowId: null,
        masBranchID: null,
        dueDate: '',
        shopId: this.$session.getAll().data.shopId,
        bookingFieldId: '',
        radiosRemark: ''
      },
      formUpdate: {
        masBranchCode: '',
        masBranchName: '',
        tel: '',
        map: '',
        shopId: '',
        bookNo: ''
      },
      formChange: {
        date: '',
        time: ''
      },
      dataChange: {},
      validUpdate: true,
      validAdd: true,
      validEdit: true,
      validRemove: true,
      validChange: true,
      validExport: true,
      validBookingAgain: true,
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogEditData: false,
      dialogDelete: false,
      dialogChange: false,
      dialogRemark: false,
      dialogRemarkReturn: false,
      dialogJob: false,
      dialogAddCon: false,
      menuReturn: false,
      menu: false,
      menu1: false,
      menuStart: false,
      dateStart: new Date().toISOString().substr(0, 7),
      endDate: '',
      endTime: '',
      memberPicture: '',
      dataInfo: null,
      dialogInfo: false,
      detailInfo: null,
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
      getSelectText: '',
      getSelectCount: 0,
      selectedStatus: false,
      swalConfig: {
        title: null,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      },
      BookingDataList: [],
      BookingDataListTimechange: [],
      remarkRemove: '',
      bookNoRemove: '',
      timeavailable: [],
      dialogConfirm: false,
      dialogMap: false,
      empSelectStep: [],
      empSelectStepAdd: [],
      dataConfirm: [],
      empSelect: '',
      dataRemoveExport: [],
      dataexportRemove: [],
      BookingDataItemEdit: [],
      dataQrcode: [],
      bookNoRemark: '',
      remark: '',
      remarkReturn: '',
      dateReturn: '',
      showMap: '',
      setTimer: null,
      setTimerCalendar: null,
      searchOther: '',
      showColorSearch: false,
      dataEditJobReady: true,
      dataChangeReady: true,
      statusSearch: 'no',
      // window_open: true,
      center: null,
      address: '',
      empSelectJob: '',
      textError: '',
      dataReadyAdd: true,
      checkShowSelectUser: false,
      tabSelectUser: null,
      dataSelectUser: {},
      dataTypeJob1: '',
      dataTypeJob2: '',
      dataTypeJob3: '',
      dataTypeProcess1: '',
      dataTypeProcess2: '',
      dataTypeProcess3: '',
      dataTypeProcess4: '',
      checkDepositAdd: '',
      defaultData: [],
      phonenumItem: [],
      HistoryData: [],
      phonenum: [],
      lineUserId: '',
      booking: [],
      bookingData: [],
      dialogBookingAgain: false,
      loadingBookingAgain: false,
      limitBookingCheck: 'False',
      limitBookingSelect: 'Fales',
      limitCountBranch: 0,
      limitCountBranchOld: 0,
      countBookingLimit: 0,
      selectCountBookingLimit: 1,
      dueDateOld: '',
      dueDateTimeOld: '',
      masBranchIDLimit: '',
      flowIDLimit: '',
      dateDayoff: [],
      dateDayCustom: [],
      dateDaylimit: null,
      flowItemLimit: [],
      checkLimitBooking: {
        ID: '',
        countBooking: null,
        limitCheck: null,
        limitBooking: 0
      },
      dataEdit: '',
      statusShowDateConfiremjob: true,
      memberId: ''
    }
  },
  beforeCreate () {
    // if (localStorage.userName) {
    //   console.log(localStorage.userName)
    // } else {
    //   console.log('not user')
    // }
    if (!this.$session.exists()) {
      if (this.$route.query.bookNo) {
        this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId + '&type=' + this.$route.query.type)
      } else {
        this.$router.push('/Core/Login')
      }
      // this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId)
    }
  },
  async mounted () {
    if (this.$route.query.bookNo) {
      // this.beforeCreateScan()
      await this.getDataBranch()
      await this.getEmpSelectAdd()
      await this.getBookingFieldText()
      this.getCustomFieldStart()
      this.getDataFlow()
      await this.scanQrcode()
      // this.getBookingList()
    } else {
      await this.getDataBranch()
      await this.getEmpSelectAdd()
      await this.getBookingFieldText()
      this.getCustomFieldStart()
      this.getDataFlow()
      this.getBookingList()
    }
    // this.dataReady = false
    // console.log('localStorage', localStorage.getItem('typeData'))
    this.$root.$on('closeSetTimeGetCalenda', () => {
      // your code goes here
      this.closeSetTimeGetCalenda()
    })
    // await this.beforeCreate()
  },
  methods: {
    pushMsgConfirm (bookNo) {
      axios
        .post(
          this.DNS_IP + '/Booking/pushMsgConfirm/' + bookNo
        )
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    gotoPicture (Linkitem) {
      window.open(Linkitem, '_blank')
    },
    SetallowedDatesChange (flowId) {
      let dataFlow = this.dataFlowSelectAdd.filter(el => { return el.value === flowId })
      if (dataFlow.length > 0) {
        dataFlow.forEach((v, k) => {
          console.log('v', v)
          if (v.allData.flowId === flowId) {
            // console.log('Value', v.dateDayoffValue)
            v.allData.dateDayCustom = v.allData.dateDayCustom || ''
            v.allData.dateDayoffValue = v.allData.dateDayoffValue || ''
            if (v.allData.dateDayoffValue !== '') {
              console.log('if')
              this.dateDayoff = JSON.parse(v.allData.dateDayoffValue)
            } else {
              console.log('else')
              this.dateDayoff = []
            }
            if (v.dateDayCustom !== '') {
              this.dateDayCustom = JSON.parse(v.allData.dateDayCustom)
            } else {
              this.dateDayCustom = []
            }
          }
        })
      } else {
        this.dateDayoff = []
        this.dateDayCustom = []
      }
    },
    allowedDatesChange (val) {
      // if (this.dateDaylimit) {
      if (this.dataFlowSelectAdd.filter(el => el.value === this.flowIDLimit).length > 0) {
        if (this.dataFlowSelectAdd.filter(el => el.value === this.flowIDLimit)[0].allData.typeDayCustom === 'on') {
          return val === this.dateDayCustom.filter(el => el === val)[0]
        } else {
          if (
            this.dateDayoff.filter(el => {
              return el === new Date(val).getDay()
            }).length === 0 &&
          this.dateDayCustom.filter(el => {
            return el === val
          }).length === 0
          ) {
            return val
          }
        }
      } else {
        return val
      }
      // }
    },
    SetallowedDatesEdit () {
      console.log('this.dataFlowSelectEdit', this.dataFlowSelectEdit)
      let dataFlow = this.dataFlowSelectEdit.filter(el => { return el.value === this.formEdit.flowId })
      if (dataFlow.length > 0) {
        dataFlow.forEach((v, k) => {
          v.allData.dateDayCustom = v.allData.dateDayCustom || ''
          v.allData.dateDayoffValue = v.allData.dateDayoffValue || ''
          if (v.allData.dateDayoffValue !== '') {
            console.log('if')
            this.dateDayoff = JSON.parse(v.allData.dateDayoffValue)
          } else {
            console.log('else')
            this.dateDayoff = []
          }
          if (v.dateDayCustom !== '') {
            this.dateDayCustom = JSON.parse(v.allData.dateDayCustom)
          } else {
            this.dateDayCustom = []
          }
        })
      } else {
        this.dateDayoff = []
        this.dateDayCustom = []
      }
    },
    allowedDatesEdit (val) {
      // if (this.dateDaylimit) {
      if (this.dataFlowSelectEdit.filter(el => el.value === this.formEdit.flowId).length > 0) {
        if (this.dataFlowSelectEdit.filter(el => el.value === this.formEdit.flowId)[0].allData.typeDayCustom === 'on') {
          return val === this.dateDayCustom.filter(el => el === val)[0]
        } else {
          if (
            this.dateDayoff.filter(el => {
              return el === new Date(val).getDay()
            }).length === 0 &&
          this.dateDayCustom.filter(el => {
            return el === val
          }).length === 0
          ) {
            return val
          }
        }
      } else {
        return val
      }
      // }
    },
    showFileUpload (item, text) {
      if (text === '1') {
        this.srcUpload = item.fileUpload1
      } else {
        this.srcUpload = item.fileUpload2
      }
      this.dialogShowFileUpload = true
    },
    async checkLimit () {
      this.checkLimitBooking.ID = 'NO'
      this.checkLimitBooking.countBooking = 1
      let LimitBooking = await this.getLimitBooking()
      if (LimitBooking.status === false) {
        this.checkLimitBooking.ID = 'NO'
        this.checkLimitBooking.countBooking = 1
        console.log('1257')
      } else {
        console.log('1259', LimitBooking)
        LimitBooking.forEach((item) => {
          let dt = JSON.parse(this.DataFlowName.filter(item => { return item.value === this.formAdd.flowId })[0].allData.setTime) || []
          // let dt = JSON.parse(this.branchData.filter(item => { return item.masBranchID === this.formAdd.masBranchID })[0].setTime) || []
          let dtint = '0'
          if (dt.filter(item => item.value === this.time.value).length > 0) {
            dtint = parseInt(dt.filter(item => item.value === this.time.value)[0].limitBooking || '0')
          } else {
            dtint = '0'
          }
          console.log('test', dtint)
          // console.log('test', item.flowId === this.formAdd.flowId && this.momenDate_1(item.bookingDate) === this.date && item.bookingTime === this.time.value)
          // if (item.masBranchID === this.formAdd.masBranchID && this.momenDate_1(item.bookingDate) === this.date && item.bookingTime === this.time.value) {
          if (item.flowId === this.formAdd.flowId && this.momenDate_1(item.bookingDate) === this.date && item.bookingTime === this.time.value) {
            this.checkLimitBooking.ID = item.id
            console.log('1266')
            this.checkLimitBooking.countBooking = parseInt(item.countBooking) + 1
            this.checkLimitBooking.limitCheck = parseInt(item.countBooking) >= dtint ? 'false' : 'true'
            this.checkLimitBooking.limitBooking = dtint
            // console.log('item.masBranchID', item)
          }
        })
      }
      console.log('this.checkLimitBooking', this.checkLimitBooking)
    },
    async getMonth (month) {
      console.log('month', month)
      // const result = await axios.get(this.DNS_IP + '/LimitBookingDate/get_LimitDate?shopId=' + this.$session.getAll().data.shopId + '&masBranchID=' + this.formAdd.masBranchID + '&bookingDate=' + month)
      const result = await axios.get(this.DNS_IP + '/LimitBookingDate/get_LimitDate?shopId=' + this.$session.getAll().data.shopId + '&flowId=' + this.formAdd.flowId + '&bookingDate=' + month)
      if (result.data.length > 0) {
        console.log('getMonth IF', result.data)
        this.dateDaylimit = []
        let dt = result.data
        if (dt[0].limitBookingCheck === 'True') {
          console.log('limitBookingCheck === True')
          dt.forEach((v, k) => {
            if (JSON.parse(v.setTime)) {
              let count = 0
              JSON.parse(v.setTime).forEach((v2, k2) => {
                count += parseInt(v2.limitBooking)
              })
              if (v.sum >= count) {
                this.dateDaylimit.push(
                  moment(v.bookingDate).format('YYYY-MM-DD')
                )
              }
            }
          })
        } else {
          console.log('limitBookingCheck === False')
          this.dateDaylimit = []
        }

        // this.dateDaylimit = result.data.map((item) => { return this.momenDate_1(item.bookingDate) })
      } else {
        console.log('getMonth ELSE')
        this.dateDaylimit = []
      }
      // console.log('this.dateDaylimit', this.dateDaylimit)
    },
    allowedDates (val) {
      if (this.dateDaylimit) {
        if (this.dataFlowSelectAdd.filter(el => el.value === this.formAdd.flowId).length > 0) {
          if (this.dataFlowSelectAdd.filter(el => el.value === this.formAdd.flowId)[0].allData.typeDayCustom === 'on') {
            return val === this.dateDayCustom.filter(el => el === val)[0]
          } else {
            if (
              this.dateDayoff.filter(el => {
                return el === new Date(val).getDay()
              }).length === 0 &&
            this.dateDayCustom.filter(el => {
              return el === val
            }).length === 0 &&
            this.dateDaylimit.filter(el => {
              return el === val
            }).length === 0
            ) {
              return val
            }
          }
        } else {
          return val
        }
      } else {
        return val
      }
    },
    async setLimitBooking (dateitem) {
      this.time = ''
      this.timeavailable = []
      this.limitBookingCheck = 'False'
      if (this.DataFlowName.filter(el => { return el.value === parseInt(this.formAdd.flowId) }).length > 0) {
        this.limitBookingCheck = this.DataFlowName.filter(el => { return el.value === parseInt(this.formAdd.flowId) })[0].allData.limitBookingCheck || 'False'
      } else {
        this.limitBookingCheck = 'False'
      }
      if (this.DataFlowName.filter(el => { return el.value === parseInt(this.formAdd.flowId) })[0].allData.limitBookingCheck || 'False') {
        let TimeData = []
        let currentDate = JSON.parse(this.DataFlowName.filter(el => { return el.value === parseInt(this.formAdd.flowId) })[0].allData.setTime) || []
        TimeData = currentDate
        this.timeavailable = TimeData
        console.log('TimeData', TimeData)
        let LimitBooking = await this.getLimitBooking()
        console.log('LimitBooking', LimitBooking)
        if (LimitBooking.status !== false) {
          if (LimitBooking.length > 0) {
            LimitBooking.forEach((i, n) => {
              this.timeavailable.forEach((v, k) => {
                if (i.bookingTime === v.value) {
                  if (i.countBooking >= parseInt(v.limitBooking)) {
                    this.timeavailable.splice(k, 1)
                  }
                }
              })
            })
            if (this.timeavailable.length === 0) {
              this.$swal(
                'คิวเต็มแล้ว',
                'กรุณาเลือกวันที่ใหม่อีกครั้ง',
                'error'
              )
              this.date = ''
            }
          }
          console.log('this.timeavailable IF', this.timeavailable)
        } else {
          this.timeavailable = TimeData
          console.log('this.timeavailable ELSE', this.timeavailable)
        }
      } else {
        console.log('this.timeavailable ELSEEEEE', this.timeavailable)
        // LimitBookingBy Flow
        // this.timeavailable = JSON.parse(this.flowItemLimit.filter(item => { return item.flowId === this.formAdd.flowId })[0].setTime) || []

        // LimitBookingBy masBranch
        if (this.DataFlowName.filter(el => { return el.value === parseInt(this.formAdd.flowId) }).length > 0) {
          this.timeavailable = JSON.parse(this.DataFlowName.filter(el => { return el.value === parseInt(this.formAdd.flowId) })[0].allData.setTime) || []
        } else {
          this.timeavailable = []
        }
      }
    },
    async getLimitBooking () {
      // console.log('date', this.date)
      // let LimitBooking = axios.get(this.DNS_IP + '/LimitBookingDate/get?shopId=' + this.$session.getAll().data.shopId + '&masBranchID=' + this.formAdd.masBranchID + '&bookingDate=' + this.date).then(async (response) => {
      //   let rs = response.data
      //   return rs
      // })
      // return LimitBooking
      let LimitBooking = axios.get(this.DNS_IP + '/LimitBookingDate/get?shopId=' + this.$session.getAll().data.shopId + '&flowId=' + this.formAdd.flowId + '&bookingDate=' + this.date).then(async (response) => {
        let rs = response.data
        return rs
      })
      return LimitBooking
    },
    SetallowedDates () {
      let dataFlow = this.dataFlowSelectAdd.filter(el => { return el.value === this.formAdd.flowId })
      if (dataFlow.length > 0) {
        dataFlow.forEach((v, k) => {
          console.log('v', v)
          if (v.allData.flowId === this.formAdd.flowId) {
            // console.log('Value', v.dateDayoffValue)
            v.allData.dateDayCustom = v.allData.dateDayCustom || ''
            v.allData.dateDayoffValue = v.allData.dateDayoffValue || ''
            if (v.allData.dateDayoffValue !== '') {
              // console.log('if')
              this.dateDayoff = JSON.parse(v.allData.dateDayoffValue)
            } else {
              // console.log('else')
              this.dateDayoff = []
            }
            if (v.dateDayCustom !== '') {
              this.dateDayCustom = JSON.parse(v.allData.dateDayCustom)
            } else {
              this.dateDayCustom = []
            }
          }
        })
      } else {
        this.dateDayoff = []
        this.dateDayCustom = []
      }
    },
    onCopySuccess () {
      this.$swal('เรียบร้อย', 'คัดลอกสำเร็จ', 'success')
    },
    closeJob () {
      this.loadingCloseJob = true
      if (this.checkPayment === 'True') {
        if (this.formCloseJob.totalPrice !== '') {
          this.closeJobSubmit(this.formCloseJob.totalPrice)
        } else {
          this.loadingCloseJob = false
          this.$swal('ผิดพลาก', 'กรุณาใส่จำนวนเงิน', 'error')
        }
      } else {
        this.closeJobSubmit('0')
      }
    },
    closeJobSubmit (totalPrice) {
      console.log('form:', this.formCloseJob)
      this.$swal({
        title: 'ให้บริการ เสร็จเรียบร้อยแล้ว ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#fa0202',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async response => {
        var ID = this.formCloseJob.jobId
        let ds = {
          jobNo: this.formCloseJob.jobNo,
          shopId: this.$session.getAll().data.shopId,
          totalPrice: totalPrice,
          LAST_USER: this.session.data.userName,
          statusDelete: 'true'
        }
        console.log('ds', ds)
        let checkJob = ''
        await axios.get(this.DNS_IP + '/job/getJobNo?jobNo=' + this.formCloseJob.jobNo).then((response) => {
          let rs = response.data
          console.log('getJobNo', rs)
          if (rs.length > 0) {
            checkJob = rs[0].RECORD_STATUS
          }
        })
        if (checkJob === 'N') {
          await axios
            .post(this.DNS_IP + '/job/editPrice/' + ID, ds)
            .then(async response => {
              await this.pushmessagePrice(this.formCloseJob.jobNo)
              this.$swal('เรียบร้อย', 'ให้บริการ เสร็จเรียบร้อยแล้ว', 'success')
              if (this.statusSearch === 'no') {
                await this.getBookingList()
              } else {
                await this.searchAny()
              }
              // this.getTimesChange('update')
              if (this.getSelectText) {
                this.getSelect(this.getSelectText, this.getSelectCount)
              }
              this.dialogCloseJob = false
              this.dialogJob = false
              this.loadingCloseJob = false
              this.formCloseJob.totalPrice = 0
            })
        } else {
          this.$swal('ผิดพลาด', 'รายการนี้ปิดงานไปแล้ว', 'error')
          this.dialogCloseJob = false
          this.dialogJob = false
          this.loadingCloseJob = false
          this.formCloseJob.totalPrice = 0
        }
      }).catch(error => {
        this.loadingCloseJob = false
        console.log('Close Job Error', error)
      })
    },
    async pushmessagePrice (jobNo) {
      let updateStatusSend = { updateStatusSend: 'false', checkPayment: this.checkPayment }
      await axios
        .post(this.DNS_IP + '/job/pushClosejob/' + jobNo, updateStatusSend)
        .then(console.log(jobNo))
    },
    async getPackage (dt) {
      this.dataPackage = []
      await axios.get(this.DNS_IP_Loyalty + '/PackageLog/get?shopId=' + dt.shopId + '&lineUserId=' + dt.lineUserId +
      '&flowId=' + dt.flowId).then(response => {
        console.log('PackageLog', response.data)
        let rs = response.data
        if (rs.status !== false) {
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
            d.text = d.packageName
            d.value = d.packageId
            this.dataPackage.push(d)
          }
        } else {
          this.dataPackage = []
        }
      })
    },
    async UpdatePackage (packageId, StatusPackage, packageName, data, tokenPackage) {
      if (StatusPackage === 'ตกลง') {
        this.packageId = packageId
        this.tokenPackage = tokenPackage
        // this.StatusPackage.status = 'ยกเลิก'
        // this.StatusPackage.color = 'red'
        this.StatusPackage.packageName = packageName
        this.StatusPackage.token = data.token
        // console.log(this.dataPackage.findIndex(x => x.token === tokenPackage && x.packageId === packageId))
        this.modelPackageIndexConfirm = this.dataPackage.findIndex(x => x.token === tokenPackage && x.packageId === packageId) - 1
        this.modelPackageIndexConfirmJob = this.dataPackage.findIndex(x => x.token === tokenPackage && x.packageId === packageId) - 1
      } else {
        this.packageId = ''
        this.tokenPackage = ''
        // this.StatusPackage.status = 'ตกลง'
        // this.StatusPackage.color = 'green'
        this.StatusPackage.packageName = ''
        this.StatusPackage.token = ''
        this.modelPackageIndexConfirm = null
        this.modelPackageIndexConfirmJob = null
      }
    },
    updateStatusBookingTransaction (item) {
      this.$swal({
        title: 'ต้องการ ย้ายนัดหมายนี้กลับไปสถานะก่อนหน้า ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async () => {
        var dt = {
          bookNo: item.bookNo,
          contactDate: this.format_date(new Date()),
          status: 'wait',
          statusUse: 'use',
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
        }
        await axios
          .post(this.DNS_IP + '/booking_transaction/add', dt)
          .then(async response => {
          // this.getDataCalendaBooking()
            await this.onUpdateRemark('เนื่องจากลูกค้าไม่สะดวก รอโทรยืนยันอีกครั้ง', item.bookNo)
            this.$swal('เรียบร้อย', 'ย้ายนัดหมายนี้กลับไปสถานะก่อนหน้า เรียบร้อย', 'success')
          // await this.getBookingList()
          // this.getTimesChange('update')
          })
          .catch(error => {
            console.log('error function addData : ', error)
            setTimeout(() => this.confirmChkAdd(), 3000)
          })
      })
    },
    async onUpdateRemark (text, bookNo) {
      var dt = {
        LAST_USER: this.session.data.userName,
        remark: text
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/edit/" + bookNo,
          dt
        )
        .then(async response => {
          if (this.statusSearch === 'no') {
            await this.getBookingList()
          } else {
            await this.searchAny()
          }
          // this.getTimesChange('update')
          if (this.getSelectText) {
            this.getSelect(this.getSelectText, this.getSelectCount)
          }
          clearInterval(this.setTimerCalendar)
          this.setTimerCalendar = null
        })
    },
    async SelectDataHistory () {
      this.HistoryData = []
      this.HistoryData.push(this.defaultData[this.phonenum])
      console.log('this.HistoryData', this.HistoryData)
    },
    async openHistory (item) {
      console.log('item', item)
      this.pictureUrHistory = item.memberPicture
      const BookingData = await axios.get(this.DNS_IP + '/BookingData/get_history?shopId=' + this.$session.getAll().data.shopId + '&userId=' + item.userId)
        .then(async (response) => {
          return response.data
        })
        .catch((error) => {
          console.log('error function addData : ', error)
          return null
        })
      await this.ConvertHistoryData(BookingData)
    },
    async ConvertHistoryData (BookingData) {
      this.HistoryData = []
      this.phonenumItem = []
      // console.log('BookingData', BookingData)
      if (BookingData !== null) {
        if (BookingData.length > 0) {
          this.defaultData = BookingData.reduce((r, a) => {
            let bookNo = a.bookNo
            let filter = (a.fieldName === 'เบอร์โทร') ? a.fieldValue : null
            if (filter !== null) {
              r[filter] = r[filter] || {}
              r[filter][bookNo] = r[filter][bookNo] || []
              r[filter][bookNo].push(BookingData.filter(item => item.bookNo === a.bookNo))
              this.phonenumItem.push(filter)
            }
            return r
          }, Object.create(null))

          console.log(this.defaultData)
          this.phonenum = ''
          this.dialogHistory = true
        } else if (BookingData.status === false) {
          this.$swal('ไม่พบประวัติการเข้ารับบริการ', 'กรูณาตรวจสอบข้อมูล', 'info')
          this.dialogHistory = false
        }
      } else {
        this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
          this.dialogHistory = false
        }).catch((error) => {
          console.log('error function addData : ', error)
          this.dialogHistory = false
        })
      }

      // console.log('this.HistoryData', this.HistoryData)
    },
    async AddDataTag () {
      await axios
        .get(this.DNS_IP + '/Mas_Tag/get?shopId=' + this.session.data.shopId + '&tagName=' + this.tagName).then((response) => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.status === false) {
            this.$swal({
              title: 'ต้องการ เพิ่มข้อมูล ใช่หรือไม่?',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#b3b1ab',
              confirmButtonText: 'ใช่',
              cancelButtonText: 'ไม่'
            }).then(async () => {
              let dt = {
                tagName: this.tagName,
                CREATE_USER: this.$session.getAll().data.USER_ROLE,
                LAST_USER: this.$session.getAll().data.USER_ROLE,
                shopId: this.$session.getAll().data.shopId
              }
              await axios
                .post(this.DNS_IP + '/Mas_Tag/add', dt)
                .then(async (response) => {
                  this.$swal('บันทึกข้อมูลเรียบร้อย', ' ', 'success')
                  this.dialogAddTag = false
                  this.getTagData()
                })
              // eslint-disable-next-line handle-callback-err
                .catch((error) => {
                  console.log('error function addData : ', error)
                })
            })
          } else {
            this.$swal('มีข้อมูลอยู่แล้ว', ' ', 'error')
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    },
    async getTagData () {
      this.tagItem = await this.getDataFromAPI('/Mas_Tag/get', 'tagId', 'tagName', '')
    },
    async editTagData () {
      console.log('tagData', this.tagData)
      let dt = {
        tagData: JSON.stringify(this.tagData),
        LAST_USER: this.session.data.userName
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/member/edit/" + this.memberId,
          dt
        )
        .then(async response => {
          this.$swal('เรียบร้อย', 'อัพเดท Tag เรียบร้อย', 'success')
          this.dialogTag = false
          if (this.statusSearch === 'no') {
            await this.getBookingList()
          } else {
            await this.searchAny()
          }
          // this.getTimesChange('update')
          if (this.getSelectText) {
            this.getSelect(this.getSelectText, this.getSelectCount)
          }
        })
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
        LAST_USER: this.session.data.userName
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
          if (this.statusSearch === 'no') {
            await this.getBookingList()
          } else {
            await this.searchAny()
          }
          // this.getTimesChange('update')
          if (this.getSelectText) {
            this.getSelect(this.getSelectText, this.getSelectCount)
          }
        })
    },
    async cancelStatusDeposit () {
      this.loadingDeposit = true
      console.log('bookNo', this.bookNo)
      let dt = {
        depositStatus: 'False',
        LAST_USER: this.session.data.userName
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
          if (this.statusSearch === 'no') {
            await this.getBookingList()
          } else {
            await this.searchAny()
          }
          // this.getTimesChange('update')
          if (this.getSelectText) {
            this.getSelect(this.getSelectText, this.getSelectCount)
          }
        })
    },
    selectImgDeposit () {
      if (this.filesDeposit) {
        this.pictureUrlPreviewDeposit = URL.createObjectURL(
          this.filesDeposit
        )
      } else {
        this.pictureUrlPreviewDeposit = ''
      }
      // console.log(event)
    },
    selectImgAdd () {
      if (this.filesDepositAdd) {
        this.formAdd.pictureUrlPreviewDeposit = URL.createObjectURL(
          this.filesDepositAdd
        )
      } else {
        this.formAdd.pictureUrlPreviewDeposit = ''
      }
      // console.log(event)
    },
    setFlowAdd () {
      if (this.DataFlowName.filter(el => { return el.value === this.formAdd.flowId }).length > 0) {
        this.checkDepositAdd = this.DataFlowName.filter(el => { return el.value === this.formAdd.flowId })[0].allData.checkDeposit || 'False'
      } else {
        this.checkDepositAdd = 'False'
      }
    },
    async getBookingFieldText () {
      if (JSON.parse(localStorage.getItem('sessionData')) === null) {
        await axios
          .get(
            this.DNS_IP + '/BookingField/get?shopId=' + this.session.data.shopId
          )
          .then(async response => {
            let rs = response.data
            console.log('rs', rs)
            if (rs.status === false) {
              this.$swal('ผิดพลาด', 'เนื่องจากไม่สามารถเรียกชื่อกระบวนการ และประเภทงานได้', 'success')
            } else {
              localStorage.setItem('typeData', JSON.stringify(rs[0]))
              this.dataTypeJob1 = JSON.parse(localStorage.getItem('typeData')).typeJob1 || ''
              this.dataTypeJob2 = JSON.parse(localStorage.getItem('typeData')).typeJob2 || ''
              this.dataTypeJob3 = JSON.parse(localStorage.getItem('typeData')).typeJob3 || ''
              this.dataTypeProcess1 = JSON.parse(localStorage.getItem('typeData')).typeProcess1 || ''
              this.dataTypeProcess2 = JSON.parse(localStorage.getItem('typeData')).typeProcess2 || ''
              this.dataTypeProcess3 = JSON.parse(localStorage.getItem('typeData')).typeProcess3 || ''
              this.dataTypeProcess4 = JSON.parse(localStorage.getItem('typeData')).typeProcess4 || ''
            }
          })
      } else {
        this.dataTypeJob1 = JSON.parse(localStorage.getItem('typeData')).typeJob1 || ''
        this.dataTypeJob2 = JSON.parse(localStorage.getItem('typeData')).typeJob2 || ''
        this.dataTypeJob3 = JSON.parse(localStorage.getItem('typeData')).typeJob3 || ''
        this.dataTypeProcess1 = JSON.parse(localStorage.getItem('typeData')).typeProcess1 || ''
        this.dataTypeProcess2 = JSON.parse(localStorage.getItem('typeData')).typeProcess2 || ''
        this.dataTypeProcess3 = JSON.parse(localStorage.getItem('typeData')).typeProcess3 || ''
        this.dataTypeProcess4 = JSON.parse(localStorage.getItem('typeData')).typeProcess4 || ''
      }
    },
    closeSetTimeGetCalenda () {
      clearInterval(this.setTimerCalendar)
      this.setTimerCalendar = null
    },
    gotoMap () {
      window.open('https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=' + this.center.lat + ',' + this.center.lng, '_blank')
      // window.location.href = 'https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=' + this.center.lat + ',' + this.center.lng
    },
    setShowMap (dt) {
      this.center = null
      if (dt.addressLatLong === null && dt.addressLatLong === '') {
        this.center = null
      } else {
        this.center = JSON.parse(dt.addressLatLong)
        this.address = dt.address
        this.dialogMap = true
      }
    },
    async searchAny () {
      if (this.searchOther.trim().length > 1) {
        // this.dataReady = false
        this.selectedStatus = true
        // this.getSelectText = ''
        this.dataItem = []
        this.countWaiting = 0
        this.countConfirm = 0
        this.countCancel = 0
        this.countJob = 0
        this.countAll = 0
        // Clear ช่องค้นหา
        this.searchAll2 = ''
        // this.dataItemSelect = []
        var dataItemTimes = []
        var dataItems = []
        await this.getBookingDataList('no', this.searchOther)
        await axios
          .get(
          // eslint-disable-next-line quotes
            this.DNS_IP +
            '/booking_view/getSearch?shopId=' +
            this.session.data.shopId +
            '&fieldValue=' +
            this.searchOther + '&checkOnsite=is null'
          )
          .then(async response => {
          // console.log('getData', response.data)
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                let d = response.data[i]
                let s = {}
                if (dataItems.filter(el => { return el.bookNo === d.bookNo }).length === 0) {
                  // console.log('d.bookNo', d.bookNo)
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
                  s.memberId = d.memberId
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
                  s.address = d.address
                  s.addressLatLong = d.addressLatLong
                  s.countChangeTime = d.countChangeTime || 0
                  s.remarkReturn = d.remarkReturn || ''
                  s.dateReturn = d.dateReturn || ''
                  s.packageId = d.packageId || ''
                  s.tokenPackage = d.tokenPackage || ''
                  s.memberDataTag = JSON.parse(d.memberDataTag) || []
                  if (s.memberDataTag.length > 0) {
                    s.tagDataShow = []
                    let memberDataTag = s.memberDataTag
                    for (let i = 0; i < memberDataTag.length; i++) {
                      let d = memberDataTag[i]
                      let x = {}
                      let checkTagItem = this.tagItem.filter(el => { return el.value === d })
                      if (checkTagItem.length > 0) {
                        x.text = checkTagItem[0].text
                        x.value = checkTagItem[0].value
                        s.tagDataShow.push(x)
                      }
                    }
                  }
                  this.countAll = this.countAll + 1
                  if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                    s.chkConfirm = true
                    s.chkCancel = false
                  }
                  if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                    s.chkConfirm = false
                    s.chkCancel = true
                  }
                  s.statusBt = d.statusBt || 'wait'
                  switch (d.statusBt) {
                    case 'confirm':
                      s.statusBtText = 'ยืนยันแล้ว'
                      this.countConfirm = this.countConfirm + 1
                      break
                    case 'cancel':
                      s.statusBtText = 'ยกเลิก'
                      this.countCancel = this.countCancel + 1
                      break
                    case 'confirmJob':
                      s.statusBtText = 'รับรถแล้ว'
                      this.countJob = this.countJob + 1
                      break
                    default:
                      s.statusBtText = 'รายการนัดหมายใหม่'
                      this.countWaiting = this.countWaiting + 1
                      break
                  }
                  var chkTime = this.dataItemTime.filter(el => { return el.timeDueHtext === s.timeDueHtext })
                  if (chkTime.length === 0) {
                    dataItemTimes.push(s)
                  }
                  // console.log('this.BookingDataListSearch', this.BookingDataList[d.bookNo])
                  s.cusName = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'ชื่อ')
                  s.cusReg = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เลขทะเบียน')
                  s.tel = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เบอร์โทร')
                  s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                  s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                  s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                  // s.cusName = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'ชื่อ')
                  // s.cusReg = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เลขทะเบียน')
                  // s.tel = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เบอร์โทร')
                  // s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                  // s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                  // s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                  dataItems.push(s)
                }
              }
            }
            if (dataItems.length === 0 || dataItems.status === false) {
              this.dataItem = []
              this.dataItemTime = []
              // await this.getTimesChange('update')
              if (this.getSelectText) {
                this.getSelect(this.getSelectText, 0)
              } else {
                this.getSelect('wait', this.countWaiting)
              }
              this.dataReady = true
            // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
            } else {
              this.dataItem = dataItems
              var datause = dataItemTimes.sort((a, b) => {
                if (a.timeDueHtext < b.timeDueHtext) return -1
                return a.timeDueHtext > b.timeDueHtext ? 1 : 0
              })
              console.log('datause', datause)
              for (var k = 0; k < datause.length; k++) {
                var t = datause[k]
                var h = {}
                h.timeDueHtext = t.timeDueHtext
                let chkTimes = this.dataItemTime.filter(el => { return el.timeDueHtext === t.timeDueHtext })
                // console.log('chkTimes', chkTimes)
                if (chkTimes.length === 0) {
                  this.dataItemTime.push(h)
                }
              }
              // await this.getTimesChange('update')
              if (this.getSelectText) {
                this.getSelect(this.getSelectText, 0)
              } else {
                this.getSelect('wait', this.countWaiting)
              }
              // this.dataItemTime = dataItemTimes.sort((a, b) => {
              //   if (a.timeDueHtext < b.timeDueHtext) return -1
              //   return a.timeDueHtext > b.timeDueHtext ? 1 : 0
              // })
              console.log('this.BookingDataList', this.BookingDataList)
              this.dataReady = true
            }
          })
        // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log(error)
            this.dataReady = true
            setTimeout(() => this.searchAny(), 3000)
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
          })
      } else {
        this.$swal('ผิดพลาด', 'กรุณาใส่คำค้นหาให้มากว่า 1 ตัวอักษร', 'error')
      }
    },
    openRemark (item) {
      this.bookNoRemark = item.bookNo
      this.remark = item.remark
      this.dialogRemark = true
    },
    async openRemarkReturn (item) {
      console.log('openRemarkReturn', item)
      await axios.get(this.DNS_IP + '/job/getJobNo?jobNo=' + item.jobNo).then((response) => {
        let rs = response.data
        console.log('getJobNo', rs)
        if (rs.length > 0) {
          this.lineUserId = rs[0].lineUserId || ''
        } else {
          this.lineUserId = ''
        }
      })
      this.dateReturn = item.dateReturn
      this.bookNoRemark = item.bookNo
      // this.lineUserId = item.lineUserId
      this.remarkReturn = item.remarkReturn
      this.dialogRemarkReturn = true
    },
    async onSaveRemark () {
      var dt = {
        LAST_USER: this.session.data.userName,
        remark: (this.remark || '').replace(/%/g, '%%')
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/edit/" + this.bookNoRemark,
          dt
        )
        .then(async response => {
          this.$swal('เรียบร้อย', 'เปลี่ยนแปลงหมายเหตุเพิ่มเติมเรียบร้อย', 'success')
          this.dialogRemark = false
          if (this.statusSearch === 'no') {
            await this.getBookingList()
          } else {
            await this.searchAny()
          }
          // this.getTimesChange('update')
          if (this.getSelectText) {
            this.getSelect(this.getSelectText, this.getSelectCount)
          }
        })
    },
    async onSaveRemarkReturn () {
      if (this.remarkReturn !== '' && this.dateReturn !== '') {
        var dt = {
          bookNo: this.bookNoRemark,
          remarkReturn: (this.remarkReturn || '').replace(/%/g, '%%'),
          dateReturn: this.dateReturn,
          lineUserId: this.lineUserId,
          shopId: this.session.data.shopId,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
        }
        await axios
          .post(
          // eslint-disable-next-line quotes
            this.DNS_IP + "/bookingRemarkReturnLog/addRecordD",
            dt
          )
          .then(async response => {
            this.$swal('เรียบร้อย', 'เปลี่ยนแปลงหมายเหตุเรียบร้อย', 'success')
            this.dialogRemarkReturn = false
            if (this.lineUserId !== '') {
              let pushText = {
                'to': this.lineUserId,
                'messages': [
                  {
                    'type': 'text',
                    'text': ` 📣 คุณลูกค้ามีนัด\n 🛎 ${this.remarkReturn}
                          \nวันที่กลับมาใช้บริการ ${this.format_dateNotime(this.dateReturn)}`
                  }
                ]
              }
              axios
                .post(
                  this.DNS_IP + '/line/pushmessage?shopId=' + this.$session.getAll().data.shopId,
                  pushText
                )
                .catch(error => {
                  console.log('error function addData : ', error)
                })
            }
            if (this.statusSearch === 'no') {
              await this.getBookingList()
            } else {
              await this.searchAny()
            }
            // this.getTimesChange('update')
            if (this.getSelectText) {
              this.getSelect(this.getSelectText, this.getSelectCount)
            }
          })
      } else {
        this.$swal('ผิดพลาด', 'กรุณากรอก หมายเหตุ และวันที่เรียกลูกค้ากลับ', 'error')
      }
    },
    async setDataEdit (dt) {
      this.checkSelectText = dt.statusBt
      // this.dialogEditData = true
      await this.getBookingField()
      // await this.getBookingData(dt, 'edit')
      console.log('setDataEdit', dt)
      this.dataEdit = dt
      this.BookingDataItemEdit = []
      this.formEdit.masBranchID = dt.masBranchID
      this.formEdit.flowId = dt.flowId
      this.empSelectEdit = parseInt(dt.empSelect)
      this.dueDateOld = this.momenDate_1(dt.dueDate)
      this.dueDateTimeOld = this.momenTime(dt.dueDate)

      // this.SetallowedDatesEdit()
      this.dateEdit = moment(moment(dt.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
      this.timeavailable = []
      // let dtTime = await this.branch.filter(item => { return item.value === this.formEdit.masBranchID })
      let dtTime = this.dataFlowSelectEdit.filter(item => { return item.value === this.formEdit.flowId })
      if (dtTime.length > 0) {
        // console.log('test', JSON.parse(dtTime.map(item => item.allData.setTime)))
        this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
        if (this.timeavailable.filter(el => { return el.text === dt.timeText }).length > 0) {
          if (dt.timeText) {
            this.timeEdit = { text: dt.timeText, value: dt.dueDate.slice(-5) }
          } else {
            this.timeEdit = { text: dt.dueDate.slice(-5), value: dt.dueDate.slice(-5) }
          }
        } else {
          this.timeEdit = { text: dt.dueDate.slice(-5), value: dt.dueDate.slice(-5) }
        }
      }
      await this.getPackage(dt)
      if (this.dataPackage.length > 0) {
        console.log('dataPackage', this.dataPackage.filter(el => { return el.packageId === dt.packageId }))
        if (this.dataPackage.filter(el => { return el.packageId === dt.packageId }).length > 0) {
          var dataPack = this.dataPackage.filter(el => { return el.packageId === dt.packageId })
          this.dataPackageDefault = true
          // this.packageId = dataPack[0].value
          this.UpdatePackage(dataPack[0].value, 'ตกลง', dataPack[0].text, dataPack[0], dt.tokenPackage)
        } else {
          this.UpdatePackage('', 'ยกเลิก', '', '', '')
          this.dataPackageDefault = false
        }
      }
      var extraJob = ''
      var fastTrack = ''
      if (dt.extraJob === null) {
        extraJob = false
      } else {
        extraJob = dt.extraJob
      }
      if (dt.fastTrack === null) {
        fastTrack = false
      } else {
        fastTrack = dt.fastTrack
      }

      if (!extraJob && !fastTrack) {
        this.formEdit.radiosRemark = 'ซ่อมปกติ'
      } else if (extraJob && !fastTrack) {
        this.formEdit.radiosRemark = 'ExtraJob'
      } else if (!extraJob && fastTrack) {
        this.formEdit.radiosRemark = 'FastTrack'
      }

      let itemIncustomField = []
      await axios
        .get(
          this.DNS_IP + '/BookingField/get?shopId=' + this.session.data.shopId
        )
        .then(async response1 => {
          let rs2 = response1.data
          if (rs2.length > 0) {
            let bookingData = []
            bookingData = JSON.parse(rs2[0].flowfieldName)
            for (let i = 0; i < bookingData.length; i++) {
              let d = bookingData[i]
              itemIncustomField.push(d.fieldId)
            }
            await axios
              .get(this.DNS_IP + '/customField/fieldId?fieldId=' + itemIncustomField)
              .then(async responses => {
                let rs1 = responses.data
                console.log('customField', rs1)
                await axios
                  .get(this.DNS_IP + '/BookingDataSelect/get?bookNo=' + dt.bookNo)
                  .then(async response => {
                    let rs = response.data
                    console.log('BookingDataSelect', rs)
                    if (rs.length > 0) {
                      let sortrs = rs1.sort((a, b) => a.sortNoField - b.sortNoField)
                      for (var i = 0; i < sortrs.length; i++) {
                        var d = sortrs[i]
                        var s = {}
                        var dataBD = rs.filter(el => { return parseInt(el.fieldId) === parseInt(d.fieldId) })
                        // console.log('dataBD', dataBD)
                        if (dataBD.length > 0) {
                          s.bookNo = dataBD[0].bookNo
                          s.bookingFieldId = rs2[0].bookingFieldId
                          s.bookingDataId = dataBD[0].bookingDataId
                          s.conditionField = d.conditionField
                          s.fieldId = d.fieldId
                          s.fieldType = d.fieldType
                          s.fieldValue = dataBD[0].fieldValue
                          s.fieldName = d.fieldName
                          s.conditionField = d.conditionField
                          s.conditionValue = d.conditionValue
                          s.requiredField = d.requiredField
                          s.optionField = d.optionField
                          this.BookingDataItemEdit.push(s)
                        } else {
                          s.bookNo = rs[0].bookNo
                          s.bookingFieldId = rs2[0].bookingFieldId
                          s.bookingDataId = 'newDataBooking'
                          s.conditionField = d.conditionField
                          s.fieldId = d.fieldId
                          s.fieldType = d.fieldType
                          s.fieldValue = ''
                          s.fieldName = d.fieldName
                          s.conditionField = d.conditionField
                          s.conditionValue = d.conditionValue
                          s.requiredField = d.requiredField
                          s.optionField = d.optionField
                          this.BookingDataItemEdit.push(s)
                        }
                      }
                    } else {
                      this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
                        this.dialogEditData = false
                      }).catch((error) => {
                        console.log('error function setDataEdit : ', error)
                        this.dialogEditData = false
                      })
                    }
                  }).catch((error) => {
                    this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
                      this.dialogEditData = false
                    }).catch((error) => {
                      console.log('error function setDataEdit : ', error)
                      this.dialogEditData = false
                    })
                    console.log('error function setDataEdit : ', error)
                  })
              })
          } else {
            this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
              this.dialogEditData = false
            }).catch((error) => {
              console.log('error function setDataEdit : ', error)
              this.dialogEditData = false
            })
          }
        }).catch((error) => {
          this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
            this.dialogEditData = false
          }).catch((error) => {
            console.log('error function setDataEdit : ', error)
            this.dialogEditData = false
          })
          console.log('error function setDataEdit : ', error)
        })
      console.log('this.BookingDataItemEdit', this.BookingDataItemEdit)
      this.dialogEditData = true
      this.SetallowedDatesEdit()
    },
    editDataSelect () {
      this.validate('EDIT')
      setTimeout(() => this.checkDuplicate(), 500)
      // setTimeout(() => this.editDataSelectSubmit(), 500)
    },
    async checkDuplicate () {
      if (this.validEdit !== false) {
        this.loadingEdit = true
        this.swalConfig.title = 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?'
        this.$swal(this.swalConfig)
          .then(async result => {
            if (this.getSelectText === 'cancel') {
              this.editDataSelectSubmit()
            } else {
              if (this.formEdit.radiosRemark === 'FastTrack') {
                let getcount = await this.getCountFastTrack(this.dateEdit, this.formEdit.flowId, this.formEdit.masBranchID)
                let setCountFast = this.branch.filter(el => { return el.value === this.formEdit.masBranchID })[0].allData.countFastTrack
                if (getcount < setCountFast) {
                  let chkStatLimit = this.dataFlowSelectEdit.filter(el => { return el.value === this.formEdit.flowId })
                  console.log('this.getSelectText', this.getSelectText)
                  if (chkStatLimit.length > 0) {
                    if (chkStatLimit[0].allData.limitBookingCheck === 'True') {
                      let dueOld = this.dueDateOld + this.dueDateTimeOld
                      let dueNew = this.dateEdit + this.timeEdit.value
                      let limitBookingCount = this.timeavailable.filter(el => { return el.value === this.timeEdit.value })
                      console.log('limitBookingCount', limitBookingCount)
                      let limitBookingCounts = 0
                      if (limitBookingCount.length > 0) {
                        limitBookingCounts = parseInt(limitBookingCount[0].limitBooking)
                      } else {
                        limitBookingCounts = 0
                      }
                      if (dueOld !== dueNew) {
                        let chkStatus = await this.updateLimitBookingChange(this.dataEdit, this.dueDateOld, this.dueDateTimeOld, this.dateEdit, this.timeEdit.value, limitBookingCounts)
                        console.log('chkStatus', chkStatus)
                        if (chkStatus.status) {
                          this.editDataSelectSubmit()
                        } else {
                          this.$swal('ผิดพลาด', 'เวลาที่ท่านเลือกคิวเต็มแล้ว', 'error')
                          this.loadingEdit = false
                        }
                      } else {
                        this.editDataSelectSubmit()
                      }
                    } else {
                      this.editDataSelectSubmit()
                    }
                  } else {
                    this.editDataSelectSubmit()
                  }
                } else {
                  this.textError = 'จำนวนงานด่วนต่อวัน เกินกว่าที่ตั้งไว้'
                  this.dialogError = true
                  this.loadingEdit = false
                }
              } else {
                let chkStatLimit = this.dataFlowSelectEdit.filter(el => { return el.value === this.formEdit.flowId })
                console.log('this.getSelectText', this.getSelectText)
                if (chkStatLimit.length > 0) {
                  if (chkStatLimit[0].allData.limitBookingCheck === 'True') {
                    let dueOld = this.dueDateOld + this.dueDateTimeOld
                    let dueNew = this.dateEdit + this.timeEdit.value
                    let limitBookingCount = this.timeavailable.filter(el => { return el.value === this.timeEdit.value })
                    console.log('limitBookingCount', limitBookingCount)
                    let limitBookingCounts = 0
                    if (limitBookingCount.length > 0) {
                      limitBookingCounts = parseInt(limitBookingCount[0].limitBooking)
                    } else {
                      limitBookingCounts = 0
                    }
                    if (dueOld !== dueNew) {
                      let chkStatus = await this.updateLimitBookingChange(this.dataEdit, this.dueDateOld, this.dueDateTimeOld, this.dateEdit, this.timeEdit.value, limitBookingCounts)
                      console.log('chkStatus', chkStatus)
                      if (chkStatus.status) {
                        this.editDataSelectSubmit()
                      } else {
                        this.$swal('ผิดพลาด', 'เวลาที่ท่านเลือกคิวเต็มแล้ว', 'error')
                        this.loadingEdit = false
                      }
                    } else {
                      this.editDataSelectSubmit()
                    }
                  } else {
                    this.editDataSelectSubmit()
                  }
                } else {
                  this.editDataSelectSubmit()
                }
              }
            }
          }).catch(error => {
            this.loadingEdit = false
            console.log('editDataSelectSubmit error', error)
          })
      } else {
        this.loadingEdit = false
      }
    },
    async editDataSelectSubmit () {
      // if (this.validEdit !== false) {
      if (this.$session.id() !== undefined) {
        this.dataEditReady = false
        let rs = this.BookingDataItemEdit
        let Add = []
        let fielditem = this.BookingDataItemEdit
        console.log('this.BookingDataItemEdit', this.BookingDataItemEdit)
        var fastTrack = 'False'
        var extraJob = 'False'
        switch (this.formEdit.radiosRemark) {
          case 'ซ่อมปกติ':
            fastTrack = 'False'
            extraJob = 'False'
            break
          case 'ExtraJob':
            fastTrack = 'False'
            extraJob = 'True'
            break
          case 'FastTrack':
            fastTrack = 'True'
            extraJob = 'False'
            break
        }
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          let update = {}
          if (d.conditionField === '' || d.conditionField === null) {
            update.fieldId = d.fieldId
            update.bookingDataId = d.bookingDataId
            update.bookingFieldId = d.bookingFieldId
            update.bookNo = d.bookNo
            update.fieldValue = (d.fieldValue || '').replace(/%/g, '%%')
            update.dueDate = this.dateEdit + ' ' + this.timeEdit.value
            update.timeText = this.timeEdit.text
            update.flowId = this.formEdit.flowId
            update.masBranchID = this.formEdit.masBranchID
            update.fastTrack = fastTrack
            update.extraJob = extraJob
            update.LAST_USER = this.$session.getAll().data.userName
            update.empSelect = this.empSelectEdit
            update.shopId = this.session.data.shopId
            Add.push(update)
          } else {
            if (
              fielditem.filter(row => {
                return row.fieldId === parseInt(d.conditionField)
              }).length > 0
            ) {
              if (
                d.conditionValue ===
              fielditem.filter(row => {
                return row.fieldId === parseInt(d.conditionField)
              })[0].fieldValue
              ) {
                update.fieldId = d.fieldId
                update.bookingDataId = d.bookingDataId
                update.bookingFieldId = d.bookingFieldId
                update.bookNo = d.bookNo
                update.fieldValue = (d.fieldValue || '').replace(/%/g, '%%')
                update.dueDate = this.dateEdit + ' ' + this.timeEdit.value
                update.timeText = this.timeEdit.text
                update.flowId = this.formEdit.flowId
                update.masBranchID = this.formEdit.masBranchID
                update.fastTrack = fastTrack
                update.extraJob = extraJob
                update.LAST_USER = this.$session.getAll().data.userName
                update.empSelect = this.empSelectEdit
                update.shopId = this.session.data.shopId
                Add.push(update)
              }
            } else if (d.conditionField === 'flow') {
              if (parseInt(d.conditionValue) === parseInt(this.formEdit.flowId)) {
                update.fieldId = d.fieldId
                update.bookingDataId = d.bookingDataId
                update.bookingFieldId = d.bookingFieldId
                update.bookNo = d.bookNo
                update.fieldValue = (d.fieldValue || '').replace(/%/g, '%%')
                update.dueDate = this.dateEdit + ' ' + this.timeEdit.value
                update.timeText = this.timeEdit.text
                update.flowId = this.formEdit.flowId
                update.masBranchID = this.formEdit.masBranchID
                update.fastTrack = fastTrack
                update.extraJob = extraJob
                update.LAST_USER = this.$session.getAll().data.userName
                update.empSelect = this.empSelectEdit
                update.shopId = this.session.data.shopId
                Add.push(update)
              }
            }
          }
        }
        console.log('Add', Add)
        // this.swalConfig.title = 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?'
        // this.$swal(this.swalConfig)
        //   .then(async result => {
        await axios
          .post(
            // eslint-disable-next-line quotes
            this.DNS_IP + "/BookingData/editAdmin",
            Add
          )
          .then(async response => {
            if (this.statusSearch === 'no') {
              await this.getBookingList()
            } else {
              await this.searchAny()
            }
            // this.getTimesChange('update')
            this.formEdit.radiosRemark = ''
            if (this.getSelectText) {
              this.getSelect(this.getSelectText, this.getSelectCount)
            }
            this.getDataCalendaBooking()
            this.dialogEditData = false
            this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
            this.dataEditReady = true
            this.loadingEdit = false
          }).catch(error => {
            // this.dataEditReady = true
            setTimeout(() => this.editDataSelectSubmit(), 3000)
            console.log('close alert : ', error)
          })
          // }).catch(error => {
          //   // this.dataEditReady = true
          //   setTimeout(() => this.editDataSelectSubmit(), 3000)
          //   console.log('close alert : ', error)
          // })
      } else {
        this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
        clearInterval(this.setTimerCalendar)
        this.setTimerCalendar = null
        this.$router.push('/Core/Login')
      }
      // }
    },
    async getDataCalendaBooking () {
      console.log('this.$session.id()', this.$session.id())
      if (this.$session.id() !== undefined) {
        console.log('getDataCalendaBooking')
        try {
          await this.$refs.CalendarBooking.getDataReturn('&checkOnsite=is null', this.dateStart)
        } catch (e) { console.log(e) }
      // this.$refs.CalendarBooking.getDataFlow()
      // this.$refs.CalendarBooking.getDataBranch()
      // this.$refs.CalendarBooking.getBookingList()
      } else {
        this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
        clearInterval(this.setTimerCalendar)
        this.setTimerCalendar = null
        this.$router.push('/Core/Login')
      }
    },
    async addDataSet () {
      this.remark = ''
      let _this = this
      this.setTimerCalendar = setInterval(function () { _this.getDataCalendaBooking() }, 20000)
      // var _this = this
      // this.setTimerCalendar = setInterval(function () { _this.getDataCalendaBooking() }, 30000)
      this.dialogAdd = true
      setTimeout(() => this.getDataCalendaBooking(), 1000)
      if (this.branch.length === 0) {
        this.getDataBranch()
      }
      this.getBookingField()
      this.checkTime()
    },
    async getDataDefault () {
      this.loadingRefresh = true
      await this.getDataBranch()
      await this.getEmpSelectAdd()
      this.getCustomFieldStart()
      this.getDataFlow()
      await this.getBookingList()
      // await this.getTimesChange('update')
      this.getSelect(this.getSelectText, this.getSelectCount)
      // this.getDataCalendaBooking()
      this.loadingRefresh = false
    },
    async getDataSetTime () {
      if (this.statusSearch === 'no') {
        await this.getBookingList()
      } else {
        await this.searchAny()
      }
      // await this.getTimesChange('update')
      if (this.getSelectText) {
        this.getSelect(this.getSelectText, this.getSelectCount)
      }
    },
    checkTime () {
      this.timeavailable = []
      // console.log('dataFlowSelectAdd', this.dataFlowSelectAdd)
      let dtTime = this.dataFlowSelectAdd.filter(item => { return item.value === this.formAdd.flowId })
      if (dtTime.length > 0) {
        // let dtTime = this.branch.filter(item => { return item.value === this.formAdd.masBranchID })
        // console.log('test', dtTime)
        // this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
        // console.log('timevailable', this.timeavailable)
        if (dtTime.map(item => item.allData.setTime) === null) {
          this.timeavailable = []
          // this.$swal('แจ้งเตือน', 'เนื่องจากยังไม่ได้ตั้งค่าเวลา', 'info')
        } else {
          this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
        }
      }
    },
    checkTimeEdit () {
      this.timeavailable = []
      let dtTime = this.dataFlowSelectEdit.filter(item => { return item.value === this.formEdit.flowId })
      if (dtTime.length > 0) {
        // let dtTime = this.branch.filter(item => { return item.value === this.formEdit.masBranchID })
        // console.log('test', dtTime)
        // this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
        // console.log('timevailable', this.timeavailable)
        if (dtTime.map(item => item.allData.setTime) === null) {
          this.timeavailable = []
          // this.$swal('แจ้งเตือน', 'เนื่องจากยังไม่ได้ตั้งค่าเวลา', 'info')
        } else {
          this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
        }
      }
    },
    checkTimeFlow (dt) {
      this.timeavailable = []
      // let dtTime = this.branch.filter(item => { return item.value === this.masBranchID })
      let dtTime = this.DataFlowName.filter(item => { return item.value === dt.flowId })
      if (dtTime.length > 0) {
        // console.log('test', JSON.parse(dtTime.map(item => item.allData.setTime)))
        if (dtTime.map(item => item.allData.setTime) === null) {
          this.timeavailable = []
          // this.$swal('แจ้งเตือน', 'เนื่องจากยังไม่ได้ตั้งค่าเวลา', 'info')
        } else {
          this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
        }
        // console.log('timevailable', this.timeavailable)
      }
    },
    async getCountFastTrack (dateS, flowId, branch) {
      let result = []
      let dateSelect = ''
      if (dateS) {
        dateSelect = this.momenDate_1(dateS)
      } else {
        dateSelect = this.momenDate_1(new Date())
      }
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/booking_view/getCountFastTrack?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            branch +
            '&dueDate=' +
            dateSelect + '&checkOnsite=is null&flowId=' + flowId + '&fastTrack=True'
        )
        .then(async response => {
          console.log('response.data[0].countFastTrack', response.data[0].countFastTrack)
          if (response.data.status === false) {
            result = 'ไม่มีข้อมูล'
          } else {
            result = response.data[0].countFastTrack
          }
        })
      return result
    },
    async confirmRemark (item, text) {
      console.log('item', item)
      let dt = null
      let errorMessage = ''
      if (text === 'inAdvance') {
        dt = {
          remarkConfirm1: item.remarkConfirm1,
          LAST_USER: this.session.data.userName
        }
      } else if (text === 'inDay') {
        dt = {
          remarkConfirm2: item.remarkConfirm2,
          LAST_USER: this.session.data.userName
        }
      } else if (text === 'extraJob') {
        dt = {
          fastTrack: (item.extraJob) ? false : item.fastTrack,
          extraJob: item.extraJob,
          LAST_USER: this.session.data.userName
        }
      } else if (text === 'fastTrack') {
        if (item.fastTrack === true) {
          let getcount = await this.getCountFastTrack(item.dueDate, this.flowSelect, this.masBranchID)
          let setCountFast = this.branch.filter(el => { return el.value === this.masBranchID })[0].allData.countFastTrack
          console.log('getcount', getcount)
          console.log('setCountFast', setCountFast)
          if (getcount < setCountFast) {
            dt = {
              extraJob: (item.fastTrack) ? false : item.extraJob,
              fastTrack: item.fastTrack,
              LAST_USER: this.session.data.userName
            }
          } else {
            dt = null
            item.fastTrack = false
            errorMessage = 'จำนวนงานด่วนต่อวัน เกินกว่าที่ตั้งไว้'
          }
        } else {
          dt = {
            extraJob: (item.fastTrack) ? false : item.extraJob,
            fastTrack: item.fastTrack,
            LAST_USER: this.session.data.userName
          }
        }
      }
      if (dt) {
        await axios
          .post(this.DNS_IP + '/Booking/edit/' + item.bookNo, dt)
          .then(async response => {
            if (this.statusSearch === 'no') {
              await this.getBookingList()
            } else {
              await this.searchAny()
            }
            // this.getTimesChange('update')
            if (this.getSelectText) {
              this.getSelect(this.getSelectText, this.getSelectCount)
            }
            console.log('getSelectText', this.getSelectText, this.getSelectCount)
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
      } else {
        this.$swal('ผิดพลาด', errorMessage, 'error')
      }
    },
    exportExcelMazda () {
      const url = `${window.location.origin}/mazda/report?shopId=${this.session.data.shopId}&masBranchID=${this.masBranchID}&timeTable=${this.timeTable}&checkOnsite=is null`
      window.open(url, '_blank').focus()
    },
    exportExcel () {
      let dataExport = []
      this.dataexport = []
      let runNo = 0
      // console.log('bookingData', this.BookingDataListTimechange)
      // console.log('this.editedItemSeleteField', this.editedItemSeleteField)
      // console.log('this.dataItemTimesChange', this.dataItemTimesChange)
      // console.log('this.dataItemTime', this.dataItemTime)
      var datause = this.dataItemTime.sort((a, b) => {
        if (a.timeDuetext < b.timeDuetext) return -1
        return a.timeDuetext > b.timeDuetext ? 1 : 0
      })
      for (let i = 0; i < datause.length; i++) {
        // var d = this.dataItemTimesChange.filter(el => { return el.timeDueHtext === item.timeDueHtext })[i]
        let d = datause[i]
        let dataSelect = this.dataItemTimesChange.filter(el => { return el.timeDueHtext === d.timeDueHtext && el.fastTrack && (el.statusBtText === 'ยืนยันแล้ว' || el.statusBtText === 'รับรถแล้ว') })
        console.log('s.dataSelect', dataSelect)
        if (dataSelect.length > 0) {
          var datauseSelect = dataSelect.sort((a, b) => {
            if (a.dueDateTimeStamp < b.dueDateTimeStamp) return -1
            return a.dueDateTimeStamp > b.dueDateTimeStamp ? 1 : 0
          })

          for (let x = 0; x < datauseSelect.length; x++) {
            runNo++
            let t = datauseSelect[x]
            let s = {}
            // console.log('fastTrack')
            // console.log('s.t', t)
            if (dataExport.filter(el => { return el.timeDueHtext === this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )' }).length === 0) {
              s.timeDueHtext = this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )'
            } else {
              s.timeDueHtext = ''
            }
            let serviceDetail = ''
            let fieldflow = this.editedItemSeleteField.filter((row) => { return row.conditionField === 'flow' && String(row.conditionValue) === String(t.flowId) })
            fieldflow.forEach((row) => {
              let tempField = this.BookingDataListTimechange[t.bookNo].filter((row2) => { return String(row2.fieldId) === String(row.fieldId) })
              // serviceDetail += (tempField.length > 0 ? tempField[0].fieldValue + ' ' : '')
              let convertTextField = ''
              if (tempField.length > 0) {
              // console.log('fieldType', row.fieldType)
                if (row.fieldType === 'Selects' || row.fieldType === 'Autocompletes' || row.fieldType === 'Radio') {
                // console.log('optionField', row.optionField)
                // console.log('fieldValue', tempField[0].fieldValue)
                  if (tempField[0].fieldValue) {
                    convertTextField = JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue })[0].text
                  } else {
                    convertTextField = tempField[0].fieldValue
                  }
                } else {
                  convertTextField = tempField[0].fieldValue
                }
              }
              // console.log('convertTextField', convertTextField)
              serviceDetail += (tempField.length > 0 ? convertTextField + ' ' : '')
            })
            // console.log('fieldflow', fieldflow)
            // let convertTextField = ''
            // if (serviceDetail !== '' && fieldflow.filter(el => { return el.fieldType === 'Selects' || el.fieldType === 'Autocompletes' || el.fieldType === 'Radio' }).length > 0) {
            //   let textField = ''
            //   textField = JSON.parse(fieldflow.filter(el => { return el.fieldType === 'Selects' || el.fieldType === 'Autocompletes' || el.fieldType === 'Radio' })[0].optionField)
            //   convertTextField = textField.filter(el => { return el.value === serviceDetail })
            //   console.log('convertTextField', convertTextField)
            // }
            serviceDetail = serviceDetail.trim() || t.flowName
            console.log('serviceDetail', serviceDetail)

            s.type = this.dataTypeJob3
            s.runNo = runNo
            s.dateBooking = this.format_dateNotime(this.timeTable)
            s.licenseNo = t.cusReg
            s.title = t.timeDuetext
            s.status = t.statusBtText
            s.remark = t.remark
            s.cusName = t.cusName
            s.cusReg = t.cusReg
            s.flowName = serviceDetail
            s.empFull_NameTH = t.empFull_NameTH
            s.extraJob = t.extraJob ? this.dataTypeJob2 : ''
            s.carModel = this.getDataFromFieldName(this.BookingDataListTimechange[t.bookNo], 'รุ่นรถ')
            s.carModel = (s.carModel.length > 0) ? s.carModel[0].fieldValue : ''
            s.tel = t.tel
            dataExport.push(s)
          }
        }
      }
      let s = {}
      s.type = ''
      s.runNo = ''
      s.licenseNo = ''
      s.title = ''
      s.status = ''
      s.cusName = ''
      s.cusReg = ''
      s.flowName = ''
      s.remark = ''
      s.tel = ''
      s.empFull_NameTH = ''
      s.carModel = ''
      dataExport.push(s)
      runNo = 0
      var datause2 = this.dataItemTime.sort((a, b) => {
        if (a.timeDuetext < b.timeDuetext) return -1
        return a.timeDuetext > b.timeDuetext ? 1 : 0
      })
      for (let i = 0; i < datause2.length; i++) {
        let d = datause2[i]
        let dataSelect = this.dataItemTimesChange.filter(el => { return el.timeDueHtext === d.timeDueHtext && !el.fastTrack && (el.statusBtText === 'ยืนยันแล้ว' || el.statusBtText === 'รับรถแล้ว') })
        // console.log('s.dataSelect', dataSelect)
        // console.log('this.BookingDataList', this.BookingDataListTimechange)
        if (dataSelect.length > 0) {
          var datauseSelect2 = dataSelect.sort((a, b) => {
            if (a.dueDateTimeStamp < b.dueDateTimeStamp) return -1
            return a.dueDateTimeStamp > b.dueDateTimeStamp ? 1 : 0
          })

          for (let x = 0; x < datauseSelect2.length; x++) {
            runNo++
            let t = datauseSelect2[x]
            let s = {}
            let serviceDetail = ''
            let fieldflow = this.editedItemSeleteField.filter((row) => { return row.conditionField === 'flow' && String(row.conditionValue) === String(t.flowId) })
            fieldflow.forEach((row) => {
              let tempField = this.BookingDataListTimechange[t.bookNo].filter((row2) => { return String(row2.fieldId) === String(row.fieldId) })
              // serviceDetail += (tempField.length > 0 ? tempField[0].fieldValue + ' ' : '')
              let convertTextField = ''
              if (tempField.length > 0) {
              // console.log('fieldType', row.fieldType)
                if (row.fieldType === 'Selects' || row.fieldType === 'Autocompletes' || row.fieldType === 'Radio') {
                // console.log('optionField', row.optionField)
                // console.log('fieldValue', tempField[0].fieldValue)
                  if (tempField[0].fieldValue) {
                    convertTextField = JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue })[0].text
                  } else {
                    convertTextField = tempField[0].fieldValue
                  }
                } else {
                  convertTextField = tempField[0].fieldValue
                }
              }
              // console.log('convertTextField', convertTextField)
              serviceDetail += (tempField.length > 0 ? convertTextField + ' ' : '')
            })
            if (dataExport.filter(el => { return el.timeDueHtext === this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )' }).length === 0) {
              s.timeDueHtext = this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )'
            } else {
              s.timeDueHtext = ''
            }
            serviceDetail = serviceDetail.trim() || t.flowName
            s.type = 'ปกติ'
            s.runNo = runNo
            s.dateBooking = this.format_dateNotime(this.timeTable)
            s.licenseNo = t.cusReg
            s.title = t.timeDuetext
            s.status = t.statusBtText
            s.cusName = t.cusName
            s.remark = t.remark
            s.cusReg = t.cusReg
            s.flowName = serviceDetail
            s.tel = t.tel
            s.empFull_NameTH = t.empFull_NameTH
            s.extraJob = t.extraJob ? 'Extra Job' : ''
            s.carModel = this.getDataFromFieldName(this.BookingDataListTimechange[t.bookNo], 'รุ่นรถ')
            s.carModel = (s.carModel.length > 0) ? s.carModel[0].fieldValue : ''
            dataExport.push(s)
          }
        }
      }
      this.dataexport = dataExport
      this.onExport()
      console.log('dataEport', JSON.stringify(dataExport))
    },
    onExport () {
      var dataexport = []
      for (var i = 0; i < this.dataexport.length; i++) {
        var a = this.dataexport[i]
        dataexport.push({
          'ประเภท': a.type,
          'ลำดับ': a.runNo,
          'วันที่': a.dateBooking,
          'เวลา': a.title,
          'ชื่อลูกค้า': a.cusName,
          // 'รุ่นรถ': a.carModel,
          // 'ทะเบียน': a.cusReg,
          'รายการซ่อม': a.flowName,
          'เบอร์โทร': a.tel,
          'หมายเหตุ': a.extraJob,
          'เวลาติดตาม': '',
          'เหตุผล': '',
          'ตรง': '',
          'ไม่ตรง': '',
          'เปิดJob': '',
          'พนักงานรับนัดหมาย': a.empFull_NameTH,
          'หมายเหตุเพิ่มเติม': a.remark
        })
      }
      const dataWS = XLSX.utils.json_to_sheet(dataexport)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb, 'export_' + this.format_dateNotime(this.timeTable) + '.xlsx')
    },
    exportExcelRemove () {
      let dataExport = []
      this.dataexportRemove = []
      let runNo = 0
      var datause = this.dataItemTime.sort((a, b) => {
        if (a.timeDuetext < b.timeDuetext) return -1
        return a.timeDuetext > b.timeDuetext ? 1 : 0
      })
      for (let i = 0; i < datause.length; i++) {
        // var d = this.dataItemTimesChange.filter(el => { return el.timeDueHtext === item.timeDueHtext })[i]
        let d = datause[i]
        let dataSelect = this.dataItemTimesChange.filter(el => { return el.timeDueHtext === d.timeDueHtext && el.fastTrack && (el.statusBtText === 'ยกเลิก') })
        // console.log('s.dataSelect', dataSelect)
        if (dataSelect.length > 0) {
          var datauseSelect = dataSelect.sort((a, b) => {
            if (a.dueDateTimeStamp < b.dueDateTimeStamp) return -1
            return a.dueDateTimeStamp > b.dueDateTimeStamp ? 1 : 0
          })
          for (let x = 0; x < datauseSelect.length; x++) {
            runNo++
            let t = datauseSelect[x]
            let s = {}
            console.log('fastTrack')
            console.log('s.t', t)
            if (dataExport.filter(el => { return el.timeDueHtext === this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )' }).length === 0) {
              s.timeDueHtext = this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )'
            } else {
              s.timeDueHtext = ''
            }
            let serviceDetail = ''
            let fieldflow = this.editedItemSeleteField.filter((row) => { return row.conditionField === 'flow' && String(row.conditionValue) === String(t.flowId) })
            fieldflow.forEach((row) => {
              let tempField = this.BookingDataListTimechange[t.bookNo].filter((row2) => { return String(row2.fieldId) === String(row.fieldId) })
              // serviceDetail += (tempField.length > 0 ? tempField[0].fieldValue + ' ' : '')
              let convertTextField = ''
              if (tempField.length > 0) {
                console.log('fieldType', row.fieldType)
                if (row.fieldType === 'Selects' || row.fieldType === 'Autocompletes' || row.fieldType === 'Radio') {
                  console.log('optionField', row.optionField)
                  console.log('fieldValue', tempField[0].fieldValue)
                  if (tempField[0].fieldValue) {
                    convertTextField = JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue })[0].text
                  } else {
                    convertTextField = tempField[0].fieldValue
                  }
                } else {
                  convertTextField = tempField[0].fieldValue
                }
              }
              console.log('convertTextField', convertTextField)
              serviceDetail += (tempField.length > 0 ? convertTextField + ' ' : '')
            })
            serviceDetail = serviceDetail.trim() || t.flowName
            s.type = this.dataTypeJob3
            s.runNo = runNo
            s.dateBooking = this.format_dateNotime(this.timeTable)
            s.licenseNo = t.cusReg
            s.remarkRemove = t.remarkRemove
            s.title = t.timeDuetext
            s.status = t.statusBtText
            s.remark = t.remark
            s.cusName = t.cusName
            s.cusReg = t.cusReg
            s.flowName = serviceDetail
            s.empFull_NameTH = t.empFull_NameTH
            s.extraJob = t.extraJob ? this.dataTypeJob2 : ''
            s.tel = t.tel
            s.carModel = this.getDataFromFieldName(this.BookingDataListTimechange[t.bookNo], 'รุ่นรถ')
            s.carModel = (s.carModel.length > 0) ? s.carModel[0].fieldValue : ''
            dataExport.push(s)
          }
        }
      }
      let s = {}
      s.type = ''
      s.runNo = ''
      s.licenseNo = ''
      s.title = ''
      s.status = ''
      s.cusName = ''
      s.cusReg = ''
      s.remarkRemove = ''
      s.tel = ''
      s.remark = ''
      s.empFull_NameTH = ''
      s.carModel = ''
      dataExport.push(s)
      runNo = 0
      var datause2 = this.dataItemTime.sort((a, b) => {
        if (a.timeDuetext < b.timeDuetext) return -1
        return a.timeDuetext > b.timeDuetext ? 1 : 0
      })
      for (let i = 0; i < datause2.length; i++) {
        let d = datause2[i]
        let dataSelect = this.dataItemTimesChange.filter(el => { return el.timeDueHtext === d.timeDueHtext && !el.fastTrack && (el.statusBtText === 'ยกเลิก') })
        // console.log('s.dataSelect', dataSelect)
        if (dataSelect.length > 0) {
          var datauseSelect2 = dataSelect.sort((a, b) => {
            if (a.dueDateTimeStamp < b.dueDateTimeStamp) return -1
            return a.dueDateTimeStamp > b.dueDateTimeStamp ? 1 : 0
          })
          for (let x = 0; x < datauseSelect2.length; x++) {
            runNo++
            let t = datauseSelect2[x]
            let s = {}
            console.log('normal')
            console.log('s.t', t)
            if (dataExport.filter(el => { return el.timeDueHtext === this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )' }).length === 0) {
              s.timeDueHtext = this.format_dateNotime(this.timeTable) + ' ' + d.timeDueHtext + ' ( ' + dataSelect.length.toString() + ' )'
            } else {
              s.timeDueHtext = ''
            }
            let serviceDetail = ''
            let fieldflow = this.editedItemSeleteField.filter((row) => { return row.conditionField === 'flow' && String(row.conditionValue) === String(t.flowId) })
            fieldflow.forEach((row) => {
              let tempField = this.BookingDataListTimechange[t.bookNo].filter((row2) => { return String(row2.fieldId) === String(row.fieldId) })
              // serviceDetail += (tempField.length > 0 ? tempField[0].fieldValue + ' ' : '')
              let convertTextField = ''
              if (tempField.length > 0) {
                console.log('fieldType', row.fieldType)
                if (row.fieldType === 'Selects' || row.fieldType === 'Autocompletes' || row.fieldType === 'Radio') {
                  console.log('optionField', row.optionField)
                  console.log('fieldValue', tempField[0].fieldValue)
                  if (tempField[0].fieldValue) {
                    convertTextField = JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue })[0].text
                  } else {
                    convertTextField = tempField[0].fieldValue
                  }
                } else {
                  convertTextField = tempField[0].fieldValue
                }
              }
              console.log('convertTextField', convertTextField)
              serviceDetail += (tempField.length > 0 ? convertTextField + ' ' : '')
            })
            serviceDetail = serviceDetail.trim() || t.flowName
            s.type = 'ปกติ'
            s.runNo = runNo
            s.dateBooking = this.format_dateNotime(this.timeTable)
            s.licenseNo = t.cusReg
            s.remarkRemove = t.remarkRemove
            s.title = t.timeDuetext
            s.status = t.statusBtText
            s.remark = t.remark
            s.cusName = t.cusName
            s.cusReg = t.cusReg
            s.flowName = serviceDetail
            s.tel = t.tel
            s.empFull_NameTH = t.empFull_NameTH
            s.extraJob = t.extraJob ? 'Extra Job' : ''
            s.carModel = this.getDataFromFieldName(this.BookingDataListTimechange[t.bookNo], 'รุ่นรถ')
            s.carModel = (s.carModel.length > 0) ? s.carModel[0].fieldValue : ''
            dataExport.push(s)
          }
        }
      }
      this.dataexportRemove = dataExport
      this.onExportRemove()
      console.log('dataEportCancel', JSON.stringify(dataExport))
    },
    onExportRemove () {
      var dataexport = []
      for (var i = 0; i < this.dataexportRemove.length; i++) {
        var a = this.dataexportRemove[i]
        dataexport.push({
          'ประเภท': a.type,
          'ลำดับ': a.runNo,
          'วันที่': a.dateBooking,
          'เวลา': a.title,
          'ชื่อลูกค้า': a.cusName,
          // 'รุ่นรถ': a.carModel,
          // 'ทะเบียน': a.cusReg,
          'รายการซ่อม': a.flowName,
          'เบอร์โทร': a.tel,
          'หมายเหตุ': a.extraJob,
          'หมายเหตุยกเลิก': a.remarkRemove,
          'เวลาติดตาม': '',
          'เหตุผล': '',
          'ตรง': '',
          'ไม่ตรง': '',
          'เปิดJob': '',
          'พนักงานรับนัดหมาย': a.empFull_NameTH,
          'หมายเหตุเพิ่มเติม': a.remark
        })
      }
      const dataWS = XLSX.utils.json_to_sheet(dataexport)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, dataWS)
      XLSX.writeFile(wb, 'export_cancel_' + this.format_dateNotime(this.timeTable) + '.xlsx')
    },
    toggle () {
      this.timeTable = moment(moment(new Date(), 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
      this.getTimesChange('update')
      this.drawer = !this.drawer
    },
    async getCustomFieldStart () {
      this.editedItemSeleteField = []
      axios
        .get(this.DNS_IP + '/customField/get?shopId=' + this.$session.getAll().data.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            let sortrs = rs.sort((a, b) => a.sortNoField - b.sortNoField)
            for (let i = 0; i < sortrs.length; i++) {
              let d = sortrs[i]
              let s = {}
              s.fieldId = d.fieldId
              s.fieldName = d.fieldName
              s.fieldType = d.fieldType
              s.optionField = d.optionField
              s.conditionField = d.conditionField
              s.conditionValue = d.conditionValue
              s.shopId = d.shopId
              s.showCard = d.showCard
              s.fieldValue = ''
              this.editedItemSeleteField.push(s)
            }
            // console.log('this.editedItemSeleteField', this.editedItemSeleteField)
          }
        })
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
        case 'EDIT':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_edit.validate()
          })
          break
        case 'REMOVE':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_remove.validate()
          })
          break
        case 'CHANGE':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_change.validate()
          })
          break
        case 'EXPORT':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_export.validate()
          })
          break
        case 'DEPOSIT':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_deposit.validate()
          })
          break
        case 'BOOKAGAIN':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_bookingAgain.validate()
          })
          break

        default:
          break
      }
    },
    async scanQrcode () {
      if (this.$route.query.shopId === this.session.data.shopId) {
        let dt = {
          bookNo: this.$route.query.bookNo
        }
        await axios.get(this.DNS_IP + '/booking_view/getJob?bookNo=' + dt.bookNo).then(async response => {
          let rs = response.data
          console.log('rsJob', rs)
          if (rs.length > 0) {
            await this.getBookingListJob(rs[0])
            this.dialogEdit = true
          } else {
            this.$swal('ผิดพลาด', 'นัดหมายนี้ไม่ได้อยู่ในร้านของคุณ หรือ อยู่ในกระดานการทำงานแล้ว', 'error')
            this.$router.push('/Master/BookingListBeauty')
          }
        })
      } else {
        this.$swal('ผิดพลาด', 'นัดหมายนี้ไม่ได้อยู่ในร้านของคุณ', 'error')
        this.$router.push('/Core/Login')
      }
    },
    async getBookingListJob (item) {
      let dateCurrent = this.momenDate_1(new Date())
      let dueDate = this.momenDate_1(item.dueDate)
      if (dateCurrent >= dueDate) {
        this.statusConfirmJob = true
      } else {
        this.dueDate = item.dueDate
        this.statusConfirmJob = false
      }
      if (this.statusConfirmJob) {
        let checkStep = await axios.get(this.DNS_IP + '/flowStep/get?flowId=' + item.flowId)
        console.log('checkStep', checkStep)
        if (checkStep.data.status === false) {
          this.endDate = this.momenDate_1(new Date())
          this.endTime = this.momenTime(new Date())
          this.statusShowDateConfiremjob = false
        } else {
          this.statusShowDateConfiremjob = true
        }
        this.dataQrcode = item
        this.dataReady = false
        this.selectedStatus = true
        // this.getSelectText = ''
        this.dataItem = []
        this.countWaiting = 0
        this.countConfirm = 0
        this.countCancel = 0
        this.countJob = 0
        this.countAll = 0
        // Clear ช่องค้นหา
        this.searchAll2 = ''
        // this.dataItemSelect = []
        var dataItemTimes = []
        var dataItems = []
        this.BookingDataList = []
        if (this.branch.length === 0) {
          await this.getDataBranch()
        }
        await axios
          .get(
            // eslint-disable-next-line quotes
            this.DNS_IP +
              '/booking_view/getJob?shopId=' +
              this.session.data.shopId +
              '&bookNo=' +
              item.bookNo
          )
          .then(async response => {
            // console.log('getData', response.data)
            if (response.data.length > 0) {
              for (let i = 0; i < response.data.length; i++) {
                let d = response.data[i]
                let s = {}
                if (dataItems.filter(el => { return el.bookNo === d.bookNo }).length === 0) {
                  s.bookNo = d.bookNo
                  s.flowId = d.flowId
                  s.flowName = d.flowName
                  s.dueDate = d.dueDate
                  s.shopId = d.shopId
                  s.remark = d.remark || ''
                  s.masBranchID = d.masBranchID
                  s.empSelect = d.empSelect
                  s.empFull_NameTH = d.empFull_NameTH || ''
                  s.empFull_NameTH = s.empFull_NameTH.replace('นางสาว', '')
                  s.empFull_NameTH = s.empFull_NameTH.replace('นาย', '')
                  s.empFull_NameTH = s.empFull_NameTH.replace('นาง', '')
                  s.userId = d.userId
                  s.chkConfirm = false
                  s.chkCancel = false
                  s.jobNo = d.jobNo
                  s.remarkRemove = d.remarkRemove || ''
                  s.remarkConfirm1 = (d.remarkConfirm1 === 'true' || d.remarkConfirm1 === 'True')
                  s.remarkConfirm2 = (d.remarkConfirm2 === 'true' || d.remarkConfirm2 === 'True')
                  s.extraJob = (d.extraJob === 'true' || d.extraJob === 'True')
                  s.fastTrack = (d.fastTrack === 'true' || d.fastTrack === 'True')
                  s.lineUserId = d.lineUserId
                  s.memberPicture = d.memberPicture
                  s.timeDueHtext = d.timeDueH + ':00'
                  s.timeDuetext = d.timeDue

                  if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                    s.chkConfirm = true
                    s.chkCancel = false
                  }
                  if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                    s.chkConfirm = false
                    s.chkCancel = true
                  }
                  s.statusBt = d.statusBt || 'wait'
                  switch (d.statusBt) {
                    case 'confirm':
                      s.statusBtText = 'ยืนยันแล้ว'
                      this.countConfirm = this.countConfirm + 1
                      break
                    case 'cancel':
                      s.statusBtText = 'ยกเลิก'
                      this.countCancel = this.countCancel + 1
                      break
                    case 'confirmJob':
                      s.statusBtText = 'รับรถแล้ว'
                      this.countJob = this.countJob + 1
                      break
                    default:
                      s.statusBtText = 'รายการนัดหมายใหม่'
                      this.countWaiting = this.countWaiting + 1
                      break
                  }
                  var chkTime = this.dataItemTime.filter(el => { return el.timeDueHtext === s.timeDueHtext })
                  if (chkTime.length === 0) {
                    dataItemTimes.push(s)
                  }
                  let dataBookingData = []
                  await axios
                    .get(
                      // eslint-disable-next-line quotes
                      this.DNS_IP + "/BookingData/getView?bookNo=" + d.bookNo
                    )
                    .then(async responses => {
                      console.log('getDataData', responses.data)
                      dataBookingData = responses.data
                      if (responses.data.status !== false) {
                        responses.data.forEach((row) => {
                          if (typeof (this.BookingDataList[row.bookNo]) === 'undefined') {
                            this.BookingDataList[row.bookNo] = []
                          }
                          this.BookingDataList[row.bookNo].push(row)
                        })
                      }
                      // this.BookingDataList[dataBookingData[0].bookNo].push(dataBookingData[0])
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
                  s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                  s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                  s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                  // s.cusName = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'ชื่อ')
                  // s.cusReg = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เลขทะเบียน')
                  // s.tel = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เบอร์โทร')
                  // s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                  // s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                  // s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                  dataItems.push(s)
                }
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
                let chkTimes = this.dataItemTime.filter(el => { return el.timeDueHtext === t.timeDueHtext })
                // console.log('chkTimes', chkTimes)
                if (chkTimes.length === 0) {
                  // console.log('datause(H)', h)
                  this.dataItemTime.push(h)
                }
              }
              this.masBranchID = this.dataItem[0].masBranchID
              console.log('dtTime', this.dataItem[0].masBranchID)
              await this.getBookingData(this.dataItem[0])
              this.checkTimeFlow(item)
              // this.timeavailable = []
              // console.log('dtTime', this.dataItem[0].masBranchID)
              // let dtTime = this.branch.filter(item => { return item.value === this.dataItem[0].masBranchID })
              // console.log('dtTime', this.dataItem[0].masBranchID)
              // this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
              this.dialogEdit = true
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch(error => {
            console.log(error)
            this.dataReady = true
            //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
          })
      }
    },
    async getDataFromAPI (url, fieldId, fieldName, param) {
      let result = []
      await axios
        .get(this.DNS_IP + `${url}?shopId=${this.session.data.shopId}${param}`)
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
    async getDataFlow () {
      let result = []
      let resultOption = []
      await axios
        .get(this.DNS_IP + `/flow/get?shopId=${this.session.data.shopId}&checkOnsite=is null`)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            result.push({ text: 'ทั้งหมด', value: 'AllFlow' })
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.flowName
              s.value = d.flowId
              s.allData = d
              result.push(s)
              resultOption.push(s)
              // console.log('this.DataFlowName', this.DataFlowName)
            }
          } else {
            result = []
            resultOption = []
          }
        })
      this.DataFlowName = result
      this.dataFlowSelectAdd = resultOption
      this.dataFlowSelectEdit = resultOption
    },
    async getDataBranch () {
      // if (localStorage.getItem('BRANCH') === null) {
      //   let temp = await this.getDataFromAPI('/master_branch/get', 'masBranchID', 'masBranchName')
      //   console.log(typeof temp)
      //   localStorage.setItem('BRANCH', JSON.stringify(temp))
      // }
      // this.branch = JSON.parse(localStorage.getItem('BRANCH'))
      this.branch = await this.getDataFromAPI('/master_branch/get', 'masBranchID', 'masBranchName', '')
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
    async updateValuesExport () {
      this.export_data = []
      console.log('dateRange', new Date(this.dateRange.endDate).toISOString().substr(0, 10))
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchIDExport +
            '&dateRange=' + new Date(this.dateRange.startDate).toISOString().substr(0, 10) + '/' + new Date(this.dateRange.endDate).toISOString().substr(0, 10) + '&checkOnsite=is null'
        )
        .then(async response => {
          console.log('getData', response.data)
          this.dataReady = true
          var exportdatas = []
          for (let i = 0; i < response.data.length; i++) {
            let d = response.data[i]
            let s = {}
            s.bookNo = d.bookNo
            s.masBranchName = d.masBranchName
            s.statusUseBt = d.statusUseBt || 'booking'
            s.CREATE_DATE = d.CREATE_DATE
            s.LAST_DATE = d.LAST_DATE
            s.flowName = d.flowName
            s.dueDate = d.dueDate
            s.chkConfirm = false
            s.chkCancel = false
            if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
              s.chkConfirm = true
              s.chkCancel = false
            } else if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
              s.chkConfirm = false
              s.chkCancel = true
            }
            s.statusBt = d.statusBt || 'wait'
            switch (d.statusBt) {
              case 'confirm':
                s.statusBtText = 'ยืนยันแล้ว'
                break
              case 'cancel':
                s.statusBtText = 'ยกเลิก'
                break
              case 'confirmJob':
                s.statusBtText = 'รับรถแล้ว'
                break
              default:
                s.statusBtText = 'รอโทรยืนยัน'
                break
            }
            let dataBookingData = []
            await axios
              .get(
                this.DNS_IP + `/BookingData/getView?bookNo=${d.bookNo}`
              )
              .then(async responses => {
                dataBookingData = responses.data
              })
            s.cusName = this.getDataFromFieldName(dataBookingData, 'ชื่อ')
            s.cusReg = this.getDataFromFieldName(dataBookingData, 'เลขทะเบียน')
            s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
            s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
            exportdatas.push(s)
          }
          this.export_data = exportdatas
          // if (exportdatas.length === 0 || exportdatas.status === false) {
          //   this.export_data = []
          //   // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          // } else {
          //   // this.dataReady = true
          //   this.export_data = exportdatas
          // }
        }).catch(error => {
          console.log(error)
          this.dataReady = true
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    },
    getSelect (text, count) {
      this.selectedStatus = true
      this.getSelectText = text
      this.getSelectCount = count || 0
      this.dataItemSelect = []
      // this.dataItemTimesChange = []
      this.columnsSelected = []
      console.log('text', text)
      // if (count > 0) {
      if (text === 'all') {
        // this.dataItemSelect = this.dataItem
        if (this.dataItem.length > 0) {
          this.checkSelectText = this.dataItem[0].statusBt
          for (let x = 0; x < this.dataItem.length; x++) {
            let t = this.dataItem[x]
            let serviceDetail = ''
            let fieldflow = this.editedItemSeleteField.filter((row) => { return row.conditionField === 'flow' && String(row.conditionValue) === String(t.flowId) })
            // fieldflow.forEach((row) => {
            //   let tempField = this.BookingDataList[t.bookNo].filter((row2) => { return String(row2.fieldId) === String(row.fieldId) })
            //   serviceDetail += (tempField.length > 0 ? tempField[0].fieldValue + ' ' : '')
            // })
            fieldflow.forEach((row) => {
              let tempField = this.BookingDataList[t.bookNo].filter((row2) => { return String(row2.fieldId) === String(row.fieldId) })
              let convertTextField = ''
              if (tempField.length > 0) {
                if (row.fieldType === 'Selects' || row.fieldType === 'Autocompletes' || row.fieldType === 'Radio') {
                  if (tempField[0].fieldValue) {
                    if (JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue }).length === 0) {
                      convertTextField = tempField[0].fieldValue || ''
                    } else {
                      convertTextField = JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue })[0].text
                    }
                    // convertTextField = JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue })[0].text
                  } else {
                    convertTextField = tempField[0].fieldValue
                  }
                } else {
                  convertTextField = tempField[0].fieldValue
                }
              }
              serviceDetail += (tempField.length > 0 ? convertTextField + ' ' : '')
            })
            serviceDetail = serviceDetail.trim() || t.flowName
            t.flowNameShow = serviceDetail
            this.dataItemSelect.push(t)
          }
        } else {
          this.dataItemSelect = []
        }
        // console.log('dataSelect', this.dataItemSelect)
        // let checkDeposit = this.DataFlowName.filter(el => { return el.value === this.flowSelect })
        // if (checkDeposit.length > 0) {
        //   let dataDeposit = checkDeposit[0].allData.checkDeposit || 'False'
        //   if (dataDeposit === 'True') {
        //     this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        //       // { text: 'Booking Id', value: 'bookNo' },
        //       { text: 'วันและเวลานัดหมาย', value: 'dueDateText' },
        //       // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
        //       { text: 'ชื่อบริการ', value: 'flowNameShow' },
        //       { text: 'ชื่อลูกค้า', value: 'cusName' },
        //       { text: 'เบอร์โทร', value: 'tel' },
        //       { text: 'เงินมัดจำ', value: 'action4', sortable: false, align: 'center' },
        //       { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
        //       { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
        //       { text: 'หมายเหตุที่ยกเลิก', value: 'remarkRemove', sortable: false, align: 'center' },
        //       { text: 'ชื่อพนักงาน', value: 'empFull_NameTH', align: 'center' },
        //       { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }
        //     ]
        //   } else {
        //     this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        //       // { text: 'Booking Id', value: 'bookNo' },
        //       { text: 'วันและเวลานัดหมาย', value: 'dueDateText' },
        //       // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
        //       { text: 'ชื่อบริการ', value: 'flowNameShow' },
        //       { text: 'ชื่อลูกค้า', value: 'cusName' },
        //       { text: 'เบอร์โทร', value: 'tel' },
        //       { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
        //       { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
        //       { text: 'หมายเหตุที่ยกเลิก', value: 'remarkRemove', sortable: false, align: 'center' },
        //       { text: 'ชื่อพนักงาน', value: 'empFull_NameTH', align: 'center' },
        //       { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }
        //     ]
        //   }
        this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
          // { text: 'Booking Id', value: 'bookNo' },
          { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
          // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
          { text: 'ชื่อบริการ', value: 'flowNameShow' },
          { text: 'ชื่อลูกค้า', value: 'cusName' },
          { text: 'เบอร์โทร', value: 'tel' },
          { text: 'เงินมัดจำ', value: 'action4', sortable: false, align: 'center' },
          { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
          { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
          { text: 'หมายเหตุที่ยกเลิก', value: 'remarkRemove', sortable: false, align: 'center' },
          { text: 'ชื่อพนักงาน', value: 'empFull_NameTH', align: 'center' },
          { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' },
          { text: 'หมายเหตุเรียกกลับ', value: 'remarkReturn', align: 'center' }
        ]
      } else {
        var dataSelect = []
        if (text === 'confirmSum') {
          dataSelect = this.dataItem.filter(el => { return el.statusBt === 'confirm' || el.statusBt === 'confirmJob' })
        } else {
          dataSelect = this.dataItem.filter(el => { return el.statusBt === text })
        }
        // console.log('fieldflow', dataSelect)
        if (dataSelect.length > 0) {
          this.checkSelectText = dataSelect[0].statusBt
          for (let x = 0; x < dataSelect.length; x++) {
            let t = dataSelect[x]
            let serviceDetail = ''
            let fieldflow = this.editedItemSeleteField.filter((row) => { return row.conditionField === 'flow' && String(row.conditionValue) === String(t.flowId) })
            if (fieldflow.length > 0) {
              fieldflow.forEach((row) => {
                let tempField = []
                if (this.BookingDataList[t.bookNo] !== undefined) {
                  tempField = this.BookingDataList[t.bookNo].filter((row2) => { return String(row2.fieldId) === String(row.fieldId) })
                } else {
                  tempField = []
                }
                let convertTextField = ''
                if (tempField.length > 0) {
                  if (row.fieldType === 'Selects' || row.fieldType === 'Autocompletes' || row.fieldType === 'Radio') {
                    if (tempField[0].fieldValue) {
                      // console.log('7088', JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue }))
                      if (JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue }).length === 0) {
                        convertTextField = tempField[0].fieldValue || ''
                      } else {
                        convertTextField = JSON.parse(row.optionField).filter(el => { return el.value === tempField[0].fieldValue })[0].text
                      }
                    } else {
                      convertTextField = tempField[0].fieldValue || ''
                    }
                  } else {
                    convertTextField = tempField[0].fieldValue || ''
                  }
                }
                serviceDetail += (tempField.length > 0 ? convertTextField + ' ' : '')
              })
            }
            serviceDetail = serviceDetail.trim() || t.flowName
            t.flowNameShow = serviceDetail
            this.dataItemSelect.push(t)
          }
        } else {
          this.dataItemSelect = []
        }
        // console.log('dataSelect', this.dataItemSelect)
        if (text === 'cancel') {
          this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
            // { text: 'Booking Id', value: 'bookNo' },
            { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            { text: 'ชื่อบริการ', value: 'flowNameShow' },
            { text: 'ชื่อลูกค้า', value: 'cusName' },
            { text: 'เบอร์โทร', value: 'tel' },
            { text: 'หมายเหตุที่ยกเลิก', value: 'remarkRemove', sortable: false, align: 'center' },
            { text: 'ชื่อพนักงาน', value: 'empFull_NameTH', align: 'center' },
            { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }
            // { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
            // { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' }
            // { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
          ]
        } else if (text === 'confirm') {
          this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
            // { text: 'Booking Id', value: 'bookNo' },
            { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            { text: 'ชื่อบริการ', value: 'flowNameShow' },
            { text: 'ชื่อลูกค้า', value: 'cusName' },
            { text: 'เบอร์โทร', value: 'tel' },
            { text: 'เงินมัดจำ', value: 'action4', sortable: false, align: 'center' },
            { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
            { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
            { text: 'หมายเหตุที่ยกเลิก', value: 'remarkRemove', sortable: false, align: 'center' },
            { text: 'ชื่อพนักงาน', value: 'empFull_NameTH', align: 'center' },
            { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }
          ]
          // this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
          //   // { text: 'Booking Id', value: 'bookNo' },
          //   { text: 'วันและเวลานัดหมาย', value: 'dueDateText' },
          //   // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
          //   { text: 'ชื่อบริการ', value: 'flowNameShow' },
          //   { text: 'ชื่อลูกค้า', value: 'cusName' },
          //   { text: 'เบอร์โทร', value: 'tel' },
          //   { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
          //   { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
          //   { text: 'ชื่อพนักงาน', value: 'empFull_NameTH', align: 'center' },
          //   { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }]
        } else if (text === 'wait') {
          // let checkDeposit = this.DataFlowName.filter(el => { return el.value === this.flowSelect })[0].allData.checkDeposit || 'False'
          // if (checkDeposit === 'True') {
          //   this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
          //   // { text: 'Booking Id', value: 'bookNo' },
          //     { text: 'วันและเวลานัดหมาย', value: 'dueDateText' },
          //     // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
          //     { text: 'ชื่อบริการ', value: 'flowNameShow' },
          //     { text: 'ชื่อลูกค้า', value: 'cusName' },
          //     { text: 'เบอร์โทร', value: 'tel' },
          //     { text: 'เงินมัดจำ', value: 'action4', sortable: false, align: 'center' },
          //     { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
          //     { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
          //     { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }]
          // } else {
          //   this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
          //   // { text: 'Booking Id', value: 'bookNo' },
          //     { text: 'วันและเวลานัดหมาย', value: 'dueDateText' },
          //     // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
          //     { text: 'ชื่อบริการ', value: 'flowNameShow' },
          //     { text: 'ชื่อลูกค้า', value: 'cusName' },
          //     { text: 'เบอร์โทร', value: 'tel' },
          //     { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
          //     { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
          //     { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }]
          // }
          this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
            // { text: 'Booking Id', value: 'bookNo' },
            { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            { text: 'ชื่อบริการ', value: 'flowNameShow' },
            { text: 'ชื่อลูกค้า', value: 'cusName' },
            { text: 'เบอร์โทร', value: 'tel' },
            { text: 'เงินมัดจำ', value: 'action4', sortable: false, align: 'center' },
            { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
            { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
            { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }]
          // this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
          //   // { text: 'Booking Id', value: 'bookNo' },
          //   { text: 'วันและเวลานัดหมาย', value: 'dueDateText' },
          //   // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
          //   { text: 'ชื่อบริการ', value: 'flowNameShow' },
          //   { text: 'ชื่อลูกค้า', value: 'cusName' },
          //   { text: 'เบอร์โทร', value: 'tel' },
          //   { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
          //   { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
          //   { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }]
        } else if (text === 'confirmJob') {
          this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
            // { text: 'Booking Id', value: 'bookNo' },
            { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            { text: 'ชื่อบริการ', value: 'flowNameShow' },
            { text: 'ชื่อลูกค้า', value: 'cusName' },
            { text: 'เบอร์โทร', value: 'tel' },
            { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
            { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
            { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' },
            { text: 'หมายเหตุเรียกกลับ', value: 'remarkReturn', align: 'center' }]
        } else {
          this.columnsSelected = [{ text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
            // { text: 'Booking Id', value: 'bookNo' },
            { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            // { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
            { text: 'ชื่อบริการ', value: 'flowNameShow' },
            { text: 'ชื่อลูกค้า', value: 'cusName' },
            { text: 'เบอร์โทร', value: 'tel' },
            { text: 'คุณสมบัติเพิ่มเติม', value: 'action3', sortable: false, align: 'center' },
            { text: 'Confirm นัดล่วงหน้า', value: 'action2', sortable: false, align: 'center' },
            { text: 'หมายเหตุเพิ่มเติม', value: 'remark', align: 'center' }]
        }
      }
      // }
    },
    updateTimeTablefromChild (timeTable) {
      this.timeTable = timeTable
    },
    async getTimesChange (text) {
      try {
        this.dataItemTimesChange = []
        this.dataRemoveExport = []
        if (text === 'all') {
          this.dataItemTimesChange = this.dataItem
          this.dataRemoveExport = this.dataItemTimesChange.filter(el => { return el.statusBt === 'cancel' })
          this.BookingDataListTimechange = this.BookingDataList
        } else {
          if (this.masBranchID) {
            this.masBranchID = this.masBranchID
          } else {
            if (this.branch.length > 0) {
              this.masBranchID = this.branch[0].value
            } else {
              this.masBranchID = ''
            }
          }
          this.dataItemCheck = []
          var dataItems = []
          if (this.timeTable !== '') {
            var dateStart = moment(moment(this.timeTable, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
            console.log('dateStartxx', dateStart)
            console.log('timeTable', this.timeTable)
            await this.getBookingDataListTimechange(dateStart)

            // var dataItemTimes = []
            let urlApi = ''
            if (this.flowSelect === 'AllFlow') {
              urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&dueDate=' +
            this.timeTable + '&checkOnsite=is null'
            } else {
              urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&dueDate=' +
            this.timeTable + '&checkOnsite=is null&flowId=' + this.flowSelect
            }
            await axios
              .get(
                urlApi
              )
              .then(async response => {
                console.log('getData', response.data)
                if (response.data.length > 0) {
                  for (let i = 0; i < response.data.length; i++) {
                    let d = response.data[i]
                    let s = {}
                    s.bookNo = d.bookNo
                    s.flowId = d.flowId
                    s.flowName = d.flowName
                    s.dueDate = d.dueDate
                    s.dueDateTimeStamp = d.dueDateTimeStamp
                    s.remarkRemove = d.remarkRemove
                    s.remark = d.remark
                    s.userId = d.userId
                    s.chkConfirm = false
                    s.chkCancel = false
                    s.jobNo = d.jobNo
                    s.empFull_NameTH = d.empFull_NameTH
                    s.extraJob = (d.extraJob === 'true' || d.extraJob === 'True')
                    s.fastTrack = (d.fastTrack === 'true' || d.fastTrack === 'True')
                    s.remarkRemove = d.remarkRemove || ''
                    s.timeDueHtext = d.timeDueH + ':00'
                    s.timeDuetext = d.timeDue
                    if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                      s.chkConfirm = true
                      s.chkCancel = false
                    }
                    if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                      s.chkConfirm = false
                      s.chkCancel = true
                    }
                    s.statusBt = d.statusBt || 'wait'
                    switch (d.statusBt) {
                      case 'confirm':
                        s.statusBtText = 'ยืนยันแล้ว'
                        break
                      case 'cancel':
                        s.statusBtText = 'ยกเลิก'
                        break
                      case 'confirmJob':
                        s.statusBtText = 'รับรถแล้ว'
                        break
                      default:
                        s.statusBtText = 'รายการนัดหมายใหม่'
                        break
                    }
                    s.cusName = this.getDataFromFieldName(this.BookingDataListTimechange[d.bookNo], 'ชื่อ')
                    s.cusReg = this.getDataFromFieldName(this.BookingDataListTimechange[d.bookNo], 'เลขทะเบียน')
                    s.tel = this.getDataFromFieldName(this.BookingDataListTimechange[d.bookNo], 'เบอร์โทร')
                    s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                    s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                    s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                    dataItems.push(s)
                  }
                }
                if (dataItems.length === 0 || dataItems.status === false) {
                  this.dataItemCheck = []
                  // this.dataItemTime = []
                  // this.dataReady = true
                  // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
                } else {
                  // console.log('month new if')
                  console.log('month new if', dataItems)
                  this.dataItemCheck = dataItems
                  this.dataItemTimesChange = this.dataItemCheck.sort((a, b) => {
                    if (a.timeDuetext < b.timeDuetext) return -1
                    return a.timeDuetext > b.timeDuetext ? 1 : 0
                  })
                  // this.dataItemTimesChange = this.dataItemCheck.filter(el => {
                  //   let dueDate = moment(moment(el.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
                  //   return dueDate === this.timeTable
                  //   // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
                  // }).sort((a, b) => {
                  //   if (a.timeDuetext < b.timeDuetext) return -1
                  //   return a.timeDuetext > b.timeDuetext ? 1 : 0
                  // })
                  this.dataRemoveExport = this.dataItemTimesChange.filter(el => { return el.statusBt === 'cancel' })
                  // console.log('this.dataRemoveExport', this.dataRemoveExport)
                }
              })
          }
          // } else {
          //   console.log('month new else')
          //   this.dataItemTimesChange = this.dataItemCheck.filter(el => {
          //     let dueDate = moment(moment(el.dueDate, 'YYYY-MM-DD').toDate()).format('YYYY-MM-DD')
          //     return dueDate === this.timeTable
          //     // return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable
          //   }).sort((a, b) => {
          //     if (a.timeDuetext < b.timeDuetext) return -1
          //     return a.timeDuetext > b.timeDuetext ? 1 : 0
          //   })
          // }
        }
        // this.dataRemoveExport = this.dataItemTimesChange.filter(el => { return el.statusBt === 'cancel' })
        // console.log('this.dataRemoveExport', this.dataRemoveExport)
      } catch (err) {
        console.log(err)
      }
    },
    async getBookingDataListTimechange (dateStart) {
      this.BookingDataListTimechange = []
      if (this.masBranchID) {
        this.masBranchID = this.masBranchID
      } else {
        if (this.branch.length > 0) {
          this.masBranchID = this.branch[0].value
        } else {
          this.masBranchID = ''
        }
      }
      let url = `${this.DNS_IP}/BookingData/getView?shopId=${this.session.data.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}`
      await axios
        .get(url)
        .then(async response => {
          if (response.data.status !== false) {
            response.data.forEach((row) => {
              if (typeof (this.BookingDataListTimechange[row.bookNo]) === 'undefined') {
                this.BookingDataListTimechange[row.bookNo] = []
              }
              this.BookingDataListTimechange[row.bookNo].push(row)
            })
          }
        })
      console.log(this.BookingDataListTimechange)
    },
    async getBookingDataList (dateStart, searchOther) {
      console.log('dateStart', dateStart)
      this.BookingDataList = []
      if (this.masBranchID) {
        this.masBranchID = this.masBranchID
      } else {
        if (this.branch.length > 0) {
          this.masBranchID = this.branch[0].value
        } else {
          this.masBranchID = ''
        }
      }
      let url = ''
      if (dateStart === 'no') {
        url = `${this.DNS_IP}/BookingData/getsearchOther?shopId=${this.session.data.shopId}&fieldValue=${searchOther}`
      } else {
        url = `${this.DNS_IP}/BookingData/getView?shopId=${this.session.data.shopId}&masBranchID=${this.masBranchID}&dueDate=${dateStart}`
      }
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
          setTimeout(() => this.getBookingDataList(dateStart, searchOther), 3000)
          console.log('catch getBookingDataList : ', error)
        })
      console.log('this.BookingDataList1', this.BookingDataList)
    },
    async getBookingList () {
      await this.getTagData()
      clearInterval(this.setTimerCalendar)
      this.setTimerCalendar = null

      if (this.masBranchID) {
        this.masBranchID = this.masBranchID
      } else {
        if (this.branch.length > 0) {
          this.masBranchID = this.branch[0].value
        } else {
          await this.getDataBranch()
          if (this.branch.length > 0) {
            this.masBranchID = this.branch[0].value
          } else {
            this.masBranchID = ''
            this.$swal('ผิดพลาด', 'กรุณาตรวจสอบสาขาของท่าน เนื่องจากระบบตรวจหาสาขาไม่พบ', 'error')
          }
          // this.getBookingList()
        }
      }
      if (this.flowSelect !== '') {
        this.flowSelect = this.flowSelect
      } else {
        if (this.DataFlowName.length > 0) {
          this.flowSelect = this.DataFlowName[0].value
        } else {
          this.flowSelect = ''
          await this.getDataFlow()
          this.flowSelect = this.DataFlowName[0].value
          // this.getBookingList()
        }
      }
      console.log('this.flowSelect', this.flowSelect)
      // this.dataReady = false
      this.selectedStatus = true
      // this.getSelectText = ''
      this.dataItem = []
      this.countWaiting = 0
      this.countConfirm = 0
      this.countCancel = 0
      this.countJob = 0
      this.countAll = 0
      // Clear ช่องค้นหา
      this.searchAll2 = ''
      var dataItemTimes = []
      var dataItems = []
      // await this.getShowMap()
      await this.getBookingDataList(this.dateStart)
      let urlApi = ''
      if (this.flowSelect === 'AllFlow') {
        urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&dueDate=' +
            this.dateStart + '&checkOnsite=is null'
      } else {
        urlApi = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&dueDate=' +
            this.dateStart + '&checkOnsite=is null&flowId=' + this.flowSelect
      }
      await axios
        .get(urlApi)
        .then(async response => {
          console.log('getData', response.data.length)
          if (response.data.length > 0) {
            for (let i = 0; i < response.data.length; i++) {
              let d = response.data[i]
              let s = {}
              if (this.BookingDataList[d.bookNo] !== undefined) {
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
                s.memberId = d.memberId
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
                if (s.memberDataTag.length > 0) {
                  s.tagDataShow = []
                  let memberDataTag = s.memberDataTag
                  for (let i = 0; i < memberDataTag.length; i++) {
                    let d = memberDataTag[i]
                    let x = {}
                    let checkTagItem = this.tagItem.filter(el => { return el.value === d })
                    if (checkTagItem.length > 0) {
                      x.text = checkTagItem[0].text
                      x.value = checkTagItem[0].value
                      s.tagDataShow.push(x)
                    }
                  }
                }
                this.countAll = this.countAll + 1
                if (d.statusUseBt === 'use' && d.statusBt === 'confirm') {
                  s.chkConfirm = true
                  s.chkCancel = false
                }
                if (d.statusUseBt === 'use' && d.statusBt === 'cancel') {
                  s.chkConfirm = false
                  s.chkCancel = true
                }
                s.statusBt = d.statusBt || 'wait'
                switch (d.statusBt) {
                  case 'confirm':
                    s.statusBtText = 'ยืนยันแล้ว'
                    this.countConfirm = this.countConfirm + 1
                    break
                  case 'cancel':
                    s.statusBtText = 'ยกเลิก'
                    this.countCancel = this.countCancel + 1
                    break
                  case 'confirmJob':
                    s.statusBtText = 'รับรถแล้ว'
                    this.countJob = this.countJob + 1
                    break
                  // default:
                  //   s.statusBtText = 'รายการนัดหมายใหม่'
                  //   this.countWaiting = this.countWaiting + 1
                  //   break
                }
                var chkTime = this.dataItemTime.filter(el => { return el.timeDueHtext === s.timeDueHtext })
                if (chkTime.length === 0) {
                  dataItemTimes.push(s)
                }
                s.cusName = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'ชื่อ')
                s.cusReg = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เลขทะเบียน')
                s.tel = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เบอร์โทร')
                s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                if (s.statusBt !== 'wait') {
                  dataItems.push(s)
                }
              } else {
                console.log('BookingNo no bookingData', d.bookNo)
              }
            }
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          this.dataReady = true
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
      let url = `${this.DNS_IP}/BookingData/getView?shopId=${this.session.data.shopId}&masBranchID=${this.masBranchID}&statusBt=is null`
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
        })
      let urlApiwait = ''
      if (this.flowSelect === 'AllFlow') {
        urlApiwait = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&statusBt=null&checkOnsite=is null'
      } else {
        urlApiwait = this.DNS_IP +
            '/booking_view/get?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            this.masBranchID +
            '&statusBt=null&checkOnsite=is null&flowId=' + this.flowSelect
      }
      await axios
        .get(urlApiwait)
        .then(async responses => {
          if (responses.data.length > 0) {
            // console.log('length', responses.data.length)
            for (let i = 0; i < responses.data.length; i++) {
              let d = responses.data[i]
              let s = {}
              if (this.BookingDataList[d.bookNo] !== undefined) {
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
                s.memberId = d.memberId
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
                if (s.memberDataTag.length > 0) {
                  s.tagDataShow = []
                  let memberDataTag = s.memberDataTag
                  for (let i = 0; i < memberDataTag.length; i++) {
                    let d = memberDataTag[i]
                    let x = {}
                    let checkTagItem = this.tagItem.filter(el => { return el.value === d })
                    if (checkTagItem.length > 0) {
                      x.text = checkTagItem[0].text
                      x.value = checkTagItem[0].value
                      s.tagDataShow.push(x)
                    }
                  }
                }
                this.countAll = this.countAll + 1
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
                    this.countWaiting = this.countWaiting + 1
                    break
                }
                var chkTime = this.dataItemTime.filter(el => { return el.timeDueHtext === s.timeDueHtext })
                if (chkTime.length === 0) {
                  dataItemTimes.push(s)
                }
                s.cusName = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'ชื่อ')
                s.cusReg = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เลขทะเบียน')
                s.tel = this.getDataFromFieldName(this.BookingDataList[d.bookNo], 'เบอร์โทร')
                s.cusName = (s.cusName.length > 0) ? s.cusName[0].fieldValue : ''
                s.cusReg = (s.cusReg.length > 0) ? s.cusReg[0].fieldValue : ''
                s.tel = (s.tel.length > 0) ? s.tel[0].fieldValue : ''
                dataItems.push(s)
                // console.log('this.countWaiting', this.countWaiting)
              } else {
                console.log('BookingNo no bookingData', d.bookNo)
              }
            }
          }
        })
      if (dataItems.length === 0 || dataItems.status === false) {
        this.dataItem = []
        this.dataItemTime = []
        // await this.getTimesChange('update')
        if (this.getSelectText) {
          this.getSelect(this.getSelectText, 0)
        } else {
          this.getSelect('wait', this.countWaiting)
        }
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
          let chkTimes = this.dataItemTime.filter(el => { return el.timeDueHtext === t.timeDueHtext })
          // console.log('chkTimes', chkTimes)
          if (chkTimes.length === 0) {
            console.log('datause(H)', h)
            this.dataItemTime.push(h)
          }
        }
        console.log('dataItemTime', this.dataItemTime)
        // await this.getTimesChange('update')
        if (this.getSelectText) {
          this.getSelect(this.getSelectText, 0)
        } else {
          this.getSelect('wait', this.countWaiting)
        }
        this.dataReady = true
      }
    },
    async getBookingField () {
      // this.bookingField = []
      let itemIncustomField = []
      await axios
        .get(
          this.DNS_IP + '/BookingField/get?shopId=' + this.session.data.shopId
        )
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            this.formAdd.bookingId = rs[0].bookingId
            let bookingData = []
            bookingData = JSON.parse(rs[0].flowfieldName)
            for (let i = 0; i < bookingData.length; i++) {
              let d = bookingData[i]
              itemIncustomField.push(d.fieldId)
            }
            await this.getCustomField(itemIncustomField)
          } else {
            this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
              this.dialogAdd = false
              this.clearDataAdd()
            }).catch((error) => {
              console.log('error function addData : ', error)
              this.dialogAdd = false
              this.clearDataAdd()
            })
          }
        })
        .catch(error => {
          this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
            this.dialogAdd = false
            this.clearDataAdd()
          }).catch((error) => {
            console.log('error function addData : ', error)
            this.dialogAdd = false
            this.clearDataAdd()
          })
          console.log('error function addData : ', error)
        })
    },
    async getCustomField (item) {
      this.fieldNameItem = []
      await axios
        .get(this.DNS_IP + '/customField/fieldId?fieldId=' + item)
        .then(async response => {
          let rs = response.data
          // let aa = []
          if (rs.length > 0) {
            let sortrs = rs.sort((a, b) => a.sortNoField - b.sortNoField)
            for (let i = 0; i < sortrs.length; i++) {
              let d = sortrs[i]
              let s = {}
              s.fieldId = d.fieldId
              s.fieldName = d.fieldName
              s.fieldType = d.fieldType
              s.optionField = d.optionField
              s.conditionField = d.conditionField
              s.conditionValue = d.conditionValue
              s.shopId = d.shopId
              s.fieldValue = ''
              s.requiredField = d.requiredField
              this.fieldNameItem.push(s)
            }
            var data1 = this.fieldNameItem.filter(el => parseInt(el.conditionField || 0) > 0)
            // var data2 = []
            for (var i = 0; i < data1.length; i++) {
              var d = data1[i]
              var indexC = this.fieldNameItem.findIndex(function (o) {
                return o.fieldId === d.fieldId
              })
              var indexF = this.fieldNameItem.findIndex(function (o) {
                return o.fieldId === parseInt(d.conditionField)
              })
              this.fieldNameItem.splice((indexF + 1), 0, this.fieldNameItem.splice(indexC, 1)[0])
            // data2.push({'indexC': indexC, 'indexF': indexF})
            }
          // setTimeout(() => this.validate('ADD'), 500)
          } else {
            this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
              this.dialogAdd = false
              this.clearDataAdd()
            }).catch((error) => {
              console.log('error function addData : ', error)
              this.dialogAdd = false
              this.clearDataAdd()
            })
          }
        })
        .catch(error => {
          this.$swal('พบความผิดพลาดระหว่างดำเนินการ', 'กรุณากดปุ่มเพื่อดึงข้อมูลใหม่', 'info').then(result => {
            this.dialogAdd = false
            this.clearDataAdd()
          }).catch((error) => {
            console.log('error function addData : ', error)
            this.dialogAdd = false
            this.clearDataAdd()
          })
          console.log('error function addData : ', error)
        })
    },
    async getflowfield (item) {
      this.flowfieldNameitem = []
      let itemIncustomField = []
      await axios
        .get(
          this.DNS_IP +
            '/flowField/get?flowId=' +
            item.flowId +
            '&shopId=' +
            this.session.data.shopId
        )
        .then(response => {
          let tt = response.data
          console.log('tt', tt)
          if (tt.length > 0) {
            let flowId = tt[0].flowId
            let flowfieldName = []
            flowfieldName = JSON.parse(tt[0].flowfieldName)
            if (flowfieldName.length > 0) {
              for (let a = 0; a < flowfieldName.length; a++) {
                let d = flowfieldName[a]
                itemIncustomField.push(d.fieldId)
              }
              this.getCustomfieldFlow(itemIncustomField, flowId)
            }
          }
          // console.log('itemIncustomField', itemIncustomField)
        })
    },
    async getCustomfieldFlow (item, flowId) {
      let flowfieldNameitems = []
      this.flowfieldNameitem = []
      await axios
        .get(this.DNS_IP + '/customField/fieldId?fieldId=' + item)
        .then(async response => {
          let rs = response.data
          console.log('rs', rs)
          let sortrs = rs.sort((a, b) => a.sortNoField - b.sortNoField)
          for (var i = 0; i < sortrs.length; i++) {
            let d = sortrs[i]
            let s = {}
            s.fieldId = d.fieldId
            s.flowId = flowId
            s.fieldName = d.fieldName
            s.optionField = d.optionField
            s.conditionField = d.conditionField || ''
            s.fieldType = d.fieldType
            s.fieldValue = ''
            s.CREATE_USER = ''
            s.LAST_USER = ''
            s.showCard = d.showCard
            s.shopId = this.$session.getAll().data.shopId
            s.endDate = ''
            s.endTime = ''
            s.checkCar = 'False'
            s.conditionValue = d.conditionValue
            s.requiredField = d.requiredField
            flowfieldNameitems.push(s)
          }
          var data1 = flowfieldNameitems.filter(el => parseInt(el.conditionField || 0) > 0)
          // var data2 = []
          for (let i = 0; i < data1.length; i++) {
            let d = data1[i]
            let indexC = flowfieldNameitems.findIndex(function (o) {
              return o.fieldId === d.fieldId
            })
            let indexF = flowfieldNameitems.findIndex(function (o) {
              return o.fieldId === parseInt(d.conditionField)
            })
            flowfieldNameitems.splice((indexF + 1), 0, flowfieldNameitems.splice(indexC, 1)[0])
            // data2.push({'indexC': indexC, 'indexF': indexF})
          }
          // console.log('data1', data1)
          // console.log('data2', data2)
          for (var x = 0; x < flowfieldNameitems.length; x++) {
            var s = flowfieldNameitems[x]
            var chk = this.BookingDataItem.filter(el => { return parseInt(el.fieldId) === s.fieldId })
            console.log('cccxxx', s)
            console.log('chk', chk)
            if (chk.length === 0) {
              this.flowfieldNameitem.push(s)
            }
          }
          // console.log('flowfieldNameitems', this.flowfieldNameitem)
          // console.log('flowfieldNameitems', flowfieldNameitems)
          // console.log('BookingDataItem', this.BookingDataItem)
          // setTimeout(() => this.validate('ADD'), 500)
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    addData () {
      this.loadingAdd = true
      this.validate('ADD')
      setTimeout(() => this.addDataSubmit(), 500)
    },
    async addDataInsert () {
      // this.swalConfig.title = 'ต้องการ บันทึกข้อมูล ใช่หรือไม่?'
      // this.$swal(this.swalConfig)
      //   .then(async result => {
      if (this.$session.id() !== undefined) {
        this.dataReadyAdd = false
        var fastTrack = 'False'
        var extraJob = 'False'
        switch (this.formAdd.radiosRemark) {
          case 'ซ่อมปกติ':
            fastTrack = 'False'
            extraJob = 'False'
            break
          case 'ExtraJob':
            fastTrack = 'False'
            extraJob = 'True'
            break
          case 'FastTrack':
            fastTrack = 'True'
            extraJob = 'False'
            break
        }
        let rs = this.fieldNameItem
        let Add = []
        let fielditem = this.fieldNameItem
        if (this.checkDepositAdd === 'False') {
          this.formAdd.depositStatus = ''
          this.formAdd.depositImge = ''
        } else {
          if (this.dataDepositAdd === 'มี') {
            this.formAdd.depositStatus = 'True'
            if (this.filesDepositAdd) {
              const _this = this
              let params = new FormData()
              params.append('file', this.filesDepositAdd)
              await axios
                .post(this.DNS_IP + `/file/upload/deposit`, params)
                .then(function (response) {
                  _this.formAdd.depositImge = response.data
                  console.log('url Pic', response.data)
                })
            } else {
              this.formAdd.depositImge = this.pictureUrlPreviewDeposit
            }
          } else {
            this.formAdd.depositStatus = 'False'
            this.formAdd.depositImge = ''
          }
        }
        console.log('this.fieldNameItem', this.fieldNameItem)
        let limitBookingCheck = ''
        if (this.checkLimitBooking.limitCheck === 'true' || null) {
          limitBookingCheck = 'True'
        } else {
          limitBookingCheck = 'False'
        }
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          let update = {}
          if (d.conditionField === '' || d.conditionField === null) {
            update.masBranchID = this.formAdd.masBranchID
            update.bookingFieldId = d.bookingFieldId
            update.remark = this.remark
            update.flowId = this.formAdd.flowId
            update.fieldId = d.fieldId
            update.fieldValue = d.fieldValue
            update.shopId = d.shopId
            update.dueDate = this.date + ' ' + this.time.value
            update.dateSelect = this.date
            update.timeSelect = this.time.value
            update.timeText = this.time.text
            update.userId = 'user-skip'
            update.pageName = 'BookingList'
            update.sourceLink = 'direct'
            update.fastTrack = fastTrack
            update.extraJob = extraJob
            update.depositStatus = this.formAdd.depositStatus
            update.depositImge = this.formAdd.depositImge
            update.empSelect = this.empSelectAdd
            update.adminLogin = this.session.data.userName
            update.limitBookingCheck = limitBookingCheck
            update.limitBookingId = this.checkLimitBooking.ID
            update.limitBookingCount = this.checkLimitBooking.countBooking
            update.getLimitBooking = this.checkLimitBooking.limitBooking
            Add.push(update)
          } else {
            if (fielditem.filter(row => { return row.fieldId === parseInt(d.conditionField) }).length > 0) {
              if (d.conditionValue === fielditem.filter(row => { return row.fieldId === parseInt(d.conditionField) })[0].fieldValue) {
                update.masBranchID = this.formAdd.masBranchID
                update.bookingFieldId = d.bookingFieldId
                update.remark = this.remark
                update.flowId = this.formAdd.flowId
                update.fieldId = d.fieldId
                update.fieldValue = d.fieldValue
                update.shopId = d.shopId
                update.dueDate = this.date + ' ' + this.time.value
                update.dateSelect = this.date
                update.timeSelect = this.time.value
                update.timeText = this.time.text
                update.sourceLink = 'direct'
                update.userId = 'user-skip'
                update.pageName = 'BookingList'
                update.fastTrack = fastTrack
                update.extraJob = extraJob
                update.depositStatus = this.formAdd.depositStatus
                update.depositImge = this.formAdd.depositImge
                update.empSelect = this.empSelectAdd
                update.adminLogin = this.session.data.userName
                update.limitBookingCheck = limitBookingCheck
                update.limitBookingId = this.checkLimitBooking.ID
                update.limitBookingCount = this.checkLimitBooking.countBooking
                update.getLimitBooking = this.checkLimitBooking.limitBooking
                Add.push(update)
              }
            } else if (d.conditionField === 'flow') {
              if (parseInt(d.conditionValue) === parseInt(this.formAdd.flowId)) {
                update.masBranchID = this.formAdd.masBranchID
                update.bookingFieldId = d.bookingFieldId
                update.remark = this.remark
                update.flowId = this.formAdd.flowId
                update.fieldId = d.fieldId
                update.fieldValue = d.fieldValue
                update.shopId = d.shopId
                update.dueDate = this.date + ' ' + this.time.value
                update.dateSelect = this.date
                update.timeSelect = this.time.value
                update.timeText = this.time.text
                update.sourceLink = 'direct'
                update.userId = 'user-skip'
                update.pageName = 'BookingList'
                update.fastTrack = fastTrack
                update.extraJob = extraJob
                update.depositStatus = this.formAdd.depositStatus
                update.depositImge = this.formAdd.depositImge
                update.empSelect = this.empSelectAdd
                update.adminLogin = this.session.data.userName
                update.limitBookingCheck = limitBookingCheck
                update.limitBookingId = this.checkLimitBooking.ID
                update.limitBookingCount = this.checkLimitBooking.countBooking
                update.getLimitBooking = this.checkLimitBooking.limitBooking
                Add.push(update)
              }
            }
          }
        }
        console.log('Add', Add)
        axios
          .post(this.DNS_IP + '/Booking/add', Add)
          .then(async response => {
          // this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            if (response.data.message === 'LimitBooking_Full') {
              this.$swal('คิวเต็มแล้ว', 'กรุณาเลือกวันที่และเวลาใหม่อีกครั้ง', 'error')
              this.date = ''
              this.time = ''
            } else {
              let checkDeposit = this.DataFlowName.filter(el => { return el.value === parseInt(this.formAdd.flowId) })
              let depositCheckStatus = ''
              if (checkDeposit.length > 0) {
                depositCheckStatus = checkDeposit[0].allData.checkDeposit || 'False'
              } else {
                depositCheckStatus = 'False'
              }
              if (depositCheckStatus === 'True') {
                if (this.dataDepositAdd === 'มี') {
                  await this.confirmChkAdd(response.data)
                } else {
                  this.clearDataAdd()
                  this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
                }
              } else {
                await this.confirmChkAdd(response.data)
              }
            }
          // console.log('addDataGlobal DNS_IP + /job/add', response)
          })
          .catch(error => {
            console.log('error function addData : ', error)
            setTimeout(() => this.addDataInsert(), 3000)
          })
        // })
        // .catch(error => {
        //   console.log('Cencel : ', error)
        //   this.closeSetTimeGetCalenda()
        // })
      } else {
        this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
        clearInterval(this.setTimerCalendar)
        this.setTimerCalendar = null
        this.$router.push('/Core/Login')
      }
    },
    async addDataSubmit () {
      if (this.validAdd === true) {
        if (this.$session.id() !== undefined) {
          if (this.formAdd.radiosRemark === 'FastTrack') {
            let getcount = await this.getCountFastTrack(this.date, this.formAdd.flowId, this.formAdd.masBranchID)
            let setCountFast = this.branch.filter(el => { return el.value === this.formAdd.masBranchID })[0].allData.countFastTrack
            if (getcount < setCountFast) {
              if (this.DataFlowName.filter(item => { return item.value === this.formAdd.flowId })[0].allData.limitBookingCheck === 'True') {
                await this.checkLimit()
                // console.log('test', this.branchData.filter(item => { return item.masBranchID === this.formAdd.masBranchID })[0].setTime)
                if (this.checkLimitBooking.limitCheck === 'true') {
                  this.dialogAddCon = true
                } else if (this.checkLimitBooking.limitCheck === 'false') {
                  console.log('else1402')
                  this.$swal('คิวเต็มแล้ว', 'กรุณาเลือกวันที่ใหม่อีกครั้ง', 'error')
                  this.date = ''
                  this.time = ''
                } else {
                  this.checkLimitBooking.limitCheck = 'true'
                  this.dialogAddCon = true
                  console.log('else1407')
                }
              } else {
                this.checkLimitBooking.limitCheck = 'false'
                this.dialogAddCon = true
                console.log('else1407')
              }
            } else {
              this.textError = 'จำนวนงานด่วนต่อวัน เกินกว่าที่ตั้งไว้'
              this.dialogError = true
              this.loadingAdd = false
            }
          } else {
            if (this.DataFlowName.filter(item => { return item.value === this.formAdd.flowId })[0].allData.limitBookingCheck === 'True') {
              await this.checkLimit()
              // console.log('test', this.branchData.filter(item => { return item.masBranchID === this.formAdd.masBranchID })[0].setTime)
              if (this.checkLimitBooking.limitCheck === 'true') {
                this.dialogAddCon = true
              } else if (this.checkLimitBooking.limitCheck === 'false') {
                console.log('else1402')
                this.$swal('คิวเต็มแล้ว', 'กรุณาเลือกวันที่ใหม่อีกครั้ง', 'error')
                this.date = ''
                this.time = ''
              } else {
                this.dialogAddCon = true
                this.checkLimitBooking.limitCheck = 'true'
                console.log('else1407')
              }
            } else {
              this.dialogAddCon = true
              this.checkLimitBooking.limitCheck = 'false'
            }
          }
        } else {
          this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
          clearInterval(this.setTimerCalendar)
          this.setTimerCalendar = null
          this.$router.push('/Core/Login')
        }
      } else {
        this.loadingAdd = false
      }
    },
    async pushMsglineGroup (bookNo) {
      await axios
        .post(this.DNS_IP + '/Booking/pushMsgLineGroup/' + bookNo)
        .then(response => {
          this.clearData()
        })
    },
    async confirmChkAdd (item) {
      var dt = {
        bookNo: item.bookNo,
        contactDate: this.format_date(new Date()),
        status: 'confirm',
        statusUse: 'use',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: this.session.data.userName,
        LAST_USER: this.session.data.userName
      }
      await axios
        .post(this.DNS_IP + '/booking_transaction/add', dt)
        .then(async response => {
          // this.getDataCalendaBooking()
          this.clearDataAdd()
          this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
          // await this.getBookingList()
          // this.getTimesChange('update')
        })
        .catch(error => {
          console.log('error function addData : ', error)
          setTimeout(() => this.confirmChkAdd(), 3000)
        })
    },
    async clearDataAdd () {
      this.dataReady = true
      this.date = ''
      this.time = ''
      this.empSelectAdd = ''
      this.remark = ''
      this.formAdd.radiosRemark = ''
      this.formAdd.depositStatus = ''
      this.formAdd.depositImge = ''
      this.formAdd.pictureUrlPreviewDeposit = ''
      this.filesDepositAdd = null
      this.dataDepositAdd = 'ไม่มี'
      this.DataflowId = ''
      this.formAdd.bookingId = null
      this.formAdd.fieldId = ''
      this.formAdd.fieldValue = ''
      this.formAdd.flowId = null
      this.formAdd.masBranchID = null
      this.formAdd.dueDate = ''
      this.formAdd.shopId = this.$session.getAll().data.shopId
      this.dialogAdd = false
      this.dialogAddCon = false
      this.loadingAdd = false
      this.dataReadyAdd = true
      clearInterval(this.setTimerCalendar)
      this.setTimerCalendar = null
      if (this.statusSearch === 'no') {
        this.getBookingList()
      } else {
        this.searchAny()
      }
      if (this.getSelectText) {
        this.getSelect(this.getSelectText, this.getSelectCount)
      }
      this.getDataCalendaBooking()
    },
    async getDataById (dt) {
      console.log('dt', dt)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/getID?bookNo=" + dt.bookNo
        )
        .then(async response => {
          this.dataReady = true
          if (response.data) {
            Object.assign(this.formUpdate, response.data)
            delete this.formUpdate['RECORD_STATUS']
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          this.dataReady = true
          console.log('error function getDataById : ', error)
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    },
    async deleteData () {
      this.swalConfig.title = 'ต้องการ ลบข้อมูล ใช่หรือไม่?'
      this.$swal(this.swalConfig)
        .then(async result => {
          this.formUpdate.LAST_USER = this.$session.getAll().data.userName
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/Booking/delete/" + this.formUpdate.bookNo,
              this.formUpdate
            )
            .then(async response => {
              // Debug response
              console.log('DNS_IP + PATH + "delete/"', response)

              this.$swal('เรียบร้อย', 'ลบข้อมูลเรียบร้อย', 'success')
              // Close Dialog

              // Load Data
              if (this.statusSearch === 'no') {
                await this.getBookingList()
              } else {
                await this.searchAny()
              }
              // this.getTimesChange('update')
              if (this.getSelectText) {
                this.getSelect(this.getSelectText, this.getSelectCount)
              }
              this.getDataCalendaBooking()
              this.dialogDelete = false
            })
            // eslint-disable-next-line handle-callback-err
            .catch(error => {
              this.dataReady = true
              this.$swal('ผิดพลาด', 'ผิดพลาด -1', 'error')
              console.log('error function deleteDataGlobal : ', error)
              //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
            })
        })
        .catch(error => {
          this.dataReady = true
          this.$swal('ผิดพลาด', 'ผิดพลาด -2', 'error')
          console.log('error function deleteDataGlobal : ', error)
        })
    },
    async getBookingDataJob (dt, text) {
      let dateCurrent = this.momenDate_1(new Date())
      let dueDate = this.momenDate_1(dt.dueDate)
      console.log(dateCurrent, dueDate)
      if (dateCurrent >= dueDate) {
        this.statusConfirmJob = true
      } else {
        this.statusConfirmJob = false
      }
      // console.log('this.statusConfirmJob', this.statusConfirmJob)
      let checkStep = await axios.get(this.DNS_IP + '/flowStep/get?flowId=' + dt.flowId)
      console.log('checkStep', checkStep)
      if (checkStep.data.status === false) {
        this.endDate = this.momenDate_1(new Date())
        this.endTime = this.momenTime(new Date())
        this.statusShowDateConfiremjob = false
      } else {
        this.statusShowDateConfiremjob = true
      }
      if (this.statusConfirmJob) {
        this.jobCheckPackage = false
        console.log('dt', dt)
        this.dateTimestamp = moment().unix()
        this.remark = dt.remark
        this.userId = dt.userId
        this.lineUserId = dt.lineUserId
        console.log(this.userId, this.lineUserId)
        if (dt.packageId !== '') {
          this.dataPackageDefault = true
        } else {
          this.dataPackageDefault = false
        }
        await this.getPackage(dt)
        if (this.dataPackage.length > 0) {
          console.log('dataPackage', this.dataPackage.filter(el => { return el.packageId === dt.packageId }))
          if (this.dataPackage.filter(el => { return el.packageId === dt.packageId }).length > 0) {
            var dataPack = this.dataPackage.filter(el => { return el.packageId === dt.packageId })
            this.dataPackageDefault = true
            // this.packageId = dataPack[0].value
            this.UpdatePackage(dataPack[0].value, 'ตกลง', dataPack[0].text, dataPack[0], dt.tokenPackage)
          } else {
            this.UpdatePackage('', 'ยกเลิก', '', '', '')
            this.dataPackageDefault = false
          }
        }
        this.checkTimeFlow(dt)
        this.BookingDataItem = []
        let itemIncustomField = []
        // this.statusConfirmJob = false
        this.dueDate = dt.dueDate

        await axios
          .get(
            this.DNS_IP + '/BookingField/get?shopId=' + this.session.data.shopId
          )
          .then(async response1 => {
            let rs2 = response1.data
            console.log('BookingField', rs2)
            if (rs2.length > 0) {
              let bookingData = []
              bookingData = JSON.parse(rs2[0].flowfieldName)
              for (let i = 0; i < bookingData.length; i++) {
                let d = bookingData[i]
                itemIncustomField.push(d.fieldId)
              }
              await axios
                .get(this.DNS_IP + '/customField/fieldId?fieldId=' + itemIncustomField)
                .then(async responses => {
                  let rs1 = responses.data
                  await axios
                    .get(this.DNS_IP + '/BookingDataSelect/get?bookNo=' + dt.bookNo)
                    .then(async response => {
                      let rs = response.data
                      if (rs.length > 0) {
                        console.log('BookingDataSelect', rs)
                        console.log('customField', rs1)
                        let sortrs = rs1.sort((a, b) => a.sortNoField - b.sortNoField)
                        for (var i = 0; i < sortrs.length; i++) {
                          var d = sortrs[i]
                          // var s = {}
                          var dataBD = rs.filter(el => { return parseInt(el.fieldId) === parseInt(d.fieldId) })
                          if (dataBD.length > 0) {
                            if (dt.flowId === dataBD[0].flowId) {
                              d.bookNo = dataBD[0].bookNo
                              d.bookingFieldId = rs2[0].bookingFieldId
                              d.bookingDataId = dataBD[0].bookingDataId
                              d.flowId = dataBD[0].flowId
                              d.masBranchID = dataBD[0].masBranchID
                              // d.dueDate = dt.dueDate
                              // d.conditionField = d.conditionField
                              // d.fieldId = d.fieldId
                              // d.fieldType = d.fieldType
                              d.fieldValue = dataBD[0].fieldValue
                              d.packageId = dataBD[0].packageId
                              // d.fieldName = d.fieldName
                              // d.conditionField = d.conditionField
                              // d.conditionValue = d.conditionValue
                              // d.requiredField = d.requiredField
                              // d.optionField = d.optionField
                              // d.userId = d.userId
                              if (rs[0].userId === 'user-skip') {
                                d.userId = ''
                              } else {
                                d.userId = rs[0].userId
                              }
                              d.shopId = this.session.data.shopId
                              d.userName = this.$session.getAll().data.userName
                              this.BookingDataItem.push(d)
                            }
                          }
                        }
                        if (text === 'qrcode') {
                          this.dataQrcode = dt
                        }
                        // await this.getBookingField()
                        await this.getflowfield(dt)
                      }
                    })
                })
            }
          })
      }
    },
    async getBookingData (dt, text) {
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
            if (text === 'qrcode') {
              this.dataQrcode = dt
            }
            await this.getflowfield(dt)
          }
        })
    },
    addDataJob () {
      this.validate('UPDATE')
      setTimeout(() => this.addDataJobSubmit(), 500)
    },
    async addDataJobSubmit () {
      if (this.$session.id() !== undefined) {
        if (this.dataItem.filter(row => row.bookNo === this.BookingDataItem[0].bookNo).length > 0) {
          if (this.validUpdate === true) {
            let checkJobno = ''
            await axios.get(this.DNS_IP + '/booking_view/get?bookNo=' + this.BookingDataItem[0].bookNo)
              .then(async response => {
                let rs = response.data
                console.log('checkJobNoInBooking', rs)
                if (rs.status === false) {
                  checkJobno = 'ไม่มีข้อมูล'
                } else {
                  checkJobno = rs[0].jobNo || ''
                }
              })
            if (checkJobno === '') {
              console.log('this.BookingDataItem', this.BookingDataItem)
              let Add = []
              let fielditem = this.flowfieldNameitem
              console.log('fielditem', fielditem)
              for (var i = 0; i < this.BookingDataItem.length; i++) {
                var d = this.BookingDataItem[i]
                let update = {}
                let addData = false
                var dataField = this.editedItemSeleteField.filter(el => { return parseInt(el.fieldId) === parseInt(d.fieldId) })
                if (dataField[0].conditionField === '' || dataField[0].conditionField === null) {
                  addData = true
                } else {
                  if (fielditem.filter(row => { return row.fieldId === parseInt(d.conditionField) }).length > 0) {
                    console.log('this', fielditem)
                    if (d.conditionValue === fielditem.filter(row => { return row.fieldId === parseInt(d.conditionField) })[0].fieldValue) {
                      addData = true
                    } else if (d.conditionField === 'flow') {
                      addData = true
                    }
                  } else if (d.conditionField === 'flow') {
                    addData = true
                  }
                }
                if (addData) {
                  if (d.fieldValue !== '') {
                    update.masBranchID = this.BookingDataItem[0].masBranchID || ''
                    update.CREATE_USER = d.userName
                    update.LAST_USER = d.userName
                    update.packageId = d.packageId
                    update.checkCar = ''
                    // update.userId = d.userId
                    update.endDate = this.endDate
                    update.endTime = this.endTime.value
                    update.fieldId = d.fieldId
                    update.fieldName = d.fieldName
                    update.fieldType = dataField[0].fieldType || ''
                    update.fieldValue = d.fieldValue
                    update.flowId = d.flowId
                    update.empSelect = this.empSelectJob
                    update.conditionField = dataField[0].conditionField || ''
                    update.conditionValue = dataField[0].conditionValue || ''
                    update.optionField = dataField[0].optionField || ''
                    update.shopId = dataField[0].shopId || ''
                    update.showCard = dataField[0].showCard || ''
                    Add.push(update)
                  }
                }
              }
              for (var x = 0; x < fielditem.length; x++) {
                var t = fielditem[x]
                if (Add.filter(row => { return row.fieldId === t.fieldId }).length === 0) {
                  let update = {}
                  let dataField = this.editedItemSeleteField.filter(el => { return parseInt(el.fieldId) === parseInt(t.fieldId) })
                  update.masBranchID = this.BookingDataItem[0].masBranchID || ''
                  update.CREATE_USER = Add[0].CREATE_USER
                  update.LAST_USER = Add[0].CREATE_USER
                  update.packageId = Add[0].packageId
                  update.checkCar = ''
                  // update.userId = Add[0].userId
                  update.endDate = this.endDate
                  update.endTime = this.endTime.value
                  update.fieldId = t.fieldId
                  update.fieldName = t.fieldName
                  update.fieldType = dataField[0].fieldType || ''
                  update.fieldValue = t.fieldValue
                  update.flowId = d.flowId
                  update.empSelect = this.empSelectJob
                  update.conditionField = dataField[0].conditionField || ''
                  update.conditionValue = dataField[0].conditionValue || ''
                  update.optionField = dataField[0].optionField || ''
                  update.shopId = dataField[0].shopId || ''
                  update.showCard = dataField[0].showCard || ''
                  Add.push(update)
                }
              }
              console.log('this.Add', Add)
              console.log(this.packageId, this.tokenPackage)
              this.swalConfig.title = 'ต้องการนำรายการนี้ เข้าตารางใช่หรือไม่?'
              this.$swal(this.swalConfig)
                .then(async result => {
                  this.dataEditJobReady = false
                  await axios
                    .post(this.DNS_IP + '/job/add', Add)
                    .then(async response => {
                      this.endDate = ''
                      this.endTime = ''
                      this.empSelectJob = ''
                      this.statusShowDateConfiremjob = true
                      if (response.data.status) {
                        var dt = {
                          bookNo: this.BookingDataItem[0].bookNo,
                          statusJob: 'job',
                          jobNo: response.data.jobNo
                        }
                        await axios
                          .post(
                            this.DNS_IP +
                    '/Booking/editStatus/' +
                    this.BookingDataItem[0].bookNo,
                            dt
                          )
                          .then(async response1 => {
                            await this.pushMsg(response.data.jobNo)
                            var dtt = {
                              bookNo: this.BookingDataItem[0].bookNo,
                              contactDate: this.format_date(new Date()),
                              status: 'confirmJob',
                              statusUse: 'use',
                              shopId: this.$session.getAll().data.shopId,
                              CREATE_USER: this.session.data.userName,
                              LAST_USER: this.session.data.userName,
                              packageId: this.packageId,
                              tokenPackage: this.tokenPackage
                            }
                            axios
                              .post(this.DNS_IP + '/booking_transaction/add', dtt)
                              .then(async response => {
                                if (this.jobCheckPackage) {
                                  console.log('usePackage')
                                  await this.usePackage()
                                }
                                this.$swal('เรียบร้อย', 'นำเข้าสำเร็จ', 'success')
                                if (this.statusSearch === 'no') {
                                  await this.getBookingList()
                                } else {
                                  await this.searchAny()
                                }
                                this.dialogEdit = false
                                this.dataEditJobReady = true
                                var dataJob = this.dataItem.filter(el => { return el.bookNo === this.dataQrcode.bookNo })
                                this.getjob(dataJob[0])
                                this.dialogJob = true
                              })
                          })
                      } else {
                        this.$swal('ผิดพลาด', 'กรุณาทำรายการใหม่', 'error')
                        this.dialogEdit = false
                        if (this.statusSearch === 'no') {
                          await this.getBookingList()
                        } else {
                          await this.searchAny()
                        }
                        // this.getTimesChange('update')
                        if (this.getSelectText) {
                          this.getSelect(this.getSelectText, this.getSelectCount)
                        }
                      }
                    }).catch(error => {
                      setTimeout(() => this.addDataJobSubmit(), 3000)
                      console.log('error function addData : ', error)
                    })
                })
            } else {
              this.$swal('ผิดพลาด', 'รายการนี้ได้นำเข้ากระดานการทำงานแล้ว', 'error').then(async response => {
                this.dialogEdit = false
                if (this.statusSearch === 'no') {
                  await this.getBookingList()
                } else {
                  await this.searchAny()
                }
                // this.getTimesChange('update')
                if (this.getSelectText) {
                  this.getSelect(this.getSelectText, this.getSelectCount)
                }
              }).catch(error => {
                console.log('error function addData : ', error)
                this.dialogEdit = false
                if (this.statusSearch === 'no') {
                  this.getBookingList()
                } else {
                  this.searchAny()
                }
                // this.getTimesChange('update')
                if (this.getSelectText) {
                  this.getSelect(this.getSelectText, this.getSelectCount)
                }
              })
            }
          }
        } else {
          this.$swal('ผิดพลาด', 'ไม่มีนัดหมายเข้ารับบริการนี้', 'error').then(async response => {
            this.dialogEdit = false
            if (this.statusSearch === 'no') {
              await this.getBookingList()
            } else {
              await this.searchAny()
            }
            // this.getTimesChange('update')
            if (this.getSelectText) {
              this.getSelect(this.getSelectText, this.getSelectCount)
            }
          }).catch(error => {
            console.log('error function addData : ', error)
            this.dialogEdit = false
            if (this.statusSearch === 'no') {
              this.getBookingList()
            } else {
              this.searchAny()
            }
            // this.getTimesChange('update')
            if (this.getSelectText) {
              this.getSelect(this.getSelectText, this.getSelectCount)
            }
          })
        }
      } else {
        this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
        clearInterval(this.setTimerCalendar)
        this.setTimerCalendar = null
        this.$router.push('/Core/Login')
      }
    },
    async pushMsg (jobNo) {
      const result = await axios
        .get(
          this.DNS_IP +
            '/member/get?shopId=' +
            this.session.data.shopId +
            '&liffUserId=' +
            this.BookingDataItem[0].userId
        )
        .catch(error => {
          console.log('error function addData : ', error)
        })
      console.log('result', result.data.status)
      if (result.data.status === false) {
        let statusSend = {
          statusSend: 'false'
        }
        await axios.post(this.DNS_IP + '/job/updateJobNo/' + jobNo, statusSend)
        console.log('statusSend', 'false')
        let updateStatusSend = {
          updateStatusSend: 'false'
        }
        await axios
          .post(
            this.DNS_IP + '/job/NotifyQrcode/' + jobNo,
            updateStatusSend
          )
          .then(
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            // this.clearData()
            // this.$router.push('/Master/FlowStep')
          )
          .catch(error => {
            console.log('error function addDataGlobal : ', error)
          })
      }
      // this.clearData()
    },
    async getEmpSelect (item) {
      this.empSelectStep = []
      await axios
        .get(this.DNS_IP + '/empSelect/getUse?privacyPage=booking&shopId=' + item.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH
              s.value = d.empId
              this.empSelectStep.push(s)
            }
            this.empSelect = this.empSelectStep[0].value
          }
        })
    },
    async getEmpSelectAdd () {
      this.empSelectStepAdd = []
      await axios
        .get(this.DNS_IP + '/empSelect/getUse?privacyPage=booking&shopId=' + this.$session.getAll().data.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH
              s.value = d.empId
              this.empSelectStepAdd.push(s)
            }
          }
        })
    },
    async confirmChk (item) {
      this.dateTimestamp = moment().unix()
      this.dataConfirm = item
      this.remark = item.remark
      this.userId = item.userId
      this.lineUserId = item.lineUserId
      console.log(this.userId, this.lineUserId)
      await this.getEmpSelect(item)
      await this.getPackage(item)
      if (this.dataPackage.length > 0) {
        if (this.dataPackage.filter(el => { return el.packageId === item.packageId }).length > 0) {
          var dataPack = this.dataPackage.filter(el => { return el.packageId === item.packageId })
          // this.packageId = dataPack[0].value
          this.UpdatePackage(dataPack[0].value, 'ตกลง', dataPack[0].text, dataPack[0], item.tokenPackage)
        } else {
          this.UpdatePackage('', 'ยกเลิก', '', '', '')
        }
      }
      this.dialogConfirm = true
    },
    onConfirm (item) {
      if (this.$session.id() !== undefined) {
        console.log('item', item)
        console.log('DataFlowName', this.DataFlowName.filter(el => { return el.value === item.flowId }))
        this.dataConfirmReady = false
        let dtint = '0'
        if (this.DataFlowName.filter(el => { return el.value === item.flowId }).length > 0) {
          let dts = JSON.parse(this.DataFlowName.filter(el => { return el.value === item.flowId })[0].allData.setTime) || []
          console.log(dts.filter(el => el.value === item.timeDuetext))
          if (dts.filter(el => el.value === item.timeDuetext).length > 0) {
            dtint = parseInt(dts.filter(el => el.value === item.timeDuetext)[0].limitBooking || '0')
          } else {
            dtint = '0'
          }
        } else {
          dtint = '0'
        }
        console.log('dtint', dtint)
        var dt = {
          bookNo: item.bookNo,
          contactDate: this.format_date(new Date()),
          status: 'confirm',
          statusUse: 'use',
          pageStatus: this.getSelectText,
          limitBookingCount: dtint,
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName,
          packageId: this.packageId,
          tokenPackage: this.tokenPackage
        }
        axios
          .post(this.DNS_IP + '/booking_transaction/add', dt)
          .then(async response => {
            if (response.data.status === true) {
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              await this.updateRemarkAndEmpSelect(item)
              // this.getDataCalendaBooking()
              if (this.packageId !== '') {
                await this.usePackage()
              }
              let DTitem = item.userId
              console.log('DTITEM', DTitem)
              if (DTitem !== 'user-skip') {
                if (this.statusSearch === 'no') {
                  await this.getBookingList()
                } else {
                  await this.searchAny()
                }
                // this.getTimesChange('update')
                if (this.getSelectText) {
                  this.getSelect(this.getSelectText, this.getSelectCount)
                }
                this.pushMsgConfirm(item.bookNo)
              } else {
                if (this.statusSearch === 'no') {
                  await this.getBookingList()
                } else {
                  await this.searchAny()
                }
                // this.getTimesChange('update')
                if (this.getSelectText) {
                  this.getSelect(this.getSelectText, this.getSelectCount)
                }
              }
              this.dataConfirmReady = true
              this.dialogConfirm = false
            } else {
              this.dataConfirmReady = true
              this.$swal('ผิดพลาด', response.data.message, 'error')
            }
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
      } else {
        this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
        clearInterval(this.setTimerCalendar)
        this.setTimerCalendar = null
        this.$router.push('/Core/Login')
      }
    },
    async usePackage () {
      var params = {
        shopId: this.$session.getAll().data.shopId,
        token: this.StatusPackage.token
      }
      await axios({
        method: 'post',
        headers: {
          shopId: this.$session.getAll().data.shopId,
          lineUserId: this.lineUserId,
          lineId: this.userId
        },
        url: this.DNS_IP_Loyalty + '/use_package/edit?shopId=' + this.$session.getAll().data.shopId + '&token=' + this.StatusPackage.token,
        data: params
      }).then((response) => {})
    },
    async updateRemarkAndEmpSelect (item) {
      var dt = {
        LAST_USER: this.session.data.userName,
        empSelect: this.empSelect,
        remark: (this.remark || '').replace(/%/g, '%%')
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/edit/" + item.bookNo,
          dt
        )
        .then(async response => {})
    },
    async updateRemark (item) {
      var dt = {
        LAST_USER: this.session.data.userName,
        empSelect: this.empSelect
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/Booking/edit/" + item.bookNo,
          dt
        )
        .then(async response => {})
    },
    async setDataRemove (item) {
      this.bookNoRemove = item
      this.dueDateOld = this.momenDate_1(item.dueDate)
      this.dueDateTimeOld = this.momenTime(item.dueDate)
      await this.getEmpSelect(item)
      this.dialogRemove = true
    },
    cancelChk () {
      this.validate('REMOVE')
      console.log('this.bookNoRemove', this.bookNoRemove)
      setTimeout(() => this.onCancelChk(), 500)
    },
    async updateLimitBookingCancel (item, dueDateOld, dueDateTimeOld) {
      let result = []
      let dt = {
        flowId: item.flowId,
        dateSelect: dueDateOld,
        timeSelect: dueDateTimeOld,
        shopId: item.shopId,
        userId: item.userId
      }
      await axios.post(this.DNS_IP + '/Booking/updateLimitBookingCancel', dt).then(async response => {
        result = response.data
      })
      return result
    },
    async onCancelChk () {
      if (this.validRemove === true) {
        if (this.$session.id() !== undefined) {
          let chkStatLimit = this.DataFlowName.filter(el => { return el.value === this.bookNoRemove.flowId })
          if (chkStatLimit.length > 0) {
            if (chkStatLimit[0].allData.limitBookingCheck === 'True') {
              // let dueOld = this.dueDateOld + this.dueDateTimeOld
              // let limitBookingCount = this.timeavailable.filter(el => { return el.value === this.formChange.time.value })
              // console.log('limitBookingCount', limitBookingCount)
              // let limitBookingCounts = 0
              // if (limitBookingCount.length > 0) {
              //   limitBookingCounts = parseInt(limitBookingCount[0].limitBooking)
              // } else {
              //   limitBookingCounts = 0
              // }
              let chkStatus = await this.updateLimitBookingCancel(this.bookNoRemove, this.dueDateOld, this.dueDateTimeOld)
              console.log('chkStatus', chkStatus)
              if (chkStatus.status) {
                this.onCancelChkSubmit()
              } else {
                this.onCancelChkSubmit()
              }
            } else {
              this.onCancelChkSubmit()
            }
          } else {
            this.onCancelChkSubmit()
          }
        } else {
          this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
          clearInterval(this.setTimerCalendar)
          this.setTimerCalendar = null
          this.$router.push('/Core/Login')
        }
      }
    },
    onCancelChkSubmit () {
      this.dataCancelReady = false
      var dt = {
        bookNo: this.bookNoRemove.bookNo,
        contactDate: this.format_date(new Date()),
        status: 'cancel',
        statusUse: 'use',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: this.session.data.userName,
        LAST_USER: this.session.data.userName,
        remarkRemove: (this.remarkRemove || '').replace(/%/g, '%%')
      }
      axios
        .post(this.DNS_IP + '/booking_transaction/add', dt)
        .then(async response => {
          await this.updateRemark(this.bookNoRemove)
          this.pushMsglineCancel(this.bookNoRemove)
          this.$swal('เรียบร้อย', 'ยกเลิกเรียบร้อย', 'success')
          console.log('addDataGlobal', response)
          if (this.statusSearch === 'no') {
            await this.getBookingList()
          } else {
            await this.searchAny()
          }
          // this.getTimesChange('update')
          if (this.getSelectText) {
            this.getSelect(this.getSelectText, this.getSelectCount)
          }
          // this.getDataCalendaBooking()
          this.dataCancelReady = true
          this.dialogRemove = false
          this.remarkRemove = ''
          this.bookNo = ''
        })
        .catch(error => {
          console.log('error function addData : ', error)
          this.dataCancelReady = true
        })
    },
    pushMsglineCancel (item) {
      let lineUserId = item.lineUserId || ''
      if (lineUserId !== '') {
        var dt = {
          lineUserId: lineUserId,
          shopId: this.$session.getAll().data.shopId,
          tell: this.$session.getAll().data.contactTel
        }
        axios
          .post(this.DNS_IP + '/Booking/pushMsgCancelBook', dt)
          .then(async response => {})
      }
    },
    async changeChk (item, changeStatus) {
      this.dataChangeReady = false
      if (this.formChange.time !== '') {
        if (item.statusBt === 'confirm') {
          if (this.remark !== '') {
            var dt = {
              LAST_USER: this.session.data.userName,
              remark: (this.remark || '').replace(/%/g, '%%')
            }
            await axios
              .post(
                // eslint-disable-next-line quotes
                this.DNS_IP + "/Booking/edit/" + item.bookNo,
                dt
              )
              .then(async response => {
                this.onChangeChk(item, changeStatus)
              })
          } else {
            this.$swal('ผิดพลาด', 'กรุณาใส่ หมายเหตุเพิ่มเติม', 'error')
            this.dataChangeReady = true
          }
        } else {
          this.onChangeChk(item, changeStatus)
        }
      } else {
        this.dataChangeReady = true
        this.$swal('ผิดพลาด', 'กรุณาเลือกเวลา', 'error')
      }
    },
    onChangeChk (item, changeStatus) {
      console.log('item', item)
      console.log('formChange', this.formChange)
      this.swalConfig.title = 'ต้องการ เปลี่ยนเวลานัดหมาย ใช่หรือไม่?'
      this.$swal(this.swalConfig).then(async result => {
        if (this.$session.id() !== undefined) {
          let checkCountTime = await axios.get(this.DNS_IP + '/booking_view/get?bookNo=' + item.bookNo)
          if (checkCountTime.data.status === false) {
            this.onChangeChk(item, changeStatus)
          } else {
            if (this.getSelectText === 'cancel') {
              this.onChangeChkSubmit(item, changeStatus, checkCountTime)
            } else {
              let chkStatLimit = this.DataFlowName.filter(el => { return el.value === item.flowId })
              if (chkStatLimit.length > 0) {
                if (chkStatLimit[0].allData.limitBookingCheck === 'True') {
                  let dueOld = this.dueDateOld + this.dueDateTimeOld
                  let dueNew = this.formChange.date + this.formChange.time.value
                  let limitBookingCount = this.timeavailable.filter(el => { return el.value === this.formChange.time.value })
                  let limitBookingCounts = 0
                  if (limitBookingCount.length > 0) {
                    limitBookingCounts = parseInt(limitBookingCount[0].limitBooking)
                  } else {
                    limitBookingCounts = 0
                  }
                  if (dueOld !== dueNew) {
                    let chkStatus = await this.updateLimitBookingChange(item, this.dueDateOld, this.dueDateTimeOld, this.formChange.date, this.formChange.time.value, limitBookingCounts)
                    console.log('chkStatus', chkStatus)
                    if (chkStatus.status) {
                      this.onChangeChkSubmit(item, changeStatus, checkCountTime)
                    } else {
                      this.$swal('ผิดพลาด', 'เวลาที่ท่านเลือกคิวเต็มแล้ว', 'error')
                      this.dataChangeReady = true
                    }
                  } else {
                    this.onChangeChkSubmit(item, changeStatus, checkCountTime)
                  }
                } else {
                  this.onChangeChkSubmit(item, changeStatus, checkCountTime)
                }
              } else {
                this.onChangeChkSubmit(item, changeStatus, checkCountTime)
              }
            }
          }
        } else {
          this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
          clearInterval(this.setTimerCalendar)
          this.setTimerCalendar = null
          this.$router.push('/Core/Login')
        }
      }).catch(error => {
        this.dataChangeReady = true
        console.log('catch alear : ', error)
      })
    },
    async onChangeChkSubmit (item, changeStatus, checkCountTime) {
      let countTime = 0
      if (checkCountTime) {
        countTime = checkCountTime.data[0].countChangeTime || 0
      }
      let dueOld = this.dueDateOld + this.dueDateTimeOld
      let dueNew = this.formChange.date + this.formChange.time.value
      console.log('dueNew', dueNew)
      console.log('dueOld', dueOld)
      if (dueOld === dueNew) {
        countTime = countTime + 0
      } else {
        countTime = countTime + 1
      }
      var dtChange = {
        countChangeTime: countTime,
        changeDueDate: 'change',
        dueDate: this.formChange.date + ' ' + this.formChange.time.value,
        timeText: this.formChange.time.text,
        LAST_USER: this.session.data.userName,
        countHourLimit: this.selectCountBookingLimit
      }
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/BookingData/edit/" + item.bookNo,
          dtChange
        )
        .then(async response => {
          var dt = {
            bookNo: item.bookNo,
            contactDate: this.format_date(new Date()),
            status: changeStatus,
            statusUse: 'use',
            shopId: this.$session.getAll().data.shopId,
            CREATE_USER: this.session.data.userName,
            LAST_USER: this.session.data.userName,
            changDate: this.formChange.date + ' ' + this.formChange.time.value
          }
          await axios
            .post(this.DNS_IP + '/booking_transaction/add', dt)
            .then(async response => {
              console.log('addDataGlobal', response)
              if (changeStatus === 'confirm') {
                if (item.userId !== 'user-skip') {
                  if (this.statusSearch === 'no') {
                    await this.getBookingList()
                  } else {
                    await this.searchAny()
                  }
                  // this.getTimesChange('update')
                  if (this.getSelectText) {
                    this.getSelect(this.getSelectText, this.getSelectCount)
                  }
                  this.pushMsgConfirm(item.bookNo)
                } else {
                  if (this.statusSearch === 'no') {
                    await this.getBookingList()
                  } else {
                    await this.searchAny()
                  }
                  // this.getTimesChange('update')
                  if (this.getSelectText) {
                    this.getSelect(this.getSelectText, this.getSelectCount)
                  }
                }
              } else {
                if (this.statusSearch === 'no') {
                  await this.getBookingList()
                } else {
                  await this.searchAny()
                }
                // this.getTimesChange('update')
                if (this.getSelectText) {
                  this.getSelect(this.getSelectText, this.getSelectCount)
                }
              }
              this.$swal('เรียบร้อย', 'เปลี่ยนเวลานัดหมาย เรียบร้อย', 'success')
              this.dataChangeReady = true
              this.dialogChange = false
            })
            .catch(error => {
              console.log('error function addData : ', error)
            })
        })
    },
    async updateLimitBookingChange (item, dueDateOld, dueDateTimeOld, dueDateNew, dueDateTimeNew, limitBookingCount) {
      let result = []
      let dt = {
        dueDateOld: dueDateOld,
        dueDateTimeOld: dueDateTimeOld,
        dueDateNew: dueDateNew,
        dueDateTimeNew: dueDateTimeNew,
        flowId: item.flowId,
        masBranchID: item.masBranchID,
        dateSelect: dueDateNew,
        timeSelect: dueDateTimeNew,
        shopId: item.shopId,
        userId: item.userId,
        limitBookingCount: limitBookingCount
      }
      await axios.post(this.DNS_IP + '/Booking/updateLimitBookingChangeTime', dt).then(async response => {
        result = response.data
      })
      return result
    },
    async manageLimitBooking () {
      var dt = {
        dataLimit: this.limitCountBranch,
        dataLimitOld: this.limitCountBranchOld,
        dueDateNew: this.formChange.date,
        dueDateOld: this.dueDateOld,
        masBranchIDLimit: this.masBranchIDLimit,
        flowId: this.flowIDLimit,
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: this.session.data.userName,
        LAST_USER: this.session.data.userName
      }
      console.log('manageLimitBooking', dt)
      await axios
        .post(this.DNS_IP + '/LimitBookingDate/manage', dt)
        .then(async response => {
        })
    },
    async getjob (item) {
      console.log(item)
      this.bookNo = item.bookNo
      this.jobitem = []
      if (item.jobNo !== '') {
        let checkBookingMember = ''
        const result = await axios
          .get(
            this.DNS_IP +
            '/member/get?shopId=' +
            this.session.data.shopId +
            '&liffUserId=' +
            item.userId
          )
          .catch(error => {
            console.log('error function addData : ', error)
          })
        console.log('result', result.data)
        if (result.data.status === false) {
          checkBookingMember = ''
        } else {
          checkBookingMember = result.data[0]
        }
        await axios.get(this.DNS_IP + '/job/getJobNo?jobNo=' + item.jobNo).then((response) => {
          let rs = response.data
          let Id = ''
          let memberPicture = ''
          console.log('getJobNo', rs)
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {
                Id: d.jobId,
                value: d.fieldValue,
                name: d.fieldName,
                showCard: d.showCard,
                jobNo: d.jobNo,
                checkPayment: d.checkPayment,
                recordStatus: d.RECORD_STATUS
              }
              Id = d.userId || ''
              memberPicture = d.memberPicture || ''
              this.jobitem.push(s)
            }
            this.userId = Id
            this.memberPicture = memberPicture
            if (checkBookingMember !== '' && this.memberPicture === '') {
              this.checkShowSelectUser = true
              this.dataSelectUser = checkBookingMember
            } else {
              this.checkShowSelectUser = false
              this.dataSelectUser = ''
            }
            this.value = this.pathToweb + this.jobitem[0].Id + '&shopId=' + this.$session.getAll().data.shopId
            this.recordStatusJob = this.jobitem[0].recordStatus
            this.checkPayment = this.jobitem[0].checkPayment
            this.formCloseJob.jobNo = this.jobitem[0].jobNo
            this.formCloseJob.jobId = this.jobitem[0].Id
            console.log('this.value', this.value)
            // this.getUserId()
          }
        })
      }
    },
    async jobConfirm () {
      this.swalConfig.title = 'ต้องการ ยืนยันข้อมูล ใช่หรือไม่?'
      this.$swal(this.swalConfig)
        .then(async () => {
          if (this.$session.id() !== undefined) {
            await axios
              .post(
                this.DNS_IP + '/job/update/' + this.jobitem[0].Id, this.skip
              ).then(async (response) => {
                console.log(response)
                if (response.data.status) {
                  this.getDataCalendaBooking()
                  this.$swal('เรียบร้อย', 'ปรับปรุงเรียบร้อย', 'success')
                  this.dialogJob = false
                } else {
                  this.$swal('ผิดพลาด', 'เนื่องจากรายการนี้มีคนนำเข้าแล้ว', 'error')
                  this.dialogJob = false
                }
              })
          } else {
            this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
            clearInterval(this.setTimerCalendar)
            this.setTimerCalendar = null
            this.$router.push('/Core/Login')
          }
        })
    },
    async jobConfirmUser () {
      console.log('this.jobitem', this.jobitem)
      console.log('this.BookingDataItem', this.BookingDataItem)
      this.swalConfig.title = 'ต้องการ ยืนยันข้อมูล ใช่หรือไม่?'
      this.$swal(this.swalConfig)
        .then(async () => {
          if (this.$session.id() !== undefined) {
            let dt = {
              userId: this.dataSelectUser.liffUserId
            }
            await axios
              .post(
                this.DNS_IP + '/job/update/' + this.jobitem[0].Id, dt
              ).then(async (response) => {
                console.log(response)
                if (response.data.status) {
                  let statusSend = {
                    statusSend: 'true'
                  }
                  await axios
                    .post(this.DNS_IP + '/job/updateJobNo/' + this.jobitem[0].jobNo, statusSend)
                    .then(async response => {
                    // let lineUserId = result.data[0].lineUserId
                      console.log('statusSend', 'true')
                      let updateStatusSend = {
                        updateStatusSend: 'false'
                      }
                      await axios
                        .post(
                          this.DNS_IP + '/job/pushMsg/' + response.data.jobId,
                          updateStatusSend
                        )
                        .catch(error => {
                          console.log('error function addData : ', error)
                        })
                    })
                  this.getDataCalendaBooking()
                  this.$swal('เรียบร้อย', 'ปรับปรุงเรียบร้อย', 'success')
                  this.dialogJob = false
                } else {
                  this.$swal('ผิดพลาด', 'เนื่องจากรายการนี้มีคนนำเข้าแล้ว', 'error')
                  this.dialogJob = false
                }
              })
          } else {
            this.$swal('ผิดพลาด', 'กรุณาลองอีกครั่ง', 'error')
            clearInterval(this.setTimerCalendar)
            this.setTimerCalendar = null
            this.$router.push('/Core/Login')
          }
        })
    },
    async pushMsgSelectUser () {
      let statusSend = {
        statusSend: 'false'
      }
      await axios.post(this.DNS_IP + '/job/updateJobNo/' + this.jobitem[0].jobNo, statusSend)
      console.log('statusSend', 'false')
      let updateStatusSend = {
        updateStatusSend: 'false'
      }
      await axios
        .post(
          this.DNS_IP + '/job/NotifyQrcode/' + this.jobitem[0].jobNo,
          updateStatusSend
        )
        .then(async response => {
          this.$swal('เรียบร้อย', 'ส่ง QR Code กลุ่มของท่านเรียบร้อย', 'success')
          this.dialogJob = false
          // this.clearData()
          // this.$router.push('/Master/FlowStep')
        })
        .catch(error => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async setBookingingAgain () {
      // await this.getBookingField()
      console.log(this.userId)
      console.log(this.bookNo)
      let booking = await axios.get(this.DNS_IP + '/booking_view/get?shopId=' + this.session.data.shopId + '&bookNo=' + this.bookNo + '&checkOnsite=is null')
      let bookingData = await axios.get(this.DNS_IP + '/BookingData/get?shopId=' + this.session.data.shopId + '&bookNo=' + booking.data[0].bookNo)
      // console.log('this.fieldNameItem', this.fieldNameItem)
      this.booking = booking.data
      this.bookingData = bookingData.data
      console.log('booking', booking)
      console.log('bookingData', bookingData)
      this.remark = booking.data[0].remark
      this.timeavailable = []
      let dtTime = this.dataFlowSelectAdd.filter(item => { return item.value === booking.data[0].flowId })
      if (dtTime.length > 0) {
        if (dtTime.map(item => item.allData.setTime) === null) {
          this.timeavailable = []
        } else {
          this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
        }
      }
      // let dtTime = this.branch.filter(item => { return item.value === booking.data[0].masBranchID })
      // console.log('test', dtTime)
      // this.timeavailable = JSON.parse(dtTime.map(item => item.allData.setTime))
      this.dialogBookingAgain = true
    },
    addBookingAgain () {
      this.loadingBookingAgain = true
      this.validate('BOOKAGAIN')
      setTimeout(() => this.addBookingAgainSubmit(), 500)
    },
    addBookingAgainSubmit () {
      if (this.validBookingAgain === true) {
        let rs = this.bookingData
        let Add = []
        for (let i = 0; i < rs.length; i++) {
          let d = rs[i]
          let update = {}
          d.fieldValue = d.fieldValue || ''
          if (d.fieldValue !== '') {
            update.masBranchID = this.booking[0].masBranchID
            update.bookingFieldId = d.bookingFieldId
            update.remark = this.remark
            update.flowId = this.booking[0].flowId
            update.fieldId = d.fieldId
            update.fieldValue = d.fieldValue
            update.shopId = d.shopId
            update.dueDate = this.date + ' ' + this.time.value
            update.timeText = this.time.text
            update.userId = this.userId
            update.pageName = 'BookingList'
            update.sourceLink = 'direct'
            update.fastTrack = this.booking[0].fastTrack || ''
            update.extraJob = this.booking[0].extraJob || ''
            update.depositStatus = this.booking[0].depositStatus || ''
            update.depositImge = this.booking[0].depositImge || ''
            update.empSelect = this.booking[0].empSelect
            update.adminLogin = this.session.data.userName
            Add.push(update)
          }
        }
        console.log('Add', Add)
        this.swalConfig.title = 'ต้องการนำรายการนี้ เข้าตารางใช่หรือไม่?'
        this.$swal(this.swalConfig).then(async result => {
          axios
            .post(this.DNS_IP + '/Booking/add', Add)
            .then(async response => {
              await this.confirmChkAdd(response.data)
              let booking = await axios.get(this.DNS_IP + '/booking_view/get?shopId=' + this.session.data.shopId + '&bookNo=' + response.data.bookNo + '&checkOnsite=is null')
              // let bookingData = await axios.get(this.DNS_IP + '/BookingData/get?shopId=' + this.session.data.shopId + '&bookNo=' + response.data.bookNo)
              // let cusName = this.getDataFromFieldName(bookingData.data, 'ชื่อ')
              if (booking.data[0].lineUserId) {
                this.pushMsgConfirm(response.data.bookNo)
              }
              this.date = ''
              this.time = ''
              this.booking = []
              this.bookingData = []
              if (this.statusSearch === 'no') {
                await this.getBookingList()
              } else {
                await this.searchAny()
              }
              // this.getTimesChange('update')
              if (this.getSelectText) {
                this.getSelect(this.getSelectText, this.getSelectCount)
              }
              this.loadingBookingAgain = false
              this.dialogBookingAgain = false
              this.dialogJob = false
            })
        }).catch(error => {
          this.loadingBookingAgain = false
          console.log('Booking add again : ', error)
        })
      } else {
        this.loadingBookingAgain = false
      }
    },
    async setDataChang (item) {
      // clear Limit
      console.log('setDataChang', item)
      this.limitCountBranch = []
      this.limitCountBranchOld = []
      this.masBranchIDLimit = ''
      this.flowIDLimit = ''
      this.countBookingLimit = 0
      this.selectCountBookingLimit = 1
      this.limitBookingCheck = 'False'
      this.limitBookingSelect = 'False'
      /// /////////////////////
      this.limitBookingCheck = item.limitBookingCheck || 'False'
      item.countHourLimit = item.countHourLimit || 0
      this.countBookingLimit = 0
      this.dueDateOld = this.momenDate_1(item.dueDate)
      this.dueDateTimeOld = this.momenTime(item.dueDate)
      this.masBranchIDLimit = item.masBranchID
      this.flowIDLimit = item.flowId
      this.checkSelectText = item.statusBt
      this.checkTimeFlow(item)
      this.dataChange = item
      this.remark = item.remark
      this.formChange.date = this.momenDate_1(item.dueDate)
      console.log('this.timeavailable', this.timeavailable)
      if (this.timeavailable.length > 0) {
        if (this.timeavailable.filter(el => { return el.text === item.timeText }).length > 0) {
          if (item.timeText) {
            this.formChange.time = { text: item.timeText, value: this.momenTime(item.dueDate) }
          } else {
            this.formChange.time = { text: this.momenTime(item.dueDate), value: this.momenTime(item.dueDate) }
          }
        } else {
          this.formChange.time = { text: this.momenTime(item.dueDate), value: this.momenTime(item.dueDate) }
        }
      }

      let limitCountBranchOld = 0
      if (this.DataFlowName.filter(el => { return el.value === parseInt(item.flowId) }).length > 0) {
        let setTimeOld = JSON.parse(this.DataFlowName.filter(el => { return el.value === parseInt(item.flowId) })[0].allData.setTime)
        console.log('setTimeOld', setTimeOld)
        if (setTimeOld) {
          // let setTimeOld = JSON.parse(this.branch.filter(el => { return el.value === parseInt(item.masBranchID) })[0].allData.setTime)
          let indexOld = setTimeOld.findIndex((element) => element.value === this.momenTime(item.dueDate))
          limitCountBranchOld = setTimeOld.slice(indexOld, indexOld + item.countHourLimit)
          this.limitCountBranchOld = limitCountBranchOld
        }
      }

      this.dialogChange = true
      console.log(this.formChange)
      this.setCountTime(item)
      this.SetallowedDatesChange(item.flowId)
    },
    async setCountTime (dt) {
      console.log('this.formChange.time', this.formChange.time)
      let limitCountBranch = 0
      if (this.DataFlowName.filter(el => { return el.value === parseInt(dt.flowId) }).length > 0) {
        // let setTime = JSON.parse(this.branch.filter(el => { return el.value === parseInt(this.masBranchIDLimit) })[0].allData.setTime)
        let setTime = JSON.parse(this.DataFlowName.filter(el => { return el.value === parseInt(dt.flowId) })[0].allData.setTime)
        let index = setTime.findIndex((element) => element.value === this.formChange.time.value)
        limitCountBranch = setTime.slice(index, index + this.selectCountBookingLimit)
        this.limitCountBranch = limitCountBranch
        await this.getDataLimitBooking(dt)
      }
    },
    async getDataLimitBooking (dt) {
      this.dataLimitBookingDate = []
      // let setTime = JSON.parse(this.branch.filter(el => { return el.value === parseInt(this.masBranchIDLimit) })[0].allData.setTime)
      let setTime = JSON.parse(this.DataFlowName.filter(el => { return el.value === parseInt(dt.flowId) })[0].allData.setTime)
      let limitBooking = 0
      if (setTime.length > 0) {
        if (setTime.filter(el => { return el.value === this.formChange.time.value }).length > 0) {
          limitBooking = setTime.filter(el => { return el.value === this.formChange.time.value })[0].limitBooking
        } else {
          limitBooking = 0
        }
      } else {
        limitBooking = 0
      }
      if (limitBooking !== 0) {
        await axios
          .get(
            this.DNS_IP + '/LimitBookingDate/get?shopId=' + this.session.data.shopId + '&bookingDate=' + this.formChange.date
          )
          .then(async response => {
            let rs = response.data
            if (rs.status === false) {
              this.dataLimitBookingDate = []
            } else {
              for (let i = 0; i < rs.length; i++) {
                let d = rs[i]
                let s = {}
                s.bookingTime = d.bookingTime
                s.countBookingLimit = d.countBooking + '/' + limitBooking
                s.countBooking = d.countBooking
                // if (d.countBooking === parseInt(limitBooking)) {
                //   s.color = 'orange darken-1'
                // } else
                if (d.countBooking > parseInt(limitBooking)) {
                  s.color = 'red darken-1'
                } else if (d.countBooking <= parseInt(limitBooking)) {
                  s.color = 'blue darken-1'
                }
                this.dataLimitBookingDate.push(s)
              }
              for (let i = 0; i < this.limitCountBranch.length; i++) {
                let s = {}
                let d = this.limitCountBranch[i]
                if (this.dataLimitBookingDate.filter(el => { return el.bookingTime === d.value }).length > 0) {
                  let index = this.dataLimitBookingDate.findIndex((element) => element.bookingTime === d.value)
                  this.dataLimitBookingDate[index].countBooking = this.dataLimitBookingDate[index].countBooking + 1
                  this.dataLimitBookingDate[index].countBookingLimit = this.dataLimitBookingDate[index].countBooking + '/' + limitBooking
                  // if (this.dataLimitBookingDate[index].countBooking === parseInt(limitBooking)) {
                  //   this.dataLimitBookingDate[index].color = 'orange darken-1'
                  // } else
                  if (this.dataLimitBookingDate[index].countBooking > parseInt(limitBooking)) {
                    this.dataLimitBookingDate[index].color = 'red darken-1'
                  } else if (this.dataLimitBookingDate[index].countBooking <= parseInt(limitBooking)) {
                    this.dataLimitBookingDate[index].color = 'blue darken-1'
                  }
                } else {
                  s.bookingTime = d.value
                  s.countBooking = 1
                  s.countBookingLimit = 1 + '/' + limitBooking
                  s.color = 'blue darken-1'
                  this.dataLimitBookingDate.push(s)
                }
              }
              this.dataLimitBookingDate = this.dataLimitBookingDate.sort((a, b) => {
                if (a.bookingTime < b.bookingTime) return -1
                return a.bookingTime > b.bookingTime ? 1 : 0
              })
              console.log(' this.dataLimitBookingDate', this.dataLimitBookingDate)
              console.log('limitBooking', limitBooking)
            }
          })
      }
    },
    async openInfo (item) {
      this.detailInfo = await this.getBookingData(item)
      this.dataInfo = item
      this.dialogInfo = true
    }
  }
}
</script>

<style scoped>
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 */
  padding-top: 25px;
  height: 0;
}

.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.border-active {
  border-style: solid;
  border-color: red;
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

.slidein {
  max-width: 40%;
  padding: 2em 1em;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background: #fff;
  height: 100%;
  overflow: scroll;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
}
button {
  padding: .5em 1em;
  border-radius: 3em;
  font-size: 1.1em;
}
/* before the element is shown, start off the screen to the right */

/* General styles unrelated to slide in */
body {
  font-family: 'Mulish', sans-serif;
}

.toggle {
  margin: 1em;
}
.InputData{
  margin: 0px !important;
  padding: 0px !important;
}
.v-card--link:focus::before {
  opacity: 0;
}
</style>
