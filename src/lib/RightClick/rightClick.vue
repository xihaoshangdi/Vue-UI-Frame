<template>
  <div
    v-show="showFlag&&menuGroup.length!==0"
    :style="position"
    class="container"
  >
    <template v-for="(item,index) in menuGroup">
      <div
        :key="index"
        @click="confirm(item)"
      >
        {{ item }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RightClick',
  data: function () {
    return {
      showFlag: false,
      menuGroup: [],
      coordinate: null,
      position: {}
    }
  },
  methods: {
    renderPopup (callback) {
      this.showFlag = true
      this.excess = () => {
        typeof callback === 'function' && callback.call(this, this)
        this.reject()
        this.hide()
      }
      window.addEventListener('mousewheel', this.excess, { once: true })
      window.addEventListener('click', (event) => { if (!this.$el.contains(event.target)) { this.excess } }, { once: true })
      return new Promise((resolve, reject) => { // 返回Promise
        this.reject = reject // 给取消按钮使用
        this.resolve = resolve // 给确认按钮使用
      }).then((result) => {
        typeof callback === 'function' && callback.call(this, this)
        return result
      })
    },
    confirm (item) {
      this.resolve(item)
      this.hide()
    },
    hide () {
      this.showFlag = false
      document.body.removeChild(this.$el) // 结束移除Dom
      this.$destroy() // 执行组件销毁
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: absolute;
  min-width: 200px;
  background-color: #FFF;
  padding: 12px;
  //
  cursor: pointer;
  //
  color: #606266;
  font-size: 14px;
  line-height: 1.4;
  text-align:justify;
  word-break:break-all;
  //
  border: 1px solid #EBEEF5;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
