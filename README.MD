# vue-m-calendar
Calendar component for Vue.js(2.0+)

# Install

```Bash
npm install vue-m-calendar --save
```

# Usage

```HTML
<template>
  <div>
    <div class="date">日期 <input type="text" placeholder="请输入日期" :value="value" @click="showCalendar"></div>
    <calendar title="选择日期" format="yyyy-MM-dd" :show="calendarShow" :options="calendarOpts" @selected="selectedHandler" @cancel="cancelHandler"></calendar>
  </div>
</template>
```

```JavaScript
import Calendar from 'vue-m-calendar';
export default {
data() {
  return {
    value: '',
    calendarShow: false,
    calendarOpts: {
      disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;
      }
    }
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
  },
  cancelHandler() {
    this.calendarShow = false;
  }
}
}
```

# Demo

http://junyiz.github.io/vue-m-calendar

# License
MIT