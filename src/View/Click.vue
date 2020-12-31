<template>
  <div
    v-right-click="menuGroup"
    class="container"
  >
    <div>{{ yyy }}</div>
  </div>

</template>

<script>
export default {
  name: 'Click',
  data () {
    return {
      yyy: 123456,
      menuGroup: [
        {
          text: '--',
          verify: (data) => {
            return true
          },
          handle: () => {
            this.yyy--
          }
        }, {
          text: '++',
          verify: (data) => {
            return true
          },
          handle: () => {
            this.yyy++
          }
        }]
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
