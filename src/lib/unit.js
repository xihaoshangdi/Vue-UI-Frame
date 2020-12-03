/**
 *
 * 对象属性值判空方法
 * @method checkObjNull
 * @for
 * @param {Object} object 表示检索对象
 * @return {{Status: boolean, NullabilityList: [], NonEmptyObj: Object}} 返回数组表示空属性集合,
 */
export const checkObjNull = function (object) {
  const obj = Object.assign({}, object)
  const attrList = []
  Object.keys(obj).forEach(attr => {
    const attrType = Object.prototype.toString.call(obj[attr]).slice(8, -1).toLowerCase()
    switch (attrType) {
      case 'string': if (obj[attr] === '') {
        attrList.push(attr)
        delete obj[attr]
      }
        break
      case 'array': if (obj[attr].length === 0) {
        attrList.push(attr)
        delete obj[attr]
      }
        break
      case 'object': if (Object.keys(obj[attr]).length === 0) {
        attrList.push(attr)
        delete obj[attr]
      }
        break
      case 'null':
        attrList.push(attr)
        delete obj[attr]
        break
      case 'undefined':
        attrList.push(attr)
        delete obj[attr]
        break
      default:
        console.log('------------')
    }
  })
  return { Status: attrList.length !== 0, NullabilityList: attrList, NonEmptyObj: obj }
}