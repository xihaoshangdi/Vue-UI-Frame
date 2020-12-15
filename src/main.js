import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/Global.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 注册全局指令
Vue.directive('rightClick', {
  bind: (el, binding) => {
    // 追加生成DOM节点
    const div = document.createElement('div')
    el.append(div)
    // 挂载渲染组件
    const Component = {
      render (createElement) {
        return createElement(
          'div',
          {
            'class': { rightContainer: true },
            style: {
              opacity: this.opacity,
              pointerEvents: this.opacity ? 'auto' : 'none',
              position: 'absolute',
              left: this.real.left,
              top: this.real.top
            },
            on: {
              click: this.CloseMenu
            }
          },
          this.menuItems.map((item) => createElement('div', {
            class: { 'rightContainer-item': true },
            on: {
              click: item.disabled || !item.handle ? function () { console.log(`${item} is clicked`) } : item.handle
            }
          }, item.text))
        )
      },
      data () {
        return {
          menuItems: [],
          opacity: 0,
          real: {
            left: 0,
            top: 0
          }
        }
      },
      methods: {
        CloseMenu () { this.opacity = 0 },
        OpenMenu () { this.opacity = 1 }
      }
    }
    const MenuComponent = Vue.extend(Component)
    const instance = new MenuComponent()
    instance.$mount(div)
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      const { right, bottom, top, left } = e.target.getBoundingClientRect()
      const { width, height } = instance.$el.getBoundingClientRect()
      const { value } = binding
      const realX = e.x + width > right ? right - width - 10 : e.x
      const realY = e.y + height > bottom ? bottom - height - 10 : e.y
      instance.real = { left: `${realX - left}px`, top: `${realY - top}px` }
      instance.menuItems = value
      instance.OpenMenu()
    })
    window.addEventListener('click', () => { instance.CloseMenu() })
    window.addEventListener('mousewheel', () => { instance.CloseMenu() })
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
