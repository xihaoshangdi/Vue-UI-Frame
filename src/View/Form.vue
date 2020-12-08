<template>
  <div>
    <base-form
      :form-data="formData"
      :form-hash="formHash"
      :verify-form="verifyFn"
      @confirm="submit"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import BaseForm from '@/components/BaseComponent/BaseForm'
export default {
  name: 'Form',
  components: { BaseForm },
  data () {
    return {
      formData: {
        name: '',
        birth: '2020/12/10 00:00:00',
        constellation: '',
        week: '',
        age: '',
        education: ''
      },
      formHash: {
        name: {
          label: '姓名',
          type: 'text',
          required: true
        },
        birth: {
          label: '出生日期',
          type: 'datetime',
          required: true,
          format: 'yyyy/MM/dd HH:mm:ss',
          valueFormat: 'yyyy/MM/dd HH:mm:ss',
          dependProp: ['constellation', 'week', 'age'],
          correlate: (data) => {
            const brith = new Date(data.birth)
            data.constellation = this.getAstro(brith.getMonth() + 1, brith.getDay())
            data.week = `星期${'一二三四五六日'[brith.getDay() + 1]}`
            data.age = new Date().getFullYear() - brith.getFullYear()
          }
        },
        constellation: {
          label: '出生星座',
          type: 'text',
          disabled: true
        },
        week: {
          label: '出生星期',
          type: 'text',
          disabled: true
        },
        age: {
          label: '年龄',
          type: 'text',
          dependProp: ['education'],
          correlate: (data) => {
            if (data.age < 3) data.education = '家教'
            else if (data.age < 6)data.education = '幼稚园'
            else if (data.age <= 12)data.education = '小学'
            else if (data.age <= 15)data.education = '初中'
            else if (data.age <= 18)data.education = '高中'
            else if (data.age <= 22)data.education = '大学'
            else if (data.age <= 25)data.education = '研究生'
            else data.education = '博士'
          }
        },
        education: {
          label: '学历',
          type: 'text',
          disabled: true
        }
      },
      verifyFn: (data) => {}
    }
  },
  methods: {
    getAstro (month, day) {
      const str = '魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'
      const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]
      return str.substr(month * 2 - (day < arr[month - 1] ? 2 : 0), 2) + '座'
    },
    submit (data) {
      this.$message.success('提交表单')
      console.log('表单数据', data)
    },
    cancel () {
      this.$message.info('取消表单')
    }
  }
}
</script>

<style scoped>

</style>
