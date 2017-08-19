// dataType
// 数据类型, 前端会根据数据类型展示不同的输入框
// 目前可用的dataType: int/float/varchar/datetime

// showType
// 显示类型, 一些可枚举的字段, 比如type, 可以被显示为单选框或下拉框
// 默认显示类型是normal, 就是一个普通的输入框, 这时可以省略showType字段
// 目前可用的showType: normal/select/radio/between/checkbox/multiSelect/cascader
// between只能用于int/float/datetime, 会显示2个输入框, 用于范围查询
module.exports = [
  {
    key:'id',
    title:'ID',
    dataType:'int',
    placeholder:'ID'
  },
  {
    key:'text',
    title:'菜单名称',
    dataType:'varchar',
    placeholder:'菜单名称'
  }
  // ,
  // {
  //   key:'dt',
  //   title:'测试日期',
  //   dataType:'datetime'
  // }
  // ,
  // {
  //   key:'select',
  //   title:'测试单选',
  //   dataType:'int',
  //   showType:'select',
  //   options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  //   defaultValue:['male']
  // },
  // {
  //   key:'multi-select',
  //   title:'测试多选',
  //   dataType:'int',
  //   showType:'multiSelect',
  //   options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  //   defaultValue:['male','female']
  // }
]
