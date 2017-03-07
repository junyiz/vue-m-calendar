<template>
  <div class="fiui-calendar"></div>
</template>

<style>
  @import "./calendar.css";
</style>

<script lang="babel">
  import Calendar from './calendar';

  export default {
    name: 'vue-m-calendar',
    data() {
      return {
        value: ''
      }
    },
    props: {
      show: false,
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      selected: {
        type: Function,
        default: (d) => {
        }
      }
    },
    mounted() {
      let that = this;
      that.calendar = new Calendar({
        wrapper: that.$el,
        dateFormat: that.format,
        onSelected: (date) => {
          that.$emit('selected', date);
        }
      });
    },
    watch: {
      show(bool) {
        this.calendar.toggle(bool);
      }
    }
  }
</script>
