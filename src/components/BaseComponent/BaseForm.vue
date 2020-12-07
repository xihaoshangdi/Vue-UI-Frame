<template>
  <el-form ref="form" :model="form" :label-position="labelPosition" label-width="auto" class="container">
    <template v-for="(val,key) in formData">
      <el-form-item
        v-if="formHash[key]"
        :key="key"
        :label="formHash[key].label"
      >
        <!--普通文本-->
        <template v-if="formHash[key].type==='text'">
          <el-input
            v-model="form[key]"
            :disabled="formHash[key].disabled"
          />
        </template>
        <!--单选-->
        <template v-else-if="formHash[key].type==='radio'">
          <el-select
            v-model="form[key]"
            :disabled="formHash[key].disabled"
            clearable
            placeholder="请选择"
          >
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
          <el-select
            v-model="form[key]"
            :disabled="formHash[key].disabled"
            clearable
            multiple
            placeholder="请选择"
          >
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
            :disabled="formHash[key].disabled"
            type="datetime"
            :format="val.format"
            :value-format="val.format"
          />
        </template>
        <!--时间-->
        <template v-else-if="formHash[key].type==='duration'">
          <el-time-picker
            v-model="form[key]"
            :disabled="formHash[key].disabled"
            format="HH:mm"
            value-format="HH:mm"
            placeholder="请输入时间"
          />
        </template>
      </el-form-item>
    </template>
    <template v-show="handle">
      <el-button type="primary" @click="verify">确认</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </template>
  </el-form>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    handle: {
      type: Boolean,
      default: true
    },
    formData: {
      // 表单的数据
      type: Object,
      default: () => {}
    },
    formHash: {
      type: Object,
      default: () => {}
    },
    verifyForm: {
      type: Function,
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
    const formHash = this.formHash
    const obj = Object.assign({}, this.formData)
    const handler = {
      set: function name (obj, prop, value) {
        obj[prop] = value
        if (formHash[prop].value) formHash[prop].value(obj)
        return true
      }
    }
    this.form = new Proxy(obj, handler)
  },
  methods: {
    verify () {
      try {
        Object.keys(this.formHash).forEach(element => {
          if (this.formHash[element].required && this.form[element] === '') throw new Error(`${this.formHash[element].label}不允许为空`)
        })
        const temp = {}
        Object.assign(temp, this.form) // 获取代理的原始对象form
        const form = JSON.parse(JSON.stringify(temp)) // 对form进行深拷贝
        this.verifyForm(form)
        this.$emit('confirm', form)
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    cancel () { this.$emit('cancel') }
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
  padding: 20px;
  font-size: 14px;
  font-family: PingFang-SC;
  font-weight: bold;
  color: #3b5681;
  max-width: 700px;
}
.el-form-item{
  .el-select,.el-input{
    width: 100%;
  }
}
</style>
