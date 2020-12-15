<template>
  <div>
    <div v-rightClick="menuGroup" class="container" />
  </div>

</template>

<script>
export default {
  name: 'Click',
  data () {
    return {
      menuGroup: [{
        text: '测试1',
        handle: () => {
          console.log('---11111---------')
        }
      }, {
        text: '测试2',
        handle: () => {
          console.log('------22222222------')
        }
      }]
    }
  },
  created () {
    setTimeout(() => {
      console.log('start')
      this.menuGroup.push({
        text: '测试3',
        handle: function () {
          console.log('------33333333333333------')
        }
      })
      console.log('end')
    }, 5000)
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
