import Vue from 'vue'
import { InputNumber,Input } from 'element-ui';
import JsonViewe from '../lib'
import app from "./index.vue";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(JsonViewe)
Vue.use(InputNumber)
Vue.use(Input)

new Vue({
  el: '#app',
  render: h => h(app),
})
