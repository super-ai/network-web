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

//datetime
//1. 前台给后台返回的日期为 'yyyy-MM-dd hh:mm:ss'

module.exports = [
  {
    key:'id',
    title:'ID',
    dataType:'int',
    primary:'true',
    sorter:(a,b)=>a.id - b.id
  },
  {
    key:'ouId',
    title:'部门',
    dataType:'int',
    showType:'ou',
    initKey:'ouName',     //使用字段 ouName值 进行初始化
    render:(text,record)=>{
      return record.ouName;
    },
    validator: [{required: true, message: '必填'}],
  },
  {
    key:'ouName',
    title:'组织机构',
    dataType:'varchar',
    showInTable:false,
    showInForm: false,
  },
  {
    key:'model',
    title:'型号',
    dataType:'varchar',
    showInForm: false,
    showInTable:false,
  },
  {
    key:'serial',
    title:'序列号',
    dataType:'varchar',
    showInForm: true,
  },
  {
    key:'dimShareStatus',
    title:'状态',
    dataType:'varchar',
    showType:'select',
    options:[{key:312,value:'在用'},{key:313,value:'保修'},{key:314,value:'报废'}]
  },
  {
    key:'properties',
    title:'产权',
    dataType:'varchar',
    showType:'multiSelect',
    options:[{key:315,value:'铁通自购'},{key:316,value:'铁通租赁'},{key:317,value:'外包维护单位'}]
  },
  {
    key:'image',
    title:'图片(单)',
    dataType:'varchar',
    showType:'image',
    max:1,
    sizeLimit:500,
    width:50, // 高度会按照比例调整
    accept:'.jpg,.png,.gif,.jpeg',
    placeholder: '请上传jpg格式',
  },
  {
    key: 'listImages',
    title: '图片(多)',
    dataType: 'varchar',
    showType: 'image',
    width: 50,
    max: 5,
    sizeLimit:500,
    placeholder: '多个图片上传',
  },
  {
    key:'file',
    title:'文件(单)',
    dataType:'varchar',
    showType:'file',
    max:1,
    sizeLimit:500,
    width:80, // 高度会按照比例调整
    placeholder: '单个文件上传',
  },
  {
    key: 'listFiles',
    title: '文件(多)',
    dataType: 'varchar',
    showType: 'file',
    max: 5,
    sizeLimit:500,
    width: 150,
    placeholder: '多个文件上传',
  },
  {
    key: 'dt',
    title: '日期',
    // 对于日期类型要注意下, 在js端日期被表示为yyyy-MM-dd HH:mm:ss的字符串, 在java端日期被表示为java.util.Date对象
    // fastjson反序列化时可以自动识别
    // 序列化倒是不用特别配置, 看自己需求, fastjson会序列化为一个字符串, 前端原样展示
    // defaultValue: '2017-01-01 11:22:33',
    dataType: 'datetime',
    // 对于datetime而言, 配置showType是无意义的
    placeholder: 'happy!',
  },

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
