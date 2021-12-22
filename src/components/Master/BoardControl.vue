<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-col class="ma-2" id="text-Board">กระดานทำงาน</v-col>
        <br />

        <!-- select flow-->
        <v-sheet tile height="54" class="d-flex mt-6">
          <!-- ประเภทบริการ -->
          <v-col cols="12" sm="3">
            <v-select
              :items="DataFlowName"
              v-model="formUpdate.flowName"
              dense
              outlined
              filled
              @change="chkBranchName()"
              hide-details
              label="ประเภทบริการ"
              prepend-inner-icon="mdi-car-connected"
              class="ma-2"
            >
            </v-select>
          </v-col>
          <!-- สาขา -->
          <v-col cols="12" sm="3">
            <v-select
              :items="DataBranchName"
              v-model="masBranchID"
              @change="chkFlowName()"
              dense
              outlined
              hide-details
              filled
              label="สาขา"
              prepend-inner-icon="mdi-map-marker"
              class="ma-2"
            ></v-select>
          </v-col>
          <v-col cols="6" class="v-margit_button_right text-right">
            <v-btn
              class="ma-6 mt-5"
              id="textButton"
              text
              color="#1B437C"
              depressed
              @click="newCars()"
            >
              <v-icon left>mdi-car-2-plus</v-icon>
              รับรถใหม่
            </v-btn>
            <v-btn
              class="ma-6 mt-5"
              color="#1B437C"
              id="textButton"
              text
              depressed
              @click="editLayout()"
            >
              <v-icon left>mdi-application-cog</v-icon>
              แก้ไข Layout
            </v-btn>
            <v-btn
              class="ma-6 mt-5"
              color="#1B437C"
              id="textButton"
              text
              depressed
              @click="editStep()"
            >
              <v-icon left>mdi-database-edit</v-icon>
              แก้ไข ขั้นตอน
            </v-btn>
          </v-col>
        </v-sheet>
        <v-row class="mt-5 ml-5">
          <v-card-title
            class="text-h6"
            color="#ABB1C7"
            style="margin-bottom: 10px;"
          >
            นัดส่ง:
          </v-card-title>
          <v-col cols="4">
            <v-chip class="ma-2" color="#DE6467" text-color="white">
              ภายใน 2 วัน
            </v-chip>

            <v-chip class="ma-2" color="#FED966" text-color="white">
              ภายใน 4 วัน
            </v-chip>

            <v-chip class="ma-2" color="#4F93D0" text-color="white">
              มากกว่า 4 วัน
            </v-chip>
          </v-col>

          <v-col cols="7" class="text-right" text color="#ABB1C7">
            <v-btn
              class="ma-6 mt-5"
              id="textButton"
              text
              color="#ABB1C7"
              depressed
            >
              {{ allJob.length }} records
            </v-btn>
            <v-icon color="#ABB1C7">
              mdi-power-on
            </v-icon>
            <v-btn
              v-if="layout === 'grid'"
              class="ma-6 mt-5"
              id="textButton"
              text
              color="#ABB1C7"
              depressed
              @click="layout = 'list'"
            >
              <v-icon class="mr-1 text-right" color="#1B437C">
                mdi-view-dashboard
              </v-icon>
              Grid View
            </v-btn>
            <v-btn
              v-if="layout === 'list'"
              class="ma-6 mt-5"
              id="textButton"
              text
              color="#ABB1C7"
              depressed
              @click="layout = 'grid'"
            >
              <v-icon
                class="mr-1 text-right"
                color="#1B437C"
              >
                mdi-format-list-text
              </v-icon>
              List View
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>

        <!-- เปลี่ยนสถานะ step-->
        <v-row justify="center">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-col class="text-right">
                <v-icon color="#173053" @click=";(dialog = false), clearData()"
                  >mdi-close</v-icon
                >
              </v-col>
              <center>
                <v-col class="mt-16">
                  <v-img id="img_edit_step" :src="require('@/assets/imgEditStap.svg')"></v-img>
                </v-col>
                <v-col >
                  <v-img id="text_edit_step" :src="require('@/assets/textEditStep.svg')"></v-img>
                </v-col>
              </center>
              <!-- <v-col class="text-center">
                <span class="headline">เปลี่ยนสถานะ</span>
              </v-col> -->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-row style="height: 45px">
                        <v-subheader id="subtextTitle"
                          >ขั้นตอนต่อไป</v-subheader
                        >
                      </v-row>
                      <v-row style="height: 30px">
                        <v-select
                          dense
                          v-model="formUpdate.stepTitle"
                          :items="stepItemSelete"
                          item-text="text"
                          item-value="stepId"
                          return-object
                          @change="checkStep()"
                        ></v-select>
                      </v-row>
                    </v-col>
                    <v-col cols="12">
                      <v-row style="height: 45px">
                        <v-subheader id="subtextTitle"
                          >ชื่อพนักงานที่รับผิดชอบ</v-subheader
                        >
                      </v-row>
                      <v-row style="height: 30px">
                        <v-autocomplete
                          dense
                          v-model="formUpdate.empStep"
                          :items="empSeleteStep"
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-col class="text-center">
                <v-btn color="#1B437C" depressed dark @click="onUpdate()">
                  Save
                </v-btn>
              </v-col>
              <br />
            </v-card>
          </v-dialog>
        </v-row>
        <!-- end เปลี่ยนสถานะ step -->

        <!-- DIALOG แก้ไขข้อมูล ใน card -->

        <v-dialog v-model="dialogEdit" persistent max-width="80%">
          <v-card>
            <v-form ref="form_edit" lazy-validation>
              <v-card-text>
                <v-container>
                  <v-col class="text-right">
                    <v-btn
                      small
                      color="#E0E0E0"
                      @click=";(dialogEdit = false), clearData()"
                    >
                      <v-icon color="#173053">mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                  <v-row justify="center">
                    <v-col cols="5" class="text-center">
                      <v-col class="text-center">
                        <v-img
                          class="v-margit_img_reward"
                          :src="require('@/assets/EditCard.png')"
                          max-width="330"
                        ></v-img>
                      </v-col>
                    </v-col>

                    <v-col cols="6" class="v-margit_text_add mt-1">
                      <v-col class="text-center">
                        <v-img
                          class="v_text_edit"
                          :src="require('@/assets/GroupEditTitle.svg')"
                        ></v-img>
                      </v-col>
                      <v-col cols="12">
                        <div
                          class="column is-3"
                          v-for="(itemsEdit, index) in JobDataItem.filter(
                            row => {
                              return row.jobId == formUpdate.jobId
                            }
                          )"
                          :key="index"
                        >
                          <strong>{{ itemsEdit.fieldName }}: </strong>
                          <v-col cols="12" class="pt-0 pb-0">
                            <v-text-field
                              v-model="itemsEdit.fieldValue"
                              required
                              dense
                            />
                          </v-col>
                        </div>
                      </v-col>
                      <v-col class="pt-0 pb-0" cols="12">
                        <v-row justify="center">
                          <v-col class="pt-0 pb-0" cols="6">
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
                                  v-model="formUpdate.endDate"
                                  label="วันที่นัดส่งรถลูกค้า"
                                  persistent-hint
                                  readonly
                                  prepend-icon="mdi-calendar"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="formUpdate.endDate"
                                no-title
                                @input="menu = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col class="pt-0 pb-0" cols="6">
                            <v-text-field
                              v-model="formUpdate.endTime"
                              label="เวลา"
                              type="time"
                              suffix=""
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-col  class="text-center pt-0 pb-0">
                <v-btn
                  dark
                  elevation="2"
                  depressed
                  color="#1B437C"
                  @click="editData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  แก้ไข
                </v-btn>
              </v-col>
              <br>
            </v-form>
          </v-card>
        </v-dialog>
        <!-- END DIALOG แก้ไขข้อมูล ใน card -->

        <!-- DIALOG ค่าใช้จ่าย -->
        <v-dialog v-model="dialogDelete" persistent max-width="400px">
          <v-card>
            <center>
              <v-col>
                <v-img
                  id="v-img-car"
                  :src="require('@/assets/sendcar.png')"
                ></v-img>
              </v-col>
            </center>
            <v-col class="text-center">
              <span class="headline">ค่าใช้จ่าย</span>
            </v-col>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-row style="height: 35px">
                      <v-col class="text-center">
                        <v-subheader id="subtextTitle"
                          >ค่าใช้จ่ายทั้งหมด</v-subheader
                        >
                      </v-col>
                    </v-row>
                    <v-row style="height: 70px">
                      <v-col class="text-center">
                        <VuetifyMoney
                          v-model="formDelete.totalPrice"
                          placeholder="Amount"
                          dense
                          required
                          :rules="[rules.required]"
                          v-bind:options="options2"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-col class="text-center">
              <v-btn
                dark
                elevation="2"
                depressed
                color="#1B437C"
                @click="deleteDataPrice()"
              >
                <v-icon left>mdi-checkbox-marked-circle</v-icon>
                เพิ่ม
              </v-btn>
              <v-btn
                color="primary"
                depressed
                @click=";(dialogDelete = false), clearData()"
              >
                <v-icon left> mdi-cancel</v-icon>
                ยกเลิก
              </v-btn>
            </v-col>
            <br />
          </v-card>
        </v-dialog>
        <!-- end add -->

        <!-- GridView -->
        <div
          v-if="layout === 'grid'"
          class="workRow"
          v-show="masBranchID"
        >
          <v-row>
            <v-col class="colum" v-for="(element, work) in Layout" :key="work">
              <div
                v-for="(item, indexitem) in Layout[work].workData"
                :key="indexitem"
                class="pb-0 pt-0"
              >
                <v-card class="mb-2">
                  <v-card id="cardTitle" elevation="12">
                    <v-card-title class="ma-3">
                      <v-row>
                        <v-col cols="8" class="pa-1">
                          <strong>{{ item.stepTitle }}</strong>
                        </v-col>
                        <v-col cols="4" class="text-right pb-1 pt-0">
                          <strong>{{
                            allJob.filter(row => {
                              return row.stepId == item.stepId
                            }).length
                          }}</strong>
                          <!-- <v-icon color="#ABB1C7">
                            mdi-dots-vertical
                          </v-icon> -->
                        </v-col>
                      </v-row>
                    </v-card-title>
                  </v-card>

                  <div
                    class="mt-2"
                    v-for="(itemsJob, indexJob) in allJob.filter(row => {
                      return row.stepId == item.stepId
                    })"
                    :key="indexJob"
                  >
                    <v-list-item>
                      <v-alert
                        class="allFrame pb-3"
                        style="min-height: 105px;"
                        :color="codeColor[work]"
                        border="left"
                        elevation="2"
                        colored-border
                      >
                        <div
                          class="bodyFrame"
                          v-for="(items, index) in JobDataItem.filter(row => {
                            return row.jobId == itemsJob.jobId
                          })"
                          :key="index"
                        >
                        <div v-if="items.showCard === 'True'">
                          {{ items.fieldValue }}<br />
                        </div>
                        </div>
                        <v-icon large color="black"> mdi-account</v-icon>
                        <strong>{{
                          JobDataItem.filter(row => {
                            return row.jobId == itemsJob.jobId
                          })[0].empStep
                        }}</strong>
                        <!-- <v-avatar
                color="brown"
              >
                <span class="white--text text-h5">{{
                          JobDataItem.filter(row => {
                            return row.jobId == itemsJob.jobId
                          })[0].empStep
                        }}</span>
              </v-avatar> -->
                        <!-- diffDate -->
                        <v-chip
                          v-if="parseInt(itemsJob.totalDateDiff) <= 2"
                          class="ma-2"
                          color="#DE6467"
                          draggable
                          justify="center"
                          align="center"
                        >
                          {{ itemsJob.totalDateDiff }}
                        </v-chip>
                        <v-chip
                          v-else-if="
                            parseInt(itemsJob.totalDateDiff) <= 4 &&
                              parseInt(itemsJob.totalDateDiff) >= 2
                          "
                          class="ma-2"
                          color="#FED966"
                          text-color="white"
                          draggable
                          justify="center"
                          align="center"
                        >
                          {{ itemsJob.totalDateDiff }}
                        </v-chip>
                        <v-chip
                          v-else-if="parseInt(itemsJob.totalDateDiff) >= 4"
                          class="ma-2"
                          color="#4F93D0"
                          text-color="white"
                          draggable
                          justify="center"
                          align="center"
                        >
                          {{ itemsJob.totalDateDiff }}
                        </v-chip>
                        <!-- end diffDate -->
                        <v-spacer></v-spacer>
                        <v-container
                          class="grey lighten-4"
                          style="position:absolute; width:30px; right:0px; top:0px;"
                        >
                          <!-- update satatus car -->
                          <v-row class="pl-1">
                            <v-icon
                              v-if="
                                allJob.filter(row => {
                                  return row.jobId == itemsJob.jobId
                                })[0].checkCar == 'False'
                              "
                              color="#9E9E9E"
                              depressed
                              @click="updateStatusCars(itemsJob.jobId, 'False')"
                            >
                              mdi-car
                            </v-icon>

                            <v-icon
                              v-else
                              color="#4F93D0"
                              depressed
                              @click="updateStatusCars(itemsJob.jobId, 'True')"
                            >
                              mdi-car
                            </v-icon>
                          </v-row>
                          <!-- end update satatus car -->
                          <v-row class="pt-2 pl-1">
                            <v-icon
                              large
                              color="#DE6467"
                              dark
                              @click=";(dialogEdit = true), setUpdate(itemsJob)"
                            >
                              mdi-square-edit-outline
                            </v-icon>
                          </v-row>
                          <v-row class="pt-2 pl-1">
                            <v-icon
                            v-if="
                                allJob.filter(row => {
                                  return row.jobId == itemsJob.jobId
                                })[0].checkCar !== 'False'
                              "
                              large
                              color="#FED966"
                              @click=";(dialog = true),
                                  setUpdate(itemsJob)
                              "
                            >
                              mdi-layers-triple
                            </v-icon>
                            <v-icon
                            v-if="
                                allJob.filter(row => {
                                  return row.jobId == itemsJob.jobId
                                })[0].checkCar == 'False'
                              "
                              large
                              color="#9E9E9E"
                            >
                              mdi-layers-triple
                            </v-icon>
                          </v-row>
                          <v-row class="pt-2 pl-1">
                            <v-icon
                              large
                              color="#84C650"
                              @click="
                                ;(dialogDelete = true), setUpdate(itemsJob)
                              "
                            >
                              mdi-tag
                            </v-icon>
                          </v-row>
                        </v-container>
                      </v-alert>
                    </v-list-item>
                  </div>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- List view -->
        <div v-if="layout === 'list'">
          <div
            class="mt-3"
            v-for="(item, indexitem) in stepItemSelete"
            :key="indexitem"
          >
            <v-alert
              class="allFrame pb-3 ml-4"
              style="height: 38px;"
              border="left"
              elevation="2"
            >
              <v-row class=" allFrame pb-3">
                <v-col cols="3">
                  <strong>{{ item.stepTitle }}</strong>
                </v-col>
                <v-col cols="9" class="text-right">
                  <strong>{{
                    allJob.filter(row => {
                      return row.stepId == item.stepId
                    }).length
                  }}</strong>
                  <v-icon cols="10" class="text-right" color="#ABB1C7">
                    mdi-dots-vertical
                  </v-icon>
                </v-col>
              </v-row>
            </v-alert>
            <div
              v-for="(itemsJob, indexJob) in allJob.filter(row => {
                return row.stepId == item.stepId
              })"
              :key="indexJob"
            >
              <v-list-item>
                <v-alert
                  class="allFrame pb-3"
                  style="height: 38px;"
                  :color="codeColor[indexJob]"
                  border="left"
                  elevation="2"
                  colored-border
                >
                  <v-row class=" allFrame pb-3">
                    <v-col cols="2">
                      <!-- diffDate -->
                      <v-chip
                        v-if="parseInt(itemsJob.totalDateDiff) <= 2"
                        class="ma-2"
                        color="#DE6467"
                        text-color="white"
                        x-small
                        draggable
                        justify="center"
                        align="center"
                      >
                        {{ itemsJob.totalDateDiff }} วัน
                      </v-chip>
                      <v-chip
                        v-else-if="
                          parseInt(itemsJob.totalDateDiff) <= 4 &&
                            parseInt(itemsJob.totalDateDiff) >= 2
                        "
                        class="ma-2"
                        color="#FED966"
                        text-color="white"
                        draggable
                        x-small
                        justify="center"
                        align="center"
                      >
                        {{ itemsJob.totalDateDiff }} วัน
                      </v-chip>
                      <v-chip
                        v-else-if="parseInt(itemsJob.totalDateDiff) >= 4"
                        class="ma-2"
                        color="#4F93D0"
                        text-color="white"
                        draggable
                        x-small
                        justify="center"
                        align="center"
                      >
                        {{ itemsJob.totalDateDiff }} วัน
                      </v-chip>
                    </v-col>
                    <!-- end diffDate -->
                    <v-col cols="8" class="text-left">
                      <v-chip
                        outlined
                        color="white"
                        text-color="#212121"
                        draggable
                        small
                        justify="center"
                        align="center"
                        v-for="(items, index) in JobDataItem.filter(row => {
                          return row.jobId == itemsJob.jobId
                        })"
                        :key="index"
                      >
                      <div v-if="items.showCard === 'True'">
                        <strong>
                          {{ items.fieldValue }}
                        </strong>
                      </div>
                      </v-chip>
                    </v-col>
                    <v-col cols="2" class="text-right">
                      <!-- update satatus car -->
                      <v-icon
                        v-if="
                          allJob.filter(row => {
                            return row.jobId == itemsJob.jobId
                          })[0].checkCar == 'False'
                        "
                        color="#9E9E9E"
                        depressed
                        @click="updateStatusCars(itemsJob.jobId, 'False')"
                      >
                        mdi-car
                      </v-icon>

                      <v-icon
                        v-else
                        color="#4F93D0"
                        depressed
                        @click="updateStatusCars(itemsJob.jobId, 'True')"
                      >
                        mdi-car
                      </v-icon>
                      <!-- end update satatus car -->
                      <v-icon
                        large
                        color="#DE6467"
                        dark
                        @click=";(dialogEdit = true), setUpdate(itemsJob)"
                      >
                        mdi-square-edit-outline
                      </v-icon>

                      <v-icon
                        large
                        color="#FED966"
                        @click=";(dialog = true), setUpdate(itemsJob)"
                      >
                        mdi-layers-triple
                      </v-icon>
                      <v-icon
                        large
                        color="#84C650"
                        @click=";(dialogDelete = true), setUpdate(itemsJob)"
                      >
                        mdi-tag
                      </v-icon>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-list-item>
            </div>
            <br />
          </div>
        </div>
        <!-- END list view -->
      </div>
    </v-main>
  </div>
