<template>
  <div id="app">
    <el-tabs v-model="activeName">
      <el-tab-pane label="表单组件" name="form">
        <Form />
      </el-tab-pane>
      <el-tab-pane label="右击组件" name="click">
        <Click />
      </el-tab-pane>
      <el-tab-pane label="页面组件" name="pager">
        <Pager />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import Form from '@/View/Form'
import Pager from '@/View/Pager'
import Click from '@/View/Click'
export default {
  name: 'App',
  components: { Click, Pager, Form },
  data () {
    return {
      //
      activeName: 'click'
    }
  }
}
</script>

<style lang="scss">
</style>
