<template>
  <div class="d-flex flex-column justify-content-between mr-1 mr-1 p-0">
    <div class=" d-flex justify-content-center py-2 title">
      <span class="text-waiting">All queues waiting</span>
    </div>
    <div class="d-flex flex-row div-waiting  flex-wrap h-100">
      <div  v-for="(item, index) in groupQueueItem" :key="index" class="py-2 text-center text-number-waiting col-3">
       <span>{{ item.storeFrontQueue }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    groupQueueItem: { type: Array, default: () => [] },
    isPortrait: {type: Boolean, default: false}
  }
}
</script>
<style scoped>
.title {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 15px 15px 0 0;
}

.div-waiting {
  background-color: #fff;
  border-radius: 0 0 15px 15px;
}

.text-number-waiting {
  font-weight: 700;
}

@media screen and (orientation: portrait) {
  .text-number-waiting {
    font-size: 3vw;
  }

  .text-waiting {
    font-size: 2vw;
  }
}

@media screen and (orientation: landscape) {
  .text-number-waiting {
    font-size: 1.8vw;
  }

  .text-waiting {
    font-size: 1vw;
  }
}</style>
