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
            <v-btn
              color="primary"
              depressed
              @click="(dialogAdd = true), validate('ADD'), (desserts = []), getCustomField()"
            >
              <v-icon left>mdi-text-box-plus</v-icon>
              Add
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
                    <v-col class="text-right">
                      <v-icon
                        small
                        color="#173053"
                        @click="(dialogStep = false), clearData()"
                        >mdi-close</v-icon
                      >
                    </v-col>
                    <v-row class="mb-6" justify="center">
                      <v-col md="auto">
                        <v-img
                        :src="require('@/assets/FlowStep.svg')"
                      ></v-img>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col md="auto">
                        <h1 style="font-size:10vw;" class="underline-06">{{ formUpdate.flowName }}</h1>
                      </v-col>
                      <!-- ADD steptitle-->
                      <v-dialog
                        v-model="dialogAddStepTitle"
                        persistent
                        max-width="25%"
                      >
                        <v-card>
                          <v-card-text>
                            <v-container>
                              <v-col class="text-right">
                                <v-icon
                                  small
                                  color="#173053"
                                  @click="dialogAddStepTitle = false"
                                  >mdi-close</v-icon
                                >
                              </v-col>
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
                                  <center>
                                    <v-col>
                                      <v-img
                                        class="v_text_add"
                                        :src="
                                          require('@/assets/Grouptitle.svg')
                                        "
                                      ></v-img>
                                    </v-col>
                                  </center>
                                  <v-col cols="12">
                                    <v-row style="height: 35px">
                                      <v-subheader id="subtext"
                                        >หัวข้อ</v-subheader
                                      >
                                    </v-row>
                                    <v-row class="mt-5">
                                      <v-text-field
                                        v-model="formAddStep.stepTitle"
                                        placeholder="หัวข้อ"
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
                                        @click="addDataStep()"
                                      >
                                        <v-icon left
                                          >mdi-checkbox-marked-circle</v-icon
                                        >
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
                      <v-dialog
                        v-model="dialogEditStep"
                        persistent
                        max-width="50%"
                      >
                        <v-card>
                          <v-form
                            ref="form_update"
                            v-model="validUpdate"
                            lazy-validation
                          >
                            <v-card-text>
                              <v-container>
                                <v-col class="text-right">
                                  <v-icon
                                    color="#173053"
                                    @click="dialogEditStep = false"
                                    >mdi-close</v-icon
                                  >
                                </v-col>
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
                                    <center>
                                      <v-col>
                                        <v-img
                                          id="v_text_edits"
                                          :src="
                                            require('@/assets/GroupEditTitle.svg')
                                          "
                                        ></v-img>
                                      </v-col>
                                    </center>
                                    <v-col cols="12">
                                      <v-row style="height: 55px">
                                        <v-subheader id="subtext"
                                          >ขั้นตอนบริการ</v-subheader
                                        >
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
                                          dark
                                          elevation="2"
                                          x-large
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
                            <template v-slot:[`item.sendCard`]="{ item }" v-if="checkOnsite !== 'True'">
                              <v-checkbox
                                false-value="False"
                                true-value="True"
                                v-model="item.sendCard"
                              ></v-checkbox>
                            </template>
                            <template v-slot:[`item.action`]="{ item }" v-if="checkOnsite !== 'True'">
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
          <v-dialog v-model="dialogAdd" persistent max-width="30%">
            <v-card>
              <v-form ref="form_add" v-model="validAdd" lazy-validation>
                <v-card-text>
                  <v-container>
                    <v-col class="text-right">
                      <!-- <v-icon
                        background-color="#F3F3F3"
                        color="#FE4A01 "
                        @click="(dialogAdd = false), clearData()"
                        >mdi-close</v-icon
                      > -->
                        <v-btn
                          class="mx-2 mr-n5 mt-n5"
                          fab
                          small
                          dark
                          color="#F3F3F3"
                          @click="(dialogAdd = false), clearData()"
                        >
                          <v-icon dark
                          color="#FE4A01 ">
                            mdi-close
                          </v-icon>
                        </v-btn>
                    </v-col>
                    <v-row justify="center">
                      <!-- <v-col cols="5" class="text-center">
                        <v-col class="text-center" style="margin: auto 0;">
                          <v-img
                            class="v-margit_img_reward"
                            :src="require('@/assets/stepflowAdd.jpg')"
                            max-width="330"
                          ></v-img>
                        </v-col>
                      </v-col> -->

                      <v-col cols="12" class="v-margit_text_add mt-1">
                        <v-col class="text-center">
                          <!-- <v-img
                            class="v_text_add"
                            :src="require('@/assets/Grouptitle.svg')"
                          ></v-img> -->
                          <h2 class="font-weight-bold" style="color:#173053;">เพิ่มข้อมูล</h2>
                        </v-col>
                        <v-col cols="12" class="pb-0">
                          <v-text-field
                            v-model="formAdd.flowName"
                            label="ชื่อขั้นตอน (ภาษาไทย)"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                          <v-text-field
                            v-model="formAdd.flowNameEn"
                            label="ชื่อขั้นตอน (ภาษาอังกฤษ)"
                            outlined
                            dense
                            required
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pb-0 pt-0 mb-4">
                          <v-row class="mb-3">
                            <v-col class='d-flex justify-center'>
                              <v-checkbox
                              label="แจ้งยอดค่าชำระ"
                              false-value="False"
                              true-value="True"
                              v-model="formAdd.checkPayment"
                              hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col >
                              <v-checkbox
                                label="Onsite"
                                false-value="False"
                                true-value="True"
                                v-model="formAdd.checkOnsite"
                                hide-details
                              ></v-checkbox>
                            </v-col>
                            <v-col>
                              <v-checkbox
                                label="เงินมัดจำ"
                                false-value="False"
                                true-value="True"
                                v-model="formAdd.checkDeposit"
                                @change="formAdd.amountDeposit = 0"
                                hide-details
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
                        <!-- <v-col cols="12">
                          <v-row justify="center">
                            <v-btn
                              color="primary"
                              dark
                              x-small
                              @click="
                                (dialogAddField = true),
                                  (editedItem.fieldName = ''),
                                  (editedItem.fieldId = '')
                              "
                              class="mb-2"
                            >
                              เพิ่ม ช่องกรอกข้อมูล
                            </v-btn>
                          </v-row>
                          <v-row justify="center">
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
                              v-model="dialogAddField"
                              max-width="450px"
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
                                        <br />
                                        <v-row style="height: 50px">
                                          <v-select
                                            outlined
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
                                    dark
                                    color="#173053"
                                    @click="dialogAddField = false"
                                  >
                                    ยกเลิก
                                  </v-btn>
                                  <v-btn
                                    dark
                                    color="#173053"
                                    @click="save(editedItem)"
                                  >
                                    บันทึกข้อมูล
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </v-row>
                        </v-col> -->
                        <br />
                        <div class="text-center">
                          <v-btn
                            dark
                            elevation="2"
                            large
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
                        <div style="text-align: end;">
                        <v-btn
                          fab
                          small
                          dark
                          color="#F3F3F3"
                          @click="(dialogEdit = false), clearData()"
                        >
                          <v-icon dark
                          color="#FE4A01 ">
                            mdi-close
                          </v-icon>
                        </v-btn>
                        </div>
                    <v-row justify="left">
                      <!-- <v-col cols="5" class="text-center"  style="margin: auto 0;">
                        <v-col>
                          <v-img
                            id="v-img-cars"
                            :src="require('@/assets/cars.png')"
                          ></v-img>
                        </v-col>
                      </v-col> -->

                      <v-col cols="12" class="v-margit_text_add mt-1">
                        <v-col class="text-left">
                          <!-- <v-img
                            id="v_text_edits"
                            :src="require('@/assets/GroupEditTitle.svg')"
                          ></v-img> -->
                          <h2 class="font-weight-bold" style="color:#173053;">แก้ไขข้อมูล</h2>
                        </v-col>
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
                        <v-col cols="12" class="pb-0 pt-0 mb-2">
                          <v-row>
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
                            label="Onsite"
                            false-value="False"
                            :on-icon="'mdi-check-circle'"
                            :off-icon="'mdi-checkbox-blank-circle-outline'"
                            color="#1B437C"
                            true-value="True"
                            v-model="formUpdate.checkOnsite"
                          ></v-checkbox>
                          </v-col>
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
                              <v-row style="height: 50px" justify="center">
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
                              <v-row justify="center">
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
                          <v-row justify="center">
                            <v-btn
                              dark
                              elevation="2"
                              x-large
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
          <v-dialog v-model="dialogDelete" max-width="355px">
            <v-card>
              <br />
              <v-row class="mb-6" justify="center">
                <v-col md="auto">
                  <v-img
                    :src="require('@/assets/GroupDelete.png')"
                    class="a"
                    style="width:55.05px;height:63px"
                  ></v-img>
                </v-col>
              </v-row>
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
                          v-model="formUpdate.flowName"
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

          <!-- set condition -->
          <v-dialog v-model="dialogCondition" max-width="80%" persistent>
            <v-card>
              <br />
              <!-- <v-row class="mb-6" justify="center">
                <v-col md="auto">
                  <v-img
                    :src="require('@/assets/GroupDelete.png')"
                    class="a"
                    style="width:55.05px;height:63px"
                  ></v-img>
                </v-col>
              </v-row> -->
              <v-col class="text-center">
                <span class="headline">เงื่อนไขการให้บริการ</span>
              </v-col>
              <v-card-text v-if="dataConditionReady">
                <v-container>
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
                  x-large
                  :disabled="!validCondition"
                  color="#1B437C"
                  @click="addDataCondition()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  บันทึกข้อมูล
                </v-btn>
                <v-btn
                  dark
                  elevation="2"
                  x-large
                  color="error"
                  @click="dialogCondition = false, clearCondition()"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ยกเลิก
                </v-btn>
              </v-col>
              <v-card-text v-if="!dataConditionReady">
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
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- end condition -->

        <!-- dialog limitbookint -->
        <v-dialog v-model="dialoglimitbooking" persistent>
          <v-card min-width="400px" min-height="500px" class="pa-5">
            <v-card-title>
                <span class="headline">เพิ่ม / แก้ไขเวลา</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form
                     ref="form_update"
                    v-model="valid_update"
                    lazy-validation
                  >
                  <v-card class="pa-5 mb-5">
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
                      <!-- <h4 class="text-center">ต้องการตั้ง Limit การจอง</h4> -->
                      <v-row align="center" class="ma-5">
                        <!-- <p class="pb-3">ตั้ง Limit การนัดหมาย</p> -->
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
                  </v-card>
                   <v-row>
                    <v-col cols="12">
                      <v-card class="pa-3" >
                        <strong >วันหยุดทั่วไปของบริษัท</strong>
                        <v-select
                        class="mt-8"
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
                        <v-row>
                          <v-col cols="6">
                            <strong>วันหยุดประจำปีของบริษัท </strong>
                          </v-col>
                          <v-col cols="6">
                            <v-select
                              v-model="formUpdateLimitbooking.typeDayCustom"
                              :item-text="typeDayCustomitem.text"
                              :items="typeDayCustomitem"
                              label="ประเภทของวันหยุด"
                              dense
                              outlined
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-date-picker
                          v-model="formUpdateLimitbooking.dateDayCustom"
                          :allowed-dates="allowedDates"
                          multiple
                          full-width
                          class="mt-4"
                        ></v-date-picker>
                      </v-card>
                    </v-col>
                  </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
                <div class="text-right">
                  <v-btn
                  elevation="2"
                  x-large
                  color="blue darken-1"
                  text
                  @click="dialoglimitbooking = false, clearLimit()"
                >
                  <v-icon left> mdi-cancel</v-icon>
                  ปิด
                </v-btn>
                  <v-btn
                  elevation="2"
                  x-large
                  color="success"
                  text
                 :disabled="!valid_update"
                  @click="EditlimitBooking()"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  แก้ไข
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
        { text: 'Limit Booking', value: 'limitBooking', align: 'center' },
        // { text: 'เรียงตำแหน่ง', value: 'actions1', align: 'center' },
        { text: 'จัดการเวลา', value: 'actions2', align: 'center' }
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
        depositTime: 'NO',
        promptPayID: null,
        promptPayName: null,
        amountDeposit: 0,
        shopId: this.$session.getAll().data.shopId,
        remarkConfirm: ''
      },
      formAddStep: {
        stepId: '',
        flowId: '',
        stepTitle: '',
        sortNo: '',
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
        depositTime: '',
        amountDeposit: 0,
        promptPayID: null,
        promptPayName: null,
        shopId: '',
        remarkConfirm: ''
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
      validCondition: true,
      editedIndex: -1,
      checkOnsite: ''
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
    presetTime () {
      this.dataItemAddTime = [{'value': '08:00', 'text': '08:00', 'limitBooking': ''}, {'value': '08:30', 'text': '08:30', 'limitBooking': ''}, {'value': '09:00', 'text': '09:00', 'limitBooking': ''}, {'value': '09:30', 'text': '09:30', 'limitBooking': ''}, {'value': '10:00', 'text': '10:00', 'limitBooking': ''}, {'value': '10:30', 'text': '10:30', 'limitBooking': ''}, {'value': '11:00', 'text': '11:00', 'limitBooking': ''}, {'value': '11:30', 'text': '11:30', 'limitBooking': ''}, {'value': '12:00', 'text': '12:00', 'limitBooking': ''}, {'value': '12:30', 'text': '12:30', 'limitBooking': ''}, {'value': '13:00', 'text': '13:00', 'limitBooking': ''}, {'value': '13:30', 'text': '13:30', 'limitBooking': ''}, {'value': '14:00', 'text': '14:00', 'limitBooking': ''}, {'value': '14:30', 'text': '14:30', 'limitBooking': ''}, {'value': '15:00', 'text': '15:00', 'limitBooking': ''}, {'value': '15:30', 'text': '15:30', 'limitBooking': ''}, {'value': '16:00', 'text': '16:00', 'limitBooking': ''}, {'value': '16:30', 'text': '16:30', 'limitBooking': ''}, {'value': '17:00', 'text': '17:00', 'limitBooking': ''}]
    },
    EditlimitBooking () {
      if (this.formUpdateLimitbooking.limitBookingCheck === 'True') {
        if (this.dataItemAddTime.filter(el => { return el.limitBooking === '' }).length === 0) {
          this.EditlimitBookingSubmit()
        } else {
          this.$swal('ผิดพลาด', 'กรุณาเลือก ใส่จำนวน Limit Booking ให้ครบ เนื่องจากท่านได้เลือกที่จะ ตั้ง Limit การจอง', 'error')
        }
      } else {
        this.EditlimitBookingSubmit()
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
      console.log('val', val)
      // this.getMonth(this.pickerDate)
      if (this.formUpdateLimitbooking.dateDayoffValue !== null && this.formUpdateLimitbooking.dateDayoffValue.length > 0) {
        if (JSON.parse(this.formUpdateLimitbooking.dateDayoffValue).filter(el => { return el === new Date(val).getDay() }).length === 0) {
          return val
        }
      } else {
        // console.log('val', val)
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
    },
    async getDataById (item) {
      this.editedItemSelete = []
      this.desserts = []
      this.dataReady = false
      this.PK = item.flowCode
      this.formUpdate.checkOnsite = item.checkOnsite || 'False'
      console.log('item: ', item)
      this.checkOnsite = item.checkOnsite || 'False'
      this.formUpdate.flowName = item.flowName
      this.formUpdate.flowNameEn = item.flowNameEn
      this.formUpdate.flowId = item.flowId
      this.formUpdate.flowCode = item.flowCode
      this.formUpdate.amountDeposit = item.amountDeposit || 0
      this.formUpdate.checkPayment = item.checkPayment || 'True'
      this.formUpdate.checkDeposit = item.checkDeposit || 'False'
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
      // await axios
      //   .get(
      //     // eslint-disable-next-line quotes
      //     this.DNS_IP +
      //       this.path +
      //       'getCode?' +
      //       'flowCode=' +
      //       item.flowCode +
      //       '&shopId=' +
      //       this.shopId,
      //     {
      //       headers: {
      //         'Application-Key': this.$session.getAll().ApplicationKey
      //       }
      //     }
      //   )
      //   .then(async response => {
      //     console.log('get flowCode : ', response.data[0].flowfieldName)
      //     this.dataReady = true
      //     if (response.data) {
      //       // Object.assign(this.formUpdate, response.data)
      //       this.formUpdate.flowName = response.data[0].flowName
      //       this.formUpdate.flowId = response.data[0].flowId
      //       this.formUpdate.flowCode = response.data[0].flowCode
      //       this.formUpdate.checkPayment = response.data[0].checkPayment || 'True'
      //       this.shopId = this.$session.getAll().data.shopId
      //       this.fieldType = this.formUpdate.fieldType
      //       // this.desserts = JSON.parse(response.data[0].flowfieldName)
      //       await this.getField(JSON.parse(response.data[0].flowfieldName))
      //       // this.getDataCompany()
      //       this.getCustomField('edit', JSON.parse(response.data[0].flowfieldName))
      //       // this.getStepTitle(this.formUpdateStep.stepTitle)
      //       this.dataReady = true
      //       console.log(this.formUpdate)
      //     }
      //   })
      //   // eslint-disable-next-line handle-callback-err
      //   .catch(error => {
      //     this.dataReady = true
      //     console.log('error function getDataById : ', error)
      //   })
    },
    async addData () {
      this.dataReady = false
      // this.formAdd.flowCode = this.generateCodeGlobal()
      this.formAdd.CREATE_USER = this.session.data.userName
      this.formAdd.LAST_USER = this.session.data.userName
      this.formAdd.flowCode = this.generateCodeGlobal()
      this.formAdd.flowfieldName = JSON.stringify(this.desserts)
      this.formAdd.shopId = this.shopId
      console.log('flowfieldName', this.formAdd.flowfieldName)
      console.log('shopId', this.shopId)
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
        .then(async result => {
          this.formAdd.CREATE_USER = this.session.data.userName
          this.formAdd.LAST_USER = this.session.data.userName
          this.formAdd.flowCode = this.generateCodeGlobal()
          this.formAdd.flowfieldName = JSON.stringify(this.desserts)
          this.formAdd.shopId = this.shopId
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
      // console.log('this.formUpdateStep', this.formUpdateStep)
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
          var ID = this.formUpdateStep.stepId
          var dt = {
            stepTitle: this.formUpdateStep.stepTitle,
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
          } else {
            this.formAdd[key] = ''
          }
        }
      }

      // eslint-disable-next-line no-redeclare
      for (var key in this.formUpdate) {
        if (this.formUpdate[key]) {
          this.formUpdate[key] = ''
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
