<template>
  <div >
      <div refs="output"></div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pivottable/2.6.0/tips_data.min.js"></script>
<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  created () {
    var utils = $.pivotUtilities
    var heatmap = utils.renderers['Heatmap']
    var sumOverSum = utils.aggregators['Sum over Sum']

    jQuery(this.$refs.output).pivot(
      utils.tipsData, {
        rows: ['sex', 'smoker'],
        cols: ['day', 'time'],
        aggregator: sumOverSum(['tip', 'total_bill']),
        renderer: heatmap
      })
  },
  methods: {
  }
}
</script>

<style>
.main {
  max-width: 980px;
  margin: 8vh auto 20px;
}
h1 {
  text-align: center;
}
.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
}
pre {
  text-align: left;
  background-color: #f8f8f8;
  padding: 1.2em 1.4em;
  line-height: 1.5em;
  margin: 60px 0 0;
  overflow: auto;
}
code {
  padding: 0;
  margin: 0;
}
footer {
  text-align: center;
  margin-top: 40px;
  line-height: 2;
}
</style>
