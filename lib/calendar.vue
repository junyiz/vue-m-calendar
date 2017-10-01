<template>
    <div>
        <div class="vue-m-mask" v-show="show"></div>
        <div class="vue-m-calendar" ref="container"></div>
    </div>
</template>

<style>
    @import "./calendar.css";
</style>

<script>
  import Calendar from './calendar';

  export default {
    name: 'vue-m-calendar',
    data () {
      return {
        value: ''
      }
    },
    props: {
      show: false,
      title: String,
      format: {
        type: String,
        default: 'yyyy-MM-dd'
      },
      selected: {
        type: Function,
        default: (d) => {
        }
      },
      cancel: {
        type: Function,
        default: (d) => {
        }
      },
      options: {}
    },
    mounted () {
      let vm = this;
      vm.calendar = new Calendar(Object.assign({
        wrapper: vm.$refs.container,
        title: vm.title,
        dateFormat: vm.format,
        onSelected: (date) => {
          vm.$emit('selected', date);
        },
        onCancel: () => {
          vm.$emit('cancel');
        }
      }, vm.options));
    },
    watch: {
      show (bool) {
        this.calendar.toggle(bool);
      }
    }
  }
</script>
