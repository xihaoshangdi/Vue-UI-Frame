<template>
  <div>
    <base-search
      :search-form="searchForm"
      :source-data="sourceData"
      @handleSearchData="handlePageData"
      @handleResetData="handleResetData"
    />
    <base-table
      ref="baseTable"
      :table-data="tableData"
      :config="config"
    >
      <template #special>
        <el-table-column
          key="special"
          prop="special"
          label="特殊处理"
        >
          <template slot-scope="{row,$index}">
            <el-button @click="handleTableEdit(row,$index)">编辑</el-button>
            <el-button @click="handleTableDelete(row,$index)">删除</el-button>
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
      sourceData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          food: '黄金糕'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          food: '双皮奶'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          food: '蚵仔煎'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          food: '龙须面'
        }
      ], // SourceData 数据库的全部数据
      // BaseSearch
      searchForm: { // 查询的表单对象
        date: {
          label: '日期',
          type: 'timeLimit',
          format: 'yyyy/MM/dd hh:mm'
        },
        name: {
          label: '姓名',
          type: 'text',
          vague: true
        },
        address: {
          label: '地址',
          type: 'text',
          vague: true
        },
        food: {
          label: '食物',
          type: 'radio',
          options: [{
            value: '黄金糕',
            label: '黄金糕'
          }, {
            value: '双皮奶',
            label: '双皮奶'
          }, {
            value: '蚵仔煎',
            label: '蚵仔煎'
          }, {
            value: '龙须面',
            label: '龙须面'
          }, {
            value: '北京烤鸭',
            label: '北京烤鸭'
          }],
          vague: false
        }
      },
      // BaseTable
      config: [
        {
          'prop': 'date',
          'label': '日期'
        },
        {
          'prop': 'name',
          'label': '姓名'
        },
        {
          'prop': 'address',
          'label': '地址'
        },
        {
          'prop': 'food',
          'label': '食物'
        },
        {
          'prop': 'special',
          'label': '特殊处理'
        }
      ], // 渲染的表头
      pageData: [],
      // BasePager
      currentPage: 1, // 当前页码
      pageSize: 2 // 每页个数
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
    handleResetData (data) {
      this.currentPage = 1
      this.pageData = data
      this.$refs.baseTable.$refs.multipleTable.clearSelection()
    },
    handleTableEdit (data) {
      console.log('editData', data)
      this.$emit('handleEditInfo', data)
    },
    handleTableDelete (data) {
      console.log('delData', data)
      this.$emit('handleDeleteInfo', data)
    }
  }
}
</script>

<style scoped>

</style>
