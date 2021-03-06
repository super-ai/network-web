module.exports = [
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
    key:'menuKey',
    title:'路由Key',
    dataType:'varchar',
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'type',
    title:'类型',
    dataType:'varchar',
    showType:'select',
    options:[{key:'sidebar',value:'sidebar'},{key:'header',value:'header'}],
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'icon',
    title:'图标',
    dataType:'varchar'
  },
  {
    key:'parentId',
    title:'父节点',
    dataType:'int',
    showType:'treeSelect',
  },
  {
    key:'place',
    title:'位置',
    dataType:'int',
  },
]
