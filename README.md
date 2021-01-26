# 表单组件
基础的查询组件
接收两个参数
searchForm
sourceData

**Attributes**

|  参数	   | 说明  |类型|默认值
|  ----  | ----  |----|----|
| searchForm  | 单元格 |Object|{}|
| sourceData  | 单元格 |Array|[]|


```typescript
enum TypeEnum { 'text', 'select', 'timeLimit', 'timeBefore' }
enum FormatEnum { 'yyyy/MM/dd hh:mm', 'yyyy/MM/dd' }
interface SearchAttr {
    label: string
    type: TypeEnum
    format: FormatEnum
    verify(attrVal: Array<Date> | String): void
}
```