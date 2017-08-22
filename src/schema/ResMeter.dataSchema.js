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


// 图片返回注意：
// 1.后台端使用ArrayList方式返回
// 2.单个图片也可以使用字符串(不建议)
// 3.




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
    showInForm: false,
  },
  {
    key:'serial',
    title:'序列号',
    dataType:'varchar',
    showInForm: false,
  },
  {
    key:'dimShareStatus',
    title:'状态',
    dataType:'int',
    showType:'select',
    options:[{key:'312',value:'在用'},{key:'313',value:'保修'},{key:'314',value:'报废'}]
  },
  {
    key:'properties',
    title:'产权',
    dataType:'int',
    showType:'multiSelect',
    options:[{key:'315',value:'铁通自购'},{key:'316',value:'铁通租赁'},{key:'317',value:'外包维护单位'}]
  },
  {
    key:'listImage',
    title:'字符串图片(单)',
    dataType:'varchar',
    showType:'image',
    max:1,
    sizeLimit:500,
    width:80, // 高度会按照比例调整
    accept:'.jpg,.png,.gif,.jpeg',
    placeholder: '请上传jpg格式',
  },
  {
    key: 'listImages',
    title: '字符串图片(多)',
    dataType: 'varchar',
    showType: 'image',
    max: 5,
    sizeLimit:500,
    // max>1时, 默认值是string array
    // defaultValue: ['http://jxy.me/about/avatar.jpg', 'http://jxy.me/about/avatar.jpg'],
    width: 150,
    placeholder: '多个图片上传',
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
