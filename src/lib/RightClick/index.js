import Vue from 'vue'
import RightClick from './rightClick.vue' // 引入组件

let newInstance // 避免重复生成实例
const RightClickInstance = Vue.extend(RightClick) // 创建构造函数

const initInstance = () => { // 执行方法后完成挂载
  newInstance = new RightClickInstance() // 实例化
  document.body.appendChild(newInstance.$mount().$el)
  // 实例化后手动挂载，得到$el真实Dom，将其添加到body最后
}

export default options => { // 导出一个方法，接受配置参数
  if (!newInstance) {
    console.log('初始化弹窗实例')
    initInstance() // 挂载
  }
  // Object.assign(newInstance, options)
  newInstance.$nextTick(() => {
    const { coordinate } = options
    const { rect, clientX, clientY } = coordinate
    const { right, bottom } = rect
    const { width, height } = newInstance.$el.getBoundingClientRect()
    const realX = clientX + width > right ? right - width : clientX
    const realY = clientY + height > bottom ? bottom - height : clientY
    options.position = { left: `${realX}px`, top: `${realY}px` }
    Object.assign(newInstance, options)
  })
  // 实例化后newInstance就是一个对象了，所以data内的数据会
  // 挂载到this下，传入一个对象与之合并

  return newInstance.renderPopup(vm => { // 显示弹窗
    console.log('销毁弹窗实例')
    newInstance = null // 将实例对象清空
  })
}
