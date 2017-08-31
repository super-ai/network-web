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
    showType:'select',
    options:[{value:'全国级',key:1},{value:'省级',key:2},{value:'地市级',key:3},{value:'经营部级',key:4},{value:'其他',key:100}],
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'hasData',
    title:'有无数据',
    dataType:'varchar',
    validator:[{required:true,message:'必填'}],
    render:(text,record)=>{
      if(text){
        return '有';
      } else {
        return '无';
      }
    }
  },
  {
    key:'parentId',
    title:'父节点',
    dataType:'int',
    showType:'treeSelect',
  }
]
