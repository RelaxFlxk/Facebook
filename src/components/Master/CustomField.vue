<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn color="primary" depressed @click="dialogAdd = true, validate('ADD'), validate('ADDOPTION')">
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- ADD -->
          <v-dialog v-model="dialogAdd" persistent max-width="60%">
            <v-card>
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                    <v-icon color="#173053" @click="(dialogAdd = false), clearData()">mdi-close</v-icon>
                  </v-col>
                  <v-row justify="center">
                    <v-col cols="6" class="text-center">
                      <center>
                      <v-col>
                      <v-img :src="require('@/assets/editCustomfield.png')"></v-img>
                      </v-col>
                      </center>
                      <v-card-text v-if="formAdd.fieldName && formAdd.fieldType !== 'text'">
                      <v-data-table
                        :headers="columnsOption"
                        :items="dataItemOption"
                      >
                        <template v-slot:[`item.action`]="{ item }">
                          <v-btn
                            color="red"
                            dark
                            fab
                            x-small
                            @click="deleteOption(item)"
                          >
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </template>
                      </v-data-table>
                    </v-card-text>
                    </v-col>

                      <v-col cols="6" class="v-margit_text_add mt-1">
                    <v-col class="text-center">
                      <v-img class="v_text_add" :src="require('@/assets/Grouptitle.svg')"></v-img>
                      </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">title</v-subheader>
                      </v-row>
                      <v-row style="height: 50px">
                      <v-text-field
                        v-model="formAdd.fieldName"
                        placeholder="Title"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">type</v-subheader>
                      </v-row>

                      <v-row style="height: 50px">
                        <v-select
                        v-model="formAdd.fieldType"
                        :items="selectTypeField"
                        dense
                        :rules="[rules.required]"
                        ></v-select>
                      </v-row>

                      <v-row style="height: 35px" v-if="formAdd.fieldType !== 'text'">
                      <v-subheader id="subtext">optionField</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="formAdd.fieldType !== 'text'">
                        <v-select
                        v-model="formAdd.fieldType"
                        :items="selectOptionField"
                        small-chips
                        dense
                        :rules="[rules.required]"
                        ></v-select>
                      </v-row>
                    </v-col>

                    <v-form ref="form_addOption" v-model="validAddOption" lazy-validation>
                    <v-row>
                    <v-col cols="6">
                      <v-row style="height: 35px" v-if="formAdd.fieldName && formAdd.fieldType !== 'text'">
                      <v-subheader id="subtext" >Text:</v-subheader >
                      </v-row>
                      <v-row style="height: 50px" v-if="formAdd.fieldName && formAdd.fieldType !== 'text'">
                      <v-text-field
                        v-model="formAddOption.optionText"
                        placeholder="Text"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                     <v-col cols="6">
                      <v-row style="height: 35px" v-if="formAdd.fieldName && formAdd.fieldType !== 'text'">
                      <v-subheader id="subtext">Value:</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="formAdd.fieldName && formAdd.fieldType !== 'text'">
                      <v-text-field
                        v-model="formAddOption.optionValue"
                        placeholder="Value"
                        dense
                        required
                        :rules="[rules.required]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                    </v-row>
                     </v-form>
                    <br>

                    <v-row justify="center" v-if="formAdd.fieldName && formAdd.fieldType !== 'text'">
                      <v-btn
                        elevation="2"
                        x-large
                        dark
                        color="#173053"
                        :disabled="!validAddOption"
                        @click="addDataOption(formAddOption), clearDataOption()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        ADD
                      </v-btn>
                      </v-row>

                      <!-- checkbox -->
                     <v-container v-if="formAdd.fieldType"
                        class="px-0"
                        fluid
                      >
                        <v-checkbox
                          v-model="checkbox"
                          :label="`Checkbox Condition: ${checkbox.toString()}`"
                        ></v-checkbox>
                      </v-container>
                      <!-- checkbox -->

                      <v-row style="height: 35px" v-if="checkbox === true">
                      <v-subheader id="subtext">Field</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="checkbox === true">
                        <v-select
                        v-model="formAdd.conditionField"
                        :items="selectConditionField"
                        small-chips
                        dense
                        :rules="[rules.required]"
                        ></v-select>
                      </v-row>
                      <!-- END -->
                        <v-row style="height: 35px" v-if="checkbox === true">
                      <v-subheader id="subtext">Value:</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="checkbox === true">
                      <v-text-field
                        v-model="formAdd.conditionValue"
                        placeholder="Value"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                      <!-- END -->
                    </v-col>
                      <!-- END Radio buttun -->
                      <v-col id="margin">
                      <v-row justify="center">
                      <v-btn
                        elevation="2"
                        x-large
                        dark
                        color="#173053"
                        :disabled="!validAdd"
                        @click="addData()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        เพิ่ม
                      </v-btn>
                      </v-row>
                      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- edit -->
          <!-- <v-dialog v-model="dialogEdit" persistent max-width="70%">
            <v-card>
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                      <v-btn small color="#E0E0E0" @click="(dialogEdit = false), clearData()">
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                  </v-col>
                  <v-row justify="center">
                    <v-col class="text-center">
                    <v-col class="text-center">
                      <v-img class="v_text_add" :src="require('@/assets/GroupEditTitle.svg')"></v-img>
                      </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">title</v-subheader>
                      </v-row>
                      <v-row style="height: 50px">
                      <v-text-field
                        v-model="formUpdate.fieldName"
                        placeholder="Title"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">type</v-subheader>
                      </v-row>

                      <v-row style="height: 50px">
                        <v-select
                        v-model="formUpdate.fieldType"
                        :items="selectTypeField"
                        dense
                        :rules="[rules.required]"
                        ></v-select>
                      </v-row>

                      <v-row style="height: 35px">
                      <v-subheader id="subtext">optionField</v-subheader>
                      </v-row>
                      <v-row style="height: 50px">
                        <v-card-text>
                            <v-chip v-for="i in formUpdate.optionField" :key="i">{{ i.value }}</v-chip>
                        </v-card-text>
                      </v-row>
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">conditionField</v-subheader>
                      </v-row>
                      <v-row style="height: 50px">
                      <v-text-field
                        v-model="formUpdate.conditionField"
                        placeholder="Title"
                        dense
                        required
                      ></v-text-field>
                      </v-row>
                    </v-col>
                      <v-col id="margin">
                      <v-row justify="center">
                      <v-btn
                      dark
                        elevation="2"
                        x-large
                        color="#173053"
                        :disabled="!validUpdate"
                         @click="editData()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        เพิ่ม
                      </v-btn>
                      </v-row>
                      </v-col>
                      </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
            </v-card>
          </v-dialog> -->
          <v-dialog v-model="dialogEdit" persistent max-width="60%">
            <v-card>
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                    <v-icon color="#173053" @click="(dialogEdit = false), clearData()">mdi-close</v-icon>
                  </v-col>
                  <v-row justify="center">
                    <v-col cols="6" class="text-center">
                      <center>
                      <v-col>
                      <v-img :src="require('@/assets/editCustomfield.png')"></v-img>
                      </v-col>
                      </center>
                      <v-card-text v-if="formUpdate.fieldName && formUpdate.fieldType !== 'text'">
                      <v-data-table
                        :headers="columnsOption"
                        :items="dataItemOption"
                      >
                        <template v-slot:[`item.action`]="{ item }">
                          <v-btn
                            color="red"
                            dark
                            fab
                            x-small
                            @click="deleteOption(item)"
                          >
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </template>
                      </v-data-table>
                    </v-card-text>
                    </v-col>

                      <v-col cols="6" class="v-margit_text_add mt-1">
                    <v-col>
                      <v-img id="v_textEdit" :src="require('@/assets/GroupEditTitle.svg')"></v-img>
                      </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">title</v-subheader>
                      </v-row>
                      <v-row style="height: 50px">
                      <v-text-field
                        v-model="formUpdate.fieldName"
                        placeholder="Title"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">type</v-subheader>
                      </v-row>

                      <v-row style="height: 50px">
                        <v-select
                        v-model="formUpdate.fieldType"
                        :items="selectTypeField"
                        dense
                        :rules="[rules.required]"
                        ></v-select>
                      </v-row>

                      <v-row style="height: 35px" v-if="formUpdate.fieldType !== 'text'">
                      <v-subheader id="subtext">optionField</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="formUpdate.fieldType !== 'text'">
                        <v-select
                        v-model="formUpdate.fieldType"
                        :items="selectOptionField"
                        small-chips
                        dense
                        :rules="[rules.required]"
                        ></v-select>
                      </v-row>
                    </v-col>

                    <v-form ref="form_addOption" v-model="validAddOption" lazy-validation>
                    <v-row>
                    <v-col cols="6">
                      <v-row style="height: 35px" v-if="formUpdate.fieldName && formUpdate.fieldType !== 'text'">
                      <v-subheader id="subtext" >Text:</v-subheader >
                      </v-row>
                      <v-row style="height: 50px" v-if="formUpdate.fieldName && formUpdate.fieldType !== 'text'">
                      <v-text-field
                        v-model="formUpdateOption.optionText"
                        placeholder="Text"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                     <v-col cols="6">
                      <v-row style="height: 35px" v-if="formUpdate.fieldName && formUpdate.fieldType !== 'text'">
                      <v-subheader id="subtext">Value:</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="formUpdate.fieldName && formUpdate.fieldType !== 'text'">
                      <v-text-field
                        v-model="formUpdateOption.optionValue"
                        placeholder="Value"
                        dense
                        required
                        :rules="[rules.required]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                    </v-row>
                     </v-form>
                    <br>

                    <v-row justify="center" v-if="formUpdate.fieldName && formUpdate.fieldType !== 'text'">
                      <v-btn
                        elevation="2"
                        x-large
                        dark
                        color="#173053"
                        :disabled="!validAddOption"
                        @click="addDataOption(formUpdateOption), clearDataOption()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        ADD
                      </v-btn>
                      </v-row>

                      <!-- checkbox -->
                     <v-container v-if="formUpdate.fieldType"
                        class="px-0"
                        fluid
                      >
                        <v-checkbox
                          v-model="checkbox"
                          :label="`Checkbox Condition: ${checkbox.toString()}`"
                        ></v-checkbox>
                      </v-container>
                      <!-- checkbox -->

                      <v-row style="height: 35px" v-if="checkbox === true">
                      <v-subheader id="subtext">Field</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="checkbox === true">
                        <v-select
                        v-model="formUpdate.conditionField"
                        :items="selectConditionField"
                        small-chips
                        dense
                        :rules="[rules.required]"
                        ></v-select>
                      </v-row>
                      <!-- END -->
                        <v-row style="height: 35px" v-if="checkbox === true">
                      <v-subheader id="subtext">Value:</v-subheader>
                      </v-row>
                      <v-row style="height: 50px" v-if="checkbox === true">
                      <v-text-field
                        v-model="formUpdate.conditionValue"
                        placeholder="Value"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                      <!-- END -->
                    </v-col>
                      <!-- END Radio buttun -->
                      <v-col id="margin">
                      <v-row justify="center">
                      <v-btn
                         dark
                        elevation="2"
                        x-large
                        color="#173053"
                        :disabled="!validUpdate"
                         @click="editData()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        เพิ่ม
                      </v-btn>
                      </v-row>
                      </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- delete -->
          <v-dialog v-model="dialogDelete" max-width="450px">
            <v-card>
              <br>
              <center>
              <v-col class="text-center v-img-D">
                <v-img :src="require('@/assets/DeleteFlow.svg')"></v-img>
              </v-col>
              </center>
              <br>
              <v-col class="text-center">
                <span class="headline">ลบข้อมูลนี้</span>
              </v-col>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                        <v-subheader id="subtext">รหัส Filed</v-subheader>
                      </v-row>
                      <v-row style="height: 70px">
                        <v-text-field
                          v-model="formUpdate.fieldName"
                          readonly
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-col class="text-center">
                <v-spacer></v-spacer>
                <v-btn
                  dark
                  elevation="2"
                  x-large
                  color="#FD8087"
                  @click="deleteData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
                <v-btn
                  dark
                  elevation="2"
                  x-large
                  color="#1B437C"
                  @click="dialogDelete = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ยกเลิก
                </v-btn>
              </v-col>
            </v-card>
          </v-dialog>
          <!-- end delete -->

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
                <template v-slot:[`item.shett`]="{ item }">
                    <v-select
                        v-model="item.optionField"
                        :items="item.optionField"
                        dense
                        ></v-select>
                  </template>
                   <template v-slot:[`item.CREATE_DATE`]="{ item }">
                      {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                      {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop="(dialogEdit = true), getDataById(item), validate('UPDATE')"
                    >
                      <v-icon color="#FFFFFF"> mdi-tools </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      fab
                      x-small
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
import VuetifyMoney from '../VuetifyMoney.vue'
// import JsonExcel from 'vue-json-excel' // https://www.npmjs.com/package/vue-json-excel
// import XLSX from 'xlsx' // import xlsx
// import readXlsxFile from 'read-excel-file'
// import moment from 'moment' // แปลง date

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
    // downloadExcel: JsonExcel,
    // XLSX,
    // readXlsxFile
  },
  created () {
    // setInterval(this.getNowGlobal, 1000)
  },
  data () {
    return {
      PK: '',
      path: '/customField/', // Path Model
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'ข้อมูลลงทะเบียนลูกค้า',
          disabled: false,
          href: '/Master/CustomField'
        }
      ],
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 9,
        precision: 0
      },
      selectTypeField: [
        { text: 'Text', value: 'text' },
        { text: 'Number', value: 'number' },
        { text: 'Datetime', value: 'dateTime' },
        { text: 'optionField', value: 'optionField' }
      ],
      selectOptionField: [
        { text: 'Autocompletes', value: 'Autocompletes' },
        { text: 'Selects', value: 'Selects' },
        { text: 'Radio buttons', value: 'Radio' }
      ],
      headers: [
        { text: 'Text', value: 'optionText' },
        { text: 'Value', value: 'optionValue' }
      ],
      dialogDeleteF: false,
      editedItemSelete: [],
      // End Menu Config
      dataReady: true,
      canvas: true,
      dateTime: '', // Generate DateTime
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      // Dialog Config ADD EDIT DELETE IMPORT
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogImport: false,
      dialogAddField: false,
      // END Dialog Config ADD EDIT DELETE
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      column: null,
      radios: null,
      checkbox: false,
      checkbox1: false,
      // Search All
      searchAll: '',
      searchAll2: '',
      formAdd: {
        fieldName: '',
        fieldType: '',
        CREATE_USER: '',
        LAST_USER: '',
        optionField: '',
        optionText: '',
        optionValue: '',
        conditionField: '',
        conditionValue: '',
        shopId: this.$session.getAll().data.shopId
      },
      formUpdate: {
        fieldId: '',
        fieldName: '',
        fieldType: '',
        LAST_USER: '',
        optionField: '',
        optionText: '',
        optionValue: '',
        conditionField: '',
        conditionValue: '',
        shopId: ''
      },
      formAddOption: {
        optionText: '',
        optionValue: '',
        shopId: ''
      },
      formUpdateOption: {
        optionText: '',
        optionValue: '',
        shopId: ''
      },
      desserts: [],
      editedItemOption: [],
      rules: {
        numberRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: value => value.length <= 10 || 'Max 10 characters',
        IDcardRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        required: value => !!value || 'กรุณากรอก.',
        counterIDcard: value => value.length <= 13 || 'Max 13 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        { text: 'ID', value: 'fieldId' },
        { text: 'ชื่อ Field', value: 'fieldName' },
        { text: 'ประเภท Field', value: 'fieldType' },
        // { text: 'conditionValue', value: 'conditionValue', align: 'center' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      columnsOption: [
        { text: 'Text', value: 'text' },
        { text: 'Value', value: 'value' }
      ],
      dataItemOption: [],
      selectConditionField: [],
      validAdd: true,
      validAddOption: true,
      validUpdate: true,
      filesAdd: null,
      filesUpdate: null
      // End Data Table Config
    }
  },
  async mounted () {
    // this.getGetToken(this.DNS_IP)
    this.dataReady = false
    // Get Data
    this.getOption()
    this.getCondition()
    this.getDataGlobal(this.DNS_IP, this.path, this.$session.getAll().data.shopId)
  },
  methods: {
    validate (Action) {
      switch (Action) {
        case 'ADD':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_add.validate()
          })
          break
        case 'ADDOPTION':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_addOption.validate()
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
      console.log('dataItem', this.dataItem)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + this.path + "getID?fieldId" + "=" + item.fieldId + '&shopId=' + this.shopId
        )
        .then(async (response) => {
          if (response.data) {
            Object.assign(this.formUpdate, response.data)
            this.formUpdate.optionField = JSON.parse(this.formUpdate.optionField)
            this.formUpdate.fieldType = this.formUpdate.fieldType
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.dataReady = true
          console.log(error)
        })
    },
    async addDataOption (item) {
      console.log(item)
      this.dataItemOption.push({'text': item.optionText, 'value': item.optionValue})
      this.clearDataOption()
    },
    getOption () {
      this.dataItemOption = []
      axios.get(this.DNS_IP + '/customField/get?shopId=' + this.shopId)
        .then((response) => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.optionField
              d.value = d.optionField
              this.editedItemOption.push(d)
            }
          }
        })
    },
    getCondition () {
      this.dataItemCondition = []
      axios.get(this.DNS_IP + '/customField/get').then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.fieldName
            d.value = d.fieldName
            this.selectConditionField.push(d)
          }
        }
      })
    },
    async addData () {
      console.log('dataItemOption', JSON.stringify(this.dataItemOption))
      this.dataReady = false
      // this.formAdd.optionField = JSON.stringify(this.formAdd.optionField)
      console.log('optionField', this.formAdd.optionField)

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
          this.formAdd.CREATE_USER = this.session.data.userName
          this.formAdd.LAST_USER = this.session.data.userName
          if (this.formAdd.optionField === 'Autocompletes' || 'Selects') {
            this.formAdd.optionField = JSON.stringify(this.dataItemOption)
          }
          this.add(this.formAdd)
        })
        .catch((error) => {
          console.log('error function addData : ', error)
          this.dataReady = true
        })
    },
    async add () {
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + this.path + "add",
          this.formAdd,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async (response) => {
          console.log('addDataGlobal DNS_IP + PATH + "add"', response)
          this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
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
    },
    async editData () {
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
          this.formUpdate.LAST_USER = this.session.data.userName
          var ID = this.formUpdate.fieldId
          delete this.formUpdate['fieldId']
          delete this.formUpdate['LAST_DATE']
          delete this.formUpdate['CREATE_DATE']
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + this.path + "edit/" + ID,
              this.formUpdate
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)

              // this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              // Close Dialog
              this.dialogEdit = false

              // Load Data
              // await this.reloadData()
              await this.getDataGlobal(this.DNS_IP, this.path, this.session.data.shopId)
              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
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
    async deleteData (DNS_IP, PATH, ID) {
      this.dataReady = false
      this.$swal({
        title: 'ต้องการ ลบข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async (result) => {
          this.formUpdate.LAST_USER = this.session.data.userName
          var ID = this.formUpdate.fieldId
          delete this.formUpdate['fieldId']
          delete this.formUpdate['LAST_DATE']
          delete this.formUpdate['CREATE_DATE']
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + this.path + "delete/" + ID,
              this.formUpdate
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              this.dialogDelete = false
              await this.getDataGlobal(this.DNS_IP, this.path, this.session.data.shopId)
              this.$swal('เรียบร้อย', 'ลบข้อมูล เรียบร้อย', 'success')
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
    async clearData () {
      // eslint-disable-next-line no-redeclare
      for (var key in this.formAdd) {
        if (this.formAdd[key]) {
          this.formAdd[key] = ''
        }
      }
    },
    async clearDataOption () {
      for (var key in this.formAddOption) {
        if (this.formAddOption[key]) {
          this.formAddOption[key] = ''
        }
      }
    }
  }
}
</script>
<style scope>
#margin {
  margin-top: 150px;
  margin-bottom: 40px;
}
#v_textEdit {
  height: 43px;
  width: 198px;
}
.v_text_edit {
  Width: 255px;
  Height: 52px;
}
</style>
