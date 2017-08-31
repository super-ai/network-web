module.exports = [
  //  部门名称、层级、有无数据、parentId
  {
    key:'id',
    title:'ID',
    dataType:'int',
    // 会把primary 处理成表格 key
    primary:'true',
    width:100,
    showInTable:false,
    disabled:true,
    sorter:(a,b)=>a.id - b.id
  },
  {
    key:'name',
    title:'名称',
    dataType:'varchar',
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'levelId',
    title:'层级',
    dataType:'int',
    options:[{key:'全国级',value:'1'},{key:'省级',value:'2'},{key:'地市级',value:'3'},{key:'经营部级',value:'4'},{key:'其他',value:'100'}],
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'hasData',
    title:'有无数据',
    dataType:'varchar',
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'parentId',
    title:'父节点',
    dataType:'int',
    showType:'treeSelect',
  }
]
