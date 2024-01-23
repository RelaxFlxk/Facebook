<template>
  <v-main>
    <table class="mt-16" style="width:100%">
      <tr>
        <th style="width:10%"></th>
        <th v-for="th in theme" :key="th">{{ th }}</th>
      </tr>
      <tr v-for="tm in hours" :key="tm">
        <td style="width:10%">{{ tm }}</td>
        <td v-for="n in theme.length" :key="n">{{ n }}</td>
      </tr>
    </table>
</v-main>
</template>

<script>
export default {
  data () {
    return {
      hours: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
      days: [
        { date: '2024-01-01', label: 'Monday' },
        { date: '2024-01-02', label: 'Tuesday' },
        { date: '2024-01-03', label: 'Wednesday' },
        { date: '2024-01-04', label: 'Thursday' },
        { date: '2024-01-05', label: 'Friday' }
      ],
      theme: ['A', 'B', 'C', 'D'],
      timeSlots: Array.from({ length: 9 }, (_, index) => index + 8)
    }
  },
  methods: {

  }
}
</script>

<style>
table, th, td {
  border:1px solid black;
}
.theme-main {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.theme {

}
.main {
  border-style: dashed;
  border-width: 1px;
  padding: 10px;
  width: 89px;
}
</style>
