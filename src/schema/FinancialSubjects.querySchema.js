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
    title:'财务科目名称',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },{
    key:'number',
    title:'科目编号',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },{
    key:'parentNumber',
    title:'上级科目编号',
    dataType:'varchar',
  },{
    key:'incomeTypeId',
    title:'收入类型',
    dataType:'int',
    showType:'select',
  },{
    key:'isLeastSubject',
    title:'为最细科目',
    dataType:'int',
    options: [{key: true, value: '是'}, {key: false, value: '否'}],
  },{
    key:'isIncomeSubject',
    title:'为收入科目',
    dataType:'int',
    options: [{key: true, value: '是'}, {key: false, value: '否'}],
  },
]
