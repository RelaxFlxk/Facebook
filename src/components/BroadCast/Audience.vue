<template>
  <div>
    <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin>
    <v-main>
      <div class="col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs" id="v-step-4"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn
              color="#1B437C"
              style="z-index:8;"
              id="v-step-0"
              depressed
              dark
              @click="(dialogAdd = true), validate('ADD'), formAdd.masBranchID = branch[0].value, formAdd.flowId = DataFlowName[0].value"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่ม
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- Add data -->
          <v-dialog v-model="dialogAdd" persistent max-width="70%">
            <v-card class="text-center">
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-col class="text-right">
                      <v-btn
                        small
                        color="#E0E0E0"
                        @click=";(dialogAdd = false), clearAdd()"
                      >
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <v-row class="mb-6" justify="center" no-gutters>
                      <v-col md="auto">
                        <h2 style="font-size:10vw;" class="underline-06">จัดกลุ่มเป้าหมาย</h2>
                        <!-- <h1 style="color:black;"><strong>Forget Password?</strong></h1> -->
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="4" class="text-center pt-0">
                        <v-card elevation="2" class="mx-auto">
                          <v-container>
                            <v-card-title>เป้าหมายโดยประมาณ</v-card-title>
                            <v-card-text>
                              <v-progress-circular
                                :rotate="360"
                                :size="100"
                                :width="15"
                                :value="valueAdd"
                                color="teal"
                              >
                                {{ valueAdd }} %
                              </v-progress-circular>
                            </v-card-text>
                            <v-card-text>ประมาณ {{ dataAdd }} คน</v-card-text>
                          </v-container>
                        </v-card>
                        <div class="text-center">
                          <v-btn
                            color="blue-grey"
                            class="ma-2 white--text"
                            @click="getDataAdd()"
                          >
                            Update
                            <v-icon right dark>
                              mdi-cloud-upload
                            </v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                      <v-col cols="8" class="text-center pt-0">
                        <v-col cols="12" class="pb-0">
                          <v-row>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-subheader id="subtext"
                                  >ชื่อกลุ่มเป้าหมาย</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-text-field
                                  placeholder="ชื่อกลุ่มเป้าหมาย"
                                  v-model="formAdd.audiencesName"
                                  :rules="[rules.required]"
                                  :counter="50"
                                  maxlength="50"
                                  solo
                                  dense
                                  required
                                ></v-text-field>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-row>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-subheader id="subtext"
                                >เลือกกลุ่มเป้าหมาย</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-select
                                  :items="optionAudiences"
                                  v-model="formAdd.audiencesSelect"
                                  dense
                                  @change="chkAudiencesSelect()"
                                  solo
                                  :rules="[rules.required]"
                                ></v-select>
                              </v-row>
                            </v-col>
                            <!-- <v-col cols="2" class="pb-0"></v-col> -->
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pb-0" v-if="formAdd.audiencesSelect === 'typeJob'">
                          <v-row>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-col cols="12" class="pb-0">
                                  <v-row>
                                    <v-subheader id="subtext"
                                    >เลือกสาขา</v-subheader
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-select
                                      v-model="formAdd.masBranchID"
                                      :items="branch"
                                      solo
                                      dense
                                    ></v-select>
                                  </v-row>
                                </v-col>
                                <!-- <v-col cols="2" class="pb-0"></v-col> -->
                              </v-row>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                               <v-row>
                                <v-subheader id="subtext"
                                >เลือกบริการต้องการ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="12" class="pa-0">
                                  <v-select
                                      v-model="formAdd.flowId"
                                      :items="DataFlowName"
                                      label="ประเภทบริการ"
                                      outlined
                                      dense
                                    ></v-select>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-subheader id="subtext"
                                >เลือกวันที่ที่ต้องการ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="2" class="pa-0 mt-n5">
                                  <v-checkbox
                                    label="วันที่รับงาน"
                                    false-value="False"
                                    true-value="True"
                                    @change="chkboxDisable('open')"
                                    v-model="formAdd.dateJobOpen"
                                  ></v-checkbox>
                                </v-col>
                                <v-col cols="5" class="pa-0">
                                  <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.startDate"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        :disabled="disableOpen"
                                        outlined
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="formAdd.startDate"
                                      :disabled="disableOpen"
                                      :max="formAdd.endDate"
                                      @input="menu1 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                                <v-col cols="5" class="pa-0">
                                  <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.endDate"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        :disabled="disableOpen"
                                        outlined
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      :min="formAdd.startDate"
                                      :disabled="disableOpen"
                                      v-model="formAdd.endDate"
                                      @input="menu2 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-subheader id="subtext"
                                >เลือกวันที่ที่ต้องการ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="2" class="pa-0 mt-n5">
                                  <v-checkbox
                                    label="วันที่ปิดงาน"
                                    false-value="False"
                                    true-value="True"
                                    @change="chkboxDisable('close')"
                                    v-model="formAdd.dateJobClose"
                                  ></v-checkbox>
                                </v-col>
                                <v-col cols="5" class="pa-0">
                                  <v-menu
                                    v-model="menu3"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.startDateClose"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        outlined
                                        :disabled="disableClose"
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="formAdd.startDateClose"
                                      :disabled="disableClose"
                                      :max="formAdd.endDateClose"
                                      @input="menu3 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                                <v-col cols="5" class="pa-0">
                                  <v-menu
                                    v-model="menu4"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.endDateClose"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        outlined
                                        :disabled="disableClose"
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      :min="formAdd.startDateClose"
                                      v-model="formAdd.endDateClose"
                                      :disabled="disableClose"
                                      @input="menu4 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pb-0" v-if="formAdd.audiencesSelect === 'bookingDate'">
                          <v-row>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-col cols="12" class="pb-0">
                                  <v-row>
                                    <v-subheader id="subtext"
                                    >เลือกสาขา</v-subheader
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-select
                                      v-model="formAdd.masBranchID"
                                      :items="branch"
                                      solo
                                      dense
                                    ></v-select>
                                  </v-row>
                                </v-col>
                                <!-- <v-col cols="2" class="pb-0"></v-col> -->
                              </v-row>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                               <v-row>
                                <v-subheader id="subtext"
                                >เลือกบริการต้องการ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="12" class="pa-0">
                                  <v-select
                                      v-model="formAdd.flowId"
                                      :items="DataFlowName"
                                      label="ประเภทบริการ"
                                      outlined
                                      dense
                                    ></v-select>
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-subheader id="subtext"
                                >เลือกวันที่ที่ต้องการ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="6" class="pa-0">
                                  <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.startDate"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        outlined
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="formAdd.startDate"
                                      :max="formAdd.endDate"
                                      @input="menu1 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                                <v-col cols="6" class="pa-0">
                                  <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.endDate"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        outlined
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      :min="formAdd.startDate"
                                      v-model="formAdd.endDate"
                                      @input="menu2 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                          <v-col cols="12" class="pb-0" v-if="formAdd.audiencesSelect === 'rating'">
                          <v-row>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-subheader id="subtext"
                                >เลือกคะแนนที่ต้องการ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="6" class="pt-0 pb-0">
                                  <VuetifyMoney
                                    v-model="formAdd.startRating"
                                    dense
                                    required
                                    outlined
                                    v-bind:options="options2"
                                  />
                                </v-col>
                                <v-col cols="6" class="pt-0 pb-0">
                                  <VuetifyMoney
                                    v-model="formAdd.endRating"
                                    dense
                                    required
                                    outlined
                                    v-bind:options="options2"
                                  />
                                </v-col>
                              </v-row>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-subheader id="subtext"
                                >เลือกวันที่ที่ต้องการ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="6" class="pa-0">
                                  <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.startDate"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        outlined
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="formAdd.startDate"
                                      :max="formAdd.endDate"
                                      @input="menu1 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                                <v-col cols="6" class="pa-0">
                                  <v-menu
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="formAdd.endDate"
                                        prepend-icon="mdi-calendar"
                                        label=""
                                        v-bind="attrs"
                                        outlined
                                        dense
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      :min="formAdd.startDate"
                                      v-model="formAdd.endDate"
                                      @input="menu2 = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pb-0" v-if="formAdd.audiencesSelect === 'typeCustomField' && dataCustom.length > 0">
                          <v-row>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-col cols="6">
                                  <v-row>
                                    <v-subheader id="subtext"
                                    >เลือกช่องกรอกข้อมูล</v-subheader
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-select
                                      v-model="formAdd.fieldId"
                                      :items="dataCustom"
                                      @change="getDataOptionField()"
                                      solo
                                      dense
                                    ></v-select>
                                  </v-row>
                                </v-col>
                                <v-col cols="6">
                                  <v-row>
                                    <v-subheader id="subtext"
                                    >เลือกข้อมูลของช่องกรอกข้อมูล</v-subheader
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-select
                                      v-model="formAdd.optionFieldValue"
                                      :items="dataOptionField"
                                      solo
                                      dense
                                    ></v-select>
                                  </v-row>
                                </v-col>
                                <!-- <v-col cols="2" class="pb-0"></v-col> -->
                              </v-row>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                              <v-row>
                                <v-col cols="6">
                                  <v-row>
                                    <v-subheader id="subtext"
                                    >เลือกแหล่งที่มาของข้อมูล</v-subheader
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-select
                                      v-model="formAdd.selectData"
                                      :items="dataSelectData"
                                      solo
                                      dense
                                    ></v-select>
                                  </v-row>
                                </v-col>
                                <v-col cols="6" class="pb-0">
                                  <v-row>
                                    <v-subheader id="subtext"
                                    >เลือกสาขา</v-subheader
                                    >
                                  </v-row>
                                  <v-row>
                                    <v-select
                                      v-model="formAdd.masBranchID"
                                      :items="branch"
                                      solo
                                      dense
                                    ></v-select>
                                  </v-row>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
              <v-card-actions id="v-step-1">
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
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Update data -->
          <v-dialog v-model="dialogEdit" persistent max-width="50%">
            <v-card class="text-center">
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-col class="text-right">
                      <v-btn
                        small
                        color="#E0E0E0"
                        @click=";(dialogEdit = false), clearEdit()"
                      >
                        <v-icon color="#173053">mdi-close</v-icon>
                      </v-btn>
                    </v-col>
                    <!-- <v-row class="mb-6" justify="center">
                      <v-col md="auto">
                        <v-img
                          class="v-img-margit"
                          :src="require('@/assets/Group.png')"
                        ></v-img>
                      </v-col>
                    </v-row> -->
                    <v-row class="mb-6" justify="center">
                      <v-col md="auto">
                        <v-img
                          class="v_text_edit"
                          :src="require('@/assets/GroupEditTitle.svg')"
                        ></v-img>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="4" class="text-center">
                        <v-card elevation="2" class="mx-auto">
                          <v-container>
                            <v-card-title>เป้าหมายโดยประมาณ</v-card-title>
                            <v-card-text>
                              <v-progress-circular
                                :rotate="360"
                                :size="100"
                                :width="15"
                                :value="valueAdd"
                                color="teal"
                              >
                                {{ valueAdd }} %
                              </v-progress-circular>
                            </v-card-text>
                            <v-card-text>ประมาณ {{ dataAdd }} คน</v-card-text>
                          </v-container>
                        </v-card>
                        <div class="text-center">
                          <v-btn
                            color="blue-grey"
                            class="ma-2 white--text"
                            @click="getDataEdit()"
                          >
                            Update
                            <v-icon right dark>
                              mdi-cloud-upload
                            </v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                      <v-col cols="8" class="text-center">
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="12">
                              <v-row>
                                <v-subheader id="subtext"
                                  >ชื่อกลุ่มเป้าหมาย</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-text-field
                                  placeholder="ชื่อกลุ่มเป้าหมาย"
                                  v-model="formUpdate.audiencesName"
                                  :rules="[rules.required]"
                                  :counter="50"
                                  maxlength="50"
                                  dense
                                  required
                                ></v-text-field>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="12">
                              <v-row>
                                <v-subheader id="subtext"
                                  >Member Level</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-select
                                  :items="dataLevel"
                                  v-model="formUpdate.audiencesLevel"
                                  dense
                                ></v-select>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="5">
                              <v-row>
                                <v-subheader id="subtext"
                                  >Coin ขั้นต่ำ</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <VuetifyMoney
                                  v-model="formUpdate.audiencesCoinStart"
                                  dense
                                  @input="checkMinUpdate()"
                                  required
                                  v-bind:options="options2"
                                />
                              </v-row>
                            </v-col>
                            <v-col cols="5">
                              <v-row>
                                <v-subheader id="subtext"
                                  >Coin ไม่เกิน</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <VuetifyMoney
                                  v-model="formUpdate.audiencesCoinEnd"
                                  dense
                                  required
                                  v-bind:options="options2"
                                />
                              </v-row>
                            </v-col>
                            <v-col cols="2">
                              <v-btn
                                class="mx-2"
                                fab
                                dark
                                small
                                @click="
                                  ;(formUpdate.audiencesCoinStart = ''),
                                    (formUpdate.audiencesCoinEnd = '')
                                "
                                color="error"
                              >
                                <v-icon dark>
                                  mdi-minus
                                </v-icon>
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="12">
                              <v-row>
                                <v-subheader id="subtext"
                                  >ไม่ใช้งาน Loyalty มาแล้วกี่วัน</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <VuetifyMoney
                                  v-model="formUpdate.audiencesLastUseAll"
                                  dense
                                  required
                                  v-bind:options="options2"
                                />
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="12">
                              <v-row>
                                <v-subheader id="subtext"
                                  >ใช้บริการ Service ไหน</v-subheader
                                >
                              </v-row>
                              <v-row>
                                <v-col cols="10">
                                  <v-select
                                    :items="ProductExchangeRate"
                                    v-model="formUpdate.audiencesExchangeRate"
                                    dense
                                  ></v-select>
                                </v-col>
                                <v-col cols="2">
                                  <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    @click="
                                      formUpdate.audiencesExchangeRate = ''
                                    "
                                    color="error"
                                  >
                                    <v-icon dark>
                                      mdi-minus
                                    </v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
              <v-card-actions id="v-step-1">
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
                      บันทึก
                    </v-btn>
                  </v-row>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- delete -->
          <v-dialog v-model="dialogDelete" persistent max-width="50%">
            <v-card>
              <v-card-title>
                <span class="headline">ลบข้อมูลนี้</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Audiences Code"
                        v-model="formUpdate.audiencesCode"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="ชื่อกลุ่มเป้าหมาย"
                        v-model="formUpdate.audiencesName"
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
                  class="btn-color"
                  @click="dialogDelete = false"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                <v-btn elevation="2" x-large color="red" @click="deleteData()">
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- dialog Data -->
          <v-dialog v-model="dialogData" persistent max-width="50%">
            <v-card max-width="100%">
              <v-card-actions>
                <v-col id="margin">
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-card elevation="7" v-if="dataReady">
                        <v-card-title>
                          <v-text-field
                            v-model="searchAll3"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                        </v-card-title>
                        <v-card-text>
                          <v-data-table
                            :headers="columns1"
                            :items="formUpdate2"
                            :search="searchAll3"
                            :items-per-page="10"
                          >
                            <template v-slot:[`item.LAST_DATE`]="{ item }">
                              {{ format_dateNotime(item.LAST_DATE) }}
                            </template>
                            <template v-slot:[`item.CREATE_DATE`]="{ item }">
                              {{ format_dateNotime(item.CREATE_DATE) }}
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
                    <v-btn
                      elevation="2"
                      class="btn-color"
                      @click="dialogData = false, clearSearch()"
                    >
                      <!-- <v-icon left>mdi-cancel</v-icon> -->
                      ปิด
                    </v-btn>
                  </v-row>
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- data tabel -->
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
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateNotime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateNotime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      class="btn-color"
                      fab
                      small
                      @click.stop=";(dialogData = true), getDataBordcast(item)"
                    >
                      <v-icon dark> mdi-bullhorn </v-icon>
                    </v-btn>
                    <v-btn
                      class="btn-color"
                      fab
                      id="v-step-2"
                      small
                      @click.stop="
                        ;(dialogEdit = true),
                          getDataById(item),
                          validate('UPDATE')
                      "
                    >
                      <v-icon dark> mdi-tools </v-icon>
                    </v-btn>
                    <v-btn
                      color="red"
                      dark
                      fab
                      small
                      @click.stop=";(dialogDelete = true), getDataById(item)"
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
        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'
