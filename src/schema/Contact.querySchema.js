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
    key:'name',
    title:'姓名',
    dataType:'varchar',
  },{
    key:'sex',
    title:'性别',
    dataType:'varchar',
    showType:'radio',
    options: [{key: 'male', value: '男'}, {key: 'female', value: '女'}],
  },{
    key:'customer',
    title:'客户',
    dataType:'varchar',
  },{
    key:'post',
    title:'职务',
    dataType:'varchar',
  },{
    key:'phone',
    title:'公司电话',
    dataType:'varchar',
  },{
    key:'mobile',
    title:'手机号',
    dataType:'varchar',
  },
]
