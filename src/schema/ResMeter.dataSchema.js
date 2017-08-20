// 1、配置内容为实际对象的所有属性
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
//    <li>width:宽度</li>
//    <li>min:最小</li>
//    <li>max:最大</li>

module.exports = [
  {
    key:'id',
    title:'ID',
    dataType:'int',
    primary:'true',
    sorter:(a,b)=>a.id - b.id
  },
  {
    key:'model',
    title:'型号',
    dataType:'varchar',
  },
  {
    key:'serial',
    title:'序列号',
    dataType:'varchar',
  },
  {
    key:'dimShareStatus',
    title:'状态',
    dataType:'int',
    showType:'select',
    options:[{key:'312',value:'在用'},{key:'313',value:'保修'},{key:'314',value:'报废'}]
  }
  // ,
  // {
  //   key:'select',
  //   title:'测试单选',
  //   dataType:'int',
  //   showType:'select',
  //   options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  // },
  // {
  //   key:'multi-select',
  //   title:'测试多选',
  //   dataType:'int',
  //   showType:'multiSelect',
  //   options:[{key:'male',value:'男'},{key:'female',value:'女'}],
  // },
]
