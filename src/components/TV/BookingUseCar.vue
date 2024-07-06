<template>
        <div class="col d-flex flex-column py-3 px-0">
          <div class="d-flex flex-row text-color p-0">
            <div class="col-4 d-flex flex-column justify-content-center align-items-center p-0">
                <div><span class="text-Header">NUMBER</span></div>
                 <div><span class="text-sub">เลขคิว</span></div>
                </div>
                <div class="col-8 d-flex flex-column justify-content-center align-items-center p-0">
                    <div><span class="text-Header">BRAND</span></div>
                <div><span class="text-sub">แบรนด์</span></div>
                </div>
          </div>
        <div v-for="(index) in 6" :key="index" :class="`d-flex flex-row row-service my-1 p-0 ${bookingUseCar && bookingUseCar.length > 0 ? bookingUseCar.length >= index ?  'service' : 'none-service' : 'none-service'}`" >
            <div class="col-4 d-flex justify-content-center align-items-center col-left mr-2"><span class="text-service">{{bookingUseCar && bookingUseCar.length > 0  ? bookingUseCar.length >= index ? bookingUseCar[index-1].storeFrontQueue  : '': ''}}</span></div>
             <div class="col-8 d-flex justify-content-center align-items-center col-right"><span class="text-service">{{bookingUseCar && bookingUseCar.length > 0  ? bookingUseCar.length >= index ? bookingUseCar[index-1].masBranchName === '' ? (bookingUseCar[index-1].statusBt === 'confirmJob' ? 'เรียกคิว' : '') :bookingUseCar[index-1].masBranchName  : '': ''}}</span></div>
        </div>
        </div>
</template>
<script>
export default {
  props: {
    bookingUseCar: { type: Array, default: () => [] },
    isPortrait: {type: Boolean, default: false}
  }
}
</script>
<style scoped>

  .col-left{
    background-color: #706060;
    color: #FFF9E0;
    border-radius: 20px;
    overflow: hidden;
  }
  .col-right{
    background-color: #FFF0B4;
    color: #553E3E;
    border-radius: 20px;
    overflow: hidden;
  }
  .row-service{
    border-radius: 20px;
    /* box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.4); */
    overflow: hidden;
  }
  .text-Header, .text-sub, .text-service{
    font-weight: 700;
  }
  .service{
    min-height: 8vh;
  }
  .none-service{
    min-height: 8vh;
  }
  .text-number-waiting{
    font-size: 1.8vw;
    text-align: center;
  }
  .text-color{
    color: #553E3E;
  }
  @media screen and (orientation: portrait) {
    .text-service {
    font-size: 5vw;
  }
  .text-sub{
    font-size: 3vw;
  }
  .text-Header {
    font-size: 1.5vw;
  }
  .service{
    min-height: 5vh;
  }
  .none-service{
    min-height: 5vh;
  }
}

@media screen and (orientation: landscape) {
  .text-service {
    font-size: 3.5vw;
  }
  .text-sub{
    font-size: 1.8vw;
  }
  .text-Header {
    font-size: 1.5vw;
  }
  .service{
    min-height: 10vh;
  }
  .none-service{
    min-height: 10vh;
  }

}
</style>
