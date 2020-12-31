<template>
  <div
    v-right-click="menuGroup"
    class="container"
  >
    <div>{{ yyy }}</div>
  </div>

</template>

<script>
import RightClick from '@/lib/RightClick'
export default {
  name: 'Click',
  directives: {
    rightClick: {
      inserted: function (el, binding, vnode) {
        console.log(el, binding, vnode)
        el.addEventListener('contextmenu', (event) => {
          event.preventDefault()
          const { clientX, clientY } = event
          RightClick({ // 传递位置即可
            menuGroup: [1, 2, 3],
            coordinate: { rect: el.getBoundingClientRect(), clientX: clientX, clientY: clientY }
          }).then((data) => {
            console.log('data', data)
          })
        })
      }
    }
  },
  data () {
    return {
      yyy: '123456',
      menuGroup: [{
        text: '末尾字符为6才显示',
        verify: (data) => {
          return data.slice(-1) - 0 === 6
        }
      }, {
        text: '添加一个末尾字符6',
        verify: (data) => {
          return true
        }
      }]
    }
  },
  methods: {
    xxx (event) {
      const data = event.target.innerHTML
      console.log('data', data)
      const result = this.menuGroup.filter(item => {
        if (item.verify(data)) return item
      }).map(item => item.text)
      console.log('result', result)
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  border: 1px solid saddlebrown;
  width: 500px;
  height: 500px;
  margin: 0 auto;
  position: relative;
}

</style>
