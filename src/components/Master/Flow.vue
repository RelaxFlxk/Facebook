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
            <v-btn color="primary" depressed @click="dialogAdd = true, validate('ADD')">
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
         <!-- step -->
          <v-dialog v-model="dialogStep" persistent max-width="50%">
            <v-card>
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                      <v-btn small color="#E0E0E0" @click="(dialogStep = false), clearData()">
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                  </v-col>
                  <v-row justify="center">
                    <v-col cols="5">
                     <v-card-text size="35px"><strong>ชื่อ FLOW : {{ formUpdate.flowName }}</strong></v-card-text>
                    </v-col>
                    <v-col cols="12" class="v-margit_button text-center">
                      <v-btn color="primary" depressed @click="dialogAddStepTitle = true">
                        <v-icon left>mdi-text-box-plus</v-icon>
                        Add StepTitle
                      </v-btn>
                    </v-col>
                     <!-- ADD steptitle-->
                    <v-dialog v-model="dialogAddStepTitle" persistent max-width="50%">
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-col class="text-right">
                                <v-btn small color="#E0E0E0" @click="(dialogAddStepTitle = false)">
                                  <v-icon color="#173053">mdi-close</v-icon>
                                </v-btn>
                            </v-col>
                            <v-row justify="center">

                                <v-col cols="6" class="v-margit_text_add mt-1">
                              <v-col class="text-center">
                                <v-img class="v_text_add" :src="require('@/assets/Grouptitle.svg')"></v-img>
                                </v-col>
                              <v-col cols="12">
                                <v-row style="height: 35px">
                                <v-subheader id="subtext">title</v-subheader>
                                </v-row>
                                <v-row style="height: 70px">
                                <v-text-field
                                  v-model="formAddStep.stepTitle"
                                  placeholder="Title"
                                  dense
                                  required
                                ></v-text-field>
                                </v-row>
                              </v-col>
                                <v-col id="margin">
                                <v-row justify="center">
                                <v-btn
                                  elevation="2"
                                  x-large
                                  color="#173053"
                                  @click="addDataStep()"
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
                      </v-card>
                    </v-dialog>
                    <!-- end ADD step -->

                    <!--edit step -->
                      <v-dialog v-model="dialogEditStep" persistent max-width="60%">
                        <v-card>
                          <v-form ref="form_update" v-model="validUpdate" lazy-validation>
                          <v-card-text>
                            <v-container>
                              <v-col class="text-right">
                                  <v-btn small color="#E0E0E0" @click="(dialogEditStep = false)">
                                    <v-icon color="#173053">mdi-close</v-icon>
                                  </v-btn>
                              </v-col>
                              <v-row justify="center">
                                  <v-col cols="6" class="v-margit_text_add mt-1">
                                <v-col class="text-center">
                                  <v-img class="v_text_edit" :src="require('@/assets/GroupEditTitle.svg')"></v-img>
                                  </v-col>
                                <v-col cols="12">
                                  <v-row style="height: 35px">
                                  <v-subheader id="subtext">StepTitle</v-subheader>
                                  </v-row>
                                  <v-row style="height: 70px">
                                  <v-text-field
                                    v-model="formUpdateStep.stepTitle"
                                    dense
                                    required
                                  ></v-text-field>
                                  </v-row>
                                </v-col>
                                  <v-col id="margin">
                                  <v-row justify="center">
                                  <v-btn
                                    elevation="2"
                                    x-large
                                    color="#173053"
                                    @click="editDataStepTitle()"
                                  >
                                    <v-icon left>mdi-checkbox-marked-circle</v-icon>
                                    แก้ไข
                                  </v-btn>
                                  </v-row>
                                  </v-col>
                                  </v-col>

                              </v-row>
                            </v-container>
                          </v-card-text>
                          </v-form>
                        </v-card>
                      </v-dialog>
                      <!-- end EDIT step -->

                    <!-- datatable step -->
                    <v-col cols="12">
                       <v-row justify="center">
                         <v-data-table
                         class="table-striped table-bordered elevation-1"
                            dense
                            :headers="columnsStep"
                            :items="stepItemSelete"
                            hide-default-footer
                          >
                            <template  v-slot:[`item.actions2`]="{ item, index }">
                    <v-btn v-show="index !== 0"
                      color="green"
                      fab
                      x-small
                      @click="actionUp(item.stepId)"
                    >
                      <v-icon dark> mdi-arrow-up-bold </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      fab
                      x-small
                      @click="actionDown(item.stepId)"
                    >
                      <v-icon dark> mdi-arrow-down-bold </v-icon>
                    </v-btn>
                  </template>
                   <template v-slot:[`item.sendCard`]="{ item }">
                    <v-simple-checkbox
                      v-model="item.sendCard"
                    ></v-simple-checkbox>
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop="(dialogEditStep = true), getStepTitle(item), validate('UPDATE')"
                    >
                      <v-icon dark> mdi-tools </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      fab
                      x-small
                      @click.stop="(dialogDeleteStepTitle = true), getDataById(item)"
                    >
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </template>
                          </v-data-table>
                          <!-- delete step -->
                          <v-dialog v-model="dialogDeleteStepTitle" max-width="500px">
                              <v-card>
                                <v-card-title>คุณต้องการลบใช่หรือไม่</v-card-title>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red" @click="dialogDeleteStepTitle = false">Cancel</v-btn>
                                  <v-btn color="#173053" @click="deleteStepTitle()">OK</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                            <!-- END delete step -->

                            <v-col cols="12" class="v-margit_button text-center">
                      <v-btn color="primary" depressed @click="editDataStepTitle()">
                        <v-icon left>mdi-text-box-plus</v-icon>
                        save
                      </v-btn>
                    </v-col>

                       </v-row>
                    </v-col>
                  </v-row>
                  <br>
                  <p></p>
                </v-container>
              </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end  -->

          <!-- add  -->
          <v-dialog v-model="dialogAdd" persistent max-width="60%">
            <v-card>
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                      <v-btn small color="#E0E0E0" @click="(dialogAdd = false), clearData()">
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                  </v-col>
                  <v-row justify="center">
                    <v-col cols="5" class="text-center">
                        <v-col class="text-center">
                      <v-img  class="v-margit_img_reward" :src="require('@/assets/GroupLevel.svg')" max-width="330"></v-img>
                      </v-col>
                    </v-col>

                      <v-col cols="6" class="v-margit_text_add mt-1">
                    <v-col class="text-center">
                      <v-img class="v_text_add" :src="require('@/assets/Grouptitle.svg')"></v-img>
                      </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">title</v-subheader>
                      </v-row>
                      <v-row style="height: 70px">
                      <v-text-field
                        v-model="formAdd.flowName"
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
                      <v-row style="height: 50px" justify="center">
                      <v-btn
                        color="primary"
                        dark
                        x-small
                        @click="dialogAddField =true,editedItem.fieldName = '', editedItem.fieldId = ''"
                        class="mb-2"
                      >
                        Register Field
                      </v-btn>
                      </v-row>
                       <v-row justify="center">
                         <v-data-table
                            dense
                            :headers="headers"
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1"
                          >
                            <template  v-slot:[`item.actions`]="{ item }">
                              <v-icon
                                small
                                color="red"
                                @click="deleteItem(item)"
                              >
                                mdi-delete
                              </v-icon>
                            </template>
                            <template v-slot:[`item.showCard`]="{ item }">
                            <v-simple-checkbox
                              v-model="item.showCard"
                            ></v-simple-checkbox>
                          </template>
                          </v-data-table>
                          <v-dialog v-model="dialogDeleteF" max-width="500px">
                              <v-card>
                                <v-card-title>คุณต้องการลบใช่หรือไม่</v-card-title>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red" @click="dialogDeleteF = false">Cancel</v-btn>
                                  <v-btn color="#173053" @click="deleteItemConfirm(item)">OK</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          <v-dialog
                                v-model="dialogAddField"
                                max-width="500px"
                              >
                                <v-card>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col
                                          cols="12"
                                        >
                                        <v-row style="height: 35px">
                                          <v-subheader id="subtext">Field Name</v-subheader>
                                        </v-row>
                                        <v-row style="height: 50px">
                                            <v-select
                                            v-model="editedItem.fieldName"
                                            :items="editedItemSelete"
                                            item-text="text"
                                            dense
                                            return-object
                                            ></v-select>
                                          </v-row>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="#173053"
                                       @click="dialogAddField =false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      color="#173053"
                                      @click="save(editedItem)"
                                    >
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                       </v-row>
                    </v-col>
                      <v-col id="margin">
                      <v-row justify="center">
                      <v-btn
                        elevation="2"
                        x-large
                        color="#173053"
                        :disabled="!validAdd"
                        @click="addData()"
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
          </v-dialog>
          <!-- end add -->

          <!-- edit -->
          <v-dialog v-model="dialogEdit" persistent max-width="60%">
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
                    <v-col cols="5" class="text-center">
                        <v-col class="text-center">
                      <v-img  class="v-margit_img_reward" :src="require('@/assets/GroupLevel.svg')" max-width="330"></v-img>
                      </v-col>
                    </v-col>

                      <v-col cols="6" class="v-margit_text_add mt-1">
                    <v-col class="text-center">
                      <v-img class="v_text_edit" :src="require('@/assets/GroupEditTitle.svg')"></v-img>
                      </v-col>
                    <v-col cols="12">
                      <v-row style="height: 35px">
                      <v-subheader id="subtext">title</v-subheader>
                      </v-row>
                      <v-row style="height: 70px">
                      <v-text-field
                        v-model="formUpdate.flowName"
                        dense
                        required
                        :rules="[
                          rules.required
                        ]"
                      ></v-text-field>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row style="height: 50px" justify="center">
                      <v-btn
                        color="primary"
                        dark
                        x-small
                        @click="dialogAddField =true,editedItem2.fieldName = '', editedItem2.fieldId = ''"
                        class="mb-2"
                      >
                        Register Field Edit
                      </v-btn>
                      </v-row>
                       <v-row justify="center">
                         <v-data-table
                            dense
                            :headers="headers"
                            :items="desserts"
                            hide-default-footer
                            class="elevation-1"
                          >
                            <template  v-slot:[`item.actions`]="{ item }">
                              <v-icon
                                small
                                color="red"
                                @click="deleteItem(item)"
                              >
                                mdi-delete
                              </v-icon>
                            </template>
                            <template v-slot:[`item.showCard`]="{ item }">
                            <v-simple-checkbox
                              v-model="item.showCard"
                            ></v-simple-checkbox>
                          </template>
                          </v-data-table>
                          <v-dialog v-model="dialogDeleteF" max-width="500px">
                              <v-card>
                                <v-card-title>คุณต้องการลบใช่หรือไม่</v-card-title>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="red" @click="dialogDeleteF = false">Cancel</v-btn>
                                  <v-btn color="#173053" @click="deleteItemConfirm(item)">OK</v-btn>
                                  <v-spacer></v-spacer>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          <v-dialog
                                v-model="dialogAddField"
                                max-width="500px"
                              >
                                <v-card>
                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col
                                          cols="12"
                                        >
                                        <v-row style="height: 35px">
                                          <v-subheader id="subtext">Field Name</v-subheader>
                                        </v-row>
                                        <v-row style="height: 50px">
                                            <v-select
                                            v-model="editedItem2.fieldName"
                                            :items="editedItemSelete"
                                            item-text="text"
                                            dense
                                            return-object
                                            ></v-select>
                                          </v-row>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="#173053"
                                       @click="dialogAddField =false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      color="#173053"
                                      @click="save(editedItem2)"
                                    >
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                       </v-row>
                    </v-col>
                      <v-col id="margin">
                      <v-row justify="center">
                      <v-btn
                        elevation="2"
                        x-large
                        color="#173053"
                        :disabled="!validUpdate"
                        @click="editData()"
                      >
                        <v-icon left>mdi-checkbox-marked-circle</v-icon>
                        แก้ไข
                      </v-btn>
                      </v-row>
                      </v-col>
                      </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end  -->

          <!-- delete -->
          <v-dialog v-model="dialogDelete" persistent max-width="80%">
            <v-card>
              <v-card-title>
                <span class="headline">ลบข้อมูลนี้</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="รหัส Filed*"
                        v-model="formUpdate.flowName"
                        readonly
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
                  @click="dialogDelete = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn
                  elevation="2"
                  x-large
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
                >
                   <template v-slot:[`item.CREATE_DATE`]="{ item }">
                      {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                      {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="#4CAF50"
                      fab
                      x-small
                      @click="(dialogStep = true), getDataById(item), getStepFlow(item)"

                    >
                      <v-icon dark> mdi-debug-step-over </v-icon>
                    </v-btn>
                    <v-btn
                      color="question"
                      fab
                      x-small
                      @click.stop="(dialogEdit = true), getDataById(item), validate('UPDATE')"
                    >
                      <v-icon dark> mdi-tools </v-icon>
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

export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  data () {
    return {
      PK: '',
      path: '/flow/', // Path Model
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'Flow',
          disabled: false,
          href: '/Master/Flow'
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
        { text: 'Datetime', value: 'dateTime' }
      ],
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
      dialogAddField: false,
      dialogAdd: false,
      dialogEdit: false,
      dialogDeleteF: false,
      dialogDelete: false,
      dialogImport: false,
      dialogStep: false,
      dialogAddStepTitle: false,
      dialogEditStep: false,
      dialogDeleteStepTitle: false,
      // END Dialog Config ADD EDIT DELETE
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      // Search All
      searchAll: '',
      searchAll2: '',
      formAdd: {
        flowCode: '',
        flowId: '',
        flowName: '',
        flowfieldName: [],
        CREATE_USER: '',
        LAST_USER: '',
        shopId: ''
      },
      formAddStep: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      formUpdate: {
        flowCode: '',
        fieldId: '',
        fieldName: '',
        flowfieldName: [],
        flowfieldId: '',
        fieldType: '',
        flowId: '',
        flowName: '',
        LAST_USER: ''
      },
      formUpdateItemFlow: {
        fieldId: '',
        fieldName: '',
        flowfieldName: [],
        flowfieldId: '',
        fieldType: '',
        flowId: '',
        flowName: '',
        LAST_USER: ''
      },
      formUpdateStep: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: ''
      },
      formUpdateItem: {
        flowCode: '',
        fieldId: '',
        fieldName: '',
        flowfieldName: [],
        fieldType: '',
        flowId: '',
        flowName: '',
        LAST_USER: ''
      },
      columnsStep: [
        { text: 'ID', value: 'stepId' },
        { text: 'Title', value: 'stepTitle' },
        { text: ' ', value: 'actions2', sortable: false, align: 'center' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' },
        { text: 'AC', value: 'sendCard' }
      ],
      showCard: false,
      sendCard: false,
      headers: [
        {
          text: 'Field Id',
          value: 'fieldId'
        },
        {
          text: 'Field Name',
          value: 'fieldName'
        },
        { text: 'AC', value: 'actions', sortable: false },
        { text: 'AC', value: 'showCard' }
      ],
      sortBy: false,
      headers2: [
        {
          text: 'Field Id',
          value: 'fieldId'
        },
        {
          text: 'Field Name',
          value: 'fieldName'
        },
        { text: ' ', value: 'actions', sortable: false },
        { text: ' ', value: 'actions2', sortable: false }
      ],
      desserts: [],
      editedItemSelete: [],
      editedItem: {
        fieldId: '',
        fieldName: ''
      },
      editedItem2: {
        fieldId: '',
        fieldName: ''
      },
      stepItemSelete: [],
      rules: {
        required: value => !!value || 'กรุณากรอก.'
      },
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        { text: 'ID', value: 'flowId' },
        { text: 'Name', value: 'flowName' },
        // { text: 'Field', value: 'flowfieldName' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      validAdd: true,
      validUpdate: true,
      editedIndex: -1
      // End Data Table Config
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    await this.getCustomField()
    await this.getDataGlobal(this.DNS_IP, this.path)
  },
  methods: {
    async actionUp (stepId) {
      console.log('stepId', stepId)
      console.log('this.stepItemSelete', this.stepItemSelete)
      let stepItem = this.stepItemSelete
      this.stepItemSelete = []
      let index = stepItem.findIndex(e => e.stepId === stepId)
      console.log('index', index)
      if (index !== -1 && index < stepItem.length + 1) {
        let el = stepItem[index]
        console.log('????', el)
        this.stepItemSelete[index] = stepItem[index - 1]
        this.stepItemSelete[index - 1] = el
        this.stepItemSelete[index].sortNo = stepItem[index - 1].sortNo + 1
        this.stepItemSelete[index - 1].sortNo = el.sortNo - 1
        console.log('sortNo', this.stepItemSelete[index - 1].sortNo)
        console.log('el:', el)
        // this.updateActionDown(this.stepItemSelete)
        console.log('movedown', this.stepItemSelete)
      }
      await this.updateActionDown(this.stepItemSelete, stepItem[0])
      console.log(this.stepItemSelete)
    },
    async actionDown (stepId) {
      console.log('stepId', stepId)
      console.log('this.stepItemSelete', this.stepItemSelete)
      let stepItem = this.stepItemSelete
      this.stepItemSelete = []
      let index = stepItem.findIndex(e => e.stepId === stepId)
      console.log('index', index)
      if (index !== -1 && index < stepItem.length - 1) {
        let el = stepItem[index]
        console.log('????', el)
        this.stepItemSelete[index] = stepItem[index + 1]
        this.stepItemSelete[index + 1] = el
        this.stepItemSelete[index].sortNo = stepItem[index + 1].sortNo - 1
        this.stepItemSelete[index + 1].sortNo = el.sortNo + 1
        console.log('sortNo', this.stepItemSelete[index + 1].sortNo)
        console.log('el:', el)
        // this.updateActionDown(this.stepItemSelete)
        console.log('movedown', this.stepItemSelete)
        // console.log(stepItem)
      }
      await this.updateActionDown(this.stepItemSelete, stepItem[0])
      console.log(this.stepItemSelete)
    },
    async updateActionDown (dt, flowId) {
      console.log('dt', dt)

      var newArray = dt.filter(val => val)
      console.log(newArray)
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/flowStep/" + "editStep",
          newArray,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async (response) => {
          // Debug response
          console.log('addDataGlobal DNS_IP + PATH + "add"', response)
          this.getStepFlow(flowId)
        })
      // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          console.log('error function addDataGlobal : ', error)
          this.dataReady = true
        })
    },
    async updateSendCard () {
      console.log('updateSendCard')
      console.log('SendCard', this.sendCard)
    },
    getCustomField () {
      this.editedItemSelete = []
      axios.get(this.DNS_IP + '/customField/get').then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.fieldName
            d.value = d.fieldName
            d.showCard = false
            this.editedItemSelete.push(d)
          }
        }
      })
    },
    deleteItem (item) {
      this.editedItemSelete.push(item)
      var x = this.desserts.indexOf(item)
      this.$delete(this.desserts, x)
    },
    save (item) {
      this.desserts.push(item.fieldName)
      var x = this.editedItemSelete.indexOf(item.fieldName)
      this.$delete(this.editedItemSelete, x)
      this.dialogAddField = false
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
    getStepFlow (dt) {
      this.stepItemSelete = []
      this.formAddStep.flowId = dt.flowId
      axios.get(this.DNS_IP + '/flowStep/get?flowId=' + dt.flowId).then((response) => {
        let rs = response.data
        if (rs.length > 0) {
          for (var i = 0; i < rs.length; i++) {
            var d = rs[i]
            d.text = d.stepTitle
            d.value = d.stepTitle
            d.sendCard = false
            this.stepItemSelete.push(d)
            this.formUpdateStep.stepTitle = response.data[0].stepTitle
          }
        }
      })
    },
    async getDataById (item) {
      this.editedItemSelete = []
      this.desserts = []
      this.dataReady = false
      this.PK = item.flowCode
      console.log('item: ', item)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + this.path + "getCode?" + 'flowCode' + "=" + item.flowCode,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async (response) => {
          console.log('get flowCode : ', response.data[0].flowfieldName)
          this.dataReady = true
          if (response.data) {
            // Object.assign(this.formUpdate, response.data)
            this.formUpdate.flowName = response.data[0].flowName
            this.formUpdate.flowId = response.data[0].flowId
            this.formUpdate.flowCode = response.data[0].flowCode
            this.fieldType = this.formUpdate.fieldType
            this.desserts = JSON.parse(response.data[0].flowfieldName)
            // this.getDataCompany()
            this.getCustomField(this.formUpdate.fieldName)
            // this.getStepTitle(this.formUpdateStep.stepTitle)
            this.dataReady = true
            console.log(this.formUpdate)
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch((error) => {
          this.dataReady = true
          console.log('error function getDataById : ', error)
        })
    },
    async addData () {
      this.dataReady = false
      // this.formAdd.flowCode = this.generateCodeGlobal()
      console.log('forAdd', this.formAdd)
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
          this.formAdd.flowCode = this.generateCodeGlobal()
          this.formAdd.flowfieldName = JSON.stringify(this.desserts)
          this.formAdd.shopId = this.$session.getAll().data.shopId
          console.log('flowfieldName', this.formAdd.flowfieldName)
          console.log('forAdd', this.formAdd)
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
              // Debug response
              console.log('addDataGlobal DNS_IP + PATH + "add"', response)
              // Close Dialog
              this.dialogAdd = false

              // Load Data
              await this.getDataGlobal(this.DNS_IP, this.path)
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
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
    async addDataStep () {
      this.dataReady = false
      // this.formAdd.flowCode = this.generateCodeGlobal()
      // console.log('forAdd', this.formAddStep)
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
          // this.formAddStep.CREATE_USER = this.session.data.userName
          // this.formAddStep.LAST_USER = this.session.data.userName
          delete this.formAddStep['stepId']
          this.formAddStep.sortNo = this.stepItemSelete.length + 1
          console.log('stepTitle', this.formAddStep.stepTitle)
          console.log('stepId', this.formAddStep.stepId)
          console.log('forAdd', this.formAddStep)
          this.formAdd.shopId = this.$session.getAll().data.shopId
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/flowStep/" + "add",
              this.formAddStep,
              {
                headers: {
                  'Application-Key': this.$session.getAll().ApplicationKey
                }
              }
            )
            .then(async (response) => {
              // Debug response
              console.log('addDataGlobal DNS_IP + PATH + "add"', response)
              // Close Dialog
              this.dialogAddStepTitle = false
              this.dataReady = true
              this.getStepFlow(this.formAddStep)

              // Load Data
              await this.getDataGlobal(this.DNS_IP, this.path)
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            })
          // eslint-disable-next-line handle-callback-err
            .catch((error) => {
              console.log('error function addDataGlobal : ', error)
              this.dataReady = true
            })
        })
        .catch((error) => {
          console.log('error function addDataStep : ', error)
          this.dataReady = true
        })
    },
    async editData () {
      console.log(this.formUpdate)
      console.log(JSON.stringify(this.desserts))
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
          this.formUpdate.flowfieldName = JSON.stringify(this.desserts)
          var ID = this.formUpdate.flowId
          delete this.formUpdate['flowId']
          delete this.formUpdate['fieldId']
          delete this.formUpdate['fieldName']
          delete this.formUpdate['fieldType']
          delete this.formUpdate['flowfieldId']

          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + this.path + "edit/" + ID,
              this.formUpdate
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              // Close Dialog
              this.dialogEdit = false

              // Load Data
              await this.getDataGlobal(this.DNS_IP, this.path, this.session.data.flowId)
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
    async editDataStepTitle () {
      console.log(this.formUpdateStep)
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
          this.formUpdateStep.LAST_USER = this.session.data.userName
          var ID = this.formUpdateStep.stepId
          delete this.formUpdateStep['flowId']
          delete this.formUpdateStep['LAST_USER']
          delete this.formUpdateStep['CREATE_USER']
          delete this.formUpdateStep['stepTitle']
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/flowStep/edit/" + ID,
              this.formUpdateStep
            )
            .then(async (response) => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              this.dialogEditStep = false

              // Load Data
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
          var ID = this.formUpdate.flowId
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

      // eslint-disable-next-line no-redeclare
      for (var key in this.formUpdate) {
        if (this.formUpdate[key]) {
          this.formUpdate[key] = ''
        }
      }
    },
    viewFlowStep (dt) {
      this.$router.push(
        '/Master/FlowStep?Code=' + dt.flowCode
      )
    }
  }
}
</script>
<style scope>
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
