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
    key:'number',
    title:'客户编码',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },{
    key:'name',
    title:'客户名称',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },{
    key:'abbr',
    title:'客户简称',
    dataType:'varchar',
  },{
    key:'industryId',
    title:'所属行业',
    dataType:'varchar',
    showType:'select',
  },{
    key:'propertyId',
    title:'客户性质',
    dataType:'varchar',
    showType:'select',
  },{
    key:'corporateRepresentative',
    title:'法人代表',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },{
    key:'areaId',
    title:'所在省市',
    dataType:'int',
    showType:'ou',
    url:'/api/Area/select',
    render:(text,record)=>{
      return record.areaName;
    },
    validator: [{required: true, message: '必填'}],
  },{
    key:'address',
    title:'通信地址',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },
]
