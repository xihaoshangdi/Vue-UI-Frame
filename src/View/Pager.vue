<template>
  <div>
    <base-search :search-form="searchForm" :source-data="sourceData">
      <template v-slot="{scope}">
        <div>{{ scope }}</div>
        <el-input v-model="scope.form[scope.key]" placeholder="请输入内容" />
      </template>
    </base-search>
    <base-table :table-data="pageData" :config="config">
      <template #PLAN_TYPE>
        <el-table-column>
          <template slot-scope="{row,$index}">
            <div>{{ row }}-{{ $index }}</div>
          </template>
        </el-table-column>
      </template>
    </base-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="total, prev, pager, next"
    />
  </div>
</template>

<script>
import BaseSearch from '@/components/BaseComponent/BaseSearch'
import BaseTable from '@/components/BaseComponent/BaseTable'
export default {
  name: 'Pager',
  components: { BaseTable, BaseSearch },
  data () {
    return {
      xxx: '',
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
        },
        YYYY: {
          label: '发送时间范围',
          type: 'duration',
          vague: false,
          format: 'hh:mm'
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
      ], // 渲染的表头
      pageData: [],
      // BasePager
      currentPage: 1, // 当前页码
      pageSize: 5 // 每页个数
    }
  },
  computed: {
    tableData () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = (this.currentPage) * this.pageSize
      return this.pageData.filter((item, index) => index >= start && index < end)
    },
    total () {
      return this.pageData.length
    }
  },
  watch: {
    sourceData: {
      handler (val) { this.pageData = val },
      immediate: true
    }
  },
  methods: {
    handlePageData (data) {
      this.currentPage = 1
      this.pageData = data
    },
    handleTableEdit (data) {
      this.$emit('handleEditInfo', data)
    },
    handleTableDelete (data) {
      this.$emit('handleDeleteInfo', data)
    },
    insertInfo () {
      this.$emit('insertInfo')
    },
    batchDelet () {
      this.$emit('batchDelet', this.$refs.baseTable.multipleSelection)
    }
  }
}
</script>

<style scoped>

</style>
