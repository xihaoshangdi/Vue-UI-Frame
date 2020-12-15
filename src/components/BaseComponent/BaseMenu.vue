<template>
  <div>
    <div v-for="(item,index) in menuItems" :key="index">{{ item.toString() }}</div>
  </div>
</template>

<script>
export default {
  name: 'BaseMenu',
  props: {
    menuItems: {
      type: Array,
      required: true
    }
  },
  created () {
    console.log('this.$root', this.$root)
    this.$root.$watch('rightClik', function (newVal, oldVal) {
      console.log('newVal', newVal)
      console.log('oldVal', oldVal)
    })
  }
}
</script>

<style scoped>

</style>
