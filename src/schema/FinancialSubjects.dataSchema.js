// 1、配置内容为实际对象的所有属性！！！
// 2、可配置的内容为
//    <li>key:对象的属性名称（不是数据库属性的命名）</li>
//    <li>title:表的列名称</li>
//    <li>dataType:数据类型 int/float/varchar/datetime</li>
//    <li>showType:显示类型 normal/radio/checkbox/select/multiSelect/textarea/image/file/cascader</li>
//    <li>render:渲染器 InnerTableRenderUtils中去处理</li>
//    <li>sorter:排序函数</li>
//    <li>key:对象的属性名称(不是小写中横线形式)</li>
//    <li>showInTable:true/false 默认true</li>
//    <li>showInForm:true/false 默认true  false表示数据库会默认给一个值</li>
//    <li>placeholder:提示信息</li>
//    <li>options:数据集合(数组) 可以生成option给select使用</li>
//    <li>defaultValue:默认值(数组)</li>
//    <li>validator:校验器(数组)</li>  eg:[{type: 'array', required: true, message: '请至少选择一项兴趣'}]
//    <li>width:宽度 </li>
//    <li>min:文件(图片)最小个数</li>
//    <li>max:文件(图片)最大个数</li>
//    <li>sizeLimit:大小(K)</li>
//    <li>accept:文件格式，逗号分隔，默认为.jpg,.png,.gif,.jpeg</li>
//    <li>url:文件(图片)路径，默认为config.js中配置</li>
//    <li>disabled:是否可以编辑 默认为false 自增ID 设置为true </li>


// 图片返回注意：
// 1.后台端使用ArrayList方式返回
// 2.单个图片也可以使用字符串(不建议)
// 3.

//datetime
//1. 前台给后台返回的日期为 'yyyy-MM-dd hh:mm:ss'

module.exports = [
  {
    key:'id',
    title:'ID',
    dataType:'int',
    primary:'true',
    sorter:(a,b)=>a.id - b.id,
    showInTable:false,
    disabled:true,
  },{
    key:'name',
    title:'科目名称',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },{
    key:'number',
    title:'科目编号',
    dataType:'varchar',
    validator: [{required: true, message: '必填'}],
  },{
    key:'parentNumber',
    title:'上级编号',
    dataType:'varchar',
  },{
    key:'incomeTypeId',
    title:'收入类型',
    dataType:'varchar',
    showType:'select',
  },{
    key:'isLeastSubject',
    title:'最细科目',
    dataType:'int',
    showType:'radio',
    options: [{key: true, value: '是'}, {key: false, value: '否'}],
  },{
    key:'isIncomeSubject',
    title:'收入科目',
    dataType:'int',
    showType:'radio',
    options: [{key: true, value: '是'}, {key: false, value: '否'}],
  },{
    key:'remarks',
    title:'备注',
    dataType:'varchar',
    showInTable:false,
  },{
    key:'createTime',
    title:'登记时间',
    dataType:'date',
    showInTable:false,
    disabled:true,  // 后台自动生成
  },{
    key:'createUserName',
    title:'登记人',
    dataType:'varchar',
    showInTable:false,
    disabled:true,
  },

]
