<template>
  <div>
    <div class="date">日期 <input type="text" placeholder="请输入日期" :value="value" @click="showCalendar"></div>
    <calendar :show="calendarShow" format="yyyy-MM-dd" @selected="selectedHandler"></calendar>
  </div>
</template>

<script lang="babel">
  import Calendar from '../lib/index'

  export default {
    data() {
      return {
        value: '',
        calendarShow: false
      }
    },
    components: {
      Calendar
    },
    methods: {
      showCalendar() {
        this.calendarShow = true;
      },
      selectedHandler(date) {
        this.value = date;
        this.calendarShow = false;
      }
    }
  }
</script>
<style>
  body {
    margin: 0;
    padding: 0;
    color: #333;
    background: #eeeeee;
  }
  .date {
    margin: 15px 10px;
    padding: 8px 15px;
    line-height: 22px;
    background: #ffffff;
  }
  .date input {
    border: 0;
    font-size: 14px;
    line-height: 22px;
    margin-left: 25px;
    font-weight: 500;
  }
</style>
