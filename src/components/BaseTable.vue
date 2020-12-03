<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      :row-key="(row)=>row.UUID"
      height="490"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        header-align="center"
        :reserve-selection="true"
        type="selection"
        width="75"
      />
      <template v-for="item in config">
        <el-table-column
          v-if="item.special"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            {{ item.fn(scope.row[item.prop]) }}
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
        />
      </template>
      <el-table-column prop="edit" label="操作" width="180">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
    handleEdit (index, row) { this.$emit('editPopup', row) },
    // 删除
    handleDelete (index, row) { this.$emit('deleteInfo', row) }
  }
}
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  justify-content: flex-end;
}
</style>
