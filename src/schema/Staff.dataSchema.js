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

module.exports = [
  {
    key:'id',
    title:'ID',
    dataType:'int',
    // 会把primary 处理成表格 key
    primary:'true',
    width:100,
    showInTable:true,
    disabled:true,
    sorter:(a,b)=>a.id - b.id
  },
  {
    key:'name',
    title:'姓名',
    dataType:'varchar',
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'phoneNumber',
    title:'电话登录名',
    dataType:'varchar',
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'ouId',
    title:'所属部门',
    dataType:'int',
    showType:'ou',
    validator:[{required:true,message:'必填'}],
    render:(text,record)=>{
      return record.ouName;
    }
  },
  {
    key:'ouName',
    title:'所属部门名称',
    dataType:'varchar',
    showInTable:false,
    showInnerForm:false,
  },
  {
    key:'dataOuId',
    title:'可操作部门',
    dataType:'int',
    showType:'ou',
    validator:[{required:true,message:'必填'}],
    render:(text,record)=>{
      return record.dataOuName;
    }
  },
  {
    key:'dataOuName',
    title:'可操作部门名称',
    dataType:'varchar',
    showInTable:false,
    showInnerForm:false,
  },
  {
    key:'dataPermission',
    title:'操作权限',
    dataType:'varchar',
    validator:[{required:true,message:'必填'}],
    options:[{key:'B',value:'可读'},{key:'A',value:'可管理'}]
  },
  {
    key:'authorities',
    title:'角色',
    dataType:'int',
    showType:'multiSelect',
    showInTable:false,
    // options 后端生成
  },
  {
    key:'place',
    title:'位置',
    dataType:'int',
  },
]
