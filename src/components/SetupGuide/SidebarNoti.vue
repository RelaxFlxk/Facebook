<template>
 <div>
    <v-btn v-if="isOpen" icon @click="closeDrawer()" class="close-noti d-sm-block d-none">
       <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="isOpen" app temporary right :width="600">
      <v-btn icon  @click="closeDrawer()" class="close-button-mobile d-sm-none d-block">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    <v-card class="slide-card-style">
      <div class="p-3">
        <div class="mb-5"><h3 class="slide-font">แจ้งเตือน</h3></div>
        <div v-for="(item, index) in listData" :key="index" class="d-flex flex-row div-slide mb-3">
          <div class="col-2 d-flex align-items-center">
           <v-icon class="slide-icon" size="50">mdi-calendar-alert</v-icon>
          </div>
          <div class="col-10 d-flex flex-column ">
            <div>
              <span class="font-time-slide">{{item.CREATE_DATE}}</span>
            </div>
            <div>
              <span class="font-title-slide">{{item.flowName}}</span>
            </div>
            <div>
              <span class="font-detail-slide">สาขา : {{ item.masBranchName }}</span>
            </div>
            <div>
              <span class="font-detail-slide">วันที่นัดหมาย: {{item.dueDateText}} น.</span>
            </div>
            <div>
              <span class="font-detail-slide">ชื่อลูกค้า : {{ item.bookingDataCustomerName }}</span>
            </div>
            <div v-if="item.depositPrice !== null">
              <span class="font-detail-slide">ชำระเงิน: มัดจำ {{ item.depositPrice }} บาท</span>
            </div>
            <div>
            </div>
          </div>
        </div>
         <div class="d-flex flex-row div-slide">
          <div class="col-2 d-flex align-items-center">
           <v-icon class="slide-icon" size="40">mdi-trophy</v-icon>
          </div>
          <div class="d-flex flex-column ">
            <div>
              <span class="font-time-slide">26 ม.ค. 2567 - 16:11</span>
            </div>
            <div>
              <span class="font-title-slide">ยินดีต้อนรับเข้าสู้ร้าน MyLift(Test)</span>
            </div>
            <div>
              <span class="font-detail-slide">เริ่มต้นด้วยจัดการร้านของท่านตามคำแนะนำของเรา <a>คลิกที่นี่</a></span>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </v-navigation-drawer>
 </div>
</template>
<script>
export default {
  props: {
    isOpen: {type: Boolean, default: false},
    closeDrawer: Function,
    listData: {type: Array, default: () => []}
  }
}
</script>
<style lang="css" scoped>
.slide-card-style{
  border-radius: 0%;
  height: 100%;
}
.font-detail-slide{
  font-size: 0.75rem;
}
.font-title-slide{
  font-weight: 600;
  font-size: 0.80rem;
}
.font-time-slide{
  font-size: 0.70rem;
  color: #77808d;
}
.div-slide{
    border: 1px solid var(--nav-bg) !important;
    border-radius: 10px;
}

.slide-font, .font-detail-slide, .font-title-slide, .slide-icon {
  color: #1B437C;
}
.close-noti{
    position: absolute;
    top: 13px;
    right: 612px;
    z-index: 10;
    background-color: #ddd;
    color: #1B437C;
    font-size: 24px;
}
.close-button-mobile {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  background-color: transparent;
  color: #1B437C !important;
  font-size: 24px;
}
</style>
