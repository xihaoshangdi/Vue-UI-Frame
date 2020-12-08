<template>
  <div id="app">
    <el-tabs v-model="activeName">
      <el-tab-pane label="表单组件" name="form">
        <Form />
      </el-tab-pane>
      <!--      <el-tab-pane label="页面组件" name="search">配置管理</el-tab-pane>-->
      <!--      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
      <!--      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>

import Form from '@/View/Form'
export default {
  name: 'App',
  components: { Form },
  data () {
    return {
      //
      activeName: 'form',
      // BaseSearch
      searchForm: {
        JOB_DATE: {
          label: '计划日期',
          type: 'timeLimit',
          format: 'yyyy/MM/dd hh:mm'
        },
        PLAN_TYPE: {
          label: '计划类型',
          type: 'text',
          vague: true
        },
        AIRCRAFT_MODEL: {
          label: '机型',
          type: 'text',
          vague: false
        },
        ALTERNATE_AIRPORT: {
          label: '备降机场',
          type: 'radio',
          options: [{
            value: '密云机场',
            label: '密云机场'
          }, {
            value: '黄埔机场',
            label: '黄埔机场'
          }, {
            value: '井冈山机场',
            label: '井冈山机场'
          }, {
            value: '秦皇岛机场',
            label: '秦皇岛机场'
          }, {
            value: '天津机场',
            label: '天津机场'
          }],
          vague: false
        },
        ESTIMATE_LAUNCH_TIME: {
          label: '起飞时间',
          type: 'timeBefore',
          format: 'yyyy/MM/dd hh:mm'
        }
      }, // 查询的表单对象
      sourceData: [
        {
          JOB_DATE: '2020/12/02 16:44',
          PLAN_TYPE: '小型飞行器飞行',
          AIRCRAFT_MODEL: 'GMZ-1',
          ALTERNATE_AIRPORT: '天津机场',
          ESTIMATE_LAUNCH_TIME: '2020/12/02'
        },
        {
          JOB_DATE: '2020/12/01 15:44',
          PLAN_TYPE: '直升机水上平台作业',
          AIRCRAFT_MODEL: 'GDL-2',
          ALTERNATE_AIRPORT: '密云机场',
          ESTIMATE_LAUNCH_TIME: '2020/12/05'
        },
        {
          JOB_DATE: '2020/11/25 08:24',
          PLAN_TYPE: '直升机机外载荷作业',
          AIRCRAFT_MODEL: 'POL-9',
          ALTERNATE_AIRPORT: '井冈山机场',
          ESTIMATE_LAUNCH_TIME: '2020/12/03'
        },
        {
          JOB_DATE: '2020/11/29 08:24',
          PLAN_TYPE: '农林喷洒作业',
          AIRCRAFT_MODEL: 'PRG-2',
          ALTERNATE_AIRPORT: '井冈山机场',
          ESTIMATE_LAUNCH_TIME: '2020/11/29'
        },
        {
          JOB_DATE: '2020/12/09 08:24',
          PLAN_TYPE: '农林喷洒作业',
          AIRCRAFT_MODEL: 'PRG-2',
          ALTERNATE_AIRPORT: '秦皇岛机场',
          ESTIMATE_LAUNCH_TIME: '2020/11/28'
        }
      ], // 数据库的全部数据
      // BaseTable
      config: [
        {
          'prop': 'JOB_DATE',
          'label': '计划日期'
        },
        {
          'prop': 'PLAN_TYPE',
          'label': '计划类型'
        },
        {
          'prop': 'AIRCRAFT_MODEL',
          'label': '机型'
        },
        {
          'prop': 'ALTERNATE_AIRPORT',
          'label': '备降机场'
        },
        {
          'prop': 'ESTIMATE_LAUNCH_TIME',
          'label': '起飞时间'
        }
      ] // 渲染的表头
    }
  },
  computed: {
  }
}
</script>

<style lang="scss">
</style>
