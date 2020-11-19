<template>
  <div id="app">
    <BaseForm :form-data="xxx" :form-hash="hash" />
  </div>
</template>

<script>
import BaseForm from './components/BaseForm.vue'

export default {
  name: 'App',
  components: {
    BaseForm
  },
  data () {
    return {
      xxx: {
        AIRCRAFT_MODEL: '',
        AIRCRAFT_REGISTRATION_NUMBER: '',
        NATIONALITY: '',
        OWNED_COMPANY: '',
        AIRCRAFT_AGE: '',
        ENGINE_RUNNING_TIME: '',
        MEL: '',
        AIRBORNE_EQUIPMENT: [],
        CRUISE_SPEED: '',
        AIRCRAFT_STATUS: '',
        MAINTENANCE_REQUIREMENTS: '',
        CURRENT_AIRPORT: '',
        PLANE_COLOUR: '',
        MAX_VOYAGE_TIME: '',
        MAX_VOYAGE_KM: '',
        MAX_FLY_KG: '',
        PRACTICAL_CEIL: ''
      },
      hash: {
        AIRCRAFT_MODEL: {
          label: '机型',
          type: 'text'
        },
        AIRCRAFT_REGISTRATION_NUMBER: {
          label: '登记号',
          type: 'text'
        },
        NATIONALITY: {
          label: '国籍',
          type: 'text'
        },
        OWNED_COMPANY: {
          label: '所属公司',
          type: 'text'
        },
        AIRCRAFT_AGE: {
          label: '机龄',
          type: 'text'
        },
        ENGINE_RUNNING_TIME: {
          label: '发动机运转时间',
          type: 'text'
        },
        MEL: {
          label: 'MEL/CDL',
          type: 'text'
        },
        AIRBORNE_EQUIPMENT: {
          label: '机载设备',
          type: 'checkbox',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        CRUISE_SPEED: {
          label: '巡航速度',
          type: 'text'
        },
        MAINTENANCE_REQUIREMENTS: {
          label: '维修需求',
          type: 'text'
        },
        CURRENT_AIRPORT: {
          label: '当前所在机场',
          type: 'radio',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        PLANE_COLOUR: {
          label: '飞机颜色',
          type: 'text'
        },
        MAX_VOYAGE_TIME: {
          label: '最大航程(时间)',
          type: 'duration'
        },
        MAX_VOYAGE_KM: {
          label: '最大航程(千米)',
          type: 'text'
        },
        MAX_FLY_KG: {
          label: '最大起飞重量（千克）',
          type: 'text'
        },
        PRACTICAL_CEIL: {
          label: '实用升限(米)',
          type: 'text'
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
