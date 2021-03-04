<template>
  <div class="box">
    <el-scrollbar>
      <form class="container" :style="formStyle">
        <div v-for="(val,key) in formHash" v-show="handleShow(formHash[key])" :key="key" class="form__item">
          <div class="form__item__header">
            <span>{{ formHash[key].label }}</span>
          </div>
          <div class="form__item__content">
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
                type="datetime"
                :disabled="formHash[key].disabled"
                :format="formHash[key].format"
                :value-format="formHash[key].valueFormat"
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
            <!--文本框-->
            <template v-else-if="formHash[key].type==='textarea'">
              <el-input
                v-model="form[key]"
                :autosize="{ minRows: 2, maxRows: 3}"
                placeholder="请输入内容"
                type="textarea"
              />
            </template>
          </div>
        </div>
      </form>
    </el-scrollbar>
    <div class="formSlot">
      <slot :scope="Object.assign({},form)" />
    </div>

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
    },
    formStyle: {
      type: Object,
      default: () => {
        return {
          height: `300px`
        }
      }
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
        set: function (obj, prop, value) {
          obj[prop] = value
          if (formHash[prop] && formHash[prop].correlate) formHash[prop].correlate(that.form)
          return true
        },
        get: function (obj, prop) {
          if (formHash[prop] && formHash[prop].mapping) return formHash[prop].mapping(obj[prop])
          return obj[prop]
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
        return true
      } catch (e) {
        this.$message.error(e.message)
        return false
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
.formSlot{
  padding-top: 1em;
}
.form__item{
  &__header{
    padding: 5px;
  }
  &::v-deep textarea{
    resize: none;
  }
  .el-input{
    width: 100%;
  }
}
</style>
