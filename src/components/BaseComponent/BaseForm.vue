<template>
  <div class="box">
    <el-form ref="form" :model="form" :label-position="labelPosition" label-width="auto" class="container">
      <template v-for="(val,key) in formHash">
        <el-form-item
          v-show="handleShow(formHash[key])"
          v-if="formHash[key]"
          :key="key"
          :label="formHash[key].label"
        >
          <!--普通文本-->
          <template v-if="formHash[key].type==='text'">
            <el-input
              v-show="handleShow(formHash[key])"
              v-model="form[key]"
              :disabled="formHash[key].disabled"
            />
          </template>
          <!--单选-->
          <template v-else-if="formHash[key].type==='radio'">
            <el-select
              v-show="handleShow(formHash[key])"
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
              v-show="handleShow(formHash[key])"
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
              v-show="handleShow(formHash[key])"
              v-model="form[key]"
              type="datetime"
              :disabled="formHash[key].disabled"
              :format="formHash[key].format"
              :value-format="formHash[key].valueFormat"
            />
          </template>
          <!--时间-->
          <template v-else-if="formHash[key].type==='duration'">
            <el-time-picker
              v-show="handleShow(formHash[key])"
              v-model="form[key]"
              :disabled="formHash[key].disabled"
              format="HH:mm"
              value-format="HH:mm"
              placeholder="请输入时间"
            />
          </template>
        </el-form-item>
      </template>
    </el-form>
    <slot :scope="Object.assign({},form)" />
  </div>
</template>

<script>
import { circuit } from '@/lib/unit'
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
    const formHash = this.formHash
    const state = circuit(formHash)
    if (state) {
      const that = this
      const obj = Object.assign({}, this.formData)
      const handler = {
        set: function name (obj, prop, value) {
          obj[prop] = value
          if (formHash[prop] && formHash[prop].correlate) formHash[prop].correlate(that.form)
          return true
        }
      }
      this.form = new Proxy(obj, handler)
      Object.keys(formHash).forEach(item => { if (this.formData[item]) this.form[item] = this.formData[item] })
    }
  },
  methods: {
    handleShow (val) {
      return val.show === undefined ? true : val.show
    },
    verify (scope) {
      try {
        Object.keys(this.formHash).forEach(element => {
          if (this.formHash[element].required && scope[element] === '') throw new Error(`${this.formHash[element].label}不允许为空`)
        })
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    resetForm () {
      Object.keys(this.form).forEach(attr => {
        this.form[attr] = ''
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  padding: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #3b5681;
}

.el-form-item{
  .el-select,.el-input{
    width: 100%;
  }
}
</style>
