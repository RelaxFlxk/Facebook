<template>
  <div>
    <!-- <left-menu-admin menuActive="0" :sessionData="session"></left-menu-admin> -->
    <v-main>
      <div class="pl-12 pr-12 col-md-12 ml-sm-auto col-lg-12 px-4">
        <v-row>
          <v-col cols="6" class="text-left">
            <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
          </v-col>
          <v-col cols="6" class="v-margit_button text-right">
            <v-btn
              color="primary"
              depressed
              @click="(dialogAdd = true), validate('ADD'), (desserts = []), getCustomField()"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              เพิ่มประเภทบริการ
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <!-- step -->
          <v-dialog v-model="dialogStep" persistent max-width="70%">
            <v-card>
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="10" class="text-left pt-10">
                      <h3><strong>{{ formUpdate.flowName }}</strong></h3>
                      </v-col>
                      <v-col cols="2" class="pt-10">
                      <div style="text-align: end;">
                          <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="(dialogStep = false), clearData()"
                          >
                          X
                          </v-btn>
                      </div>
                      </v-col>
                  </v-row>
                    <v-row justify="center">
                      <!-- ADD steptitle-->
                      <v-dialog
                        v-model="dialogAddStepTitle"
                        persistent
                        max-width="30%"
                      >
                        <v-card min-height="500px">
                          <v-card-text>
                            <v-container>
                              <div style="text-align: end;">
                                  <v-btn
                                    fab
                                    small
                                    dark
                                    color="#F3F3F3"
                                    @click="dialogAddStepTitle = false"
                                  >
                                    <v-icon dark
                                    color="#FE4A01 ">
                                      mdi-close
                                    </v-icon>
                                  </v-btn>
                              </div>
                              <v-row justify="center">
                                <v-col cols="12" class="v-margit_text_add mt-1">
                                  <center>
                                    <v-col>
                                      <v-img
                                        id="v_img_add"
                                        :src="
                                          require('@/assets/AddTitleStep.svg')
                                        "
                                      ></v-img>
                                    </v-col>
                                  </center>
                                  <!-- <center>
                                    <v-col>
                                      <v-img
                                        class="v_text_add"
                                        :src="
                                          require('@/assets/Grouptitle.svg')
                                        "
                                      ></v-img>
                                    </v-col>
                                  </center> -->
                                  <v-col cols="12">
                                    <v-row style="height: 35px">
                                      <v-col cols="12">
                                      <v-row >
                                        <h3 class="font-weight-bold" style="color:#173053;">ขั้นตอนบริการ</h3>
                                      </v-row>
                                      <v-row >
                                        <v-text-field
                                          v-model="formAddStep.stepTitle"
                                          dense
                                          outlined
                                          required
                                          label="ชื่อขั้นตอน"
                                        ></v-text-field>
                                        <v-text-field
                                          v-model="formAddStep.finishTime"
                                          dense
                                          v-mask="'##:##'"
                                          placeholder="HH:mm"
                                          outlined
                                          required
                                          label="เวลาที่คาดว่าจะเสร็จ"
                                        ></v-text-field>
                                        <v-btn
                                          dark
                                          elevation="2"
                                          x-large
                                          block
                                          color="#173053"
                                          @click="addDataStep()"
                                        >
                                          <v-icon left
                                            >mdi-checkbox-marked-circle</v-icon
                                          >
                                          เพิ่ม
                                        </v-btn>
                                      </v-row>
                                    </v-col>
                                    </v-row>
                                    <!-- <v-row class="mt-5">
                                      <v-text-field
                                        v-model="formAddStep.stepTitle"
                                        placeholder="หัวข้อ"
                                        dense
                                        required
                                      ></v-text-field>
                                    </v-row> -->
                                  </v-col>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                      <!-- end ADD step -->

                      <!--edit step -->
                      <v-dialog
                        v-model="dialogEditStep"
                        persistent
                        max-width="30%"
                       > <v-card>
                          <v-form
                            ref="form_update"
                            v-model="validUpdate"
                            lazy-validation
                          >
                            <v-card-text>
                              <v-container>
                                <div style="text-align: end;">
                                    <v-btn
                                      fab
                                      small
                                      dark
                                      color="#F3F3F3"
                                      @click="dialogEditStep = false"
                                    >
                                      <v-icon dark
                                      color="#FE4A01 ">
                                        mdi-close
                                      </v-icon>
                                    </v-btn>
                                </div>
                                <v-row justify="center">
                                  <v-col
                                    cols="12"
                                    class="v-margit_text_add mt-1"
                                  >
                                    <center>
                                      <v-col>
                                        <v-img
                                          id="v_img_edit"
                                          :src="
                                            require('@/assets/EditTitleNew.png')
                                          "
                                        ></v-img>
                                      </v-col>
                                    </center>
                                    <v-col cols="12">
                                      <v-row >
                                        <h3 class="font-weight-bold" style="color:#173053;">ขั้นตอนบริการ</h3>
                                      </v-row>
                                      <v-row >
                                        <v-text-field
                                          v-model="formUpdateStep.stepTitle"
                                          dense
                                          outlined
                                          required
                                          label="ชื่อขั้นตอน"
                                        ></v-text-field>
                                        <v-text-field
                                          v-model="formUpdateStep.finishTime"
                                          dense
                                          v-mask="'##:##'"
                                          placeholder="HH:mm"
                                          outlined
                                          required
                                          label="เวลาที่คาดว่าจะเสร็จ"
                                        ></v-text-field>
                                      </v-row>
                                    </v-col>
                                    <v-col >
                                      <v-row justify="center">
                                        <v-btn
                                          dark
                                          elevation="2"
                                          x-large
                                          block
                                          color="#173053"
                                          @click="editStepTitle()"
                                        >
                                          <v-icon left
                                            >mdi-checkbox-marked-circle</v-icon
                                          >
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
                            class="elevation-1 custom_table_class"
                            dense
                            :headers="columnsStep"
                            :items="stepItemSelete"
                            hide-default-footer
                          >
                            <template v-slot:[`item.actions2`]="{ item, index }" v-if="checkOnsite !== 'True'">
                              <v-btn
                                v-show="index !== 0"
                                color="173053"
                                fab
                                x-small
                                outlined
                                @click="actionUp(item.stepId)"
                              >
                                <v-icon color="#173053">
                                  mdi-chevron-up
                                </v-icon>
                              </v-btn>
                              <v-btn
                                color="173053"
                                fab
                                x-small
                                outlined
                                @click="actionDown(item.stepId)"
                              >
                                <v-icon color="#173053">
                                  mdi-chevron-down
                                </v-icon>
                              </v-btn>
                            </template>
                            <template v-slot:[`item.finishTime`]="{ item }" >
                              <div v-if="item.finishTime !== null && item.finishTime !== ''"> {{item.finishTime + '  ชม.'}}</div>
                            </template>
                            <template v-slot:[`item.sendCard`]="{ item }" v-if="checkOnsite !== 'True'">
                              <v-checkbox
                                false-value="False"
                                true-value="True"
                                v-model="item.sendCard"
                              ></v-checkbox>
                            </template>
                            <template v-slot:[`item.action`]="{ item }" v-if="checkOnsite !== 'True'">
                              <v-btn
                              color="info"
                              fab
                              dark
                              x-small
                              @click="FunCopy(item)"
                            >
                              <v-icon> mdi-qrcode-scan </v-icon>
                            </v-btn>
                              <v-btn
                                color="question"
                                fab
                                dark
                                x-small
                                @click.stop="
                                  (dialogEditStep = true),
                                    getUpdate(item),
                                    validate('UPDATE')
                                "
                              >
                                <v-icon color="#FFFFFF"> mdi-tools </v-icon>
                              </v-btn>
                              <v-btn
                                color="red"
                                dark
                                fab
                                x-small
                                @click.stop="
                                  (dialogDeleteStepTitle = true),
                                    getUpdate(item)
                                "
                              >
                                <v-icon> mdi-delete </v-icon>
                              </v-btn>
                            </template>
                          </v-data-table>
                          <!-- delete step -->
                          <v-dialog
                            v-model="dialogDeleteStepTitle"
                            max-width="500px"
                          >
                            <v-card>
                              <v-col class="text-center">
                                <!-- <v-img :src="require('@/assets/EditTitleStep.svg')"></v-img> -->
                                <v-icon color="#FD8087" class="mdi-48px">
                                  mdi-minus-circle-outline
                                </v-icon>
                              </v-col>
                              <v-col class="text-center">
                                <h3 class="text-h6">คุณต้องการลบใช่หรือไม่</h3>
                              </v-col>
                              <v-col class="text-center">
                                <v-btn
                                  dark
                                  color="#FD8087"
                                  @click="deleteStepTitle()"
                                  >ลบ</v-btn
                                >
                                <v-btn
                                  dark
                                  color="#1B437C"
                                  @click="dialogDeleteStepTitle = false"
                                  >ยกเลิก</v-btn
                                >
                              </v-col>
                            </v-card>
                          </v-dialog>
                          <!-- END delete step -->
                          <v-col cols="12" v-if="checkOnsite !== 'True'" class="v-margit_button text-center">
                            <v-btn
                              color="#1B437C"
                              depressed
                              outlined
                              @click="dialogAddStepTitle = true"
                            >
                              <v-icon left>mdi-text-box-plus</v-icon>
                              เพิ่มขั้นตอน
                            </v-btn>
                            <v-btn
                              color="#1B437C"
                              depressed
                              dark
                              @click="editDataStepTitle()"
                            >
                              <v-icon left>mdi-text-box-plus</v-icon>
                              บันทึกข้อมูล
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <br />
                    <p></p>
                  </v-container>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end  -->

          <!-- add  -->
          <v-dialog v-model="dialogAdd" persistent max-width="50%">
            <v-card>
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="10" class="text-left pt-10">
                      <h3><strong>เพิ่มข้อมูลบริการ</strong></h3>
                      </v-col>
                      <v-col cols="2" class="pt-10">
                      <div style="text-align: end;">
                          <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="(dialogAdd = false), clearData()"
                          >
                          X
                          </v-btn>
                      </div>
                      </v-col>
                  </v-row>
                    <v-row >
                      <v-col cols="12" class="v-margit_text_add mt-1">
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="formAdd.flowName"
                            label="ชื่อบริการ (ภาษาไทย)"
                            outlined
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field
                            v-model="formAdd.flowNameEn"
                            label="ชื่อบริการ (ภาษาอังกฤษ)"
                            outlined
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                          <v-col cols="12" class="pt-0 pb-0">
                          <!-- <v-row>
                            <v-col class="pt-0 pb-0" style="display: flex;justify-content: left;">
                              <v-checkbox
                                label="จำกัดเวลาตามช่าง"
                                false-value="False"
                                :on-icon="'mdi-check-circle'"
                                :off-icon="'mdi-checkbox-blank-circle-outline'"
                                color="#1B437C"
                                true-value="True"
                                v-model="formAdd.timeSlotStatus"
                                @change="formAdd.timeSlot = 1"
                              ></v-checkbox>
                            </v-col>
                          </v-row> -->
                          <v-row v-if="formAdd.timeSlotStatus === 'True'">
                            <v-col class="pb-0">
                              <v-select
                                v-model="formAdd.timeSlot"
                                :items="[{text: '1', value: 1},{text: '2', value: 2},{text: '3', value: 3},{text: '4', value: 4},{text: '5', value: 5},{text: '6', value: 6},{text: '7', value: 7},{text: '8', value: 8},{text: '9', value: 9},{text: '10', value: 10}]"
                                label="จำนวน Slot งาน"
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                          <v-col class="pt-0 pb-0" style="display: flex;justify-content: center;">
                            <v-checkbox
                            label="เงินมัดจำ"
                            false-value="False"
                            :on-icon="'mdi-check-circle'"
                            :off-icon="'mdi-checkbox-blank-circle-outline'"
                            color="#1B437C"
                            true-value="True"
                            v-model="formAdd.checkDeposit"
                            @change="formAdd.amountDeposit = 0"
                          ></v-checkbox>
                          </v-col>
                          <v-col class="pt-0 pb-0" style="display: flex;justify-content: center;">
                            <v-checkbox
                            label="แจ้งยอดค่าชำระ"
                            :on-icon="'mdi-check-circle'"
                            :off-icon="'mdi-checkbox-blank-circle-outline'"
                            false-value="False"
                            color="#1B437C"
                            true-value="True"
                            v-model="formAdd.checkPayment"
                          ></v-checkbox>
                          </v-col>
                          <v-col class="pt-0 pb-0" style="display: flex;justify-content: center;">
                            <v-checkbox
                            label="ป้องกันการจองซ้ำ / วัน"
                            false-value="False"
                            :on-icon="'mdi-check-circle'"
                            :off-icon="'mdi-checkbox-blank-circle-outline'"
                            color="#1B437C"
                            true-value="True"
                            v-model="formAdd.repeatBooking"
                          ></v-checkbox>
                          </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pb-0 pt-0">
                          <v-select
                            v-if="formAdd.checkDeposit === 'True'"
                            v-model="formAdd.depositTime"
                            :items="depositTimeItem"
                            label="ชำระเงินมัดจำภายในกี่นาที"
                            outlined
                            dense
                          ></v-select>
                          <v-text-field
                          v-if="formAdd.checkDeposit === 'True'"
                            v-model="formAdd.promptPayName"
                            label="ชื่อบัญชีพร้อมเพย์"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field
                          v-if="formAdd.checkDeposit === 'True'"
                            v-model="formAdd.promptPayID"
                            label="หมายเลขพร้อมเพย์"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <VuetifyMoney
                            v-if="formAdd.checkDeposit === 'True'"
                            label="จำนวนเงินมัดจำ"
                            v-model="formAdd.amountDeposit"
                            required
                            :rules="[rules.required]"
                            outlined
                            dense
                            v-bind:options="options2" />
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-textarea
                            outlined
                            v-model="formAdd.remarkConfirm"
                            label="หมายเหตุการยืนยันนัดหมาย"
                          ></v-textarea>
                        </v-col>
                        <br />
                        <div class="text-center">
                          <v-btn
                            dark
                            elevation="2"
                            large
                            block
                            color="#173053"
                            :disabled="!validAdd"
                            @click="addData()"
                          >
                            <v-icon left>mdi-checkbox-marked-circle</v-icon>
                            บันทึกข้อมูล
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
          <!-- end add -->

          <!-- edit -->
          <v-dialog v-model="dialogEdit" persistent max-width="50%">
            <v-card>
              <v-form ref="form_update" v-model="validUpdate" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="10" class="text-left pt-10">
                      <h3><strong>แก้ไขข้อมูล</strong></h3>
                      </v-col>
                      <v-col cols="2" class="pt-10">
                      <div style="text-align: end;">
                          <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="(dialogEdit = false), clearData()"
                          >
                          X
                          </v-btn>
                      </div>
                      </v-col>
                  </v-row>
                    <v-row>
                      <v-col cols="12" class="v-margit_text_add mt-1">
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            class="pa-0"
                            v-model="formUpdate.flowName"
                            label="ชื่อขั้นตอน (ภาษาไทย)"
                            outlined
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field
                            class="pa-0"
                            v-model="formUpdate.flowNameEn"
                            label="ชื่อขั้นตอน (ภาษาอังกฤษ)"
                            outlined
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pt-0 pb-0" >
                          <!-- <v-row>
                            <v-col class="pt-0 pb-0" style="display: flex;justify-content: left;">
                              <v-checkbox
                                label="จำกัดเวลาตามช่าง"
                                false-value="False"
                                :on-icon="'mdi-check-circle'"
                                :off-icon="'mdi-checkbox-blank-circle-outline'"
                                color="#1B437C"
                                true-value="True"
                                v-model="formUpdate.timeSlotStatus"
                                @change="formUpdate.timeSlot = 1"
                              ></v-checkbox>
                            </v-col>
                          </v-row> -->
                          <v-row v-if="formUpdate.timeSlotStatus === 'True'">
                            <v-col class="pb-0">
                              <v-select
                                v-model="formUpdate.timeSlot"
                                :items="[{text: '1', value: 1},{text: '2', value: 2},{text: '3', value: 3},{text: '4', value: 4},{text: '5', value: 5},{text: '6', value: 6},{text: '7', value: 7},{text: '8', value: 8},{text: '9', value: 9},{text: '10', value: 10}]"
                                label="จำนวน Slot งาน"
                                outlined
                              ></v-select>
                            </v-col>
                          </v-row>
                          <v-row>
                          <v-col style="display: flex;justify-content: center;">
                            <v-checkbox
                            label="เงินมัดจำ"
                            false-value="False"
                            :on-icon="'mdi-check-circle'"
                            :off-icon="'mdi-checkbox-blank-circle-outline'"
                            color="#1B437C"
                            true-value="True"
                            v-model="formUpdate.checkDeposit"
                            @change="formUpdate.amountDeposit = 0"
                          ></v-checkbox>
                          </v-col>
                           <v-col style="display: flex;justify-content: center;">
                            <v-checkbox
                            label="แจ้งยอดค่าชำระ"
                            :on-icon="'mdi-check-circle'"
                            :off-icon="'mdi-checkbox-blank-circle-outline'"
                            false-value="False"
                            color="#1B437C"
                            true-value="True"
                            v-model="formUpdate.checkPayment"
                          ></v-checkbox>
                          </v-col>
                          <v-col style="display: flex;justify-content: center;">
                            <v-checkbox
                            label="ป้องกันการจองซ้ำ / วัน"
                            false-value="False"
                            :on-icon="'mdi-check-circle'"
                            :off-icon="'mdi-checkbox-blank-circle-outline'"
                            color="#1B437C"
                            true-value="True"
                            v-model="formUpdate.repeatBooking"
                          ></v-checkbox>
                          </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="pb-0 pt-0">
                          <v-select
                            v-if="formUpdate.checkDeposit === 'True'"
                            v-model="formUpdate.depositTime"
                            :items="depositTimeItem"
                            label="ชำระเงินมัดจำภายในกี่นาที"
                            outlined
                            dense
                          ></v-select>
                          <v-text-field
                          v-if="formUpdate.checkDeposit === 'True'"
                            v-model="formUpdate.promptPayName"
                            label="ชื่อบัญชีพร้อมเพย์"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field
                          v-if="formUpdate.checkDeposit === 'True'"
                            v-model="formUpdate.promptPayID"
                            label="หมายเลขพร้อมเพย์"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <VuetifyMoney
                            v-if="formUpdate.checkDeposit === 'True'"
                            label="จำนวนเงินมัดจำ"
                            v-model="formUpdate.amountDeposit"
                            required
                            :rules="[rules.required]"
                            outlined
                            dense
                            v-bind:options="options2" />
                        </v-col>
                        <v-col
                          cols="12"
                        >
                          <v-textarea
                            outlined
                            v-model="formUpdate.remarkConfirm"
                            label="หมายเหตุการยืนยันนัดหมาย"
                          ></v-textarea>
                        </v-col>
                        <!-- สำหรับ ธุรกิจรถยนต์ -->
                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              เพิ่มช่องกรอกข้อมูล
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-col cols="12">
                              <v-row style="height: 50px">
                                <v-btn
                                  color="primary"
                                  dark
                                  x-small
                                  @click="
                                    (dialogEditField = true),
                                      (editedItem2.fieldName = ''),
                                      (editedItem2.fieldId = '')
                                  "
                                  class="mb-2"
                                >
                                  เพิ่ม ช่องกรอกข้อมูล
                                </v-btn>
                              </v-row>
                              <v-row>
                                <v-data-table
                                  dense
                                  :headers="headers"
                                  :items="desserts"
                                  hide-default-footer
                                  class="elevation-1 custom_table_class"
                                >
                                  <template v-slot:[`item.actions`]="{ item }">
                                    <v-icon
                                      small
                                      color="#7F87A7"
                                      @click="deleteItem(item)"
                                    >
                                      mdi-delete
                                    </v-icon>
                                  </template>
                                  <template v-slot:[`item.showCard`]="{ item }">
                                    <v-checkbox
                                      false-value="False"
                                      true-value="True"
                                      v-model="item.showCard"
                                    ></v-checkbox>
                                  </template>
                                </v-data-table>
                                <v-dialog
                                  v-model="dialogEditField"
                                  max-width="500px"
                                >
                                  <v-card>
                                    <v-card-text>
                                      <v-container>
                                        <v-row>
                                          <v-col cols="12">
                                            <center>
                                              <v-col>
                                                <v-img
                                                  id="v-img-fieldName"
                                                  :src="
                                                    require('@/assets/maintenance.png')
                                                  "
                                                ></v-img>
                                              </v-col>
                                            </center>
                                            <v-row style="height: 35px">
                                              <v-subheader id="subtext"
                                                >ช่องกรอกข้อมูล</v-subheader
                                              >
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
                                        dark
                                        @click="dialogEditField = false"
                                      >
                                        ยกเลิก
                                      </v-btn>
                                      <v-btn
                                        color="#173053"
                                        dark
                                        @click="save(editedItem2)"
                                      >
                                        บันทึกข้อมูล
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </v-row>
                            </v-col>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                        <v-col id="margin">
                          <v-row>
                            <v-btn
                              dark
                              elevation="2"
                              large
                              block
                              color="#173053"
                              :disabled="!validUpdate"
                              @click="editData()"
                            >
                              <v-icon left>mdi-checkbox-marked-circle</v-icon>
                              บันทึกข้อมูล
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
          <v-dialog v-model="dialogDelete" max-width="45%">
            <v-card>
              <v-card-text class="pa-0 px-4">
                <v-container>
                  <v-row>
                      <v-col cols="10" class="text-left pt-10">
                      <h3><strong>ลบรายการนี้</strong></h3>
                      </v-col>
                      <v-col cols="2" class="pt-10">
                      <div style="text-align: end;">
                          <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="dialogDelete = false"
                          >
                          X
                          </v-btn>
                      </div>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-row >
                        <v-text-field
                          dense
                          outlined
                          label="ชื่อประเภทบริการ"
                          v-model="formUpdate.flowName"
                          readonly
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-col class="text-center">
                <v-btn
                  dark
                  elevation="2"
                  block
                  large
                  color="#173053"
                  @click="deleteData()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  ลบ
                </v-btn>
              </v-col>
            </v-card>
          </v-dialog>
          <!-- end delete -->

          <!-- set condition -->
          <v-dialog v-model="dialogCondition" max-width="60%" persistent>
            <v-card>
              <v-card-text v-if="dataConditionReady">
                <v-container>
                  <v-row>
                      <v-col cols="10" class="text-left pt-10">
                      <h3><strong>เงื่อนไขการให้บริการ</strong></h3>
                      </v-col>
                      <v-col cols="2" class="pt-10">
                      <div style="text-align: end;">
                          <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="dialogCondition = false, clearCondition()"
                          >
                          X
                          </v-btn>
                      </div>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" class="pb-0">
                      <v-row>
                      <v-select
                        v-model="dataCountCondition"
                        :items="itemCountCondition"
                        label="เลือกจำนวนเงื่อนไข"
                        outlined
                        dense
                        @change="fixCountCondition()"
                      ></v-select>
                      </v-row>
                    </v-col>
                    <v-col cols="6" class="pb-0">
                      <v-row>
                      <v-checkbox
                        false-value="ไม่แสดง"
                        true-value="แสดง"
                        v-model="showCondition"
                        hide-details
                        class="shrink ml-6 mr-0 mt-0 mb-6"
                      ></v-checkbox>
                      <v-text-field v-model="showCondition" dense outlined readonly label="แสดงเงื่อนไข หรือไม่"></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-form ref="form_condition" v-model="validCondition" lazy-validation>
                  <v-row>
                    <v-col cols="12" class="pb-0" v-if="dataCondition.length > 0">
                      <div v-for="(item, index) in dataCondition" :key="index">
                       <v-card>
                          <v-container>
                            <v-card-text>
                              <v-row>
                                <v-col cols="12" class="pb-0">
                                  <v-img
                                    v-if="item.image !== ''"
                                    aspect-ratio="6"
                                    contain
                                    :src="item.image"
                                  ></v-img>
                                  <!-- <v-avatar size="100px"><img alt="Avatar" :src="formAdd.pictureUrl"></v-avatar> -->
                                  <br />
                                  <v-file-input
                                    required
                                    counter
                                    show-size
                                    :rules="[rules.resizeImag]"
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    label="รูปภาพ"
                                    v-model="item.files"
                                    @change="selectImg(item)"
                                  ></v-file-input>
                                </v-col>
                                <v-col cols="12" class="pb-0">
                                  <v-textarea
                                    v-model="item.text"
                                    auto-grow
                                    row="1"
                                    label="รายละเอียด"
                                    outlined
                                    dense
                                    :rules="[rules.required]"
                                  ></v-textarea>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-container>
                       </v-card>
                       <br>
                       </div>
                    </v-col>
                  </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-col class="text-center" v-if="dataConditionReady">
                <v-spacer></v-spacer>
                <v-btn
                  class="text-white"
                  elevation="2"
                  block
                  large
                  :disabled="!validCondition"
                  color="#1B437C"
                  @click="addDataCondition()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  บันทึกข้อมูล
                </v-btn>
              </v-col>
              <v-card-text v-if="!dataConditionReady">
                <div class="text-center">
                  <waitingAlert></waitingAlert>
                  </div>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- end condition -->

        <!-- dialog limitbookint -->
        <v-dialog v-model="dialoglimitbooking" max-width="70%" persistent >
          <v-card min-width="400px" min-height="500px" class="pa-1 " color="#F4F4F4">
              <v-card-text>
                <v-container>
                  <v-row>
                      <v-col cols="10" class="text-left pt-10">
                      <h3><strong>ตั้งค่าวันหยุด / ตั้งจัดการเวลา</strong></h3>
                      </v-col>
                      <v-col cols="2" class="pt-10">
                      <div style="text-align: end;">
                          <v-btn
                          class="mx-2"
                          fab
                          small
                          dark
                          color="white"
                          :style="styleCloseBt"
                          @click="dialoglimitbooking = false, clearLimit()"
                          >
                          X
                          </v-btn>
                      </div>
                      </v-col>
                  </v-row>
                  <v-form
                     ref="form_update"
                    v-model="valid_update"
                    lazy-validation
                  >
                  <v-row style="justify-content: space-between;">
                  <v-col cols="4">
                    <v-row>
                      <v-col cols="12">
                        <v-card class="pa-3" >
                          <!-- <strong class="font-weight-bold">วันหยุดทั่วไปของบริษัท</strong> -->
                          <h4 class="font-weight-bold">วันหยุดทั่วไปของบริษัท</h4>
                          <v-select
                          class="mt-3"
                          v-model="formUpdateLimitbooking.dateDayoffText"
                          :items="itemDateStop"
                          small-chips
                          dense
                          label="เลือกวันหยุด"
                          multiple
                          outlined
                          @change="changedateDayoff()"
                        ></v-select>
                        </v-card>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-card class="pa-6">
                              <!-- <strong class="font-weight-bold">วันหยุดประจำปีของบริษัท </strong> -->
                              <h4 class="font-weight-bold mt-n2 ml-n2">วันหยุดประจำปีของบริษัท</h4>
                              <v-select
                              class="ma-0 mt-5"
                                v-model="formUpdateLimitbooking.typeDayCustom"
                                :item-text="typeDayCustomitem.text"
                                :items="typeDayCustomitem"
                                label="ประเภทของวันหยุด"
                                dense
                                outlined
                              ></v-select>
                              <v-date-picker
                                v-model="formUpdateLimitbooking.dateDayCustom"
                                :allowed-dates="allowedDates"
                                multiple
                                elevation="1"
                                full-width
                                class="mt-0"
                              ></v-date-picker>
                        </v-card>
                      </v-col>
                    </v-row>
                    </v-col>
                    <v-divider
                    class="mx-4"
                      vertical
                    ></v-divider>
      <v-col cols="7">
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
                      <!-- <v-card class="pa-5 mb-5">
                    <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="แสดงเวลา"
                        v-model="timeText"
                        :counter="50"
                        maxlength="50"
                        outlined

                      ></v-text-field>
                      <v-text-field
                          v-model="formUpdateLimitbooking.time"
                           v-mask="'##:##'"
                           label="ตั้งค่าเวลาที่ต้องการ"
                           placeholder="HH:mm"
                           outlined
                      ></v-text-field>
                      <VuetifyMoney
                          label="Limit Booking"
                          v-model="formUpdateLimitbooking.limitBooking"
                          placeholder="Limit Booking"
                          required
                          outlined
                          v-bind:options="options2" />
                      <v-select
                        v-if="dataItemAddTime.length > 0"
                        :items="dataItemAddTime"
                        label="ตัวอย่างการแสดงเวลา"
                        item-text="text"
                        item-value="text"
                        outlined
                      ></v-select>
                      <v-btn
                        block
                        color="teal"
                        elevation="2"
                        rounded
                        small
                        dark
                        @click="presetTime()"
                      >
                        แบบร่าง เวลา
                      </v-btn>
                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        v-if="typeTimeAdd === 'add'"
                        color="indigo"
                        @click="addDataTimeAdd()"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        v-if="typeTimeAdd === 'update'"
                        color="question"
                        @click="UpdateDataTimeAdd()"
                      >
                        <v-icon dark>
                          mdi-tools
                        </v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="7">
                      <v-row align="center" class="ma-5">
                        <v-checkbox
                          @click="chekshowTime()"
                          false-value="False"
                          true-value="True"
                          label="ตั้ง Limit การนัดหมาย"
                          v-model="formUpdateLimitbooking.limitBookingCheck"
                          hide-details
                          class="shrink ml-6 mr-0 mt-0 mb-2"
                        ></v-checkbox>
                         </v-row>
                      <v-data-table
                        :headers="columnsAddTime"
                        :items="dataItemAddTime"
                        disable-pagination
                        hide-default-footer
                      >
                        <template v-slot:[`item.actions2`]="{ item, index }">
                          <v-btn
                            color="question"
                            fab
                            dark
                            x-small
                            @click.stop="getUpdateAdd(item, 'update', index)"
                          >
                            <v-icon color="#FFFFFF"> mdi-tools </v-icon>
                          </v-btn>
                          <v-btn
                            color="red"
                            dark
                            fab
                            x-small
                            @click.stop="getUpdateAdd(item, 'delete', index)"
                          >
                            <v-icon> mdi-delete </v-icon>
                          </v-btn>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                      </v-card> -->
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
                >
                  <template v-slot:[`item.CREATE_DATE`]="{ item }">
                    {{ format_dateFUllTime(item.CREATE_DATE) }}
                  </template>
                  <template v-slot:[`item.LAST_DATE`]="{ item }">
                    {{ format_dateFUllTime(item.LAST_DATE) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <template v-if="$session.getAll().data.timeSlotStatus === 'True'">
                      <v-btn
                      color="question"
                      fab
                      dark
                      small
                      @click.stop="
                        (dialogEdit = true),
                          getDataById(item),
                          validate('UPDATE')
                      "
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
                    <template v-else>
                    <v-btn
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
                      color="info"
                      fab
                      small
                      @click="
                          getCondition(item)
                      "
                    >
                      <v-icon color="#FFFFFF"> mdi-clipboard-text-search </v-icon>
                    </v-btn>
                    <v-btn
                      color="#4CAF50"
                      fab
                      small
                      @click="
                        (dialogStep = true),
                          getDataById(item),
                          getStepFlow(item)
                      "
                    >
                      <v-icon color="#FFFFFF"> mdi-debug-step-over </v-icon>
                    </v-btn>
                    <v-btn
                      color="question"
                      fab
                      dark
                      small
                      @click.stop="
                        (dialogEdit = true),
                          getDataById(item),
                          validate('UPDATE')
                      "
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
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
            <div v-if="!dataReady" class="text-center">
              <waitingAlert></waitingAlert>
            </div>
          </v-col>
          <!-- end data table -->
        </v-row>
      </div>
    </v-main>
  </div>
</template>
<script>
import waitingAlert from '../waitingAlert.vue'
import axios from 'axios' // api
import adminLeftMenu from '../Sidebar.vue' // เมนู
import VuetifyMoney from '../VuetifyMoney.vue'

export default {
  components: {
    waitingAlert,
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
      valid_update: true,
      BookingFieldshowtime: null,
      formUpdateLimitbooking: {
        flowId: null,
        time: '',
        setTime: '',
        limitBooking: 0,
        limitBookingCheck: 'Fales',
        shopId: this.$session.getAll().data.shopId,
        dateDayoffText: [],
        dateDayoffValue: [],
        dateDayCustom: [],
        typeDayCustom: ''
      },
      typeDayCustomitem: [
        {
          text: 'วันที่เปิด',
          value: 'on'
        },
        {
          text: 'วันที่ปิด',
          value: 'off'
        }
      ],
      itemDateStop: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'],
      itemDateStopValue: [0, 1, 2, 3, 4, 5, 6],
      typeTimeAdd: 'add',
      timeText: '',
      indexTimeAdd: 0,
      dataItemAddTime: [],
      columnsAddTime: [
        { text: 'แสดงเวลา', value: 'text' },
        { text: 'เวลา', value: 'value' },
        { text: 'จำนวนนัดหมาย', value: 'limitBooking', align: 'center', width: '200px' },
        // { text: 'เรียงตำแหน่ง', value: 'actions1', align: 'center' },
        { text: 'จัดการเวลา', value: 'actions2', align: 'center', width: '100px' }
      ],
      flowId: '',
      dataCondition: [],
      oldDataCondition: [],
      showCondition: 'ไม่แสดง',
      dataCountCondition: '',
      oldDataCountCondition: '',
      itemCountCondition: [
        {text: '1', value: 1},
        {text: '2', value: 2},
        {text: '3', value: 3},
        {text: '4', value: 4},
        {text: '5', value: 5}
      ],
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
          text: 'เพิ่ม/ลบ สถานะการบริการ',
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
      dataConditionReady: true,
      canvas: true,
      dateTime: '', // Generate DateTime
      date: this.momenDate_1(new Date()),
      menu: false,
      menu2: false,
      menu3: false,
      menu4: false,
      // Dialog Config ADD EDIT DELETE IMPORT
      dialoglimitbooking: false,
      dialogAddField: false,
      dialogEditField: false,
      dialogAdd: false,
      dialogEdit: false,
      dialogDeleteF: false,
      dialogDelete: false,
      dialogImport: false,
      dialogStep: false,
      dialogAddStepTitle: false,
      dialogEditStep: false,
      dialogDeleteStepTitle: false,
      dialogCondition: false,
      // END Dialog Config ADD EDIT DELETE
      panel: [0],
      panel1: [1],
      session: this.$session.getAll(),
      shopId: this.$session.getAll().data.shopId,
      // Search All
      searchAll: '',
      searchAll2: '',
      depositTimeItem: [
        { text: 'ไม่จำกัดเวลามัดจำ', value: 'NO' },
        { text: '10 นาที', value: '10' },
        { text: 'ครึ่งชั่วโมง', value: '30' },
        { text: '1 ชั่วโมง', value: '60' },
        { text: '6 ชั่วโมง', value: '360' },
        { text: '1 วัน', value: '1,440' }
      ],
      formAdd: {
        flowCode: '',
        flowId: '',
        flowName: '',
        flowNameEn: '',
        flowfieldName: [],
        CREATE_USER: '',
        LAST_USER: '',
        checkPayment: 'True',
        checkOnsite: 'False',
        checkDeposit: 'False',
        repeatBooking: 'False',
        depositTime: 'NO',
        promptPayID: null,
        promptPayName: null,
        amountDeposit: 0,
        shopId: this.$session.getAll().data.shopId,
        remarkConfirm: '',
        timeSlotStatus: this.$session.getAll().data.timeSlotStatus || 'False',
        timeSlot: 1
      },
      formAddStep: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        finishTime: '',
        CREATE_USER: '',
        LAST_USER: '',
        shopId: '',
        sendCard: 'True'
      },
      formUpdateStep: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
        finishTime: '',
        LAST_USER: '',
        shopId: '',
        sendCard: ''
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
        flowNameEn: '',
        LAST_USER: '',
        checkPayment: 'True',
        checkOnsite: 'False',
        checkDeposit: 'False',
        repeatBooking: 'False',
        depositTime: '',
        amountDeposit: 0,
        promptPayID: null,
        promptPayName: null,
        shopId: '',
        remarkConfirm: '',
        timeSlotStatus: this.$session.getAll().data.timeSlotStatus || 'False',
        timeSlot: 1
      },
      formUpdateItemFlow: {
        fieldId: '',
        fieldName: '',
        flowfieldName: [],
        flowfieldId: '',
        fieldType: '',
        flowId: '',
        flowName: '',
        LAST_USER: '',
        sortNo: '',
        shopId: ''
      },
      formUpdateItem: {
        flowCode: '',
        fieldId: '',
        fieldName: '',
        flowfieldName: [],
        fieldType: '',
        flowId: '',
        flowName: '',
        flowNameEn: '',
        checkPayment: 'True',
        checkOnsite: 'False',
        LAST_USER: '',
        remarkConfirm: ''
      },
      columnsStep: [
        { text: 'AC', value: 'sendCard' },
        { text: 'ID', value: 'stepId' },
        { text: 'Title', value: 'stepTitle', align: 'center' },
        { text: 'เวลาที่คาดว่าจะเสร็จ', value: 'finishTime', align: 'center' },
        { text: ' ', value: 'actions2', sortable: false, align: 'center' },
        { text: 'Action', value: 'action', sortable: false, align: 'center' }
      ],
      sendCard: false,
      headers: [
        { text: 'แสดงข้อมูลในการ์ด', value: 'showCard', sortable: false, align: 'center' },
        { text: 'ข้อมูล', value: 'fieldName' },
        { text: 'ลบข้อมูล', value: 'actions', sortable: false }
      ],
      sortBy: false,
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
      // End Form Config ADD EDIT
      // Data Table Config
      columns: [
        // { text: 'ID', value: 'flowId' },
        { text: 'ชื่อบริการ', value: 'flowName' },
        // { text: 'Field', value: 'flowfieldName' },
        { text: 'วันที่สร้าง', value: 'CREATE_DATE' },
        { text: 'วันที่อัพเดท', value: 'LAST_DATE' },
        { text: 'จัดการประเภทบริการ', value: 'action', sortable: false, align: 'center' }
      ],
      dataItem: [],
      validAdd: true,
      validUpdate: true,
      validCondition: true,
      editedIndex: -1,
      checkOnsite: '',
      search: '',
      headersNew: [
        {
          text: 'Dessert (100g serving)',
          value: 'name',
          sortable: false
        },
        {
          text: 'Calories',
          value: 'calories',
          sortable: false
        },
        { text: 'Action', value: 'actions', sortable: false, align: 'center' }
      ],
      dessertsNew: [{
        id: 1,
        name: 'Frozen Yogurt',
        calories: 120
      },
      {
        id: 2,
        name: 'Ice cream sandwich',
        calories: 200
      }
      ],
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
      }
      // End Data Table Config
    }
  },
  async mounted () {
    this.dataReady = false
    // Get Data
    await this.getCustomField()
    await this.getDataGlobal(this.DNS_IP, this.path, this.session.data.shopId)
    await this.getBookingField()
  },
  methods: {
    async FunCopy (item) {
      let copyText = 'https://liff.line.me/1656581804-7KRQyqo5/stampStep?shopId=' + item.shopId + '&stepId=' + item.stepId + '&flowId=' + item.flowId
      // let copyText = document.getElementById('myInputDeposit')
      // copyText.select()
      // copyText.setSelectionRange(0, 99999)
      navigator.clipboard.writeText(copyText)
      this.$swal('เรียบร้อย', 'คัดลอกเพิ่อสร้าง QR Code สำเร็จ', 'success')
      this.dialogShowDeposit = false
    },
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
      let dd = []
      this.itemDateStop.forEach((v, k) => {
        // console.log('test', this.formUpdate.dateDayoffText.filter(item => item === v))
        if (this.formUpdateLimitbooking.dateDayoffText.filter(item => item === v).length > 0) {
          dd.push(k)
        }
      })
      let Dataitem = {
        'limitBookingCheck': this.formUpdateLimitbooking.limitBookingCheck,
        'setTime': JSON.stringify(this.dataItemAddTime),
        'dateDayoffText': JSON.stringify(this.formUpdateLimitbooking.dateDayoffText),
        'dateDayoffValue': JSON.stringify(dd),
        'dateDayCustom': JSON.stringify(this.formUpdateLimitbooking.dateDayCustom),
        'typeDayCustom': this.formUpdateLimitbooking.typeDayCustom
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
            .post(this.DNS_IP + '/flow/editData/' + this.formUpdateLimitbooking.flowId, Dataitem)
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
    async clearLimit () {
      this.timeText = ''
      this.formUpdateLimitbooking.setTime = ''
      this.formUpdateLimitbooking.limitBookingCheck = ''
      this.formUpdateLimitbooking.limitBooking = ''
      this.formUpdateLimitbooking.flowId = []
      this.typeTimeAdd = 'add'
      this.indexTimeAdd = 0
    },
    async getlimitbooking (item) {
      this.formUpdateLimitbooking.flowId = item.flowId
      // console.log('this.formUpdateLimitbooking.flowId', this.formUpdateLimitbooking.flowId)
      let dt = []
      await axios
        .get(this.DNS_IP + '/flow/get?flowId=' + item.flowId)
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            dt = rs
            console.log('rs', rs)
            this.formUpdateLimitbooking.limitBookingCheck = rs[0].limitBookingCheck || 'Fales'
            if (rs[0].dateDayoffText === null || rs[0].dateDayoffText === '') {
              this.formUpdateLimitbooking.dateDayoffText = []
            } else {
              this.formUpdateLimitbooking.dateDayoffText = JSON.parse(rs[0].dateDayoffText)
            }
            if (rs[0].dateDayCustom === null || rs[0].dateDayCustom === '') {
              this.formUpdateLimitbooking.dateDayCustom = []
            } else {
              this.formUpdateLimitbooking.dateDayCustom = JSON.parse(rs[0].dateDayCustom)
            }
            this.formUpdateLimitbooking.typeDayCustom = rs[0].typeDayCustom
            this.formUpdateLimitbooking.dateDayoffValue = rs[0].dateDayoffValue
            // console.log('this.formUpdateLimitbooking.setTime', rs[0].setTime)
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
    getUpdateAdd (item, text, index) {
      if (text === 'update') {
        this.formUpdateLimitbooking.time = item.value
        this.formUpdateLimitbooking.limitBooking = item.limitBooking
        this.timeText = item.text
        this.typeTimeAdd = text
        this.indexTimeAdd = index
      } else {
        this.dataItemAddTime.splice(index, 1)
        // console.log('this.dataItemAddTime', this.dataItemAddTime)
        // for (var i = 0; i < this.dataItemAddTime.length; i++) {
        //   var d = this.dataItemAddTime[i]
        //   d.sortNo = i + 1
        // }
        this.dataItemAddTime.sort(function (a, b) {
          return a.value.localeCompare(b.value)
        })
        this.typeTimeAdd = 'add'
      }
    },
    changedateDayoff () {
      let dd = []
      this.itemDateStop.forEach((v, k) => {
        // console.log('test', this.formUpdate.dateDayoffText.filter(item => item === v))
        if (this.formUpdateLimitbooking.dateDayoffText.filter(item => item === v).length > 0) {
          dd.push(k)
        }
      })
      this.formUpdateLimitbooking.dateDayoffValue = JSON.stringify(dd)
    },
    allowedDates (val) {
      // this.getMonth(this.pickerDate)
      if (this.formUpdateLimitbooking.dateDayoffValue !== null && this.formUpdateLimitbooking.dateDayoffValue.length > 0) {
        if (JSON.parse(this.formUpdateLimitbooking.dateDayoffValue).filter(el => { return el === new Date(val).getDay() }).length === 0) {
          return val
        }
      } else {
        return val
      }
    },
    UpdateDataTimeAdd () {
      if (this.formUpdateLimitbooking.time !== '' && this.timeText !== '') {
        var dataTime = this.formUpdateLimitbooking.time.split(':')
        var hh = dataTime[0]
        var mm = dataTime[1]
        console.log(dataTime)
        if (parseInt(hh) <= 24 && parseInt(mm) <= 59) {
          // let numhh = 100 + parseInt(hh)
          // let nummm = 100 + parseInt(mm)
          // let strhh = numhh.toString().substring(1, 3)
          // let strmm = nummm.toString().substring(1, 3)
          // if (this.dataItemAddTime.filter(el => { return el.value === strhh + ':' + strmm }).length > 0) {
          //   this.$swal('ผิดพลาด', 'เวลาที่ท่านเลือกมีอยู่ในรายการแล้ว', 'error')
          // } else {
          let numhh = 100 + parseInt(hh)
          let nummm = 100 + parseInt(mm)
          let strhh = numhh.toString().substring(1, 3)
          let strmm = nummm.toString().substring(1, 3)
          this.dataItemAddTime[this.indexTimeAdd].value = strhh + ':' + strmm
          this.dataItemAddTime[this.indexTimeAdd].text = this.timeText
          this.dataItemAddTime[this.indexTimeAdd].limitBooking = this.formUpdateLimitbooking.limitBooking
          this.typeTimeAdd = 'add'
          this.formUpdateLimitbooking.time = ''
          this.timeText = ''
          this.formUpdateLimitbooking.limitBooking = 0
          this.dataItemAddTime.sort(function (a, b) {
            return a.value.localeCompare(b.value)
          })
          // }
        } else {
          this.$swal('ผิดพลาด', 'กรุณาตรวจสอบเวลาให้ถูกต้อง', 'error')
        }
      } else {
        this.$swal('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบ', 'error')
      }
    },
    addDataTimeAdd () {
      if (this.formUpdateLimitbooking.time !== '' && this.timeText !== '') {
        var dataTime = this.formUpdateLimitbooking.time.split(':')
        var hh = dataTime[0]
        var mm = dataTime[1]
        console.log(dataTime)
        if (parseInt(hh) <= 24 && parseInt(mm) <= 59) {
          if (this.dataItemAddTime.length === 0) {
            // this.dataItemAddTime.push({value: this.formUpdateLimitbooking.time, text: this.formUpdateLimitbooking.time, sortNo: 1})
            let numhh = 100 + parseInt(hh)
            let nummm = 100 + parseInt(mm)
            let strhh = numhh.toString().substring(1, 3)
            let strmm = nummm.toString().substring(1, 3)
            this.dataItemAddTime.push({value: strhh + ':' + strmm, text: this.timeText, limitBooking: this.formUpdateLimitbooking.limitBooking})
          } else {
            // let numhh = 100 + parseInt(hh)
            // let nummm = 100 + parseInt(mm)
            // let strhh = numhh.toString().substring(1, 3)
            // let strmm = nummm.toString().substring(1, 3)
            // if (this.dataItemAddTime.filter(el => { return el.value === strhh + ':' + strmm }).length > 0) {
            //   this.$swal('ผิดพลาด', 'เวลาที่ท่านเลือกมีอยู่ในรายการแล้ว', 'error')
            // } else {
            let numhh = 100 + parseInt(hh)
            let nummm = 100 + parseInt(mm)
            let strhh = numhh.toString().substring(1, 3)
            let strmm = nummm.toString().substring(1, 3)
            this.dataItemAddTime.push({value: strhh + ':' + strmm, text: this.timeText, limitBooking: this.formUpdateLimitbooking.limitBooking})
            this.dataItemAddTime.sort(function (a, b) {
              return a.value.localeCompare(b.value)
            })
            // }
          }
        } else {
          this.$swal('ผิดพลาด', 'กรุณาตรวจสอบเวลาให้ถูกต้อง', 'error')
        }
      } else {
        this.$swal('ผิดพลาด', 'กรุณากรอกข้อมูลให้ครบ', 'error')
      }
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
    getCondition (item) {
      this.dataCondition = []
      // console.log(item.dataCondition.replace(/\n/g, '\\\\n').replace(/\r/g, '\\\\r').replace(/\t/g, '\\\\t'))
      // console.log('this.dataCondition', item.dataCondition)
      if (item.dataCondition === null) {
        this.dataCondition = []
      } else {
        this.dataCondition = JSON.parse(item.dataCondition.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t'))
      }
      this.dataCountCondition = item.countCondition || ''
      this.showCondition = item.showCondition || 'ไม่แสดง'
      // this.validate('CONDITION')
      this.oldDataCountCondition = item.countCondition || ''
      this.flowId = item.flowId
      this.dialogCondition = true
    },
    fixCountCondition () {
      if (this.dataCondition.length > 0) {
        if (this.dataCondition[0].image === '') {
          this.dataCondition = []
          for (let i = 0; i < this.dataCountCondition; i++) {
            this.dataCondition.push({id: i + 1, text: '', image: '', files: null})
          }
          this.validate('CONDITION')
        } else {
          console.log('oldDataCountCondition', this.oldDataCountCondition)
          console.log('dataCountCondition', this.dataCountCondition)
          if (this.oldDataCountCondition < this.dataCountCondition) {
            var sumCount = this.dataCountCondition - this.dataCondition.length
            console.log('sumCount', sumCount)
            for (let i = 0; i < sumCount; i++) {
              this.dataCondition.push({id: this.dataCondition.length + 1, text: '', image: '', files: null})
            }
            this.oldDataCountCondition = this.dataCondition.length
          } else {
            this.$swal({
              title: 'คุณต้องการจะลดจำนวน ใช่หรือไม่?',
              text: 'การลดจำนวนจะทำให้ข้อมูลที่ท่านกรอกหายไป',
              type: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#b3b1ab',
              confirmButtonText: 'ใช่',
              cancelButtonText: 'ไม่'
            })
              .then(async result => {
                this.oldDataCondition = this.dataCondition
                this.dataCondition = []
                for (let i = 0; i < this.dataCountCondition; i++) {
                  var d = this.oldDataCondition[i]
                  this.dataCondition.push(d)
                }
                this.oldDataCountCondition = this.dataCondition.length
              })
              .catch(error => {
                console.log('error function addData : ', error)
              })
          }
          this.validate('CONDITION')
        }
      } else {
        this.dataCondition = []
        for (let i = 0; i < this.dataCountCondition; i++) {
          this.dataCondition.push({id: i + 1, text: '', image: '', files: null})
        }
        this.validate('CONDITION')
      }
    },
    selectImg (item) {
      if (item.files) {
        item.image = URL.createObjectURL(
          item.files
        )
      } else {
        item.image = ''
      }
      // console.log(event)
    },
    async addDataCondition () {
      console.log('dataCondition', this.dataCondition)
      console.log('dataCountCondition', this.dataCountCondition)
      if (this.dataCountCondition !== '') {
        if (this.dataCondition.filter(el => { return el.image === '' }).length === 0) {
          this.dataConditionReady = false
          let dataUse = []
          if (this.dataCondition.length > 0) {
            for (let i = 0; i < this.dataCondition.length; i++) {
              let d = this.dataCondition[i]
              let s = {}
              s.id = d.id
              s.text = d.text
              if (d.files !== undefined) {
                console.log('image')
                let params = new FormData()
                params.append('file', d.files)
                await axios
                  .post(this.DNS_IP + `/file/upload/flowCondition`, params)
                  .then(function (response) {
                    s.image = response.data
                  // console.log('url Pic', response.data)
                  })
                dataUse.push(s)
              } else {
                s.image = d.image
                dataUse.push(s)
              }
            }
            let dt = {
              countCondition: this.dataCountCondition,
              showCondition: this.showCondition,
              dataCondition: JSON.stringify(dataUse)
            }
            await axios
              .post(
              // eslint-disable-next-line quotes
                this.DNS_IP + this.path + "editData/" + this.flowId,
                dt
              )
              .then(async response => {
                await this.getDataGlobal(
                  this.DNS_IP,
                  this.path,
                  this.session.data.shopId
                )
                this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
                this.clearCondition()
              })
          }
        } else {
          this.$swal('ผิดพลาด', 'กรุณาใส่รูปภาพให้ครบ', 'error')
          this.dataConditionReady = true
        }
      } else {
        this.$swal('ผิดพลาด', 'เลือกจำนวนเงื่อนไข', 'error')
      }
    },
    clearCondition () {
      this.flowId = ''
      this.dataCondition = []
      this.oldDataCondition = []
      this.showCondition = 'ไม่แสดง'
      this.dataCountCondition = ''
      this.oldDataCountCondition = ''
      this.dataConditionReady = true
      this.dialogCondition = false
    },
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
          this.DNS_IP + "/flowStep/" + "updateAction",
          newArray,
          {
            headers: {
              'Application-Key': this.$session.getAll().ApplicationKey
            }
          }
        )
        .then(async response => {
          // Debug response
          console.log('addDataGlobal DNS_IP + PATH + "add"', response)
          this.getStepFlow(flowId)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log('error function addDataGlobal : ', error)
          this.dataReady = true
        })
    },
    async updateSendCard () {
      console.log('updateSendCard')
      console.log('SendCard', this.sendCard)
    },
    async getCustomField (chkForm, data) {
      this.editedItemSelete = []
      axios
        .get(this.DNS_IP + '/customField/get?shopId=' + this.shopId)
        .then(async response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.fieldName
              d.value = d.fieldId
              d.showCard = d.showCard
              if (chkForm === 'edit') {
                var chkDup = await data.filter(function (el) {
                  return el.fieldName === d.fieldName
                })
                console.log('chkDup', chkDup)
                if (chkDup.length === 0) {
                  this.editedItemSelete.push(d)
                }
              } else {
                this.editedItemSelete.push(d)
              }
            }
            console.log('this.formUpdate', data)
            console.log('this.editedItemSelete', this.editedItemSelete)
          }
        })
    },
    deleteItem (item) {
      console.log('item', item)
      var itemUseValue = ''
      var itemUseText = ''
      var itemUse = {}
      if (item.fieldId) {
        itemUseValue = item.fieldId
        itemUseText = item.fieldName
        itemUse = item
      } else {
        itemUseValue = item.fieldName.fieldId
        itemUseText = item.fieldName.fieldName
        itemUse = item.fieldName
      }
      this.$swal({
        title: 'ต้องการ ลบข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          this.editedItemSelete.push({
            text: itemUseText,
            value: itemUseValue
          })
          var x = this.desserts.indexOf(itemUse)
          this.$delete(this.desserts, x)
          // var dessert = this.desserts.filter(value => value.fieldId !== itemUseValue)
          // this.desserts = dessert
          console.log('itemUseValue', itemUseValue)
          console.log('itemUseText', itemUseText)
          console.log('desserts', this.desserts)
        })
    },
    save (item) {
      if (this.editedItemSelete.length > 0) {
        console.log('item', item)
        var itemUseValue = ''
        var itemUseText = ''
        var itemUse = {}
        if (item.value) {
          itemUseValue = item.value
          itemUseText = item.text
          itemUse = item
        } else {
          itemUseValue = item.fieldName.value
          itemUseText = item.fieldName.text
          itemUse = item.fieldName
        }
        this.desserts.push({
          fieldId: itemUseValue,
          fieldName: itemUseText,
          showCard: 'False'
        })
        var x = this.editedItemSelete.indexOf(itemUse)
        this.$delete(this.editedItemSelete, x)
        this.dialogAddField = false
        this.dialogEditField = false
      } else {
        this.$swal('ผิดพลาด', 'เนื่องจากไม่มี ช่องกรอกข้อมูล ที่จะให้เพิ่มแล้ว กรุณาตรวจสอบคว่มถูกต้อง', 'error')
        this.dialogAddField = false
        this.dialogEditField = false
      }
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
        case 'CONDITION':
          this.$nextTick(() => {
            let self = this
            self.$refs.form_condition.validate()
          })
          break

        default:
          break
      }
    },
    getStepFlow (dt) {
      this.stepItemSelete = []
      this.formAddStep.flowId = dt.flowId
      axios
        .get(
          this.DNS_IP +
            '/flowStep/get?flowId=' +
            dt.flowId +
            '&shopId=' +
            this.shopId
        )
        .then(response => {
          let rs = response.data
          if (rs.length > 0) {
            for (var i = 0; i < rs.length; i++) {
              var d = rs[i]
              d.text = d.stepTitle
              d.value = d.stepTitle
              d.sendCard = d.sendCard || 'False'
              this.stepItemSelete.push(d)
              this.formUpdateStep.stepTitle = response.data.stepTitle
            }
            console.log('this.stepItemSelete', JSON.stringify(this.stepItemSelete))
          }
        })
    },
    getField (dt) {
      console.log(dt)
      this.desserts = []
      axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + "/flow/getCustomfield",
          dt
        )
        .then(response => {
          let rs = response.data
          console.log(rs)
          if (rs.length > 0) {
            this.desserts = response.data
          }
        })
    },
    async getUpdate (item) {
      console.log('อันแรก', this.formUpdateStep)
      console.log('อันสอง', item)
      this.formUpdateStep.stepId = item.stepId
      this.formUpdateStep.flowId = item.flowId
      this.formUpdateStep.stepTitle = item.stepTitle
      this.formUpdateStep.finishTime = item.finishTime
    },
    async getDataById (item) {
      this.editedItemSelete = []
      this.desserts = []
      this.dataReady = false
      this.PK = item.flowCode
      this.formUpdate.checkOnsite = item.checkOnsite || 'False'
      this.formUpdate.repeatBooking = item.repeatBooking || 'False'
      console.log('item: ', item)
      this.checkOnsite = item.checkOnsite || 'False'
      this.formUpdate.flowName = item.flowName
      this.formUpdate.flowNameEn = item.flowNameEn
      this.formUpdate.flowId = item.flowId
      this.formUpdate.flowCode = item.flowCode
      this.formUpdate.amountDeposit = item.amountDeposit || 0
      this.formUpdate.checkPayment = item.checkPayment || 'True'
      this.formUpdate.checkDeposit = item.checkDeposit || 'False'

      this.formUpdate.timeSlot = item.timeSlot || 1
      this.formUpdate.timeSlotStatus = this.$session.getAll().data.timeSlotStatus || 'False'

      this.formUpdate.promptPayID = item.promptPayID || ''
      this.formUpdate.promptPayName = item.promptPayName || ''
      this.formUpdate.remarkConfirm = item.remarkConfirm || ''
      this.formUpdate.depositTime = item.depositTime || 'NO'
      this.shopId = this.$session.getAll().data.shopId
      this.fieldType = this.formUpdate.fieldType
      // this.desserts = JSON.parse(response.data[0].flowfieldName)
      await this.getField(JSON.parse(item.flowfieldName))
      // this.getDataCompany()
      this.getCustomField('edit', JSON.parse(item.flowfieldName))
      // this.getStepTitle(this.formUpdateStep.stepTitle)
      this.dataReady = true
      console.log(this.formUpdate)
    },
    async addData () {
      this.dataReady = false
      // this.formAdd.flowCode = this.generateCodeGlobal()
      this.formAdd.CREATE_USER = this.session.data.userName
      this.formAdd.LAST_USER = this.session.data.userName
      this.formAdd.flowCode = this.generateCodeGlobal()
      this.formAdd.flowfieldName = JSON.stringify(this.desserts)
      this.formAdd.shopId = this.$session.getAll().data.shopId
      this.$swal({
        title: 'ต้องการ เพิ่มข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          this.formAdd.CREATE_USER = this.session.data.userName
          this.formAdd.LAST_USER = this.session.data.userName
          this.formAdd.flowCode = this.generateCodeGlobal()
          this.formAdd.flowfieldName = JSON.stringify(this.desserts)
          console.log('flowfieldName', this.formAdd.flowfieldName)
          console.log('shopId', this.shopId)
          console.log('forAdd', this.formAdd)
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + this.path + "add",
              this.formAdd
            )
            .then(async response => {
              // Debug response
              console.log('addDataGlobal DNS_IP + PATH + "add"', response)
              // Close Dialog
              this.dialogAdd = false

              // Load Data
              await this.getDataGlobal(
                this.DNS_IP,
                this.path,
                this.session.data.shopId
              )
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
              this.clearData()
            })
            // eslint-disable-next-line handle-callback-err
            .catch(error => {
              console.log('error function addDataGlobal : ', error)
              this.dataReady = true
            })
        })
        .catch(error => {
          console.log('error function addData : ', error)
          this.dataReady = true
        })
    },
    async addDataStep () {
      this.dataReady = false
      console.log('forAdd', this.formAddStep)
      this.$swal({
        title: 'ต้องการ เพิ่มข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          this.formAddStep.CREATE_USER = this.session.data.userName
          this.formAddStep.LAST_USER = this.session.data.userName
          delete this.formAddStep['stepId']
          this.formAddStep.sortNo = this.stepItemSelete.length + 1
          this.formAddStep.shopId = this.shopId
          console.log('stepTitle', this.formAddStep.stepTitle)
          console.log('stepId', this.formAddStep.stepId)
          console.log('shopId', this.shopId)
          console.log('formAddStep', this.formAddStep)
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/flowStep/" + "add",
              this.formAddStep
            )
            .then(async response => {
              // Debug response
              console.log('addDataGlobal DNS_IP + PATH + "add"', response)
              // Close Dialog
              this.dialogAddStepTitle = false
              this.dataReady = true
              this.getStepFlow(this.formAddStep)
              this.formAddStep.stepTitle = ''
              this.formAddStep.finishTime = ''

              // Load Data
              await this.getDataGlobal(
                this.DNS_IP,
                this.path,
                this.session.data.shopId
              )
              this.$swal('เรียบร้อย', 'เพิ่มข้อมูล เรียบร้อย', 'success')
            })
            // eslint-disable-next-line handle-callback-err
            .catch(error => {
              console.log('error function addDataGlobal : ', error)
              this.dataReady = true
            })
        })
        .catch(error => {
          console.log('error function addDataStep : ', error)
          this.dataReady = true
        })
    },
    async editData () {
      console.log('this.formUpdate', this.formUpdate)
      let fieldId = []
      for (let i = 0; i < this.desserts.length; i++) {
        let d = this.desserts[i]
        let s = {}
        s.fieldId = d.fieldId
        fieldId.push(s)
      }
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
        .then(async result => {
          this.formUpdate.LAST_USER = this.session.data.userName
          this.formUpdate.flowfieldName = JSON.stringify(fieldId)
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
            .then(async response => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              // Close Dialog
              this.dialogEdit = false
              for (let i = 0; i < this.desserts.length; i++) {
                let d = this.desserts[i]
                let showcarditem = {}
                if (
                  d.showCard === undefined ||
                  d.showCard === '' ||
                  d.showCard === null ||
                  d.showCard === 'False'
                ) {
                  showcarditem.showCard = 'False'
                  console.log('1')
                } else {
                  showcarditem.showCard = d.showCard
                  console.log('2')
                }
                axios
                  .post(
                    this.DNS_IP + '/customField/edit/' + d.fieldId,
                    showcarditem
                  )
                  .then(response => {})
                  .catch(error => {
                    console.log('error function addData : ', error)
                  })
              }
              // Load Data
              await this.getDataGlobal(
                this.DNS_IP,
                this.path,
                this.session.data.shopId
              )
              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
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
    async editDataStepTitle () {
      console.log('stepItemSelete', this.stepItemSelete)
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
        .then(async result => {
          console.log('formUpdateStep', this.formUpdateStep)
          console.log('shopId', this.shopId)
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/flowStep/" + "editStep",
              this.stepItemSelete,
              {
                headers: {
                  'Application-Key': this.$session.getAll().ApplicationKey
                }
              }
            )
            .then(async response => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              this.dialogStep = false
              await this.getDataGlobal(
                this.DNS_IP,
                this.path,
                this.session.data.shopId
              )
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
        .then(async result => {
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
            .then(async response => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              this.dialogDelete = false
              await this.getDataGlobal(
                this.DNS_IP,
                this.path,
                this.session.data.shopId
              )
              this.$swal('เรียบร้อย', 'ลบข้อมูล เรียบร้อย', 'success')
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
    async UpdateworkShoplayout (ID) {
      console.log('UpdateworkShoplayout', ID)
      await axios
        .post(
          // eslint-disable-next-line quotes
          this.DNS_IP + '/WorkShopLayout/DeleteStep/' + ID
        )
        .then(async response => {
          // Debug response
          console.log('WorkShopLayoutSucces')
        })
      // eslint-disable-next-line handle-callback-err
        .catch(error => {
          console.log('error function editDataGlobal : ', error)
        })
    },
    async deleteStepTitle () {
      console.log('stepId', this.formUpdateStep.stepId)
      let workShopId = this.formUpdateStep.stepId
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
        .then(async result => {
          this.formUpdateStep.LAST_USER = this.session.data.userName
          var ID = this.formUpdateStep.stepId
          await this.UpdateworkShoplayout(workShopId)
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/flowStep/" + "delete/" + ID,
              this.formUpdateStep,
              {
                headers: {
                  'Application-Key': this.$session.getAll().ApplicationKey
                }
              }
            )
            .then(async response => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              console.log('flowid', this.formUpdateStep.flowId)
              this.$swal('เรียบร้อย', 'ลบข้อมูล เรียบร้อย', 'success')
              // await this.UpdateworkShoplayout(workShopId)
              this.dialogDeleteStepTitle = false
              await this.getStepFlow({ flowId: this.formUpdateStep.flowId })
              await this.getDataGlobal(
                this.DNS_IP,
                this.path,
                this.session.data.shopId
              )
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
    async editStepTitle () {
      this.$swal({
        title: 'ต้องการ แก้ไขข้อมูล ใช่หรือไม่?',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#b3b1ab',
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่'
      })
        .then(async result => {
          this.formUpdateStep.LAST_USER = this.session.data.userName
          let ID = this.formUpdateStep.stepId
          let dt = {
            stepTitle: this.formUpdateStep.stepTitle,
            finishTime: this.formUpdateStep.finishTime,
            LAST_USER: this.formUpdateStep.LAST_USER
          }
          await axios
            .post(
              // eslint-disable-next-line quotes
              this.DNS_IP + "/flowStep/" + "edit/" + ID,
              dt
            )
            .then(async response => {
              // Debug response
              console.log('editDataGlobal DNS_IP + PATH + "edit"', response)
              // Close Dialog
              // Load Data
              this.$swal('เรียบร้อย', 'แก้ไขข้อมูล เรียบร้อย', 'success')
              this.dialogEditStep = false
              await this.getStepFlow({ flowId: this.formUpdateStep.flowId })
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
      // eslint-disable-next-line no-redeclare
      for (var key in this.formAdd) {
        if (this.formAdd[key]) {
          if (key === 'depositTime') {
            this.formAdd[key] = 'NO'
          } else if (key === 'flowfieldName') {
            this.formAdd[key] = []
          } else if (key === 'checkPayment') {
            this.formAdd[key] = 'True'
          } else if (key === 'checkOnsite') {
            this.formAdd[key] = 'False'
          } else if (key === 'checkDeposit') {
            this.formAdd[key] = 'False'
          } else if (key === 'repeatBooking') {
            this.formAdd[key] = 'False'
          } else if (key === 'amountDeposit') {
            this.formAdd[key] = 0
          } else if (key === 'promptPayID') {
            this.formAdd[key] = null
          } else if (key === 'promptPayName') {
            this.formAdd[key] = null
          } else if (key === 'timeSlotStatus') {
            this.formAdd[key] = this.$session.getAll().data.timeSlotStatus || 'False'
          } else if (key === 'timeSlot') {
            this.formAdd[key] = 1
          } else if (key === 'shopId') {
            this.formAdd[key] = this.$session.getAll().data.shopId
          } else {
            this.formAdd[key] = ''
          }
        }
      }

      // eslint-disable-next-line no-redeclare
      for (var key in this.formUpdate) {
        if (this.formUpdate[key]) {
          if (key === 'flowfieldName') {
            this.formUpdate[key] = []
          } else if (key === 'checkPayment') {
            this.formUpdate[key] = 'True'
          } else if (key === 'checkOnsite') {
            this.formUpdate[key] = 'False'
          } else if (key === 'checkDeposit') {
            this.formUpdate[key] = 'False'
          } else if (key === 'repeatBooking') {
            this.formUpdate[key] = 'False'
          } else if (key === 'amountDeposit') {
            this.formUpdate[key] = 0
          } else if (key === 'promptPayID') {
            this.formUpdate[key] = null
          } else if (key === 'promptPayName') {
            this.formUpdate[key] = null
          } else if (key === 'timeSlotStatus') {
            this.formUpdate[key] = this.$session.getAll().data.timeSlotStatus || 'False'
          } else if (key === 'timeSlot') {
            this.formUpdate[key] = 1
          } else {
            this.formUpdate[key] = ''
          }
        }
      }
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
  width: 298px;
  height: 52px;
  font-size: 10px !important;
}
#v_img_edit {
  height: 135px;
  width: 114px;
}
#v_img_add {
  height: 139px;
  width: 140px;
}
#v_text_edits {
  height: 43px;
  width: 198px;
}
#subtext {
  color: #173053;
  font-size: 30px !important;
  font-weight: bold;
}
#v-img-fieldName {
  height: 90px;
  width: 90px;
}
#v-img-cars {
  height: 280.2578125px;
  width: 401.6603088378906px;
}
/* width */
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: #173053;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #173053;
}
/* .v-label{
  margin-bottom: 0;
  color:#1B437C !important;
  font-weight: bold;
} */
</style>
