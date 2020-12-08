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

/**
 *
 * @desc 节流封装函数
 * @method throttle
 * @param {Function} fn 节流函数
 * @param {Function} delay 延时
 * @return {function(): void} 返回数组表示空属性集合,
 */
export function throttle (fn, delay) {

}

/**
 * @desc 环路检测方法
 * @method dfs
 * @param {Object} Adjacency 邻接表
 * @return {Object} 返回结果集
 */
export function circuit (Adjacency) {
  const stack = new Map()
  const currentNode = Adjacency[0]
  const dfs = (node) => {
    const state = stack.get(node.name)
    if (state) {
      console.log('state', state)
      throw new Error('------------')
    }
    stack.set(node.name, true)
    node.status = true
    for (let i = 0; i < node.node.length; i++) {
      const reuslt = Adjacency.find(item => item.name === node.node[i])
      if (reuslt) dfs(reuslt)
    }
    console.log('stack', stack)
  }
  dfs(currentNode)
}