import axios from 'axios' // api
import DateRangePicker from 'vue2-daterange-picker'
// you need to import the CSS manually
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  components: {
    'left-menu-admin': adminLeftMenu,
    VuetifyMoney,
    DateRangePicker
  },
  data () {
    return {
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
      path: '/audiences/', // Path Model
      returnLink: '/tool/Audience',
      session: this.$session.getAll(),
      // Menu Config
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/Core/Home'
        },
        {
          text: 'กลุ่มเป้าหมาย',
          disabled: false,
          href: '/tool/Audience'
        }
      ],
      code: 'AD_', // Generate Code
      valueAdd: 0,
      dataAdd: 0,
      options2: {
        locale: 'en-US',
        prefix: '',
        suffix: '',
        length: 1,
        precision: 0
      },
      dialogData: false,
      rules: {
        required: value => !!value || 'กรุณากรอก.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      formAdd: {
        selectData: 'booking',
        flowId: '',
        fieldId: '',
        optionFieldValue: '',
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        startDateClose: new Date().toISOString().substr(0, 10),
        endDateClose: new Date().toISOString().substr(0, 10),
        audiencesSelect: 'bookingDate',
        startRating: 0,
        endRating: 0,
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: '',
        LAST_USER: '',
        masBranchID: '',
        dateJobOpen: 'False',
        dateJobClose: 'False'
      },
      formUpdate2: null,
      formUpdate: {
        id: '',
        audiencesCode: '',
        audiencesName: '',
        audiencesLevel: '',
        audiencesCoinStart: '',
        audiencesCoinEnd: '',
        audiencesExchangeRate: '',
        audiencesLastUseAll: '',
        shopId: this.$session.getAll().data.shopId,
        CREATE_USER: '',
        LAST_USER: ''
      },
      columns: [
        { text: 'กลุ่มเป้าหมาย', value: 'audiencesName' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'จัดการ', value: 'action', sortable: false, align: 'center' }
      ],
      columns1: [
        { text: 'บอร์ดแคช', value: 'message' },
        { text: 'ประเภท', value: 'module' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' }
      ],
      optionAudiences: [
        { text: 'วันที่นัดหมาย', value: 'bookingDate' },
        { text: 'ประเภทบริการ', value: 'typeJob' },
        // { text: 'วันที่รับงาน', value: 'openJobDate' },
        // { text: 'วันที่ปิดงาน', value: 'closeJobDate' },
        { text: 'คะแนนความพึงพอใจ', value: 'rating' },
        { text: 'ประเภทการกรอก', value: 'typeCustomField' }
      ],
      dataSelectData: [
        { text: 'จากข้อมูล นัดหมาย', value: 'booking' },
        { text: 'จากข้อมูล งาน', value: 'job' }
      ],
      // End Menu Config
      dataReady: true,
      menu: false,
      searchAll2: '',
      searchAll3: '',
      dialogAdd: false,
      dialogEdit: false,
      disableOpen: true,
      disableClose: true,
      dialogDelete: false,
      validUpdate: true,
      validAdd: true,
      dataLevel: [],
      ProductExchangeRate: [],
      branch: [],
      DataFlowName: [],
      dataCustom: [],
      dataOptionField: []
    }
  },
  beforeCreate () {
    if (!this.$session.exists()) {
      this.$router.push('/Core/Login')
    }
  },
  async mounted () {
    this.getDataBranch()
    this.getDataFlow()
  },
  methods: {
    async getDataBranch () {
      this.branch = []
      // console.log('branch', this.branch)
      axios
        .get(
          this.DNS_IP + '/master_branch/get?shopId=' + this.session.data.shopId
        )
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.branch.push({text: 'ทั้งหมด', value: 'allBr'})
            for (var i = 0; i < rs.length; i++) {
              let d = rs[i]
              let s = {}
              s.text = d.masBranchName
              s.value = d.masBranchID
              this.branch.push(s)
              // console.log('dtdtdtdt', this.branch)
            }
          } else {
            this.branch.push({text: 'ทั้งหมด', value: 'allBr'})
            // this.branch = []
          }
        })
    },
    getDataOptionField () {
      this.dataOptionField = []
      axios
        .get(this.DNS_IP + '/customField/get?shopId=' + this.session.data.shopId + '&fieldId=' + this.formAdd.fieldId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.dataOptionField = JSON.parse(rs[0].optionField)
            this.formAdd.optionFieldValue = this.dataOptionField[0].value
            // for (var i = 0; i < rs.length; i++) {
            //   var d = rs[i]
            //   d.text = d.fieldName
            //   d.value = d.fieldId
            //   this.dataOptionField.push(d)
            // }
          } else {
            this.dataOptionField = ''
          }
        })
    },
    getDataCustomField () {
      this.dataCustom = []
      axios
        .get(this.DNS_IP + '/customField/get?shopId=' + this.session.data.shopId + "&fieldType='Selects','Radio'")
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            // this.dataCustom.push({text: 'ทั้งหมด', value: 'allField'})
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.fieldName
              d.value = d.fieldId
              this.dataCustom.push(d)
            }
            this.formAdd.fieldId = this.dataCustom[0].value
            this.getDataOptionField()
          } else {
            this.dataCustom = []
            this.$swal('ผิดพลาด', 'คุณไม่มี ประเภทการกรอก ที่ไม่ตรงเงื่อน', 'error')
          }
        })
    },
    getDataFlow () {
      this.DataFlowName = []
      axios
        .get(this.DNS_IP + '/flow/get?shopId=' + this.session.data.shopId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            this.DataFlowName.push({text: 'ทั้งหมด', value: 'allFlow'})
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.flowName
              d.value = d.flowId
              this.DataFlowName.push(d)
            }
          } else {
            this.DataFlowName.push({text: 'ทั้งหมด', value: 'allFlow'})
          }
        })
    },
    // getDataFlowBr (branch) {
    //   this.DataFlowName = []
    //   axios
    //     .get(this.DNS_IP + '/flow/get?shopId=' + this.session.data.shopId)
    //     .then(response => {
    //       let rs = response.data
    //       if (rs.length > 0) {
    //         this.DataFlowName.push({text: 'ทั้งหมด', value: 'allFlow'})
    //         for (var i = 0; i < rs.length; i++) {
    //           var d = rs[i]
    //           d.text = d.flowName
    //           d.value = d.flowId
    //           this.DataFlowName.push(d)
    //         }
    //       } else {
    //         this.DataFlowName.push({text: 'ทั้งหมด', value: 'allFlow'})
    //       }
    //     })
    // },
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
    // chkBranch () {
    //   if (this.formAdd.audiencesSelect === 'typeJob') {
    //     if (this.formAdd.masBranchID === 'allBr') {
    //       this.getDataFlowBr('allBr')
    //     } else {

    //     }
    //   }
    // },
    chkboxDisable (item) {
      if (item === 'open') {
        if (this.formAdd.dateJobOpen === 'True') {
          this.disableOpen = false
        } else {
          this.disableOpen = true
        }
      } else if (item === 'close') {
        if (this.formAdd.dateJobClose === 'True') {
          this.disableClose = false
        } else {
          this.disableClose = true
        }
      }
    },
    chkAudiencesSelect () {
      if (this.formAdd.audiencesSelect === 'typeCustomField') {
        this.getDataCustomField()
      }
    },
    async getDataAdd () {
      this.valueAdd = 0
      this.dataAdd = 0
      var num = 0
      var url = ''
      var branchId = ''
      var flowId = ''
      if (this.formAdd.masBranchID === 'allBr') {
        branchId = ''
      } else {
        branchId = this.formAdd.masBranchID
      }
      if (this.formAdd.flowId === 'allFlow') {
        flowId = ''
      } else {
        flowId = this.formAdd.flowId
      }
      if (this.formAdd.audiencesSelect === 'bookingDate') {
        url = this.DNS_IP + '/booking_view/getAudience?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            branchId +
            '&flowId=' +
            flowId +
            '&dateRange=' + this.formAdd.startDate + '/' + this.formAdd.endDate
      } else if (this.formAdd.audiencesSelect === 'typeJob') {
        console.log(this.formAdd.dateJobOpen, this.formAdd.dateJobClose)
        if (this.formAdd.dateJobOpen === 'True' && this.formAdd.dateJobClose === 'True') {
          url = this.DNS_IP + '/job/getAudience?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            branchId +
            '&flowId=' +
            flowId +
            '&dateRange=' + this.formAdd.startDate + '/' + this.formAdd.endDate +
            '&dateRangeClose=' + this.formAdd.startDateClose + '/' + this.formAdd.endDateClose
        } else if (this.formAdd.dateJobOpen === 'True' && this.formAdd.dateJobClose === 'False') {
          url = this.DNS_IP + '/job/getAudience?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            branchId +
            '&flowId=' +
            flowId +
            '&dateRange=' + this.formAdd.startDate + '/' + this.formAdd.endDate
        } else if (this.formAdd.dateJobOpen === 'False' && this.formAdd.dateJobClose === 'True') {
          url = this.DNS_IP + '/job/getAudience?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            branchId +
            '&flowId=' +
            flowId +
            '&dateRangeClose=' + this.formAdd.startDateClose + '/' + this.formAdd.endDateClose
        } else if (this.formAdd.dateJobOpen === 'False' && this.formAdd.dateJobClose === 'False') {
          url = this.DNS_IP + '/job/getAudience?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            branchId +
            '&flowId=' +
            flowId
        }
      } else if (this.formAdd.audiencesSelect === 'rating') {
        url = this.DNS_IP + '/rating/getAudience?shopId=' +
            this.session.data.shopId +
            '&masBranchID=' +
            branchId +
            '&ratingRange=' + this.formAdd.startRating + '/' + this.formAdd.endRating +
            '&dateRange=' + this.formAdd.startDate + '/' + this.formAdd.endDate
      } else if (this.formAdd.audiencesSelect === 'typeCustomField') {
        if (this.formAdd.selectData === 'booking') {
          url = this.DNS_IP + '/BookingData/getAudience?shopId=' + this.session.data.shopId + '&fieldValue=' + this.formAdd.optionFieldValue +
          '&masBranchID=' + branchId
        } else if (this.formAdd.selectData === 'job') {
          url = this.DNS_IP + '/jobData/getAudience?shopId=' + this.session.data.shopId + '&fieldValue=' + this.formAdd.optionFieldValue +
          '&masBranchID=' + branchId
        }
      }
      console.log(url)
      await axios
        .get(
          // eslint-disable-next-line quotes
          this.DNS_IP + '/member/get?shopId=' + this.session.data.shopId
        )
        .then(async response => {
          console.log('response', response.data)
          if (response.data.status === false) {
            this.valueAdd = 0
            this.dataAdd = 0
          } else {
            num = response.data.length
            this.valueAdd = 100
            this.dataAdd = num
          }
          await axios
            .get(
              url
            )
            .then(async res => {
              console.log('response', response.data)
              if (res.data.status === false) {
                this.valueAdd = parseInt((0 / num) * 100)
                this.dataAdd = 0
              } else {
                this.valueAdd = parseInt((res.data.length / num) * 100)
                this.dataAdd = res.data.length
              }
            })
        })
    },
    clearAdd () {
      this.formAdd.startDate = new Date().toISOString().substr(0, 10)
      this.formAdd.endDate = new Date().toISOString().substr(0, 10)
      this.formAdd.audiencesSelect = 'bookingDate'
      this.formAdd.startRating = 0
      this.formAdd.endRating = 0
      this.formAdd.shopId = this.$session.getAll().data.shopId
      this.formAdd.CREATE_USER = ''
      this.formAdd.LAST_USER = ''
      this.formAdd.masBranchID = ''
    },
    clearEdit () {
      this.formUpdate.id = ''
      this.formUpdate.audiencesCode = ''
      this.formUpdate.audiencesName = ''
      this.formUpdate.audiencesLevel = ''
      this.formUpdate.audiencesCoinStart = ''
      this.formUpdate.audiencesCoinEnd = ''
      this.formUpdate.audiencesExchangeRate = ''
      this.formUpdate.audiencesLastUseAll = ''
      this.formUpdate.shopId = this.$session.getAll().data.shopId
      this.formUpdate.CREATE_USER = ''
      this.formUpdate.LAST_USER = ''
      this.valueAdd = 0
      this.dataAdd = 0
    }
  }
}
</script>
