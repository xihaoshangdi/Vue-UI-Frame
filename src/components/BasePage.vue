<template>
  <div id="app">
    <base-search
      :search-form="searchForm"
      :source-data="sourceData"
      @handleSearchData="handlePageData"
    />
    <div class="operate">
      <el-button type="primary" @click="insertInfo">新建</el-button>
      <el-button type="primary" @click="batchDelet">删除</el-button>
      <slot />
    </div>
    <base-table
      ref="baseTable"
      :table-data="tableData"
      :config="config"
      @handleEdit="handleTableEdit"
      @handleDelete="handleTableDelete"
    >
      <template v-for="(_, slot) in $slots">
        <template :slot="slot">
          <slot :name="slot" />
        </template>
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
import BaseTable from '@/components/BaseComponent/BaseTable'
import BaseSearch from '@/components/BaseComponent/BaseSearch'

export default {
  name: 'BasePage',
  components: {
    BaseTable,
    BaseSearch
  },
  props: {
    // BaseSearch
    searchForm: {
      type: Object,
      default: () => {}
    },
    sourceData: {
      type: Array,
      default: () => []
    },
    // BaseTable
    config: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
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

<style lang="scss" scoped>
.operate{
  border: 1px solid red;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 20px;
}
</style>