</template>
<script>
import axios from 'axios' // api
import draggable from 'vuedraggable'
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import Menu from '../System/Menu.vue'
// import moment from 'moment' // แปลง date

export default {
  name: 'hello',
  components: {
    draggable,
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    Menu
  },
  data () {
    return {
      Layout: [],
      layout: 'grid',
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
      rules: {
        numberRules: value =>
          (!isNaN(parseFloat(value)) && value >= 0 && value <= 9999999999) ||
          'กรุณากรอกตัวเลข 0 ถึง 9',
        counterTel: value => value.length <= 10 || 'Max 10 characters',
        required: value => !!value || 'กรุณากรอก.'
      },
      columnsStep: [
        { text: 'Title', value: 'stepTitle' },
        { text: ' ', value: 'actions2', sortable: false, align: 'center' }
      ],
      DataflowId: '',
      dialog: false,
      dialogAdd: false,
      dialogEdit: false,
      dialogDelete: false,
      date: this.momenDate_1(),
      // DIALOG ADD
      drawer: false,
      drawer1: false,
      endDate: '',
      endTime: '',
      editedItemSelete: [],
      flowfieldNameitem: [],
      item_newcars: [],
      flowCode: '',
      form1: {},
      menu: false,
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      stepItemSelete: [],
      empSeleteStep: [],
      DataFlowName: [],
      validAdd: false,
      TotalDate: [],
      DataBranchName: [],
      ItemSelete: [],
      userId: '',
      totalDateDiff: '',
      masBranchID: '',
      // masBranchId: '',
      formUpdate: {
        stepId: '',
        flowId: '',
        flowName: '',
        stepTitle: '',
        sortNo: '',
        CREATE_USER: '',
        LAST_USER: '',
        endDate: '',
        endTime: '',
        jobId: '',
        empStep: '',
        departmentStep: '',
        branchStep: '',
        checkCar: ''
      },
      JobDataItem: [],
      allJob: [],
      form: {
        jobId: '',
        flowId: '',
        stepId: '',
        fieldId: '',
        fieldValue: '',
        fieldName: ''
      },
      codeColor: [
        '#4D67AB',
        '#4E79C4',
        '#57A2AC',
        '#824D99',
        '#84C650',
        '#C65050',
        '#CE2220',
        '#E67F33',
        '#EB56F6',
        '#FED966'
      ],
      formDelete: {
        jobNo: '',
        shopId: this.$session.getAll().data.shopId,
        totalPrice: ''
      },
      formUpdateCar: {
        jobNo: '',
        shopId: this.$session.getAll().data.shopId,
        checkCar: ''
      },
      formEditData: {
        jobNo: '',
        shopId: this.$session.getAll().data.shopId,
        fieldValue: '',
        endDate: '',
        endTime: ''
      },
      formUpdateStep: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        LAST_USER: '',
        shopId: '',
        sendCard: ''
      }
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    await this.getDataFlow()
    await this.getDataBranch()
    await this.getEmpSelect()
  },
  methods: {
    async chkFlowName () {
      if (this.formUpdate.flowName !== '') {
        await this.getStepFlow()
        await this.getLayout()
        await this.getJobData()
      } else {
        this.$swal('ผิดพลาด', 'กรุณาเลือก ประเภทบริการ', 'error')
      }
    },
    async chkBranchName () {
      if (this.masBranchID !== '') {
        await this.getStepFlow()
        await this.getLayout()
        await this.getJobData()
      }
    },
    getDataFlow () {
      this.DataFlowName = []
      console.log('DataFlowName', this.DataFlowName)
      axios
        .get(this.DNS_IP + '/flow/get?shopId=' + this.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.flowName
              d.value = d.flowName
              this.DataFlowName.push(d)
            }
          } else {
            this.DataFlowName = []
          }
        })
    },
    getDataBranch () {
      this.DataBranchName = []
      console.log('DataBranchName', this.DataBranchName)
      axios
        .get(this.DNS_IP + '/master_branch/get?shopId=' + this.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.masBranchName
              d.value = d.masBranchID
              this.DataBranchName.push(d)
            }
          } else {
            this.DataBranchName = []
          }
        })
    },
    async getLayout () {
      this.Layout = []
      console.log('flowName', this.formUpdate.flowName)
      console.log('Branch' + this.masBranchID)
      await axios
        .get(
          this.DNS_IP +
            '/WorkShopLayout/get?flowName=' +
            this.formUpdate.flowName +
            '&masBranchID=' + this.masBranchID +
            '&shopId=' +
            this.shopId
        )
        .then(response => {
          let rs = response.data
          for (let i = 0; i < rs.length; i++) {
            let d = rs[i]
            var workData = []
            workData = JSON.parse(d.workData)
            this.Layout.push({
              workShopId: d.workShopId,
              workColum: d.workColum,
              workData: workData
            })
          }
          console.log('this.Layout', this.Layout)
        })
        .catch(error => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    async getStepFlow () {
      this.stepItemSelete = []
      await axios
        .get(
          this.DNS_IP +
            '/flowStep/find_step?flowName=' +
            this.formUpdate.flowName +
            '&shopId=' +
            this.shopId
        )
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.stepTitle
              d.value = d.stepId
              this.stepItemSelete.push(d)
            }
            console.log('stepItemSelete', this.formUpdate)
          }
        })
    },
    async getEmpSelect () {
      this.empSeleteStep = []
      await axios
        .get(this.DNS_IP + '/empSelect/get?shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH
              s.value = d.empFirst_NameTH
              this.empSeleteStep.push(s)
            }
            console.log('empSeleteStep', this.formUpdate)
          }
        })
    },
    async getJobData () {
      this.JobDataItem = []
      this.allJob = []
      axios
        .get(
          this.DNS_IP +
            '/job/get?flowName=' +
            this.formUpdate.flowName +
            '&masBranchID=' + this.masBranchID +
            '&shopId=' +
            this.shopId
        )
        .then(async response => {
          this.dataReady = true
          var jobs = []
          console.log('res', response.data)
          // console.log('userId', this.formUpdate.userId === 'NULL')
          if (response.data) {
            for (var i = 0; i < response.data.length; i++) {
              var d = response.data[i]
              d.userId = d.userId || ''
              if (jobs.indexOf(d.jobId) === -1) {
                jobs.push(d.jobId)
                if (d.userId !== '') {
                  var rss = response.data.filter(el => { return el.jobId === d.jobId })
                  for (var x = 0; x < response.data.filter(el => { return el.jobId === d.jobId }).length; x++) {
                    var s = rss[x]
                    // jobs.push(element.jobId)
                    this.JobDataItem.push(s)
                  }
                  this.allJob.push({
                    jobId: d.jobId,
                    jobNo: d.jobNo,
                    stepId: d.stepId,
                    checkCar: d.checkCar,
                    totalDateDiff: d.totalDateDiff,
                    endDate: d.endDate,
                    endTime: d.endTime
                  })
                }
              }
            }
            // response.data.forEach(element => {
            //   console.log('indexOf(element.jobId)', jobs.indexOf(element.jobId))
            //   // if (jobs.indexOf(element.jobId) === -1) {
            //   console.log('element', element.userId)
            //   if (element.userId !== '' || element.userId !== null) {
            //     // jobs.push(element.jobId)
            //     this.allJob.push({
            //       jobId: element.jobId,
            //       jobNo: element.jobNo,
            //       stepId: element.stepId,
            //       checkCar: element.checkCar,
            //       totalDateDiff: element.totalDateDiff,
            //       endDate: element.endDate,
            //       endTime: element.endTime
            //     })
            //     this.JobDataItem.push(element)
            //   }
            //   // }
            // })
            // this.JobDataItem = response.data
            // if (this.JobDataItem.length === 0) {
            //   this.JobDataItem = []
            //   // this.allJob = []
            // }
          }
          console.log('JobDataItem', this.JobDataItem)
          console.log('JobLEN', this.userId)
          console.log('allJob', this.allJob)
          console.log('endTime', d.endTime)
          console.log('totalDateDiff', this.totalDateDiff)
        })
    },
    async pushmessage (jobId) {
      let updateStatusSend = { updateStatusSend: 'false' }
      await axios
        .post(this.DNS_IP + '/job/pushMsg/' + jobId, updateStatusSend)
        .then(console.log(jobId))
    },
    async editStep () {
      this.$router.push('/Master/Flow')
    },
    async newCars () {
      this.$router.push('/Master/RegisterAdd')
    },
    async editLayout () {
      this.$router.push('/Master/WorkShop')
    },
    itemCars (item) {
      this.item_newcars = item
    },
    checkStep () {
      this.formUpdate.stepId = this.formUpdate.stepTitle.stepId
      this.formUpdate.stepTitle = this.formUpdate.stepTitle.stepTitle
      console.log('stepId', this.formUpdate.stepId)
      console.log('stepTitle', this.formUpdate.stepTitle)
      // let rs = this.stepItemSelete
      // if (rs.length > 0) {
      //   for (var i = 0; i < rs.length; i++) {
      //     var d = rs[i]
      //     if (this.formUpdate.stepTitle === d.stepTitle) {
      //       this.formUpdate.stepTitle = ''
      //     }
      //   }
      // }
    },
    async setUpdate (item) {
      console.log(this.formUpdate)
      console.log('item1', item)
      this.formUpdate.jobId = item.jobId
      this.formUpdate.endDate = this.momenDate_1(item.endDate)
      this.formUpdate.endTime = item.endTime
      this.formDelete.jobNo = item.jobNo
    },
    async onUpdate () {
      this.formUpdate.stepId = this.formUpdate.stepTitle.stepId
      console.log('stepId', this.formUpdate.stepTitle.stepId)
      console.log('id', this.formUpdate.jobId)
      console.log('formUpdate', this.formUpdate)
      console.log('allJob', this.allJob)
      console.log('empSeleteStep', this.empSeleteStep)
      console.log('empStep', this.formUpdate.empStep)
      this.dataReady = false
      this.$swal({
        title: 'ต้องการ แก้ไขสถานะ ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          this.formUpdate.LAST_USER = this.session.data.userName
          var ID = this.formUpdate.jobId
          var flowName = this.formUpdate.flowName
          delete this.formUpdate['flowId']
          delete this.formUpdate['flowName']
          delete this.formUpdate['sortNo']
          delete this.formUpdate['CREATE_USER']
          // delete this.formUpdate['stepTitle']
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + '/job/edit/' + ID,
              this.formUpdate
            )
            .then(async response => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              // this.dialog = false
              // this.$swal('เรียบร้อย', 'แก้ไขสถานะ เรียบร้อย', 'success')
              // this.getStepFlow()
              // this.getLayout()
              // this.allJob.map((row, index) => {
              //   if (row.jobId === ID) {
              //     this.allJob[index].stepId = this.formUpdate.stepId
              //   }
              // })
              this.formUpdate.flowName = flowName
              await this.pushmessage(this.formUpdate.jobId)
              this.dialog = false
              this.$swal('เรียบร้อย', 'แก้ไขสถานะ เรียบร้อย', 'success')
              this.getStepFlow()
              this.getLayout()
              await this.getJobData()
              // console.log('allJob', this.allJob)
              // console.log(this.formUpdate.jobId)
              // console.log(this.formUpdate.stepId)
            })
            // eslint-disable-next-line handle-callback-err
            .catch(error => {
              this.dataReady = true
              console.log('error function editDataGlobal : ', error)
            })
        })
        .catch(error => {
          this.dataReady = true
          console.log('error function editDataGlobal : ', error)
        })
    },
    async clearData () {
      this.formUpdate.stepTitle = ''
      // eslint-disable-next-line no-redeclare
      for (var key in this.formEdit) {
        console.log('Key', key)
        console.log('Value', this.formEdit)

        if (this.formEdit[key]) {
          this.formEdit[key] = ''
        }
      }
    },
    async updateStatusCars (item, status) {
      console.log(this.formUpdate.jobId)
      console.log(item)
      this.$swal({
        title: 'อัพเดท สถานะรถ ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ยกเลิก'
      }).then(async response => {
        var ID = item
        var statusUse = ''
        if (status === 'True') {
          statusUse = 'False'
        } else {
          statusUse = 'True'
        }
        let ds = {
          jobNo: this.formUpdateCar.jobNo,
          shopId: this.formUpdateCar.shopId,
          checkCar: statusUse,
          LAST_USER: this.session.data.userName,
          statusUpdateCar: 'True'
        }
        console.log('ds', ds)
        await axios
          .post(this.DNS_IP + '/job/editStatus/' + ID, ds)
          .then(async response => {
            this.$swal('เรียบร้อย', 'อัพเดท สถานะรถ เรียบร้อย', 'success')
            this.getStepFlow()
            this.getLayout()
            await this.getJobData()
            console.log('shopId:', this.shopId)
            console.log('form:', this.formUpdateCar)
          })
      })
    },
    async pushmessagePrice (jobNo) {
      let updateStatusSend = { updateStatusSend: 'false' }
      await axios
        .post(this.DNS_IP + '/job/pushClosejob/' + jobNo, updateStatusSend)
        .then(console.log(jobNo))
    },
    deleteDataPrice () {
      this.jobNo = ''
      console.log('shopId:', this.shopId)
      console.log('form:', this.formDelete)
      this.$swal({
        title: 'ให้บริการ เสร็จเรียบร้อยแล้ว ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#fa0202',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async response => {
        var ID = this.formUpdate.jobId
        let ds = {
          jobNo: this.formDelete.jobNo,
          shopId: this.shopId,
          totalPrice: this.formDelete.totalPrice,
          LAST_USER: this.session.data.userName,
          statusDelete: 'true'
        }
        console.log('ds', ds)
        await axios
          .post(this.DNS_IP + '/job/editPrice/' + ID, ds)
          .then(async response => {
            await this.pushmessagePrice(this.formDelete.jobNo)
            this.$swal('เรียบร้อย', 'ลบข้อมูล เรียบร้อย', 'success')
            this.getStepFlow()
            this.getLayout()
            await this.getJobData()
            this.dialogDelete = false
            console.log('shopId:', this.shopId)
            console.log('form:', this.formDelete)
          })
      })
    },
    async editData () {
      console.log(
        this.JobDataItem.filter(row => {
          return row.jobId === this.formUpdate.jobId
        })
      )
      this.jobNo = ''
      console.log('shopId', this.shopId)
      console.log('formEditData', this.formEditData)
      this.$swal({
        title: 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      }).then(async result => {
        // var ID = this.formUpdate.jobId
        let rs = this.JobDataItem.filter(row => {
          return row.jobId === this.formUpdate.jobId
        })
        let dt = []
        for (var i = 0; i < rs.length; i++) {
          var d = rs[i]
          var s = {}
          s.jobNo = d.jobNo
          s.jobId = d.jobId
          s.fieldId = d.fieldId
          s.fieldValue = d.fieldValue
          s.endDate = this.formUpdate.endDate
          s.endTime = this.formUpdate.endTime
          s.LAST_USER = d.LAST_USER
          dt.push(s)
        }
        console.log('dt', dt)
        await axios
          .post(
            // eslint-disable-next-line quotes
            this.DNS_IP + '/jobData/editData',
            dt
          )
          .then(async response => {
            this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
            this.getStepFlow()
            this.getLayout()
            await this.getJobData()
            this.dialogEdit = false
            console.log('shopId:', this.shopId)
            console.log('form:', this.formEditData)
          })
      })
    }
  }
}
</script>
<style scoped>
.workRow {
  display: inline-block;
  width: max-content;
  height: max-content;
}
.colum {
  margin-top: 1rem;
  width: 250px;
  background-color: #f0eeee;
  margin-left: 5px;
}
.allFrame {
  padding-top: 0px;
  width: 100%;
  height: max-content;
}
#subtextTitle {
  color: #173053;
  font-size: 20px !important;
  font-weight: bold;
}
#textTitleB {
  color: #173053;
  font-size: 40px !important;
  font-weight: bold;
  font-family: Roboto;
  font-style: normal;
}
#cardleft {
  height: 1024px;
  width: 502px;
  left: 1210px;
  top: 0px;
  border-radius: 0px;
}
#v-img-car {
  height: 60px;
  width: 64px;
}
#img_edit_step {
  width: 135px;
  height: 100px;
}
#text_edit_step {
  Width: 250px;
  Height: 50px;
}
#textButton {
  height: 50px;
  width: 117px;
  font-family: Kittithada Bold 75;
  font-style: normal;
  font-weight: bold;
  align-items: center;
}
#text-Board {
  position: absolute;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: #1b437c;
}
#cardTitle {
  width: auto;
  height: auto;
  border-radius: 2px;
}
#v-text-editLayout {
  height: 50px;
  width: 238px;
}
.bodyFrame {
  padding-top: 1px;
}
body {
  overflow: auto;
  white-space: normal;
}
</style>
