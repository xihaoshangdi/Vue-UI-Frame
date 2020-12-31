import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/Global.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

import RightClick from '@/lib/RightClick'

// 注册全局指令
Vue.directive('rightClick', {
  inserted: function (el, binding, vnode) {
    const { value } = binding
    el.addEventListener('contextmenu', (event) => {
      event.preventDefault()
      RightClick({ // 传递位置即可
        menuGroup: value.map(item => item.text),
        coordinate: { rect: el.getBoundingClientRect(), clientX: event.clientX, clientY: event.clientY }
      }).then((data) => {
        value.some(item => {
          if (item.text === data) {
            item.handle()
            return true
          }
        })
      })
    })
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
