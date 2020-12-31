import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/Global.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

import RightClick from '@/lib/RightClick'

Vue.prototype.$RightClick = RightClick

// 注册全局指令
Vue.directive('rightClick', {
  bind: (el, binding) => {

  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
