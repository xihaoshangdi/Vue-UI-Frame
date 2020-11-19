<template>
  <el-form ref="form" :model="form" :label-position="labelPosition" label-width="auto" class="container">
    <template v-for="(val,key) in formData" class="xxx">
      <el-form-item v-if="formHash[key]" :key="key" :label="formHash[key].label">
        <!--普通文本-->
        <template v-if="formHash[key].type==='text'">
          <el-input v-model="form[key]" />
        </template>
        <!--单选-->
        <template v-else-if="formHash[key].type==='radio'">
          <el-select v-model="form[key]" clearable placeholder="请选择">
            <el-option
              v-for="item in formHash[key].options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <!--多选-->
        <template v-else-if="formHash[key].type==='checkbox'">
          <el-select v-model="form[key]" clearable multiple placeholder="请选择">
            <el-option
              v-for="item in formHash[key].options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <!--日期-->
        <template v-else-if="formHash[key].type==='datetime'">
          <el-date-picker
            v-model="form[key]"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
          />
        </template>
        <!--时间-->
        <template v-else-if="formHash[key].type==='duration'">
          <el-time-picker
            v-model="form[key]"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="请输入时间"
          />
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    formData: {
      // 表单的数据
      type: Object,
      default: () => {}
    },
    formHash: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      labelPosition: 'top',
      form: {}
    }
  },
  created () {
    this.form = Object.assign({}, this.formData)
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.container {
  border: 1px solid red;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
}
.xxx{
  border: 1px solid red;
}
</style>
