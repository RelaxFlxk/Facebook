<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <!-- <v-col class="ma-2" id="text-Board">กระดานทำงาน</v-col> -->
        <v-row>
        <v-col cols="6" style="font-family: Roboto; font-style: normal; font-weight: bold; font-size: 24px; line-height: 28px; color: #1b437c;">กระดานทำงาน</v-col>
        <v-col cols="6" class="text-right">
            <v-btn-toggle borderless>
            <v-btn
              color="#1B437C"
              text
              @click="newCars()"
            >
              <v-icon left>mdi-car-2-plus</v-icon>
              <span class="hidden-sm-and-down">รับรถใหม่</span>
            </v-btn>
            <v-btn
              color="#1B437C"
              text
              @click="editLayout()"
            >
              <v-icon left>mdi-application-cog</v-icon>
              <span class="hidden-sm-and-down">แก้ไข Layout</span>
            </v-btn>
            <v-btn
              color="#1B437C"
              text
              @click="editStep()"
            >
              <v-icon left>mdi-database-edit</v-icon>
              <span class="hidden-sm-and-down">แก้ไข ขั้นตอน</span>
            </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col :cols="colsWidth">
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
          <v-col :cols="colsWidth">
            <v-select
              :items="DataBranchName"
              v-model="masBranchID"
              @change="chkFlowName(), checkTime()"
              dense
              outlined
              hide-details
              filled
              label="สาขา"
              prepend-inner-icon="mdi-map-marker"
              class="ma-2"
            ></v-select>
          </v-col>
          </v-row>
        <v-row>
          <!-- <v-col :cols="colsWidth" class="text-h6" color="#ABB1C7"> นัดส่ง:</v-col> -->
          <!-- <v-card-title
            class="text-h6"
            color="#ABB1C7"
            style="margin-bottom: 10px;"
          >
            นัดส่ง:
          </v-card-title> -->
          <v-col cols="12">
            <strong class="text-h6">นัดส่ง:</strong>
            <v-chip color="#DE6467" text-color="white">
              ภายใน 2 วัน
            </v-chip>

            <v-chip color="#FED966" text-color="white">
              ภายใน 4 วัน
            </v-chip>

            <v-chip color="#4F93D0" text-color="white">
              มากกว่า 4 วัน
            </v-chip>
          </v-col>

          <v-col cols="12" class="text-right" text color="#ABB1C7" v-if="allJob.length > 0">
            <v-btn-toggle>
            <v-btn
              text
              small
              color="#ABB1C7"
            >
              {{ allJob.length }} records
            </v-btn>
            <v-btn
              v-if="layout === 'grid'"
              text
              small
              color="#ABB1C7"
              @click="layout = 'list'"
            >
              <v-icon class="mr-1 text-right" color="#1B437C">
                mdi-view-dashboard
              </v-icon>
              Grid View
            </v-btn>
            <v-btn
              v-if="layout === 'list'"
              text
              small
              color="#ABB1C7"
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
            </v-btn-toggle>
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
                    <v-col cols="12" class="pb-0">
                        <v-select
                          dense
                          label="ขั้นตอนต่อไป"
                          v-model="formUpdate.stepTitle"
                          :items="stepItemSeleteInBoard"
                          item-text="text"
                          item-value="stepId"
                          return-object
                          :rules="[rules.required]"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" class="pb-0">
                        <v-autocomplete
                          dense
                          label="ชื่อพนักงานที่รับผิดชอบ"
                          v-model="formUpdate.empStep"
                          :items="empSeleteStep"
                          :rules="[rules.required]"
                        ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-col class="text-center pt-0">
                <v-btn color="#1B437C" depressed dark @click="onUpdate()">
                  <v-icon left>
                    mdi-swap-horizontal
                  </v-icon>
                  เปลี่ยนสถานะ
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
                            <v-select
                              v-model="formUpdate.endTime"
                              :items="timeavailable"
                              label="เวลา"
                              menu-props="auto"
                              required
                              :rules ="[rules.required]"
                            ></v-select>
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
          <v-card v-if="checkPayment === 'True'">
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
                  <v-col cols="12" class="pb-0">
                    <VuetifyMoney
                      v-model="formDelete.totalPrice"
                      placeholder="ค่าใช้จ่ายทั้งหมด"
                      dense
                      label="ค่าใช้จ่ายทั้งหมด"
                      required
                      :rules="[rules.required]"
                      v-bind:options="options2"
                    />
                  </v-col>
                  <v-col class="text-center"  cols="12">
                    <v-btn
                      dark
                      elevation="2"
                      depressed
                      color="#1B437C"
                      @click="closeJob()"
                    >
                      <v-icon left>mdi-checkbox-marked-circle</v-icon>
                      ชำระเงิน
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
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
          <v-card v-if="checkPayment === 'False'">
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
                      @click=";(dialogDelete = false), clearData()"
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

        <div
          v-if="formUpdate.flowName === ''"
          :class="classWork"
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
                        </v-col>
                      </v-row>
                    </v-card-title>
                  </v-card>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </div>

        <!-- GridView -->
        <div
          v-if="layout === 'grid'"
          :class="classWork"
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
                        style="min-height: 150px;"
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
                        <div v-if="items.showCard === 'True' && items.fieldValue !== ''">
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
                            <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              v-if="
                                allJob.filter(row => {
                                  return row.jobId == itemsJob.jobId
                                })[0].checkCar == 'False'
                              "
                              color="#9E9E9E"
                              depressed
                              @click="updateStatusCars(itemsJob.jobId, 'False')"
                              v-bind="attrs"
                              v-on="on"
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
                            </template>
                            <span>รถไม่อยู่</span>
                            </v-tooltip>
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
                                  setUpdate(itemsJob, 'editFlow', item)
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
                          <v-row class="pt-2 pl-1">
                            <v-icon
                              large
                              color="#A12BFD"
                              @click="
                                ;(dialogProgress = true), getJobitem(itemsJob)
                              "
                            >
                              mdi-monitor-eye
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

        <div v-if="layout === 'list'">
          <v-expansion-panels>
            <v-expansion-panel
              v-for="(item, indexitem) in stepItemSelete" :key="indexitem"
            >
              <v-expansion-panel-header>
                <!-- <v-alert
                  class="allFrame pb-3"
                  border="left"
                  elevation="2"
                > -->
                  <v-row class=" allFrame pb-3">
                    <v-col>
                      <strong>{{ item.stepTitle }}</strong>
                    </v-col>
                    <v-col class="text-right">
                      <strong>{{
                        allJob.filter(row => {
                          return row.stepId == item.stepId
                        }).length
                      }}</strong>
                      <!-- <v-icon class="text-right" color="#ABB1C7">
                        mdi-dots-vertical
                      </v-icon> -->
                    </v-col>
                  </v-row>
                <!-- </v-alert> -->
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  v-for="(itemsJob, indexJob) in allJob.filter(row => {
                    return row.stepId == item.stepId
                  })"
                  :key="indexJob"
                >
                    <v-alert
                      class="allFrame pb-3"
                      :color="codeColor[indexJob]"
                      border="left"
                      elevation="2"
                      colored-border
                    >
                      <v-row class=" allFrame pb-3">
                        <!-- <v-col cols="2">
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
                        </v-col> -->
                        <!-- end diffDate -->
                        <v-col cols="12" class="text-left">
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
                        <v-col cols="12" class="text-right">
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
                          <!-- update satatus car -->
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            v-if="
                              allJob.filter(row => {
                                return row.jobId == itemsJob.jobId
                              })[0].checkCar == 'False'
                            "
                            color="#9E9E9E"
                            depressed
                            @click="updateStatusCars(itemsJob.jobId, 'False')"
                            v-bind="attrs"
                            v-on="on"
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
                            </template>
                            <span>รถไม่อยู่</span>
                          </v-tooltip>
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
                          v-if="
                              allJob.filter(row => {
                                return row.jobId == itemsJob.jobId
                              })[0].checkCar !== 'False'
                            "
                            large
                            color="#FED966"
                            @click=";(dialog = true),
                                setUpdate(itemsJob, 'editFlow', item)
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

                          <v-icon
                            large
                            color="#84C650"
                            @click=";(dialogDelete = true), setUpdate(itemsJob)"
                          >
                            mdi-tag
                          </v-icon>
                          <!-- <v-icon
                              large
                              color="#A12BFD"
                              @click="
                                ;(dialogProgress = true), getJobitem(itemsJob)
                              "
                            >
                              mdi-monitor-eye
                            </v-icon> -->
                        </v-col>
                      </v-row>
                    </v-alert>

                </v-expansion-panel-content>
                    </v-expansion-panel>
              </v-expansion-panels>
            <br />
        </div>
        <v-dialog
          v-model="dialogProgress"
          max-width="600"
        >
          <v-card class="p-3" style="background: linear-gradient(180deg, #FFFFFF 0%, #E1F3FF 100%);">
            <v-timeline>
              <v-timeline-item
                v-for="(item , index) in timelineitem" :key="index"
                :color="codeColor[index]"
                small
              >
                <template v-slot:opposite>
                  <span>{{format_dateNotime(item.DTLAST_DATE)}}</span>
                </template>
                <v-card class="elevation-2 p-2">
                  <v-card-title class="text-h6" style="color:#173053;">
                  </v-card-title>
                  <v-card-text>
                    <p style="margin-bottom: 0px;color:#000000;">ขั้นตอน {{item.stepTitle}}</p>
                    <!-- <p style="margin-bottom: 0px; color:#173053;">ขั้นตอน {{item.stepTitle}}</p> -->
                    <p style="margin-bottom: 0px;"> เวลาที่รับงาน {{momenTime(item.DTLAST_DATE)}}</p>
                    <p style="margin-bottom: 0px;"> ผู้รับผิดชอบ {{item.empStep}}</p>
                    <p style="margin-bottom: 0px;">เวลาการทำงาน {{item.Counttime}} นาที</p>
                    <!-- <p style="margin-bottom: 0px;">วันที่เปลี่ยน {{format_dateNotime(item.DTLAST_DATE)}}</p> -->
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
            <br>
            <div class="text-center">
              <v-btn
                small class="ma-2" color="#173053" dark
                @click="dialogProgress = false"
              >
                Close
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
        <!-- <div v-if="layout === 'list'">
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

                <v-alert
                  class="allFrame pb-3 ml-4"
                  style="height: 38px;"
                  :color="codeColor[indexJob]"
                  border="left"
                  elevation="2"
                  colored-border
                >
                  <v-row class=" allFrame pb-3">
                    <v-col cols="2">
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
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-if="
                          allJob.filter(row => {
                            return row.jobId == itemsJob.jobId
                          })[0].checkCar == 'False'
                        "
                        color="#9E9E9E"
                        depressed
                        @click="updateStatusCars(itemsJob.jobId, 'False')"
                        v-bind="attrs"
                        v-on="on"
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
                        </template>
                        <span>รถไม่อยู่</span>
                      </v-tooltip>
                      <v-icon
                        large
                        color="#DE6467"
                        dark
                        @click=";(dialogEdit = true), setUpdate(itemsJob)"
                      >
                        mdi-square-edit-outline
                      </v-icon>

                      <v-icon
                      v-if="
                          allJob.filter(row => {
                            return row.jobId == itemsJob.jobId
                          })[0].checkCar !== 'False'
                        "
                        large
                        color="#FED966"
                        @click=";(dialog = true),
                            setUpdate(itemsJob, 'editFlow', item)
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

            </div>
            <br />
          </div>
        </div> -->
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
  computed: {
    colsWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '12'
        case 'md': return '12'
        case 'lg': return '4'
        case 'xl': return '4'
      }
    },
    classWork () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return ''
        case 'sm': return ''
        case 'md': return ''
        case 'lg': return 'workRow'
        case 'xl': return 'workRow'
      }
    }
  },
  data () {
    return {
      timelineitem: [],
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
      dialogProgress: false,
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
      stepItemSeleteInBoard: [],
      empSeleteStep: [],
      DataFlowName: [],
      validAdd: false,
      TotalDate: [],
      DataBranchName: [],
      ItemSelete: [],
      userId: '',
      totalDateDiff: '',
      masBranchID: '',
      branchData: [],
      timeavailable: [],
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
      updateEndDateOld: '',
      updateEndTimeOld: '',
      lineUserId: '',
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
        totalPrice: '0'
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
      },
      checkPayment: 'True'
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    await this.getDataFlow()
    await this.getDataBranch()
    await this.getEmpSelect()
    // await this.getLayoutDefault()
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
    checkTime () {
      console.log('this.branchData', this.branchData)
      console.log('masBranchID', this.masBranchID)
      this.timeavailable = JSON.parse(this.branchData.filter(item => { return item.masBranchID === this.masBranchID })[0].setTime)
      console.log('timevailable', this.timeavailable)
    },
    getDataBranch () {
      this.DataBranchName = []
      this.branchData = []
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
              this.branchData.push(d)
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
      console.log('this.stepItemSelete', this.stepItemSelete)
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
            var workDataUse = []
            workData = JSON.parse(d.workData)
            console.log('workData', workData)
            if (workData.length > 0) {
              for (let x = 0; x < workData.length; x++) {
                let t = workData[x]
                let s = {}
                s.sortNo = t.sortNo
                s.stepId = t.stepId
                s.stepTitle = this.stepItemSelete.filter(el => { return el.stepId === t.stepId })[0].stepTitle
                workDataUse.push(s)
              }
            } else {
              workDataUse = []
            }
            this.Layout.push({
              workShopId: d.workShopId,
              workColum: d.workColum,
              workData: workDataUse
            })
          }
          console.log('this.Layout', this.Layout)
        })
        .catch(error => {
          console.log('error function addDataGlobal : ', error)
        })
    },
    // async getLayoutDefault () {
    //   this.Layout = []
    //   console.log('flowName', this.formUpdate.flowName)
    //   console.log('Branch' + this.masBranchID)
    //   console.log('shopId' + this.shopId)
    //   await axios
    //     .get(
    //       this.DNS_IP +
    //         '/WorkShopLayout/get?flowName=' +
    //         '&shopId=' +
    //         this.shopId
    //     )
    //     .then(response => {
    //       let rs = response.data
    //       for (let i = 0; i < rs.length; i++) {
    //         let d = rs[i]
    //         var workData = [i]
    //         workData = JSON.parse(d.workData)
    //         this.Layout.push({
    //           workShopId: d.workShopId,
    //           workColum: d.workColum,
    //           workData: workData
    //         })
    //       }
    //       console.log('this.Layout', this.Layout)
    //     })
    //     .catch(error => {
    //       console.log('error function addDataGlobal : ', error)
    //     })
    // },
    async getStepFlow () {
      this.stepItemSelete = []
      await axios
        .get(
          this.DNS_IP +
            '/flowStep/get?flowName=' +
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
            console.log('stepItemSelete', this.stepItemSelete)
          }
        })
    },
    async getEmpSelect () {
      this.empSeleteStep = []
      await axios
        .get(this.DNS_IP + '/empSelect/getUse?privacyPage=board&shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              var s = {}
              s.text = d.empFirst_NameTH + ' ' + d.empLast_NameTH
              s.value = d.empId
              this.empSeleteStep.push(s)
            }
            console.log('empSeleteStep', this.empSeleteStep)
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
                    endTime: d.endTime,
                    checkPayment: d.checkPayment,
                    empStepId: d.empStepId,
                    lineUserId: d.lineUserId
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
    // checkStep () {
    //   this.formUpdate.stepId = this.formUpdate.stepTitle.stepId
    //   this.formUpdate.stepTitle = this.formUpdate.stepTitle.stepTitle
    //   console.log('stepId', this.formUpdate.stepId)
    //   console.log('stepTitle', this.formUpdate.stepTitle)
    //   // let rs = this.stepItemSelete
    //   // if (rs.length > 0) {
    //   //   for (var i = 0; i < rs.length; i++) {
    //   //     var d = rs[i]
    //   //     if (this.formUpdate.stepTitle === d.stepTitle) {
    //   //       this.formUpdate.stepTitle = ''
    //   //     }
    //   //   }
    //   // }
    // },
    async setUpdate (item, text, stepItem) {
      console.log(this.formUpdate)
      console.log(this.stepItemSelete)
      console.log('item1', item)
      console.log('stepItem', stepItem)
      this.checkPayment = item.checkPayment
      var dataStepItemSelete = this.stepItemSelete
      // var index = dataStepItemSelete.findIndex(key => key.text === stepTitle)
      this.formUpdate.jobId = item.jobId
      this.updateEndDateOld = this.momenDate_1(item.endDate)
      this.updateEndTimeOld = item.endTime
      this.formUpdate.endDate = this.momenDate_1(item.endDate)
      this.formUpdate.endTime = item.endTime
      this.formDelete.jobNo = item.jobNo
      this.formUpdate.empStep = parseInt(item.empStepId)
      var lineUserId = ''
      if (item.lineUserId === null || item.lineUserId === '' || item.lineUserId === 'user-skip' || item.lineUserId === undefined) {
        lineUserId = ''
      } else {
        lineUserId = item.lineUserId
      }
      this.lineUserId = lineUserId
      // this.formUpdate.empStep = this.JobDataItem.filter(row => {
      //   return row.jobId === item.jobId
      // })[0].empStep
      if (text === 'editFlow') {
        this.stepItemSeleteInBoard = dataStepItemSelete.filter(el => el.text !== stepItem.stepTitle)
      }
    },
    async onUpdate () {
      this.formUpdate.stepId = this.formUpdate.stepTitle.stepId
      // console.log('stepId', this.formUpdate.stepTitle.stepId)
      // console.log('id', this.formUpdate.jobId)
      // console.log('formUpdate', this.formUpdate)
      // console.log('allJob', this.allJob)
      // console.log('empSeleteStep', this.empSeleteStep)
      // console.log('empStep', this.formUpdate.empStep)
      if (this.formUpdate.empStep !== '' && this.formUpdate.stepTitle !== '') {
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
      } else {
        this.$swal('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบ', 'error')
      }
    },
    async clearData () {
      // this.formUpdate.stepTitle = ''
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
      let updateStatusSend = { updateStatusSend: 'false', checkPayment: this.checkPayment }
      await axios
        .post(this.DNS_IP + '/job/pushClosejob/' + jobNo, updateStatusSend)
        .then(console.log(jobNo))
    },
    closeJob () {
      if (this.checkPayment === 'True') {
        if (this.formDelete.totalPrice !== '') {
          this.closeJobSubmit(this.formDelete.totalPrice)
        } else {
          this.$swal('ผิดพลาก', 'กรุณาใส่จำนวนเงิน', 'error')
        }
      } else {
        this.closeJobSubmit('0')
      }
    },
    closeJobSubmit (totalPrice) {
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
          totalPrice: totalPrice,
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
        console.log('rs JobDataItem', rs)
        let dt = []
        var cusName = ''
        var cusReg = ''
        var jobDate = this.formUpdate.endDate + ' ' + this.formUpdate.endTime
        for (var i = 0; i < rs.length; i++) {
          var d = rs[i]
          var s = {}
          s.jobNo = d.jobNo
          s.jobId = d.jobId
          s.fieldId = d.fieldId
          if (d.fieldName === 'ชื่อ') {
            cusName = d.fieldValue
          }
          if (d.fieldName === 'เลขทะเบียน') {
            cusReg = d.fieldValue
          }
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
            var dateNew = this.formUpdate.endDate + this.formUpdate.endTime
            var dateOld = this.updateEndDateOld + this.updateEndTimeOld
            var jodDateOld = this.updateEndDateOld + ' ' + this.updateEndTimeOld
            console.log(dateNew, dateOld)
            console.log(this.lineUserId)
            if (dateNew !== dateOld && this.lineUserId !== '') {
              // แจ้งเตือนลูกค้า this.lineUserId
              let pushText = {
                'to': this.lineUserId,
                'messages': [
                  {
                    'type': 'text',
                    'text': ` ✍️ มีการเปลี่ยนแปลงเวลาวันรับรถ\n ✅ ชื่อ : ${cusName}\n ✅ เลขทะเบียน : ${cusReg}
                          \nจาก วันที่ ${this.format_dateFUllTime(jodDateOld)}
                          \nเป็น วันที่ ${this.format_dateFUllTime(jobDate)}`
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
            this.getStepFlow()
            this.getLayout()
            await this.getJobData()
            this.dialogEdit = false
            console.log('shopId:', this.shopId)
            console.log('form:', this.formEditData)
          })
      })
    },
    async getJobitem (item) {
      console.log('*******************', item)
      this.timelineitem = []
      await axios
        .get(this.DNS_IP + '/job_logCloseJob/' + item.jobNo).then((response) => {
          let rs = response.data
          console.log('rs', rs)
          if (rs.length > 0) {
            for (let i = 0; i < rs.length; i++) {
              let d = rs[i]
              let t = i + 1
              if (t === rs.length) {
                let s = {}
                s.empStep = d.empStep
                s.endDate = d.endDate
                s.totalPrice = s.totalPrice
                s.DTCREATE_DATE = d.CREATE_DATE
                s.DTLAST_DATE = d.LAST_DATE
                s.stepTitle = d.stepTitle
                s.timediff = d.timediff
                s.Counttime = 0
                this.timelineitem.push(s)
              } else {
                let s = {}
                s.empStep = d.empStep
                s.endDate = d.endDate
                s.totalPrice = s.totalPrice
                s.DTCREATE_DATE = d.CREATE_DATE
                s.DTLAST_DATE = d.LAST_DATE
                s.stepTitle = d.stepTitle
                s.timediff = d.timediff
                s.Counttime = rs[t].timediff - d.timediff
                this.timelineitem.push(s)
              }
            }
          }
        }).catch((error) => {
          console.log('error function addData : ', error)
        })
    }
  }
}
</script>
<style scoped>
.theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  background-color: #ffffff !important;
}
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
