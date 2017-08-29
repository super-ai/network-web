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
    title:'菜单名称',
    dataType:'varchar',
    // showInForm:false,
    // showInTable:false,
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
    title:'菜单类型',
    dataType:'varchar',
    showType:'select',
    options:[{key:'sidebar',value:'sidebar'},{key:'header',value:'header'}],
    validator:[{required:true,message:'必填'}]
  },
  {
    key:'icon',
    title:'图标',
    dataType:'varchar',
  },
  {
    key:'parentId',
    title:'父节点',
    dataType:'int',
  },
  {
    key:'place',
    title:'位置',
    dataType:'int',
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
