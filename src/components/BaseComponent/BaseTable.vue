<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      height="490"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        header-align="center"
        type="selection"
        width="75"
      />
      <template v-for="item in config">
        <slot :name="item.prop">
          <el-table-column
            v-if="item.component"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          >
            <component
              :is="item.component"
              :data="item"
            />
          </el-table-column>
          <el-table-column
            v-else
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          />
        </slot>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    config: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      multipleSelection: []
    }
  },
  methods: {
    // 赋值选中的数组
    handleSelectionChange (val) { this.multipleSelection = val },
    // 编辑
    handleEdit (index, row) { this.$emit('handleEdit', row) },
    // 删除
    handleDelete (index, row) { this.$emit('handleDelete', row) }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  border: 1px solid red;
}
</style>
