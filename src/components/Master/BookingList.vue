<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn
              color="primary"
              style="z-index:8;"
              id="v-step-0"
              depressed
              @click="$router.push('./Qrcodereader')"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              Qr Code
            </v-btn>
            <v-btn
              color="primary"
              style="z-index:8;"
              id="v-step-0"
              depressed
              @click="(dialogAdd = true), validate('ADD'), getBookingField()"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่ม
            </v-btn>
            <v-btn
              color="teal"
              style="z-index:8;"
              id="v-step-0"
              dark
              depressed
              @click="(dialogExport = true), validate('EXPORT')"
            >
              <v-icon left>mdi-download</v-icon>
              Export Data
            </v-btn>
            <!-- </v-overlay> -->
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="8" class="text-left">
            <template  v-if="changeBackgroundColor">
            <v-row>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  color="warning"
                  dark
                  dense
                  icon="mdi-phone-ring"
                  prominent
                  @click="getSelect('wait',countWaiting)"
                >
                  <div>
                    <strong>ยังไมไ่ด้โทร</strong>
                  </div>
                  <div>จำนวน : {{countWaiting}}</div>
                </v-alert>
              </v-col>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  color="success"
                  dark
                  dense
                  icon="mdi-phone-check"
                  prominent
                  @click="getSelect('confirm',countConfirm)"
                >
                  <div>
                    <strong>โทรยืนยันแล้ว</strong>
                  </div>
                  <div>จำนวน : {{countConfirm}}</div>
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  color="error"
                  dark
                  dense
                  icon="mdi-phone-cancel"
                  prominent
                  @click="getSelect('cancel',countCancel)"
                >
                  <div>
                    <strong>ยกเลิก</strong>
                  </div>
                  <div>จำนวน : {{countCancel}}</div>
                </v-alert>
              </v-col>
              <v-col cols="6" class="text-center pb-0">
                <v-alert
                  color="info"
                  dark
                  dense
                  icon="mdi-car-cog"
                  prominent
                  @click="getSelect('confirmJob',countJob)"
                >
                   <div>
                    <strong>รับรถแล้ว</strong>
                  </div>
                  <div>จำนวน : {{countJob}}</div>
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
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
            </v-row>
            </template>
          </v-col>
          <v-col cols="4" class="pl-5 v-margit_button">
            <v-select
              v-model="masBranchID"
              :items="branch"
              label="สาขา"
              outlined
              dense
              required
              @change="getBookingList()"
            ></v-select>
            <v-btn
              elevation="4"
              block
              dark
              rounded
              :color="changeBackgroundColor ? 'red' : 'green'"
              @click="changeBackgroundColor = !changeBackgroundColor"
            >
              {{changeBackgroundColor ? 'ซ่อน' : 'แสดง'}}
            </v-btn>
          </v-col>
        </v-row>
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
          <v-dialog v-model="dialogAdd" persistent max-width="70%">
            <v-card class="text-center">
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
                <v-card-text>
                  <v-container>
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
                        cols="5"
                        class="text-center"
                        style="margin: auto 0;"
                      >
                        <v-col class="text-center">
                          <v-img
                            class="v-margit_img_reward"
                            :src="require('@/assets/AddBookingList.svg')"
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
                          <v-select
                            v-model="formAdd.flowId"
                            :items="DataFlowName"
                            label="ประเภทบริการ"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-select>
                          <v-select
                            v-model="formAdd.masBranchID"
                            :items="branch"
                            label="สาขา"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-select>
                          <v-row>
                            <v-col cols="6">
                              <v-menu
                                v-model="menuDate"
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
                                    v-bind="attrs"
                                    dense
                                    outlined
                                    v-on="on"
                                    required
                                    :rules="[rules.required]"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date"
                                  @input="menuDate = false"
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
                            <v-col cols="6">
                              <v-text-field
                                v-model="time"
                                label="เวลา"
                                dense
                                outlined
                                type="time"
                                suffix=""
                                required
                                :rules="[rules.required]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <div v-if="fieldNameItem">
                            <div
                              v-for="(item, index) in fieldNameItem"
                              :key="index"
                            >
                              <div
                                v-if="
                                  item.conditionField === '' ||
                                    item.conditionField === null
                                "
                              >
                                <div v-if="item.fieldType == 'text'">
                                  <v-text-field
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="[rules.required]"
                                  ></v-text-field>
                                </div>
                                <div v-if="item.fieldType == 'number'">
                                  <v-text-field
                                    v-model="item.fieldValue"
                                    :label="item.fieldName"
                                    outlined
                                    dense
                                    required
                                    :rules="[rules.required]"
                                  ></v-text-field>
                                </div>
                                <div v-if="item.fieldType == 'Autocompletes'">
                                  <v-autocomplete
                                    v-model="item.fieldValue"
                                    :items="JSON.parse(item.optionField)"
                                    outlined
                                    :label="item.fieldName"
                                    required
                                    dense
                                    :rules="[rules.required]"
                                  ></v-autocomplete>
                                </div>
                                <div v-if="item.fieldType == 'Selects'">
                                  <v-select
                                    v-model="item.fieldValue"
                                    :items="JSON.parse(item.optionField)"
                                    menu-props="auto"
                                    :label="item.fieldName"
                                    required
                                    :rules="[rules.required]"
                                    dense
                                    outlined
                                  ></v-select>
                                </div>
                                <div v-if="item.fieldType == 'Radio'" style="padding:0px;">
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
                                </div>
                              </div>
                              <div
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
                                <div
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
                                  <div v-if="item.fieldType == 'text'">
                                    <v-text-field
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="[rules.required]"
                                    ></v-text-field>
                                  </div>
                                  <div v-if="item.fieldType == 'number'">
                                    <v-text-field
                                      v-model="item.fieldValue"
                                      :label="item.fieldName"
                                      outlined
                                      required
                                      dense
                                      :rules="[rules.required]"
                                    ></v-text-field>
                                  </div>
                                  <div v-if="item.fieldType == 'Autocompletes'">
                                    <v-autocomplete
                                      v-model="item.fieldValue"
                                      :items="JSON.parse(item.optionField)"
                                      outlined
                                      :label="item.fieldName"
                                      required
                                      dense
                                      :rules="[rules.required]"
                                    ></v-autocomplete>
                                  </div>
                                  <div v-if="item.fieldType == 'Selects'">
                                    <v-select
                                      v-model="item.fieldValue"
                                      :items="JSON.parse(item.optionField)"
                                      menu-props="auto"
                                      :label="item.fieldName"
                                      required
                                      dense
                                      :rules="[rules.required]"
                                      outlined
                                    ></v-select>
                                  </div>
                                  <div v-if="item.fieldType == 'Radio'" style="padding:0px;">
                                    <v-container fluid style="padding:0px;">
                                      <v-radio-group
                                        row
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
                                            :value="radios.value"
                                            dense
                                          ></v-radio>
                                        </div>
                                      </v-radio-group>
                                    </v-container>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </v-col>
                      </v-col>
                    </v-row>
                    <div class="text-center">
                      <v-btn
                        elevation="2"
                        large
                        color="#173053"
                        :disabled="!validAdd"
                        dark
                        @click="addData()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        เพิ่ม
                      </v-btn>
                    </div>
                  </v-container>
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
          <v-dialog v-model="dialogEdit" persistent max-width="50%">
            <v-card class="text-center">
              <v-card-title>นำเข้ากระดานการทำงาน</v-card-title>
              <v-card-text>
                <v-container>
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
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="[rules.required]"
                            outlined
                          ></v-text-field>
                        </div>
                        <div v-if="p.fieldType == 'number'">
                          <br />
                          <!-- <p>{{p.fieldName}}</p> -->
                          <v-text-field
                            v-model="p.fieldValue"
                            :label="p.fieldName"
                            dense
                            :rules="[rules.required]"
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
                              :rules="[rules.required]"
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
                                :rules="[rules.required]"
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
                                :rules="[rules.required]"
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
                            :rules="[rules.required]"
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
                              :rules="[rules.required]"
                            ></v-select>
                          </div>
                          <div v-if="p.fieldType === 'Radio'" style="padding:0px;">
                            <br />
                            <v-container fluid style="padding:0px;">
                              <v-radio-group
                                row
                                v-model="p.fieldValue"
                                style="margin:0px;"
                                :rules="[rules.required]"
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
                    <v-col cols="6">
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
                            label="วันที่นัดส่งรถลูกค้า"
                            persistent-hint
                            dense
                            outlined
                            required
                            :rules="[rules.required]"
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="endDate"
                          no-title
                          @input="menu = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="6">
                      <v-text-field
                        v-model="endTime"
                        label="เวลา"
                        type="time"
                        suffix=""
                        required
                        :rules="[rules.required]"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  </v-form>
                  <div class="text-center">
                    <v-btn
                      elevation="2"
                      small
                      dark
                      :disabled='!validUpdate'
                      color="#173053"
                      @click="addDataJob()"
                    >
                      <v-icon left>mdi-checkbox-marked-circle</v-icon>
                      นำเข้าตารางงาน
                    </v-btn>
                    <v-btn small color="red" dark @click="dialogEdit = false;">
                      <v-icon color="#173053">mdi-close</v-icon>
                    </v-btn>
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- end -->

          <v-dialog v-model="dialogJob" persistent max-width="50%">
            <v-card
              style="background: linear-gradient(180deg, #FFFFFF 0%, #E1F3FF 100%);">
                <v-container >
                  <v-row >
                    <v-col cols="12">
                      <div class=" text-center">
                      <br/>
                        <br>
                        <h2 style="font-weight: 900; color:#FFA000">ติดตามสถานะ!</h2>
                        <qrcode-vue :value="value" :size="size" level="H" :foreground="foreground" />
                    </div>
                  </v-col>
                </v-row>
                </v-container>
                <v-row >
                  <v-col cols="12">
                      <v-container class="text-center" >
                        <v-container>
                            <div v-for="(p , index) in jobitem" :key="index">
                            <h4 v-if="p.showCard === 'True' ">{{p.name}} : {{p.value}}</h4>
                        </div>
                        </v-container>
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
                    </v-container>
                  </v-col>
                </v-row>
              </v-card>
          </v-dialog>

          <v-dialog v-model="dialogChange" persistent max-width="50%">
            <v-card class="text-center">
              <v-card-title>เปลี่ยนเวลานัดหมาย</v-card-title>
              <v-form ref="form_change" v-model="validChange" lazy-validation>
                <v-card-text>
                  <v-row>
                    <v-col cols="6">
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
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="formChange.date"
                          @input="menuDateChange = false"
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
                    <v-col cols="6">
                      <v-text-field
                        v-model="formChange.time"
                        label="เวลา"
                        type="time"
                        suffix="th-th"
                        required
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <div class="text-center">
                    <v-btn
                      elevation="10"
                      color="#173053"
                      dark
                      small
                      :disabled="!validChange"
                      @click="changeChk(dataChange)"
                      >เปลี่ยนเวลานัดหมาย</v-btn
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
                </v-card-text>
                <br />
              </v-form>
            </v-card>
          </v-dialog>
          <!-- data table -->
          <v-col cols="12" >
            <transition name="slide">
              <div class="slidein" v-if="drawer">
                <h4>แสดงตารางรายวัน</h4>
                <v-row>
                  <v-col cols="10">
                    <v-menu
                      ref="menu"
                      v-model="menu1"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="timeTable"
                          label="วันที่นัดส่งรถลูกค้า"
                          persistent-hint
                          dense
                          outlined
                          readonly
                          required
                          :rules="[rules.required]"
                          prepend-icon="mdi-calendar"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="timeTable"
                        no-title
                        @input="menu1 = false, getTimesChange('update')"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="2">
                    <!-- <v-btn
                      color="primary"
                      fab
                      small
                      @change="getTimesChange('all'), this.timeTable = ''"
                      dark
                    >
                      <v-icon>mdi-arrow-expand-all</v-icon>
                    </v-btn> -->
                  </v-col>
                </v-row>
                <button class="close-btn" @click="toggle(), getSelect()">X</button>
                <v-row v-for="(item, indexitem) in dataItemTime" :key="indexitem">
                  <v-col>
                    <strong>{{item.timeDueHtext}}</strong>
                  </v-col>
                  <v-col class="pt-1 pb-1" cols="auto" v-for="(items, indexitems) in dataItemTimesChange.filter(el => { return el.timeDueHtext === item.timeDueHtext })" :key="indexitems">
                    <v-card
                      elevation="10"
                    >
                      <v-container class="pt-0 pb-0">
                      <v-card-title>{{items.timeDuetext + ' : ' + items.statusBtText}}</v-card-title>
                      <v-card-text>
                        <v-text-field
                          label="ชื่อลูกค้า"
                          :value="items.cusName"
                          class="pt-0 pb-0"
                          outlined
                          dense
                          readonly
                        ></v-text-field>
                        <v-text-field
                          label="ทะเบียน"
                          :value="items.cusReg"
                          class="pt-0 pb-0"
                          outlined
                          dense
                          readonly
                        ></v-text-field>
                        <v-text-field
                          label="บริการ"
                          :value="items.flowName"
                          class="pt-0 pb-0"
                          outlined
                          dense
                          readonly
                        ></v-text-field>
                      </v-card-text>
                      </v-container>
                    </v-card>
                  </v-col>
                  <v-col col="12" class="pt-0 pb-0">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </div>
            </transition>
            <v-card elevation="7" v-if="dataReady">
              <div>
                <v-btn
                  v-if="dataItem.length > 0"
                  color="blue-grey"
                  class="ma-2 white--text"
                  @click="toggle"
                  small
                >
                  แสดงตารางรายวัน
                  <v-icon
                    right
                    dark
                  >
                    mdi-table-eye
                  </v-icon>
                </v-btn>
              </div>
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
                  v-if="dataItemSelect.length === 0 && dataItemTimesChange.length === 0"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.dueDate`]="{ item }">
                    {{ format_date(item.dueDate) }}
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
                      @click.stop="cancelChk(item)"
                    >
                      <v-icon dark> mdi-phone-cancel </v-icon>
                    </v-btn>
                    <v-btn
                      color="warning"
                      id="v-step-2"
                      v-if="item.statusBt !== 'confirmJob'"
                      small
                      @click.stop="setDataChang(item)"
                    >
                      เปลี่ยนเวลา
                    </v-btn>
                    <v-btn
                      color="primary"
                      fab
                      v-if="item.statusBt !== 'confirmJob'"
                      id="v-step-2"
                      small
                      @click.stop="(dialogEdit = true), getBookingData(item)"
                    >
                      <v-icon dark> mdi-account-plus </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      v-if="item.statusBt !== 'confirmJob'"
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
                  :headers="columns"
                  :items="dataItemSelect"
                  v-if="dataItemSelect.length > 0 && dataItemTimesChange.length === 0"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.dueDate`]="{ item }">
                    {{ format_date(item.dueDate) }}
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
                      @click.stop="cancelChk(item)"
                    >
                      <v-icon dark> mdi-phone-cancel </v-icon>
                    </v-btn>
                    <v-btn
                      color="warning"
                      id="v-step-2"
                      v-if="item.statusBt !== 'confirmJob'"
                      small
                      @click.stop="setDataChang(item)"
                    >
                      เปลี่ยนเวลา
                    </v-btn>
                    <v-btn
                      color="primary"
                      fab
                      v-if="item.statusBt !== 'confirmJob'"
                      id="v-step-2"
                      small
                      @click.stop="(dialogEdit = true), getBookingData(item)"
                    >
                      <v-icon dark> mdi-account-plus </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      v-if="item.statusBt !== 'confirmJob'"
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
                  :headers="columns"
                  :items="dataItemTimesChange"
                  v-if="dataItemTimesChange.length > 0"
                  :search="searchAll2"
                  :items-per-page="10"
                >
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.dueDate`]="{ item }">
                    {{ format_date(item.dueDate) }}
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
                      @click.stop="cancelChk(item)"
                    >
                      <v-icon dark> mdi-phone-cancel </v-icon>
                    </v-btn>
                    <v-btn
                      color="warning"
                      id="v-step-2"
                      v-if="item.statusBt !== 'confirmJob'"
                      small
                      @click.stop="setDataChang(item)"
                    >
                      เปลี่ยนเวลา
                    </v-btn>
                    <v-btn
                      color="primary"
                      fab
                      v-if="item.statusBt !== 'confirmJob'"
                      id="v-step-2"
                      small
                      @click.stop="(dialogEdit = true), getBookingData(item)"
                    >
                      <v-icon dark> mdi-account-plus </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      v-if="item.statusBt !== 'confirmJob'"
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
<style scoped>
.theme--light.v-divider {
    border-color: rgba(243, 5, 25, 0.904) !important;
}
.slidein {
  max-width: "100%";
  padding: 2em 3em;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  background: #ddd;
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
.slide-enter, .slide-leave-active {
  right: -100%;
}

.close-btn {
  border: none;
  font-weight: bold;
  font-size: 2em;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.5em;
}

/* General styles unrelated to slide in */
body {
  font-family: 'Mulish', sans-serif;
}

.toggle {
  margin: 1em;
}
</style>
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
    PivotTable
  },
  data () {
    let startDate = null
    let endDate = null
    return {
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
      masBranchID: '',
      masBranchIDExport: '',
      bookNo: '',
      BookingDataItem: [],
      Layout: [],
      dataItemTime: [],
      dataItemTimesChange: [],
      appendBody: true,
      dialogExport: false,
      dataReady: false,
      menuDate: false,
      menuDateChange: false,
      date: '',
      time: '',
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
          href: '/Master/BookingList'
        }
      ],
      branch: [],
      DataFlowName: [],
      // Data Table Config
      searchAll2: '',
      columns: [
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' },
        { text: 'Booking Id', value: 'bookNo' },
        { text: 'ชื่อลูกค้า', value: 'cusName' },
        { text: 'ทะเบียนรถ', value: 'cusReg' },
        { text: 'ชื่อบริการ', value: 'flowName' },
        { text: 'วันและเวลานัดหมาย', value: 'dueDate' },
        { text: 'สถานะนัดหมาย', value: 'statusBtText' }
        // { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
      ],
      dataItem: [],
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
        shopId: this.$session.getAll().data.shopId
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
      validChange: true,
      validExport: true,
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogChange: false,
      dialogJob: false,
      menu: false,
      menu1: false,
      endDate: '',
      endTime: '',
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
      }
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login?bookNo=' + this.$route.query.bookNo + '&shopId=' + this.$route.query.shopId)
    }
  },
  async mounted () {
    // this.dataReady = false
    await this.getDataBranch()
    this.getCustomFieldStart()
    this.getDataFlow()
    this.getBookingList()
    this.scanQrcode()
  },
  methods: {
    toggle () {
      this.timeTable = new Date().toISOString().substr(0, 10)
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
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
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
            console.log('this.editedItemSeleteField', this.editedItemSeleteField)
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

        default:
          break
      }
    },
    async scanQrcode () {
      this.bookNo = this.$route.query.bookNo
      if (this.bookNo === undefined) {
        // console.log('11111111111111', this.bookNo)
      } else {
        let dt = {
          bookNo: this.bookNo
        }
        axios.get(this.DNS_IP + '/Booking/get?bookNo=' + dt.bookNo).then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.masBranchID = rs[0].masBranchID
            console.log('this.mas', this.masBranchID)
            this.dataItem = []
            this.getBookingList()
          }
        })
        // masBranchID
        this.getBookingData(dt)
        this.dialogEdit = true
      }
    },
    async getDataFlow () {
      this.DataFlowName = []
      // console.log('DataFlowName', this.DataFlowName)
      axios
        .get(this.DNS_IP + '/flow/get?shopId=' + this.session.data.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.flowName
              s.value = d.flowId
              this.DataFlowName.push(s)
              // console.log('this.DataFlowName', this.DataFlowName)
            }
          } else {
            this.DataFlowName = []
          }
        })
    },
    async getDataBranch () {
      this.branch = []
      // console.log('branch', this.branch)
      await axios
        .get(
          this.DNS_IP + '/master_branch/get?shopId=' + this.session.data.shopId
        )
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.masBranchName
              s.value = d.masBranchID
              this.branch.push(s)
              // console.log('dtdtdtdt', this.branch)
            }
          } else {
            this.branch = []
          }
        })
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
            '&dateRange=' + new Date(this.dateRange.startDate).toISOString().substr(0, 10) + '/' + new Date(this.dateRange.endDate).toISOString().substr(0, 10)
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
              s.statusBtText = 'ยังไมไ่ด้โทร'
            }
            let dataBookingData = []
            await axios
              .get(
                // eslint-disable-next-line quotes
                this.DNS_IP + "/BookingData/get?bookNo=" + d.bookNo
              )
              .then(async responses => {
                // console.log('getData', responses.data)
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
            })[0].fieldValue
            s.cusReg = dataBookingData.filter(function (el) {
              return el.fieldName === 'เลขทะเบียน'
            })[0].fieldValue
            exportdatas.push(s)
          }
          this.export_data = exportdatas
          console.log('exportdatas', exportdatas)
          // if (exportdatas.length === 0 || exportdatas.status === false) {
          //   this.export_data = []
          //   // this.$swal('ผิดพลาด', 'ไม่มีข้อมูล', 'error')
          // } else {
          //   // this.dataReady = true
          //   this.export_data = exportdatas
          // }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log(error)
          this.dataReady = true
          //   this.$router.push('/system/Errorpage?returnLink=' + returnLink)
        })
    },
    getSelect (text, count) {
      this.dataItemSelect = []
      this.dataItemTimesChange = []
      if (text === 'confirm') {
        if (count > 0) {
          this.dataItemSelect = this.dataItem.filter(el => { return el.statusBt === text })
        }
      } else if (text === 'cancel') {
        if (count > 0) {
          this.dataItemSelect = this.dataItem.filter(el => { return el.statusBt === text })
        }
      } else if (text === 'confirmJob') {
        if (count > 0) {
          this.dataItemSelect = this.dataItem.filter(el => { return el.statusBt === text })
        }
      } else if (text === 'wait') {
        if (count > 0) {
          this.dataItemSelect = this.dataItem.filter(el => { return el.statusBt === text })
        }
      }
    },
    getTimesChange (text) {
      this.dataItemTimesChange = []
      if (text === 'all') {
        this.dataItemTimesChange = this.dataItem
      } else {
        this.dataItemTimesChange = this.dataItem.filter(el => { return new Date(el.dueDate).toISOString().substr(0, 10) === this.timeTable })
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
      this.dataItem = []
      this.countWaiting = 0
      this.countConfirm = 0
      this.countCancel = 0
      this.countJob = 0
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
            this.masBranchID
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
                s.statusBtText = 'ยังไมไ่ด้โทร'
                this.countWaiting = this.countWaiting + 1
              }
              var chkTime = this.dataItemTime.filter(el => { return el.timeDueHtext === s.timeDueHtext })
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
              let chkTimes = this.dataItemTime.filter(el => { return el.timeDueHtext === t.timeDueHtext })
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
    async getBookingField () {
      this.bookingField = []
      let itemIncustomField = []
      axios
        .get(
          this.DNS_IP + '/BookingField/get?shopId=' + this.session.data.shopId
        )
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.formAdd.bookingId = rs[0].bookingId
            let bookingData = []
            bookingData = JSON.parse(rs[0].flowfieldName)
            for (let i = 0; i < bookingData.length; i++) {
              let d = bookingData[i]
              itemIncustomField.push(d.fieldId)
            }
            this.getCustomField(itemIncustomField)
          } else {
          }
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async getCustomField (item) {
      await axios
        .get(this.DNS_IP + '/customField/fieldId?fieldId=' + item)
        .then(async response => {
          let rs = response.data
          // let aa = []
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            let s = {}
            s.fieldId = d.fieldId
            s.fieldName = d.fieldName
            s.fieldType = d.fieldType
            s.optionField = d.optionField
            s.conditionField = d.conditionField
            s.conditionValue = d.conditionValue
            s.shopId = d.shopId
            s.fieldValue = ''
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
          setTimeout(() => this.validate('ADD'), 500)
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async getflowfield (item) {
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
          // console.log('tt', tt)
          let flowId = tt[0].flowId
          let flowfieldName = []
          flowfieldName = JSON.parse(tt[0].flowfieldName)
          for (let a = 0; a < flowfieldName.length; a++) {
            let d = flowfieldName[a]
            itemIncustomField.push(d.fieldId)
          }
          this.getCustomfieldFlow(itemIncustomField, flowId)
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
          for (var i = 0; i < rs.length; i++) {
            let d = rs[i]
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
            s.shopId = this.shopId
            s.endDate = ''
            s.endTime = ''
            s.checkCar = 'False'
            s.conditionValue = d.conditionValue
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
          console.log('flowfieldNameitems', this.flowfieldNameitem)
          console.log('flowfieldNameitems', flowfieldNameitems)
          console.log('BookingDataItem', this.BookingDataItem)
          // setTimeout(() => this.validate('ADD'), 500)
        })
        .catch(error => {
          console.log('error function addData : ', error)
        })
    },
    async addData () {
      let rs = this.fieldNameItem
      let Add = []
      let fielditem = this.fieldNameItem
      for (let i = 0; i < rs.length; i++) {
        let d = rs[i]
        let update = {}
        if (d.conditionField === '' || d.conditionField === null) {
          update.masBranchID = this.formAdd.masBranchID
          update.bookingFieldId = this.formAdd.bookingFieldId
          update.flowId = this.formAdd.flowId
          update.fieldId = d.fieldId
          update.fieldValue = d.fieldValue
          update.shopId = d.shopId
          update.dueDate = this.date + ' ' + this.time
          update.userId = 'user-skip'
          update.pageName = 'BookingList'
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
              update.masBranchID = this.formAdd.masBranchID
              update.bookingFieldId = this.formAdd.bookingFieldId
              update.flowId = this.formAdd.flowId
              update.fieldId = d.fieldId
              update.fieldValue = d.fieldValue
              update.shopId = d.shopId
              update.dueDate = this.date + ' ' + this.time
              update.userId = 'user-skip'
              update.pageName = 'BookingList'
              Add.push(update)
            }
          }
        }
      }
      this.$swal({
        title: 'ต้องการ บันทึกข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          axios
            .post(this.DNS_IP + '/Booking/add', Add)
            .then(response => {
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              this.clearDataAdd()
              console.log('addDataGlobal DNS_IP + /job/add', response)
            })
            .catch(error => {
              console.log('error function addData : ', error)
            })
        })
        .catch(error => {
          console.log('Cencel : ', error)
        })
    },
    async pushMsglineGroup (bookNo) {
      await axios
        .post(this.DNS_IP + '/Booking/pushMsgLineGroup/' + bookNo)
        .then(response => {
          this.clearData()
        })
    },
    clearDataAdd () {
      this.date = ''
      this.time = ''
      this.fieldNameItem = []
      this.DataflowId = ''
      this.formAdd.bookingId = null
      this.formAdd.fieldId = ''
      this.formAdd.fieldValue = ''
      this.formAdd.flowId = null
      this.formAdd.masBranchID = null
      this.formAdd.dueDate = ''
      this.formAdd.shopId = this.$session.getAll().data.shopId
      this.dialogAdd = false
      this.getBookingList()
    },
    async getDataById (dt) {
      console.log(this.DNS_IP + '/Booking/getID?bookNo=' + dt.bookNo)
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
      this.$swal({
        title: 'ต้องการ ลบข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#fa0202',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
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
              this.dialogDelete = false

              // Load Data
              if (status !== '') {
                await this.getBookingList()
              }
              if (status === '') {
                await this.getBookingList()
              }
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
    },
    addDataJob () {
      this.validate('UPDATE')
      setTimeout(() => this.addDataJobSubmit(), 500)
    },
    addDataJobSubmit () {
      if (this.dataItem.filter(row => row.bookNo === this.BookingDataItem[0].bookNo).length > 0) {
        if (this.validUpdate !== false) {
          for (var x = 0; x < this.flowfieldNameitem.length; x++) {
            var s = this.flowfieldNameitem[x]
            if (s.userId === 'user-skip') {
              s.userId = ''
            }
            s.shopId = this.session.data.shopId
            s.userName = this.$session.getAll().data.userName
            this.BookingDataItem.push(s)
          }
          console.log('this.BookingDataItem', this.BookingDataItem)
          let Add = []
          let fielditem = this.flowfieldNameitem
          for (var i = 0; i < this.BookingDataItem.length; i++) {
            var d = this.BookingDataItem[i]
            let update = {}
            var dataField = this.editedItemSeleteField.filter(el => { return parseInt(el.fieldId) === parseInt(d.fieldId) })
            if (dataField[0].conditionField === '' || dataField[0].conditionField === null) {
              update.masBranchID = this.BookingDataItem[0].masBranchID
              update.CREATE_USER = d.userName
              update.LAST_USER = d.userName
              update.checkCar = ''
              update.endDate = this.endDate
              update.endTime = this.endTime
              update.fieldId = d.fieldId
              update.fieldName = d.fieldName
              update.fieldType = dataField[0].fieldType
              update.fieldValue = d.fieldValue
              update.flowId = d.flowId
              update.conditionField = dataField[0].conditionField
              update.conditionValue = dataField[0].conditionValue
              update.optionField = dataField[0].optionField
              update.shopId = dataField[0].shopId
              update.showCard = dataField[0].showCard
              Add.push(update)
            } else {
              if (
                fielditem.filter(row => {
                  return row.fieldId === parseInt(d.conditionField)
                }).length > 0
              ) {
                console.log('this', fielditem)
                if (
                  d.conditionValue ===
              fielditem.filter(row => {
                return row.fieldId === parseInt(d.conditionField)
              })[0].fieldValue
                ) {
                  update.masBranchID = this.BookingDataItem[0].masBranchID
                  update.CREATE_USER = d.userName
                  update.LAST_USER = d.userName
                  update.checkCar = ''
                  update.endDate = this.endDate
                  update.endTime = this.endTime
                  update.fieldId = d.fieldId
                  update.fieldName = d.fieldName
                  update.fieldType = dataField[0].fieldType
                  update.fieldValue = d.fieldValue
                  update.flowId = d.flowId
                  update.conditionField = dataField[0].conditionField
                  update.conditionValue = dataField[0].conditionValue
                  update.optionField = dataField[0].optionField
                  update.shopId = dataField[0].shopId
                  update.showCard = dataField[0].showCard
                  Add.push(update)
                }
              }
            }
          }
          console.log('this.Add', Add)
          this.$swal({
            title: 'ต้องการนำรายการนี้ เข้าตารางใช่หรือไม่?',
            type: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#b3b1ab',
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
          }).then(async result => {
            await axios
              .post(this.DNS_IP + '/job/add', Add)
              .then(async response => {
                this.endDate = ''
                this.endTime = ''
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
                        contactDate: this.format_dateFUllTime(new Date()),
                        status: 'confirmJob',
                        statusUse: 'use',
                        shopId: this.$session.getAll().data.shopId,
                        CREATE_USER: this.session.data.userName,
                        LAST_USER: this.session.data.userName
                      }
                      axios
                        .post(this.DNS_IP + '/booking_transaction/add', dtt)
                        .then(async response => {
                          this.$swal('เรียบร้อย', 'นำเข้าสำเร็จ', 'success')
                          this.dialogEdit = false
                          this.getBookingList()
                        })
                    })
                }
              })
          })
        }
      } else {
        this.$swal('ผิดพลาด', 'ไม่มีนัดหมายเข้ารับบริการนี้', 'error').then(async response => {
          this.dialogEdit = false
          this.getBookingList()
        }).catch(error => {
          console.log('error function addData : ', error)
          this.dialogEdit = false
          this.getBookingList()
        })
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
      } else {
        let statusSend = {
          statusSend: 'true'
        }
        await axios
          .post(this.DNS_IP + '/job/updateJobNo/' + jobNo, statusSend)
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
      }
      // this.clearData()
    },
    confirmChk (item) {
      console.log('item', item)
      this.$swal({
        title: 'ต้องการ ยืนยัน ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        var dt = {
          bookNo: item.bookNo,
          contactDate: this.format_dateFUllTime(new Date()),
          status: 'confirm',
          statusUse: 'use',
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
        }
        axios
          .post(this.DNS_IP + '/booking_transaction/add', dt)
          .then(response => {
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            this.getBookingList()
            console.log('addDataGlobal', response)
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
      })
    },
    cancelChk (item) {
      // console.log('item', item)
      this.$swal({
        title: 'ต้องการ ยกเลิก ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        var dt = {
          bookNo: item.bookNo,
          contactDate: this.format_dateFUllTime(new Date()),
          status: 'cancel',
          statusUse: 'use',
          shopId: this.$session.getAll().data.shopId,
          CREATE_USER: this.session.data.userName,
          LAST_USER: this.session.data.userName
        }
        axios
          .post(this.DNS_IP + '/booking_transaction/add', dt)
          .then(response => {
            this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            console.log('addDataGlobal', response)
            this.getBookingList()
          })
          .catch(error => {
            console.log('error function addData : ', error)
          })
      })
    },
    async changeChk (item) {
      console.log('item', item)
      console.log('formChange', this.formChange)
      this.$swal({
        title: 'ต้องการ เปลี่ยนเวลานัดหมาย ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        var dtChange = {
          dueDate: this.formChange.date + ' ' + this.formChange.time
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
              contactDate: this.format_dateFUllTime(new Date()),
              status: 'change',
              statusUse: 'use',
              shopId: this.$session.getAll().data.shopId,
              CREATE_USER: this.session.data.userName,
              LAST_USER: this.session.data.userName,
              changDate: this.formChange.date + ' ' + this.formChange.time
            }
            await axios
              .post(this.DNS_IP + '/booking_transaction/add', dt)
              .then(response => {
                this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
                this.dialogChange = false
                console.log('addDataGlobal', response)
                this.getBookingList()
              })
              .catch(error => {
                console.log('error function addData : ', error)
              })
          })
      })
    },
    getjob (item) {
      this.jobitem = []
      if (item.jobNo !== '') {
        axios.get(this.DNS_IP + '/job/getJobNo?jobNo=' + item.jobNo).then((response) => {
          let rs = response.data
          let Id = ''
          console.log('getJobNo', rs)
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {
                Id: d.jobId,
                value: d.fieldValue,
                name: d.fieldName,
                showCard: d.showCard
              }
              Id = d.userId || ''
              this.jobitem.push(s)
            }
            this.userId = Id
            this.value = this.pathToweb + this.jobitem[0].Id + '&shopId=' + this.$session.getAll().data.shopId
            // this.getUserId()
          }
        })
      }
    },
    async jobConfirm () {
      this.$swal({
        title: 'ต้องการ ยืนยันข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async () => {
          await axios
            .post(
              this.DNS_IP + '/job/update/' + this.jobitem[0].Id, this.skip
            ).then(async (response) => {
              console.log(response)
              this.$swal('เรียบร้อย', 'ปรับปรุงเรียบร้อย', 'success')
              this.dialogJob = false
            })
        })
    },
    setDataChang (item) {
      this.dataChange = item
      this.formChange.date = this.momenDate_1(item.dueDate)
      this.formChange.time = this.momenTime(item.dueDate)
      this.dialogChange = true
      console.log(this.formChange)
    }
  }
}
</script>
