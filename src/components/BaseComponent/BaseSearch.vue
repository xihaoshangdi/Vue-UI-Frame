<template>
  <div class="search-area">
    <template v-for="(val,key) in searchForm">
      <div :key="key">
        <div>{{ val.label }}</div>
        <template v-if="val.type==='text'">
          <el-input v-model="form[key]" placeholder="请输入内容" />
        </template>
        <template v-else-if="val.type==='radio'">
          <el-select v-model="form[key]" clearable placeholder="请选择">
            <el-option
              v-for="item in val.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
        <template v-else-if="val.type==='timeBefore'">
          <el-date-picker
            v-model="form[key]"
            type="datetime"
            :value-format="val.format"
            :format="val.format"
            placeholder="选择日期时间"
          />
        </template>
        <template v-else-if="val.type==='timeLimit'">
          <el-date-picker
            v-model="form[key]"
            type="datetimerange"
            :value-format="val.format"
            :format="val.format"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </template>
        <template v-else-if="val.type==='duration'">
          <el-time-picker
            v-model="form[key]"
            :value-format="val.format"
            :format="val.format"
            placeholder="选择时间范围"
          />
        </template>
      </div>
    </template>
    <div>
      <el-button type="primary" @click="search()">查询</el-button>
      <el-button type="primary" @click="reset()">重置</el-button>
    </div>
  </div>
</template>

<script>
import { checkObjNull } from '@/lib/unit'
import dayjs from 'dayjs'
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
export default {
  name: 'BaseSearch',
  props: {
    searchForm: { // 查询表单
      type: Object,
      default: () => {}
    },
    sourceData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: {}
    }
  },
  methods: {
    search () {
      try {
        // 获取检索的属性集合
        const rules = Object.keys(checkObjNull(this.form).NonEmptyObj)
        // 判断检索属性本身是否正确
        rules.forEach(element => { if (this.searchForm[element].verify) this.searchForm[element].verify(this.form[element]) })
        // 从数据源头过滤数据
        const filterData = this.sourceData.filter(bar => {
          const data = rules.map(attr => {
            const { type, vague } = this.searchForm[attr]
            switch (type) {
              case 'text':
              case 'radio':
                return vague ? String(bar[attr]).includes(this.form[attr]) : String(bar[attr]) === String(this.form[attr])
              case 'timeBefore':
                return dayjs(bar[attr]).isBefore(this.form[attr])
              case 'timeLimit': {
                return dayjs(bar[attr]).isBetween(dayjs(this.form[attr][0]), dayjs(this.form[attr][1]), null, '[)')
              }
              case 'duration': {
                const [formHour, formMinute] = this.form[attr].split(':')
                const [barHour, barMinute] = bar[attr].split(':')
                return Boolean(formHour * 60 + formMinute - barHour * 60 + barMinute)
              }
              default: {
                return true
              }
            }
          })
          if (!data.includes(false)) return bar
        })
        console.log('filterData', filterData)
        this.$emit('handleSearchData', filterData)
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    reset () {
      Object.keys(this.form).forEach(attr => { this.form[attr] = '' })
      this.$emit('handleResetData', this.sourceData)
    }
  }
}
</script>

<style lang="scss" scoped>
.search-area{
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  & > div{
    font-weight: bolder;
    text-align: left;
    margin: 5px;
  }
}
</style>
