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
    <calendar :show="calendarShow" format="yyyy-MM-dd" @selected="selectedHandler"></calendar>
  </div>
</template>
```

```JavaScript
import Calendar from 'vue-m-calendar';
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
```

# Demo

http://junyiz.github.io/vue-m-calendar

# License
MIT